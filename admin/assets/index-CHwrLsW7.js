var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),l=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error('Calling `require` for "'+e+"\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.")});(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=new class{constructor(){this._routes={},this._currentRoute=null,this._container=null,this._beforeHooks=[],window.addEventListener(`popstate`,()=>this._handleRoute()),window.addEventListener(`hashchange`,()=>this._handleRoute())}register(e,t){return this._routes[e]=t,this}beforeEach(e){return this._beforeHooks.push(e),this}setContainer(e){return this._container=e,this}navigate(e,t=!1){if(e===this._currentRoute)return;let n=`#`+e;t?window.location.replace(n):window.location.hash=n,this._handleRoute()}getCurrentPath(){let e=window.location.hash.slice(1)||`/`;return e.startsWith(`/`)||(e=`/`+e),e}_handleRoute(){let e=this.getCurrentPath();this._currentRoute=e;let t=null,n={};for(let[r,i]of Object.entries(this._routes)){let a=this._matchRoute(r,e);if(a){t=i,n=a.params;break}}for(let t of this._beforeHooks){let n=t(e);if(n===!1)return;if(typeof n==`string`){this.navigate(n,!0);return}}if(!t){this.navigate(`/`,!0);return}if(this._updateSidebarActive(e),this._container){this._container.innerHTML=``;let e=t(n);typeof e==`string`?this._container.innerHTML=e:e instanceof HTMLElement&&this._container.appendChild(e)}}_matchRoute(e,t){let n=e.split(`/`).filter(Boolean),r=t.split(`/`).filter(Boolean);if(n.length!==r.length)return null;let i={};for(let e=0;e<n.length;e++)if(n[e].startsWith(`:`))i[n[e].substring(1)]=decodeURIComponent(r[e]);else if(n[e]!==r[e])return null;return{params:i}}_updateSidebarActive(e){document.querySelectorAll(`.sidebar-item`).forEach(t=>{t.classList.remove(`active`);let n=t.getAttribute(`data-href`);(n===`/`&&e===`/`||n!==`/`&&e.startsWith(n))&&t.classList.add(`active`)})}start(){this._handleRoute()}},d=[{key:`scheduled`,label:`일정부킹`,color:`indigo`},{key:`host_cast`,label:`쇼호스트 선정`,color:`rose`},{key:`tech_request`,label:`기술서요청`,color:`purple`},{key:`design`,label:`디자인진행`,color:`orange`},{key:`cue_sheet`,label:`큐시트작성`,color:`yellow`},{key:`done`,label:`방송종료`,color:`gray`}],f=[{key:`wait`,label:`대기`,color:`orange`},{key:`done`,label:`완료`,color:`green`}],p=[`네이버`,`카카오`,`쿠팡`,`그립`,`자사몰`,`유튜브`,`틱톡`],m=[{key:`new`,label:`신규문의`,color:`blue`},{key:`quote`,label:`견적발송`,color:`orange`},{key:`meeting`,label:`미팅진행`,color:`purple`},{key:`contract`,label:`계약완료`,color:`green`},{key:`hold`,label:`보류/취소`,color:`gray`}],h=[{key:`S`,label:`S급 (VIP)`},{key:`A`,label:`A급 (주요)`},{key:`B`,label:`B급 (일반)`},{key:`C`,label:`C급 (잠재)`}],g=[{key:`kakao`,label:`카카오톡`,icon:``},{key:`phone`,label:`전화`,icon:``},{key:`sms`,label:`문자`,icon:``},{key:`email`,label:`이메일`,icon:``},{key:`meeting`,label:`미팅`,icon:``}],_=[`뷰티`,`패션`,`식품`,`가전`,`생활`,`건강`,`유아`,`반려동물`,`기타`],v=[{key:`main`,label:`메인 쇼호스트`},{key:`sub`,label:`서브 쇼호스트`},{key:`guest`,label:`게스트`}],y=[{key:`requested`,label:`요청`},{key:`working`,label:`작업중`},{key:`reviewing`,label:`검수중`},{key:`done`,label:`완료`}],b={admin:{label:`대표`,permissions:[`*`]},pd:{label:`PD`,permissions:[`dashboard`,`projects`,`products`,`hosts`,`brands`,`marketing`]},designer:{label:`디자이너`,permissions:[`dashboard`,`projects.design`]},accountant:{label:`회계`,permissions:[`dashboard`,`finance`,`settlement`,`projects.finance`]},demo:{label:`데모 계정`,permissions:[`*`]}},x=[`국민은행`,`신한은행`,`우리은행`,`하나은행`,`IBK기업은행`,`NH농협은행`,`카카오뱅크`,`토스뱅크`,`SC제일은행`,`대구은행`,`부산은행`,`광주은행`,`전북은행`,`경남은행`,`제주은행`,`수협은행`,`새마을금고`,`신협`,`우체국`];function S(e=``){let t=Date.now().toString(36),n=Math.random().toString(36).substr(2,5);return e?`${e}_${t}${n}`:`${t}${n}`}function C(e){let t=d.find(t=>t.key===e);return t?t.label:e}function w(e){let t=f.find(t=>t.key===e);return t?t.label:e}function T(e){let t=d.find(t=>t.label===e);return t?t.key:`done`}function E(e){let t=f.find(t=>t.label===e);return t?t.key:`wait`}var D=o(((e,t)=>{t.exports={}})),O=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r():typeof define==`function`&&define.amd?define([],r):n.CryptoJS=r()})(e,function(){var e=e||function(e,t){var n;if(typeof window<`u`&&window.crypto&&(n=window.crypto),typeof self<`u`&&self.crypto&&(n=self.crypto),typeof globalThis<`u`&&globalThis.crypto&&(n=globalThis.crypto),!n&&typeof window<`u`&&window.msCrypto&&(n=window.msCrypto),!n&&typeof global<`u`&&global.crypto&&(n=global.crypto),!n&&typeof l==`function`)try{n=D()}catch{}var r=function(){if(n){if(typeof n.getRandomValues==`function`)try{return n.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof n.randomBytes==`function`)try{return n.randomBytes(4).readInt32LE()}catch{}}throw Error(`Native crypto module could not be used to get secure random number.`)},i=Object.create||function(){function e(){}return function(t){var n;return e.prototype=t,n=new e,e.prototype=null,n}}(),a={},o=a.lib={},s=o.Base=function(){return{extend:function(e){var t=i(this);return e&&t.mixIn(e),(!t.hasOwnProperty(`init`)||this.init===t.init)&&(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty(`toString`)&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),c=o.WordArray=s.extend({init:function(e,n){e=this.words=e||[],n==t?this.sigBytes=e.length*4:this.sigBytes=n},toString:function(e){return(e||d).stringify(this)},concat:function(e){var t=this.words,n=e.words,r=this.sigBytes,i=e.sigBytes;if(this.clamp(),r%4)for(var a=0;a<i;a++){var o=n[a>>>2]>>>24-a%4*8&255;t[r+a>>>2]|=o<<24-(r+a)%4*8}else for(var s=0;s<i;s+=4)t[r+s>>>2]=n[s>>>2];return this.sigBytes+=i,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-n%4*8,t.length=e.ceil(n/4)},clone:function(){var e=s.clone.call(this);return e.words=this.words.slice(0),e},random:function(e){for(var t=[],n=0;n<e;n+=4)t.push(r());return new c.init(t,e)}}),u=a.enc={},d=u.Hex={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i++){var a=t[i>>>2]>>>24-i%4*8&255;r.push((a>>>4).toString(16)),r.push((a&15).toString(16))}return r.join(``)},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r+=2)n[r>>>3]|=parseInt(e.substr(r,2),16)<<24-r%8*4;return new c.init(n,t/2)}},f=u.Latin1={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i++){var a=t[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(a))}return r.join(``)},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r++)n[r>>>2]|=(e.charCodeAt(r)&255)<<24-r%4*8;return new c.init(n,t)}},p=u.Utf8={stringify:function(e){try{return decodeURIComponent(escape(f.stringify(e)))}catch{throw Error(`Malformed UTF-8 data`)}},parse:function(e){return f.parse(unescape(encodeURIComponent(e)))}},m=o.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new c.init,this._nDataBytes=0},_append:function(e){typeof e==`string`&&(e=p.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var n,r=this._data,i=r.words,a=r.sigBytes,o=this.blockSize,s=a/(o*4);s=t?e.ceil(s):e.max((s|0)-this._minBufferSize,0);var l=s*o,u=e.min(l*4,a);if(l){for(var d=0;d<l;d+=o)this._doProcessBlock(i,d);n=i.splice(0,l),r.sigBytes-=u}return new c.init(n,u)},clone:function(){var e=s.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});o.Hasher=m.extend({cfg:s.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){m.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:512/32,_createHelper:function(e){return function(t,n){return new e.init(n).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return new h.HMAC.init(e,n).finalize(t)}}});var h=a.algo={};return a}(Math);return e})})),k=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(O()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.Base,a=r.WordArray,o=n.x64={};o.Word=i.extend({init:function(e,t){this.high=e,this.low=t}}),o.WordArray=i.extend({init:function(e,n){e=this.words=e||[],n==t?this.sigBytes=e.length*8:this.sigBytes=n},toX32:function(){for(var e=this.words,t=e.length,n=[],r=0;r<t;r++){var i=e[r];n.push(i.high),n.push(i.low)}return a.create(n,this.sigBytes)},clone:function(){for(var e=i.clone.call(this),t=e.words=this.words.slice(0),n=t.length,r=0;r<n;r++)t[r]=t[r].clone();return e}})})(),e})})),A=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(O()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){if(typeof ArrayBuffer==`function`){var t=e.lib.WordArray,n=t.init,r=t.init=function(e){if(e instanceof ArrayBuffer&&(e=new Uint8Array(e)),(e instanceof Int8Array||typeof Uint8ClampedArray<`u`&&e instanceof Uint8ClampedArray||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array)&&(e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),e instanceof Uint8Array){for(var t=e.byteLength,r=[],i=0;i<t;i++)r[i>>>2]|=e[i]<<24-i%4*8;n.call(this,r,t)}else n.apply(this,arguments)};r.prototype=t}})(),e.lib.WordArray})})),j=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(O()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.enc;r.Utf16=r.Utf16BE={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i+=2){var a=t[i>>>2]>>>16-i%4*8&65535;r.push(String.fromCharCode(a))}return r.join(``)},parse:function(e){for(var t=e.length,r=[],i=0;i<t;i++)r[i>>>1]|=e.charCodeAt(i)<<16-i%2*16;return n.create(r,t*2)}},r.Utf16LE={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],a=0;a<n;a+=2){var o=i(t[a>>>2]>>>16-a%4*8&65535);r.push(String.fromCharCode(o))}return r.join(``)},parse:function(e){for(var t=e.length,r=[],a=0;a<t;a++)r[a>>>1]|=i(e.charCodeAt(a)<<16-a%2*16);return n.create(r,t*2)}};function i(e){return e<<8&4278255360|e>>>8&16711935}})(),e.enc.Utf16})})),M=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(O()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.enc;r.Base64={stringify:function(e){var t=e.words,n=e.sigBytes,r=this._map;e.clamp();for(var i=[],a=0;a<n;a+=3)for(var o=t[a>>>2]>>>24-a%4*8&255,s=t[a+1>>>2]>>>24-(a+1)%4*8&255,c=t[a+2>>>2]>>>24-(a+2)%4*8&255,l=o<<16|s<<8|c,u=0;u<4&&a+u*.75<n;u++)i.push(r.charAt(l>>>6*(3-u)&63));var d=r.charAt(64);if(d)for(;i.length%4;)i.push(d);return i.join(``)},parse:function(e){var t=e.length,n=this._map,r=this._reverseMap;if(!r){r=this._reverseMap=[];for(var a=0;a<n.length;a++)r[n.charCodeAt(a)]=a}var o=n.charAt(64);if(o){var s=e.indexOf(o);s!==-1&&(t=s)}return i(e,t,r)},_map:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`};function i(e,t,r){for(var i=[],a=0,o=0;o<t;o++)if(o%4){var s=r[e.charCodeAt(o-1)]<<o%4*2|r[e.charCodeAt(o)]>>>6-o%4*2;i[a>>>2]|=s<<24-a%4*8,a++}return n.create(i,a)}})(),e.enc.Base64})})),N=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(O()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.enc;r.Base64url={stringify:function(e,t){t===void 0&&(t=!0);var n=e.words,r=e.sigBytes,i=t?this._safe_map:this._map;e.clamp();for(var a=[],o=0;o<r;o+=3)for(var s=n[o>>>2]>>>24-o%4*8&255,c=n[o+1>>>2]>>>24-(o+1)%4*8&255,l=n[o+2>>>2]>>>24-(o+2)%4*8&255,u=s<<16|c<<8|l,d=0;d<4&&o+d*.75<r;d++)a.push(i.charAt(u>>>6*(3-d)&63));var f=i.charAt(64);if(f)for(;a.length%4;)a.push(f);return a.join(``)},parse:function(e,t){t===void 0&&(t=!0);var n=e.length,r=t?this._safe_map:this._map,a=this._reverseMap;if(!a){a=this._reverseMap=[];for(var o=0;o<r.length;o++)a[r.charCodeAt(o)]=o}var s=r.charAt(64);if(s){var c=e.indexOf(s);c!==-1&&(n=c)}return i(e,n,a)},_map:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,_safe_map:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`};function i(e,t,r){for(var i=[],a=0,o=0;o<t;o++)if(o%4){var s=r[e.charCodeAt(o-1)]<<o%4*2|r[e.charCodeAt(o)]>>>6-o%4*2;i[a>>>2]|=s<<24-a%4*8,a++}return n.create(i,a)}})(),e.enc.Base64url})})),P=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(O()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.algo,s=[];(function(){for(var e=0;e<64;e++)s[e]=t.abs(t.sin(e+1))*4294967296|0})();var c=o.MD5=a.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var n=0;n<16;n++){var r=t+n,i=e[r];e[r]=(i<<8|i>>>24)&16711935|(i<<24|i>>>8)&4278255360}var a=this._hash.words,o=e[t+0],c=e[t+1],p=e[t+2],m=e[t+3],h=e[t+4],g=e[t+5],_=e[t+6],v=e[t+7],y=e[t+8],b=e[t+9],x=e[t+10],S=e[t+11],C=e[t+12],w=e[t+13],T=e[t+14],E=e[t+15],D=a[0],O=a[1],k=a[2],A=a[3];D=l(D,O,k,A,o,7,s[0]),A=l(A,D,O,k,c,12,s[1]),k=l(k,A,D,O,p,17,s[2]),O=l(O,k,A,D,m,22,s[3]),D=l(D,O,k,A,h,7,s[4]),A=l(A,D,O,k,g,12,s[5]),k=l(k,A,D,O,_,17,s[6]),O=l(O,k,A,D,v,22,s[7]),D=l(D,O,k,A,y,7,s[8]),A=l(A,D,O,k,b,12,s[9]),k=l(k,A,D,O,x,17,s[10]),O=l(O,k,A,D,S,22,s[11]),D=l(D,O,k,A,C,7,s[12]),A=l(A,D,O,k,w,12,s[13]),k=l(k,A,D,O,T,17,s[14]),O=l(O,k,A,D,E,22,s[15]),D=u(D,O,k,A,c,5,s[16]),A=u(A,D,O,k,_,9,s[17]),k=u(k,A,D,O,S,14,s[18]),O=u(O,k,A,D,o,20,s[19]),D=u(D,O,k,A,g,5,s[20]),A=u(A,D,O,k,x,9,s[21]),k=u(k,A,D,O,E,14,s[22]),O=u(O,k,A,D,h,20,s[23]),D=u(D,O,k,A,b,5,s[24]),A=u(A,D,O,k,T,9,s[25]),k=u(k,A,D,O,m,14,s[26]),O=u(O,k,A,D,y,20,s[27]),D=u(D,O,k,A,w,5,s[28]),A=u(A,D,O,k,p,9,s[29]),k=u(k,A,D,O,v,14,s[30]),O=u(O,k,A,D,C,20,s[31]),D=d(D,O,k,A,g,4,s[32]),A=d(A,D,O,k,y,11,s[33]),k=d(k,A,D,O,S,16,s[34]),O=d(O,k,A,D,T,23,s[35]),D=d(D,O,k,A,c,4,s[36]),A=d(A,D,O,k,h,11,s[37]),k=d(k,A,D,O,v,16,s[38]),O=d(O,k,A,D,x,23,s[39]),D=d(D,O,k,A,w,4,s[40]),A=d(A,D,O,k,o,11,s[41]),k=d(k,A,D,O,m,16,s[42]),O=d(O,k,A,D,_,23,s[43]),D=d(D,O,k,A,b,4,s[44]),A=d(A,D,O,k,C,11,s[45]),k=d(k,A,D,O,E,16,s[46]),O=d(O,k,A,D,p,23,s[47]),D=f(D,O,k,A,o,6,s[48]),A=f(A,D,O,k,v,10,s[49]),k=f(k,A,D,O,T,15,s[50]),O=f(O,k,A,D,g,21,s[51]),D=f(D,O,k,A,C,6,s[52]),A=f(A,D,O,k,m,10,s[53]),k=f(k,A,D,O,x,15,s[54]),O=f(O,k,A,D,c,21,s[55]),D=f(D,O,k,A,y,6,s[56]),A=f(A,D,O,k,E,10,s[57]),k=f(k,A,D,O,_,15,s[58]),O=f(O,k,A,D,w,21,s[59]),D=f(D,O,k,A,h,6,s[60]),A=f(A,D,O,k,S,10,s[61]),k=f(k,A,D,O,p,15,s[62]),O=f(O,k,A,D,b,21,s[63]),a[0]=a[0]+D|0,a[1]=a[1]+O|0,a[2]=a[2]+k|0,a[3]=a[3]+A|0},_doFinalize:function(){var e=this._data,n=e.words,r=this._nDataBytes*8,i=e.sigBytes*8;n[i>>>5]|=128<<24-i%32;var a=t.floor(r/4294967296),o=r;n[(i+64>>>9<<4)+15]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360,n[(i+64>>>9<<4)+14]=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,e.sigBytes=(n.length+1)*4,this._process();for(var s=this._hash,c=s.words,l=0;l<4;l++){var u=c[l];c[l]=(u<<8|u>>>24)&16711935|(u<<24|u>>>8)&4278255360}return s},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});function l(e,t,n,r,i,a,o){var s=e+(t&n|~t&r)+i+o;return(s<<a|s>>>32-a)+t}function u(e,t,n,r,i,a,o){var s=e+(t&r|n&~r)+i+o;return(s<<a|s>>>32-a)+t}function d(e,t,n,r,i,a,o){var s=e+(t^n^r)+i+o;return(s<<a|s>>>32-a)+t}function f(e,t,n,r,i,a,o){var s=e+(n^(t|~r))+i+o;return(s<<a|s>>>32-a)+t}n.MD5=a._createHelper(c),n.HmacMD5=a._createHmacHelper(c)})(Math),e.MD5})})),ee=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(O()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.WordArray,i=n.Hasher,a=t.algo,o=[],s=a.SHA1=i.extend({_doReset:function(){this._hash=new r.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],a=n[2],s=n[3],c=n[4],l=0;l<80;l++){if(l<16)o[l]=e[t+l]|0;else{var u=o[l-3]^o[l-8]^o[l-14]^o[l-16];o[l]=u<<1|u>>>31}var d=(r<<5|r>>>27)+c+o[l];l<20?d+=(i&a|~i&s)+1518500249:l<40?d+=(i^a^s)+1859775393:l<60?d+=(i&a|i&s|a&s)-1894007588:d+=(i^a^s)-899497514,c=s,s=a,a=i<<30|i>>>2,i=r,r=d}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+a|0,n[3]=n[3]+s|0,n[4]=n[4]+c|0},_doFinalize:function(){var e=this._data,t=e.words,n=this._nDataBytes*8,r=e.sigBytes*8;return t[r>>>5]|=128<<24-r%32,t[(r+64>>>9<<4)+14]=Math.floor(n/4294967296),t[(r+64>>>9<<4)+15]=n,e.sigBytes=t.length*4,this._process(),this._hash},clone:function(){var e=i.clone.call(this);return e._hash=this._hash.clone(),e}});t.SHA1=i._createHelper(s),t.HmacSHA1=i._createHmacHelper(s)})(),e.SHA1})})),te=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(O()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.algo,s=[],c=[];(function(){function e(e){for(var n=t.sqrt(e),r=2;r<=n;r++)if(!(e%r))return!1;return!0}function n(e){return(e-(e|0))*4294967296|0}for(var r=2,i=0;i<64;)e(r)&&(i<8&&(s[i]=n(t.pow(r,1/2))),c[i]=n(t.pow(r,1/3)),i++),r++})();var l=[],u=o.SHA256=a.extend({_doReset:function(){this._hash=new i.init(s.slice(0))},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],u=n[5],d=n[6],f=n[7],p=0;p<64;p++){if(p<16)l[p]=e[t+p]|0;else{var m=l[p-15],h=(m<<25|m>>>7)^(m<<14|m>>>18)^m>>>3,g=l[p-2],_=(g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10;l[p]=h+l[p-7]+_+l[p-16]}var v=s&u^~s&d,y=r&i^r&a^i&a,b=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),x=(s<<26|s>>>6)^(s<<21|s>>>11)^(s<<7|s>>>25),S=f+x+v+c[p]+l[p],C=b+y;f=d,d=u,u=s,s=o+S|0,o=a,a=i,i=r,r=S+C|0}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+a|0,n[3]=n[3]+o|0,n[4]=n[4]+s|0,n[5]=n[5]+u|0,n[6]=n[6]+d|0,n[7]=n[7]+f|0},_doFinalize:function(){var e=this._data,n=e.words,r=this._nDataBytes*8,i=e.sigBytes*8;return n[i>>>5]|=128<<24-i%32,n[(i+64>>>9<<4)+14]=t.floor(r/4294967296),n[(i+64>>>9<<4)+15]=r,e.sigBytes=n.length*4,this._process(),this._hash},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});n.SHA256=a._createHelper(u),n.HmacSHA256=a._createHmacHelper(u)})(Math),e.SHA256})})),F=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),te()):typeof define==`function`&&define.amd?define([`./core`,`./sha256`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.algo,i=r.SHA256,a=r.SHA224=i.extend({_doReset:function(){this._hash=new n.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var e=i._doFinalize.call(this);return e.sigBytes-=4,e}});t.SHA224=i._createHelper(a),t.HmacSHA224=i._createHmacHelper(a)})(),e.SHA224})})),I=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),k()):typeof define==`function`&&define.amd?define([`./core`,`./x64-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.Hasher,r=t.x64,i=r.Word,a=r.WordArray,o=t.algo;function s(){return i.create.apply(i,arguments)}var c=[s(1116352408,3609767458),s(1899447441,602891725),s(3049323471,3964484399),s(3921009573,2173295548),s(961987163,4081628472),s(1508970993,3053834265),s(2453635748,2937671579),s(2870763221,3664609560),s(3624381080,2734883394),s(310598401,1164996542),s(607225278,1323610764),s(1426881987,3590304994),s(1925078388,4068182383),s(2162078206,991336113),s(2614888103,633803317),s(3248222580,3479774868),s(3835390401,2666613458),s(4022224774,944711139),s(264347078,2341262773),s(604807628,2007800933),s(770255983,1495990901),s(1249150122,1856431235),s(1555081692,3175218132),s(1996064986,2198950837),s(2554220882,3999719339),s(2821834349,766784016),s(2952996808,2566594879),s(3210313671,3203337956),s(3336571891,1034457026),s(3584528711,2466948901),s(113926993,3758326383),s(338241895,168717936),s(666307205,1188179964),s(773529912,1546045734),s(1294757372,1522805485),s(1396182291,2643833823),s(1695183700,2343527390),s(1986661051,1014477480),s(2177026350,1206759142),s(2456956037,344077627),s(2730485921,1290863460),s(2820302411,3158454273),s(3259730800,3505952657),s(3345764771,106217008),s(3516065817,3606008344),s(3600352804,1432725776),s(4094571909,1467031594),s(275423344,851169720),s(430227734,3100823752),s(506948616,1363258195),s(659060556,3750685593),s(883997877,3785050280),s(958139571,3318307427),s(1322822218,3812723403),s(1537002063,2003034995),s(1747873779,3602036899),s(1955562222,1575990012),s(2024104815,1125592928),s(2227730452,2716904306),s(2361852424,442776044),s(2428436474,593698344),s(2756734187,3733110249),s(3204031479,2999351573),s(3329325298,3815920427),s(3391569614,3928383900),s(3515267271,566280711),s(3940187606,3454069534),s(4118630271,4000239992),s(116418474,1914138554),s(174292421,2731055270),s(289380356,3203993006),s(460393269,320620315),s(685471733,587496836),s(852142971,1086792851),s(1017036298,365543100),s(1126000580,2618297676),s(1288033470,3409855158),s(1501505948,4234509866),s(1607167915,987167468),s(1816402316,1246189591)],l=[];(function(){for(var e=0;e<80;e++)l[e]=s()})();var u=o.SHA512=n.extend({_doReset:function(){this._hash=new a.init([new i.init(1779033703,4089235720),new i.init(3144134277,2227873595),new i.init(1013904242,4271175723),new i.init(2773480762,1595750129),new i.init(1359893119,2917565137),new i.init(2600822924,725511199),new i.init(528734635,4215389547),new i.init(1541459225,327033209)])},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],u=n[5],d=n[6],f=n[7],p=r.high,m=r.low,h=i.high,g=i.low,_=a.high,v=a.low,y=o.high,b=o.low,x=s.high,S=s.low,C=u.high,w=u.low,T=d.high,E=d.low,D=f.high,O=f.low,k=p,A=m,j=h,M=g,N=_,P=v,ee=y,te=b,F=x,I=S,ne=C,re=w,ie=T,ae=E,oe=D,L=O,R=0;R<80;R++){var z,se,ce=l[R];if(R<16)se=ce.high=e[t+R*2]|0,z=ce.low=e[t+R*2+1]|0;else{var le=l[R-15],ue=le.high,de=le.low,fe=(ue>>>1|de<<31)^(ue>>>8|de<<24)^ue>>>7,pe=(de>>>1|ue<<31)^(de>>>8|ue<<24)^(de>>>7|ue<<25),me=l[R-2],he=me.high,ge=me.low,_e=(he>>>19|ge<<13)^(he<<3|ge>>>29)^he>>>6,ve=(ge>>>19|he<<13)^(ge<<3|he>>>29)^(ge>>>6|he<<26),ye=l[R-7],be=ye.high,xe=ye.low,Se=l[R-16],Ce=Se.high,B=Se.low;z=pe+xe,se=fe+be+ +(z>>>0<pe>>>0),z+=ve,se=se+_e+ +(z>>>0<ve>>>0),z+=B,se=se+Ce+ +(z>>>0<B>>>0),ce.high=se,ce.low=z}var we=F&ne^~F&ie,V=I&re^~I&ae,Te=k&j^k&N^j&N,Ee=A&M^A&P^M&P,De=(k>>>28|A<<4)^(k<<30|A>>>2)^(k<<25|A>>>7),Oe=(A>>>28|k<<4)^(A<<30|k>>>2)^(A<<25|k>>>7),ke=(F>>>14|I<<18)^(F>>>18|I<<14)^(F<<23|I>>>9),Ae=(I>>>14|F<<18)^(I>>>18|F<<14)^(I<<23|F>>>9),H=c[R],U=H.high,W=H.low,G=L+Ae,K=oe+ke+ +(G>>>0<L>>>0),G=G+V,K=K+we+ +(G>>>0<V>>>0),G=G+W,K=K+U+ +(G>>>0<W>>>0),G=G+z,K=K+se+ +(G>>>0<z>>>0),je=Oe+Ee,Me=De+Te+ +(je>>>0<Oe>>>0);oe=ie,L=ae,ie=ne,ae=re,ne=F,re=I,I=te+G|0,F=ee+K+ +(I>>>0<te>>>0)|0,ee=N,te=P,N=j,P=M,j=k,M=A,A=G+je|0,k=K+Me+ +(A>>>0<G>>>0)|0}m=r.low=m+A,r.high=p+k+ +(m>>>0<A>>>0),g=i.low=g+M,i.high=h+j+ +(g>>>0<M>>>0),v=a.low=v+P,a.high=_+N+ +(v>>>0<P>>>0),b=o.low=b+te,o.high=y+ee+ +(b>>>0<te>>>0),S=s.low=S+I,s.high=x+F+ +(S>>>0<I>>>0),w=u.low=w+re,u.high=C+ne+ +(w>>>0<re>>>0),E=d.low=E+ae,d.high=T+ie+ +(E>>>0<ae>>>0),O=f.low=O+L,f.high=D+oe+ +(O>>>0<L>>>0)},_doFinalize:function(){var e=this._data,t=e.words,n=this._nDataBytes*8,r=e.sigBytes*8;return t[r>>>5]|=128<<24-r%32,t[(r+128>>>10<<5)+30]=Math.floor(n/4294967296),t[(r+128>>>10<<5)+31]=n,e.sigBytes=t.length*4,this._process(),this._hash.toX32()},clone:function(){var e=n.clone.call(this);return e._hash=this._hash.clone(),e},blockSize:1024/32});t.SHA512=n._createHelper(u),t.HmacSHA512=n._createHmacHelper(u)})(),e.SHA512})})),ne=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),k(),I()):typeof define==`function`&&define.amd?define([`./core`,`./x64-core`,`./sha512`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.x64,r=n.Word,i=n.WordArray,a=t.algo,o=a.SHA512,s=a.SHA384=o.extend({_doReset:function(){this._hash=new i.init([new r.init(3418070365,3238371032),new r.init(1654270250,914150663),new r.init(2438529370,812702999),new r.init(355462360,4144912697),new r.init(1731405415,4290775857),new r.init(2394180231,1750603025),new r.init(3675008525,1694076839),new r.init(1203062813,3204075428)])},_doFinalize:function(){var e=o._doFinalize.call(this);return e.sigBytes-=16,e}});t.SHA384=o._createHelper(s),t.HmacSHA384=o._createHmacHelper(s)})(),e.SHA384})})),re=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),k()):typeof define==`function`&&define.amd?define([`./core`,`./x64-core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.x64.Word,s=n.algo,c=[],l=[],u=[];(function(){for(var e=1,t=0,n=0;n<24;n++){c[e+5*t]=(n+1)*(n+2)/2%64;var r=t%5,i=(2*e+3*t)%5;e=r,t=i}for(var e=0;e<5;e++)for(var t=0;t<5;t++)l[e+5*t]=t+(2*e+3*t)%5*5;for(var a=1,s=0;s<24;s++){for(var d=0,f=0,p=0;p<7;p++){if(a&1){var m=(1<<p)-1;m<32?f^=1<<m:d^=1<<m-32}a&128?a=a<<1^113:a<<=1}u[s]=o.create(d,f)}})();var d=[];(function(){for(var e=0;e<25;e++)d[e]=o.create()})();var f=s.SHA3=a.extend({cfg:a.cfg.extend({outputLength:512}),_doReset:function(){for(var e=this._state=[],t=0;t<25;t++)e[t]=new o.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(e,t){for(var n=this._state,r=this.blockSize/2,i=0;i<r;i++){var a=e[t+2*i],o=e[t+2*i+1];a=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360,o=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360;var s=n[i];s.high^=o,s.low^=a}for(var f=0;f<24;f++){for(var p=0;p<5;p++){for(var m=0,h=0,g=0;g<5;g++){var s=n[p+5*g];m^=s.high,h^=s.low}var _=d[p];_.high=m,_.low=h}for(var p=0;p<5;p++)for(var v=d[(p+4)%5],y=d[(p+1)%5],b=y.high,x=y.low,m=v.high^(b<<1|x>>>31),h=v.low^(x<<1|b>>>31),g=0;g<5;g++){var s=n[p+5*g];s.high^=m,s.low^=h}for(var S=1;S<25;S++){var m,h,s=n[S],C=s.high,w=s.low,T=c[S];T<32?(m=C<<T|w>>>32-T,h=w<<T|C>>>32-T):(m=w<<T-32|C>>>64-T,h=C<<T-32|w>>>64-T);var E=d[l[S]];E.high=m,E.low=h}var D=d[0],O=n[0];D.high=O.high,D.low=O.low;for(var p=0;p<5;p++)for(var g=0;g<5;g++){var S=p+5*g,s=n[S],k=d[S],A=d[(p+1)%5+5*g],j=d[(p+2)%5+5*g];s.high=k.high^~A.high&j.high,s.low=k.low^~A.low&j.low}var s=n[0],M=u[f];s.high^=M.high,s.low^=M.low}},_doFinalize:function(){var e=this._data,n=e.words;this._nDataBytes*8;var r=e.sigBytes*8,a=this.blockSize*32;n[r>>>5]|=1<<24-r%32,n[(t.ceil((r+1)/a)*a>>>5)-1]|=128,e.sigBytes=n.length*4,this._process();for(var o=this._state,s=this.cfg.outputLength/8,c=s/8,l=[],u=0;u<c;u++){var d=o[u],f=d.high,p=d.low;f=(f<<8|f>>>24)&16711935|(f<<24|f>>>8)&4278255360,p=(p<<8|p>>>24)&16711935|(p<<24|p>>>8)&4278255360,l.push(p),l.push(f)}return new i.init(l,s)},clone:function(){for(var e=a.clone.call(this),t=e._state=this._state.slice(0),n=0;n<25;n++)t[n]=t[n].clone();return e}});n.SHA3=a._createHelper(f),n.HmacSHA3=a._createHmacHelper(f)})(Math),e.SHA3})})),ie=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(O()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.algo,s=i.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),c=i.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),l=i.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),u=i.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),d=i.create([0,1518500249,1859775393,2400959708,2840853838]),f=i.create([1352829926,1548603684,1836072691,2053994217,0]),p=o.RIPEMD160=a.extend({_doReset:function(){this._hash=i.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var n=0;n<16;n++){var r=t+n,i=e[r];e[r]=(i<<8|i>>>24)&16711935|(i<<24|i>>>8)&4278255360}for(var a=this._hash.words,o=d.words,p=f.words,b=s.words,x=c.words,S=l.words,C=u.words,w,T,E,D,O,k=w=a[0],A=T=a[1],j=E=a[2],M=D=a[3],N=O=a[4],P,n=0;n<80;n+=1)P=w+e[t+b[n]]|0,n<16?P+=m(T,E,D)+o[0]:n<32?P+=h(T,E,D)+o[1]:n<48?P+=g(T,E,D)+o[2]:n<64?P+=_(T,E,D)+o[3]:P+=v(T,E,D)+o[4],P|=0,P=y(P,S[n]),P=P+O|0,w=O,O=D,D=y(E,10),E=T,T=P,P=k+e[t+x[n]]|0,n<16?P+=v(A,j,M)+p[0]:n<32?P+=_(A,j,M)+p[1]:n<48?P+=g(A,j,M)+p[2]:n<64?P+=h(A,j,M)+p[3]:P+=m(A,j,M)+p[4],P|=0,P=y(P,C[n]),P=P+N|0,k=N,N=M,M=y(j,10),j=A,A=P;P=a[1]+E+M|0,a[1]=a[2]+D+N|0,a[2]=a[3]+O+k|0,a[3]=a[4]+w+A|0,a[4]=a[0]+T+j|0,a[0]=P},_doFinalize:function(){var e=this._data,t=e.words,n=this._nDataBytes*8,r=e.sigBytes*8;t[r>>>5]|=128<<24-r%32,t[(r+64>>>9<<4)+14]=(n<<8|n>>>24)&16711935|(n<<24|n>>>8)&4278255360,e.sigBytes=(t.length+1)*4,this._process();for(var i=this._hash,a=i.words,o=0;o<5;o++){var s=a[o];a[o]=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360}return i},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});function m(e,t,n){return e^t^n}function h(e,t,n){return e&t|~e&n}function g(e,t,n){return(e|~t)^n}function _(e,t,n){return e&n|t&~n}function v(e,t,n){return e^(t|~n)}function y(e,t){return e<<t|e>>>32-t}n.RIPEMD160=a._createHelper(p),n.HmacRIPEMD160=a._createHmacHelper(p)})(Math),e.RIPEMD160})})),ae=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(O()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){(function(){var t=e,n=t.lib.Base,r=t.enc.Utf8,i=t.algo;i.HMAC=n.extend({init:function(e,t){e=this._hasher=new e.init,typeof t==`string`&&(t=r.parse(t));var n=e.blockSize,i=n*4;t.sigBytes>i&&(t=e.finalize(t)),t.clamp();for(var a=this._oKey=t.clone(),o=this._iKey=t.clone(),s=a.words,c=o.words,l=0;l<n;l++)s[l]^=1549556828,c[l]^=909522486;a.sigBytes=o.sigBytes=i,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher,n=t.finalize(e);return t.reset(),t.finalize(this._oKey.clone().concat(n))}})})()})})),oe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),te(),ae()):typeof define==`function`&&define.amd?define([`./core`,`./sha256`,`./hmac`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.Base,i=n.WordArray,a=t.algo,o=a.SHA256,s=a.HMAC,c=a.PBKDF2=r.extend({cfg:r.extend({keySize:128/32,hasher:o,iterations:25e4}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var n=this.cfg,r=s.create(n.hasher,e),a=i.create(),o=i.create([1]),c=a.words,l=o.words,u=n.keySize,d=n.iterations;c.length<u;){var f=r.update(t).finalize(o);r.reset();for(var p=f.words,m=p.length,h=f,g=1;g<d;g++){h=r.finalize(h),r.reset();for(var _=h.words,v=0;v<m;v++)p[v]^=_[v]}a.concat(f),l[0]++}return a.sigBytes=u*4,a}});t.PBKDF2=function(e,t,n){return c.create(n).compute(e,t)}})(),e.PBKDF2})})),L=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),ee(),ae()):typeof define==`function`&&define.amd?define([`./core`,`./sha1`,`./hmac`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.Base,i=n.WordArray,a=t.algo,o=a.MD5,s=a.EvpKDF=r.extend({cfg:r.extend({keySize:128/32,hasher:o,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var n,r=this.cfg,a=r.hasher.create(),o=i.create(),s=o.words,c=r.keySize,l=r.iterations;s.length<c;){n&&a.update(n),n=a.update(e).finalize(t),a.reset();for(var u=1;u<l;u++)n=a.finalize(n),a.reset();o.concat(n)}return o.sigBytes=c*4,o}});t.EvpKDF=function(e,t,n){return s.create(n).compute(e,t)}})(),e.EvpKDF})})),R=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),L()):typeof define==`function`&&define.amd?define([`./core`,`./evpkdf`],r):r(n.CryptoJS)})(e,function(e){e.lib.Cipher||function(t){var n=e,r=n.lib,i=r.Base,a=r.WordArray,o=r.BufferedBlockAlgorithm,s=n.enc;s.Utf8;var c=s.Base64,l=n.algo.EvpKDF,u=r.Cipher=o.extend({cfg:i.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,n){this.cfg=this.cfg.extend(n),this._xformMode=e,this._key=t,this.reset()},reset:function(){o.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function e(e){return typeof e==`string`?S:y}return function(t){return{encrypt:function(n,r,i){return e(r).encrypt(t,n,r,i)},decrypt:function(n,r,i){return e(r).decrypt(t,n,r,i)}}}}()});r.StreamCipher=u.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var d=n.mode={},f=r.BlockCipherMode=i.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}}),p=d.CBC=function(){var e=f.extend();e.Encryptor=e.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize;n.call(this,e,t,i),r.encryptBlock(e,t),this._prevBlock=e.slice(t,t+i)}}),e.Decryptor=e.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize,a=e.slice(t,t+i);r.decryptBlock(e,t),n.call(this,e,t,i),this._prevBlock=a}});function n(e,n,r){var i,a=this._iv;a?(i=a,this._iv=t):i=this._prevBlock;for(var o=0;o<r;o++)e[n+o]^=i[o]}return e}(),m=n.pad={},h=m.Pkcs7={pad:function(e,t){for(var n=t*4,r=n-e.sigBytes%n,i=r<<24|r<<16|r<<8|r,o=[],s=0;s<r;s+=4)o.push(i);var c=a.create(o,r);e.concat(c)},unpad:function(e){var t=e.words[e.sigBytes-1>>>2]&255;e.sigBytes-=t}};r.BlockCipher=u.extend({cfg:u.cfg.extend({mode:p,padding:h}),reset:function(){var e;u.reset.call(this);var t=this.cfg,n=t.iv,r=t.mode;this._xformMode==this._ENC_XFORM_MODE?e=r.createEncryptor:(e=r.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==e?this._mode.init(this,n&&n.words):(this._mode=e.call(r,this,n&&n.words),this._mode.__creator=e)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e,t=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(t.pad(this._data,this.blockSize),e=this._process(!0)):(e=this._process(!0),t.unpad(e)),e},blockSize:128/32});var g=r.CipherParams=i.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),_=n.format={},v=_.OpenSSL={stringify:function(e){var t,n=e.ciphertext,r=e.salt;return t=r?a.create([1398893684,1701076831]).concat(r).concat(n):n,t.toString(c)},parse:function(e){var t,n=c.parse(e),r=n.words;return r[0]==1398893684&&r[1]==1701076831&&(t=a.create(r.slice(2,4)),r.splice(0,4),n.sigBytes-=16),g.create({ciphertext:n,salt:t})}},y=r.SerializableCipher=i.extend({cfg:i.extend({format:v}),encrypt:function(e,t,n,r){r=this.cfg.extend(r);var i=e.createEncryptor(n,r),a=i.finalize(t),o=i.cfg;return g.create({ciphertext:a,key:n,iv:o.iv,algorithm:e,mode:o.mode,padding:o.padding,blockSize:e.blockSize,formatter:r.format})},decrypt:function(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),e.createDecryptor(n,r).finalize(t.ciphertext)},_parse:function(e,t){return typeof e==`string`?t.parse(e,this):e}}),b=n.kdf={},x=b.OpenSSL={execute:function(e,t,n,r,i){if(r||=a.random(64/8),i)var o=l.create({keySize:t+n,hasher:i}).compute(e,r);else var o=l.create({keySize:t+n}).compute(e,r);var s=a.create(o.words.slice(t),n*4);return o.sigBytes=t*4,g.create({key:o,iv:s,salt:r})}},S=r.PasswordBasedCipher=y.extend({cfg:y.cfg.extend({kdf:x}),encrypt:function(e,t,n,r){r=this.cfg.extend(r);var i=r.kdf.execute(n,e.keySize,e.ivSize,r.salt,r.hasher);r.iv=i.iv;var a=y.encrypt.call(this,e,t,i.key,r);return a.mixIn(i),a},decrypt:function(e,t,n,r){r=this.cfg.extend(r),t=this._parse(t,r.format);var i=r.kdf.execute(n,e.keySize,e.ivSize,t.salt,r.hasher);return r.iv=i.iv,y.decrypt.call(this,e,t,i.key,r)}})}()})})),z=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.CFB=function(){var t=e.lib.BlockCipherMode.extend();t.Encryptor=t.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize;n.call(this,e,t,i,r),this._prevBlock=e.slice(t,t+i)}}),t.Decryptor=t.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize,a=e.slice(t,t+i);n.call(this,e,t,i,r),this._prevBlock=a}});function n(e,t,n,r){var i,a=this._iv;a?(i=a.slice(0),this._iv=void 0):i=this._prevBlock,r.encryptBlock(i,0);for(var o=0;o<n;o++)e[t+o]^=i[o]}return t}(),e.mode.CFB})})),se=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.CTR=function(){var t=e.lib.BlockCipherMode.extend();return t.Decryptor=t.Encryptor=t.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize,i=this._iv,a=this._counter;i&&(a=this._counter=i.slice(0),this._iv=void 0);var o=a.slice(0);n.encryptBlock(o,0),a[r-1]=a[r-1]+1|0;for(var s=0;s<r;s++)e[t+s]^=o[s]}}),t}(),e.mode.CTR})})),ce=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.CTRGladman=function(){var t=e.lib.BlockCipherMode.extend();function n(e){if((e>>24&255)==255){var t=e>>16&255,n=e>>8&255,r=e&255;t===255?(t=0,n===255?(n=0,r===255?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}else e+=1<<24;return e}function r(e){return(e[0]=n(e[0]))===0&&(e[1]=n(e[1])),e}return t.Decryptor=t.Encryptor=t.extend({processBlock:function(e,t){var n=this._cipher,i=n.blockSize,a=this._iv,o=this._counter;a&&(o=this._counter=a.slice(0),this._iv=void 0),r(o);var s=o.slice(0);n.encryptBlock(s,0);for(var c=0;c<i;c++)e[t+c]^=s[c]}}),t}(),e.mode.CTRGladman})})),le=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.OFB=function(){var t=e.lib.BlockCipherMode.extend();return t.Decryptor=t.Encryptor=t.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize,i=this._iv,a=this._keystream;i&&(a=this._keystream=i.slice(0),this._iv=void 0),n.encryptBlock(a,0);for(var o=0;o<r;o++)e[t+o]^=a[o]}}),t}(),e.mode.OFB})})),ue=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.ECB=function(){var t=e.lib.BlockCipherMode.extend();return t.Encryptor=t.extend({processBlock:function(e,t){this._cipher.encryptBlock(e,t)}}),t.Decryptor=t.extend({processBlock:function(e,t){this._cipher.decryptBlock(e,t)}}),t}(),e.mode.ECB})})),de=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.AnsiX923={pad:function(e,t){var n=e.sigBytes,r=t*4,i=r-n%r,a=n+i-1;e.clamp(),e.words[a>>>2]|=i<<24-a%4*8,e.sigBytes+=i},unpad:function(e){var t=e.words[e.sigBytes-1>>>2]&255;e.sigBytes-=t}},e.pad.Ansix923})})),fe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.Iso10126={pad:function(t,n){var r=n*4,i=r-t.sigBytes%r;t.concat(e.lib.WordArray.random(i-1)).concat(e.lib.WordArray.create([i<<24],1))},unpad:function(e){var t=e.words[e.sigBytes-1>>>2]&255;e.sigBytes-=t}},e.pad.Iso10126})})),pe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.Iso97971={pad:function(t,n){t.concat(e.lib.WordArray.create([2147483648],1)),e.pad.ZeroPadding.pad(t,n)},unpad:function(t){e.pad.ZeroPadding.unpad(t),t.sigBytes--}},e.pad.Iso97971})})),me=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.ZeroPadding={pad:function(e,t){var n=t*4;e.clamp(),e.sigBytes+=n-(e.sigBytes%n||n)},unpad:function(e){for(var t=e.words,n=e.sigBytes-1,n=e.sigBytes-1;n>=0;n--)if(t[n>>>2]>>>24-n%4*8&255){e.sigBytes=n+1;break}}},e.pad.ZeroPadding})})),he=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.NoPadding={pad:function(){},unpad:function(){}},e.pad.NoPadding})})),ge=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),R()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib.CipherParams,i=n.enc.Hex,a=n.format;a.Hex={stringify:function(e){return e.ciphertext.toString(i)},parse:function(e){var t=i.parse(e);return r.create({ciphertext:t})}}})(),e.format.Hex})})),_e=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),M(),P(),L(),R()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.BlockCipher,r=t.algo,i=[],a=[],o=[],s=[],c=[],l=[],u=[],d=[],f=[],p=[];(function(){for(var e=[],t=0;t<256;t++)t<128?e[t]=t<<1:e[t]=t<<1^283;for(var n=0,r=0,t=0;t<256;t++){var m=r^r<<1^r<<2^r<<3^r<<4;m=m>>>8^m&255^99,i[n]=m,a[m]=n;var h=e[n],g=e[h],_=e[g],v=e[m]*257^m*16843008;o[n]=v<<24|v>>>8,s[n]=v<<16|v>>>16,c[n]=v<<8|v>>>24,l[n]=v;var v=_*16843009^g*65537^h*257^n*16843008;u[m]=v<<24|v>>>8,d[m]=v<<16|v>>>16,f[m]=v<<8|v>>>24,p[m]=v,n?(n=h^e[e[e[_^h]]],r^=e[e[r]]):n=r=1}})();var m=[0,1,2,4,8,16,32,64,128,27,54],h=r.AES=n.extend({_doReset:function(){var e;if(!(this._nRounds&&this._keyPriorReset===this._key)){for(var t=this._keyPriorReset=this._key,n=t.words,r=t.sigBytes/4,a=((this._nRounds=r+6)+1)*4,o=this._keySchedule=[],s=0;s<a;s++)s<r?o[s]=n[s]:(e=o[s-1],s%r?r>6&&s%r==4&&(e=i[e>>>24]<<24|i[e>>>16&255]<<16|i[e>>>8&255]<<8|i[e&255]):(e=e<<8|e>>>24,e=i[e>>>24]<<24|i[e>>>16&255]<<16|i[e>>>8&255]<<8|i[e&255],e^=m[s/r|0]<<24),o[s]=o[s-r]^e);for(var c=this._invKeySchedule=[],l=0;l<a;l++){var s=a-l;if(l%4)var e=o[s];else var e=o[s-4];l<4||s<=4?c[l]=e:c[l]=u[i[e>>>24]]^d[i[e>>>16&255]]^f[i[e>>>8&255]]^p[i[e&255]]}}},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,o,s,c,l,i)},decryptBlock:function(e,t){var n=e[t+1];e[t+1]=e[t+3],e[t+3]=n,this._doCryptBlock(e,t,this._invKeySchedule,u,d,f,p,a);var n=e[t+1];e[t+1]=e[t+3],e[t+3]=n},_doCryptBlock:function(e,t,n,r,i,a,o,s){for(var c=this._nRounds,l=e[t]^n[0],u=e[t+1]^n[1],d=e[t+2]^n[2],f=e[t+3]^n[3],p=4,m=1;m<c;m++){var h=r[l>>>24]^i[u>>>16&255]^a[d>>>8&255]^o[f&255]^n[p++],g=r[u>>>24]^i[d>>>16&255]^a[f>>>8&255]^o[l&255]^n[p++],_=r[d>>>24]^i[f>>>16&255]^a[l>>>8&255]^o[u&255]^n[p++],v=r[f>>>24]^i[l>>>16&255]^a[u>>>8&255]^o[d&255]^n[p++];l=h,u=g,d=_,f=v}var h=(s[l>>>24]<<24|s[u>>>16&255]<<16|s[d>>>8&255]<<8|s[f&255])^n[p++],g=(s[u>>>24]<<24|s[d>>>16&255]<<16|s[f>>>8&255]<<8|s[l&255])^n[p++],_=(s[d>>>24]<<24|s[f>>>16&255]<<16|s[l>>>8&255]<<8|s[u&255])^n[p++],v=(s[f>>>24]<<24|s[l>>>16&255]<<16|s[u>>>8&255]<<8|s[d&255])^n[p++];e[t]=h,e[t+1]=g,e[t+2]=_,e[t+3]=v},keySize:256/32});t.AES=n._createHelper(h)})(),e.AES})})),ve=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),M(),P(),L(),R()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.WordArray,i=n.BlockCipher,a=t.algo,o=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],s=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],c=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],l=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],u=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],d=a.DES=i.extend({_doReset:function(){for(var e=this._key.words,t=[],n=0;n<56;n++){var r=o[n]-1;t[n]=e[r>>>5]>>>31-r%32&1}for(var i=this._subKeys=[],a=0;a<16;a++){for(var l=i[a]=[],u=c[a],n=0;n<24;n++)l[n/6|0]|=t[(s[n]-1+u)%28]<<31-n%6,l[4+(n/6|0)]|=t[28+(s[n+24]-1+u)%28]<<31-n%6;l[0]=l[0]<<1|l[0]>>>31;for(var n=1;n<7;n++)l[n]=l[n]>>>(n-1)*4+3;l[7]=l[7]<<5|l[7]>>>27}for(var d=this._invSubKeys=[],n=0;n<16;n++)d[n]=i[15-n]},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._subKeys)},decryptBlock:function(e,t){this._doCryptBlock(e,t,this._invSubKeys)},_doCryptBlock:function(e,t,n){this._lBlock=e[t],this._rBlock=e[t+1],f.call(this,4,252645135),f.call(this,16,65535),p.call(this,2,858993459),p.call(this,8,16711935),f.call(this,1,1431655765);for(var r=0;r<16;r++){for(var i=n[r],a=this._lBlock,o=this._rBlock,s=0,c=0;c<8;c++)s|=l[c][((o^i[c])&u[c])>>>0];this._lBlock=o,this._rBlock=a^s}var d=this._lBlock;this._lBlock=this._rBlock,this._rBlock=d,f.call(this,1,1431655765),p.call(this,8,16711935),p.call(this,2,858993459),f.call(this,16,65535),f.call(this,4,252645135),e[t]=this._lBlock,e[t+1]=this._rBlock},keySize:64/32,ivSize:64/32,blockSize:64/32});function f(e,t){var n=(this._lBlock>>>e^this._rBlock)&t;this._rBlock^=n,this._lBlock^=n<<e}function p(e,t){var n=(this._rBlock>>>e^this._lBlock)&t;this._lBlock^=n,this._rBlock^=n<<e}t.DES=i._createHelper(d);var m=a.TripleDES=i.extend({_doReset:function(){var e=this._key.words;if(e.length!==2&&e.length!==4&&e.length<6)throw Error(`Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.`);var t=e.slice(0,2),n=e.length<4?e.slice(0,2):e.slice(2,4),i=e.length<6?e.slice(0,2):e.slice(4,6);this._des1=d.createEncryptor(r.create(t)),this._des2=d.createEncryptor(r.create(n)),this._des3=d.createEncryptor(r.create(i))},encryptBlock:function(e,t){this._des1.encryptBlock(e,t),this._des2.decryptBlock(e,t),this._des3.encryptBlock(e,t)},decryptBlock:function(e,t){this._des3.decryptBlock(e,t),this._des2.encryptBlock(e,t),this._des1.decryptBlock(e,t)},keySize:192/32,ivSize:64/32,blockSize:64/32});t.TripleDES=i._createHelper(m)})(),e.TripleDES})})),ye=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),M(),P(),L(),R()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.StreamCipher,r=t.algo,i=r.RC4=n.extend({_doReset:function(){for(var e=this._key,t=e.words,n=e.sigBytes,r=this._S=[],i=0;i<256;i++)r[i]=i;for(var i=0,a=0;i<256;i++){var o=i%n,s=t[o>>>2]>>>24-o%4*8&255;a=(a+r[i]+s)%256;var c=r[i];r[i]=r[a],r[a]=c}this._i=this._j=0},_doProcessBlock:function(e,t){e[t]^=a.call(this)},keySize:256/32,ivSize:0});function a(){for(var e=this._S,t=this._i,n=this._j,r=0,i=0;i<4;i++){t=(t+1)%256,n=(n+e[t])%256;var a=e[t];e[t]=e[n],e[n]=a,r|=e[(e[t]+e[n])%256]<<24-i*8}return this._i=t,this._j=n,r}t.RC4=n._createHelper(i);var o=r.RC4Drop=i.extend({cfg:i.cfg.extend({drop:192}),_doReset:function(){i._doReset.call(this);for(var e=this.cfg.drop;e>0;e--)a.call(this)}});t.RC4Drop=n._createHelper(o)})(),e.RC4})})),be=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),M(),P(),L(),R()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.StreamCipher,r=t.algo,i=[],a=[],o=[],s=r.Rabbit=n.extend({_doReset:function(){for(var e=this._key.words,t=this.cfg.iv,n=0;n<4;n++)e[n]=(e[n]<<8|e[n]>>>24)&16711935|(e[n]<<24|e[n]>>>8)&4278255360;var r=this._X=[e[0],e[3]<<16|e[2]>>>16,e[1],e[0]<<16|e[3]>>>16,e[2],e[1]<<16|e[0]>>>16,e[3],e[2]<<16|e[1]>>>16],i=this._C=[e[2]<<16|e[2]>>>16,e[0]&4294901760|e[1]&65535,e[3]<<16|e[3]>>>16,e[1]&4294901760|e[2]&65535,e[0]<<16|e[0]>>>16,e[2]&4294901760|e[3]&65535,e[1]<<16|e[1]>>>16,e[3]&4294901760|e[0]&65535];this._b=0;for(var n=0;n<4;n++)c.call(this);for(var n=0;n<8;n++)i[n]^=r[n+4&7];if(t){var a=t.words,o=a[0],s=a[1],l=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,u=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360,d=l>>>16|u&4294901760,f=u<<16|l&65535;i[0]^=l,i[1]^=d,i[2]^=u,i[3]^=f,i[4]^=l,i[5]^=d,i[6]^=u,i[7]^=f;for(var n=0;n<4;n++)c.call(this)}},_doProcessBlock:function(e,t){var n=this._X;c.call(this),i[0]=n[0]^n[5]>>>16^n[3]<<16,i[1]=n[2]^n[7]>>>16^n[5]<<16,i[2]=n[4]^n[1]>>>16^n[7]<<16,i[3]=n[6]^n[3]>>>16^n[1]<<16;for(var r=0;r<4;r++)i[r]=(i[r]<<8|i[r]>>>24)&16711935|(i[r]<<24|i[r]>>>8)&4278255360,e[t+r]^=i[r]},blockSize:128/32,ivSize:64/32});function c(){for(var e=this._X,t=this._C,n=0;n<8;n++)a[n]=t[n];t[0]=t[0]+1295307597+this._b|0,t[1]=t[1]+3545052371+ +(t[0]>>>0<a[0]>>>0)|0,t[2]=t[2]+886263092+ +(t[1]>>>0<a[1]>>>0)|0,t[3]=t[3]+1295307597+ +(t[2]>>>0<a[2]>>>0)|0,t[4]=t[4]+3545052371+ +(t[3]>>>0<a[3]>>>0)|0,t[5]=t[5]+886263092+ +(t[4]>>>0<a[4]>>>0)|0,t[6]=t[6]+1295307597+ +(t[5]>>>0<a[5]>>>0)|0,t[7]=t[7]+3545052371+ +(t[6]>>>0<a[6]>>>0)|0,this._b=+(t[7]>>>0<a[7]>>>0);for(var n=0;n<8;n++){var r=e[n]+t[n],i=r&65535,s=r>>>16;o[n]=((i*i>>>17)+i*s>>>15)+s*s^((r&4294901760)*r|0)+((r&65535)*r|0)}e[0]=o[0]+(o[7]<<16|o[7]>>>16)+(o[6]<<16|o[6]>>>16)|0,e[1]=o[1]+(o[0]<<8|o[0]>>>24)+o[7]|0,e[2]=o[2]+(o[1]<<16|o[1]>>>16)+(o[0]<<16|o[0]>>>16)|0,e[3]=o[3]+(o[2]<<8|o[2]>>>24)+o[1]|0,e[4]=o[4]+(o[3]<<16|o[3]>>>16)+(o[2]<<16|o[2]>>>16)|0,e[5]=o[5]+(o[4]<<8|o[4]>>>24)+o[3]|0,e[6]=o[6]+(o[5]<<16|o[5]>>>16)+(o[4]<<16|o[4]>>>16)|0,e[7]=o[7]+(o[6]<<8|o[6]>>>24)+o[5]|0}t.Rabbit=n._createHelper(s)})(),e.Rabbit})})),xe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),M(),P(),L(),R()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.StreamCipher,r=t.algo,i=[],a=[],o=[],s=r.RabbitLegacy=n.extend({_doReset:function(){var e=this._key.words,t=this.cfg.iv,n=this._X=[e[0],e[3]<<16|e[2]>>>16,e[1],e[0]<<16|e[3]>>>16,e[2],e[1]<<16|e[0]>>>16,e[3],e[2]<<16|e[1]>>>16],r=this._C=[e[2]<<16|e[2]>>>16,e[0]&4294901760|e[1]&65535,e[3]<<16|e[3]>>>16,e[1]&4294901760|e[2]&65535,e[0]<<16|e[0]>>>16,e[2]&4294901760|e[3]&65535,e[1]<<16|e[1]>>>16,e[3]&4294901760|e[0]&65535];this._b=0;for(var i=0;i<4;i++)c.call(this);for(var i=0;i<8;i++)r[i]^=n[i+4&7];if(t){var a=t.words,o=a[0],s=a[1],l=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,u=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360,d=l>>>16|u&4294901760,f=u<<16|l&65535;r[0]^=l,r[1]^=d,r[2]^=u,r[3]^=f,r[4]^=l,r[5]^=d,r[6]^=u,r[7]^=f;for(var i=0;i<4;i++)c.call(this)}},_doProcessBlock:function(e,t){var n=this._X;c.call(this),i[0]=n[0]^n[5]>>>16^n[3]<<16,i[1]=n[2]^n[7]>>>16^n[5]<<16,i[2]=n[4]^n[1]>>>16^n[7]<<16,i[3]=n[6]^n[3]>>>16^n[1]<<16;for(var r=0;r<4;r++)i[r]=(i[r]<<8|i[r]>>>24)&16711935|(i[r]<<24|i[r]>>>8)&4278255360,e[t+r]^=i[r]},blockSize:128/32,ivSize:64/32});function c(){for(var e=this._X,t=this._C,n=0;n<8;n++)a[n]=t[n];t[0]=t[0]+1295307597+this._b|0,t[1]=t[1]+3545052371+ +(t[0]>>>0<a[0]>>>0)|0,t[2]=t[2]+886263092+ +(t[1]>>>0<a[1]>>>0)|0,t[3]=t[3]+1295307597+ +(t[2]>>>0<a[2]>>>0)|0,t[4]=t[4]+3545052371+ +(t[3]>>>0<a[3]>>>0)|0,t[5]=t[5]+886263092+ +(t[4]>>>0<a[4]>>>0)|0,t[6]=t[6]+1295307597+ +(t[5]>>>0<a[5]>>>0)|0,t[7]=t[7]+3545052371+ +(t[6]>>>0<a[6]>>>0)|0,this._b=+(t[7]>>>0<a[7]>>>0);for(var n=0;n<8;n++){var r=e[n]+t[n],i=r&65535,s=r>>>16;o[n]=((i*i>>>17)+i*s>>>15)+s*s^((r&4294901760)*r|0)+((r&65535)*r|0)}e[0]=o[0]+(o[7]<<16|o[7]>>>16)+(o[6]<<16|o[6]>>>16)|0,e[1]=o[1]+(o[0]<<8|o[0]>>>24)+o[7]|0,e[2]=o[2]+(o[1]<<16|o[1]>>>16)+(o[0]<<16|o[0]>>>16)|0,e[3]=o[3]+(o[2]<<8|o[2]>>>24)+o[1]|0,e[4]=o[4]+(o[3]<<16|o[3]>>>16)+(o[2]<<16|o[2]>>>16)|0,e[5]=o[5]+(o[4]<<8|o[4]>>>24)+o[3]|0,e[6]=o[6]+(o[5]<<16|o[5]>>>16)+(o[4]<<16|o[4]>>>16)|0,e[7]=o[7]+(o[6]<<8|o[6]>>>24)+o[5]|0}t.RabbitLegacy=n._createHelper(s)})(),e.RabbitLegacy})})),Se=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),M(),P(),L(),R()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.BlockCipher,r=t.algo;let i=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],a=[[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946],[1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055],[3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504],[976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462]];var o={pbox:[],sbox:[]};function s(e,t){let n=t>>24&255,r=t>>16&255,i=t>>8&255,a=t&255,o=e.sbox[0][n]+e.sbox[1][r];return o^=e.sbox[2][i],o+=e.sbox[3][a],o}function c(e,t,n){let r=t,i=n,a;for(let t=0;t<16;++t)r^=e.pbox[t],i=s(e,r)^i,a=r,r=i,i=a;return a=r,r=i,i=a,i^=e.pbox[16],r^=e.pbox[17],{left:r,right:i}}function l(e,t,n){let r=t,i=n,a;for(let t=17;t>1;--t)r^=e.pbox[t],i=s(e,r)^i,a=r,r=i,i=a;return a=r,r=i,i=a,i^=e.pbox[1],r^=e.pbox[0],{left:r,right:i}}function u(e,t,n){for(let t=0;t<4;t++){e.sbox[t]=[];for(let n=0;n<256;n++)e.sbox[t][n]=a[t][n]}let r=0;for(let a=0;a<18;a++)e.pbox[a]=i[a]^t[r],r++,r>=n&&(r=0);let o=0,s=0,l=0;for(let t=0;t<18;t+=2)l=c(e,o,s),o=l.left,s=l.right,e.pbox[t]=o,e.pbox[t+1]=s;for(let t=0;t<4;t++)for(let n=0;n<256;n+=2)l=c(e,o,s),o=l.left,s=l.right,e.sbox[t][n]=o,e.sbox[t][n+1]=s;return!0}var d=r.Blowfish=n.extend({_doReset:function(){if(this._keyPriorReset!==this._key){var e=this._keyPriorReset=this._key,t=e.words;u(o,t,e.sigBytes/4)}},encryptBlock:function(e,t){var n=c(o,e[t],e[t+1]);e[t]=n.left,e[t+1]=n.right},decryptBlock:function(e,t){var n=l(o,e[t],e[t+1]);e[t]=n.left,e[t+1]=n.right},blockSize:64/32,keySize:128/32,ivSize:64/32});t.Blowfish=n._createHelper(d)})(),e.Blowfish})})),Ce=c(o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(O(),k(),A(),j(),M(),N(),P(),ee(),te(),F(),I(),ne(),re(),ie(),ae(),oe(),L(),R(),z(),se(),ce(),le(),ue(),de(),fe(),pe(),me(),he(),ge(),_e(),ve(),ye(),be(),xe(),Se()):typeof define==`function`&&define.amd?define(`./core,./x64-core,./lib-typedarrays,./enc-utf16,./enc-base64,./enc-base64url,./md5,./sha1,./sha256,./sha224,./sha512,./sha384,./sha3,./ripemd160,./hmac,./pbkdf2,./evpkdf,./cipher-core,./mode-cfb,./mode-ctr,./mode-ctr-gladman,./mode-ofb,./mode-ecb,./pad-ansix923,./pad-iso10126,./pad-iso97971,./pad-zeropadding,./pad-nopadding,./format-hex,./aes,./tripledes,./rc4,./rabbit,./rabbit-legacy,./blowfish`.split(`,`),r):n.CryptoJS=r(n.CryptoJS)})(e,function(e){return e})}))(),1),B=`https://sheetdb.io/api/v1/3k5vdph36v8ej`,we=`ryzin_super_secret_salt_2026`,V=new class{constructor(){this.isDemoMode=localStorage.getItem(`ryzin_is_demo_mode`)===`true`,this.STORAGE_KEY=this.isDemoMode?`livecommerce_erp_demo_data`:`livecommerce_erp_data`,this._data={users:[],currentUser:null,hosts:[],brands:[],projects:[],tasks:[],liveHosts:[],contracts:[],products:[],designs:[],results:[],finances:[],crmClients:[],crmActivities:[],currentRole:`admin`},this._listeners={},this._sheetDBReady=!1,this._load()}_load(){try{let e=localStorage.getItem(this.STORAGE_KEY);e&&(this._data={...this._data,...JSON.parse(e)})}catch(e){console.warn(`데이터 로드 실패:`,e)}}_save(){try{localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this._data))}catch(e){console.warn(`데이터 저장 실패:`,e)}}async init(){if(this.isDemoMode)return this._data.users.length===0&&(this._data.users=[{id:`admin`,name:`최고관리자 (데모)`,password:Ce.default.SHA256(`1234`).toString(),role:`admin`}],this._save()),!0;try{let[e,t,n,r,i,a]=await Promise.all([fetch(`${B}?sheet=%EC%82%AC%EC%9A%A9%EC%9E%90`).catch(()=>null),fetch(`${B}?sheet=%EC%87%BC%ED%98%B8%EC%8A%A4%ED%8A%B8`).catch(()=>null),fetch(`${B}?sheet=%EB%B8%8C%EB%9E%9C%EB%93%9C`).catch(()=>null),fetch(`${B}?sheet=%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%B0%A9%EC%86%A1`).catch(()=>null),fetch(`${B}?sheet=CRM%EA%B3%A0%EA%B0%9D`).catch(()=>null),fetch(`${B}?sheet=CRM%ED%99%9C%EB%8F%99`).catch(()=>null)]),o=e&&e.ok?await e.json():[],s=t&&t.ok?await t.json():[],c=n&&n.ok?await n.json():[],l=r&&r.ok?await r.json():[],u=i&&i.ok?await i.json():[],d=a&&a.ok?await a.json():[];return(o.length||s.length||c.length||l.length||u.length||d.length)&&(this._parseSheetData(o,s,c,l,u,d),this._sheetDBReady=!0),!0}catch(e){return console.error(`SheetDB 연동 실패:`,e),!1}}_parseNum(e){return e&&parseInt(e.toString().replace(/,/g,``),10)||0}_parseSheetData(e,t,n,r,i,a){let o=[],s=[],c=[],l=[],u=[],d=[],f=[],p=[],m=[],h=1,g=Array.isArray(e)?e:[],_=Array.isArray(t)?t:[],v=Array.isArray(n)?n:[],y=Array.isArray(r)?r:[],b=Array.isArray(i)?i:[],x=Array.isArray(a)?a:[];g.forEach(e=>{e.아이디&&o.push({id:e.아이디,password:e.비밀번호||``,name:e.이름||``,role:e.권한||`pd`,otpSecret:e.OTP키||``})}),_.forEach(e=>{e.이름&&s.push({id:`h_`+e.이름,name:e.이름,phone:e.전화번호||``,ssn:e.주민번호||``,bank:e.은행명||``,account:e.계좌번호||``,accountHolder:e.예금주||``,address:e.주소||``,memo:{features:e.메모||``,strengths:``,weaknesses:``,style:``,brandPreference:``,caution:``,comment:``},createdAt:`2025-01-01`})}),v.forEach(e=>{e.브랜드명&&c.push({id:`b_`+e.브랜드명,name:e.브랜드명,companyName:e.사업자명||``,category:e.카테고리||``,taxInvoice:e.세금계산서여부===`O`||e.세금계산서===`완료`,manager:e.담당자명||``,phone:e.연락처||``,email:e.이메일||``,businessNo:e.사업자번호||``,address:e.주소||``,memo:e.메모||``,createdAt:`2025-01-01`})}),b.forEach(e=>{e.아이디&&p.push({id:e.아이디,companyName:e.회사명||``,contactName:e.담당자명||``,phone:e.연락처||``,email:e.이메일||``,status:e.상태||``,category:e.고객분류||``,interestedService:e.관심서비스||``,source:e.유입경로||``,memo:e.메모||``,lastContactDate:e.마지막연락일||``,createdAt:e.생성일||``})}),x.forEach(e=>{e.아이디&&m.push({id:e.아이디,clientId:e.고객아이디||``,date:e.날짜||``,type:e.유형||``,content:e.내용||``,followUpDate:e.팔로업예정일||``,createdAt:e.생성일||``})}),y.forEach(e=>{if(!e.방송ID)return;let t=e.방송ID,n=`b_`+e.브랜드명;l.push({id:t,brandId:n,brandName:e.브랜드명||``,category:e.카테고리||``,broadcastMonth:e.진행월||``,broadcastDate:e.방송일||``,broadcastTime:e.방송시간||``,platform:e.플랫폼||``,liveUrl:e.라이브URL||``,pd:e.담당PD||``,designer:e.담당디자이너||``,broadcastStatus:T(e.진행상태),settleStatus:E(e.정산상태),note:e.집행결과||``,createdAt:e.방송일||`2025-01-01`}),e.쇼호스트A&&u.push({id:`lh`+ h++,liveId:t,hostId:`h_`+e.쇼호스트A,role:`main`,fee:this._parseNum(e.진행금액A),settleStatus:E(e.정산상태),memo:``}),e.쇼호스트B&&u.push({id:`lh`+ h++,liveId:t,hostId:`h_`+e.쇼호스트B,role:`guest`,fee:this._parseNum(e.진행금액B),settleStatus:E(e.정산상태),memo:``});let r=this._parseNum(e.라이브매출),i=this._parseNum(e.광고비)+this._parseNum(e.제작비)+this._parseNum(e.진행금액A)+this._parseNum(e.진행금액B),a=i>0?r/i:0;d.push({id:t,liveId:t,views:this._parseNum(e.시청뷰),likes:0,orders:0,liveRevenue:r,roi:a}),f.push({id:t,liveId:t,adCost:this._parseNum(e.광고비),productionCost:this._parseNum(e.제작비),hostCost:this._parseNum(e.진행금액A)+this._parseNum(e.진행금액B),otherCost:0,salesRevenue:this._parseNum(e.영업매출액),operatingProfit:this._parseNum(e.영업이익),vat:this._parseNum(e.부가세),netMargin:this._parseNum(e.순마진)})}),this._data.users=o,this._data.hosts=s,this._data.brands=c,this._data.projects=l,this._data.liveHosts=u,this._data.results=d,this._data.finances=f,this._data.crmClients=p,this._data.crmActivities=m,this._save()}async _syncToSheetDB(e,t,n){if(this._sheetDBReady)try{let r=``,i=null,a=`POST`,o=`%EC%82%AC%EC%9A%A9%EC%9E%90`;if(e===`users`){let e={아이디:n.id,비밀번호:n.password,이름:n.name,권한:n.role,OTP키:n.otpSecret||``};r=`?sheet=${o}`,t===`update`&&(a=`PUT`,r=`/아이디/${n.id}?sheet=${o}`),t===`delete`&&(a=`DELETE`,r=`/아이디/${n.id}?sheet=${o}`),i={data:[e]}}else if(e===`hosts`){let e=`%EC%87%BC%ED%98%B8%EC%8A%A4%ED%8A%B8`,o={이름:n.name,전화번호:n.phone,주민번호:n.ssn,은행명:n.bank,계좌번호:n.account,예금주:n.accountHolder,주소:n.address,메모:n.memo.features};r=`?sheet=${e}`,t===`update`&&(a=`PUT`,r=`/이름/${n.name}?sheet=${e}`),t===`delete`&&(a=`DELETE`,r=`/이름/${n.name}?sheet=${e}`),i={data:[o]}}else if(e===`brands`){let e=`%EB%B8%8C%EB%9E%9C%EB%93%9C`,o={브랜드명:n.name,카테고리:n.category,세금계산서:n.taxInvoice?`완료`:``,담당자명:n.manager,연락처:n.phone,이메일:n.email,사업자번호:n.businessNo,주소:n.address,메모:n.memo};r=`?sheet=${e}`,t===`update`&&(a=`PUT`,r=`/브랜드명/${n.name}?sheet=${e}`),t===`delete`&&(a=`DELETE`,r=`/브랜드명/${n.name}?sheet=${e}`),i={data:[o]}}else if([`projects`,`results`,`finances`,`liveHosts`].includes(e)){let o=`%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%B0%A9%EC%86%A1`,s=n.liveId||n.id,c=this.getById(`projects`,s);if(!c&&t!==`delete`)return;let l=c?this.getById(`brands`,c.brandId):null,u=this.getById(`results`,s)||{},d=this.getById(`finances`,s)||{},f=this.query(`liveHosts`,e=>e.liveId===s),p=f[0]?this.getById(`hosts`,f[0].hostId):null,m=f[1]?this.getById(`hosts`,f[1].hostId):null,h=c?c.broadcastStatus:`new`,g=c?c.settleStatus:`wait`,_=C(h),v=w(g),y={방송ID:s,진행상태:_,브랜드명:c?c.brandName||(l?l.name:``):``,카테고리:c?c.category:``,진행월:c?c.broadcastMonth:``,방송일:c?c.broadcastDate:``,방송시간:c?c.broadcastTime:``,플랫폼:c?c.platform:``,라이브URL:c?c.liveUrl:``,담당PD:c?c.pd:``,담당디자이너:c?c.designer:``,시청뷰:u.views||0,라이브매출:u.liveRevenue||0,쇼호스트A:p?p.name:``,진행금액A:f[0]&&f[0].fee||0,쇼호스트B:m?m.name:``,진행금액B:f[1]&&f[1].fee||0,정산상태:v,광고비:d.adCost||0,제작비:d.productionCost||0,영업매출액:d.salesRevenue||0,영업이익:d.operatingProfit||0,순마진:d.netMargin||0,집행결과:c?c.note:``};if(t===`delete`&&e===`projects`)a=`DELETE`,r=`/방송ID/${s}?sheet=${o}`,i=null;else{let e=await fetch(`${B}/방송ID/${s}?sheet=${o}`,{method:`PUT`,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify({data:[y]})});if(e.ok&&(await e.json()).updated>0)return;a=`POST`,r=`?sheet=${o}`,i={data:[y]}}}i?await fetch(`${B}${r}`,{method:a,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify(i)}):a===`DELETE`&&await fetch(`${B}${r}`,{method:`DELETE`,headers:{Accept:`application/json`}})}catch(e){console.error(`SheetDB 동기화 에러:`,e)}}on(e,t){return this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t),()=>{this._listeners[e]=this._listeners[e].filter(e=>e!==t)}}_emit(e,t){this._listeners[e]&&this._listeners[e].forEach(e=>e(t)),this._listeners.change&&this._listeners.change.forEach(n=>n({event:e,data:t}))}getAll(e){return[...this._data[e]||[]]}getById(e,t){return(this._data[e]||[]).find(e=>e.id===t)||null}query(e,t){return(this._data[e]||[]).filter(t)}createBulk(e,t){return this._data[e]?(this._data[e].push(...t),this._save(),this._emit(e+`:changed`),this.isDemoMode||this._syncBulkToSheetDB(e,t).catch(e=>console.error(`SheetDB 대량 연동 실패:`,e)),!0):!1}async _syncBulkToSheetDB(e,t){if(!(!this._sheetDBReady||t.length===0))try{let n=``,r=[];if(e===`crmClients`&&(n=`CRM고객`,r=t.map(e=>({아이디:e.id||``,회사명:e.companyName||``,담당자명:e.contactName||``,연락처:e.phone||``,이메일:e.email||``,상태:e.status||``,고객분류:e.category||``,관심서비스:e.interestedService||``,유입경로:e.source||``,메모:e.memo||``,마지막연락일:e.lastContactDate||``,생성일:e.createdAt||``}))),!n)return;let i=`${B}?sheet=${encodeURIComponent(n)}`;if(!(await fetch(i,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({data:r})})).ok)throw Error(`SheetDB Bulk Error`)}catch(e){console.error(`대량 저장 오류:`,e)}}create(e,t){return this._data[e]||(this._data[e]=[]),this._data[e].push(t),this._save(),this._emit(`${e}:created`,t),this._emit(`${e}:changed`),this._syncToSheetDB(e,`create`,t),t}update(e,t,n){let r=this._data[e]||[],i=r.findIndex(e=>e.id===t);return i===-1?null:(r[i]={...r[i],...n,updatedAt:new Date().toISOString()},this._save(),this._emit(`${e}:updated`,r[i]),this._emit(`${e}:changed`),this._syncToSheetDB(e,`update`,r[i]),r[i])}delete(e,t){let n=this._data[e]||[],r=n.findIndex(e=>e.id===t);if(r===-1)return!1;let i=n.splice(r,1)[0];return this._save(),this._emit(`${e}:deleted`,i),this._emit(`${e}:changed`),this._syncToSheetDB(e,`delete`,i),!0}getHostStats(e){let t=this.query(`liveHosts`,t=>t.hostId===e),n=t.map(e=>e.liveId),r=this.getAll(`projects`).filter(e=>n.includes(e.id)),i=this.getAll(`results`).filter(e=>n.includes(e.liveId)),a=r.length,o=new Date,s=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,`0`)}`,c=r.filter(e=>e.broadcastMonth===s).length,l=t.filter(e=>e.settleStatus===`done`).reduce((e,t)=>e+(t.fee||0),0),u=i.reduce((e,t)=>e+(t.liveRevenue||0),0),d=a>0?u/a:0,f=this.getAll(`finances`).filter(e=>n.includes(e.liveId)).reduce((e,t)=>e+(t.adCost||0)+(t.productionCost||0)+(t.hostCost||0)+(t.otherCost||0),0),p=f>0?u/f:0,m=r.filter(e=>e.broadcastDate).sort((e,t)=>t.broadcastDate.localeCompare(e.broadcastDate))[0];return{totalBroadcasts:a,monthBroadcasts:c,totalSettlement:l,avgRevenue:d,avgROI:p,lastBroadcastDate:m?m.broadcastDate:null}}getBrandStats(e){let t=this.getById(`brands`,e),n=this.query(`projects`,n=>n.brandId===e||t&&n.brandName===t.name),r=n.map(e=>e.id),i=this.getAll(`results`).filter(e=>r.includes(e.liveId)),a=this.getAll(`finances`).filter(e=>r.includes(e.liveId)),o=i.reduce((e,t)=>e+(t.liveRevenue||0),0),s=a.reduce((e,t)=>e+(t.adCost||0)+(t.productionCost||0)+(t.hostCost||0)+(t.otherCost||0),0),c=s>0?o/s:0,l=n.filter(e=>e.broadcastDate).sort((e,t)=>t.broadcastDate.localeCompare(e.broadcastDate))[0];return{totalBroadcasts:n.length,totalRevenue:o,avgROI:c,lastBroadcastDate:l?l.broadcastDate:null}}getDashboardKPI(){let e=this.getAll(`projects`),t=this.getAll(`results`),n=this.getAll(`finances`),r=new Date,i=r.getMonth()+1,a=r.getFullYear(),o=r.getDay(),s=r.getDate()-o+(o===0?-6:1),c=new Date(r.setDate(s));c.setHours(0,0,0,0);let l=new Date(c);l.setDate(c.getDate()+6),l.setHours(23,59,59,999);let u=0,d=[];e.forEach(e=>{if(!e.broadcastDate)return;let t=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(t.getTime())||(t.getFullYear()===a&&t.getMonth()+1===i&&d.push(e.id),t>=c&&t<=l&&u++)});let f=d.length,p=t.filter(e=>d.includes(e.liveId)).reduce((e,t)=>e+(parseInt(t.liveRevenue)||0),0),m=e.filter(e=>e.settleStatus===`pending`||e.settleStatus===`wait`).map(e=>e.id),h=n.filter(e=>m.includes(e.liveId)).reduce((e,t)=>e+(parseInt(t.salesRevenue)||0),0);return{thisWeekBroadcasts:u,monthBroadcasts:f,monthRevenue:p,settleWaitAmount:h}}calcProjectFinance(e){let t=this.query(`liveHosts`,t=>t.liveId===e).reduce((e,t)=>e+(t.brandPays?0:t.fee||0),0),n=this.getById(`finances`,e)||{},r=n.adCost||0,i=n.productionCost||0,a=n.otherCost||0,o=n.salesRevenue||0,s=o-r-i-t-a,c=o*.1;return{hostCost:t,adCost:r,productionCost:i,otherCost:a,salesRevenue:o,operatingProfit:s,vat:c,netMargin:s-c}}hasSeedData(){return this._data.projects&&this._data.projects.length>0}getCurrentUser(){let e=this._data.currentUser,t=this._data.authSignature;return e&&t&&t===Ce.default.SHA256(e.id+we).toString()?e:null}getCurrentRole(){return this._data.currentRole||`admin`}setCurrentRole(e){this._data.currentRole=e,this._save(),this._emit(`role:changed`,e)}login(e,t){let n=this.verifyPassword(e,t);return n?(this.completeLogin(n),!0):!1}verifyPassword(e,t){let n=Ce.default.SHA256(t).toString();return(this._data.users||[]).find(t=>t.id===e&&t.password===n)||null}completeLogin(e){this._data.currentUser=e,this._data.currentRole=e.role,this._data.authSignature=Ce.default.SHA256(e.id+we).toString(),this._save(),this._emit(`auth:login`,e)}logout(){this._data.currentUser=null,this._data.currentRole=`admin`,this._data.authSignature=null,this._save(),this._emit(`auth:logout`),localStorage.removeItem(this.STORAGE_KEY)}updateUser(e){let t=(this._data.users||[]).findIndex(t=>t.id===e.id);t!==-1&&(this._data.users[t]=e,this._save(),this._syncToSheetDB(`users`,`update`,e))}loginAsDemo(){localStorage.setItem(`ryzin_is_demo_mode`,`true`);let e=JSON.parse(localStorage.getItem(`livecommerce_erp_demo_data`)||`null`);e||={users:[{id:`admin`,name:`최고관리자 (데모)`,password:Ce.default.SHA256(`1234`).toString(),role:`admin`},{id:`demo`,name:`데모 시연 계정`,password:Ce.default.SHA256(`demo`).toString(),role:`admin`}],currentUser:null,hosts:[],brands:[],projects:[],tasks:[],liveHosts:[],contracts:[],products:[],designs:[],results:[],finances:[],currentRole:`admin`};let t=e.users.find(e=>e.id===`admin`);e.currentUser=t,e.authSignature=Ce.default.SHA256(t.id+we).toString(),e.currentRole=`admin`,localStorage.setItem(`livecommerce_erp_demo_data`,JSON.stringify(e)),window.location.reload()}toggleDemoMode(e){let t=this.getCurrentUser(),n=this._data.authSignature,r=this._data.currentRole;localStorage.setItem(`ryzin_is_demo_mode`,e?`true`:`false`);let i=e?`livecommerce_erp_demo_data`:`livecommerce_erp_data`,a=JSON.parse(localStorage.getItem(i)||`null`);a||={users:[{id:`admin`,name:`최고관리자 (데모)`,password:Ce.default.SHA256(`1234`).toString(),role:`admin`},{id:`demo`,name:`데모 시연 계정`,password:Ce.default.SHA256(`demo`).toString(),role:`admin`}],currentUser:null,hosts:[],brands:[],projects:[],tasks:[],liveHosts:[],contracts:[],products:[],designs:[],results:[],finances:[],currentRole:`admin`},t&&(a.currentUser=t,a.authSignature=n,a.currentRole=r,a.users.find(e=>e.id===t.id)||a.users.push(t)),localStorage.setItem(i,JSON.stringify(a)),window.location.reload()}resetAll(){localStorage.removeItem(this.STORAGE_KEY),this._data={users:[],currentUser:null,hosts:[],brands:[],projects:[],tasks:[],liveHosts:[],products:[],designs:[],results:[],finances:[],currentRole:`admin`},this._emit(`data:reset`),this.init()}};function Te(){return V.getCurrentRole()}function Ee(){let e=Te(),t=[{key:`dashboard`,label:`대시보드`},{key:`live_stream`,label:`라이브 송출 관리`},{key:`projects`,label:`라이브 관리`},{key:`hosts`,label:`쇼호스트 관리`},{key:`brands`,label:`브랜드 관리`},{key:`finance`,label:`매출/손익`},{key:`settlement`,label:`정산 관리`},{key:`contracts`,label:`계약 관리`},{key:`marketing`,label:`마케팅 메시지`},{key:`crm`,label:`영업 CRM`},{key:`settings`,label:`설정`}];if(e===`admin`)return t;let n=b[e];return n?t.filter(e=>n.permissions.some(t=>!!(t===`*`||t===e.key||t.startsWith(e.key+`.`)))):[]}var De=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAABCCAYAAACijL8SAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAhwSURBVHhe7ZwFyGRVFMd37cJWVMTuTmxdG7tbxBYFsVCxW1HEXURsdO1ODFTUtbC7e1VE7O78/+A9ePuYN+/cO2/um8/vHPjzzXxzbp37nxvnnDcjR7i4BRJaYGTCtrwpt8AIJ5yTIKkFnHBJze2NOeGcA0kt4IRLam5vzAnnHEhqASdcUnN7Y04450BSCzjhkprbG3PCOQeSWsAJl9Tc3pgTzjmQ1AJOuKTm9saccM6BpBZwwiU1tzfmhHMOJLVAmXBzq/U1GujB36rjpwK+1+sPhL861D2X/rdmQJvPSfetAP1cdWu9mMpYbhbpfWnUbVKtOLY5VfEoY+WPSu/jku62ej+Fofxt0vnZoJerTKoXOxj0/5DOjWW9MuGo6HpDZTEqv6nQK8LzwqXCC1klGOVFYRFjpa9LbxmhE3mrqthMH9xprB+1h4R1AvSbUj1UFY3OKttCf283Vgy5binpfq73sxrKXyCdAwx6ucp0evGdQf8H6aA7gaQkXLltvlmHCR8KKwuPCxMbBoIK5c4x6kLoN4R5jfpM8hfCvkb9JtXaINy/GsCGwgPGgQxZwjE+tgG204+EM4UjjIP+UXoLC58Z9E+QzokGPVS+FhYXTh5GhGPcnwhLChx96mRIE47BvS+sIPwqsLUuWjfi7PNr9HfXGl1WNVY3y1mGqnYSOFJcNMwIx9ivEHY32H7IE44xHi+cIqwoPClYt9a1pMuBuUru0AebG4yIyq3CNpnucCQcQ99SwGbd5H9BuK80Qm7IvwinC0cZSfKq9JYTOl0gNtH/7zLWQ/tspZzdkOFKOC4aSwjYo0paI9y96hHbYVGm0ZvZhAWF+Y2TnatxK+MmOZnADRYCWOQQKY0pKU6u99xmrX3YUbo3FOo4X6/3sjTeRYdV2rpS59Vspxc3Z29S3VLLQ7hJ/9i+y7haIxx+LW6aVbKBPrhWmMk4ccUb2vIq85QwiaEs1++FBL6duRynFxz8LcIEM9FNCmMeJ7BaWIXLTbHPbRGO/u4sXFfR8YElHP3dRbjaaPHzpHdgQfdUvT7GWPYq6e2W6bI1vylMaSiLc5eVtEknLxPyoMCXxipnSfHIknKbhPtGfeHL0skLMNCEY3u1uC6w9Vhhj4LR2VrxvHNdtwgREnx5rLocfi3C1sEW0pRMrYruF1YNqLD8RcuLtkk4+nC3sGmHcQw04YgesNpYhBWNrbAoy+rNM4Jla31ZeqyI1otC3VnF0ueiDq4XJikkQnGZ9PcWcL6WpW3C0Z99BKJCRRlowuHuOMk4c3j2L+mgS3nqsQi+PMtWym2UrbTbbczSXq5DfJEIxcYBhTgj4Uf8p6LMIBAOBzs7DI75XAaScKxIXAI4CFsC5gT7OXt92sH4TOazwtIBk1mn2in2WFem6nNuotxwcx+epR7IyUWlWzx4EAjHWB4W1hXyVbg1wl2uThCML8rMerOYsJIwh8XymQ7uEAxcJZAN0kG+XgVy4AZpQiZSJXjo6yIexbbu0xuc0WRTdJNBIRx9PEg4N+tsa4RrYsKog22Q4H2ZvOX6Q7bnqr41vZWGOogfUcc2ysZcZ79BIhxzRIbOO8KQJxw307F11tfnbNNcILhIxEqd7zCk3tFSPjigAH7F9QXyBC2SinBsmWsbOkT/Vxdw7g/J9CTy48jDYmu2CgdYXCW4TEKFQzoOzSYkxEdIeyQlcHu1TFTev1SEw5NAPNqSO3e09IjCWMYxUPlwbC2EpJiIUMH1wYSHCFEIbqWkH/UqxHmJ91qFbBWSDEJvxKkIN2PWv25Ro3ysnDvXywhaN/7WCTdePSQiwA0tz/at63Snz9laWd5DPPlbZe3GtFcsw+G5HLftVud7+pB8P6vzu1hXSsJ9q4a5/OTRmm5jelcfEiuvk9YJh7+JkM8ZAueGXoRznJW0dTdgaz9wgl5sVZYeyaVEP8rPGlirSE246dUxsm94lqIJwYc3bbmiXlLMcQWw0hD+IJQ0KqCXpIeTJh4rM6gg8T6LcJ1nZepFiAlfKeAGsQgrGisbK1yspCYc/SThArdNE9I44co3PgLQhwf09FjpnhagX1RNSTjGydNH1lQjEgFGCZzdepE2CEd/uRTs30vHs7J9JxwTwg0Sf41F8FzjwY7ZXlMRDp8ZZ07rrZjbGy6GlywGqNFpi3AkIBCXtuYSVg2j74SjYbIknggwNuebpQTLwxvFalMQDuLcI1ifh8DA+NmeDhh/N9W2CEefVhNwlViPEJ3GkYRwNMzzkWxDVsGBStw1RPpNuFXUGdKMcHJaBE88qyHunqakTcIxhtAjUnncyQjH43uvCZaUIjqJA3gBoVPgvmry+kk4npHgQWhCOBb5XUqQo6nDdt5m24QjTZ+H1q2p/q0RjoZDY4yhT3/3i3A8oviYYE2LZ6w87UUeXFNCyjs+rLYJx3j48nFEsC4eRRskW+FodHYBl4AlNQn9PwWeSxhvnLV+EQ5XzdnGPvRLDTvgXB0EwjHG2KSJpISjo6HxRmKqexpn0Qk3oaF6+W0RQltEGqqE1Y1nhXlYPUSSEw4vM48RkiNnEZIwyaUjBaZOnHDpCEdLzAvnOeuNnTLJCUejpO9wC7WKNaPDCZeWcLQWetxohXA4TN8W5jEyjngr2b3ccruJEy494fDJjROsvx/YCuEwS8izqegXf+OjinROuPSEo8X5BKIQFv9ka4QjQYDMjpCQFwfUbtkgTrh2CEer+wkXGnYsE+EM9biKWyDeAv6j0vG285IRFnDCRRjNi8RbwAkXbzsvGWEBJ1yE0bxIvAWccPG285IRFnDCRRjNi8RbwAkXbzsvGWEBJ1yE0bxIvAWccPG285IRFnDCRRjNi8RbwAkXbzsvGWEBJ1yE0bxIvAWccPG285IRFvgPwNooYVqDRbQAAAAASUVORK5CYII=`,Oe={live_stream:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12A10 10 0 1 0 12 22a10 10 0 0 0 10-10z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>`,dashboard:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,projects:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,hosts:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,brands:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,finance:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,marketing:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,crm:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,settings:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`},ke=[{key:`dashboard`,label:`대시보드`,path:`/`,icon:`dashboard`},{key:`live_stream`,label:`라이브 송출 관리`,path:`/live_stream`,icon:`live_stream`},{key:`projects`,label:`라이브 관리`,path:`/projects`,icon:`projects`},{key:`hosts`,label:`쇼호스트 관리`,path:`/hosts`,icon:`hosts`},{key:`brands`,label:`브랜드 관리`,path:`/brands`,icon:`brands`},{key:`finance`,label:`매출/손익`,path:`/finance`,icon:`finance`},{key:`settlement`,label:`정산 관리`,path:`/settlement`,icon:`finance`},{key:`contracts`,label:`계약 관리`,path:`/contracts`,icon:`finance`},{key:`marketing`,label:`마케팅 메시지`,path:`/marketing`,icon:`marketing`},{key:`crm`,label:`영업 CRM`,path:`/crm`,icon:`crm`},{key:`settings`,label:`설정`,path:`/settings`,icon:`settings`}];function Ae(){let e=V.getCurrentUser(),t=b[V.getCurrentRole()]?.label||`관리자`,n=e?e.name:t,r=Ee().map(e=>e.key),i=document.createElement(`aside`);i.className=`sidebar`,i.id=`sidebar`,i.innerHTML=`
    <div class="sidebar-header" style="padding: var(--space-4) var(--space-4); margin-bottom: var(--space-2);">
      <div id="sidebar-logo-container" style="display: flex; align-items: center; justify-content: flex-start; width: 100%; cursor: pointer;">
        <img src="${De}" alt="Ryzin Logo" style="height: 32px; object-fit: contain; margin-bottom: 4px; filter: brightness(0) invert(1);" />
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">
        ${ke.filter(e=>r.includes(e.key)).map(e=>`
            <div class="sidebar-item" data-href="${e.path}" id="nav-${e.key}">
              ${Oe[e.icon]||``}
              <span>${e.label}</span>
            </div>
          `).join(``)}
      </div>
    </nav>
    <div class="sidebar-footer">
      ${V.isDemoMode?`
      <div style="font-size: 11px; color: var(--status-error); text-align: center; margin-bottom: var(--space-3); font-weight: 600; background: rgba(239,68,68,0.1); padding: 6px; border-radius: var(--radius-sm); border: 1px dashed rgba(239,68,68,0.3);">
        데모 샌드박스 활성화됨
      </div>
      `:``}
      <div class="sidebar-user">
        <div class="sidebar-user-avatar">${n[0]}</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">${n}</div>
          <div class="sidebar-user-role">${t}</div>
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" id="btn-logout" style="width: 100%; margin-top: var(--space-3);">로그아웃</button>
    </div>
  `;let a=i.querySelector(`#sidebar-logo-container`);a&&a.addEventListener(`click`,()=>{u.navigate(`/`)}),i.querySelectorAll(`.sidebar-item`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-href`);u.navigate(n)})});let o=i.querySelector(`#btn-logout`);return o&&o.addEventListener(`click`,()=>{V.logout(),u.navigate(`/login`)}),i}function H(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(Math.round(e))+`원`}function U(e){return e==null||isNaN(e)?`-`:Math.abs(e)>=1e8?(e/1e8).toFixed(1).replace(/\.0$/,``)+`억`:Math.abs(e)>=1e4?(e/1e4).toFixed(0)+`만`:H(e)}function W(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(e)}function G(e){return e?e.replace(/\./g,`-`):`-`}function K(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(Math.round(e*100))+`%`}function je(e){return e?e.includes(`*`)?e:e.substring(0,6)+`-*******`:`-`}function Me(e){let t=d.find(t=>t.key===e);if(!t)return`<span class="badge badge-default">${e}</span>`;let n=`var(--bg-tertiary)`,r=`var(--text-secondary)`;switch(t.color){case`blue`:n=`#EFF6FF`,r=`#2563EB`;break;case`indigo`:n=`#EEF2FF`,r=`#4F46E5`;break;case`purple`:n=`#FAF5FF`,r=`#9333EA`;break;case`pink`:n=`#FDF2F8`,r=`#DB2777`;break;case`rose`:n=`#FFF1F2`,r=`#E11D48`;break;case`orange`:n=`#FFF7ED`,r=`#EA580C`;break;case`yellow`:n=`#FEFCE8`,r=`#CA8A04`;break;case`teal`:n=`#F0FDFA`,r=`#0D9488`;break;case`red`:n=`#FEF2F2`,r=`#DC2626`;break;case`green`:n=`#ECFDF5`,r=`#059669`;break;case`gray`:n=`#F3F4F6`,r=`#4B5563`;break}return`<span class="badge" style="background:${n}; color:${r};">${t.label}</span>`}function Ne(e){let t=f.find(t=>t.key===e);if(!t)return`<span class="badge badge-default">${e}</span>`;let n=`var(--bg-tertiary)`,r=`var(--text-secondary)`;switch(t.color){case`orange`:n=`#FFF7ED`,r=`#EA580C`;break;case`green`:n=`#ECFDF5`,r=`#059669`;break}return`<span class="badge" style="background:${n}; color:${r};">${t.label}</span>`}function Pe(e){return Me(e)}var Fe=null;function q({title:e,size:t=`md`,content:n,footer:r,onClose:i}){J();let a=document.createElement(`div`);a.className=`modal-overlay`,a.id=`modal-overlay`,a.innerHTML=`
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
  `,document.body.appendChild(a),document.body.style.overflow=`hidden`;let o=a.querySelector(`#modal-body`);if(typeof n==`string`)o.innerHTML=n;else if(n instanceof HTMLElement)o.appendChild(n);else if(typeof n==`function`){let e=n(o);typeof e==`string`?o.innerHTML=e:e instanceof HTMLElement&&o.appendChild(e)}if(r!==!1){let e=a.querySelector(`#modal-footer`);if(typeof r==`string`)e.innerHTML=r;else if(r instanceof HTMLElement)e.appendChild(r);else if(typeof r==`function`){let t=r(e);typeof t==`string`?e.innerHTML=t:t instanceof HTMLElement&&e.appendChild(t)}}let s=()=>{J(),i&&i()};a.querySelector(`#modal-close-btn`).addEventListener(`click`,s),a.addEventListener(`click`,e=>{e.target===a&&s()});let c=e=>{e.key===`Escape`&&(s(),document.removeEventListener(`keydown`,c))};return document.addEventListener(`keydown`,c),Fe={overlay:a,escHandler:c},a}function J(){if(Fe){let{overlay:e,escHandler:t}=Fe;e.classList.add(`closing`),document.removeEventListener(`keydown`,t),setTimeout(()=>{e.remove(),document.body.style.overflow=``},150),Fe=null}}function Ie({title:e=`확인`,message:t,onConfirm:n,confirmText:r=`확인`,cancelText:i=`취소`,danger:a=!1}){let o=document.createElement(`div`);o.innerHTML=`<p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">${t}</p>`;let s=document.createElement(`div`);s.style.display=`flex`,s.style.gap=`var(--space-3)`,s.style.justifyContent=`flex-end`,s.style.width=`100%`;let c=document.createElement(`button`);c.className=`btn btn-secondary`,c.textContent=i,c.addEventListener(`click`,J);let l=document.createElement(`button`);l.className=a?`btn btn-danger`:`btn btn-primary`,l.textContent=r,l.addEventListener(`click`,()=>{J(),n&&n()}),s.appendChild(c),s.appendChild(l),q({title:e,size:`sm`,content:o,footer:s,onClose:null})}var Le=null;function Re(){return(!Le||!document.body.contains(Le))&&(Le=document.createElement(`div`),Le.className=`toast-container`,Le.id=`toast-container`,document.body.appendChild(Le)),Le}function ze(e,t=`info`,n=3e3){let r=Re(),i=document.createElement(`div`);return i.className=`toast toast-${t}`,i.innerHTML=`
    <span class="toast-message">${e}</span>
    <span class="toast-close">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </span>
  `,r.appendChild(i),i.querySelector(`.toast-close`).addEventListener(`click`,()=>Be(i)),n>0&&setTimeout(()=>Be(i),n),i}function Be(e){e.classList.add(`removing`),setTimeout(()=>e.remove(),150)}function Y(e){return ze(e,`success`)}function X(e){return ze(e,`error`)}var Ve=`in_progress`;function He(){let e=document.createElement(`div`),t=V.getDashboardKPI(),n=V.getAll(`projects`),r=n;r=Ve===`in_progress`?n.filter(e=>![`done`].includes(e.broadcastStatus)):Ve===`ended`?n.filter(e=>[`done`].includes(e.broadcastStatus)&&e.settleStatus!==`done`):n;let i=[];return n.filter(e=>e.broadcastStatus!==`done`).forEach(e=>{let t=0;if(e.broadcastStatus===`design`?t=-4:e.broadcastStatus===`cue_sheet`?t=-5:e.broadcastStatus===`host_cast`&&(t=-7),t!==0&&e.broadcastDate){let n=new Date(e.broadcastDate.replace(/\./g,`-`));if(!isNaN(n.getTime())){let r=new Date(n);r.setDate(r.getDate()+t);let a=new Date;a.setHours(0,0,0,0);let o=Math.ceil((r.getTime()-a.getTime())/(1e3*60*60*24)),s=V.getById(`brands`,e.brandId);i.push({project:e,brandName:e.brandName||(s?s.name:`-`),diffDays:o,ddayText:o===0?`D-Day`:o>0?`D-${o}`:`D+${Math.abs(o)}`})}}}),i.sort((e,t)=>e.diffDays-t.diffDays),e.innerHTML=`
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
        ${Ue(`이번주 방송`,W(t.thisWeekBroadcasts)+`건`,`/projects`)}
        ${Ue(`이번달 방송`,W(t.monthBroadcasts)+`건`,`/projects`)}
        ${Ue(`이번달 매출`,U(t.monthRevenue),`/finance`)}
        ${Ue(`정산 대기`,U(t.settleWaitAmount),`/settlement`)}
      </div>

      
      <div class="section-header" style="margin-top: var(--space-6);">
        <div>
          <h2 class="section-title">라이브 프로젝트</h2>
          <p class="section-subtitle">상태별 프로젝트 모아보기</p>
        </div>
        <div style="display: flex; gap: var(--space-3); align-items: center;">
          <select id="dashboard-filter" class="input" style="padding: 6px 12px; width: auto; font-size: 14px;">
            <option value="in_progress" ${Ve===`in_progress`?`selected`:``}>진행 중 (기본)</option>
            <option value="ended" ${Ve===`ended`?`selected`:``}>방송 종료</option>
            <option value="all" ${Ve===`all`?`selected`:``}>전체 보기</option>
          </select>
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
        </div>
      </div>

      <div class="project-grid" id="project-grid">
        ${r.length>0?r.sort((e,t)=>(e.broadcastDate||``).localeCompare(t.broadcastDate||``)).map(e=>We(e)).join(``):Ge()}
      </div>

      <div class="section-header" style="margin-top: var(--space-6);">
        <div>
          <h2 class="section-title">우선 처리 업무</h2>
          <p class="section-subtitle">현재 단계의 마감 기한이 얼마 남지 않은 프로젝트</p>
        </div>
      </div>
      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th>브랜드</th><th>방송일</th><th>업무 단계</th><th class="text-right">남은 기한</th></tr></thead>
            <tbody>
              ${i.length>0?i.map(e=>`
                <tr style="cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--surface-hover)'" onmouseout="this.style.background=''" class="pd-task-row" data-id="${e.project.id}">
                  <td><span style="font-weight: var(--weight-medium);">${e.brandName}</span></td>
                  <td>${e.project.broadcastDate}</td>
                  <td>${Me(e.project.broadcastStatus)}</td>
                  <td class="text-right"><span style="color: ${e.diffDays<=1?`var(--status-error)`:`var(--text-secondary)`}; font-weight: 600;">${e.ddayText}</span></td>
                </tr>
              `).join(``):`<tr><td colspan="4" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">현재 마감 기한이 있는 업무가 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{e.querySelectorAll(`.kpi-card[data-route]`).forEach(e=>{e.addEventListener(`click`,()=>{u.navigate(e.getAttribute(`data-route`))})}),e.querySelectorAll(`.project-card`).forEach(e=>{e.addEventListener(`click`,()=>{qe(e.getAttribute(`data-id`))})}),e.querySelectorAll(`.pd-task-row`).forEach(e=>{e.addEventListener(`click`,()=>{qe(e.getAttribute(`data-id`))})});let t=e.querySelector(`#btn-new-project`);t&&t.addEventListener(`click`,()=>{u.navigate(`/projects/new`)});let n=e.querySelector(`#dashboard-filter`);n&&n.addEventListener(`change`,e=>{Ve=e.target.value;let t=document.getElementById(`page-content`);t&&(t.innerHTML=``,t.appendChild(He()))})},0),e}function Ue(e,t,n=null){return`
    <div class="kpi-card" ${n?`data-route="${n}" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'"`:``}>
      <div class="kpi-label">${e}</div>
      <div class="kpi-value">${t}</div>
    </div>
  `}function We(e){let t=V.getById(`brands`,e.brandId),n=e.brandName||(t?t.name:`-`),r=0;e.broadcastStatus===`scheduled`?r=20:e.broadcastStatus===`host_cast`?r=40:e.broadcastStatus===`tech_request`?r=60:e.broadcastStatus===`design`?r=80:e.broadcastStatus===`cue_sheet`?r=90:e.broadcastStatus===`done`&&(r=100);let i=``;if(e.broadcastStatus===`done`)i=`D-0`;else if(e.broadcastDate){let t=new Date(e.broadcastDate.replace(/\./g,`-`));if(!isNaN(t.getTime())){let e=new Date;e.setHours(0,0,0,0);let n=Math.ceil((t.getTime()-e.getTime())/(1e3*60*60*24));i=n===0?`D-Day`:n>0?`D-${n}`:`D+${Math.abs(n)}`}}let a=V.query(`liveHosts`,t=>t.liveId===e.id).map(e=>{let t=V.getById(`hosts`,e.hostId);return t?t.name:`-`}).join(`, `);return`
    <div class="project-card" data-id="${e.id}">
      <div class="project-card-header" style="justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="project-card-brand">${n}</span>
          ${Me(e.broadcastStatus)}
        </div>
        ${i?`<div style="font-size: 11px; font-weight: 600; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.05); color: var(--text-secondary);">${i}</div>`:``}
      </div>
      <div class="project-card-meta">
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">방송일</span>
          <span>${G(e.broadcastDate)}</span>
        </div>
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">시간</span>
          <span>${e.broadcastTime||`-`}</span>
        </div>
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">플랫폼</span>
          <span>${e.platform||`-`}</span>
        </div>
        ${a?`
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">쇼호스트</span>
          <span>${a}</span>
        </div>
        `:``}
      </div>
      <div class="project-card-footer">
        <div class="project-card-progress">
          <div class="project-card-progress-text">${r}%</div>
          <div class="progress-bar progress-bar-sm">
            <div class="progress-bar-fill" style="width: ${r}%"></div>
          </div>
        </div>
        <div class="project-card-pd">${e.pd||`-`}</div>
      </div>
    </div>
  `}function Ge(){return`
    <div class="empty-state" style="grid-column: 1 / -1;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
      <h3>진행중인 프로젝트가 없습니다</h3>
      <p>새 라이브 프로젝트를 등록해 주세요.</p>
    </div>
  `}function Ke(e,t){if(!e)return``;let n=e.replace(/\./g,`-`),r=new Date(n);if(isNaN(r.getTime()))return``;let i=0;if(t===`design`?i=-4:t===`cue_sheet`?i=-5:t===`host_cast`&&(i=-7),i===0)return``;let a=new Date(r);a.setDate(a.getDate()+i);let o=String(a.getMonth()+1).padStart(2,`0`),s=String(a.getDate()).padStart(2,`0`),c=new Date;c.setHours(0,0,0,0);let l=a.getTime()-c.getTime(),u=Math.ceil(l/(1e3*60*60*24)),d=``;return d=u===0?`D-Day`:u>0?`D-${u}`:`D+${Math.abs(u)}`,`<br><span style="font-size: 10px; opacity: 0.8; font-weight: normal;">(${o}/${s} 까지 / <strong style="color:var(--status-error);">${d}</strong>)</span>`}function qe(e){let t=V.getById(`projects`,e);if(!t)return;let n=V.getById(`brands`,t.brandId),r=t.brandName||(n?n.name:`-`),i=document.createElement(`div`);i.innerHTML=`
    <div style="margin-bottom: var(--space-5);">
      <div style="font-size: var(--text-md); font-weight: var(--weight-semibold); margin-bottom: var(--space-1);">${r}</div>
      <div style="font-size: var(--text-sm); color: var(--text-tertiary);">${G(t.broadcastDate)}</div>
    </div>
    <div style="margin-bottom: var(--space-4);">
      <label style="font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-secondary); display: block; margin-bottom: var(--space-2);">방송 진행 상태 변경</label>
      <div class="status-options" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2);">
        ${d.map(e=>`
          <button class="btn ${t.broadcastStatus===e.key?`btn-primary`:`btn-secondary`} btn-sm status-option" data-status="${e.key}" style="flex-direction: column; align-items: flex-start; justify-content: flex-start; font-size: 12px; padding: var(--space-1) var(--space-2); height: auto; line-height: 1.3;">
            <span>${e.label}</span>${Ke(t.broadcastDate,e.key)}
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
  `,q({title:`프로젝트 상태 변경`,size:`md`,content:i,footer:o}),document.querySelectorAll(`.status-option`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.status-option`).forEach(e=>{e.className=`btn btn-secondary btn-sm status-option`,e.style.justifyContent=`flex-start`,e.style.fontSize=`12px`}),e.className=`btn btn-primary btn-sm status-option`,e.style.justifyContent=`flex-start`,e.style.fontSize=`12px`,a=e.getAttribute(`data-status`)})}),document.getElementById(`modal-cancel`)?.addEventListener(`click`,J),document.getElementById(`modal-view-detail`)?.addEventListener(`click`,()=>{J(),u.navigate(`/projects/${e}`)}),document.getElementById(`modal-save`)?.addEventListener(`click`,()=>{V.update(`projects`,e,{broadcastStatus:a}),J(),Y(`방송 상태가 "${C(a)}"(으)로 변경되었습니다.`);let t=document.getElementById(`page-content`);t&&(t.innerHTML=``,t.appendChild(He()))})}function Je(){let e=document.createElement(`div`);e.className=`dashboard-container`,e.style.display=`flex`,e.style.gap=`24px`,e.style.padding=`24px`,e.style.height=`calc(100vh - 48px)`,e.style.overflow=`hidden`;let t=document.createElement(`style`);t.innerHTML=`
    .modern-input { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; transition: all 0.2s; background: #fff; box-sizing: border-box; }
    .modern-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
    .modern-input[readonly] { background: #f3f4f6; cursor: not-allowed; }
    .modern-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
    .file-upload-wrapper { display: flex; align-items: center; gap: 12px; }
    .file-upload-btn { display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; background: #fff; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.2s; color: #374151; }
    .file-upload-btn:hover { background: #f9fafb; }
    .product-row { display: flex; gap: 16px; align-items: center; background: #fff; padding: 16px; border-radius: 12px; margin-bottom: 12px; border: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .product-img-box { position: relative; width: 64px; height: 64px; flex-shrink: 0; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; cursor: pointer; }
    .product-img-box img { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s; }
    .product-img-box:hover img { opacity: 0.8; }
    .product-inputs { flex: 1; display: flex; flex-direction: column; gap: 8px; }
    .product-prices { display: flex; gap: 8px; align-items: center; }
  `,e.appendChild(t),localStorage.getItem(`ryzin_live_config`)||localStorage.setItem(`ryzin_live_config`,JSON.stringify({brandName:`Ryzin Corp`,title:`단독 특가 라이브 방송 중!`,streamUrl:`https://ib3fjwlmgu0bwksrq8ao15010.edge.naverncp.com/live/video/ls-20260701130603-WkL1g/1080p-16-9/playlist.m3u8`,logoUrl:`https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff`,botEnabled:!0,showViewers:!0})),localStorage.getItem(`ryzin_live_stats`)||localStorage.setItem(`ryzin_live_stats`,JSON.stringify({viewers:1204,hearts:12040})),localStorage.getItem(`ryzin_live_products`)||localStorage.setItem(`ryzin_live_products`,JSON.stringify([{id:1,name:`[특가] 트루쿡 인덕션 프라이팬 3종 세트`,price:`49,900원`,image:`https://images.unsplash.com/photo-1584990347449-a6e81cb8860a?auto=format&fit=crop&q=80&w=200&h=200`,url:`#`},{id:2,name:`네티컬 딥 클렌징 앰플 기획세트`,price:`24,000원`,image:`https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200&h=200`,url:`#`},{id:3,name:`탐루미 수분폭탄 마스크팩 10매`,price:`12,900원`,image:`https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200&h=200`,url:`#`}])),localStorage.getItem(`ryzin_live_chats`)||localStorage.setItem(`ryzin_live_chats`,JSON.stringify([]));let n=JSON.parse(localStorage.getItem(`ryzin_live_config`)),r=JSON.parse(localStorage.getItem(`ryzin_live_stats`)),i=JSON.parse(localStorage.getItem(`ryzin_live_products`)),a=`https://sheetdb.io/api/v1/3k5vdph36v8ej`,o=null,s=()=>{o&&clearTimeout(o),o=setTimeout(()=>{let e={업데이트시간:new Date().toISOString(),제목:n.brandName,부제목:n.title,프로필이미지:n.logoUrl,URL:n.streamUrl,시청자수:r.viewers,하트수:r.hearts,상품수:i.length,첫상품명:JSON.stringify({thumbnailUrl:n.thumbnailUrl||``,liveStartTime:n.liveStartTime||``,isLive:n.isLive===!0}),상품목록:JSON.stringify(i),시청자수노출:n.showViewers?`O`:`X`,썸네일URL:n.thumbnailUrl||``,시작일시:n.liveStartTime||``,방송상태:n.isLive?`ON`:`OFF`};fetch(`${a}?sheet=%EB%9D%BC%EC%9D%B4%EB%B8%8C%EA%B4%80%EC%A0%9C`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({data:[e]})}).catch(e=>console.warn(`SheetDB 연동 실패`,e))},1e3)},c=()=>{let e=document.getElementById(`live-preview-iframe`);e&&e.contentWindow&&e.contentWindow.postMessage({type:`sync_preview`,config:n,stats:r,products:i},`*`)},l=()=>{localStorage.setItem(`ryzin_live_config`,JSON.stringify(n)),window.dispatchEvent(new Event(`storage`)),c(),s()},u=()=>{localStorage.setItem(`ryzin_live_stats`,JSON.stringify(r)),c(),s()},d=()=>{localStorage.setItem(`ryzin_live_products`,JSON.stringify(i)),c()},f=document.createElement(`div`);f.style.flex=`1`,f.style.display=`flex`,f.style.flexDirection=`column`,f.style.gap=`24px`,f.style.overflowY=`auto`,f.style.paddingRight=`12px`;let p=document.createElement(`div`);p.className=`card`,p.style.padding=`24px`,p.style.borderRadius=`12px`,p.style.boxShadow=`0 4px 6px -1px rgba(0,0,0,0.1)`,p.style.border=`none`,p.innerHTML=`
    <h3 style="margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:24px; font-size:18px; font-weight:700; color:#111;">라이브 기본 설정</h3>
    
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">
      <div>
        <label class="modern-label">제목 (브랜드명)</label>
        <input type="text" class="modern-input" id="config-brandName" value="${n.brandName||`Ryzin Corp`}">
      </div>
      <div>
        <label class="modern-label">부제목 (방송 제목)</label>
        <input type="text" class="modern-input" id="config-title" value="${n.title||``}">
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <label class="modern-label">방송 시작 일시 (카운트다운용)</label>
      <input type="datetime-local" class="modern-input" id="config-liveStartTime" value="${n.liveStartTime||``}">
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:24px;">
      <div class="file-upload-wrapper">
        <div style="width:56px; height:56px; border-radius:50%; overflow:hidden; border:2px solid #e5e7eb; flex-shrink:0;">
          <img id="logo-preview" src="${n.logoUrl||``}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <label class="modern-label">프로필 이미지</label>
          <label class="file-upload-btn" for="config-logoFile">이미지 업로드</label>
          <input type="file" id="config-logoFile" accept="image/*" style="display:none;">
        </div>
      </div>
      <div class="file-upload-wrapper">
        <div style="width:40px; height:71px; border-radius:6px; overflow:hidden; border:2px solid #e5e7eb; flex-shrink:0;">
          <img id="thumbnail-preview" src="${n.thumbnailUrl||``}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <label class="modern-label">라이브 썸네일 (9:16 비율)</label>
          <label class="file-upload-btn" for="config-thumbnailFile">이미지 업로드</label>
          <input type="file" id="config-thumbnailFile" accept="image/*" style="display:none;">
        </div>
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <label class="modern-label">스트리밍 URL (m3u8)</label>
      <input type="text" class="modern-input" id="config-stream" value="${n.streamUrl}">
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:24px;">
      <div>
        <label class="modern-label">시청자 수 뻥튀기</label>
        <input type="number" class="modern-input" id="stat-viewers" value="${r.viewers}">
      </div>
      <div>
        <label class="modern-label">하트 수 뻥튀기</label>
        <input type="number" class="modern-input" id="stat-hearts" value="${r.hearts}">
      </div>
    </div>

    <div style="display:flex; align-items:center; gap:24px; margin-bottom:32px; background:#f9fafb; padding:16px; border-radius:8px;">
      <label style="display:flex; align-items:center; gap:8px; font-size:14px; font-weight:500; cursor:pointer;">
        <input type="checkbox" id="config-show-viewers" style="width:18px; height:18px; accent-color:#e50914;" ${n.showViewers===!1?``:`checked`}>
        시청자 수 노출
      </label>
      <label style="display:flex; align-items:center; gap:8px; font-size:14px; font-weight:500; cursor:pointer;">
        <input type="checkbox" id="config-bot" style="width:18px; height:18px; accent-color:#e50914;" ${n.botEnabled?`checked`:``}>
        채팅 봇 활성화
      </label>
    </div>

    <div style="display:flex; gap:12px; flex-direction:column;">
      <button id="btn-save-config" class="btn" style="width:100%; padding:14px; font-weight:700; background:#111; color:#fff; border:none; border-radius:8px; font-size:15px; transition:opacity 0.2s;">
        라이브 설정 일괄 적용 (저장)
      </button>
      <button id="btn-toggle-live" class="btn" style="width:100%; padding:14px; font-weight:700; color:white; background:${n.isLive?`#6b7280`:`#e50914`}; border:none; border-radius:8px; font-size:15px; transition:opacity 0.2s;">
        ${n.isLive?`라이브 종료하기`:`라이브 시작하기`}
      </button>
    </div>
  `;let m=()=>i.map((e,t)=>`
      <div class="product-row">
        <div class="product-img-box" onclick="document.getElementById('upload-prod-${t}').click()" title="클릭하여 이미지 업로드">
          <img src="${e.image}" id="img-preview-${t}">
          <input type="file" id="upload-prod-${t}" accept="image/*" style="display:none;" data-idx="${t}" class="prod-img-upload">
        </div>
        <div class="product-inputs">
          <input type="text" class="modern-input" value="${e.name}" data-idx="${t}" data-field="name" placeholder="상품명">
          <input type="text" class="modern-input" value="${e.url}" data-idx="${t}" data-field="url" placeholder="상품 구매 링크 URL">
          <div class="product-prices">
            <input type="number" class="modern-input" value="${(e.price||``).toString().replace(/[^0-9]/g,``)}" data-idx="${t}" data-field="price" placeholder="라이브가(숫자)">
            <input type="number" class="modern-input" value="${(e.normalPrice||``).toString().replace(/[^0-9]/g,``)}" data-idx="${t}" data-field="normalPrice" placeholder="정상가(숫자)">
            <input type="number" min="0" max="100" class="modern-input" style="max-width:80px; text-align:center;" value="${e.discountRate||0}" data-idx="${t}" data-field="discountRate" placeholder="할인율%" readonly>
            <button class="btn btn-danger btn-del-product" data-idx="${t}" style="padding:10px 16px; font-weight:600; border-radius:8px; border:none; background:#ef4444; color:#fff;">삭제</button>
          </div>
        </div>
      </div>
    `).join(``),h=document.createElement(`div`);h.className=`card`,h.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:20px;">
      <h3 style="margin:0; font-size:18px; font-weight:700; color:#111;">상품 관리</h3>
      <div style="display:flex; gap:8px;">
        <button class="btn" id="btn-add-product" style="padding:8px 16px; background:#f3f4f6; border:1px solid #d1d5db; color:#374151; font-weight:600; border-radius:6px; font-size:14px;">+ 상품 추가</button>
        <button class="btn" id="btn-save-products" style="padding:8px 16px; background:#111; border:none; color:#fff; font-weight:600; border-radius:6px; font-size:14px;">상품 일괄 적용</button>
      </div>
    </div>
    </div>
    <div id="product-list-container">
      ${m()}
    </div>
  `,f.appendChild(p),f.appendChild(h);let g=document.createElement(`div`);g.style.width=`380px`,g.style.display=`flex`,g.style.flexDirection=`column`,g.style.gap=`16px`;let _=window.location.origin.includes(`localhost:5173`)?`http://localhost:8080/live/`:`/live/`,v=document.createElement(`div`);v.className=`card`,v.style.padding=`0`,v.style.overflow=`hidden`,v.style.width=`360px`,v.style.height=`640px`,v.style.margin=`0 auto`,v.style.display=`flex`,v.style.flexDirection=`column`,v.style.borderRadius=`16px`,v.style.boxShadow=`0 10px 25px rgba(0,0,0,0.1)`,v.innerHTML=`
    <div style="background:#2c3e50; color:#fff; padding:12px 16px; font-weight:bold; font-size:14px; display:flex; justify-content:space-between; align-items:center;">
      <span>모바일 미리보기</span>
      <button class="btn btn-primary btn-sm" id="btn-refresh-preview" style="padding:4px 10px; font-size:12px; border-radius:4px;">새로고침</button>
    </div>
    <iframe id="live-preview-iframe" src="${_}" style="width:100%; flex:1; border:none; background:#000;"></iframe>
  `;let y=document.createElement(`div`);return y.className=`card`,y.style.flex=`1`,y.style.display=`flex`,y.style.flexDirection=`column`,y.innerHTML=`
    <h3 style="margin-top:0; margin-bottom:12px; font-size:16px; font-weight:600; color:#333;">관리자 채팅 발송</h3>
    <div id="admin-chat-list" style="flex:1; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:12px; overflow-y:auto; margin-bottom:12px; min-height:150px; font-size:13px;">
      <div style="color:#666; text-align:center; padding-top:40px;">실시간 채팅 내역이 여기에 표시됩니다.</div>
    </div>
    <div style="display:flex; gap:8px;">
      <input type="text" id="admin-chat-input" class="form-control" placeholder="관리자 공지 전송...">
      <button id="btn-send-chat" class="btn btn-primary">전송</button>
    </div>
  `,g.appendChild(v),g.appendChild(y),e.appendChild(f),e.appendChild(g),setTimeout(()=>{let e=(e,t)=>{document.getElementById(e).addEventListener(`input`,e=>{r[t]=parseInt(e.target.value)||0,u()})};document.getElementById(`config-brandName`).addEventListener(`input`,e=>{n.brandName=e.target.value,l()}),document.getElementById(`config-title`).addEventListener(`input`,e=>{n.title=e.target.value,l()}),document.getElementById(`config-stream`).addEventListener(`input`,e=>{n.streamUrl=e.target.value,l()}),document.getElementById(`config-liveStartTime`).addEventListener(`input`,e=>{n.liveStartTime=e.target.value,l()});let t=async(e,t,r)=>{if(!e)return;let i=new FormData;i.append(`file`,e);let a=document.getElementById(t);a.style.opacity=`0.5`;try{let e=await(await fetch(`https://tmpfiles.org/api/v1/upload`,{method:`POST`,body:i})).json();if(e.status===`success`){let t=e.data.url.replace(`tmpfiles.org/`,`tmpfiles.org/dl/`);n[r]=t,a.src=t,l()}else alert(`이미지 업로드 실패`)}catch(e){console.error(e),alert(`이미지 업로드 에러`)}finally{a.style.opacity=`1`}};document.getElementById(`config-logoFile`).addEventListener(`change`,e=>{t(e.target.files[0],`logo-preview`,`logoUrl`)}),document.getElementById(`config-thumbnailFile`).addEventListener(`change`,e=>{t(e.target.files[0],`thumbnail-preview`,`thumbnailUrl`)}),document.getElementById(`btn-toggle-live`).addEventListener(`click`,e=>{n.isLive=!n.isLive,e.target.textContent=n.isLive?`라이브 종료하기`:`라이브 시작하기`,e.target.style.background=n.isLive?`#6b7280`:`#10b981`,l(),alert(n.isLive?`라이브가 시작되었습니다! 모바일 시청자들에게 영상이 송출됩니다.`:`라이브가 종료되었습니다. 시청자들에게 썸네일이 노출됩니다.`)}),document.getElementById(`btn-save-config`).addEventListener(`click`,()=>{n.brandName=document.getElementById(`config-brandName`).value,n.title=document.getElementById(`config-title`).value,n.streamUrl=document.getElementById(`config-stream`).value,n.liveStartTime=document.getElementById(`config-liveStartTime`).value,l(),alert(`라이브 기본설정이 저장되었습니다.`)}),e(`stat-viewers`,`viewers`),e(`stat-hearts`,`hearts`),document.getElementById(`config-bot`).addEventListener(`change`,e=>{n.botEnabled=e.target.checked,l()}),document.getElementById(`config-show-viewers`).addEventListener(`change`,e=>{n.showViewers=e.target.checked,l()}),document.getElementById(`btn-refresh-preview`).addEventListener(`click`,()=>{document.getElementById(`live-preview-iframe`).src=_});let o=()=>{let e=document.getElementById(`product-list-container`);e.querySelectorAll(`input`).forEach(t=>{t.addEventListener(`change`,t=>{let n=parseInt(t.target.dataset.idx),r=t.target.dataset.field;if(i[n][r]=t.target.value,r===`price`||r===`normalPrice`){let t=(i[n].normalPrice||``).toString().replace(/[^0-9]/g,``),r=(i[n].price||``).toString().replace(/[^0-9]/g,``);if(t&&r){let a=Number(t),o=Number(r);if(a>0&&a>=o){let t=Math.floor((a-o)/a*100);i[n].discountRate=t;let r=e.querySelector(`input[data-idx="${n}"][data-field="discountRate"]`);r&&(r.value=t)}}}d()})}),e.querySelectorAll(`.prod-img-upload`).forEach(e=>{e.addEventListener(`change`,async e=>{let t=e.target.files[0];if(!t)return;let n=parseInt(e.target.dataset.idx),r=new FormData;r.append(`file`,t);let a=document.getElementById(`img-preview-${n}`);a.style.opacity=`0.5`;try{let e=await(await fetch(`https://tmpfiles.org/api/v1/upload`,{method:`POST`,body:r})).json();if(e.status===`success`){let t=e.data.url.replace(`tmpfiles.org/`,`tmpfiles.org/dl/`);i[n].image=t,a.src=t,d()}else alert(`상품 이미지 업로드 실패`)}catch(e){console.error(e),alert(`상품 이미지 업로드 에러`)}finally{a.style.opacity=`1`}})}),e.querySelectorAll(`.btn-del-product`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.target.dataset.idx);i.splice(t,1),d(),document.getElementById(`product-list-container`).innerHTML=m(),o()})})};o(),document.getElementById(`btn-add-product`).addEventListener(`click`,()=>{i.push({id:Date.now(),name:`새 상품`,price:``,normalPrice:``,discountRate:0,image:`https://via.placeholder.com/200`,url:`#`}),d(),document.getElementById(`product-list-container`).innerHTML=m(),o()}),document.getElementById(`btn-save-products`).addEventListener(`click`,()=>{s(),alert(`상품 목록이 시트 DB에 일괄 적용되었습니다.`)});let c=document.getElementById(`admin-chat-input`),f=!1,p=async()=>{let e=c.value.trim();if(!e||f)return;f=!0;let t={id:Date.now(),name:`관리자`,text:e,isAdmin:!0},n=document.getElementById(`admin-chat-list`),r=document.createElement(`div`);r.style.marginBottom=`8px`,r.innerHTML=`<span style="font-weight:bold; color:var(--primary); margin-right:4px;">${t.name}:</span> ${t.text}`,n.appendChild(r),n.scrollTop=n.scrollHeight,c.value=``;try{await fetch(`${a}?sheet=%EB%9D%BC%EC%9D%B4%EB%B8%8C%EC%B1%84%ED%8C%85`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({data:[{시간:t.id.toString(),닉네임:`관리자`,내용:e}]})})}catch(e){console.warn(`Admin chat sync failed`,e)}finally{f=!1}};document.getElementById(`btn-send-chat`).addEventListener(`click`,p),c.addEventListener(`keypress`,e=>{e.key===`Enter`&&p()}),window.addEventListener(`storage`,e=>{if(e.key===`ryzin_user_chat_trigger`){let t=JSON.parse(e.newValue);if(!t)return;let n=document.getElementById(`admin-chat-list`);n.innerHTML.includes(`실시간 채팅 내역`)&&(n.innerHTML=``);let r=document.createElement(`div`);r.style.marginBottom=`8px`,r.innerHTML=`<span style="font-weight:bold; color:#333; margin-right:4px;">${t.name}:</span> ${t.text}`,n.appendChild(r),n.scrollTop=n.scrollHeight}})},0),e}function Ye(){let e=document.createElement(`div`),t=``;function n(){let r=V.getAll(`hosts`);if(t){let e=t.toLowerCase();r=r.filter(t=>t.name.toLowerCase().includes(e)||t.phone&&t.phone.includes(e))}let i=r.map(e=>{let t=V.getHostStats(e.id);return{...e,stats:t}});e.innerHTML=`
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
                    <td class="text-right">${W(e.stats.totalBroadcasts)}회</td>
                    <td class="text-right">${W(e.stats.monthBroadcasts)}회</td>
                    <td class="text-right">${H(e.stats.totalSettlement)}</td>
                    <td>${G(e.stats.lastBroadcastDate)}</td>
                    <td class="text-right">${H(e.stats.avgRevenue)}</td>
                    <td class="text-right">${K(e.stats.avgROI)}</td>
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
    `,setTimeout(()=>{e.querySelector(`#host-search`)?.addEventListener(`input`,e=>{t=e.target.value,n();let r=document.getElementById(`host-search`);if(r){r.focus();let e=r.value.length;r.setSelectionRange(e,e)}}),e.querySelector(`#btn-add-host`)?.addEventListener(`click`,()=>{Xe()}),e.querySelectorAll(`.host-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),u.navigate(`/hosts/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`.btn-edit-host`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),Xe(e.getAttribute(`data-id`))})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>{u.navigate(`/hosts/${e.getAttribute(`data-id`)}`)})})},0)}return n(),V.on(`hosts:changed`,n),e}function Xe(e=null){let t=!!e,n=t?V.getById(`hosts`,e):{},r=`
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
          ${x.map(e=>`<option value="${e}" ${n.bank===e?`selected`:``}>${e}</option>`).join(``)}
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
  `,i=document.createElement(`div`);if(i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,t){let t=document.createElement(`button`);t.className=`btn btn-danger`,t.textContent=`삭제`,t.style.marginRight=`auto`,t.addEventListener(`click`,()=>{J(),Ie({title:`쇼호스트 삭제`,message:`"${n.name}" 쇼호스트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`,confirmText:`삭제`,danger:!0,onConfirm:()=>{V.delete(`hosts`,e),Y(`쇼호스트가 삭제되었습니다.`)}})}),i.appendChild(t)}let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,J);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=t?`수정`:`등록`,o.addEventListener(`click`,()=>{let n=document.getElementById(`host-name`).value.trim(),r=document.getElementById(`host-phone`).value.trim();if(!n){X(`이름을 입력해주세요.`);return}let i={name:n,phone:r,ssn:document.getElementById(`host-ssn`).value.trim(),bank:document.getElementById(`host-bank`).value,account:document.getElementById(`host-account`).value.trim(),accountHolder:document.getElementById(`host-holder`).value.trim(),address:document.getElementById(`host-address`).value.trim()};t?(V.update(`hosts`,e,i),Y(`쇼호스트 정보가 수정되었습니다.`)):(i.id=S(`host`),i.memo={features:``,strengths:``,weaknesses:``,style:``,brandPreference:``,caution:``,comment:``},i.createdAt=new Date().toISOString().split(`T`)[0],V.create(`hosts`,i),Y(`쇼호스트가 등록되었습니다.`)),J()}),i.appendChild(a),i.appendChild(o),q({title:t?`쇼호스트 수정`:`쇼호스트 등록`,size:`lg`,content:r,footer:i})}function Ze(e){let t=document.createElement(`div`),n=V.getById(`hosts`,e.id);if(!n)return t.innerHTML=`
      <div class="page-header"><div class="page-header-left"><h1 class="page-title">쇼호스트를 찾을 수 없습니다</h1></div></div>
      <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>
    `,setTimeout(()=>{t.querySelector(`#btn-back`)?.addEventListener(`click`,()=>u.navigate(`/hosts`))},0),t;let r=V.getHostStats(n.id),i=n.memo||{},a=V.query(`liveHosts`,e=>e.hostId===n.id).map(e=>{let t=V.getById(`projects`,e.liveId);return{matching:e,project:t,brand:t?V.getById(`brands`,t.brandId):null,result:V.getById(`results`,e.liveId)}}).filter(e=>e.project);return t.innerHTML=`
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
          <div class="stat-value">${W(r.totalBroadcasts)}회</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">이번달 방송</div>
          <div class="stat-value">${W(r.monthBroadcasts)}회</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">누적 정산금액</div>
          <div class="stat-value">${H(r.totalSettlement)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">최근 방송일</div>
          <div class="stat-value">${G(r.lastBroadcastDate)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">평균 매출</div>
          <div class="stat-value">${H(r.avgRevenue)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">평균 ROI</div>
          <div class="stat-value">${K(r.avgROI)}</div>
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
                <span class="detail-field-value ssn-toggle" data-ssn="${n.ssn||``}" style="cursor: pointer; text-decoration: underline;" title="클릭하여 확인">${n.ssn?je(n.ssn):`-`}</span>
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
              ${Qe(`특징`,i.features)}
              ${Qe(`강점`,i.strengths)}
              ${Qe(`약점`,i.weaknesses)}
              ${Qe(`진행 스타일`,i.style)}
              ${Qe(`브랜드 선호도`,i.brandPreference)}
              ${Qe(`주의사항`,i.caution)}
              ${Qe(`기타`,i.comment)}
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
                  <td>${G(e.project.broadcastDate)}</td>
                  <td><a href="javascript:void(0)" class="project-link" data-id="${e.project.id}">${e.brand?e.brand.name:`-`}</a></td>
                  <td>${{main:`메인`,sub:`서브`,guest:`게스트`}[e.matching.role]||`-`}</td>
                  <td class="text-right">${H(e.matching.fee)}</td>
                  <td><span class="badge ${e.matching.settleStatus===`done`?`badge-success`:`badge-default`}">${{pending:`대기`,processing:`진행중`,done:`완료`}[e.matching.settleStatus]||`-`}</span></td>
                  <td>${e.result?H(e.result.liveRevenue):`-`}</td>
                </tr>
              `).join(``):`<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">방송 이력이 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{let e=t.querySelector(`.ssn-toggle`);if(e&&e.dataset.ssn){let t=!0;e.addEventListener(`click`,()=>{t=!t,e.textContent=t?je(e.dataset.ssn):e.dataset.ssn})}t.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>u.navigate(`/hosts`)),t.querySelector(`#btn-edit-host`)?.addEventListener(`click`,()=>Xe(n.id)),t.querySelector(`#btn-edit-memo`)?.addEventListener(`click`,()=>$e(n)),t.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),u.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0),t}function Qe(e,t){return`
    <div>
      <div style="font-size: var(--text-xs); color: var(--text-tertiary); font-weight: var(--weight-medium); margin-bottom: 2px;">${e}</div>
      <div style="font-size: var(--text-sm); color: var(--text-secondary);">${t||`-`}</div>
    </div>
  `}function $e(e){let t=e.memo||{},n=[{key:`features`,label:`특징`},{key:`strengths`,label:`강점`},{key:`weaknesses`,label:`약점`},{key:`style`,label:`진행 스타일`},{key:`brandPreference`,label:`브랜드 선호도`},{key:`caution`,label:`주의사항`},{key:`comment`,label:`기타 코멘트`}],r=`
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      ${n.map(e=>`
        <div class="input-group">
          <label>${e.label}</label>
          <textarea class="input" id="memo-${e.key}" rows="2">${t[e.key]||``}</textarea>
        </div>
      `).join(``)}
    </div>
  `,i=document.createElement(`div`);i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,J);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=`저장`,o.addEventListener(`click`,()=>{let t={};n.forEach(e=>{t[e.key]=document.getElementById(`memo-${e.key}`).value.trim()}),V.update(`hosts`,e.id,{memo:t}),J(),Y(`메모가 저장되었습니다.`),u.navigate(`/hosts/${e.id}`)}),i.appendChild(a),i.appendChild(o),q({title:`메모 수정`,size:`lg`,content:r,footer:i})}function et(){let e=document.createElement(`div`),t=``;function n(){let r=V.getAll(`brands`);if(t){let e=t.toLowerCase();r=r.filter(t=>t.name.toLowerCase().includes(e)||t.manager&&t.manager.toLowerCase().includes(e)||t.category&&t.category.toLowerCase().includes(e))}let i=r.map(e=>{let t=V.getBrandStats(e.id);return{...e,stats:t}});e.innerHTML=`
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
                  <th>사업자명</th>
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
                    <td>${e.companyName||`-`}</td>
                    <td><span class="badge badge-default">${e.category||`-`}</span></td>
                    <td>${e.manager||`-`}</td>
                    <td>${e.phone||`-`}</td>
                    <td>${e.taxInvoice?`<span class="badge badge-success">발행</span>`:`<span class="badge badge-default">미발행</span>`}</td>
                    <td class="text-right">${W(e.stats.totalBroadcasts)}회</td>
                    <td class="text-right">${H(e.stats.totalRevenue)}</td>
                    <td>${G(e.stats.lastBroadcastDate)}</td>
                    <td class="text-right">${K(e.stats.avgROI)}</td>
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
    `,setTimeout(()=>{e.querySelector(`#brand-search`)?.addEventListener(`input`,e=>{t=e.target.value,n();let r=document.getElementById(`brand-search`);if(r){r.focus();let e=r.value.length;r.setSelectionRange(e,e)}}),e.querySelector(`#btn-add-brand`)?.addEventListener(`click`,()=>tt()),e.querySelectorAll(`.brand-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),u.navigate(`/brands/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`.btn-edit-brand`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),tt(e.getAttribute(`data-id`))})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>u.navigate(`/brands/${e.getAttribute(`data-id`)}`))})},0)}return n(),V.on(`brands:changed`,n),e}function tt(e=null){let t=!!e,n=t?V.getById(`brands`,e):{},r=`
    <div class="form-grid">
      <div class="input-group">
        <label class="required">브랜드명</label>
        <input class="input" id="brand-name" value="${n.name||``}" placeholder="브랜드명">
      </div>
      <div class="input-group">
        <label>사업자명(법인명)</label>
        <input class="input" id="brand-company" value="${n.companyName||``}" placeholder="사업자명">
      </div>
      <div class="input-group">
        <label>카테고리</label>
        <select class="input" id="brand-category">
          <option value="">선택</option>
          ${_.map(e=>`<option value="${e}" ${n.category===e?`selected`:``}>${e}</option>`).join(``)}
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
  `,i=document.createElement(`div`);if(i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,t){let t=document.createElement(`button`);t.className=`btn btn-danger`,t.textContent=`삭제`,t.style.marginRight=`auto`,t.addEventListener(`click`,()=>{J(),Ie({title:`브랜드 삭제`,message:`"${n.name}" 브랜드를 삭제하시겠습니까?`,confirmText:`삭제`,danger:!0,onConfirm:()=>{V.delete(`brands`,e),Y(`브랜드가 삭제되었습니다.`)}})}),i.appendChild(t)}let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,J);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=t?`수정`:`등록`,o.addEventListener(`click`,()=>{let n=document.getElementById(`brand-name`).value.trim();if(!n){X(`브랜드명을 입력해주세요.`);return}let r={name:n,companyName:document.getElementById(`brand-company`).value.trim(),category:document.getElementById(`brand-category`).value,manager:document.getElementById(`brand-manager`).value.trim(),phone:document.getElementById(`brand-phone`).value.trim(),email:document.getElementById(`brand-email`).value.trim(),businessNo:document.getElementById(`brand-biz`).value.trim(),taxInvoice:document.getElementById(`brand-tax`).value===`true`,address:document.getElementById(`brand-address`).value.trim(),memo:document.getElementById(`brand-memo`).value.trim()};t?(V.update(`brands`,e,r),Y(`브랜드 정보가 수정되었습니다.`)):(r.id=S(`brand`),r.createdAt=new Date().toISOString().split(`T`)[0],V.create(`brands`,r),Y(`브랜드가 등록되었습니다.`)),J()}),i.appendChild(a),i.appendChild(o),q({title:t?`브랜드 수정`:`브랜드 등록`,size:`lg`,content:r,footer:i})}function nt(e){let t=document.createElement(`div`),n=V.getById(`brands`,e.id);if(!n)return t.innerHTML=`<div class="page-header"><div class="page-header-left"><h1 class="page-title">브랜드를 찾을 수 없습니다</h1></div></div>
    <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>`,setTimeout(()=>{t.querySelector(`#btn-back`)?.addEventListener(`click`,()=>u.navigate(`/brands`))},0),t;let r=V.getBrandStats(n.id),i=V.query(`projects`,e=>e.brandId===n.id||e.brandName===n.name);return t.innerHTML=`
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
        <div class="stat-card"><div class="stat-label">총 방송횟수</div><div class="stat-value">${W(r.totalBroadcasts)}회</div></div>
        <div class="stat-card"><div class="stat-label">누적 매출</div><div class="stat-value">${H(r.totalRevenue)}</div></div>
        <div class="stat-card"><div class="stat-label">최근 방송일</div><div class="stat-value">${G(r.lastBroadcastDate)}</div></div>
        <div class="stat-card"><div class="stat-label">평균 ROI</div><div class="stat-value">${K(r.avgROI)}</div></div>
      </div>

      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-header"><h3>기본 정보</h3></div>
        <div class="card-body">
          <div class="detail-grid">
            <div class="detail-field"><span class="detail-field-label">사업자명</span><span class="detail-field-value">${n.companyName||`-`}</span></div>
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
              ${i.length>0?i.map(e=>{let t=V.getAll(`results`).find(t=>t.liveId===e.id);return`
                <tr class="clickable" data-id="${e.id}">
                  <td>${Pe(e.broadcastStatus)}</td>
                  <td><a href="javascript:void(0)" class="project-link" data-id="${e.id}">${G(e.broadcastDate)||`상세보기`}</a></td>
                  <td>${e.platform||`-`}</td>
                  <td class="text-right">${t?W(t.views):`-`}</td>
                  <td class="text-right">${t?U(t.liveRevenue):`-`}</td>
                  <td class="text-right">${t?K(t.roi):`-`}</td>
                </tr>`}).join(``):`<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">방송 이력이 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{t.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>u.navigate(`/brands`)),t.querySelector(`#btn-edit-brand`)?.addEventListener(`click`,()=>tt(n.id)),t.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),u.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0),t}function rt(e,t){if(!e)return``;let n=e.replace(/\./g,`-`),r=new Date(n);if(isNaN(r.getTime()))return``;let i=0;if(t===`design`?i=-4:t===`cue_sheet`?i=-5:t===`host_cast`&&(i=-7),i===0)return``;let a=new Date(r);a.setDate(a.getDate()+i);let o=String(a.getMonth()+1).padStart(2,`0`),s=String(a.getDate()).padStart(2,`0`),c=new Date;c.setHours(0,0,0,0);let l=a.getTime()-c.getTime(),u=Math.ceil(l/(1e3*60*60*24)),d=``;return d=u===0?`D-Day`:u>0?`D-${u}`:`D+${Math.abs(u)}`,`<br><span style="font-size: 10px; opacity: 0.8; font-weight: normal;">(${o}/${s} 까지 / <strong style="color:var(--status-error);">${d}</strong>)</span>`}function it(){let e=document.createElement(`div`),t=``,n={status:``,brand:``,platform:``,month:``,category:``,settleStatus:``},r={basic:!0,host:!0,result:!1,finance:!1},i=`list`,a=new Date;function o(){let s=V.getAll(`projects`);if(V.getAll(`brands`),V.getAll(`hosts`),t){let e=t.toLowerCase();s=s.filter(t=>{let n=V.getById(`brands`,t.brandId),r=V.query(`liveHosts`,e=>e.liveId===t.id).some(t=>{let n=V.getById(`hosts`,t.hostId);return n&&n.name.toLowerCase().includes(e)});return n&&n.name.toLowerCase().includes(e)||r})}n.status&&(s=s.filter(e=>e.broadcastStatus===n.status)),n.brand&&(s=s.filter(e=>e.brandId===n.brand)),n.platform&&(s=s.filter(e=>e.platform===n.platform)),n.month&&(s=s.filter(e=>e.broadcastMonth===n.month||e.broadcastDate&&e.broadcastDate.startsWith(n.month.replace(`-`,`.`))||e.broadcastDate&&e.broadcastDate.startsWith(n.month)?!0:e.broadcastMonth&&e.broadcastMonth.length<=2?parseInt(e.broadcastMonth,10)===parseInt(n.month.split(`-`)[1],10):!1)),n.category&&(s=s.filter(e=>e.category===n.category)),s.sort((e,t)=>(t.broadcastDate||``).localeCompare(e.broadcastDate||``));let c=s.map(e=>{let t=V.getById(`brands`,e.brandId),n=V.query(`liveHosts`,t=>t.liveId===e.id),r=V.getAll(`results`).find(t=>t.liveId===e.id),i=V.getAll(`finances`).find(t=>t.liveId===e.id),a=n[0]?V.getById(`hosts`,n[0].hostId):null,o=n[1]?V.getById(`hosts`,n[1].hostId):null,s=n.reduce((e,t)=>e+(t.fee||0),0),c=n.length>0&&n.every(e=>e.settleStatus===`done`)?`완료`:n.some(e=>e.settleStatus===`done`)?`일부완료`:`대기`;return{...e,brand:t,matchings:n,result:r,finance:i,hostA:a,hostB:o,totalHostFee:s,settleLabel:c,hostAFee:n[0]?.fee||0,hostBFee:n[1]?.fee||0}});[...new Set(V.getAll(`projects`).map(e=>e.broadcastMonth).filter(Boolean))].sort().reverse();function l(e){let t=a.getFullYear(),n=a.getMonth(),r=new Date(t,n,1).getDay(),i=new Date(t,n+1,0).getDate(),o=new Date,s=o.getFullYear()===t&&o.getMonth()===n,c=``;for(let e=0;e<r;e++)c+=`<div class="calendar-day empty"></div>`;for(let r=1;r<=i;r++){let i=`${t}-${String(n+1).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`,a=e.filter(e=>e.broadcastDate===i),l=s&&o.getDate()===r,u=a.map(e=>{let t=`#e2e8f0`,n=`#475569`;return e.broadcastStatus===`ready`?(t=`#dbeafe`,n=`#2563eb`):e.broadcastStatus===`live`?(t=`#fee2e2`,n=`#dc2626`):e.broadcastStatus===`done`?(t=`#dcfce3`,n=`#16a34a`):e.broadcastStatus===`cancel`&&(t=`#f1f5f9`,n=`#64748b`),`
            <div class="calendar-project-block clickable" data-id="${e.id}" style="background-color: ${t}; color: ${n}; border-left: 3px solid ${n};">
              <div class="cp-time">${e.broadcastTime||`-`}</div>
              <div class="cp-brand">${e.brandName||(e.brand?e.brand.name:`-`)}</div>
            </div>`}).join(``);c+=`
          <div class="calendar-day ${l?`today`:``}">
            <div class="calendar-date">${r}</div>
            <div class="calendar-projects">${u}</div>
          </div>`}return`
        <style>
          .calendar-wrapper { background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border-color); overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .calendar-header { display: flex; justify-content: space-between; align-items: center; padding: var(--space-4) var(--space-5); border-bottom: 1px solid var(--border-color); background: #f8fafc; }
          .calendar-title { font-size: 18px; font-weight: bold; color: var(--text-primary); }
          .calendar-nav { display: flex; gap: var(--space-2); }
          .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
          .calendar-dow { text-align: center; font-weight: bold; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-color); font-size: 13px; color: var(--text-secondary); background: #fff; }
          .calendar-day { min-height: 120px; padding: var(--space-2); border-bottom: 1px solid var(--border-color); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; gap: var(--space-1); background: #fff; }
          .calendar-day:nth-child(7n) { border-right: none; }
          .calendar-day.empty { background: #f8fafc; }
          .calendar-date { font-size: 14px; font-weight: 500; color: var(--text-secondary); padding: 2px 6px; align-self: flex-start; border-radius: 4px; }
          .calendar-day.today .calendar-date { background: #3b82f6; color: white; }
          .calendar-projects { display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }
          .calendar-project-block { padding: 4px 6px; border-radius: 4px; font-size: 11px; cursor: pointer; transition: transform 0.2s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; flex-direction: column; gap: 2px; }
          .calendar-project-block:hover { transform: translateY(-1px); filter: brightness(0.95); }
          .cp-time { font-weight: bold; opacity: 0.8; font-size: 10px; }
          .cp-brand { font-weight: bold; overflow: hidden; text-overflow: ellipsis; }
        </style>
        <div class="calendar-wrapper">
          <div class="calendar-header">
            <button class="btn btn-secondary btn-icon" id="btn-prev-month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div class="calendar-title">${t}년 ${n+1}월</div>
            <button class="btn btn-secondary btn-icon" id="btn-next-month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
          <div class="calendar-grid">
            <div class="calendar-dow" style="color: #ef4444;">일</div>
            <div class="calendar-dow">월</div>
            <div class="calendar-dow">화</div>
            <div class="calendar-dow">수</div>
            <div class="calendar-dow">목</div>
            <div class="calendar-dow">금</div>
            <div class="calendar-dow" style="color: #3b82f6;">토</div>
            ${c}
          </div>
        </div>
      `}let f=`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">라이브 관리</h1>
            <p class="page-description">전체 라이브 방송 프로젝트 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <div style="display: flex; gap: 8px; margin-right: 16px;">
            <button class="btn btn-sm ${i===`list`?`btn-primary`:`btn-secondary`}" id="btn-view-list">리스트</button>
            <button class="btn btn-sm ${i===`calendar`?`btn-primary`:`btn-secondary`}" id="btn-view-calendar">캘린더</button>
          </div>
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
        </div>
      </div>`,m=[...new Set(s.map(e=>{if(e.broadcastDate){let t=new Date(e.broadcastDate.replace(/\./g,`-`));if(!isNaN(t.getTime()))return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`}if(e.broadcastMonth){let t=String(e.broadcastMonth);return!t.includes(`-`)&&t.length<=2&&(t=`2026-${t.padStart(2,`0`)}`),t}return null}).filter(Boolean))].sort().reverse(),h=``;h=i===`list`?`
        <!-- 필터바 -->
        <div class="filter-bar">
          <select class="filter-select ${n.month?`active`:``}" id="filter-month">
            <option value="">전체 월</option>
            ${m.map(e=>`<option value="${e}" ${n.month===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
          <select class="filter-select ${n.status?`active`:``}" id="filter-status">
            <option value="">진행상태</option>
            ${d.map(e=>`<option value="${e.key}" ${n.status===e.key?`selected`:``}>${e.label}</option>`).join(``)}
          </select>
          <select class="filter-select ${n.category?`active`:``}" id="filter-category">
            <option value="">카테고리</option>
            ${_.map(e=>`<option value="${e}" ${n.category===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
          <select class="filter-select ${n.platform?`active`:``}" id="filter-platform">
            <option value="">플랫폼</option>
            ${p.map(e=>`<option value="${e}" ${n.platform===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
          <div class="table-search" style="margin-left: 4px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="검색" id="project-search" value="${t}" style="background: white;">
          </div>
          ${Object.values(n).some(e=>e)||t?`<button class="filter-reset" id="filter-reset">초기화</button>`:``}
        </div>

        <!-- 테이블 -->
        <div class="table-container">
          <div class="table-toolbar">
            <div class="table-toolbar-left" style="display: flex; align-items: center; gap: var(--space-4);">
              <div style="display: flex; align-items: center; gap: var(--space-2);">
                <span class="table-count" style="margin-right: 8px;">총 <strong>${c.length}</strong>건</span>
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
                  <th>브랜드</th>
                  <th>카테고리</th>
                  <th>방송일</th>
                  <th>시간</th>
                  <th>플랫폼</th>
                  `:``}
                  ${r.host?`
                  <th class="text-center" style="text-align: center;">쇼호스트A</th>
                  <th class="text-center" style="text-align: center;">쇼호스트B</th>
                  `:``}
                  ${r.result?`
                  <th class="text-right">시청뷰</th>
                  <th class="text-right">라이브매출</th>
                  <th class="text-right">ROI</th>
                  `:``}
                  ${r.finance?`
                  <th>정산</th>
                  `:``}
                  ${r.basic?`
                  <th>PD</th>
                  `:``}
                </tr>
              </thead>
              <tbody>
                ${c.length>0?c.map(e=>`
                  <tr class="clickable" data-id="${e.id}">
                    ${r.basic?`
                    <td>${Me(e.broadcastStatus)}</td>
                    <td><a href="javascript:void(0)" class="project-link" data-id="${e.id}">${e.brandName||(e.brand?e.brand.name:`-`)}</a></td>
                    <td><span class="badge badge-default">${e.category||`-`}</span></td>
                    <td>${G(e.broadcastDate)}</td>
                    <td>${e.broadcastTime||`-`}</td>
                    <td>${e.platform||`-`}</td>
                    `:``}
                    ${r.host?`
                    <td class="text-center" style="text-align: center;">${e.hostA?e.hostA.name:`-`}</td>
                    <td class="text-center" style="text-align: center;">${e.hostB?e.hostB.name:`-`}</td>
                    `:``}
                    ${r.result?`
                    <td class="text-right">${e.result?W(e.result.views):`-`}</td>
                    <td class="text-right" style="font-weight: bold;">${e.result?U(e.result.liveRevenue):`-`}</td>
                    <td class="text-right" style="font-weight: bold;">${e.result?K(e.result.roi):`-`}</td>
                    `:``}
                    ${r.finance?`
                    <td><span class="badge ${e.settleLabel===`완료`?`badge-success`:e.settleLabel===`일부완료`?`badge-warning`:`badge-default`}">${e.settleLabel}</span></td>
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
      `:l(c),e.innerHTML=f+`<div class="page-body">`+h+`</div>`,setTimeout(()=>{e.querySelector(`#btn-view-list`)?.addEventListener(`click`,()=>{i!==`list`&&(i=`list`,o())}),e.querySelector(`#btn-view-calendar`)?.addEventListener(`click`,()=>{i!==`calendar`&&(i=`calendar`,o())}),e.querySelector(`#btn-prev-month`)?.addEventListener(`click`,()=>{a.setMonth(a.getMonth()-1),o()}),e.querySelector(`#btn-next-month`)?.addEventListener(`click`,()=>{a.setMonth(a.getMonth()+1),o()}),e.querySelectorAll(`.calendar-project-block`).forEach(e=>{e.addEventListener(`click`,()=>{u.navigate(`/projects/${e.getAttribute(`data-id`)}`)})});let s=!1,c=e.querySelector(`#project-search`);c&&(c.addEventListener(`compositionstart`,()=>{s=!0}),c.addEventListener(`compositionend`,e=>{s=!1,t=e.target.value,o();let n=document.getElementById(`project-search`);n&&(n.focus(),n.setSelectionRange(n.value.length,n.value.length))}),c.addEventListener(`input`,e=>{if(s)return;t=e.target.value,o();let n=document.getElementById(`project-search`);if(n){n.focus();let e=n.value.length;n.setSelectionRange(e,e)}})),[`status`,`brand`,`platform`,`month`,`category`].forEach(t=>{e.querySelector(`#filter-${t}`)?.addEventListener(`change`,e=>{n[t]=e.target.value,o()})}),[`basic`,`host`,`result`,`finance`].forEach(t=>{e.querySelector(`#toggle-col-${t}`)?.addEventListener(`change`,e=>{r[t]=e.target.checked,o()})}),e.querySelector(`#filter-reset`)?.addEventListener(`click`,()=>{n={status:``,brand:``,platform:``,month:``,category:``,settleStatus:``},t=``,o()}),e.querySelector(`#btn-new-project`)?.addEventListener(`click`,()=>{at(()=>o())}),e.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation(),u.navigate(`/projects/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>{u.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0)}return o(),V.on(`projects:changed`,o),e}function at(e){let t=V.getAll(`brands`),n=`
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
          ${_.map(e=>`<option value="${e}">${e}</option>`).join(``)}
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
          ${p.map(e=>`<option value="${e}">${e}</option>`).join(``)}
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
  `,r=document.createElement(`div`);r.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let i=document.createElement(`button`);i.className=`btn btn-secondary`,i.textContent=`취소`,i.addEventListener(`click`,J);let a=document.createElement(`button`);a.className=`btn btn-primary`,a.textContent=`등록`,a.addEventListener(`click`,()=>{let n=document.getElementById(`proj-brandName`).value.trim(),r=document.getElementById(`proj-date`).value;if(!n){X(`방송 제목(브랜드)을 입력해주세요.`);return}if(!r){X(`방송일을 선택해주세요.`);return}let i=t.find(e=>e.name===n),a=i?i.id:`b_`+n,o={id:S(`live`),brandId:a,brandName:n,adName:``,category:document.getElementById(`proj-category`).value,broadcastMonth:r.substring(0,7),broadcastDate:r,broadcastTime:document.getElementById(`proj-time`).value,platform:document.getElementById(`proj-platform`).value,liveUrl:``,pd:document.getElementById(`proj-pd`).value.trim(),designer:document.getElementById(`proj-designer`).value.trim(),cuesheetLink:``,note:document.getElementById(`proj-note`).value.trim(),broadcastStatus:`new`,settleStatus:`wait`,createdAt:new Date().toISOString().split(`T`)[0]};V.create(`projects`,o),J(),Y(`프로젝트가 등록되었습니다.`),e&&e()}),r.appendChild(i),r.appendChild(a),q({title:`신규 프로젝트 등록`,size:`lg`,content:n,footer:r})}function ot(e){let t=document.createElement(`div`),n=`info`;function r(){let i=V.getById(`projects`,e.id);if(!i){t.innerHTML=`<div class="page-header"><div class="page-header-left"><h1 class="page-title">프로젝트를 찾을 수 없습니다</h1></div></div>
      <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>`,setTimeout(()=>{t.querySelector(`#btn-back`)?.addEventListener(`click`,()=>u.navigate(`/projects`))},0);return}let a=V.getById(`brands`,i.brandId),o=i.brandName||(a?a.name:`-`);V.query(`tasks`,e=>e.liveId===i.id).filter(e=>e.done).length;let s=0;i.broadcastStatus===`scheduled`?s=20:i.broadcastStatus===`host_cast`?s=40:i.broadcastStatus===`tech_request`?s=60:i.broadcastStatus===`design`?s=80:i.broadcastStatus===`cue_sheet`?s=90:i.broadcastStatus===`done`&&(s=100),t.innerHTML=`
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
                ${Me(i.broadcastStatus)}
              </div>
            </div>
          </div>
        </div>
        <div class="page-header-right">
          <div style="display: flex; align-items: center; gap: var(--space-2); margin-right: var(--space-4);">
            <span style="font-size: var(--text-sm); color: var(--text-tertiary);">진행률</span>
            <div class="progress-bar" style="width: 120px;">
              <div class="progress-bar-fill" style="width: ${s}%"></div>
            </div>
            <span style="font-size: var(--text-sm); font-weight: var(--weight-semibold);">${s}%</span>
          </div>
          <button class="btn btn-secondary" id="btn-delete-project">삭제</button>
        </div>
      </div>
      <div class="page-body">
        <!-- 탭 -->
        <div class="tabs" style="margin-bottom: var(--space-5);">
          <div class="tab ${n===`info`?`active`:``}" data-tab="info">기본정보</div>
                    <div class="tab ${n===`hosts`?`active`:``}" data-tab="hosts">쇼호스트</div>
          <div class="tab ${n===`design`?`active`:``}" data-tab="design">디자인</div>
          <div class="tab ${n===`result`?`active`:``}" data-tab="result">성과</div>
          <div class="tab ${n===`finance`?`active`:``}" data-tab="finance">정산</div>
        </div>

        <div id="tab-content"></div>
      </div>
    `;let c=t.querySelector(`#tab-content`);switch(n){case`info`:c.appendChild(st(i,a));break;case`hosts`:c.appendChild(lt(i));break;case`design`:c.appendChild(dt(i));break;case`result`:c.appendChild(mt(i));break;case`finance`:c.appendChild(ht(i));break}setTimeout(()=>{t.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>u.navigate(`/projects`)),t.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,()=>{n=e.getAttribute(`data-tab`),r()})}),t.querySelector(`#btn-delete-project`)?.addEventListener(`click`,()=>{Ie({title:`프로젝트 삭제`,message:`"${i.adName}" 프로젝트를 삭제하시겠습니까? 관련된 체크리스트, 쇼호스트 매칭, 성과, 정산 데이터도 모두 삭제됩니다.`,confirmText:`삭제`,danger:!0,onConfirm:()=>{V.query(`tasks`,e=>e.liveId===i.id).forEach(e=>V.delete(`tasks`,e.id)),V.query(`liveHosts`,e=>e.liveId===i.id).forEach(e=>V.delete(`liveHosts`,e.id)),V.query(`designs`,e=>e.liveId===i.id).forEach(e=>V.delete(`designs`,e.id)),V.delete(`results`,i.id),V.delete(`finances`,i.id),V.delete(`projects`,i.id),Y(`프로젝트가 삭제되었습니다.`),u.navigate(`/projects`)}})})},0)}return r(),t}function st(e,t){let n=document.createElement(`div`);return n.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>기본 정보</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-info">수정</button>
      </div>
      <div class="card-body">
        <div class="detail-grid">
          <div class="detail-field"><span class="detail-field-label">브랜드</span><span class="detail-field-value">${e.brandName||(t?t.name:`-`)}</span></div>
          <div class="detail-field"><span class="detail-field-label">진행월</span><span class="detail-field-value">${e.broadcastMonth||`-`}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송일</span><span class="detail-field-value">${G(e.broadcastDate)}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송시간</span><span class="detail-field-value">${e.broadcastTime||`-`}</span></div>
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
          ${d.map(t=>`
            <button class="btn ${e.broadcastStatus===t.key?`btn-primary`:`btn-secondary`} btn-sm status-change-btn" data-status="${t.key}" style="font-size: 11px; padding: var(--space-1); line-height: 1.2;">
              ${t.label}${rt(e.broadcastDate,t.key)}
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
            ${f.map(t=>`
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
  `,setTimeout(()=>{n.querySelector(`#btn-edit-info`)?.addEventListener(`click`,()=>{ct(e)}),n.querySelectorAll(`.status-change-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-status`);V.update(`projects`,e.id,{broadcastStatus:n}),Y(`방송 상태가 "${C(n)}"(으)로 변경되었습니다.`),u.navigate(`/projects/${e.id}`)})}),n.querySelectorAll(`.settle-status-change-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-status`);V.update(`projects`,e.id,{settleStatus:n}),Y(`정산 상태가 "${w(n)}"(으)로 변경되었습니다.`),u.navigate(`/projects/${e.id}`)})}),n.querySelector(`.tax-invoice-btn`)?.addEventListener(`click`,()=>{if(!t){X(`등록된 브랜드 정보가 없어 세금계산서 상태를 변경할 수 없습니다.`);return}let n=!t.taxInvoice;V.update(`brands`,t.id,{taxInvoice:n}),Y(`세금계산서 상태가 "${n?`발행완료`:`미발행`}"(으)로 변경되었습니다.`),u.navigate(`/projects/${e.id}`)})},0),n}function ct(e){let t=V.getAll(`brands`),n=`
    <div class="form-grid">
      <div class="input-group">
        <label>방송 제목(브랜드)</label>
        <input type="text" class="input" id="edit-brandName" list="brand-list" value="${e.brandName||t.find(t=>t.id===e.brandId)?.name||``}">
        <datalist id="brand-list">${t.map(e=>`<option value="${e.name}">`).join(``)}</datalist>
      </div>
      <div class="input-group">
        <label>카테고리</label>
        <select class="input" id="edit-category">${_.map(t=>`<option value="${t}" ${e.category===t?`selected`:``}>${t}</option>`).join(``)}</select>
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
        <select class="input" id="edit-platform"><option value="">선택</option>${p.map(t=>`<option value="${t}" ${e.platform===t?`selected`:``}>${t}</option>`).join(``)}</select>
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
  `,r=document.createElement(`div`);r.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let i=document.createElement(`button`);i.className=`btn btn-secondary`,i.textContent=`취소`,i.addEventListener(`click`,J);let a=document.createElement(`button`);a.className=`btn btn-primary`,a.textContent=`저장`,a.addEventListener(`click`,()=>{let n=document.getElementById(`edit-date`).value,r=document.getElementById(`edit-brandName`).value.trim(),i=t.find(e=>e.name===r),a=i?i.id:`b_`+r;V.update(`projects`,e.id,{brandId:a,brandName:r,category:document.getElementById(`edit-category`).value,broadcastDate:n,broadcastMonth:n?n.substring(0,7):``,broadcastTime:document.getElementById(`edit-time`).value,platform:document.getElementById(`edit-platform`).value,liveUrl:document.getElementById(`edit-url`).value.trim(),pd:document.getElementById(`edit-pd`).value.trim(),designer:document.getElementById(`edit-designer`).value.trim(),cuesheetLink:document.getElementById(`edit-cuesheet`).value.trim(),note:document.getElementById(`edit-note`).value.trim()}),J(),Y(`기본 정보가 수정되었습니다.`),u.navigate(`/projects/${e.id}`)}),r.appendChild(i),r.appendChild(a),q({title:`기본 정보 수정`,size:`lg`,content:n,footer:r})}function lt(e){let t=document.createElement(`div`),n=V.query(`liveHosts`,t=>t.liveId===e.id);return V.getAll(`hosts`),t.innerHTML=`
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
            ${n.length>0?n.map(e=>{let t=V.getById(`hosts`,e.hostId);return`
                <tr>
                  <td>${t?t.name:`-`}</td>
                  <td>${v.find(t=>t.key===e.role)?.label||`-`}</td>
                  <td class="text-right">${e.brandPays?`<span class="badge" style="background: var(--bg-secondary); color: var(--text-tertiary); margin-right: 4px;">브랜드 부담</span><span style="text-decoration: line-through; color: var(--text-tertiary);">${H(e.fee)}</span>`:H(e.fee)}</td>
                  <td>${Ne(e.settleStatus)}</td>
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
  `,setTimeout(()=>{t.querySelector(`#btn-add-host-match`)?.addEventListener(`click`,()=>{ut(e.id,null,()=>{let n=lt(e);t.replaceWith(n)})}),t.querySelectorAll(`.btn-edit-match`).forEach(n=>{n.addEventListener(`click`,()=>{ut(e.id,n.getAttribute(`data-id`),()=>{let n=lt(e);t.replaceWith(n)})})})},0),t}function ut(e,t,n){let r=!!t,i=r?V.getById(`liveHosts`,t):{},a=V.getAll(`hosts`),o=`
    <div class="form-grid">
      <div class="input-group" style="position: relative;">
        <label class="required">쇼호스트</label>
        <input type="hidden" id="match-host" value="${i.hostId||``}">
        <input type="text" class="input" id="match-host-search" placeholder="쇼호스트 이름 검색 및 선택..." autocomplete="off" value="${i.hostId&&a.find(e=>e.id===i.hostId)?.name||``}">
        <div id="match-host-dropdown" style="display:none; position:absolute; top:calc(100% + 4px); left:0; right:0; max-height:200px; overflow-y:auto; background:var(--bg-primary); border:1px solid var(--border-default); border-radius:var(--radius-md); box-shadow:var(--shadow-md); z-index:1000;">
        </div>
      </div>
      <div class="input-group">
        <label>역할</label>
        <select class="input" id="match-role">
          ${v.map(e=>`<option value="${e.key}" ${i.role===e.key?`selected`:``}>${e.label}</option>`).join(``)}
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
      <div class="input-group full-width" style="margin-top: 4px;">
        <label style="display: flex; align-items: center; gap: 8px; font-weight: 500; cursor: pointer; color: var(--text-primary);">
          <input type="checkbox" id="match-brand-pays" ${i.brandPays?`checked`:``} style="width: 16px; height: 16px; accent-color: var(--primary-color);">
          브랜드 자체 부담 (자사 집행비용에서 제외)
        </label>
      </div>
    </div>
  `,s=document.createElement(`div`);if(s.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,r){let e=document.createElement(`button`);e.className=`btn btn-danger`,e.textContent=`삭제`,e.style.marginRight=`auto`,e.addEventListener(`click`,()=>{V.delete(`liveHosts`,t),J(),Y(`삭제되었습니다.`),n&&n()}),s.appendChild(e)}let c=document.createElement(`button`);c.className=`btn btn-secondary`,c.textContent=`취소`,c.addEventListener(`click`,J);let l=document.createElement(`button`);l.className=`btn btn-primary`,l.textContent=r?`수정`:`추가`,l.addEventListener(`click`,()=>{let i=document.getElementById(`match-host`).value;if(!i){X(`쇼호스트를 선택해주세요.`);return}let a={liveId:e,hostId:i,role:document.getElementById(`match-role`).value,fee:parseInt(document.getElementById(`match-fee`).value)||0,settleStatus:document.getElementById(`match-settle`).value,memo:document.getElementById(`match-memo`).value.trim(),brandPays:document.getElementById(`match-brand-pays`).checked};r?(V.update(`liveHosts`,t,a),Y(`수정되었습니다.`)):(a.id=S(`lh`),V.create(`liveHosts`,a),Y(`쇼호스트가 매칭되었습니다.`)),J(),n&&n()}),s.appendChild(c),s.appendChild(l),q({title:r?`쇼호스트 매칭 수정`:`쇼호스트 추가`,size:`md`,content:o,footer:s}),setTimeout(()=>{let e=document.getElementById(`match-host-search`),t=document.getElementById(`match-host`),n=document.getElementById(`match-host-dropdown`),r=r=>{let i=a.filter(e=>e.name.toLowerCase().includes(r));if(i.length===0){n.innerHTML=`<div style="padding: 8px 12px; color: var(--text-tertiary); font-size: var(--text-sm);">검색 결과가 없습니다.</div>`;return}n.innerHTML=i.map(e=>`<div class="dropdown-item" data-id="${e.id}" data-name="${e.name}" style="padding: 8px 12px; cursor: pointer; font-size: var(--text-sm); border-bottom: 1px solid var(--border-light); transition: background var(--transition-fast);">
          ${e.name}
        </div>`).join(``),n.querySelectorAll(`.dropdown-item`).forEach(r=>{r.addEventListener(`click`,()=>{e.value=r.getAttribute(`data-name`),t.value=r.getAttribute(`data-id`),n.style.display=`none`}),r.addEventListener(`mouseenter`,()=>r.style.background=`var(--bg-hover)`),r.addEventListener(`mouseleave`,()=>r.style.background=`transparent`)})};e&&n&&(e.addEventListener(`focus`,()=>{n.style.display=`block`,r(e.value.toLowerCase())}),e.addEventListener(`input`,e=>{n.style.display=`block`,t.value=``,r(e.target.value.toLowerCase())}),document.addEventListener(`click`,r=>{!e.contains(r.target)&&!n.contains(r.target)&&(n.style.display=`none`,t.value||(e.value=``))}))},0)}function dt(e){let t=document.createElement(`div`),n=V.query(`designs`,t=>t.liveId===e.id),{renderDesignBadge:r}=ft();return t.innerHTML=`
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
                <td>${G(e.requestDate)}</td>
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
  `,setTimeout(()=>{t.querySelector(`#btn-add-design`)?.addEventListener(`click`,()=>{pt(e.id,null,()=>{let n=dt(e);t.replaceWith(n)})}),t.querySelectorAll(`.btn-edit-design`).forEach(n=>{n.addEventListener(`click`,()=>{pt(e.id,n.getAttribute(`data-id`),()=>{let n=dt(e);t.replaceWith(n)})})})},0),t}function ft(){return{renderDesignBadge:e=>`<span class="badge ${{requested:`badge-default`,working:`badge-warning`,reviewing:`badge-warning`,done:`badge-success`}[e]||`badge-default`}">${{requested:`요청`,working:`작업중`,reviewing:`검수중`,done:`완료`}[e]||e}</span>`}}function pt(e,t,n){let r=!!t,i=r?V.getById(`designs`,t):{},a=`
    <div class="form-grid">
      <div class="input-group"><label>요청일</label><input class="input" type="date" id="design-date" value="${i.requestDate||new Date().toISOString().split(`T`)[0]}"></div>
      <div class="input-group"><label>담당 디자이너</label><input class="input" id="design-designer" value="${i.designer||``}" placeholder="디자이너"></div>
      <div class="input-group"><label>상태</label><select class="input" id="design-status">${y.map(e=>`<option value="${e.key}" ${i.status===e.key?`selected`:``}>${e.label}</option>`).join(``)}</select></div>
      <div class="input-group"><label>작업 링크</label><input class="input" id="design-work" value="${i.workLink||``}"></div>
      <div class="input-group"><label>파일 링크</label><input class="input" id="design-file" value="${i.fileLink||``}"></div>
      <div class="input-group"><label>메모</label><input class="input" id="design-memo" value="${i.memo||``}"></div>
    </div>
  `,o=document.createElement(`div`);if(o.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,r){let e=document.createElement(`button`);e.className=`btn btn-danger`,e.textContent=`삭제`,e.style.marginRight=`auto`,e.addEventListener(`click`,()=>{V.delete(`designs`,t),J(),Y(`삭제되었습니다.`),n&&n()}),o.appendChild(e)}let s=document.createElement(`button`);s.className=`btn btn-secondary`,s.textContent=`취소`,s.addEventListener(`click`,J);let c=document.createElement(`button`);c.className=`btn btn-primary`,c.textContent=r?`수정`:`등록`,c.addEventListener(`click`,()=>{let i={liveId:e,requestDate:document.getElementById(`design-date`).value,designer:document.getElementById(`design-designer`).value.trim(),status:document.getElementById(`design-status`).value,workLink:document.getElementById(`design-work`).value.trim(),fileLink:document.getElementById(`design-file`).value.trim(),memo:document.getElementById(`design-memo`).value.trim()};r?(V.update(`designs`,t,i),Y(`수정되었습니다.`)):(i.id=S(`design`),V.create(`designs`,i),Y(`디자인 요청이 등록되었습니다.`)),J(),n&&n()}),o.appendChild(s),o.appendChild(c),q({title:r?`디자인 요청 수정`:`디자인 요청 추가`,size:`md`,content:a,footer:o})}function mt(e){let t=document.createElement(`div`),n=V.getAll(`results`).find(t=>t.liveId===e.id)||{};return t.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>방송 성과</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-result">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-label">시청뷰</div><div class="stat-value">${W(n.views)}</div></div>
          <div class="stat-card"><div class="stat-label">좋아요</div><div class="stat-value">${W(n.likes)}</div></div>
          <div class="stat-card"><div class="stat-label">주문건수</div><div class="stat-value">${W(n.orders)}건</div></div>
          <div class="stat-card"><div class="stat-label">라이브 매출</div><div class="stat-value">${H(n.liveRevenue)}</div></div>
          <div class="stat-card"><div class="stat-label">ROI</div><div class="stat-value">${K(n.roi)}</div></div>
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
      `,i=document.createElement(`div`);i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,J);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=`저장`,o.addEventListener(`click`,()=>{let n=parseInt(document.getElementById(`res-revenue`).value)||0,r=V.getAll(`finances`).find(t=>t.liveId===e.id),i=r?r.adCost+r.productionCost+r.hostCost+r.otherCost:0,a=i>0?Math.round(n/i*100)/100:0,o={liveId:e.id,views:parseInt(document.getElementById(`res-views`).value)||0,likes:parseInt(document.getElementById(`res-likes`).value)||0,orders:parseInt(document.getElementById(`res-orders`).value)||0,liveRevenue:n,roi:a},s=V.getAll(`results`).find(t=>t.liveId===e.id);s?V.update(`results`,s.id,o):(o.id=e.id,V.create(`results`,o)),J(),Y(`성과가 저장되었습니다.`);let c=mt(e);t.replaceWith(c)}),i.appendChild(a),i.appendChild(o),q({title:`방송 성과 수정`,size:`md`,content:r,footer:i})})},0),t}function ht(e){let t=document.createElement(`div`),n=V.getAll(`finances`).find(t=>t.liveId===e.id)||{},r=V.query(`liveHosts`,t=>t.liveId===e.id).reduce((e,t)=>e+(t.fee||0),0);return t.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>매출 및 정산</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-finance">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid" style="margin-bottom: var(--space-6);">
          <div class="stat-card"><div class="stat-label">제작비</div><div class="stat-value">${H(n.productionCost)}</div></div>
          <div class="stat-card"><div class="stat-label">쇼호스트비</div><div class="stat-value">${H(r)}</div></div>
          <div class="stat-card"><div class="stat-label">광고비</div><div class="stat-value">${H(n.adCost)}</div></div>
          <div class="stat-card"><div class="stat-label">기타비용</div><div class="stat-value">${H(n.otherCost)}</div></div>
        </div>
        <div style="border-top: 1px solid var(--border-light); padding-top: var(--space-5);">
          <div class="stats-grid">
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업매출액</div>
              <div class="stat-value">${H(n.salesRevenue)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업이익</div>
              <div class="stat-value" style="color: ${(n.operatingProfit||0)>=0?`var(--status-success)`:`var(--status-error)`};">${H(n.operatingProfit)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">순마진</div>
              <div class="stat-value" style="color: ${(n.netMargin||0)>=0?`var(--status-success)`:`var(--status-error)`};">${H(n.netMargin)}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">마진율</div>
              <div class="stat-value" style="color: ${(n.netMargin||0)>=0?`var(--status-success)`:`var(--status-error)`};">${n.productionCost?((n.netMargin||0)/n.productionCost*100).toFixed(1):0}%</div>
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
          쇼호스트비는 쇼호스트 매칭 탭에서 설정한 금액의 합계로 자동 계산됩니다. (현재: ${H(r)})
        </div>
      `,a=document.createElement(`div`);a.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let o=document.createElement(`button`);o.className=`btn btn-secondary`,o.textContent=`취소`,o.addEventListener(`click`,J);let s=document.createElement(`button`);s.className=`btn btn-primary`,s.textContent=`저장`,s.addEventListener(`click`,()=>{let n=parseInt(document.getElementById(`fin-ad`).value)||0,i=parseInt(document.getElementById(`fin-prod`).value)||0,a=parseInt(document.getElementById(`fin-other`).value)||0,o=parseInt(document.getElementById(`fin-sales`).value)||0,s=o-n-r-a,c=Math.round(o*.1),l=s,u={liveId:e.id,adCost:n,productionCost:i,hostCost:r,otherCost:a,salesRevenue:o,operatingProfit:s,vat:c,netMargin:l},d=V.getAll(`finances`).find(t=>t.liveId===e.id);d?V.update(`finances`,d.id,u):(u.id=e.id,V.create(`finances`,u)),J(),Y(`정산 정보가 저장되었습니다.`);let f=ht(e);t.replaceWith(f)}),a.appendChild(o),a.appendChild(s),q({title:`정산 정보 수정`,size:`md`,content:i,footer:a})})},0),t}function gt(){let e=document.createElement(`div`),t=``;function n(){let r=V.getAll(`projects`),i=V.getAll(`finances`),a=V.getAll(`results`),o=[...new Set(r.map(e=>{let t=e.broadcastMonth;if(e.broadcastDate){let n=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(n.getTime())||(t=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`)}return t&&!t.includes(`-`)&&t.length<=2&&(t=`2026-${String(t).padStart(2,`0`)}`),t}).filter(Boolean))].sort().reverse(),s=r,c=i,l=a;if(t){s=r.filter(e=>{let n=e.broadcastMonth;if(e.broadcastDate){let t=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(t.getTime())||(n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`)}return n&&!n.includes(`-`)&&n.length<=2&&(n=`2026-${String(n).padStart(2,`0`)}`),n===t});let e=s.map(e=>e.id);c=i.filter(t=>e.includes(t.liveId)),l=a.filter(t=>e.includes(t.liveId))}let u={};s.forEach(e=>{let t=e.broadcastMonth;if(e.broadcastDate){let n=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(n.getTime())||(t=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`)}if(!t)return;!t.includes(`-`)&&t.length<=2&&(t=`2026-${String(t).padStart(2,`0`)}`),u[t]||(u[t]={month:t,revenue:0,profit:0,margin:0,count:0}),u[t].count++;let n=c.find(t=>t.liveId===e.id);n&&(u[t].revenue+=parseInt(n.salesRevenue)||0,u[t].profit+=parseInt(n.operatingProfit)||0,u[t].margin+=parseInt(n.netMargin)||0)});let d=Object.values(u).sort((e,t)=>t.month.localeCompare(e.month)),f=c.reduce((e,t)=>e+(parseInt(t.salesRevenue)||0),0),p=c.reduce((e,t)=>e+(parseInt(t.operatingProfit)||0),0),m=c.reduce((e,t)=>e+(parseInt(t.netMargin)||0),0),h=c.reduce((e,t)=>e+(parseInt(t.adCost)||0),0),g=c.reduce((e,t)=>e+(parseInt(t.productionCost)||0),0),_=c.reduce((e,t)=>e+(parseInt(t.hostCost)||0),0),v={};s.forEach(e=>{let t=V.getById(`brands`,e.brandId);if(!t)return;v[t.id]||(v[t.id]={name:t.name,revenue:0,count:0}),v[t.id].count++;let n=l.find(t=>t.liveId===e.id);n&&(v[t.id].revenue+=parseInt(n.liveRevenue)||0)});let y=Object.values(v).sort((e,t)=>t.revenue-e.revenue),b={};V.getAll(`liveHosts`).forEach(e=>{if(t&&!s.some(t=>t.id===e.liveId))return;let n=V.getById(`hosts`,e.hostId);if(!n)return;b[n.id]||(b[n.id]={name:n.name,revenue:0,count:0,fee:0}),b[n.id].count++,b[n.id].fee+=parseInt(e.fee)||0;let r=l.find(t=>t.liveId===e.liveId);r&&(b[n.id].revenue+=parseInt(r.liveRevenue)||0)});let x=Object.values(b).sort((e,t)=>t.revenue-e.revenue),S=s.filter(e=>e.status===`settle_wait`).length,C=s.filter(e=>e.status===`settle_done`).length;e.innerHTML=`
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">매출/손익</h1>
            <p class="page-description">전체 매출 및 손익 현황</p>
          </div>
        </div>
        <div class="page-header-right">
          <select class="filter-select" id="finance-month-filter" style="padding: 8px 16px; border-radius: 6px; border: 1px solid var(--border-color);">
            <option value="">전체 월</option>
            ${o.map(e=>`<option value="${e}" ${t===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
        </div>
      </div>
      <div class="page-body">
        <!-- 핵심 KPI -->
        <div class="stats-grid" style="margin-bottom: var(--space-6);">
          <div class="stat-card"><div class="stat-label">총 영업매출</div><div class="stat-value">${U(f)}</div></div>
          <div class="stat-card"><div class="stat-label">총 영업이익</div><div class="stat-value" style="color: ${p>=0?`var(--status-success)`:`var(--status-error)`};">${U(p)}</div></div>
          <div class="stat-card"><div class="stat-label">총 순마진</div><div class="stat-value" style="color: ${m>=0?`var(--status-success)`:`var(--status-error)`};">${U(m)}</div></div>
          <div class="stat-card"><div class="stat-label">총 광고비</div><div class="stat-value">${U(h)}</div></div>
          <div class="stat-card"><div class="stat-label">총 제작비</div><div class="stat-value">${U(g)}</div></div>
          <div class="stat-card"><div class="stat-label">총 쇼호스트비</div><div class="stat-value">${U(_)}</div></div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-6);">
          <!-- 월별 손익 -->
          <div class="card">
            <div class="card-header"><h3>월별 손익</h3></div>
            <div class="table-scroll">
              <table class="data-table">
                <thead><tr><th>월</th><th class="text-right">방송수</th><th class="text-right">영업매출</th><th class="text-right">영업이익</th><th class="text-right">순마진</th></tr></thead>
                <tbody>
                  ${d.length>0?d.map(e=>`
                    <tr>
                      <td style="font-weight: var(--weight-medium);">${e.month}</td>
                      <td class="text-right">${e.count}건</td>
                      <td class="text-right">${U(e.revenue)}</td>
                      <td class="text-right" style="color: ${e.profit>=0?`var(--status-success)`:`var(--status-error)`};">${U(e.profit)}</td>
                      <td class="text-right" style="color: ${e.margin>=0?`var(--status-success)`:`var(--status-error)`};">${U(e.margin)}</td>
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
                  <div class="stat-card"><div class="stat-label">정산 대기</div><div class="stat-value">${S}건</div></div>
                  <div class="stat-card"><div class="stat-label">정산 완료</div><div class="stat-value">${C}건</div></div>
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
                    ${y.map((e,t)=>`
                      <tr><td><span style="color: var(--text-tertiary); margin-right: var(--space-2);">${t+1}</span> ${e.name}</td><td class="text-right">${e.count}회</td><td class="text-right">${U(e.revenue)}</td></tr>
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
                ${x.map((e,t)=>`
                  <tr><td><span style="color: var(--text-tertiary); margin-right: var(--space-2);">${t+1}</span> ${e.name}</td><td class="text-right">${e.count}회</td><td class="text-right">${U(e.revenue)}</td><td class="text-right">${H(e.fee)}</td></tr>
                `).join(``)||`<tr><td colspan="4" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">데이터 없음</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;let w=e.querySelector(`#finance-month-filter`);w&&w.addEventListener(`change`,e=>{t=e.target.value,n()})}return n(),e}function _t(){let e=document.createElement(`div`);function t(){let t=V.getAll(`projects`),n=V.getAll(`finances`),r=V.getAll(`liveHosts`);V.getAll(`brands`),V.getAll(`hosts`);let i={};t.filter(e=>e.settleStatus!==`done`).forEach(e=>{let t=e.brandName||V.getById(`brands`,e.brandId)?.name||`알 수 없음`,r=e.brandId||t;i[r]||(i[r]={brandName:t,count:0,amount:0,projects:[]});let a=n.find(t=>t.liveId===e.id),o=a&&a.salesRevenue||0,s=o+Math.round(o*.1);i[r].count++,i[r].amount+=s,i[r].projects.push({...e,revenue:s})});let a=Object.values(i).sort((e,t)=>t.amount-e.amount),o={};r.filter(e=>e.settleStatus!==`done`).forEach(e=>{let t=V.getById(`hosts`,e.hostId);t&&(o[t.id]||(o[t.id]={hostName:t.name,hostId:t.id,count:0,amount:0,matchings:[]}),o[t.id].count++,o[t.id].amount+=e.fee||0,o[t.id].matchings.push(e))});let s=Object.values(o).sort((e,t)=>t.amount-e.amount),c=a.reduce((e,t)=>e+t.amount,0),l=s.reduce((e,t)=>e+t.amount,0);e.innerHTML=`
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
          <div class="stat-value" style="color: var(--status-error);">${H(c)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">총 쇼호스트 지급대기</div>
          <div class="stat-value" style="color: var(--status-warning);">${H(l)}</div>
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
                    <td class="text-right" style="color: var(--status-error); font-weight: bold;">${H(e.amount)}</td>
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
                    <td class="text-right" style="color: var(--status-warning); font-weight: bold;">${H(e.amount)}</td>
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
  `,e.querySelectorAll(`.btn-brand-settle`).forEach(e=>{e.addEventListener(`click`,e=>{let n=e.target.dataset.brandid,r=e.target.dataset.brandname;confirm(`'${r}'의 미수금 ${e.target.closest(`tr`).querySelector(`td:nth-child(3)`).innerText}을 모두 정산 완료 처리하시겠습니까?`)&&(t.filter(e=>e.settleStatus!==`done`&&(e.brandId===n||e.brandName===r)).forEach(e=>{V.update(`projects`,e.id,{settleStatus:`done`})}),Y(`${r} 정산 처리 완료`))})}),e.querySelectorAll(`.btn-host-settle`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.hostid,n=e.target.closest(`tr`).querySelector(`td:nth-child(1)`).innerText;confirm(`'${n}' 쇼호스트의 정산 대기금액 ${e.target.closest(`tr`).querySelector(`td:nth-child(3)`).innerText}을 모두 지급 완료 처리하시겠습니까?`)&&(r.filter(e=>e.settleStatus!==`done`&&e.hostId===t).forEach(e=>{V.update(`liveHosts`,e.id,{settleStatus:`done`})}),Y(`${n} 지급 처리 완료`))})})}return t(),V.on(`projects:changed`,t),V.on(`liveHosts:changed`,t),e}function vt(e,t){let n=document.createElement(`div`),r=G(new Date().toISOString(),`YYYY-MM-DD`),i=`EST-${new Date().toISOString().replace(/[-:T]/g,``).slice(2,14)}`,a=[{name:`방송 기획 및 송출비`,desc:`1회 방송 기획/운영/송출`,unitPrice:3e6,qty:1,unit:`회`}];t&&t.length>0&&t.forEach(e=>{let t=V.getById(`hosts`,e.hostId),n=t?t.name:`쇼호스트`,r=e.role===`main`?`메인 쇼호스트`:`게스트`;a.push({name:`출연료 (${n})`,desc:`${r} 출연료`,unitPrice:e.fee||5e5,qty:1,unit:`명`})});let o=0;function s(){let e=0;a.forEach(t=>{e+=t.unitPrice*t.qty});let t=e-o,n=Math.floor(t*.1),r=t+n;return{supply:e,totalSupply:t,vat:n,finalAmount:r}}function c(){let t=s();n.innerHTML=`
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
    `,l=document.createElement(`div`);l.innerHTML=c;let u={margin:0,filename:`견적서_${i}_${s}.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}};html2pdf().set(u).from(l).save().then(()=>{J()})}c(),q({title:`브랜드 견적서`,size:`lg`,content:n,footer:!1})}function yt(e,t){let n=document.createElement(`div`),r=[];t&&t.length>0&&t.forEach(e=>{let t=V.getById(`hosts`,e.hostId);t&&r.push({...t,role:e.role,fee:e.fee||0})});function i(){if(r.length===0){n.innerHTML=`<div style="padding: 2rem; text-align: center; color: var(--text-tertiary);">이 프로젝트에 배정된 쇼호스트가 없습니다.</div>`,q({title:`쇼호스트 계약서 발급`,size:`md`,content:n});return}n.innerHTML=`
      <div style="width: 600px; max-width: 100%;">
        <div style="margin-bottom: var(--space-4);">
          <h3 style="font-size: 16px;">${e.title}</h3>
          <p style="color: var(--text-tertiary); font-size: 13px;">방송일: ${G(e.broadcastDate)}</p>
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
    `,o=document.createElement(`div`);o.innerHTML=a;let s={margin:10,filename:`출연계약서_${e.name}_${t.title}.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}};html2pdf().set(s).from(o).save()}i(),q({title:`쇼호스트 출연 계약서 발급`,size:`md`,content:n,footer:!1})}function bt(){let e=document.createElement(`div`);function t(){let t=V.getAll(`projects`)||[];t.sort((e,t)=>(t.broadcastDate||``).localeCompare(e.broadcastDate||``)),e.innerHTML=`
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
                    <td style="font-size: 13px;">${G(e.broadcastDate)}</td>
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
    `,e.querySelectorAll(`.btn-brand-estimate`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.id,n=V.getById(`projects`,t);n&&vt(n,V.query(`liveHosts`,e=>e.liveId===n.id)||[])})}),e.querySelectorAll(`.btn-host-contract`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.id,n=V.getById(`projects`,t);n&&yt(n,V.query(`liveHosts`,e=>e.liveId===n.id)||[])})})}return t(),e}function xt(){let e=JSON.parse(localStorage.getItem(`ryzin_live_data`)||`{}`);return{linkId:e.settings?.popbillLinkId||null,secretKey:e.settings?.popbillSecretKey||null,senderNumber:e.settings?.popbillSenderNumber||`010-0000-0000`}}async function St(){return xt(),new Promise(e=>{setTimeout(()=>{e([{templateCode:`TPL_001`,templateName:`방송 안내`,content:`안녕하세요 #{고객명}님,
다가오는 #{방송일}에 #{방송명} 방송이 진행될 예정입니다.
많은 시청 부탁드립니다!`},{templateCode:`TPL_002`,templateName:`정산 완료 안내`,content:`#{이름}님, #{프로젝트명}에 대한 정산이 완료되었습니다.
입금은행: #{입금은행}

감사합니다.`}])},300)})}async function Ct(e){let t=xt();try{let n=await fetch(`http://localhost:3001/api/popbill/send`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({linkId:t.linkId,secretKey:t.secretKey,senderNumber:t.senderNumber,payload:e})});if(!n.ok){let e=await n.json().catch(()=>({}));throw Error(e.message||`메시지 전송 실패`)}let r=await n.json();if(!r.success)throw Error(r.message||`메시지 전송 실패`);return console.log(`팝빌 전송 결과:`,r),{success:!0,receiptNum:r.receiptNum,message:`발송 완료`}}catch(e){throw console.error(`팝빌 연동 오류:`,e),Error(`팝빌 메시지 전송에 실패했습니다: `+e.message)}}function wt(){let e=document.createElement(`div`),t=[],n=null,r=[],i={},a=[];function o(){let o=V.getAll(`hosts`)||[],s=V.getAll(`projects`)||[],c=new Set(s.map(e=>e.brand).filter(e=>!!e)),l=Array.from(c).map(e=>({id:`brand_`+e,name:e}));e.innerHTML=`
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
        `).join(``),m.querySelectorAll(`.var-input`).forEach(e=>{e.addEventListener(`input`,e=>{i[e.target.dataset.var]=e.target.value,v()})})):(p.style.display=`none`,m.innerHTML=``),v()};u.addEventListener(`change`,r=>{r.target.value===`alimtalk`?(d.style.display=`block`,h.readOnly=!0,h.style.background=`var(--bg-tertiary)`,g.textContent=`메시지 내용 (미리보기)`,!n&&t.length>0?(f.value=t[0].templateCode,n=t[0],y()):n?y():(p.style.display=`none`,h.value=``)):(d.style.display=`none`,p.style.display=`none`,h.readOnly=!1,h.style.background=`var(--bg-card)`,g.textContent=`메시지 내용`,h.value=``,e.querySelector(`#msg-length`).textContent=`0`)}),f.addEventListener(`change`,e=>{let r=e.target.value;n=t.find(e=>e.templateCode===r),y()}),h.addEventListener(`input`,t=>{e.querySelector(`#msg-length`).textContent=t.target.value.length}),St().then(e=>{t=e,t.length>0&&(f.innerHTML=`<option value="">템플릿을 선택하세요</option>`+t.map(e=>`<option value="${e.templateCode}">${e.templateName}</option>`).join(``))}),e.querySelector(`#btn-add-group`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#receiver-group`).value;t===`all_hosts`?(o.forEach(e=>{a.find(t=>t.phone===e.phone)||a.push({name:e.name,phone:e.phone||`010-0000-0000`})}),Y(`쇼호스트 ${o.length}명을 추가했습니다.`)):t===`all_brands`&&(l.forEach(e=>{a.find(t=>t.name===e.name)||a.push({name:e.name,phone:`010-0000-0000`})}),Y(`브랜드 ${l.length}개를 추가했습니다.`)),_()}),e.querySelector(`#btn-add-manual`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#manual-name`),n=e.querySelector(`#manual-phone`),r=t.value.trim(),i=n.value.trim();if(!r||!i){X(`이름과 연락처를 모두 입력해주세요.`);return}if(a.find(e=>e.phone===i)){X(`이미 추가된 연락처입니다.`);return}a.push({name:r,phone:i}),t.value=``,n.value=``,_()}),e.querySelector(`#btn-send-message`)?.addEventListener(`click`,async()=>{let t=u.value;if(t===`alimtalk`){if(!n){X(`알림톡 템플릿을 선택해주세요.`);return}let e=r.filter(e=>!i[e]);if(e.length>0){X(`변수 값을 입력해주세요: ${e.join(`, `)}`);return}}else if(!h.value.trim()){X(`메시지 내용을 입력해주세요.`);return}if(a.length===0){X(`수신자를 최소 1명 이상 추가해주세요.`);return}let o=e.querySelector(`#btn-send-message`);o.textContent=`발송 중...`,o.disabled=!0;try{let e={msgType:t,receivers:[]};t===`alimtalk`?(e.templateCode=n.templateCode,e.receivers=a.map(e=>{let t=n.content;return t=t.replace(/#\{이름\}/g,e.name).replace(/#\{고객명\}/g,e.name),r.forEach(e=>{let n=RegExp(`#\\{${e}\\}`,`g`);t=t.replace(n,i[e])}),{name:e.name,number:e.phone,content:t}})):(e.content=h.value.trim(),e.receivers=a.map(e=>({name:e.name,number:e.phone})));let o=await Ct(e);o.success&&(Y(o.message),a=[],_())}catch(e){X(e.message)}finally{o.textContent=`메시지 발송하기`,o.disabled=!1}}),u.dispatchEvent(new Event(`change`))}return o(),e}function Tt(){let e=document.createElement(`div`);function t(){let t=V.getAll(`crmClients`)||[],a=V.getAll(`crmActivities`)||[],o=V.getAll(`projects`)||[],s=new Date,c=t.filter(e=>e.lastContactDate?(s-new Date(e.lastContactDate))/(1e3*60*60*24)>=7&&e.status!==`contract`&&e.status!==`hold`:!1),l=t.filter(e=>{if(e.status!==`quote`)return!1;let t=a.filter(t=>t.clientId===e.id&&t.content.includes(`견적`)).sort((e,t)=>new Date(t.date)-new Date(e.date)),n=t.length>0?t[0].date:e.lastContactDate;return n?(s-new Date(n))/(1e3*60*60*24)>=3:!1}),u=[],d=o.filter(e=>e.settleStatus===`done`||e.broadcastStatus===`done`),f={};d.forEach(e=>{let t=e.brandName||V.getById(`brands`,e.brandId)?.name||`알 수 없음`;f[t]||(f[t]=[]),f[t].push(e)});for(let[e,t]of Object.entries(f)){t.sort((e,t)=>new Date(t.broadcastDate||t.createdAt)-new Date(e.broadcastDate||e.createdAt));let n=t[0],r=n.broadcastDate||n.createdAt;if(r){let t=(s-new Date(r))/(1e3*60*60*24);t>=30&&u.push({brandName:e,lastBroadcastDate:r,diffDays:Math.floor(t)})}}e.innerHTML=`
      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">영업 CRM</h1>
          <p class="page-description">고객 관리 및 자동 팔로업 알림</p>
        </div>
        <div class="page-header-right" style="display: flex; gap: var(--space-2);">
          <button class="btn btn-secondary" id="btn-csv-upload">CSV 대량등록</button>
          <button class="btn btn-primary" id="btn-add-client">고객 등록</button>
          <input type="file" id="csv-file-input" accept=".csv" style="display: none;">
        </div>
      </div>

      <div class="page-body">
        <!-- 자동 알림 대시보드 -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-6);">
          
          <div class="card">
            <div style="padding: var(--space-4);">
              <h3 style="font-size: var(--text-base); margin-bottom: 8px; color: var(--status-error);">마지막 연락 7일 경과</h3>
              <p style="font-size: var(--text-2xl); font-weight: bold; margin-bottom: 8px;">${c.length}건</p>
              <div style="font-size: var(--text-sm); color: var(--text-tertiary); max-height: 80px; overflow-y: auto;">
                ${c.length>0?c.map(e=>`<div style="margin-bottom: 4px; cursor:pointer;" class="alert-link" data-id="${e.id}">• ${e.companyName} (${e.contactName})</div>`).join(``):`알림 대상 없음`}
              </div>
            </div>
          </div>

          <div class="card">
            <div style="padding: var(--space-4);">
              <h3 style="font-size: var(--text-base); margin-bottom: 8px; color: var(--status-warning);">견적 발송 3일 경과</h3>
              <p style="font-size: var(--text-2xl); font-weight: bold; margin-bottom: 8px;">${l.length}건</p>
              <div style="font-size: var(--text-sm); color: var(--text-tertiary); max-height: 80px; overflow-y: auto;">
                ${l.length>0?l.map(e=>`<div style="margin-bottom: 4px; cursor:pointer;" class="alert-link" data-id="${e.id}">• ${e.companyName} (${e.contactName})</div>`).join(``):`알림 대상 없음`}
              </div>
            </div>
          </div>

          <div class="card">
            <div style="padding: var(--space-4);">
              <h3 style="font-size: var(--text-base); margin-bottom: 8px; color: var(--status-success);">방송 종료 30일 경과 (재컨택)</h3>
              <p style="font-size: var(--text-2xl); font-weight: bold; margin-bottom: 8px;">${u.length}곳</p>
              <div style="font-size: var(--text-sm); color: var(--text-tertiary); max-height: 80px; overflow-y: auto;">
                ${u.length>0?u.map(e=>`<div style="margin-bottom: 4px;">• ${e.brandName} (${e.diffDays}일 지남)</div>`).join(``):`알림 대상 없음`}
              </div>
            </div>
          </div>

        </div>

        <!-- 고객 목록 -->
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; gap: var(--space-3); align-items: center;">
              <h3>전체 고객 관리</h3>
            </div>
            <div style="display: flex; gap: var(--space-2);">
              <select class="input" id="filter-status" style="width: 150px;">
                <option value="all">상태 전체</option>
                ${m.map(e=>`<option value="${e.key}">${e.label}</option>`).join(``)}
              </select>
              <select class="input" id="filter-category" style="width: 150px;">
                <option value="all">분류 전체</option>
                ${h.map(e=>`<option value="${e.key}">${e.label}</option>`).join(``)}
              </select>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>회사명</th>
                  <th>담당자명</th>
                  <th>연락처</th>
                  <th>관심서비스</th>
                  <th>분류</th>
                  <th>상태</th>
                  <th>최근 연락일</th>
                  <th class="text-center">관리</th>
                </tr>
              </thead>
              <tbody id="crm-table-body">
                <!-- 렌더링 영역 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,r(t),e.querySelector(`#btn-add-client`).addEventListener(`click`,()=>i()),e.querySelector(`#btn-csv-upload`).addEventListener(`click`,()=>{if(confirm(`CSV 파일로 대량의 고객 정보를 등록하시겠습니까?

[양식 텍스트]
회사명,담당자명,연락처,이메일,관심서비스,유입경로,메모

* 확인을 누르시면 빈 양식이 다운로드되고, 파일 선택창이 열립니다.`)){let t=new Blob([`﻿회사명,담당자명,연락처,이메일,관심서비스,유입경로,메모
예시회사,홍길동,010-1234-5678,test@example.com,라이브방송,검색,메모내용`],{type:`text/csv;charset=utf-8;`}),n=document.createElement(`a`),r=URL.createObjectURL(t);n.setAttribute(`href`,r),n.setAttribute(`download`,`CRM_고객대량등록_양식.csv`),document.body.appendChild(n),n.click(),document.body.removeChild(n),e.querySelector(`#csv-file-input`).click()}}),e.querySelector(`#csv-file-input`).addEventListener(`change`,e=>{let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=function(t){let n=t.target.result.split(`
`).filter(e=>e.trim()!==``);if(n.length<=1){alert(`데이터가 없습니다.`);return}let r=[],i=new Date().toISOString().split(`T`)[0];for(let e=1;e<n.length;e++){let t=n[e].split(`,`).map(e=>e.trim().replace(/^"|"$/g,``));t[0]&&r.push({id:`crm_`+Date.now()+`_`+e,companyName:t[0]||``,contactName:t[1]||``,phone:t[2]||``,email:t[3]||``,interestedService:t[4]||``,source:t[5]||``,memo:t[6]||``,status:`lead`,category:`기타`,lastContactDate:i,createdAt:i})}r.length>0&&confirm(`총 ${r.length}건의 데이터를 등록하시겠습니까?`)&&(V.createBulk(`crmClients`,r),alert(`성공적으로 등록되었습니다.`),Tt()),e.target.value=``},n.readAsText(t,`utf-8`)}),e.querySelector(`#filter-status`).addEventListener(`change`,r=>n(r.target.value,e.querySelector(`#filter-category`).value,t)),e.querySelector(`#filter-category`).addEventListener(`change`,r=>n(e.querySelector(`#filter-status`).value,r.target.value,t)),e.querySelectorAll(`.alert-link`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.id;i(t)})})}function n(e,t,n){let i=n;e!==`all`&&(i=i.filter(t=>t.status===e)),t!==`all`&&(i=i.filter(e=>e.category===t)),r(i)}function r(t){let n=e.querySelector(`#crm-table-body`);if(n){if(t.length===0){n.innerHTML=`<tr><td colspan="8" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 고객이 없습니다.</td></tr>`;return}n.innerHTML=t.sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)).map(e=>{let t=m.find(t=>t.key===e.status)||m[0],n=h.find(t=>t.key===e.category)||{label:`-`};return`
        <tr>
          <td style="font-weight: 500;">${e.companyName}</td>
          <td>${e.contactName}</td>
          <td>${e.phone||`-`}<br><span style="font-size:11px; color:var(--text-tertiary);">${e.email||``}</span></td>
          <td>${e.interestedService||`-`}</td>
          <td><span class="badge" style="background: var(--bg-secondary);">${n.label}</span></td>
          <td><span class="badge" style="background: var(--status-${t.color}); color: white;">${t.label}</span></td>
          <td>${G(e.lastContactDate)}</td>
          <td class="text-center col-actions">
            <button class="btn btn-sm btn-secondary btn-edit-client" data-id="${e.id}">상세/활동</button>
          </td>
        </tr>
      `}).join(``),n.querySelectorAll(`.btn-edit-client`).forEach(e=>{e.addEventListener(`click`,e=>i(e.target.dataset.id))})}}function i(e=null){let n=!!e,r=n?V.getById(`crmClients`,e):{},a=n?V.getAll(`crmActivities`).filter(t=>t.clientId===e).sort((e,t)=>new Date(t.date)-new Date(e.date)):[],o=`
      <div style="display: flex; gap: var(--space-6);">
        <!-- 왼쪽: 기본 정보 -->
        <div style="flex: 1; min-width: 300px;">
          <h3 style="margin-bottom: var(--space-4); border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">기본 정보</h3>
          <div class="form-grid">
            <div class="input-group">
              <label class="required">회사명</label>
              <input type="text" class="input" id="c-company" value="${r.companyName||``}">
            </div>
            <div class="input-group">
              <label class="required">담당자명</label>
              <input type="text" class="input" id="c-contact" value="${r.contactName||``}">
            </div>
            <div class="input-group">
              <label>연락처</label>
              <input type="text" class="input" id="c-phone" value="${r.phone||``}">
            </div>
            <div class="input-group">
              <label>이메일</label>
              <input type="text" class="input" id="c-email" value="${r.email||``}">
            </div>
            <div class="input-group">
              <label>상태</label>
              <select class="input" id="c-status">
                ${m.map(e=>`<option value="${e.key}" ${r.status===e.key?`selected`:``}>${e.label}</option>`).join(``)}
              </select>
            </div>
            <div class="input-group">
              <label>고객 분류</label>
              <select class="input" id="c-category">
                ${h.map(e=>`<option value="${e.key}" ${r.category===e.key?`selected`:``}>${e.label}</option>`).join(``)}
              </select>
            </div>
            <div class="input-group full-width">
              <label>관심서비스</label>
              <input type="text" class="input" id="c-service" value="${r.interestedService||``}" placeholder="예: 라이브커머스, 숏폼 제작 등">
            </div>
            <div class="input-group full-width">
              <label>유입경로</label>
              <input type="text" class="input" id="c-source" value="${r.source||``}">
            </div>
            <div class="input-group full-width">
              <label>메모</label>
              <textarea class="input" id="c-memo" style="height: 60px;">${r.memo||``}</textarea>
            </div>
          </div>
        </div>

        <!-- 오른쪽: 활동 관리 -->
        ${n?`
        <div style="flex: 1; border-left: 1px solid var(--border-light); padding-left: var(--space-6);">
          <h3 style="margin-bottom: var(--space-4); border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">활동 관리 (Follow-up)</h3>
          
          <!-- 활동 추가 폼 -->
          <div style="background: var(--bg-secondary); padding: var(--space-3); border-radius: var(--radius-md); margin-bottom: var(--space-4);">
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <input type="date" class="input" id="act-date" value="${new Date().toISOString().split(`T`)[0]}" style="flex: 1;">
              <select class="input" id="act-type" style="flex: 1;">
                ${g.map(e=>`<option value="${e.key}">${e.icon} ${e.label}</option>`).join(``)}
              </select>
            </div>
            <textarea class="input" id="act-content" placeholder="활동 내용 및 특이사항 입력" style="height: 60px; margin-bottom: 8px;"></textarea>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span style="font-size: 12px; color: var(--text-tertiary); white-space: nowrap;">다음 팔로업 예정일</span>
              <input type="date" class="input" id="act-followup" style="flex: 1;">
              <button class="btn btn-primary" id="btn-save-activity">활동 등록</button>
            </div>
          </div>

          <!-- 타임라인 -->
          <div style="max-height: 300px; overflow-y: auto;">
            ${a.length>0?a.map(e=>{let t=g.find(t=>t.key===e.type)||g[0];return`
              <div style="margin-bottom: var(--space-3); padding-bottom: var(--space-3); border-bottom: 1px dashed var(--border-light);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-weight: 500; font-size: 13px;">${t.icon} ${t.label}</span>
                  <span style="color: var(--text-tertiary); font-size: 12px;">${G(e.date)}</span>
                </div>
                <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 4px;">${e.content}</div>
                ${e.followUpDate?`<div style="font-size: 11px; color: var(--primary-color);">👉 다음 예정일: ${G(e.followUpDate)}</div>`:``}
              </div>
              `}).join(``):`<div style="color: var(--text-tertiary); font-size: 13px; text-align: center;">기록된 활동이 없습니다.</div>`}
          </div>
        </div>
        `:`<div style="flex: 1; display:flex; align-items:center; justify-content:center; color:var(--text-tertiary); background:var(--bg-secondary); border-radius:var(--radius-md);">고객 정보를 먼저 등록한 후 활동 관리를 할 수 있습니다.</div>`}
      </div>
    `,s=document.createElement(`div`);if(s.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,n){let n=document.createElement(`button`);n.className=`btn btn-danger`,n.textContent=`고객 삭제`,n.style.marginRight=`auto`,n.addEventListener(`click`,()=>{confirm(`이 고객과 모든 활동 기록을 삭제하시겠습니까?`)&&(V.delete(`crmClients`,e),J(),t(),Y(`삭제되었습니다.`))}),s.appendChild(n)}let c=document.createElement(`button`);c.className=`btn btn-secondary`,c.textContent=`취소`,c.addEventListener(`click`,J);let l=document.createElement(`button`);l.className=`btn btn-primary`,l.textContent=`고객 정보 저장`,l.addEventListener(`click`,()=>{let r=document.getElementById(`c-company`).value.trim();if(!r)return X(`회사명을 입력하세요.`);let i={companyName:r,contactName:document.getElementById(`c-contact`).value.trim(),phone:document.getElementById(`c-phone`).value.trim(),email:document.getElementById(`c-email`).value.trim(),status:document.getElementById(`c-status`).value,category:document.getElementById(`c-category`).value,interestedService:document.getElementById(`c-service`).value.trim(),source:document.getElementById(`c-source`).value.trim(),memo:document.getElementById(`c-memo`).value.trim()};n?(V.update(`crmClients`,e,i),Y(`수정되었습니다.`)):(i.id=S(`crm`),i.createdAt=new Date().toISOString(),i.lastContactDate=new Date().toISOString().split(`T`)[0],V.create(`crmClients`,i),Y(`등록되었습니다.`)),J(),t()}),s.appendChild(c),s.appendChild(l),q({title:n?`고객 상세 및 활동 관리`:`신규 고객 등록`,size:`lg`,content:o,footer:s}),n&&setTimeout(()=>{document.getElementById(`btn-save-activity`)?.addEventListener(`click`,()=>{let t=document.getElementById(`act-content`).value.trim();if(!t)return X(`활동 내용을 입력하세요.`);let n=document.getElementById(`act-date`).value,a={id:S(`act`),clientId:e,date:n,type:document.getElementById(`act-type`).value,content:t,followUpDate:document.getElementById(`act-followup`).value||null,createdAt:new Date().toISOString()};V.create(`crmActivities`,a),new Date(n)>new Date(r.lastContactDate||`1970-01-01`)&&V.update(`crmClients`,e,{lastContactDate:n}),Y(`활동이 등록되었습니다.`),J(),i(e)})},0)}return t(),V.on(`crmClients:changed`,t),V.on(`crmActivities:changed`,t),e}function Et(){let e=document.createElement(`div`),t=V.getCurrentRole();return e.innerHTML=`
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <h1 class="page-title">설정</h1>
          <p class="page-description">시스템 설정 및 권한 관리</p>
        </div>
      </div>
    </div>
    <div class="page-body">
      
      
      <!-- SaaS 데모 (구독 관리) -->
      ${t===`admin`?`
      <div class="card" style="margin-bottom: var(--space-5); ${V.isDemoMode?`border: 2px solid var(--status-error);`:``}">
        <div class="card-header" style="${V.isDemoMode?`background: rgba(239,68,68,0.1); border-bottom: 1px solid var(--status-error);`:`background: var(--bg-secondary); border-bottom: 1px solid var(--border-light);`}">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="display: flex; align-items: center; gap: 8px;">
              SaaS 구독 관리
            </h3>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-5);">
            <div style="padding: var(--space-4); background: var(--bg-primary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-2);">이용 중인 플랜</div>
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">Enterprise (무제한)</div>
              <div style="font-size: var(--text-xs); color: var(--status-success); margin-top: var(--space-2);">활성 상태</div>
            </div>
            <div style="padding: var(--space-4); background: var(--bg-primary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-2);">등록된 사용자 계정</div>
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">${V.getAll(`users`).length}명 <span style="font-size: var(--text-sm); font-weight: 400; color: var(--text-tertiary);">/ 무제한</span></div>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2);">추가 과금 없음</div>
            </div>
            <div style="padding: var(--space-4); background: var(--bg-primary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-2);">다음 결제일</div>
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">2026.12.31</div>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2);">자동 결제 설정됨</div>
            </div>
          </div>
        </div>
      </div>
      `:``}

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
                  <td class="text-center">${e.admin?kt():At()}</td>
                  <td class="text-center">${e.pd?kt():At()}</td>
                  <td class="text-center">${e.designer?kt():At()}</td>
                  <td class="text-center">${e.accountant?kt():At()}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{let n=e.querySelector(`#toggle-demo-mode`);if(n&&n.addEventListener(`change`,e=>{e.target.checked?Ie({title:`데모 모드 진입`,message:`데모 모드를 켜시겠습니까?
실제 운영 데이터가 보이지 않게 되며, 텅 빈 초기 상태에서 시연용 데이터를 안전하게 조작할 수 있습니다.`,confirmText:`데모 켜기`,onConfirm:()=>V.toggleDemoMode(!0),onCancel:()=>{n.checked=!1}}):Ie({title:`운영 모드 복귀`,message:`운영 모드로 돌아가시겠습니까?
다시 원래의 실제 운영 데이터를 불러옵니다.`,confirmText:`복귀하기`,onConfirm:()=>V.toggleDemoMode(!1),onCancel:()=>{n.checked=!0}})}),e.querySelector(`#btn-sync-data`)?.addEventListener(`click`,async()=>{let t=e.querySelector(`#btn-sync-data`);t.textContent=`동기화 중...`,t.disabled=!0;try{if(await V.init()){Y(`데이터 동기화가 완료되었습니다.`);let e=document.getElementById(`page-content`);e&&(e.innerHTML=``,e.appendChild(Et()))}else X(`동기화에 실패했습니다.`)}catch{X(`초기화 실패`)}finally{t.disabled=!1,t.textContent=`구글 시트 동기화`}}),t===`admin`){let t=JSON.parse(localStorage.getItem(`ryzin_live_data`)||`{}`),n=t.settings||{},r=e.querySelector(`#setting-popbill-linkid`),i=e.querySelector(`#setting-popbill-secret`),a=e.querySelector(`#setting-popbill-sender`);r&&(r.value=n.popbillLinkId||``),i&&(i.value=n.popbillSecretKey||``),a&&(a.value=n.popbillSenderNumber||``),e.querySelector(`#btn-save-api-settings`)?.addEventListener(`click`,()=>{t.settings||={},t.settings.popbillLinkId=r.value.trim(),t.settings.popbillSecretKey=i.value.trim(),t.settings.popbillSenderNumber=a.value.trim(),localStorage.setItem(`ryzin_live_data`,JSON.stringify(t)),Y(`API 연동 설정이 저장되었습니다.`)})}t===`admin`&&(Dt(e),e.querySelector(`#btn-create-user`)?.addEventListener(`click`,()=>{Ot()}))},0),e}function Dt(e){let t=e.querySelector(`#user-list-tbody`);if(!t)return;let n=V.getAll(`users`);if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 사용자가 없습니다.</td></tr>`;return}t.innerHTML=n.map(e=>`
    <tr>
      <td style="font-weight: var(--weight-medium);">${e.id}</td>
      <td>${e.name}</td>
      <td><span style="color:var(--text-tertiary);">***</span></td>
      <td><span class="badge badge-default">${b[e.role]?.label||e.role}</span></td>
      <td class="text-right">
        <div style="display: flex; gap: var(--space-2); justify-content: flex-end;">
          <button class="btn btn-secondary btn-sm edit-user-btn" data-id="${e.id}">수정</button>
          <button class="btn btn-danger btn-sm delete-user-btn" data-id="${e.id}">삭제</button>
        </div>
      </td>
    </tr>
  `).join(``),t.querySelectorAll(`.edit-user-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=V.getById(`users`,e.getAttribute(`data-id`));t&&Ot(t)})}),t.querySelectorAll(`.delete-user-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-id`);Ie({title:`사용자 삭제`,message:`해당 사용자를 삭제하시겠습니까?`,confirmText:`삭제`,danger:!0,onConfirm:()=>{V.delete(`users`,n),Y(`사용자가 삭제되었습니다.`),Dt(e)}})})})}function Ot(e=null){let t=document.createElement(`div`);t.className=`form-grid`,t.innerHTML=`
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
        ${Object.entries(b).map(([t,n])=>`<option value="${t}" ${e&&e.role===t?`selected`:``}>${n.label} (${t})</option>`).join(``)}
      </select>
    </div>
  `;let n=document.createElement(`div`);n.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let r=document.createElement(`button`);r.className=`btn btn-secondary`,r.textContent=`취소`,r.addEventListener(`click`,J);let i=document.createElement(`button`);i.className=`btn btn-primary`,i.textContent=`저장`,i.addEventListener(`click`,()=>{let t=document.getElementById(`user-id`).value.trim(),n=document.getElementById(`user-pw`).value.trim(),r=document.getElementById(`user-name`).value.trim(),i=document.getElementById(`user-role`).value;if(!t||!n||!r){X(`모든 항목을 입력해주세요.`);return}if(e)V.update(`users`,t,{password:n,name:r,role:i}),Y(`사용자 정보가 수정되었습니다.`);else{if(V.getById(`users`,t)){X(`이미 존재하는 아이디입니다.`);return}V.create(`users`,{id:t,password:n,name:r,role:i}),Y(`새로운 사용자가 등록되었습니다.`)}J();let a=document.getElementById(`page-content`);a&&(a.innerHTML=``,a.appendChild(Et()))}),n.appendChild(r),n.appendChild(i),q({title:e?`사용자 수정`:`사용자 추가`,content:t,footer:n})}function kt(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--status-success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`}function At(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`}var jt=e=>{let t=new Uint8Array(new ArrayBuffer(8)),n=e;for(let e=7;e>=0&&n!==0;e--)t[e]=n&255,n-=t[e],n/=256;return t};function Mt(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name===`Uint8Array`&&`BYTES_PER_ELEMENT`in e&&e.BYTES_PER_ELEMENT===1}function Nt(e,t=``){if(typeof e!=`number`){let n=t&&`"${t}" `;throw TypeError(`${n}expected number, got ${typeof e}`)}if(!Number.isSafeInteger(e)||e<0){let n=t&&`"${t}" `;throw RangeError(`${n}expected integer >= 0, got ${e}`)}}function Pt(e,t,n=``){let r=Mt(e),i=e?.length;if(!r||t!==void 0){let t=n&&`"${n}" `,a=r?`length=${i}`:`type=${typeof e}`,o=t+`expected Uint8Array, got `+a;throw r?RangeError(o):TypeError(o)}return e}function Ft(e){if(typeof e!=`function`||typeof e.create!=`function`)throw TypeError(`Hash must wrapped by utils.createHasher`);if(Nt(e.outputLen),Nt(e.blockLen),e.outputLen<1)throw Error(`"outputLen" must be >= 1`);if(e.blockLen<1)throw Error(`"blockLen" must be >= 1`)}function It(e,t=!0){if(e.destroyed)throw Error(`Hash instance has been destroyed`);if(t&&e.finished)throw Error(`Hash#digest() has already been called`)}function Lt(e,t){Pt(e,void 0,`digestInto() output`);let n=t.outputLen;if(e.length<n)throw RangeError(`"digestInto() output" expected to be of length >=`+n)}function Rt(e){return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function Z(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function zt(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function Bt(e,t){return e<<32-t|e>>>t}function Vt(e,t){return e<<t|e>>>32-t>>>0}var Ht=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function Ut(e){return e<<24&4278190080|e<<8&16711680|e>>>8&65280|e>>>24&255}function Wt(e){for(let t=0;t<e.length;t++)e[t]=Ut(e[t]);return e}var Gt=Ht?e=>e:Wt;function Kt(e,t={}){let n=(t,n)=>e(n).update(t).digest(),r=e(void 0);return n.outputLen=r.outputLen,n.blockLen=r.blockLen,n.canXOF=r.canXOF,n.create=t=>e(t),Object.assign(n,t),Object.freeze(n)}var qt=e=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,e])}),Jt=class{update(e){return It(this),this.iHash.update(e),this}digestInto(e){It(this),Lt(e,this),this.finished=!0;let t=e.subarray(0,this.outputLen);this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){let e=new Uint8Array(this.oHash.outputLen);return this.digestInto(e),e}_cloneInto(e){e||=Object.create(Object.getPrototypeOf(this),{});let{oHash:t,iHash:n,finished:r,destroyed:i,blockLen:a,outputLen:o}=this;return e=e,e.finished=r,e.destroyed=i,e.blockLen=a,e.outputLen=o,e.oHash=t._cloneInto(e.oHash),e.iHash=n._cloneInto(e.iHash),e}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}constructor(e,t){if(this.canXOF=!1,this.finished=!1,this.destroyed=!1,Ft(e),Pt(t,void 0,`key`),this.iHash=e.create(),typeof this.iHash.update!=`function`)throw Error(`Expected instance of class which extends utils.Hash`);this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;let n=this.blockLen,r=new Uint8Array(n);r.set(t.length>n?e.create().update(t).digest():t);for(let e=0;e<r.length;e++)r[e]^=54;this.iHash.update(r),this.oHash=e.create();for(let e=0;e<r.length;e++)r[e]^=106;this.oHash.update(r),Z(r)}},Yt=(()=>{let e=(e,t,n)=>new Jt(e,t).update(n).digest();return e.create=(e,t)=>new Jt(e,t),e})();function Xt(e,t,n){return e&t^~e&n}function Zt(e,t,n){return e&t^e&n^t&n}var Qt=class{update(e){It(this),Pt(e);let{view:t,buffer:n,blockLen:r}=this,i=e.length;for(let a=0;a<i;){let o=Math.min(r-this.pos,i-a);if(o===r){let t=zt(e);for(;r<=i-a;a+=r)this.process(t,a);continue}n.set(e.subarray(a,a+o),this.pos),this.pos+=o,a+=o,this.pos===r&&(this.process(t,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){It(this),Lt(e,this),this.finished=!0;let{buffer:t,view:n,blockLen:r,isLE:i}=this,{pos:a}=this;t[a++]=128,Z(this.buffer.subarray(a)),this.padOffset>r-a&&(this.process(n,0),a=0);for(let e=a;e<r;e++)t[e]=0;n.setBigUint64(r-8,BigInt(this.length*8),i),this.process(n,0);let o=zt(e),s=this.outputLen;if(s%4)throw Error(`_sha2: outputLen must be aligned to 32bit`);let c=s/4,l=this.get();if(c>l.length)throw Error(`_sha2: outputLen bigger than state`);for(let e=0;e<c;e++)o.setUint32(4*e,l[e],i)}digest(){let{buffer:e,outputLen:t}=this;this.digestInto(e);let n=e.slice(0,t);return this.destroy(),n}_cloneInto(e){e||=new this.constructor,e.set(...this.get());let{blockLen:t,buffer:n,length:r,finished:i,destroyed:a,pos:o}=this;return e.destroyed=a,e.finished=i,e.length=r,e.pos=o,r%t&&e.buffer.set(n),e}clone(){return this._cloneInto()}constructor(e,t,n,r){this.canXOF=!1,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=t,this.padOffset=n,this.isLE=r,this.buffer=new Uint8Array(e),this.view=zt(this.buffer)}},$t=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),en=Uint32Array.from([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]),Q=Uint32Array.from([3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]),$=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]),tn=Uint32Array.from([1732584193,4023233417,2562383102,271733878,3285377520]),nn=new Uint32Array(80),rn=class extends Qt{get(){let{A:e,B:t,C:n,D:r,E:i}=this;return[e,t,n,r,i]}set(e,t,n,r,i){this.A=e|0,this.B=t|0,this.C=n|0,this.D=r|0,this.E=i|0}process(e,t){for(let n=0;n<16;n++,t+=4)nn[n]=e.getUint32(t,!1);for(let e=16;e<80;e++)nn[e]=Vt(nn[e-3]^nn[e-8]^nn[e-14]^nn[e-16],1);let{A:n,B:r,C:i,D:a,E:o}=this;for(let e=0;e<80;e++){let t,s;e<20?(t=Xt(r,i,a),s=1518500249):e<40?(t=r^i^a,s=1859775393):e<60?(t=Zt(r,i,a),s=2400959708):(t=r^i^a,s=3395469782);let c=Vt(n,5)+t+o+s+nn[e]|0;o=a,a=i,i=Vt(r,30),r=n,n=c}n=n+this.A|0,r=r+this.B|0,i=i+this.C|0,a=a+this.D|0,o=o+this.E|0,this.set(n,r,i,a,o)}roundClean(){Z(nn)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0),Z(this.buffer)}constructor(){super(64,20,8,!1),this.A=tn[0]|0,this.B=tn[1]|0,this.C=tn[2]|0,this.D=tn[3]|0,this.E=tn[4]|0}},an=Kt(()=>new rn),on=BigInt(2**32-1),sn=BigInt(32);function cn(e,t=!1){return t?{h:Number(e&on),l:Number(e>>sn&on)}:{h:Number(e>>sn&on)|0,l:Number(e&on)|0}}function ln(e,t=!1){let n=e.length,r=new Uint32Array(n),i=new Uint32Array(n);for(let a=0;a<n;a++){let{h:n,l:o}=cn(e[a],t);[r[a],i[a]]=[n,o]}return[r,i]}var un=(e,t,n)=>e>>>n,dn=(e,t,n)=>e<<32-n|t>>>n,fn=(e,t,n)=>e>>>n|t<<32-n,pn=(e,t,n)=>e<<32-n|t>>>n,mn=(e,t,n)=>e<<64-n|t>>>n-32,hn=(e,t,n)=>e>>>n-32|t<<64-n,gn=(e,t,n)=>e<<n|t>>>32-n,_n=(e,t,n)=>t<<n|e>>>32-n,vn=(e,t,n)=>t<<n-32|e>>>64-n,yn=(e,t,n)=>e<<n-32|t>>>64-n;function bn(e,t,n,r){let i=(t>>>0)+(r>>>0);return{h:e+n+(i/2**32|0)|0,l:i|0}}var xn=(e,t,n)=>(e>>>0)+(t>>>0)+(n>>>0),Sn=(e,t,n,r)=>t+n+r+(e/2**32|0)|0,Cn=(e,t,n,r)=>(e>>>0)+(t>>>0)+(n>>>0)+(r>>>0),wn=(e,t,n,r,i)=>t+n+r+i+(e/2**32|0)|0,Tn=(e,t,n,r,i)=>(e>>>0)+(t>>>0)+(n>>>0)+(r>>>0)+(i>>>0),En=(e,t,n,r,i,a)=>t+n+r+i+a+(e/2**32|0)|0,Dn=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),On=new Uint32Array(64),kn=class extends Qt{get(){let{A:e,B:t,C:n,D:r,E:i,F:a,G:o,H:s}=this;return[e,t,n,r,i,a,o,s]}set(e,t,n,r,i,a,o,s){this.A=e|0,this.B=t|0,this.C=n|0,this.D=r|0,this.E=i|0,this.F=a|0,this.G=o|0,this.H=s|0}process(e,t){for(let n=0;n<16;n++,t+=4)On[n]=e.getUint32(t,!1);for(let e=16;e<64;e++){let t=On[e-15],n=On[e-2],r=Bt(t,7)^Bt(t,18)^t>>>3;On[e]=(Bt(n,17)^Bt(n,19)^n>>>10)+On[e-7]+r+On[e-16]|0}let{A:n,B:r,C:i,D:a,E:o,F:s,G:c,H:l}=this;for(let e=0;e<64;e++){let t=Bt(o,6)^Bt(o,11)^Bt(o,25),u=l+t+Xt(o,s,c)+Dn[e]+On[e]|0,d=(Bt(n,2)^Bt(n,13)^Bt(n,22))+Zt(n,r,i)|0;l=c,c=s,s=o,o=a+u|0,a=i,i=r,r=n,n=u+d|0}n=n+this.A|0,r=r+this.B|0,i=i+this.C|0,a=a+this.D|0,o=o+this.E|0,s=s+this.F|0,c=c+this.G|0,l=l+this.H|0,this.set(n,r,i,a,o,s,c,l)}roundClean(){Z(On)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0,0,0,0),Z(this.buffer)}constructor(e){super(64,e,8,!1)}},An=class extends kn{constructor(){super(32),this.A=$t[0]|0,this.B=$t[1]|0,this.C=$t[2]|0,this.D=$t[3]|0,this.E=$t[4]|0,this.F=$t[5]|0,this.G=$t[6]|0,this.H=$t[7]|0}},jn=class extends kn{constructor(){super(28),this.A=en[0]|0,this.B=en[1]|0,this.C=en[2]|0,this.D=en[3]|0,this.E=en[4]|0,this.F=en[5]|0,this.G=en[6]|0,this.H=en[7]|0}},Mn=ln(`0x428a2f98d728ae22.0x7137449123ef65cd.0xb5c0fbcfec4d3b2f.0xe9b5dba58189dbbc.0x3956c25bf348b538.0x59f111f1b605d019.0x923f82a4af194f9b.0xab1c5ed5da6d8118.0xd807aa98a3030242.0x12835b0145706fbe.0x243185be4ee4b28c.0x550c7dc3d5ffb4e2.0x72be5d74f27b896f.0x80deb1fe3b1696b1.0x9bdc06a725c71235.0xc19bf174cf692694.0xe49b69c19ef14ad2.0xefbe4786384f25e3.0x0fc19dc68b8cd5b5.0x240ca1cc77ac9c65.0x2de92c6f592b0275.0x4a7484aa6ea6e483.0x5cb0a9dcbd41fbd4.0x76f988da831153b5.0x983e5152ee66dfab.0xa831c66d2db43210.0xb00327c898fb213f.0xbf597fc7beef0ee4.0xc6e00bf33da88fc2.0xd5a79147930aa725.0x06ca6351e003826f.0x142929670a0e6e70.0x27b70a8546d22ffc.0x2e1b21385c26c926.0x4d2c6dfc5ac42aed.0x53380d139d95b3df.0x650a73548baf63de.0x766a0abb3c77b2a8.0x81c2c92e47edaee6.0x92722c851482353b.0xa2bfe8a14cf10364.0xa81a664bbc423001.0xc24b8b70d0f89791.0xc76c51a30654be30.0xd192e819d6ef5218.0xd69906245565a910.0xf40e35855771202a.0x106aa07032bbd1b8.0x19a4c116b8d2d0c8.0x1e376c085141ab53.0x2748774cdf8eeb99.0x34b0bcb5e19b48a8.0x391c0cb3c5c95a63.0x4ed8aa4ae3418acb.0x5b9cca4f7763e373.0x682e6ff3d6b2b8a3.0x748f82ee5defb2fc.0x78a5636f43172f60.0x84c87814a1f0ab72.0x8cc702081a6439ec.0x90befffa23631e28.0xa4506cebde82bde9.0xbef9a3f7b2c67915.0xc67178f2e372532b.0xca273eceea26619c.0xd186b8c721c0c207.0xeada7dd6cde0eb1e.0xf57d4f7fee6ed178.0x06f067aa72176fba.0x0a637dc5a2c898a6.0x113f9804bef90dae.0x1b710b35131c471b.0x28db77f523047d84.0x32caab7b40c72493.0x3c9ebe0a15c9bebc.0x431d67c49c100d4c.0x4cc5d4becb3e42b6.0x597f299cfc657e2a.0x5fcb6fab3ad6faec.0x6c44198c4a475817`.split(`.`).map(e=>BigInt(e))),Nn=Mn[0],Pn=Mn[1],Fn=new Uint32Array(80),In=new Uint32Array(80),Ln=class extends Qt{get(){let{Ah:e,Al:t,Bh:n,Bl:r,Ch:i,Cl:a,Dh:o,Dl:s,Eh:c,El:l,Fh:u,Fl:d,Gh:f,Gl:p,Hh:m,Hl:h}=this;return[e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h]}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.Ah=e|0,this.Al=t|0,this.Bh=n|0,this.Bl=r|0,this.Ch=i|0,this.Cl=a|0,this.Dh=o|0,this.Dl=s|0,this.Eh=c|0,this.El=l|0,this.Fh=u|0,this.Fl=d|0,this.Gh=f|0,this.Gl=p|0,this.Hh=m|0,this.Hl=h|0}process(e,t){for(let n=0;n<16;n++,t+=4)Fn[n]=e.getUint32(t),In[n]=e.getUint32(t+=4);for(let e=16;e<80;e++){let t=Fn[e-15]|0,n=In[e-15]|0,r=fn(t,n,1)^fn(t,n,8)^un(t,n,7),i=pn(t,n,1)^pn(t,n,8)^dn(t,n,7),a=Fn[e-2]|0,o=In[e-2]|0,s=fn(a,o,19)^mn(a,o,61)^un(a,o,6),c=Cn(i,pn(a,o,19)^hn(a,o,61)^dn(a,o,6),In[e-7],In[e-16]);Fn[e]=wn(c,r,s,Fn[e-7],Fn[e-16])|0,In[e]=c|0}let{Ah:n,Al:r,Bh:i,Bl:a,Ch:o,Cl:s,Dh:c,Dl:l,Eh:u,El:d,Fh:f,Fl:p,Gh:m,Gl:h,Hh:g,Hl:_}=this;for(let e=0;e<80;e++){let t=fn(u,d,14)^fn(u,d,18)^mn(u,d,41),v=pn(u,d,14)^pn(u,d,18)^hn(u,d,41),y=u&f^~u&m,b=d&p^~d&h,x=Tn(_,v,b,Pn[e],In[e]),S=En(x,g,t,y,Nn[e],Fn[e]),C=x|0,w=fn(n,r,28)^mn(n,r,34)^mn(n,r,39),T=pn(n,r,28)^hn(n,r,34)^hn(n,r,39),E=n&i^n&o^i&o,D=r&a^r&s^a&s;g=m|0,_=h|0,m=f|0,h=p|0,f=u|0,p=d|0,{h:u,l:d}=bn(c|0,l|0,S|0,C|0),c=o|0,l=s|0,o=i|0,s=a|0,i=n|0,a=r|0;let O=xn(C,T,D);n=Sn(O,S,w,E),r=O|0}({h:n,l:r}=bn(this.Ah|0,this.Al|0,n|0,r|0)),{h:i,l:a}=bn(this.Bh|0,this.Bl|0,i|0,a|0),{h:o,l:s}=bn(this.Ch|0,this.Cl|0,o|0,s|0),{h:c,l}=bn(this.Dh|0,this.Dl|0,c|0,l|0),{h:u,l:d}=bn(this.Eh|0,this.El|0,u|0,d|0),{h:f,l:p}=bn(this.Fh|0,this.Fl|0,f|0,p|0),{h:m,l:h}=bn(this.Gh|0,this.Gl|0,m|0,h|0),{h:g,l:_}=bn(this.Hh|0,this.Hl|0,g|0,_|0),this.set(n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_)}roundClean(){Z(Fn,In)}destroy(){this.destroyed=!0,Z(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}constructor(e){super(128,e,16,!1)}},Rn=class extends Ln{constructor(){super(64),this.Ah=$[0]|0,this.Al=$[1]|0,this.Bh=$[2]|0,this.Bl=$[3]|0,this.Ch=$[4]|0,this.Cl=$[5]|0,this.Dh=$[6]|0,this.Dl=$[7]|0,this.Eh=$[8]|0,this.El=$[9]|0,this.Fh=$[10]|0,this.Fl=$[11]|0,this.Gh=$[12]|0,this.Gl=$[13]|0,this.Hh=$[14]|0,this.Hl=$[15]|0}},zn=class extends Ln{constructor(){super(48),this.Ah=Q[0]|0,this.Al=Q[1]|0,this.Bh=Q[2]|0,this.Bl=Q[3]|0,this.Ch=Q[4]|0,this.Cl=Q[5]|0,this.Dh=Q[6]|0,this.Dl=Q[7]|0,this.Eh=Q[8]|0,this.El=Q[9]|0,this.Fh=Q[10]|0,this.Fl=Q[11]|0,this.Gh=Q[12]|0,this.Gl=Q[13]|0,this.Hh=Q[14]|0,this.Hl=Q[15]|0}},Bn=Kt(()=>new An,qt(1)),Vn=Kt(()=>new jn,qt(4)),Hn=Kt(()=>new Rn,qt(3)),Un=Kt(()=>new zn,qt(2)),Wn=BigInt(0),Gn=BigInt(1),Kn=BigInt(2),qn=BigInt(7),Jn=BigInt(256),Yn=BigInt(113),Xn=[],Zn=[],Qn=[];for(let e=0,t=Gn,n=1,r=0;e<24;e++){[n,r]=[r,(2*n+3*r)%5],Xn.push(2*(5*r+n)),Zn.push((e+1)*(e+2)/2%64);let i=Wn;for(let e=0;e<7;e++)t=(t<<Gn^(t>>qn)*Yn)%Jn,t&Kn&&(i^=Gn<<(Gn<<BigInt(e))-Gn);Qn.push(i)}var $n=ln(Qn,!0),er=$n[0],tr=$n[1],nr=(e,t,n)=>n>32?vn(e,t,n):gn(e,t,n),rr=(e,t,n)=>n>32?yn(e,t,n):_n(e,t,n);function ir(e,t=24){if(Nt(t,`rounds`),t<1||t>24)throw Error(`"rounds" expected integer 1..24`);let n=new Uint32Array(10);for(let r=24-t;r<24;r++){for(let t=0;t<10;t++)n[t]=e[t]^e[t+10]^e[t+20]^e[t+30]^e[t+40];for(let t=0;t<10;t+=2){let r=(t+8)%10,i=(t+2)%10,a=n[i],o=n[i+1],s=nr(a,o,1)^n[r],c=rr(a,o,1)^n[r+1];for(let n=0;n<50;n+=10)e[t+n]^=s,e[t+n+1]^=c}let t=e[2],i=e[3];for(let n=0;n<24;n++){let r=Zn[n],a=nr(t,i,r),o=rr(t,i,r),s=Xn[n];t=e[s],i=e[s+1],e[s]=a,e[s+1]=o}for(let t=0;t<50;t+=10){let n=e[t],r=e[t+1],i=e[t+2],a=e[t+3];e[t]^=~e[t+2]&e[t+4],e[t+1]^=~e[t+3]&e[t+5],e[t+2]^=~e[t+4]&e[t+6],e[t+3]^=~e[t+5]&e[t+7],e[t+4]^=~e[t+6]&e[t+8],e[t+5]^=~e[t+7]&e[t+9],e[t+6]^=~e[t+8]&n,e[t+7]^=~e[t+9]&r,e[t+8]^=~n&i,e[t+9]^=~r&a}e[0]^=er[r],e[1]^=tr[r]}Z(n)}var ar=class e{clone(){return this._cloneInto()}keccak(){Gt(this.state32),ir(this.state32,this.rounds),Gt(this.state32),this.posOut=0,this.pos=0}update(e){It(this),Pt(e);let{blockLen:t,state:n}=this,r=e.length;for(let i=0;i<r;){let a=Math.min(t-this.pos,r-i);for(let t=0;t<a;t++)n[this.pos++]^=e[i++];this.pos===t&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;let{state:e,suffix:t,pos:n,blockLen:r}=this;e[n]^=t,t&128&&n===r-1&&this.keccak(),e[r-1]^=128,this.keccak()}writeInto(e){It(this,!1),Pt(e),this.finish();let t=this.state,{blockLen:n}=this;for(let r=0,i=e.length;r<i;){this.posOut>=n&&this.keccak();let a=Math.min(n-this.posOut,i-r);e.set(t.subarray(this.posOut,this.posOut+a),r),this.posOut+=a,r+=a}return e}xofInto(e){if(!this.enableXOF)throw Error(`XOF is not possible for this instance`);return this.writeInto(e)}xof(e){return Nt(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(Lt(e,this),this.finished)throw Error(`digest() was already called`);this.writeInto(e.subarray(0,this.outputLen)),this.destroy()}digest(){let e=new Uint8Array(this.outputLen);return this.digestInto(e),e}destroy(){this.destroyed=!0,Z(this.state)}_cloneInto(t){let{blockLen:n,suffix:r,outputLen:i,rounds:a,enableXOF:o}=this;return t||=new e(n,r,i,o,a),t.blockLen=n,t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=a,t.suffix=r,t.outputLen=i,t.enableXOF=o,t.canXOF=this.canXOF,t.destroyed=this.destroyed,t}constructor(e,t,n,r=!1,i=24){if(this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,this.enableXOF=!1,this.blockLen=e,this.suffix=t,this.outputLen=n,this.enableXOF=r,this.canXOF=r,this.rounds=i,Nt(n,`outputLen`),!(0<e&&e<200))throw Error(`only keccak-f1600 function is supported`);this.state=new Uint8Array(200),this.state32=Rt(this.state)}},or=(e,t,n,r={})=>Kt(()=>new ar(t,e,n),r),sr=or(6,144,28,qt(7)),cr=or(6,136,32,qt(8)),lr=or(6,104,48,qt(9)),ur=or(6,72,64,qt(10)),dr=(()=>{if(typeof globalThis==`object`)return globalThis;Object.defineProperty(Object.prototype,"__GLOBALTHIS__",{get(){return this},configurable:!0});try{if(typeof __GLOBALTHIS__<`u`)return __GLOBALTHIS__}finally{delete Object.prototype.__GLOBALTHIS__}if(typeof self<`u`)return self;if(typeof window<`u`)return window;if(typeof global<`u`)return global})(),fr={SHA1:an,SHA224:Vn,SHA256:Bn,SHA384:Un,SHA512:Hn,"SHA3-224":sr,"SHA3-256":cr,"SHA3-384":lr,"SHA3-512":ur},pr=e=>{switch(!0){case/^(?:SHA-?1|SSL3-SHA1)$/i.test(e):return`SHA1`;case/^SHA(?:2?-)?224$/i.test(e):return`SHA224`;case/^SHA(?:2?-)?256$/i.test(e):return`SHA256`;case/^SHA(?:2?-)?384$/i.test(e):return`SHA384`;case/^SHA(?:2?-)?512$/i.test(e):return`SHA512`;case/^SHA3-224$/i.test(e):return`SHA3-224`;case/^SHA3-256$/i.test(e):return`SHA3-256`;case/^SHA3-384$/i.test(e):return`SHA3-384`;case/^SHA3-512$/i.test(e):return`SHA3-512`;default:throw TypeError(`Unknown hash algorithm: ${e}`)}},mr=(e,t,n)=>{if(Yt)return Yt(fr[e]??fr[pr(e)],t,n);throw Error(`Missing HMAC function`)},hr=`ABCDEFGHIJKLMNOPQRSTUVWXYZ234567`,gr=e=>{e=e.replace(/ /g,``);let t=e.length;for(;e[t-1]===`=`;)--t;e=(t<e.length?e.substring(0,t):e).toUpperCase();let n=new ArrayBuffer(e.length*5/8|0),r=new Uint8Array(n),i=0,a=0,o=0;for(let t=0;t<e.length;t++){let n=hr.indexOf(e[t]);if(n===-1)throw TypeError(`Invalid character found: ${e[t]}`);a=a<<5|n,i+=5,i>=8&&(i-=8,r[o++]=a>>>i)}return r},_r=e=>{let t=0,n=0,r=``;for(let i=0;i<e.length;i++)for(n=n<<8|e[i],t+=8;t>=5;)r+=hr[n>>>t-5&31],t-=5;return t>0&&(r+=hr[n<<5-t&31]),r},vr=e=>{e=e.replace(/ /g,``);let t=new ArrayBuffer(e.length/2),n=new Uint8Array(t);for(let t=0;t<e.length;t+=2)n[t/2]=parseInt(e.substring(t,t+2),16);return n},yr=e=>{let t=``;for(let n=0;n<e.length;n++){let r=e[n].toString(16);r.length===1&&(t+=`0`),t+=r}return t.toUpperCase()},br=e=>{let t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let t=0;t<e.length;t++)n[t]=e.charCodeAt(t)&255;return n},xr=e=>{let t=``;for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t},Sr=dr.TextEncoder?new dr.TextEncoder:null,Cr=dr.TextDecoder?new dr.TextDecoder:null,wr=e=>{if(!Sr)throw Error(`Encoding API not available`);return Sr.encode(e)},Tr=e=>{if(!Cr)throw Error(`Encoding API not available`);return Cr.decode(e)},Er=e=>{if(dr.crypto?.getRandomValues)return dr.crypto.getRandomValues(new Uint8Array(e));throw Error(`Cryptography API not available`)},Dr=class e{static fromLatin1(t){return new e({buffer:br(t).buffer})}static fromUTF8(t){return new e({buffer:wr(t).buffer})}static fromBase32(t){return new e({buffer:gr(t).buffer})}static fromHex(t){return new e({buffer:vr(t).buffer})}get buffer(){return this.bytes.buffer}get latin1(){return Object.defineProperty(this,"latin1",{enumerable:!0,writable:!1,configurable:!1,value:xr(this.bytes)}),this.latin1}get utf8(){return Object.defineProperty(this,"utf8",{enumerable:!0,writable:!1,configurable:!1,value:Tr(this.bytes)}),this.utf8}get base32(){return Object.defineProperty(this,"base32",{enumerable:!0,writable:!1,configurable:!1,value:_r(this.bytes)}),this.base32}get hex(){return Object.defineProperty(this,"hex",{enumerable:!0,writable:!1,configurable:!1,value:yr(this.bytes)}),this.hex}constructor({buffer:e,size:t=20}={}){this.bytes=e===void 0?Er(t):new Uint8Array(e),Object.defineProperty(this,"bytes",{enumerable:!0,writable:!1,configurable:!1,value:this.bytes})}},Or=(e,t)=>{{if(e.length!==t.length)throw TypeError(`Input strings must have the same length`);let n=-1,r=0;for(;++n<e.length;)r|=e.charCodeAt(n)^t.charCodeAt(n);return r===0}},kr=class e{static get defaults(){return{issuer:``,label:`OTPAuth`,issuerInLabel:!0,algorithm:`SHA1`,digits:6,counter:0,window:1}}static generate({secret:t,algorithm:n=e.defaults.algorithm,digits:r=e.defaults.digits,counter:i=e.defaults.counter,hmac:a=mr}){let o=jt(i),s=a(n,t.bytes,o);if(!s?.byteLength||s.byteLength<19)throw TypeError(`Return value must be at least 19 bytes`);let c=s[s.byteLength-1]&15;return(((s[c]&127)<<24|(s[c+1]&255)<<16|(s[c+2]&255)<<8|s[c+3]&255)%10**r).toString().padStart(r,`0`)}generate({counter:t=this.counter++}={}){return e.generate({secret:this.secret,algorithm:this.algorithm,digits:this.digits,counter:t,hmac:this.hmac})}static validate({token:t,secret:n,algorithm:r,digits:i=e.defaults.digits,counter:a=e.defaults.counter,window:o=e.defaults.window,hmac:s=mr}){if(t.length!==i)return null;let c=null,l=o=>{Or(t,e.generate({secret:n,algorithm:r,digits:i,counter:o,hmac:s}))&&(c=o-a)};l(a);for(let e=1;e<=o&&c===null&&(l(a-e),!(c!==null||(l(a+e),c!==null)));++e);return c}validate({token:t,counter:n=this.counter,window:r}){return e.validate({token:t,secret:this.secret,algorithm:this.algorithm,digits:this.digits,counter:n,window:r,hmac:this.hmac})}toString(){let e=encodeURIComponent;return`otpauth://hotp/${this.issuer.length>0?this.issuerInLabel?`${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?`}secret=${e(this.secret.base32)}&algorithm=${e(this.algorithm)}&digits=${e(this.digits)}&counter=${e(this.counter)}`}constructor({issuer:t=e.defaults.issuer,label:n=e.defaults.label,issuerInLabel:r=e.defaults.issuerInLabel,secret:i=new Dr,algorithm:a=e.defaults.algorithm,digits:o=e.defaults.digits,counter:s=e.defaults.counter,hmac:c}={}){this.issuer=t,this.label=n,this.issuerInLabel=r,this.secret=typeof i==`string`?Dr.fromBase32(i):i,this.algorithm=c?a:pr(a),this.digits=o,this.counter=s,this.hmac=c}},Ar=class e{static get defaults(){return{issuer:``,label:`OTPAuth`,issuerInLabel:!0,algorithm:`SHA1`,digits:6,period:30,window:1}}static counter({period:t=e.defaults.period,timestamp:n=Date.now()}={}){return Math.floor(n/1e3/t)}counter({timestamp:t=Date.now()}={}){return e.counter({period:this.period,timestamp:t})}static remaining({period:t=e.defaults.period,timestamp:n=Date.now()}={}){return t*1e3-n%(t*1e3)}remaining({timestamp:t=Date.now()}={}){return e.remaining({period:this.period,timestamp:t})}static generate({secret:t,algorithm:n,digits:r,period:i=e.defaults.period,timestamp:a=Date.now(),hmac:o}){return kr.generate({secret:t,algorithm:n,digits:r,counter:e.counter({period:i,timestamp:a}),hmac:o})}generate({timestamp:t=Date.now()}={}){return e.generate({secret:this.secret,algorithm:this.algorithm,digits:this.digits,period:this.period,timestamp:t,hmac:this.hmac})}static validate({token:t,secret:n,algorithm:r,digits:i,period:a=e.defaults.period,timestamp:o=Date.now(),window:s,hmac:c}){return kr.validate({token:t,secret:n,algorithm:r,digits:i,counter:e.counter({period:a,timestamp:o}),window:s,hmac:c})}validate({token:t,timestamp:n,window:r}){return e.validate({token:t,secret:this.secret,algorithm:this.algorithm,digits:this.digits,period:this.period,timestamp:n,window:r,hmac:this.hmac})}toString(){let e=encodeURIComponent;return`otpauth://totp/${this.issuer.length>0?this.issuerInLabel?`${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?`}secret=${e(this.secret.base32)}&algorithm=${e(this.algorithm)}&digits=${e(this.digits)}&period=${e(this.period)}`}constructor({issuer:t=e.defaults.issuer,label:n=e.defaults.label,issuerInLabel:r=e.defaults.issuerInLabel,secret:i=new Dr,algorithm:a=e.defaults.algorithm,digits:o=e.defaults.digits,period:s=e.defaults.period,hmac:c}={}){this.issuer=t,this.label=n,this.issuerInLabel=r,this.secret=typeof i==`string`?Dr.fromBase32(i):i,this.algorithm=c?a:pr(a),this.digits=o,this.period=s,this.hmac=c}},jr=o(((e,t)=>{t.exports=function(){return typeof Promise==`function`&&Promise.prototype&&Promise.prototype.then}})),Mr=o((e=>{var t,n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(e){if(!e)throw Error(`"version" cannot be null or undefined`);if(e<1||e>40)throw Error(`"version" should be in range from 1 to 40`);return e*4+17},e.getSymbolTotalCodewords=function(e){return n[e]},e.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t},e.setToSJISFunction=function(e){if(typeof e!=`function`)throw Error(`"toSJISFunc" is not a valid function.`);t=e},e.isKanjiModeEnabled=function(){return t!==void 0},e.toSJIS=function(e){return t(e)}})),Nr=o((e=>{e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`l`:case`low`:return e.L;case`m`:case`medium`:return e.M;case`q`:case`quartile`:return e.Q;case`h`:case`high`:return e.H;default:throw Error(`Unknown EC Level: `+t)}}e.isValid=function(e){return e&&e.bit!==void 0&&e.bit>=0&&e.bit<4},e.from=function(n,r){if(e.isValid(n))return n;try{return t(n)}catch{return r}}})),Pr=o(((e,t)=>{function n(){this.buffer=[],this.length=0}n.prototype={get:function(e){let t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)==1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},t.exports=n})),Fr=o(((e,t)=>{function n(e){if(!e||e<1)throw Error(`BitMatrix size must be defined and greater than 0`);this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}n.prototype.set=function(e,t,n,r){let i=e*this.size+t;this.data[i]=n,r&&(this.reservedBit[i]=!0)},n.prototype.get=function(e,t){return this.data[e*this.size+t]},n.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},n.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},t.exports=n})),Ir=o((e=>{var t=Mr().getSymbolSize;e.getRowColCoords=function(e){if(e===1)return[];let n=Math.floor(e/7)+2,r=t(e),i=r===145?26:Math.ceil((r-13)/(2*n-2))*2,a=[r-7];for(let e=1;e<n-1;e++)a[e]=a[e-1]-i;return a.push(6),a.reverse()},e.getPositions=function(t){let n=[],r=e.getRowColCoords(t),i=r.length;for(let e=0;e<i;e++)for(let t=0;t<i;t++)e===0&&t===0||e===0&&t===i-1||e===i-1&&t===0||n.push([r[e],r[t]]);return n}})),Lr=o((e=>{var t=Mr().getSymbolSize,n=7;e.getPositions=function(e){let r=t(e);return[[0,0],[r-n,0],[0,r-n]]}})),Rr=o((e=>{e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(e){return e!=null&&e!==``&&!isNaN(e)&&e>=0&&e<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(e){let n=e.size,r=0,i=0,a=0,o=null,s=null;for(let c=0;c<n;c++){i=a=0,o=s=null;for(let l=0;l<n;l++){let n=e.get(c,l);n===o?i++:(i>=5&&(r+=t.N1+(i-5)),o=n,i=1),n=e.get(l,c),n===s?a++:(a>=5&&(r+=t.N1+(a-5)),s=n,a=1)}i>=5&&(r+=t.N1+(i-5)),a>=5&&(r+=t.N1+(a-5))}return r},e.getPenaltyN2=function(e){let n=e.size,r=0;for(let t=0;t<n-1;t++)for(let i=0;i<n-1;i++){let n=e.get(t,i)+e.get(t,i+1)+e.get(t+1,i)+e.get(t+1,i+1);(n===4||n===0)&&r++}return r*t.N2},e.getPenaltyN3=function(e){let n=e.size,r=0,i=0,a=0;for(let t=0;t<n;t++){i=a=0;for(let o=0;o<n;o++)i=i<<1&2047|e.get(t,o),o>=10&&(i===1488||i===93)&&r++,a=a<<1&2047|e.get(o,t),o>=10&&(a===1488||a===93)&&r++}return r*t.N3},e.getPenaltyN4=function(e){let n=0,r=e.data.length;for(let t=0;t<r;t++)n+=e.data[t];return Math.abs(Math.ceil(n*100/r/5)-10)*t.N4};function n(t,n,r){switch(t){case e.Patterns.PATTERN000:return(n+r)%2==0;case e.Patterns.PATTERN001:return n%2==0;case e.Patterns.PATTERN010:return r%3==0;case e.Patterns.PATTERN011:return(n+r)%3==0;case e.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(r/3))%2==0;case e.Patterns.PATTERN101:return n*r%2+n*r%3==0;case e.Patterns.PATTERN110:return(n*r%2+n*r%3)%2==0;case e.Patterns.PATTERN111:return(n*r%3+(n+r)%2)%2==0;default:throw Error(`bad maskPattern:`+t)}}e.applyMask=function(e,t){let r=t.size;for(let i=0;i<r;i++)for(let a=0;a<r;a++)t.isReserved(a,i)||t.xor(a,i,n(e,a,i))},e.getBestMask=function(t,n){let r=Object.keys(e.Patterns).length,i=0,a=1/0;for(let o=0;o<r;o++){n(o),e.applyMask(o,t);let r=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(o,t),r<a&&(a=r,i=o)}return i}})),zr=o((e=>{var t=Nr(),n=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(e,r){switch(r){case t.L:return n[(e-1)*4+0];case t.M:return n[(e-1)*4+1];case t.Q:return n[(e-1)*4+2];case t.H:return n[(e-1)*4+3];default:return}},e.getTotalCodewordsCount=function(e,n){switch(n){case t.L:return r[(e-1)*4+0];case t.M:return r[(e-1)*4+1];case t.Q:return r[(e-1)*4+2];case t.H:return r[(e-1)*4+3];default:return}}})),Br=o((e=>{var t=new Uint8Array(512),n=new Uint8Array(256);(function(){let e=1;for(let r=0;r<255;r++)t[r]=e,n[e]=r,e<<=1,e&256&&(e^=285);for(let e=255;e<512;e++)t[e]=t[e-255]})(),e.log=function(e){if(e<1)throw Error(`log(`+e+`)`);return n[e]},e.exp=function(e){return t[e]},e.mul=function(e,r){return e===0||r===0?0:t[n[e]+n[r]]}})),Vr=o((e=>{var t=Br();e.mul=function(e,n){let r=new Uint8Array(e.length+n.length-1);for(let i=0;i<e.length;i++)for(let a=0;a<n.length;a++)r[i+a]^=t.mul(e[i],n[a]);return r},e.mod=function(e,n){let r=new Uint8Array(e);for(;r.length-n.length>=0;){let e=r[0];for(let i=0;i<n.length;i++)r[i]^=t.mul(n[i],e);let i=0;for(;i<r.length&&r[i]===0;)i++;r=r.slice(i)}return r},e.generateECPolynomial=function(n){let r=new Uint8Array([1]);for(let i=0;i<n;i++)r=e.mul(r,new Uint8Array([1,t.exp(i)]));return r}})),Hr=o(((e,t)=>{var n=Vr();function r(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}r.prototype.initialize=function(e){this.degree=e,this.genPoly=n.generateECPolynomial(this.degree)},r.prototype.encode=function(e){if(!this.genPoly)throw Error(`Encoder not initialized`);let t=new Uint8Array(e.length+this.degree);t.set(e);let r=n.mod(t,this.genPoly),i=this.degree-r.length;if(i>0){let e=new Uint8Array(this.degree);return e.set(r,i),e}return r},t.exports=r})),Ur=o((e=>{e.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}})),Wr=o((e=>{var t=`[0-9]+`,n=`[A-Z $%*+\\-./:]+`,r=`(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+`;r=r.replace(/u/g,`\\u`);var i=`(?:(?![A-Z0-9 $%*+\\-./:]|`+r+`)(?:.|[\r
]))+`;e.KANJI=new RegExp(r,`g`),e.BYTE_KANJI=RegExp(`[^A-Z0-9 $%*+\\-./:]+`,`g`),e.BYTE=new RegExp(i,`g`),e.NUMERIC=new RegExp(t,`g`),e.ALPHANUMERIC=new RegExp(n,`g`);var a=RegExp(`^`+r+`$`),o=RegExp(`^[0-9]+$`),s=RegExp(`^[A-Z0-9 $%*+\\-./:]+$`);e.testKanji=function(e){return a.test(e)},e.testNumeric=function(e){return o.test(e)},e.testAlphanumeric=function(e){return s.test(e)}})),Gr=o((e=>{var t=Ur(),n=Wr();e.NUMERIC={id:`Numeric`,bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:`Alphanumeric`,bit:2,ccBits:[9,11,13]},e.BYTE={id:`Byte`,bit:4,ccBits:[8,16,16]},e.KANJI={id:`Kanji`,bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(e,n){if(!e.ccBits)throw Error(`Invalid mode: `+e);if(!t.isValid(n))throw Error(`Invalid version: `+n);return n>=1&&n<10?e.ccBits[0]:n<27?e.ccBits[1]:e.ccBits[2]},e.getBestModeForData=function(t){return n.testNumeric(t)?e.NUMERIC:n.testAlphanumeric(t)?e.ALPHANUMERIC:n.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(e){if(e&&e.id)return e.id;throw Error(`Invalid mode`)},e.isValid=function(e){return e&&e.bit&&e.ccBits};function r(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`numeric`:return e.NUMERIC;case`alphanumeric`:return e.ALPHANUMERIC;case`kanji`:return e.KANJI;case`byte`:return e.BYTE;default:throw Error(`Unknown mode: `+t)}}e.from=function(t,n){if(e.isValid(t))return t;try{return r(t)}catch{return n}}})),Kr=o((e=>{var t=Mr(),n=zr(),r=Nr(),i=Gr(),a=Ur(),o=7973,s=t.getBCHDigit(o);function c(t,n,r){for(let i=1;i<=40;i++)if(n<=e.getCapacity(i,r,t))return i}function l(e,t){return i.getCharCountIndicator(e,t)+4}function u(e,t){let n=0;return e.forEach(function(e){let r=l(e.mode,t);n+=r+e.getBitsLength()}),n}function d(t,n){for(let r=1;r<=40;r++)if(u(t,r)<=e.getCapacity(r,n,i.MIXED))return r}e.from=function(e,t){return a.isValid(e)?parseInt(e,10):t},e.getCapacity=function(e,r,o){if(!a.isValid(e))throw Error(`Invalid QR Code version`);o===void 0&&(o=i.BYTE);let s=(t.getSymbolTotalCodewords(e)-n.getTotalCodewordsCount(e,r))*8;if(o===i.MIXED)return s;let c=s-l(o,e);switch(o){case i.NUMERIC:return Math.floor(c/10*3);case i.ALPHANUMERIC:return Math.floor(c/11*2);case i.KANJI:return Math.floor(c/13);case i.BYTE:default:return Math.floor(c/8)}},e.getBestVersionForData=function(e,t){let n,i=r.from(t,r.M);if(Array.isArray(e)){if(e.length>1)return d(e,i);if(e.length===0)return 1;n=e[0]}else n=e;return c(n.mode,n.getLength(),i)},e.getEncodedBits=function(e){if(!a.isValid(e)||e<7)throw Error(`Invalid QR Code version`);let n=e<<12;for(;t.getBCHDigit(n)-s>=0;)n^=o<<t.getBCHDigit(n)-s;return e<<12|n}})),qr=o((e=>{var t=Mr(),n=1335,r=21522,i=t.getBCHDigit(n);e.getEncodedBits=function(e,a){let o=e.bit<<3|a,s=o<<10;for(;t.getBCHDigit(s)-i>=0;)s^=n<<t.getBCHDigit(s)-i;return(o<<10|s)^r}})),Jr=o(((e,t)=>{var n=Gr();function r(e){this.mode=n.NUMERIC,this.data=e.toString()}r.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let t,n,r;for(t=0;t+3<=this.data.length;t+=3)n=this.data.substr(t,3),r=parseInt(n,10),e.put(r,10);let i=this.data.length-t;i>0&&(n=this.data.substr(t),r=parseInt(n,10),e.put(r,i*3+1))},t.exports=r})),Yr=o(((e,t)=>{var n=Gr(),r=`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:`.split(``);function i(e){this.mode=n.ALPHANUMERIC,this.data=e}i.getBitsLength=function(e){return 11*Math.floor(e/2)+e%2*6},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let n=r.indexOf(this.data[t])*45;n+=r.indexOf(this.data[t+1]),e.put(n,11)}this.data.length%2&&e.put(r.indexOf(this.data[t]),6)},t.exports=i})),Xr=o(((e,t)=>{var n=Gr();function r(e){this.mode=n.BYTE,typeof e==`string`?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}r.getBitsLength=function(e){return e*8},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},t.exports=r})),Zr=o(((e,t)=>{var n=Gr(),r=Mr();function i(e){this.mode=n.KANJI,this.data=e}i.getBitsLength=function(e){return e*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let n=r.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error(`Invalid SJIS character: `+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}},t.exports=i})),Qr=o(((e,t)=>{var n={single_source_shortest_paths:function(e,t,r){var i={},a={};a[t]=0;var o=n.PriorityQueue.make();o.push(t,0);for(var s,c,l,u,d,f,p,m,h;!o.empty();)for(l in s=o.pop(),c=s.value,u=s.cost,d=e[c]||{},d)d.hasOwnProperty(l)&&(f=d[l],p=u+f,m=a[l],h=a[l]===void 0,(h||m>p)&&(a[l]=p,o.push(l,p),i[l]=c));if(r!==void 0&&a[r]===void 0){var g=[`Could not find a path from `,t,` to `,r,`.`].join(``);throw Error(g)}return i},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],r=t;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,t,r){var i=n.single_source_shortest_paths(e,t,r);return n.extract_shortest_path_from_predecessor_list(i,r)},PriorityQueue:{make:function(e){var t=n.PriorityQueue,r={},i;for(i in e||={},t)t.hasOwnProperty(i)&&(r[i]=t[i]);return r.queue=[],r.sorter=e.sorter||t.default_sorter,r},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){var n={value:e,cost:t};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t!==void 0&&(t.exports=n)})),$r=o((e=>{var t=Gr(),n=Jr(),r=Yr(),i=Xr(),a=Zr(),o=Wr(),s=Mr(),c=Qr();function l(e){return unescape(encodeURIComponent(e)).length}function u(e,t,n){let r=[],i;for(;(i=e.exec(n))!==null;)r.push({data:i[0],index:i.index,mode:t,length:i[0].length});return r}function d(e){let n=u(o.NUMERIC,t.NUMERIC,e),r=u(o.ALPHANUMERIC,t.ALPHANUMERIC,e),i,a;return s.isKanjiModeEnabled()?(i=u(o.BYTE,t.BYTE,e),a=u(o.KANJI,t.KANJI,e)):(i=u(o.BYTE_KANJI,t.BYTE,e),a=[]),n.concat(r,i,a).sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function f(e,o){switch(o){case t.NUMERIC:return n.getBitsLength(e);case t.ALPHANUMERIC:return r.getBitsLength(e);case t.KANJI:return a.getBitsLength(e);case t.BYTE:return i.getBitsLength(e)}}function p(e){return e.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?(e[e.length-1].data+=t.data,e):(e.push(t),e)},[])}function m(e){let n=[];for(let r=0;r<e.length;r++){let i=e[r];switch(i.mode){case t.NUMERIC:n.push([i,{data:i.data,mode:t.ALPHANUMERIC,length:i.length},{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.ALPHANUMERIC:n.push([i,{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.KANJI:n.push([i,{data:i.data,mode:t.BYTE,length:l(i.data)}]);break;case t.BYTE:n.push([{data:i.data,mode:t.BYTE,length:l(i.data)}])}}return n}function h(e,n){let r={},i={start:{}},a=[`start`];for(let o=0;o<e.length;o++){let s=e[o],c=[];for(let e=0;e<s.length;e++){let l=s[e],u=``+o+e;c.push(u),r[u]={node:l,lastCount:0},i[u]={};for(let e=0;e<a.length;e++){let o=a[e];r[o]&&r[o].node.mode===l.mode?(i[o][u]=f(r[o].lastCount+l.length,l.mode)-f(r[o].lastCount,l.mode),r[o].lastCount+=l.length):(r[o]&&(r[o].lastCount=l.length),i[o][u]=f(l.length,l.mode)+4+t.getCharCountIndicator(l.mode,n))}}a=c}for(let e=0;e<a.length;e++)i[a[e]].end=0;return{map:i,table:r}}function g(e,o){let c,l=t.getBestModeForData(e);if(c=t.from(o,l),c!==t.BYTE&&c.bit<l.bit)throw Error(`"`+e+`" cannot be encoded with mode `+t.toString(c)+`.
 Suggested mode is: `+t.toString(l));switch(c===t.KANJI&&!s.isKanjiModeEnabled()&&(c=t.BYTE),c){case t.NUMERIC:return new n(e);case t.ALPHANUMERIC:return new r(e);case t.KANJI:return new a(e);case t.BYTE:return new i(e)}}e.fromArray=function(e){return e.reduce(function(e,t){return typeof t==`string`?e.push(g(t,null)):t.data&&e.push(g(t.data,t.mode)),e},[])},e.fromString=function(t,n){let r=h(m(d(t,s.isKanjiModeEnabled())),n),i=c.find_path(r.map,`start`,`end`),a=[];for(let e=1;e<i.length-1;e++)a.push(r.table[i[e]].node);return e.fromArray(p(a))},e.rawSplit=function(t){return e.fromArray(d(t,s.isKanjiModeEnabled()))}})),ei=o((e=>{var t=Mr(),n=Nr(),r=Pr(),i=Fr(),a=Ir(),o=Lr(),s=Rr(),c=zr(),l=Hr(),u=Kr(),d=qr(),f=Gr(),p=$r();function m(e,t){let n=e.size,r=o.getPositions(t);for(let t=0;t<r.length;t++){let i=r[t][0],a=r[t][1];for(let t=-1;t<=7;t++)if(!(i+t<=-1||n<=i+t))for(let r=-1;r<=7;r++)a+r<=-1||n<=a+r||(t>=0&&t<=6&&(r===0||r===6)||r>=0&&r<=6&&(t===0||t===6)||t>=2&&t<=4&&r>=2&&r<=4?e.set(i+t,a+r,!0,!0):e.set(i+t,a+r,!1,!0))}}function h(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}function g(e,t){let n=a.getPositions(t);for(let t=0;t<n.length;t++){let r=n[t][0],i=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)t===-2||t===2||n===-2||n===2||t===0&&n===0?e.set(r+t,i+n,!0,!0):e.set(r+t,i+n,!1,!0)}}function _(e,t){let n=e.size,r=u.getEncodedBits(t),i,a,o;for(let t=0;t<18;t++)i=Math.floor(t/3),a=t%3+n-8-3,o=(r>>t&1)==1,e.set(i,a,o,!0),e.set(a,i,o,!0)}function v(e,t,n){let r=e.size,i=d.getEncodedBits(t,n),a,o;for(a=0;a<15;a++)o=(i>>a&1)==1,a<6?e.set(a,8,o,!0):a<8?e.set(a+1,8,o,!0):e.set(r-15+a,8,o,!0),a<8?e.set(8,r-a-1,o,!0):a<9?e.set(8,15-a-1+1,o,!0):e.set(8,15-a-1,o,!0);e.set(r-8,8,1,!0)}function y(e,t){let n=e.size,r=-1,i=n-1,a=7,o=0;for(let s=n-1;s>0;s-=2)for(s===6&&s--;;){for(let n=0;n<2;n++)if(!e.isReserved(i,s-n)){let r=!1;o<t.length&&(r=(t[o]>>>a&1)==1),e.set(i,s-n,r),a--,a===-1&&(o++,a=7)}if(i+=r,i<0||n<=i){i-=r,r=-r;break}}}function b(e,n,i){let a=new r;i.forEach(function(t){a.put(t.mode.bit,4),a.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),t.write(a)});let o=(t.getSymbolTotalCodewords(e)-c.getTotalCodewordsCount(e,n))*8;for(a.getLengthInBits()+4<=o&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(0);let s=(o-a.getLengthInBits())/8;for(let e=0;e<s;e++)a.put(e%2?17:236,8);return x(a,e,n)}function x(e,n,r){let i=t.getSymbolTotalCodewords(n),a=i-c.getTotalCodewordsCount(n,r),o=c.getBlocksCount(n,r),s=o-i%o,u=Math.floor(i/o),d=Math.floor(a/o),f=d+1,p=u-d,m=new l(p),h=0,g=Array(o),_=Array(o),v=0,y=new Uint8Array(e.buffer);for(let e=0;e<o;e++){let t=e<s?d:f;g[e]=y.slice(h,h+t),_[e]=m.encode(g[e]),h+=t,v=Math.max(v,t)}let b=new Uint8Array(i),x=0,S,C;for(S=0;S<v;S++)for(C=0;C<o;C++)S<g[C].length&&(b[x++]=g[C][S]);for(S=0;S<p;S++)for(C=0;C<o;C++)b[x++]=_[C][S];return b}function S(e,n,r,a){let o;if(Array.isArray(e))o=p.fromArray(e);else if(typeof e==`string`){let t=n;if(!t){let n=p.rawSplit(e);t=u.getBestVersionForData(n,r)}o=p.fromString(e,t||40)}else throw Error(`Invalid data`);let c=u.getBestVersionForData(o,r);if(!c)throw Error(`The amount of data is too big to be stored in a QR Code`);if(!n)n=c;else if(n<c)throw Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+c+`.
`);let l=b(n,r,o),d=new i(t.getSymbolSize(n));return m(d,n),h(d),g(d,n),v(d,r,0),n>=7&&_(d,n),y(d,l),isNaN(a)&&(a=s.getBestMask(d,v.bind(null,d,r))),s.applyMask(a,d),v(d,r,a),{modules:d,version:n,errorCorrectionLevel:r,maskPattern:a,segments:o}}e.create=function(e,r){if(e===void 0||e===``)throw Error(`No input text`);let i=n.M,a,o;return r!==void 0&&(i=n.from(r.errorCorrectionLevel,n.M),a=u.from(r.version),o=s.from(r.maskPattern),r.toSJISFunc&&t.setToSJISFunction(r.toSJISFunc)),S(e,a,i,o)}})),ti=o((e=>{function t(e){if(typeof e==`number`&&(e=e.toString()),typeof e!=`string`)throw Error(`Color should be defined as hex string`);let t=e.slice().replace(`#`,``).split(``);if(t.length<3||t.length===5||t.length>8)throw Error(`Invalid hex color: `+e);(t.length===3||t.length===4)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),t.length===6&&t.push(`F`,`F`);let n=parseInt(t.join(``),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:`#`+t.slice(0,6).join(``)}}e.getOptions=function(e){e||={},e.color||={};let n=e.margin===void 0||e.margin===null||e.margin<0?4:e.margin,r=e.width&&e.width>=21?e.width:void 0,i=e.scale||4;return{width:r,scale:r?4:i,margin:n,color:{dark:t(e.color.dark||`#000000ff`),light:t(e.color.light||`#ffffffff`)},type:e.type,rendererOpts:e.rendererOpts||{}}},e.getScale=function(e,t){return t.width&&t.width>=e+t.margin*2?t.width/(e+t.margin*2):t.scale},e.getImageWidth=function(t,n){let r=e.getScale(t,n);return Math.floor((t+n.margin*2)*r)},e.qrToImageData=function(t,n,r){let i=n.modules.size,a=n.modules.data,o=e.getScale(i,r),s=Math.floor((i+r.margin*2)*o),c=r.margin*o,l=[r.color.light,r.color.dark];for(let e=0;e<s;e++)for(let n=0;n<s;n++){let u=(e*s+n)*4,d=r.color.light;if(e>=c&&n>=c&&e<s-c&&n<s-c){let t=Math.floor((e-c)/o),r=Math.floor((n-c)/o);d=l[+!!a[t*i+r]]}t[u++]=d.r,t[u++]=d.g,t[u++]=d.b,t[u]=d.a}}})),ni=o((e=>{var t=ti();function n(e,t,n){e.clearRect(0,0,t.width,t.height),t.style||={},t.height=n,t.width=n,t.style.height=n+`px`,t.style.width=n+`px`}function r(){try{return document.createElement(`canvas`)}catch{throw Error(`You need to specify a canvas element`)}}e.render=function(e,i,a){let o=a,s=i;o===void 0&&(!i||!i.getContext)&&(o=i,i=void 0),i||(s=r()),o=t.getOptions(o);let c=t.getImageWidth(e.modules.size,o),l=s.getContext(`2d`),u=l.createImageData(c,c);return t.qrToImageData(u.data,e,o),n(l,s,c),l.putImageData(u,0,0),s},e.renderToDataURL=function(t,n,r){let i=r;i===void 0&&(!n||!n.getContext)&&(i=n,n=void 0),i||={};let a=e.render(t,n,i),o=i.type||`image/png`,s=i.rendererOpts||{};return a.toDataURL(o,s.quality)}})),ri=o((e=>{var t=ti();function n(e,t){let n=e.a/255,r=t+`="`+e.hex+`"`;return n<1?r+` `+t+`-opacity="`+n.toFixed(2).slice(1)+`"`:r}function r(e,t,n){let r=e+t;return n!==void 0&&(r+=` `+n),r}function i(e,t,n){let i=``,a=0,o=!1,s=0;for(let c=0;c<e.length;c++){let l=Math.floor(c%t),u=Math.floor(c/t);!l&&!o&&(o=!0),e[c]?(s++,c>0&&l>0&&e[c-1]||(i+=o?r(`M`,l+n,.5+u+n):r(`m`,a,0),a=0,o=!1),l+1<t&&e[c+1]||(i+=r(`h`,s),s=0)):a++}return i}e.render=function(e,r,a){let o=t.getOptions(r),s=e.modules.size,c=e.modules.data,l=s+o.margin*2,u=o.color.light.a?`<path `+n(o.color.light,`fill`)+` d="M0 0h`+l+`v`+l+`H0z"/>`:``,d=`<path `+n(o.color.dark,`stroke`)+` d="`+i(c,s,o.margin)+`"/>`,f=`viewBox="0 0 `+l+` `+l+`"`,p=`<svg xmlns="http://www.w3.org/2000/svg" `+(o.width?`width="`+o.width+`" height="`+o.width+`" `:``)+f+` shape-rendering="crispEdges">`+u+d+`</svg>
`;return typeof a==`function`&&a(null,p),p}})),ii=c(o((e=>{var t=jr(),n=ei(),r=ni(),i=ri();function a(e,r,i,a,o){let s=[].slice.call(arguments,1),c=s.length,l=typeof s[c-1]==`function`;if(!l&&!t())throw Error(`Callback required as last argument`);if(l){if(c<2)throw Error(`Too few arguments provided`);c===2?(o=i,i=r,r=a=void 0):c===3&&(r.getContext&&o===void 0?(o=a,a=void 0):(o=a,a=i,i=r,r=void 0))}else{if(c<1)throw Error(`Too few arguments provided`);return c===1?(i=r,r=a=void 0):c===2&&!r.getContext&&(a=i,i=r,r=void 0),new Promise(function(t,o){try{t(e(n.create(i,a),r,a))}catch(e){o(e)}})}try{let t=n.create(i,a);o(null,e(t,r,a))}catch(e){o(e)}}e.create=n.create,e.toCanvas=a.bind(null,r.render),e.toDataURL=a.bind(null,r.renderToDataURL),e.toString=a.bind(null,function(e,t,n){return i.render(e,n)})}))(),1);function ai(){V.isDemoMode&&(localStorage.setItem(`ryzin_is_demo_mode`,`false`),V.isDemoMode=!1,V.STORAGE_KEY=`livecommerce_erp_data`,V._load());let e=document.createElement(`div`);return e.className=`login-container`,e.innerHTML=`
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
        border-color: #000000;
        box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
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
        background: #111111;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .login-btn:hover {
        transform: translateY(-2px);
        background: #000000;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
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
              <img src="${De}" alt="Ryzin Logo" />
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
              <img src="${De}" alt="Ryzin Logo" />
            </div>
            <div class="login-subtitle" style="margin-bottom: 16px;">보안 강화를 위해 2단계 인증을 완료해주세요.</div>
            
            <div id="otp-setup-container" style="display: none; text-align: center; margin-bottom: 20px;">

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
  `,setTimeout(()=>{let e=document.getElementById(`login-form`),t=document.getElementById(`otp-form`),n=document.getElementById(`login-slider`),r=document.getElementById(`btn-back`),i=document.getElementById(`btn-reset-otp`),a=document.getElementById(`otp-setup-container`),o=document.getElementById(`qrcode-box`),s=document.getElementById(`login-otp`),c=null,l=null;e&&e.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`login-id`).value.trim(),r=document.getElementById(`login-pw`).value;if(t.toLowerCase()===`admin`&&r.trim()===`1234`){V.loginAsDemo();return}let i=V.verifyPassword(t,r);if(i){if(V.isDemoMode){V.completeLogin(i),Y(`데모 모드로 접속되었습니다.`),u.navigate(`/`);return}if(localStorage.getItem(`ryzin_otp_trusted_${i.id}`)===`true`){V.completeLogin(i),Y(`환영합니다.`),u.navigate(`/`);return}if(c=i,i.otpSecret||localStorage.getItem(`ryzin_otp_${t}`))a.style.display=`none`;else{l=new Dr({size:20}).base32;let e=new Ar({issuer:`Ryzin Admin`,label:t,algorithm:`SHA1`,digits:6,period:30,secret:Dr.fromBase32(l)}).toString();a.style.display=`block`;try{o.innerHTML=`
                <div style="margin-bottom: 8px;">
                  <img src="${await ii.toDataURL(e,{margin:1,width:150})}" alt="QR Code" style="width: 150px; height: 150px; border-radius: 8px;">
                </div>
                <div style="font-size: 12px; color: var(--text-tertiary);">QR 스캔이 안된다면 아래 키를 입력하세요:</div>
                <div style="margin-top: 4px; font-size: 16px; color: var(--primary); font-weight: bold; user-select: all; letter-spacing: 1px;">${l}</div>
              `}catch{o.innerHTML=`설정 키<br><span style="color: var(--primary); user-select: all;">${l}</span>`}}n.style.transform=`translateX(-50%)`,setTimeout(()=>s.focus(),400)}else X(`로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.`)}),t&&t.addEventListener(`submit`,e=>{if(e.preventDefault(),!c)return;let t=s.value.trim(),n=c.otpSecret||localStorage.getItem(`ryzin_otp_${c.id}`),r=n||l;try{new Ar({issuer:`Ryzin Admin`,label:c.id,algorithm:`SHA1`,digits:6,period:30,secret:Dr.fromBase32(r)}).validate({token:t,window:1})===null?(X(`인증번호가 올바르지 않습니다.`),s.value=``,s.focus()):(!n&&l&&(localStorage.setItem(`ryzin_otp_${c.id}`,l),c.otpSecret=l,V.updateUser(c)),localStorage.setItem(`ryzin_otp_trusted_${c.id}`,`true`),V.completeLogin(c),Y(`OTP 인증 성공! 환영합니다.`),u.navigate(`/`))}catch{X(`인증 과정에 문제가 발생했습니다.`)}}),i&&i.addEventListener(`click`,()=>{c&&confirm(`OTP 설정을 초기화하시겠습니까? 기기에서 기존 계정을 삭제하고 새로 등록해야 합니다.`)&&(localStorage.removeItem(`ryzin_otp_${c.id}`),alert(`OTP 설정이 초기화되었습니다. 다시 로그인하여 새 QR 코드를 스캔하세요.`),n.style.transform=`translateX(0)`,c=null,s.value=``)}),r&&r.addEventListener(`click`,()=>{n.style.transform=`translateX(0)`,c=null,s.value=``})},0),e}async function oi(){let e=document.getElementById(`app`);if(e.innerHTML=`
    <div style="display:flex; align-items:center; justify-content:center; height:100vh;">
      <div style="width:48px; height:48px; border:4px solid rgba(0,0,0,0.05); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
      <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    </div>
  `,!await V.init()){e.innerHTML=`
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; gap:16px;">
        <div style="color:var(--danger); font-weight:600; font-size:var(--text-lg);">구글 시트 연동에 실패했습니다.</div>
        <div style="color:var(--text-secondary);">SheetDB API 주소나 네트워크 상태를 확인해주세요.</div>
      </div>
    `;return}let t=()=>{if(e.querySelector(`.sidebar`))return;e.innerHTML=``,e.className=`app-layout`,e.appendChild(Ae());let t=document.createElement(`div`);t.className=`mobile-overlay`,t.onclick=()=>document.querySelector(`.sidebar`).classList.remove(`open`),e.appendChild(t);let n=document.createElement(`button`);n.className=`mobile-menu-btn`,n.innerHTML=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,n.onclick=()=>document.querySelector(`.sidebar`).classList.toggle(`open`),e.appendChild(n);let r=document.createElement(`main`);r.className=`main-content`,r.id=`page-content`,e.appendChild(r),u.setContainer(r)};u.beforeEach(n=>{let r=!!V.getCurrentUser();return!r&&n!==`/login`?`/login`:r&&n===`/login`?`/`:(n===`/login`?(e.innerHTML=``,e.className=``,u.setContainer(e)):t(),!0)}),u.register(`/login`,()=>ai()),u.register(`/`,()=>He()),u.register(`/live_stream`,()=>Je()),u.register(`/projects`,()=>it()),u.register(`/projects/new`,()=>it()),u.register(`/projects/:id`,e=>ot(e)),u.register(`/hosts`,()=>Ye()),u.register(`/hosts/:id`,e=>Ze(e)),u.register(`/brands`,()=>et()),u.register(`/brands/:id`,e=>nt(e)),u.register(`/finance`,()=>gt()),u.register(`/settlement`,()=>_t()),u.register(`/contracts`,()=>bt()),u.register(`/marketing`,()=>wt()),u.register(`/crm`,()=>Tt()),u.register(`/settings`,()=>Et()),u.start(),document.addEventListener(`click`,e=>{let t=e.target.closest(`a[href]`);t&&t.getAttribute(`href`).startsWith(`/`)&&!t.getAttribute(`target`)&&(e.preventDefault(),u.navigate(t.getAttribute(`href`)))})}oi();