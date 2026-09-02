// 장바구니 로직 (live.js 추가용)

let cartItems = [];
const floatingCartBtn = document.getElementById('floating-cart-btn');
const cartBadge = document.getElementById('cart-badge');
const cartModal = document.getElementById('cart-modal');
const btnCloseCartModal = document.getElementById('btn-close-cart-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const btnCheckout = document.getElementById('btn-checkout');

const checkoutModal = document.getElementById('checkout-modal');
const btnCloseCheckoutModal = document.getElementById('btn-close-checkout-modal');
const btnSubmitPayment = document.getElementById('btn-submit-payment');

function updateCartUI() {
  if (cartItems.length > 0) {
    floatingCartBtn.style.display = 'flex';
    cartBadge.textContent = cartItems.length;
  } else {
    floatingCartBtn.style.display = 'none';
    if (cartModal.style.display !== 'none') {
      cartModal.style.display = 'none';
    }
  }
}

function addToCart(product) {
  // 동일 상품 존재 시 건너뛰거나 수량 증가 가능(여기선 중복 허용하거나 알림 처리)
  const exists = cartItems.find(item => item.name === product.name);
  if (exists) {
    alert('이미 장바구니에 있는 상품입니다.');
    return;
  }
  cartItems.push(product);
  updateCartUI();
  
  // 간단한 토스트 메시지
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed; bottom:100px; right:20px; background:rgba(0,0,0,0.8); color:#fff; padding:12px 20px; border-radius:8px; font-size:14px; z-index:99999; animation: fadeOut 2s forwards;';
  toast.innerHTML = '장바구니에 담겼습니다.';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function openCartModal() {
  cartModal.style.display = 'flex';
  renderCartItems();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cartItems.forEach((item, index) => {
    let price = 0;
    if (item.price) price = Number(item.price.toString().replace(/[^0-9]/g, ''));
    total += price;

    const div = document.createElement('div');
    div.style.cssText = 'display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid #f1f5f9;';
    div.innerHTML = `
      <img src="${item.image}" alt="product" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
      <div style="flex:1;">
        <div style="font-size:14px; font-weight:600; color:#0f172a; margin-bottom:4px; word-break:keep-all;">${item.name}</div>
        <div style="font-size:14px; font-weight:700; color:#e11d48;">${price.toLocaleString()}원</div>
      </div>
      <button class="btn-remove-cart" data-index="${index}" style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;">✕</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotalPrice.textContent = `${total.toLocaleString()}원`;

  cartItemsContainer.querySelectorAll('.btn-remove-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.dataset.index;
      cartItems.splice(idx, 1);
      updateCartUI();
      renderCartItems();
    });
  });
}

if (floatingCartBtn) floatingCartBtn.addEventListener('click', openCartModal);
if (btnCloseCartModal) btnCloseCartModal.addEventListener('click', () => cartModal.style.display = 'none');

if (btnCheckout) {
  btnCheckout.addEventListener('click', () => {
    if (cartItems.length === 0) return;
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'flex';
  });
}

if (btnCloseCheckoutModal) btnCloseCheckoutModal.addEventListener('click', () => checkoutModal.style.display = 'none');

if (btnSubmitPayment) {
  btnSubmitPayment.addEventListener('click', async () => {
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();

    if (!name || !phone || !address) {
      alert('주문 정보를 모두 입력해 주세요.');
      return;
    }

    let total = 0;
    cartItems.forEach(item => {
      if (item.price) total += Number(item.price.toString().replace(/[^0-9]/g, ''));
    });

    if (total === 0) {
      alert('결제 금액이 0원입니다.');
      return;
    }

    // PortOne 결제 호출
    const { IMP } = window;
    // 임의의 식별코드 (사용자가 별도 요청 안함 -> 테스트 모드)
    IMP.init('imp87201657'); // 포트원 공용 테스트 키 (또는 발급받은 키)

    const merchant_uid = 'order_' + new Date().getTime();

    IMP.request_pay({
      pg: 'html5_inicis', // 테스트용 나이스나 이니시스
      pay_method: 'card',
      merchant_uid: merchant_uid,
      name: cartItems.length > 1 ? `${cartItems[0].name} 외 ${cartItems.length - 1}건` : cartItems[0].name,
      amount: total,
      buyer_name: name,
      buyer_tel: phone,
      buyer_addr: address,
    }, async (rsp) => {
      if (rsp.success) {
        // 결제 성공 시 Supabase 저장
        if (db) {
          try {
            await db.from('live_orders').insert({
              live_id: LIVE_ID || 'live01',
              customer_name: name,
              customer_phone: phone,
              customer_address: address,
              total_amount: total,
              items: cartItems,
              payment_status: 'paid',
              pg_provider: 'portone',
              pg_receipt_id: rsp.imp_uid
            });
          } catch(e) {
            console.error('주문 정보 저장 실패', e);
          }
        }
        alert('결제가 완료되었습니다!');
        cartItems = [];
        updateCartUI();
        checkoutModal.style.display = 'none';
      } else {
        alert('결제에 실패하였습니다. 에러 내용: ' + rsp.error_msg);
      }
    });
  });
}
