// ===== RYZIN SHOP 유저 / 장바구니 / 배송지 통합 DB 연동 스토어 =====
const SB_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SB_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';
const SB_H = {
  'Content-Type': 'application/json',
  'apikey': SB_KEY,
  'Authorization': `Bearer ${SB_KEY}`,
  'Prefer': 'return=representation'
};

const DEFAULT_USER_CODE = 'USER-CHAEJUN';

export function getCurrentUserCode() {
  try {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('ryzin_user_code');
      if (stored) return stored;
      const kakaoUser = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null');
      if (kakaoUser && kakaoUser.user_code) return kakaoUser.user_code;
      if (kakaoUser && kakaoUser.id) return `KAKAO-${kakaoUser.id}`;
    }
  } catch(e) {}
  return DEFAULT_USER_CODE;
}

// Supabase API Helper
async function sbFetch(endpoint, method = 'GET', body = null) {
  try {
    const opts = { method, headers: SB_H };
    if (body) opts.body = JSON.stringify(body);
    const r = await fetch(`${SB_URL}/rest/v1/${endpoint}`, opts);
    if (!r.ok) return null;
    return r.json();
  } catch(e) {
    return null;
  }
}

// 1. 유저 정보 (User Profile)
export async function getUserProfile() {
  const userCode = getCurrentUserCode();
  const users = await sbFetch(`shop_users?user_code=eq.${userCode}`);
  if (users && users.length) return users[0];
  
  // 폴백 유저 데이터
  return {
    user_code: userCode,
    name: '채이준',
    email: 'chaejun@ryzin.com',
    points: 2500,
    coupons_count: 3,
    membership_active: true,
    default_address: '경기도 하남시 미사강변동로 파라곤스퀘어 100-1 2064-2'
  };
}

// 2. 장바구니 (Cart Operations)
export async function getCartItems() {
  const userCode = getCurrentUserCode();
  const items = await sbFetch(`shop_cart?user_code=eq.${userCode}&order=created_at.asc`);
  if (items) return items;
  return [];
}

export async function addCartItem(product) {
  const userCode = getCurrentUserCode();
  const payload = {
    user_code: userCode,
    product_id: product.id || product.product_code || 'PROD-000',
    brand_name: product.brand_name || 'RYZIN',
    product_name: product.product_title || product.brand_title || '상품',
    price: parseInt(String(product.sale_price).replace(/[^0-9]/g, '')) || 10000,
    origin_price: parseInt(String(product.origin_price).replace(/[^0-9]/g, '')) || 0,
    qty: product.qty || 1,
    img_url: product.img_url || '',
    selected: true
  };
  return await sbFetch('shop_cart', 'POST', payload);
}

export async function updateCartQty(cartId, newQty) {
  if (String(cartId).startsWith('cart-fallback')) return;
  return await sbFetch(`shop_cart?id=eq.${cartId}`, 'PATCH', { qty: newQty });
}

export async function toggleCartSelect(cartId, selected) {
  if (String(cartId).startsWith('cart-fallback')) return;
  return await sbFetch(`shop_cart?id=eq.${cartId}`, 'PATCH', { selected });
}

export async function toggleAllCartSelect(selected) {
  const userCode = getCurrentUserCode();
  return await sbFetch(`shop_cart?user_code=eq.${userCode}`, 'PATCH', { selected });
}

export async function deleteCartItem(cartId) {
  if (String(cartId).startsWith('cart-fallback')) return true;
  return await sbFetch(`shop_cart?id=eq.${cartId}`, 'DELETE');
}

export async function deleteSelectedCartItems(selectedIds) {
  if (!selectedIds || !selectedIds.length) return true;
  for (const id of selectedIds) {
    await deleteCartItem(id);
  }
  return true;
}

export async function clearAllCartItems() {
  const userCode = getCurrentUserCode();
  return await sbFetch(`shop_cart?user_code=eq.${userCode}`, 'DELETE');
}

// 3. 배송지 관리 (Address Operations)
export async function getAddresses() {
  const userCode = getCurrentUserCode();
  const addrs = await sbFetch(`shop_addresses?user_code=eq.${userCode}&order=is_default.desc`);
  if (addrs && addrs.length) return addrs;

  return [
    {
      id: 'addr-fallback-1',
      title: '우리집 (기본배송지)',
      recipient: '채이준',
      phone: '010-8229-0119',
      address: '경기도 하남시 미사강변동로 파라곤스퀘어 100-1 2064-2',
      is_default: true
    }
  ];
}

export async function addAddress(title, recipient, phone, address) {
  const userCode = getCurrentUserCode();
  const payload = {
    user_code: userCode,
    title,
    recipient,
    phone,
    address,
    is_default: false
  };
  return await sbFetch('shop_addresses', 'POST', payload);
}

// 4. 회원 탈퇴 및 계정 영구 삭제 (Apple App Store Guideline 5.1.1 준수)
export async function withdrawUserAccount(reason = '기타') {
  const userCode = getCurrentUserCode();

  // 1) 장바구니 데이터 삭제
  try {
    await sbFetch(`shop_cart?user_code=eq.${userCode}`, 'DELETE');
  } catch(e) {}

  // 2) 등록된 배송지 데이터 삭제
  try {
    await sbFetch(`shop_addresses?user_code=eq.${userCode}`, 'DELETE');
  } catch(e) {}

  // 3) 회원 프로필 DB 삭제
  try {
    await sbFetch(`shop_users?user_code=eq.${userCode}`, 'DELETE');
  } catch(e) {}

  // 4) 카카오 로그인 연동 해제 시도
  try {
    if (typeof window !== 'undefined' && window.Kakao && window.Kakao.Auth && window.Kakao.Auth.getAccessToken()) {
      window.Kakao.API.request({ url: '/v1/user/unlink' }).catch(() => {});
      window.Kakao.Auth.logout();
    }
  } catch(e) {}

  // 5) 브라우저 로컬 스토리지 & 세션 스토리지 완전 초기화
  try {
    if (typeof localStorage !== 'undefined') {
      const keys = [
        'ryzin_kakao_user', 'ryzin_nickname', 'ryzin_user_code', 'ryzin_user_email',
        'ryzin_saved_order_info', 'ryzin_live_cart_items', 'ryzin_user_points',
        'ryzin_user_coupons', 'ryzin_chat_nickname', 'ryzin_live_userid',
        'ryzin_live_username', 'ryzin_chat_user'
      ];
      keys.forEach(k => localStorage.removeItem(k));
    }
  } catch(e) {}

  // 6) 장바구니 뱃지 갱신
  await updateGlobalCartBadge();

  return { success: true };
}

// 5. 로그아웃
export async function logoutUser() {
  try {
    if (typeof window !== 'undefined' && window.Kakao && window.Kakao.Auth && window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout();
    }
  } catch(e) {}

  try {
    if (typeof localStorage !== 'undefined') {
      const keys = [
        'ryzin_kakao_user', 'ryzin_nickname', 'ryzin_user_code', 'ryzin_user_email',
        'ryzin_saved_order_info', 'ryzin_live_cart_items', 'ryzin_chat_nickname',
        'ryzin_live_userid', 'ryzin_live_username', 'ryzin_chat_user'
      ];
      keys.forEach(k => localStorage.removeItem(k));
    }
  } catch(e) {}

  await updateGlobalCartBadge();
  return { success: true };
}

// 6. 전역 장바구니 뱃지 수량 실시간 동기화 (0개일 경우 숨김, 1개 이상일 경우 숫자 표기)
export async function updateGlobalCartBadge() {
  const items = await getCartItems();
  const totalCount = items ? items.length : 0;
  
  const badgeElements = document.querySelectorAll('.nav-badge-count, .hdr-badge-count');
  badgeElements.forEach(el => {
    if (totalCount <= 0) {
      el.style.display = 'none';
    } else {
      el.style.display = 'flex';
      el.textContent = totalCount;
    }
  });

  return totalCount;
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateGlobalCartBadge);
  } else {
    updateGlobalCartBadge();
  }
}
