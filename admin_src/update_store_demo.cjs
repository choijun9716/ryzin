const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let content = fs.readFileSync(file, 'utf8');

// Update STORAGE_KEY usage and constructor
const constructorTarget = `const STORAGE_KEY = 'livecommerce_erp_data';
const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';
const SECRET_SALT = 'ryzin_super_secret_salt_2026';

class DataStore {
  constructor() {
    this._data = {
      users: [], currentUser: null,
      hosts: [], brands: [], projects: [], tasks: [], liveHosts: [], contracts: [],
      products: [], designs: [], results: [], finances: [], currentRole: 'admin',
    };
    this._listeners = {};
    this._sheetDBReady = false;
    this._load();
  }`;

const constructorReplace = `const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';
const SECRET_SALT = 'ryzin_super_secret_salt_2026';

class DataStore {
  constructor() {
    this.isDemoMode = localStorage.getItem('ryzin_is_demo_mode') === 'true';
    this.STORAGE_KEY = this.isDemoMode ? 'livecommerce_erp_demo_data' : 'livecommerce_erp_data';

    this._data = {
      users: [], currentUser: null,
      hosts: [], brands: [], projects: [], tasks: [], liveHosts: [], contracts: [],
      products: [], designs: [], results: [], finances: [], currentRole: 'admin',
    };
    this._listeners = {};
    this._sheetDBReady = false;
    this._load();
  }`;

content = content.replace(constructorTarget, constructorReplace);

// Replace all usages of STORAGE_KEY with this.STORAGE_KEY
content = content.replace(/localStorage\.getItem\(STORAGE_KEY\)/g, "localStorage.getItem(this.STORAGE_KEY)");
content = content.replace(/localStorage\.setItem\(STORAGE_KEY/g, "localStorage.setItem(this.STORAGE_KEY");
content = content.replace(/localStorage\.removeItem\(STORAGE_KEY\)/g, "localStorage.removeItem(this.STORAGE_KEY)");

// Prevent SheetDB Sync in demo mode
content = content.replace("async init() {", `async init() {
    if (this.isDemoMode) {
      if (this._data.users.length === 0) {
        this._data.users = [{ id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('admin').toString(), role: 'admin' }];
        this._save();
      }
      return true; // 데모 모드일 경우 시트 동기화 스킵
    }`);

content = content.replace("_syncToSheetDB(collection, action, payload) {", `_syncToSheetDB(collection, action, payload) {
    if (this.isDemoMode) return; // 데모 모드에서는 외부 연동 차단`);

// Add toggleDemoMode method
const toggleMethodTarget = `  resetAll() {`;
const toggleMethodReplace = `  toggleDemoMode(enable) {
    localStorage.setItem('ryzin_is_demo_mode', enable ? 'true' : 'false');
    if (enable) {
      // Initialize demo data if empty
      if (!localStorage.getItem('livecommerce_erp_demo_data')) {
         const emptyData = {
           users: [{ id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('admin').toString(), role: 'admin' }], 
           currentUser: null, hosts: [], brands: [], projects: [], tasks: [], liveHosts: [], contracts: [],
           products: [], designs: [], results: [], finances: [], currentRole: 'admin'
         };
         localStorage.setItem('livecommerce_erp_demo_data', JSON.stringify(emptyData));
      }
    }
    window.location.href = '/'; // Reload completely
  }

  resetAll() {`;

content = content.replace(toggleMethodTarget, toggleMethodReplace);

fs.writeFileSync(file, content);
