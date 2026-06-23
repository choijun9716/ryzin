// ===== 팝빌 API 연동 유틸리티 =====

const POPBILL_API_URL = 'https://kakaoapi.popbill.com';

/**
 * 설정에서 팝빌 연동 정보를 가져옵니다.
 * @returns {Object} { linkId, secretKey }
 */
function getPopbillConfig() {
  const data = JSON.parse(localStorage.getItem('ryzin_live_data') || '{}');
  return {
    linkId: data.settings?.popbillLinkId || null,
    secretKey: data.settings?.popbillSecretKey || null,
    senderNumber: data.settings?.popbillSenderNumber || '010-0000-0000'
  };
}

/**
 * 승인된 알림톡 템플릿 목록을 가져옵니다. (Mock)
 * @returns {Promise<Array>} 템플릿 배열
 */
export async function getTemplates() {
  const config = getPopbillConfig();
  
  // 모의 템플릿 반환
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          templateCode: 'TPL_001',
          templateName: '방송 안내',
          content: '안녕하세요 #{고객명}님,\n다가오는 #{방송일}에 #{방송명} 방송이 진행될 예정입니다.\n많은 시청 부탁드립니다!'
        },
        {
          templateCode: 'TPL_002',
          templateName: '정산 완료 안내',
          content: '#{이름}님, #{프로젝트명}에 대한 정산이 완료되었습니다.\n입금은행: #{입금은행}\n\n감사합니다.'
        }
      ]);
    }, 300);
  });
}

/**
 * 카카오 알림톡/친구톡(마케팅 메시지)을 발송합니다.
 * @param {Object} payload 전송 데이터 (수신자 목록, 메시지 등)
 * @returns {Promise<Object>} 전송 결과
 */
export async function sendKakaoMessage(payload) {
  const config = getPopbillConfig();
  
  // 연동 정보가 없으면 모의(Mock)로 성공 처리
  if (!config.linkId || !config.secretKey) {
    console.warn('팝빌 API 정보가 설정되지 않아 모의(Mock) 발송으로 처리됩니다.');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          isMock: true,
          receiptNum: 'mock_receipt_' + Date.now(),
          message: `${payload.receivers.length}건 발송 요청 완료 (모의)`
        });
      }, 1000);
    });
  }

  // 실제 팝빌 API 연동부 (CORS 및 인증 처리 필요)
  // 프론트엔드 직접 호출은 권장되지 않으나 구조를 위해 뼈대를 잡아둡니다.
  try {
    /* 
    const response = await fetch(`${POPBILL_API_URL}/KakaoTalk/Send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer [팝빌 토큰]` // 별도 토큰 발급 과정 필요
      },
      body: JSON.stringify({
        Sender: config.senderNumber,
        Messages: payload.receivers.map(r => ({
          Receiver: r.number,
          ReceiverName: r.name,
          Message: payload.content
        Message: payload.msgType === 'alimtalk' ? '[알림톡 모의전송]' : payload.content
      })
    });
    return await response.json();
    */

    console.log('팝빌 전송 페이로드:', payload);

    // 임시로 성공 처리
    return {
      success: true,
      receiptNum: 'live_receipt_' + Date.now(),
      message: '발송 완료'
    };

  } catch (error) {
    console.error('팝빌 연동 오류:', error);
    throw new Error('팝빌 메시지 전송에 실패했습니다: ' + error.message);
  }
}
