const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const oldProductLogic = `  const productsList = document.getElementById('products-list');
  products.forEach(p => {
    const el = document.createElement('a');
    el.href = "#"; // 실제 링크로 대체 가능
    el.className = 'product-card';
    el.innerHTML = \`
      <img src="\${p.image}" alt="product" class="product-image">
      <div class="product-name">\${p.name}</div>
      <div class="product-price">\${p.price}</div>
    \`;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      alert('상품 구매 페이지로 이동합니다: ' + p.name);
    });
    productsList.appendChild(el);
  });`;

const newProductLogic = `  const modalProductsList = document.getElementById('modal-products-list');
  products.forEach(p => {
    const el = document.createElement('a');
    el.href = "#"; // 실제 링크로 대체 가능
    el.className = 'product-card';
    el.innerHTML = \`
      <img src="\${p.image}" alt="product" class="product-image">
      <div class="product-info">
        <div class="product-name">\${p.name}</div>
        <div class="product-price">\${p.price}</div>
      </div>
    \`;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      alert('상품 구매 페이지로 이동합니다: ' + p.name);
    });
    modalProductsList.appendChild(el);
  });

  // 모달 제어 로직
  const btnShop = document.getElementById('btn-shop');
  const productModal = document.getElementById('product-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');

  btnShop.addEventListener('click', () => {
    productModal.classList.remove('hidden');
  });

  btnCloseModal.addEventListener('click', () => {
    productModal.classList.add('hidden');
  });`;

content = content.replace(oldProductLogic, newProductLogic);
fs.writeFileSync(file, content);
