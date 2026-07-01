const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let content = fs.readFileSync(file, 'utf8');

const productsSectionRegex = /\/\* 상품 리스트.*?\*\/\s*\.products-section[\s\S]*?\.product-price\s*\{[\s\S]*?\}/;

const modalStyles = `/* 상품 모달 */
.product-modal {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: #fff;
  border-radius: 20px 20px 0 0;
  color: #333;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-out;
  transform: translateY(0);
  pointer-events: auto;
  z-index: 10;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
}

.product-modal.hidden {
  transform: translateY(100%);
}

.modal-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  font-size: 16px;
  font-weight: bold;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-card {
  display: flex;
  gap: 12px;
  text-decoration: none;
  color: #333;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #e50914;
}

.btn-shop {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  color: white;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  cursor: pointer;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  font-weight: bold;
}
`;

content = content.replace(productsSectionRegex, modalStyles);
fs.writeFileSync(file, content);
