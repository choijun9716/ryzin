// ===== 쇼호스트 지급명세서 CSV 파서 및 데이터 변환 유틸리티 =====

/**
 * 텍스트(CSV/TSV/엑셀 복사본)를 파싱하여 쇼호스트별 지급명세서 데이터를 생성
 * @param {string} rawText - 입력 텍스트
 * @param {object} options - 옵션 { paymentDate, groupByRecipient }
 * @returns {Array} 쇼호스트별 명세서 데이터 목록
 */
export function parsePayslipRawText(rawText, options = {}) {
  if (!rawText || typeof rawText !== 'string') return [];

  const defaultPaymentDate = options.paymentDate || new Date().toISOString().split('T')[0];
  const groupByRecipient = options.groupByRecipient !== false; // 기본값 true

  const lines = rawText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
  if (lines.length === 0) return [];

  // 구분자 판별 (탭 \t, 쉼표 ,, 세미콜론 ;)
  const firstLine = lines[0];
  let delimiter = '\t';
  if (firstLine.includes('\t')) {
    delimiter = '\t';
  } else if (firstLine.includes(',')) {
    delimiter = ',';
  } else if (firstLine.includes(';')) {
    delimiter = ';';
  } else {
    delimiter = /\s+/; // 공백 분할 Fallback
  }

  const parsedRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let cols = [];
    
    if (delimiter instanceof RegExp) {
      cols = line.split(delimiter);
    } else {
      cols = line.split(delimiter).map(c => c.trim().replace(/^["']|["']$/g, ''));
    }

    if (cols.length < 2) continue;

    // 헤더 행 건너뛰기
    const isHeader = cols.some(col => 
      ['성명', '이름', '방송일', '시작시간', '종료시간', '업무상세', '총 지급액', '지급액', '금액'].includes(col.replace(/\s+/g, ''))
    );
    if (isHeader) continue;

    // 열 순서: 성명, 방송일, 시작시간, 종료시간, 업무상세, 총지급액
    const name = cols[0] || '미지정';
    const date = cols[1] || '';
    const startTime = cols[2] || '';
    const endTime = cols[3] || '';
    const detail = cols[4] || '';
    
    // 금액 숫자로 추출
    let rawAmountStr = cols[5] || '0';
    // 만약 컬럼 수가 적거나 다른 위치에 금액이 있을 수 있으므로 숫자형 필드 탐색
    if (isNaN(parseInt(rawAmountStr.replace(/[^0-9]/g, ''), 10)) && cols.length > 2) {
      const numCol = cols.find((c, idx) => idx > 0 && /[\d,]+/.test(c) && !c.includes('-') && !c.includes(':'));
      if (numCol) rawAmountStr = numCol;
    }

    const amount = parseInt(rawAmountStr.replace(/[^0-9]/g, ''), 10) || 0;
    const tax = Math.floor(amount * 0.033); // 3.3% 원단위 절사
    const netAmount = amount - tax;

    parsedRows.push({
      id: `item-${i}-${Math.random().toString(36).substr(2, 5)}`,
      name,
      date,
      month: date.slice(0, 7) || defaultPaymentDate.slice(0, 7), // YYYY-MM
      detail,
      amount,
      tax,
      netAmount
    });
  }

  if (parsedRows.length === 0) return [];

  // 성명별 그룹핑 여부에 따른 결과 생성
  if (!groupByRecipient) {
    // 단일 명세서 (전체 통합)
    const totalAmount = parsedRows.reduce((sum, r) => sum + r.amount, 0);
    const totalTax = parsedRows.reduce((sum, r) => sum + r.tax, 0);
    const totalNet = totalAmount - totalTax;

    return [{
      id: `STMT-${Date.now().toString(36)}`,
      paymentDate: defaultPaymentDate,
      recipientName: parsedRows[0]?.name || '쇼호스트',
      company: {
        name: '라이진',
        bizNo: '821-29-01197',
        ceo: '채이준',
        email: 'choijun@ryzincorp.com'
      },
      items: parsedRows,
      totals: {
        amount: totalAmount,
        tax: totalTax,
        netAmount: totalNet
      }
    }];
  }

  // 성명 + 월(YYYY-MM) 조합으로 그룹화
  // → 장서연이 6월에 3건 → 명세서 1장, 7월에 2건 → 명세서 1장 (별도)
  const grouped = {};
  parsedRows.forEach(row => {
    const key = `${row.name}__${row.month}`; // 이름+월 복합키
    if (!grouped[key]) {
      grouped[key] = { name: row.name, month: row.month, items: [] };
    }
    grouped[key].items.push(row);
  });

  const statements = Object.values(grouped).map((group, idx) => {
    const { name: recipientName, month, items } = group;
    const totalAmount = items.reduce((sum, r) => sum + r.amount, 0);
    const totalTax    = items.reduce((sum, r) => sum + r.tax, 0);
    const totalNet    = totalAmount - totalTax;

    // 지급일 우선순위: 옵션 paymentDate > 해당 월 말일
    const paymentDate = defaultPaymentDate;

    return {
      id: `STMT-${Date.now().toString(36)}-${idx}`,
      paymentDate,
      month,           // YYYY-MM (표시용)
      recipientName,
      company: {
        name: '라이진',
        bizNo: '821-29-01197',
        ceo: '채이준',
        email: 'choijun@ryzincorp.com'
      },
      items,
      totals: { amount: totalAmount, tax: totalTax, netAmount: totalNet }
    };
  });

  // 월 오름차순 → 같은 월 내 이름 가나다순
  statements.sort((a, b) => {
    if (a.month !== b.month) return a.month.localeCompare(b.month);
    return a.recipientName.localeCompare(b.recipientName, 'ko');
  });

  return statements;
}

/**
 * 명세서 데이터를 URL 파라미터용 압축된 Base64 문자열로 인코딩 (URL 길이 대폭 단축)
 */
export function encodePayslipData(data) {
  try {
    // 단축 스키마: n(이름), b(생년월일), ph(전화번호), p(지급일), i([[방송일, 브랜드, 금액], ...])
    const compact = {
      n: data.recipientName || '',
      b: data.birthDate || '',
      ph: data.phone || '',
      p: data.paymentDate || '',
      i: (data.items || []).map(item => [
        item.date || '',
        item.detail || '',
        item.amount || 0
      ])
    };
    const jsonStr = JSON.stringify(compact);
    const base64 = btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode('0x' + p1);
    }));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    console.error('Payslip encode error:', e);
    return '';
  }
}

/**
 * URL 파라미ter의 Base64 문자열을 명세서 데이터 객체로 디코딩 (구버전/신버전 모두 지원)
 */
export function decodePayslipData(encodedStr) {
  if (!encodedStr) return null;
  try {
    let base64 = encodedStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }

    const jsonStr = decodeURIComponent(Array.prototype.map.call(atob(base64), c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const parsed = JSON.parse(jsonStr);

    // 단축 스키마(n, p, i)인 경우 표준 객체 구조로 복원
    if (parsed && (parsed.n !== undefined || parsed.i !== undefined)) {
      const recipientName = parsed.n || '쇼호스트';
      const birthDate = parsed.b || '';
      const phone = parsed.ph || '';
      const paymentDate = parsed.p || '';
      const items = (parsed.i || []).map(row => {
        const date = row[0] || '';
        const detail = row[1] || '';
        const amount = typeof row[2] === 'number' ? row[2] : (parseInt(row[2], 10) || 0);
        const tax = Math.floor(amount * 0.033);
        const netAmount = amount - tax;
        return { name: recipientName, date, detail, amount, tax, netAmount };
      });
      const totalAmount = items.reduce((s, it) => s + it.amount, 0);
      const totalTax = items.reduce((s, it) => s + it.tax, 0);
      const totalNet = totalAmount - totalTax;

      return {
        paymentDate,
        recipientName,
        birthDate,
        phone,
        company: { name: '라이진', bizNo: '821-29-01197', ceo: '채이준', email: 'choijun@ryzincorp.com' },
        items,
        totals: { amount: totalAmount, tax: totalTax, netAmount: totalNet }
      };
    }

    return parsed;
  } catch (e) {
    console.error('Payslip decode error:', e);
    return null;
  }
}
