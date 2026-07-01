const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/crm.js';
let content = fs.readFileSync(file, 'utf8');

const targetEvent = `    container.querySelector('#btn-add-client').addEventListener('click', () => openClientModal());`;
const newEvent = `    container.querySelector('#btn-add-client').addEventListener('click', () => openClientModal());
    
    // CSV 대량 등록
    container.querySelector('#btn-csv-upload').addEventListener('click', () => {
      if(confirm('CSV 파일로 대량의 고객 정보를 등록하시겠습니까?\\n\\n[양식 텍스트]\\n회사명,담당자명,연락처,이메일,관심서비스,유입경로,메모\\n\\n* 확인을 누르시면 빈 양식이 다운로드되고, 파일 선택창이 열립니다.')) {
        // 다운로드 템플릿
        const csvContent = "\\uFEFF회사명,담당자명,연락처,이메일,관심서비스,유입경로,메모\\n예시회사,홍길동,010-1234-5678,test@example.com,라이브방송,검색,메모내용";
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "CRM_고객대량등록_양식.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 파일 선택창 열기
        container.querySelector('#csv-file-input').click();
      }
    });

    container.querySelector('#csv-file-input').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(event) {
        const text = event.target.result;
        const lines = text.split('\\n').filter(line => line.trim() !== '');
        if (lines.length <= 1) {
          alert('데이터가 없습니다.');
          return;
        }

        const newClients = [];
        const today = new Date().toISOString().split('T')[0];
        
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
          if (!cols[0]) continue; // 회사명이 없으면 스킵
          
          newClients.push({
            id: 'crm_' + Date.now() + '_' + i,
            companyName: cols[0] || '',
            contactName: cols[1] || '',
            phone: cols[2] || '',
            email: cols[3] || '',
            interestedService: cols[4] || '',
            source: cols[5] || '',
            memo: cols[6] || '',
            status: 'lead',
            category: '기타',
            lastContactDate: today,
            createdAt: today
          });
        }

        if (newClients.length > 0) {
          if (confirm(\`총 \${newClients.length}건의 데이터를 등록하시겠습니까?\`)) {
            store.createBulk('crmClients', newClients);
            alert('성공적으로 등록되었습니다.');
            renderCRM(); // 화면 새로고침
          }
        }
        e.target.value = ''; // 초기화
      };
      reader.readAsText(file, 'utf-8'); // 한글 깨짐 방지용인데, 엑셀 저장은 EUC-KR일 수 있음. 일단 UTF-8
    });
`;

content = content.replace(targetEvent, newEvent);
fs.writeFileSync(file, content);
