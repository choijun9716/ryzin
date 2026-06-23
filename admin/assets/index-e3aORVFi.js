var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=new class{constructor(){this._routes={},this._currentRoute=null,this._container=null,this._beforeHooks=[],window.addEventListener(`popstate`,()=>this._handleRoute())}register(e,t){return this._routes[e]=t,this}beforeEach(e){return this._beforeHooks.push(e),this}setContainer(e){return this._container=e,this}navigate(e,t=!1){if(e===this._currentRoute)return;let n=e;n.startsWith(`/admin`)||(n=`/admin`+(n===`/`?``:n),n===`/admin`&&(n=`/admin/`)),t?history.replaceState(null,``,n):history.pushState(null,``,n),this._handleRoute()}getCurrentPath(){let e=window.location.pathname||`/`;return e.startsWith(`/admin`)&&(e=e.slice(6)),e.startsWith(`/`)||(e=`/`+e),e}_handleRoute(){let e=this.getCurrentPath();this._currentRoute=e;let t=null,n={};for(let[r,i]of Object.entries(this._routes)){let a=this._matchRoute(r,e);if(a){t=i,n=a.params;break}}for(let t of this._beforeHooks){let n=t(e);if(n===!1)return;if(typeof n==`string`){this.navigate(n,!0);return}}if(!t){this.navigate(`/`,!0);return}if(this._updateSidebarActive(e),this._container){this._container.innerHTML=``;let e=t(n);typeof e==`string`?this._container.innerHTML=e:e instanceof HTMLElement&&this._container.appendChild(e)}}_matchRoute(e,t){let n=e.split(`/`).filter(Boolean),r=t.split(`/`).filter(Boolean);if(n.length!==r.length)return null;let i={};for(let e=0;e<n.length;e++)if(n[e].startsWith(`:`))i[n[e].substring(1)]=decodeURIComponent(r[e]);else if(n[e]!==r[e])return null;return{params:i}}_updateSidebarActive(e){document.querySelectorAll(`.sidebar-item`).forEach(t=>{t.classList.remove(`active`);let n=t.getAttribute(`data-href`);(n===`/`&&e===`/`||n!==`/`&&e.startsWith(n))&&t.classList.add(`active`)})}start(){this._handleRoute()}},u=[{key:`new`,label:`신규등록`,color:`blue`},{key:`scheduled`,label:`일정부킹`,color:`indigo`},{key:`pd_assigned`,label:`PD배정`,color:`purple`},{key:`product_reg`,label:`상품등록`,color:`pink`},{key:`host_cast`,label:`쇼호스트섭외`,color:`rose`},{key:`design`,label:`디자인진행`,color:`orange`},{key:`cue_sheet`,label:`큐시트작성`,color:`yellow`},{key:`standby`,label:`방송대기`,color:`teal`},{key:`on_air`,label:`온에어`,color:`red`},{key:`done`,label:`방송종료`,color:`gray`}],d=[{key:`wait`,label:`대기`,color:`orange`},{key:`done`,label:`완료`,color:`green`}],f=[`네이버`,`쿠팡`,`카카오`,`11번가`,`롯데ON`,`그립`,`SSG`,`기타`],p=[`뷰티`,`패션`,`식품`,`가전`,`생활`,`건강`,`유아`,`반려동물`,`기타`],m=[{key:`main`,label:`메인 쇼호스트`},{key:`sub`,label:`서브 쇼호스트`},{key:`guest`,label:`게스트`}],h=[{key:`requested`,label:`요청`},{key:`working`,label:`작업중`},{key:`reviewing`,label:`검수중`},{key:`done`,label:`완료`}],g=[`일정 부킹`,`PD 배정`,`상품 등록`,`쇼호스트 섭외`,`디자인 요청`,`배너 제작`,`큐시트 작성`,`리허설`,`방송 진행`,`매출 입력`,`정산 완료`],_={admin:{label:`대표`,permissions:[`*`]},pd:{label:`PD`,permissions:[`dashboard`,`projects`,`products`,`hosts`,`brands`,`marketing`]},designer:{label:`디자이너`,permissions:[`dashboard`,`projects.design`]},accountant:{label:`회계`,permissions:[`dashboard`,`finance`,`settlement`,`projects.finance`]}},v=[`국민은행`,`신한은행`,`우리은행`,`하나은행`,`IBK기업은행`,`NH농협은행`,`카카오뱅크`,`토스뱅크`,`SC제일은행`,`대구은행`,`부산은행`,`광주은행`,`전북은행`,`경남은행`,`제주은행`,`수협은행`,`새마을금고`,`신협`,`우체국`];function y(e=``){let t=Date.now().toString(36),n=Math.random().toString(36).substr(2,5);return e?`${e}_${t}${n}`:`${t}${n}`}function b(e){let t=u.find(t=>t.key===e);return t?t.label:e}function x(e){let t=d.find(t=>t.key===e);return t?t.label:e}function S(e){let t=u.find(t=>t.label===e);return t?t.key:`done`}function C(e){let t=d.find(t=>t.label===e);return t?t.key:`wait`}var ee=`livecommerce_erp_data`,w=`https://sheetdb.io/api/v1/3k5vdph36v8ej`,T=new class{constructor(){this._data={users:[],currentUser:null,hosts:[],brands:[],projects:[],tasks:[],liveHosts:[],contracts:[],products:[],designs:[],results:[],finances:[],currentRole:`admin`},this._listeners={},this._sheetDBReady=!1,this._load()}_load(){try{let e=localStorage.getItem(ee);e&&(this._data={...this._data,...JSON.parse(e)})}catch(e){console.warn(`데이터 로드 실패:`,e)}}_save(){try{localStorage.setItem(ee,JSON.stringify(this._data))}catch(e){console.warn(`데이터 저장 실패:`,e)}}async init(){try{let[e,t,n,r]=await Promise.all([fetch(`${w}?sheet=%EC%82%AC%EC%9A%A9%EC%9E%90`).catch(()=>null),fetch(`${w}?sheet=%EC%87%BC%ED%98%B8%EC%8A%A4%ED%8A%B8`).catch(()=>null),fetch(`${w}?sheet=%EB%B8%8C%EB%9E%9C%EB%93%9C`).catch(()=>null),fetch(`${w}?sheet=%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%B0%A9%EC%86%A1`).catch(()=>null)]),i=e&&e.ok?await e.json():[],a=t&&t.ok?await t.json():[],o=n&&n.ok?await n.json():[],s=r&&r.ok?await r.json():[];return(i.length||a.length||o.length||s.length)&&(this._parseSheetData(i,a,o,s),this._sheetDBReady=!0),!0}catch(e){return console.error(`SheetDB 연동 실패:`,e),!1}}_parseNum(e){return e&&parseInt(e.toString().replace(/,/g,``),10)||0}_parseSheetData(e,t,n,r){let i=[],a=[],o=[],s=[],c=[],l=[],u=[],d=1,f=Array.isArray(e)?e:[],p=Array.isArray(t)?t:[],m=Array.isArray(n)?n:[],h=Array.isArray(r)?r:[];f.forEach(e=>{e.아이디&&i.push({id:e.아이디,password:e.비밀번호||``,name:e.이름||``,role:e.권한||`pd`})}),p.forEach(e=>{e.이름&&a.push({id:`h_`+e.이름,name:e.이름,phone:e.전화번호||``,ssn:e.주민번호||``,bank:e.은행명||``,account:e.계좌번호||``,accountHolder:e.예금주||``,address:e.주소||``,memo:{features:e.메모||``,strengths:``,weaknesses:``,style:``,brandPreference:``,caution:``,comment:``},createdAt:`2025-01-01`})}),m.forEach(e=>{e.브랜드명&&o.push({id:`b_`+e.브랜드명,name:e.브랜드명,category:e.카테고리||``,taxInvoice:e.세금계산서여부===`O`||e.세금계산서===`완료`,manager:e.담당자명||``,phone:e.연락처||``,email:e.이메일||``,businessNo:e.사업자번호||``,address:e.주소||``,memo:e.메모||``,createdAt:`2025-01-01`})}),h.forEach(e=>{if(!e.방송ID)return;let t=e.방송ID,n=`b_`+e.브랜드명;s.push({id:t,brandId:n,brandName:e.브랜드명||``,category:e.카테고리||``,broadcastMonth:e.진행월||``,broadcastDate:e.방송일||``,broadcastTime:e.방송시간||``,platform:e.플랫폼||``,liveUrl:e.라이브URL||``,pd:e.담당PD||``,designer:e.담당디자이너||``,broadcastStatus:S(e.진행상태),settleStatus:C(e.정산상태),note:e.집행결과||``,createdAt:e.방송일||`2025-01-01`}),e.쇼호스트A&&c.push({id:`lh`+ d++,liveId:t,hostId:`h_`+e.쇼호스트A,role:`main`,fee:this._parseNum(e.진행금액A),settleStatus:C(e.정산상태),memo:``}),e.쇼호스트B&&c.push({id:`lh`+ d++,liveId:t,hostId:`h_`+e.쇼호스트B,role:`guest`,fee:this._parseNum(e.진행금액B),settleStatus:C(e.정산상태),memo:``});let r=this._parseNum(e.라이브매출),i=this._parseNum(e.광고비)+this._parseNum(e.제작비)+this._parseNum(e.진행금액A)+this._parseNum(e.진행금액B),a=i>0?r/i:0;l.push({id:t,liveId:t,views:this._parseNum(e.시청뷰),likes:0,orders:0,liveRevenue:r,roi:a}),u.push({id:t,liveId:t,adCost:this._parseNum(e.광고비),productionCost:this._parseNum(e.제작비),hostCost:this._parseNum(e.진행금액A)+this._parseNum(e.진행금액B),otherCost:0,salesRevenue:this._parseNum(e.영업매출액),operatingProfit:this._parseNum(e.영업이익),vat:this._parseNum(e.부가세),netMargin:this._parseNum(e.순마진)})}),this._data.users=i,this._data.hosts=a,this._data.brands=o,this._data.projects=s,this._data.liveHosts=c,this._data.results=l,this._data.finances=u,this._save()}async _syncToSheetDB(e,t,n){if(this._sheetDBReady)try{let r=``,i=null,a=`POST`,o=`%EC%82%AC%EC%9A%A9%EC%9E%90`;if(e===`users`){let e={아이디:n.id,비밀번호:n.password,이름:n.name,권한:n.role};r=`?sheet=${o}`,t===`update`&&(a=`PUT`,r=`/아이디/${n.id}?sheet=${o}`),t===`delete`&&(a=`DELETE`,r=`/아이디/${n.id}?sheet=${o}`),i={data:[e]}}else if(e===`hosts`){let e=`%EC%87%BC%ED%98%B8%EC%8A%A4%ED%8A%B8`,o={이름:n.name,전화번호:n.phone,주민번호:n.ssn,은행명:n.bank,계좌번호:n.account,예금주:n.accountHolder,주소:n.address,메모:n.memo.features};r=`?sheet=${e}`,t===`update`&&(a=`PUT`,r=`/이름/${n.name}?sheet=${e}`),t===`delete`&&(a=`DELETE`,r=`/이름/${n.name}?sheet=${e}`),i={data:[o]}}else if(e===`brands`){let e=`%EB%B8%8C%EB%9E%9C%EB%93%9C`,o={브랜드명:n.name,카테고리:n.category,세금계산서:n.taxInvoice?`완료`:``,담당자명:n.manager,연락처:n.phone,이메일:n.email,사업자번호:n.businessNo,주소:n.address,메모:n.memo};r=`?sheet=${e}`,t===`update`&&(a=`PUT`,r=`/브랜드명/${n.name}?sheet=${e}`),t===`delete`&&(a=`DELETE`,r=`/브랜드명/${n.name}?sheet=${e}`),i={data:[o]}}else if([`projects`,`results`,`finances`,`liveHosts`].includes(e)){let o=`%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%B0%A9%EC%86%A1`,s=n.liveId||n.id,c=this.getById(`projects`,s);if(!c&&t!==`delete`)return;let l=c?this.getById(`brands`,c.brandId):null,u=this.getById(`results`,s)||{},d=this.getById(`finances`,s)||{},f=this.query(`liveHosts`,e=>e.liveId===s),p=f[0]?this.getById(`hosts`,f[0].hostId):null,m=f[1]?this.getById(`hosts`,f[1].hostId):null,h=c?c.broadcastStatus:`new`,g=c?c.settleStatus:`wait`,_=b(h),v=x(g),y={방송ID:s,진행상태:_,브랜드명:c?c.brandName||(l?l.name:``):``,카테고리:c?c.category:``,진행월:c?c.broadcastMonth:``,방송일:c?c.broadcastDate:``,방송시간:c?c.broadcastTime:``,플랫폼:c?c.platform:``,라이브URL:c?c.liveUrl:``,담당PD:c?c.pd:``,담당디자이너:c?c.designer:``,시청뷰:u.views||0,라이브매출:u.liveRevenue||0,쇼호스트A:p?p.name:``,진행금액A:f[0]&&f[0].fee||0,쇼호스트B:m?m.name:``,진행금액B:f[1]&&f[1].fee||0,정산상태:v,광고비:d.adCost||0,제작비:d.productionCost||0,영업매출액:d.salesRevenue||0,영업이익:d.operatingProfit||0,순마진:d.netMargin||0,집행결과:c?c.note:``};if(t===`delete`&&e===`projects`)a=`DELETE`,r=`/방송ID/${s}?sheet=${o}`,i=null;else{let e=await fetch(`${w}/방송ID/${s}?sheet=${o}`,{method:`PUT`,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify({data:[y]})});if(e.ok&&(await e.json()).updated>0)return;a=`POST`,r=`?sheet=${o}`,i={data:[y]}}}i?await fetch(`${w}${r}`,{method:a,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify(i)}):a===`DELETE`&&await fetch(`${w}${r}`,{method:`DELETE`,headers:{Accept:`application/json`}})}catch(e){console.error(`SheetDB 동기화 에러:`,e)}}on(e,t){return this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t),()=>{this._listeners[e]=this._listeners[e].filter(e=>e!==t)}}_emit(e,t){this._listeners[e]&&this._listeners[e].forEach(e=>e(t)),this._listeners.change&&this._listeners.change.forEach(n=>n({event:e,data:t}))}getAll(e){return[...this._data[e]||[]]}getById(e,t){return(this._data[e]||[]).find(e=>e.id===t)||null}query(e,t){return(this._data[e]||[]).filter(t)}create(e,t){return this._data[e]||(this._data[e]=[]),this._data[e].push(t),this._save(),this._emit(`${e}:created`,t),this._emit(`${e}:changed`),this._syncToSheetDB(e,`create`,t),t}update(e,t,n){let r=this._data[e]||[],i=r.findIndex(e=>e.id===t);return i===-1?null:(r[i]={...r[i],...n,updatedAt:new Date().toISOString()},this._save(),this._emit(`${e}:updated`,r[i]),this._emit(`${e}:changed`),this._syncToSheetDB(e,`update`,r[i]),r[i])}delete(e,t){let n=this._data[e]||[],r=n.findIndex(e=>e.id===t);if(r===-1)return!1;let i=n.splice(r,1)[0];return this._save(),this._emit(`${e}:deleted`,i),this._emit(`${e}:changed`),this._syncToSheetDB(e,`delete`,i),!0}getHostStats(e){let t=this.query(`liveHosts`,t=>t.hostId===e),n=t.map(e=>e.liveId),r=this.getAll(`projects`).filter(e=>n.includes(e.id)),i=this.getAll(`results`).filter(e=>n.includes(e.liveId)),a=r.length,o=new Date,s=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,`0`)}`,c=r.filter(e=>e.broadcastMonth===s).length,l=t.filter(e=>e.settleStatus===`done`).reduce((e,t)=>e+(t.fee||0),0),u=i.reduce((e,t)=>e+(t.liveRevenue||0),0),d=a>0?u/a:0,f=this.getAll(`finances`).filter(e=>n.includes(e.liveId)).reduce((e,t)=>e+(t.adCost||0)+(t.productionCost||0)+(t.hostCost||0)+(t.otherCost||0),0),p=f>0?u/f:0,m=r.filter(e=>e.broadcastDate).sort((e,t)=>t.broadcastDate.localeCompare(e.broadcastDate))[0];return{totalBroadcasts:a,monthBroadcasts:c,totalSettlement:l,avgRevenue:d,avgROI:p,lastBroadcastDate:m?m.broadcastDate:null}}getBrandStats(e){let t=this.getById(`brands`,e),n=this.query(`projects`,n=>n.brandId===e||t&&n.brandName===t.name),r=n.map(e=>e.id),i=this.getAll(`results`).filter(e=>r.includes(e.liveId)),a=this.getAll(`finances`).filter(e=>r.includes(e.liveId)),o=i.reduce((e,t)=>e+(t.liveRevenue||0),0),s=a.reduce((e,t)=>e+(t.adCost||0)+(t.productionCost||0)+(t.hostCost||0)+(t.otherCost||0),0),c=s>0?o/s:0,l=n.filter(e=>e.broadcastDate).sort((e,t)=>t.broadcastDate.localeCompare(e.broadcastDate))[0];return{totalBroadcasts:n.length,totalRevenue:o,avgROI:c,lastBroadcastDate:l?l.broadcastDate:null}}getDashboardKPI(){let e=this.getAll(`projects`),t=this.getAll(`results`),n=this.getAll(`finances`),r=new Date,i=`${r.getFullYear()}${String(r.getMonth()+1).padStart(2,`0`)}${String(r.getDate()).padStart(2,`0`)}`,a=r.getMonth()+1,o=e.filter(e=>e.broadcastDate&&e.broadcastDate.replace(/[^0-9]/g,``)===i).length,s=e.filter(e=>parseInt(e.broadcastMonth,10)===a),c=s.map(e=>e.id),l=s.length,u=t.filter(e=>c.includes(e.liveId)).reduce((e,t)=>e+(t.liveRevenue||0),0),d=n.filter(e=>c.includes(e.liveId)),f=d.reduce((e,t)=>e+(t.operatingProfit||0),0),p=e.filter(e=>e.settleStatus===`wait`).map(e=>e.id),m=n.filter(e=>p.includes(e.liveId)).reduce((e,t)=>e+(t.salesRevenue||0),0),h=d.reduce((e,t)=>e+(t.adCost||0)+(t.productionCost||0)+(t.hostCost||0)+(t.otherCost||0),0);return{todayBroadcasts:o,monthBroadcasts:l,monthRevenue:u,monthProfit:f,settleWaitAmount:m,monthROI:h>0?u/h:0}}calcProjectFinance(e){let t=this.query(`liveHosts`,t=>t.liveId===e).reduce((e,t)=>e+(t.fee||0),0),n=this.getById(`finances`,e)||{},r=n.adCost||0,i=n.productionCost||0,a=n.otherCost||0,o=n.salesRevenue||0,s=o-r-i-t-a,c=o*.1;return{hostCost:t,adCost:r,productionCost:i,otherCost:a,salesRevenue:o,operatingProfit:s,vat:c,netMargin:s-c}}hasSeedData(){return this._data.projects&&this._data.projects.length>0}getCurrentUser(){return this._data.currentUser||null}getCurrentRole(){return this._data.currentRole||`admin`}setCurrentRole(e){this._data.currentRole=e,this._save(),this._emit(`role:changed`,e)}login(e,t){let n=(this._data.users||[]).find(n=>n.id===e&&n.password===t);return n?(this._data.currentUser=n,this._data.currentRole=n.role,this._save(),this._emit(`auth:login`,n),!0):!1}verifyPassword(e,t){return(this._data.users||[]).find(n=>n.id===e&&n.password===t)||null}completeLogin(e){return e?(this._data.currentUser=e,this._data.currentRole=e.role,this._save(),this._emit(`auth:login`,e),!0):!1}logout(){this._data.currentUser=null,this._data.currentRole=`admin`,this._save(),this._emit(`auth:logout`)}resetAll(){localStorage.removeItem(ee),this._data={users:[],currentUser:null,hosts:[],brands:[],projects:[],tasks:[],liveHosts:[],products:[],designs:[],results:[],finances:[],currentRole:`admin`},this._emit(`data:reset`),this.init()}};function te(){return T.getCurrentRole()}function ne(){let e=te(),t=[{key:`dashboard`,label:`대시보드`},{key:`projects`,label:`라이브 관리`},{key:`hosts`,label:`쇼호스트 관리`},{key:`brands`,label:`브랜드 관리`},{key:`finance`,label:`매출/손익`},{key:`settlement`,label:`정산 관리`},{key:`contracts`,label:`계약 관리`},{key:`marketing`,label:`마케팅 메시지`},{key:`settings`,label:`설정`}];if(e===`admin`)return t;let n=_[e];return n?t.filter(e=>n.permissions.some(t=>!!(t===e.key||t.startsWith(e.key+`.`)))):[]}var re=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAABCCAYAAACijL8SAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAhwSURBVHhe7ZwFyGRVFMd37cJWVMTuTmxdG7tbxBYFsVCxW1HEXURsdO1ODFTUtbC7e1VE7O78/+A9ePuYN+/cO2/um8/vHPjzzXxzbp37nxvnnDcjR7i4BRJaYGTCtrwpt8AIJ5yTIKkFnHBJze2NOeGcA0kt4IRLam5vzAnnHEhqASdcUnN7Y04450BSCzjhkprbG3PCOQeSWsAJl9Tc3pgTzjmQ1AJOuKTm9saccM6BpBZwwiU1tzfmhHMOJLVAmXBzq/U1GujB36rjpwK+1+sPhL861D2X/rdmQJvPSfetAP1cdWu9mMpYbhbpfWnUbVKtOLY5VfEoY+WPSu/jku62ej+Fofxt0vnZoJerTKoXOxj0/5DOjWW9MuGo6HpDZTEqv6nQK8LzwqXCC1klGOVFYRFjpa9LbxmhE3mrqthMH9xprB+1h4R1AvSbUj1UFY3OKttCf283Vgy5binpfq73sxrKXyCdAwx6ucp0evGdQf8H6aA7gaQkXLltvlmHCR8KKwuPCxMbBoIK5c4x6kLoN4R5jfpM8hfCvkb9JtXaINy/GsCGwgPGgQxZwjE+tgG204+EM4UjjIP+UXoLC58Z9E+QzokGPVS+FhYXTh5GhGPcnwhLChx96mRIE47BvS+sIPwqsLUuWjfi7PNr9HfXGl1WNVY3y1mGqnYSOFJcNMwIx9ivEHY32H7IE44xHi+cIqwoPClYt9a1pMuBuUru0AebG4yIyq3CNpnucCQcQ99SwGbd5H9BuK80Qm7IvwinC0cZSfKq9JYTOl0gNtH/7zLWQ/tspZzdkOFKOC4aSwjYo0paI9y96hHbYVGm0ZvZhAWF+Y2TnatxK+MmOZnADRYCWOQQKY0pKU6u99xmrX3YUbo3FOo4X6/3sjTeRYdV2rpS59Vspxc3Z29S3VLLQ7hJ/9i+y7haIxx+LW6aVbKBPrhWmMk4ccUb2vIq85QwiaEs1++FBL6duRynFxz8LcIEM9FNCmMeJ7BaWIXLTbHPbRGO/u4sXFfR8YElHP3dRbjaaPHzpHdgQfdUvT7GWPYq6e2W6bI1vylMaSiLc5eVtEknLxPyoMCXxipnSfHIknKbhPtGfeHL0skLMNCEY3u1uC6w9Vhhj4LR2VrxvHNdtwgREnx5rLocfi3C1sEW0pRMrYruF1YNqLD8RcuLtkk4+nC3sGmHcQw04YgesNpYhBWNrbAoy+rNM4Jla31ZeqyI1otC3VnF0ueiDq4XJikkQnGZ9PcWcL6WpW3C0Z99BKJCRRlowuHuOMk4c3j2L+mgS3nqsQi+PMtWym2UrbTbbczSXq5DfJEIxcYBhTgj4Uf8p6LMIBAOBzs7DI75XAaScKxIXAI4CFsC5gT7OXt92sH4TOazwtIBk1mn2in2WFem6nNuotxwcx+epR7IyUWlWzx4EAjHWB4W1hXyVbg1wl2uThCML8rMerOYsJIwh8XymQ7uEAxcJZAN0kG+XgVy4AZpQiZSJXjo6yIexbbu0xuc0WRTdJNBIRx9PEg4N+tsa4RrYsKog22Q4H2ZvOX6Q7bnqr41vZWGOogfUcc2ysZcZ79BIhxzRIbOO8KQJxw307F11tfnbNNcILhIxEqd7zCk3tFSPjigAH7F9QXyBC2SinBsmWsbOkT/Vxdw7g/J9CTy48jDYmu2CgdYXCW4TEKFQzoOzSYkxEdIeyQlcHu1TFTev1SEw5NAPNqSO3e09IjCWMYxUPlwbC2EpJiIUMH1wYSHCFEIbqWkH/UqxHmJ91qFbBWSDEJvxKkIN2PWv25Ro3ysnDvXywhaN/7WCTdePSQiwA0tz/at63Snz9laWd5DPPlbZe3GtFcsw+G5HLftVud7+pB8P6vzu1hXSsJ9q4a5/OTRmm5jelcfEiuvk9YJh7+JkM8ZAueGXoRznJW0dTdgaz9wgl5sVZYeyaVEP8rPGlirSE246dUxsm94lqIJwYc3bbmiXlLMcQWw0hD+IJQ0KqCXpIeTJh4rM6gg8T6LcJ1nZepFiAlfKeAGsQgrGisbK1yspCYc/SThArdNE9I44co3PgLQhwf09FjpnhagX1RNSTjGydNH1lQjEgFGCZzdepE2CEd/uRTs30vHs7J9JxwTwg0Sf41F8FzjwY7ZXlMRDp8ZZ07rrZjbGy6GlywGqNFpi3AkIBCXtuYSVg2j74SjYbIknggwNuebpQTLwxvFalMQDuLcI1ifh8DA+NmeDhh/N9W2CEefVhNwlViPEJ3GkYRwNMzzkWxDVsGBStw1RPpNuFXUGdKMcHJaBE88qyHunqakTcIxhtAjUnncyQjH43uvCZaUIjqJA3gBoVPgvmry+kk4npHgQWhCOBb5XUqQo6nDdt5m24QjTZ+H1q2p/q0RjoZDY4yhT3/3i3A8oviYYE2LZ6w87UUeXFNCyjs+rLYJx3j48nFEsC4eRRskW+FodHYBl4AlNQn9PwWeSxhvnLV+EQ5XzdnGPvRLDTvgXB0EwjHG2KSJpISjo6HxRmKqexpn0Qk3oaF6+W0RQltEGqqE1Y1nhXlYPUSSEw4vM48RkiNnEZIwyaUjBaZOnHDpCEdLzAvnOeuNnTLJCUejpO9wC7WKNaPDCZeWcLQWetxohXA4TN8W5jEyjngr2b3ccruJEy494fDJjROsvx/YCuEwS8izqegXf+OjinROuPSEo8X5BKIQFv9ka4QjQYDMjpCQFwfUbtkgTrh2CEer+wkXGnYsE+EM9biKWyDeAv6j0vG285IRFnDCRRjNi8RbwAkXbzsvGWEBJ1yE0bxIvAWccPG285IRFnDCRRjNi8RbwAkXbzsvGWEBJ1yE0bxIvAWccPG285IRFnDCRRjNi8RbwAkXbzsvGWEBJ1yE0bxIvAWccPG285IRFvgPwNooYVqDRbQAAAAASUVORK5CYII=`,ie={dashboard:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,projects:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,hosts:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,brands:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,finance:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,marketing:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,settings:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`},ae=[{key:`dashboard`,label:`대시보드`,path:`/`,icon:`dashboard`},{key:`projects`,label:`라이브 관리`,path:`/projects`,icon:`projects`},{key:`hosts`,label:`쇼호스트 관리`,path:`/hosts`,icon:`hosts`},{key:`brands`,label:`브랜드 관리`,path:`/brands`,icon:`brands`},{key:`finance`,label:`매출/손익`,path:`/finance`,icon:`finance`},{key:`settlement`,label:`정산 관리`,path:`/settlement`,icon:`finance`},{key:`contracts`,label:`계약 관리`,path:`/contracts`,icon:`finance`},{key:`marketing`,label:`마케팅 메시지`,path:`/marketing`,icon:`marketing`},{key:`settings`,label:`설정`,path:`/settings`,icon:`settings`}];function oe(){let e=T.getCurrentUser(),t=_[T.getCurrentRole()]?.label||`관리자`,n=e?e.name:t,r=ne().map(e=>e.key),i=document.createElement(`aside`);i.className=`sidebar`,i.id=`sidebar`,i.innerHTML=`
    <div class="sidebar-header" style="padding: var(--space-4) var(--space-4); margin-bottom: var(--space-2);">
      <div style="display: flex; align-items: center; justify-content: flex-start; width: 100%;">
        <img src="${re}" alt="Ryzin Logo" style="height: 32px; object-fit: contain; margin-bottom: 4px; filter: brightness(0) invert(1);" />
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">
        ${ae.filter(e=>r.includes(e.key)).map(e=>`
            <div class="sidebar-item" data-href="${e.path}" id="nav-${e.key}">
              ${ie[e.icon]||``}
              <span>${e.label}</span>
            </div>
          `).join(``)}
      </div>
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="sidebar-user-avatar">${n[0]}</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">${n}</div>
          <div class="sidebar-user-role">${t}</div>
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" id="btn-logout" style="width: 100%; margin-top: var(--space-3);">로그아웃</button>
    </div>
  `,i.querySelectorAll(`.sidebar-item`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-href`);l.navigate(n)})});let a=i.querySelector(`#btn-logout`);return a&&a.addEventListener(`click`,()=>{T.logout(),l.navigate(`/login`)}),i}function E(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(Math.round(e))+`원`}function D(e){return e==null||isNaN(e)?`-`:Math.abs(e)>=1e8?(e/1e8).toFixed(1).replace(/\.0$/,``)+`억`:Math.abs(e)>=1e4?(e/1e4).toFixed(0)+`만`:E(e)}function O(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(e)}function k(e){return e?e.replace(/\./g,`-`):`-`}function A(e){return e==null||isNaN(e)?`-`:e.toFixed(2)}function se(e){return e?e.includes(`*`)?e:e.substring(0,6)+`-*******`:`-`}function j(e){let t=u.find(t=>t.key===e);if(!t)return`<span class="badge badge-default">${e}</span>`;let n=`var(--bg-tertiary)`,r=`var(--text-secondary)`;switch(t.color){case`blue`:n=`#EFF6FF`,r=`#2563EB`;break;case`indigo`:n=`#EEF2FF`,r=`#4F46E5`;break;case`purple`:n=`#FAF5FF`,r=`#9333EA`;break;case`pink`:n=`#FDF2F8`,r=`#DB2777`;break;case`rose`:n=`#FFF1F2`,r=`#E11D48`;break;case`orange`:n=`#FFF7ED`,r=`#EA580C`;break;case`yellow`:n=`#FEFCE8`,r=`#CA8A04`;break;case`teal`:n=`#F0FDFA`,r=`#0D9488`;break;case`red`:n=`#FEF2F2`,r=`#DC2626`;break;case`green`:n=`#ECFDF5`,r=`#059669`;break;case`gray`:n=`#F3F4F6`,r=`#4B5563`;break}return`<span class="badge" style="background:${n}; color:${r};">${t.label}</span>`}function ce(e){let t=d.find(t=>t.key===e);if(!t)return`<span class="badge badge-default">${e}</span>`;let n=`var(--bg-tertiary)`,r=`var(--text-secondary)`;switch(t.color){case`orange`:n=`#FFF7ED`,r=`#EA580C`;break;case`green`:n=`#ECFDF5`,r=`#059669`;break}return`<span class="badge" style="background:${n}; color:${r};">${t.label}</span>`}function le(e){return j(e)}var M=null;function N({title:e,size:t=`md`,content:n,footer:r,onClose:i}){P();let a=document.createElement(`div`);a.className=`modal-overlay`,a.id=`modal-overlay`,a.innerHTML=`
    <div class="modal ${`modal-${t}`}">
      <div class="modal-header">
        <h2 class="modal-title">${e}</h2>
        <button class="modal-close" id="modal-close-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="modal-body" id="modal-body"></div>
      ${r===!1?``:`<div class="modal-footer" id="modal-footer"></div>`}
    </div>
  `,document.body.appendChild(a),document.body.style.overflow=`hidden`;let o=a.querySelector(`#modal-body`);if(typeof n==`string`)o.innerHTML=n;else if(n instanceof HTMLElement)o.appendChild(n);else if(typeof n==`function`){let e=n(o);typeof e==`string`?o.innerHTML=e:e instanceof HTMLElement&&o.appendChild(e)}if(r!==!1){let e=a.querySelector(`#modal-footer`);if(typeof r==`string`)e.innerHTML=r;else if(r instanceof HTMLElement)e.appendChild(r);else if(typeof r==`function`){let t=r(e);typeof t==`string`?e.innerHTML=t:t instanceof HTMLElement&&e.appendChild(t)}}let s=()=>{P(),i&&i()};a.querySelector(`#modal-close-btn`).addEventListener(`click`,s),a.addEventListener(`click`,e=>{e.target===a&&s()});let c=e=>{e.key===`Escape`&&(s(),document.removeEventListener(`keydown`,c))};return document.addEventListener(`keydown`,c),M={overlay:a,escHandler:c},a}function P(){if(M){let{overlay:e,escHandler:t}=M;e.classList.add(`closing`),document.removeEventListener(`keydown`,t),setTimeout(()=>{e.remove(),document.body.style.overflow=``},150),M=null}}function F({title:e=`확인`,message:t,onConfirm:n,confirmText:r=`확인`,cancelText:i=`취소`,danger:a=!1}){let o=document.createElement(`div`);o.innerHTML=`<p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">${t}</p>`;let s=document.createElement(`div`);s.style.display=`flex`,s.style.gap=`var(--space-3)`,s.style.justifyContent=`flex-end`,s.style.width=`100%`;let c=document.createElement(`button`);c.className=`btn btn-secondary`,c.textContent=i,c.addEventListener(`click`,P);let l=document.createElement(`button`);l.className=a?`btn btn-danger`:`btn btn-primary`,l.textContent=r,l.addEventListener(`click`,()=>{P(),n&&n()}),s.appendChild(c),s.appendChild(l),N({title:e,size:`sm`,content:o,footer:s,onClose:null})}var I=null;function ue(){return(!I||!document.body.contains(I))&&(I=document.createElement(`div`),I.className=`toast-container`,I.id=`toast-container`,document.body.appendChild(I)),I}function de(e,t=`info`,n=3e3){let r=ue(),i=document.createElement(`div`);return i.className=`toast toast-${t}`,i.innerHTML=`
    <span class="toast-message">${e}</span>
    <span class="toast-close">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </span>
  `,r.appendChild(i),i.querySelector(`.toast-close`).addEventListener(`click`,()=>fe(i)),n>0&&setTimeout(()=>fe(i),n),i}function fe(e){e.classList.add(`removing`),setTimeout(()=>e.remove(),150)}function L(e){return de(e,`success`)}function R(e){return de(e,`error`)}var z=`in_progress`;function pe(){let e=document.createElement(`div`),t=T.getDashboardKPI(),n=T.getAll(`projects`),r=n;return r=z===`in_progress`?n.filter(e=>![`done`].includes(e.broadcastStatus)):z===`ended`?n.filter(e=>[`done`].includes(e.broadcastStatus)&&e.settleStatus!==`done`):n,e.innerHTML=`
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <h1 class="page-title">대시보드</h1>
          <p class="page-description">라이브커머스 운영 현황 요약</p>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="dashboard-kpi-grid" id="kpi-grid">
        ${B(`오늘 예정 방송`,O(t.todayBroadcasts)+`건`)}
        ${B(`이번달 방송 수`,O(t.monthBroadcasts)+`건`)}
        ${B(`이번달 매출`,D(t.monthRevenue))}
        ${B(`이번달 영업이익`,D(t.monthProfit))}
        ${B(`이번달 ROI`,A(t.monthROI))}
        ${B(`정산 대기`,D(t.settleWaitAmount))}
      </div>

      <div class="section-header">
        <div>
          <h2 class="section-title">라이브 프로젝트</h2>
          <p class="section-subtitle">상태별 프로젝트 모아보기</p>
        </div>
        <div style="display: flex; gap: var(--space-3); align-items: center;">
          <select id="dashboard-filter" class="input" style="padding: 6px 12px; width: auto; font-size: 14px;">
            <option value="in_progress" ${z===`in_progress`?`selected`:``}>진행 중 (기본)</option>
            <option value="ended" ${z===`ended`?`selected`:``}>방송 종료</option>
            <option value="all" ${z===`all`?`selected`:``}>전체 보기</option>
          </select>
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
        </div>
      </div>

      <div class="project-grid" id="project-grid">
        ${r.length>0?r.sort((e,t)=>(e.broadcastDate||``).localeCompare(t.broadcastDate||``)).map(e=>me(e)).join(``):he()}
      </div>
    </div>
  `,setTimeout(()=>{e.querySelectorAll(`.project-card`).forEach(e=>{e.addEventListener(`click`,()=>{ge(e.getAttribute(`data-id`))})});let t=e.querySelector(`#btn-new-project`);t&&t.addEventListener(`click`,()=>{l.navigate(`/projects/new`)});let n=e.querySelector(`#dashboard-filter`);n&&n.addEventListener(`change`,e=>{z=e.target.value;let t=document.getElementById(`page-content`);t&&(t.innerHTML=``,t.appendChild(pe()))})},0),e}function B(e,t){return`
    <div class="kpi-card">
      <div class="kpi-label">${e}</div>
      <div class="kpi-value">${t}</div>
    </div>
  `}function me(e){let t=T.getById(`brands`,e.brandId),n=e.brandName||(t?t.name:`-`),r=T.query(`tasks`,t=>t.liveId===e.id),i=r.filter(e=>e.done).length,a=r.length,o=a>0?Math.round(i/a*100):0,s=T.query(`liveHosts`,t=>t.liveId===e.id).map(e=>{let t=T.getById(`hosts`,e.hostId);return t?t.name:`-`}).join(`, `);return`
    <div class="project-card" data-id="${e.id}">
      <div class="project-card-header">
        <div>
          <div class="project-card-header">
            <span class="project-card-brand">${n}</span>
            <div style="display:flex; gap: 4px;">
              ${j(e.broadcastStatus)}
            </div>
          </div>
        </div>
      </div>
      <div class="project-card-meta">
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">방송일</span>
          <span>${k(e.broadcastDate)}</span>
        </div>
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">시간</span>
          <span>${e.broadcastTime||`-`}</span>
        </div>
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">플랫폼</span>
          <span>${e.platform||`-`}</span>
        </div>
        ${s?`
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">쇼호스트</span>
          <span>${s}</span>
        </div>
        `:``}
      </div>
      <div class="project-card-footer">
        <div class="project-card-progress">
          <div class="project-card-progress-text">${o}%</div>
          <div class="progress-bar progress-bar-sm">
            <div class="progress-bar-fill" style="width: ${o}%"></div>
          </div>
        </div>
        <div class="project-card-pd">${e.pd||`-`}</div>
      </div>
    </div>
  `}function he(){return`
    <div class="empty-state" style="grid-column: 1 / -1;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
      <h3>진행중인 프로젝트가 없습니다</h3>
      <p>새 라이브 프로젝트를 등록해 주세요.</p>
    </div>
  `}function ge(e){let t=T.getById(`projects`,e);if(!t)return;let n=T.getById(`brands`,t.brandId),r=t.brandName||(n?n.name:`-`),i=document.createElement(`div`);i.innerHTML=`
    <div style="margin-bottom: var(--space-5);">
      <div style="font-size: var(--text-md); font-weight: var(--weight-semibold); margin-bottom: var(--space-1);">${r}</div>
      <div style="font-size: var(--text-sm); color: var(--text-tertiary);">${k(t.broadcastDate)}</div>
    </div>
    <div style="margin-bottom: var(--space-4);">
      <label style="font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-secondary); display: block; margin-bottom: var(--space-2);">방송 진행 상태 변경</label>
      <div class="status-options" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2);">
        ${u.map(e=>`
          <button class="btn ${t.broadcastStatus===e.key?`btn-primary`:`btn-secondary`} btn-sm status-option" data-status="${e.key}" style="justify-content: flex-start; font-size: 12px;">
            ${e.label}
          </button>
        `).join(``)}
      </div>
    </div>
  `;let a=t.broadcastStatus,o=document.createElement(`div`);o.style.cssText=`display: flex; gap: var(--space-3); justify-content: space-between; width: 100%;`,o.innerHTML=`
    <button class="btn btn-ghost" id="modal-view-detail">상세 보기</button>
    <div style="display: flex; gap: var(--space-3);">
      <button class="btn btn-secondary" id="modal-cancel">취소</button>
      <button class="btn btn-primary" id="modal-save">저장</button>
    </div>
  `,N({title:`프로젝트 상태 변경`,size:`md`,content:i,footer:o}),document.querySelectorAll(`.status-option`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.status-option`).forEach(e=>{e.className=`btn btn-secondary btn-sm status-option`,e.style.justifyContent=`flex-start`,e.style.fontSize=`12px`}),e.className=`btn btn-primary btn-sm status-option`,e.style.justifyContent=`flex-start`,e.style.fontSize=`12px`,a=e.getAttribute(`data-status`)})}),document.getElementById(`modal-cancel`)?.addEventListener(`click`,P),document.getElementById(`modal-view-detail`)?.addEventListener(`click`,()=>{P(),l.navigate(`/projects/${e}`)}),document.getElementById(`modal-save`)?.addEventListener(`click`,()=>{T.update(`projects`,e,{broadcastStatus:a}),P(),L(`방송 상태가 "${b(a)}"(으)로 변경되었습니다.`);let t=document.getElementById(`page-content`);t&&(t.innerHTML=``,t.appendChild(pe()))})}function _e(){let e=document.createElement(`div`),t=``;function n(){let r=T.getAll(`hosts`);if(t){let e=t.toLowerCase();r=r.filter(t=>t.name.toLowerCase().includes(e)||t.phone&&t.phone.includes(e))}let i=r.map(e=>{let t=T.getHostStats(e.id);return{...e,stats:t}});e.innerHTML=`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">쇼호스트 관리</h1>
            <p class="page-description">쇼호스트 정보 및 방송 실적 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <button class="btn btn-primary" id="btn-add-host">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            쇼호스트 등록
          </button>
        </div>
      </div>
      <div class="page-body">
        <div class="table-container">
          <div class="table-toolbar">
            <div class="table-toolbar-left">
              <div class="table-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="이름, 전화번호 검색..." id="host-search" value="${t}">
              </div>
              <span class="table-count">총 <strong>${i.length}</strong>명</span>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>전화번호</th>
                  <th class="text-right">총 방송</th>
                  <th class="text-right">이번달</th>
                  <th class="text-right">누적 정산</th>
                  <th>최근 방송일</th>
                  <th class="text-right">평균 매출</th>
                  <th class="text-right">평균 ROI</th>
                  <th class="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                ${i.length>0?i.map(e=>`
                  <tr class="clickable" data-id="${e.id}">
                    <td><a href="javascript:void(0)" class="host-link" data-id="${e.id}">${e.name}</a></td>
                    <td>${e.phone||`-`}</td>
                    <td class="text-right">${O(e.stats.totalBroadcasts)}회</td>
                    <td class="text-right">${O(e.stats.monthBroadcasts)}회</td>
                    <td class="text-right">${E(e.stats.totalSettlement)}</td>
                    <td>${k(e.stats.lastBroadcastDate)}</td>
                    <td class="text-right">${E(e.stats.avgRevenue)}</td>
                    <td class="text-right">${A(e.stats.avgROI)}</td>
                    <td class="col-actions">
                      <button class="btn btn-ghost btn-icon btn-sm btn-edit-host" data-id="${e.id}" data-tooltip="수정">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                    </td>
                  </tr>
                `).join(``):`
                  <tr><td colspan="9" class="text-center" style="padding: var(--space-10); color: var(--text-tertiary);">등록된 쇼호스트가 없습니다.</td></tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,setTimeout(()=>{e.querySelector(`#host-search`)?.addEventListener(`input`,e=>{t=e.target.value,n();let r=document.getElementById(`host-search`);if(r){r.focus();let e=r.value.length;r.setSelectionRange(e,e)}}),e.querySelector(`#btn-add-host`)?.addEventListener(`click`,()=>{ve()}),e.querySelectorAll(`.host-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),l.navigate(`/hosts/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`.btn-edit-host`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),ve(e.getAttribute(`data-id`))})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>{l.navigate(`/hosts/${e.getAttribute(`data-id`)}`)})})},0)}return n(),T.on(`hosts:changed`,n),e}function ve(e=null){let t=!!e,n=t?T.getById(`hosts`,e):{},r=`
    <div class="form-grid">
      <div class="input-group">
        <label class="required">이름</label>
        <input class="input" id="host-name" value="${n.name||``}" placeholder="이름 입력">
      </div>
      <div class="input-group">
        <label class="required">전화번호</label>
        <input class="input" id="host-phone" value="${n.phone||``}" placeholder="010-0000-0000">
      </div>
      <div class="input-group">
        <label>주민등록번호</label>
        <input class="input" id="host-ssn" value="${n.ssn||``}" placeholder="마스킹 처리됨">
      </div>
      <div class="input-group">
        <label>은행명</label>
        <select class="input" id="host-bank">
          <option value="">선택</option>
          ${v.map(e=>`<option value="${e}" ${n.bank===e?`selected`:``}>${e}</option>`).join(``)}
        </select>
      </div>
      <div class="input-group">
        <label>계좌번호</label>
        <input class="input" id="host-account" value="${n.account||``}" placeholder="계좌번호">
      </div>
      <div class="input-group">
        <label>예금주</label>
        <input class="input" id="host-holder" value="${n.accountHolder||``}" placeholder="예금주">
      </div>
      <div class="input-group full-width">
        <label>주소</label>
        <input class="input" id="host-address" value="${n.address||``}" placeholder="주소">
      </div>
    </div>
  `,i=document.createElement(`div`);if(i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,t){let t=document.createElement(`button`);t.className=`btn btn-danger`,t.textContent=`삭제`,t.style.marginRight=`auto`,t.addEventListener(`click`,()=>{P(),F({title:`쇼호스트 삭제`,message:`"${n.name}" 쇼호스트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`,confirmText:`삭제`,danger:!0,onConfirm:()=>{T.delete(`hosts`,e),L(`쇼호스트가 삭제되었습니다.`)}})}),i.appendChild(t)}let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,P);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=t?`수정`:`등록`,o.addEventListener(`click`,()=>{let n=document.getElementById(`host-name`).value.trim(),r=document.getElementById(`host-phone`).value.trim();if(!n){R(`이름을 입력해주세요.`);return}let i={name:n,phone:r,ssn:document.getElementById(`host-ssn`).value.trim(),bank:document.getElementById(`host-bank`).value,account:document.getElementById(`host-account`).value.trim(),accountHolder:document.getElementById(`host-holder`).value.trim(),address:document.getElementById(`host-address`).value.trim()};t?(T.update(`hosts`,e,i),L(`쇼호스트 정보가 수정되었습니다.`)):(i.id=y(`host`),i.memo={features:``,strengths:``,weaknesses:``,style:``,brandPreference:``,caution:``,comment:``},i.createdAt=new Date().toISOString().split(`T`)[0],T.create(`hosts`,i),L(`쇼호스트가 등록되었습니다.`)),P()}),i.appendChild(a),i.appendChild(o),N({title:t?`쇼호스트 수정`:`쇼호스트 등록`,size:`lg`,content:r,footer:i})}function ye(e){let t=document.createElement(`div`),n=T.getById(`hosts`,e.id);if(!n)return t.innerHTML=`
      <div class="page-header"><div class="page-header-left"><h1 class="page-title">쇼호스트를 찾을 수 없습니다</h1></div></div>
      <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>
    `,setTimeout(()=>{t.querySelector(`#btn-back`)?.addEventListener(`click`,()=>l.navigate(`/hosts`))},0),t;let r=T.getHostStats(n.id),i=n.memo||{},a=T.query(`liveHosts`,e=>e.hostId===n.id).map(e=>{let t=T.getById(`projects`,e.liveId);return{matching:e,project:t,brand:t?T.getById(`brands`,t.brandId):null,result:T.getById(`results`,e.liveId)}}).filter(e=>e.project);return t.innerHTML=`
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <div class="breadcrumb">
            <a href="javascript:void(0)" id="breadcrumb-list">쇼호스트 관리</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${n.name}</span>
          </div>
          <h1 class="page-title" style="margin-top: var(--space-2);">${n.name}</h1>
        </div>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" id="btn-edit-host">수정</button>
      </div>
    </div>
    <div class="page-body">
      <!-- 통계 -->
      <div class="stats-grid" style="margin-bottom: var(--space-6);">
        <div class="stat-card">
          <div class="stat-label">총 방송횟수</div>
          <div class="stat-value">${O(r.totalBroadcasts)}회</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">이번달 방송</div>
          <div class="stat-value">${O(r.monthBroadcasts)}회</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">누적 정산금액</div>
          <div class="stat-value">${E(r.totalSettlement)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">최근 방송일</div>
          <div class="stat-value">${k(r.lastBroadcastDate)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">평균 매출</div>
          <div class="stat-value">${E(r.avgRevenue)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">평균 ROI</div>
          <div class="stat-value">${A(r.avgROI)}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-6);">
        <!-- 기본 정보 -->
        <div class="card">
          <div class="card-header"><h3>기본 정보</h3></div>
          <div class="card-body">
            <div class="detail-grid" style="grid-template-columns: 1fr 1fr;">
              <div class="detail-field">
                <span class="detail-field-label">전화번호</span>
                <span class="detail-field-value">${n.phone||`-`}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">주민등록번호</span>
                <span class="detail-field-value ssn-toggle" data-ssn="${n.ssn||``}" style="cursor: pointer; text-decoration: underline;" title="클릭하여 확인">${n.ssn?se(n.ssn):`-`}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">은행</span>
                <span class="detail-field-value">${n.bank||`-`}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">계좌번호</span>
                <span class="detail-field-value">${n.account||`-`}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">예금주</span>
                <span class="detail-field-value">${n.accountHolder||`-`}</span>
              </div>
              <div class="detail-field" style="grid-column: 1/-1;">
                <span class="detail-field-label">주소</span>
                <span class="detail-field-value">${n.address||`-`}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 메모 -->
        <div class="card">
          <div class="card-header">
            <h3>메모</h3>
            <button class="btn btn-ghost btn-sm" id="btn-edit-memo">수정</button>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: var(--space-3);">
              ${V(`특징`,i.features)}
              ${V(`강점`,i.strengths)}
              ${V(`약점`,i.weaknesses)}
              ${V(`진행 스타일`,i.style)}
              ${V(`브랜드 선호도`,i.brandPreference)}
              ${V(`주의사항`,i.caution)}
              ${V(`기타`,i.comment)}
            </div>
          </div>
        </div>
      </div>

      <!-- 방송 이력 -->
      <div class="card">
        <div class="card-header"><h3>방송 이력</h3></div>
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>방송일</th>
                <th>브랜드</th>
                <th>역할</th>
                <th class="text-right">진행금액</th>
                <th>정산상태</th>
                <th>매출 성과</th>
              </tr>
            </thead>
            <tbody>
              ${a.length>0?a.map(e=>`
                <tr>
                  <td>${k(e.project.broadcastDate)}</td>
                  <td><a href="javascript:void(0)" class="project-link" data-id="${e.project.id}">${e.brand?e.brand.name:`-`}</a></td>
                  <td>${{main:`메인`,sub:`서브`,guest:`게스트`}[e.matching.role]||`-`}</td>
                  <td class="text-right">${E(e.matching.fee)}</td>
                  <td><span class="badge ${e.matching.settleStatus===`done`?`badge-success`:`badge-default`}">${{pending:`대기`,processing:`진행중`,done:`완료`}[e.matching.settleStatus]||`-`}</span></td>
                  <td>${e.result?E(e.result.liveRevenue):`-`}</td>
                </tr>
              `).join(``):`<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">방송 이력이 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{let e=t.querySelector(`.ssn-toggle`);if(e&&e.dataset.ssn){let t=!0;e.addEventListener(`click`,()=>{t=!t,e.textContent=t?se(e.dataset.ssn):e.dataset.ssn})}t.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>l.navigate(`/hosts`)),t.querySelector(`#btn-edit-host`)?.addEventListener(`click`,()=>ve(n.id)),t.querySelector(`#btn-edit-memo`)?.addEventListener(`click`,()=>be(n)),t.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),l.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0),t}function V(e,t){return`
    <div>
      <div style="font-size: var(--text-xs); color: var(--text-tertiary); font-weight: var(--weight-medium); margin-bottom: 2px;">${e}</div>
      <div style="font-size: var(--text-sm); color: var(--text-secondary);">${t||`-`}</div>
    </div>
  `}function be(e){let t=e.memo||{},n=[{key:`features`,label:`특징`},{key:`strengths`,label:`강점`},{key:`weaknesses`,label:`약점`},{key:`style`,label:`진행 스타일`},{key:`brandPreference`,label:`브랜드 선호도`},{key:`caution`,label:`주의사항`},{key:`comment`,label:`기타 코멘트`}],r=`
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      ${n.map(e=>`
        <div class="input-group">
          <label>${e.label}</label>
          <textarea class="input" id="memo-${e.key}" rows="2">${t[e.key]||``}</textarea>
        </div>
      `).join(``)}
    </div>
  `,i=document.createElement(`div`);i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,P);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=`저장`,o.addEventListener(`click`,()=>{let t={};n.forEach(e=>{t[e.key]=document.getElementById(`memo-${e.key}`).value.trim()}),T.update(`hosts`,e.id,{memo:t}),P(),L(`메모가 저장되었습니다.`),l.navigate(`/hosts/${e.id}`)}),i.appendChild(a),i.appendChild(o),N({title:`메모 수정`,size:`lg`,content:r,footer:i})}function xe(){let e=document.createElement(`div`),t=``;function n(){let r=T.getAll(`brands`);if(t){let e=t.toLowerCase();r=r.filter(t=>t.name.toLowerCase().includes(e)||t.manager&&t.manager.toLowerCase().includes(e)||t.category&&t.category.toLowerCase().includes(e))}let i=r.map(e=>{let t=T.getBrandStats(e.id);return{...e,stats:t}});e.innerHTML=`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">브랜드 관리</h1>
            <p class="page-description">브랜드 정보 및 방송 실적 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <button class="btn btn-primary" id="btn-add-brand">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            브랜드 등록
          </button>
        </div>
      </div>
      <div class="page-body">
        <div class="table-container">
          <div class="table-toolbar">
            <div class="table-toolbar-left">
              <div class="table-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="브랜드명, 담당자 검색..." id="brand-search" value="${t}">
              </div>
              <span class="table-count">총 <strong>${i.length}</strong>개</span>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>브랜드명</th>
                  <th>카테고리</th>
                  <th>담당자</th>
                  <th>연락처</th>
                  <th>세금계산서</th>
                  <th class="text-right">총 방송</th>
                  <th class="text-right">누적 매출</th>
                  <th>최근 방송일</th>
                  <th class="text-right">평균 ROI</th>
                  <th class="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                ${i.length>0?i.map(e=>`
                  <tr class="clickable" data-id="${e.id}">
                    <td><a href="javascript:void(0)" class="brand-link" data-id="${e.id}">${e.name}</a></td>
                    <td><span class="badge badge-default">${e.category||`-`}</span></td>
                    <td>${e.manager||`-`}</td>
                    <td>${e.phone||`-`}</td>
                    <td>${e.taxInvoice?`<span class="badge badge-success">발행</span>`:`<span class="badge badge-default">미발행</span>`}</td>
                    <td class="text-right">${O(e.stats.totalBroadcasts)}회</td>
                    <td class="text-right">${E(e.stats.totalRevenue)}</td>
                    <td>${k(e.stats.lastBroadcastDate)}</td>
                    <td class="text-right">${A(e.stats.avgROI)}</td>
                    <td class="col-actions">
                      <button class="btn btn-ghost btn-icon btn-sm btn-edit-brand" data-id="${e.id}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                    </td>
                  </tr>
                `).join(``):`<tr><td colspan="10" class="text-center" style="padding: var(--space-10); color: var(--text-tertiary);">등록된 브랜드가 없습니다.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,setTimeout(()=>{e.querySelector(`#brand-search`)?.addEventListener(`input`,e=>{t=e.target.value,n();let r=document.getElementById(`brand-search`);if(r){r.focus();let e=r.value.length;r.setSelectionRange(e,e)}}),e.querySelector(`#btn-add-brand`)?.addEventListener(`click`,()=>Se()),e.querySelectorAll(`.brand-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),l.navigate(`/brands/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`.btn-edit-brand`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),Se(e.getAttribute(`data-id`))})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>l.navigate(`/brands/${e.getAttribute(`data-id`)}`))})},0)}return n(),T.on(`brands:changed`,n),e}function Se(e=null){let t=!!e,n=t?T.getById(`brands`,e):{},r=`
    <div class="form-grid">
      <div class="input-group">
        <label class="required">브랜드명</label>
        <input class="input" id="brand-name" value="${n.name||``}" placeholder="브랜드명">
      </div>
      <div class="input-group">
        <label>카테고리</label>
        <select class="input" id="brand-category">
          <option value="">선택</option>
          ${p.map(e=>`<option value="${e}" ${n.category===e?`selected`:``}>${e}</option>`).join(``)}
        </select>
      </div>
      <div class="input-group">
        <label>담당자명</label>
        <input class="input" id="brand-manager" value="${n.manager||``}" placeholder="담당자명">
      </div>
      <div class="input-group">
        <label>연락처</label>
        <input class="input" id="brand-phone" value="${n.phone||``}" placeholder="연락처">
      </div>
      <div class="input-group">
        <label>이메일</label>
        <input class="input" id="brand-email" value="${n.email||``}" placeholder="이메일">
      </div>
      <div class="input-group">
        <label>사업자등록번호</label>
        <input class="input" id="brand-biz" value="${n.businessNo||``}" placeholder="000-00-00000">
      </div>
      <div class="input-group">
        <label>세금계산서 발행</label>
        <select class="input" id="brand-tax">
          <option value="true" ${n.taxInvoice?`selected`:``}>발행</option>
          <option value="false" ${n.taxInvoice===!1?`selected`:``}>미발행</option>
        </select>
      </div>
      <div class="input-group">
        <label>주소</label>
        <input class="input" id="brand-address" value="${n.address||``}" placeholder="주소">
      </div>
      <div class="input-group full-width">
        <label>메모</label>
        <textarea class="input" id="brand-memo" rows="3">${n.memo||``}</textarea>
      </div>
    </div>
  `,i=document.createElement(`div`);if(i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,t){let t=document.createElement(`button`);t.className=`btn btn-danger`,t.textContent=`삭제`,t.style.marginRight=`auto`,t.addEventListener(`click`,()=>{P(),F({title:`브랜드 삭제`,message:`"${n.name}" 브랜드를 삭제하시겠습니까?`,confirmText:`삭제`,danger:!0,onConfirm:()=>{T.delete(`brands`,e),L(`브랜드가 삭제되었습니다.`)}})}),i.appendChild(t)}let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,P);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=t?`수정`:`등록`,o.addEventListener(`click`,()=>{let n=document.getElementById(`brand-name`).value.trim();if(!n){R(`브랜드명을 입력해주세요.`);return}let r={name:n,category:document.getElementById(`brand-category`).value,manager:document.getElementById(`brand-manager`).value.trim(),phone:document.getElementById(`brand-phone`).value.trim(),email:document.getElementById(`brand-email`).value.trim(),businessNo:document.getElementById(`brand-biz`).value.trim(),taxInvoice:document.getElementById(`brand-tax`).value===`true`,address:document.getElementById(`brand-address`).value.trim(),memo:document.getElementById(`brand-memo`).value.trim()};t?(T.update(`brands`,e,r),L(`브랜드 정보가 수정되었습니다.`)):(r.id=y(`brand`),r.createdAt=new Date().toISOString().split(`T`)[0],T.create(`brands`,r),L(`브랜드가 등록되었습니다.`)),P()}),i.appendChild(a),i.appendChild(o),N({title:t?`브랜드 수정`:`브랜드 등록`,size:`lg`,content:r,footer:i})}function Ce(e){let t=document.createElement(`div`),n=T.getById(`brands`,e.id);if(!n)return t.innerHTML=`<div class="page-header"><div class="page-header-left"><h1 class="page-title">브랜드를 찾을 수 없습니다</h1></div></div>
    <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>`,setTimeout(()=>{t.querySelector(`#btn-back`)?.addEventListener(`click`,()=>l.navigate(`/brands`))},0),t;let r=T.getBrandStats(n.id),i=T.query(`projects`,e=>e.brandId===n.id||e.brandName===n.name);return t.innerHTML=`
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <div class="breadcrumb">
            <a href="javascript:void(0)" id="breadcrumb-list">브랜드 관리</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${n.name}</span>
          </div>
          <h1 class="page-title" style="margin-top: var(--space-2);">${n.name}</h1>
        </div>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" id="btn-edit-brand">수정</button>
      </div>
    </div>
    <div class="page-body">
      <div class="stats-grid" style="margin-bottom: var(--space-6);">
        <div class="stat-card"><div class="stat-label">총 방송횟수</div><div class="stat-value">${O(r.totalBroadcasts)}회</div></div>
        <div class="stat-card"><div class="stat-label">누적 매출</div><div class="stat-value">${E(r.totalRevenue)}</div></div>
        <div class="stat-card"><div class="stat-label">최근 방송일</div><div class="stat-value">${k(r.lastBroadcastDate)}</div></div>
        <div class="stat-card"><div class="stat-label">평균 ROI</div><div class="stat-value">${A(r.avgROI)}</div></div>
      </div>

      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-header"><h3>기본 정보</h3></div>
        <div class="card-body">
          <div class="detail-grid">
            <div class="detail-field"><span class="detail-field-label">카테고리</span><span class="detail-field-value">${n.category||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">담당자</span><span class="detail-field-value">${n.manager||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">연락처</span><span class="detail-field-value">${n.phone||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">이메일</span><span class="detail-field-value">${n.email||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">사업자등록번호</span><span class="detail-field-value">${n.businessNo||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">세금계산서</span><span class="detail-field-value">${n.taxInvoice?`발행`:`미발행`}</span></div>
            <div class="detail-field"><span class="detail-field-label">주소</span><span class="detail-field-value">${n.address||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">메모</span><span class="detail-field-value">${n.memo||`-`}</span></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><h3>방송 이력</h3></div>
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr><th>진행상태</th><th>방송일</th><th>플랫폼</th><th class="text-right">시청뷰</th><th class="text-right">매출</th><th class="text-right">ROI</th></tr>
            </thead>
            <tbody>
              ${i.length>0?i.map(e=>{let t=T.getProjectResult(e.id);return`
                <tr class="clickable" data-id="${e.id}">
                  <td>${le(e.status)}</td>
                  <td><a href="javascript:void(0)" class="project-link" data-id="${e.id}">${k(e.broadcastDate)||`상세보기`}</a></td>
                  <td>${e.platform||`-`}</td>
                  <td class="text-right">${t?O(t.views):`-`}</td>
                  <td class="text-right">${t?formatCurrencyShort(t.liveRevenue):`-`}</td>
                  <td class="text-right">${t?A(t.roi):`-`}</td>
                </tr>`}).join(``):`<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">방송 이력이 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{t.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>l.navigate(`/brands`)),t.querySelector(`#btn-edit-brand`)?.addEventListener(`click`,()=>Se(n.id)),t.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),l.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0),t}function we(){let e=document.createElement(`div`),t=``,n={status:``,brand:``,platform:``,month:``,category:``,settleStatus:``},r={basic:!0,host:!0,result:!1,finance:!1};function i(){let a=T.getAll(`projects`),o=T.getAll(`brands`);if(T.getAll(`hosts`),t){let e=t.toLowerCase();a=a.filter(t=>{let n=T.getById(`brands`,t.brandId);return n&&n.name.toLowerCase().includes(e)||t.pd&&t.pd.toLowerCase().includes(e)})}n.status&&(a=a.filter(e=>e.broadcastStatus===n.status)),n.brand&&(a=a.filter(e=>e.brandId===n.brand)),n.platform&&(a=a.filter(e=>e.platform===n.platform)),n.month&&(a=a.filter(e=>e.broadcastMonth===n.month||e.broadcastDate&&e.broadcastDate.startsWith(n.month.replace(`-`,`.`))||e.broadcastDate&&e.broadcastDate.startsWith(n.month)?!0:e.broadcastMonth&&e.broadcastMonth.length<=2?parseInt(e.broadcastMonth,10)===parseInt(n.month.split(`-`)[1],10):!1)),n.category&&(a=a.filter(e=>e.category===n.category)),a.sort((e,t)=>(t.broadcastDate||``).localeCompare(e.broadcastDate||``));let s=a.map(e=>{let t=T.getById(`brands`,e.brandId),n=T.query(`liveHosts`,t=>t.liveId===e.id),r=T.getAll(`results`).find(t=>t.liveId===e.id),i=T.getAll(`finances`).find(t=>t.liveId===e.id),a=n[0]?T.getById(`hosts`,n[0].hostId):null,o=n[1]?T.getById(`hosts`,n[1].hostId):null,s=n.reduce((e,t)=>e+(t.fee||0),0),c=n.length>0&&n.every(e=>e.settleStatus===`done`)?`완료`:n.some(e=>e.settleStatus===`done`)?`일부완료`:`대기`;return{...e,brand:t,matchings:n,result:r,finance:i,hostA:a,hostB:o,totalHostFee:s,settleLabel:c,hostAFee:n[0]?.fee||0,hostBFee:n[1]?.fee||0}});[...new Set(T.getAll(`projects`).map(e=>e.broadcastMonth).filter(Boolean))].sort().reverse(),e.innerHTML=`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">라이브 관리</h1>
            <p class="page-description">전체 라이브 방송 프로젝트 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
        </div>
      </div>
      <div class="page-body">
        <!-- 필터바 -->
        <div class="filter-bar">
          <select class="filter-select ${n.status?`active`:``}" id="filter-status">
            <option value="">진행상태</option>
            ${u.map(e=>`<option value="${e.key}" ${n.status===e.key?`selected`:``}>${e.label}</option>`).join(``)}
          </select>
          <select class="filter-select ${n.brand?`active`:``}" id="filter-brand">
            <option value="">브랜드</option>
            ${o.map(e=>`<option value="${e.id}" ${n.brand===e.id?`selected`:``}>${e.name}</option>`).join(``)}
          </select>
          <select class="filter-select ${n.platform?`active`:``}" id="filter-platform">
            <option value="">플랫폼</option>
            ${f.map(e=>`<option value="${e}" ${n.platform===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
          <input type="month" class="filter-select ${n.month?`active`:``}" id="filter-month" value="${n.month||``}" style="width: auto;">
          <select class="filter-select ${n.category?`active`:``}" id="filter-category">
            <option value="">카테고리</option>
            ${p.map(e=>`<option value="${e}" ${n.category===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
          ${Object.values(n).some(e=>e)?`<button class="filter-reset" id="filter-reset">초기화</button>`:``}
        </div>

        <!-- 테이블 -->
        <div class="table-container">
          <div class="table-toolbar">
            <div class="table-toolbar-left" style="display: flex; align-items: center; gap: var(--space-4);">
              <div style="display: flex; align-items: center; gap: var(--space-2);">
                <div class="table-search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" placeholder="브랜드, PD 검색..." id="project-search" value="${t}">
                </div>
                <span class="table-count">총 <strong>${s.length}</strong>건</span>
              </div>
              <div style="display: flex; gap: var(--space-3); align-items: center; font-size: var(--text-sm); margin-left: var(--space-2);">
                <span style="color: var(--text-tertiary); font-weight: var(--weight-medium);">표시 항목:</span>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-basic" ${r.basic?`checked`:``}> 기본정보
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-host" ${r.host?`checked`:``}> 쇼호스트
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-result" ${r.result?`checked`:``}> 성과
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-finance" ${r.finance?`checked`:``}> 정산
                </label>
              </div>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table" id="projects-table">
              <thead>
                <tr>
                  ${r.basic?`
                  <th>방송 상태</th>
                  <th>방송 제목(브랜드)</th>
                  <th>카테고리</th>
                  <th>방송일</th>
                  <th>시간</th>
                  <th>플랫폼</th>
                  `:``}
                  ${r.host?`
                  <th>쇼호스트A</th>
                  <th class="text-right">금액A</th>
                  <th>쇼호스트B</th>
                  <th class="text-right">금액B</th>
                  <th class="text-right">쇼호스트 총액</th>
                  `:``}
                  ${r.result?`
                  <th class="text-right">시청뷰</th>
                  <th class="text-right">라이브매출</th>
                  <th class="text-right">ROI</th>
                  `:``}
                  ${r.finance?`
                  <th>정산</th>
                  <th class="text-right">영업매출</th>
                  <th class="text-right">영업이익</th>
                  <th class="text-right">순마진</th>
                  `:``}
                  ${r.basic?`
                  <th>PD</th>
                  `:``}
                </tr>
              </thead>
              <tbody>
                ${s.length>0?s.map(e=>`
                  <tr class="clickable" data-id="${e.id}">
                    ${r.basic?`
                    <td>${j(e.broadcastStatus)}</td>
                    <td><a href="javascript:void(0)" class="project-link" data-id="${e.id}">${e.brandName||(e.brand?e.brand.name:`-`)}</a></td>
                    <td><span class="badge badge-default">${e.category||`-`}</span></td>
                    <td>${k(e.broadcastDate)}</td>
                    <td>${e.broadcastTime||`-`}</td>
                    <td>${e.platform||`-`}</td>
                    `:``}
                    ${r.host?`
                    <td>${e.hostA?e.hostA.name:`-`}</td>
                    <td class="text-right">${e.hostAFee?D(e.hostAFee):`-`}</td>
                    <td>${e.hostB?e.hostB.name:`-`}</td>
                    <td class="text-right">${e.hostBFee?D(e.hostBFee):`-`}</td>
                    <td class="text-right">${e.totalHostFee?D(e.totalHostFee):`-`}</td>
                    `:``}
                    ${r.result?`
                    <td class="text-right">${e.result?O(e.result.views):`-`}</td>
                    <td class="text-right" style="font-weight: bold;">${e.result?D(e.result.liveRevenue):`-`}</td>
                    <td class="text-right" style="font-weight: bold;">${e.result?A(e.result.roi):`-`}</td>
                    `:``}
                    ${r.finance?`
                    <td><span class="badge ${e.settleLabel===`완료`?`badge-success`:e.settleLabel===`일부완료`?`badge-warning`:`badge-default`}">${e.settleLabel}</span></td>
                    <td class="text-right">${e.finance?D(e.finance.salesRevenue):`-`}</td>
                    <td class="text-right">${e.finance?D(e.finance.operatingProfit):`-`}</td>
                    <td class="text-right">${e.finance?D(e.finance.netMargin):`-`}</td>
                    `:``}
                    ${r.basic?`
                    <td>${e.pd||`-`}</td>
                    `:``}
                  </tr>
                `).join(``):`<tr><td colspan="20" class="text-center" style="padding: var(--space-10); color: var(--text-tertiary);">등록된 프로젝트가 없습니다.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,setTimeout(()=>{e.querySelector(`#project-search`)?.addEventListener(`input`,e=>{t=e.target.value,i();let n=document.getElementById(`project-search`);if(n){n.focus();let e=n.value.length;n.setSelectionRange(e,e)}}),[`status`,`brand`,`platform`,`month`,`category`].forEach(t=>{e.querySelector(`#filter-${t}`)?.addEventListener(`change`,e=>{n[t]=e.target.value,i()})}),[`basic`,`host`,`result`,`finance`].forEach(t=>{e.querySelector(`#toggle-col-${t}`)?.addEventListener(`change`,e=>{r[t]=e.target.checked,i()})}),e.querySelector(`#filter-reset`)?.addEventListener(`click`,()=>{n={status:``,brand:``,platform:``,month:``,category:``,settleStatus:``},t=``,i()}),e.querySelector(`#btn-new-project`)?.addEventListener(`click`,()=>{Te(()=>i())}),e.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation(),l.navigate(`/projects/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>{l.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0)}return i(),T.on(`projects:changed`,i),e}function Te(e){let t=T.getAll(`brands`),n=`
    <div class="form-grid">
      <div class="input-group">
        <label class="required">방송 제목(브랜드)</label>
        <input type="text" class="input" id="proj-brandName" list="brand-list" placeholder="브랜드명 또는 방송 제목 입력">
        <datalist id="brand-list">
          ${t.map(e=>`<option value="${e.name}">`).join(``)}
        </datalist>
      </div>
      <div class="input-group">
        <label>카테고리</label>
        <select class="input" id="proj-category">
          <option value="">선택</option>
          ${p.map(e=>`<option value="${e}">${e}</option>`).join(``)}
        </select>
      </div>
      <div class="input-group">
        <label class="required">방송일</label>
        <input class="input" type="date" id="proj-date">
      </div>
      <div class="input-group">
        <label>방송시간</label>
        <input class="input" type="time" id="proj-time">
      </div>
      <div class="input-group">
        <label>방송 플랫폼</label>
        <select class="input" id="proj-platform">
          <option value="">선택</option>
          ${f.map(e=>`<option value="${e}">${e}</option>`).join(``)}
        </select>
      </div>
      <div class="input-group">
        <label>담당 PD</label>
        <input class="input" id="proj-pd" placeholder="담당 PD">
      </div>
      <div class="input-group">
        <label>담당 디자이너</label>
        <input class="input" id="proj-designer" placeholder="담당 디자이너">
      </div>
      <div class="input-group full-width">
        <label>비고</label>
        <textarea class="input" id="proj-note" rows="2" placeholder="비고"></textarea>
      </div>
    </div>
  `,r=document.createElement(`div`);r.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let i=document.createElement(`button`);i.className=`btn btn-secondary`,i.textContent=`취소`,i.addEventListener(`click`,P);let a=document.createElement(`button`);a.className=`btn btn-primary`,a.textContent=`등록`,a.addEventListener(`click`,()=>{let n=document.getElementById(`proj-brandName`).value.trim(),r=document.getElementById(`proj-date`).value;if(!n){R(`방송 제목(브랜드)을 입력해주세요.`);return}if(!r){R(`방송일을 선택해주세요.`);return}let i=t.find(e=>e.name===n),a=i?i.id:`b_`+n,o=y(`live`),s={id:o,brandId:a,brandName:n,adName:``,category:document.getElementById(`proj-category`).value,broadcastMonth:r.substring(0,7),broadcastDate:r,broadcastTime:document.getElementById(`proj-time`).value,platform:document.getElementById(`proj-platform`).value,liveUrl:``,pd:document.getElementById(`proj-pd`).value.trim(),designer:document.getElementById(`proj-designer`).value.trim(),cuesheetLink:``,note:document.getElementById(`proj-note`).value.trim(),broadcastStatus:`new`,settleStatus:`wait`,createdAt:new Date().toISOString().split(`T`)[0]};T.create(`projects`,s),g.forEach(e=>{T.create(`tasks`,{id:y(`task`),liveId:o,name:e,assignee:``,done:!1,completedAt:null,memo:``})}),P(),L(`프로젝트가 등록되었습니다.`),e&&e()}),r.appendChild(i),r.appendChild(a),N({title:`신규 프로젝트 등록`,size:`lg`,content:n,footer:r})}function Ee(e){let t=document.createElement(`div`),n=`info`;function r(){let i=T.getById(`projects`,e.id);if(!i){t.innerHTML=`<div class="page-header"><div class="page-header-left"><h1 class="page-title">프로젝트를 찾을 수 없습니다</h1></div></div>
      <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>`,setTimeout(()=>{t.querySelector(`#btn-back`)?.addEventListener(`click`,()=>l.navigate(`/projects`))},0);return}let a=T.getById(`brands`,i.brandId),o=i.brandName||(a?a.name:`-`),s=T.query(`tasks`,e=>e.liveId===i.id),c=s.filter(e=>e.done).length,u=s.length>0?Math.round(c/s.length*100):0;t.innerHTML=`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <div class="breadcrumb">
              <a href="javascript:void(0)" id="breadcrumb-list">라이브 관리</a>
              <span class="breadcrumb-separator">/</span>
              <span class="breadcrumb-current">${o}</span>
            </div>
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-2);">
              <h1 class="page-title">${o}</h1>
              <div style="display:flex; gap: 4px; align-items:center;">
                ${j(i.broadcastStatus)}
              </div>
            </div>
          </div>
        </div>
        <div class="page-header-right">
          <div style="display: flex; align-items: center; gap: var(--space-2); margin-right: var(--space-4);">
            <span style="font-size: var(--text-sm); color: var(--text-tertiary);">진행률</span>
            <div class="progress-bar" style="width: 120px;">
              <div class="progress-bar-fill" style="width: ${u}%"></div>
            </div>
            <span style="font-size: var(--text-sm); font-weight: var(--weight-semibold);">${u}%</span>
          </div>
          <button class="btn btn-secondary" id="btn-delete-project">삭제</button>
        </div>
      </div>
      <div class="page-body">
        <!-- 탭 -->
        <div class="tabs" style="margin-bottom: var(--space-5);">
          <div class="tab ${n===`info`?`active`:``}" data-tab="info">기본정보</div>
          <div class="tab ${n===`checklist`?`active`:``}" data-tab="checklist">체크리스트</div>
          <div class="tab ${n===`hosts`?`active`:``}" data-tab="hosts">쇼호스트</div>
          <div class="tab ${n===`design`?`active`:``}" data-tab="design">디자인</div>
          <div class="tab ${n===`result`?`active`:``}" data-tab="result">성과</div>
          <div class="tab ${n===`finance`?`active`:``}" data-tab="finance">정산</div>
        </div>

        <div id="tab-content"></div>
      </div>
    `;let d=t.querySelector(`#tab-content`);switch(n){case`info`:d.appendChild(De(i,a));break;case`checklist`:d.appendChild(ke(i));break;case`hosts`:d.appendChild(Ae(i));break;case`design`:d.appendChild(Me(i));break;case`result`:d.appendChild(Fe(i));break;case`finance`:d.appendChild(Ie(i));break}setTimeout(()=>{t.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>l.navigate(`/projects`)),t.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,()=>{n=e.getAttribute(`data-tab`),r()})}),t.querySelector(`#btn-delete-project`)?.addEventListener(`click`,()=>{F({title:`프로젝트 삭제`,message:`"${i.adName}" 프로젝트를 삭제하시겠습니까? 관련된 체크리스트, 쇼호스트 매칭, 성과, 정산 데이터도 모두 삭제됩니다.`,confirmText:`삭제`,danger:!0,onConfirm:()=>{T.query(`tasks`,e=>e.liveId===i.id).forEach(e=>T.delete(`tasks`,e.id)),T.query(`liveHosts`,e=>e.liveId===i.id).forEach(e=>T.delete(`liveHosts`,e.id)),T.query(`designs`,e=>e.liveId===i.id).forEach(e=>T.delete(`designs`,e.id)),T.delete(`results`,i.id),T.delete(`finances`,i.id),T.delete(`projects`,i.id),L(`프로젝트가 삭제되었습니다.`),l.navigate(`/projects`)}})})},0)}return r(),t}function De(e,t){let n=document.createElement(`div`);return n.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>기본 정보</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-info">수정</button>
      </div>
      <div class="card-body">
        <div class="detail-grid">
          <div class="detail-field"><span class="detail-field-label">등록일</span><span class="detail-field-value">${k(e.createdAt)}</span></div>
          <div class="detail-field"><span class="detail-field-label">진행월</span><span class="detail-field-value">${e.broadcastMonth||`-`}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송일</span><span class="detail-field-value">${k(e.broadcastDate)}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송시간</span><span class="detail-field-value">${e.broadcastTime||`-`}</span></div>
          <div class="detail-field"><span class="detail-field-label">브랜드</span><span class="detail-field-value">${e.brandName||(t?t.name:`-`)}</span></div>
          <div class="detail-field"><span class="detail-field-label">카테고리</span><span class="detail-field-value">${e.category||`-`}</span></div>
          <div class="detail-field"><span class="detail-field-label">플랫폼</span><span class="detail-field-value">${e.platform||`-`}</span></div>
          <div class="detail-field"><span class="detail-field-label">담당 PD</span><span class="detail-field-value">${e.pd||`-`}</span></div>
          <div class="detail-field"><span class="detail-field-label">담당 디자이너</span><span class="detail-field-value">${e.designer||`-`}</span></div>
          <div class="detail-field"><span class="detail-field-label">큐시트</span><span class="detail-field-value">${e.cuesheetLink?`<a href="${e.cuesheetLink}" target="_blank">바로가기</a>`:`-`}</span></div>
          <div class="detail-field"><span class="detail-field-label">라이브 URL</span><span class="detail-field-value">${e.liveUrl?`<a href="${e.liveUrl}" target="_blank">바로가기</a>`:`-`}</span></div>
          <div class="detail-field" style="grid-column: 1/-1;"><span class="detail-field-label">비고</span><span class="detail-field-value">${e.note||`-`}</span></div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: var(--space-4);">
      <div class="card-header"><h3>방송 진행 상태 변경</h3></div>
      <div class="card-body">
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--space-2);">
          ${u.map(t=>`
            <button class="btn ${e.broadcastStatus===t.key?`btn-primary`:`btn-secondary`} btn-sm status-change-btn" data-status="${t.key}" style="font-size: 11px;">
              ${t.label}
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: var(--space-4);">
      <div class="card-header"><h3>정산 상태 변경</h3></div>
      <div class="card-body">
        <div style="display: flex; gap: var(--space-4); align-items: center;">
          <div style="display: flex; gap: var(--space-2);">
            ${d.map(t=>`
              <button class="btn ${e.settleStatus===t.key?`btn-primary`:`btn-secondary`} btn-sm settle-status-change-btn" data-status="${t.key}" style="font-size: 11px;">
                ${t.label}
              </button>
            `).join(``)}
          </div>
          <div style="border-left: 1px solid var(--border-color); padding-left: var(--space-4); display: flex; align-items: center; gap: var(--space-2);">
            <span style="font-size: var(--text-sm); font-weight: var(--weight-medium);">세금계산서:</span>
            <button class="btn ${t&&t.taxInvoice?`btn-primary`:`btn-secondary`} btn-sm tax-invoice-btn" style="font-size: 11px;">
              ${t&&t.taxInvoice?`발행완료`:`미발행`}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{n.querySelector(`#btn-edit-info`)?.addEventListener(`click`,()=>{Oe(e)}),n.querySelectorAll(`.status-change-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-status`);T.update(`projects`,e.id,{broadcastStatus:n}),L(`방송 상태가 "${b(n)}"(으)로 변경되었습니다.`),l.navigate(`/projects/${e.id}`)})}),n.querySelectorAll(`.settle-status-change-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-status`);T.update(`projects`,e.id,{settleStatus:n}),L(`정산 상태가 "${x(n)}"(으)로 변경되었습니다.`),l.navigate(`/projects/${e.id}`)})}),n.querySelector(`.tax-invoice-btn`)?.addEventListener(`click`,()=>{if(!t){R(`등록된 브랜드 정보가 없어 세금계산서 상태를 변경할 수 없습니다.`);return}let n=!t.taxInvoice;T.update(`brands`,t.id,{taxInvoice:n}),L(`세금계산서 상태가 "${n?`발행완료`:`미발행`}"(으)로 변경되었습니다.`),l.navigate(`/projects/${e.id}`)})},0),n}function Oe(e){let t=T.getAll(`brands`),n=`
    <div class="form-grid">
      <div class="input-group">
        <label>방송 제목(브랜드)</label>
        <input type="text" class="input" id="edit-brandName" list="brand-list" value="${e.brandName||t.find(t=>t.id===e.brandId)?.name||``}">
        <datalist id="brand-list">${t.map(e=>`<option value="${e.name}">`).join(``)}</datalist>
      </div>
      <div class="input-group">
        <label>카테고리</label>
        <select class="input" id="edit-category">${p.map(t=>`<option value="${t}" ${e.category===t?`selected`:``}>${t}</option>`).join(``)}</select>
      </div>
      <div class="input-group">
        <label>방송일</label>
        <input class="input" type="date" id="edit-date" value="${e.broadcastDate||``}">
      </div>
      <div class="input-group">
        <label>방송시간</label>
        <input class="input" type="time" id="edit-time" value="${e.broadcastTime||``}">
      </div>
      <div class="input-group">
        <label>플랫폼</label>
        <select class="input" id="edit-platform"><option value="">선택</option>${f.map(t=>`<option value="${t}" ${e.platform===t?`selected`:``}>${t}</option>`).join(``)}</select>
      </div>
      <div class="input-group">
        <label>라이브 URL</label>
        <input class="input" id="edit-url" value="${e.liveUrl||``}">
      </div>
      <div class="input-group">
        <label>담당 PD</label>
        <input class="input" id="edit-pd" value="${e.pd||``}">
      </div>
      <div class="input-group">
        <label>담당 디자이너</label>
        <input class="input" id="edit-designer" value="${e.designer||``}">
      </div>
      <div class="input-group">
        <label>큐시트 링크</label>
        <input class="input" id="edit-cuesheet" value="${e.cuesheetLink||``}">
      </div>
      <div class="input-group full-width">
        <label>비고</label>
        <textarea class="input" id="edit-note" rows="2">${e.note||``}</textarea>
      </div>
    </div>
  `,r=document.createElement(`div`);r.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let i=document.createElement(`button`);i.className=`btn btn-secondary`,i.textContent=`취소`,i.addEventListener(`click`,P);let a=document.createElement(`button`);a.className=`btn btn-primary`,a.textContent=`저장`,a.addEventListener(`click`,()=>{let n=document.getElementById(`edit-date`).value,r=document.getElementById(`edit-brandName`).value.trim(),i=t.find(e=>e.name===r),a=i?i.id:`b_`+r;T.update(`projects`,e.id,{brandId:a,brandName:r,category:document.getElementById(`edit-category`).value,broadcastDate:n,broadcastMonth:n?n.substring(0,7):``,broadcastTime:document.getElementById(`edit-time`).value,platform:document.getElementById(`edit-platform`).value,liveUrl:document.getElementById(`edit-url`).value.trim(),pd:document.getElementById(`edit-pd`).value.trim(),designer:document.getElementById(`edit-designer`).value.trim(),cuesheetLink:document.getElementById(`edit-cuesheet`).value.trim(),note:document.getElementById(`edit-note`).value.trim()}),P(),L(`기본 정보가 수정되었습니다.`),l.navigate(`/projects/${e.id}`)}),r.appendChild(i),r.appendChild(a),N({title:`기본 정보 수정`,size:`lg`,content:n,footer:r})}function ke(e){let t=document.createElement(`div`);return t.innerHTML=`
    <div class="card">
      <div class="card-header"><h3>방송 체크리스트</h3></div>
      <div class="card-body">
        <div style="display: flex; flex-direction: column; gap: var(--space-2);">
          ${T.query(`tasks`,t=>t.liveId===e.id).map(e=>`
            <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); transition: background var(--transition-fast);" class="checklist-row">
              <label class="checkbox-wrapper">
                <input type="checkbox" class="task-check" data-id="${e.id}" ${e.done?`checked`:``}>
                <span style="font-size: var(--text-sm); ${e.done?`text-decoration: line-through; color: var(--text-disabled);`:``}">${e.name}</span>
              </label>
              <span style="margin-left: auto; font-size: var(--text-xs); color: var(--text-disabled);">${e.completedAt?k(e.completedAt):``}</span>
            </div>
          `).join(``)}
        </div>
      </div>
    </div>
  `,setTimeout(()=>{t.querySelectorAll(`.task-check`).forEach(n=>{n.addEventListener(`change`,()=>{let r=n.getAttribute(`data-id`),i=n.checked;T.update(`tasks`,r,{done:i,completedAt:i?new Date().toISOString().split(`T`)[0]:null}),L(i?`완료 처리되었습니다.`:`미완료로 변경되었습니다.`);let a=ke(e);t.replaceWith(a)})})},0),t}function Ae(e){let t=document.createElement(`div`),n=T.query(`liveHosts`,t=>t.liveId===e.id);return T.getAll(`hosts`),t.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>쇼호스트 매칭</h3>
        <button class="btn btn-primary btn-sm" id="btn-add-host-match">쇼호스트 추가</button>
      </div>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>쇼호스트</th>
              <th>역할</th>
              <th class="text-right">진행금액</th>
              <th>정산상태</th>
              <th>메모</th>
              <th class="col-actions"></th>
            </tr>
          </thead>
          <tbody>
            ${n.length>0?n.map(e=>{let t=T.getById(`hosts`,e.hostId);return`
                <tr>
                  <td>${t?t.name:`-`}</td>
                  <td>${m.find(t=>t.key===e.role)?.label||`-`}</td>
                  <td class="text-right">${E(e.fee)}</td>
                  <td>${ce(e.settleStatus)}</td>
                  <td style="font-size: var(--text-xs); color: var(--text-tertiary);">${e.memo||`-`}</td>
                  <td class="col-actions">
                    <button class="btn btn-ghost btn-icon btn-sm btn-edit-match" data-id="${e.id}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                  </td>
                </tr>
              `}).join(``):`<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">매칭된 쇼호스트가 없습니다.</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `,setTimeout(()=>{t.querySelector(`#btn-add-host-match`)?.addEventListener(`click`,()=>{je(e.id,null,()=>{let n=Ae(e);t.replaceWith(n)})}),t.querySelectorAll(`.btn-edit-match`).forEach(n=>{n.addEventListener(`click`,()=>{je(e.id,n.getAttribute(`data-id`),()=>{let n=Ae(e);t.replaceWith(n)})})})},0),t}function je(e,t,n){let r=!!t,i=r?T.getById(`liveHosts`,t):{},a=`
    <div class="form-grid">
      <div class="input-group">
        <label class="required">쇼호스트</label>
        <select class="input" id="match-host">
          <option value="">선택</option>
          ${T.getAll(`hosts`).map(e=>`<option value="${e.id}" ${i.hostId===e.id?`selected`:``}>${e.name}</option>`).join(``)}
        </select>
      </div>
      <div class="input-group">
        <label>역할</label>
        <select class="input" id="match-role">
          ${m.map(e=>`<option value="${e.key}" ${i.role===e.key?`selected`:``}>${e.label}</option>`).join(``)}
        </select>
      </div>
      <div class="input-group">
        <label>진행금액</label>
        <input class="input" type="number" id="match-fee" value="${i.fee||``}" placeholder="금액">
      </div>
      <div class="input-group">
        <label>정산상태</label>
        <select class="input" id="match-settle">
          <option value="pending" ${i.settleStatus===`pending`?`selected`:``}>대기</option>
          <option value="processing" ${i.settleStatus===`processing`?`selected`:``}>진행중</option>
          <option value="done" ${i.settleStatus===`done`?`selected`:``}>완료</option>
        </select>
      </div>
      <div class="input-group full-width">
        <label>메모</label>
        <input class="input" id="match-memo" value="${i.memo||``}">
      </div>
    </div>
  `,o=document.createElement(`div`);if(o.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,r){let e=document.createElement(`button`);e.className=`btn btn-danger`,e.textContent=`삭제`,e.style.marginRight=`auto`,e.addEventListener(`click`,()=>{T.delete(`liveHosts`,t),P(),L(`삭제되었습니다.`),n&&n()}),o.appendChild(e)}let s=document.createElement(`button`);s.className=`btn btn-secondary`,s.textContent=`취소`,s.addEventListener(`click`,P);let c=document.createElement(`button`);c.className=`btn btn-primary`,c.textContent=r?`수정`:`추가`,c.addEventListener(`click`,()=>{let i=document.getElementById(`match-host`).value;if(!i){R(`쇼호스트를 선택해주세요.`);return}let a={liveId:e,hostId:i,role:document.getElementById(`match-role`).value,fee:parseInt(document.getElementById(`match-fee`).value)||0,settleStatus:document.getElementById(`match-settle`).value,memo:document.getElementById(`match-memo`).value.trim()};r?(T.update(`liveHosts`,t,a),L(`수정되었습니다.`)):(a.id=y(`lh`),T.create(`liveHosts`,a),L(`쇼호스트가 매칭되었습니다.`)),P(),n&&n()}),o.appendChild(s),o.appendChild(c),N({title:r?`쇼호스트 매칭 수정`:`쇼호스트 추가`,size:`md`,content:a,footer:o})}function Me(e){let t=document.createElement(`div`),n=T.query(`designs`,t=>t.liveId===e.id),{renderDesignBadge:r}=Ne();return t.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>디자인 요청</h3>
        <button class="btn btn-primary btn-sm" id="btn-add-design">요청 추가</button>
      </div>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>요청일</th>
              <th>담당 디자이너</th>
              <th>상태</th>
              <th>작업 링크</th>
              <th>파일 링크</th>
              <th>메모</th>
              <th class="col-actions"></th>
            </tr>
          </thead>
          <tbody>
            ${n.length>0?n.map(e=>`
              <tr>
                <td>${k(e.requestDate)}</td>
                <td>${e.designer||`-`}</td>
                <td>${r(e.status)}</td>
                <td>${e.workLink?`<a href="${e.workLink}" target="_blank">바로가기</a>`:`-`}</td>
                <td>${e.fileLink?`<a href="${e.fileLink}" target="_blank">바로가기</a>`:`-`}</td>
                <td style="font-size: var(--text-xs); color: var(--text-tertiary);">${e.memo||`-`}</td>
                <td class="col-actions">
                  <button class="btn btn-ghost btn-icon btn-sm btn-edit-design" data-id="${e.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </td>
              </tr>
            `).join(``):`<tr><td colspan="7" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">디자인 요청이 없습니다.</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `,setTimeout(()=>{t.querySelector(`#btn-add-design`)?.addEventListener(`click`,()=>{Pe(e.id,null,()=>{let n=Me(e);t.replaceWith(n)})}),t.querySelectorAll(`.btn-edit-design`).forEach(n=>{n.addEventListener(`click`,()=>{Pe(e.id,n.getAttribute(`data-id`),()=>{let n=Me(e);t.replaceWith(n)})})})},0),t}function Ne(){return{renderDesignBadge:e=>`<span class="badge ${{requested:`badge-default`,working:`badge-warning`,reviewing:`badge-warning`,done:`badge-success`}[e]||`badge-default`}">${{requested:`요청`,working:`작업중`,reviewing:`검수중`,done:`완료`}[e]||e}</span>`}}function Pe(e,t,n){let r=!!t,i=r?T.getById(`designs`,t):{},a=`
    <div class="form-grid">
      <div class="input-group"><label>요청일</label><input class="input" type="date" id="design-date" value="${i.requestDate||new Date().toISOString().split(`T`)[0]}"></div>
      <div class="input-group"><label>담당 디자이너</label><input class="input" id="design-designer" value="${i.designer||``}" placeholder="디자이너"></div>
      <div class="input-group"><label>상태</label><select class="input" id="design-status">${h.map(e=>`<option value="${e.key}" ${i.status===e.key?`selected`:``}>${e.label}</option>`).join(``)}</select></div>
      <div class="input-group"><label>작업 링크</label><input class="input" id="design-work" value="${i.workLink||``}"></div>
      <div class="input-group"><label>파일 링크</label><input class="input" id="design-file" value="${i.fileLink||``}"></div>
      <div class="input-group"><label>메모</label><input class="input" id="design-memo" value="${i.memo||``}"></div>
    </div>
  `,o=document.createElement(`div`);if(o.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,r){let e=document.createElement(`button`);e.className=`btn btn-danger`,e.textContent=`삭제`,e.style.marginRight=`auto`,e.addEventListener(`click`,()=>{T.delete(`designs`,t),P(),L(`삭제되었습니다.`),n&&n()}),o.appendChild(e)}let s=document.createElement(`button`);s.className=`btn btn-secondary`,s.textContent=`취소`,s.addEventListener(`click`,P);let c=document.createElement(`button`);c.className=`btn btn-primary`,c.textContent=r?`수정`:`등록`,c.addEventListener(`click`,()=>{let i={liveId:e,requestDate:document.getElementById(`design-date`).value,designer:document.getElementById(`design-designer`).value.trim(),status:document.getElementById(`design-status`).value,workLink:document.getElementById(`design-work`).value.trim(),fileLink:document.getElementById(`design-file`).value.trim(),memo:document.getElementById(`design-memo`).value.trim()};r?(T.update(`designs`,t,i),L(`수정되었습니다.`)):(i.id=y(`design`),T.create(`designs`,i),L(`디자인 요청이 등록되었습니다.`)),P(),n&&n()}),o.appendChild(s),o.appendChild(c),N({title:r?`디자인 요청 수정`:`디자인 요청 추가`,size:`md`,content:a,footer:o})}function Fe(e){let t=document.createElement(`div`),n=T.getAll(`results`).find(t=>t.liveId===e.id)||{};return t.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>방송 성과</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-result">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-label">시청뷰</div><div class="stat-value">${O(n.views)}</div></div>
          <div class="stat-card"><div class="stat-label">좋아요</div><div class="stat-value">${O(n.likes)}</div></div>
          <div class="stat-card"><div class="stat-label">주문건수</div><div class="stat-value">${O(n.orders)}건</div></div>
          <div class="stat-card"><div class="stat-label">라이브 매출</div><div class="stat-value">${E(n.liveRevenue)}</div></div>
          <div class="stat-card"><div class="stat-label">ROI</div><div class="stat-value">${A(n.roi)}</div></div>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{t.querySelector(`#btn-edit-result`)?.addEventListener(`click`,()=>{let r=`
        <div class="form-grid">
          <div class="input-group"><label>시청뷰</label><input class="input" type="number" id="res-views" value="${n.views||``}"></div>
          <div class="input-group"><label>좋아요</label><input class="input" type="number" id="res-likes" value="${n.likes||``}"></div>
          <div class="input-group"><label>주문건수</label><input class="input" type="number" id="res-orders" value="${n.orders||``}"></div>
          <div class="input-group"><label>라이브 매출</label><input class="input" type="number" id="res-revenue" value="${n.liveRevenue||``}"></div>
        </div>
      `,i=document.createElement(`div`);i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,P);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=`저장`,o.addEventListener(`click`,()=>{let n=parseInt(document.getElementById(`res-revenue`).value)||0,r=T.getAll(`finances`).find(t=>t.liveId===e.id),i=r?r.adCost+r.productionCost+r.hostCost+r.otherCost:0,a=i>0?Math.round(n/i*100)/100:0,o={liveId:e.id,views:parseInt(document.getElementById(`res-views`).value)||0,likes:parseInt(document.getElementById(`res-likes`).value)||0,orders:parseInt(document.getElementById(`res-orders`).value)||0,liveRevenue:n,roi:a},s=T.getAll(`results`).find(t=>t.liveId===e.id);s?T.update(`results`,s.id,o):(o.id=e.id,T.create(`results`,o)),P(),L(`성과가 저장되었습니다.`);let c=Fe(e);t.replaceWith(c)}),i.appendChild(a),i.appendChild(o),N({title:`방송 성과 수정`,size:`md`,content:r,footer:i})})},0),t}function Ie(e){let t=document.createElement(`div`),n=T.getAll(`finances`).find(t=>t.liveId===e.id)||{},r=T.query(`liveHosts`,t=>t.liveId===e.id).reduce((e,t)=>e+(t.fee||0),0);return t.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>매출 및 정산</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-finance">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid" style="margin-bottom: var(--space-6);">
          <div class="stat-card"><div class="stat-label">광고비</div><div class="stat-value">${E(n.adCost)}</div></div>
          <div class="stat-card"><div class="stat-label">제작비</div><div class="stat-value">${E(n.productionCost)}</div></div>
          <div class="stat-card"><div class="stat-label">쇼호스트비 (자동계산)</div><div class="stat-value">${E(r)}</div></div>
          <div class="stat-card"><div class="stat-label">기타비용</div><div class="stat-value">${E(n.otherCost)}</div></div>
        </div>
        <div style="border-top: 1px solid var(--border-light); padding-top: var(--space-5);">
          <div class="stats-grid">
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업매출액</div>
              <div class="stat-value">${E(n.salesRevenue)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업이익</div>
              <div class="stat-value" style="color: ${(n.operatingProfit||0)>=0?`var(--status-success)`:`var(--status-error)`};">${E(n.operatingProfit)}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">부가세 (10%)</div>
              <div class="stat-value">${E(n.vat)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">순마진</div>
              <div class="stat-value" style="color: ${(n.netMargin||0)>=0?`var(--status-success)`:`var(--status-error)`};">${E(n.netMargin)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{t.querySelector(`#btn-edit-finance`)?.addEventListener(`click`,()=>{let i=`
        <div class="form-grid">
          <div class="input-group"><label>광고비</label><input class="input" type="number" id="fin-ad" value="${n.adCost||``}"></div>
          <div class="input-group"><label>제작비</label><input class="input" type="number" id="fin-prod" value="${n.productionCost||``}"></div>
          <div class="input-group"><label>기타비용</label><input class="input" type="number" id="fin-other" value="${n.otherCost||``}"></div>
          <div class="input-group"><label>영업매출액</label><input class="input" type="number" id="fin-sales" value="${n.salesRevenue||``}"></div>
        </div>
        <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-secondary); border-radius: var(--radius-md); font-size: var(--text-sm); color: var(--text-tertiary);">
          쇼호스트비는 쇼호스트 매칭 탭에서 설정한 금액의 합계로 자동 계산됩니다. (현재: ${E(r)})
        </div>
      `,a=document.createElement(`div`);a.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let o=document.createElement(`button`);o.className=`btn btn-secondary`,o.textContent=`취소`,o.addEventListener(`click`,P);let s=document.createElement(`button`);s.className=`btn btn-primary`,s.textContent=`저장`,s.addEventListener(`click`,()=>{let n=parseInt(document.getElementById(`fin-ad`).value)||0,i=parseInt(document.getElementById(`fin-prod`).value)||0,a=parseInt(document.getElementById(`fin-other`).value)||0,o=parseInt(document.getElementById(`fin-sales`).value)||0,s=o-n-i-r-a,c=Math.round(o*.1),l=s-c,u={liveId:e.id,adCost:n,productionCost:i,hostCost:r,otherCost:a,salesRevenue:o,operatingProfit:s,vat:c,netMargin:l},d=T.getAll(`finances`).find(t=>t.liveId===e.id);d?T.update(`finances`,d.id,u):(u.id=e.id,T.create(`finances`,u)),P(),L(`정산 정보가 저장되었습니다.`);let f=Ie(e);t.replaceWith(f)}),a.appendChild(o),a.appendChild(s),N({title:`정산 정보 수정`,size:`md`,content:i,footer:a})})},0),t}function Le(){let e=document.createElement(`div`),t=T.getAll(`projects`),n=T.getAll(`results`),r=T.getAll(`finances`),i={};t.forEach(e=>{let t=e.broadcastMonth;if(!t)return;i[t]||(i[t]={month:t,revenue:0,profit:0,margin:0,count:0}),i[t].count++;let n=r.find(t=>t.liveId===e.id);n&&(i[t].revenue+=n.salesRevenue||0,i[t].profit+=n.operatingProfit||0,i[t].margin+=n.netMargin||0)});let a=Object.values(i).sort((e,t)=>e.month.localeCompare(t.month)),o=r.reduce((e,t)=>e+(t.salesRevenue||0),0),s=r.reduce((e,t)=>e+(t.operatingProfit||0),0),c=r.reduce((e,t)=>e+(t.netMargin||0),0),l=r.reduce((e,t)=>e+(t.adCost||0),0),u=r.reduce((e,t)=>e+(t.productionCost||0),0),d=r.reduce((e,t)=>e+(t.hostCost||0),0),f={};t.forEach(e=>{let t=T.getById(`brands`,e.brandId);if(!t)return;f[t.id]||(f[t.id]={name:t.name,revenue:0,count:0}),f[t.id].count++;let r=n.find(t=>t.liveId===e.id);r&&(f[t.id].revenue+=r.liveRevenue||0)});let p=Object.values(f).sort((e,t)=>t.revenue-e.revenue),m={};T.getAll(`liveHosts`).forEach(e=>{let t=T.getById(`hosts`,e.hostId);if(!t)return;m[t.id]||(m[t.id]={name:t.name,revenue:0,count:0,fee:0}),m[t.id].count++,m[t.id].fee+=e.fee||0;let r=n.find(t=>t.liveId===e.liveId);r&&(m[t.id].revenue+=r.liveRevenue||0)});let h=Object.values(m).sort((e,t)=>t.revenue-e.revenue),g=t.filter(e=>e.status===`settle_wait`).length,_=t.filter(e=>e.status===`settle_done`).length;return e.innerHTML=`
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <h1 class="page-title">매출/손익</h1>
          <p class="page-description">전체 매출 및 손익 현황</p>
        </div>
      </div>
    </div>
    <div class="page-body">
      <!-- 핵심 KPI -->
      <div class="stats-grid" style="margin-bottom: var(--space-6);">
        <div class="stat-card"><div class="stat-label">총 영업매출</div><div class="stat-value">${D(o)}</div></div>
        <div class="stat-card"><div class="stat-label">총 영업이익</div><div class="stat-value" style="color: ${s>=0?`var(--status-success)`:`var(--status-error)`};">${D(s)}</div></div>
        <div class="stat-card"><div class="stat-label">총 순마진</div><div class="stat-value" style="color: ${c>=0?`var(--status-success)`:`var(--status-error)`};">${D(c)}</div></div>
        <div class="stat-card"><div class="stat-label">총 광고비</div><div class="stat-value">${D(l)}</div></div>
        <div class="stat-card"><div class="stat-label">총 제작비</div><div class="stat-value">${D(u)}</div></div>
        <div class="stat-card"><div class="stat-label">총 쇼호스트비</div><div class="stat-value">${D(d)}</div></div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-6);">
        <!-- 월별 손익 -->
        <div class="card">
          <div class="card-header"><h3>월별 손익</h3></div>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>월</th><th class="text-right">방송수</th><th class="text-right">영업매출</th><th class="text-right">영업이익</th><th class="text-right">순마진</th></tr></thead>
              <tbody>
                ${a.length>0?a.map(e=>`
                  <tr>
                    <td style="font-weight: var(--weight-medium);">${e.month}</td>
                    <td class="text-right">${e.count}건</td>
                    <td class="text-right">${D(e.revenue)}</td>
                    <td class="text-right" style="color: ${e.profit>=0?`var(--status-success)`:`var(--status-error)`};">${D(e.profit)}</td>
                    <td class="text-right" style="color: ${e.margin>=0?`var(--status-success)`:`var(--status-error)`};">${D(e.margin)}</td>
                  </tr>
                `).join(``):`<tr><td colspan="5" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">데이터가 없습니다.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 정산 현황 -->
        <div>
          <div class="card" style="margin-bottom: var(--space-5);">
            <div class="card-header"><h3>정산 현황</h3></div>
            <div class="card-body">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                <div class="stat-card"><div class="stat-label">정산 대기</div><div class="stat-value">${g}건</div></div>
                <div class="stat-card"><div class="stat-label">정산 완료</div><div class="stat-value">${_}건</div></div>
              </div>
            </div>
          </div>
          <!-- 브랜드별 매출 -->
          <div class="card">
            <div class="card-header"><h3>브랜드별 라이브매출 순위</h3></div>
            <div class="table-scroll">
              <table class="data-table">
                <thead><tr><th>브랜드</th><th class="text-right">방송수</th><th class="text-right">라이브매출</th></tr></thead>
                <tbody>
                  ${p.map((e,t)=>`
                    <tr><td><span style="color: var(--text-tertiary); margin-right: var(--space-2);">${t+1}</span> ${e.name}</td><td class="text-right">${e.count}회</td><td class="text-right">${D(e.revenue)}</td></tr>
                  `).join(``)||`<tr><td colspan="3" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">데이터 없음</td></tr>`}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- 쇼호스트별 실적 -->
      <div class="card">
        <div class="card-header"><h3>쇼호스트별 실적</h3></div>
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th>쇼호스트</th><th class="text-right">방송횟수</th><th class="text-right">누적 라이브매출</th><th class="text-right">누적 정산금액</th></tr></thead>
            <tbody>
              ${h.map((e,t)=>`
                <tr><td><span style="color: var(--text-tertiary); margin-right: var(--space-2);">${t+1}</span> ${e.name}</td><td class="text-right">${e.count}회</td><td class="text-right">${D(e.revenue)}</td><td class="text-right">${E(e.fee)}</td></tr>
              `).join(``)||`<tr><td colspan="4" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">데이터 없음</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,e}function Re(){let e=document.createElement(`div`);function t(){let t=T.getAll(`projects`),n=T.getAll(`finances`),r=T.getAll(`liveHosts`);T.getAll(`brands`),T.getAll(`hosts`);let i={};t.filter(e=>e.settleStatus!==`done`).forEach(e=>{let t=e.brandName||T.getById(`brands`,e.brandId)?.name||`알 수 없음`,r=e.brandId||t;i[r]||(i[r]={brandName:t,count:0,amount:0,projects:[]});let a=n.find(t=>t.liveId===e.id),o=a&&a.salesRevenue||0;i[r].count++,i[r].amount+=o,i[r].projects.push({...e,revenue:o})});let a=Object.values(i).sort((e,t)=>t.amount-e.amount),o={};r.filter(e=>e.settleStatus!==`done`).forEach(e=>{let t=T.getById(`hosts`,e.hostId);t&&(o[t.id]||(o[t.id]={hostName:t.name,hostId:t.id,count:0,amount:0,matchings:[]}),o[t.id].count++,o[t.id].amount+=e.fee||0,o[t.id].matchings.push(e))});let s=Object.values(o).sort((e,t)=>t.amount-e.amount),c=a.reduce((e,t)=>e+t.amount,0),l=s.reduce((e,t)=>e+t.amount,0);e.innerHTML=`
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <h1 class="page-title">정산 관리</h1>
          <p class="page-description">브랜드 미수금 및 쇼호스트 정산 대기 현황</p>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="stats-grid" style="margin-bottom: var(--space-6);">
        <div class="stat-card">
          <div class="stat-label">총 브랜드 미수금</div>
          <div class="stat-value" style="color: var(--status-error);">${E(c)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">총 쇼호스트 지급대기</div>
          <div class="stat-value" style="color: var(--status-warning);">${E(l)}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5);">
        <!-- 브랜드 미수금 현황 -->
        <div class="card">
          <div class="card-header">
            <h3>브랜드 미수금 현황</h3>
            <span class="badge badge-error">${a.length}곳</span>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>브랜드</th>
                  <th class="text-right">미수 건수</th>
                  <th class="text-right">미수 금액</th>
                  <th class="text-center">처리</th>
                </tr>
              </thead>
              <tbody>
                ${a.length>0?a.map(e=>`
                  <tr>
                    <td style="font-weight: var(--weight-medium);">${e.brandName}</td>
                    <td class="text-right">${e.count}건</td>
                    <td class="text-right" style="color: var(--status-error); font-weight: bold;">${E(e.amount)}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-secondary btn-brand-settle" data-brandid="${e.projects[0]?.brandId}" data-brandname="${e.brandName}">정산완료</button>
                    </td>
                  </tr>
                `).join(``):`<tr><td colspan="4" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">미수금이 없습니다.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 쇼호스트 정산금 현황 -->
        <div class="card">
          <div class="card-header">
            <h3>쇼호스트 정산 현황</h3>
            <span class="badge badge-warning">${s.length}명</span>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>쇼호스트</th>
                  <th class="text-right">대기 건수</th>
                  <th class="text-right">정산 대기금액</th>
                  <th class="text-center">처리</th>
                </tr>
              </thead>
              <tbody>
                ${s.length>0?s.map(e=>`
                  <tr>
                    <td style="font-weight: var(--weight-medium);">${e.hostName}</td>
                    <td class="text-right">${e.count}건</td>
                    <td class="text-right" style="color: var(--status-warning); font-weight: bold;">${E(e.amount)}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-secondary btn-host-settle" data-hostid="${e.hostId}">지급완료</button>
                    </td>
                  </tr>
                `).join(``):`<tr><td colspan="4" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">정산 대기중인 쇼호스트가 없습니다.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,e.querySelectorAll(`.btn-brand-settle`).forEach(e=>{e.addEventListener(`click`,e=>{let n=e.target.dataset.brandid,r=e.target.dataset.brandname;confirm(`'${r}'의 미수금 ${e.target.closest(`tr`).querySelector(`td:nth-child(3)`).innerText}을 모두 정산 완료 처리하시겠습니까?`)&&(t.filter(e=>e.settleStatus!==`done`&&(e.brandId===n||e.brandName===r)).forEach(e=>{T.update(`projects`,e.id,{settleStatus:`done`})}),L(`${r} 정산 처리 완료`))})}),e.querySelectorAll(`.btn-host-settle`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.hostid,n=e.target.closest(`tr`).querySelector(`td:nth-child(1)`).innerText;confirm(`'${n}' 쇼호스트의 정산 대기금액 ${e.target.closest(`tr`).querySelector(`td:nth-child(3)`).innerText}을 모두 지급 완료 처리하시겠습니까?`)&&(r.filter(e=>e.settleStatus!==`done`&&e.hostId===t).forEach(e=>{T.update(`liveHosts`,e.id,{settleStatus:`done`})}),L(`${n} 지급 처리 완료`))})})}return t(),T.on(`projects:changed`,t),T.on(`liveHosts:changed`,t),e}function ze(e,t){let n=document.createElement(`div`),r=k(new Date().toISOString(),`YYYY-MM-DD`),i=`EST-${new Date().toISOString().replace(/[-:T]/g,``).slice(2,14)}`,a=[{name:`방송 기획 및 송출비`,desc:`1회 방송 기획/운영/송출`,unitPrice:3e6,qty:1,unit:`회`}];t&&t.length>0&&t.forEach(e=>{let t=T.getById(`hosts`,e.hostId),n=t?t.name:`쇼호스트`,r=e.role===`main`?`메인 쇼호스트`:`게스트`;a.push({name:`출연료 (${n})`,desc:`${r} 출연료`,unitPrice:e.fee||5e5,qty:1,unit:`명`})});let o=0;function s(){let e=0;a.forEach(t=>{e+=t.unitPrice*t.qty});let t=e-o,n=Math.floor(t*.1),r=t+n;return{supply:e,totalSupply:t,vat:n,finalAmount:r}}function c(){let t=s();n.innerHTML=`
      <div style="width: 800px; max-width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <h2 style="font-size: 20px;">견적서 생성</h2>
          <button class="btn btn-primary" id="btn-download-pdf">PDF로 다운로드</button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4);">
          <div class="input-group">
            <label>견적일</label>
            <input type="date" class="input" id="est-date" value="${r}">
          </div>
          <div class="input-group">
            <label>견적번호</label>
            <input type="text" class="input" id="est-no" value="${i}" readonly style="background: var(--bg-tertiary);">
          </div>
          <div class="input-group">
            <label>수신 (브랜드명)</label>
            <input type="text" class="input" id="est-receiver" value="${e.brand||``}">
          </div>
          <div class="input-group">
            <label>프로젝트명 (방송명)</label>
            <input type="text" class="input" id="est-project" value="${e.title||``}">
          </div>
        </div>

        <div style="margin-bottom: var(--space-2); display: flex; justify-content: space-between; align-items: flex-end;">
          <h3 style="font-size: 16px;">견적 항목</h3>
          <button class="btn btn-secondary btn-sm" id="btn-add-item">항목 추가</button>
        </div>

        <div class="table-scroll" style="margin-bottom: var(--space-4);">
          <table class="data-table" style="box-shadow: none; border: 1px solid var(--border-color);">
            <thead>
              <tr>
                <th style="width: 25%">항목명</th>
                <th style="width: 30%">설명</th>
                <th style="width: 15%">단가</th>
                <th style="width: 10%">수량</th>
                <th style="width: 15%">금액</th>
                <th style="width: 5%">삭제</th>
              </tr>
            </thead>
            <tbody>
              ${a.map((e,t)=>`
                <tr>
                  <td><input type="text" class="input item-input" data-field="name" data-idx="${t}" value="${e.name}" style="padding: 4px 8px;"></td>
                  <td><input type="text" class="input item-input" data-field="desc" data-idx="${t}" value="${e.desc}" style="padding: 4px 8px;"></td>
                  <td><input type="number" class="input item-input text-right" data-field="unitPrice" data-idx="${t}" value="${e.unitPrice}" style="padding: 4px 8px;"></td>
                  <td><input type="number" class="input item-input text-center" data-field="qty" data-idx="${t}" value="${e.qty}" style="padding: 4px 8px;"></td>
                  <td class="text-right">${(e.unitPrice*e.qty).toLocaleString()}원</td>
                  <td class="text-center">
                    <button class="btn btn-ghost btn-sm btn-del-item" data-idx="${t}" style="color: var(--status-error); padding: 4px;">X</button>
                  </td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <div style="width: 300px; background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-md);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: var(--text-secondary);">합계 (공급가액):</span>
              <strong>${t.supply.toLocaleString()}원</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center;">
              <span style="color: var(--text-secondary);">할인 금액:</span>
              <input type="number" class="input text-right" id="est-discount" value="${o}" style="width: 120px; padding: 4px 8px;">
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--border-color);">
              <span style="color: var(--text-secondary);">부가세 (VAT):</span>
              <strong>${t.vat.toLocaleString()}원</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 18px;">
              <strong style="color: var(--primary);">최종 청구 금액:</strong>
              <strong style="color: var(--primary);">${t.finalAmount.toLocaleString()}원</strong>
            </div>
          </div>
        </div>
      </div>
    `,n.querySelectorAll(`.item-input`).forEach(e=>{e.addEventListener(`change`,e=>{let t=e.target.dataset.idx,n=e.target.dataset.field,r=e.target.value;(n===`unitPrice`||n===`qty`)&&(r=Number(r)||0),a[t][n]=r,c()})}),n.querySelectorAll(`.btn-del-item`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.idx;a.splice(t,1),c()})}),n.querySelector(`#btn-add-item`).addEventListener(`click`,()=>{a.push({name:``,desc:``,unitPrice:0,qty:1,unit:`식`}),c()});let u=n.querySelector(`#est-discount`);u&&u.addEventListener(`change`,e=>{o=Number(e.target.value)||0,c()}),n.querySelector(`#btn-download-pdf`).addEventListener(`click`,()=>{l(t)})}function l(e){if(typeof html2pdf>`u`){alert(`PDF 생성 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.`);return}let t=n.querySelector(`#est-date`).value,r=n.querySelector(`#est-no`).value,i=n.querySelector(`#est-receiver`).value,s=n.querySelector(`#est-project`).value,c=`
      <div style="width: 800px; padding: 40px; font-family: 'Noto Sans KR', Arial, sans-serif; font-size: 10pt; color: #000; background: #fff; box-sizing: border-box;">
        
        <!-- 타이틀 & 로고 -->
        <div style="position: relative; margin-bottom: 20px;">
          <h1 style="font-size: 23pt; font-weight: bold; margin: 0; padding-bottom: 10px; color: #000;">스튜디오 대관 견적서</h1>
          <img src="/src/assets/resources/image_439622620_0.jpg" style="position: absolute; right: 0; top: 0; width: 109px; height: 48px; object-fit: contain;">
        </div>

        <!-- 견적일자, No, 담당자 -->
        <div style="display: flex; margin-bottom: 30px; font-size: 10pt; color: #000;">
          <div style="width: 25%;">
            <span style="font-weight: bold; margin-right: 8px;">견적일자</span> ${t}
          </div>
          <div style="width: 75%;">
            <span style="font-weight: bold; margin-right: 8px;">No.</span> ${r}
            <span style="display: inline-block; width: 30px;"></span>
            <span style="font-weight: bold; margin-right: 8px;">담당자</span> _ 채이준PD(010-3018-9716 , choijun@ryzincorp.com)
          </div>
        </div>

        <!-- 공급자 / 수신자 영역 -->
        <div style="display: flex; margin-bottom: 40px; justify-content: space-between;">
          <!-- 공급자 -->
          <div style="width: 48%;">
            <div style="background-color: #000; color: #fff; font-weight: bold; text-align: center; padding: 6px 0; font-size: 10pt;">공급자</div>
            <div style="font-size: 14pt; font-weight: bold; padding: 16px 0; position: relative; color: #000;">
              라이진
              <img src="/src/assets/resources/image_439622620_1.jpg" style="position: absolute; left: 60px; top: 5px; width: 64px; height: 64px; mix-blend-mode: multiply; opacity: 0.9;">
            </div>
            <table style="width: 100%; font-size: 10pt; border-collapse: collapse;">
              <tr>
                <td style="color: #8d919e; font-weight: bold; padding: 4px 0; width: 60px;">사업자</td>
                <td style="padding: 4px 0; color: #000;">821-29-011-971</td>
              </tr>
              <tr>
                <td style="color: #8d919e; font-weight: bold; padding: 4px 0;">대표자</td>
                <td style="padding: 4px 0; color: #000;">채이준</td>
              </tr>
              <tr>
                <td style="color: #8d919e; font-weight: bold; padding: 4px 0;">이메일</td>
                <td style="padding: 4px 0; color: #000;">choijun@ryzincorp.com</td>
              </tr>
              <tr>
                <td style="color: #8d919e; font-weight: bold; padding: 4px 0; vertical-align: top;">주소</td>
                <td style="padding: 4px 0; color: #000; line-height: 1.4;">경기도 하남시 미사강변동로 100-1<br>파라곤스퀘어 2064-2</td>
              </tr>
            </table>
          </div>
          
          <div style="width: 4%;"></div>
          
          <!-- 수신자 -->
          <div style="width: 48%;">
            <div style="background-color: #000; color: #fff; font-weight: bold; text-align: center; padding: 6px 0; font-size: 10pt;">수신자</div>
            <div style="font-size: 15pt; font-weight: bold; padding: 16px 0; color: #000;">
              ${i}
            </div>
            <table style="width: 100%; font-size: 10pt; border-collapse: collapse;">
              <tr>
                <td style="color: #8d919e; font-weight: bold; padding: 4px 0; width: 60px;">프로젝트</td>
                <td style="padding: 4px 0; color: #000;">${s}</td>
              </tr>
              <tr>
                <td style="color: #8d919e; font-weight: bold; padding: 4px 0;">담당자</td>
                <td style="padding: 4px 0; color: #000;"></td>
              </tr>
              <tr>
                <td style="color: #8d919e; font-weight: bold; padding: 4px 0;">이메일</td>
                <td style="padding: 4px 0; color: #000;"></td>
              </tr>
              <tr>
                <td style="color: #8d919e; font-weight: bold; padding: 4px 0;">주소</td>
                <td style="padding: 4px 0; color: #000;"></td>
              </tr>
            </table>
          </div>
        </div>

        <!-- 견적 항목 -->
        <div style="font-weight: bold; font-size: 11pt; margin-bottom: 8px; color: #000;">견적항목</div>
        <table style="width: 100%; border-collapse: collapse; font-size: 10pt; margin-bottom: 30px;">
          <thead>
            <tr style="background-color: #000; color: #fff;">
              <th style="padding: 8px 4px; border-bottom: 1px solid #efefef; border-right: 1px solid #fff; font-weight: bold; width: 25%; text-align: center;">항목</th>
              <th style="padding: 8px 4px; border-bottom: 1px solid #efefef; border-right: 1px solid #fff; font-weight: bold; width: 35%; text-align: center;">설명</th>
              <th style="padding: 8px 4px; border-bottom: 1px solid #efefef; border-right: 1px solid #fff; font-weight: bold; width: 15%; text-align: center;">단가</th>
              <th style="padding: 8px 4px; border-bottom: 1px solid #efefef; border-right: 1px solid #fff; font-weight: bold; width: 10%; text-align: center;">수량</th>
              <th style="padding: 8px 4px; border-bottom: 1px solid #efefef; font-weight: bold; width: 15%; text-align: center;">금액</th>
            </tr>
          </thead>
          <tbody>
            ${a.map(e=>`
              <tr>
                <td style="padding: 10px 4px; text-align: center; border-bottom: 1px solid #efefef; border-right: 1px solid #efefef; font-weight: bold; color: #000;">${e.name}</td>
                <td style="padding: 10px 4px; text-align: center; border-bottom: 1px solid #efefef; border-right: 1px solid #efefef; color: #000;">${e.desc}</td>
                <td style="padding: 10px 4px; text-align: right; border-bottom: 1px solid #efefef; border-right: 1px solid #efefef; color: #000;">₩${e.unitPrice.toLocaleString()}</td>
                <td style="padding: 10px 4px; text-align: center; border-bottom: 1px solid #efefef; border-right: 1px solid #efefef; color: #000;">${e.qty}</td>
                <td style="padding: 10px 4px; text-align: right; border-bottom: 1px solid #efefef; color: #000;">₩${(e.unitPrice*e.qty).toLocaleString()}</td>
              </tr>
            `).join(``)}
            ${a.length<5?Array(5-a.length).fill(`
              <tr>
                <td style="padding: 10px 4px; border-bottom: 1px solid #efefef; border-right: 1px solid #efefef;">&nbsp;</td>
                <td style="padding: 10px 4px; border-bottom: 1px solid #efefef; border-right: 1px solid #efefef;">&nbsp;</td>
                <td style="padding: 10px 4px; border-bottom: 1px solid #efefef; border-right: 1px solid #efefef;">&nbsp;</td>
                <td style="padding: 10px 4px; border-bottom: 1px solid #efefef; border-right: 1px solid #efefef;">&nbsp;</td>
                <td style="padding: 10px 4px; border-bottom: 1px solid #efefef;">&nbsp;</td>
              </tr>
            `).join(``):``}
          </tbody>
        </table>

        <!-- 하단 (참고사항 및 합계) -->
        <div style="display: flex; justify-content: space-between;">
          <div style="width: 55%; padding-right: 20px;">
            <div style="font-size: 12pt; font-weight: bold; margin-bottom: 10px; color: #000;">참고사항</div>
            <div style="font-size: 10pt; color: #434343; line-height: 1.6;">
              1. 본 견적서는 발행일로부터 7일간 유효합니다.<br>
              2. 계약 체결 후 제작비 입금이 완료되면 기획 및 세팅이 진행됩니다.<br>
              3. 일정 변경 또는 취소 시 규정에 따라 위약금이 발생할 수 있습니다.
            </div>
          </div>
          
          <div style="width: 40%;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11pt;">
              <tr>
                <td style="background-color: #f3f3f3; color: #2f2f2f; font-weight: bold; padding: 8px 10px; width: 45%;">총 합계</td>
                <td style="text-align: right; font-weight: bold; padding: 8px 10px; color: #000;">₩${e.supply.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="background-color: #f3f3f3; color: #2f2f2f; font-weight: bold; padding: 8px 10px;">할인금액</td>
                <td style="text-align: right; font-weight: bold; color: #ea4335; padding: 8px 10px;">₩${o>0?o.toLocaleString():`0`}</td>
              </tr>
              <tr>
                <td style="background-color: #f3f3f3; color: #2f2f2f; font-weight: bold; padding: 8px 10px;">공급가액</td>
                <td style="text-align: right; font-weight: bold; padding: 8px 10px; color: #000;">₩${e.totalSupply.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="background-color: #f3f3f3; color: #2f2f2f; font-weight: bold; padding: 8px 10px;">VAT (10%)</td>
                <td style="text-align: right; font-weight: bold; padding: 8px 10px; color: #000;">₩${e.vat.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="background-color: #000; color: #fff; font-weight: bold; padding: 12px 10px; font-size: 10pt;">최종견적</td>
                <td style="background-color: #000; color: #fff; text-align: right; font-weight: bold; font-size: 15pt; padding: 12px 10px;">₩${e.finalAmount.toLocaleString()}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    `,l=document.createElement(`div`);l.innerHTML=c;let u={margin:0,filename:`견적서_${i}_${s}.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}};html2pdf().set(u).from(l).save().then(()=>{P()})}c(),N({title:`브랜드 견적서`,size:`lg`,content:n,footer:!1})}function Be(e,t){let n=document.createElement(`div`),r=[];t&&t.length>0&&t.forEach(e=>{let t=T.getById(`hosts`,e.hostId);t&&r.push({...t,role:e.role,fee:e.fee||0})});function i(){if(r.length===0){n.innerHTML=`<div style="padding: 2rem; text-align: center; color: var(--text-tertiary);">이 프로젝트에 배정된 쇼호스트가 없습니다.</div>`,N({title:`쇼호스트 계약서 발급`,size:`md`,content:n});return}n.innerHTML=`
      <div style="width: 600px; max-width: 100%;">
        <div style="margin-bottom: var(--space-4);">
          <h3 style="font-size: 16px;">${e.title}</h3>
          <p style="color: var(--text-tertiary); font-size: 13px;">방송일: ${k(e.broadcastDate)}</p>
        </div>
        
        <p style="margin-bottom: var(--space-3); font-size: 14px; color: var(--text-secondary);">
          아래 쇼호스트별로 <strong>[PDF 다운로드]</strong> 버튼을 누르면 출연 계약서가 즉시 생성됩니다.
        </p>

        <div style="margin-bottom: var(--space-4);">
          <label style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 8px;">특약 사항 및 추가 계약 내용 (선택)</label>
          <textarea id="contract-extra-content" class="input" style="width: 100%; height: 80px; resize: vertical; padding: 12px; line-height: 1.5;" placeholder="계약서 하단에 추가될 특약 사항이나 상세 조항을 자유롭게 입력하세요..."></textarea>
        </div>

        <div class="table-scroll" style="border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <table class="data-table" style="margin: 0; box-shadow: none;">
            <thead>
              <tr>
                <th style="width: 25%;">구분</th>
                <th style="width: 25%;">이름</th>
                <th class="text-right" style="width: 25%;">출연료</th>
                <th class="text-center" style="width: 25%;">계약서 발급</th>
              </tr>
            </thead>
            <tbody>
              ${r.map((e,t)=>`
                <tr>
                  <td><span style="color: var(--text-secondary); font-size: 13px;">${e.role===`main`?`메인 쇼호스트`:`게스트`}</span></td>
                  <td style="font-weight: var(--weight-medium);">${e.name}</td>
                  <td class="text-right">${e.fee.toLocaleString()}원</td>
                  <td class="text-center">
                    <button class="btn btn-primary btn-sm btn-download-contract" data-idx="${t}">PDF 다운로드</button>
                  </td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `,n.querySelectorAll(`.btn-download-contract`).forEach(t=>{t.addEventListener(`click`,t=>{let i=t.currentTarget.dataset.idx,o=n.querySelector(`#contract-extra-content`).value.trim();a(r[i],e,o)})})}function a(e,t,n){if(typeof html2pdf>`u`){alert(`PDF 생성 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.`);return}let r=new Date,i=new Date(t.broadcastDate||r),a=`
      <div style="padding: 40px; font-family: 'Inter', 'Noto Sans KR', sans-serif; color: #1e293b; line-height: 1.7;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 28px; font-weight: 800; border-bottom: 2px solid #1e293b; display: inline-block; padding-bottom: 8px;">라이브방송 출연 계약서</h1>
        </div>

        <p style="font-size: 14px; margin-bottom: 24px; text-align: justify;">
          라이브커머스컴퍼니(주)(이하 "갑"이라 한다)와 쇼호스트 <strong>${e.name}</strong>(이하 "을"이라 한다)은(는) 
          [<strong>${t.title}</strong>] 라이브 방송 출연과 관련하여 다음과 같이 계약을 체결한다.
        </p>

        <h3 style="font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px;">제 1 조 (목적)</h3>
        <p style="font-size: 13px; margin-bottom: 16px; padding-left: 12px;">
          본 계약은 "갑"이 기획, 제작하는 라이브 방송에 "을"이 출연함에 있어 필요한 제반 사항과 당사자 간의 권리 및 의무를 규정함을 목적으로 한다.
        </p>

        <h3 style="font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px;">제 2 조 (출연 내용)</h3>
        <p style="font-size: 13px; margin-bottom: 16px; padding-left: 12px;">
          1. 방송명 : ${t.title}<br>
          2. 방송일시 : ${i.getFullYear()}년 ${i.getMonth()+1}월 ${i.getDate()}일<br>
          3. 방송 플랫폼 : ${t.platform||`미정`}<br>
          4. "을"은 사전에 합의된 큐시트 및 "갑"의 연출에 따라 성실히 방송에 임해야 한다.
        </p>

        <h3 style="font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px;">제 3 조 (출연료 및 지급 방법)</h3>
        <p style="font-size: 13px; margin-bottom: 16px; padding-left: 12px;">
          1. "갑"은 "을"에게 본 방송 출연료로 일금 <strong>${e.fee.toLocaleString()}</strong>원(VAT 별도/포함 여부 상호 협의)을 지급한다.<br>
          2. "갑"은 방송 종료 후 "을"이 지정한 은행 계좌로 익월 10일 이내에 출연료를 입금한다.
        </p>

        <h3 style="font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px;">제 4 조 (비밀 유지 및 초상권)</h3>
        <p style="font-size: 13px; margin-bottom: 16px; padding-left: 12px;">
          1. "을"은 본 방송과 관련하여 취득한 "갑" 및 브랜드의 영업 비밀을 제3자에게 누설해서는 안 된다.<br>
          2. "갑"은 본 방송의 녹화본 및 캡처 이미지를 마케팅 목적으로 사용할 수 있으며, "을"은 이에 동의한다.
        </p>
        
        ${n?`
        <h3 style="font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px;">제 5 조 (특약 사항)</h3>
        <p style="font-size: 13px; margin-bottom: 16px; padding-left: 12px; white-space: pre-wrap;">${n}</p>
        `:``}

        <div style="margin-top: 60px; text-align: center; font-size: 14px;">
          ${r.getFullYear()}년 ${r.getMonth()+1}월 ${r.getDate()}일
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 60px; padding: 0 20px;">
          <div style="width: 45%;">
            <div style="font-weight: 700; margin-bottom: 16px;">[갑]</div>
            <div style="font-size: 13px; line-height: 1.8;">
              상 호 : 라이브커머스컴퍼니(주)<br>
              대 표 : 홍길동 (인)<br>
              주 소 : 서울특별시 강남구 테헤란로 123
            </div>
          </div>
          <div style="width: 45%;">
            <div style="font-weight: 700; margin-bottom: 16px;">[을]</div>
            <div style="font-size: 13px; line-height: 1.8;">
              성 명 : ${e.name} (인)<br>
              연락처 : ${e.phone||`-`}<br>
              주 소 : (본인 서명 시 기입)
            </div>
          </div>
        </div>
      </div>
    `,o=document.createElement(`div`);o.innerHTML=a;let s={margin:10,filename:`출연계약서_${e.name}_${t.title}.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}};html2pdf().set(s).from(o).save()}i(),N({title:`쇼호스트 출연 계약서 발급`,size:`md`,content:n,footer:!1})}function Ve(){let e=document.createElement(`div`);function t(){let t=T.getAll(`projects`)||[];t.sort((e,t)=>(t.broadcastDate||``).localeCompare(e.broadcastDate||``)),e.innerHTML=`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">계약/견적서 관리</h1>
            <p class="page-description">라이브 방송의 브랜드 견적서와 쇼호스트 출연 계약서를 PDF로 다운로드합니다.</p>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="card">
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>방송일</th>
                  <th>방송명(프로젝트)</th>
                  <th>브랜드</th>
                  <th>플랫폼</th>
                  <th class="text-center">문서 자동 발급</th>
                </tr>
              </thead>
              <tbody>
                ${t.length>0?t.map(e=>`
                  <tr>
                    <td style="font-size: 13px;">${k(e.broadcastDate)}</td>
                    <td style="font-weight: var(--weight-medium);">${e.title||`-`}</td>
                    <td>${e.brand||`-`}</td>
                    <td>${e.platform||`-`}</td>
                    <td class="text-center">
                      <div style="display: flex; gap: var(--space-2); justify-content: center;">
                        <button class="btn btn-outline btn-sm btn-brand-estimate" data-id="${e.id}" style="color: var(--primary); border-color: var(--primary);">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                          브랜드 견적서
                        </button>
                        <button class="btn btn-outline btn-sm btn-host-contract" data-id="${e.id}">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                          쇼호스트 계약서
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join(``):`<tr><td colspan="5" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 라이브 프로젝트가 없습니다.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,e.querySelectorAll(`.btn-brand-estimate`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.id,n=T.getById(`projects`,t);n&&ze(n,T.query(`liveHosts`,e=>e.liveId===n.id)||[])})}),e.querySelectorAll(`.btn-host-contract`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.id,n=T.getById(`projects`,t);n&&Be(n,T.query(`liveHosts`,e=>e.liveId===n.id)||[])})})}return t(),e}function He(){let e=JSON.parse(localStorage.getItem(`ryzin_live_data`)||`{}`);return{linkId:e.settings?.popbillLinkId||null,secretKey:e.settings?.popbillSecretKey||null,senderNumber:e.settings?.popbillSenderNumber||`010-0000-0000`}}async function Ue(){return He(),new Promise(e=>{setTimeout(()=>{e([{templateCode:`TPL_001`,templateName:`방송 안내`,content:`안녕하세요 #{고객명}님,
다가오는 #{방송일}에 #{방송명} 방송이 진행될 예정입니다.
많은 시청 부탁드립니다!`},{templateCode:`TPL_002`,templateName:`정산 완료 안내`,content:`#{이름}님, #{프로젝트명}에 대한 정산이 완료되었습니다.
입금은행: #{입금은행}

감사합니다.`}])},300)})}async function We(e){let t=He();if(!t.linkId||!t.secretKey)return console.warn(`팝빌 API 정보가 설정되지 않아 모의(Mock) 발송으로 처리됩니다.`),new Promise(t=>{setTimeout(()=>{t({success:!0,isMock:!0,receiptNum:`mock_receipt_`+Date.now(),message:`${e.receivers.length}건 발송 요청 완료 (모의)`})},1e3)});try{return console.log(`팝빌 전송 페이로드:`,e),{success:!0,receiptNum:`live_receipt_`+Date.now(),message:`발송 완료`}}catch(e){throw console.error(`팝빌 연동 오류:`,e),Error(`팝빌 메시지 전송에 실패했습니다: `+e.message)}}function Ge(){let e=document.createElement(`div`),t=[],n=null,r=[],i={},a=[];function o(){let o=T.getAll(`hosts`)||[],s=T.getAll(`projects`)||[],c=new Set(s.map(e=>e.brand).filter(e=>!!e)),l=Array.from(c).map(e=>({id:`brand_`+e,name:e}));e.innerHTML=`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">마케팅 메시지</h1>
            <p class="page-description">쇼호스트, 브랜드 및 고객에게 팝빌 카카오톡(알림톡/친구톡) 메시지를 발송합니다.</p>
          </div>
        </div>
      </div>
      
      <div class="page-body">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);">
          
          <!-- 좌측: 메시지 작성부 -->
          <div class="card">
            <div class="card-header">
              <h3>메시지 작성</h3>
            </div>
            <div class="card-body">
              <div class="form-grid" style="grid-template-columns: 1fr;">
                <div class="input-group">
                  <label>발송 유형</label>
                  <select class="input" id="msg-type">
                    <option value="alimtalk">알림톡 (승인된 템플릿 기반)</option>
                    <option value="friendtalk">친구톡 (자유 양식, 광고성 포함)</option>
                    <option value="sms">SMS/LMS (대체 문자)</option>
                  </select>
                </div>
                
                <!-- 알림톡 템플릿 선택 영역 -->
                <div class="input-group" id="alimtalk-template-section">
                  <label>알림톡 템플릿</label>
                  <select class="input" id="template-select">
                    <option value="">템플릿을 선택하세요</option>
                  </select>
                </div>

                <!-- 알림톡 변수 입력 영역 -->
                <div id="alimtalk-variables-section" style="display: none; padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-md); margin-bottom: var(--space-4);">
                  <h4 style="font-size: 13px; color: var(--text-secondary); margin-bottom: var(--space-3);">공통 변수 입력 (모든 수신자 동일)</h4>
                  <div class="form-grid" style="grid-template-columns: 1fr;" id="variable-inputs">
                    <!-- 변수 인풋 동적 생성 -->
                  </div>
                  <p style="font-size: 12px; color: var(--text-tertiary); margin-top: var(--space-2);">* #{이름}, #{고객명} 변수는 수신자 이름으로 자동 변환됩니다.</p>
                </div>
                
                <div class="input-group">
                  <label class="required" id="msg-content-label">메시지 내용 (미리보기)</label>
                  <textarea class="input" id="msg-content" rows="10" placeholder="발송할 메시지 내용을 입력하세요." readonly style="background: var(--bg-tertiary);"></textarea>
                  <p class="help-text" style="display:flex; justify-content:flex-end;">
                    <span id="msg-length">0</span> / 1000 자
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 우측: 수신자 선택부 -->
          <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
              <h3>수신자 선택</h3>
              <span class="badge badge-primary" id="receiver-count">0 명</span>
            </div>
            <div class="card-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
              
              <div style="display: flex; gap: var(--space-2);">
                <select class="input" id="receiver-group" style="flex: 1;">
                  <option value="">-- 그룹 선택하여 일괄 추가 --</option>
                  <option value="all_hosts">전체 쇼호스트</option>
                  <option value="all_brands">전체 브랜드</option>
                </select>
                <button class="btn btn-secondary" id="btn-add-group">추가</button>
              </div>

              <div style="display: flex; gap: var(--space-2);">
                <input type="text" class="input" id="manual-name" placeholder="이름 입력" style="flex: 1;">
                <input type="text" class="input" id="manual-phone" placeholder="연락처 (010-0000-0000)" style="flex: 2;">
                <button class="btn btn-secondary" id="btn-add-manual">추가</button>
              </div>

              <div class="table-scroll" style="height: 300px; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                <table class="data-table" style="margin: 0; box-shadow: none;">
                  <thead>
                    <tr>
                      <th>이름/소속</th>
                      <th>연락처</th>
                      <th class="text-right">삭제</th>
                    </tr>
                  </thead>
                  <tbody id="receiver-list">
                    <tr><td colspan="3" class="text-center" style="color: var(--text-tertiary); padding: 2rem 0;">수신자를 추가해주세요.</td></tr>
                  </tbody>
                </table>
              </div>
              
              <div style="margin-top: auto; padding-top: var(--space-4);">
                <button class="btn btn-primary" id="btn-send-message" style="width: 100%; height: 48px; font-size: 16px;">메시지 발송하기</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    `;let u=e.querySelector(`#msg-type`),d=e.querySelector(`#alimtalk-template-section`),f=e.querySelector(`#template-select`),p=e.querySelector(`#alimtalk-variables-section`),m=e.querySelector(`#variable-inputs`),h=e.querySelector(`#msg-content`),g=e.querySelector(`#msg-content-label`),_=()=>{let t=e.querySelector(`#receiver-list`),n=e.querySelector(`#receiver-count`);if(n.textContent=`${a.length} 명`,a.length===0){t.innerHTML=`<tr><td colspan="3" class="text-center" style="color: var(--text-tertiary); padding: 2rem 0;">수신자를 추가해주세요.</td></tr>`;return}t.innerHTML=a.map((e,t)=>`
        <tr>
          <td>${e.name}</td>
          <td>${e.phone}</td>
          <td class="text-right">
            <button class="btn btn-ghost btn-sm btn-del-receiver" data-idx="${t}" style="color: var(--status-error);">삭제</button>
          </td>
        </tr>
      `).join(``),t.querySelectorAll(`.btn-del-receiver`).forEach(e=>{e.addEventListener(`click`,e=>{a.splice(e.target.dataset.idx,1),_()})})},v=()=>{if(!n)return;let t=n.content;t=t.replace(/#\{이름\}/g,`(수신자명)`),t=t.replace(/#\{고객명\}/g,`(수신자명)`),r.forEach(e=>{let n=i[e]||`[${e} 입력]`,r=RegExp(`#\\{${e}\\}`,`g`);t=t.replace(r,n)}),h.value=t,e.querySelector(`#msg-length`).textContent=t.length},y=()=>{if(!n)return;let e=n.content.match(/#\{([^}]+)\}/g)||[];r=[...new Set(e.map(e=>e.replace(`#{`,``).replace(`}`,``)))].filter(e=>e!==`이름`&&e!==`고객명`),i={},r.length>0?(p.style.display=`block`,m.innerHTML=r.map(e=>`
          <div class="input-group" style="margin-bottom: 8px;">
            <label style="font-size: 12px;">#{${e}}</label>
            <input type="text" class="input var-input" data-var="${e}" placeholder="${e} 입력" style="padding: 4px 8px; font-size: 13px;">
          </div>
        `).join(``),m.querySelectorAll(`.var-input`).forEach(e=>{e.addEventListener(`input`,e=>{i[e.target.dataset.var]=e.target.value,v()})})):(p.style.display=`none`,m.innerHTML=``),v()};u.addEventListener(`change`,r=>{r.target.value===`alimtalk`?(d.style.display=`block`,h.readOnly=!0,h.style.background=`var(--bg-tertiary)`,g.textContent=`메시지 내용 (미리보기)`,!n&&t.length>0?(f.value=t[0].templateCode,n=t[0],y()):n?y():(p.style.display=`none`,h.value=``)):(d.style.display=`none`,p.style.display=`none`,h.readOnly=!1,h.style.background=`var(--bg-card)`,g.textContent=`메시지 내용`,h.value=``,e.querySelector(`#msg-length`).textContent=`0`)}),f.addEventListener(`change`,e=>{let r=e.target.value;n=t.find(e=>e.templateCode===r),y()}),h.addEventListener(`input`,t=>{e.querySelector(`#msg-length`).textContent=t.target.value.length}),Ue().then(e=>{t=e,t.length>0&&(f.innerHTML=`<option value="">템플릿을 선택하세요</option>`+t.map(e=>`<option value="${e.templateCode}">${e.templateName}</option>`).join(``))}),e.querySelector(`#btn-add-group`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#receiver-group`).value;t===`all_hosts`?(o.forEach(e=>{a.find(t=>t.phone===e.phone)||a.push({name:e.name,phone:e.phone||`010-0000-0000`})}),L(`쇼호스트 ${o.length}명을 추가했습니다.`)):t===`all_brands`&&(l.forEach(e=>{a.find(t=>t.name===e.name)||a.push({name:e.name,phone:`010-0000-0000`})}),L(`브랜드 ${l.length}개를 추가했습니다.`)),_()}),e.querySelector(`#btn-add-manual`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#manual-name`),n=e.querySelector(`#manual-phone`),r=t.value.trim(),i=n.value.trim();if(!r||!i){R(`이름과 연락처를 모두 입력해주세요.`);return}if(a.find(e=>e.phone===i)){R(`이미 추가된 연락처입니다.`);return}a.push({name:r,phone:i}),t.value=``,n.value=``,_()}),e.querySelector(`#btn-send-message`)?.addEventListener(`click`,async()=>{let t=u.value;if(t===`alimtalk`){if(!n){R(`알림톡 템플릿을 선택해주세요.`);return}let e=r.filter(e=>!i[e]);if(e.length>0){R(`변수 값을 입력해주세요: ${e.join(`, `)}`);return}}else if(!h.value.trim()){R(`메시지 내용을 입력해주세요.`);return}if(a.length===0){R(`수신자를 최소 1명 이상 추가해주세요.`);return}let o=e.querySelector(`#btn-send-message`);o.textContent=`발송 중...`,o.disabled=!0;try{let e={msgType:t,receivers:[]};t===`alimtalk`?(e.templateCode=n.templateCode,e.receivers=a.map(e=>{let t=n.content;return t=t.replace(/#\{이름\}/g,e.name).replace(/#\{고객명\}/g,e.name),r.forEach(e=>{let n=RegExp(`#\\{${e}\\}`,`g`);t=t.replace(n,i[e])}),{name:e.name,number:e.phone,content:t}})):(e.content=h.value.trim(),e.receivers=a.map(e=>({name:e.name,number:e.phone})));let o=await We(e);o.success&&(L(o.message),a=[],_())}catch(e){R(e.message)}finally{o.textContent=`메시지 발송하기`,o.disabled=!1}}),u.dispatchEvent(new Event(`change`))}return o(),e}function Ke(){let e=document.createElement(`div`),t=T.getCurrentRole();return e.innerHTML=`
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <h1 class="page-title">설정</h1>
          <p class="page-description">시스템 설정 및 권한 관리</p>
        </div>
      </div>
    </div>
    <div class="page-body">
      <!-- 데이터 관리 -->
      <div class="card" style="margin-bottom: var(--space-5);">
        <div class="card-header"><h3>데이터 동기화</h3></div>
        <div class="card-body">
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-4);">
            구글 시트에 수동으로 입력된 최신 데이터를 강제로 다시 불러옵니다.
          </p>
          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-primary" id="btn-sync-data">구글 시트 동기화</button>
          </div>
        </div>
      </div>

      <!-- 외부 API 연동 설정 -->
      ${t===`admin`?`
      <div class="card" style="margin-bottom: var(--space-5);">
        <div class="card-header"><h3>외부 API 연동 설정</h3></div>
        <div class="card-body">
          <div class="form-grid" style="grid-template-columns: 1fr;">
            <!-- 팝빌 -->
            <div class="input-group">
              <label style="font-weight:bold; color:#FFCD00;">팝빌(Popbill) 카카오 알림톡 API</label>
              <input type="text" class="input" id="setting-popbill-linkid" placeholder="팝빌 LinkID">
              <input type="password" class="input" id="setting-popbill-secret" placeholder="팝빌 SecretKey" style="margin-top:8px;">
              <input type="text" class="input" id="setting-popbill-sender" placeholder="발신번호 (예: 010-0000-0000)" style="margin-top:8px;">
              <p class="help-text">모의(Mock) 동작을 원하실 경우 비워두세요.</p>
            </div>

            <div>
              <button class="btn btn-primary btn-sm" id="btn-save-api-settings">설정 저장</button>
            </div>
          </div>
        </div>
      </div>
      `:``}

      <!-- 사용자 관리 (대표 전용) -->
      ${t===`admin`?`
      <div class="card" style="margin-bottom: var(--space-5);">
        <div class="card-header">
          <h3>사용자 관리</h3>
          <button class="btn btn-primary btn-sm" id="btn-create-user">계정 추가</button>
        </div>
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>비밀번호</th>
                <th>권한</th>
                <th class="text-right">관리</th>
              </tr>
            </thead>
            <tbody id="user-list-tbody">
              <!-- Users will be populated here -->
            </tbody>
          </table>
        </div>
      </div>
      `:``}

      <!-- 권한 매트릭스 -->
      <div class="card" style="margin-bottom: var(--space-5);">
        <div class="card-header"><h3>권한 매트릭스</h3></div>
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>메뉴</th>
                <th class="text-center">대표 (admin)</th>
                <th class="text-center">PD (pd)</th>
                <th class="text-center">디자이너 (designer)</th>
                <th class="text-center">회계 (accountant)</th>
              </tr>
            </thead>
            <tbody>
              ${[{menu:`대시보드`,admin:!0,pd:!0,designer:!0,accountant:!0},{menu:`라이브 관리`,admin:!0,pd:!0,designer:!1,accountant:!1},{menu:`쇼호스트 관리`,admin:!0,pd:!0,designer:!1,accountant:!1},{menu:`브랜드 관리`,admin:!0,pd:!0,designer:!1,accountant:!1},{menu:`매출/손익`,admin:!0,pd:!1,designer:!1,accountant:!0},{menu:`설정`,admin:!0,pd:!1,designer:!1,accountant:!1}].map(e=>`
                <tr>
                  <td style="font-weight: var(--weight-medium);">${e.menu}</td>
                  <td class="text-center">${e.admin?H():U()}</td>
                  <td class="text-center">${e.pd?H():U()}</td>
                  <td class="text-center">${e.designer?H():U()}</td>
                  <td class="text-center">${e.accountant?H():U()}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{if(e.querySelector(`#btn-sync-data`)?.addEventListener(`click`,async()=>{let t=e.querySelector(`#btn-sync-data`);t.textContent=`동기화 중...`,t.disabled=!0;try{if(await T.init()){L(`데이터 동기화가 완료되었습니다.`);let e=document.getElementById(`page-content`);e&&(e.innerHTML=``,e.appendChild(Ke()))}else R(`동기화에 실패했습니다.`)}catch{R(`초기화 실패`)}finally{t.disabled=!1,t.textContent=`구글 시트 동기화`}}),t===`admin`){let t=JSON.parse(localStorage.getItem(`ryzin_live_data`)||`{}`),n=t.settings||{},r=e.querySelector(`#setting-popbill-linkid`),i=e.querySelector(`#setting-popbill-secret`),a=e.querySelector(`#setting-popbill-sender`);r&&(r.value=n.popbillLinkId||``),i&&(i.value=n.popbillSecretKey||``),a&&(a.value=n.popbillSenderNumber||``),e.querySelector(`#btn-save-api-settings`)?.addEventListener(`click`,()=>{t.settings||={},t.settings.popbillLinkId=r.value.trim(),t.settings.popbillSecretKey=i.value.trim(),t.settings.popbillSenderNumber=a.value.trim(),localStorage.setItem(`ryzin_live_data`,JSON.stringify(t)),L(`API 연동 설정이 저장되었습니다.`)})}t===`admin`&&(qe(e),e.querySelector(`#btn-create-user`)?.addEventListener(`click`,()=>{Je()}))},0),e}function qe(e){let t=e.querySelector(`#user-list-tbody`);if(!t)return;let n=T.getAll(`users`);if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 사용자가 없습니다.</td></tr>`;return}t.innerHTML=n.map(e=>`
    <tr>
      <td style="font-weight: var(--weight-medium);">${e.id}</td>
      <td>${e.name}</td>
      <td><span style="color:var(--text-tertiary);">***</span></td>
      <td><span class="badge badge-default">${_[e.role]?.label||e.role}</span></td>
      <td class="text-right">
        <div style="display: flex; gap: var(--space-2); justify-content: flex-end;">
          <button class="btn btn-secondary btn-sm edit-user-btn" data-id="${e.id}">수정</button>
          <button class="btn btn-danger btn-sm delete-user-btn" data-id="${e.id}">삭제</button>
        </div>
      </td>
    </tr>
  `).join(``),t.querySelectorAll(`.edit-user-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=T.getById(`users`,e.getAttribute(`data-id`));t&&Je(t)})}),t.querySelectorAll(`.delete-user-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-id`);F({title:`사용자 삭제`,message:`해당 사용자를 삭제하시겠습니까?`,confirmText:`삭제`,danger:!0,onConfirm:()=>{T.delete(`users`,n),L(`사용자가 삭제되었습니다.`),qe(e)}})})})}function Je(e=null){let t=document.createElement(`div`);t.className=`form-grid`,t.innerHTML=`
    <div class="input-group">
      <label class="required">아이디</label>
      <input class="input" id="user-id" value="${e?e.id:``}" ${e?`disabled`:``}>
    </div>
    <div class="input-group">
      <label class="required">비밀번호</label>
      <input class="input" type="password" id="user-pw" value="${e?e.password:``}">
    </div>
    <div class="input-group">
      <label class="required">이름</label>
      <input class="input" id="user-name" value="${e?e.name:``}">
    </div>
    <div class="input-group">
      <label class="required">권한</label>
      <select class="input" id="user-role">
        ${Object.entries(_).map(([t,n])=>`<option value="${t}" ${e&&e.role===t?`selected`:``}>${n.label} (${t})</option>`).join(``)}
      </select>
    </div>
  `;let n=document.createElement(`div`);n.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let r=document.createElement(`button`);r.className=`btn btn-secondary`,r.textContent=`취소`,r.addEventListener(`click`,P);let i=document.createElement(`button`);i.className=`btn btn-primary`,i.textContent=`저장`,i.addEventListener(`click`,()=>{let t=document.getElementById(`user-id`).value.trim(),n=document.getElementById(`user-pw`).value.trim(),r=document.getElementById(`user-name`).value.trim(),i=document.getElementById(`user-role`).value;if(!t||!n||!r){R(`모든 항목을 입력해주세요.`);return}if(e)T.update(`users`,t,{password:n,name:r,role:i}),L(`사용자 정보가 수정되었습니다.`);else{if(T.getById(`users`,t)){R(`이미 존재하는 아이디입니다.`);return}T.create(`users`,{id:t,password:n,name:r,role:i}),L(`새로운 사용자가 등록되었습니다.`)}P();let a=document.getElementById(`page-content`);a&&(a.innerHTML=``,a.appendChild(Ke()))}),n.appendChild(r),n.appendChild(i),N({title:e?`사용자 수정`:`사용자 추가`,content:t,footer:n})}function H(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--status-success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`}function U(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`}var W=class extends Error{constructor(e,t){super(e,t),this.name=`OTPError`}},Ye=class extends W{constructor(e){super(e),this.name=`SecretError`}},Xe=class extends Ye{constructor(e,t){super(`Secret must be at least ${e} bytes (${e*8} bits), got ${t} bytes`),this.name=`SecretTooShortError`}},Ze=class extends Ye{constructor(e,t){super(`Secret must not exceed ${e} bytes, got ${t} bytes`),this.name=`SecretTooLongError`}},Qe=class extends W{constructor(e){super(e),this.name=`CounterError`}},$e=class extends Qe{constructor(){super(`Counter must be non-negative`),this.name=`CounterNegativeError`}},et=class extends Qe{constructor(){super(`Counter exceeds maximum safe integer value`),this.name=`CounterOverflowError`}},tt=class extends Qe{constructor(){super(`Counter must be a finite integer`),this.name=`CounterNotIntegerError`}},nt=class extends W{constructor(e){super(e),this.name=`TimeError`}},rt=class extends nt{constructor(){super(`Time must be non-negative`),this.name=`TimeNegativeError`}},it=class extends nt{constructor(){super(`Time must be a finite number`),this.name=`TimeNotFiniteError`}},at=class extends W{constructor(e){super(e),this.name=`PeriodError`}},ot=class extends at{constructor(e){super(`Period must be at least ${e} second(s)`),this.name=`PeriodTooSmallError`}},st=class extends at{constructor(e){super(`Period must not exceed ${e} seconds`),this.name=`PeriodTooLargeError`}},ct=class extends W{constructor(e){super(e),this.name=`TokenError`}},lt=class extends ct{constructor(e,t){super(`Token must be ${e} digits, got ${t}`),this.name=`TokenLengthError`}},ut=class extends ct{constructor(){super(`Token must contain only digits`),this.name=`TokenFormatError`}},dt=class extends W{constructor(e,t){super(e,t),this.name=`CryptoError`}},G=class extends dt{constructor(e,t){super(`HMAC computation failed: ${e}`,t),this.name=`HMACError`}},ft=class extends dt{constructor(e,t){super(`Random byte generation failed: ${e}`,t),this.name=`RandomBytesError`}},pt=class extends W{constructor(e){super(e),this.name=`EpochToleranceError`}},mt=class extends pt{constructor(){super(`Epoch tolerance cannot contain negative values`),this.name=`EpochToleranceNegativeError`}},ht=class extends pt{constructor(e,t){super(`Epoch tolerance must not exceed ${e} seconds, got ${t}. Large tolerances can cause performance issues.`),this.name=`EpochToleranceTooLargeError`}},gt=class extends W{constructor(e){super(e),this.name=`PluginError`}},_t=class extends gt{constructor(){super(`Crypto plugin is required.`),this.name=`CryptoPluginMissingError`}},vt=class extends gt{constructor(){super(`Base32 plugin is required.`),this.name=`Base32PluginMissingError`}},K=class extends W{constructor(e){super(e),this.name=`ConfigurationError`}},yt=class extends K{constructor(){super(`Secret is required. Use generateSecret() to create one, or provide via { secret: 'YOUR_BASE32_SECRET' }`),this.name=`SecretMissingError`}},bt=class extends K{constructor(){super(`Label is required for URI generation. Example: { label: 'user@example.com' }`),this.name=`LabelMissingError`}},xt=class extends K{constructor(){super(`Issuer is required for URI generation. Example: { issuer: 'MyApp' }`),this.name=`IssuerMissingError`}},St=class extends K{constructor(){super(`Class API requires secret to be a Base32 string, not Uint8Array. Use generateSecret() or provide a Base32-encoded string.`),this.name=`SecretTypeError`}},Ct=class extends W{constructor(e){super(e),this.name=`AfterTimeStepError`}},wt=class extends Ct{constructor(){super(`afterTimeStep must be >= 0`),this.name=`AfterTimeStepNegativeError`}},Tt=class extends Ct{constructor(){super(`Invalid afterTimeStep: non-integer value`),this.name=`AfterTimeStepNotIntegerError`}},Et=class extends Ct{constructor(){super(`Invalid afterTimeStep: cannot be greater than current time step plus window`),this.name=`AfterTimeStepRangeExceededError`}};new TextEncoder,new TextDecoder;var Dt=3600,Ot=2**53-1,kt=Symbol(`otplib.guardrails.override`);function q(e,t,n){if(typeof t!=`number`||!Number.isSafeInteger(t))throw new K(`Guardrail '${e}' must be a safe integer`);if(t<n)throw new K(`Guardrail '${e}' must be >= ${n}`)}var J=Object.freeze({MIN_SECRET_BYTES:16,MAX_SECRET_BYTES:64,MIN_PERIOD:1,MAX_PERIOD:Dt,MAX_COUNTER:Ot,MAX_WINDOW:99,[kt]:!1});function At(e){if(!e)return J;e.MIN_SECRET_BYTES!==void 0&&q(`MIN_SECRET_BYTES`,e.MIN_SECRET_BYTES,1),e.MAX_SECRET_BYTES!==void 0&&q(`MAX_SECRET_BYTES`,e.MAX_SECRET_BYTES,1),e.MIN_PERIOD!==void 0&&q(`MIN_PERIOD`,e.MIN_PERIOD,1),e.MAX_PERIOD!==void 0&&q(`MAX_PERIOD`,e.MAX_PERIOD,1),e.MAX_COUNTER!==void 0&&q(`MAX_COUNTER`,e.MAX_COUNTER,0),e.MAX_WINDOW!==void 0&&q(`MAX_WINDOW`,e.MAX_WINDOW,1);let t={...J,...e};if(t.MIN_SECRET_BYTES>t.MAX_SECRET_BYTES)throw new K(`Guardrail 'MIN_SECRET_BYTES' must be <= 'MAX_SECRET_BYTES'`);if(t.MIN_PERIOD>t.MAX_PERIOD)throw new K(`Guardrail 'MIN_PERIOD' must be <= 'MAX_PERIOD'`);return Object.freeze({...t,[kt]:!0})}function jt(e,t=J){if(e.length<t.MIN_SECRET_BYTES)throw new Xe(t.MIN_SECRET_BYTES,e.length);if(e.length>t.MAX_SECRET_BYTES)throw new Ze(t.MAX_SECRET_BYTES,e.length)}function Mt(e,t=J){if(typeof e==`number`){if(!Number.isFinite(e)||!Number.isInteger(e))throw new tt;if(!Number.isSafeInteger(e))throw new et}let n=typeof e==`bigint`?e:BigInt(e);if(n<0n)throw new $e;if(n>BigInt(t.MAX_COUNTER))throw new et}function Nt(e){if(!Number.isFinite(e))throw new it;if(e<0)throw new rt}function Pt(e,t=J){if(!Number.isInteger(e)||e<t.MIN_PERIOD)throw new ot(t.MIN_PERIOD);if(e>t.MAX_PERIOD)throw new st(t.MAX_PERIOD)}function Ft(e,t){if(e.length!==t)throw new lt(t,e.length);if(!/^\d+$/.test(e))throw new ut}function It(e,t=30,n=J){let[r,i]=Array.isArray(e)?e:[e,e];if(!Number.isSafeInteger(r)||!Number.isSafeInteger(i))throw new pt(`Epoch tolerance values must be safe integers`);if(r<0||i<0)throw new mt;let a=(n.MAX_WINDOW-1)*t,o=r+i;if(o>a)throw new ht(a,o)}function Lt(e){let t=typeof e==`bigint`?e:BigInt(e),n=new ArrayBuffer(8);return new DataView(n).setBigUint64(0,t,!1),new Uint8Array(n)}function Rt(e){let t=e[e.length-1]&15;return(e[t]&127)<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]}function zt(e,t){return(e%10**t).toString().padStart(t,`0`)}function Bt(e,t){return typeof e==`string`?(Ut(t),t.decode(e)):e}function Vt(e){let{crypto:t,base32:n,length:r=20}=e;Y(t),Ut(n);let i=t.randomBytes(r);return n.encode(i,{padding:!1})}function Ht(e=0){return Array.isArray(e)?e:[e,e]}function Y(e){if(!e)throw new _t}function Ut(e){if(!e)throw new vt}function X(e){if(!e)throw new yt}function Wt(e){if(!e)throw new bt}function Gt(e){if(!e)throw new xt}function Kt(e){if(typeof e!=`string`)throw new St}var qt=class{constructor(e){this.crypto=e}get plugin(){return this.crypto}async hmac(e,t,n){try{let r=this.crypto.hmac(e,t,n);return r instanceof Promise?await r:r}catch(e){throw new G(e instanceof Error?e.message:String(e),{cause:e})}}hmacSync(e,t,n){try{let r=this.crypto.hmac(e,t,n);if(r instanceof Promise)throw new G(`Crypto plugin does not support synchronous HMAC operations`);return r}catch(e){throw e instanceof G?e:new G(e instanceof Error?e.message:String(e),{cause:e})}}randomBytes(e){try{return this.crypto.randomBytes(e)}catch(e){throw new ft(e instanceof Error?e.message:String(e),{cause:e})}}};function Jt(e){return new qt(e)}function Yt(e){let{type:t,label:n,params:r}=e,i=`otpauth://${t}/${n.split(`:`).map(e=>encodeURIComponent(e)).join(`:`)}?`,a=[];return r.secret&&a.push(`secret=${encodeURIComponent(r.secret)}`),r.issuer&&a.push(`issuer=${encodeURIComponent(r.issuer)}`),r.algorithm&&r.algorithm!==`sha1`&&a.push(`algorithm=${r.algorithm.toUpperCase()}`),r.digits&&r.digits!==6&&a.push(`digits=${r.digits}`),t===`hotp`&&r.counter!==void 0&&a.push(`counter=${r.counter}`),t===`totp`&&r.period!==void 0&&r.period!==30&&a.push(`period=${r.period}`),i+=a.join(`&`),i}function Xt(e){let{issuer:t,label:n,secret:r,algorithm:i=`sha1`,digits:a=6,period:o=30}=e;return Yt({type:`totp`,label:t?`${t}:${n}`:n,params:{secret:r,issuer:t,algorithm:i,digits:a,period:o}})}function Zt(e){let{issuer:t,label:n,secret:r,counter:i=0,algorithm:a=`sha1`,digits:o=6}=e;return Yt({type:`hotp`,label:t?`${t}:${n}`:n,params:{secret:r,issuer:t,algorithm:a,digits:o,counter:i}})}function Qt(e){let{secret:t,counter:n,algorithm:r=`sha1`,digits:i=6,crypto:a,base32:o,guardrails:s,hooks:c}=e;X(t),Y(a);let l=Bt(t,o);return jt(l,s),Mt(n,s),{ctx:Jt(a),algorithm:r,digits:i,secretBytes:l,counterBytes:Lt(n),hooks:c}}async function $t(e){let{ctx:t,algorithm:n,digits:r,secretBytes:i,counterBytes:a,hooks:o}=Qt(e),s=await t.hmac(n,i,a),c=o?.truncateDigest?o.truncateDigest(s):Rt(s);return o?.encodeToken?o.encodeToken(c,r):zt(c,r)}var en=class{options;guardrails;constructor(e={}){this.options=e,this.guardrails=At(e.guardrails)}generateSecret(){let{crypto:e,base32:t}=this.options;return Y(e),Ut(t),Vt({crypto:e,base32:t})}async generate(e){let t={...this.options,...e},{secret:n,crypto:r,base32:i,algorithm:a=`sha1`,digits:o=6,period:s=30,epoch:c,t0:l=0}=t;X(n),Y(r);let u=e?.guardrails??this.guardrails;return nn({secret:n,algorithm:a,digits:o,period:s,epoch:c??Math.floor(Date.now()/1e3),t0:l,crypto:r,base32:i,guardrails:u,hooks:t.hooks})}async verify(e,t){let n={...this.options,...t},{secret:r,crypto:i,base32:a,algorithm:o=`sha1`,digits:s=6,period:c=30,epoch:l,t0:u=0,epochTolerance:d=0,afterTimeStep:f}=n;X(r),Y(i);let p=t?.guardrails??this.guardrails;return sn({secret:r,token:e,algorithm:o,digits:s,period:c,epoch:l??Math.floor(Date.now()/1e3),t0:u,epochTolerance:d,afterTimeStep:f,crypto:i,base32:a,guardrails:p,hooks:n.hooks})}toURI(e){let{issuer:t,label:n,secret:r,algorithm:i=`sha1`,digits:a=6,period:o=30}=this.options,s=e?.label??n,c=e?.issuer??t,l=e?.secret??r;return X(l),Wt(s),Gt(c),Kt(l),Xt({issuer:c,label:s,secret:l,algorithm:i,digits:a,period:o})}};function tn(e){let{secret:t,epoch:n=Math.floor(Date.now()/1e3),t0:r=0,period:i=30,algorithm:a=`sha1`,digits:o=6,crypto:s,base32:c,guardrails:l=At(),hooks:u}=e;X(t),Y(s);let d=Bt(t,c);return jt(d,l),Nt(n),Pt(i,l),{secret:d,counter:Math.floor((n-r)/i),algorithm:a,digits:o,crypto:s,guardrails:l,hooks:u}}async function nn(e){return $t(tn(e))}function rn(e,t){if(e!==void 0){if(e<0)throw new wt;if(!Number.isSafeInteger(e))throw new Tt;if(e>t)throw new Et}}function an(e,t){return t!==void 0&&e<=t}function on(e){let{secret:t,token:n,epoch:r=Math.floor(Date.now()/1e3),t0:i=0,period:a=30,algorithm:o=`sha1`,digits:s=6,crypto:c,base32:l,epochTolerance:u=0,afterTimeStep:d,guardrails:f=At(),hooks:p}=e;X(t),Y(c);let m=Bt(t,l);jt(m,f),Nt(r),Pt(a,f),p?.validateToken?p.validateToken(n,s):Ft(n,s),It(u,a,f);let h=Math.floor((r-i)/a),[g,_]=Ht(u),v=Math.max(0,Math.floor((r-g-i)/a)),y=Math.floor((r+_-i)/a);return rn(d,y),{token:n,crypto:c,minCounter:v,maxCounter:y,currentCounter:h,t0:i,period:a,afterTimeStep:d,getGenerateOptions:e=>({secret:m,epoch:e*a+i,t0:i,period:a,algorithm:o,digits:s,crypto:c,guardrails:f,hooks:p})}}async function sn(e){let{token:t,crypto:n,minCounter:r,maxCounter:i,currentCounter:a,t0:o,period:s,afterTimeStep:c,getGenerateOptions:l}=on(e);for(let e=r;e<=i;e++){if(an(e,c))continue;let r=await nn(l(e));if(n.constantTimeEqual(r,t))return{valid:!0,delta:e-a,epoch:e*s+o,timeStep:e}}return{valid:!1}}function cn(e,t,n){if(e===`totp`)return n.totp();if(e===`hotp`){if(t===void 0)throw new K(`Counter is required for HOTP strategy. Example: { strategy: 'hotp', counter: 0 }`);return n.hotp(t)}throw new K(`Unknown OTP strategy: ${e}. Valid strategies are 'totp' or 'hotp'.`)}function ln(e){let{strategy:t=`totp`,issuer:n,label:r,secret:i,algorithm:a=`sha1`,digits:o=6,period:s=30,counter:c}=e;return cn(t,c,{totp:()=>Xt({issuer:n,label:r,secret:i,algorithm:a,digits:o,period:s}),hotp:e=>Zt({issuer:n,label:r,secret:i,algorithm:a,digits:o,counter:e})})}var un=o(((e,t)=>{t.exports=function(){return typeof Promise==`function`&&Promise.prototype&&Promise.prototype.then}})),Z=o((e=>{var t,n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(e){if(!e)throw Error(`"version" cannot be null or undefined`);if(e<1||e>40)throw Error(`"version" should be in range from 1 to 40`);return e*4+17},e.getSymbolTotalCodewords=function(e){return n[e]},e.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t},e.setToSJISFunction=function(e){if(typeof e!=`function`)throw Error(`"toSJISFunc" is not a valid function.`);t=e},e.isKanjiModeEnabled=function(){return t!==void 0},e.toSJIS=function(e){return t(e)}})),dn=o((e=>{e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`l`:case`low`:return e.L;case`m`:case`medium`:return e.M;case`q`:case`quartile`:return e.Q;case`h`:case`high`:return e.H;default:throw Error(`Unknown EC Level: `+t)}}e.isValid=function(e){return e&&e.bit!==void 0&&e.bit>=0&&e.bit<4},e.from=function(n,r){if(e.isValid(n))return n;try{return t(n)}catch{return r}}})),fn=o(((e,t)=>{function n(){this.buffer=[],this.length=0}n.prototype={get:function(e){let t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)==1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},t.exports=n})),pn=o(((e,t)=>{function n(e){if(!e||e<1)throw Error(`BitMatrix size must be defined and greater than 0`);this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}n.prototype.set=function(e,t,n,r){let i=e*this.size+t;this.data[i]=n,r&&(this.reservedBit[i]=!0)},n.prototype.get=function(e,t){return this.data[e*this.size+t]},n.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},n.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},t.exports=n})),mn=o((e=>{var t=Z().getSymbolSize;e.getRowColCoords=function(e){if(e===1)return[];let n=Math.floor(e/7)+2,r=t(e),i=r===145?26:Math.ceil((r-13)/(2*n-2))*2,a=[r-7];for(let e=1;e<n-1;e++)a[e]=a[e-1]-i;return a.push(6),a.reverse()},e.getPositions=function(t){let n=[],r=e.getRowColCoords(t),i=r.length;for(let e=0;e<i;e++)for(let t=0;t<i;t++)e===0&&t===0||e===0&&t===i-1||e===i-1&&t===0||n.push([r[e],r[t]]);return n}})),hn=o((e=>{var t=Z().getSymbolSize,n=7;e.getPositions=function(e){let r=t(e);return[[0,0],[r-n,0],[0,r-n]]}})),gn=o((e=>{e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(e){return e!=null&&e!==``&&!isNaN(e)&&e>=0&&e<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(e){let n=e.size,r=0,i=0,a=0,o=null,s=null;for(let c=0;c<n;c++){i=a=0,o=s=null;for(let l=0;l<n;l++){let n=e.get(c,l);n===o?i++:(i>=5&&(r+=t.N1+(i-5)),o=n,i=1),n=e.get(l,c),n===s?a++:(a>=5&&(r+=t.N1+(a-5)),s=n,a=1)}i>=5&&(r+=t.N1+(i-5)),a>=5&&(r+=t.N1+(a-5))}return r},e.getPenaltyN2=function(e){let n=e.size,r=0;for(let t=0;t<n-1;t++)for(let i=0;i<n-1;i++){let n=e.get(t,i)+e.get(t,i+1)+e.get(t+1,i)+e.get(t+1,i+1);(n===4||n===0)&&r++}return r*t.N2},e.getPenaltyN3=function(e){let n=e.size,r=0,i=0,a=0;for(let t=0;t<n;t++){i=a=0;for(let o=0;o<n;o++)i=i<<1&2047|e.get(t,o),o>=10&&(i===1488||i===93)&&r++,a=a<<1&2047|e.get(o,t),o>=10&&(a===1488||a===93)&&r++}return r*t.N3},e.getPenaltyN4=function(e){let n=0,r=e.data.length;for(let t=0;t<r;t++)n+=e.data[t];return Math.abs(Math.ceil(n*100/r/5)-10)*t.N4};function n(t,n,r){switch(t){case e.Patterns.PATTERN000:return(n+r)%2==0;case e.Patterns.PATTERN001:return n%2==0;case e.Patterns.PATTERN010:return r%3==0;case e.Patterns.PATTERN011:return(n+r)%3==0;case e.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(r/3))%2==0;case e.Patterns.PATTERN101:return n*r%2+n*r%3==0;case e.Patterns.PATTERN110:return(n*r%2+n*r%3)%2==0;case e.Patterns.PATTERN111:return(n*r%3+(n+r)%2)%2==0;default:throw Error(`bad maskPattern:`+t)}}e.applyMask=function(e,t){let r=t.size;for(let i=0;i<r;i++)for(let a=0;a<r;a++)t.isReserved(a,i)||t.xor(a,i,n(e,a,i))},e.getBestMask=function(t,n){let r=Object.keys(e.Patterns).length,i=0,a=1/0;for(let o=0;o<r;o++){n(o),e.applyMask(o,t);let r=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(o,t),r<a&&(a=r,i=o)}return i}})),_n=o((e=>{var t=dn(),n=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(e,r){switch(r){case t.L:return n[(e-1)*4+0];case t.M:return n[(e-1)*4+1];case t.Q:return n[(e-1)*4+2];case t.H:return n[(e-1)*4+3];default:return}},e.getTotalCodewordsCount=function(e,n){switch(n){case t.L:return r[(e-1)*4+0];case t.M:return r[(e-1)*4+1];case t.Q:return r[(e-1)*4+2];case t.H:return r[(e-1)*4+3];default:return}}})),vn=o((e=>{var t=new Uint8Array(512),n=new Uint8Array(256);(function(){let e=1;for(let r=0;r<255;r++)t[r]=e,n[e]=r,e<<=1,e&256&&(e^=285);for(let e=255;e<512;e++)t[e]=t[e-255]})(),e.log=function(e){if(e<1)throw Error(`log(`+e+`)`);return n[e]},e.exp=function(e){return t[e]},e.mul=function(e,r){return e===0||r===0?0:t[n[e]+n[r]]}})),yn=o((e=>{var t=vn();e.mul=function(e,n){let r=new Uint8Array(e.length+n.length-1);for(let i=0;i<e.length;i++)for(let a=0;a<n.length;a++)r[i+a]^=t.mul(e[i],n[a]);return r},e.mod=function(e,n){let r=new Uint8Array(e);for(;r.length-n.length>=0;){let e=r[0];for(let i=0;i<n.length;i++)r[i]^=t.mul(n[i],e);let i=0;for(;i<r.length&&r[i]===0;)i++;r=r.slice(i)}return r},e.generateECPolynomial=function(n){let r=new Uint8Array([1]);for(let i=0;i<n;i++)r=e.mul(r,new Uint8Array([1,t.exp(i)]));return r}})),bn=o(((e,t)=>{var n=yn();function r(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}r.prototype.initialize=function(e){this.degree=e,this.genPoly=n.generateECPolynomial(this.degree)},r.prototype.encode=function(e){if(!this.genPoly)throw Error(`Encoder not initialized`);let t=new Uint8Array(e.length+this.degree);t.set(e);let r=n.mod(t,this.genPoly),i=this.degree-r.length;if(i>0){let e=new Uint8Array(this.degree);return e.set(r,i),e}return r},t.exports=r})),xn=o((e=>{e.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}})),Sn=o((e=>{var t=`[0-9]+`,n=`[A-Z $%*+\\-./:]+`,r=`(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+`;r=r.replace(/u/g,`\\u`);var i=`(?:(?![A-Z0-9 $%*+\\-./:]|`+r+`)(?:.|[\r
]))+`;e.KANJI=new RegExp(r,`g`),e.BYTE_KANJI=RegExp(`[^A-Z0-9 $%*+\\-./:]+`,`g`),e.BYTE=new RegExp(i,`g`),e.NUMERIC=new RegExp(t,`g`),e.ALPHANUMERIC=new RegExp(n,`g`);var a=RegExp(`^`+r+`$`),o=RegExp(`^[0-9]+$`),s=RegExp(`^[A-Z0-9 $%*+\\-./:]+$`);e.testKanji=function(e){return a.test(e)},e.testNumeric=function(e){return o.test(e)},e.testAlphanumeric=function(e){return s.test(e)}})),Q=o((e=>{var t=xn(),n=Sn();e.NUMERIC={id:`Numeric`,bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:`Alphanumeric`,bit:2,ccBits:[9,11,13]},e.BYTE={id:`Byte`,bit:4,ccBits:[8,16,16]},e.KANJI={id:`Kanji`,bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(e,n){if(!e.ccBits)throw Error(`Invalid mode: `+e);if(!t.isValid(n))throw Error(`Invalid version: `+n);return n>=1&&n<10?e.ccBits[0]:n<27?e.ccBits[1]:e.ccBits[2]},e.getBestModeForData=function(t){return n.testNumeric(t)?e.NUMERIC:n.testAlphanumeric(t)?e.ALPHANUMERIC:n.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(e){if(e&&e.id)return e.id;throw Error(`Invalid mode`)},e.isValid=function(e){return e&&e.bit&&e.ccBits};function r(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`numeric`:return e.NUMERIC;case`alphanumeric`:return e.ALPHANUMERIC;case`kanji`:return e.KANJI;case`byte`:return e.BYTE;default:throw Error(`Unknown mode: `+t)}}e.from=function(t,n){if(e.isValid(t))return t;try{return r(t)}catch{return n}}})),Cn=o((e=>{var t=Z(),n=_n(),r=dn(),i=Q(),a=xn(),o=7973,s=t.getBCHDigit(o);function c(t,n,r){for(let i=1;i<=40;i++)if(n<=e.getCapacity(i,r,t))return i}function l(e,t){return i.getCharCountIndicator(e,t)+4}function u(e,t){let n=0;return e.forEach(function(e){let r=l(e.mode,t);n+=r+e.getBitsLength()}),n}function d(t,n){for(let r=1;r<=40;r++)if(u(t,r)<=e.getCapacity(r,n,i.MIXED))return r}e.from=function(e,t){return a.isValid(e)?parseInt(e,10):t},e.getCapacity=function(e,r,o){if(!a.isValid(e))throw Error(`Invalid QR Code version`);o===void 0&&(o=i.BYTE);let s=(t.getSymbolTotalCodewords(e)-n.getTotalCodewordsCount(e,r))*8;if(o===i.MIXED)return s;let c=s-l(o,e);switch(o){case i.NUMERIC:return Math.floor(c/10*3);case i.ALPHANUMERIC:return Math.floor(c/11*2);case i.KANJI:return Math.floor(c/13);case i.BYTE:default:return Math.floor(c/8)}},e.getBestVersionForData=function(e,t){let n,i=r.from(t,r.M);if(Array.isArray(e)){if(e.length>1)return d(e,i);if(e.length===0)return 1;n=e[0]}else n=e;return c(n.mode,n.getLength(),i)},e.getEncodedBits=function(e){if(!a.isValid(e)||e<7)throw Error(`Invalid QR Code version`);let n=e<<12;for(;t.getBCHDigit(n)-s>=0;)n^=o<<t.getBCHDigit(n)-s;return e<<12|n}})),wn=o((e=>{var t=Z(),n=1335,r=21522,i=t.getBCHDigit(n);e.getEncodedBits=function(e,a){let o=e.bit<<3|a,s=o<<10;for(;t.getBCHDigit(s)-i>=0;)s^=n<<t.getBCHDigit(s)-i;return(o<<10|s)^r}})),Tn=o(((e,t)=>{var n=Q();function r(e){this.mode=n.NUMERIC,this.data=e.toString()}r.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let t,n,r;for(t=0;t+3<=this.data.length;t+=3)n=this.data.substr(t,3),r=parseInt(n,10),e.put(r,10);let i=this.data.length-t;i>0&&(n=this.data.substr(t),r=parseInt(n,10),e.put(r,i*3+1))},t.exports=r})),En=o(((e,t)=>{var n=Q(),r=`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:`.split(``);function i(e){this.mode=n.ALPHANUMERIC,this.data=e}i.getBitsLength=function(e){return 11*Math.floor(e/2)+e%2*6},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let n=r.indexOf(this.data[t])*45;n+=r.indexOf(this.data[t+1]),e.put(n,11)}this.data.length%2&&e.put(r.indexOf(this.data[t]),6)},t.exports=i})),Dn=o(((e,t)=>{var n=Q();function r(e){this.mode=n.BYTE,typeof e==`string`?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}r.getBitsLength=function(e){return e*8},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},t.exports=r})),On=o(((e,t)=>{var n=Q(),r=Z();function i(e){this.mode=n.KANJI,this.data=e}i.getBitsLength=function(e){return e*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let n=r.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error(`Invalid SJIS character: `+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}},t.exports=i})),kn=o(((e,t)=>{var n={single_source_shortest_paths:function(e,t,r){var i={},a={};a[t]=0;var o=n.PriorityQueue.make();o.push(t,0);for(var s,c,l,u,d,f,p,m,h;!o.empty();)for(l in s=o.pop(),c=s.value,u=s.cost,d=e[c]||{},d)d.hasOwnProperty(l)&&(f=d[l],p=u+f,m=a[l],h=a[l]===void 0,(h||m>p)&&(a[l]=p,o.push(l,p),i[l]=c));if(r!==void 0&&a[r]===void 0){var g=[`Could not find a path from `,t,` to `,r,`.`].join(``);throw Error(g)}return i},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],r=t;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,t,r){var i=n.single_source_shortest_paths(e,t,r);return n.extract_shortest_path_from_predecessor_list(i,r)},PriorityQueue:{make:function(e){var t=n.PriorityQueue,r={},i;for(i in e||={},t)t.hasOwnProperty(i)&&(r[i]=t[i]);return r.queue=[],r.sorter=e.sorter||t.default_sorter,r},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){var n={value:e,cost:t};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t!==void 0&&(t.exports=n)})),An=o((e=>{var t=Q(),n=Tn(),r=En(),i=Dn(),a=On(),o=Sn(),s=Z(),c=kn();function l(e){return unescape(encodeURIComponent(e)).length}function u(e,t,n){let r=[],i;for(;(i=e.exec(n))!==null;)r.push({data:i[0],index:i.index,mode:t,length:i[0].length});return r}function d(e){let n=u(o.NUMERIC,t.NUMERIC,e),r=u(o.ALPHANUMERIC,t.ALPHANUMERIC,e),i,a;return s.isKanjiModeEnabled()?(i=u(o.BYTE,t.BYTE,e),a=u(o.KANJI,t.KANJI,e)):(i=u(o.BYTE_KANJI,t.BYTE,e),a=[]),n.concat(r,i,a).sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function f(e,o){switch(o){case t.NUMERIC:return n.getBitsLength(e);case t.ALPHANUMERIC:return r.getBitsLength(e);case t.KANJI:return a.getBitsLength(e);case t.BYTE:return i.getBitsLength(e)}}function p(e){return e.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?(e[e.length-1].data+=t.data,e):(e.push(t),e)},[])}function m(e){let n=[];for(let r=0;r<e.length;r++){let i=e[r];switch(i.mode){case t.NUMERIC:n.push([i,{data:i.data,mode:t.ALPHANUMERIC,length:i.length},{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.ALPHANUMERIC:n.push([i,{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.KANJI:n.push([i,{data:i.data,mode:t.BYTE,length:l(i.data)}]);break;case t.BYTE:n.push([{data:i.data,mode:t.BYTE,length:l(i.data)}])}}return n}function h(e,n){let r={},i={start:{}},a=[`start`];for(let o=0;o<e.length;o++){let s=e[o],c=[];for(let e=0;e<s.length;e++){let l=s[e],u=``+o+e;c.push(u),r[u]={node:l,lastCount:0},i[u]={};for(let e=0;e<a.length;e++){let o=a[e];r[o]&&r[o].node.mode===l.mode?(i[o][u]=f(r[o].lastCount+l.length,l.mode)-f(r[o].lastCount,l.mode),r[o].lastCount+=l.length):(r[o]&&(r[o].lastCount=l.length),i[o][u]=f(l.length,l.mode)+4+t.getCharCountIndicator(l.mode,n))}}a=c}for(let e=0;e<a.length;e++)i[a[e]].end=0;return{map:i,table:r}}function g(e,o){let c,l=t.getBestModeForData(e);if(c=t.from(o,l),c!==t.BYTE&&c.bit<l.bit)throw Error(`"`+e+`" cannot be encoded with mode `+t.toString(c)+`.
 Suggested mode is: `+t.toString(l));switch(c===t.KANJI&&!s.isKanjiModeEnabled()&&(c=t.BYTE),c){case t.NUMERIC:return new n(e);case t.ALPHANUMERIC:return new r(e);case t.KANJI:return new a(e);case t.BYTE:return new i(e)}}e.fromArray=function(e){return e.reduce(function(e,t){return typeof t==`string`?e.push(g(t,null)):t.data&&e.push(g(t.data,t.mode)),e},[])},e.fromString=function(t,n){let r=h(m(d(t,s.isKanjiModeEnabled())),n),i=c.find_path(r.map,`start`,`end`),a=[];for(let e=1;e<i.length-1;e++)a.push(r.table[i[e]].node);return e.fromArray(p(a))},e.rawSplit=function(t){return e.fromArray(d(t,s.isKanjiModeEnabled()))}})),jn=o((e=>{var t=Z(),n=dn(),r=fn(),i=pn(),a=mn(),o=hn(),s=gn(),c=_n(),l=bn(),u=Cn(),d=wn(),f=Q(),p=An();function m(e,t){let n=e.size,r=o.getPositions(t);for(let t=0;t<r.length;t++){let i=r[t][0],a=r[t][1];for(let t=-1;t<=7;t++)if(!(i+t<=-1||n<=i+t))for(let r=-1;r<=7;r++)a+r<=-1||n<=a+r||(t>=0&&t<=6&&(r===0||r===6)||r>=0&&r<=6&&(t===0||t===6)||t>=2&&t<=4&&r>=2&&r<=4?e.set(i+t,a+r,!0,!0):e.set(i+t,a+r,!1,!0))}}function h(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}function g(e,t){let n=a.getPositions(t);for(let t=0;t<n.length;t++){let r=n[t][0],i=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)t===-2||t===2||n===-2||n===2||t===0&&n===0?e.set(r+t,i+n,!0,!0):e.set(r+t,i+n,!1,!0)}}function _(e,t){let n=e.size,r=u.getEncodedBits(t),i,a,o;for(let t=0;t<18;t++)i=Math.floor(t/3),a=t%3+n-8-3,o=(r>>t&1)==1,e.set(i,a,o,!0),e.set(a,i,o,!0)}function v(e,t,n){let r=e.size,i=d.getEncodedBits(t,n),a,o;for(a=0;a<15;a++)o=(i>>a&1)==1,a<6?e.set(a,8,o,!0):a<8?e.set(a+1,8,o,!0):e.set(r-15+a,8,o,!0),a<8?e.set(8,r-a-1,o,!0):a<9?e.set(8,15-a-1+1,o,!0):e.set(8,15-a-1,o,!0);e.set(r-8,8,1,!0)}function y(e,t){let n=e.size,r=-1,i=n-1,a=7,o=0;for(let s=n-1;s>0;s-=2)for(s===6&&s--;;){for(let n=0;n<2;n++)if(!e.isReserved(i,s-n)){let r=!1;o<t.length&&(r=(t[o]>>>a&1)==1),e.set(i,s-n,r),a--,a===-1&&(o++,a=7)}if(i+=r,i<0||n<=i){i-=r,r=-r;break}}}function b(e,n,i){let a=new r;i.forEach(function(t){a.put(t.mode.bit,4),a.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),t.write(a)});let o=(t.getSymbolTotalCodewords(e)-c.getTotalCodewordsCount(e,n))*8;for(a.getLengthInBits()+4<=o&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(0);let s=(o-a.getLengthInBits())/8;for(let e=0;e<s;e++)a.put(e%2?17:236,8);return x(a,e,n)}function x(e,n,r){let i=t.getSymbolTotalCodewords(n),a=i-c.getTotalCodewordsCount(n,r),o=c.getBlocksCount(n,r),s=o-i%o,u=Math.floor(i/o),d=Math.floor(a/o),f=d+1,p=u-d,m=new l(p),h=0,g=Array(o),_=Array(o),v=0,y=new Uint8Array(e.buffer);for(let e=0;e<o;e++){let t=e<s?d:f;g[e]=y.slice(h,h+t),_[e]=m.encode(g[e]),h+=t,v=Math.max(v,t)}let b=new Uint8Array(i),x=0,S,C;for(S=0;S<v;S++)for(C=0;C<o;C++)S<g[C].length&&(b[x++]=g[C][S]);for(S=0;S<p;S++)for(C=0;C<o;C++)b[x++]=_[C][S];return b}function S(e,n,r,a){let o;if(Array.isArray(e))o=p.fromArray(e);else if(typeof e==`string`){let t=n;if(!t){let n=p.rawSplit(e);t=u.getBestVersionForData(n,r)}o=p.fromString(e,t||40)}else throw Error(`Invalid data`);let c=u.getBestVersionForData(o,r);if(!c)throw Error(`The amount of data is too big to be stored in a QR Code`);if(!n)n=c;else if(n<c)throw Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+c+`.
`);let l=b(n,r,o),d=new i(t.getSymbolSize(n));return m(d,n),h(d),g(d,n),v(d,r,0),n>=7&&_(d,n),y(d,l),isNaN(a)&&(a=s.getBestMask(d,v.bind(null,d,r))),s.applyMask(a,d),v(d,r,a),{modules:d,version:n,errorCorrectionLevel:r,maskPattern:a,segments:o}}e.create=function(e,r){if(e===void 0||e===``)throw Error(`No input text`);let i=n.M,a,o;return r!==void 0&&(i=n.from(r.errorCorrectionLevel,n.M),a=u.from(r.version),o=s.from(r.maskPattern),r.toSJISFunc&&t.setToSJISFunction(r.toSJISFunc)),S(e,a,i,o)}})),Mn=o((e=>{function t(e){if(typeof e==`number`&&(e=e.toString()),typeof e!=`string`)throw Error(`Color should be defined as hex string`);let t=e.slice().replace(`#`,``).split(``);if(t.length<3||t.length===5||t.length>8)throw Error(`Invalid hex color: `+e);(t.length===3||t.length===4)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),t.length===6&&t.push(`F`,`F`);let n=parseInt(t.join(``),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:`#`+t.slice(0,6).join(``)}}e.getOptions=function(e){e||={},e.color||={};let n=e.margin===void 0||e.margin===null||e.margin<0?4:e.margin,r=e.width&&e.width>=21?e.width:void 0,i=e.scale||4;return{width:r,scale:r?4:i,margin:n,color:{dark:t(e.color.dark||`#000000ff`),light:t(e.color.light||`#ffffffff`)},type:e.type,rendererOpts:e.rendererOpts||{}}},e.getScale=function(e,t){return t.width&&t.width>=e+t.margin*2?t.width/(e+t.margin*2):t.scale},e.getImageWidth=function(t,n){let r=e.getScale(t,n);return Math.floor((t+n.margin*2)*r)},e.qrToImageData=function(t,n,r){let i=n.modules.size,a=n.modules.data,o=e.getScale(i,r),s=Math.floor((i+r.margin*2)*o),c=r.margin*o,l=[r.color.light,r.color.dark];for(let e=0;e<s;e++)for(let n=0;n<s;n++){let u=(e*s+n)*4,d=r.color.light;if(e>=c&&n>=c&&e<s-c&&n<s-c){let t=Math.floor((e-c)/o),r=Math.floor((n-c)/o);d=l[+!!a[t*i+r]]}t[u++]=d.r,t[u++]=d.g,t[u++]=d.b,t[u]=d.a}}})),Nn=o((e=>{var t=Mn();function n(e,t,n){e.clearRect(0,0,t.width,t.height),t.style||={},t.height=n,t.width=n,t.style.height=n+`px`,t.style.width=n+`px`}function r(){try{return document.createElement(`canvas`)}catch{throw Error(`You need to specify a canvas element`)}}e.render=function(e,i,a){let o=a,s=i;o===void 0&&(!i||!i.getContext)&&(o=i,i=void 0),i||(s=r()),o=t.getOptions(o);let c=t.getImageWidth(e.modules.size,o),l=s.getContext(`2d`),u=l.createImageData(c,c);return t.qrToImageData(u.data,e,o),n(l,s,c),l.putImageData(u,0,0),s},e.renderToDataURL=function(t,n,r){let i=r;i===void 0&&(!n||!n.getContext)&&(i=n,n=void 0),i||={};let a=e.render(t,n,i),o=i.type||`image/png`,s=i.rendererOpts||{};return a.toDataURL(o,s.quality)}})),Pn=o((e=>{var t=Mn();function n(e,t){let n=e.a/255,r=t+`="`+e.hex+`"`;return n<1?r+` `+t+`-opacity="`+n.toFixed(2).slice(1)+`"`:r}function r(e,t,n){let r=e+t;return n!==void 0&&(r+=` `+n),r}function i(e,t,n){let i=``,a=0,o=!1,s=0;for(let c=0;c<e.length;c++){let l=Math.floor(c%t),u=Math.floor(c/t);!l&&!o&&(o=!0),e[c]?(s++,c>0&&l>0&&e[c-1]||(i+=o?r(`M`,l+n,.5+u+n):r(`m`,a,0),a=0,o=!1),l+1<t&&e[c+1]||(i+=r(`h`,s),s=0)):a++}return i}e.render=function(e,r,a){let o=t.getOptions(r),s=e.modules.size,c=e.modules.data,l=s+o.margin*2,u=o.color.light.a?`<path `+n(o.color.light,`fill`)+` d="M0 0h`+l+`v`+l+`H0z"/>`:``,d=`<path `+n(o.color.dark,`stroke`)+` d="`+i(c,s,o.margin)+`"/>`,f=`viewBox="0 0 `+l+` `+l+`"`,p=`<svg xmlns="http://www.w3.org/2000/svg" `+(o.width?`width="`+o.width+`" height="`+o.width+`" `:``)+f+` shape-rendering="crispEdges">`+u+d+`</svg>
`;return typeof a==`function`&&a(null,p),p}})),Fn=c(o((e=>{var t=un(),n=jn(),r=Nn(),i=Pn();function a(e,r,i,a,o){let s=[].slice.call(arguments,1),c=s.length,l=typeof s[c-1]==`function`;if(!l&&!t())throw Error(`Callback required as last argument`);if(l){if(c<2)throw Error(`Too few arguments provided`);c===2?(o=i,i=r,r=a=void 0):c===3&&(r.getContext&&o===void 0?(o=a,a=void 0):(o=a,a=i,i=r,r=void 0))}else{if(c<1)throw Error(`Too few arguments provided`);return c===1?(i=r,r=a=void 0):c===2&&!r.getContext&&(a=i,i=r,r=void 0),new Promise(function(t,o){try{t(e(n.create(i,a),r,a))}catch(e){o(e)}})}try{let t=n.create(i,a);o(null,e(t,r,a))}catch(e){o(e)}}e.create=n.create,e.toCanvas=a.bind(null,r.render),e.toDataURL=a.bind(null,r.renderToDataURL),e.toString=a.bind(null,function(e,t,n){return i.render(e,n)})}))(),1),$=new en;$.options={window:1};function In(){let e=document.createElement(`div`);return e.className=`login-container`,e.innerHTML=`
    <style>
      .login-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background: linear-gradient(135deg, #f6f8fd 0%, #f1f5f9 100%);
        position: relative;
        overflow: hidden;
      }
      .login-wrapper::before, .login-wrapper::after {
        content: "";
        position: absolute;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        filter: blur(80px);
        z-index: 0;
        opacity: 0.5;
        animation: float 10s infinite ease-in-out alternate;
      }
      .login-wrapper::before {
        background: rgba(59, 130, 246, 0.15);
        top: -100px;
        left: -100px;
      }
      .login-wrapper::after {
        background: rgba(139, 92, 246, 0.15);
        bottom: -150px;
        right: -100px;
        animation-delay: -5s;
      }
      @keyframes float {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-30px) scale(1.05); }
      }
      .login-card-container {
        width: 100%;
        max-width: 420px;
        z-index: 1;
        position: relative;
        overflow: hidden;
        border-radius: 24px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0,0,0,0.05);
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.5);
      }
      .slide-container {
        display: flex;
        width: 200%;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .slide-pane {
        width: 50%;
        padding: 40px;
        flex-shrink: 0;
        text-align: center;
      }
      .login-logo {
        display: flex;
        justify-content: center;
        margin-bottom: 8px;
      }
      .login-logo img {
        height: 48px;
        object-fit: contain;
      }
      .login-subtitle {
        color: var(--text-secondary);
        font-size: 15px;
        margin-bottom: 32px;
      }
      .login-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        text-align: left;
      }
      .input-group {
        position: relative;
      }
      .login-input {
        width: 100%;
        padding: 14px 16px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        font-size: 15px;
        color: var(--text-primary);
        transition: all 0.2s ease;
      }
      .login-input::placeholder {
        color: var(--text-tertiary);
      }
      .login-input:focus {
        outline: none;
        background: #fff;
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.15);
      }
      .login-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: var(--text-secondary);
        font-size: 13px;
        letter-spacing: 0.02em;
      }
      .login-btn {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 8px;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }
      .login-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
      }
      .otp-qrcode {
        margin: 16px auto;
        padding: 8px;
        background: white;
        border-radius: 8px;
        width: fit-content;
      }
      .otp-qrcode img {
        width: 150px;
        height: 150px;
      }
    </style>
    <div class="login-wrapper">
      <div class="login-card-container">
        <div class="slide-container" id="login-slider">
          
          <!-- Step 1: ID / Password -->
          <div class="slide-pane" id="step-1">
            <div class="login-logo">
              <img src="${re}" alt="Ryzin Logo" />
            </div>
            <div class="login-subtitle">라이브커머스 운영 관리 시스템</div>
            <form class="login-form" id="login-form">
              <div class="input-group">
                <label class="login-label">아이디</label>
                <input type="text" id="login-id" class="login-input" placeholder="계정 아이디를 입력하세요" required autocomplete="username">
              </div>
              <div class="input-group">
                <label class="login-label">비밀번호</label>
                <input type="password" id="login-pw" class="login-input" placeholder="비밀번호를 입력하세요" required autocomplete="current-password">
              </div>
              <button type="submit" class="login-btn">로그인</button>
            </form>
          </div>

          <!-- Step 2: Google OTP -->
          <div class="slide-pane" id="step-2">
            <div class="login-logo">
              <img src="${re}" alt="Ryzin Logo" />
            </div>
            <div class="login-subtitle" style="margin-bottom: 16px;">보안 강화를 위해 2단계 인증을 완료해주세요.</div>
            
            <div id="otp-setup-container" style="display: none; text-align: center; margin-bottom: 20px;">
              <div style="font-size: 13px; color: var(--text-tertiary); background: #f1f5f9; padding: 12px; border-radius: 8px; text-align: left; line-height: 1.5;">
                <strong>최초 1회 등록 안내</strong><br>
                스마트폰의 Google OTP 앱을 실행하고 아래 QR 코드를 스캔하여 계정을 추가해주세요.
              </div>
              <div class="otp-qrcode" id="qrcode-box"></div>
            </div>

            <form class="login-form" id="otp-form">
              <div class="input-group">
                <label class="login-label">Google OTP 인증번호</label>
                <input type="text" id="login-otp" class="login-input" placeholder="6자리 숫자를 입력하세요" required maxlength="6" pattern="[0-9]{6}" autocomplete="off" style="text-align: center; font-size: 24px; letter-spacing: 4px; font-weight: bold;">
              </div>
              <button type="submit" class="login-btn">인증 및 로그인</button>
              <button type="button" class="btn btn-ghost" id="btn-back" style="width: 100%; margin-top: 8px; color: var(--text-tertiary);">뒤로 가기</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  `,setTimeout(()=>{let e=document.getElementById(`login-form`),t=document.getElementById(`otp-form`),n=document.getElementById(`login-slider`),r=document.getElementById(`btn-back`),i=document.getElementById(`otp-setup-container`),a=document.getElementById(`qrcode-box`),o=document.getElementById(`login-otp`),s=null,c=null;e&&e.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`login-id`).value.trim(),r=document.getElementById(`login-pw`).value,l=T.verifyPassword(t,r);if(l){if(s=l,localStorage.getItem(`ryzin_otp_${t}`))i.style.display=`none`;else{c=$.generateSecret();let e=$.generateURI?$.generateURI(t,`Ryzin Admin`,c):ln({issuer:`Ryzin Admin`,accountName:t,secret:c});i.style.display=`block`;try{a.innerHTML=`<img src="${await Fn.toDataURL(e,{margin:1,width:150})}" alt="QR Code">`}catch(e){console.error(`QR 생성이 실패했습니다.`,e)}}n.style.transform=`translateX(-50%)`,setTimeout(()=>o.focus(),400)}else R(`로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.`)}),t&&t.addEventListener(`submit`,e=>{if(e.preventDefault(),!s)return;let t=o.value.trim(),n=localStorage.getItem(`ryzin_otp_${s.id}`),r=n||c;try{$.check(t,r)?(!n&&c&&localStorage.setItem(`ryzin_otp_${s.id}`,c),T.completeLogin(s),L(`OTP 인증 성공! 환영합니다.`),l.navigate(`/`)):(R(`인증번호가 올바르지 않습니다.`),o.value=``,o.focus())}catch{R(`인증 과정에 문제가 발생했습니다.`)}}),r&&r.addEventListener(`click`,()=>{n.style.transform=`translateX(0)`,s=null,o.value=``})},0),e}async function Ln(){let e=document.getElementById(`app`);if(e.innerHTML=`
    <div style="display:flex; align-items:center; justify-content:center; height:100vh;">
      <div style="width:48px; height:48px; border:4px solid rgba(0,0,0,0.05); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
      <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    </div>
  `,!await T.init()){e.innerHTML=`
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; gap:16px;">
        <div style="color:var(--danger); font-weight:600; font-size:var(--text-lg);">구글 시트 연동에 실패했습니다.</div>
        <div style="color:var(--text-secondary);">SheetDB API 주소나 네트워크 상태를 확인해주세요.</div>
      </div>
    `;return}let t=()=>{if(e.querySelector(`.sidebar`))return;e.innerHTML=``,e.className=`app-layout`,e.appendChild(oe());let t=document.createElement(`main`);t.className=`main-content`,t.id=`page-content`,e.appendChild(t),l.setContainer(t)};l.beforeEach(n=>{let r=!!T.getCurrentUser();return!r&&n!==`/login`?`/login`:r&&n===`/login`?`/`:(n===`/login`?(e.innerHTML=``,e.className=``,l.setContainer(e)):t(),!0)}),l.register(`/login`,()=>In()),l.register(`/`,()=>pe()),l.register(`/projects`,()=>we()),l.register(`/projects/new`,()=>we()),l.register(`/projects/:id`,e=>Ee(e)),l.register(`/hosts`,()=>_e()),l.register(`/hosts/:id`,e=>ye(e)),l.register(`/brands`,()=>xe()),l.register(`/brands/:id`,e=>Ce(e)),l.register(`/finance`,()=>Le()),l.register(`/settlement`,()=>Re()),l.register(`/contracts`,()=>Ve()),l.register(`/marketing`,()=>Ge()),l.register(`/settings`,()=>Ke()),l.start(),document.addEventListener(`click`,e=>{let t=e.target.closest(`a[href]`);t&&t.getAttribute(`href`).startsWith(`/`)&&!t.getAttribute(`target`)&&(e.preventDefault(),l.navigate(t.getAttribute(`href`)))})}Ln();