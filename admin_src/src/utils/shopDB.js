// ===== Supabase 쇼핑몰 DB 헬퍼 =====
const SUPABASE_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation',
};

async function dbFetch(table, params = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, { headers });
  if (!res.ok) throw new Error(`DB fetch error: ${res.status}`);
  return res.json();
}

async function dbInsert(table, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST', headers, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`DB insert error: ${res.status}`);
  return res.json();
}

async function dbUpdate(table, id, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH', headers, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`DB update error: ${res.status}`);
  return res.json();
}

async function dbDelete(table, id) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'DELETE', headers,
  });
  if (!res.ok) throw new Error(`DB delete error: ${res.status}`);
  return true;
}

// ── 배너 ──
export const bannerDB = {
  getAll: () => dbFetch('shop_banners', 'select=*&order=sort_order.asc'),
  insert: (d) => dbInsert('shop_banners', d),
  update: (id, d) => dbUpdate('shop_banners', id, d),
  delete: (id) => dbDelete('shop_banners', id),
};

// ── 섹션 ──
export const sectionDB = {
  getAll: () => dbFetch('shop_sections', 'select=*&order=sort_order.asc'),
  insert: (d) => dbInsert('shop_sections', d),
  update: (id, d) => dbUpdate('shop_sections', id, d),
  delete: (id) => dbDelete('shop_sections', id),
};

// ── 퀵메뉴 ──
export const menuDB = {
  getAll: () => dbFetch('shop_menus', 'select=*&order=sort_order.asc'),
  insert: (d) => dbInsert('shop_menus', d),
  update: (id, d) => dbUpdate('shop_menus', id, d),
  delete: (id) => dbDelete('shop_menus', id),
};

// ── 상품 ──
export const productDB = {
  getAll: () => dbFetch('shop_products', 'select=*&order=sort_order.asc'),
  getBySectionId: (sid) => dbFetch('shop_products', `select=*&section_id=eq.${sid}&order=sort_order.asc`),
  insert: (d) => dbInsert('shop_products', d),
  update: (id, d) => dbUpdate('shop_products', id, d),
  delete: (id) => dbDelete('shop_products', id),
};

// ── 라이브 ──
export const liveDB = {
  getAll: () => dbFetch('shop_lives', 'select=*&order=sort_order.asc'),
  insert: (d) => dbInsert('shop_lives', d),
  update: (id, d) => dbUpdate('shop_lives', id, d),
  delete: (id) => dbDelete('shop_lives', id),
};
