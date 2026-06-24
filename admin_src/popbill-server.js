import express from 'express';
import cors from 'cors';
import popbill from 'popbill';

const app = express();
app.use(cors());
app.use(express.json());

function getKakaoService(linkID, secretKey) {
  popbill.config({
    LinkID: linkID,
    SecretKey: secretKey,
    IsTest: false,
    defaultErrorHandler: function(Error) {
      console.error('Popbill SDK Error:', Error);
    }
  });
  return popbill.KakaoService();
}

app.post('/api/popbill/send', (req, res) => {
  console.log('--- [Popbill Proxy] Incoming Request ---');
  let { linkId, secretKey, senderNumber, payload } = req.body;

  // Fallback to user provided keys if not present in request
  if (!linkId) linkId = 'LAIJIN';
  if (!secretKey) secretKey = 'FK6DDbCLyBZaZhWURbaxuCgldc4B6NTwtoVYtVJc59M=';
  if (!senderNumber || senderNumber === '010-0000-0000') senderNumber = '01032900746'; // Fallback to a valid sender number format

  console.log('LinkId:', linkId);
  console.log('SenderNumber:', senderNumber);
  console.log('Payload:', JSON.stringify(payload));

  if (!linkId || !secretKey) {
    console.error('Missing LinkID or SecretKey');
    return res.status(400).json({ success: false, message: 'LinkID 또는 SecretKey가 누락되었습니다.' });
  }

  const kakaoService = getKakaoService(linkId, secretKey);
  const sender = senderNumber.replace(/[^0-9]/g, '');

  let messages = [];
  try {
    messages = payload.receivers.map(r => ({
      rcv: r.number.replace(/[^0-9]/g, ''),
      rcvnm: r.name,
      msg: payload.content || r.content
    }));
  } catch (err) {
    console.error('Error parsing receivers:', err);
    return res.status(400).json({ success: false, message: '수신자 정보 오류' });
  }

  const templateCode = payload.templateCode || 'TPL_001';
  console.log('Sending message to', messages.length, 'receivers using TemplateCode:', templateCode);

  if (messages.length === 1) {
    kakaoService.sendATS(
      '', 
      templateCode,
      sender,
      '',
      '',
      messages[0].rcv,
      messages[0].rcvnm,
      messages[0].msg,
      '', 
      (receiptNum) => {
        console.log('✅ Success ReceiptNum:', receiptNum);
        res.json({ success: true, receiptNum, message: '발송 완료' });
      },
      (err) => {
        console.error('❌ Popbill API Error:', err);
        res.status(500).json({ success: false, message: err.message, code: err.code });
      }
    );
  } else {
    kakaoService.sendATS_multi(
      '',
      templateCode,
      sender,
      '',
      '',
      messages,
      '',
      (receiptNum) => {
        console.log('✅ Success Multi ReceiptNum:', receiptNum);
        res.json({ success: true, receiptNum, message: '발송 완료' });
      },
      (err) => {
        console.error('❌ Popbill API Multi Error:', err);
        res.status(500).json({ success: false, message: err.message, code: err.code });
      }
    );
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ 팝빌 API 전용 백엔드 프록시 서버가 포트 ${PORT}에서 실행 중입니다.`);
});
