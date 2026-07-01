document.addEventListener('DOMContentLoaded', () => {
  // 1. 비디오 HLS 스트리밍 설정
  const video = document.getElementById('live-video');
  const m3u8Url = 'https://ib3fjwlmgu0bwksrq8ao15010.edge.naverncp.com/live/video/ls-20260701130603-WkL1g/1080p-16-9/playlist.m3u8';

  if (Hls.isSupported()) {
    const hls = new Hls({
      // 옵션: 실시간 라이브에 맞게 튜닝 가능
      lowLatencyMode: true
    });
    hls.loadSource(m3u8Url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play().catch(e => console.warn("자동 재생이 브라우저 정책에 의해 차단되었습니다.", e));
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari 등 네이티브 지원 브라우저
    video.src = m3u8Url;
    video.addEventListener('loadedmetadata', function () {
      video.play().catch(e => console.warn("자동 재생 차단됨", e));
    });
  }

  // 2. 더미 상품 리스트 렌더링
  const products = [
    {
      id: 1,
      name: "[특가] 트루쿡 인덕션 프라이팬 3종 세트",
      price: "49,900원",
      image: "https://images.unsplash.com/photo-1584990347449-a6e81cb8860a?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 2,
      name: "네티컬 딥 클렌징 앰플 기획세트",
      price: "24,000원",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 3,
      name: "탐루미 수분폭탄 마스크팩 10매",
      price: "12,900원",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];

  const productsList = document.getElementById('products-list');
  products.forEach(p => {
    const el = document.createElement('a');
    el.href = "#"; // 실제 링크로 대체 가능
    el.className = 'product-card';
    el.innerHTML = `
      <img src="${p.image}" alt="product" class="product-image">
      <div class="product-name">${p.name}</div>
      <div class="product-price">${p.price}</div>
    `;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      alert('상품 구매 페이지로 이동합니다: ' + p.name);
    });
    productsList.appendChild(el);
  });

  // 3. 채팅 로직 (더미)
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');

  const botNames = ['라이즌팬', '쇼핑왕', '득템요정', '오늘만산다', '트루쿡매니아', '김지현', '박민수', '이서연'];
  const botMsgs = ['대박이네요', '어머 이건 사야해', '배송 언제 오나요?', '품절되기 전에 결제했습니다', '컬러 고민되네요', '할인율 미쳤다', '진행자님 예뻐요!'];

  function addMessage(name, text, isMe = false) {
    const el = document.createElement('div');
    el.className = 'chat-msg' + (isMe ? ' me' : '');
    el.innerHTML = `
      <span class="chat-name">${name}</span>
      <span class="chat-text">${text}</span>
    `;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 사용자 메시지 전송
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage('나(사용자)', text, true);
    chatInput.value = '';
    
    // 챗봇 자동 응답 (재미 요소)
    setTimeout(() => {
      if(text.includes('안녕')) addMessage('관리자', '안녕하세요! 환영합니다 ❤️');
      else if(text.includes('얼마')) addMessage('관리자', '하단의 상품 리스트를 클릭하시면 가격 확인이 가능합니다!');
    }, 1000);
  }

  btnSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // 주기적으로 다른 사람들의 채팅이 올라오는 것처럼 연출
  setInterval(() => {
    // 30% 확률로 봇 채팅
    if (Math.random() < 0.3) {
      const rName = botNames[Math.floor(Math.random() * botNames.length)];
      const rMsg = botMsgs[Math.floor(Math.random() * botMsgs.length)];
      addMessage(rName, rMsg);
    }
  }, 2000);

  // 4. 좋아요 버튼 연출
  const btnLike = document.getElementById('btn-like');
  const likeCountEl = document.getElementById('like-count');
  let likeCount = 12040;

  // 주기적으로 좋아요 증가
  setInterval(() => {
    likeCount += Math.floor(Math.random() * 5);
    likeCountEl.textContent = (likeCount / 1000).toFixed(1) + 'K';
  }, 3000);

  btnLike.addEventListener('click', () => {
    likeCount += 1;
    likeCountEl.textContent = (likeCount / 1000).toFixed(1) + 'K';
    
    // 하트 이펙트
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = btnLike.getBoundingClientRect().left + 10 + 'px';
    heart.style.top = btnLike.getBoundingClientRect().top - 20 + 'px';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 1s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
  });
});

// 하트 애니메이션 키프레임 (JS로 동적 추가)
const style = document.createElement('style');
style.innerHTML = `
@keyframes floatUp {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
}
`;
document.head.appendChild(style);
