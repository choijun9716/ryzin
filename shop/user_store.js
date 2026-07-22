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
  const users = await sbFetch(`shop_users?user_code=eq.${DEFAULT_USER_CODE}`);
  if (users && users.length) return users[0];
  
  // 폴백 유저 데이터
  return {
    user_code: DEFAULT_USER_CODE,
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
  const items = await sbFetch(`shop_cart?user_code=eq.${DEFAULT_USER_CODE}&order=created_at.asc`);
  if (items && items.length) return items;

  // DB에 없을 경우 기본 폴백 장바구니 데이터 2종 반환
  return [
    {
      id: 'cart-fallback-1',
      user_code: DEFAULT_USER_CODE,
      product_id: 'PROD-1001',
      brand_name: '코코팜 네이처바이',
      product_name: '알로에 에센스 마스크팩 100매 기획세트',
      price: 10000,
      origin_price: 50000,
      qty: 1,
      img_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=85',
      selected: true
    },
    {
      id: 'cart-fallback-2',
      user_code: DEFAULT_USER_CODE,
      product_id: 'PROD-1002',
      brand_name: '필링빈',
      product_name: '페이셜 커피스크럽 클렌저 60g',
      price: 3990,
      origin_price: 9900,
      qty: 1,
      img_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=85',
      selected: true
    }
  ];
}

export async function addCartItem(product) {
  const payload = {
    user_code: DEFAULT_USER_CODE,
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
  return await sbFetch(`shop_cart?user_code=eq.${DEFAULT_USER_CODE}`, 'PATCH', { selected });
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

// 3. 배송지 관리 (Address Operations)
export async function getAddresses() {
  const addrs = await sbFetch(`shop_addresses?user_code=eq.${DEFAULT_USER_CODE}&order=is_default.desc`);
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
  const payload = {
    user_code: DEFAULT_USER_CODE,
    title,
    recipient,
    phone,
    address,
    is_default: false
  };
  return await sbFetch('shop_addresses', 'POST', payload);
}
