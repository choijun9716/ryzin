// api/admin/crypto_util.js
// 개인정보보호법 준수: 주민등록번호(SSN) AES-256-GCM 양방향 암호화/복호화 모듈

const crypto = require('crypto');

/**
 * 주민등록번호 AES-256-GCM 암호화
 * @param {string} plainText - 원본 주민등록번호 (예: 950317-1411525)
 * @param {string} secretKey - 암호화 마스터 키
 * @returns {string} enc:v1:IV:TAG:CIPHERTEXT
 */
function encryptSSN(plainText, secretKey) {
  if (!plainText || typeof plainText !== 'string') return plainText;
  const trimmed = plainText.trim();
  if (!trimmed || trimmed.startsWith('enc:v1:')) return trimmed;

  try {
    const key = crypto.createHash('sha256').update(secretKey).digest();
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    let encrypted = cipher.update(trimmed, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');

    return `enc:v1:${iv.toString('hex')}:${tag}:${encrypted}`;
  } catch (err) {
    console.error('[SSN Encrypt Error]:', err.message);
    return trimmed;
  }
}

/**
 * 주민등록번호 AES-256-GCM 복호화
 * @param {string} cipherText - 암호화된 문자열
 * @param {string} secretKey - 복호화 마스터 키
 * @returns {string} 복호화된 평문 주민등록번호
 */
function decryptSSN(cipherText, secretKey) {
  if (!cipherText || typeof cipherText !== 'string') return cipherText;
  const trimmed = cipherText.trim();
  if (!trimmed.startsWith('enc:v1:')) return trimmed;

  try {
    const parts = trimmed.split(':');
    if (parts.length !== 5) return trimmed;

    const iv = Buffer.from(parts[2], 'hex');
    const tag = Buffer.from(parts[3], 'hex');
    const encryptedHex = parts[4];

    const key = crypto.createHash('sha256').update(secretKey).digest();
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (err) {
    console.error('[SSN Decrypt Error]:', err.message);
    return '******-*******';
  }
}

/**
 * 주민등록번호 마스킹 (생년월일 6자리만 노출, 뒤 7자리 별표)
 * @param {string} ssn 
 * @returns {string} 예: 950317-*******
 */
function maskSSN(ssn) {
  if (!ssn || typeof ssn !== 'string') return '-';
  const clean = ssn.replace(/[^0-9]/g, '');
  if (clean.length >= 6) {
    return `${clean.slice(0, 6)}-*******`;
  }
  return '******-*******';
}

module.exports = {
  encryptSSN,
  decryptSSN,
  maskSSN,
};
