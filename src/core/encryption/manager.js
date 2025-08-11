import CryptoJS from 'crypto-js';

const ITERATIONS = 10000;
const KEY_SIZE = 256 / 32;

export const encryptionManager = {
  // Derive a key from a password and salt
  deriveKey(password, salt) {
    return CryptoJS.PBKDF2(password, salt, {
      keySize: KEY_SIZE,
      iterations: ITERATIONS
    }).toString();
  },

  encrypt(content, key) {
    if (!content) return '';
    return CryptoJS.AES.encrypt(content, key).toString();
  },

  decrypt(ciphertext, key) {
    if (!ciphertext) return '';
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.error('Decryption failed:', e);
      return null;
    }
  }
};
