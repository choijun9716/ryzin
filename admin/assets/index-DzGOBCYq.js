var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),l=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error('Calling `require` for "'+e+"\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.")});(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=()=>{window.va||(window.va=function(...e){window.vaq||(window.vaq=[]),window.vaq.push(e)})},d=`@vercel/analytics`,f=`2.0.1`;function p(){return typeof window<`u`}function m(){return`production`}function h(e=`auto`){if(e===`auto`){window.vam=m();return}window.vam=e}function g(){return(p()?window.vam:m())||`production`}function _(){return g()===`development`}function v(e){return e.scriptSrc?b(e.scriptSrc):_()?`https://va.vercel-scripts.com/v1/script.debug.js`:e.basePath?b(`${e.basePath}/insights/script.js`):`/_vercel/insights/script.js`}function y(e,t){let n=e;if(t)try{n={...JSON.parse(t)?.analytics,...e}}catch{}h(n.mode);let r={sdkn:d+(n.framework?`/${n.framework}`:``),sdkv:f};return n.disableAutoTrack&&(r.disableAutoTrack=`1`),n.viewEndpoint&&(r.viewEndpoint=b(n.viewEndpoint)),n.eventEndpoint&&(r.eventEndpoint=b(n.eventEndpoint)),n.sessionEndpoint&&(r.sessionEndpoint=b(n.sessionEndpoint)),_()&&n.debug===!1&&(r.debug=`false`),n.dsn&&(r.dsn=n.dsn),n.endpoint?r.endpoint=n.endpoint:n.basePath&&(r.endpoint=b(`${n.basePath}/insights`)),{beforeSend:n.beforeSend,src:v(n),dataset:r}}function b(e){return e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`/`)?e:`/${e}`}function x(e={debug:!0},t){var n;if(!p())return;let{beforeSend:r,src:i,dataset:a}=y(e,t);if(u(),r&&((n=window.va)==null||n.call(window,`beforeSend`,r)),document.head.querySelector(`script[src*="${i}"]`))return;let o=document.createElement(`script`);o.src=i;for(let[e,t]of Object.entries(a))o.dataset[e]=t;o.defer=!0,o.onerror=()=>{let e=_()?`Please check if any ad blockers are enabled and try again.`:`Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.`;console.log(`[Vercel Web Analytics] Failed to load script from ${i}. ${e}`)},document.head.appendChild(o)}var S=()=>{window.si||(window.si=function(...e){window.siq=window.siq||[],window.siq.push(e)})},C=`@vercel/speed-insights`,w=`2.0.0`;function T(){return typeof window<`u`}function E(){return`production`}function D(){return E()===`development`}function O(e){return e.scriptSrc?A(e.scriptSrc):D()?`https://va.vercel-scripts.com/v1/speed-insights/script.debug.js`:e.dsn?`https://va.vercel-scripts.com/v1/speed-insights/script.js`:e.basePath?A(`${e.basePath}/speed-insights/script.js`):`/_vercel/speed-insights/script.js`}function k(e,t){let n=e;if(t)try{n={...JSON.parse(t)?.speedInsights,...e}}catch{}let r={sdkn:C+(n.framework?`/${n.framework}`:``),sdkv:w};return n.sampleRate&&(r.sampleRate=n.sampleRate.toString()),n.route&&(r.route=n.route),D()&&n.debug===!1&&(r.debug=`false`),n.dsn&&(r.dsn=n.dsn),n.endpoint?r.endpoint=A(n.endpoint):n.basePath&&(r.endpoint=A(`${n.basePath}/speed-insights/vitals`)),{src:O(n),beforeSend:n.beforeSend,dataset:r}}function A(e){return e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`/`)?e:`/${e}`}function j(e={},t){var n;if(!T()||e.route===null)return null;S();let{beforeSend:r,src:i,dataset:a}=k(e,t);if(document.head.querySelector(`script[src*="${i}"]`))return null;r&&((n=window.si)==null||n.call(window,`beforeSend`,r));let o=document.createElement(`script`);o.src=i,o.defer=!0;for(let[e,t]of Object.entries(a))o.dataset[e]=t;return o.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(o),{setRoute:e=>{o.dataset.route=e??void 0}}}var M=new class{constructor(){this._routes={},this._currentRoute=null,this._container=null,this._beforeHooks=[],window.addEventListener(`popstate`,()=>this._handleRoute()),window.addEventListener(`hashchange`,()=>this._handleRoute())}register(e,t){return this._routes[e]=t,this}beforeEach(e){return this._beforeHooks.push(e),this}setContainer(e){return this._container=e,this}navigate(e,t=!1){if(e===this._currentRoute)return;let n=`#`+e;t?window.location.replace(n):window.location.hash=n,this._handleRoute()}getCurrentPath(){let e=window.location.hash.slice(1)||`/`;return e.startsWith(`/`)||(e=`/`+e),e}_handleRoute(){let e=this.getCurrentPath();this._currentRoute=e;let t=null,n={};for(let[r,i]of Object.entries(this._routes)){let a=this._matchRoute(r,e);if(a){t=i,n=a.params;break}}for(let t of this._beforeHooks){let n=t(e);if(n===!1)return;if(typeof n==`string`){this.navigate(n,!0);return}}if(!t){this.navigate(`/`,!0);return}if(this._updateSidebarActive(e),this._container){this._container.innerHTML=``;let e=t(n);typeof e==`string`?this._container.innerHTML=e:e instanceof HTMLElement&&this._container.appendChild(e)}}_matchRoute(e,t){let n=e.split(`/`).filter(Boolean),r=t.split(`/`).filter(Boolean);if(n.length!==r.length)return null;let i={};for(let e=0;e<n.length;e++)if(n[e].startsWith(`:`))i[n[e].substring(1)]=decodeURIComponent(r[e]);else if(n[e]!==r[e])return null;return{params:i}}_updateSidebarActive(e){document.querySelectorAll(`.sidebar-item`).forEach(t=>{t.classList.remove(`active`);let n=t.getAttribute(`data-href`);(n===`/`&&e===`/`||n!==`/`&&e.startsWith(n))&&t.classList.add(`active`)})}start(){this._handleRoute()}},N=[{key:`scheduled`,label:`일정부킹`,color:`indigo`},{key:`host_cast`,label:`쇼호스트 선정`,color:`rose`},{key:`tech_request`,label:`기술서요청`,color:`purple`},{key:`design`,label:`디자인진행`,color:`orange`},{key:`cue_sheet`,label:`큐시트작성`,color:`yellow`},{key:`done`,label:`방송종료`,color:`gray`}],P=[{key:`wait`,label:`대기`,color:`orange`},{key:`done`,label:`완료`,color:`green`}],ee=[`네이버`,`카카오`,`쿠팡`,`그립`,`자사몰`,`유튜브`,`틱톡`],te=[{key:`new`,label:`신규문의`,color:`blue`},{key:`quote`,label:`견적발송`,color:`orange`},{key:`meeting`,label:`미팅진행`,color:`purple`},{key:`contract`,label:`계약완료`,color:`green`},{key:`hold`,label:`보류/취소`,color:`gray`}],ne=[{key:`S`,label:`S급 (VIP)`},{key:`A`,label:`A급 (주요)`},{key:`B`,label:`B급 (일반)`},{key:`C`,label:`C급 (잠재)`}],F=[{key:`kakao`,label:`카카오톡`,icon:``},{key:`phone`,label:`전화`,icon:``},{key:`sms`,label:`문자`,icon:``},{key:`email`,label:`이메일`,icon:``},{key:`meeting`,label:`미팅`,icon:``}],re=[`뷰티`,`패션`,`식품`,`가전`,`생활`,`건강`,`유아`,`반려동물`,`기타`],ie=[{key:`main`,label:`메인 쇼호스트`},{key:`sub`,label:`서브 쇼호스트`},{key:`guest`,label:`게스트`}],ae=[{key:`requested`,label:`요청`},{key:`working`,label:`작업중`},{key:`reviewing`,label:`검수중`},{key:`done`,label:`완료`}],oe={admin:{label:`대표`,permissions:[`*`]},pd:{label:`PD`,permissions:[`dashboard`,`projects`,`products`,`hosts`,`brands`]},designer:{label:`디자이너`,permissions:[`dashboard`,`projects.design`]},accountant:{label:`회계`,permissions:[`dashboard`,`finance`,`settlement`,`projects.finance`]},demo:{label:`데모 계정`,permissions:[`*`]}},se=[`국민은행`,`신한은행`,`우리은행`,`하나은행`,`IBK기업은행`,`NH농협은행`,`카카오뱅크`,`토스뱅크`,`SC제일은행`,`대구은행`,`부산은행`,`광주은행`,`전북은행`,`경남은행`,`제주은행`,`수협은행`,`새마을금고`,`신협`,`우체국`];function I(e=``){let t=Date.now().toString(36),n=Math.random().toString(36).substr(2,5);return e?`${e}_${t}${n}`:`${t}${n}`}function L(e){let t=N.find(t=>t.key===e);return t?t.label:e}function R(e){let t=P.find(t=>t.key===e);return t?t.label:e}function z(e){let t=N.find(t=>t.label===e);return t?t.key:`done`}function ce(e){let t=P.find(t=>t.label===e);return t?t.key:`wait`}var le=o(((e,t)=>{t.exports={}})),B=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r():typeof define==`function`&&define.amd?define([],r):n.CryptoJS=r()})(e,function(){var e=e||function(e,t){var n;if(typeof window<`u`&&window.crypto&&(n=window.crypto),typeof self<`u`&&self.crypto&&(n=self.crypto),typeof globalThis<`u`&&globalThis.crypto&&(n=globalThis.crypto),!n&&typeof window<`u`&&window.msCrypto&&(n=window.msCrypto),!n&&typeof global<`u`&&global.crypto&&(n=global.crypto),!n&&typeof l==`function`)try{n=le()}catch{}var r=function(){if(n){if(typeof n.getRandomValues==`function`)try{return n.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof n.randomBytes==`function`)try{return n.randomBytes(4).readInt32LE()}catch{}}throw Error(`Native crypto module could not be used to get secure random number.`)},i=Object.create||function(){function e(){}return function(t){var n;return e.prototype=t,n=new e,e.prototype=null,n}}(),a={},o=a.lib={},s=o.Base=function(){return{extend:function(e){var t=i(this);return e&&t.mixIn(e),(!t.hasOwnProperty(`init`)||this.init===t.init)&&(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty(`toString`)&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),c=o.WordArray=s.extend({init:function(e,n){e=this.words=e||[],n==t?this.sigBytes=e.length*4:this.sigBytes=n},toString:function(e){return(e||d).stringify(this)},concat:function(e){var t=this.words,n=e.words,r=this.sigBytes,i=e.sigBytes;if(this.clamp(),r%4)for(var a=0;a<i;a++){var o=n[a>>>2]>>>24-a%4*8&255;t[r+a>>>2]|=o<<24-(r+a)%4*8}else for(var s=0;s<i;s+=4)t[r+s>>>2]=n[s>>>2];return this.sigBytes+=i,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-n%4*8,t.length=e.ceil(n/4)},clone:function(){var e=s.clone.call(this);return e.words=this.words.slice(0),e},random:function(e){for(var t=[],n=0;n<e;n+=4)t.push(r());return new c.init(t,e)}}),u=a.enc={},d=u.Hex={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i++){var a=t[i>>>2]>>>24-i%4*8&255;r.push((a>>>4).toString(16)),r.push((a&15).toString(16))}return r.join(``)},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r+=2)n[r>>>3]|=parseInt(e.substr(r,2),16)<<24-r%8*4;return new c.init(n,t/2)}},f=u.Latin1={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i++){var a=t[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(a))}return r.join(``)},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r++)n[r>>>2]|=(e.charCodeAt(r)&255)<<24-r%4*8;return new c.init(n,t)}},p=u.Utf8={stringify:function(e){try{return decodeURIComponent(escape(f.stringify(e)))}catch{throw Error(`Malformed UTF-8 data`)}},parse:function(e){return f.parse(unescape(encodeURIComponent(e)))}},m=o.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new c.init,this._nDataBytes=0},_append:function(e){typeof e==`string`&&(e=p.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var n,r=this._data,i=r.words,a=r.sigBytes,o=this.blockSize,s=a/(o*4);s=t?e.ceil(s):e.max((s|0)-this._minBufferSize,0);var l=s*o,u=e.min(l*4,a);if(l){for(var d=0;d<l;d+=o)this._doProcessBlock(i,d);n=i.splice(0,l),r.sigBytes-=u}return new c.init(n,u)},clone:function(){var e=s.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});o.Hasher=m.extend({cfg:s.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){m.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:512/32,_createHelper:function(e){return function(t,n){return new e.init(n).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return new h.HMAC.init(e,n).finalize(t)}}});var h=a.algo={};return a}(Math);return e})})),ue=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.Base,a=r.WordArray,o=n.x64={};o.Word=i.extend({init:function(e,t){this.high=e,this.low=t}}),o.WordArray=i.extend({init:function(e,n){e=this.words=e||[],n==t?this.sigBytes=e.length*8:this.sigBytes=n},toX32:function(){for(var e=this.words,t=e.length,n=[],r=0;r<t;r++){var i=e[r];n.push(i.high),n.push(i.low)}return a.create(n,this.sigBytes)},clone:function(){for(var e=i.clone.call(this),t=e.words=this.words.slice(0),n=t.length,r=0;r<n;r++)t[r]=t[r].clone();return e}})})(),e})})),de=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){if(typeof ArrayBuffer==`function`){var t=e.lib.WordArray,n=t.init,r=t.init=function(e){if(e instanceof ArrayBuffer&&(e=new Uint8Array(e)),(e instanceof Int8Array||typeof Uint8ClampedArray<`u`&&e instanceof Uint8ClampedArray||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array)&&(e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),e instanceof Uint8Array){for(var t=e.byteLength,r=[],i=0;i<t;i++)r[i>>>2]|=e[i]<<24-i%4*8;n.call(this,r,t)}else n.apply(this,arguments)};r.prototype=t}})(),e.lib.WordArray})})),fe=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.enc;r.Utf16=r.Utf16BE={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i+=2){var a=t[i>>>2]>>>16-i%4*8&65535;r.push(String.fromCharCode(a))}return r.join(``)},parse:function(e){for(var t=e.length,r=[],i=0;i<t;i++)r[i>>>1]|=e.charCodeAt(i)<<16-i%2*16;return n.create(r,t*2)}},r.Utf16LE={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],a=0;a<n;a+=2){var o=i(t[a>>>2]>>>16-a%4*8&65535);r.push(String.fromCharCode(o))}return r.join(``)},parse:function(e){for(var t=e.length,r=[],a=0;a<t;a++)r[a>>>1]|=i(e.charCodeAt(a)<<16-a%2*16);return n.create(r,t*2)}};function i(e){return e<<8&4278255360|e>>>8&16711935}})(),e.enc.Utf16})})),pe=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.enc;r.Base64={stringify:function(e){var t=e.words,n=e.sigBytes,r=this._map;e.clamp();for(var i=[],a=0;a<n;a+=3)for(var o=t[a>>>2]>>>24-a%4*8&255,s=t[a+1>>>2]>>>24-(a+1)%4*8&255,c=t[a+2>>>2]>>>24-(a+2)%4*8&255,l=o<<16|s<<8|c,u=0;u<4&&a+u*.75<n;u++)i.push(r.charAt(l>>>6*(3-u)&63));var d=r.charAt(64);if(d)for(;i.length%4;)i.push(d);return i.join(``)},parse:function(e){var t=e.length,n=this._map,r=this._reverseMap;if(!r){r=this._reverseMap=[];for(var a=0;a<n.length;a++)r[n.charCodeAt(a)]=a}var o=n.charAt(64);if(o){var s=e.indexOf(o);s!==-1&&(t=s)}return i(e,t,r)},_map:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`};function i(e,t,r){for(var i=[],a=0,o=0;o<t;o++)if(o%4){var s=r[e.charCodeAt(o-1)]<<o%4*2|r[e.charCodeAt(o)]>>>6-o%4*2;i[a>>>2]|=s<<24-a%4*8,a++}return n.create(i,a)}})(),e.enc.Base64})})),me=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.enc;r.Base64url={stringify:function(e,t){t===void 0&&(t=!0);var n=e.words,r=e.sigBytes,i=t?this._safe_map:this._map;e.clamp();for(var a=[],o=0;o<r;o+=3)for(var s=n[o>>>2]>>>24-o%4*8&255,c=n[o+1>>>2]>>>24-(o+1)%4*8&255,l=n[o+2>>>2]>>>24-(o+2)%4*8&255,u=s<<16|c<<8|l,d=0;d<4&&o+d*.75<r;d++)a.push(i.charAt(u>>>6*(3-d)&63));var f=i.charAt(64);if(f)for(;a.length%4;)a.push(f);return a.join(``)},parse:function(e,t){t===void 0&&(t=!0);var n=e.length,r=t?this._safe_map:this._map,a=this._reverseMap;if(!a){a=this._reverseMap=[];for(var o=0;o<r.length;o++)a[r.charCodeAt(o)]=o}var s=r.charAt(64);if(s){var c=e.indexOf(s);c!==-1&&(n=c)}return i(e,n,a)},_map:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,_safe_map:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`};function i(e,t,r){for(var i=[],a=0,o=0;o<t;o++)if(o%4){var s=r[e.charCodeAt(o-1)]<<o%4*2|r[e.charCodeAt(o)]>>>6-o%4*2;i[a>>>2]|=s<<24-a%4*8,a++}return n.create(i,a)}})(),e.enc.Base64url})})),V=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.algo,s=[];(function(){for(var e=0;e<64;e++)s[e]=t.abs(t.sin(e+1))*4294967296|0})();var c=o.MD5=a.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var n=0;n<16;n++){var r=t+n,i=e[r];e[r]=(i<<8|i>>>24)&16711935|(i<<24|i>>>8)&4278255360}var a=this._hash.words,o=e[t+0],c=e[t+1],p=e[t+2],m=e[t+3],h=e[t+4],g=e[t+5],_=e[t+6],v=e[t+7],y=e[t+8],b=e[t+9],x=e[t+10],S=e[t+11],C=e[t+12],w=e[t+13],T=e[t+14],E=e[t+15],D=a[0],O=a[1],k=a[2],A=a[3];D=l(D,O,k,A,o,7,s[0]),A=l(A,D,O,k,c,12,s[1]),k=l(k,A,D,O,p,17,s[2]),O=l(O,k,A,D,m,22,s[3]),D=l(D,O,k,A,h,7,s[4]),A=l(A,D,O,k,g,12,s[5]),k=l(k,A,D,O,_,17,s[6]),O=l(O,k,A,D,v,22,s[7]),D=l(D,O,k,A,y,7,s[8]),A=l(A,D,O,k,b,12,s[9]),k=l(k,A,D,O,x,17,s[10]),O=l(O,k,A,D,S,22,s[11]),D=l(D,O,k,A,C,7,s[12]),A=l(A,D,O,k,w,12,s[13]),k=l(k,A,D,O,T,17,s[14]),O=l(O,k,A,D,E,22,s[15]),D=u(D,O,k,A,c,5,s[16]),A=u(A,D,O,k,_,9,s[17]),k=u(k,A,D,O,S,14,s[18]),O=u(O,k,A,D,o,20,s[19]),D=u(D,O,k,A,g,5,s[20]),A=u(A,D,O,k,x,9,s[21]),k=u(k,A,D,O,E,14,s[22]),O=u(O,k,A,D,h,20,s[23]),D=u(D,O,k,A,b,5,s[24]),A=u(A,D,O,k,T,9,s[25]),k=u(k,A,D,O,m,14,s[26]),O=u(O,k,A,D,y,20,s[27]),D=u(D,O,k,A,w,5,s[28]),A=u(A,D,O,k,p,9,s[29]),k=u(k,A,D,O,v,14,s[30]),O=u(O,k,A,D,C,20,s[31]),D=d(D,O,k,A,g,4,s[32]),A=d(A,D,O,k,y,11,s[33]),k=d(k,A,D,O,S,16,s[34]),O=d(O,k,A,D,T,23,s[35]),D=d(D,O,k,A,c,4,s[36]),A=d(A,D,O,k,h,11,s[37]),k=d(k,A,D,O,v,16,s[38]),O=d(O,k,A,D,x,23,s[39]),D=d(D,O,k,A,w,4,s[40]),A=d(A,D,O,k,o,11,s[41]),k=d(k,A,D,O,m,16,s[42]),O=d(O,k,A,D,_,23,s[43]),D=d(D,O,k,A,b,4,s[44]),A=d(A,D,O,k,C,11,s[45]),k=d(k,A,D,O,E,16,s[46]),O=d(O,k,A,D,p,23,s[47]),D=f(D,O,k,A,o,6,s[48]),A=f(A,D,O,k,v,10,s[49]),k=f(k,A,D,O,T,15,s[50]),O=f(O,k,A,D,g,21,s[51]),D=f(D,O,k,A,C,6,s[52]),A=f(A,D,O,k,m,10,s[53]),k=f(k,A,D,O,x,15,s[54]),O=f(O,k,A,D,c,21,s[55]),D=f(D,O,k,A,y,6,s[56]),A=f(A,D,O,k,E,10,s[57]),k=f(k,A,D,O,_,15,s[58]),O=f(O,k,A,D,w,21,s[59]),D=f(D,O,k,A,h,6,s[60]),A=f(A,D,O,k,S,10,s[61]),k=f(k,A,D,O,p,15,s[62]),O=f(O,k,A,D,b,21,s[63]),a[0]=a[0]+D|0,a[1]=a[1]+O|0,a[2]=a[2]+k|0,a[3]=a[3]+A|0},_doFinalize:function(){var e=this._data,n=e.words,r=this._nDataBytes*8,i=e.sigBytes*8;n[i>>>5]|=128<<24-i%32;var a=t.floor(r/4294967296),o=r;n[(i+64>>>9<<4)+15]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360,n[(i+64>>>9<<4)+14]=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,e.sigBytes=(n.length+1)*4,this._process();for(var s=this._hash,c=s.words,l=0;l<4;l++){var u=c[l];c[l]=(u<<8|u>>>24)&16711935|(u<<24|u>>>8)&4278255360}return s},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});function l(e,t,n,r,i,a,o){var s=e+(t&n|~t&r)+i+o;return(s<<a|s>>>32-a)+t}function u(e,t,n,r,i,a,o){var s=e+(t&r|n&~r)+i+o;return(s<<a|s>>>32-a)+t}function d(e,t,n,r,i,a,o){var s=e+(t^n^r)+i+o;return(s<<a|s>>>32-a)+t}function f(e,t,n,r,i,a,o){var s=e+(n^(t|~r))+i+o;return(s<<a|s>>>32-a)+t}n.MD5=a._createHelper(c),n.HmacMD5=a._createHmacHelper(c)})(Math),e.MD5})})),he=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.WordArray,i=n.Hasher,a=t.algo,o=[],s=a.SHA1=i.extend({_doReset:function(){this._hash=new r.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],a=n[2],s=n[3],c=n[4],l=0;l<80;l++){if(l<16)o[l]=e[t+l]|0;else{var u=o[l-3]^o[l-8]^o[l-14]^o[l-16];o[l]=u<<1|u>>>31}var d=(r<<5|r>>>27)+c+o[l];l<20?d+=(i&a|~i&s)+1518500249:l<40?d+=(i^a^s)+1859775393:l<60?d+=(i&a|i&s|a&s)-1894007588:d+=(i^a^s)-899497514,c=s,s=a,a=i<<30|i>>>2,i=r,r=d}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+a|0,n[3]=n[3]+s|0,n[4]=n[4]+c|0},_doFinalize:function(){var e=this._data,t=e.words,n=this._nDataBytes*8,r=e.sigBytes*8;return t[r>>>5]|=128<<24-r%32,t[(r+64>>>9<<4)+14]=Math.floor(n/4294967296),t[(r+64>>>9<<4)+15]=n,e.sigBytes=t.length*4,this._process(),this._hash},clone:function(){var e=i.clone.call(this);return e._hash=this._hash.clone(),e}});t.SHA1=i._createHelper(s),t.HmacSHA1=i._createHmacHelper(s)})(),e.SHA1})})),ge=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.algo,s=[],c=[];(function(){function e(e){for(var n=t.sqrt(e),r=2;r<=n;r++)if(!(e%r))return!1;return!0}function n(e){return(e-(e|0))*4294967296|0}for(var r=2,i=0;i<64;)e(r)&&(i<8&&(s[i]=n(t.pow(r,1/2))),c[i]=n(t.pow(r,1/3)),i++),r++})();var l=[],u=o.SHA256=a.extend({_doReset:function(){this._hash=new i.init(s.slice(0))},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],u=n[5],d=n[6],f=n[7],p=0;p<64;p++){if(p<16)l[p]=e[t+p]|0;else{var m=l[p-15],h=(m<<25|m>>>7)^(m<<14|m>>>18)^m>>>3,g=l[p-2],_=(g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10;l[p]=h+l[p-7]+_+l[p-16]}var v=s&u^~s&d,y=r&i^r&a^i&a,b=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),x=(s<<26|s>>>6)^(s<<21|s>>>11)^(s<<7|s>>>25),S=f+x+v+c[p]+l[p],C=b+y;f=d,d=u,u=s,s=o+S|0,o=a,a=i,i=r,r=S+C|0}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+a|0,n[3]=n[3]+o|0,n[4]=n[4]+s|0,n[5]=n[5]+u|0,n[6]=n[6]+d|0,n[7]=n[7]+f|0},_doFinalize:function(){var e=this._data,n=e.words,r=this._nDataBytes*8,i=e.sigBytes*8;return n[i>>>5]|=128<<24-i%32,n[(i+64>>>9<<4)+14]=t.floor(r/4294967296),n[(i+64>>>9<<4)+15]=r,e.sigBytes=n.length*4,this._process(),this._hash},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});n.SHA256=a._createHelper(u),n.HmacSHA256=a._createHmacHelper(u)})(Math),e.SHA256})})),_e=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ge()):typeof define==`function`&&define.amd?define([`./core`,`./sha256`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.algo,i=r.SHA256,a=r.SHA224=i.extend({_doReset:function(){this._hash=new n.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var e=i._doFinalize.call(this);return e.sigBytes-=4,e}});t.SHA224=i._createHelper(a),t.HmacSHA224=i._createHmacHelper(a)})(),e.SHA224})})),ve=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ue()):typeof define==`function`&&define.amd?define([`./core`,`./x64-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.Hasher,r=t.x64,i=r.Word,a=r.WordArray,o=t.algo;function s(){return i.create.apply(i,arguments)}var c=[s(1116352408,3609767458),s(1899447441,602891725),s(3049323471,3964484399),s(3921009573,2173295548),s(961987163,4081628472),s(1508970993,3053834265),s(2453635748,2937671579),s(2870763221,3664609560),s(3624381080,2734883394),s(310598401,1164996542),s(607225278,1323610764),s(1426881987,3590304994),s(1925078388,4068182383),s(2162078206,991336113),s(2614888103,633803317),s(3248222580,3479774868),s(3835390401,2666613458),s(4022224774,944711139),s(264347078,2341262773),s(604807628,2007800933),s(770255983,1495990901),s(1249150122,1856431235),s(1555081692,3175218132),s(1996064986,2198950837),s(2554220882,3999719339),s(2821834349,766784016),s(2952996808,2566594879),s(3210313671,3203337956),s(3336571891,1034457026),s(3584528711,2466948901),s(113926993,3758326383),s(338241895,168717936),s(666307205,1188179964),s(773529912,1546045734),s(1294757372,1522805485),s(1396182291,2643833823),s(1695183700,2343527390),s(1986661051,1014477480),s(2177026350,1206759142),s(2456956037,344077627),s(2730485921,1290863460),s(2820302411,3158454273),s(3259730800,3505952657),s(3345764771,106217008),s(3516065817,3606008344),s(3600352804,1432725776),s(4094571909,1467031594),s(275423344,851169720),s(430227734,3100823752),s(506948616,1363258195),s(659060556,3750685593),s(883997877,3785050280),s(958139571,3318307427),s(1322822218,3812723403),s(1537002063,2003034995),s(1747873779,3602036899),s(1955562222,1575990012),s(2024104815,1125592928),s(2227730452,2716904306),s(2361852424,442776044),s(2428436474,593698344),s(2756734187,3733110249),s(3204031479,2999351573),s(3329325298,3815920427),s(3391569614,3928383900),s(3515267271,566280711),s(3940187606,3454069534),s(4118630271,4000239992),s(116418474,1914138554),s(174292421,2731055270),s(289380356,3203993006),s(460393269,320620315),s(685471733,587496836),s(852142971,1086792851),s(1017036298,365543100),s(1126000580,2618297676),s(1288033470,3409855158),s(1501505948,4234509866),s(1607167915,987167468),s(1816402316,1246189591)],l=[];(function(){for(var e=0;e<80;e++)l[e]=s()})();var u=o.SHA512=n.extend({_doReset:function(){this._hash=new a.init([new i.init(1779033703,4089235720),new i.init(3144134277,2227873595),new i.init(1013904242,4271175723),new i.init(2773480762,1595750129),new i.init(1359893119,2917565137),new i.init(2600822924,725511199),new i.init(528734635,4215389547),new i.init(1541459225,327033209)])},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],u=n[5],d=n[6],f=n[7],p=r.high,m=r.low,h=i.high,g=i.low,_=a.high,v=a.low,y=o.high,b=o.low,x=s.high,S=s.low,C=u.high,w=u.low,T=d.high,E=d.low,D=f.high,O=f.low,k=p,A=m,j=h,M=g,N=_,P=v,ee=y,te=b,ne=x,F=S,re=C,ie=w,ae=T,oe=E,se=D,I=O,L=0;L<80;L++){var R,z,ce=l[L];if(L<16)z=ce.high=e[t+L*2]|0,R=ce.low=e[t+L*2+1]|0;else{var le=l[L-15],B=le.high,ue=le.low,de=(B>>>1|ue<<31)^(B>>>8|ue<<24)^B>>>7,fe=(ue>>>1|B<<31)^(ue>>>8|B<<24)^(ue>>>7|B<<25),pe=l[L-2],me=pe.high,V=pe.low,he=(me>>>19|V<<13)^(me<<3|V>>>29)^me>>>6,ge=(V>>>19|me<<13)^(V<<3|me>>>29)^(V>>>6|me<<26),_e=l[L-7],ve=_e.high,ye=_e.low,be=l[L-16],xe=be.high,Se=be.low;R=fe+ye,z=de+ve+ +(R>>>0<fe>>>0),R+=ge,z=z+he+ +(R>>>0<ge>>>0),R+=Se,z=z+xe+ +(R>>>0<Se>>>0),ce.high=z,ce.low=R}var Ce=ne&re^~ne&ae,we=F&ie^~F&oe,H=k&j^k&N^j&N,Te=A&M^A&P^M&P,Ee=(k>>>28|A<<4)^(k<<30|A>>>2)^(k<<25|A>>>7),De=(A>>>28|k<<4)^(A<<30|k>>>2)^(A<<25|k>>>7),Oe=(ne>>>14|F<<18)^(ne>>>18|F<<14)^(ne<<23|F>>>9),ke=(F>>>14|ne<<18)^(F>>>18|ne<<14)^(F<<23|ne>>>9),Ae=c[L],je=Ae.high,Me=Ae.low,Ne=I+ke,Pe=se+Oe+ +(Ne>>>0<I>>>0),Ne=Ne+we,Pe=Pe+Ce+ +(Ne>>>0<we>>>0),Ne=Ne+Me,Pe=Pe+je+ +(Ne>>>0<Me>>>0),Ne=Ne+R,Pe=Pe+z+ +(Ne>>>0<R>>>0),Fe=De+Te,Ie=Ee+H+ +(Fe>>>0<De>>>0);se=ae,I=oe,ae=re,oe=ie,re=ne,ie=F,F=te+Ne|0,ne=ee+Pe+ +(F>>>0<te>>>0)|0,ee=N,te=P,N=j,P=M,j=k,M=A,A=Ne+Fe|0,k=Pe+Ie+ +(A>>>0<Ne>>>0)|0}m=r.low=m+A,r.high=p+k+ +(m>>>0<A>>>0),g=i.low=g+M,i.high=h+j+ +(g>>>0<M>>>0),v=a.low=v+P,a.high=_+N+ +(v>>>0<P>>>0),b=o.low=b+te,o.high=y+ee+ +(b>>>0<te>>>0),S=s.low=S+F,s.high=x+ne+ +(S>>>0<F>>>0),w=u.low=w+ie,u.high=C+re+ +(w>>>0<ie>>>0),E=d.low=E+oe,d.high=T+ae+ +(E>>>0<oe>>>0),O=f.low=O+I,f.high=D+se+ +(O>>>0<I>>>0)},_doFinalize:function(){var e=this._data,t=e.words,n=this._nDataBytes*8,r=e.sigBytes*8;return t[r>>>5]|=128<<24-r%32,t[(r+128>>>10<<5)+30]=Math.floor(n/4294967296),t[(r+128>>>10<<5)+31]=n,e.sigBytes=t.length*4,this._process(),this._hash.toX32()},clone:function(){var e=n.clone.call(this);return e._hash=this._hash.clone(),e},blockSize:1024/32});t.SHA512=n._createHelper(u),t.HmacSHA512=n._createHmacHelper(u)})(),e.SHA512})})),ye=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ue(),ve()):typeof define==`function`&&define.amd?define([`./core`,`./x64-core`,`./sha512`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.x64,r=n.Word,i=n.WordArray,a=t.algo,o=a.SHA512,s=a.SHA384=o.extend({_doReset:function(){this._hash=new i.init([new r.init(3418070365,3238371032),new r.init(1654270250,914150663),new r.init(2438529370,812702999),new r.init(355462360,4144912697),new r.init(1731405415,4290775857),new r.init(2394180231,1750603025),new r.init(3675008525,1694076839),new r.init(1203062813,3204075428)])},_doFinalize:function(){var e=o._doFinalize.call(this);return e.sigBytes-=16,e}});t.SHA384=o._createHelper(s),t.HmacSHA384=o._createHmacHelper(s)})(),e.SHA384})})),be=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ue()):typeof define==`function`&&define.amd?define([`./core`,`./x64-core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.x64.Word,s=n.algo,c=[],l=[],u=[];(function(){for(var e=1,t=0,n=0;n<24;n++){c[e+5*t]=(n+1)*(n+2)/2%64;var r=t%5,i=(2*e+3*t)%5;e=r,t=i}for(var e=0;e<5;e++)for(var t=0;t<5;t++)l[e+5*t]=t+(2*e+3*t)%5*5;for(var a=1,s=0;s<24;s++){for(var d=0,f=0,p=0;p<7;p++){if(a&1){var m=(1<<p)-1;m<32?f^=1<<m:d^=1<<m-32}a&128?a=a<<1^113:a<<=1}u[s]=o.create(d,f)}})();var d=[];(function(){for(var e=0;e<25;e++)d[e]=o.create()})();var f=s.SHA3=a.extend({cfg:a.cfg.extend({outputLength:512}),_doReset:function(){for(var e=this._state=[],t=0;t<25;t++)e[t]=new o.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(e,t){for(var n=this._state,r=this.blockSize/2,i=0;i<r;i++){var a=e[t+2*i],o=e[t+2*i+1];a=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360,o=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360;var s=n[i];s.high^=o,s.low^=a}for(var f=0;f<24;f++){for(var p=0;p<5;p++){for(var m=0,h=0,g=0;g<5;g++){var s=n[p+5*g];m^=s.high,h^=s.low}var _=d[p];_.high=m,_.low=h}for(var p=0;p<5;p++)for(var v=d[(p+4)%5],y=d[(p+1)%5],b=y.high,x=y.low,m=v.high^(b<<1|x>>>31),h=v.low^(x<<1|b>>>31),g=0;g<5;g++){var s=n[p+5*g];s.high^=m,s.low^=h}for(var S=1;S<25;S++){var m,h,s=n[S],C=s.high,w=s.low,T=c[S];T<32?(m=C<<T|w>>>32-T,h=w<<T|C>>>32-T):(m=w<<T-32|C>>>64-T,h=C<<T-32|w>>>64-T);var E=d[l[S]];E.high=m,E.low=h}var D=d[0],O=n[0];D.high=O.high,D.low=O.low;for(var p=0;p<5;p++)for(var g=0;g<5;g++){var S=p+5*g,s=n[S],k=d[S],A=d[(p+1)%5+5*g],j=d[(p+2)%5+5*g];s.high=k.high^~A.high&j.high,s.low=k.low^~A.low&j.low}var s=n[0],M=u[f];s.high^=M.high,s.low^=M.low}},_doFinalize:function(){var e=this._data,n=e.words;this._nDataBytes*8;var r=e.sigBytes*8,a=this.blockSize*32;n[r>>>5]|=1<<24-r%32,n[(t.ceil((r+1)/a)*a>>>5)-1]|=128,e.sigBytes=n.length*4,this._process();for(var o=this._state,s=this.cfg.outputLength/8,c=s/8,l=[],u=0;u<c;u++){var d=o[u],f=d.high,p=d.low;f=(f<<8|f>>>24)&16711935|(f<<24|f>>>8)&4278255360,p=(p<<8|p>>>24)&16711935|(p<<24|p>>>8)&4278255360,l.push(p),l.push(f)}return new i.init(l,s)},clone:function(){for(var e=a.clone.call(this),t=e._state=this._state.slice(0),n=0;n<25;n++)t[n]=t[n].clone();return e}});n.SHA3=a._createHelper(f),n.HmacSHA3=a._createHmacHelper(f)})(Math),e.SHA3})})),xe=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.algo,s=i.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),c=i.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),l=i.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),u=i.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),d=i.create([0,1518500249,1859775393,2400959708,2840853838]),f=i.create([1352829926,1548603684,1836072691,2053994217,0]),p=o.RIPEMD160=a.extend({_doReset:function(){this._hash=i.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var n=0;n<16;n++){var r=t+n,i=e[r];e[r]=(i<<8|i>>>24)&16711935|(i<<24|i>>>8)&4278255360}for(var a=this._hash.words,o=d.words,p=f.words,b=s.words,x=c.words,S=l.words,C=u.words,w,T,E,D,O,k=w=a[0],A=T=a[1],j=E=a[2],M=D=a[3],N=O=a[4],P,n=0;n<80;n+=1)P=w+e[t+b[n]]|0,n<16?P+=m(T,E,D)+o[0]:n<32?P+=h(T,E,D)+o[1]:n<48?P+=g(T,E,D)+o[2]:n<64?P+=_(T,E,D)+o[3]:P+=v(T,E,D)+o[4],P|=0,P=y(P,S[n]),P=P+O|0,w=O,O=D,D=y(E,10),E=T,T=P,P=k+e[t+x[n]]|0,n<16?P+=v(A,j,M)+p[0]:n<32?P+=_(A,j,M)+p[1]:n<48?P+=g(A,j,M)+p[2]:n<64?P+=h(A,j,M)+p[3]:P+=m(A,j,M)+p[4],P|=0,P=y(P,C[n]),P=P+N|0,k=N,N=M,M=y(j,10),j=A,A=P;P=a[1]+E+M|0,a[1]=a[2]+D+N|0,a[2]=a[3]+O+k|0,a[3]=a[4]+w+A|0,a[4]=a[0]+T+j|0,a[0]=P},_doFinalize:function(){var e=this._data,t=e.words,n=this._nDataBytes*8,r=e.sigBytes*8;t[r>>>5]|=128<<24-r%32,t[(r+64>>>9<<4)+14]=(n<<8|n>>>24)&16711935|(n<<24|n>>>8)&4278255360,e.sigBytes=(t.length+1)*4,this._process();for(var i=this._hash,a=i.words,o=0;o<5;o++){var s=a[o];a[o]=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360}return i},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});function m(e,t,n){return e^t^n}function h(e,t,n){return e&t|~e&n}function g(e,t,n){return(e|~t)^n}function _(e,t,n){return e&n|t&~n}function v(e,t,n){return e^(t|~n)}function y(e,t){return e<<t|e>>>32-t}n.RIPEMD160=a._createHelper(p),n.HmacRIPEMD160=a._createHmacHelper(p)})(Math),e.RIPEMD160})})),Se=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){(function(){var t=e,n=t.lib.Base,r=t.enc.Utf8,i=t.algo;i.HMAC=n.extend({init:function(e,t){e=this._hasher=new e.init,typeof t==`string`&&(t=r.parse(t));var n=e.blockSize,i=n*4;t.sigBytes>i&&(t=e.finalize(t)),t.clamp();for(var a=this._oKey=t.clone(),o=this._iKey=t.clone(),s=a.words,c=o.words,l=0;l<n;l++)s[l]^=1549556828,c[l]^=909522486;a.sigBytes=o.sigBytes=i,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher,n=t.finalize(e);return t.reset(),t.finalize(this._oKey.clone().concat(n))}})})()})})),Ce=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ge(),Se()):typeof define==`function`&&define.amd?define([`./core`,`./sha256`,`./hmac`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.Base,i=n.WordArray,a=t.algo,o=a.SHA256,s=a.HMAC,c=a.PBKDF2=r.extend({cfg:r.extend({keySize:128/32,hasher:o,iterations:25e4}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var n=this.cfg,r=s.create(n.hasher,e),a=i.create(),o=i.create([1]),c=a.words,l=o.words,u=n.keySize,d=n.iterations;c.length<u;){var f=r.update(t).finalize(o);r.reset();for(var p=f.words,m=p.length,h=f,g=1;g<d;g++){h=r.finalize(h),r.reset();for(var _=h.words,v=0;v<m;v++)p[v]^=_[v]}a.concat(f),l[0]++}return a.sigBytes=u*4,a}});t.PBKDF2=function(e,t,n){return c.create(n).compute(e,t)}})(),e.PBKDF2})})),we=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),he(),Se()):typeof define==`function`&&define.amd?define([`./core`,`./sha1`,`./hmac`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.Base,i=n.WordArray,a=t.algo,o=a.MD5,s=a.EvpKDF=r.extend({cfg:r.extend({keySize:128/32,hasher:o,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var n,r=this.cfg,a=r.hasher.create(),o=i.create(),s=o.words,c=r.keySize,l=r.iterations;s.length<c;){n&&a.update(n),n=a.update(e).finalize(t),a.reset();for(var u=1;u<l;u++)n=a.finalize(n),a.reset();o.concat(n)}return o.sigBytes=c*4,o}});t.EvpKDF=function(e,t,n){return s.create(n).compute(e,t)}})(),e.EvpKDF})})),H=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),we()):typeof define==`function`&&define.amd?define([`./core`,`./evpkdf`],r):r(n.CryptoJS)})(e,function(e){e.lib.Cipher||function(t){var n=e,r=n.lib,i=r.Base,a=r.WordArray,o=r.BufferedBlockAlgorithm,s=n.enc;s.Utf8;var c=s.Base64,l=n.algo.EvpKDF,u=r.Cipher=o.extend({cfg:i.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,n){this.cfg=this.cfg.extend(n),this._xformMode=e,this._key=t,this.reset()},reset:function(){o.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function e(e){return typeof e==`string`?S:y}return function(t){return{encrypt:function(n,r,i){return e(r).encrypt(t,n,r,i)},decrypt:function(n,r,i){return e(r).decrypt(t,n,r,i)}}}}()});r.StreamCipher=u.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var d=n.mode={},f=r.BlockCipherMode=i.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}}),p=d.CBC=function(){var e=f.extend();e.Encryptor=e.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize;n.call(this,e,t,i),r.encryptBlock(e,t),this._prevBlock=e.slice(t,t+i)}}),e.Decryptor=e.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize,a=e.slice(t,t+i);r.decryptBlock(e,t),n.call(this,e,t,i),this._prevBlock=a}});function n(e,n,r){var i,a=this._iv;a?(i=a,this._iv=t):i=this._prevBlock;for(var o=0;o<r;o++)e[n+o]^=i[o]}return e}(),m=n.pad={},h=m.Pkcs7={pad:function(e,t){for(var n=t*4,r=n-e.sigBytes%n,i=r<<24|r<<16|r<<8|r,o=[],s=0;s<r;s+=4)o.push(i);var c=a.create(o,r);e.concat(c)},unpad:function(e){var t=e.words[e.sigBytes-1>>>2]&255;e.sigBytes-=t}};r.BlockCipher=u.extend({cfg:u.cfg.extend({mode:p,padding:h}),reset:function(){var e;u.reset.call(this);var t=this.cfg,n=t.iv,r=t.mode;this._xformMode==this._ENC_XFORM_MODE?e=r.createEncryptor:(e=r.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==e?this._mode.init(this,n&&n.words):(this._mode=e.call(r,this,n&&n.words),this._mode.__creator=e)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e,t=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(t.pad(this._data,this.blockSize),e=this._process(!0)):(e=this._process(!0),t.unpad(e)),e},blockSize:128/32});var g=r.CipherParams=i.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),_=n.format={},v=_.OpenSSL={stringify:function(e){var t,n=e.ciphertext,r=e.salt;return t=r?a.create([1398893684,1701076831]).concat(r).concat(n):n,t.toString(c)},parse:function(e){var t,n=c.parse(e),r=n.words;return r[0]==1398893684&&r[1]==1701076831&&(t=a.create(r.slice(2,4)),r.splice(0,4),n.sigBytes-=16),g.create({ciphertext:n,salt:t})}},y=r.SerializableCipher=i.extend({cfg:i.extend({format:v}),encrypt:function(e,t,n,r){r=this.cfg.extend(r);var i=e.createEncryptor(n,r),a=i.finalize(t),o=i.cfg;return g.create({ciphertext:a,key:n,iv:o.iv,algorithm:e,mode:o.mode,padding:o.padding,blockSize:e.blockSize,formatter:r.format})},decrypt:function(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),e.createDecryptor(n,r).finalize(t.ciphertext)},_parse:function(e,t){return typeof e==`string`?t.parse(e,this):e}}),b=n.kdf={},x=b.OpenSSL={execute:function(e,t,n,r,i){if(r||=a.random(64/8),i)var o=l.create({keySize:t+n,hasher:i}).compute(e,r);else var o=l.create({keySize:t+n}).compute(e,r);var s=a.create(o.words.slice(t),n*4);return o.sigBytes=t*4,g.create({key:o,iv:s,salt:r})}},S=r.PasswordBasedCipher=y.extend({cfg:y.cfg.extend({kdf:x}),encrypt:function(e,t,n,r){r=this.cfg.extend(r);var i=r.kdf.execute(n,e.keySize,e.ivSize,r.salt,r.hasher);r.iv=i.iv;var a=y.encrypt.call(this,e,t,i.key,r);return a.mixIn(i),a},decrypt:function(e,t,n,r){r=this.cfg.extend(r),t=this._parse(t,r.format);var i=r.kdf.execute(n,e.keySize,e.ivSize,t.salt,r.hasher);return r.iv=i.iv,y.decrypt.call(this,e,t,i.key,r)}})}()})})),Te=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.CFB=function(){var t=e.lib.BlockCipherMode.extend();t.Encryptor=t.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize;n.call(this,e,t,i,r),this._prevBlock=e.slice(t,t+i)}}),t.Decryptor=t.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize,a=e.slice(t,t+i);n.call(this,e,t,i,r),this._prevBlock=a}});function n(e,t,n,r){var i,a=this._iv;a?(i=a.slice(0),this._iv=void 0):i=this._prevBlock,r.encryptBlock(i,0);for(var o=0;o<n;o++)e[t+o]^=i[o]}return t}(),e.mode.CFB})})),Ee=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.CTR=function(){var t=e.lib.BlockCipherMode.extend();return t.Decryptor=t.Encryptor=t.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize,i=this._iv,a=this._counter;i&&(a=this._counter=i.slice(0),this._iv=void 0);var o=a.slice(0);n.encryptBlock(o,0),a[r-1]=a[r-1]+1|0;for(var s=0;s<r;s++)e[t+s]^=o[s]}}),t}(),e.mode.CTR})})),De=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.CTRGladman=function(){var t=e.lib.BlockCipherMode.extend();function n(e){if((e>>24&255)==255){var t=e>>16&255,n=e>>8&255,r=e&255;t===255?(t=0,n===255?(n=0,r===255?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}else e+=1<<24;return e}function r(e){return(e[0]=n(e[0]))===0&&(e[1]=n(e[1])),e}return t.Decryptor=t.Encryptor=t.extend({processBlock:function(e,t){var n=this._cipher,i=n.blockSize,a=this._iv,o=this._counter;a&&(o=this._counter=a.slice(0),this._iv=void 0),r(o);var s=o.slice(0);n.encryptBlock(s,0);for(var c=0;c<i;c++)e[t+c]^=s[c]}}),t}(),e.mode.CTRGladman})})),Oe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.OFB=function(){var t=e.lib.BlockCipherMode.extend();return t.Decryptor=t.Encryptor=t.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize,i=this._iv,a=this._keystream;i&&(a=this._keystream=i.slice(0),this._iv=void 0),n.encryptBlock(a,0);for(var o=0;o<r;o++)e[t+o]^=a[o]}}),t}(),e.mode.OFB})})),ke=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.ECB=function(){var t=e.lib.BlockCipherMode.extend();return t.Encryptor=t.extend({processBlock:function(e,t){this._cipher.encryptBlock(e,t)}}),t.Decryptor=t.extend({processBlock:function(e,t){this._cipher.decryptBlock(e,t)}}),t}(),e.mode.ECB})})),Ae=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.AnsiX923={pad:function(e,t){var n=e.sigBytes,r=t*4,i=r-n%r,a=n+i-1;e.clamp(),e.words[a>>>2]|=i<<24-a%4*8,e.sigBytes+=i},unpad:function(e){var t=e.words[e.sigBytes-1>>>2]&255;e.sigBytes-=t}},e.pad.Ansix923})})),je=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.Iso10126={pad:function(t,n){var r=n*4,i=r-t.sigBytes%r;t.concat(e.lib.WordArray.random(i-1)).concat(e.lib.WordArray.create([i<<24],1))},unpad:function(e){var t=e.words[e.sigBytes-1>>>2]&255;e.sigBytes-=t}},e.pad.Iso10126})})),Me=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.Iso97971={pad:function(t,n){t.concat(e.lib.WordArray.create([2147483648],1)),e.pad.ZeroPadding.pad(t,n)},unpad:function(t){e.pad.ZeroPadding.unpad(t),t.sigBytes--}},e.pad.Iso97971})})),Ne=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.ZeroPadding={pad:function(e,t){var n=t*4;e.clamp(),e.sigBytes+=n-(e.sigBytes%n||n)},unpad:function(e){for(var t=e.words,n=e.sigBytes-1,n=e.sigBytes-1;n>=0;n--)if(t[n>>>2]>>>24-n%4*8&255){e.sigBytes=n+1;break}}},e.pad.ZeroPadding})})),Pe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.NoPadding={pad:function(){},unpad:function(){}},e.pad.NoPadding})})),Fe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),H()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib.CipherParams,i=n.enc.Hex,a=n.format;a.Hex={stringify:function(e){return e.ciphertext.toString(i)},parse:function(e){var t=i.parse(e);return r.create({ciphertext:t})}}})(),e.format.Hex})})),Ie=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),V(),we(),H()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.BlockCipher,r=t.algo,i=[],a=[],o=[],s=[],c=[],l=[],u=[],d=[],f=[],p=[];(function(){for(var e=[],t=0;t<256;t++)t<128?e[t]=t<<1:e[t]=t<<1^283;for(var n=0,r=0,t=0;t<256;t++){var m=r^r<<1^r<<2^r<<3^r<<4;m=m>>>8^m&255^99,i[n]=m,a[m]=n;var h=e[n],g=e[h],_=e[g],v=e[m]*257^m*16843008;o[n]=v<<24|v>>>8,s[n]=v<<16|v>>>16,c[n]=v<<8|v>>>24,l[n]=v;var v=_*16843009^g*65537^h*257^n*16843008;u[m]=v<<24|v>>>8,d[m]=v<<16|v>>>16,f[m]=v<<8|v>>>24,p[m]=v,n?(n=h^e[e[e[_^h]]],r^=e[e[r]]):n=r=1}})();var m=[0,1,2,4,8,16,32,64,128,27,54],h=r.AES=n.extend({_doReset:function(){var e;if(!(this._nRounds&&this._keyPriorReset===this._key)){for(var t=this._keyPriorReset=this._key,n=t.words,r=t.sigBytes/4,a=((this._nRounds=r+6)+1)*4,o=this._keySchedule=[],s=0;s<a;s++)s<r?o[s]=n[s]:(e=o[s-1],s%r?r>6&&s%r==4&&(e=i[e>>>24]<<24|i[e>>>16&255]<<16|i[e>>>8&255]<<8|i[e&255]):(e=e<<8|e>>>24,e=i[e>>>24]<<24|i[e>>>16&255]<<16|i[e>>>8&255]<<8|i[e&255],e^=m[s/r|0]<<24),o[s]=o[s-r]^e);for(var c=this._invKeySchedule=[],l=0;l<a;l++){var s=a-l;if(l%4)var e=o[s];else var e=o[s-4];l<4||s<=4?c[l]=e:c[l]=u[i[e>>>24]]^d[i[e>>>16&255]]^f[i[e>>>8&255]]^p[i[e&255]]}}},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,o,s,c,l,i)},decryptBlock:function(e,t){var n=e[t+1];e[t+1]=e[t+3],e[t+3]=n,this._doCryptBlock(e,t,this._invKeySchedule,u,d,f,p,a);var n=e[t+1];e[t+1]=e[t+3],e[t+3]=n},_doCryptBlock:function(e,t,n,r,i,a,o,s){for(var c=this._nRounds,l=e[t]^n[0],u=e[t+1]^n[1],d=e[t+2]^n[2],f=e[t+3]^n[3],p=4,m=1;m<c;m++){var h=r[l>>>24]^i[u>>>16&255]^a[d>>>8&255]^o[f&255]^n[p++],g=r[u>>>24]^i[d>>>16&255]^a[f>>>8&255]^o[l&255]^n[p++],_=r[d>>>24]^i[f>>>16&255]^a[l>>>8&255]^o[u&255]^n[p++],v=r[f>>>24]^i[l>>>16&255]^a[u>>>8&255]^o[d&255]^n[p++];l=h,u=g,d=_,f=v}var h=(s[l>>>24]<<24|s[u>>>16&255]<<16|s[d>>>8&255]<<8|s[f&255])^n[p++],g=(s[u>>>24]<<24|s[d>>>16&255]<<16|s[f>>>8&255]<<8|s[l&255])^n[p++],_=(s[d>>>24]<<24|s[f>>>16&255]<<16|s[l>>>8&255]<<8|s[u&255])^n[p++],v=(s[f>>>24]<<24|s[l>>>16&255]<<16|s[u>>>8&255]<<8|s[d&255])^n[p++];e[t]=h,e[t+1]=g,e[t+2]=_,e[t+3]=v},keySize:256/32});t.AES=n._createHelper(h)})(),e.AES})})),Le=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),V(),we(),H()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.WordArray,i=n.BlockCipher,a=t.algo,o=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],s=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],c=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],l=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],u=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],d=a.DES=i.extend({_doReset:function(){for(var e=this._key.words,t=[],n=0;n<56;n++){var r=o[n]-1;t[n]=e[r>>>5]>>>31-r%32&1}for(var i=this._subKeys=[],a=0;a<16;a++){for(var l=i[a]=[],u=c[a],n=0;n<24;n++)l[n/6|0]|=t[(s[n]-1+u)%28]<<31-n%6,l[4+(n/6|0)]|=t[28+(s[n+24]-1+u)%28]<<31-n%6;l[0]=l[0]<<1|l[0]>>>31;for(var n=1;n<7;n++)l[n]=l[n]>>>(n-1)*4+3;l[7]=l[7]<<5|l[7]>>>27}for(var d=this._invSubKeys=[],n=0;n<16;n++)d[n]=i[15-n]},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._subKeys)},decryptBlock:function(e,t){this._doCryptBlock(e,t,this._invSubKeys)},_doCryptBlock:function(e,t,n){this._lBlock=e[t],this._rBlock=e[t+1],f.call(this,4,252645135),f.call(this,16,65535),p.call(this,2,858993459),p.call(this,8,16711935),f.call(this,1,1431655765);for(var r=0;r<16;r++){for(var i=n[r],a=this._lBlock,o=this._rBlock,s=0,c=0;c<8;c++)s|=l[c][((o^i[c])&u[c])>>>0];this._lBlock=o,this._rBlock=a^s}var d=this._lBlock;this._lBlock=this._rBlock,this._rBlock=d,f.call(this,1,1431655765),p.call(this,8,16711935),p.call(this,2,858993459),f.call(this,16,65535),f.call(this,4,252645135),e[t]=this._lBlock,e[t+1]=this._rBlock},keySize:64/32,ivSize:64/32,blockSize:64/32});function f(e,t){var n=(this._lBlock>>>e^this._rBlock)&t;this._rBlock^=n,this._lBlock^=n<<e}function p(e,t){var n=(this._rBlock>>>e^this._lBlock)&t;this._lBlock^=n,this._rBlock^=n<<e}t.DES=i._createHelper(d);var m=a.TripleDES=i.extend({_doReset:function(){var e=this._key.words;if(e.length!==2&&e.length!==4&&e.length<6)throw Error(`Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.`);var t=e.slice(0,2),n=e.length<4?e.slice(0,2):e.slice(2,4),i=e.length<6?e.slice(0,2):e.slice(4,6);this._des1=d.createEncryptor(r.create(t)),this._des2=d.createEncryptor(r.create(n)),this._des3=d.createEncryptor(r.create(i))},encryptBlock:function(e,t){this._des1.encryptBlock(e,t),this._des2.decryptBlock(e,t),this._des3.encryptBlock(e,t)},decryptBlock:function(e,t){this._des3.decryptBlock(e,t),this._des2.encryptBlock(e,t),this._des1.decryptBlock(e,t)},keySize:192/32,ivSize:64/32,blockSize:64/32});t.TripleDES=i._createHelper(m)})(),e.TripleDES})})),Re=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),V(),we(),H()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.StreamCipher,r=t.algo,i=r.RC4=n.extend({_doReset:function(){for(var e=this._key,t=e.words,n=e.sigBytes,r=this._S=[],i=0;i<256;i++)r[i]=i;for(var i=0,a=0;i<256;i++){var o=i%n,s=t[o>>>2]>>>24-o%4*8&255;a=(a+r[i]+s)%256;var c=r[i];r[i]=r[a],r[a]=c}this._i=this._j=0},_doProcessBlock:function(e,t){e[t]^=a.call(this)},keySize:256/32,ivSize:0});function a(){for(var e=this._S,t=this._i,n=this._j,r=0,i=0;i<4;i++){t=(t+1)%256,n=(n+e[t])%256;var a=e[t];e[t]=e[n],e[n]=a,r|=e[(e[t]+e[n])%256]<<24-i*8}return this._i=t,this._j=n,r}t.RC4=n._createHelper(i);var o=r.RC4Drop=i.extend({cfg:i.cfg.extend({drop:192}),_doReset:function(){i._doReset.call(this);for(var e=this.cfg.drop;e>0;e--)a.call(this)}});t.RC4Drop=n._createHelper(o)})(),e.RC4})})),ze=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),V(),we(),H()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.StreamCipher,r=t.algo,i=[],a=[],o=[],s=r.Rabbit=n.extend({_doReset:function(){for(var e=this._key.words,t=this.cfg.iv,n=0;n<4;n++)e[n]=(e[n]<<8|e[n]>>>24)&16711935|(e[n]<<24|e[n]>>>8)&4278255360;var r=this._X=[e[0],e[3]<<16|e[2]>>>16,e[1],e[0]<<16|e[3]>>>16,e[2],e[1]<<16|e[0]>>>16,e[3],e[2]<<16|e[1]>>>16],i=this._C=[e[2]<<16|e[2]>>>16,e[0]&4294901760|e[1]&65535,e[3]<<16|e[3]>>>16,e[1]&4294901760|e[2]&65535,e[0]<<16|e[0]>>>16,e[2]&4294901760|e[3]&65535,e[1]<<16|e[1]>>>16,e[3]&4294901760|e[0]&65535];this._b=0;for(var n=0;n<4;n++)c.call(this);for(var n=0;n<8;n++)i[n]^=r[n+4&7];if(t){var a=t.words,o=a[0],s=a[1],l=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,u=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360,d=l>>>16|u&4294901760,f=u<<16|l&65535;i[0]^=l,i[1]^=d,i[2]^=u,i[3]^=f,i[4]^=l,i[5]^=d,i[6]^=u,i[7]^=f;for(var n=0;n<4;n++)c.call(this)}},_doProcessBlock:function(e,t){var n=this._X;c.call(this),i[0]=n[0]^n[5]>>>16^n[3]<<16,i[1]=n[2]^n[7]>>>16^n[5]<<16,i[2]=n[4]^n[1]>>>16^n[7]<<16,i[3]=n[6]^n[3]>>>16^n[1]<<16;for(var r=0;r<4;r++)i[r]=(i[r]<<8|i[r]>>>24)&16711935|(i[r]<<24|i[r]>>>8)&4278255360,e[t+r]^=i[r]},blockSize:128/32,ivSize:64/32});function c(){for(var e=this._X,t=this._C,n=0;n<8;n++)a[n]=t[n];t[0]=t[0]+1295307597+this._b|0,t[1]=t[1]+3545052371+ +(t[0]>>>0<a[0]>>>0)|0,t[2]=t[2]+886263092+ +(t[1]>>>0<a[1]>>>0)|0,t[3]=t[3]+1295307597+ +(t[2]>>>0<a[2]>>>0)|0,t[4]=t[4]+3545052371+ +(t[3]>>>0<a[3]>>>0)|0,t[5]=t[5]+886263092+ +(t[4]>>>0<a[4]>>>0)|0,t[6]=t[6]+1295307597+ +(t[5]>>>0<a[5]>>>0)|0,t[7]=t[7]+3545052371+ +(t[6]>>>0<a[6]>>>0)|0,this._b=+(t[7]>>>0<a[7]>>>0);for(var n=0;n<8;n++){var r=e[n]+t[n],i=r&65535,s=r>>>16;o[n]=((i*i>>>17)+i*s>>>15)+s*s^((r&4294901760)*r|0)+((r&65535)*r|0)}e[0]=o[0]+(o[7]<<16|o[7]>>>16)+(o[6]<<16|o[6]>>>16)|0,e[1]=o[1]+(o[0]<<8|o[0]>>>24)+o[7]|0,e[2]=o[2]+(o[1]<<16|o[1]>>>16)+(o[0]<<16|o[0]>>>16)|0,e[3]=o[3]+(o[2]<<8|o[2]>>>24)+o[1]|0,e[4]=o[4]+(o[3]<<16|o[3]>>>16)+(o[2]<<16|o[2]>>>16)|0,e[5]=o[5]+(o[4]<<8|o[4]>>>24)+o[3]|0,e[6]=o[6]+(o[5]<<16|o[5]>>>16)+(o[4]<<16|o[4]>>>16)|0,e[7]=o[7]+(o[6]<<8|o[6]>>>24)+o[5]|0}t.Rabbit=n._createHelper(s)})(),e.Rabbit})})),Be=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),V(),we(),H()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.StreamCipher,r=t.algo,i=[],a=[],o=[],s=r.RabbitLegacy=n.extend({_doReset:function(){var e=this._key.words,t=this.cfg.iv,n=this._X=[e[0],e[3]<<16|e[2]>>>16,e[1],e[0]<<16|e[3]>>>16,e[2],e[1]<<16|e[0]>>>16,e[3],e[2]<<16|e[1]>>>16],r=this._C=[e[2]<<16|e[2]>>>16,e[0]&4294901760|e[1]&65535,e[3]<<16|e[3]>>>16,e[1]&4294901760|e[2]&65535,e[0]<<16|e[0]>>>16,e[2]&4294901760|e[3]&65535,e[1]<<16|e[1]>>>16,e[3]&4294901760|e[0]&65535];this._b=0;for(var i=0;i<4;i++)c.call(this);for(var i=0;i<8;i++)r[i]^=n[i+4&7];if(t){var a=t.words,o=a[0],s=a[1],l=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,u=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360,d=l>>>16|u&4294901760,f=u<<16|l&65535;r[0]^=l,r[1]^=d,r[2]^=u,r[3]^=f,r[4]^=l,r[5]^=d,r[6]^=u,r[7]^=f;for(var i=0;i<4;i++)c.call(this)}},_doProcessBlock:function(e,t){var n=this._X;c.call(this),i[0]=n[0]^n[5]>>>16^n[3]<<16,i[1]=n[2]^n[7]>>>16^n[5]<<16,i[2]=n[4]^n[1]>>>16^n[7]<<16,i[3]=n[6]^n[3]>>>16^n[1]<<16;for(var r=0;r<4;r++)i[r]=(i[r]<<8|i[r]>>>24)&16711935|(i[r]<<24|i[r]>>>8)&4278255360,e[t+r]^=i[r]},blockSize:128/32,ivSize:64/32});function c(){for(var e=this._X,t=this._C,n=0;n<8;n++)a[n]=t[n];t[0]=t[0]+1295307597+this._b|0,t[1]=t[1]+3545052371+ +(t[0]>>>0<a[0]>>>0)|0,t[2]=t[2]+886263092+ +(t[1]>>>0<a[1]>>>0)|0,t[3]=t[3]+1295307597+ +(t[2]>>>0<a[2]>>>0)|0,t[4]=t[4]+3545052371+ +(t[3]>>>0<a[3]>>>0)|0,t[5]=t[5]+886263092+ +(t[4]>>>0<a[4]>>>0)|0,t[6]=t[6]+1295307597+ +(t[5]>>>0<a[5]>>>0)|0,t[7]=t[7]+3545052371+ +(t[6]>>>0<a[6]>>>0)|0,this._b=+(t[7]>>>0<a[7]>>>0);for(var n=0;n<8;n++){var r=e[n]+t[n],i=r&65535,s=r>>>16;o[n]=((i*i>>>17)+i*s>>>15)+s*s^((r&4294901760)*r|0)+((r&65535)*r|0)}e[0]=o[0]+(o[7]<<16|o[7]>>>16)+(o[6]<<16|o[6]>>>16)|0,e[1]=o[1]+(o[0]<<8|o[0]>>>24)+o[7]|0,e[2]=o[2]+(o[1]<<16|o[1]>>>16)+(o[0]<<16|o[0]>>>16)|0,e[3]=o[3]+(o[2]<<8|o[2]>>>24)+o[1]|0,e[4]=o[4]+(o[3]<<16|o[3]>>>16)+(o[2]<<16|o[2]>>>16)|0,e[5]=o[5]+(o[4]<<8|o[4]>>>24)+o[3]|0,e[6]=o[6]+(o[5]<<16|o[5]>>>16)+(o[4]<<16|o[4]>>>16)|0,e[7]=o[7]+(o[6]<<8|o[6]>>>24)+o[5]|0}t.RabbitLegacy=n._createHelper(s)})(),e.RabbitLegacy})})),Ve=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),V(),we(),H()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.BlockCipher,r=t.algo;let i=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],a=[[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946],[1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055],[3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504],[976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462]];var o={pbox:[],sbox:[]};function s(e,t){let n=t>>24&255,r=t>>16&255,i=t>>8&255,a=t&255,o=e.sbox[0][n]+e.sbox[1][r];return o^=e.sbox[2][i],o+=e.sbox[3][a],o}function c(e,t,n){let r=t,i=n,a;for(let t=0;t<16;++t)r^=e.pbox[t],i=s(e,r)^i,a=r,r=i,i=a;return a=r,r=i,i=a,i^=e.pbox[16],r^=e.pbox[17],{left:r,right:i}}function l(e,t,n){let r=t,i=n,a;for(let t=17;t>1;--t)r^=e.pbox[t],i=s(e,r)^i,a=r,r=i,i=a;return a=r,r=i,i=a,i^=e.pbox[1],r^=e.pbox[0],{left:r,right:i}}function u(e,t,n){for(let t=0;t<4;t++){e.sbox[t]=[];for(let n=0;n<256;n++)e.sbox[t][n]=a[t][n]}let r=0;for(let a=0;a<18;a++)e.pbox[a]=i[a]^t[r],r++,r>=n&&(r=0);let o=0,s=0,l=0;for(let t=0;t<18;t+=2)l=c(e,o,s),o=l.left,s=l.right,e.pbox[t]=o,e.pbox[t+1]=s;for(let t=0;t<4;t++)for(let n=0;n<256;n+=2)l=c(e,o,s),o=l.left,s=l.right,e.sbox[t][n]=o,e.sbox[t][n+1]=s;return!0}var d=r.Blowfish=n.extend({_doReset:function(){if(this._keyPriorReset!==this._key){var e=this._keyPriorReset=this._key,t=e.words;u(o,t,e.sigBytes/4)}},encryptBlock:function(e,t){var n=c(o,e[t],e[t+1]);e[t]=n.left,e[t+1]=n.right},decryptBlock:function(e,t){var n=l(o,e[t],e[t+1]);e[t]=n.left,e[t+1]=n.right},blockSize:64/32,keySize:128/32,ivSize:64/32});t.Blowfish=n._createHelper(d)})(),e.Blowfish})})),He=c(o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ue(),de(),fe(),pe(),me(),V(),he(),ge(),_e(),ve(),ye(),be(),xe(),Se(),Ce(),we(),H(),Te(),Ee(),De(),Oe(),ke(),Ae(),je(),Me(),Ne(),Pe(),Fe(),Ie(),Le(),Re(),ze(),Be(),Ve()):typeof define==`function`&&define.amd?define(`./core,./x64-core,./lib-typedarrays,./enc-utf16,./enc-base64,./enc-base64url,./md5,./sha1,./sha256,./sha224,./sha512,./sha384,./sha3,./ripemd160,./hmac,./pbkdf2,./evpkdf,./cipher-core,./mode-cfb,./mode-ctr,./mode-ctr-gladman,./mode-ofb,./mode-ecb,./pad-ansix923,./pad-iso10126,./pad-iso97971,./pad-zeropadding,./pad-nopadding,./format-hex,./aes,./tripledes,./rc4,./rabbit,./rabbit-legacy,./blowfish`.split(`,`),r):n.CryptoJS=r(n.CryptoJS)})(e,function(e){return e})}))(),1),U=`https://vybrnhyaeugfwezbygdt.supabase.co`,Ue=`sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9`,We=`ryzin_super_secret_salt_2026`;function Ge(){return{users:[{id:`admin`,name:`최고관리자 (데모)`,password:He.default.SHA256(`1234`).toString(),role:`admin`},{id:`demo`,name:`데모 시연 계정`,password:He.default.SHA256(`demo`).toString(),role:`demo`}],currentUser:null,hosts:[{id:`h_demo_1`,name:`김주호`,phone:`010-1234-5678`,bank:`신한`,account:`110-123-456789`,ssn:`920101-1234567`,address:`서울시 강남구 테헤란로`,createdAt:`2026-07-01`,memo:{features:`활발함, 패션/가전 전문`,comment:`시연용 쇼호스트 A`}},{id:`h_demo_2`,name:`이미소`,phone:`010-5555-6666`,bank:`국민`,account:`4567-02-123456`,ssn:`950505-2345678`,address:`경기도 성남시 분당구`,createdAt:`2026-07-01`,memo:{features:`목소리 톤 좋음, 뷰티/리빙 전문`,comment:`시연용 쇼호스트 B`}},{id:`h_demo_3`,name:`최성우`,phone:`010-9999-8888`,bank:`우리`,account:`1002-123-456789`,ssn:`900808-1357924`,address:`인천시 부평구`,createdAt:`2026-07-01`,memo:{features:`신뢰감 있는 진행, 테크/식품 전문`,comment:`시연용 쇼호스트 C`}}],brands:[{id:`b_demo_1`,name:`아우라뷰티`,category:`뷰티`,manager:`홍길동 팀장`,phone:`010-1111-2222`,email:`aura@beauty.com`,taxInvoice:!0,createdAt:`2026-07-01`},{id:`b_demo_2`,name:`헬시푸드코리아`,category:`식품`,manager:`김철수 과장`,phone:`010-3333-4444`,email:`healthy@food.com`,taxInvoice:!0,createdAt:`2026-07-01`},{id:`b_demo_3`,name:`모던테크컴퍼니`,category:`가전`,manager:`박영희 대리`,phone:`010-5555-7777`,email:`modern@tech.com`,taxInvoice:!1,createdAt:`2026-07-01`}],projects:[{id:`p_demo_1`,brandId:`b_demo_1`,adName:`아우라뷰티 수분크림 런칭`,category:`뷰티`,broadcastDate:`2026-07-20`,broadcastTime:`20:00`,broadcastMonth:`2026-07`,platform:`NAVER`,liveUrl:`https://shoppinglive.naver.com`,pd:`강동원 PD`,designer:`김태희 디자이너`,cuesheetLink:``,note:`신제품 출시 시연 방송`,status:`settle_done`,createdAt:`2026-07-10`},{id:`p_demo_2`,brandId:`b_demo_2`,adName:`헬시푸드 밀키트 초특가전`,category:`식품`,broadcastDate:`2026-07-21`,broadcastTime:`19:00`,broadcastMonth:`2026-07`,platform:`GRIP`,liveUrl:`https://grip.show`,pd:`송중기 PD`,designer:``,cuesheetLink:``,note:`캠핑 특가 패키지`,status:`settle_done`,createdAt:`2026-07-10`},{id:`p_demo_3`,brandId:`b_demo_3`,adName:`모던테크 무선청소기 시연`,category:`가전`,broadcastDate:`2026-07-25`,broadcastTime:`21:00`,broadcastMonth:`2026-07`,platform:`NAVER`,liveUrl:`https://shoppinglive.naver.com`,pd:`강동원 PD`,designer:`김태희 디자이너`,cuesheetLink:``,note:`흡입력 테스트 시연 방송`,status:`design`,createdAt:`2026-07-10`},{id:`p_demo_4`,brandId:`b_demo_1`,adName:`뷰티 에센스 2차 앵콜 방송`,category:`뷰티`,broadcastDate:`2026-07-28`,broadcastTime:`11:00`,broadcastMonth:`2026-07`,platform:`NAVER`,liveUrl:`https://shoppinglive.naver.com`,pd:`송중기 PD`,designer:``,cuesheetLink:``,note:`앵콜 요청에 따른 추가 방송`,status:`cue_sheet`,createdAt:`2026-07-10`},{id:`p_demo_5`,brandId:`b_demo_2`,adName:`헬시푸드 단백질 쉐이크 쇼`,category:`식품`,broadcastDate:`2026-07-30`,broadcastTime:`15:00`,broadcastMonth:`2026-07`,platform:`GRIP`,liveUrl:`https://grip.show`,pd:`강동원 PD`,designer:``,cuesheetLink:``,note:`단백질 보충제 시연`,status:`host_cast`,createdAt:`2026-07-10`}],tasks:[{id:`t_demo_1`,projectId:`p_demo_3`,title:`청소기 배너 이미지 디자인`,assignee:`designer`,dueDate:`2026-07-22`,status:`pending`},{id:`t_demo_2`,projectId:`p_demo_4`,title:`에센스 2차 큐시트 작성`,assignee:`pd`,dueDate:`2026-07-26`,status:`completed`}],liveHosts:[{id:`lh_demo_1`,projectId:`p_demo_1`,hostId:`h_demo_2`,fee:3e5,type:`main`},{id:`lh_demo_2`,projectId:`p_demo_2`,hostId:`h_demo_3`,fee:25e4,type:`main`},{id:`lh_demo_3`,projectId:`p_demo_3`,hostId:`h_demo_1`,fee:4e5,type:`main`}],contracts:[{id:`c_demo_1`,projectId:`p_demo_1`,hostId:`h_demo_2`,status:`signed`,signDate:`2026-07-11`},{id:`c_demo_2`,projectId:`p_demo_2`,hostId:`h_demo_3`,status:`signed`,signDate:`2026-07-11`}],products:[{id:`pr_demo_1`,projectId:`p_demo_1`,name:`아우라 수분크림 50ml`,price:29e3,commission:15},{id:`pr_demo_2`,projectId:`p_demo_2`,name:`부대찌개 캠핑 밀키트 3인분`,price:18900,commission:10}],designs:[{id:`d_demo_1`,projectId:`p_demo_3`,title:`메인 썸네일`,link:`https://example.com/thumb.jpg`,status:`confirm`}],results:[{id:`r_demo_1`,projectId:`p_demo_1`,salesAmount:45e5,viewerCount:1200,buyerCount:150},{id:`r_demo_2`,projectId:`p_demo_2`,salesAmount:32e5,viewerCount:850,buyerCount:110}],finances:[{id:`f_demo_1`,month:`2026-07`,sales:77e5,cost:35e5,profit:42e5},{id:`f_demo_2`,month:`2026-06`,sales:62e5,cost:28e5,profit:34e5}],crmClients:[{id:`crm_demo_1`,companyName:`(주)데모코스메틱`,contactName:`원빈 부장`,phone:`010-4444-3333`,email:`wb@democos.com`,source:`자사몰 인바운드`,interestedService:`라이브 풀패키지`,status:`new`,category:`A`,memo:`신규 런칭 브랜드 시연용 데이터`,lastContactDate:`2026-07-09`,createdAt:`2026-07-09`}],crmActivities:[{id:`act_demo_1`,clientId:`crm_demo_1`,date:`2026-07-09`,type:`phone`,content:`첫 전화 통화 상담 완료. 가상 견적서 송부 요청 받음.`,followUpDate:`2026-07-15`,createdAt:`2026-07-09`}],classApplications:[{id:1,name:`김태희`,phone:`010-1234-5678`,answers:{이름:`김태희`,전화번호:`010-1234-5678`,"수강 기수 선택":`1기 - 2026년 8월 10일 (월) 19:00`,"크리에이터가 되고 싶은 이유":`유튜브 채널을 시작해서 퍼스널 브랜딩을 하고 싶습니다.`},photo_url:``,created_at:`2026-07-28T10:00:00Z`},{id:2,name:`이순신`,phone:`010-9876-5432`,answers:{이름:`이순신`,전화번호:`010-9876-5432`,"수강 기수 선택":`2기 - 2026년 8월 17일 (월) 19:00`,"크리에이터가 되고 싶은 이유":`실전 라이브커머스 판매 노하우를 배우고 싶습니다.`},photo_url:``,created_at:`2026-07-28T11:30:00Z`}],surveyQuestions:[{id:1,type:`textarea`,label:`크리에이터가 되고 싶은 이유`,placeholder:`이유와 목표를 상세히 적어주세요.`,options:``,required:!0,sort_order:1},{id:2,type:`file`,label:`사진 첨부`,placeholder:``,options:``,required:!1,sort_order:2}],classSettings:[{key:`class_dates`,value:`1기 - 2026년 8월 10일 (월) 19:00,2기 - 2026년 8월 17일 (월) 19:00,3기 - 2026년 8월 24일 (월) 19:00,4기 - 2026년 8월 31일 (월) 19:00`}],currentRole:`admin`}}var W=new class{constructor(){this.isDemoMode=localStorage.getItem(`ryzin_is_demo_mode`)===`true`,this.STORAGE_KEY=this.isDemoMode?`livecommerce_erp_demo_data`:`livecommerce_erp_data`,this._data={users:[],currentUser:null,hosts:[],brands:[],projects:[],tasks:[],liveHosts:[],contracts:[],products:[],designs:[],results:[],finances:[],crmClients:[],crmActivities:[],classApplications:[],surveyQuestions:[],classSettings:[],currentRole:`admin`},this._listeners={},this._sheetDBReady=!1,this._load()}_load(){try{let e=localStorage.getItem(this.STORAGE_KEY);e&&(this._data={...this._data,...JSON.parse(e)})}catch(e){console.warn(`데이터 로드 실패:`,e)}}_save(){try{localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this._data))}catch(e){console.warn(`데이터 저장 실패:`,e)}}async init(){if(this.isDemoMode){if(this._data.users.length===0){let e=Ge();this._data={...this._data,...e},this._save()}return!0}try{let e={apikey:Ue,Authorization:`Bearer ${Ue}`},[t,n,r,i,a,o,s,c,l]=await Promise.all([fetch(`${U}/rest/v1/users?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/hosts?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/brands?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/live_broadcasts?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/crm_clients?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/crm_activities?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/ryzin_class_applications?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/ryzin_class_survey_questions?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/ryzin_class_settings?select=*`,{headers:e}).catch(()=>null)]),u=t&&t.ok?await t.json():[],d=n&&n.ok?await n.json():[],f=r&&r.ok?await r.json():[],p=i&&i.ok?await i.json():[],m=a&&a.ok?await a.json():[],h=o&&o.ok?await o.json():[],g=s&&s.ok?await s.json():[],_=c&&c.ok?await c.json():[],v=l&&l.ok?await l.json():[],y=u.length===0&&d.length===0&&f.length===0&&p.length===0,b=this._data.brands&&this._data.brands.length>0||this._data.hosts&&this._data.hosts.length>0||this._data.projects&&this._data.projects.length>0;return y&&b&&(console.log(`🔄 Supabase가 비어있어 로컬 캐시 데이터 마이그레이션을 시작합니다...`),await this._migrateLocalToSupabase(),[t,n,r,i,a,o,s,c,l]=await Promise.all([fetch(`${U}/rest/v1/users?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/hosts?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/brands?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/live_broadcasts?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/crm_clients?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/crm_activities?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/ryzin_class_applications?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/ryzin_class_survey_questions?select=*`,{headers:e}).catch(()=>null),fetch(`${U}/rest/v1/ryzin_class_settings?select=*`,{headers:e}).catch(()=>null)]),u=t&&t.ok?await t.json():[],d=n&&n.ok?await n.json():[],f=r&&r.ok?await r.json():[],p=i&&i.ok?await i.json():[],m=a&&a.ok?await a.json():[],h=o&&o.ok?await o.json():[],g=s&&s.ok?await s.json():[],_=c&&c.ok?await c.json():[],v=l&&l.ok?await l.json():[]),this._parseSheetData(u,d,f,p,m,h,g,_,v),this._sheetDBReady=!0,!0}catch(e){return console.error(`Supabase 연동 시도 중 오류 발생 (로컬 캐시로 진입):`,e),!0}}async _migrateLocalToSupabase(){let e={apikey:Ue,Authorization:`Bearer ${Ue}`,"Content-Type":`application/json`,Prefer:`resolution=merge-duplicates`};try{if(this._data.users&&this._data.users.length>0){let t=this._data.users.map(e=>({id:e.id,password:e.password,name:e.name,role:e.role,otp_secret:e.otpSecret||``}));await fetch(`${U}/rest/v1/users`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}if(this._data.hosts&&this._data.hosts.length>0){let t=this._data.hosts.map(e=>({id:e.id,name:e.name,phone:e.phone,ssn:e.ssn,bank:e.bank,account:e.account,account_holder:e.accountHolder,address:e.address,memo:e.memo?e.memo.features:``}));await fetch(`${U}/rest/v1/hosts`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}if(this._data.brands&&this._data.brands.length>0){let t=this._data.brands.map(e=>({id:e.id,name:e.name,company_name:e.companyName,category:e.category,tax_invoice:e.taxInvoice===!0,manager:e.manager,phone:e.phone,email:e.email,business_no:e.businessNo,address:e.address,memo:e.memo}));await fetch(`${U}/rest/v1/brands`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}if(this._data.crmClients&&this._data.crmClients.length>0){let t=this._data.crmClients.map(e=>({id:e.id,company_name:e.companyName,contact_name:e.contactName,phone:e.phone,email:e.email,status:e.status,category:e.category,interested_service:e.interestedService,source:e.source,memo:e.memo,last_contact_date:e.lastContactDate,created_at:e.createdAt}));await fetch(`${U}/rest/v1/crm_clients`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}if(this._data.crmActivities&&this._data.crmActivities.length>0){let t=this._data.crmActivities.map(e=>({id:e.id,client_id:e.clientId,date:e.date,type:e.type,content:e.content,follow_up_date:e.followUpDate,created_at:e.createdAt}));await fetch(`${U}/rest/v1/crm_activities`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}if(this._data.projects&&this._data.projects.length>0){let t=this._data.projects.map(e=>{let t=e.id,n=this.getById(`results`,t)||{},r=this.getById(`finances`,t)||{},i=this.query(`liveHosts`,e=>e.liveId===t),a=i[0]?this.getById(`hosts`,i[0].hostId):null,o=i[1]?this.getById(`hosts`,i[1].hostId):null,s=L(e.broadcastStatus),c=R(e.settleStatus);return{id:t,status:s,brand_name:e.brandName||``,category:e.category||``,broadcast_month:e.broadcastMonth||``,broadcast_date:e.broadcastDate||``,broadcast_time:e.broadcastTime||``,platform:e.platform||``,live_url:e.liveUrl||``,pd:e.pd||``,designer:e.designer||``,views:n.views||0,live_revenue:n.liveRevenue||0,host_a:a?a.name:``,fee_a:i[0]&&i[0].fee||0,host_b:o?o.name:``,fee_b:i[1]&&i[1].fee||0,settle_status:c,ad_cost:r.adCost||0,production_cost:r.productionCost||0,sales_revenue:r.salesRevenue||0,operating_profit:r.operatingProfit||0,net_margin:r.netMargin||0,note:e.note||``}});await fetch(`${U}/rest/v1/live_broadcasts`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}console.log(`✅ 로컬 캐시 데이터 Supabase 마이그레이션 완료!`)}catch(e){console.warn(`로컬 데이터 마이그레이션 실패:`,e)}}_parseNum(e){return e&&parseInt(e.toString().replace(/,/g,``),10)||0}_parseSheetData(e,t,n,r,i,a,o,s,c){let l=[],u=[],d=[],f=[],p=[],m=[],h=[],g=[],_=[],v=[],y=[],b=[],x=1,S=Array.isArray(e)?e:[],C=Array.isArray(t)?t:[],w=Array.isArray(n)?n:[],T=Array.isArray(r)?r:[],E=Array.isArray(i)?i:[],D=Array.isArray(a)?a:[],O=Array.isArray(o)?o:[],k=Array.isArray(s)?s:[],A=Array.isArray(c)?c:[];S.forEach(e=>{e.id&&l.push({id:e.id,password:e.password||``,name:e.name||``,role:e.role||`pd`,otpSecret:e.otp_secret||``})}),C.forEach(e=>{e.name&&u.push({id:e.id||`h_`+e.name,name:e.name,phone:e.phone||``,ssn:e.ssn||``,bank:e.bank||``,account:e.account||``,accountHolder:e.account_holder||``,address:e.address||``,memo:{features:e.memo||``,strengths:``,weaknesses:``,style:``,brandPreference:``,caution:``,comment:``},createdAt:`2025-01-01`})}),w.forEach(e=>{e.name&&d.push({id:e.id||`b_`+e.name,name:e.name,companyName:e.company_name||``,category:e.category||``,taxInvoice:e.tax_invoice===!0,manager:e.manager||``,phone:e.phone||``,email:e.email||``,businessNo:e.business_no||``,address:e.address||``,memo:e.memo||``,createdAt:`2025-01-01`})}),E.forEach(e=>{e.id&&g.push({id:e.id,companyName:e.company_name||``,contactName:e.contact_name||``,phone:e.phone||``,email:e.email||``,status:e.status||``,category:e.category||``,interestedService:e.interested_service||``,source:e.source||``,memo:e.memo||``,lastContactDate:e.last_contact_date||``,createdAt:e.created_at||``})}),D.forEach(e=>{e.id&&_.push({id:e.id,clientId:e.client_id||``,date:e.date||``,type:e.type||``,content:e.content||``,followUpDate:e.follow_up_date||``,createdAt:e.created_at||``})}),O.forEach(e=>{e.id&&v.push({id:e.id,name:e.name||``,phone:e.phone||``,answers:e.answers||{},photo_url:e.photo_url||``,created_at:e.created_at||``})}),k.forEach(e=>{e.id&&y.push({id:e.id,type:e.type||`text`,label:e.label||``,placeholder:e.placeholder||``,options:e.options||``,required:e.required===!0,sort_order:this._parseNum(e.sort_order)})}),A.forEach(e=>{e.key&&b.push({key:e.key,value:e.value||``})}),T.forEach(e=>{if(!e.id)return;let t=e.id,n=`b_`+e.brand_name;if(f.push({id:t,brandId:n,brandName:e.brand_name||``,category:e.category||``,broadcastMonth:e.broadcast_month||``,broadcastDate:e.broadcast_date||``,broadcastTime:e.broadcast_time||``,platform:e.platform||``,liveUrl:e.live_url||``,pd:e.pd||``,designer:e.designer||``,broadcastStatus:z(e.status),settleStatus:ce(e.settle_status),note:e.note||``,scheme:e.scheme?typeof e.scheme==`string`?JSON.parse(e.scheme):e.scheme:null,createdAt:e.broadcast_date||`2025-01-01`}),e.host_a){let n=C.find(t=>t.name===e.host_a),r=n?n.id||`h_`+n.name:`h_`+e.host_a;p.push({id:`lh`+ x++,liveId:t,hostId:r,role:`main`,fee:this._parseNum(e.fee_a),settleStatus:ce(e.settle_status),memo:``})}if(e.host_b){let n=C.find(t=>t.name===e.host_b),r=n?n.id||`h_`+n.name:`h_`+e.host_b;p.push({id:`lh`+ x++,liveId:t,hostId:r,role:`guest`,fee:this._parseNum(e.fee_b),settleStatus:ce(e.settle_status),memo:``})}let r=this._parseNum(e.live_revenue),i=this._parseNum(e.ad_cost)+this._parseNum(e.production_cost)+this._parseNum(e.fee_a)+this._parseNum(e.fee_b),a=i>0?r/i:0;m.push({id:t,liveId:t,views:this._parseNum(e.views),likes:0,orders:0,liveRevenue:r,roi:a}),h.push({id:t,liveId:t,adCost:this._parseNum(e.ad_cost),productionCost:this._parseNum(e.production_cost),hostCost:this._parseNum(e.fee_a)+this._parseNum(e.fee_b),otherCost:0,salesRevenue:this._parseNum(e.sales_revenue),operatingProfit:this._parseNum(e.operating_profit),vat:0,netMargin:this._parseNum(e.net_margin)})}),l.length>0&&(this._data.users=l),this._data.hosts=u,this._data.brands=d,this._data.projects=f,this._data.liveHosts=p,this._data.results=m,this._data.finances=h,this._data.crmClients=g,this._data.crmActivities=_,this._data.classApplications=v,this._data.surveyQuestions=y,b&&b.length>0&&(this._data.classSettings=b),this._save()}async _syncToSheetDB(e,t,n){if(this._sheetDBReady)try{let r=``,i=null,a=`POST`;if(e===`users`)r=`/rest/v1/users`,t===`update`&&(a=`PATCH`,r=`/rest/v1/users?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/users?id=eq.${n.id}`),i={id:n.id,password:n.password,name:n.name,role:n.role,otp_secret:n.otpSecret||``};else if(e===`hosts`)r=`/rest/v1/hosts`,t===`update`&&(a=`PATCH`,r=`/rest/v1/hosts?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/hosts?id=eq.${n.id}`),i={id:n.id,name:n.name,phone:n.phone,ssn:n.ssn,bank:n.bank,account:n.account,account_holder:n.accountHolder,address:n.address,memo:n.memo.features};else if(e===`brands`)r=`/rest/v1/brands`,t===`update`&&(a=`PATCH`,r=`/rest/v1/brands?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/brands?id=eq.${n.id}`),i={id:n.id,name:n.name,company_name:n.companyName,category:n.category,tax_invoice:n.taxInvoice===!0,manager:n.manager,phone:n.phone,email:n.email,business_no:n.businessNo,address:n.address,memo:n.memo};else if(e===`crmClients`)r=`/rest/v1/crm_clients`,t===`update`&&(a=`PATCH`,r=`/rest/v1/crm_clients?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/crm_clients?id=eq.${n.id}`),i={id:n.id,company_name:n.companyName,contact_name:n.contactName,phone:n.phone,email:n.email,status:n.status,category:n.category,interested_service:n.interestedService,source:n.source,memo:n.memo,last_contact_date:n.lastContactDate,created_at:n.createdAt};else if(e===`crmActivities`)r=`/rest/v1/crm_activities`,t===`update`&&(a=`PATCH`,r=`/rest/v1/crm_activities?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/crm_activities?id=eq.${n.id}`),i={id:n.id,client_id:n.clientId,date:n.date,type:n.type,content:n.content,follow_up_date:n.followUpDate,created_at:n.createdAt};else if(e===`classApplications`)r=`/rest/v1/ryzin_class_applications`,t===`update`&&(a=`PATCH`,r=`/rest/v1/ryzin_class_applications?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/ryzin_class_applications?id=eq.${n.id}`),i={id:n.id,name:n.name,phone:n.phone,answers:n.answers,photo_url:n.photo_url,created_at:n.created_at};else if(e===`surveyQuestions`)r=`/rest/v1/ryzin_class_survey_questions`,t===`update`&&(a=`PATCH`,r=`/rest/v1/ryzin_class_survey_questions?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/ryzin_class_survey_questions?id=eq.${n.id}`),i={id:n.id,type:n.type,label:n.label,placeholder:n.placeholder,options:n.options,required:n.required===!0,sort_order:n.sort_order};else if(e===`classSettings`)r=`/rest/v1/ryzin_class_settings`,t===`update`&&(a=`PATCH`,r=`/rest/v1/ryzin_class_settings?key=eq.${n.key}`),i={key:n.key,value:n.value};else if([`projects`,`results`,`finances`,`liveHosts`].includes(e)){let o=n.liveId||n.id;if(r=`/rest/v1/live_broadcasts?on_conflict=id`,t===`delete`&&e===`projects`)a=`DELETE`,r=`/rest/v1/live_broadcasts?id=eq.${o}`,i=null;else{let e=this.getById(`projects`,o);if(!e&&t!==`delete`)return;let n=e?this.getById(`brands`,e.brandId):null,r=this.getById(`results`,o)||{},s=this.getById(`finances`,o)||{},c=this.query(`liveHosts`,e=>e.liveId===o),l=c[0]?this.getById(`hosts`,c[0].hostId):null,u=c[1]?this.getById(`hosts`,c[1].hostId):null,d=e?e.broadcastStatus:`new`,f=e?e.settleStatus:`wait`,p=L(d),m=R(f);i={id:o,status:p,brand_name:e?e.brandName||(n?n.name:``):``,category:e?e.category:``,broadcast_month:e?e.broadcastMonth:``,broadcast_date:e?e.broadcastDate:``,broadcast_time:e?e.broadcastTime:``,platform:e?e.platform:``,live_url:e?e.liveUrl:``,pd:e?e.pd:``,designer:e?e.designer:``,views:r.views||0,live_revenue:r.liveRevenue||0,host_a:l?l.name:``,fee_a:c[0]&&c[0].fee||0,host_b:u?u.name:``,fee_b:c[1]&&c[1].fee||0,settle_status:m,ad_cost:s.adCost||0,production_cost:s.productionCost||0,sales_revenue:s.salesRevenue||0,operating_profit:s.operatingProfit||0,net_margin:s.netMargin||0,note:e?e.note:``,scheme:e&&e.scheme?typeof e.scheme==`string`?e.scheme:JSON.stringify(e.scheme):``},a=`POST`}}let o={apikey:Ue,Authorization:`Bearer ${Ue}`,"Content-Type":`application/json`};if(a===`POST`&&[`live_broadcasts`,`users`,`hosts`,`brands`,`crm_clients`,`crm_activities`].some(e=>r.includes(e))&&(o.Prefer=`resolution=merge-duplicates`),i){let e=await fetch(`${U}${r}`,{method:a,headers:o,body:JSON.stringify(i)});if(e.ok)console.log(`[Supabase Sync Success] ${a} ${r}`);else{let t=await e.text();console.error(`[Supabase Sync Error] ${a} ${r} (Status: ${e.status}):`,t)}}else if(a===`DELETE`){let e=await fetch(`${U}${r}`,{method:`DELETE`,headers:{apikey:Ue,Authorization:`Bearer ${Ue}`}});if(e.ok)console.log(`[Supabase Sync Success] DELETE ${r}`);else{let t=await e.text();console.error(`[Supabase Sync Error] DELETE ${r} (Status: ${e.status}):`,t)}}}catch(e){console.error(`Supabase 동기화 에러:`,e)}}on(e,t){return this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t),()=>{this._listeners[e]=this._listeners[e].filter(e=>e!==t)}}_emit(e,t){this._listeners[e]&&this._listeners[e].forEach(e=>e(t)),this._listeners.change&&this._listeners.change.forEach(n=>n({event:e,data:t}))}getAll(e){return[...this._data[e]||[]]}getById(e,t){return(this._data[e]||[]).find(e=>e.id===t)||null}query(e,t){return(this._data[e]||[]).filter(t)}createBulk(e,t){return this._data[e]?(this._data[e].push(...t),this._save(),this._emit(e+`:changed`),this.isDemoMode||this._syncBulkToSheetDB(e,t).catch(e=>console.error(`SheetDB 대량 연동 실패:`,e)),!0):!1}async _syncBulkToSheetDB(e,t){if(!(!this._sheetDBReady||t.length===0))try{let n=``,r=[];if(e===`crmClients`&&(n=`/rest/v1/crm_clients`,r=t.map(e=>({id:e.id||``,company_name:e.companyName||``,contact_name:e.contactName||``,phone:e.phone||``,email:e.email||``,status:e.status||``,category:e.category||``,interested_service:e.interestedService||``,source:e.source||``,memo:e.memo||``,last_contact_date:e.lastContactDate||``,created_at:e.createdAt||``}))),!n)return;let i={apikey:Ue,Authorization:`Bearer ${Ue}`,"Content-Type":`application/json`,Prefer:`resolution=merge-duplicates`};await fetch(`${U}${n}`,{method:`POST`,headers:i,body:JSON.stringify(r)})}catch(e){console.error(`대량 저장 오류:`,e)}}create(e,t){return this._data[e]||(this._data[e]=[]),this._data[e].push(t),this._save(),this._emit(`${e}:created`,t),this._emit(`${e}:changed`),this._syncToSheetDB(e,`create`,t),t}getSetting(e,t=``){let n=(this._data.classSettings||[]).find(t=>t.key===e);return n?n.value:t}async setSetting(e,t){this._data.classSettings||(this._data.classSettings=[]);let n=this._data.classSettings,r=n.findIndex(t=>t.key===e);r===-1?n.push({key:e,value:t}):n[r].value=t,this._save(),this._emit(`classSettings:changed`);try{await fetch(`${U}/rest/v1/ryzin_class_settings`,{method:`POST`,headers:{apikey:Ue,Authorization:`Bearer ${Ue}`,"Content-Type":`application/json`,Prefer:`resolution=merge-duplicates`},body:JSON.stringify({key:e,value:t})})}catch(e){console.error(`설정 저장 에러:`,e)}}update(e,t,n){let r=this._data[e]||[],i=r.findIndex(e=>e.id===t||e.key===t);if(i===-1){let r={id:t,key:t,...n};return this.create(e,r)}return r[i]={...r[i],...n,updatedAt:new Date().toISOString()},this._save(),this._emit(`${e}:updated`,r[i]),this._emit(`${e}:changed`),this._syncToSheetDB(e,`update`,r[i]),r[i]}delete(e,t){let n=this._data[e]||[],r=n.findIndex(e=>e.id===t);if(r===-1)return!1;let i=n.splice(r,1)[0];return this._save(),this._emit(`${e}:deleted`,i),this._emit(`${e}:changed`),this._syncToSheetDB(e,`delete`,i),!0}getHostStats(e){let t=this.query(`liveHosts`,t=>t.hostId===e),n=t.map(e=>e.liveId),r=this.getAll(`projects`).filter(e=>n.includes(e.id)),i=this.getAll(`results`).filter(e=>n.includes(e.liveId)),a=r.length,o=new Date,s=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,`0`)}`,c=r.filter(e=>e.broadcastMonth===s).length,l=t.filter(e=>e.settleStatus===`done`).reduce((e,t)=>e+(t.fee||0),0),u=i.reduce((e,t)=>e+(t.liveRevenue||0),0),d=a>0?u/a:0,f=this.getAll(`finances`).filter(e=>n.includes(e.liveId)).reduce((e,t)=>e+(t.adCost||0)+(t.productionCost||0)+(t.hostCost||0)+(t.otherCost||0),0),p=f>0?u/f:0,m=r.filter(e=>e.broadcastDate).sort((e,t)=>t.broadcastDate.localeCompare(e.broadcastDate))[0];return{totalBroadcasts:a,monthBroadcasts:c,totalSettlement:l,avgRevenue:d,avgROI:p,lastBroadcastDate:m?m.broadcastDate:null}}getBrandStats(e){let t=this.getById(`brands`,e),n=this.query(`projects`,n=>n.brandId===e||t&&n.brandName===t.name),r=n.map(e=>e.id),i=this.getAll(`results`).filter(e=>r.includes(e.liveId)),a=this.getAll(`finances`).filter(e=>r.includes(e.liveId)),o=i.reduce((e,t)=>e+(t.liveRevenue||0),0),s=a.reduce((e,t)=>e+(t.adCost||0)+(t.productionCost||0)+(t.hostCost||0)+(t.otherCost||0),0),c=s>0?o/s:0,l=n.filter(e=>e.broadcastDate).sort((e,t)=>t.broadcastDate.localeCompare(e.broadcastDate))[0];return{totalBroadcasts:n.length,totalRevenue:o,avgROI:c,lastBroadcastDate:l?l.broadcastDate:null}}getDashboardKPI(){let e=this.getAll(`projects`),t=this.getAll(`results`),n=this.getAll(`finances`),r=new Date,i=r.getMonth()+1,a=r.getFullYear(),o=r.getDay(),s=r.getDate()-o+(o===0?-6:1),c=new Date(r.setDate(s));c.setHours(0,0,0,0);let l=new Date(c);l.setDate(c.getDate()+6),l.setHours(23,59,59,999);let u=0,d=[];e.forEach(e=>{if(!e.broadcastDate)return;let t=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(t.getTime())||(t.getFullYear()===a&&t.getMonth()+1===i&&d.push(e.id),t>=c&&t<=l&&u++)});let f=d.length,p=t.filter(e=>d.includes(e.liveId)).reduce((e,t)=>e+(parseInt(t.liveRevenue)||0),0),m=e.filter(e=>e.settleStatus!==`done`&&e.settleStatus!==`settle_done`).reduce((e,t)=>{let r=n.find(e=>e.liveId===t.id)||{},i=this.query(`liveHosts`,e=>e.liveId===t.id).reduce((e,t)=>e+(t.fee||0),0),a=parseInt(r.productionCost)||0,o=parseInt(r.adCost)||0,s=!!r.includeHostCost,c=!!r.brandPaysHost;return e+(r.salesRevenue!==void 0&&r.salesRevenue!==null&&parseInt(r.salesRevenue)>0?parseInt(r.salesRevenue):c||s?a+o:a+i+o)},0);return{thisWeekBroadcasts:u,monthBroadcasts:f,monthRevenue:p,settleWaitAmount:m}}calcProjectFinance(e){let t=this.query(`liveHosts`,t=>t.liveId===e).reduce((e,t)=>e+(t.brandPays?0:t.fee||0),0),n=this.getById(`finances`,e)||{},r=n.adCost||0,i=n.productionCost||0,a=n.otherCost||0,o=n.salesRevenue||0,s=o-r-i-t-a,c=o*.1;return{hostCost:t,adCost:r,productionCost:i,otherCost:a,salesRevenue:o,operatingProfit:s,vat:c,netMargin:s-c}}hasSeedData(){return this._data.projects&&this._data.projects.length>0}getCurrentUser(){let e=this._data.currentUser,t=this._data.authSignature;return e&&t&&t===He.default.SHA256(e.id+We).toString()?e:null}getCurrentRole(){return this._data.currentRole||`admin`}setCurrentRole(e){this._data.currentRole=e,this._save(),this._emit(`role:changed`,e)}login(e,t){let n=this.verifyPassword(e,t);return n?(this.completeLogin(n),!0):!1}verifyPassword(e,t){let n=He.default.SHA256(t).toString();return(this._data.users||[]).find(t=>t.id===e&&t.password===n)||null}completeLogin(e){this._data.currentUser=e,this._data.currentRole=e.role,this._data.authSignature=He.default.SHA256(e.id+We).toString(),this._save(),this._emit(`auth:login`,e)}logout(){this._data.currentUser=null,this._data.currentRole=`admin`,this._data.authSignature=null,this._save(),this._emit(`auth:logout`),localStorage.removeItem(this.STORAGE_KEY)}updateUser(e){let t=(this._data.users||[]).findIndex(t=>t.id===e.id);t!==-1&&(this._data.users[t]=e,this._save(),this._syncToSheetDB(`users`,`update`,e))}loginAsDemo(){localStorage.setItem(`ryzin_is_demo_mode`,`true`);let e=JSON.parse(localStorage.getItem(`livecommerce_erp_demo_data`)||`null`);e||=Ge();let t=e.users.find(e=>e.id===`admin`);e.currentUser=t,e.authSignature=He.default.SHA256(t.id+We).toString(),e.currentRole=`admin`,localStorage.setItem(`livecommerce_erp_demo_data`,JSON.stringify(e)),window.location.reload()}toggleDemoMode(e){let t=this.getCurrentUser(),n=this._data.authSignature,r=this._data.currentRole;localStorage.setItem(`ryzin_is_demo_mode`,e?`true`:`false`);let i=e?`livecommerce_erp_demo_data`:`livecommerce_erp_data`,a=JSON.parse(localStorage.getItem(i)||`null`);a||=Ge(),t&&(a.currentUser=t,a.authSignature=n,a.currentRole=r,a.users.find(e=>e.id===t.id)||a.users.push(t)),localStorage.setItem(i,JSON.stringify(a)),window.location.reload()}resetAll(){localStorage.removeItem(this.STORAGE_KEY),this._data={users:[],currentUser:null,hosts:[],brands:[],projects:[],tasks:[],liveHosts:[],products:[],designs:[],results:[],finances:[],currentRole:`admin`},this._emit(`data:reset`),this.init()}};function Ke(){return W.getCurrentRole()}function qe(){let e=Ke();if(e&&e.startsWith(`live_stream:`))return[{key:`live_stream`,label:`라이브 송출 관리`}];if(e&&e.startsWith(`brand:`))return[{key:`projects`,label:`라이브 관리`},{key:`settings`,label:`설정`}];let t=[{key:`dashboard`,label:`대시보드`},{key:`live_stream`,label:`라이브 송출 관리`},{key:`projects`,label:`라이브 관리`},{key:`hosts`,label:`쇼호스트 관리`},{key:`brands`,label:`브랜드 관리`},{key:`finance`,label:`매출/손익`},{key:`settlement`,label:`정산 관리`},{key:`contracts`,label:`계약 관리`},{key:`marketing`,label:`마케팅 메시지`},{key:`crm`,label:`영업 CRM`},{key:`shop_manage`,label:`쇼핑몰 관리`},{key:`class_applications`,label:`클래스 신청 관리`},{key:`news_manage`,label:`뉴스룸 관리`},{key:`homepage_manage`,label:`홈페이지 관리`},{key:`demo_manage`,label:`데모 시연 관리`},{key:`settings`,label:`설정`}];if(e===`admin`)return t;let n=oe[e];return n?t.filter(e=>n.permissions.some(t=>!!(t===`*`||t===e.key||t.startsWith(e.key+`.`)))):[]}var Je=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAADCCAYAAADXcrAvAAAOaklEQVR4nO3di27bWBIEUHGR//9lLmYHRrx52YolsbrrHCDAAjszIfv2fbBEy8d5njcAAABgt/9cfQEAAADA8wkAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACny7+gIAgAjnF//940HXAQBp+9xxW0IAAABdzhf/d9ccmgCo3efOP/x/x9YA4FkHhlTPHMikWiY3bFKdeH3/ncPmxlXXmzaH1SHPGfj3HwX33ewIG4ur18lJ93/1tW4c/6+4cjwm1e0M+/uPWzBvADyukaIH+hP3mXb9V09kmOIMnL9cZ8raeVUoAPT57LpoDZphwj53JveXLwF87EC//flITAOEmjCxIYk5w2f3n2TTrx+YbcM6utn08TlTrt8bAF2fqv+JTxFhNnO4U8Rhonz/BPauq9ai69nnHswbAM+15ssiXmjbJAd4ls3rZcwnJUA1a5HaP8tle5w3AK5NEY+wA87VnyAm1SJxfCB9DvN8bWuSNwKABNai19e6wfnuf7/s/OYNgNeK/kII/o9xYaqmjbNN89g23zuQwxsBz69vq/NVf5EA4PXSGzv9+gAaWZvVAMhhTX58PdX09po6CACuocHVBKwx2DPsn8BczvOM7C0BQM7PfCS9ct6+oCWNBfyt9nm8hXEEyGWN/nr91PDXnlYXAcC1khv+LJ34Hv7ZJGlucT/j9/u6qA2QwpqkZs/ylL1OAHC95N812nbASqs/AABs0vZ8ERcwCQDyND2EWgDAPMP6aA8BNnCuZQQBAPQFL0A2h0i1AmayfqtPfG8JADIH9ChYyJIWyKR6w/b5xp8ZK4DZfCfA7+tCQA0FADmSJ0XytQGfYx6zld4GyGadDqqlACDX5k+lkxaBzXWG5LnHz4wPANvY28JqKgDI0vijAAAAsI2zM5G+XX0BfOgIWkDOB4QSKfeSFK7AtHnMbsegtfyNvgYSta9NaXvFJn/dW94AmGHLwmERAMhdH4879pt7/lmAZgnr+xVa7zu+xgKAPOfS60u6L4dW2iXNR673lYf5pPVUXwPABwQAwFWSHhwaeVjiUbwNAGDPdcYY4lvxA8O0w++27wK4ytTr3sY4QAZzEQDmuvu5bFoA8Eg/Firl4XpjCHAOPuhOPhyn1H1TTbd56xFj0ulYuEdNDqgBNrh6H/isY9H93LX3NQcAUyUcsO4x6Vo3UXeYY9N8nbZHAVn+JsCbsuYIKOd/GHjeFvAdAN/5xOB+kyZB0/gmj0vTOEyS3DMA8JnvIXHG4KM++apjw1nOGwAzP7mYcp0p15g8WbfWvH0coFnKHnXlmtN+/3B13yfMwUaJdd/4425f4g0Avup3E2D0xBgqteZS+RlS+4eZY97+8A1cK/XssXl9Sru3Z/bAEdpjnxoDAcDP0gZy+nVeraVOaYsuM+mjPsYc2CzxIY3ne+WYH7dhBACzHaEHSAfKa+ufJKVH2dFPPMeGMX//aYx1B/jVGpFiw5qbLGmsI/kOADZ/s2na9bRtIg31hy0SfiWkNQNgpuTz6Csck2ogAJgv7ctOUq7DQVLt2RXobZZ0cHhkEKCHgCRpZ2Ye7+oQ+7wNIAD42YiBC5VSu4ZDZ0qtgb41pmGNBWAWe9MnP8TxHQBs0zD5kx/+G+rfIrnPuL433v8B4P51dItN91JxDhYA7GngEQ3Hanpwn8lrIq8jDACAIQQAu3gA2y/1gUzvAf8QBgDpnFn2SRrT4xbOdwDkPVgdLV9A0TjhviB1TDfXnH/5QkAevW5ZNwDgorObNwC+F4nZNh8o9SdX04PPt3kN+5G3BICrJay5G/bWDfdQp/kNgM0N2/YWQMIi3kjdgaRfOwhAH/vHndreAEj/1OGRDWwy7NDQq8yQ2ovskLw3A8Aa094AcDig5UE0ude31pyP+T6A52p7e+tX3t+/tQaAiY7k/bztDYBkzzjobD88bb2/2AVjcc3Z0Z8bmGPfeSsAAB5MALCfwyR6CZhM6AQ8gzPyfMbwL/ZOAUAGzatmbxx0mUCfPpc94dc9p+8A4IsEAB22HSa33c+bM7jeW2vOvn7dwpz7NX0HAF8gAOg55G05TG65jymfbG2sN0xh/s1bMwEgmgDgWg53wGQewtB/ADCIAKDr4X964DD9+qc9QG2sN109vIF5+Gf6DwDuIAC4hgMd6QdXPQo5fA/H3LUUAKIIAPoerK7++9uue9qB1YPGPAlzI7Wft0kY61R6EAA+QQDQeXhLuY6t1zv1oLqtzk0Sxi61r7cR0v2eHgSADwgAug7oydfTwgGVZzGnuxhvAOBuAoDn82nN1+vH86kzjyDgei3zVg8CwF2+3fePs+xgdoQf2CfU8B6Jtd5W43ZHcK/xmjls7AGA3xIAPNbEh6n0EGCD1PpO7Ffgz4RA/6651jcA+AUBwGM4aDzelpqmPvwDuwkCAICf+A6Ar9vwoJp2D2nXs/Hhf0uN+TXjy/te0A8AwP8IAB7zkPf2ZzIHxB7GuoNx5sd+aAoDpu/JAPAVv93v/QjAcw4cUw9YCd8HMLV2711dw821Zd6cZsZaoE8AmMZ3vvwFbwA8h4NU7wOqsSfNhnnFa98Q2NIz1mMAGB4ATDqYOHj0SR7zKfMGyLAtDACYdG5jtvMWbOqPAEz5vcdeSyGBAzzwqDUkdb8FABYHAJMOJ0KA/dJ67j0P/7z1QXKfMofvD4D7WHvZzPlioGk/AjD1gcfiv1fy2CbOBa6jH3hmb+kvAK6QfBa/ytEWAKTSnPskj6nDOPqi2/tfUfuqX1ebuO4kr9PAdawN1NryIwA/8joKAFtMOqgeA68Z4AqJoelUfuT6DlsDgNQQQHPukdZbb2wmfKZHUvu3ybl8H9JnkMG5AF7rTC/49h8BSFz04puCsWOY2O9k0ivoM5rWnNR9m2voh13zmzvHY3sAAC2bhsUXAIBWCWf08zZAQwCQ+GA0ojn4iXFjk8S1kX30Gc17uHMDv2Nt3Oe8DdEQAMD2SW0TQe+A9RGYfZ6bLOUsanw/QQBwHQ06R+pY+d3bPKqP6JK6psGW3n/Fr938DOt73pjwfN72+UBLAJC6AFqI8qWOUWpPA0Cy1H2dnjHfeoY7Ssf8vA3TEgDApgmdtMCyg57qk7q+wXTmVhbj0ess7K/jM/9QUwCQesBNaxz+ZVwAvs5aStPr4Po9i/HgmT1wTi3vt1uXY/Jg8TKpPZIaYrGD9bGv3ufydWXzvU2U0PM/Oh/UK2n31dj/iWPQOC6b5/mP/700n76/tgAgtTHJkdob2zcMMlgf+zwzBEhdT+FPvfrZ+aC/n2NzXZ3l5s3zlX3ZGAAk2v4pzBTJkzv52h5B/+cQAvSxB8H/zwdgt/NWfI5u+g6A9IeNbY04jfoDzXvRI38m2q/bYkLPA89hnodrDQAA+D2bd69zSZiqh2mm/6HHce+/4EcAsngNE6BL4o9cnJ88YKRdNzMk9jw8W1soY54Ha34DoG0iAtzDGsmvXut//wf+lvXledQ2T+uYtN53fI2bA4BUDlVACpu3Ok+kbwEyWI8DtQcAmhIAgA2ca/MYE+J6qz0ASJ2Y3gIAktbIxHVyGzVWxzZ6Xj230+PqENlbAgAAYAOH7XmMGXQw14NqKQB4UCGfwFsAQJLEdRLe6E+a6f88xkRNYvtKAAAAGRwYaaTv2UZPq000AUD2ZPUWAJAkcZ3cRo3VrJG+//u6qV0W40F8bwkA8gkBgCQON6+psTp/vlbsYCzVazo9rE4jzgQCgJ8LDMDHmxFcTR/uY0zVaSq9q15j+koAAABM47C9l7FlGj3793VTuwsIAH6mEQE+Zq18PjVWl1Z6X20m8AD7uDrywt4SAMxoRN8DANDJAfPnetDBWP9cDzXJYCyeU1Nur+ktAcAcQgAgjQ1brV/Za/qtj3H/XgcyGIvn1ra5vser/iIBAABf0bxZv1prrVvvm++ae6D53pO0P5y+UmOdj1f+ZQKAWc3nLQCAbm2H0KZ75c8ae7/pfpMZh2tq3lD344r7/Pbqv3CYfwbEQzfAx2vlP6yXr/P+wLCp7g0HPr5m83qj/69nDLJs3OuOqy9AADDPmdA4AMTYcECyr/G3PTO159/T/2rPffNk4rw/biEEAB/zFgAAU0x7KIo5EDHW5IcC/a/mfG3upM/54xboOM/0ugEAX5C00Ucehlgpqe/fMwdg97w/buEEAADQ51WHpPiDEHVe+YCg/2H3nD9uAwkAAAAAoIBfAwgAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAAt/3+C/BTDvwNC5yGAAAAAElFTkSuQmCC`,Ye={live_stream:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12A10 10 0 1 0 12 22a10 10 0 0 0 10-10z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>`,dashboard:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,projects:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,hosts:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,brands:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,finance:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,marketing:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,crm:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,settings:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,shop_manage:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>`},Xe=[{key:`dashboard`,label:`대시보드`,path:`/`,icon:`dashboard`},{key:`projects`,label:`라이브 관리`,path:`/projects`,icon:`projects`},{key:`live_stream`,label:`라이브 송출 관리`,path:`/live_stream`,icon:`live_stream`},{key:`hosts`,label:`쇼호스트 관리`,path:`/hosts`,icon:`hosts`},{key:`brands`,label:`브랜드 관리`,path:`/brands`,icon:`brands`},{key:`finance`,label:`매출/손익`,path:`/finance`,icon:`finance`},{key:`settlement`,label:`정산 관리`,path:`/settlement`,icon:`finance`},{key:`contracts`,label:`계약 관리`,path:`/contracts`,icon:`finance`},{key:`marketing`,label:`마케팅 메시지`,path:`/marketing`,icon:`marketing`},{key:`crm`,label:`영업 CRM`,path:`/crm`,icon:`crm`},{key:`shop_manage`,label:`쇼핑몰 관리`,path:`/shop_manage`,icon:`shop_manage`},{key:`class_applications`,label:`클래스 신청 관리`,path:`/class_applications`,icon:`crm`},{key:`news_manage`,label:`뉴스룸 관리`,path:`/news_manage`,icon:`marketing`},{key:`homepage_manage`,label:`홈페이지 관리`,path:`/homepage_manage`,icon:`dashboard`},{key:`demo_manage`,label:`데모 시연 관리`,path:`/demo_manage`,icon:`projects`},{key:`settings`,label:`설정`,path:`/settings`,icon:`settings`}];function Ze(){let e=W.getCurrentUser(),t=oe[W.getCurrentRole()]?.label||`관리자`,n=e?e.name:t,r=qe().map(e=>e.key),i=W.isDemoMode||e&&(e.id===`demo`||e.role===`demo`),a=document.createElement(`aside`);a.className=`sidebar`,a.id=`sidebar`,a.innerHTML=`
    <div class="sidebar-header" style="padding: var(--space-4) var(--space-4); margin-bottom: var(--space-2);">
      <div id="sidebar-logo-container" style="display: flex; align-items: center; justify-content: flex-start; width: 100%; cursor: pointer;">
        <img src="${Je}" alt="Ryzin Logo" style="height: 26px; max-width: 175px; object-fit: contain; margin-bottom: 0;" />
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">
        ${Xe.filter(e=>r.includes(e.key)).filter(e=>!(i&&e.key===`live_stream`)).map(e=>`
            <div class="sidebar-item" data-href="${e.path}" id="nav-${e.key}">
              ${Ye[e.icon]||``}
              <span>${e.label}</span>
            </div>
          `).join(``)}
      </div>
    </nav>
    <div class="sidebar-footer">
      ${W.isDemoMode?`
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
  `;let o=a.querySelector(`#sidebar-logo-container`);o&&o.addEventListener(`click`,()=>{M.navigate(`/`)}),a.querySelectorAll(`.sidebar-item`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-href`);M.navigate(n)})});let s=a.querySelector(`#btn-logout`);return s&&s.addEventListener(`click`,()=>{W.logout(),M.navigate(`/login`)}),a}function G(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(Math.round(e))+`원`}function Qe(e){return e==null||isNaN(e)?`-`:Math.abs(e)>=1e8?(e/1e8).toFixed(1).replace(/\.0$/,``)+`억`:Math.abs(e)>=1e4?(e/1e4).toFixed(0)+`만`:G(e)}function $e(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(e)}function et(e){return e?e.replace(/\./g,`-`):`-`}function tt(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(Math.round(e*100))+`%`}function nt(e){return e?e.includes(`*`)?e:e.substring(0,6)+`-*******`:`-`}function rt(e){let t=N.find(t=>t.key===e);if(!t)return`<span class="badge badge-default">${e}</span>`;let n=`var(--bg-tertiary)`,r=`var(--text-secondary)`;switch(t.color){case`blue`:n=`#EFF6FF`,r=`#2563EB`;break;case`indigo`:n=`#EEF2FF`,r=`#4F46E5`;break;case`purple`:n=`#FAF5FF`,r=`#9333EA`;break;case`pink`:n=`#FDF2F8`,r=`#DB2777`;break;case`rose`:n=`#FFF1F2`,r=`#E11D48`;break;case`orange`:n=`#FFF7ED`,r=`#EA580C`;break;case`yellow`:n=`#FEFCE8`,r=`#CA8A04`;break;case`teal`:n=`#F0FDFA`,r=`#0D9488`;break;case`red`:n=`#FEF2F2`,r=`#DC2626`;break;case`green`:n=`#ECFDF5`,r=`#059669`;break;case`gray`:n=`#F3F4F6`,r=`#4B5563`;break}return`<span class="badge" style="background:${n}; color:${r};">${t.label}</span>`}function it(e){let t=P.find(t=>t.key===e);if(!t)return`<span class="badge badge-default">${e}</span>`;let n=`var(--bg-tertiary)`,r=`var(--text-secondary)`;switch(t.color){case`orange`:n=`#FFF7ED`,r=`#EA580C`;break;case`green`:n=`#ECFDF5`,r=`#059669`;break}return`<span class="badge" style="background:${n}; color:${r};">${t.label}</span>`}function at(e){return rt(e)}var ot=null;function K({title:e,size:t=`md`,content:n,footer:r,onClose:i}){q();let a=document.createElement(`div`);a.className=`modal-overlay`,a.id=`modal-overlay`,a.innerHTML=`
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
  `,document.body.appendChild(a),document.body.style.overflow=`hidden`;let o=a.querySelector(`#modal-body`);if(typeof n==`string`)o.innerHTML=n;else if(n instanceof HTMLElement)o.appendChild(n);else if(typeof n==`function`){let e=n(o);typeof e==`string`?o.innerHTML=e:e instanceof HTMLElement&&o.appendChild(e)}if(r!==!1){let e=a.querySelector(`#modal-footer`);if(typeof r==`string`)e.innerHTML=r;else if(r instanceof HTMLElement)e.appendChild(r);else if(typeof r==`function`){let t=r(e);typeof t==`string`?e.innerHTML=t:t instanceof HTMLElement&&e.appendChild(t)}}let s=()=>{q(),i&&i()};a.querySelector(`#modal-close-btn`).addEventListener(`click`,s),a.addEventListener(`click`,e=>{e.target===a&&s()});let c=e=>{e.key===`Escape`&&(s(),document.removeEventListener(`keydown`,c))};return document.addEventListener(`keydown`,c),ot={overlay:a,escHandler:c},a}function q(){if(ot){let{overlay:e,escHandler:t}=ot;e.classList.add(`closing`),document.removeEventListener(`keydown`,t),setTimeout(()=>{e.remove(),document.body.style.overflow=``},150),ot=null}}function st({title:e=`확인`,message:t,onConfirm:n,confirmText:r=`확인`,cancelText:i=`취소`,danger:a=!1}){let o=document.createElement(`div`);o.innerHTML=`<p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">${t}</p>`;let s=document.createElement(`div`);s.style.display=`flex`,s.style.gap=`var(--space-3)`,s.style.justifyContent=`flex-end`,s.style.width=`100%`;let c=document.createElement(`button`);c.className=`btn btn-secondary`,c.textContent=i,c.addEventListener(`click`,q);let l=document.createElement(`button`);l.className=a?`btn btn-danger`:`btn btn-primary`,l.textContent=r,l.addEventListener(`click`,()=>{q(),n&&n()}),s.appendChild(c),s.appendChild(l),K({title:e,size:`sm`,content:o,footer:s,onClose:null})}var ct=null;function lt(){return(!ct||!document.body.contains(ct))&&(ct=document.createElement(`div`),ct.className=`toast-container`,ct.id=`toast-container`,document.body.appendChild(ct)),ct}function ut(e,t=`info`,n=3e3){let r=lt(),i=document.createElement(`div`);return i.className=`toast toast-${t}`,i.innerHTML=`
    <span class="toast-message">${e}</span>
    <span class="toast-close">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </span>
  `,r.appendChild(i),i.querySelector(`.toast-close`).addEventListener(`click`,()=>dt(i)),n>0&&setTimeout(()=>dt(i),n),i}function dt(e){e.classList.add(`removing`),setTimeout(()=>e.remove(),150)}function J(e){return ut(e,`success`)}function Y(e){return ut(e,`error`)}var ft=`in_progress`;function pt(){let e=document.createElement(`div`),t=W.getCurrentRole(),n=W.getCurrentUser(),r=t===`pd`,i=W.getDashboardKPI(),a=W.getAll(`projects`);if(r){let e=(n?.name||``).trim().toLowerCase(),t=(n?.id||``).trim().toLowerCase();a=a.filter(n=>{if(!n.pd)return!1;let r=String(n.pd).trim().toLowerCase();return e&&r.includes(e)||t&&r.includes(t)})}let o=a;o=ft===`in_progress`?a.filter(e=>![`done`].includes(e.broadcastStatus)):ft===`ended`?a.filter(e=>[`done`].includes(e.broadcastStatus)&&e.settleStatus!==`done`):a;let s=[];return a.filter(e=>e.broadcastStatus!==`done`).forEach(e=>{let t=0;if(e.broadcastStatus===`design`?t=-4:e.broadcastStatus===`cue_sheet`?t=-5:e.broadcastStatus===`host_cast`&&(t=-7),t!==0&&e.broadcastDate){let n=new Date(e.broadcastDate.replace(/\./g,`-`));if(!isNaN(n.getTime())){let r=new Date(n);r.setDate(r.getDate()+t);let i=new Date;i.setHours(0,0,0,0);let a=Math.ceil((r.getTime()-i.getTime())/(1e3*60*60*24)),o=W.getById(`brands`,e.brandId);s.push({project:e,brandName:e.brandName||(o?o.name:`-`),diffDays:a,ddayText:a===0?`D-Day`:a>0?`D-${a}`:`D+${Math.abs(a)}`})}}}),s.sort((e,t)=>e.diffDays-t.diffDays),e.innerHTML=`
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
        ${mt(`이번주 방송`,$e(i.thisWeekBroadcasts)+`건`,`/projects`)}
        ${mt(`이번달 방송`,$e(i.monthBroadcasts)+`건`,`/projects`)}
        ${r?mt(`이번달 매출`,`**`,null):mt(`이번달 매출`,Qe(i.monthRevenue),`/finance`)}
        ${r?mt(`브랜드 미수금`,`**`,null):mt(`브랜드 미수금`,Qe(i.settleWaitAmount),`/projects?settleStatus=pending`)}
      </div>

      
      <div class="section-header" style="margin-top: var(--space-6);">
        <div>
          <h2 class="section-title">라이브 프로젝트</h2>
          <p class="section-subtitle">상태별 프로젝트 모아보기</p>
        </div>
        <div style="display: flex; gap: var(--space-3); align-items: center;">
          <select id="dashboard-filter" class="input" style="padding: 6px 12px; width: auto; font-size: 14px;">
            <option value="in_progress" ${ft===`in_progress`?`selected`:``}>진행 중 (기본)</option>
            <option value="ended" ${ft===`ended`?`selected`:``}>방송 종료</option>
            <option value="all" ${ft===`all`?`selected`:``}>전체 보기</option>
          </select>
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
        </div>
      </div>

      <div class="project-grid" id="project-grid">
        ${o.length>0?o.sort((e,t)=>(e.broadcastDate||``).localeCompare(t.broadcastDate||``)).map(e=>ht(e)).join(``):gt()}
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
              ${s.length>0?s.map(e=>`
                <tr style="cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--surface-hover)'" onmouseout="this.style.background=''" class="pd-task-row" data-id="${e.project.id}">
                  <td><span style="font-weight: var(--weight-medium);">${e.brandName}</span></td>
                  <td>${e.project.broadcastDate}</td>
                  <td>${rt(e.project.broadcastStatus)}</td>
                  <td class="text-right"><span style="color: ${e.diffDays<=1?`var(--status-error)`:`var(--text-secondary)`}; font-weight: 600;">${e.ddayText}</span></td>
                </tr>
              `).join(``):`<tr><td colspan="4" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">현재 마감 기한이 있는 업무가 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{e.querySelectorAll(`.kpi-card[data-route]`).forEach(e=>{e.addEventListener(`click`,()=>{M.navigate(e.getAttribute(`data-route`))})}),e.querySelectorAll(`.project-card`).forEach(e=>{e.addEventListener(`click`,()=>{vt(e.getAttribute(`data-id`))})}),e.querySelectorAll(`.pd-task-row`).forEach(e=>{e.addEventListener(`click`,()=>{vt(e.getAttribute(`data-id`))})});let t=e.querySelector(`#btn-new-project`);t&&t.addEventListener(`click`,()=>{M.navigate(`/projects/new`)});let n=e.querySelector(`#dashboard-filter`);n&&n.addEventListener(`change`,e=>{ft=e.target.value;let t=document.getElementById(`page-content`);t&&(t.innerHTML=``,t.appendChild(pt()))})},0),e}function mt(e,t,n=null){return`
    <div class="kpi-card" ${n?`data-route="${n}" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'"`:``}>
      <div class="kpi-label">${e}</div>
      <div class="kpi-value">${t}</div>
    </div>
  `}function ht(e){let t=W.getById(`brands`,e.brandId),n=e.brandName||(t?t.name:`-`),r=0;e.broadcastStatus===`scheduled`?r=20:e.broadcastStatus===`host_cast`?r=40:e.broadcastStatus===`tech_request`?r=60:e.broadcastStatus===`design`?r=80:e.broadcastStatus===`cue_sheet`?r=90:e.broadcastStatus===`done`&&(r=100);let i=``;if(e.broadcastStatus===`done`)i=`D-0`;else if(e.broadcastDate){let t=new Date(e.broadcastDate.replace(/\./g,`-`));if(!isNaN(t.getTime())){let e=new Date;e.setHours(0,0,0,0);let n=Math.ceil((t.getTime()-e.getTime())/(1e3*60*60*24));i=n===0?`D-Day`:n>0?`D-${n}`:`D+${Math.abs(n)}`}}let a=W.query(`liveHosts`,t=>t.liveId===e.id).map(e=>{let t=W.getById(`hosts`,e.hostId);return t?t.name:`-`}).join(`, `);return`
    <div class="project-card" data-id="${e.id}">
      <div class="project-card-header" style="justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="project-card-brand">${n}</span>
          ${rt(e.broadcastStatus)}
        </div>
        ${i?`<div style="font-size: 11px; font-weight: 600; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.05); color: var(--text-secondary);">${i}</div>`:``}
      </div>
      <div class="project-card-meta">
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">방송일</span>
          <span>${et(e.broadcastDate)}</span>
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
  `}function gt(){return`
    <div class="empty-state" style="grid-column: 1 / -1;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
      <h3>진행중인 프로젝트가 없습니다</h3>
      <p>새 라이브 프로젝트를 등록해 주세요.</p>
    </div>
  `}function _t(e,t){if(!e)return``;let n=e.replace(/\./g,`-`),r=new Date(n);if(isNaN(r.getTime()))return``;let i=0;if(t===`design`?i=-4:t===`cue_sheet`?i=-5:t===`host_cast`&&(i=-7),i===0)return``;let a=new Date(r);a.setDate(a.getDate()+i);let o=String(a.getMonth()+1).padStart(2,`0`),s=String(a.getDate()).padStart(2,`0`),c=new Date;c.setHours(0,0,0,0);let l=a.getTime()-c.getTime(),u=Math.ceil(l/(1e3*60*60*24)),d=``;return d=u===0?`D-Day`:u>0?`D-${u}`:`D+${Math.abs(u)}`,`<br><span style="font-size: 10px; opacity: 0.8; font-weight: normal;">(${o}/${s} 까지 / <strong style="color:var(--status-error);">${d}</strong>)</span>`}function vt(e){let t=W.getById(`projects`,e);if(!t)return;let n=W.getById(`brands`,t.brandId),r=t.brandName||(n?n.name:`-`),i=document.createElement(`div`);i.innerHTML=`
    <div style="margin-bottom: var(--space-5);">
      <div style="font-size: var(--text-md); font-weight: var(--weight-semibold); margin-bottom: var(--space-1);">${r}</div>
      <div style="font-size: var(--text-sm); color: var(--text-tertiary);">${et(t.broadcastDate)}</div>
    </div>
    <div style="margin-bottom: var(--space-4);">
      <label style="font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-secondary); display: block; margin-bottom: var(--space-2);">방송 진행 상태 변경</label>
      <div class="status-options" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2);">
        ${N.map(e=>`
          <button class="btn ${t.broadcastStatus===e.key?`btn-primary`:`btn-secondary`} btn-sm status-option" data-status="${e.key}" style="flex-direction: column; align-items: flex-start; justify-content: flex-start; font-size: 12px; padding: var(--space-1) var(--space-2); height: auto; line-height: 1.3;">
            <span>${e.label}</span>${_t(t.broadcastDate,e.key)}
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
  `,K({title:`프로젝트 상태 변경`,size:`md`,content:i,footer:o}),document.querySelectorAll(`.status-option`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.status-option`).forEach(e=>{e.className=`btn btn-secondary btn-sm status-option`,e.style.justifyContent=`flex-start`,e.style.fontSize=`12px`}),e.className=`btn btn-primary btn-sm status-option`,e.style.justifyContent=`flex-start`,e.style.fontSize=`12px`,a=e.getAttribute(`data-status`)})}),document.getElementById(`modal-cancel`)?.addEventListener(`click`,q),document.getElementById(`modal-view-detail`)?.addEventListener(`click`,()=>{q(),M.navigate(`/projects/${e}`)}),document.getElementById(`modal-save`)?.addEventListener(`click`,()=>{W.update(`projects`,e,{broadcastStatus:a}),q(),J(`방송 상태가 "${L(a)}"(으)로 변경되었습니다.`);let t=document.getElementById(`page-content`);t&&(t.innerHTML=``,t.appendChild(pt()))})}var yt=o(((e,t)=>{t.exports=function(){return typeof Promise==`function`&&Promise.prototype&&Promise.prototype.then}})),bt=o((e=>{var t,n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(e){if(!e)throw Error(`"version" cannot be null or undefined`);if(e<1||e>40)throw Error(`"version" should be in range from 1 to 40`);return e*4+17},e.getSymbolTotalCodewords=function(e){return n[e]},e.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t},e.setToSJISFunction=function(e){if(typeof e!=`function`)throw Error(`"toSJISFunc" is not a valid function.`);t=e},e.isKanjiModeEnabled=function(){return t!==void 0},e.toSJIS=function(e){return t(e)}})),xt=o((e=>{e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`l`:case`low`:return e.L;case`m`:case`medium`:return e.M;case`q`:case`quartile`:return e.Q;case`h`:case`high`:return e.H;default:throw Error(`Unknown EC Level: `+t)}}e.isValid=function(e){return e&&e.bit!==void 0&&e.bit>=0&&e.bit<4},e.from=function(n,r){if(e.isValid(n))return n;try{return t(n)}catch{return r}}})),St=o(((e,t)=>{function n(){this.buffer=[],this.length=0}n.prototype={get:function(e){let t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)==1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},t.exports=n})),Ct=o(((e,t)=>{function n(e){if(!e||e<1)throw Error(`BitMatrix size must be defined and greater than 0`);this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}n.prototype.set=function(e,t,n,r){let i=e*this.size+t;this.data[i]=n,r&&(this.reservedBit[i]=!0)},n.prototype.get=function(e,t){return this.data[e*this.size+t]},n.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},n.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},t.exports=n})),wt=o((e=>{var t=bt().getSymbolSize;e.getRowColCoords=function(e){if(e===1)return[];let n=Math.floor(e/7)+2,r=t(e),i=r===145?26:Math.ceil((r-13)/(2*n-2))*2,a=[r-7];for(let e=1;e<n-1;e++)a[e]=a[e-1]-i;return a.push(6),a.reverse()},e.getPositions=function(t){let n=[],r=e.getRowColCoords(t),i=r.length;for(let e=0;e<i;e++)for(let t=0;t<i;t++)e===0&&t===0||e===0&&t===i-1||e===i-1&&t===0||n.push([r[e],r[t]]);return n}})),Tt=o((e=>{var t=bt().getSymbolSize,n=7;e.getPositions=function(e){let r=t(e);return[[0,0],[r-n,0],[0,r-n]]}})),Et=o((e=>{e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(e){return e!=null&&e!==``&&!isNaN(e)&&e>=0&&e<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(e){let n=e.size,r=0,i=0,a=0,o=null,s=null;for(let c=0;c<n;c++){i=a=0,o=s=null;for(let l=0;l<n;l++){let n=e.get(c,l);n===o?i++:(i>=5&&(r+=t.N1+(i-5)),o=n,i=1),n=e.get(l,c),n===s?a++:(a>=5&&(r+=t.N1+(a-5)),s=n,a=1)}i>=5&&(r+=t.N1+(i-5)),a>=5&&(r+=t.N1+(a-5))}return r},e.getPenaltyN2=function(e){let n=e.size,r=0;for(let t=0;t<n-1;t++)for(let i=0;i<n-1;i++){let n=e.get(t,i)+e.get(t,i+1)+e.get(t+1,i)+e.get(t+1,i+1);(n===4||n===0)&&r++}return r*t.N2},e.getPenaltyN3=function(e){let n=e.size,r=0,i=0,a=0;for(let t=0;t<n;t++){i=a=0;for(let o=0;o<n;o++)i=i<<1&2047|e.get(t,o),o>=10&&(i===1488||i===93)&&r++,a=a<<1&2047|e.get(o,t),o>=10&&(a===1488||a===93)&&r++}return r*t.N3},e.getPenaltyN4=function(e){let n=0,r=e.data.length;for(let t=0;t<r;t++)n+=e.data[t];return Math.abs(Math.ceil(n*100/r/5)-10)*t.N4};function n(t,n,r){switch(t){case e.Patterns.PATTERN000:return(n+r)%2==0;case e.Patterns.PATTERN001:return n%2==0;case e.Patterns.PATTERN010:return r%3==0;case e.Patterns.PATTERN011:return(n+r)%3==0;case e.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(r/3))%2==0;case e.Patterns.PATTERN101:return n*r%2+n*r%3==0;case e.Patterns.PATTERN110:return(n*r%2+n*r%3)%2==0;case e.Patterns.PATTERN111:return(n*r%3+(n+r)%2)%2==0;default:throw Error(`bad maskPattern:`+t)}}e.applyMask=function(e,t){let r=t.size;for(let i=0;i<r;i++)for(let a=0;a<r;a++)t.isReserved(a,i)||t.xor(a,i,n(e,a,i))},e.getBestMask=function(t,n){let r=Object.keys(e.Patterns).length,i=0,a=1/0;for(let o=0;o<r;o++){n(o),e.applyMask(o,t);let r=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(o,t),r<a&&(a=r,i=o)}return i}})),Dt=o((e=>{var t=xt(),n=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(e,r){switch(r){case t.L:return n[(e-1)*4+0];case t.M:return n[(e-1)*4+1];case t.Q:return n[(e-1)*4+2];case t.H:return n[(e-1)*4+3];default:return}},e.getTotalCodewordsCount=function(e,n){switch(n){case t.L:return r[(e-1)*4+0];case t.M:return r[(e-1)*4+1];case t.Q:return r[(e-1)*4+2];case t.H:return r[(e-1)*4+3];default:return}}})),Ot=o((e=>{var t=new Uint8Array(512),n=new Uint8Array(256);(function(){let e=1;for(let r=0;r<255;r++)t[r]=e,n[e]=r,e<<=1,e&256&&(e^=285);for(let e=255;e<512;e++)t[e]=t[e-255]})(),e.log=function(e){if(e<1)throw Error(`log(`+e+`)`);return n[e]},e.exp=function(e){return t[e]},e.mul=function(e,r){return e===0||r===0?0:t[n[e]+n[r]]}})),kt=o((e=>{var t=Ot();e.mul=function(e,n){let r=new Uint8Array(e.length+n.length-1);for(let i=0;i<e.length;i++)for(let a=0;a<n.length;a++)r[i+a]^=t.mul(e[i],n[a]);return r},e.mod=function(e,n){let r=new Uint8Array(e);for(;r.length-n.length>=0;){let e=r[0];for(let i=0;i<n.length;i++)r[i]^=t.mul(n[i],e);let i=0;for(;i<r.length&&r[i]===0;)i++;r=r.slice(i)}return r},e.generateECPolynomial=function(n){let r=new Uint8Array([1]);for(let i=0;i<n;i++)r=e.mul(r,new Uint8Array([1,t.exp(i)]));return r}})),At=o(((e,t)=>{var n=kt();function r(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}r.prototype.initialize=function(e){this.degree=e,this.genPoly=n.generateECPolynomial(this.degree)},r.prototype.encode=function(e){if(!this.genPoly)throw Error(`Encoder not initialized`);let t=new Uint8Array(e.length+this.degree);t.set(e);let r=n.mod(t,this.genPoly),i=this.degree-r.length;if(i>0){let e=new Uint8Array(this.degree);return e.set(r,i),e}return r},t.exports=r})),jt=o((e=>{e.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}})),Mt=o((e=>{var t=`[0-9]+`,n=`[A-Z $%*+\\-./:]+`,r=`(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+`;r=r.replace(/u/g,`\\u`);var i=`(?:(?![A-Z0-9 $%*+\\-./:]|`+r+`)(?:.|[\r
]))+`;e.KANJI=new RegExp(r,`g`),e.BYTE_KANJI=RegExp(`[^A-Z0-9 $%*+\\-./:]+`,`g`),e.BYTE=new RegExp(i,`g`),e.NUMERIC=new RegExp(t,`g`),e.ALPHANUMERIC=new RegExp(n,`g`);var a=RegExp(`^`+r+`$`),o=RegExp(`^[0-9]+$`),s=RegExp(`^[A-Z0-9 $%*+\\-./:]+$`);e.testKanji=function(e){return a.test(e)},e.testNumeric=function(e){return o.test(e)},e.testAlphanumeric=function(e){return s.test(e)}})),Nt=o((e=>{var t=jt(),n=Mt();e.NUMERIC={id:`Numeric`,bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:`Alphanumeric`,bit:2,ccBits:[9,11,13]},e.BYTE={id:`Byte`,bit:4,ccBits:[8,16,16]},e.KANJI={id:`Kanji`,bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(e,n){if(!e.ccBits)throw Error(`Invalid mode: `+e);if(!t.isValid(n))throw Error(`Invalid version: `+n);return n>=1&&n<10?e.ccBits[0]:n<27?e.ccBits[1]:e.ccBits[2]},e.getBestModeForData=function(t){return n.testNumeric(t)?e.NUMERIC:n.testAlphanumeric(t)?e.ALPHANUMERIC:n.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(e){if(e&&e.id)return e.id;throw Error(`Invalid mode`)},e.isValid=function(e){return e&&e.bit&&e.ccBits};function r(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`numeric`:return e.NUMERIC;case`alphanumeric`:return e.ALPHANUMERIC;case`kanji`:return e.KANJI;case`byte`:return e.BYTE;default:throw Error(`Unknown mode: `+t)}}e.from=function(t,n){if(e.isValid(t))return t;try{return r(t)}catch{return n}}})),Pt=o((e=>{var t=bt(),n=Dt(),r=xt(),i=Nt(),a=jt(),o=7973,s=t.getBCHDigit(o);function c(t,n,r){for(let i=1;i<=40;i++)if(n<=e.getCapacity(i,r,t))return i}function l(e,t){return i.getCharCountIndicator(e,t)+4}function u(e,t){let n=0;return e.forEach(function(e){let r=l(e.mode,t);n+=r+e.getBitsLength()}),n}function d(t,n){for(let r=1;r<=40;r++)if(u(t,r)<=e.getCapacity(r,n,i.MIXED))return r}e.from=function(e,t){return a.isValid(e)?parseInt(e,10):t},e.getCapacity=function(e,r,o){if(!a.isValid(e))throw Error(`Invalid QR Code version`);o===void 0&&(o=i.BYTE);let s=(t.getSymbolTotalCodewords(e)-n.getTotalCodewordsCount(e,r))*8;if(o===i.MIXED)return s;let c=s-l(o,e);switch(o){case i.NUMERIC:return Math.floor(c/10*3);case i.ALPHANUMERIC:return Math.floor(c/11*2);case i.KANJI:return Math.floor(c/13);case i.BYTE:default:return Math.floor(c/8)}},e.getBestVersionForData=function(e,t){let n,i=r.from(t,r.M);if(Array.isArray(e)){if(e.length>1)return d(e,i);if(e.length===0)return 1;n=e[0]}else n=e;return c(n.mode,n.getLength(),i)},e.getEncodedBits=function(e){if(!a.isValid(e)||e<7)throw Error(`Invalid QR Code version`);let n=e<<12;for(;t.getBCHDigit(n)-s>=0;)n^=o<<t.getBCHDigit(n)-s;return e<<12|n}})),Ft=o((e=>{var t=bt(),n=1335,r=21522,i=t.getBCHDigit(n);e.getEncodedBits=function(e,a){let o=e.bit<<3|a,s=o<<10;for(;t.getBCHDigit(s)-i>=0;)s^=n<<t.getBCHDigit(s)-i;return(o<<10|s)^r}})),It=o(((e,t)=>{var n=Nt();function r(e){this.mode=n.NUMERIC,this.data=e.toString()}r.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let t,n,r;for(t=0;t+3<=this.data.length;t+=3)n=this.data.substr(t,3),r=parseInt(n,10),e.put(r,10);let i=this.data.length-t;i>0&&(n=this.data.substr(t),r=parseInt(n,10),e.put(r,i*3+1))},t.exports=r})),Lt=o(((e,t)=>{var n=Nt(),r=`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:`.split(``);function i(e){this.mode=n.ALPHANUMERIC,this.data=e}i.getBitsLength=function(e){return 11*Math.floor(e/2)+e%2*6},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let n=r.indexOf(this.data[t])*45;n+=r.indexOf(this.data[t+1]),e.put(n,11)}this.data.length%2&&e.put(r.indexOf(this.data[t]),6)},t.exports=i})),Rt=o(((e,t)=>{var n=Nt();function r(e){this.mode=n.BYTE,typeof e==`string`?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}r.getBitsLength=function(e){return e*8},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},t.exports=r})),zt=o(((e,t)=>{var n=Nt(),r=bt();function i(e){this.mode=n.KANJI,this.data=e}i.getBitsLength=function(e){return e*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let n=r.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error(`Invalid SJIS character: `+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}},t.exports=i})),Bt=o(((e,t)=>{var n={single_source_shortest_paths:function(e,t,r){var i={},a={};a[t]=0;var o=n.PriorityQueue.make();o.push(t,0);for(var s,c,l,u,d,f,p,m,h;!o.empty();)for(l in s=o.pop(),c=s.value,u=s.cost,d=e[c]||{},d)d.hasOwnProperty(l)&&(f=d[l],p=u+f,m=a[l],h=a[l]===void 0,(h||m>p)&&(a[l]=p,o.push(l,p),i[l]=c));if(r!==void 0&&a[r]===void 0){var g=[`Could not find a path from `,t,` to `,r,`.`].join(``);throw Error(g)}return i},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],r=t;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,t,r){var i=n.single_source_shortest_paths(e,t,r);return n.extract_shortest_path_from_predecessor_list(i,r)},PriorityQueue:{make:function(e){var t=n.PriorityQueue,r={},i;for(i in e||={},t)t.hasOwnProperty(i)&&(r[i]=t[i]);return r.queue=[],r.sorter=e.sorter||t.default_sorter,r},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){var n={value:e,cost:t};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t!==void 0&&(t.exports=n)})),Vt=o((e=>{var t=Nt(),n=It(),r=Lt(),i=Rt(),a=zt(),o=Mt(),s=bt(),c=Bt();function l(e){return unescape(encodeURIComponent(e)).length}function u(e,t,n){let r=[],i;for(;(i=e.exec(n))!==null;)r.push({data:i[0],index:i.index,mode:t,length:i[0].length});return r}function d(e){let n=u(o.NUMERIC,t.NUMERIC,e),r=u(o.ALPHANUMERIC,t.ALPHANUMERIC,e),i,a;return s.isKanjiModeEnabled()?(i=u(o.BYTE,t.BYTE,e),a=u(o.KANJI,t.KANJI,e)):(i=u(o.BYTE_KANJI,t.BYTE,e),a=[]),n.concat(r,i,a).sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function f(e,o){switch(o){case t.NUMERIC:return n.getBitsLength(e);case t.ALPHANUMERIC:return r.getBitsLength(e);case t.KANJI:return a.getBitsLength(e);case t.BYTE:return i.getBitsLength(e)}}function p(e){return e.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?(e[e.length-1].data+=t.data,e):(e.push(t),e)},[])}function m(e){let n=[];for(let r=0;r<e.length;r++){let i=e[r];switch(i.mode){case t.NUMERIC:n.push([i,{data:i.data,mode:t.ALPHANUMERIC,length:i.length},{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.ALPHANUMERIC:n.push([i,{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.KANJI:n.push([i,{data:i.data,mode:t.BYTE,length:l(i.data)}]);break;case t.BYTE:n.push([{data:i.data,mode:t.BYTE,length:l(i.data)}])}}return n}function h(e,n){let r={},i={start:{}},a=[`start`];for(let o=0;o<e.length;o++){let s=e[o],c=[];for(let e=0;e<s.length;e++){let l=s[e],u=``+o+e;c.push(u),r[u]={node:l,lastCount:0},i[u]={};for(let e=0;e<a.length;e++){let o=a[e];r[o]&&r[o].node.mode===l.mode?(i[o][u]=f(r[o].lastCount+l.length,l.mode)-f(r[o].lastCount,l.mode),r[o].lastCount+=l.length):(r[o]&&(r[o].lastCount=l.length),i[o][u]=f(l.length,l.mode)+4+t.getCharCountIndicator(l.mode,n))}}a=c}for(let e=0;e<a.length;e++)i[a[e]].end=0;return{map:i,table:r}}function g(e,o){let c,l=t.getBestModeForData(e);if(c=t.from(o,l),c!==t.BYTE&&c.bit<l.bit)throw Error(`"`+e+`" cannot be encoded with mode `+t.toString(c)+`.
 Suggested mode is: `+t.toString(l));switch(c===t.KANJI&&!s.isKanjiModeEnabled()&&(c=t.BYTE),c){case t.NUMERIC:return new n(e);case t.ALPHANUMERIC:return new r(e);case t.KANJI:return new a(e);case t.BYTE:return new i(e)}}e.fromArray=function(e){return e.reduce(function(e,t){return typeof t==`string`?e.push(g(t,null)):t.data&&e.push(g(t.data,t.mode)),e},[])},e.fromString=function(t,n){let r=h(m(d(t,s.isKanjiModeEnabled())),n),i=c.find_path(r.map,`start`,`end`),a=[];for(let e=1;e<i.length-1;e++)a.push(r.table[i[e]].node);return e.fromArray(p(a))},e.rawSplit=function(t){return e.fromArray(d(t,s.isKanjiModeEnabled()))}})),Ht=o((e=>{var t=bt(),n=xt(),r=St(),i=Ct(),a=wt(),o=Tt(),s=Et(),c=Dt(),l=At(),u=Pt(),d=Ft(),f=Nt(),p=Vt();function m(e,t){let n=e.size,r=o.getPositions(t);for(let t=0;t<r.length;t++){let i=r[t][0],a=r[t][1];for(let t=-1;t<=7;t++)if(!(i+t<=-1||n<=i+t))for(let r=-1;r<=7;r++)a+r<=-1||n<=a+r||(t>=0&&t<=6&&(r===0||r===6)||r>=0&&r<=6&&(t===0||t===6)||t>=2&&t<=4&&r>=2&&r<=4?e.set(i+t,a+r,!0,!0):e.set(i+t,a+r,!1,!0))}}function h(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}function g(e,t){let n=a.getPositions(t);for(let t=0;t<n.length;t++){let r=n[t][0],i=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)t===-2||t===2||n===-2||n===2||t===0&&n===0?e.set(r+t,i+n,!0,!0):e.set(r+t,i+n,!1,!0)}}function _(e,t){let n=e.size,r=u.getEncodedBits(t),i,a,o;for(let t=0;t<18;t++)i=Math.floor(t/3),a=t%3+n-8-3,o=(r>>t&1)==1,e.set(i,a,o,!0),e.set(a,i,o,!0)}function v(e,t,n){let r=e.size,i=d.getEncodedBits(t,n),a,o;for(a=0;a<15;a++)o=(i>>a&1)==1,a<6?e.set(a,8,o,!0):a<8?e.set(a+1,8,o,!0):e.set(r-15+a,8,o,!0),a<8?e.set(8,r-a-1,o,!0):a<9?e.set(8,15-a-1+1,o,!0):e.set(8,15-a-1,o,!0);e.set(r-8,8,1,!0)}function y(e,t){let n=e.size,r=-1,i=n-1,a=7,o=0;for(let s=n-1;s>0;s-=2)for(s===6&&s--;;){for(let n=0;n<2;n++)if(!e.isReserved(i,s-n)){let r=!1;o<t.length&&(r=(t[o]>>>a&1)==1),e.set(i,s-n,r),a--,a===-1&&(o++,a=7)}if(i+=r,i<0||n<=i){i-=r,r=-r;break}}}function b(e,n,i){let a=new r;i.forEach(function(t){a.put(t.mode.bit,4),a.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),t.write(a)});let o=(t.getSymbolTotalCodewords(e)-c.getTotalCodewordsCount(e,n))*8;for(a.getLengthInBits()+4<=o&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(0);let s=(o-a.getLengthInBits())/8;for(let e=0;e<s;e++)a.put(e%2?17:236,8);return x(a,e,n)}function x(e,n,r){let i=t.getSymbolTotalCodewords(n),a=i-c.getTotalCodewordsCount(n,r),o=c.getBlocksCount(n,r),s=o-i%o,u=Math.floor(i/o),d=Math.floor(a/o),f=d+1,p=u-d,m=new l(p),h=0,g=Array(o),_=Array(o),v=0,y=new Uint8Array(e.buffer);for(let e=0;e<o;e++){let t=e<s?d:f;g[e]=y.slice(h,h+t),_[e]=m.encode(g[e]),h+=t,v=Math.max(v,t)}let b=new Uint8Array(i),x=0,S,C;for(S=0;S<v;S++)for(C=0;C<o;C++)S<g[C].length&&(b[x++]=g[C][S]);for(S=0;S<p;S++)for(C=0;C<o;C++)b[x++]=_[C][S];return b}function S(e,n,r,a){let o;if(Array.isArray(e))o=p.fromArray(e);else if(typeof e==`string`){let t=n;if(!t){let n=p.rawSplit(e);t=u.getBestVersionForData(n,r)}o=p.fromString(e,t||40)}else throw Error(`Invalid data`);let c=u.getBestVersionForData(o,r);if(!c)throw Error(`The amount of data is too big to be stored in a QR Code`);if(!n)n=c;else if(n<c)throw Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+c+`.
`);let l=b(n,r,o),d=new i(t.getSymbolSize(n));return m(d,n),h(d),g(d,n),v(d,r,0),n>=7&&_(d,n),y(d,l),isNaN(a)&&(a=s.getBestMask(d,v.bind(null,d,r))),s.applyMask(a,d),v(d,r,a),{modules:d,version:n,errorCorrectionLevel:r,maskPattern:a,segments:o}}e.create=function(e,r){if(e===void 0||e===``)throw Error(`No input text`);let i=n.M,a,o;return r!==void 0&&(i=n.from(r.errorCorrectionLevel,n.M),a=u.from(r.version),o=s.from(r.maskPattern),r.toSJISFunc&&t.setToSJISFunction(r.toSJISFunc)),S(e,a,i,o)}})),Ut=o((e=>{function t(e){if(typeof e==`number`&&(e=e.toString()),typeof e!=`string`)throw Error(`Color should be defined as hex string`);let t=e.slice().replace(`#`,``).split(``);if(t.length<3||t.length===5||t.length>8)throw Error(`Invalid hex color: `+e);(t.length===3||t.length===4)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),t.length===6&&t.push(`F`,`F`);let n=parseInt(t.join(``),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:`#`+t.slice(0,6).join(``)}}e.getOptions=function(e){e||={},e.color||={};let n=e.margin===void 0||e.margin===null||e.margin<0?4:e.margin,r=e.width&&e.width>=21?e.width:void 0,i=e.scale||4;return{width:r,scale:r?4:i,margin:n,color:{dark:t(e.color.dark||`#000000ff`),light:t(e.color.light||`#ffffffff`)},type:e.type,rendererOpts:e.rendererOpts||{}}},e.getScale=function(e,t){return t.width&&t.width>=e+t.margin*2?t.width/(e+t.margin*2):t.scale},e.getImageWidth=function(t,n){let r=e.getScale(t,n);return Math.floor((t+n.margin*2)*r)},e.qrToImageData=function(t,n,r){let i=n.modules.size,a=n.modules.data,o=e.getScale(i,r),s=Math.floor((i+r.margin*2)*o),c=r.margin*o,l=[r.color.light,r.color.dark];for(let e=0;e<s;e++)for(let n=0;n<s;n++){let u=(e*s+n)*4,d=r.color.light;if(e>=c&&n>=c&&e<s-c&&n<s-c){let t=Math.floor((e-c)/o),r=Math.floor((n-c)/o);d=l[+!!a[t*i+r]]}t[u++]=d.r,t[u++]=d.g,t[u++]=d.b,t[u]=d.a}}})),Wt=o((e=>{var t=Ut();function n(e,t,n){e.clearRect(0,0,t.width,t.height),t.style||={},t.height=n,t.width=n,t.style.height=n+`px`,t.style.width=n+`px`}function r(){try{return document.createElement(`canvas`)}catch{throw Error(`You need to specify a canvas element`)}}e.render=function(e,i,a){let o=a,s=i;o===void 0&&(!i||!i.getContext)&&(o=i,i=void 0),i||(s=r()),o=t.getOptions(o);let c=t.getImageWidth(e.modules.size,o),l=s.getContext(`2d`),u=l.createImageData(c,c);return t.qrToImageData(u.data,e,o),n(l,s,c),l.putImageData(u,0,0),s},e.renderToDataURL=function(t,n,r){let i=r;i===void 0&&(!n||!n.getContext)&&(i=n,n=void 0),i||={};let a=e.render(t,n,i),o=i.type||`image/png`,s=i.rendererOpts||{};return a.toDataURL(o,s.quality)}})),Gt=o((e=>{var t=Ut();function n(e,t){let n=e.a/255,r=t+`="`+e.hex+`"`;return n<1?r+` `+t+`-opacity="`+n.toFixed(2).slice(1)+`"`:r}function r(e,t,n){let r=e+t;return n!==void 0&&(r+=` `+n),r}function i(e,t,n){let i=``,a=0,o=!1,s=0;for(let c=0;c<e.length;c++){let l=Math.floor(c%t),u=Math.floor(c/t);!l&&!o&&(o=!0),e[c]?(s++,c>0&&l>0&&e[c-1]||(i+=o?r(`M`,l+n,.5+u+n):r(`m`,a,0),a=0,o=!1),l+1<t&&e[c+1]||(i+=r(`h`,s),s=0)):a++}return i}e.render=function(e,r,a){let o=t.getOptions(r),s=e.modules.size,c=e.modules.data,l=s+o.margin*2,u=o.color.light.a?`<path `+n(o.color.light,`fill`)+` d="M0 0h`+l+`v`+l+`H0z"/>`:``,d=`<path `+n(o.color.dark,`stroke`)+` d="`+i(c,s,o.margin)+`"/>`,f=`viewBox="0 0 `+l+` `+l+`"`,p=`<svg xmlns="http://www.w3.org/2000/svg" `+(o.width?`width="`+o.width+`" height="`+o.width+`" `:``)+f+` shape-rendering="crispEdges">`+u+d+`</svg>
`;return typeof a==`function`&&a(null,p),p}})),Kt=c(o((e=>{var t=yt(),n=Ht(),r=Wt(),i=Gt();function a(e,r,i,a,o){let s=[].slice.call(arguments,1),c=s.length,l=typeof s[c-1]==`function`;if(!l&&!t())throw Error(`Callback required as last argument`);if(l){if(c<2)throw Error(`Too few arguments provided`);c===2?(o=i,i=r,r=a=void 0):c===3&&(r.getContext&&o===void 0?(o=a,a=void 0):(o=a,a=i,i=r,r=void 0))}else{if(c<1)throw Error(`Too few arguments provided`);return c===1?(i=r,r=a=void 0):c===2&&!r.getContext&&(a=i,i=r,r=void 0),new Promise(function(t,o){try{t(e(n.create(i,a),r,a))}catch(e){o(e)}})}try{let t=n.create(i,a);o(null,e(t,r,a))}catch(e){o(e)}}e.create=n.create,e.toCanvas=a.bind(null,r.render),e.toDataURL=a.bind(null,r.renderToDataURL),e.toString=a.bind(null,function(e,t,n){return i.render(e,n)})}))(),1),qt=(e,t)=>{try{return e?JSON.parse(e):t}catch(e){return console.warn(`safeJsonParse error:`,e),t}},Jt=()=>qt(localStorage.getItem(`ryzin_lives`),[]),Yt=e=>localStorage.setItem(`ryzin_lives`,JSON.stringify(e)),Xt=e=>qt(localStorage.getItem(`ryzin_config_${e}`),null),Zt=(e,t)=>{localStorage.setItem(`ryzin_config_${e}`,JSON.stringify(t)),localStorage.setItem(`ryzin_live_config_${e}`,JSON.stringify(t))},Qt=e=>qt(localStorage.getItem(`ryzin_stats_${e}`),{viewers:0,hearts:0,cumViewers:0}),$t=(e,t)=>{localStorage.setItem(`ryzin_stats_${e}`,JSON.stringify(t)),localStorage.setItem(`ryzin_live_stats_${e}`,JSON.stringify(t))},en=e=>qt(localStorage.getItem(`ryzin_stats_timeline_${e}`),[]),tn=(e,t)=>{localStorage.setItem(`ryzin_stats_timeline_${e}`,JSON.stringify(t)),localStorage.setItem(`ryzin_live_stats_timeline_${e}`,JSON.stringify(t))},nn=e=>qt(localStorage.getItem(`ryzin_products_${e}`),[]),rn=(e,t)=>{localStorage.setItem(`ryzin_products_${e}`,JSON.stringify(t)),localStorage.setItem(`ryzin_live_products_${e}`,JSON.stringify(t))},an=e=>qt(localStorage.getItem(`ryzin_bot_${e}`),{list:``,interval:10,autoReplyRules:[],autoReplyActive:!0}),on=(e,t)=>localStorage.setItem(`ryzin_bot_${e}`,JSON.stringify(t)),sn=async(e=3e3)=>{if(window.supabaseClient)return window.supabaseClient;let t=Date.now();for(;Date.now()-t<e;){if(window.supabaseClient)return window.supabaseClient;await new Promise(e=>setTimeout(e,50))}return window.supabaseClient||null};function cn(e){if(!e||typeof e!=`string`)return null;let t=e.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|watch\?.+&v=))([\w-]{11})/);return t?t[1]:null}function ln(){let e=Jt(),t,n=!0;for(;n;){t=``;for(let e=0;e<7;e++)t+=`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`.charAt(Math.floor(Math.random()*36));n=e.some(e=>e.id===t)}return t}var un={},X=window.supabaseClient;function Z(e,t,n,r,i=!1){if(window[`live_loaded_${e}`]===!1){console.log(`[${e}] Skip sync: data not loaded yet.`);return}un[e]&&clearTimeout(un[e]);let a=async()=>{if(!X)return;let i={live_id:e,title:t.brandName,subtitle:t.title,profile_image:(t.logoUrl||``)+(t.showSplash===!1?`#nosplash`:``)+`#widgetText=${encodeURIComponent(t.widgetText||`라이브 보기`)}#widgetPosition=${t.widgetPosition||`right`}#widgetImageUrl=${t.widgetImageUrl||``}#showOnMain=${t.showOnMain===!0}#standbyImageUrl=${encodeURIComponent(t.standbyImageUrl||``)}#useStandbyImage=${t.useStandbyImage===!0}#showNoticeNote=${t.showNoticeNote!==!1}#noticeNoteTitle=${encodeURIComponent(t.noticeNoteTitle||``)}#noticeNoteContent=${encodeURIComponent(t.noticeNoteContent||``)}`,stream_url:t.streamUrl||``,viewers:parseInt(n.viewers)||0,hearts:parseInt(n.hearts)||0,products:r,show_viewers:t.showViewers!==!1,thumbnail_url:t.thumbnailUrl||``,start_time:t.liveStartTime||``,status:t.isLive?`ON`:`OFF`,cum_viewers:parseInt(n.cumViewers)||0,share_title:t.shareTitle||``,share_desc:t.shareDesc||``,share_image:t.shareImageUrl||``,like_image_url:t.likeImageUrl||``,banned_words:t.bannedWords||``,banned_users:t.bannedUsers||``,updated_at:new Date().toISOString()};try{let{error:e}=await X.from(`live_control`).upsert(i);try{let e=document.querySelector(`iframe`);e&&e.contentWindow&&e.contentWindow.postMessage({type:`sync_preview`,config:t,stats:n,products:r},`*`)}catch{}if(e)throw e}catch(t){console.warn(`[${e}] Supabase sync failed`,t)}};i?a():un[e]=setTimeout(a,1200)}function dn(e){let t=document.createElement(`style`);t.innerHTML=`
    .modern-input { width:100%; padding:10px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:14px; outline:none; transition:all 0.2s; background:#fff; box-sizing:border-box; color:#0f172a; }
    .modern-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.12); }
    .modern-input[readonly] { background:#f8fafc; cursor:not-allowed; color:#94a3b8; }
    .modern-label { display:block; font-size:12px; font-weight:700; color:#64748b; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.04em; }
    .file-upload-wrapper { display:flex; align-items:center; gap:14px; }
    .file-upload-btn { display:inline-flex; align-items:center; justify-content:center; padding:8px 16px; background:#fff; border:1.5px solid #e2e8f0; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.2s; color:#374151; }
    .file-upload-btn:hover { background:#f1f5f9; border-color:#94a3b8; }
    .product-row { display:flex; gap:16px; align-items:flex-start; background:#fff; padding:20px; border-radius:14px; margin-bottom:12px; border:1.5px solid #e2e8f0; box-shadow:0 2px 8px rgba(0,0,0,0.04); transition:box-shadow 0.2s; }
    .product-row:hover { box-shadow:0 4px 16px rgba(0,0,0,0.08); }
    .product-img-box { position:relative; width:72px; height:72px; flex-shrink:0; border-radius:10px; overflow:hidden; border:1.5px solid #e2e8f0; cursor:pointer; }
    .product-img-box img { width:100%; height:100%; object-fit:cover; transition:opacity 0.2s; }
    .product-img-box:hover img { opacity:0.8; }
    .product-inputs { flex:1; display:flex; flex-direction:column; gap:8px; }
    .product-prices { display:flex; gap:8px; align-items:center; }
    .live-card { display:flex; align-items:center; gap:16px; background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; padding:20px 24px; margin-bottom:12px; cursor:pointer; transition:all 0.2s; box-shadow:0 2px 8px rgba(0,0,0,0.04); }
    .live-card:hover { border-color:#3b82f6; box-shadow:0 4px 16px rgba(59,130,246,0.12); transform:translateY(-1px); }
    .live-badge { padding:4px 10px; border-radius:20px; font-size:11px; font-weight:700; letter-spacing:0.05em; }
    .badge-live { background:#dcfce7; color:#16a34a; }
    .badge-ready { background:#fef9c3; color:#ca8a04; }
    .badge-ended { background:#f1f5f9; color:#64748b; }
    .tab-btn { padding:10px 20px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all 0.18s; background:transparent; color:#64748b; }
    .tab-btn.active { background:#0f172a; color:#fff; }
    .tab-btn:hover:not(.active) { background:#f1f5f9; color:#0f172a; }
    .section-card { background:#fff; border:1.5px solid #e2e8f0; border-radius:16px; padding:28px; box-shadow:0 4px 16px rgba(0,0,0,0.04); margin-bottom:20px; }
    .section-card h3 { margin:0 0 20px 0; font-size:17px; font-weight:700; color:#0f172a; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; }
    .action-btn { display:inline-flex; align-items:center; gap:6px; padding:10px 20px; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all 0.18s; }
    .action-btn:hover { opacity:0.9; transform:translateY(-1px); }
    .btn-primary-solid { background:linear-gradient(135deg, #3b82f6, #2563eb); color:#fff; box-shadow:0 4px 12px rgba(37,99,235,0.25); }
    .btn-danger-solid { background:linear-gradient(135deg, #ef4444, #dc2626); color:#fff; box-shadow:0 4px 12px rgba(220,38,38,0.25); }
    .btn-success-solid { background:linear-gradient(135deg, #10b981, #059669); color:#fff; box-shadow:0 4px 12px rgba(5,150,105,0.25); }
    .btn-neutral { background:#f1f5f9; color:#374151; border:1.5px solid #e2e8f0; }
    .btn-neutral:hover { background:#e2e8f0; }
  `,e.appendChild(t)}function fn(){let e=document.createElement(`div`);e.style.cssText=`display:flex; flex-direction:column; height:calc(100vh - 48px); background:#f8fafc; overflow:hidden;`,dn(e);let t=n=>{e.innerHTML=``,dn(e),n===null?pn(e,t):mn(e,n,t)};return pn(e,t),e}function pn(e,t){let n=W.getCurrentRole(),r=n&&n.startsWith(`live_stream:`),i=r?n.split(`:`)[1]:null,a=n&&n.startsWith(`brand:`),o=a?n.split(`:`)[1]:null,s=r||a,c=document.createElement(`div`);c.style.cssText=`max-width:720px; margin:0 auto; padding:40px 24px; width:100%; overflow-y:auto;`;let l=document.createElement(`div`);l.style.cssText=`display:flex; justify-content:space-between; align-items:center; margin-bottom:32px;`,l.innerHTML=`
    <div>
      <h1 style="margin:0; font-size:26px; font-weight:800; color:#0f172a;">라이브 목록</h1>
      <p style="margin:6px 0 0; font-size:14px; color:#64748b;">각 라이브는 독립된 URL로 시청자에게 제공됩니다.</p>
    </div>
    ${s?``:`
    <button id="btn-create-live" class="action-btn btn-primary-solid">
      <span style="font-size:18px;">+</span> 새 라이브 생성
    </button>
    `}
  `,c.appendChild(l);let u=document.createElement(`div`);u.id=`live-list-container`,c.appendChild(u),e.appendChild(c);let d=e=>{let n=document.getElementById(`live-list-container`)||u;if(n){if(n.innerHTML=``,!e||e.length===0){n.innerHTML=`
        <div style="text-align:center; padding:80px 20px; color:#94a3b8;">
          <div style="font-size:48px; margin-bottom:16px;">📡</div>
          <p style="font-size:16px; font-weight:600; margin:0 0 8px;">아직 생성된 라이브가 없습니다.</p>
          <p style="font-size:14px; margin:0;">"새 라이브 생성" 버튼으로 첫 번째 라이브를 만들어보세요!</p>
        </div>
      `;return}e.forEach((e,r)=>{let i=Xt(e.id)||{},a=i.isLive?`badge-live`:`badge-ready`,o=i.isLive?`LIVE`:`대기`,c=`https://ryzincorp.com/live/${e.id}`,l=r+1,u=document.createElement(`div`);if(u.className=`live-card`,u.innerHTML=`
        <div style="width:48px; height:48px; background:linear-gradient(135deg,#3b82f6,#2563eb); border-radius:12px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:800; flex-shrink:0;">
          ${l}
        </div>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
            <span style="font-size:16px; font-weight:700; color:#0f172a;">${i.brandName&&!i.brandName.startsWith(`라이브 `)?i.brandName:`라이브 ${l}`}</span>
            <span class="live-badge ${a}">${o}</span>
          </div>
          <div style="font-size:13px; color:#64748b; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${i.title||`방송 제목 미설정`}</div>
          <div style="margin-top:6px; display:flex; align-items:center; gap:6px;">
            <span style="font-size:11px; font-weight:600; color:#94a3b8; background:#f1f5f9; padding:2px 8px; border-radius:6px; font-family:monospace;">${e.id}</span>
            <a href="${c}" target="_blank" style="font-size:11px; color:#3b82f6; text-decoration:none; font-weight:600;">${c} ↗</a>
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-shrink:0;">
          <button class="action-btn btn-neutral btn-edit" data-id="${e.id}" style="padding:8px 16px; font-size:13px;">설정 ›</button>
          ${s?``:`
          <button class="action-btn btn-neutral btn-delete" data-id="${e.id}" style="padding:8px 12px; font-size:13px; color:#ef4444; border-color:#fee2e2;">삭제</button>
          `}
        </div>
      `,u.querySelector(`.btn-edit`).addEventListener(`click`,n=>{n.stopPropagation(),t(e.id)}),!s){let t=u.querySelector(`.btn-delete`);t&&t.addEventListener(`click`,async t=>{if(t.stopPropagation(),!confirm(`라이브 ${e.id}를 정말 삭제하시겠습니까?\n시청자 페이지도 접근이 차단됩니다.`))return;Yt(Jt().filter(t=>t.id!==e.id));let n=qt(localStorage.getItem(`ryzin_deleted_lives`),[]);n.includes(e.id)||(n.push(e.id),localStorage.setItem(`ryzin_deleted_lives`,JSON.stringify(n)));let r=await sn();if(r)try{await r.from(`live_control`).delete().eq(`live_id`,e.id)}catch{}p()})}u.addEventListener(`click`,()=>t(e.id)),n.appendChild(u)})}},f=e=>{let t=[...e];if(r&&i)t.some(e=>e.id===i)||t.push({id:i,createdAt:Date.now()}),t=t.filter(e=>e.id===i);else if(a&&o){let e=W.getById(`brands`,o),n=e?e.name:``;t=n?t.filter(e=>(Xt(e.id)||{}).brandName===n):[]}return t.sort((e,t)=>(e.createdAt||0)-(t.createdAt||0)),t},p=async()=>{let e=f(Jt());if(e.length>0)d(e);else{let e=document.getElementById(`live-list-container`)||u;e&&(e.innerHTML=`
          <div style="text-align:center; padding:60px 20px; color:#64748b;">
            <div style="display:inline-block; width:36px; height:36px; border:3px solid #e2e8f0; border-top-color:#3b82f6; border-radius:50%; animation:spin 0.8s linear infinite; margin-bottom:14px;"></div>
            <p style="font-size:14px; font-weight:600; margin:0;">라이브 목록을 불러오는 중입니다...</p>
          </div>
        `)}try{let e=await sn();if(e){let{data:t,error:n}=await e.from(`live_control`).select(`live_id, updated_at, status, title, subtitle`);if(!n&&t&&Array.isArray(t)){let e=Jt(),n=qt(localStorage.getItem(`ryzin_deleted_lives`),[]);t.forEach(t=>{if(t.live_id&&!(n.includes(t.live_id)&&t.live_id!==i)){e.some(e=>e.id===t.live_id)||e.push({id:t.live_id,createdAt:new Date(t.updated_at).getTime()});let n=Xt(t.live_id)||{};n.isLive=t.status===`ON`,t.title&&(n.brandName=t.title),t.subtitle&&(n.title=t.subtitle),Zt(t.live_id,n)}}),Yt(e)}}}catch(e){console.warn(`Failed to load remote lives from Supabase`,e)}d(f(Jt()))};p();let m=l.querySelector(`#btn-create-live`);m&&m.addEventListener(`click`,()=>{let e=ln(),n=Jt();n.push({id:e,createdAt:Date.now()}),Yt(n);let r=JSON.parse(localStorage.getItem(`ryzin_deleted_lives`)||`[]`);r.includes(e)&&(r=r.filter(t=>t!==e),localStorage.setItem(`ryzin_deleted_lives`,JSON.stringify(r)));let i={brandName:`라이브 ${n.length}`,title:`단독 특가 라이브 방송 중!`,streamUrl:``,logoUrl:``,thumbnailUrl:``,liveStartTime:``,showViewers:!0,isLive:!1,botEnabled:!1};Zt(e,i),$t(e,{viewers:0,hearts:0,cumViewers:0}),rn(e,[]),Z(e,i,{viewers:0,hearts:0,cumViewers:0},[],!0),p(),t(e)})}function mn(e,t,n){let r=W.getCurrentRole(),i=r&&r.startsWith(`live_stream:`),a=r&&r.startsWith(`brand:`),o=e=>{let t=`image/png`,n=e;if(e.includes(`;base64,`)){let r=e.split(`;base64,`);t=r[0].split(`:`)[1]||`image/png`,n=r[1]}else n.startsWith(`/9j/`)?t=`image/jpeg`:n.startsWith(`R0lG`)?t=`image/gif`:n.startsWith(`iVBOR`)?t=`image/png`:n.startsWith(`UklGR`)&&(t=`image/webp`);let r=window.atob(n),i=r.length,a=new Uint8Array(i);for(let e=0;e<i;++e)a[e]=r.charCodeAt(e);return new Blob([a],{type:t})},s=async e=>{let t=o(e),n=`jpg`;t.type&&t.type.includes(`/`)&&(n=t.type.split(`/`)[1]||`jpg`);let r=[],i=localStorage.getItem(`ryzin_imgbb_key`)||``,a=[];i&&a.push(i),a.push(`117dfb947bc9e0045774b193d1eef7b6`,`d2b512c9bf10e4a3bfec604be1218579`,`6049a4f479f67a26eb3ccb8823b1eef7`);for(let e of a)try{let r=new FormData;r.append(`key`,e),r.append(`image`,t,`image.${n}`);let i=await(await fetch(`https://api.imgbb.com/1/upload`,{method:`POST`,body:r})).json();if(i.success&&i.data&&i.data.url)return i.data.url;throw Error(i.error?i.error.message:`API 응답 실패`)}catch(t){let n=e?`${e.substring(0,4)}...`:`none`;r.push(`[ImgBB] Key (${n}): ${t.message}`)}try{let e=new FormData;e.append(`key`,`6d207e02198a847aa98d0a2a901485a5`),e.append(`action`,`upload`),e.append(`source`,t,`image.${n}`),e.append(`format`,`json`);let r=await(await fetch(`https://freeimage.host/api/1/upload`,{method:`POST`,body:e})).json();if(r.status_code===200&&r.image&&r.image.url)return console.log(`⚡ FreeImageHost 폴백 업로드 성공!`),r.image.url}catch(e){r.push(`[FreeImageHost]: ${e.message}`)}if(X&&X.storage)try{let e=`uploads/${Date.now()}_${Math.random().toString(36).substring(2,8)}.${n}`,{data:r,error:i}=await X.storage.from(`live_images`).upload(e,t,{cacheControl:`3600`,upsert:!0});if(!i&&r){let{data:t}=X.storage.from(`live_images`).getPublicUrl(e);if(t&&t.publicUrl)return console.log(`⚡ Supabase Storage 폴백 업로드 성공!`),t.publicUrl}}catch(e){r.push(`[SupabaseStorage]: ${e.message}`)}return console.warn(`⚠️ 외부 이미지 호스팅 전송 중 오류로 인해 인라인 Data URL 폴백으로 저장합니다.
`+r.join(`
`)),e.startsWith(`data:image`)?e:`data:image/${n};base64,${e}`},c=(e,t,n,r=.82)=>new Promise((i,a)=>{let o=new Image;o.src=URL.createObjectURL(e),o.onload=()=>{let e=o.width,a=o.height;e>a?e>t&&(a=Math.round(a*t/e),e=t):a>n&&(e=Math.round(e*n/a),a=n);let s=document.createElement(`canvas`);s.width=e,s.height=a,s.getContext(`2d`).drawImage(o,0,0,e,a);let c=s.toDataURL(`image/jpeg`,r);URL.revokeObjectURL(o.src),i(c.split(`,`)[1])},o.onerror=e=>{URL.revokeObjectURL(o.src),a(e)}});window[`live_loaded_${t}`]===void 0&&(window[`live_loaded_${t}`]=!1);let l=Xt(t)||{},u=Qt(t),d=nn(t);Array.isArray(d)||(d=[]);let f=an(t),p=null,m=!1,h=0,g=[];X&&!window[`live_loaded_${t}`]?X.from(`live_control`).select(`*`).eq(`live_id`,t).maybeSingle().then(({data:e,error:n})=>{if(window[`live_loaded_${t}`]=!0,!n&&e){let n=Jt().findIndex(e=>e.id===t),r=n===-1?1:n+1;l.brandName=e.title||`라이브 ${r}`,l.title=e.subtitle||`단독 특가 라이브 방송 중!`,l.streamUrl=e.stream_url||``;let i=e.profile_image||``,a=`라이브 보기`,o=`right`,s=``,c=!1,f=``,p=!1,m=!0,h=``,g=``,_=i.split(`#`),v=_[0];if(_.slice(1).forEach(e=>{e===`nosplash`||(e.startsWith(`widgetText=`)?a=decodeURIComponent(e.replace(`widgetText=`,``)):e.startsWith(`widgetPosition=`)?o=e.replace(`widgetPosition=`,``):e.startsWith(`widgetImageUrl=`)?s=e.replace(`widgetImageUrl=`,``):e.startsWith(`showOnMain=`)?c=e.replace(`showOnMain=`,``)===`true`:e.startsWith(`standbyImageUrl=`)?f=decodeURIComponent(e.replace(`standbyImageUrl=`,``)):e.startsWith(`useStandbyImage=`)?p=e.replace(`useStandbyImage=`,``)===`true`:e.startsWith(`showNoticeNote=`)?m=e.replace(`showNoticeNote=`,``)!==`false`:e.startsWith(`noticeNoteTitle=`)?h=decodeURIComponent(e.replace(`noticeNoteTitle=`,``)):e.startsWith(`noticeNoteContent=`)&&(g=decodeURIComponent(e.replace(`noticeNoteContent=`,``))))}),l.logoUrl=v,l.showSplash=!i.includes(`#nosplash`),l.widgetText=a,l.widgetPosition=o,l.widgetImageUrl=s,l.showOnMain=c,l.standbyImageUrl=f,l.useStandbyImage=p,l.showNoticeNote=m,l.noticeNoteTitle=h,l.noticeNoteContent=g,l.thumbnailUrl=e.thumbnail_url||``,l.liveStartTime=e.start_time||``,l.showViewers=e.show_viewers!==!1,l.isLive=e.status===`ON`,l.shareTitle=e.share_title||``,l.shareDesc=e.share_desc||``,l.shareImageUrl=e.share_image||``,l.likeImageUrl=e.like_image_url||``,u.viewers=e.viewers||0,u.hearts=e.hearts||0,u.cumViewers=e.cum_viewers||0,e.products){let t=typeof e.products==`string`?JSON.parse(e.products):e.products;Array.isArray(t)&&t.length>0&&(d.length=0,d.push(...t))}Zt(t,l),$t(t,u),rn(t,d);let y=(e,t)=>{let n=S.querySelector(`#`+e)||document.getElementById(e);n&&document.activeElement!==n&&(n.type===`checkbox`?n.checked=!!t:n.value=t)};y(`cfg-brandName`,l.brandName),y(`cfg-title`,l.title),y(`cfg-stream`,l.streamUrl),y(`cfg-showViewers`,l.showViewers),y(`cfg-liveStartTime`,l.liveStartTime),y(`cfg-shareTitle`,l.shareTitle),y(`cfg-shareDesc`,l.shareDesc);let b=S.querySelector(`#logo-preview`)||document.getElementById(`logo-preview`);b&&(b.src=l.logoUrl);let x=S.querySelector(`#thumbnail-preview`)||document.getElementById(`thumbnail-preview`);x&&(x.src=l.thumbnailUrl);let C=S.querySelector(`#like-preview`)||document.getElementById(`like-preview`);C&&(C.src=l.likeImageUrl,C.style.display=l.likeImageUrl?`block`:`none`);let w=S.querySelector(`#btn-toggle-live`)||document.getElementById(`btn-toggle-live`);w&&document.activeElement!==w&&(w.textContent=l.isLive?`라이브 종료`:`라이브 시작`,w.className=`action-btn ${l.isLive?`btn-danger-solid`:`btn-success-solid`}`)}}).catch(e=>{window[`live_loaded_${t}`]=!0,console.warn(`Initial Supabase load failed`,e)}):window[`live_loaded_${t}`]=!0;let _=()=>{try{let e=S.querySelector(`#live-preview-iframe`)||document.getElementById(`live-preview-iframe`);e&&e.contentWindow&&e.contentWindow.postMessage({type:`sync_preview`,config:l,stats:u,products:d},`*`)}catch{}},v=()=>{Zt(t,l),_(),Z(t,l,u,d,!0)},y=()=>{$t(t,u),_(),Z(t,l,u,d,!0)},b=(e=!0)=>{rn(t,d),_(),Z(t,l,u,d,e)},x=()=>on(t,f),S=document.createElement(`div`);S.style.cssText=`display:flex; gap:0; height:100%; overflow:hidden;`;let C=document.createElement(`div`);C.style.cssText=`flex:1; display:flex; flex-direction:column; overflow:hidden;`;let w=document.createElement(`div`);w.style.cssText=`display:flex; align-items:center; gap:18px; padding:18px 28px; background:#fff; border-bottom:1.5px solid #e2e8f0; flex-shrink:0;`;let T=l.isLive?`<span style="font-size:10px; font-weight:800; color:#ef4444; background:#fee2e2; border:1px solid #fecaca; padding:2px 6px; border-radius:4px; white-space:nowrap; height:16px; display:inline-flex; align-items:center; gap:4px;"><span style="width:5px; height:5px; background:#ef4444; border-radius:50%; display:inline-block;"></span>라이브 중</span>`:`<span style="font-size:10px; font-weight:800; color:#64748b; background:#f1f5f9; border:1px solid #e2e8f0; padding:2px 6px; border-radius:4px; white-space:nowrap; height:16px; display:inline-flex; align-items:center;">송출 대기</span>`,E=l.isLive?`<div id="onair-timer-wrapper" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:#ef4444; background:#fef2f2; padding:4px 10px; border-radius:6px; border:1px solid #fecaca; white-space:nowrap;"> <div style="width:6px; height:6px; background:#ef4444; border-radius:50%; box-shadow:0 0 0 2px #fee2e2;"></div> 방송 중 <span id="onair-timer-text" style="font-family:monospace; margin-left:2px; letter-spacing:0.02em;">00:00:00</span> </div>`:``,D=a?`<button class="tab-btn active" data-tab="chat" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">채팅관리</button>`:`
      <button class="tab-btn active" data-tab="config" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">기본설정</button>
      <button class="tab-btn" data-tab="chat" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">채팅관리</button>
      <button class="tab-btn" data-tab="product" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">상품관리</button>
      <button class="tab-btn" data-tab="orders" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">주문 통계</button>
      <button class="tab-btn" data-tab="leads" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">상담 DB</button>
    `;w.innerHTML=`
    <button id="btn-back" class="action-btn btn-neutral" style="padding:8px 14px; font-size:13px; display:flex; align-items:center; gap:4px;"><span style="font-size:14px; line-height:1;">←</span> 목록</button>
    <div style="display:flex; align-items:center; gap:10px; min-width: 180px; max-width: 480px; flex-shrink:0;">
      <span style="font-size:12px; font-weight:700; color:#64748b; background:#f1f5f9; padding:4px 10px; border-radius:6px; font-family:monospace; line-height:1; flex-shrink:0;">${t}</span>
      <span style="font-size:15px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:240px; line-height:1.2;" title="${l.brandName||``}">${l.brandName||``}</span>
      ${T}
    </div>
    <div style="display:flex; gap:4px; background:#f1f5f9; padding:4px; border-radius:10px; flex:1; justify-content:center; max-width:560px; margin:0 auto;">
      ${D}
    </div>
    <div style="display:flex; align-items:center; gap:8px; padding:6px 0; flex-shrink:0;">
      <span style="font-size:12px; color:#475569; font-weight:700; white-space:nowrap;">시청자 URL</span>
      <span style="font-size:12px; color:#0f172a; font-family:monospace; font-weight:600; white-space:nowrap; margin-right:4px;">ryzincorp.com/live/${t}</span>
      <button id="btn-copy-live-url" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; height:28px; line-height:1; border-radius:6px; border:1px solid #cbd5e1; background:#fff; cursor:pointer; font-weight:700; white-space:nowrap;">복사</button>
      <button id="btn-view-live-qr" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; height:28px; line-height:1; border-radius:6px; border:1px solid #cbd5e1; background:#fff; cursor:pointer; font-weight:700; white-space:nowrap;">QR코드</button>
    </div>
  `,C.appendChild(w),setTimeout(()=>{let e=document.getElementById(`btn-view-live-qr`);e&&e.addEventListener(`click`,async()=>{let e=`https://ryzincorp.com/live/${t}`;try{let n=await Kt.toDataURL(e,{width:320,margin:2,color:{dark:`#000000`,light:`#ffffff`}}),r=document.getElementById(`admin-live-qr-modal`);r||(r=document.createElement(`div`),r.id=`admin-live-qr-modal`,r.style.cssText=`position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:999999; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px);`,document.body.appendChild(r)),r.innerHTML=`
            <div style="background:#fff; border-radius:20px; padding:28px; max-width:360px; width:100%; text-align:center; box-shadow:0 25px 50px rgba(0,0,0,0.25); border:1px solid #e2e8f0;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <div style="font-size:16px; font-weight:800; color:#0f172a;">라이브 바로가기 QR</div>
                <button id="btn-close-qr-modal" style="background:transparent; border:none; font-size:20px; color:#94a3b8; cursor:pointer; padding:0; line-height:1;">&times;</button>
              </div>

              <div style="background:#f8fafc; padding:16px; border-radius:14px; border:1px solid #e2e8f0; display:inline-block; margin-bottom:16px;">
                <img src="${n}" alt="Live QR" style="width:240px; height:240px; display:block; border-radius:8px;">
              </div>

              <div style="font-size:12px; font-family:monospace; color:#64748b; margin-bottom:20px; word-break:break-all; background:#f1f5f9; padding:8px 12px; border-radius:8px;">
                ${e}
              </div>

              <div style="display:flex; gap:8px;">
                <a href="${n}" download="qr_${t}.png" class="action-btn btn-primary-solid" style="flex:1; padding:10px; font-size:13px; font-weight:700; text-decoration:none; display:flex; align-items:center; justify-content:center; border-radius:10px;">
                  이미지 다운로드
                </a>
                <button id="btn-close-qr-modal-bottom" class="action-btn btn-neutral" style="padding:10px 16px; font-size:13px; font-weight:700; border-radius:10px;">
                  닫기
                </button>
              </div>
            </div>
          `,r.style.display=`flex`;let i=()=>{r.style.display=`none`};r.querySelector(`#btn-close-qr-modal`).onclick=i,r.querySelector(`#btn-close-qr-modal-bottom`).onclick=i,r.onclick=e=>{e.target===r&&i()}}catch(e){console.error(e),alert(`QR 코드 생성 오류: `+e.message)}});let n=document.getElementById(`btn-copy-live-url`);n&&n.addEventListener(`click`,async()=>{let e=`https://ryzincorp.com/live/${t}`;try{await navigator.clipboard.writeText(e),n.textContent=`복사 완료!`,n.style.color=`#10b981`,n.style.borderColor=`#a7f3d0`,n.style.backgroundColor=`#ecfdf5`,setTimeout(()=>{n.textContent=`복사`,n.style.color=``,n.style.borderColor=``,n.style.backgroundColor=``},2e3)}catch(e){console.warn(`URL 복사 오류:`,e)}})},100);let O=null;l.isLive&&setTimeout(()=>{let e=document.getElementById(`onair-timer-text`);if(e){let t=l.liveStartTime?new Date(l.liveStartTime).getTime():0,n=Date.now();(!t||t>n)&&(t=n);let r=()=>{let n=Date.now()-t,r=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4),a=Math.floor(n%6e4/1e3);e.textContent=`${r.toString().padStart(2,`0`)}:${i.toString().padStart(2,`0`)}:${a.toString().padStart(2,`0`)}`};r(),O=setInterval(r,1e3)}},100);let k=()=>{O&&=(clearInterval(O),null)},A=document.createElement(`div`);A.style.cssText=`flex:1; overflow-y:auto; padding:28px;`,C.appendChild(A),S.appendChild(C);let j=document.createElement(`div`);j.style.cssText=`width:340px; flex-shrink:0; display:flex; flex-direction:column; align-items:center; padding:24px 20px; background:#fff; border-left:1.5px solid #e2e8f0; gap:16px; overflow-y:auto;`;let M=`${window.location.origin.includes(`localhost:5173`)?`http://localhost:8080/live/`:`/live/`}?id=${t}&admin=1&v=202609032348`,N=`https://ryzincorp.com/live/${t}`,P=`${N}?embed=1&v=202608121330`,ee=`${N}?widget=1&v=202608121330`,te=`<iframe src="${P}" width="390" height="693" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="border-radius:20px; overflow:hidden; border:none;"></iframe>`,ne=`<iframe src="${P}" width="100%" height="600" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="border:none; border-radius:12px; overflow:hidden;"></iframe>`,F=`<iframe id="ryzin-live-iframe" src="${ee}" style="position:fixed; bottom:56px; right:12px; width:220px; height:90px; border:none; z-index:999999; background:transparent;" allow="autoplay; fullscreen" allowfullscreen></iframe>
<script>
  window.addEventListener('message', function(e) {
    var data = e.data;
    if (typeof data === 'string') {
      try { data = JSON.parse(data); } catch(err) {}
    }
    if (data && data.type === 'ryzin-widget-resize') {
      var iframes = document.querySelectorAll('iframe');
      var iframe = null;
      for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow === e.source) {
          iframe = iframes[i];
          break;
        }
      }
      if (!iframe) {
        iframe = document.getElementById('ryzin-live-iframe');
      }
      if (iframe) {
        iframe.style.setProperty('width', data.width, 'important');
        iframe.style.setProperty('height', data.height, 'important');
        iframe.style.setProperty('bottom', data.bottom, 'important');
        iframe.style.setProperty('top', 'auto', 'important');
        
        if (data.expand) {
          iframe.style.setProperty('border-radius', '20px', 'important');
          iframe.style.setProperty('overflow', 'hidden', 'important');
          iframe.style.setProperty('border', 'none', 'important');
          iframe.style.setProperty('box-shadow', '0 12px 40px rgba(0,0,0,0.15)', 'important');
        } else {
          iframe.style.setProperty('border-radius', '0px', 'important');
          iframe.style.setProperty('overflow', 'visible', 'important');
          iframe.style.setProperty('border', 'none', 'important');
          iframe.style.setProperty('box-shadow', 'none', 'important');
        }

        if (data.position === 'left') {
          iframe.style.setProperty('left', '12px', 'important');
          iframe.style.setProperty('right', 'auto', 'important');
        } else {
          iframe.style.setProperty('right', '12px', 'important');
          iframe.style.setProperty('left', 'auto', 'important');
        }
      }
    }
  });
<\/script>`;`${t}`,j.innerHTML=`
    <div style="width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
      <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em;">모바일 미리보기</div>
      ${E}
    </div>
    <div style="width:300px; height:535px; border-radius:20px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.15); border:1.5px solid #e2e8f0; flex-shrink:0;">
      <iframe id="live-preview-iframe" src="${M}" style="width:100%; height:100%; border:none; background:#000;"></iframe>
    </div>
    <button id="btn-refresh-preview" class="action-btn btn-neutral" style="width:100%; justify-content:center;">새로고침</button>

    <div style="width:100%; border-top:1.5px solid #e2e8f0; padding-top:16px; margin-top:4px;">
      <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em; margin-bottom:12px;">공유 및 임베드 설정</div>

      <div style="margin-bottom:10px;">
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">모바일 세로형 임베드 코드 (390×693)</div>
        <div style="position:relative;">
          <input type="text" id="embed-url-mobile" readonly style="width:100%; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 64px 8px 8px; color:#334155; line-height:1.5; box-sizing:border-box; outline:none;" value="${te.replace(/"/g,`&quot;`)}">
          <button id="btn-copy-embed-mobile" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
        <div style="font-size:10px; color:#94a3b8; margin-top:4px;">라이브 화면이 바로 플레이어로 삽입되는 코드입니다</div>
      </div>

      <div style="margin-bottom:10px;">
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">와이드형 임베드 코드 (전체너비×600)</div>
        <div style="position:relative;">
          <input type="text" id="embed-url-wide" readonly style="width:100%; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 64px 8px 8px; color:#334155; line-height:1.5; box-sizing:border-box; outline:none;" value="${ne.replace(/"/g,`&quot;`)}">
          <button id="btn-copy-embed-wide" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
        <div style="font-size:10px; color:#94a3b8; margin-top:4px;">라이브 화면이 바로 플레이어로 삽입되는 코드입니다</div>
      </div>

      <div style="margin-bottom:10px;">
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">라이브 플로팅 위젯 코드 (전체화면형)</div>
        <div style="position:relative;">
          <input type="text" id="widget-url-code" readonly style="width:100%; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 64px 8px 8px; color:#334155; line-height:1.5; box-sizing:border-box; outline:none;" value="${F.replace(/"/g,`&quot;`)}">
          <button id="btn-copy-widget-code" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
        <div style="font-size:10px; color:#94a3b8; margin-top:4px;">둥근 버튼 위젯이 화면 구석에 생성되고 클릭 시 열리는 코드입니다</div>
      </div>

      <div style="width:100%; border-top:1.5px solid #e2e8f0; padding-top:16px; margin-top:16px;">
        <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em; margin-bottom:12px;">라이브 위젯 설정</div>
        
        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">위젯 문구</label>
          <input type="text" id="cfg-widgetText" class="modern-input" style="padding:6px 10px; font-size:12px; height:32px;" value="${l.widgetText||`라이브 보기`}">
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">위젯 노출 위치</label>
          <select id="cfg-widgetPosition" class="modern-input" style="padding:4px 10px; font-size:12px; height:32px;">
            <option value="right" ${l.widgetPosition===`left`?``:`selected`}>우측 끝 밀착</option>
            <option value="left" ${l.widgetPosition===`left`?`selected`:``}>좌측 끝 밀착</option>
          </select>
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">위젯 단색/커스텀 이미지</label>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:44px; height:44px; border-radius:50%; border:1.5px solid #e2e8f0; overflow:hidden; background:#fff; flex-shrink:0; display:flex; align-items:center; justify-content:center;">
              <img id="widget-image-preview" src="${l.widgetImageUrl||``}" style="width:100%; height:100%; object-fit:cover; display:${l.widgetImageUrl?`block`:`none`};">
              <span id="widget-image-placeholder" style="font-size:10px; color:#cbd5e1; display:${l.widgetImageUrl?`none`:`block`};">단색</span>
            </div>
            <div style="flex:1; display:flex; flex-direction:column; gap:4px;">
              <input type="file" id="cfg-widgetImageFile" accept="image/*" style="display:none;">
              <button id="btn-upload-widget-img" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; font-weight:700; justify-content:center;">이미지 업로드</button>
              <button id="btn-reset-widget-img" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; font-weight:700; justify-content:center; color:#ef4444; border-color:#fee2e2;">단색 화이트 리셋</button>
            </div>
          </div>
        </div>

        <div style="margin-bottom:10px; display:flex; align-items:center; gap:8px;">
          <input type="checkbox" id="cfg-showOnMain" style="width:16px; height:16px; cursor:pointer;" ${l.showOnMain===!0?`checked`:``}>
          <label for="cfg-showOnMain" style="font-size:11px; font-weight:700; color:#94a3b8; letter-spacing:0.05em; cursor:pointer; user-select:none;">라이진 메인에 위젯 노출</label>
        </div>
      </div>

      <!-- 웹 푸시 알림 발송 설정 (위젯 설정 톤앤매너 일치) -->
      <div style="width:100%; border-top:1.5px solid #e2e8f0; padding-top:16px; margin-top:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em;">웹 푸시 알림 설정</div>
          <div id="push-subscriber-badge" style="font-size:11px; font-weight:700; color:#64748b; background:#f1f5f9; padding:2px 8px; border-radius:6px; font-family:monospace; line-height:1.3;">
            신청자 0명
          </div>
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">알림 제목</label>
          <input type="text" id="push-title-input" class="modern-input" style="padding:6px 10px; font-size:12px; height:32px;" value="${l.brandName||`RYZIN`} 라이브 방송이 시작되었습니다!" placeholder="알림 제목">
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">알림 내용</label>
          <textarea id="push-body-input" class="modern-input" rows="2" style="padding:6px 10px; font-size:12px; resize:vertical; line-height:1.5;" placeholder="알림 내용">지금 접속하셔서 라이브 단독 특가 혜택을 놓치지 마세요!</textarea>
        </div>

        <div style="display:flex; gap:6px; align-items:center;">
          <button id="btn-send-push-now" class="action-btn btn-primary-solid" style="flex:1; padding:6px 10px; font-size:12px; font-weight:700; height:32px; justify-content:center;">
            방송 알림 전체 발송
          </button>
          <button id="btn-refresh-push-sub" class="action-btn btn-neutral" style="padding:6px 10px; font-size:11px; font-weight:700; height:32px; justify-content:center;">새로고침</button>
        </div>
        <div id="push-status-text" style="font-size:10px; color:#94a3b8; margin-top:6px; min-height:14px; word-break:break-all;"></div>
      </div>
    </div>
  `,S.appendChild(j),e.appendChild(S);let re=(e,t)=>{let n=S.querySelector(`#`+e),r=S.querySelector(`#`+t);!n||!r||navigator.clipboard.writeText(n.value).then(()=>{r.textContent=`복사됨!`,r.style.background=`#22c55e`,setTimeout(()=>{r.textContent=`복사`,r.style.background=`#3b82f6`},2e3)}).catch(()=>{n.select(),document.execCommand(`copy`),r.textContent=`복사됨!`,r.style.background=`#22c55e`,setTimeout(()=>{r.textContent=`복사`,r.style.background=`#3b82f6`},2e3)})},ie=S.querySelector(`#btn-copy-embed-mobile`);ie&&ie.addEventListener(`click`,()=>re(`embed-url-mobile`,`btn-copy-embed-mobile`));let ae=S.querySelector(`#btn-copy-embed-wide`);ae&&ae.addEventListener(`click`,()=>re(`embed-url-wide`,`btn-copy-embed-wide`));let oe=S.querySelector(`#btn-copy-widget-code`);oe&&oe.addEventListener(`click`,()=>re(`widget-url-code`,`btn-copy-widget-code`));let se=S.querySelector(`#push-subscriber-badge`),I=S.querySelector(`#push-status-text`),L=S.querySelector(`#btn-send-push-now`),R=S.querySelector(`#btn-refresh-push-sub`),z=async()=>{try{if(!X)return;let{count:e,error:n}=await X.from(`live_leads`).select(`id`,{count:`exact`,head:!0}).eq(`live_id`,t).eq(`name`,`__WEB_PUSH__`);!n&&se&&(se.textContent=`신청자 ${e||0}명`)}catch{se&&(se.textContent=`신청자 0명`)}};z(),R&&R.addEventListener(`click`,()=>{z(),J(`신청자 수를 갱신했습니다.`)}),L&&L.addEventListener(`click`,async()=>{let e=S.querySelector(`#push-title-input`),n=S.querySelector(`#push-body-input`),r=e?e.value.trim():``,i=n?n.value.trim():``,a=`https://ryzincorp.com/live/${t}`;if(!r||!i){Y(`푸시 알림 제목과 내용을 모두 입력해주세요.`);return}if(confirm(`알림을 신청한 모든 시청자에게 웹 푸시를 발송하시겠습니까?\n\n제목: ${r}`)){L.disabled=!0,L.style.opacity=`0.6`,I&&(I.textContent=`푸시 발송 중...`);try{let e=await(await fetch(`/api/send_push`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({liveId:t,title:r,body:i,url:a})})).json();e.success?(J(`웹 푸시 발송 완료! (성공: ${e.sentCount}건 / 대상: ${e.total||0}명)`),I&&(I.textContent=`최근 발송: ${new Date().toLocaleTimeString()} (성공 ${e.sentCount}건)`),z()):(Y(`푸시 발송 실패: `+(e.message||`오류 발생`)),I&&(I.textContent=`발송 실패`))}catch(e){console.error(e),Y(`푸시 발송 중 네트워크 오류가 발생했습니다.`),I&&(I.textContent=`발송 실패`)}finally{L.disabled=!1,L.style.opacity=`1`}}});let ce=S.querySelector(`#cfg-widgetText`);ce&&ce.addEventListener(`input`,e=>{l.widgetText=e.target.value,Zt(t,l),Z(t,l,u,d)});let le=S.querySelector(`#cfg-widgetPosition`);le&&le.addEventListener(`change`,e=>{l.widgetPosition=e.target.value,Zt(t,l),Z(t,l,u,d)});let B=S.querySelector(`#cfg-showOnMain`);B&&B.addEventListener(`change`,async e=>{l.showOnMain=e.target.checked,Zt(t,l);let n=(l.logoUrl||``)+(l.showSplash===!1?`#nosplash`:``)+`#widgetText=${encodeURIComponent(l.widgetText||`라이브 보기`)}#widgetPosition=${l.widgetPosition||`right`}#widgetImageUrl=${l.widgetImageUrl||``}#showOnMain=${l.showOnMain===!0}`;if(X)try{await X.from(`live_control`).update({profile_image:n,updated_at:new Date().toISOString()}).eq(`live_id`,t)}catch(e){console.warn(`Direct showOnMain update failed:`,e)}Z(t,l,u,d,!0)});let ue=S.querySelector(`#btn-upload-widget-img`),de=S.querySelector(`#cfg-widgetImageFile`);ue&&de&&(ue.addEventListener(`click`,()=>de.click()),de.addEventListener(`change`,async e=>{let n=e.target.files[0];if(n){ue.disabled=!0,ue.textContent=`업로드 중...`;try{let e=await s(await c(n,256,256,.88));l.widgetImageUrl=e,Zt(t,l);let r=S.querySelector(`#widget-image-preview`)||document.getElementById(`widget-image-preview`),i=S.querySelector(`#widget-image-placeholder`)||document.getElementById(`widget-image-placeholder`);r&&i&&(r.src=e,r.style.display=`block`,i.style.display=`none`),Z(t,l,u,d,!0)}catch(e){console.error(`이미지 업로드 오류:`,e),alert(`이미지 업로드 실패: `+e.message)}finally{ue.disabled=!1,ue.textContent=`이미지 업로드`}}}));let fe=S.querySelector(`#btn-reset-widget-img`);fe&&fe.addEventListener(`click`,()=>{l.widgetImageUrl=``,Zt(t,l);let e=S.querySelector(`#widget-image-preview`)||document.getElementById(`widget-image-preview`),n=S.querySelector(`#widget-image-placeholder`)||document.getElementById(`widget-image-placeholder`);e&&n&&(e.src=``,e.style.display=`none`,n.style.display=`block`),Z(t,l,u,d,!0)});let pe=()=>{A.innerHTML=`
      <div class="section-card">
        <h3>기본 정보</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:18px;">
          <div>
            <label class="modern-label">브랜드명 (제목)</label>
            <input type="text" class="modern-input" id="cfg-brandName" value="${l.brandName||``}">
          </div>
          <div>
            <label class="modern-label">방송 부제목</label>
            <input type="text" class="modern-input" id="cfg-title" value="${l.title||``}">
          </div>
        </div>
        <div style="margin-bottom:18px;">
          <label class="modern-label">방송 시작 예정 일시 (카운트다운용)</label>
          <input type="datetime-local" class="modern-input" id="cfg-liveStartTime" value="${l.liveStartTime||``}">
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:18px; margin-bottom:18px;">
          <div class="file-upload-wrapper">
            <div style="width:56px; height:56px; border-radius:50%; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0;">
              <img id="logo-preview" src="${l.logoUrl||``}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div>
              <label class="modern-label">프로필 이미지</label>
              <label class="file-upload-btn" for="cfg-logoFile">이미지 업로드</label>
              <input type="file" id="cfg-logoFile" accept="image/*" style="display:none;">
            </div>
          </div>
          <div class="file-upload-wrapper">
            <div style="width:40px; height:71px; border-radius:8px; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0;">
              <img id="thumbnail-preview" src="${l.thumbnailUrl||``}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div>
              <label class="modern-label">썸네일 (9:16)</label>
              <label class="file-upload-btn" for="cfg-thumbnailFile">이미지 업로드</label>
              <input type="file" id="cfg-thumbnailFile" accept="image/*" style="display:none;">
            </div>
          </div>
          <div class="file-upload-wrapper">
            <div style="width:40px; height:71px; border-radius:8px; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0; position:relative; background:#f8fafc; display:flex; align-items:center; justify-content:center;">
              <img id="standby-image-preview" src="${(()=>{let e=cn(l.standbyImageUrl||``);return e?`https://img.youtube.com/vi/${e}/hqdefault.jpg`:l.standbyImageUrl||``})()}" style="width:100%; height:100%; object-fit:cover; display:${l.standbyImageUrl?`block`:`none`};">
              <span id="standby-image-placeholder" style="font-size:11px; font-weight:700; color:#94a3b8; display:${l.standbyImageUrl?`none`:`block`};">예비</span>
              <span id="standby-yt-badge" style="position:absolute; bottom:3px; left:3px; background:#ef4444; color:#fff; font-size:8px; font-weight:800; padding:1px 3px; border-radius:3px; display:${cn(l.standbyImageUrl||``)?`block`:`none`};">YT</span>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                <label class="modern-label" style="margin:0;">예비 썸네일 (반복영상/이미지)</label>
                <input type="checkbox" id="cfg-useStandbyImage" style="width:15px; height:15px; accent-color:#3b82f6; cursor:pointer;" ${l.useStandbyImage?`checked`:``} title="예비 썸네일 송출 ON/OFF">
                <span id="cfg-useStandbyImage-label" style="font-size:11px; font-weight:700; color:${l.useStandbyImage?`#2563eb`:`#94a3b8`};">${l.useStandbyImage?`ON`:`OFF`}</span>
              </div>
              <div style="display:flex; gap:4px; flex-wrap:wrap;">
                <label class="file-upload-btn" style="margin:0; padding:5px 9px; font-size:11px;" for="cfg-standbyImageFile">이미지</label>
                <button type="button" id="btn-standby-youtube" class="action-btn btn-neutral" style="padding:4px 8px; font-size:11px; height:28px; border-color:#e2e8f0; background:#fff; color:#2563eb; font-weight:700;">유튜브 URL</button>
                <button type="button" id="btn-clear-standby-image" class="action-btn btn-neutral" style="padding:4px 6px; font-size:11px; height:28px; border-color:#fee2e2; background:#fff5f5; color:#ef4444; display:${l.standbyImageUrl?`block`:`none`};">삭제</button>
              </div>
              <input type="file" id="cfg-standbyImageFile" accept="image/*" style="display:none;">
            </div>
          </div>
          <div class="file-upload-wrapper">
            <div style="width:56px; height:56px; border-radius:8px; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0; position:relative; background:#f8fafc; display:flex; align-items:center; justify-content:center;">
              <img id="like-preview" src="${l.likeImageUrl||``}" style="width:100%; height:100%; object-fit:contain; display:${l.likeImageUrl?`block`:`none`};">
              <span id="like-preview-placeholder" style="font-size:24px; display:${l.likeImageUrl?`none`:`block`};">❤️</span>
            </div>
            <div>
              <label class="modern-label">응원콘 (GIF/PNG)</label>
              <div style="display:flex; gap:6px;">
                <label class="file-upload-btn" style="margin:0;" for="cfg-likeFile">업로드</label>
                <button id="btn-clear-like-icon" class="action-btn btn-neutral" style="padding:4px 8px; font-size:11px; height:28px; border-color:#fee2e2; background:#fff5f5; color:#ef4444; display:${l.likeImageUrl?`block`:`none`};">삭제</button>
              </div>
              <input type="file" id="cfg-likeFile" accept="image/gif, image/png, image/jpeg, image/webp" style="display:none;">
            </div>
          </div>
        </div>
        <div>
          <label class="modern-label">스트리밍 URL (m3u8)</label>
          <input type="text" class="modern-input" id="cfg-stream" value="${l.streamUrl||``}">
        </div>
      </div>

      <div class="section-card">
        <h3>통계</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:18px;">
          <div>
            <label class="modern-label">총 시청자 수 (사용자 화면 노출 기준)</label>
            <div style="display:flex; gap:6px; align-items:center;">
              <div class="modern-input" id="cfg-viewers-display" style="background:#f1f5f9; font-weight:700; color:#0f172a; flex:1; display:flex; align-items:center;">${(u.viewers+(u.cumViewers||0)).toLocaleString()}명 <span style="font-size:11px; font-weight:normal; color:#64748b; margin-left:4px;">(방송+수동: ${u.viewers.toLocaleString()}, 누적: ${(u.cumViewers||0).toLocaleString()})</span></div>
            </div>
            ${i?``:`
            <div style="display:flex; gap:6px; margin-top:6px; align-items:center;">
              <input type="number" class="modern-input" id="cfg-viewers-add" placeholder="+추가할 수" style="flex:1; padding:8px 10px; font-size:13px;">
              <button id="btn-add-viewers" class="action-btn btn-primary-solid" style="white-space:nowrap; padding:8px 12px; font-size:13px;">+추가</button>
            </div>
            `}
          </div>
          <div>
            <label class="modern-label">누적 시청자 수</label>
            <input type="number" class="modern-input" id="cfg-cumViewers" value="${u.cumViewers||0}" readonly style="background:#f1f5f9; color:#64748b; cursor:not-allowed;">
            <div style="margin-top:4px; font-size:11px; color:#94a3b8;">페이지 로드마다 자동 누적</div>
          </div>
          <div>
            <label class="modern-label">하트 수 (수정 가능)</label>
            <input type="number" class="modern-input" id="cfg-hearts" value="${u.hearts}">
          </div>
          <div>
            <label class="modern-label">총 상품 조회수 (클릭수)</label>
            <div class="modern-input" id="cfg-total-clicks" style="background:#f1f5f9; display:flex; align-items:center; font-weight:bold; color:#0f172a;">
              ${(Array.isArray(d)?d:[]).reduce((e,t)=>e+(parseInt(t.clicks)||0),0).toLocaleString()}회
            </div>
          </div>
        </div>
        <div style="margin-top:18px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="cfg-showViewers" style="width:18px; height:18px; accent-color:#3b82f6;" ${l.showViewers?`checked`:``}>
            <label for="cfg-showViewers" style="font-size:14px; font-weight:600; color:#374151; cursor:pointer;">시청자 수 노출</label>
          </div>
          <div style="display:flex; align-items:center; gap:8px; margin-left:16px;">
            <input type="checkbox" id="cfg-showSplash" style="width:18px; height:18px; accent-color:#3b82f6;" ${l.showSplash===!1?``:`checked`}>
            <label for="cfg-showSplash" style="font-size:14px; font-weight:600; color:#374151; cursor:pointer;">스플래시 화면 켜기</label>
          </div>
          <div style="flex:1;"></div>
          ${i?``:`
          <button id="btn-reset-stats" class="action-btn btn-danger-solid" style="padding:8px 14px; font-size:13px;">통계 초기화</button>
          `}
        </div>
      </div>

      <div class="section-card" id="notice-memo-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="margin:0; border:none; padding:0;">포스트잇 공지 메모장 설정</h3>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="cfg-showNoticeNote" style="width:16px; height:16px; accent-color:#3b82f6; cursor:pointer;" ${l.showNoticeNote===!1?``:`checked`}>
            <label for="cfg-showNoticeNote" style="font-size:13px; font-weight:700; color:#0f172a; cursor:pointer;">메모장 노출 (ON)</label>
          </div>
        </div>
        <p style="margin:0 0 16px 0; font-size:12px; color:#64748b; line-height:1.5;">라이브 시청 화면에 노란색 포스트잇(메모장) 형태로 공지사항을 노출합니다. 시청자가 클릭하면 부드럽게 커지면서 긴 공지 내용도 스크롤하여 확인할 수 있습니다.</p>
        
        <div style="display:grid; grid-template-columns: 240px 1fr; gap:16px;">
          <div>
            <label class="modern-label">메모장 제목 (요약 문구)</label>
            <input type="text" class="modern-input" id="cfg-noticeNoteTitle" value="${l.noticeNoteTitle||`Show Notes`}" placeholder="예: Show Notes 또는 방송 공지">
            <div style="font-size:11px; color:#94a3b8; margin-top:4px;">축소 상태 및 상단에 노출되는 제목입니다.</div>
          </div>
          <div>
            <label class="modern-label">공지 내용 (펼침 시 스크롤 표시)</label>
            <textarea class="modern-input" id="cfg-noticeNoteContent" style="height:90px; resize:vertical; padding:10px 14px; font-size:13px; line-height:1.5;" placeholder="방송 중 안내할 공지사항이나 이벤트 참여 방법, 배송 일정 등을 입력하세요.">${l.noticeNoteContent||`방송 공지사항

* 방송 중 특가 혜택이 적용됩니다.
* 실시간 채팅 및 라이브 이벤트에 참여해보세요!
* 공지 내용은 관리자 페이지에서 실시간으로 수정하실 수 있습니다.`}</textarea>
          </div>
        </div>
      </div>

      <div class="section-card" id="share-og-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <h3 style="margin:0; border:none; padding:0;">임베드 관리</h3>
          <div style="display:flex; gap:8px;">
            <button id="btn-preview-og" class="action-btn btn-neutral" style="padding:6px 12px; font-size:11px; font-weight:700;">링크 테스트</button>
            <button id="btn-kakao-cache" class="action-btn btn-neutral" style="padding:6px 12px; font-size:11px; font-weight:700;">카카오 캐시 초기화</button>
          </div>
        </div>
        <p style="margin:0 0 20px 0; font-size:12px; color:#64748b; line-height:1.5;">카카오톡·슬랙·라인 등 SNS에서 링크를 공유할 때 나타나는 미리보기 카드를 커스텀합니다. 설정 후 반드시 <strong>[설정 저장]</strong>을 눌러주세요.</p>

        <div style="display:flex; gap:24px; align-items:flex-start;">
          <!-- 입력 영역 -->
          <div style="flex:1; display:flex; flex-direction:column; gap:14px;">
            <div>
              <label class="modern-label">공유 제목 (Title)</label>
              <input type="text" class="modern-input" id="cfg-shareTitle" value="${l.shareTitle||``}" placeholder="예: 🔴 지금 라이브 중! 단하루 특가">
            </div>
            <div>
              <label class="modern-label">공유 설명 (Description)</label>
              <textarea class="modern-input" id="cfg-shareDesc" style="height:60px; resize:none; padding:10px 14px;" placeholder="예: 지금 입장하면 추가 5% 할인! 재고 소진 임박">${l.shareDesc||``}</textarea>
            </div>
            <div>
              <label class="modern-label">공유 대표 이미지 (1200×630 권장)</label>
              <div style="display:flex; align-items:center; gap:12px;">
                <div id="og-img-wrap" style="width:80px; height:56px; border-radius:8px; overflow:hidden; border:1.5px solid #e2e8f0; flex-shrink:0; background:#f8fafc; cursor:pointer; position:relative;" onclick="document.getElementById('cfg-shareImageFile').click()">
                  <img id="share-image-preview" src="${l.shareImageUrl||``}" style="width:100%; height:100%; object-fit:cover; display:${l.shareImageUrl?`block`:`none`};">
                  <div id="og-img-placeholder" style="display:${l.shareImageUrl?`none`:`flex`}; align-items:center; justify-content:center; height:100%; font-size:22px; color:#cbd5e1;">🖼</div>
                </div>
                <div>
                  <label class="file-upload-btn" for="cfg-shareImageFile" style="display:inline-flex; margin-bottom:6px;">이미지 업로드</label>
                  <input type="file" id="cfg-shareImageFile" accept="image/*" style="display:none;">
                  <div style="font-size:10px; color:#94a3b8;">JPG/PNG, 최소 200×200px<br>미등록 시 방송 썸네일 자동 사용</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 카카오톡 스타일 미리보기 카드 -->
          <div style="width:220px; flex-shrink:0;">
            <div style="font-size:10px; font-weight:700; color:#94a3b8; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:8px;">미리보기</div>
            <div style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.1); border:1px solid #e2e8f0;">
              <div id="og-preview-img-wrap" style="width:100%; height:116px; background:#f1f5f9; overflow:hidden; position:relative;">
                <img id="og-preview-img" src="${l.shareImageUrl||``}" style="width:100%; height:100%; object-fit:cover; display:${l.shareImageUrl?`block`:`none`};">
                <div id="og-preview-img-placeholder" style="display:${l.shareImageUrl?`none`:`flex`}; align-items:center; justify-content:center; height:100%; font-size:32px; color:#cbd5e1;">🖼</div>
              </div>
              <div style="padding:10px 12px;">
                <div id="og-preview-title" style="font-size:13px; font-weight:700; color:#0f172a; line-height:1.3; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${l.shareTitle||`공유 제목을 입력하세요`}</div>
                <div id="og-preview-desc" style="font-size:11px; color:#64748b; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${l.shareDesc||`공유 설명을 입력하세요`}</div>
                <div style="font-size:10px; color:#94a3b8; margin-top:6px;">ryzincorp.com</div>
              </div>
            </div>
            <div style="margin-top:8px; padding:8px; background:#fefce8; border:1px solid #fde68a; border-radius:8px; font-size:10px; color:#713f12; line-height:1.5;">
              💡 <strong>이미지 변경 후</strong> 카카오가 이전 이미지를 계속 보여주면 <strong>[카카오 캐시 초기화]</strong> 버튼을 눌러주세요.
        </div>
          </div>
        </div>
      </div>

      <!-- ImgBB API Key 설정 -->
      <div style="background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:14px 16px; display:flex; align-items:center; gap:10px; margin-top: 10px;">
        <span style="font-size:18px;">🖼️</span>
        <div style="flex:1;">
          <div style="font-size:12px; font-weight:700; color:#374151; margin-bottom:4px;">ImgBB API Key (이미지 업로드용)</div>
          <div style="font-size:10px; color:#94a3b8;"><a href="https://api.imgbb.com/" target="_blank" style="color:#2563eb; text-decoration:underline; font-weight: 600;">여기</a>에서 무료로 발급받아 입력하시면 안정적인 이미지 업로드가 가능합니다.</div>
        </div>
        <input type="password" id="cfg-imgbb-key" placeholder="API Key 입력" value="${localStorage.getItem(`ryzin_imgbb_key`)||``}" style="width:180px; padding:8px 10px; border:1.5px solid #e2e8f0; border-radius:8px; font-size:12px; font-family:monospace; outline:none; background:#fff;">
      </div>


      <div style="display:flex; gap:12px;">
        <button id="btn-save-config" class="action-btn btn-primary-solid" style="flex:1; justify-content:center; padding:14px; font-size:15px;">설정 저장</button>
        <button id="btn-toggle-live" class="action-btn ${l.isLive?`btn-danger-solid`:`btn-success-solid`}" style="flex:1; justify-content:center; padding:14px; font-size:15px;">
          ${l.isLive?`라이브 종료`:`라이브 시작`}
        </button>
      </div>
    `;let e=document.getElementById(`btn-copy-widget-code`);e&&e.addEventListener(`click`,()=>{let t=document.getElementById(`cfg-widget-code`);t&&navigator.clipboard.writeText(t.value).then(()=>{let t=e.textContent;e.textContent=`복사 완료!`,e.style.background=`#16a34a`,setTimeout(()=>{e.textContent=t,e.style.background=`#2563eb`},2e3)})}),document.getElementById(`btn-save-config`).addEventListener(`click`,async()=>{let e=document.getElementById(`btn-save-config`);e.disabled=!0,e.textContent=`저장 중...`;let n=document.getElementById(`cfg-imgbb-key`).value.trim();localStorage.setItem(`ryzin_imgbb_key`,n),l.brandName=document.getElementById(`cfg-brandName`).value,l.title=document.getElementById(`cfg-title`).value,l.streamUrl=document.getElementById(`cfg-stream`).value,l.liveStartTime=document.getElementById(`cfg-liveStartTime`).value,u.cumViewers=parseInt(document.getElementById(`cfg-cumViewers`).value)||0,u.hearts=parseInt(document.getElementById(`cfg-hearts`).value)||0,l.showViewers=document.getElementById(`cfg-showViewers`).checked,l.showSplash=document.getElementById(`cfg-showSplash`).checked;let r=document.getElementById(`cfg-useStandbyImage`);r&&(l.useStandbyImage=r.checked),l.shareTitle=document.getElementById(`cfg-shareTitle`).value,l.shareDesc=document.getElementById(`cfg-shareDesc`).value;let i=document.getElementById(`cfg-showNoticeNote`);i&&(l.showNoticeNote=i.checked);let a=document.getElementById(`cfg-noticeNoteTitle`);a&&(l.noticeNoteTitle=a.value);let o=document.getElementById(`cfg-noticeNoteContent`);o&&(l.noticeNoteContent=o.value),v(),y(),Z(t,l,u,d,!0),w.querySelector(`span[style*="font-weight:700; color:#0f172a"]`).textContent=l.brandName,e.disabled=!1,e.textContent=`설정 저장`,alert(`설정 저장 완료`)});let n=document.getElementById(`og-preview-title`),r=document.getElementById(`og-preview-desc`);document.getElementById(`og-preview-img`),document.getElementById(`og-preview-img-placeholder`);let a=document.getElementById(`cfg-shareTitle`),o=document.getElementById(`cfg-shareDesc`);a&&n&&a.addEventListener(`input`,()=>{n.textContent=a.value||`공유 제목을 입력하세요`}),o&&r&&o.addEventListener(`input`,()=>{r.textContent=o.value||`공유 설명을 입력하세요`});let f=`https://ryzincorp.com/live/${t}`,p=document.getElementById(`btn-kakao-cache`);p&&p.addEventListener(`click`,()=>{let e=`https://developers.kakao.com/tool/clear/og?url=${encodeURIComponent(f)}`;window.open(e,`_blank`)});let m=document.getElementById(`btn-preview-og`);m&&m.addEventListener(`click`,()=>{let e=`https://ryzincorp.com/live/${t}`;window.open(e,`_blank`)}),document.getElementById(`btn-add-viewers`)?.addEventListener(`click`,async()=>{let e=parseInt(document.getElementById(`cfg-viewers-add`).value)||0;if(e===0){alert(`추가할 시청자 수를 입력해주세요.`);return}let n=document.getElementById(`btn-add-viewers`);n.disabled=!0,n.textContent=`처리중...`;try{if(!X)return;let{data:n,error:r}=await X.from(`live_control`).select(`viewers`).eq(`live_id`,t).maybeSingle();if(r)throw r;let i=(n?parseInt(n.viewers)||0:u.viewers)+e;await X.from(`live_control`).update({viewers:i}).eq(`live_id`,t),u.viewers=i,y(),typeof window.updateAdminViewersDisplay==`function`&&window.updateAdminViewersDisplay(),document.getElementById(`cfg-viewers-add`).value=``,alert(`시청자 수가 ${i.toLocaleString()}명으로 업데이트되었습니다.`)}catch(e){alert(`시청자 수 업데이트 실패: `+e.message)}finally{n.disabled=!1,n.textContent=`+추가`}});let h=document.getElementById(`btn-reset-stats`);h&&h.addEventListener(`click`,async()=>{if(confirm(`현재 라이브의 모든 통계 데이터(실시간 시청자 수, 누적 시청자 수, 하트 수, 상품 클릭 수)를 초기화하시겠습니까?`)){h.disabled=!0,h.textContent=`초기화 중...`;try{if(u.viewers=0,u.hearts=0,u.cumViewers=0,Array.isArray(d)&&d.forEach(e=>{e.clicks=0}),y(),b(),X){let{error:e}=await X.from(`live_control`).update({viewers:0,hearts:0,cum_viewers:0,products:d,updated_at:new Date().toISOString()}).eq(`live_id`,t);if(e)throw e}typeof window.updateAdminViewersDisplay==`function`&&window.updateAdminViewersDisplay();let e=document.getElementById(`cfg-cumViewers`);e&&(e.value=0);let n=document.getElementById(`cfg-hearts`);n&&(n.value=0);let r=document.getElementById(`cfg-total-clicks`);r&&(r.textContent=`0회`),alert(`✅ 통계 데이터가 성공적으로 초기화되었습니다.`)}catch(e){console.error(`통계 초기화 오류:`,e),alert(`❌ 통계 초기화에 실패했습니다: `+e.message)}finally{h.disabled=!1,h.textContent=`통계 초기화`}}}),document.getElementById(`btn-toggle-live`).addEventListener(`click`,e=>{let n=e.currentTarget,r=document.getElementById(`cfg-stream`).value.trim();if(!l.isLive&&!r){alert(`스트리밍 URL을 먼저 입력해주세요.
설정을 저장한 후 라이브를 시작할 수 있습니다.`),document.getElementById(`cfg-stream`).focus(),document.getElementById(`cfg-stream`).style.borderColor=`#ef4444`,document.getElementById(`cfg-stream`).style.boxShadow=`0 0 0 3px rgba(239,68,68,0.15)`,setTimeout(()=>{document.getElementById(`cfg-stream`).style.borderColor=``,document.getElementById(`cfg-stream`).style.boxShadow=``},3e3);return}if(l.isLive=!l.isLive,l.isLive){l.liveStartTime=new Date().toISOString();let e=document.getElementById(`cfg-liveStartTime`);e&&(e.value=new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,16))}n.textContent=l.isLive?`라이브 종료`:`라이브 시작`,n.className=`action-btn ${l.isLive?`btn-danger-solid`:`btn-success-solid`}`,n.style.cssText=`flex:1; justify-content:center; padding:14px; font-size:15px;`;let i=w.querySelector(`div:nth-child(2)`);if(i){let e=i.querySelector(`span:last-child`);e&&(e.textContent.includes(`라이브 중`)||e.textContent.includes(`송출 대기`))&&(l.isLive?(e.innerHTML=`<span style="width:5px; height:5px; background:#ef4444; border-radius:50%; display:inline-block;"></span>라이브 중`,e.style.cssText=`font-size:10px; font-weight:800; color:#ef4444; background:#fee2e2; border:1px solid #fecaca; padding:2px 6px; border-radius:4px; white-space:nowrap; height:16px; display:inline-flex; align-items:center; gap:4px;`):(e.innerHTML=`송출 대기`,e.style.cssText=`font-size:10px; font-weight:800; color:#64748b; background:#f1f5f9; border:1px solid #e2e8f0; padding:2px 6px; border-radius:4px; white-space:nowrap; height:16px; display:inline-flex; align-items:center;`))}if(l.isLive){if(!document.getElementById(`onair-timer-wrapper`)){let e=document.createElement(`div`);e.id=`onair-timer-wrapper`,e.style.cssText=`display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:#ef4444; background:#fef2f2; padding:4px 10px; border-radius:6px; border:1px solid #fecaca; white-space:nowrap;`,e.innerHTML=`<div style="width:6px; height:6px; background:#ef4444; border-radius:50%; box-shadow:0 0 0 2px #fee2e2;"></div> 방송 중 <span id="onair-timer-text" style="font-family:monospace; margin-left:2px; letter-spacing:0.02em;">00:00:00</span>`,w.appendChild(e)}let e=new Date(l.liveStartTime).getTime();k();let t=document.getElementById(`onair-timer-text`);if(t){let n=()=>{let n=Date.now()-e,r=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4),a=Math.floor(n%6e4/1e3);t.textContent=`${r.toString().padStart(2,`0`)}:${i.toString().padStart(2,`0`)}:${a.toString().padStart(2,`0`)}`};n(),O=setInterval(n,1e3)}}else{k();let e=document.getElementById(`onair-timer-wrapper`);e&&e.remove()}v(),Z(t,l,u,d,!0)});let g=async(e,n,r)=>{if(e){document.getElementById(n).style.opacity=`0.5`;try{let i=r===`logoUrl`,a=await s(await c(e,i?256:1080,i?256:1920,i?.88:.82));l[r]=a;let o=document.getElementById(n);if(o.src=a,o.style.display=`block`,r===`shareImageUrl`){let e=document.getElementById(`og-preview-img`),t=document.getElementById(`og-preview-img-placeholder`),n=document.getElementById(`og-img-placeholder`);e&&(e.src=a,e.style.display=`block`),t&&(t.style.display=`none`),n&&(n.style.display=`none`)}else if(r===`standbyImageUrl`){l.useStandbyImage=!0;let e=document.getElementById(`cfg-useStandbyImage`);e&&(e.checked=!0);let t=document.getElementById(`cfg-useStandbyImage-label`);t&&(t.textContent=`ON`,t.style.color=`#2563eb`);let n=document.getElementById(`standby-image-placeholder`);n&&(n.style.display=`none`);let r=document.getElementById(`btn-clear-standby-image`);r&&(r.style.display=`block`)}v(),Z(t,l,u,d,!0)}catch(e){console.error(`이미지 업로드 오류:`,e),alert(`이미지 업로드 실패: `+e.message)}finally{document.getElementById(n).style.opacity=`1`}}},_=async e=>{if(!e)return;let t=document.getElementById(`like-preview`),n=document.getElementById(`like-preview-placeholder`),r=document.getElementById(`btn-clear-like-icon`);t.style.opacity=`0.5`;try{let i=``;i=e.size<1.2*1024*1024?await new Promise(t=>{let n=new FileReader;n.onload=e=>t(e.target.result.split(`,`)[1]),n.readAsDataURL(e)}):await c(e,512,512,.9);let a=await s(i);l.likeImageUrl=a,t.src=a,t.style.display=`block`,n&&(n.style.display=`none`),r&&(r.style.display=`block`),v()}catch(e){console.error(`응원 이미지 업로드 오류:`,e),alert(`응원 이미지 업로드 실패: `+e.message)}finally{t.style.opacity=`1`}};document.getElementById(`cfg-logoFile`).addEventListener(`change`,e=>g(e.target.files[0],`logo-preview`,`logoUrl`)),document.getElementById(`cfg-thumbnailFile`).addEventListener(`change`,e=>g(e.target.files[0],`thumbnail-preview`,`thumbnailUrl`)),document.getElementById(`cfg-shareImageFile`).addEventListener(`change`,e=>g(e.target.files[0],`share-image-preview`,`shareImageUrl`)),document.getElementById(`cfg-likeFile`).addEventListener(`change`,e=>_(e.target.files[0])),document.getElementById(`cfg-standbyImageFile`).addEventListener(`change`,async e=>{let t=e.target.files[0];if(!t)return;await g(t,`standby-image-preview`,`standbyImageUrl`),l.useStandbyImage=!0,v();let n=document.getElementById(`cfg-useStandbyImage`);n&&(n.checked=!0);let r=document.getElementById(`cfg-useStandbyImage-label`);r&&(r.textContent=`ON`,r.style.color=`#2563eb`);let i=document.getElementById(`standby-image-placeholder`);i&&(i.style.display=`none`);let a=document.getElementById(`btn-clear-standby-image`);a&&(a.style.display=`block`)});let x=document.getElementById(`btn-standby-youtube`);x&&x.addEventListener(`click`,()=>{let e=cn(l.standbyImageUrl||``)?l.standbyImageUrl:``,n=prompt(`예비 썸네일로 무한 반복 재생할 유튜브 주소를 입력해주세요:
(예: https://youtu.be/... 또는 https://www.youtube.com/watch?v=...)`,e);if(n===null)return;let r=n.trim();if(!r){alert(`유튜브 영상 주소를 입력해주세요.`);return}if(!cn(r)){alert(`올바른 유튜브 주소 형식이 아닙니다.
(예: https://youtu.be/xxxx 또는 https://www.youtube.com/watch?v=xxxx)`);return}l.standbyImageUrl=r,l.useStandbyImage=!0,v(),Z(t,l,u,d,!0),pe(),alert(`유튜브 영상이 예비 썸네일(컨트롤러 숨김/반복재생)로 등록되었습니다.`)});let S=document.getElementById(`btn-clear-standby-image`);S&&S.addEventListener(`click`,()=>{l.standbyImageUrl=``,l.useStandbyImage=!1,v(),pe()});let C=document.getElementById(`cfg-useStandbyImage`);C&&C.addEventListener(`change`,e=>{l.useStandbyImage=e.target.checked,v();let t=document.getElementById(`cfg-useStandbyImage-label`);t&&(t.textContent=l.useStandbyImage?`ON`:`OFF`,t.style.color=l.useStandbyImage?`#2563eb`:`#94a3b8`);let n=document.getElementById(`live-preview-iframe`);n&&(n.src=M+`?t=`+Date.now())}),document.getElementById(`btn-clear-like-icon`).addEventListener(`click`,()=>{l.likeImageUrl=``;let e=document.getElementById(`like-preview`),t=document.getElementById(`like-preview-placeholder`),n=document.getElementById(`btn-clear-like-icon`);e&&(e.src=``,e.style.display=`none`),t&&(t.style.display=`block`),n&&(n.style.display=`none`),v()}),X&&X.from(`live_control`).select(`*`).eq(`live_id`,t).maybeSingle().then(({data:e,error:t})=>{if(t)throw t;if(e){let t=parseInt(e.cum_viewers)||0,n=parseInt(e.viewers)||0,r=parseInt(e.hearts)||0,i=document.getElementById(`cfg-cumViewers`);i&&(i.value=t);let a=document.getElementById(`cfg-viewers`);a&&!a.matches(`:focus`)&&(a.value=n);let o=document.getElementById(`cfg-hearts`);o&&!o.matches(`:focus`)&&(o.value=r),u.cumViewers=t,u.viewers=n,u.hearts=r,y()}}).catch(e=>console.warn(`Failed to fetch stats from Supabase`,e))},me=()=>{A.innerHTML=`
      <!-- 서브 탭 네비게이션 -->
      <div style="display:flex; gap:8px; margin-bottom:16px; background:#f1f5f9; padding:4px; border-radius:10px;">
        <button class="chat-sub-tab-btn active" data-subtab="admin" style="flex:1; padding:8px 0; font-size:13px; font-weight:700; border:none; background:#fff; color:#0f172a; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">관리자 채팅 & 정책</button>
        ${i?``:`
        <button class="chat-sub-tab-btn" data-subtab="bot" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">채팅 봇 관리</button>
        `}
        <button class="chat-sub-tab-btn" data-subtab="event" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">이벤트 관리</button>
      </div>

      <!-- 관리자 채팅 & 정책 뷰 -->
      <div id="chat-sub-admin" class="chat-sub-view">
        <div class="section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9;">
          <h3 style="margin:0; border:none; padding:0;">관리자 채팅 발송</h3>
          <div style="display:flex; gap:8px;">
            <button id="btn-download-chats" class="action-btn btn-neutral" style="padding:6px 12px; font-size:12px;">채팅 다운로드</button>
            <button id="btn-clear-chats" class="action-btn btn-neutral" style="padding:6px 12px; font-size:12px; color:#ef4444; border-color:#fee2e2; background:#fff5f5;">채팅 내역 초기화</button>
          </div>
        </div>
        
        <!-- 관리자 닉네임 / 컬러 및 고객 전송용 입금 계좌 설정 영역 -->
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px; background:#f8fafc; padding:12px 16px; border-radius:10px; border:1px solid #e2e8f0;">
          <div style="display:flex; gap:16px; align-items:flex-end; flex-wrap:wrap;">
            <div style="flex:1; min-width:180px;">
              <label style="font-size:11px; font-weight:700; color:#64748b; display:block; margin-bottom:4px;">관리자 닉네임</label>
              <input type="text" id="admin-nickname-input" class="modern-input" value="${localStorage.getItem(`ryzin_admin_nickname`)||`관리자`}" placeholder="관리자 닉네임..." style="padding:8px 12px; font-size:13px; height:36px; box-sizing:border-box;">
            </div>
            <div style="width:110px;">
              <label style="font-size:11px; font-weight:700; color:#64748b; display:block; margin-bottom:4px;">닉네임 컬러</label>
              <div style="display:flex; align-items:center; gap:6px;">
                <input type="color" id="admin-color-input" value="${localStorage.getItem(`ryzin_admin_color`)||`#ffca28`}" style="width:36px; height:36px; border:1px solid #cbd5e1; border-radius:6px; cursor:pointer; padding:0; background:none; box-sizing:border-box; flex-shrink:0;">
                <span id="admin-color-code" style="font-size:11px; font-family:monospace; font-weight:700; color:#475569;">${localStorage.getItem(`ryzin_admin_color`)||`#ffca28`}</span>
              </div>
            </div>
            <div style="width:110px;">
              <label style="font-size:11px; font-weight:700; color:#64748b; display:block; margin-bottom:4px;">말풍선 배경색</label>
              <div style="display:flex; align-items:center; gap:6px;">
                <input type="color" id="admin-bg-color-input" value="${localStorage.getItem(`ryzin_admin_bg_color`)||`#e50914`}" style="width:36px; height:36px; border:1px solid #cbd5e1; border-radius:6px; cursor:pointer; padding:0; background:none; box-sizing:border-box; flex-shrink:0;">
                <span id="admin-bg-color-code" style="font-size:11px; font-family:monospace; font-weight:700; color:#475569;">${localStorage.getItem(`ryzin_admin_bg_color`)||`#e50914`}</span>
              </div>
            </div>
          </div>
          <!-- 고객 전송용 입금 계좌번호 -->
          <div>
            <label style="font-size:11px; font-weight:700; color:#64748b; display:flex; justify-content:space-between; margin-bottom:4px;">
              <span>고객 전송용 입금 계좌번호 (채팅창에서 고객 클릭 시 전송)</span>
              <span style="font-weight:500; color:#94a3b8;">라이브 화면에 장바구니 주문서와 함께 알림</span>
            </label>
            <input type="text" id="admin-deposit-account-input" class="modern-input" value="${localStorage.getItem(`ryzin_deposit_account`)||`기업은행 010-3018-9716 (채이준)`}" placeholder="예: 기업은행 010-3018-9716 (채이준)" style="padding:8px 12px; font-size:13px; height:36px; box-sizing:border-box; width:100%;">
          </div>
        </div>

        <div id="admin-chat-list" style="height:200px; overflow-y:auto; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:16px; margin-bottom:16px; font-size:14px;">
          <div style="color:#94a3b8; text-align:center; padding-top:70px; font-weight:500;">
            <div style="font-size:24px; margin-bottom:8px;"></div>
            실시간 채팅 내역이 여기에 표시됩니다.
          </div>
        </div>
        <div style="display:flex; gap:10px;">
          <input type="text" id="admin-chat-input" class="modern-input" placeholder="시청자에게 공지할 내용을 입력하세요..." style="flex:1;">
          <button id="btn-send-chat" class="action-btn btn-primary-solid" style="white-space:nowrap;">전송</button>
        </div>
      </div>
        
        <!-- 채팅 정책 설정 (금칙어 및 차단) -->
        <div class="section-card" style="margin-top: 18px;">
          <h3 style="margin:0 0 4px 0; border:none; padding:0;">채팅 정책 설정</h3>
          <p style="margin:0 0 16px 0; font-size:12px; color:#64748b; line-height:1.5;">방송 중 채팅 금칙어를 설정하고, 차단된 사용자 목록을 관리할 수 있습니다. (입력 시 자동 저장)</p>
          
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:18px;">
            <div>
              <label class="modern-label">채팅 금칙어 (쉼표로 구분)</label>
              <textarea class="modern-input" id="cfg-bannedWords" style="height:80px; resize:none; padding:10px 14px; font-size:13px;" placeholder="예: 욕설,바보,비속어,광고">${l.bannedWords||``}</textarea>
              <div style="font-size:10px; color:#94a3b8; margin-top:4px;">쉼표(,)로 구분해 입력해 주세요. 시청자가 전송 시 차단됩니다.</div>
            </div>
            <div>
              <label class="modern-label">차단된 시청자 닉네임 목록 (쉼표로 구분)</label>
              <textarea class="modern-input" id="cfg-bannedUsers" style="height:80px; resize:none; padding:10px 14px; font-size:13px;" placeholder="차단된 사용자가 없습니다.">${l.bannedUsers||``}</textarea>
              <div style="font-size:10px; color:#94a3b8; margin-top:4px;">쉼표(,)로 구분하여 직접 추가하거나, 채팅방에서 바로 차단할 수 있습니다.</div>
            </div>
          </div>
        </div>

        <!-- 타사 사이트용 1줄 임베드 스크립트 복사 영역 (고정 사이즈 제약 없음) -->
        <div style="margin-top:20px; padding:14px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label style="font-size:12px; font-weight:700; color:#334155;">타사 웹사이트 외부 임베드 코드 (반응형 1줄 스크립트)</label>
            <button id="btn-copy-widget-code" class="action-btn btn-primary-solid" style="padding:4px 10px; font-size:11px; font-weight:700;">코드 복사</button>
          </div>
          <input type="text" readonly id="cfg-widget-code" value='<script src="https://ryzincorp.com/widget.js" data-live-id="${t}"><\/script>' style="width:100%; padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-size:11px; background:#fff; font-family:monospace; color:#0f172a; box-sizing:border-box;">
          <div style="font-size:10px; color:#64748b; margin-top:6px;">하드코딩 고정 사이즈 제약이 없는 자율 반응형 라이브 위젯 스크립트입니다. 타사 웹사이트 HTML 문서 하단에 붙여넣으시면 됩니다.</div>
        </div>
      </div>

      <!-- 채팅 봇 관리 뷰 -->
      ${i?``:`
      <div id="chat-sub-bot" class="chat-sub-view" style="display:none;">
        <div class="section-card">
        <h3>채팅 봇</h3>
        <p style="font-size:13px; color:#64748b; margin:0 0 16px; line-height:1.6;">
          시청자에게 보여질 가상 채팅입니다.<br>
          <code style="background:#f1f5f9; padding:2px 8px; border-radius:6px; font-size:12px; font-weight:700;">닉네임 | 채팅내용</code> 형식으로 한 줄씩 입력하세요.
        </p>
        <textarea id="bot-chat-list" class="modern-input" style="height:140px; font-family:monospace; resize:vertical; font-size:13px; line-height:1.7; margin-bottom:16px;" placeholder="뷰티러버 | 이 제품 민감성 피부도 사용 가능한가요?&#10;예쁜하루 | 오늘 할인율이 몇 %인가요?&#10;맘스타그램 | 임산부도 사용해도 되나요?">${f.list}</textarea>
        <div style="display:flex; align-items:center; justify-content:space-between; background:#f8fafc; padding:14px 18px; border-radius:10px; border:1.5px solid #e2e8f0; margin-bottom:16px;">
          <label style="font-size:14px; font-weight:700; color:#374151;">자동 전송 주기</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="number" id="bot-interval" class="modern-input" value="${f.interval}" min="1" style="width:72px; text-align:center; font-weight:700;">
            <span style="font-size:13px; color:#64748b; font-weight:600;">초마다 1개</span>
          </div>
        </div>
        <button id="btn-toggle-bot" class="action-btn btn-primary-solid" style="width:100%; justify-content:center; padding:14px; font-size:15px; gap:8px;">
          <span id="bot-icon">▶</span> <span id="bot-text">채팅 봇 시작</span>
        </button>
        </div>
        
        <div class="section-card" style="margin-top:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9;">
            <h3 style="margin:0; border:none; padding:0;">키워드 자동응답 봇</h3>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:13px; font-weight:700;">
              <input type="checkbox" id="auto-reply-active" ${f.autoReplyActive?`checked`:``} style="width:16px; height:16px; accent-color:#3b82f6;"> 자동응답 활성화
            </label>
          </div>
          <p style="font-size:12px; color:#64748b; margin:0 0 16px 0; line-height:1.5;">시청자가 특정 키워드를 입력하면 '자동응답봇'이 설정된 답변을 실시간으로 즉시 발송합니다.</p>
          
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:16px;">
            <div style="display:flex; gap:10px; margin-bottom:10px;">
              <input type="text" id="ar-title" class="modern-input" placeholder="질문 (예: 얼마예요?)" style="flex:1; font-size:13px;">
              <input type="text" id="ar-keywords" class="modern-input" placeholder="감지 키워드 (쉼표 구분, 예: 가격,얼마,비용)" style="flex:2; font-size:13px;">
            </div>
            <div style="display:flex; gap:10px;">
              <input type="text" id="ar-answer" class="modern-input" placeholder="답변 내용 (예: 오늘 특가 39,900원입니다.)" style="flex:1; font-size:13px;">
              <button id="btn-add-ar" class="action-btn btn-primary-solid" style="white-space:nowrap;">추가하기</button>
            </div>
          </div>

          <div id="ar-list-container" style="display:flex; flex-direction:column; gap:8px;">
            <!-- 자동응답 규칙 목록 렌더링 -->
          </div>
        </div>
      </div>
      `}

      <!-- 이벤트 관리 뷰 -->
      <div id="chat-sub-event" class="chat-sub-view" style="display:none;">
      <!-- 소통왕/구매인증 당첨 배너 제어 (깜짝딜 방식) -->
      <div class="section-card">
        <h3 style="margin:0 0 8px 0; border:none; padding:0; display:flex; align-items:center; gap:6px;">
          <span>당첨 알림 배너 제어 (소통왕/구매인증)</span>
          ${l.winner_timestamp&&Number(l.winner_timestamp)>Date.now()?`<span style="font-size:11px; font-weight:700; background:#3b82f6; color:#fff; padding:2px 8px; border-radius:12px;">노출 진행중</span>`:``}
        </h3>
        <p style="font-size:12px; color:#64748b; margin:0 0 14px 0; line-height:1.4;">
          당첨 종류(유형)를 선택하고 닉네임을 적은 뒤 노출 시간(분)을 입력하고 시작을 누르면 배너가 활성화됩니다.
        </p>
        
        <!-- 당첨 유형 세그먼트 스위치 그룹 -->
        <div style="display:flex; gap:10px; margin-bottom:14px; align-items:center;">
          <span style="font-size:13px; font-weight:700; color:#495057;">당첨 유형:</span>
          <div id="winner-type-segmented" style="display:inline-flex; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:10px; padding:3px; overflow:hidden; box-shadow:inset 0 2px 4px rgba(0,0,0,0.05);">
            <button type="button" class="type-segment-btn ${!l.winner_name||!l.winner_name.startsWith(`구매인증`)?`active`:``}" data-type="소통왕" style="padding:6px 16px; border:none; border-radius:7px; font-size:12px; font-weight:700; cursor:pointer; outline:none; transition:all 0.15s; background:${!l.winner_name||!l.winner_name.startsWith(`구매인증`)?`#3b82f6`:`transparent`}; color:${!l.winner_name||!l.winner_name.startsWith(`구매인증`)?`#fff`:`#64748b`};">소통왕</button>
            <button type="button" class="type-segment-btn ${l.winner_name&&l.winner_name.startsWith(`구매인증`)?`active`:``}" data-type="구매인증" style="padding:6px 16px; border:none; border-radius:7px; font-size:12px; font-weight:700; cursor:pointer; outline:none; transition:all 0.15s; background:${l.winner_name&&l.winner_name.startsWith(`구매인증`)?`#3b82f6`:`transparent`}; color:${l.winner_name&&l.winner_name.startsWith(`구매인증`)?`#fff`:`#64748b`};">구매인증</button>
          </div>
        </div>

        <div style="display:flex; gap:8px; align-items:center;">
          <input type="text" class="modern-input" style="flex:2; padding:8px 12px; font-size:13px;" id="winner-announce-text" placeholder="당첨자 닉네임 입력 (예: 라이진)" value="${l.winner_name&&l.winner_name.includes(`|`)?l.winner_name.split(`|`)[1]:l.winner_name||``}">
          <input type="number" class="modern-input" style="width:54px; padding:8px; font-size:13px;" id="winner-announce-min" placeholder="분" value="1">
          <button id="btn-winner-start" style="padding:8px 16px; background:#3b82f6; color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; white-space:nowrap;">시작</button>
          <button id="btn-winner-cancel" style="padding:8px 16px; background:#f1f5f9; color:#374151; border:1.5px solid #e2e8f0; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap;">종료</button>
        </div>
      </div>

      <!-- 실시간 당첨 정보 수집 현황판 -->
      <div class="section-card" style="margin-top: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid #f1f5f9; padding-bottom:12px; margin-bottom:16px;">
          <h3 style="margin:0; border:none; padding:0; display:flex; align-items:center; gap:6px;">
            <span>당첨 경품 배송 정보 현황판</span>
          </h3>
          <button id="btn-refresh-winners" class="action-btn btn-neutral" style="padding:6px 12px; font-size:12px; font-weight:700;">새로고침</button>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:left;">
            <thead>
              <tr style="border-bottom:2px solid #e2e8f0; color:#475569; font-weight:700;">
                <th style="padding:10px 12px;">닉네임</th>
                <th style="padding:10px 12px;">수령인</th>
                <th style="padding:10px 12px;">연락처</th>
                <th style="padding:10px 12px;">상세 배송 주소</th>
                <th style="padding:10px 12px; text-align:right;">제출시간</th>
              </tr>
            </thead>
            <tbody id="winner-table-body">
              <tr>
                <td colspan="5" style="text-align:center; padding:30px; color:#94a3b8; font-weight:500;">
                  당첨자 제출 목록을 불러오는 중...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    `;let e=A.querySelectorAll(`.chat-sub-tab-btn`),n=A.querySelectorAll(`.chat-sub-view`);e.forEach(t=>{t.addEventListener(`click`,()=>{e.forEach(e=>{e.classList.remove(`active`),e.style.background=`transparent`,e.style.color=`#64748b`,e.style.fontWeight=`600`,e.style.boxShadow=`none`}),t.classList.add(`active`),t.style.background=`#fff`,t.style.color=`#0f172a`,t.style.fontWeight=`700`,t.style.boxShadow=`0 1px 3px rgba(0,0,0,0.1)`,n.forEach(e=>e.style.display=`none`);let r=document.getElementById(`chat-sub-${t.dataset.subtab}`);r&&(r.style.display=`block`)})});let r=document.getElementById(`cfg-bannedWords`),a=document.getElementById(`cfg-bannedUsers`),o=()=>{l.bannedWords=r.value.trim(),l.bannedUsers=a.value.trim(),v()};r&&r.addEventListener(`change`,o),a&&a.addEventListener(`change`,o);let s=document.getElementById(`admin-chat-input`),c=document.getElementById(`admin-chat-list`),_=document.getElementById(`admin-nickname-input`),y=document.getElementById(`admin-color-input`),b=document.getElementById(`admin-color-code`),S=document.getElementById(`admin-bg-color-input`),C=document.getElementById(`admin-bg-color-code`),w=async()=>{let e=document.getElementById(`winner-table-body`);if(e)try{if(!X)return;let{data:n,error:r}=await X.from(`live_winners`).select(`*`).eq(`live_id`,t).order(`created_at`,{ascending:!1});if(r)throw r;let i=(n||[]).filter(e=>e.nickname?!e.nickname.startsWith(`{"type":"order"`)&&!e.nickname.startsWith(`{"type": "order"`):!0);if(i.length===0){e.innerHTML=`<tr><td colspan="5" style="text-align:center; padding:30px; color:#94a3b8;">당첨자 제출 목록이 없습니다.</td></tr>`;return}e.innerHTML=i.map(e=>{let t=new Date(e.created_at).toLocaleTimeString(`ko-KR`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`});return`
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:10px 12px; font-weight:700; color:#0f172a;">${e.nickname}</td>
              <td style="padding:10px 12px; font-weight:600; color:#374151;">${e.name||`-`}</td>
              <td style="padding:10px 12px; font-family:monospace; color:#374151;">${e.phone||`-`}</td>
              <td style="padding:10px 12px; color:#475569; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${e.address||``}">${e.address||``}</td>
              <td style="padding:10px 12px; text-align:right; color:#94a3b8; font-size:11px;">${t}</td>
            </tr>
          `}).join(``)}catch(e){console.warn(`Failed to fetch winners`,e)}};document.getElementById(`btn-refresh-winners`)?.addEventListener(`click`,w),w();let T=setInterval(w,1e4);_&&_.addEventListener(`input`,()=>{localStorage.setItem(`ryzin_admin_nickname`,_.value.trim())}),y&&y.addEventListener(`input`,()=>{localStorage.setItem(`ryzin_admin_color`,y.value),b&&(b.textContent=y.value)}),S&&S.addEventListener(`input`,()=>{localStorage.setItem(`ryzin_admin_bg_color`,S.value),C&&(C.textContent=S.value)});let E=document.getElementById(`admin-deposit-account-input`);E&&E.addEventListener(`input`,()=>{localStorage.setItem(`ryzin_deposit_account`,E.value.trim())});let D=!1,O=async()=>{let e=s.value.trim();if(!e||D)return;D=!0;let n=(_?_.value.trim():``)||`관리자`,r=y?y.value:`#ffca28`,i=S?S.value:`#e50914`,a=`${n}|${r}|${i}`,o=Date.now(),l=document.createElement(`div`);l.style.cssText=`margin-bottom:8px; padding:8px 12px; border-radius:10px; background:${i}22; border-left:4px solid ${r}; display:flex; flex-direction:column; gap:2px;`,l.innerHTML=`<span style="font-weight:700; color:${r}; font-size:12px;">${n}</span><span style="font-size:13px; color:#1e293b;">${e}</span>`,c.innerHTML.includes(`실시간 채팅`)&&(c.innerHTML=``),c.appendChild(l),c.scrollTop=c.scrollHeight,s.value=``;try{if(!X)return;await X.from(`live_chats`).insert([{live_id:t,created_at:o,nickname:a,content:e}])}catch(e){console.warn(`Admin chat send failed`,e)}finally{D=!1}};document.getElementById(`btn-send-chat`).addEventListener(`click`,O),s.addEventListener(`keypress`,e=>{e.key===`Enter`&&O()});let k=document.getElementById(`btn-download-chats`);k&&k.addEventListener(`click`,async()=>{if(!X){alert(`DB 연결이 유효하지 않습니다.`);return}let e=k.textContent;k.disabled=!0,k.textContent=`다운로드 중...`;try{let{data:e,error:n}=await X.from(`live_chats`).select(`*`).eq(`live_id`,t).order(`created_at`,{ascending:!0});if(n)throw n;if(!e||e.length===0){alert(`백업할 채팅 내역이 없습니다.`);return}let r=`﻿`+[[`작성시간`,`닉네임`,`내용`].join(`,`),...e.map(e=>{let t=new Date(parseInt(e.created_at)||Date.now()).toLocaleString(`ko-KR`),n=e.nickname||``;n.includes(`|`)&&(n=n.split(`|`)[0]);let r=e=>`"${e.replace(/"/g,`""`)}"`;return[r(t),r(n),r(e.content||``)].join(`,`)})].join(`
`),i=new Blob([r],{type:`text/csv;charset=utf-8;`}),a=URL.createObjectURL(i),o=document.createElement(`a`),s=new Date,c=s.getFullYear()+String(s.getMonth()+1).padStart(2,`0`)+String(s.getDate()).padStart(2,`0`)+`_`+String(s.getHours()).padStart(2,`0`)+String(s.getMinutes()).padStart(2,`0`)+String(s.getSeconds()).padStart(2,`0`);o.href=a,o.setAttribute(`download`,`ryzin_chats_${t}_${c}.csv`),document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(a)}catch(e){console.error(`채팅 다운로드 실패:`,e),alert(`채팅 다운로드에 실패했습니다: `+e.message)}finally{k.disabled=!1,k.textContent=e}}),document.getElementById(`btn-clear-chats`).addEventListener(`click`,async()=>{if(confirm(`📡 이 라이브 방송의 모든 실시간 채팅 내역을 초기화(영구 삭제)하시겠습니까?
이 작업은 복구할 수 없습니다.`)){let e=document.getElementById(`btn-clear-chats`);e.disabled=!0,e.textContent=`초기화 중...`;try{if(!X)throw Error(`Supabase client가 로드되지 않았습니다.`);let{error:e}=await X.from(`live_chats`).delete().eq(`live_id`,t);if(e)throw e;alert(`채팅 내역이 성공적으로 초기화되었습니다!`),c.innerHTML=`<div style="color:#94a3b8; text-align:center; padding-top:70px; font-weight:500;">
            <div style="font-size:24px; margin-bottom:8px;">💭</div>
            실시간 채팅 내역이 여기에 표시됩니다.
          </div>`}catch(e){alert(`채팅 내역 초기화 실패: `+e.message)}finally{e.disabled=!1,e.textContent=`채팅 내역 초기화`}}});let j=document.getElementById(`bot-chat-list`),M=document.getElementById(`bot-interval`);j?.addEventListener(`input`,()=>{f.list=j.value,x()}),M?.addEventListener(`input`,()=>{f.interval=parseInt(M.value)||10,x()});let N=()=>{let e=document.getElementById(`bot-icon`),t=document.getElementById(`bot-text`),n=document.getElementById(`btn-toggle-bot`);n&&(m?(e.textContent=`⏸`,t.textContent=`채팅 봇 중지`,n.className=`action-btn btn-danger-solid`,n.style.cssText=`width:100%; justify-content:center; padding:14px; font-size:15px; gap:8px;`):(e.textContent=`▶`,t.textContent=`채팅 봇 시작`,n.className=`action-btn btn-primary-solid`,n.style.cssText=`width:100%; justify-content:center; padding:14px; font-size:15px; gap:8px;`))};N(),document.getElementById(`btn-toggle-bot`)?.addEventListener(`click`,()=>{if(m=!m,m){if(g=j.value.split(`
`).map(e=>e.trim()).filter(e=>e.includes(`|`)),g.length===0){alert(`닉네임|내용 형식으로 1줄 이상 입력해주세요.`),m=!1;return}h>=g.length&&(h=0),N();let e=parseInt(M.value)||10;p&&clearInterval(p),p=setInterval(async()=>{if(h>=g.length){clearInterval(p),p=null,m=!1,N();return}let[e,...n]=g[h++].split(`|`),r=n.join(`|`).trim();if(!e||!r)return;let i=Date.now(),a=document.createElement(`div`);a.style.cssText=`margin-bottom:8px; padding:6px 0; border-bottom:1px solid #f1f5f9;`,a.innerHTML=`<span style="font-weight:700; color:#64748b;">${e.trim()}:</span> ${r}`,c.innerHTML.includes(`실시간 채팅`)&&(c.innerHTML=``),c.appendChild(a),c.scrollTop=c.scrollHeight;try{if(!X)return;await X.from(`live_chats`).insert([{live_id:t,created_at:i,nickname:e.trim(),content:r}])}catch(e){console.warn(`Bot chat failed`,e)}},e*1e3)}else p&&clearInterval(p),p=null,N()});let P=document.getElementById(`auto-reply-active`),ee=document.getElementById(`btn-add-ar`),te=document.getElementById(`ar-title`),ne=document.getElementById(`ar-keywords`),F=document.getElementById(`ar-answer`),re=document.getElementById(`ar-list-container`),ie=()=>{if(re){if(!f.autoReplyRules||f.autoReplyRules.length===0){re.innerHTML=`<div style="text-align:center; padding:20px; color:#94a3b8; font-size:13px; font-weight:500;">등록된 자동응답 규칙이 없습니다.</div>`;return}re.innerHTML=f.autoReplyRules.map((e,t)=>`
        <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; padding:12px 14px; border:1px solid #cbd5e1; border-radius:8px; box-shadow:0 1px 2px rgba(0,0,0,0.02);">
          <div style="flex:1; overflow:hidden;">
            <div style="font-weight:700; font-size:14px; color:#0f172a; margin-bottom:6px;">${e.title||`규칙 `+(t+1)}</div>
            <div style="font-size:12px; color:#64748b; margin-bottom:4px; line-height:1.4;"><span style="font-weight:700; color:#3b82f6;">키워드:</span> ${e.keywords}</div>
            <div style="font-size:12px; color:#475569; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; line-height:1.4;"><span style="font-weight:700; color:#10b981;">답변:</span> ${e.answer}</div>
          </div>
          <button class="btn-del-ar action-btn" data-index="${t}" style="background:#fef2f2; color:#ef4444; border:1px solid #fecaca; padding:6px 12px; font-size:12px; margin-left:12px; flex-shrink:0;">삭제</button>
        </div>
      `).join(``),re.querySelectorAll(`.btn-del-ar`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.target.dataset.index);f.autoReplyRules.splice(t,1),x(),ie()})})}};P&&P.addEventListener(`change`,e=>{f.autoReplyActive=e.target.checked,x()}),ee&&ee.addEventListener(`click`,()=>{let e=te.value.trim(),t=ne.value.trim(),n=F.value.trim();if(!t||!n){alert(`키워드와 답변 내용을 모두 입력해주세요.`);return}f.autoReplyRules||=[],f.autoReplyRules.push({title:e,keywords:t,answer:n}),x(),te.value=``,ne.value=``,F.value=``,ie()}),ie();let ae=0,oe=null,se=async e=>{let n=document.getElementById(`admin-deposit-account-input`),r=(n?n.value.trim():``)||localStorage.getItem(`ryzin_deposit_account`)||`기업은행 010-3018-9716 (채이준)`;if(!confirm(`[${e}] 고객님의 라이브 화면에\n담아놓은 장바구니 주문서와 입금 계좌를 띄우시겠습니까?\n\n입금 계좌: ${r}`))return;let i={type:`direct_order_request`,targetNickname:e,depositAccount:r,adminName:(document.getElementById(`admin-nickname-input`)?.value||`관리자`).trim(),timestamp:Date.now()};try{X&&await X.from(`live_chats`).insert([{live_id:t,created_at:Date.now(),nickname:`SYSTEM_DIRECT_ORDER_REQUEST`,content:JSON.stringify(i)}]),oe&&oe.send({type:`broadcast`,event:`direct_order_request`,payload:i});let n=document.createElement(`div`);n.style.cssText=`margin:6px 0; padding:6px 12px; background:#eff6ff; border-radius:6px; font-size:12px; color:#1d4ed8; font-weight:600; text-align:center; border:1px solid #bfdbfe;`,n.textContent=`[${e}] 고객님 라이브 화면에 주문서 & 입금 계좌 알림을 전송했습니다.`,c.appendChild(n),c.scrollTop=c.scrollHeight,alert(`[${e}] 고객님의 라이브 화면으로 주문서 및 입금 계좌 알림을 성공적으로 전송했습니다!`)}catch(e){alert(`전송 중 오류가 발생했습니다: `+e.message)}},I=(e,n,r=!1)=>{if(!e||e===`SYSTEM_DIRECT_ORDER_REQUEST`||e.startsWith(`SYSTEM_`)||typeof n==`string`&&(n.startsWith(`{"type":"direct_order_request"`)||n.startsWith(`{"type": "direct_order_request"`)))return;c.innerHTML.includes(`실시간 채팅 내역이 여기에`)&&(c.innerHTML=``);let i=document.createElement(`div`);i.style.cssText=`margin-bottom:8px; padding:6px 0; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;`+(r?`opacity:0.72;`:``);let a=e===`관리자`||e.includes(`|`)?`#3b82f6`:`#0f172a`,o=e,s=!1;e.includes(`|`)?(o=e.split(`|`)[0],s=!0):e===`관리자`&&(s=!0);let f=!s&&o!==`?`&&o!==`SYSTEM`,p=f?`
        <div style="display:inline-flex; align-items:center; gap:4px; margin-left:8px; flex-shrink:0;">
          <button class="btn-send-order-alert" data-nickname="${o}" style="background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe; border-radius:5px; padding:3px 8px; font-size:11px; font-weight:700; cursor:pointer; line-height:1.4; transition:all 0.12s;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#eff6ff'" title="클릭 시 [${o}] 고객 화면에 주문서 & 계좌 팝업 알럿 전송">
            주문서&계좌 전송
          </button>
          <button class="btn-ban-user" data-nickname="${o}" style="background:#fff5f5; color:#ef4444; border:1px solid #fee2e2; border-radius:5px; padding:3px 6px; font-size:11px; font-weight:600; cursor:pointer; line-height:1.4;">
            차단
          </button>
        </div>
      `:``;i.innerHTML=`
        <div style="flex:1; min-width:0; word-break:break-all; font-size:13px; display:flex; align-items:baseline; flex-wrap:wrap; gap:4px;">
          ${f?`
            <button type="button" class="btn-customer-name-click" data-nickname="${o}" style="background:none; border:none; padding:0; font-weight:700; color:#0f172a; cursor:pointer; text-decoration:underline; text-decoration-color:#cbd5e1; text-underline-offset:2px; font-size:13px; transition:color 0.12s;" onmouseover="this.style.color='#2563eb'" onmouseout="this.style.color='#0f172a'" title="클릭 시 [${o}] 고객 화면에 주문서 & 계좌 팝업 알럿 전송">
              ${o}
            </button>:
          `:`
            <span style="font-weight:700; color:${a};">${o}:</span>
          `}
          <span style="color:#1e293b;">${n}</span>
        </div>
        ${p}
      `,i.querySelectorAll(`.btn-customer-name-click, .btn-send-order-alert`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.nickname;n&&se(n)})});let m=i.querySelector(`.btn-ban-user`);m&&m.addEventListener(`click`,e=>{e.stopPropagation();let n=m.dataset.nickname;if(confirm(`[${n}] 시청자를 차단하시겠습니까?\n차단 이후에는 이 시청자의 채팅 전송이 제한됩니다.`)){let e=l.bannedUsers?l.bannedUsers.split(`,`).map(e=>e.trim()).filter(e=>e):[];e.includes(n)||(e.push(n),l.bannedUsers=e.join(`,`),v(),Z(t,l,u,d,!0),alert(`[${n}] 님이 정상 차단되었습니다.`),me())}}),c.appendChild(i),r||(c.scrollTop=c.scrollHeight)},L=async()=>{if(X)try{let{data:e,error:n}=await X.from(`live_chats`).select(`*`).eq(`live_id`,t).order(`created_at`,{ascending:!1}).limit(300);if(n)throw n;e&&Array.isArray(e)&&(e.reverse().forEach(e=>{I(e.nickname||`?`,e.content||``,!0),ae=parseInt(e.created_at)||0}),setTimeout(()=>{c.scrollTop=c.scrollHeight},100))}catch(e){console.warn(`Failed to load chat history`,e)}};window.updateAdminViewersDisplay=()=>{let e=document.getElementById(`cfg-viewers-display`);e&&(e.innerHTML=`${(u.viewers+(u.cumViewers||0)).toLocaleString()}명 <span style="font-size:11px; font-weight:normal; color:#64748b; margin-left:4px;">(방송+수동: ${u.viewers.toLocaleString()}, 누적: ${(u.cumViewers||0).toLocaleString()})</span>`);let t=document.getElementById(`cfg-cumViewers`);t&&(t.value=u.cumViewers||0);let n=document.getElementById(`cfg-hearts`);n&&(n.value=u.hearts||0)};let R=null;L(),X&&(oe=X.channel(`admin-chat-ui-channel-${t}`).on(`postgres_changes`,{event:`INSERT`,schema:`public`,table:`live_chats`,filter:`live_id=eq.${t}`},e=>{let t=e.new;t&&parseInt(t.created_at)>ae&&(I(t.nickname||`?`,t.content||``,!1),ae=parseInt(t.created_at))}).subscribe()),X&&(R=setInterval(async()=>{try{let{data:e,error:n}=await X.from(`live_control`).select(`viewers, cum_viewers, hearts`).eq(`live_id`,t).maybeSingle();e&&!n&&(u.viewers=parseInt(e.viewers)||0,u.cumViewers=parseInt(e.cum_viewers)||0,u.hearts=parseInt(e.hearts)||0,typeof window.updateAdminViewersDisplay==`function`&&window.updateAdminViewersDisplay())}catch{}},3e3)),A.addEventListener(`adminTabLeave`,()=>{oe&&X.removeChannel(oe),R&&clearInterval(R),T&&clearInterval(T)});let z=document.getElementById(`btn-winner-start`),ce=document.getElementById(`btn-winner-cancel`),le=l.winner_name&&l.winner_name.startsWith(`구매인증`)?`구매인증`:`소통왕`,B=A.querySelectorAll(`.type-segment-btn`);B.forEach(e=>{e.addEventListener(`click`,()=>{B.forEach(e=>{e.classList.remove(`active`),e.style.background=`transparent`,e.style.color=`#64748b`}),e.classList.add(`active`),e.style.background=`#3b82f6`,e.style.color=`#fff`,le=e.dataset.type})}),z&&z.addEventListener(`click`,async()=>{let e=document.getElementById(`winner-announce-text`).value.trim(),n=parseInt(document.getElementById(`winner-announce-min`).value)||1;if(!e){alert(`당첨자 닉네임을 입력해 주세요.`);return}z.disabled=!0,z.textContent=`적용 중...`;let r=`${le}|${e}`,i=Date.now()+n*60*1e3;try{if(!X)return;let{error:e}=await X.from(`live_control`).update({winner_name:r,winner_timestamp:i,updated_at:new Date().toISOString()}).eq(`live_id`,t);if(e)throw e;l.winner_name=r,l.winner_timestamp=i,me()}catch{alert(`시작 처리에 실패했습니다.`)}finally{z.disabled=!1,z.textContent=`시작`}}),ce&&ce.addEventListener(`click`,async()=>{ce.disabled=!0,ce.textContent=`종료 중...`;try{if(!X)return;let{error:e}=await X.from(`live_control`).update({winner_timestamp:0,updated_at:new Date().toISOString()}).eq(`live_id`,t);if(e)throw e;l.winner_timestamp=0,me()}catch{alert(`종료 처리에 실패했습니다.`)}finally{ce.disabled=!1,ce.textContent=`종료`}})},V=()=>d.map((e,t)=>{let n=e.clicks||0,r=e.isFeatured===!0||e.isFeatured===`true`;return`
    <div class="product-row" style="${r?`border: 2px solid #2563eb; background: #f8faff; box-shadow:0 4px 12px rgba(37,99,235,0.08);`:``}">
      <div class="product-img-box" onclick="document.getElementById('upload-prod-${t}').click()" title="클릭하여 이미지 변경" style="position:relative;">
        <img src="${e.image||`https://via.placeholder.com/72`}" id="img-prev-${t}">
        <input type="file" id="upload-prod-${t}" accept="image/*" style="display:none;" data-idx="${t}" class="prod-img-upload">
        ${r?`<span style="position:absolute; bottom:2px; left:2px; right:2px; background:#2563eb; color:#ffffff; font-size:10px; font-weight:800; text-align:center; border-radius:4px; padding:1px 0;">소개중</span>`:``}
      </div>
      <div class="product-inputs">
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="text" class="modern-input" style="flex:2;" value="${e.name||``}" data-idx="${t}" data-field="name" placeholder="상품명">
          <input type="text" class="modern-input price-input" style="flex:1;" value="${e.normalPrice?Number(e.normalPrice.toString().replace(/[^0-9]/g,``)).toLocaleString():``}" data-idx="${t}" data-field="normalPrice" placeholder="정상가">
          <input type="text" class="modern-input price-input" style="flex:1;" value="${e.price?Number(e.price.toString().replace(/[^0-9]/g,``)).toLocaleString():``}" data-idx="${t}" data-field="price" placeholder="라이브가">
          <input type="number" class="modern-input" value="${e.discountRate||0}" data-idx="${t}" data-field="discountRate" placeholder="%" readonly style="width:50px; text-align:center;">
        </div>
        <div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
          <input type="text" class="modern-input" style="flex:1;" value="${e.url||``}" data-idx="${t}" data-field="url" placeholder="구매 링크 URL" ${e.isLeadForm?`disabled`:``}>
          <label style="font-size:12px; color:${r?`#1d4ed8`:`#334155`}; font-weight:800; display:flex; align-items:center; gap:5px; cursor:pointer; user-select:none; white-space:nowrap; background:${r?`#eff6ff`:`#f8fafc`}; padding:8px 12px; border:${r?`1.5px solid #2563eb`:`1px solid #cbd5e1`}; border-radius:8px; transition:all 0.15s;">
            <input type="checkbox" data-idx="${t}" data-field="isFeatured" class="chk-featured-product" ${r?`checked`:``} style="width:14px; height:14px; accent-color:#2563eb; cursor:pointer;">
            지금소개중
          </label>
          <label style="font-size:12px; color:#475569; font-weight:700; display:flex; align-items:center; gap:5px; cursor:pointer; user-select:none; white-space:nowrap; background:#f8fafc; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px;">
            <input type="checkbox" data-idx="${t}" data-field="isLeadForm" ${e.isLeadForm===!0||e.isLeadForm===`true`?`checked`:``} style="width:14px; height:14px; accent-color:#3b82f6;">
            상담문의
          </label>
          <label style="font-size:12px; color:#475569; font-weight:700; display:flex; align-items:center; gap:5px; cursor:pointer; user-select:none; white-space:nowrap; background:#f8fafc; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px;">
            <input type="checkbox" data-idx="${t}" data-field="hideByDefault" ${e.hideByDefault===!0||e.hideByDefault===`true`?`checked`:``} style="width:14px; height:14px; accent-color:#16a34a;">
            평소숨김
          </label>
          <label style="font-size:12px; color:#dc2626; font-weight:800; display:flex; align-items:center; gap:5px; cursor:pointer; user-select:none; white-space:nowrap; background:#fef2f2; padding:8px 12px; border:1.5px solid #fca5a5; border-radius:8px;">
            <input type="checkbox" data-idx="${t}" data-field="isFreeGiveaway" ${e.isFreeGiveaway===!0||e.isFreeGiveaway===`true`?`checked`:``} style="width:14px; height:14px; accent-color:#ef4444;" class="chk-giveaway">
            선착순 무료나눔
          </label>
          ${e.isFreeGiveaway===!0||e.isFreeGiveaway===`true`?`
            <div style="display:flex; align-items:center; gap:6px; background:#fff1f2; padding:4px 8px; border-radius:8px; border:1px solid #fecdd3; white-space:nowrap;">
              <span style="font-size:11.5px; font-weight:700; color:#dc2626;">수량:</span>
              <input type="number" class="modern-input" style="width:50px; padding:4px 6px; font-size:12px; font-weight:700; text-align:center;" data-idx="${t}" data-field="giveawayStock" value="${e.giveawayStock||3}">
              <button class="btn-giveaway-start" data-idx="${t}" style="padding:4px 9px; background:#dc2626; color:#fff; border:none; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer; white-space:nowrap;">시작</button>
              <button class="btn-giveaway-stop" data-idx="${t}" style="padding:4px 9px; background:#f1f5f9; color:#475569; border:1px solid #cbd5e1; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; white-space:nowrap;">종료</button>
              ${e.isGiveawayActive?`<span style="font-size:11px; font-weight:800; color:#16a34a; background:#dcfce7; padding:2px 6px; border-radius:4px;">송출중</span>`:`<span style="font-size:11px; font-weight:600; color:#94a3b8;">대기</span>`}
            </div>
          `:``}
          <span style="font-size:12px; font-weight:700; color:#3b82f6; background:#eff6ff; padding:8px 10px; border-radius:8px; white-space:nowrap;">조회: ${n.toLocaleString()}</span>
          <button class="action-btn btn-neutral btn-move-up" data-idx="${t}" style="padding:8px 10px; font-size:13px; flex-shrink:0; cursor:pointer;" ${t===0?`disabled`:``}>▲</button>
          <button class="action-btn btn-neutral btn-move-down" data-idx="${t}" style="padding:8px 10px; font-size:13px; flex-shrink:0; cursor:pointer;" ${t===d.length-1?`disabled`:``}>▼</button>
          <button class="action-btn btn-danger-solid btn-del-product" data-idx="${t}" style="padding:8px 14px; font-size:13px; white-space:nowrap; flex-shrink:0;">삭제</button>
        </div>
        ${i?``:`
        <details style="margin-top:10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px;">
          <summary style="padding:10px 14px; font-size:13px; font-weight:600; color:#475569; cursor:pointer; user-select:none;">고급 설정 (깜짝딜 / 좋아요 조건)</summary>
          <div style="padding:10px 14px; border-top:1px solid #e2e8f0; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; gap:8px; align-items:center; background:#fff1f2; padding:10px 14px; border-radius:8px; border:1px solid #fecdd3;">
              <span style="font-size:12px; font-weight:700; color:#e11d48;">깜짝딜</span>
              <input type="text" class="modern-input" style="flex:1; padding:6px 10px; font-size:12px;" id="deal-text-${t}" placeholder="배너 문구" value="${e.dealText||`깜짝딜 종료까지`}">
              <input type="number" class="modern-input" style="width:64px; padding:6px; font-size:12px;" id="deal-min-${t}" placeholder="분">
              <button class="btn-deal-start" data-idx="${t}" style="padding:6px 12px; background:#e11d48; color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap;">시작</button>
              <button class="btn-deal-cancel" data-idx="${t}" style="padding:6px 12px; background:#f1f5f9; color:#374151; border:1.5px solid #e2e8f0; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; white-space:nowrap;">종료</button>
              ${e.dealEndTime&&e.dealEndTime>Date.now()?`<span style="font-size:11px; font-weight:700; color:#e11d48;">진행중</span>`:``}
            </div>
            <div style="display:flex; gap:8px; align-items:center; background:#f0fdf4; padding:10px 14px; border-radius:8px; border:1px solid #bbf7d0;">
              <span style="font-size:12px; font-weight:700; color:#16a34a;">좋아요 달성</span>
              <input type="number" class="modern-input" style="width:90px; padding:6px 10px; font-size:12px;" data-idx="${t}" data-field="targetLikes" placeholder="목표 좋아요" value="${e.targetLikes||``}">
              <span style="font-size:12px; color:#16a34a; font-weight:600;">개 달성 시</span>
              <input type="number" class="modern-input" style="width:60px; padding:6px 10px; font-size:12px;" data-idx="${t}" data-field="targetDealMin" placeholder="시간(분)" value="${e.targetDealMin||``}">
              <span style="font-size:12px; color:#16a34a; font-weight:600;">분 자동 오픈</span>
            </div>
            <div style="display:flex; gap:8px; align-items:center; background:#fef2f2; padding:10px 14px; border-radius:8px; border:1px solid #fecdd3;">
              <span style="font-size:12px; font-weight:800; color:#dc2626;">화면 중앙 무료나눔 드롭</span>
              <span style="font-size:12px; color:#475569; font-weight:600;">한정 수량:</span>
              <input type="number" class="modern-input" style="width:65px; padding:6px 8px; font-size:12px;" data-idx="${t}" data-field="giveawayStock" placeholder="수량" value="${e.giveawayStock||3}">
              <span style="font-size:12px; color:#475569;">개</span>
              <button class="btn-giveaway-start" data-idx="${t}" style="padding:6px 12px; background:#dc2626; color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap;">화면 송출 시작</button>
              <button class="btn-giveaway-stop" data-idx="${t}" style="padding:6px 12px; background:#f1f5f9; color:#374151; border:1.5px solid #e2e8f0; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; white-space:nowrap;">종료</button>
              ${e.isGiveawayActive?`<span style="font-size:11.5px; font-weight:800; color:#dc2626; background:#fee2e2; padding:3px 8px; border-radius:6px;">화면 송출중 (잔여: ${Math.max(0,(parseInt(e.giveawayStock)||0)-(parseInt(e.giveawayClaimed)||0))}개)</span>`:``}
            </div>
          </div>
        </details>
        `}
      </div>
    </div>
    `}).join(``),he=()=>{A.innerHTML=`
      <div class="section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; margin-bottom:20px;">
          <h3 style="margin:0; border:none; padding:0;">상품 관리</h3>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:12px; color:#10b981; font-weight:700; background:#ecfdf5; padding:6px 12px; border-radius:8px; border:1px solid #a7f3d0; display:flex; align-items:center; gap:5px;">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10b981;"></span>
              실시간 자동 반영
            </span>
            <button id="btn-add-product" class="action-btn btn-primary-solid" style="padding:8px 16px; font-size:13px;">+ 상품 추가</button>
            <button id="btn-save-products-manual" class="action-btn" style="padding:8px 20px; font-size:13px; font-weight:700; background:#0f172a; color:#ffffff; border:none; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(15,23,42,0.15); transition:all 0.15s;" onmouseover="this.style.background='#1e293b'" onmouseout="this.style.background='#0f172a'">
              저장
            </button>
          </div>
        </div>
        <div id="product-list-container">${V()}</div>
        <div style="display:flex; justify-content:flex-end; align-items:center; gap:10px; margin-top:16px; padding-top:16px; border-top:1px solid #f1f5f9;">
          <button id="btn-add-product-bottom" class="action-btn btn-secondary" style="padding:8px 16px; font-size:13px;">+ 상품 추가</button>
          <button id="btn-save-products-bottom" class="action-btn" style="padding:8px 20px; font-size:13px; font-weight:700; background:#0f172a; color:#ffffff; border:none; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(15,23,42,0.15);">
            저장
          </button>
        </div>
      </div>
    `,X&&X.from(`live_control`).select(`products`).eq(`live_id`,t).maybeSingle().then(({data:t,error:n})=>{if(n)throw n;if(t&&t.products)try{let n=typeof t.products==`string`?JSON.parse(t.products):t.products;if(Array.isArray(n)||(n=[]),Array.isArray(n)){!d||d.length===0?(d.length=0,d.push(...n)):d.forEach(e=>{let t=n.find(t=>t.id===e.id||t.name===e.name);t&&(t.price!==void 0&&(e.price=t.price),t.normalPrice!==void 0&&(e.normalPrice=t.normalPrice),t.discountRate!==void 0&&(e.discountRate=t.discountRate),e.clicks=parseInt(t.clicks)||0,!e.image&&t.image&&(e.image=t.image))}),b();let t=document.getElementById(`product-list-container`);t&&(t.innerHTML=V(),e())}}catch{}}).catch(e=>console.warn(`Failed to load product clicks from Supabase`,e));let e=()=>{let n=document.getElementById(`product-list-container`);if(!n)return;let r=null,i=()=>{r&&clearTimeout(r),r=setTimeout(()=>{b(!0)},250)};n.querySelectorAll(`input[data-field]`).forEach(t=>{let r=r=>{let a=parseInt(t.dataset.idx,10),o=t.dataset.field;if(d[a]){if(t.type===`checkbox`){if(o===`isFeatured`){let r=t.checked;d.forEach((e,t)=>{e.isFeatured=t===a&&r}),b(!0),n.innerHTML=V(),e();return}if(d[a][o]=t.checked,o===`isFreeGiveaway`){t.checked?(d[a].price=`0`,d[a].hideByDefault=!0,d[a].isGiveawayActive=!0,d[a].giveawayStock||(d[a].giveawayStock=3),d[a].giveawayClaimed===void 0&&(d[a].giveawayClaimed=0)):d[a].isGiveawayActive=!1,b(!0),n.innerHTML=V(),e();return}if(o===`isLeadForm`){t.checked?d[a].url=`__LEAD_FORM__`:d[a].url===`__LEAD_FORM__`&&(d[a].url=``),b(!0),n.innerHTML=V(),e();return}b(!0);return}if(o===`price`||o===`normalPrice`){let e=t.value.replace(/[^0-9]/g,``);d[a][o]=e,t.value=e?Number(e).toLocaleString():``;let r=Number(d[a].normalPrice||0),i=Number(d[a].price||0);r>0&&r>=i&&i>0?d[a].discountRate=Math.floor((r-i)/r*100):d[a].discountRate=0;let s=n.querySelector(`input[data-idx="${a}"][data-field="discountRate"]`);s&&(s.value=d[a].discountRate)}else o===`name`?d[a].name=t.value:o===`url`?d[a].url=t.value.trim():o===`giveawayStock`&&(d[a].giveawayStock=parseInt(t.value,10)||3);i()}};t.addEventListener(`input`,r),t.addEventListener(`change`,r),t.addEventListener(`blur`,()=>b(!0))}),n.querySelectorAll(`.prod-img-upload`).forEach(r=>{r.addEventListener(`change`,async r=>{let i=r.target.files[0];if(!i)return;let a=parseInt(r.target.dataset.idx),o=document.getElementById(`img-prev-${a}`);o&&(o.style.opacity=`0.5`);try{let r=await c(i,250,250,.8),s=r.startsWith(`data:`)?r:`data:image/jpeg;base64,${r}`;d[a].image=s,o&&(o.src=s),b(!0),Z(t,l,u,d,!0),n.innerHTML=V(),e()}catch(e){console.error(`상품 이미지 등록 에러:`,e),alert(`상품 이미지 등록 에러: `+e.message)}finally{o&&(o.style.opacity=`1`)}})}),n.querySelectorAll(`.btn-deal-start`).forEach(r=>{r.addEventListener(`click`,r=>{let i=parseInt(r.target.dataset.idx),a=parseInt(document.getElementById(`deal-min-${i}`).value);a>0&&(d[i].dealText=document.getElementById(`deal-text-${i}`).value||`깜짝딜 종료까지`,d[i].dealEndTime=Date.now()+a*60*1e3,b(),n.innerHTML=V(),e(),Z(t,l,u,d,!0),setTimeout(()=>alert(`${a}분 깜짝딜이 시작되었습니다!`),10))})}),n.querySelectorAll(`.btn-deal-cancel`).forEach(r=>{r.addEventListener(`click`,r=>{let i=parseInt(r.target.dataset.idx);d[i].dealEndTime=0,b(),n.innerHTML=V(),e(),Z(t,l,u,d,!0)})}),n.querySelectorAll(`.btn-giveaway-start`).forEach(r=>{r.addEventListener(`click`,r=>{let i=parseInt(r.target.dataset.idx),a=d[i];if(!a)return;let o=parseInt(a.giveawayStock)||3;a.isFreeGiveaway=!0,a.price=`0`,a.hideByDefault=!0,a.giveawayStock=o,a.giveawayClaimed=0,a.isGiveawayActive=!0,a.giveawayStartedAt=Date.now(),b(!0),n.innerHTML=V(),e(),Z(t,l,u,d,!0),alert(`선착순 ${o}개 무료나눔이 라이브 화면에 시작되었습니다!`)})}),n.querySelectorAll(`.btn-giveaway-stop`).forEach(r=>{r.addEventListener(`click`,r=>{let i=parseInt(r.target.dataset.idx),a=d[i];a&&(a.isGiveawayActive=!1,a.giveawayStartedAt=0,b(!0),n.innerHTML=V(),e(),Z(t,l,u,d,!0),alert(`무료나눔 화면 송출이 종료되었습니다.`))})}),n.querySelectorAll(`.btn-del-product`).forEach(t=>{t.addEventListener(`click`,t=>{let r=parseInt(t.currentTarget.dataset.idx),i=d[r]?.name||`이 상품`;confirm(`정말 "${i}" 상품을 삭제하시겠습니까?`)&&(d.splice(r,1),b(!0),n.innerHTML=V(),e())})}),n.querySelectorAll(`.btn-move-up`).forEach(t=>{t.addEventListener(`click`,t=>{let r=parseInt(t.currentTarget.dataset.idx);if(r>0){let t=d[r-1];d[r-1]=d[r],d[r]=t,b(!0),n.innerHTML=V(),e()}})}),n.querySelectorAll(`.btn-move-down`).forEach(t=>{t.addEventListener(`click`,t=>{let r=parseInt(t.currentTarget.dataset.idx);if(r<d.length-1){let t=d[r+1];d[r+1]=d[r],d[r]=t,b(!0),n.innerHTML=V(),e()}})})};e();let n=()=>{d.push({id:Date.now(),name:`새 상품`,price:``,normalPrice:``,discountRate:0,image:`https://via.placeholder.com/72`,url:`#`}),b(!0),document.getElementById(`product-list-container`).innerHTML=V(),e()};document.getElementById(`btn-add-product`)?.addEventListener(`click`,n),document.getElementById(`btn-add-product-bottom`)?.addEventListener(`click`,n);let r=async e=>{if(!e)return;e.disabled=!0;let n=e.textContent;e.textContent=`저장 중...`,typeof i==`function`?i():b(!0);try{typeof Z==`function`&&await Z(t,l,u,d,!0)}catch{}setTimeout(()=>{e.disabled=!1,e.textContent=`저장 완료`,setTimeout(()=>{e.textContent=n},1500)},250)};document.getElementById(`btn-save-products-manual`)?.addEventListener(`click`,e=>r(e.currentTarget)),document.getElementById(`btn-save-products-bottom`)?.addEventListener(`click`,e=>r(e.currentTarget));let i=()=>{let e=document.getElementById(`product-list-container`);e&&e.querySelectorAll(`.product-row`).forEach((e,t)=>{if(!d[t])return;let n=e.querySelector(`input[data-field="name"]`),r=e.querySelector(`input[data-field="price"]`),i=e.querySelector(`input[data-field="normalPrice"]`),a=e.querySelector(`input[data-field="url"]`),o=e.querySelector(`input[data-field="isLeadForm"]`),s=e.querySelector(`input[data-field="isFeatured"]`),c=e.querySelector(`input[data-field="hideByDefault"]`);s&&(d[t].isFeatured=s.checked);let l=e.querySelector(`input[data-field="isFreeGiveaway"]`),u=e.querySelector(`input[data-field="giveawayStock"]`);if(n&&(d[t].name=n.value.trim()),i&&(d[t].normalPrice=i.value.replace(/[^0-9]/g,``)),r&&(d[t].price=r.value.replace(/[^0-9]/g,``)),a&&(d[t].url=a.value.trim()),o&&(d[t].isLeadForm=o.checked),c&&(d[t].hideByDefault=c.checked),l&&l.checked){d[t].isFreeGiveaway=!0,d[t].price=`0`,d[t].hideByDefault=!0,d[t].isGiveawayActive===void 0&&(d[t].isGiveawayActive=!0);let e=u?parseInt(u.value):parseInt(d[t].giveawayStock)||3;d[t].giveawayStock=e>0?e:3,d[t].giveawayClaimed===void 0&&(d[t].giveawayClaimed=0)}else l&&!l.checked&&(d[t].isFreeGiveaway=!1,d[t].isGiveawayActive=!1)}),b(!0)};window.__autoSaveAllProducts=i},ge=()=>{A.innerHTML=`
      <div class="section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; margin-bottom:20px;">
          <h2 style="font-size:16px; font-weight:800; color:#0f172a; margin:0; display:flex; align-items:center; gap:6px;">
            상담 DB (리드)
          </h2>
          <div style="display:flex; gap:8px;">
            <button id="btn-download-csv-leads" class="action-btn btn-primary-solid" style="padding:8px 16px; font-size:13px; display:none;">CSV 다운로드</button>
            <button id="btn-refresh-leads" class="action-btn btn-neutral" style="padding:8px 16px; font-size:13px;">새로고침</button>
          </div>
        </div>
        <div id="leads-list-container">
          <div style="text-align:center; padding:20px; color:#64748b; font-size:13px;">불러오는 중...</div>
        </div>
      </div>
    `;let e=[],n=async()=>{try{if(!X)throw Error(`Supabase 미연동`);let{data:n,error:r}=await X.from(`live_leads`).select(`*`).eq(`live_id`,t).order(`created_at`,{ascending:!1});if(r)throw r;e=(n||[]).filter(e=>!e.name||!e.name.startsWith(`[도입문의]`)&&e.name!==`__WEB_PUSH__`);let i=document.getElementById(`leads-list-container`),a=document.getElementById(`btn-download-csv-leads`);if(a&&(a.style.display=e.length>0?`block`:`none`),!i)return;if(e.length===0){i.innerHTML=`<div style="text-align:center; padding:40px; color:#94a3b8; font-size:14px; background:#f8fafc; border-radius:12px;">아직 접수된 상담문의가 없습니다.</div>`;return}let o=`
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:13px;">
            <thead style="background:#f1f5f9; color:#475569;">
              <tr>
                <th style="padding:10px; font-weight:700;">접수일시</th>
                <th style="padding:10px; font-weight:700;">이름</th>
                <th style="padding:10px; font-weight:700;">전화번호</th>
              </tr>
            </thead>
            <tbody>
        `;e.forEach(e=>{let t=new Date(e.created_at).toLocaleString(`ko-KR`);o+=`
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:10px; color:#64748b;">${t}</td>
              <td style="padding:10px; font-weight:700; color:#0f172a;">${e.name}</td>
              <td style="padding:10px; font-family:monospace; color:#3b82f6;">${e.phone}</td>
            </tr>
          `}),o+=`</tbody></table>`,i.innerHTML=o}catch(e){console.warn(`Failed to load leads`,e);let t=document.getElementById(`leads-list-container`);t&&(t.innerHTML=`<div style="text-align:center; padding:20px; color:#ef4444; font-size:13px;">데이터를 불러오는 데 실패했습니다. (테이블 생성 여부를 확인하세요)</div>`)}};n(),document.getElementById(`btn-refresh-leads`).addEventListener(`click`,n),document.getElementById(`btn-download-csv-leads`).addEventListener(`click`,()=>{if(e.length===0)return;let n=`접수일시,이름,전화번호
`;e.forEach(e=>{let t=new Date(e.created_at).toLocaleString(`ko-KR`).replace(/,/g,``),r=(e.name||``).replace(/,/g,` `),i=(e.phone||``).replace(/,/g,` `);n+=`${t},${r},${i}\n`});let r=new Blob([`﻿`+n],{type:`text/csv;charset=utf-8;`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`상담DB_${t}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)})},_e=(e=`orders`)=>{let n=[],r=`qty`,i=`all`,a=``,o=`all`,s=`all`,c=null;A.innerHTML=`
      <!-- 서브 탭 네비게이션 (채팅관리 탭 표준 디자인) -->
      <div style="display:flex; gap:8px; margin-bottom:16px; background:#f1f5f9; padding:4px; border-radius:10px;">
        <button class="order-sub-tab-btn active" data-subtab="orders" style="flex:1; padding:8px 0; font-size:13px; font-weight:700; border:none; background:#fff; color:#0f172a; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">주문 관리</button>
        <button class="order-sub-tab-btn" data-subtab="ranking" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">판매 순위 랭킹</button>
        <button class="order-sub-tab-btn" data-subtab="timeline" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">1분 단위 시청자 통계</button>
      </div>

      <!-- 1. 주문 관리 뷰 -->
      <div id="order-sub-orders" class="order-sub-view">
        <div class="section-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <h3 style="margin:0; border:none; padding:0;">실시간 주문 내역</h3>
              <span id="orders-status-badge" style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:12px; background:#f1f5f9; color:#64748b;">집계 중</span>
            </div>
            <div style="display:flex; gap:8px;">
              <button id="btn-download-orders-csv" class="action-btn btn-primary-solid" style="padding:6px 14px; font-size:12px; display:flex; align-items:center; gap:5px;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>주문내역 CSV</span>
              </button>
              <button id="btn-refresh-orders" class="action-btn btn-neutral" style="padding:6px 12px; font-size:12px;">새로고침</button>
            </div>
          </div>

          <!-- 4대 메트릭 요약 카드 -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:20px;">
            <div style="background:#f8fafc; padding:14px 18px; border-radius:10px; border:1px solid #e2e8f0;">
              <div style="font-size:11.5px; font-weight:700; color:#64748b; margin-bottom:4px;">총 결제 금액 (실매출)</div>
              <div id="kpi-total-sales" style="font-size:22px; font-weight:800; color:#0f172a;">0원</div>
              <div id="kpi-orders-count" style="font-size:11.5px; color:#64748b; margin-top:3px;">결제완료 0건</div>
            </div>
            <div style="background:#f8fafc; padding:14px 18px; border-radius:10px; border:1px solid #e2e8f0;">
              <div style="font-size:11.5px; font-weight:700; color:#64748b; margin-bottom:4px;">총 판매 수량</div>
              <div id="kpi-total-qty" style="font-size:22px; font-weight:800; color:#0f172a;">0개</div>
              <div id="kpi-product-types" style="font-size:11.5px; color:#64748b; margin-top:3px;">0종 품목</div>
            </div>
            <div style="background:#f8fafc; padding:14px 18px; border-radius:10px; border:1px solid #e2e8f0;">
              <div style="font-size:11.5px; font-weight:700; color:#64748b; margin-bottom:4px;">최고 시청자 (Peak)</div>
              <div id="kpi-peak-viewers" style="font-size:22px; font-weight:800; color:#ef4444;">0명</div>
              <div id="kpi-peak-time" style="font-size:11.5px; color:#64748b; margin-top:3px;">기록 없음</div>
            </div>
            <div style="background:#f8fafc; padding:14px 18px; border-radius:10px; border:1px solid #e2e8f0;">
              <div style="font-size:11.5px; font-weight:700; color:#64748b; margin-bottom:4px;">평균 시청자</div>
              <div id="kpi-avg-viewers" style="font-size:22px; font-weight:800; color:#2563eb;">0명</div>
              <div id="kpi-cum-viewers" style="font-size:11.5px; color:#64748b; margin-top:3px;">누적 0명</div>
            </div>
          </div>

          <!-- 결제수단 필터 세그먼트 (전체 주문 vs 계좌이체 주문) 및 상태 분리 -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; background:#f1f5f9; padding:3px; border-radius:8px; gap:4px;">
              <button id="order-paytype-all" type="button" class="btn-paytype-filter active" data-paytype="all" style="padding:6px 14px; font-size:12.5px; font-weight:700; border:none; background:#fff; color:#0f172a; border-radius:6px; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.06);">
                전체 주문
              </button>
              <button id="order-paytype-transfer" type="button" class="btn-paytype-filter" data-paytype="bank_transfer" style="padding:6px 14px; font-size:12.5px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:6px; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
                <span>계좌이체(무통장)</span>
                <span id="transfer-pending-count-badge" style="display:none; font-size:11px; font-weight:700; background:#f59e0b; color:#fff; padding:1px 6px; border-radius:10px;">0</span>
              </button>
            </div>

            <!-- 계좌이체 전용 서브 상태 필터 -->
            <div id="transfer-status-filter-group" style="display:none; background:#f8fafc; border:1px solid #e2e8f0; padding:3px; border-radius:8px; gap:3px;">
              <button class="btn-transfer-status-filter active" data-tstatus="all" style="padding:5px 11px; font-size:12px; font-weight:700; border:none; background:#fff; color:#0f172a; border-radius:5px; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.06);">
                전체
              </button>
              <button class="btn-transfer-status-filter" data-tstatus="requested" style="padding:5px 11px; font-size:12px; font-weight:600; border:none; background:transparent; color:#b45309; border-radius:5px; cursor:pointer;">
                입금요청(대기)
              </button>
              <button class="btn-transfer-status-filter" data-tstatus="paid" style="padding:5px 11px; font-size:12px; font-weight:600; border:none; background:transparent; color:#059669; border-radius:5px; cursor:pointer;">
                입금완료
              </button>
            </div>
          </div>

          <!-- 검색 & 제품 필터 바 (미니멀 툴바 스타일) -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:#ffffff; padding:12px 14px; border-radius:10px; border:1px solid #e2e8f0; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; gap:10px; align-items:center;">
              <select id="subtab-product-filter" style="height:35px; padding:0 12px; font-size:12.5px; font-weight:500; background:#ffffff; border:1px solid #cbd5e1; border-radius:7px; color:#0f172a; outline:none; cursor:pointer;">
                <option value="all">전체 제품 보기</option>
              </select>
              <span id="orders-count-badge" style="font-size:12px; color:#64748b; font-weight:500;">총 0건</span>
            </div>
            <div style="display:flex; gap:8px;">
              <div style="position:relative; display:flex; align-items:center;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:absolute; left:11px; pointer-events:none;">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" id="subtab-order-search" placeholder="주문자, 주문번호, 상품명 검색" style="height:35px; width:230px; padding:0 12px 0 32px; border:1px solid #cbd5e1; border-radius:7px; font-size:12px; outline:none; background:#ffffff; color:#0f172a;">
              </div>
            </div>
          </div>

          <!-- 주문 테이블 컨테이너 -->
          <div id="orders-table-container" style="border:1.5px solid #e2e8f0; border-radius:12px; overflow:hidden; background:#fff;">
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:50px 20px;">
              <div style="width:30px; height:30px; border:3px solid #e2e8f0; border-top-color:#2563eb; border-radius:50%; animation:ordersSpin 0.75s linear infinite; margin-bottom:12px;"></div>
              <div style="font-size:13px; font-weight:600; color:#475569;">주문 내역을 불러오는 중입니다...</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 판매 순위 랭킹 뷰 -->
      <div id="order-sub-ranking" class="order-sub-view" style="display:none;">
        <div class="section-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="margin:0 0 4px 0; border:none; padding:0;">상품 판매 순위 랭킹</h3>
              <p style="margin:0; font-size:12px; color:#64748b;">실제 결제 완료된 데이터를 바탕으로 어떤 상품이 가장 많이 팔렸는지 순위별로 집계합니다.</p>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
              <div style="display:flex; background:#f1f5f9; padding:2px; border-radius:8px; gap:2px;">
                <button id="rank-sort-qty" type="button" style="padding:6px 14px; font-size:12px; font-weight:700; border:none; background:#fff; color:#0f172a; border-radius:6px; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.06);">판매 수량순</button>
                <button id="rank-sort-amount" type="button" style="padding:6px 14px; font-size:12px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:6px; cursor:pointer;">결제 금액순</button>
              </div>
              <button id="btn-download-ranking-csv" class="action-btn btn-primary-solid" style="padding:6px 14px; font-size:12px;">순위 CSV</button>
            </div>
          </div>

          <!-- 판매 랭킹 테이블 컨테이너 -->
          <div id="ranking-table-container" style="border:1.5px solid #e2e8f0; border-radius:12px; overflow:hidden; background:#fff;">
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:50px 20px;">
              <div style="width:30px; height:30px; border:3px solid #e2e8f0; border-top-color:#0f172a; border-radius:50%; animation:ordersSpin 0.75s linear infinite; margin-bottom:12px;"></div>
              <div style="font-size:13px; font-weight:600; color:#64748b;">판매 순위를 분석 중입니다...</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 1분 단위 시청자 통계 뷰 -->
      <div id="order-sub-timeline" class="order-sub-view" style="display:none;">
        <div class="section-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="margin:0 0 4px 0; border:none; padding:0;">방송 시작 후 1분 단위 시청자 수 추이</h3>
              <p style="margin:0; font-size:12px; color:#64748b;">방송 시작 후 1분마다 실시간 시청자 수를 정밀하게 체크하여 기록한 통계입니다.</p>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
              <span id="timeline-duration-badge" style="font-size:12px; font-weight:700; color:#475569; background:#f1f5f9; padding:5px 12px; border-radius:6px; font-family:monospace;">측정 기록: 0분</span>
              <button id="btn-download-timeline-csv" class="action-btn btn-primary-solid" style="padding:6px 14px; font-size:12px;">시청자 기록 CSV</button>
            </div>
          </div>

          <!-- 인터랙티브 SVG 시청자 그래프 -->
          <div style="background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:20px 16px 14px 16px; margin-bottom:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <span style="font-size:12px; font-weight:700; color:#475569;">1분 단위 시계열 그래프</span>
              <span id="timeline-chart-info" style="font-size:11.5px; color:#94a3b8;">총 0분 측정</span>
            </div>
            <div id="timeline-chart-content" style="width:100%; height:150px;">
              <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:13px;">그래프 데이터를 불러오는 중...</div>
            </div>
          </div>

          <!-- 1분 단위 상세 시청자 로그 테이블 -->
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <span style="font-size:13px; font-weight:700; color:#334155;">1분 단위 상세 시청자 로그</span>
              <span id="timeline-log-count-badge" style="font-size:11.5px; font-weight:600; color:#64748b;">총 0개 기록</span>
            </div>
            <div id="timeline-table-container" style="border:1.5px solid #e2e8f0; border-radius:12px; overflow:hidden; max-height:280px; overflow-y:auto; background:#fff;">
              <div style="text-align:center; padding:30px; color:#94a3b8; font-size:13px;">시청자 로그 기록을 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
      <style>
        @keyframes ordersSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes orderModalIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
      </style>
    `;let d=e=>{let t=[];if(Array.isArray(e.items)&&e.items.length>0)t=e.items;else if(typeof e.items==`string`)try{let n=JSON.parse(e.items);Array.isArray(n)&&(t=n)}catch{t=[{name:e.items,price:e.total_amount||0,quantity:1}]}return t.length===0&&(t=[{name:e.goodname||e.item_name||`라이브 상품`,price:e.total_amount||0,quantity:1}]),t},f=[`cancelled`,`canceled`,`payapp_cancelled`,`refunded`,`cancel`],p=async()=>{let e=document.getElementById(`orders-status-badge`);e&&(l.isLive?(e.textContent=`실시간 방송 중`,e.style.background=`#fef2f2`,e.style.color=`#ef4444`):(e.textContent=`방송 대기 / 종료`,e.style.background=`#f1f5f9`,e.style.color=`#64748b`));try{let e=[];if(X){try{let{data:n,error:r}=await X.from(`live_orders`).select(`*`).eq(`live_id`,t).order(`created_at`,{ascending:!1});Array.isArray(n)&&!r&&n.forEach(t=>{e.push({id:t.id,live_id:t.live_id,customer_name:t.customer_name||t.buyer_name||t.name||``,customer_phone:t.customer_phone||t.buyer_phone||t.phone||``,customer_address:t.customer_address||t.shipping_address||t.address||``,total_amount:Number(t.total_amount)||0,items:t.items,payment_status:(t.payment_status||`payapp_requested`).toLowerCase(),pg_provider:t.pg_provider||`payapp`,pg_receipt_id:t.pg_receipt_id||t.receipt_id||``,created_at:t.created_at})})}catch{}try{let{data:n,error:r}=await X.from(`live_winners`).select(`*`).eq(`live_id`,t).order(`created_at`,{ascending:!1});Array.isArray(n)&&!r&&n.forEach(t=>{if(t.nickname&&(t.nickname.startsWith(`{"type":"order"`)||t.nickname.startsWith(`{"type": "order"`)))try{let n=JSON.parse(t.nickname);e.push({id:t.id,live_id:t.live_id,customer_name:t.name||``,customer_phone:t.phone||``,customer_address:t.address||``,total_amount:Number(n.total)||0,items:n.items||[{name:n.goodname||`상품`,price:Number(n.total)||0}],payment_status:(n.status||`payapp_requested`).toLowerCase(),pg_provider:n.pg_provider||`payapp`,pg_receipt_id:String(n.mul_no||``),created_at:t.created_at})}catch{}})}catch{}}try{let n=JSON.parse(localStorage.getItem(`ryzin_live_orders_${t}`)||`[]`);Array.isArray(n)&&n.forEach(n=>{e.push({id:n.id,live_id:n.live_id||t,customer_name:n.customer_name||n.buyer_name||n.name||``,customer_phone:n.customer_phone||n.buyer_phone||n.phone||``,customer_address:n.customer_address||n.shipping_address||n.address||``,total_amount:Number(n.total_amount)||0,items:n.items,payment_status:(n.payment_status||`payapp_requested`).toLowerCase(),pg_provider:n.pg_provider||`payapp`,pg_receipt_id:n.pg_receipt_id||n.receipt_id||``,created_at:n.created_at})})}catch{}let r=new Map;e.forEach(e=>{let t=(e.pg_receipt_id&&e.pg_receipt_id!==`undefined`&&e.pg_receipt_id!==`-`?e.pg_receipt_id:null)||e.id||`${e.created_at}_${e.customer_phone}`,n=r.get(t);n?e.payment_status===`paid`&&n.payment_status!==`paid`&&r.set(t,e):r.set(t,e)}),n=Array.from(r.values()).sort((e,t)=>new Date(t.created_at||0)-new Date(e.created_at||0));let i=n.map(e=>e.pg_receipt_id).filter(e=>e&&e!==`undefined`&&e!==`-`);if(i.length>0)try{let e=await fetch(`/api/payapp`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({cmd:`check_orders`,mul_nos:i})});if(e.ok){let r=await e.json();if(r.success&&r.results){let e=!1;if(n.forEach(t=>{let n=r.results[t.pg_receipt_id];n&&n.status&&n.status!==`unknown`&&t.payment_status!==n.status&&(t.payment_status=n.status,e=!0)}),e)try{localStorage.setItem(`ryzin_live_orders_${t}`,JSON.stringify(n))}catch{}}}}catch(e){console.warn(`PayApp status check failed:`,e)}}catch(e){console.warn(`Order loading error:`,e),n=[]}m(),h(),v(),y()},m=()=>{let e=n.filter(e=>(e.payment_status||``).toLowerCase()===`paid`),r=n.filter(e=>(e.payment_status||``).toLowerCase()===`payapp_requested`),i=n.filter(e=>f.includes((e.payment_status||``).toLowerCase())),a=0,o=0,s=new Set;e.forEach(e=>{let t=d(e);t.forEach(n=>{let r=parseInt(n.quantity||n.qty||1)||1,i=parseInt(n.price||0)||Math.round((parseInt(e.total_amount)||0)/Math.max(1,t.length));a+=i*r,o+=r;let c=(n.name||n.goodname||``).trim();c&&s.add(c)})});let c=en(t),l=0,p=`기록 없음`,m=0;c.forEach(e=>{let t=parseInt(e.viewers)||0;m+=t,t>=l&&(l=t,p=`방송 ${e.minute}분 후`)});let h=c.length>0?Math.round(m/c.length):(u.viewers||0)+(u.cumViewers||0),g=document.getElementById(`kpi-total-sales`),_=document.getElementById(`kpi-orders-count`),v=document.getElementById(`kpi-total-qty`),y=document.getElementById(`kpi-product-types`),b=document.getElementById(`kpi-peak-viewers`),x=document.getElementById(`kpi-peak-time`),S=document.getElementById(`kpi-avg-viewers`),C=document.getElementById(`kpi-cum-viewers`);g&&(g.textContent=`${a.toLocaleString()}원`),_&&(e.length===0&&r.length>0?_.innerHTML=`결제 0건 <span style="font-size:11px; color:#f59e0b; font-weight:600;">(대기 ${r.length}건)</span>`:_.textContent=`결제완료 ${e.length}건${i.length>0?` (취소 ${i.length})`:``}`),v&&(v.textContent=`${o.toLocaleString()}개`),y&&(y.textContent=`${s.size}종 품목`),b&&(b.textContent=`${l.toLocaleString()}명`),x&&(x.textContent=p),S&&(S.textContent=`${h.toLocaleString()}명`),C&&(C.textContent=`누적 ${(u.cumViewers||0).toLocaleString()}명`)},h=()=>{let e=document.getElementById(`orders-table-container`);if(!e)return;let t=new Set;n.forEach(e=>{d(e).forEach(e=>{let n=(e.name||e.goodname||``).trim();n&&t.add(n)})});let r=n;if(i!==`all`&&(r=r.filter(e=>d(e).some(e=>(e.name||e.goodname||``).trim()===i))),a.trim()){let e=a.trim().toLowerCase();r=r.filter(t=>{let n=(t.customer_name||t.buyer_name||``).toLowerCase(),r=(t.customer_phone||t.buyer_phone||``).toLowerCase(),i=JSON.stringify(t.items||``).toLowerCase();return n.includes(e)||r.includes(e)||i.includes(e)})}let c=document.getElementById(`orders-count-badge`);c&&(c.textContent=`총 ${r.length}건`);let l=document.getElementById(`subtab-product-filter`);if(l&&l.options.length<=1){let e=`<option value="all">전체 제품 보기</option>`;t.forEach(t=>{e+=`<option value="${t}" ${i===t?`selected`:``}>${t}</option>`}),l.innerHTML=e}if(r.length===0){e.innerHTML=`
          <div style="text-align:center; padding:50px 20px; color:#94a3b8; font-size:13.5px;">
            조회된 주문 내역이 없습니다.
          </div>
        `;return}o===`bank_transfer`&&(r=r.filter(e=>(e.pg_provider||``).toLowerCase()===`bank_transfer`||(e.payment_status||``).startsWith(`transfer_`)||(e.payment_type||``).includes(`계좌`)),s===`requested`?r=r.filter(e=>(e.payment_status||``).toLowerCase()!==`paid`):s===`paid`&&(r=r.filter(e=>(e.payment_status||``).toLowerCase()===`paid`)));let u=n.filter(e=>{let t=(e.pg_provider||``).toLowerCase()===`bank_transfer`||(e.payment_status||``).startsWith(`transfer_`)||(e.payment_type||``).includes(`계좌`),n=(e.payment_status||``).toLowerCase()===`paid`;return t&&!n}).length,p=document.getElementById(`transfer-pending-count-badge`);p&&(u>0?(p.textContent=`${u}건 대기`,p.style.display=`inline-block`):p.style.display=`none`);let m=``;r.forEach((e,t)=>{let n=(e.payment_status||`payapp_requested`).toLowerCase(),r=n===`paid`,i=f.includes(n),a=(e.pg_provider||``).toLowerCase()===`bank_transfer`||(e.payment_status||``).startsWith(`transfer_`)||(e.payment_type||``).includes(`계좌`),o=``;o=r?a?`<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#ecfdf5; color:#059669; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#10b981; flex-shrink:0;"></span>입금완료</span>`:`<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#ecfdf5; color:#059669; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#10b981; flex-shrink:0;"></span>결제완료</span>`:i?`<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#fef2f2; color:#dc2626; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#ef4444; flex-shrink:0;"></span>결제취소</span>`:a?`<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#fffbeb; color:#b45309; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#f59e0b; flex-shrink:0;"></span>입금요청</span>`:`<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#fffbeb; color:#b45309; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#f59e0b; flex-shrink:0;"></span>결제대기</span>`;let s=a?`<span style="display:inline-flex; align-items:center; padding:3px 7px; border-radius:5px; font-size:11px; font-weight:600; background:#f1f5f9; color:#475569; border:1px solid #e2e8f0; white-space:nowrap;">계좌이체</span>`:`<span style="display:inline-flex; align-items:center; padding:3px 7px; border-radius:5px; font-size:11px; font-weight:600; background:#eff6ff; color:#2563eb; border:1px solid #dbeafe; white-space:nowrap;">카드결제</span>`,c=`<span style="color:#cbd5e1; font-size:12px;">-</span>`;a&&(!r&&!i?c=`
              <button type="button" class="btn-confirm-transfer-action" data-order-idx="${t}"
                style="background:#0f172a; color:#ffffff; border:none; border-radius:6px; padding:4px 10px; font-size:11.5px; font-weight:700; cursor:pointer; white-space:nowrap; transition:all 0.12s; box-shadow:0 1px 2px rgba(0,0,0,0.1);"
                onmouseover="this.style.background='#16a34a'" onmouseout="this.style.background='#0f172a'"
                title="실제 통장 입금을 확인한 후 클릭하면 '입금완료'로 승인됩니다.">
                입금 확인 완료
              </button>
            `:r&&(c=`<span style="font-size:11.5px; font-weight:700; color:#10b981; display:inline-flex; align-items:center; gap:3px;">승인완료</span>`));let l=`-`,u=``;if(e.created_at){let t=new Date(e.created_at);if(isNaN(t.getTime())){let n=Number(e.created_at);isNaN(n)||(t=new Date(n))}if(isNaN(t.getTime()))l=String(e.created_at);else{let e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,`0`),r=String(t.getDate()).padStart(2,`0`),i=String(t.getHours()).padStart(2,`0`),a=String(t.getMinutes()).padStart(2,`0`);l=`${e}.${n}.${r}`,u=`${i}:${a}`}}let p=d(e).map(e=>{let t=e.quantity||1;return`${e.name||e.goodname||`상품`}${t>1?` (${t}개)`:``}`}).join(`, `),h=e.customer_name||e.buyer_name||`(미입력)`;m+=`
          <tr style="border-bottom:1px solid #f1f5f9; font-size:13px; transition:background 0.1s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
            <!-- 1. 상태 -->
            <td style="padding:13px 8px; text-align:center; white-space:nowrap;">${o}</td>
            <!-- 2. 결제수단 -->
            <td style="padding:13px 8px; text-align:center; white-space:nowrap;">${s}</td>
            <!-- 3. 주문번호 -->
            <td style="padding:13px 12px; color:#64748b; font-size:12px; font-variant-numeric:tabular-nums;">${e.pg_receipt_id||e.receipt_id||e.order_number||`-`}</td>
            <!-- 4. 주문일시 (자연스러운 날짜와 시간) -->
            <td style="padding:13px 12px; color:#334155; font-size:12.5px; font-variant-numeric:tabular-nums; white-space:nowrap;">
              <span style="font-weight:500;">${l}</span>
              ${u?`<span style="color:#94a3b8; font-size:11.5px; margin-left:5px;">${u}</span>`:``}
            </td>
            <!-- 5. 주문자 (우아한 텍스트 링크) -->
            <td style="padding:13px 12px;">
              <button type="button" class="btn-customer-detail" data-order-idx="${t}"
                style="background:transparent; border:none; padding:0; font-size:13px; font-weight:600; color:#0f172a; cursor:pointer; text-decoration:underline; text-decoration-color:#cbd5e1; text-underline-offset:3px; transition:all 0.15s;"
                onmouseover="this.style.color='#2563eb'; this.style.textDecorationColor='#2563eb';"
                onmouseout="this.style.color='#0f172a'; this.style.textDecorationColor='#cbd5e1';">
                ${h}
              </button>
            </td>
            <!-- 6. 주문 상품 (자연스러운 폰트 + 말줄임표) -->
            <td style="padding:13px 12px; max-width:280px;">
              <div style="color:#1e293b; font-weight:500; font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; line-height:1.4;" title="${p.replace(/"/g,`&quot;`)}">
                ${p}
              </div>
            </td>
            <!-- 7. 결제금액 -->
            <td style="padding:13px 16px 13px 12px; text-align:right; font-variant-numeric:tabular-nums;">
              ${i?`
                <div style="display:inline-flex; flex-direction:column; align-items:flex-end;">
                  <span style="color:#94a3b8; font-size:13px; text-decoration:line-through; font-weight:500;">${(parseInt(e.total_amount)||0).toLocaleString()}원</span>
                  <span style="color:#dc2626; font-size:11px; font-weight:600; margin-top:2px;">취소완료</span>
                </div>
              `:`
                <span style="font-weight:700; font-size:13.5px; color:#0f172a;">${(parseInt(e.total_amount)||0).toLocaleString()}원</span>
              `}
            </td>
            <!-- 8. 입금확인/관리 -->
            <td style="padding:13px 12px; text-align:center; white-space:nowrap;">
              ${c}
            </td>
          </tr>
        `}),e.innerHTML=`
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
              <tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; font-size:12px; color:#64748b;">
                <th style="padding:11px 8px; font-weight:600; width:95px; min-width:95px; text-align:center;">상태</th>
                <th style="padding:11px 8px; font-weight:600; width:75px; text-align:center;">결제수단</th>
                <th style="padding:11px 12px; font-weight:600; width:120px;">주문번호</th>
                <th style="padding:11px 12px; font-weight:600; width:135px;">주문일시</th>
                <th style="padding:11px 12px; font-weight:600; width:90px;">주문자</th>
                <th style="padding:11px 12px; font-weight:600;">주문 상품</th>
                <th style="padding:11px 16px 11px 12px; font-weight:600; width:110px; text-align:right;">결제금액</th>
                <th style="padding:11px 12px; font-weight:600; width:115px; text-align:center;">입금확인/관리</th>
              </tr>
            </thead>
            <tbody>
              ${m}
            </tbody>
          </table>
        </div>
      `,e.querySelectorAll(`.btn-customer-detail`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.orderIdx);r[n]&&_(r[n])})}),e.querySelectorAll(`.btn-confirm-transfer-action`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.orderIdx);r[n]&&g(r[n])})})},g=async e=>{let r=e.customer_name||e.buyer_name||`고객`,i=(parseInt(e.total_amount)||0).toLocaleString();if(confirm(`[${r}] 고객님의 계좌 입금(${i}원) 내역을 확인하셨습니까?\n\n'확인'을 누르면 '입금완료'로 최종 승인 처리되며 실매출 통계에 즉시 반영됩니다.`)){e.payment_status=`paid`,e.transfer_confirmed=!0,e.transfer_confirmed_at=Date.now();try{X&&(e.id?await X.from(`live_orders`).update({payment_status:`paid`,updated_at:Date.now()}).eq(`id`,e.id):e.pg_receipt_id&&await X.from(`live_orders`).update({payment_status:`paid`,updated_at:Date.now()}).eq(`pg_receipt_id`,e.pg_receipt_id))}catch(e){console.warn(`live_orders update failed:`,e)}try{localStorage.setItem(`ryzin_live_orders_${t}`,JSON.stringify(n))}catch{}alert(`[${r}] 님의 계좌이체 주문이 '입금완료'로 정상 승인 처리되었습니다.`),m(),h(),v()}},_=e=>{document.getElementById(`customer-detail-modal`)?.remove();let n=e.customer_name||e.buyer_name||`(미입력)`,r=e.customer_phone||e.buyer_phone||`(미입력)`,i=e.customer_address||e.shipping_address||`(미입력)`,a=(e.payment_status||`payapp_requested`).toLowerCase(),o=a===`paid`,s=f.includes(a),c=``;c=o?`<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#ecfdf5; color:#059669; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#10b981; flex-shrink:0;"></span>결제완료</span>`:s?`<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#fef2f2; color:#dc2626; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#ef4444; flex-shrink:0;"></span>결제취소</span>`:`<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#fffbeb; color:#b45309; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#f59e0b; flex-shrink:0;"></span>결제대기</span>`;let l=d(e).map(e=>{let t=e.quantity||1;return`${e.name||e.goodname||`상품`}${t>1?` (${t}개)`:``}`}).join(`, `),u=`-`;if(e.created_at){let t=new Date(e.created_at);if(isNaN(t.getTime())){let n=Number(e.created_at);isNaN(n)||(t=new Date(n))}u=isNaN(t.getTime())?String(e.created_at):`${t.getFullYear()}.${String(t.getMonth()+1).padStart(2,`0`)}.${String(t.getDate()).padStart(2,`0`)} ${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}`}let m=parseInt(e.total_amount)||0,h=e.pg_receipt_id||e.receipt_id||e.order_number||``,_=document.createElement(`div`);_.id=`customer-detail-modal`,_.style.cssText=`position:fixed; inset:0; background:rgba(15,23,42,0.6); z-index:10000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(3px); padding:16px;`,_.innerHTML=`
        <div style="background:#ffffff; border-radius:14px; width:450px; max-width:100%; box-shadow:0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1); overflow:hidden; border:1px solid #e2e8f0; animation:orderModalIn 0.16s ease-out;">
          <!-- 모달 헤더 -->
          <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid #f1f5f9; background:#ffffff;">
            <div style="display:flex; align-items:center; gap:8px;">
              <h4 style="margin:0; font-size:15px; font-weight:700; color:#0f172a;">고객 주문 및 배송 정보</h4>
              ${c}
            </div>
            <button type="button" id="btn-close-customer-modal" style="background:none; border:none; color:#94a3b8; font-size:20px; line-height:1; cursor:pointer; padding:4px; border-radius:6px; transition:color 0.12s;" onmouseover="this.style.color='#0f172a'" onmouseout="this.style.color='#94a3b8'">✕</button>
          </div>

          <!-- 모달 바디 -->
          <div style="padding:20px; background:#ffffff; max-height:80vh; overflow-y:auto;">
            <!-- 1. 고객 개인정보 카드 (보안보호적용 문구 삭제 완료) -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:14px;">
              <div style="font-size:12px; font-weight:700; color:#475569; margin-bottom:12px;">고객 개인정보</div>

              <!-- 고객 이름 -->
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid #edf2f7;">
                <span style="font-size:12.5px; color:#64748b; font-weight:500; width:70px;">이름</span>
                <span style="font-size:14px; font-weight:700; color:#0f172a; flex:1; text-align:right;">${n}</span>
              </div>

              <!-- 전화번호 -->
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid #edf2f7;">
                <span style="font-size:12.5px; color:#64748b; font-weight:500; width:70px;">전화번호</span>
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="font-size:13.5px; font-weight:600; color:#0f172a; font-variant-numeric:tabular-nums;">${r}</span>
                  ${r===`(미입력)`?``:`<button type="button" class="btn-copy-field" data-copy="${r}" style="padding:3px 8px; font-size:11px; font-weight:600; border:1px solid #cbd5e1; border-radius:5px; background:#ffffff; color:#475569; cursor:pointer;">복사</button>`}
                </div>
              </div>

              <!-- 배송지 주소 -->
              <div style="display:flex; flex-direction:column; gap:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:12.5px; color:#64748b; font-weight:500;">배송지 주소</span>
                  ${i===`(미입력)`?``:`<button type="button" class="btn-copy-field" data-copy="${i}" style="padding:3px 8px; font-size:11px; font-weight:600; border:1px solid #cbd5e1; border-radius:5px; background:#ffffff; color:#475569; cursor:pointer;">주소 복사</button>`}
                </div>
                <div style="font-size:13px; color:#1e293b; font-weight:500; line-height:1.55; word-break:break-all; background:#ffffff; padding:10px 12px; border-radius:7px; border:1px solid #e2e8f0;">
                  ${i}
                </div>
              </div>
            </div>

            <!-- 2. 주문 및 결제 내역 요약 -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:14px;">
              <div style="font-size:12px; font-weight:700; color:#475569; margin-bottom:12px;">주문 결제 정보</div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12.5px;">
                <span style="color:#64748b;">주문 상품</span>
                <span style="font-weight:600; color:#0f172a; text-align:right; max-width:280px; line-height:1.4;">${l}</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12.5px;">
                <span style="color:#64748b;">결제 금액</span>
                <span style="font-weight:700; color:#0f172a; font-size:14px; font-variant-numeric:tabular-nums;">${m.toLocaleString()}원</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12.5px;">
                <span style="color:#64748b;">결제 수단</span>
                <span style="font-weight:600; color:#0f172a;">${(e.pg_provider||``).toLowerCase()===`bank_transfer`?`무통장 계좌이체`:`신용카드/간편결제`}</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12.5px;">
                <span style="color:#64748b;">주문번호</span>
                <span style="color:#475569; font-variant-numeric:tabular-nums;">${h||`-`}</span>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:12.5px;">
                <span style="color:#64748b;">주문 일시</span>
                <span style="color:#475569; font-variant-numeric:tabular-nums;">${u}</span>
              </div>
            </div>

            <!-- 3. 결제 관리 / 계좌이체 입금 관리 카드 -->
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:16px;">
              ${(e.pg_provider||``).toLowerCase()===`bank_transfer`?`
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <span style="font-size:12px; font-weight:700; color:#334155;">계좌이체 입금 관리</span>
                  <span style="font-size:11px; color:#94a3b8;">관리자 수동 입금 확인</span>
                </div>
                ${o?`
                  <div style="text-align:center; padding:12px; background:#ecfdf5; border:1px solid #d1fae5; border-radius:8px; color:#059669; font-size:13px; font-weight:700;">
                    실제 계좌 입금 확인 및 승인이 완료된 주문건입니다.
                  </div>
                `:`
                  <div>
                    <p style="font-size:12px; color:#64748b; margin:0 0 10px 0; line-height:1.4;">
                      실제 통장에 입금 금액(${m.toLocaleString()}원)이 입금되었는지 확인하신 후 아래 완료 버튼을 눌러주세요.
                    </p>
                    <button type="button" id="btn-modal-confirm-transfer" style="width:100%; padding:11px; font-size:13px; font-weight:700; border:none; background:#0f172a; color:#ffffff; border-radius:8px; cursor:pointer; transition:all 0.12s; box-shadow:0 1px 3px rgba(0,0,0,0.1);" onmouseover="this.style.background='#16a34a'" onmouseout="this.style.background='#0f172a'">
                      실제 통장 입금 확인 완료 처리
                    </button>
                  </div>
                `}
              `:`
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <span style="font-size:12px; font-weight:700; color:#334155;">결제 취소 관리</span>
                  <span style="font-size:11px; color:#94a3b8;">PG사 실시간 취소 연동</span>
                </div>

                ${s?`
                  <div style="text-align:center; padding:12px; background:#fef2f2; border:1px solid #fee2e2; border-radius:8px; color:#dc2626; font-size:12.5px; font-weight:600;">
                    이미 결제 취소(환불) 처리가 완료된 주문건입니다.
                  </div>
                `:`
                  <div style="display:flex; gap:8px;">
                    <button type="button" id="btn-modal-cancel-all" style="flex:1; padding:9px 12px; font-size:12px; font-weight:700; border:1px solid #fecaca; background:#fff5f5; color:#dc2626; border-radius:7px; cursor:pointer; transition:all 0.12s;" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='#fff5f5'">
                      결제 전체 취소
                    </button>
                    <button type="button" id="btn-modal-cancel-partial" style="flex:1; padding:9px 12px; font-size:12px; font-weight:700; border:1px solid #fed7aa; background:#fffbeb; color:#b45309; border-radius:7px; cursor:pointer; transition:all 0.12s;" onmouseover="this.style.background='#fef3c7'" onmouseout="this.style.background='#fffbeb'">
                      부분 취소
                    </button>
                  </div>

                  <!-- 부분 취소 인라인 입력 폼 -->
                  <div id="modal-partial-form" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed #e2e8f0;">
                    <div style="margin-bottom:8px;">
                      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <label style="font-size:11.5px; font-weight:600; color:#475569;">부분 취소 금액 (원)</label>
                        <span style="font-size:11px; color:#94a3b8;">최대 ${m.toLocaleString()}원</span>
                      </div>
                      <input type="number" id="partial-cancel-amount" placeholder="취소할 금액 입력 (예: 10000)" max="${m}" style="width:100%; box-sizing:border-box; padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-size:13px; outline:none; font-weight:700; color:#0f172a;">
                    </div>
                    <div style="margin-bottom:10px;">
                      <label style="display:block; font-size:11.5px; font-weight:600; color:#475569; margin-bottom:4px;">취소 사유</label>
                      <input type="text" id="partial-cancel-memo" value="고객 요청 부분 취소" style="width:100%; box-sizing:border-box; padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-size:12px; outline:none; color:#334155;">
                    </div>
                    <div style="display:flex; justify-content:flex-end; gap:6px;">
                      <button type="button" id="btn-close-partial-form" style="padding:6px 12px; font-size:11.5px; font-weight:600; border:1px solid #e2e8f0; background:#ffffff; color:#64748b; border-radius:6px; cursor:pointer;">접기</button>
                      <button type="button" id="btn-submit-partial-cancel" style="padding:6px 14px; font-size:11.5px; font-weight:700; border:none; background:#d97706; color:#ffffff; border-radius:6px; cursor:pointer;">부분 취소 실행</button>
                    </div>
                  </div>
                `}
              `}
            </div>
          </div>

          <!-- 모달 푸터 -->
          <div style="display:flex; justify-content:flex-end; padding:12px 20px; background:#f8fafc; border-top:1px solid #e2e8f0;">
            <button type="button" id="btn-confirm-customer-modal" class="action-btn btn-primary-solid" style="padding:7px 20px; font-size:12.5px;">확인</button>
          </div>
        </div>
      `,document.body.appendChild(_);let v=()=>_.remove();_.querySelector(`#btn-close-customer-modal`)?.addEventListener(`click`,v),_.querySelector(`#btn-confirm-customer-modal`)?.addEventListener(`click`,v),_.querySelector(`#btn-modal-confirm-transfer`)?.addEventListener(`click`,()=>{v(),g(e)}),_.addEventListener(`click`,e=>{e.target===_&&v()}),_.querySelectorAll(`.btn-copy-field`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.copy;t&&navigator.clipboard.writeText(t).then(()=>{let t=e.textContent;e.textContent=`복사완료`,e.style.color=`#059669`,e.style.borderColor=`#059669`,setTimeout(()=>{e.textContent=t,e.style.color=`#475569`,e.style.borderColor=`#cbd5e1`},1200)})})});let y=_.querySelector(`#modal-partial-form`),b=_.querySelector(`#btn-modal-cancel-partial`),x=_.querySelector(`#btn-close-partial-form`);b&&y&&b.addEventListener(`click`,()=>{y.style.display=y.style.display===`none`?`block`:`none`}),x&&y&&x.addEventListener(`click`,()=>{y.style.display=`none`}),_.querySelector(`#btn-modal-cancel-all`)?.addEventListener(`click`,async()=>{if(!confirm(`정말로 이 주문(총 ${m.toLocaleString()}원)의 결제를 전체 취소하시겠습니까?\n이 작업은 PG사(페이앱) 승인 취소와 함께 연동됩니다.`))return;let n=_.querySelector(`#btn-modal-cancel-all`);n&&(n.disabled=!0,n.textContent=`취소 처리 중...`);try{if(h&&h!==`-`&&h!==`undefined`)try{let e=await(await fetch(`/api/payapp`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({cmd:`paycancel`,mul_no:h,cancelmemo:`관리자 주문 전체 취소`})})).json();e.success||console.warn(`PayApp API cancel notice:`,e.message)}catch(e){console.warn(`PayApp cancellation request failed:`,e)}if(X)try{e.id?await X.from(`live_orders`).update({payment_status:`cancelled`}).eq(`id`,e.id):h&&await X.from(`live_orders`).update({payment_status:`cancelled`}).eq(`pg_receipt_id`,h)}catch(e){console.warn(`DB order update failed:`,e)}try{let n=JSON.parse(localStorage.getItem(`ryzin_live_orders_${t}`)||`[]`),r=n.find(t=>t.id&&t.id===e.id||t.pg_receipt_id&&t.pg_receipt_id===h);r&&(r.payment_status=`cancelled`,localStorage.setItem(`ryzin_live_orders_${t}`,JSON.stringify(n)))}catch{}alert(`결제가 정상적으로 전체 취소 처리되었습니다.`),v(),p()}catch(e){alert(`취소 처리 중 오류가 발생했습니다: `+e.message),n&&(n.disabled=!1,n.textContent=`결제 전체 취소`)}}),_.querySelector(`#btn-submit-partial-cancel`)?.addEventListener(`click`,async()=>{let n=_.querySelector(`#partial-cancel-amount`),r=_.querySelector(`#partial-cancel-memo`),i=parseInt(n?.value||0,10),a=r?.value?.trim()||`관리자 부분 취소 처리`;if(isNaN(i)||i<=0){alert(`유효한 부분 취소 금액을 입력해주세요.`),n?.focus();return}if(i>m){alert(`부분 취소 금액은 현재 결제 금액(${m.toLocaleString()}원)을 초과할 수 없습니다.`),n?.focus();return}if(!confirm(`${i.toLocaleString()}원을 부분 취소하시겠습니까?\n남은 결제 금액: ${(m-i).toLocaleString()}원`))return;let o=_.querySelector(`#btn-submit-partial-cancel`);o&&(o.disabled=!0,o.textContent=`처리 중...`);try{if(h&&h!==`-`&&h!==`undefined`)try{let e=await(await fetch(`/api/payapp`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({cmd:`paycancel`,mul_no:h,cancelprice:i,cancelmemo:a})})).json();e.success||console.warn(`PayApp partial cancel notice:`,e.message)}catch(e){console.warn(`PayApp partial cancel request failed:`,e)}let n=Math.max(0,m-i),r=n===0?`cancelled`:`paid`;if(X)try{let t={total_amount:n,payment_status:r};e.id?await X.from(`live_orders`).update(t).eq(`id`,e.id):h&&await X.from(`live_orders`).update(t).eq(`pg_receipt_id`,h)}catch(e){console.warn(`DB partial cancel update failed:`,e)}try{let i=JSON.parse(localStorage.getItem(`ryzin_live_orders_${t}`)||`[]`),a=i.find(t=>t.id&&t.id===e.id||t.pg_receipt_id&&t.pg_receipt_id===h);a&&(a.total_amount=n,a.payment_status=r,localStorage.setItem(`ryzin_live_orders_${t}`,JSON.stringify(i)))}catch{}alert(`${i.toLocaleString()}원이 정상적으로 부분 취소되었습니다.`),v(),p()}catch(e){alert(`부분 취소 처리 중 오류가 발생했습니다: `+e.message),o&&(o.disabled=!1,o.textContent=`부분 취소 실행`)}})},v=()=>{let e=document.getElementById(`ranking-table-container`);if(!e)return;let t=n.filter(e=>(e.payment_status||``).toLowerCase()===`paid`),i={},a=0;t.forEach(e=>{d(e).forEach(t=>{let n=(t.name||t.goodname||`상품`).trim(),r=parseInt(t.quantity||t.qty||1)||1,o=parseInt(t.price||0)||Math.round((parseInt(e.total_amount)||0)/Math.max(1,d(e).length)),s=o*r;a+=s,i[n]||(i[n]={name:n,code:t.product_code||t.code||`-`,unitPrice:o,totalQty:0,totalAmount:0,orderCount:0}),i[n].totalQty+=r,i[n].totalAmount+=s,i[n].orderCount+=1})});let o=Object.values(i);if(r===`qty`?o.sort((e,t)=>t.totalQty-e.totalQty||t.totalAmount-e.totalAmount):o.sort((e,t)=>t.totalAmount-e.totalAmount||t.totalQty-e.totalQty),o.length===0){e.innerHTML=`
          <div style="text-align:center; padding:50px 20px; color:#94a3b8; font-size:13.5px;">
            실제 결제 완료된 판매 데이터가 아직 없습니다.
          </div>
        `;return}let s=``;o.forEach((e,t)=>{let n=t+1,r=`<span style="display:inline-block; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:700; background:#f1f5f9; color:#64748b;">${n}위</span>`;n===1?r=`<span style="display:inline-block; padding:3px 9px; border-radius:6px; font-size:11px; font-weight:800; background:#0f172a; color:#ffffff;">1위 TOP</span>`:n===2?r=`<span style="display:inline-block; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:800; background:#e2e8f0; color:#1e293b;">2위</span>`:n===3&&(r=`<span style="display:inline-block; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:700; background:#f8fafc; color:#334155; border:1px solid #e2e8f0;">3위</span>`);let i=a>0?(e.totalAmount/a*100).toFixed(1):0;s+=`
          <tr style="border-bottom:1px solid #f1f5f9; font-size:13px; transition:background 0.12s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
            <td style="padding:12px 14px; text-align:center;">${r}</td>
            <td style="padding:12px 14px;">
              <span style="font-weight:700; color:#0f172a;">${e.name}</span>
              ${e.code&&e.code!==`-`?`<span style="font-size:11px; color:#94a3b8; margin-left:6px; font-family:monospace;">${e.code}</span>`:``}
            </td>
            <td style="padding:12px 14px; text-align:right; color:#475569;">${e.unitPrice.toLocaleString()}원</td>
            <td style="padding:12px 14px; text-align:right; font-weight:800; color:#0f172a; font-size:14px;">${e.totalQty.toLocaleString()}개</td>
            <td style="padding:12px 14px; text-align:right; font-weight:800; color:#2563eb; font-size:14px;">${e.totalAmount.toLocaleString()}원</td>
            <td style="padding:12px 14px; width:170px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="flex:1; height:6px; background:#e2e8f0; border-radius:3px; overflow:hidden;">
                  <div style="width:${i}%; height:100%; background:#2563eb; border-radius:3px;"></div>
                </div>
                <span style="font-size:11.5px; font-weight:700; color:#64748b; width:40px; text-align:right;">${i}%</span>
              </div>
            </td>
          </tr>
        `}),e.innerHTML=`
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
              <tr style="background:#f8fafc; border-bottom:1.5px solid #e2e8f0; font-size:12px; color:#64748b;">
                <th style="padding:11px 14px; font-weight:700; width:75px; text-align:center;">순위</th>
                <th style="padding:11px 14px; font-weight:700;">상품명</th>
                <th style="padding:11px 14px; font-weight:700; width:110px; text-align:right;">판매단가</th>
                <th style="padding:11px 14px; font-weight:700; width:100px; text-align:right;">판매수량</th>
                <th style="padding:11px 14px; font-weight:700; width:130px; text-align:right;">총 결제금액</th>
                <th style="padding:11px 14px; font-weight:700; width:170px;">매출 점유율</th>
              </tr>
            </thead>
            <tbody>
              ${s}
            </tbody>
          </table>
        </div>
      `},y=()=>{let e=en(t),n=(u.viewers||0)+(u.cumViewers||0);(!Array.isArray(e)||e.length===0)&&(e=[{minute:0,time:new Date().toLocaleTimeString(`ko-KR`,{hour12:!1,hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),viewers:n}],tn(t,e));let r=0;e.forEach(e=>{let t=parseInt(e.viewers)||0;t>r&&(r=t)});let i=document.getElementById(`timeline-duration-badge`);i&&(i.textContent=`측정 기록: 총 ${e.length>0?e[e.length-1].minute:0}분 (${e.length}회)`);let a=document.getElementById(`timeline-chart-info`);a&&(a.textContent=`총 ${e.length}분 측정 (최고 ${r.toLocaleString()}명)`);let o=document.getElementById(`timeline-log-count-badge`);o&&(o.textContent=`총 ${e.length}개 기록`);let s=document.getElementById(`timeline-chart-content`);if(s){let t=Math.max(10,Math.ceil(r*1.15)),n=t=>e.length<=1?407.5:45+t/(e.length-1)*725,i=e=>124-e/t*104,a=``,o=`M ${n(0)} 124`,c=``;e.forEach((e,t)=>{let s=n(t),l=i(parseInt(e.viewers)||0);t===0?(a+=`M ${s} ${l}`,o+=` L ${s} ${l}`):(a+=` L ${s} ${l}`,o+=` L ${s} ${l}`);let u=parseInt(e.viewers)===r&&r>0;c+=`
            <circle cx="${s}" cy="${l}" r="${u?5:3}" fill="${u?`#ef4444`:`#2563eb`}" stroke="#ffffff" stroke-width="1.5">
              <title>방송 ${e.minute}분 후 (${e.time}): ${e.viewers}명 시청</title>
            </circle>
          `}),o+=` L ${n(e.length-1)} 124 Z`,s.innerHTML=`
          <svg viewBox="0 0 800 150" style="width:100%; height:100%; display:block; overflow:visible;">
            <defs>
              <linearGradient id="chatTimelineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#2563eb" stop-opacity="0.18"/>
                <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <line x1="45" y1="124" x2="770" y2="124" stroke="#e2e8f0" stroke-width="1"/>
            <line x1="45" y1="20" x2="770" y2="20" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2 2"/>
            <path d="${o}" fill="url(#chatTimelineGrad)"/>
            <path d="${a}" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            ${c}
          </svg>
        `}let c=document.getElementById(`timeline-table-container`);if(c){let t=``;[...e].reverse().forEach(n=>{let r=e.findIndex(e=>e.minute===n.minute),i=`<span style="color:#94a3b8;">-</span>`;if(r>0){let t=(parseInt(n.viewers)||0)-(parseInt(e[r-1].viewers)||0);i=t>0?`<span style="color:#ef4444; font-weight:700;">+${t}명 ▲</span>`:t<0?`<span style="color:#2563eb; font-weight:700;">${t}명 ▼</span>`:`<span style="color:#64748b;">0명</span>`}t+=`
            <tr style="border-bottom:1px solid #f1f5f9; font-size:12.5px;">
              <td style="padding:10px 14px; font-weight:700; color:#0f172a; font-family:monospace;">${n.minute===0?`방송 시작 (0분)`:`방송 ${n.minute}분 후`}</td>
              <td style="padding:10px 14px; color:#64748b; font-family:monospace;">${n.time}</td>
              <td style="padding:10px 14px; text-align:right; font-weight:800; color:#0f172a;">${(parseInt(n.viewers)||0).toLocaleString()}명</td>
              <td style="padding:10px 14px; text-align:right;">${i}</td>
            </tr>
          `}),c.innerHTML=`
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead style="background:#f8fafc; border-bottom:1.5px solid #e2e8f0; font-size:12px; color:#64748b; position:sticky; top:0;">
              <tr>
                <th style="padding:10px 14px; font-weight:700;">방송 경과</th>
                <th style="padding:10px 14px; font-weight:700;">측정 시각</th>
                <th style="padding:10px 14px; font-weight:700; text-align:right;">시청자 수</th>
                <th style="padding:10px 14px; font-weight:700; text-align:right;">직전 1분 대비</th>
              </tr>
            </thead>
            <tbody>
              ${t}
            </tbody>
          </table>
        `}};p(),document.getElementById(`btn-refresh-orders`)?.addEventListener(`click`,p),document.getElementById(`btn-download-orders-csv`)?.addEventListener(`click`,()=>{let e=`주문일시,주문상품목록,결제금액,주문자명,연락처,결제상태,주문번호
`;n.forEach(t=>{let n=t.created_at?new Date(t.created_at).toLocaleString():``,r=`"${d(t).map(e=>`${e.name}(${e.quantity}개)`).join(`, `)}"`,i=t.total_amount||0,a=`"${t.customer_name||t.buyer_name||``}"`,o=`"${t.customer_phone||t.buyer_phone||``}"`,s=(t.payment_status||`payapp_requested`).toLowerCase(),c=s===`paid`?`결제완료`:f.includes(s)?`취소/환불`:`결제대기`,l=`"${t.pg_receipt_id||t.receipt_id||t.order_number||``}"`;e+=`${n},${r},${i},${a},${o},${c},${l}\n`});let r=new Blob([`﻿`+e],{type:`text/csv;charset=utf-8;`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`주문내역_${t}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}),document.getElementById(`btn-download-ranking-csv`)?.addEventListener(`click`,()=>{let e=n.filter(e=>(e.payment_status||``).toLowerCase()===`paid`),r={};e.forEach(e=>{d(e).forEach(t=>{let n=(t.name||t.goodname||`상품`).trim(),i=parseInt(t.quantity||t.qty||1)||1,a=parseInt(t.price||0)||Math.round((parseInt(e.total_amount)||0)/Math.max(1,d(e).length));r[n]||(r[n]={name:n,price:a,qty:0,amount:0}),r[n].qty+=i,r[n].amount+=a*i})});let i=Object.values(r).sort((e,t)=>t.qty-e.qty),a=`순위,상품명,판매단가,총판매수량,총결제금액
`;i.forEach((e,t)=>{a+=`${t+1},"${e.name.replace(/"/g,`""`)}",${e.price},${e.qty},${e.amount}\n`});let o=new Blob([`﻿`+a],{type:`text/csv;charset=utf-8;`}),s=URL.createObjectURL(o),c=document.createElement(`a`);c.href=s,c.download=`상품판매순위_${t}.csv`,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(s)}),document.getElementById(`btn-download-timeline-csv`)?.addEventListener(`click`,()=>{let e=en(t),n=`방송경과(분),기록시각,실시간시청자수(명)
`;e.forEach(e=>{n+=`${e.minute},${e.time},${e.viewers}\n`});let r=new Blob([`﻿`+n],{type:`text/csv;charset=utf-8;`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`시청자_1분단위_로그_${t}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}),document.getElementById(`subtab-product-filter`)?.addEventListener(`change`,e=>{i=e.target.value,h()}),document.getElementById(`subtab-order-search`)?.addEventListener(`input`,e=>{a=e.target.value,h()});let b=document.getElementById(`rank-sort-qty`),x=document.getElementById(`rank-sort-amount`);b&&x&&(b.addEventListener(`click`,()=>{r=`qty`,b.style.background=`#fff`,b.style.color=`#0f172a`,b.style.fontWeight=`700`,b.style.boxShadow=`0 1px 2px rgba(0,0,0,0.06)`,x.style.background=`transparent`,x.style.color=`#64748b`,x.style.fontWeight=`600`,x.style.boxShadow=`none`,v()}),x.addEventListener(`click`,()=>{r=`amount`,x.style.background=`#fff`,x.style.color=`#0f172a`,x.style.fontWeight=`700`,x.style.boxShadow=`0 1px 2px rgba(0,0,0,0.06)`,b.style.background=`transparent`,b.style.color=`#64748b`,b.style.fontWeight=`600`,b.style.boxShadow=`none`,v()}));let S=document.getElementById(`order-paytype-all`),C=document.getElementById(`order-paytype-transfer`),w=document.getElementById(`transfer-status-filter-group`);S&&C&&(S.addEventListener(`click`,()=>{o=`all`,S.className=`btn-paytype-filter active`,S.style.background=`#fff`,S.style.color=`#0f172a`,S.style.fontWeight=`700`,S.style.boxShadow=`0 1px 2px rgba(0,0,0,0.06)`,C.className=`btn-paytype-filter`,C.style.background=`transparent`,C.style.color=`#64748b`,C.style.fontWeight=`600`,C.style.boxShadow=`none`,w&&(w.style.display=`none`),h()}),C.addEventListener(`click`,()=>{o=`bank_transfer`,C.className=`btn-paytype-filter active`,C.style.background=`#fff`,C.style.color=`#0f172a`,C.style.fontWeight=`700`,C.style.boxShadow=`0 1px 2px rgba(0,0,0,0.06)`,S.className=`btn-paytype-filter`,S.style.background=`transparent`,S.style.color=`#64748b`,S.style.fontWeight=`600`,S.style.boxShadow=`none`,w&&(w.style.display=`flex`),h()})),document.querySelectorAll(`.btn-transfer-status-filter`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.btn-transfer-status-filter`).forEach(e=>{e.classList.remove(`active`),e.style.background=`transparent`,e.style.color=`#64748b`,e.style.fontWeight=`600`,e.style.boxShadow=`none`}),e.classList.add(`active`),e.style.background=`#fff`,e.style.color=e.dataset.tstatus===`requested`?`#b45309`:e.dataset.tstatus===`paid`?`#059669`:`#0f172a`,e.style.fontWeight=`700`,e.style.boxShadow=`0 1px 2px rgba(0,0,0,0.06)`,s=e.dataset.tstatus,h()})});let T=A.querySelectorAll(`.order-sub-tab-btn`),E=A.querySelectorAll(`.order-sub-view`);if(T.forEach(e=>{e.addEventListener(`click`,()=>{T.forEach(e=>{e.classList.remove(`active`),e.style.background=`transparent`,e.style.color=`#64748b`,e.style.fontWeight=`600`,e.style.boxShadow=`none`}),e.classList.add(`active`),e.style.background=`#fff`,e.style.color=`#0f172a`,e.style.fontWeight=`700`,e.style.boxShadow=`0 1px 3px rgba(0,0,0,0.1)`,E.forEach(e=>e.style.display=`none`);let t=document.getElementById(`order-sub-${e.dataset.subtab}`);t&&(t.style.display=`block`),e.dataset.subtab===`timeline`&&y()})}),e&&e!==`orders`){let t=A.querySelector(`.order-sub-tab-btn[data-subtab="${e}"]`);t&&t.click()}c=setInterval(()=>{m(),y()},3e4),A.addEventListener(`adminTabLeave`,()=>{c&&clearInterval(c)},{once:!0})},ve=()=>_e(`ranking`),ye=S.querySelector(`#btn-back`);ye&&ye.addEventListener(`click`,()=>{A.dispatchEvent(new Event(`adminTabLeave`)),k(),p&&clearInterval(p),Se&&X.removeChannel(Se),xe&&X.removeChannel(xe),n(null)});let be=S.querySelector(`#btn-refresh-preview`);be&&be.addEventListener(`click`,()=>{let e=S.querySelector(`#live-preview-iframe`);e&&(e.src=M)});let xe=null;X&&(xe=X.channel(`bot-sync-${t}`).on(`postgres_changes`,{event:`INSERT`,schema:`public`,table:`live_chats`,filter:`live_id=eq.${t}`},e=>{let n=e.new;if(n&&f.autoReplyActive&&f.autoReplyRules&&f.autoReplyRules.length>0){let e=n.nickname||``;if(!e.includes(`|`)&&e!==`관리자`&&e!==`자동응답봇`){let e=(n.content||``).toLowerCase();for(let n of f.autoReplyRules)if(n.keywords.split(`,`).map(e=>e.trim().toLowerCase()).filter(e=>e).some(t=>e.includes(t))){setTimeout(async()=>{try{if(!X)return;await X.from(`live_chats`).insert([{live_id:t,nickname:`자동응답봇`,content:n.answer,created_at:Date.now().toString()}])}catch(e){console.warn(`Auto-reply failed`,e)}},600);break}}}}).subscribe());let Se=null;X&&(Se=X.channel(`admin-sync-${t}`).on(`postgres_changes`,{event:`UPDATE`,schema:`public`,table:`live_control`,filter:`live_id=eq.${t}`},e=>{let n=e.new;if(!n)return;l.brandName=n.title||``,l.title=n.subtitle||``;let r=n.profile_image||``,i=`라이브 보기`,a=`right`,o=``,s=!1,c=!0,f=``,p=``,m=r.split(`#`),h=m[0];m.slice(1).forEach(e=>{e===`nosplash`||(e.startsWith(`widgetText=`)?i=decodeURIComponent(e.replace(`widgetText=`,``)):e.startsWith(`widgetPosition=`)?a=e.replace(`widgetPosition=`,``):e.startsWith(`widgetImageUrl=`)?o=e.replace(`widgetImageUrl=`,``):e.startsWith(`showOnMain=`)?s=e.replace(`showOnMain=`,``)===`true`:e.startsWith(`showNoticeNote=`)?c=e.replace(`showNoticeNote=`,``)!==`false`:e.startsWith(`noticeNoteTitle=`)?f=decodeURIComponent(e.replace(`noticeNoteTitle=`,``)):e.startsWith(`noticeNoteContent=`)&&(p=decodeURIComponent(e.replace(`noticeNoteContent=`,``))))}),l.showSplash=!r.includes(`#nosplash`),l.logoUrl=h,l.widgetText=i,l.widgetPosition=a,l.widgetImageUrl=o,l.showOnMain=s,l.showNoticeNote=c,l.noticeNoteTitle=f,l.noticeNoteContent=p,l.streamUrl=n.stream_url||``,l.showViewers=n.show_viewers!==!1,l.thumbnailUrl=n.thumbnail_url||``,l.liveStartTime=n.start_time||``,l.isLive=n.status===`ON`,l.shareTitle=n.share_title||``,l.shareDesc=n.share_desc||``,l.shareImageUrl=n.share_image||``,l.likeImageUrl=n.like_image_url||``,l.bannedWords=n.banned_words||``,l.bannedUsers=n.banned_users||``,n.winner_name!==void 0&&(l.winner_name=n.winner_name),n.winner_timestamp!==void 0&&(l.winner_timestamp=n.winner_timestamp),n.viewers!==void 0&&(u.viewers=parseInt(n.viewers)||0),n.cum_viewers!==void 0&&(u.cumViewers=parseInt(n.cum_viewers)||0),n.hearts!==void 0&&(u.hearts=parseInt(n.hearts)||0),Zt(t,l),$t(t,u),typeof window.updateAdminViewersDisplay==`function`&&window.updateAdminViewersDisplay();let g=(e,t)=>{let n=S.querySelector(`#`+e)||document.getElementById(e);n&&document.activeElement!==n&&(n.type===`checkbox`?n.checked=!!t:n.value=t)};g(`cfg-brandName`,l.brandName),g(`cfg-title`,l.title),g(`cfg-stream`,l.streamUrl),g(`cfg-showViewers`,l.showViewers),g(`cfg-liveStartTime`,l.liveStartTime),g(`cfg-shareTitle`,l.shareTitle),g(`cfg-shareDesc`,l.shareDesc),g(`cfg-bannedWords`,l.bannedWords),g(`cfg-bannedUsers`,l.bannedUsers);let _=S.querySelector(`#logo-preview`)||document.getElementById(`logo-preview`);_&&(_.src=l.logoUrl);let v=S.querySelector(`#thumbnail-preview`)||document.getElementById(`thumbnail-preview`);v&&(v.src=l.thumbnailUrl);let y=S.querySelector(`#like-preview`)||document.getElementById(`like-preview`);y&&(y.src=l.likeImageUrl,y.style.display=l.likeImageUrl?`block`:`none`);let b=S.querySelector(`#like-preview-placeholder`)||document.getElementById(`like-preview-placeholder`);b&&(b.style.display=l.likeImageUrl?`none`:`block`);let x=S.querySelector(`#btn-clear-like-icon`)||document.getElementById(`btn-clear-like-icon`);x&&(x.style.display=l.likeImageUrl?`block`:`none`);let C=S.querySelector(`#btn-toggle-live`)||document.getElementById(`btn-toggle-live`);if(C&&document.activeElement!==C&&(C.textContent=l.isLive?`라이브 종료`:`라이브 시작`,C.className=`action-btn ${l.isLive?`btn-danger-solid`:`btn-success-solid`}`),n.products&&Array.isArray(n.products)){let e=JSON.stringify(n.products);if(JSON.stringify(d)!==e){Array.isArray(d)||(d=[]),d.length=0,d.push(...n.products),rn(t,d);let e=S.querySelector(`#product-list-container`)||document.getElementById(`product-list-container`);e&&!e.contains(document.activeElement)&&typeof V==`function`&&(e.innerHTML=V())}}}).subscribe());let Ce=-1;X&&setInterval(async()=>{try{let{data:e,error:n}=await X.from(`live_control`).select(`viewers, cum_viewers, hearts, status`).eq(`live_id`,t).maybeSingle();if(e&&!n&&(u.viewers=parseInt(e.viewers)||0,u.cumViewers=parseInt(e.cum_viewers)||0,u.hearts=parseInt(e.hearts)||0,$t(t,u),typeof window.updateAdminViewersDisplay==`function`&&window.updateAdminViewersDisplay(),l.isLive||e.status===`ON`)){let e=l.liveStartedAt?new Date(l.liveStartedAt).getTime():Date.now(),n=Math.max(0,Math.floor((Date.now()-e)/6e4));if(n!==Ce){Ce=n;let e=en(t),r=new Date().toLocaleTimeString(`ko-KR`,{hour12:!1,hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),i=u.viewers+(u.cumViewers||0),a=e.findIndex(e=>e.minute===n);a>=0?(e[a].viewers=Math.max(e[a].viewers,i),e[a].time=r):e.push({minute:n,time:r,viewers:i}),tn(t,e)}}}catch{}},2500);let we=w.querySelectorAll(`.tab-btn`),H=e=>{A.dispatchEvent(new Event(`adminTabLeave`)),we.forEach(t=>t.classList.toggle(`active`,t.dataset.tab===e)),e===`config`?pe():e===`chat`?me():e===`product`?he():e===`orders`?_e():e===`stats`?ve():e===`leads`&&ge()};we.forEach(e=>{e.addEventListener(`click`,()=>H(e.dataset.tab))}),a?me():pe()}function hn(){let e=document.createElement(`div`),t=``,n=null,r=`desc`;function i(){let a=W.getCurrentRole()===`pd`,o=W.getAll(`hosts`);if(t){let e=t.toLowerCase();o=o.filter(t=>t.name.toLowerCase().includes(e)||t.phone&&t.phone.includes(e))}let s=o.map(e=>{let t=W.getHostStats(e.id);return{...e,stats:t}});n&&s.sort((e,t)=>{let i=e.stats[n]||0,a=t.stats[n]||0;return i<a?r===`asc`?-1:1:i>a?r===`asc`?1:-1:0});let c=e=>n===e?r===`asc`?`<span style="color:#3b82f6; font-size:10px; margin-left:4px;">▲</span>`:`<span style="color:#3b82f6; font-size:10px; margin-left:4px;">▼</span>`:`<span style="color:#cbd5e1; font-size:10px; margin-left:4px;">↕</span>`,l=`
      <tr>
        <th>이름</th>
        <th>전화번호</th>
        <th class="text-right sortable" data-sort="totalBroadcasts" style="cursor:pointer; user-select:none;">총 방송 ${c(`totalBroadcasts`)}</th>
        <th class="text-right">이번달</th>
        <th class="text-right">누적 정산</th>
        <th>최근 방송일</th>
        <th class="text-right sortable" data-sort="avgRevenue" style="cursor:pointer; user-select:none;">평균 매출 ${c(`avgRevenue`)}</th>
        <th class="text-right sortable" data-sort="avgROI" style="cursor:pointer; user-select:none;">평균 ROI ${c(`avgROI`)}</th>
        <th class="col-actions"></th>
      </tr>
    `,u=s.length>0?s.map(e=>`
      <tr class="clickable" data-id="${e.id}">
        <td><a href="javascript:void(0)" class="host-link" data-id="${e.id}">${e.name}</a></td>
        <td>${e.phone||`-`}</td>
        <td class="text-right">${a?`**`:`${$e(e.stats.totalBroadcasts)}회`}</td>
        <td class="text-right">${a?`**`:`${$e(e.stats.monthBroadcasts)}회`}</td>
        <td class="text-right">${a?`**`:G(e.stats.totalSettlement)}</td>
        <td>${a?`**`:et(e.stats.lastBroadcastDate)}</td>
        <td class="text-right">${a?`**`:G(e.stats.avgRevenue)}</td>
        <td class="text-right">${a?`**`:tt(e.stats.avgROI)}</td>
        <td class="col-actions">
          <button class="btn btn-ghost btn-icon btn-sm btn-edit-host" data-id="${e.id}" data-tooltip="수정">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
        </td>
      </tr>
    `).join(``):`
      <tr><td colspan="9" class="text-center" style="padding: var(--space-10); color: var(--text-tertiary);">등록된 쇼호스트가 없습니다.</td></tr>
    `;function d(){e.querySelectorAll(`.host-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),M.navigate(`/hosts/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`.btn-edit-host`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),gn(e.getAttribute(`data-id`))})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>{M.navigate(`/hosts/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`.sortable`).forEach(e=>{e.addEventListener(`click`,t=>{let a=e.getAttribute(`data-sort`);n===a?r=r===`asc`?`desc`:`asc`:(n=a,r=`desc`),i()})})}let f=e.querySelector(`.data-table tbody`),p=e.querySelector(`.data-table thead`);if(f&&p){p.innerHTML=l,f.innerHTML=u;let t=e.querySelector(`.table-count strong`);t&&(t.textContent=s.length),d();return}e.innerHTML=`
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
              <span class="table-count">총 <strong>${s.length}</strong>명</span>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                ${l}
              </thead>
              <tbody>
                ${u}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,setTimeout(()=>{e.querySelector(`#host-search`)?.addEventListener(`input`,e=>{t=e.target.value,i()}),e.querySelector(`#btn-add-host`)?.addEventListener(`click`,()=>{gn()}),d()},0)}return i(),W.on(`hosts:changed`,i),e}function gn(e=null){let t=W.getCurrentRole()===`pd`,n=!!e,r=n?W.getById(`hosts`,e):{},i=`
    <div class="form-grid">
      <div class="input-group">
        <label class="required">이름</label>
        <input class="input" id="host-name" value="${r.name||``}" placeholder="이름 입력">
      </div>
      <div class="input-group">
        <label class="required">전화번호</label>
        <input class="input" id="host-phone" value="${r.phone||``}" placeholder="010-0000-0000">
      </div>
      <div class="input-group">
        <label>주민등록번호</label>
        <input class="input" id="host-ssn" value="${t?`**`:r.ssn||``}" placeholder="마스킹 처리됨" ${t?`readonly style="background:#f1f5f9; cursor:not-allowed;"`:``}>
      </div>
      <div class="input-group">
        <label>은행명</label>
        <select class="input" id="host-bank">
          <option value="">선택</option>
          ${se.map(e=>`<option value="${e}" ${r.bank===e?`selected`:``}>${e}</option>`).join(``)}
        </select>
      </div>
      <div class="input-group">
        <label>계좌번호</label>
        <input class="input" id="host-account" value="${r.account||``}" placeholder="계좌번호">
      </div>
      <div class="input-group">
        <label>예금주</label>
        <input class="input" id="host-holder" value="${r.accountHolder||``}" placeholder="예금주">
      </div>
      <div class="input-group full-width">
        <label>주소</label>
        <input class="input" id="host-address" value="${r.address||``}" placeholder="주소">
      </div>
    </div>
  `,a=document.createElement(`div`);if(a.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,n){let t=document.createElement(`button`);t.className=`btn btn-danger`,t.textContent=`삭제`,t.style.marginRight=`auto`,t.addEventListener(`click`,()=>{q(),st({title:`쇼호스트 삭제`,message:`"${r.name}" 쇼호스트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`,confirmText:`삭제`,danger:!0,onConfirm:()=>{W.delete(`hosts`,e),J(`쇼호스트가 삭제되었습니다.`)}})}),a.appendChild(t)}let o=document.createElement(`button`);o.className=`btn btn-secondary`,o.textContent=`취소`,o.addEventListener(`click`,q);let s=document.createElement(`button`);s.className=`btn btn-primary`,s.textContent=n?`수정`:`등록`,s.addEventListener(`click`,()=>{let t=document.getElementById(`host-name`).value.trim(),r=document.getElementById(`host-phone`).value.trim();if(!t){Y(`이름을 입력해주세요.`);return}let i={name:t,phone:r,ssn:document.getElementById(`host-ssn`).value.trim(),bank:document.getElementById(`host-bank`).value,account:document.getElementById(`host-account`).value.trim(),accountHolder:document.getElementById(`host-holder`).value.trim(),address:document.getElementById(`host-address`).value.trim()};n?(W.update(`hosts`,e,i),J(`쇼호스트 정보가 수정되었습니다.`)):(i.id=I(`host`),i.memo={features:``,strengths:``,weaknesses:``,style:``,brandPreference:``,caution:``,comment:``},i.createdAt=new Date().toISOString().split(`T`)[0],W.create(`hosts`,i),J(`쇼호스트가 등록되었습니다.`)),q()}),a.appendChild(o),a.appendChild(s),K({title:n?`쇼호스트 수정`:`쇼호스트 등록`,size:`lg`,content:i,footer:a})}function _n(e){let t=W.getCurrentRole()===`pd`,n=document.createElement(`div`),r=W.getById(`hosts`,e.id);if(!r)return n.innerHTML=`
      <div class="page-header"><div class="page-header-left"><h1 class="page-title">쇼호스트를 찾을 수 없습니다</h1></div></div>
      <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>
    `,setTimeout(()=>{n.querySelector(`#btn-back`)?.addEventListener(`click`,()=>M.navigate(`/hosts`))},0),n;let i=W.getHostStats(r.id),a=r.memo||{},o=W.query(`liveHosts`,e=>e.hostId===r.id).map(e=>{let t=W.getById(`projects`,e.liveId);return{matching:e,project:t,brand:t?W.getById(`brands`,t.brandId):null,result:W.getById(`results`,e.liveId)}}).filter(e=>e.project);return n.innerHTML=`
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <div class="breadcrumb">
            <a href="javascript:void(0)" id="breadcrumb-list">쇼호스트 관리</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${r.name}</span>
          </div>
          <h1 class="page-title" style="margin-top: var(--space-2);">${r.name}</h1>
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
          <div class="stat-value">${t?`**`:`${$e(i.totalBroadcasts)}회`}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">이번달 방송</div>
          <div class="stat-value">${t?`**`:`${$e(i.monthBroadcasts)}회`}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">누적 정산금액</div>
          <div class="stat-value">${t?`**`:G(i.totalSettlement)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">최근 방송일</div>
          <div class="stat-value">${t?`**`:et(i.lastBroadcastDate)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">평균 매출</div>
          <div class="stat-value">${t?`**`:G(i.avgRevenue)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">평균 ROI</div>
          <div class="stat-value">${t?`**`:tt(i.avgROI)}</div>
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
                <span class="detail-field-value">${r.phone||`-`}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">주민등록번호</span>
                <span class="detail-field-value ${t?``:`ssn-toggle`}" data-ssn="${r.ssn||``}" style="${t?``:`cursor: pointer; text-decoration: underline;`}" title="${t?`열람 권한 없음`:`클릭하여 확인`}">${t?`**`:r.ssn?nt(r.ssn):`-`}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">은행</span>
                <span class="detail-field-value">${r.bank||`-`}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">계좌번호</span>
                <span class="detail-field-value">${r.account||`-`}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">예금주</span>
                <span class="detail-field-value">${r.accountHolder||`-`}</span>
              </div>
              <div class="detail-field" style="grid-column: 1/-1;">
                <span class="detail-field-label">주소</span>
                <span class="detail-field-value">${r.address||`-`}</span>
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
              ${vn(`특징`,a.features)}
              ${vn(`강점`,a.strengths)}
              ${vn(`약점`,a.weaknesses)}
              ${vn(`진행 스타일`,a.style)}
              ${vn(`브랜드 선호도`,a.brandPreference)}
              ${vn(`주의사항`,a.caution)}
              ${vn(`기타`,a.comment)}
            </div>
          </div>
        </div>
      </div>

      ${t?``:`
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
              ${o.length>0?o.map(e=>`
                <tr>
                  <td>${et(e.project.broadcastDate)}</td>
                  <td><a href="javascript:void(0)" class="project-link" data-id="${e.project.id}">${e.brand?e.brand.name:`-`}</a></td>
                  <td>${{main:`메인`,sub:`서브`,guest:`게스트`}[e.matching.role]||`-`}</td>
                  <td class="text-right">${G(e.matching.fee)}</td>
                  <td><span class="badge ${e.matching.settleStatus===`done`?`badge-success`:`badge-default`}">${{pending:`대기`,processing:`진행중`,done:`완료`}[e.matching.settleStatus]||`-`}</span></td>
                  <td>${e.result?G(e.result.liveRevenue):`-`}</td>
                </tr>
              `).join(``):`<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">방송 이력이 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
      `}
    </div>
  `,setTimeout(()=>{let e=n.querySelector(`.ssn-toggle`);if(e&&e.dataset.ssn&&!t){let t=!0;e.addEventListener(`click`,()=>{t=!t,e.textContent=t?nt(e.dataset.ssn):e.dataset.ssn})}n.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>M.navigate(`/hosts`)),n.querySelector(`#btn-edit-host`)?.addEventListener(`click`,()=>gn(r.id)),n.querySelector(`#btn-edit-memo`)?.addEventListener(`click`,()=>yn(r)),n.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),M.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0),n}function vn(e,t){return`
    <div>
      <div style="font-size: var(--text-xs); color: var(--text-tertiary); font-weight: var(--weight-medium); margin-bottom: 2px;">${e}</div>
      <div style="font-size: var(--text-sm); color: var(--text-secondary);">${t||`-`}</div>
    </div>
  `}function yn(e){let t=e.memo||{},n=[{key:`features`,label:`특징`},{key:`strengths`,label:`강점`},{key:`weaknesses`,label:`약점`},{key:`style`,label:`진행 스타일`},{key:`brandPreference`,label:`브랜드 선호도`},{key:`caution`,label:`주의사항`},{key:`comment`,label:`기타 코멘트`}],r=`
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      ${n.map(e=>`
        <div class="input-group">
          <label>${e.label}</label>
          <textarea class="input" id="memo-${e.key}" rows="2">${t[e.key]||``}</textarea>
        </div>
      `).join(``)}
    </div>
  `,i=document.createElement(`div`);i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,q);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=`저장`,o.addEventListener(`click`,()=>{let t={};n.forEach(e=>{t[e.key]=document.getElementById(`memo-${e.key}`).value.trim()}),W.update(`hosts`,e.id,{memo:t}),q(),J(`메모가 저장되었습니다.`),M.navigate(`/hosts/${e.id}`)}),i.appendChild(a),i.appendChild(o),K({title:`메모 수정`,size:`lg`,content:r,footer:i})}function bn(){let e=document.createElement(`div`),t=``;function n(){let r=W.getCurrentRole()===`pd`,i=W.getAll(`brands`);if(t){let e=t.toLowerCase();i=i.filter(t=>t.name.toLowerCase().includes(e)||t.manager&&t.manager.toLowerCase().includes(e)||t.category&&t.category.toLowerCase().includes(e))}let a=i.map(e=>{let t=W.getBrandStats(e.id);return{...e,stats:t}});e.innerHTML=`
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
              <span class="table-count">총 <strong>${a.length}</strong>개</span>
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
                ${a.length>0?a.map(e=>`
                  <tr class="clickable" data-id="${e.id}">
                    <td><a href="javascript:void(0)" class="brand-link" data-id="${e.id}">${e.name}</a></td>
                    <td>${e.companyName||`-`}</td>
                    <td><span class="badge badge-default">${e.category||`-`}</span></td>
                    <td>${e.manager||`-`}</td>
                    <td>${e.phone||`-`}</td>
                    <td>${e.taxInvoice?`<span class="badge badge-success">발행</span>`:`<span class="badge badge-default">미발행</span>`}</td>
                    <td class="text-right">${r?`**`:`${$e(e.stats.totalBroadcasts)}회`}</td>
                    <td class="text-right">${r?`**`:G(e.stats.totalRevenue)}</td>
                    <td>${r?`**`:et(e.stats.lastBroadcastDate)}</td>
                    <td class="text-right">${r?`**`:tt(e.stats.avgROI)}</td>
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
    `,setTimeout(()=>{e.querySelector(`#brand-search`)?.addEventListener(`input`,e=>{t=e.target.value,n();let r=document.getElementById(`brand-search`);if(r){r.focus();let e=r.value.length;r.setSelectionRange(e,e)}}),e.querySelector(`#btn-add-brand`)?.addEventListener(`click`,()=>xn()),e.querySelectorAll(`.brand-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),M.navigate(`/brands/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`.btn-edit-brand`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),xn(e.getAttribute(`data-id`))})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>M.navigate(`/brands/${e.getAttribute(`data-id`)}`))})},0)}return n(),W.on(`brands:changed`,n),e}function xn(e=null){let t=!!e,n=t?W.getById(`brands`,e):{},r=`
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
          ${re.map(e=>`<option value="${e}" ${n.category===e?`selected`:``}>${e}</option>`).join(``)}
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
  `,i=document.createElement(`div`);if(i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,t){let t=document.createElement(`button`);t.className=`btn btn-danger`,t.textContent=`삭제`,t.style.marginRight=`auto`,t.addEventListener(`click`,()=>{q(),st({title:`브랜드 삭제`,message:`"${n.name}" 브랜드를 삭제하시겠습니까?`,confirmText:`삭제`,danger:!0,onConfirm:()=>{W.delete(`brands`,e),J(`브랜드가 삭제되었습니다.`)}})}),i.appendChild(t)}let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,q);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=t?`수정`:`등록`,o.addEventListener(`click`,()=>{let n=document.getElementById(`brand-name`).value.trim();if(!n){Y(`브랜드명을 입력해주세요.`);return}let r={name:n,companyName:document.getElementById(`brand-company`).value.trim(),category:document.getElementById(`brand-category`).value,manager:document.getElementById(`brand-manager`).value.trim(),phone:document.getElementById(`brand-phone`).value.trim(),email:document.getElementById(`brand-email`).value.trim(),businessNo:document.getElementById(`brand-biz`).value.trim(),taxInvoice:document.getElementById(`brand-tax`).value===`true`,address:document.getElementById(`brand-address`).value.trim(),memo:document.getElementById(`brand-memo`).value.trim()};t?(W.update(`brands`,e,r),J(`브랜드 정보가 수정되었습니다.`)):(r.id=I(`brand`),r.createdAt=new Date().toISOString().split(`T`)[0],W.create(`brands`,r),J(`브랜드가 등록되었습니다.`)),q()}),i.appendChild(a),i.appendChild(o),K({title:t?`브랜드 수정`:`브랜드 등록`,size:`lg`,content:r,footer:i})}function Sn(e){let t=W.getCurrentRole()===`pd`,n=document.createElement(`div`),r=W.getById(`brands`,e.id);if(!r)return n.innerHTML=`<div class="page-header"><div class="page-header-left"><h1 class="page-title">브랜드를 찾을 수 없습니다</h1></div></div>
    <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>`,setTimeout(()=>{n.querySelector(`#btn-back`)?.addEventListener(`click`,()=>M.navigate(`/brands`))},0),n;let i=W.getBrandStats(r.id),a=W.query(`projects`,e=>e.brandId===r.id||e.brandName===r.name);return n.innerHTML=`
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <div class="breadcrumb">
            <a href="javascript:void(0)" id="breadcrumb-list">브랜드 관리</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${r.name}</span>
          </div>
          <h1 class="page-title" style="margin-top: var(--space-2);">${r.name}</h1>
        </div>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" id="btn-edit-brand">수정</button>
      </div>
    </div>
    <div class="page-body">
      <div class="stats-grid" style="margin-bottom: var(--space-6);">
        <div class="stat-card"><div class="stat-label">총 방송횟수</div><div class="stat-value">${t?`**`:`${$e(i.totalBroadcasts)}회`}</div></div>
        <div class="stat-card"><div class="stat-label">누적 매출</div><div class="stat-value">${t?`**`:G(i.totalRevenue)}</div></div>
        <div class="stat-card"><div class="stat-label">최근 방송일</div><div class="stat-value">${t?`**`:et(i.lastBroadcastDate)}</div></div>
        <div class="stat-card"><div class="stat-label">평균 ROI</div><div class="stat-value">${t?`**`:tt(i.avgROI)}</div></div>
      </div>

      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-header"><h3>기본 정보</h3></div>
        <div class="card-body">
          <div class="detail-grid">
            <div class="detail-field"><span class="detail-field-label">사업자명</span><span class="detail-field-value">${r.companyName||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">카테고리</span><span class="detail-field-value">${r.category||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">담당자</span><span class="detail-field-value">${r.manager||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">연락처</span><span class="detail-field-value">${r.phone||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">이메일</span><span class="detail-field-value">${r.email||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">사업자등록번호</span><span class="detail-field-value">${r.businessNo||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">세금계산서</span><span class="detail-field-value">${r.taxInvoice?`발행`:`미발행`}</span></div>
            <div class="detail-field"><span class="detail-field-label">주소</span><span class="detail-field-value">${r.address||`-`}</span></div>
            <div class="detail-field"><span class="detail-field-label">메모</span><span class="detail-field-value">${r.memo||`-`}</span></div>
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
              ${a.length>0?a.map(e=>{let n=W.getAll(`results`).find(t=>t.liveId===e.id);return`
                <tr class="clickable" data-id="${e.id}">
                  <td>${at(e.broadcastStatus)}</td>
                  <td><a href="javascript:void(0)" class="project-link" data-id="${e.id}">${et(e.broadcastDate)||`상세보기`}</a></td>
                  <td>${e.platform||`-`}</td>
                  <td class="text-right">${t?`**`:n?$e(n.views):`-`}</td>
                  <td class="text-right">${t?`**`:n?Qe(n.liveRevenue):`-`}</td>
                  <td class="text-right">${t?`**`:n?tt(n.roi):`-`}</td>
                </tr>`}).join(``):`<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">방송 이력이 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{n.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>M.navigate(`/brands`)),n.querySelector(`#btn-edit-brand`)?.addEventListener(`click`,()=>xn(r.id)),n.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),M.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0),n}function Cn(e,t){if(!e)return``;let n=e.replace(/\./g,`-`),r=new Date(n);if(isNaN(r.getTime()))return``;let i=0;if(t===`design`?i=-4:t===`cue_sheet`?i=-5:t===`host_cast`&&(i=-7),i===0)return``;let a=new Date(r);a.setDate(a.getDate()+i);let o=String(a.getMonth()+1).padStart(2,`0`),s=String(a.getDate()).padStart(2,`0`),c=new Date;c.setHours(0,0,0,0);let l=a.getTime()-c.getTime(),u=Math.ceil(l/(1e3*60*60*24)),d=``;return d=u===0?`D-Day`:u>0?`D-${u}`:`D+${Math.abs(u)}`,`<br><span style="font-size: 10px; opacity: 0.8; font-weight: normal;">(${o}/${s} 까지 / <strong style="color:var(--status-error);">${d}</strong>)</span>`}function wn(){let e=document.createElement(`div`),t=W.getCurrentRole(),n=W.getCurrentUser(),r=t===`pd`,i=t&&t.startsWith(`brand:`),a=i?t.split(`:`)[1]:null,o=new URLSearchParams(window.location.search).get(`settleStatus`)||``,s=``,c={status:``,brand:``,platform:``,month:``,category:``,settleStatus:o},l={basic:!0,host:!0,result:!1,finance:!1},u=`list`,d=new Date;function f(){let t=W.getAll(`projects`);if(i&&a&&(t=t.filter(e=>e.brandId===a)),r){let e=(n?.name||``).trim().toLowerCase(),r=(n?.id||``).trim().toLowerCase();t=t.filter(t=>{if(!t.pd)return!1;let n=String(t.pd).trim().toLowerCase();return e&&n.includes(e)||r&&n.includes(r)})}if(W.getAll(`brands`),W.getAll(`hosts`),s){let e=s.toLowerCase();t=t.filter(t=>{let n=W.getById(`brands`,t.brandId),r=W.query(`liveHosts`,e=>e.liveId===t.id).some(t=>{let n=W.getById(`hosts`,t.hostId);return n&&n.name.toLowerCase().includes(e)});return n&&n.name.toLowerCase().includes(e)||r})}c.settleStatus&&(t=c.settleStatus===`pending`?t.filter(e=>e.settleStatus!==`done`&&e.settleStatus!==`settle_done`):t.filter(e=>e.settleStatus===c.settleStatus)),c.status&&(t=t.filter(e=>e.broadcastStatus===c.status)),c.brand&&(t=t.filter(e=>e.brandId===c.brand)),c.platform&&(t=t.filter(e=>e.platform===c.platform)),c.month&&(t=t.filter(e=>e.broadcastMonth===c.month||e.broadcastDate&&e.broadcastDate.replace(/\./g,`-`).substring(0,7)===c.month?!0:e.broadcastMonth&&e.broadcastMonth.length<=2&&e.broadcastDate?e.broadcastDate.replace(/\./g,`-`).substring(0,4)+`-`+e.broadcastMonth.padStart(2,`0`)===c.month:!1)),c.category&&(t=t.filter(e=>e.category===c.category)),t.sort((e,t)=>(t.broadcastDate||``).localeCompare(e.broadcastDate||``));let o=t.map(e=>{let t=W.getById(`brands`,e.brandId),n=W.query(`liveHosts`,t=>t.liveId===e.id),r=W.getAll(`results`).find(t=>t.liveId===e.id),i=W.getAll(`finances`).find(t=>t.liveId===e.id),a=n[0]?W.getById(`hosts`,n[0].hostId):null,o=n[1]?W.getById(`hosts`,n[1].hostId):null,s=n.reduce((e,t)=>e+(t.fee||0),0),c=n.length>0&&n.every(e=>e.settleStatus===`done`)?`완료`:n.some(e=>e.settleStatus===`done`)?`일부완료`:`대기`;return{...e,brand:t,matchings:n,result:r,finance:i,hostA:a,hostB:o,totalHostFee:s,settleLabel:c,hostAFee:n[0]?.fee||0,hostBFee:n[1]?.fee||0}});[...new Set(W.getAll(`projects`).map(e=>e.broadcastMonth).filter(Boolean))].sort().reverse();function p(e){let t=d.getFullYear(),n=d.getMonth(),r=new Date(t,n,1).getDay(),i=new Date(t,n+1,0).getDate(),a=new Date,o=a.getFullYear()===t&&a.getMonth()===n,s=``;for(let e=0;e<r;e++)s+=`<div class="calendar-day empty"></div>`;for(let r=1;r<=i;r++){let i=`${t}-${String(n+1).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`,c=e.filter(e=>e.broadcastDate===i),l=o&&a.getDate()===r,u=c.map(e=>{let t=`#e2e8f0`,n=`#475569`;return e.broadcastStatus===`ready`?(t=`#dbeafe`,n=`#2563eb`):e.broadcastStatus===`live`?(t=`#fee2e2`,n=`#dc2626`):e.broadcastStatus===`done`?(t=`#dcfce3`,n=`#16a34a`):e.broadcastStatus===`cancel`&&(t=`#f1f5f9`,n=`#64748b`),`
            <div class="calendar-project-block clickable" data-id="${e.id}" style="background-color: ${t}; color: ${n}; border-left: 3px solid ${n};">
              <div class="cp-time">${e.broadcastTime||`-`}</div>
              <div class="cp-brand">${e.brandName||(e.brand?e.brand.name:`-`)}</div>
            </div>`}).join(``);s+=`
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
            ${s}
          </div>
        </div>
      `}let m=`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">라이브 관리</h1>
            <p class="page-description">전체 라이브 방송 프로젝트 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <div style="display: flex; gap: 8px; margin-right: 16px;">
            <button class="btn btn-sm ${u===`list`?`btn-primary`:`btn-secondary`}" id="btn-view-list">리스트</button>
            <button class="btn btn-sm ${u===`calendar`?`btn-primary`:`btn-secondary`}" id="btn-view-calendar">캘린더</button>
          </div>
          ${i?``:`
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
          `}
        </div>
      </div>`,h=[...new Set(t.map(e=>{if(e.broadcastDate){let t=new Date(e.broadcastDate.replace(/\./g,`-`));if(!isNaN(t.getTime()))return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`}if(e.broadcastMonth){let t=String(e.broadcastMonth);return!t.includes(`-`)&&t.length<=2&&(t=`2026-${t.padStart(2,`0`)}`),t}return null}).filter(Boolean))].sort().reverse(),g=``;g=u===`list`?`
        <!-- 필터바 -->
        <div class="filter-bar">
          <select class="filter-select ${c.month?`active`:``}" id="filter-month">
            <option value="">전체 월</option>
            ${h.map(e=>`<option value="${e}" ${c.month===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
          <select class="filter-select ${c.status?`active`:``}" id="filter-status">
            <option value="">진행상태</option>
            ${N.map(e=>`<option value="${e.key}" ${c.status===e.key?`selected`:``}>${e.label}</option>`).join(``)}
          </select>
          <select class="filter-select ${c.category?`active`:``}" id="filter-category">
            <option value="">카테고리</option>
            ${re.map(e=>`<option value="${e}" ${c.category===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
          <select class="filter-select ${c.platform?`active`:``}" id="filter-platform">
            <option value="">플랫폼</option>
            ${ee.map(e=>`<option value="${e}" ${c.platform===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
          <div class="table-search" style="margin-left: 4px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="검색" id="project-search" value="${s}" style="background: white;">
          </div>
          ${Object.values(c).some(e=>e)||s?`<button class="filter-reset" id="filter-reset">초기화</button>`:``}
        </div>

        <!-- 테이블 -->
        <div class="table-container">
          <div class="table-toolbar">
            <div class="table-toolbar-left" style="display: flex; align-items: center; gap: var(--space-4);">
              <div style="display: flex; align-items: center; gap: var(--space-2);">
                <span class="table-count" style="margin-right: 8px;">총 <strong>${o.length}</strong>건</span>
              </div>
              <div style="display: flex; gap: var(--space-3); align-items: center; font-size: var(--text-sm); margin-left: var(--space-2);">
                <span style="color: var(--text-tertiary); font-weight: var(--weight-medium);">표시 항목:</span>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-basic" ${l.basic?`checked`:``}> 기본정보
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-host" ${l.host?`checked`:``}> 쇼호스트
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-result" ${l.result?`checked`:``}> 성과
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-finance" ${l.finance?`checked`:``}> 정산
                </label>
              </div>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table" id="projects-table">
              <thead>
                <tr>
                  ${l.basic?`
                  <th>방송 상태</th>
                  <th>브랜드</th>
                  <th>카테고리</th>
                  <th>방송일</th>
                  <th>시간</th>
                  <th>플랫폼</th>
                  `:``}
                  ${l.host?`
                  <th class="text-center" style="text-align: center;">쇼호스트A</th>
                  <th class="text-center" style="text-align: center;">쇼호스트B</th>
                  `:``}
                  ${l.result?`
                  <th class="text-right">시청뷰</th>
                  <th class="text-right">라이브매출</th>
                  <th class="text-right">ROI</th>
                  `:``}
                  ${l.finance?`
                  <th>정산</th>
                  `:``}
                  ${l.basic?`
                  <th>PD</th>
                  `:``}
                </tr>
              </thead>
              <tbody>
                ${o.length>0?o.map(e=>`
                  <tr class="clickable" data-id="${e.id}">
                    ${l.basic?`
                    <td>${rt(e.broadcastStatus)}</td>
                    <td><a href="javascript:void(0)" class="project-link" data-id="${e.id}">${e.brandName||(e.brand?e.brand.name:`-`)}</a></td>
                    <td><span class="badge badge-default">${e.category||`-`}</span></td>
                    <td>${et(e.broadcastDate)}</td>
                    <td>${e.broadcastTime||`-`}</td>
                    <td>${e.platform||`-`}</td>
                    `:``}
                    ${l.host?`
                    <td class="text-center" style="text-align: center;">${e.hostA?e.hostA.name:`-`}</td>
                    <td class="text-center" style="text-align: center;">${e.hostB?e.hostB.name:`-`}</td>
                    `:``}
                    ${l.result?`
                    <td class="text-right">${e.result?$e(e.result.views):`-`}</td>
                    <td class="text-right" style="font-weight: bold;">${r?`**`:e.result?Qe(e.result.liveRevenue):`-`}</td>
                    <td class="text-right" style="font-weight: bold;">${r?`**`:e.result?tt(e.result.roi):`-`}</td>
                    `:``}
                    ${l.finance?`
                    <td><span class="badge ${e.settleLabel===`완료`?`badge-success`:e.settleLabel===`일부완료`?`badge-warning`:`badge-default`}">${r?`**`:e.settleLabel}</span></td>
                    `:``}
                    ${l.basic?`
                    <td>${e.pd||`-`}</td>
                    `:``}
                  </tr>
                `).join(``):`<tr><td colspan="20" class="text-center" style="padding: var(--space-10); color: var(--text-tertiary);">등록된 프로젝트가 없습니다.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      `:p(o),e.innerHTML=m+`<div class="page-body">`+g+`</div>`,setTimeout(()=>{e.querySelector(`#btn-view-list`)?.addEventListener(`click`,()=>{u!==`list`&&(u=`list`,f())}),e.querySelector(`#btn-view-calendar`)?.addEventListener(`click`,()=>{u!==`calendar`&&(u=`calendar`,f())}),e.querySelector(`#btn-prev-month`)?.addEventListener(`click`,()=>{d.setMonth(d.getMonth()-1),f()}),e.querySelector(`#btn-next-month`)?.addEventListener(`click`,()=>{d.setMonth(d.getMonth()+1),f()}),e.querySelectorAll(`.calendar-project-block`).forEach(e=>{e.addEventListener(`click`,()=>{M.navigate(`/projects/${e.getAttribute(`data-id`)}`)})});let t=!1,n=e.querySelector(`#project-search`);n&&(n.addEventListener(`compositionstart`,()=>{t=!0}),n.addEventListener(`compositionend`,e=>{t=!1,s=e.target.value,f();let n=document.getElementById(`project-search`);n&&(n.focus(),n.setSelectionRange(n.value.length,n.value.length))}),n.addEventListener(`input`,e=>{if(t)return;s=e.target.value,f();let n=document.getElementById(`project-search`);if(n){n.focus();let e=n.value.length;n.setSelectionRange(e,e)}})),[`status`,`brand`,`platform`,`month`,`category`].forEach(t=>{e.querySelector(`#filter-${t}`)?.addEventListener(`change`,e=>{c[t]=e.target.value,f()})}),[`basic`,`host`,`result`,`finance`].forEach(t=>{e.querySelector(`#toggle-col-${t}`)?.addEventListener(`change`,e=>{l[t]=e.target.checked,f()})}),e.querySelector(`#filter-reset`)?.addEventListener(`click`,()=>{c={status:``,brand:``,platform:``,month:``,category:``,settleStatus:``},s=``,f()}),e.querySelector(`#btn-new-project`)?.addEventListener(`click`,()=>{Tn(()=>f())}),e.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation(),M.navigate(`/projects/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>{M.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0)}return f(),W.on(`projects:changed`,f),e}function Tn(e){let t=W.getAll(`brands`),n=W.getCurrentRole(),r=W.getCurrentUser(),i=n===`pd`,a=`
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
          ${re.map(e=>`<option value="${e}">${e}</option>`).join(``)}
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
          ${ee.map(e=>`<option value="${e}">${e}</option>`).join(``)}
        </select>
      </div>
      <div class="input-group">
        <label>담당 PD</label>
        <input class="input" id="proj-pd" placeholder="담당 PD" value="${i&&r?.name||``}">
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
  `,o=document.createElement(`div`);o.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let s=document.createElement(`button`);s.className=`btn btn-secondary`,s.textContent=`취소`,s.addEventListener(`click`,q);let c=document.createElement(`button`);c.className=`btn btn-primary`,c.textContent=`등록`,c.addEventListener(`click`,()=>{let n=document.getElementById(`proj-brandName`).value.trim(),r=document.getElementById(`proj-date`).value;if(!n){Y(`방송 제목(브랜드)을 입력해주세요.`);return}if(!r){Y(`방송일을 선택해주세요.`);return}let i=t.find(e=>e.name===n),a=i?i.id:`b_`+n,o={id:I(`live`),brandId:a,brandName:n,adName:``,category:document.getElementById(`proj-category`).value,broadcastMonth:r.substring(0,7),broadcastDate:r,broadcastTime:document.getElementById(`proj-time`).value,platform:document.getElementById(`proj-platform`).value,liveUrl:``,pd:document.getElementById(`proj-pd`).value.trim(),designer:document.getElementById(`proj-designer`).value.trim(),cuesheetLink:``,note:document.getElementById(`proj-note`).value.trim(),broadcastStatus:`new`,settleStatus:`wait`,createdAt:new Date().toISOString().split(`T`)[0]};W.create(`projects`,o),q(),J(`프로젝트가 등록되었습니다.`),e&&e()}),o.appendChild(s),o.appendChild(c),K({title:`신규 프로젝트 등록`,size:`lg`,content:a,footer:o})}function En(e){let t=document.createElement(`div`),n=W.getCurrentRole(),r=n&&n.startsWith(`brand:`);r&&n.split(`:`)[1];let i=r?`scheme`:`info`;function a(){let n=W.getById(`projects`,e.id);if(!n){t.innerHTML=`<div class="page-header"><div class="page-header-left"><h1 class="page-title">프로젝트를 찾을 수 없습니다</h1></div></div>
      <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>`,setTimeout(()=>{t.querySelector(`#btn-back`)?.addEventListener(`click`,()=>M.navigate(`/projects`))},0);return}let o=W.getById(`brands`,n.brandId),s=n.brandName||(o?o.name:`-`);W.query(`tasks`,e=>e.liveId===n.id).filter(e=>e.done).length;let c=0;n.broadcastStatus===`scheduled`?c=20:n.broadcastStatus===`host_cast`?c=40:n.broadcastStatus===`tech_request`?c=60:n.broadcastStatus===`design`?c=80:n.broadcastStatus===`cue_sheet`?c=90:n.broadcastStatus===`done`&&(c=100),t.innerHTML=`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <div class="breadcrumb">
              <a href="javascript:void(0)" id="breadcrumb-list">라이브 관리</a>
              <span class="breadcrumb-separator">/</span>
              <span class="breadcrumb-current">${s}</span>
            </div>
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-2);">
              <h1 class="page-title">${s}</h1>
              <div style="display:flex; gap: 4px; align-items:center;">
                ${rt(n.broadcastStatus)}
              </div>
            </div>
          </div>
        </div>
        <div class="page-header-right">
          <div style="display: flex; align-items: center; gap: var(--space-2); margin-right: var(--space-4);">
            <span style="font-size: var(--text-sm); color: var(--text-tertiary);">진행률</span>
            <div class="progress-bar" style="width: 120px;">
              <div class="progress-bar-fill" style="width: ${c}%"></div>
            </div>
            <span style="font-size: var(--text-sm); font-weight: var(--weight-semibold);">${c}%</span>
          </div>
          ${r?``:`<button class="btn btn-secondary" id="btn-delete-project">삭제</button>`}
        </div>
      </div>
      <div class="page-body">
        <!-- 탭 -->
        <div class="tabs" style="margin-bottom: var(--space-5);">
          ${r?`
            <div class="tab active" data-tab="scheme">스킴관리</div>
          `:`
            <div class="tab ${i===`info`?`active`:``}" data-tab="info">기본정보</div>
            <div class="tab ${i===`scheme`?`active`:``}" data-tab="scheme">스킴관리</div>
            <div class="tab ${i===`hosts`?`active`:``}" data-tab="hosts">쇼호스트</div>
            <div class="tab ${i===`design`?`active`:``}" data-tab="design">디자인</div>
            <div class="tab ${i===`result`?`active`:``}" data-tab="result">성과</div>
            <div class="tab ${i===`finance`?`active`:``}" data-tab="finance">정산</div>
          `}
        </div>

        <div id="tab-content"></div>
      </div>
    `;let l=t.querySelector(`#tab-content`);switch(i){case`info`:l.appendChild(An(n,o));break;case`scheme`:l.appendChild(On(n));break;case`hosts`:l.appendChild(Mn(n));break;case`design`:l.appendChild(Pn(n));break;case`result`:l.appendChild(Ln(n));break;case`finance`:l.appendChild(Rn(n));break}setTimeout(()=>{t.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>M.navigate(`/projects`)),t.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,()=>{i=e.getAttribute(`data-tab`),a()})}),t.querySelector(`#btn-delete-project`)?.addEventListener(`click`,()=>{st({title:`프로젝트 삭제`,message:`"${n.adName}" 프로젝트를 삭제하시겠습니까? 관련된 체크리스트, 쇼호스트 매칭, 성과, 정산 데이터도 모두 삭제됩니다.`,confirmText:`삭제`,danger:!0,onConfirm:()=>{W.query(`tasks`,e=>e.liveId===n.id).forEach(e=>W.delete(`tasks`,e.id)),W.query(`liveHosts`,e=>e.liveId===n.id).forEach(e=>W.delete(`liveHosts`,e.id)),W.query(`designs`,e=>e.liveId===n.id).forEach(e=>W.delete(`designs`,e.id)),W.delete(`results`,n.id),W.delete(`finances`,n.id),W.delete(`projects`,n.id),J(`프로젝트가 삭제되었습니다.`),M.navigate(`/projects`)}})})},0)}return a(),t}function Dn(e,t){let n=W.getById(`brands`,e.brandId),r=e.brandName||(n?n.name:``),i=e.broadcastDate||``,a=window.open(``,`_blank`,`width=800,height=900`),o=t.items&&t.items.length>0?t.items.map(e=>`
        <tr>
          <td style="padding: 10px; border: 1px solid #000; font-size: 14px;">${e.product||``}</td>
          <td style="padding: 10px; border: 1px solid #000; font-size: 14px; text-align: center;">${e.size||``}</td>
          <td style="padding: 10px; border: 1px solid #000; font-size: 14px; text-align: center;">${e.qty||``}</td>
          <td style="padding: 10px; border: 1px solid #000; font-size: 14px; text-align: center;">${e.method||``}</td>
          <td style="padding: 10px; border: 1px solid #000; font-size: 14px; text-align: center;">${e.collect||``}</td>
        </tr>
      `).join(``):`<tr><td colspan="5" style="padding: 20px; border: 1px solid #000; text-align: center; font-size: 14px; color: #666;">등록된 제품이 없습니다.</td></tr>`;a.document.write(`
    <html>
      <head>
        <title>방송 샘플 요청서 - [${r}]</title>
        <style>
          body { font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; padding: 20px; color: #000; line-height: 1.5; }
          .print-header { border: 2px solid #000; padding: 15px; text-align: center; background: #f0f0f0; margin-bottom: 20px; }
          .print-header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          .info-table th { padding: 10px; border: 1px solid #000; background: #f5f5f5; font-size: 14px; font-weight: 700; width: 130px; text-align: left; }
          .info-table td { padding: 10px; border: 1px solid #000; font-size: 14px; }
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .items-table th { padding: 10px; border: 1px solid #000; background: #e8e8e8; font-size: 14px; font-weight: 700; }
          .notice-box { border: 1px dashed #c00; background: #fff8f8; padding: 12px; font-size: 13px; color: #c00; margin-bottom: 20px; font-weight: 600; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="notice-box">
          * 신선식품은 변질 위험이 있어, 라이브 일정 D-3일전 까지 발송 요청 드립니다.<br>
          * 샘플 발송시, 본 요청서를 택배 상자에 함께 부착 하여 보내주세요.
        </div>
        
        <div class="print-header">
          <h1>방 송 샘 플 요 청 서</h1>
        </div>
        
        <table class="info-table">
          <tr>
            <th>브랜드사</th>
            <td>${r}</td>
            <th>방송 예정일</th>
            <td>${i}</td>
          </tr>
          <tr>
            <th>보내실 곳</th>
            <td colspan="3"><strong>경기도 하남시 미사강변동로 100-1 파라곤스퀘어 2064-2호</strong></td>
          </tr>
          <tr>
            <th>수신자</th>
            <td colspan="3"><strong>채이준PD / 010-3018-9716</strong></td>
          </tr>
          <tr>
            <th>발송 예정일</th>
            <td>${t.deliveryDate||`-`}</td>
            <th>회수지 주소</th>
            <td>${t.returnAddress||`-`}</td>
          </tr>
        </table>
        
        <h3 style="margin-top: 30px; margin-bottom: 10px; font-size: 16px; border-bottom: 2px solid #000; padding-bottom: 6px;">샘플 제품 리스트</h3>
        <table class="items-table">
          <thead>
            <tr>
              <th style="text-align: left;">제품</th>
              <th style="width: 120px;">옵션</th>
              <th style="width: 70px;">수량</th>
              <th style="width: 90px;">취급방법</th>
              <th style="width: 90px;">회수여부</th>
            </tr>
          </thead>
          <tbody>
            ${o}
          </tbody>
        </table>
        
        <div class="no-print" style="margin-top: 40px; text-align: center;">
          <button onclick="window.print();" style="padding: 12px 30px; background: #000; color: #fff; border: none; font-size: 15px; font-weight: 700; cursor: pointer; border-radius: 6px;">인쇄 / 출력하기</button>
        </div>
      </body>
    </html>
  `),a.document.close()}function On(e,t=!1){let n=document.createElement(`div`),r=e.scheme||{liveInfo:{mainProduct:``,brandIntro:``,sellingPoints:``,highlight:``,delivery:``},products:[],events:[],productionDriveUrl:``,sampleRequest:{deliveryDate:``,returnAddress:``,items:[]}};r.liveInfo||={mainProduct:``,brandIntro:``,sellingPoints:``,highlight:``,delivery:``},r.products||=[],r.events||=[],r.productionDriveUrl===void 0&&(r.productionDriveUrl=``),r.sampleRequest||={deliveryDate:``,returnAddress:``,items:[]};function i(){return r.products.length===0?`<tr><td colspan="12" class="text-center" style="padding:var(--space-4); color:var(--text-tertiary);" id="no-products-row">등록된 상품이 없습니다.</td></tr>`:r.products.map((e,t)=>{let n=parseFloat(e.price)||0,r=parseFloat(e.livePrice)||0,i=parseInt(e.targetQty,10)||0,a=n>0?Math.round((n-r)/n*100)+`%`:`0%`,o=r*i;return`
        <tr class="product-row" data-idx="${t}">
          <td><input type="text" class="input prod-prodName" style="width: 160px; padding: 6px 8px; font-size: 13px;" value="${e.prodName||``}" placeholder="상품명"></td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <input type="text" class="input prod-prodUrl" style="width: 110px; padding: 6px 8px; font-size: 13px;" value="${e.prodUrl||``}" placeholder="상품 URL">
              <a href="${e.prodUrl?e.prodUrl.startsWith(`http`)?e.prodUrl:`https://${e.prodUrl}`:`#`}" target="_blank" class="btn-prod-url-link" style="display: ${e.prodUrl?`inline-flex`:`none`}; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; color: var(--primary); background: #eff6ff; transition: all 0.2s; flex-shrink: 0;" title="상품 바로가기">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </td>
          <td><input type="number" class="input prod-stock" style="width: 80px; padding: 6px 8px; font-size: 13px;" value="${e.stock||``}" placeholder="재고"></td>
          <td><input type="text" class="input prod-price" style="width: 95px; padding: 6px 8px; font-size: 13px;" value="${e.price?parseInt(e.price,10).toLocaleString():``}" placeholder="정상가"></td>
          <td><input type="text" class="input prod-livePrice" style="width: 95px; padding: 6px 8px; font-size: 13px;" value="${e.livePrice?parseInt(e.livePrice,10).toLocaleString():``}" placeholder="할인가"></td>
          <td class="prod-discountRate text-center" style="font-size: 13px; font-weight: bold; color: var(--status-error);">${a}</td>
          <td><input type="number" class="input prod-targetQty" style="width: 80px; padding: 6px 8px; font-size: 13px;" value="${e.targetQty||``}" placeholder="목표수"></td>
          <td class="prod-targetSales text-right" style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${o.toLocaleString()}</td>
          <td class="text-center"><button class="btn btn-danger btn-sm btn-delete-prod-row" data-idx="${t}">삭제</button></td>
        </tr>
      `})}function a(){return r.events.length===0?`<tr><td colspan="7" class="text-center" style="padding:var(--space-4); color:var(--text-tertiary);" id="no-events-row">등록된 이벤트 혜택이 없습니다.</td></tr>`:r.events.map((e,t)=>`
      <tr class="event-row" data-idx="${t}">
        <td><input type="text" class="input evt-type" style="padding: 6px 8px; font-size: 13px;" value="${e.type||``}" placeholder="예: 리뷰 이벤트"></td>
        <td><input type="text" class="input evt-cond" style="padding: 6px 8px; font-size: 13px;" value="${e.condition||``}" placeholder="예: 구매 확정 후"></td>
        <td><input type="text" class="input evt-benefit" style="padding: 6px 8px; font-size: 13px;" value="${e.benefit||``}" placeholder="예: 네이버 포인트 지급"></td>
        <td><input type="number" class="input evt-price" style="padding: 6px 8px; font-size: 13px;" value="${e.price||``}" placeholder="단가"></td>
        <td><input type="number" class="input evt-count" style="padding: 6px 8px; font-size: 13px;" value="${e.count||``}" placeholder="명"></td>
        <td><input type="number" class="input evt-budget" style="padding: 6px 8px; font-size: 13px;" value="${e.budget||``}" placeholder="총액"></td>
        <td class="text-center"><button class="btn btn-danger btn-sm btn-delete-evt-row" data-idx="${t}">삭제</button></td>
      </tr>
    `).join(``)}function o(){n.innerHTML=`
      <style>
        .scheme-textarea { width: 100%; height: 100px; padding: 10px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; font-family: sans-serif; resize: vertical; line-height: 1.5; color: var(--text-primary); outline: none; transition: border-color 0.2s; }
        .scheme-textarea:focus { border-color: var(--primary); }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .flex-col { display: flex; flex-direction: column; gap: 14px; }
      </style>
      <div class="flex-col">
        ${t?``:`
        <div style="display:flex; justify-content:flex-end; margin-bottom: 4px;">
          <button class="btn btn-secondary btn-sm" id="btn-copy-scheme-url" style="font-weight:600; font-size:12.5px; padding: 8px 24px; min-width: 140px;">공유 URL 복사</button>
        </div>
        `}

        <!-- 1. 라이브 정보 -->
        <div class="card">
          <div class="card-header">
            <h3>라이브 정보</h3>
          </div>
          <div class="card-body flex-col" style="padding: 20px;">
            <div class="grid-2">
              <div>
                <label class="required" style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">주 메인 제품</label>
                <textarea class="scheme-textarea" id="sch-mainProduct" placeholder="핵심 판매 및 노출 대상 상품을 기재하세요.">${r.liveInfo.mainProduct||``}</textarea>
              </div>
              <div>
                <label class="required" style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">브랜드 소개</label>
                <textarea class="scheme-textarea" id="sch-brandIntro" placeholder="브랜드에 대한 핵심 소개 문구 및 히스토리를 기재하세요.">${r.liveInfo.brandIntro||``}</textarea>
              </div>
            </div>
            <div class="grid-2">
              <div>
                <label class="required" style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">제품 소구포인트</label>
                <textarea class="scheme-textarea" id="sch-sellingPoints" placeholder="방송 진행 시 집중적으로 강조해야 할 강점을 기재하세요.">${r.liveInfo.sellingPoints||``}</textarea>
              </div>
              <div>
                <label class="required" style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">강조 노출 사항</label>
                <textarea class="scheme-textarea" id="sch-highlight" placeholder="라이브 화면 노출 또는 멘트 강조 권장 사항을 기재하세요.">${r.liveInfo.highlight||``}</textarea>
              </div>
            </div>
            <div>
              <label class="required" style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">배송 정보</label>
              <textarea class="scheme-textarea" id="sch-delivery" style="height:80px;" placeholder="예: 배송비 3000원 / 도서산간지역 6000원 N만원 이상 구매시 무료">${r.liveInfo.delivery||``}</textarea>
            </div>
          </div>
        </div>

        <!-- 2. 상품 관리 -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>상품 관리</h3>
            <button class="btn btn-secondary btn-sm" id="btn-add-prod-row">행 추가</button>
          </div>
          <div class="card-body" style="padding: 20px;">
            <div class="table-scroll" style="margin: 0; border: 1px solid var(--border-color); border-radius: 8px;">
              <table class="data-table" style="min-width: 1000px;">
                <thead>
                  <tr>
                    <th style="width: 180px;">상품명</th>
                    <th style="width: 150px;">상품 URL</th>
                    <th style="width: 90px;">재고수량</th>
                    <th style="width: 105px;">정상가</th>
                    <th style="width: 105px;">라이브 할인가</th>
                    <th style="width: 90px; text-align: center;">할인율</th>
                    <th style="width: 90px;">목표수량</th>
                    <th style="width: 120px; text-align: right;">목표 매출</th>
                    <th style="width: 80px; text-align: center;">작업</th>
                  </tr>
                </thead>
                <tbody id="prod-table-body">
                  ${i()}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 3. 이벤트 관리 -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>이벤트 관리</h3>
            <button class="btn btn-secondary btn-sm" id="btn-add-evt-row">행 추가</button>
          </div>
          <div class="card-body" style="padding: 20px;">
            <div class="table-scroll" style="margin: 0; border: 1px solid var(--border-color); border-radius: 8px;">
              <table class="data-table" style="min-width: 800px;">
                <thead>
                  <tr>
                    <th>이벤트 유형</th>
                    <th>조건</th>
                    <th>경품 / 혜택</th>
                    <th>단가</th>
                    <th>당첨인원</th>
                    <th>예산 총액</th>
                    <th style="width:80px; text-align:center;">작업</th>
                  </tr>
                </thead>
                <tbody id="evt-table-body">
                  ${a()}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 4. 제작 자료 업로드 -->
        <div class="card">
          <div class="card-header">
            <h3>제작 자료 업로드</h3>
          </div>
          <div class="card-body" style="padding: 20px;">
            <div style="display:flex; flex-direction:column; gap:8px;">
              <label style="display:block; font-size:12.5px; font-weight:700; color:var(--text-secondary);">공유 폴더 주소 (URL)</label>
              <div style="display:flex; gap:12px; align-items:center;">
                <input type="text" class="input" id="sch-productionDriveUrl" placeholder="https://drive.google.com/... 또는 공유 자료 링크를 입력하세요." value="${r.productionDriveUrl||``}" style="flex:1; padding: 10px 12px; font-size: 13.5px;">
                <a href="${r.productionDriveUrl?r.productionDriveUrl.startsWith(`http`)?r.productionDriveUrl:`https://${r.productionDriveUrl}`:`#`}" target="_blank" class="btn-production-drive-link" style="display: ${r.productionDriveUrl?`inline-flex`:`none`}; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; color: var(--primary); background: #eff6ff; transition: all 0.2s; flex-shrink: 0;" title="공유 폴더 열기">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
              <p style="font-size:12px; color:var(--text-tertiary); margin: 0; line-height: 1.4;">입력된 주소는 브랜드사와 실시간으로 상호 공유하며 직접 접속하여 제작 리소스를 다운로드할 수 있습니다.</p>
            </div>
          </div>
        </div>

        <!-- 5. 방송 샘플 요청서 -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>방송 샘플 요청서</h3>
            <button class="btn btn-secondary btn-sm" id="btn-open-sample-modal" style="font-weight:600; font-size:12.5px; padding:6px 14px;">요청서 작성/확인</button>
          </div>
          <div class="card-body" style="padding: 20px;">
            <p style="font-size:12.5px; color:var(--text-secondary); margin:0; line-height: 1.5;">
              라이브 방송 진행을 위한 샘플 발송 내역과 회수지 정보를 관리합니다. 작성 완료 후 본 요청서를 택배 상자에 함께 부착하여 발송해 주세요.
            </p>
            ${r.sampleRequest&&r.sampleRequest.deliveryDate?`
            <div style="margin-top: 12px; padding: 10px 14px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 12.5px; color: var(--text-primary); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>발송 예정일:</strong> ${r.sampleRequest.deliveryDate} | <strong>등록 제품수:</strong> ${r.sampleRequest.items?r.sampleRequest.items.length:0}개
              </div>
              <div style="display:flex; gap:8px; align-items:center;">
                <button class="btn btn-secondary btn-sm" id="btn-print-sample" style="background:white; border-color:#cbd5e1; color:var(--text-primary); font-weight:600; font-size:12px; padding: 4px 12px;">출력하기</button>
                <span style="font-size: 11px; font-weight: 600; background: #64748b; color: white; padding: 2px 8px; border-radius: 9999px;">작성 완료</span>
              </div>
            </div>
            `:`
            <div style="margin-top: 12px; padding: 10px 14px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 12.5px; color: var(--text-tertiary);">
              아직 작성된 샘플 요청서 내역이 없습니다. 우측 상단의 버튼을 눌러 작성해 주세요.
            </div>
            `}
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; padding:10px 0;">
          <button class="btn btn-primary" id="btn-save-project-scheme" style="padding:12px 36px; font-weight:700; font-size:15px; box-shadow: 0 4px 12px rgba(59,130,246,0.25);">스킴 정보 저장</button>
        </div>
      </div>
    `,t||n.querySelector(`#btn-copy-scheme-url`)?.addEventListener(`click`,()=>{let t=`${window.location.origin}${window.location.pathname}#/shared_scheme/${e.id}`;navigator.clipboard.writeText(t).then(()=>J(`공유 URL이 클립보드에 복사되었습니다.`)).catch(()=>Y(`URL 복사에 실패했습니다.`))}),n.querySelector(`#btn-add-prod-row`).addEventListener(`click`,()=>{s(),r.products.push({prodName:``,prodUrl:``,stock:``,price:``,livePrice:``,targetQty:``,feeRate:``}),o()}),n.querySelectorAll(`.btn-delete-prod-row`).forEach(e=>{e.addEventListener(`click`,()=>{s();let t=parseInt(e.getAttribute(`data-idx`),10);r.products.splice(t,1),o()})});let c=e=>{let t=e.replace(/[^0-9]/g,``);return t?parseInt(t,10).toLocaleString():``},l=e=>parseFloat(e.replace(/,/g,``))||0,u=e=>{let t=l(e.querySelector(`.prod-price`).value),n=l(e.querySelector(`.prod-livePrice`).value),r=parseInt(e.querySelector(`.prod-targetQty`).value,10)||0,i=t>0?Math.round((t-n)/t*100)+`%`:`0%`;e.querySelector(`.prod-discountRate`).textContent=i;let a=n*r;e.querySelector(`.prod-targetSales`).textContent=a.toLocaleString()};n.querySelectorAll(`.product-row`).forEach(e=>{let t=e.querySelector(`.prod-price`),n=e.querySelector(`.prod-livePrice`),r=t=>{t.addEventListener(`input`,t=>{let n=t.target.selectionStart,r=t.target.value.length,i=c(t.target.value);t.target.value=i;let a=i.length;t.target.setSelectionRange(n+(a-r),n+(a-r)),u(e)})};t&&r(t),n&&r(n);let i=e.querySelector(`.prod-prodUrl`);i&&i.addEventListener(`input`,t=>{let n=t.target.value.trim(),r=e.querySelector(`.btn-prod-url-link`);r&&(n?(r.href=n.startsWith(`http`)?n:`https://${n}`,r.style.display=`inline-flex`):(r.href=`#`,r.style.display=`none`))}),e.querySelectorAll(`input`).forEach(r=>{r!==t&&r!==n&&r.addEventListener(`input`,()=>{u(e)})})});let d=n.querySelector(`#sch-productionDriveUrl`);d&&d.addEventListener(`input`,e=>{let t=e.target.value.trim(),r=n.querySelector(`.btn-production-drive-link`);r&&(t?(r.href=t.startsWith(`http`)?t:`https://${t}`,r.style.display=`inline-flex`):(r.href=`#`,r.style.display=`none`))});function f(){let t=JSON.parse(JSON.stringify(r.sampleRequest||{deliveryDate:``,returnAddress:``,items:[]}));t.items||=[];let n=document.createElement(`div`);n.className=`flex-col`,n.style.gap=`16px`;let i=()=>t.items.length===0?`<tr><td colspan="6" style="text-align:center; padding: 20px; color: var(--text-tertiary);">등록된 제품이 없습니다. 우측 상단의 행 추가 버튼을 눌러주세요.</td></tr>`:t.items.map((e,t)=>`
          <tr class="sample-item-row" data-idx="${t}">
            <td><input type="text" class="input sam-product" style="width:100%; padding:6px 8px; font-size:13px;" value="${e.product||``}" placeholder="제품명"></td>
            <td><input type="text" class="input sam-size" style="width:100%; padding:6px 8px; font-size:13px;" value="${e.size||``}" placeholder="옵션"></td>
            <td><input type="number" class="input sam-qty" style="width:100%; padding:6px 8px; font-size:13px;" value="${e.qty||``}" placeholder="수량"></td>
            <td>
              <select class="input sam-method" style="width:100%; padding:6px 8px; font-size:13px; height:32px;">
                <option value="상온" ${e.method===`상온`?`selected`:``}>상온</option>
                <option value="냉장" ${e.method===`냉장`?`selected`:``}>냉장</option>
                <option value="냉동" ${e.method===`냉동`?`selected`:``}>냉동</option>
              </select>
            </td>
            <td>
              <select class="input sam-collect" style="width:100%; padding:6px 8px; font-size:13px; height:32px;">
                <option value="회수" ${e.collect===`회수`?`selected`:``}>회수</option>
                <option value="미회수" ${(e.collect||`미회수`)===`미회수`?`selected`:``}>미회수</option>
              </select>
            </td>
            <td style="text-align:center;"><button class="btn btn-danger btn-sm btn-delete-sample-row" data-idx="${t}" style="padding:4px 8px; font-size:11px;">삭제</button></td>
          </tr>
        `).join(``),a=()=>{n.querySelector(`#sample-table-body`).innerHTML=i(),n.querySelectorAll(`.btn-delete-sample-row`).forEach(e=>{e.addEventListener(`click`,()=>{c();let n=parseInt(e.getAttribute(`data-idx`),10);t.items.splice(n,1),a()})})},c=()=>{let e=n.querySelectorAll(`.sample-item-row`);t.items=Array.from(e).map(e=>({product:e.querySelector(`.sam-product`).value,size:e.querySelector(`.sam-size`).value,qty:e.querySelector(`.sam-qty`).value?parseInt(e.querySelector(`.sam-qty`).value,10):``,method:e.querySelector(`.sam-method`).value,collect:e.querySelector(`.sam-collect`).value}))};n.innerHTML=`
        <div style="background: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #b91c1c; line-height: 1.5; font-weight: 500;">
          <div style="margin-bottom:4px;">* 신선식품은 변질 위험이 있어, 라이브 일정 D-3일전 까지 발송 요청 드립니다.</div>
          <div>* 샘플 발송시, 본 요청서를 택배 상자에 함께 부착 하여 보내주세요.</div>
        </div>
        
        <div class="card" style="border: 1px solid var(--border-color); box-shadow: none; margin: 0;">
          <div class="card-header" style="background:#f8fafc; border-bottom:1px solid var(--border-color); padding: 10px 16px; display:flex; justify-content:space-between; align-items:center;">
            <h4 style="margin:0; font-size: 14px; font-weight: 700; color: var(--text-primary);">제품 요청 리스트</h4>
            <button class="btn btn-secondary btn-sm" id="btn-add-sample-row" style="font-size:12px; padding:4px 10px;">행 추가</button>
          </div>
          <div class="card-body" style="padding: 0; overflow-x: auto;">
            <table class="data-table" style="min-width: 800px; width: 100%; border-collapse: collapse; margin: 0;">
              <thead>
                <tr style="background: #f1f5f9; border-bottom: 1px solid var(--border-color);">
                  <th style="padding: 10px 8px; font-size: 12.5px; text-align: left;">제품</th>
                  <th style="padding: 10px 8px; font-size: 12.5px; text-align: left; width: 120px;">옵션</th>
                  <th style="padding: 10px 8px; font-size: 12.5px; text-align: left; width: 70px;">수량</th>
                  <th style="padding: 10px 8px; font-size: 12.5px; text-align: left; width: 90px;">취급방법</th>
                  <th style="padding: 10px 8px; font-size: 12.5px; text-align: left; width: 90px;">회수여부</th>
                  <th style="padding: 10px 8px; font-size: 12.5px; text-align: center; width: 70px;">작업</th>
                </tr>
              </thead>
              <tbody id="sample-table-body">
                ${i()}
              </tbody>
            </table>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="card" style="border: 1px solid var(--border-color); box-shadow: none; margin: 0; padding: 16px;">
            <h4 style="margin: 0 0 12px 0; font-size: 13.5px; font-weight: 700; color: var(--text-primary);">기본 배송 정보</h4>
            <div class="flex-col" style="gap: 10px;">
              <div>
                <label style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:4px;">샘플 보내주실 곳</label>
                <input type="text" class="input" value="경기도 하남시 미사강변동로 100-1 파라곤스퀘어 2064-2호" readonly style="background:#f1f5f9; font-size:13px; padding: 8px 10px;">
              </div>
              <div>
                <label style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:4px;">수신자</label>
                <input type="text" class="input" value="채이준PD / 010-3018-9716" readonly style="background:#f1f5f9; font-size:13px; padding: 8px 10px;">
              </div>
            </div>
          </div>
          
          <div class="card" style="border: 1px solid var(--border-color); box-shadow: none; margin: 0; padding: 16px;">
            <h4 style="margin: 0 0 12px 0; font-size: 13.5px; font-weight: 700; color: var(--text-primary);">기타 발송 및 회수 정보</h4>
            <div class="flex-col" style="gap: 10px;">
              <div>
                <label style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:4px;">발송 예정일</label>
                <input type="text" class="input" id="sam-deliveryDate" placeholder="예: 2026-08-15 또는 협의필요" value="${t.deliveryDate||``}" style="font-size:13px; padding: 8px 10px;">
              </div>
              <div>
                <label style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:4px;">회수지 주소</label>
                <input type="text" class="input" id="sam-returnAddress" placeholder="샘플 회수를 진행할 주소를 입력해 주세요." value="${t.returnAddress||``}" style="font-size:13px; padding: 8px 10px;">
              </div>
            </div>
          </div>
        </div>
      `,setTimeout(()=>{a(),n.querySelector(`#btn-add-sample-row`).addEventListener(`click`,()=>{c(),t.items.push({product:``,size:``,qty:``,method:`냉장`,collect:`미회수`}),a()})},0);let l=document.createElement(`div`);l.style.display=`flex`,l.style.justifyContent=`flex-end`,l.style.gap=`8px`;let u=document.createElement(`button`);u.className=`btn btn-secondary`,u.textContent=`취소`,u.addEventListener(`click`,q);let d=document.createElement(`button`);d.className=`btn btn-primary`,d.textContent=`적용`,d.addEventListener(`click`,async()=>{c(),t.deliveryDate=n.querySelector(`#sam-deliveryDate`).value.trim(),t.returnAddress=n.querySelector(`#sam-returnAddress`).value.trim(),r.sampleRequest=t,s();try{W.update(`projects`,e.id,{scheme:r}),J(`샘플 요청서가 저장되었습니다.`)}catch(e){console.error(`샘플 요청서 저장 실패:`,e),Y(`샘플 요청서 저장 중 오류가 발생했습니다.`)}q(),o()}),l.appendChild(u),l.appendChild(d),K({title:`방송 샘플 요청서 작성`,size:`lg`,content:n,footer:l})}n.querySelector(`#btn-open-sample-modal`).addEventListener(`click`,f),n.querySelector(`#btn-print-sample`)?.addEventListener(`click`,()=>{Dn(e,r.sampleRequest)}),n.querySelector(`#btn-add-evt-row`).addEventListener(`click`,()=>{s(),r.events.push({type:``,condition:``,benefit:``,price:``,count:``,budget:``}),o()}),n.querySelectorAll(`.btn-delete-evt-row`).forEach(e=>{e.addEventListener(`click`,()=>{s();let t=parseInt(e.getAttribute(`data-idx`),10);r.events.splice(t,1),o()})}),n.querySelector(`#btn-save-project-scheme`).addEventListener(`click`,async()=>{s();let t=n.querySelector(`#btn-save-project-scheme`);t.disabled=!0,t.textContent=`저장 중...`;try{W.update(`projects`,e.id,{scheme:r}),J(`스킴 정보가 정상적으로 저장되었습니다.`)}catch(e){console.error(`스킴 저장 실패:`,e),Y(`스킴 저장 중 오류가 발생했습니다.`)}finally{t.disabled=!1,t.textContent=`스킴 정보 저장`}})}function s(){r.liveInfo.mainProduct=n.querySelector(`#sch-mainProduct`).value,r.liveInfo.brandIntro=n.querySelector(`#sch-brandIntro`).value,r.liveInfo.sellingPoints=n.querySelector(`#sch-sellingPoints`).value,r.liveInfo.highlight=n.querySelector(`#sch-highlight`).value,r.liveInfo.delivery=n.querySelector(`#sch-delivery`).value;let e=n.querySelectorAll(`.product-row`);r.products=Array.from(e).map(e=>{let t=e.querySelector(`.prod-price`).value.replace(/,/g,``),n=e.querySelector(`.prod-livePrice`).value.replace(/,/g,``);return{prodName:e.querySelector(`.prod-prodName`).value,prodUrl:e.querySelector(`.prod-prodUrl`).value,stock:e.querySelector(`.prod-stock`).value?parseInt(e.querySelector(`.prod-stock`).value,10):``,price:t?parseFloat(t):``,livePrice:n?parseFloat(n):``,targetQty:e.querySelector(`.prod-targetQty`).value?parseInt(e.querySelector(`.prod-targetQty`).value,10):``}});let t=n.querySelectorAll(`.event-row`);r.events=Array.from(t).map(e=>({type:e.querySelector(`.evt-type`).value,condition:e.querySelector(`.evt-cond`).value,benefit:e.querySelector(`.evt-benefit`).value,price:e.querySelector(`.evt-price`).value?parseFloat(e.querySelector(`.evt-price`).value):``,count:e.querySelector(`.evt-count`).value?parseInt(e.querySelector(`.evt-count`).value,10):``,budget:e.querySelector(`.evt-budget`).value?parseFloat(e.querySelector(`.evt-budget`).value):``})),r.productionDriveUrl=n.querySelector(`#sch-productionDriveUrl`).value.trim()}return o(),n}function kn(e){let t=document.createElement(`div`);t.style.padding=`var(--space-8)`,t.style.maxWidth=`1200px`,t.style.margin=`0 auto`;function n(){let n=W.getById(`projects`,e.id);if(!n){t.innerHTML=`
        <div style="text-align:center; padding: 100px 20px;">
          <h2 style="color:var(--text-secondary); margin-bottom: 20px;">프로젝트 정보를 찾을 수 없습니다.</h2>
          <p style="color:var(--text-tertiary);">올바르지 않은 공유 주소이거나 삭제된 프로젝트입니다.</p>
        </div>
      `;return}let r=W.getById(`brands`,n.brandId),i=`[${n.brandName||(r?r.name:``)}] 라이브 스킴 _ ${n.broadcastDate||``}`,a=W.query(`liveHosts`,e=>e.liveId===n.id).map(e=>{let t=W.getById(`hosts`,e.hostId);return t?t.name:``}).filter(Boolean).join(`, `)||`-`;t.innerHTML=`
      <div class="page-header" style="margin-bottom: 24px; padding: 24px 32px; background: #000000; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 20px rgba(0,0,0,0.08); color: #ffffff; gap: 24px; flex-wrap: wrap;">
        <div class="page-header-left" style="flex: 1; min-width: 280px;">
          <div>
            <h1 class="page-title" style="font-size: 22px; color: #ffffff; font-weight: 700; margin: 0; letter-spacing: -0.5px;">${i}</h1>
            <p class="page-description" style="margin-top: 6px; margin-bottom: 0; color: #94a3b8; font-size: 13px;">브랜드사 공유 전용 기재 페이지입니다. 내용을 작성하고 저장 버튼을 눌러주세요.</p>
          </div>
        </div>
        <div class="page-header-right" style="text-align: left; display: flex; flex-direction: column; gap: 6px; align-items: flex-start; background: rgba(255,255,255,0.06); padding: 12px 18px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); min-width: 220px; flex-shrink: 0;">
          <div style="font-size: 13px; color: #f1f5f9; font-weight: 500; display: flex; align-items: center;">
            <span style="color: #94a3b8; margin-right: 6px; font-weight: 600; width: 60px; display: inline-block;">담당 PD</span>
            <span style="color: #ffffff;">${n.pd||`-`}</span>
          </div>
          <div style="font-size: 13px; color: #f1f5f9; font-weight: 500; display: flex; align-items: center;">
            <span style="color: #94a3b8; margin-right: 6px; font-weight: 600; width: 60px; display: inline-block;">쇼호스트</span>
            <span style="color: #ffffff;">${a}</span>
          </div>
        </div>
      </div>
      <div id="shared-scheme-content"></div>
    `,t.querySelector(`#shared-scheme-content`).appendChild(On(n,!0))}return n(),t}function An(e,t){let n=document.createElement(`div`);return n.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>기본 정보</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-info">수정</button>
      </div>
      <div class="card-body">
        <div class="detail-grid">
          <div class="detail-field"><span class="detail-field-label">브랜드</span><span class="detail-field-value">${e.brandName||(t?t.name:`-`)}</span></div>
          <div class="detail-field"><span class="detail-field-label">진행월</span><span class="detail-field-value">${e.broadcastMonth||`-`}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송일</span><span class="detail-field-value">${et(e.broadcastDate)}</span></div>
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
          ${N.map(t=>`
            <button class="btn ${e.broadcastStatus===t.key?`btn-primary`:`btn-secondary`} btn-sm status-change-btn" data-status="${t.key}" style="font-size: 11px; padding: var(--space-1); line-height: 1.2;">
              ${t.label}${Cn(e.broadcastDate,t.key)}
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
            ${P.map(t=>`
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
  `,setTimeout(()=>{n.querySelector(`#btn-edit-info`)?.addEventListener(`click`,()=>{jn(e)}),n.querySelectorAll(`.status-change-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-status`);W.update(`projects`,e.id,{broadcastStatus:n}),J(`방송 상태가 "${L(n)}"(으)로 변경되었습니다.`),M.navigate(`/projects/${e.id}`)})}),n.querySelectorAll(`.settle-status-change-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-status`);W.update(`projects`,e.id,{settleStatus:n}),J(`정산 상태가 "${R(n)}"(으)로 변경되었습니다.`),M.navigate(`/projects/${e.id}`)})}),n.querySelector(`.tax-invoice-btn`)?.addEventListener(`click`,()=>{if(!t){Y(`등록된 브랜드 정보가 없어 세금계산서 상태를 변경할 수 없습니다.`);return}let n=!t.taxInvoice;W.update(`brands`,t.id,{taxInvoice:n}),J(`세금계산서 상태가 "${n?`발행완료`:`미발행`}"(으)로 변경되었습니다.`),M.navigate(`/projects/${e.id}`)})},0),n}function jn(e){let t=W.getAll(`brands`),n=`
    <div class="form-grid">
      <div class="input-group">
        <label>방송 제목(브랜드)</label>
        <input type="text" class="input" id="edit-brandName" list="brand-list" value="${e.brandName||t.find(t=>t.id===e.brandId)?.name||``}">
        <datalist id="brand-list">${t.map(e=>`<option value="${e.name}">`).join(``)}</datalist>
      </div>
      <div class="input-group">
        <label>카테고리</label>
        <select class="input" id="edit-category">${re.map(t=>`<option value="${t}" ${e.category===t?`selected`:``}>${t}</option>`).join(``)}</select>
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
        <select class="input" id="edit-platform"><option value="">선택</option>${ee.map(t=>`<option value="${t}" ${e.platform===t?`selected`:``}>${t}</option>`).join(``)}</select>
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
  `,r=document.createElement(`div`);r.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let i=document.createElement(`button`);i.className=`btn btn-secondary`,i.textContent=`취소`,i.addEventListener(`click`,q);let a=document.createElement(`button`);a.className=`btn btn-primary`,a.textContent=`저장`,a.addEventListener(`click`,()=>{let n=document.getElementById(`edit-date`).value,r=document.getElementById(`edit-brandName`).value.trim(),i=t.find(e=>e.name===r),a=i?i.id:`b_`+r;W.update(`projects`,e.id,{brandId:a,brandName:r,category:document.getElementById(`edit-category`).value,broadcastDate:n,broadcastMonth:n?n.substring(0,7):``,broadcastTime:document.getElementById(`edit-time`).value,platform:document.getElementById(`edit-platform`).value,liveUrl:document.getElementById(`edit-url`).value.trim(),pd:document.getElementById(`edit-pd`).value.trim(),designer:document.getElementById(`edit-designer`).value.trim(),cuesheetLink:document.getElementById(`edit-cuesheet`).value.trim(),note:document.getElementById(`edit-note`).value.trim()}),q(),J(`기본 정보가 수정되었습니다.`),M.navigate(`/projects/${e.id}`)}),r.appendChild(i),r.appendChild(a),K({title:`기본 정보 수정`,size:`lg`,content:n,footer:r})}function Mn(e){let t=document.createElement(`div`),n=W.query(`liveHosts`,t=>t.liveId===e.id);return W.getAll(`hosts`),t.innerHTML=`
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
            ${n.length>0?n.map(e=>{let t=W.getById(`hosts`,e.hostId);return`
                <tr>
                  <td>${t?t.name:`-`}</td>
                  <td>${ie.find(t=>t.key===e.role)?.label||`-`}</td>
                  <td class="text-right">${e.brandPays?`<span class="badge" style="background: var(--bg-secondary); color: var(--text-tertiary); margin-right: 4px;">브랜드 부담</span><span style="text-decoration: line-through; color: var(--text-tertiary);">${G(e.fee)}</span>`:G(e.fee)}</td>
                  <td>${it(e.settleStatus)}</td>
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
  `,setTimeout(()=>{t.querySelector(`#btn-add-host-match`)?.addEventListener(`click`,()=>{Nn(e.id,null,()=>{let n=Mn(e);t.replaceWith(n)})}),t.querySelectorAll(`.btn-edit-match`).forEach(n=>{n.addEventListener(`click`,()=>{Nn(e.id,n.getAttribute(`data-id`),()=>{let n=Mn(e);t.replaceWith(n)})})})},0),t}function Nn(e,t,n){let r=!!t,i=r?W.getById(`liveHosts`,t):{},a=W.getAll(`hosts`),o=`
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
          ${ie.map(e=>`<option value="${e.key}" ${i.role===e.key?`selected`:``}>${e.label}</option>`).join(``)}
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
  `,s=document.createElement(`div`);if(s.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,r){let e=document.createElement(`button`);e.className=`btn btn-danger`,e.textContent=`삭제`,e.style.marginRight=`auto`,e.addEventListener(`click`,()=>{W.delete(`liveHosts`,t),q(),J(`삭제되었습니다.`),n&&n()}),s.appendChild(e)}let c=document.createElement(`button`);c.className=`btn btn-secondary`,c.textContent=`취소`,c.addEventListener(`click`,q);let l=document.createElement(`button`);l.className=`btn btn-primary`,l.textContent=r?`수정`:`추가`,l.addEventListener(`click`,()=>{let i=document.getElementById(`match-host`).value;if(!i){Y(`쇼호스트를 선택해주세요.`);return}let a={liveId:e,hostId:i,role:document.getElementById(`match-role`).value,fee:parseInt(document.getElementById(`match-fee`).value)||0,settleStatus:document.getElementById(`match-settle`).value,memo:document.getElementById(`match-memo`).value.trim(),brandPays:document.getElementById(`match-brand-pays`).checked};r?(W.update(`liveHosts`,t,a),J(`수정되었습니다.`)):(a.id=I(`lh`),W.create(`liveHosts`,a),J(`쇼호스트가 매칭되었습니다.`)),q(),n&&n()}),s.appendChild(c),s.appendChild(l),K({title:r?`쇼호스트 매칭 수정`:`쇼호스트 추가`,size:`md`,content:o,footer:s}),setTimeout(()=>{let e=document.getElementById(`match-host-search`),t=document.getElementById(`match-host`),n=document.getElementById(`match-host-dropdown`),r=r=>{let i=a.filter(e=>e.name.toLowerCase().includes(r));if(i.length===0){n.innerHTML=`<div style="padding: 8px 12px; color: var(--text-tertiary); font-size: var(--text-sm);">검색 결과가 없습니다.</div>`;return}n.innerHTML=i.map(e=>`<div class="dropdown-item" data-id="${e.id}" data-name="${e.name}" style="padding: 8px 12px; cursor: pointer; font-size: var(--text-sm); border-bottom: 1px solid var(--border-light); transition: background var(--transition-fast);">
          ${e.name}
        </div>`).join(``),n.querySelectorAll(`.dropdown-item`).forEach(r=>{r.addEventListener(`click`,()=>{e.value=r.getAttribute(`data-name`),t.value=r.getAttribute(`data-id`),n.style.display=`none`}),r.addEventListener(`mouseenter`,()=>r.style.background=`var(--bg-hover)`),r.addEventListener(`mouseleave`,()=>r.style.background=`transparent`)})};e&&n&&(e.addEventListener(`focus`,()=>{n.style.display=`block`,r(e.value.toLowerCase())}),e.addEventListener(`input`,e=>{n.style.display=`block`,t.value=``,r(e.target.value.toLowerCase())}),document.addEventListener(`click`,r=>{!e.contains(r.target)&&!n.contains(r.target)&&(n.style.display=`none`,t.value||(e.value=``))}))},0)}function Pn(e){let t=document.createElement(`div`),n=W.query(`designs`,t=>t.liveId===e.id),{renderDesignBadge:r}=Fn();return t.innerHTML=`
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
                <td>${et(e.requestDate)}</td>
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
  `,setTimeout(()=>{t.querySelector(`#btn-add-design`)?.addEventListener(`click`,()=>{In(e.id,null,()=>{let n=Pn(e);t.replaceWith(n)})}),t.querySelectorAll(`.btn-edit-design`).forEach(n=>{n.addEventListener(`click`,()=>{In(e.id,n.getAttribute(`data-id`),()=>{let n=Pn(e);t.replaceWith(n)})})})},0),t}function Fn(){return{renderDesignBadge:e=>`<span class="badge ${{requested:`badge-default`,working:`badge-warning`,reviewing:`badge-warning`,done:`badge-success`}[e]||`badge-default`}">${{requested:`요청`,working:`작업중`,reviewing:`검수중`,done:`완료`}[e]||e}</span>`}}function In(e,t,n){let r=!!t,i=r?W.getById(`designs`,t):{},a=`
    <div class="form-grid">
      <div class="input-group"><label>요청일</label><input class="input" type="date" id="design-date" value="${i.requestDate||new Date().toISOString().split(`T`)[0]}"></div>
      <div class="input-group"><label>담당 디자이너</label><input class="input" id="design-designer" value="${i.designer||``}" placeholder="디자이너"></div>
      <div class="input-group"><label>상태</label><select class="input" id="design-status">${ae.map(e=>`<option value="${e.key}" ${i.status===e.key?`selected`:``}>${e.label}</option>`).join(``)}</select></div>
      <div class="input-group"><label>작업 링크</label><input class="input" id="design-work" value="${i.workLink||``}"></div>
      <div class="input-group"><label>파일 링크</label><input class="input" id="design-file" value="${i.fileLink||``}"></div>
      <div class="input-group"><label>메모</label><input class="input" id="design-memo" value="${i.memo||``}"></div>
    </div>
  `,o=document.createElement(`div`);if(o.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,r){let e=document.createElement(`button`);e.className=`btn btn-danger`,e.textContent=`삭제`,e.style.marginRight=`auto`,e.addEventListener(`click`,()=>{W.delete(`designs`,t),q(),J(`삭제되었습니다.`),n&&n()}),o.appendChild(e)}let s=document.createElement(`button`);s.className=`btn btn-secondary`,s.textContent=`취소`,s.addEventListener(`click`,q);let c=document.createElement(`button`);c.className=`btn btn-primary`,c.textContent=r?`수정`:`등록`,c.addEventListener(`click`,()=>{let i={liveId:e,requestDate:document.getElementById(`design-date`).value,designer:document.getElementById(`design-designer`).value.trim(),status:document.getElementById(`design-status`).value,workLink:document.getElementById(`design-work`).value.trim(),fileLink:document.getElementById(`design-file`).value.trim(),memo:document.getElementById(`design-memo`).value.trim()};r?(W.update(`designs`,t,i),J(`수정되었습니다.`)):(i.id=I(`design`),W.create(`designs`,i),J(`디자인 요청이 등록되었습니다.`)),q(),n&&n()}),o.appendChild(s),o.appendChild(c),K({title:r?`디자인 요청 수정`:`디자인 요청 추가`,size:`md`,content:a,footer:o})}function Ln(e){let t=W.getCurrentRole()===`pd`,n=document.createElement(`div`),r=W.getAll(`results`).find(t=>t.liveId===e.id)||{};return n.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>방송 성과</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-result">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-label">시청뷰</div><div class="stat-value">${$e(r.views)}</div></div>
          <div class="stat-card"><div class="stat-label">좋아요</div><div class="stat-value">${$e(r.likes)}</div></div>
          <div class="stat-card"><div class="stat-label">주문건수</div><div class="stat-value">${$e(r.orders)}건</div></div>
          <div class="stat-card"><div class="stat-label">라이브 매출</div><div class="stat-value">${t?`**`:G(r.liveRevenue)}</div></div>
          <div class="stat-card"><div class="stat-label">ROI</div><div class="stat-value">${t?`**`:tt(r.roi)}</div></div>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{n.querySelector(`#btn-edit-result`)?.addEventListener(`click`,()=>{let t=`
        <div class="form-grid">
          <div class="input-group"><label>시청뷰</label><input class="input" type="number" id="res-views" value="${r.views||``}"></div>
          <div class="input-group"><label>좋아요</label><input class="input" type="number" id="res-likes" value="${r.likes||``}"></div>
          <div class="input-group"><label>주문건수</label><input class="input" type="number" id="res-orders" value="${r.orders||``}"></div>
          <div class="input-group"><label>라이브 매출</label><input class="input" type="number" id="res-revenue" value="${r.liveRevenue||``}"></div>
        </div>
      `,i=document.createElement(`div`);i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,q);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=`저장`,o.addEventListener(`click`,()=>{let t=parseInt(document.getElementById(`res-revenue`).value)||0,r=W.getAll(`finances`).find(t=>t.liveId===e.id),i=r?r.adCost+r.productionCost+r.hostCost+r.otherCost:0,a=i>0?Math.round(t/i*100)/100:0,o={liveId:e.id,views:parseInt(document.getElementById(`res-views`).value)||0,likes:parseInt(document.getElementById(`res-likes`).value)||0,orders:parseInt(document.getElementById(`res-orders`).value)||0,liveRevenue:t,roi:a},s=W.getAll(`results`).find(t=>t.liveId===e.id);s?W.update(`results`,s.id,o):(o.id=e.id,W.create(`results`,o)),q(),J(`성과가 저장되었습니다.`);let c=Ln(e);n.replaceWith(c)}),i.appendChild(a),i.appendChild(o),K({title:`방송 성과 수정`,size:`md`,content:t,footer:i})})},0),n}function Rn(e){let t=document.createElement(`div`),n=W.getAll(`finances`).find(t=>t.liveId===e.id)||{},r=W.query(`liveHosts`,t=>t.liveId===e.id).reduce((e,t)=>e+(t.fee||0),0),i=n.productionCost||0,a=n.adCost||0,o=n.otherCost||0,s=!!n.includeHostCost,c=!!n.brandPaysHost,l=c?0:r,u=c||s?i+a:i+r+a,d=u-(l+a+o),f=Math.round(u*.1),p=d-f;return t.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>매출 및 정산</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-finance">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid" style="margin-bottom: var(--space-6);">
          <div class="stat-card">
            <div class="stat-label">
              제작비 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">${s?`(쇼호스트비 포함)`:`(쇼호스트비 별도)`}</span>
            </div>
            <div class="stat-value">${G(i)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">
              쇼호스트비 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">${c?`(브랜드사 직접 부담)`:`(대행사 정산)`}</span>
            </div>
            <div class="stat-value">${G(r)}</div>
          </div>
          <div class="stat-card"><div class="stat-label">광고비</div><div class="stat-value">${G(a)}</div></div>
          <div class="stat-card"><div class="stat-label">기타비용</div><div class="stat-value">${G(o)}</div></div>
        </div>
        <div style="border-top: 1px solid var(--border-light); padding-top: var(--space-5);">
          <div class="stats-grid">
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업매출액</div>
              <div class="stat-value">${G(u)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업이익</div>
              <div class="stat-value" style="color: ${d>=0?`var(--status-success)`:`var(--status-error)`};">${G(d)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">순마진 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">(VAT 차감 후)</span></div>
              <div class="stat-value" style="color: ${p>=0?`var(--status-success)`:`var(--status-error)`};">
                ${G(p)}
                <span style="font-size: 13px; font-weight: 600; margin-left: 4px;">(${u?(p/u*100).toFixed(1):0}%)</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-label">부가가치세 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">(VAT 10%)</span></div>
              <div class="stat-value">${G(f)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{t.querySelector(`#btn-edit-finance`)?.addEventListener(`click`,()=>{let i=`
        <div class="form-grid">
          <div class="input-group"><label>제작비</label><input class="input" type="number" id="fin-prod" value="${n.productionCost||``}" placeholder="0"></div>
          <div class="input-group"><label>광고비</label><input class="input" type="number" id="fin-ad" value="${n.adCost||``}" placeholder="0"></div>
          <div class="input-group"><label>기타비용</label><input class="input" type="number" id="fin-other" value="${n.otherCost||``}" placeholder="0"></div>
        </div>
        <div style="margin-top: var(--space-3); margin-bottom: var(--space-3); display: flex; flex-direction: column; gap: 8px;">
          <label style="display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; cursor: pointer; user-select: none;">
            <input type="checkbox" id="fin-brand-pays-host" ${c?`checked`:``} style="width: 16px; height: 16px; cursor: pointer;">
            브랜드사 쇼호스트비 직접 부담 (대행사 매출/지출 제외)
          </label>
          <label style="display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; cursor: pointer; user-select: none;">
            <input type="checkbox" id="fin-include-host" ${s?`checked`:``} style="width: 16px; height: 16px; cursor: pointer;">
            총제작비에 쇼호스트비 포함
          </label>
        </div>
        <div style="margin-top: var(--space-4); padding: var(--space-4); background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-light);">
          <div style="font-weight: 600; margin-bottom: 8px; font-size: 13px; color: var(--text-primary); display: flex; justify-content: space-between;">
            <span>실시간 계산 미리보기</span>
            <span style="font-weight: normal; color: var(--text-tertiary); font-size: 12px;">쇼호스트비: ${G(r)}</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
            <div>영업매출액: <strong id="prev-sales" style="color: var(--text-primary);">-</strong></div>
            <div>영업이익: <strong id="prev-profit" style="color: var(--text-primary);">-</strong></div>
            <div>부가가치세 (10%): <strong id="prev-vat" style="color: var(--text-primary);">-</strong></div>
            <div>순마진: <strong id="prev-margin" style="color: var(--text-primary);">-</strong></div>
          </div>
        </div>
      `,a=document.createElement(`div`);a.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let o=document.createElement(`button`);o.className=`btn btn-secondary`,o.textContent=`취소`,o.addEventListener(`click`,q);let l=document.createElement(`button`);l.className=`btn btn-primary`,l.textContent=`저장`,l.addEventListener(`click`,()=>{let n=parseInt(document.getElementById(`fin-ad`).value)||0,i=parseInt(document.getElementById(`fin-prod`).value)||0,a=parseInt(document.getElementById(`fin-other`).value)||0,o=document.getElementById(`fin-include-host`).checked,s=document.getElementById(`fin-brand-pays-host`).checked,c=s?0:r,l=s||o?i+n:i+r+n,u=l-c-n-a,d=Math.round(l*.1),f=u-d,p={liveId:e.id,adCost:n,productionCost:i,otherCost:a,includeHostCost:o,brandPaysHost:s,salesRevenue:l,operatingProfit:u,vat:d,netMargin:f},m=W.getAll(`finances`).find(t=>t.liveId===e.id);m?W.update(`finances`,m.id,p):(p.id=e.id,W.create(`finances`,p)),q(),J(`정산 정보가 저장되었습니다.`);let h=Rn(e);t.replaceWith(h)}),a.appendChild(o),a.appendChild(l),K({title:`정산 정보 수정`,size:`md`,content:i,footer:a}),setTimeout(()=>{let e=document.getElementById(`fin-prod`),t=document.getElementById(`fin-ad`),n=document.getElementById(`fin-other`),i=document.getElementById(`fin-include-host`),a=document.getElementById(`fin-brand-pays-host`),o=()=>{let o=parseInt(e?.value)||0,s=parseInt(t?.value)||0,c=parseInt(n?.value)||0,l=i?i.checked:!1,u=a?a.checked:!1,d=u?0:r,f=u||l?o+s:o+r+s,p=f-d-s-c,m=Math.round(f*.1),h=p-m,g=f?(h/f*100).toFixed(1):`0.0`,_=document.getElementById(`prev-sales`),v=document.getElementById(`prev-profit`),y=document.getElementById(`prev-vat`),b=document.getElementById(`prev-margin`);_&&(_.textContent=G(f)),v&&(v.textContent=G(p),v.style.color=p>=0?`var(--status-success)`:`var(--status-error)`),y&&(y.textContent=G(m)),b&&(b.textContent=`${G(h)} (${g}%)`,b.style.color=h>=0?`var(--status-success)`:`var(--status-error)`)};e?.addEventListener(`input`,o),t?.addEventListener(`input`,o),n?.addEventListener(`input`,o),i?.addEventListener(`change`,o),a?.addEventListener(`change`,o),o()},0)})},0),t}function zn(){let e=document.createElement(`div`),t=``;function n(){let r=W.getAll(`projects`),i=W.getAll(`finances`),a=W.getAll(`results`),o=[...new Set(r.map(e=>{let t=e.broadcastMonth;if(e.broadcastDate){let n=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(n.getTime())||(t=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`)}return t&&!t.includes(`-`)&&t.length<=2&&(t=`2026-${String(t).padStart(2,`0`)}`),t}).filter(Boolean))].sort().reverse(),s=r,c=a;if(t){s=r.filter(e=>{let n=e.broadcastMonth;if(e.broadcastDate){let t=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(t.getTime())||(n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`)}return n&&!n.includes(`-`)&&n.length<=2&&(n=`2026-${String(n).padStart(2,`0`)}`),n===t});let e=s.map(e=>e.id);i.filter(t=>e.includes(t.liveId)),c=a.filter(t=>e.includes(t.liveId))}let l=e=>{let t=i.find(t=>t.liveId===e.id)||{},n=W.query(`liveHosts`,t=>t.liveId===e.id).reduce((e,t)=>e+(t.fee||0),0),r=parseInt(t.productionCost)||0,a=parseInt(t.adCost)||0,o=parseInt(t.otherCost)||0,s=!!t.includeHostCost,c=!!t.brandPaysHost,l=c?0:n,u=c||s?r+a:r+n+a,d=u-(l+a+o),f=Math.round(u*.1);return{productionCost:r,hostCost:n,adCost:a,otherCost:o,salesRevenue:u,operatingProfit:d,vat:f,netMargin:d-f}},u=0,d=0,f=0,p=0,m=0,h=0,g={};s.forEach(e=>{let t=e.broadcastMonth;if(e.broadcastDate){let n=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(n.getTime())||(t=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`)}if(!t&&e.date){let n=new Date(e.date.replace(/\./g,`-`));isNaN(n.getTime())||(t=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`)}t||=`2026-05`,!t.includes(`-`)&&t.length<=2&&(t=`2026-${String(t).padStart(2,`0`)}`),g[t]||(g[t]={month:t,revenue:0,profit:0,margin:0,count:0}),g[t].count++;let n=l(e);g[t].revenue+=n.salesRevenue,g[t].profit+=n.operatingProfit,g[t].margin+=n.netMargin,u+=n.salesRevenue,d+=n.operatingProfit,f+=n.netMargin,p+=n.adCost,m+=n.productionCost,h+=n.hostCost});let _=Object.values(g).sort((e,t)=>t.month.localeCompare(e.month)),v={};s.forEach(e=>{let t=W.getById(`brands`,e.brandId);if(!t)return;v[t.id]||(v[t.id]={name:t.name,revenue:0,count:0}),v[t.id].count++;let n=c.find(t=>t.liveId===e.id);n&&(v[t.id].revenue+=parseInt(n.liveRevenue)||0)});let y=Object.values(v).sort((e,t)=>t.revenue-e.revenue),b={};W.getAll(`liveHosts`).forEach(e=>{if(t&&!s.some(t=>t.id===e.liveId))return;let n=W.getById(`hosts`,e.hostId);if(!n)return;b[n.id]||(b[n.id]={name:n.name,revenue:0,count:0,fee:0}),b[n.id].count++,b[n.id].fee+=parseInt(e.fee)||0;let r=c.find(t=>t.liveId===e.liveId);r&&(b[n.id].revenue+=parseInt(r.liveRevenue)||0)});let x=Object.values(b).sort((e,t)=>t.revenue-e.revenue),S=s.filter(e=>e.status===`settle_wait`).length,C=s.filter(e=>e.status===`settle_done`).length;e.innerHTML=`
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
          <div class="stat-card"><div class="stat-label">총 영업매출</div><div class="stat-value">${Qe(u)}</div></div>
          <div class="stat-card"><div class="stat-label">총 영업이익</div><div class="stat-value" style="color: ${d>=0?`var(--status-success)`:`var(--status-error)`};">${Qe(d)}</div></div>
          <div class="stat-card"><div class="stat-label">총 순마진 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">(VAT 차감 후)</span></div><div class="stat-value" style="color: ${f>=0?`var(--status-success)`:`var(--status-error)`};">${Qe(f)}</div></div>
          <div class="stat-card"><div class="stat-label">총 광고비</div><div class="stat-value">${Qe(p)}</div></div>
          <div class="stat-card"><div class="stat-label">총 제작비</div><div class="stat-value">${Qe(m)}</div></div>
          <div class="stat-card"><div class="stat-label">총 쇼호스트비</div><div class="stat-value">${Qe(h)}</div></div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-6);">
          <!-- 월별 손익 -->
          <div class="card">
            <div class="card-header"><h3>월별 손익</h3></div>
            <div class="table-scroll">
              <table class="data-table">
                <thead><tr><th>월</th><th class="text-right">방송수</th><th class="text-right">영업매출</th><th class="text-right">영업이익</th><th class="text-right">순마진</th></tr></thead>
                <tbody>
                  ${_.length>0?_.map(e=>`
                    <tr>
                      <td style="font-weight: var(--weight-medium);">${e.month}</td>
                      <td class="text-right">${e.count}건</td>
                      <td class="text-right">${Qe(e.revenue)}</td>
                      <td class="text-right" style="color: ${e.profit>=0?`var(--status-success)`:`var(--status-error)`};">${Qe(e.profit)}</td>
                      <td class="text-right" style="color: ${e.margin>=0?`var(--status-success)`:`var(--status-error)`};">${Qe(e.margin)}</td>
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
                      <tr><td><span style="color: var(--text-tertiary); margin-right: var(--space-2);">${t+1}</span> ${e.name}</td><td class="text-right">${e.count}회</td><td class="text-right">${Qe(e.revenue)}</td></tr>
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
                  <tr><td><span style="color: var(--text-tertiary); margin-right: var(--space-2);">${t+1}</span> ${e.name}</td><td class="text-right">${e.count}회</td><td class="text-right">${Qe(e.revenue)}</td><td class="text-right">${G(e.fee)}</td></tr>
                `).join(``)||`<tr><td colspan="4" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">데이터 없음</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;let w=e.querySelector(`#finance-month-filter`);w&&w.addEventListener(`change`,e=>{t=e.target.value,n()})}return n(),e}function Bn(e,t={}){if(!e||typeof e!=`string`)return[];let n=t.paymentDate||new Date().toISOString().split(`T`)[0],r=t.groupByRecipient!==!1,i=e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>0);if(i.length===0)return[];let a=i[0],o=`	`;o=a.includes(`	`)?`	`:a.includes(`,`)?`,`:a.includes(`;`)?`;`:/\s+/;let s=[];for(let e=0;e<i.length;e++){let t=i[e],r=[];if(r=o instanceof RegExp?t.split(o):t.split(o).map(e=>e.trim().replace(/^["']|["']$/g,``)),r.length<2||r.some(e=>[`성명`,`이름`,`방송일`,`시작시간`,`종료시간`,`업무상세`,`총 지급액`,`지급액`,`금액`].includes(e.replace(/\s+/g,``))))continue;let a=r[0]||`미지정`,c=r[1]||``;r[2],r[3];let l=r[4]||``,u=r[5]||`0`;if(isNaN(parseInt(u.replace(/[^0-9]/g,``),10))&&r.length>2){let e=r.find((e,t)=>t>0&&/[\d,]+/.test(e)&&!e.includes(`-`)&&!e.includes(`:`));e&&(u=e)}let d=parseInt(u.replace(/[^0-9]/g,``),10)||0,f=Math.floor(d*.033),p=d-f;s.push({id:`item-${e}-${Math.random().toString(36).substr(2,5)}`,name:a,date:c,month:c.slice(0,7)||n.slice(0,7),detail:l,amount:d,tax:f,netAmount:p})}if(s.length===0)return[];if(!r){let e=s.reduce((e,t)=>e+t.amount,0),t=s.reduce((e,t)=>e+t.tax,0),r=e-t;return[{id:`STMT-${Date.now().toString(36)}`,paymentDate:n,recipientName:s[0]?.name||`쇼호스트`,company:{name:`라이진`,bizNo:`821-29-01197`,ceo:`채이준`,email:`choijun@ryzincorp.com`},items:s,totals:{amount:e,tax:t,netAmount:r}}]}let c={};s.forEach(e=>{let t=`${e.name}__${e.month}`;c[t]||(c[t]={name:e.name,month:e.month,items:[]}),c[t].items.push(e)});let l=Object.values(c).map((e,t)=>{let{name:r,month:i,items:a}=e,o=a.reduce((e,t)=>e+t.amount,0),s=a.reduce((e,t)=>e+t.tax,0),c=o-s,l=n;return{id:`STMT-${Date.now().toString(36)}-${t}`,paymentDate:l,month:i,recipientName:r,company:{name:`라이진`,bizNo:`821-29-01197`,ceo:`채이준`,email:`choijun@ryzincorp.com`},items:a,totals:{amount:o,tax:s,netAmount:c}}});return l.sort((e,t)=>e.month===t.month?e.recipientName.localeCompare(t.recipientName,`ko`):e.month.localeCompare(t.month)),l}function Vn(e){try{let t={n:e.recipientName||``,b:e.birthDate||``,ph:e.phone||``,p:e.paymentDate||``,i:(e.items||[]).map(e=>[e.date||``,e.detail||``,e.amount||0])},n=JSON.stringify(t);return btoa(encodeURIComponent(n).replace(/%([0-9A-F]{2})/g,(e,t)=>String.fromCharCode(`0x`+t))).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}catch(e){return console.error(`Payslip encode error:`,e),``}}function Hn(){let e=document.createElement(`div`),t=new URLSearchParams(window.location.search),n=`all`,r=t.get(`filter`)===`unpaid`?`unpaid`:`all`;function i(){let t=W.getAll(`projects`),a=W.getAll(`liveHosts`);W.getAll(`hosts`),W.getAll(`brands`);function o(e){if(!e)return null;try{let t=JSON.parse(localStorage.getItem(`ryzin_config_${e}`)||`null`);if(!t)return null;let n=t.liveStartTime||t.broadcastDate||``;return n?n.slice(0,10):null}catch{return null}}let s=[];a.forEach(e=>{let t=W.getById(`hosts`,e.hostId)||{name:e.hostName||`미지정 쇼호스트`},n=W.getById(`projects`,e.liveId||e.projectId),r=e.liveId||e.projectId||``,i=new Date().toISOString().slice(0,10),a=e.date||e.broadcastDate||o(r)||n?.broadcastDate||i,c=e.brandName||n?.brandName||W.getById(`brands`,n?.brandId)?.name||n?.title||`라이진`,l=e.fee||n?.hostFee||0,u=Math.floor(l*.033),d=l-u,f=e.settleStatus||`pending`,p=W.getById(`hosts`,e.hostId)||W.getAll(`hosts`).find(e=>e.name===t.name)||{},m=p.ssn||p.birthDate||``,h=m.replace(/[^0-9]/g,``).slice(0,6),g=p.phone||``,_=p.bank||``,v=p.account||``;s.push({id:e.id,hostId:e.hostId,hostName:t.name,birthDate:h,phone:g,date:a,month:a.slice(0,7),brandName:c,fee:l,tax:u,netFee:d,settleStatus:f,rawMatching:e,liveId:r,bank:_,account:v,ssn:m})}),t.forEach(e=>{if(e.hostName&&!s.some(t=>t.id===e.id||t.rawMatching?.liveId===e.id)){let t=e.hostFee||1e5,n=Math.floor(t*.033),r=t-n,i=new Date().toISOString().slice(0,10),a=o(e.id)||e.broadcastDate||e.date||i,c=e.brandName||e.title||`라이진`,l=W.getById(`hosts`,e.hostId)||W.getAll(`hosts`).find(t=>t.name===e.hostName)||{},u=l.ssn||l.birthDate||``,d=u.replace(/[^0-9]/g,``).slice(0,6),f=l.phone||``,p=l.bank||``,m=l.account||``;s.push({id:`proj-host-${e.id}`,hostId:e.hostId||e.hostName,hostName:e.hostName,birthDate:d,phone:f,date:a,month:a.slice(0,7),brandName:c,fee:t,tax:n,netFee:r,settleStatus:e.hostSettleStatus||`pending`,rawMatching:null,liveId:e.id,bank:p,account:m,ssn:u})}});let c=Array.from(new Set(s.map(e=>e.month))).filter(Boolean).sort().reverse();n!==`all`&&!c.includes(n)&&c.length;let l=n===`all`?s:s.filter(e=>e.month===n);r===`unpaid`?l=l.filter(e=>e.settleStatus!==`done`):r===`done`&&(l=l.filter(e=>e.settleStatus===`done`)),l.sort((e,t)=>new Date(t.date)-new Date(e.date));let u=l.reduce((e,t)=>e+t.fee,0),d=l.reduce((e,t)=>e+t.tax,0),f=l.reduce((e,t)=>e+t.netFee,0),p=l.filter(e=>e.settleStatus!==`done`).length;e.innerHTML=`
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">쇼호스트 정산 관리</h1>
            <p class="page-description">월별 쇼호스트 방송 출연료, 3.3% 사업소득세 공제액 및 실지급액 현황</p>
          </div>
        </div>
        <div class="page-header-right" style="display: flex; gap: var(--space-3); align-items: center;">
          <select id="status-filter-select" class="filter-select" style="padding: 8px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: ${r===`unpaid`?`var(--bg-error-light, #fef2f2)`:`#fff`}; color: ${r===`unpaid`?`var(--status-error)`:`var(--text-primary)`}; font-weight: 600;">
            <option value="all" ${r===`all`?`selected`:``}>전체 정산 상태</option>
            <option value="unpaid" ${r===`unpaid`?`selected`:``}>미수금만 보기 (정산 대기)</option>
            <option value="done" ${r===`done`?`selected`:``}>정산 완료 항목</option>
          </select>
          <select id="month-filter-select" class="filter-select" style="padding: 8px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-weight: 600;">
            <option value="all" ${n===`all`?`selected`:``}>전체 기간 보기</option>
            ${c.map(e=>`
              <option value="${e}" ${n===e?`selected`:``}>${e.replace(`-`,`년 `)}월</option>
            `).join(``)}
          </select>
          <button class="btn btn-sm" id="btn-download-excel" style="display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--border-color); background: #fff; color: var(--text-primary); padding: 8px 16px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; transition: background 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            사업소득 내역 다운로드
          </button>
          <button class="btn btn-primary btn-sm" id="btn-open-payslip-modal" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            지급명세서 생성 및 CSV 업로드
          </button>
        </div>
      </div>

      <div class="page-body">
        <!-- 핵심 KPI 요약 카드 (finance.js 표준 디자인) -->
        <div class="stats-grid" style="margin-bottom: var(--space-6);">
          <div class="stat-card">
            <div class="stat-label">정산 대상 방송</div>
            <div class="stat-value">
              ${l.length}건 <span style="font-size: var(--text-xs); font-weight: var(--weight-regular); color: var(--status-warning);">(대기 ${p}건)</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-label">총 지급액 (원)</div>
            <div class="stat-value">
              ${G(u)}
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-label">총 3.3% 공제액 (원)</div>
            <div class="stat-value" style="color: var(--status-error);">
              ${G(d)}
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-label">총 실제 지급액 (원)</div>
            <div class="stat-value" style="color: var(--status-info);">
              ${G(f)}
            </div>
          </div>
        </div>

        <!-- 쇼호스트 정산 목록 테이블 카드 -->
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <h3>쇼호스트 정산 내역</h3>
              <span class="badge badge-secondary">${l.length}개 항목</span>
            </div>
            ${p>0?`
              <button class="btn btn-sm btn-secondary" id="btn-settle-all-pending">
                선택된 월 전체 지급 완료 처리
              </button>
            `:``}
          </div>

          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="text-center">상태</th>
                  <th>쇼호스트</th>
                  <th class="text-center">방송일</th>
                  <th>브랜드</th>
                  <th class="text-right">지급액 (원)</th>
                  <th class="text-right" style="color: var(--status-error);">3.3% 공제 (원)</th>
                  <th class="text-right" style="color: var(--status-info);">실제 지급액 (원)</th>
                  <th class="text-center">명세서 관리</th>
                </tr>
              </thead>
              <tbody id="settle-tbody"></tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 쇼호스트 지급명세서 모달 -->
      <div id="payslip-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px;">
        <div class="modal-content" style="background: #fff; border-radius: 12px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 16px; margin-bottom: 20px;">
            <div>
              <h2 style="font-size: 18px; font-weight: 700; margin: 0;">쇼호스트 지급명세서 자동 계산 및 링크 생성</h2>
              <p style="font-size: 13px; color: #666; margin-top: 4px;">CSV 업로드 또는 텍스트 붙여넣기로 3.3% 공제 및 실지급액을 자동 계산하고 라이진 도메인 명세서 링크를 생성합니다.</p>
            </div>
            <button id="btn-close-payslip-modal" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #999;">&times;</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between;">
              <div style="display: flex; gap: 12px; align-items: center;">
                <label style="font-weight: 600; font-size: 13px; min-width: 60px;">지급일자:</label>
                <input type="date" id="payslip-date-input" class="form-control" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 13px;">
              </div>
              <button id="btn-load-sample" class="btn btn-sm btn-secondary" style="font-size: 12px; background: #f0f4f9; border: 1px solid #d0d7de;">
                예시 데이터 불러오기 (정해원, 장서연)
              </button>
            </div>

            <div>
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 6px;">CSV / TSV / 엑셀 데이터 붙여넣기:</label>
              <textarea id="payslip-raw-text" rows="6" placeholder="성명	방송일	시작시간	종료시간	업무상세	총 지급액(원)&#10;정해원	2026-04-02	19:00	20:00	부이	96,700&#10;장서연	2026-04-07	10:00	11:00	트루쿡	96,700&#10;장서연	2026-04-09	10:00	11:00	트루쿡	96,700" style="width: 100%; font-family: monospace; font-size: 13px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box;"></textarea>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <input type="file" id="payslip-file-input" accept=".csv, .tsv, .txt" style="display: none;">
                <button id="btn-trigger-file" class="btn btn-sm btn-secondary">CSV/TSV 파일 선택</button>
              </div>
              <button id="btn-generate-payslip" class="btn btn-primary" style="padding: 8px 20px;">
                명세서 계산 및 공유 링크 생성
              </button>
            </div>

            <div id="payslip-result-area" style="margin-top: 10px; border-top: 1px solid #eee; padding-top: 16px; display: none;">
              <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 12px; color: #111;">생성된 쇼호스트 지급명세서</h3>
              <div id="payslip-cards-list" style="display: flex; flex-direction: column; gap: 12px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;let m=e.querySelector(`#status-filter-select`);m&&m.addEventListener(`change`,e=>{r=e.target.value,i()});let h=e.querySelector(`#month-filter-select`);h&&h.addEventListener(`change`,e=>{n=e.target.value,i()});function g(e){let t=[`라이브번호`,`진행월`,`라이브 일정`,`브랜드`,`쇼호스트`,`진행비용`,`입금은행`,`계좌번호`,`공제금액`,`실 지급`,`주민번호`].join(`,`)+`
`;e.forEach(e=>{let n=e=>{if(e==null)return``;let t=String(e).replace(/"/g,`""`);return t.includes(`,`)||t.includes(`
`)||t.includes(`"`)?`"${t}"`:t},r=[n(e.liveId||e.id),n(e.month?e.month.replace(`-`,`년 `)+`월`:``),n(e.date),n(e.brandName),n(e.hostName),e.fee,n(e.bank),n(e.account),e.tax,e.netFee,n(e.ssn)];t+=r.join(`,`)+`
`});let n=new Blob([`﻿`+t],{type:`text/csv;charset=utf-8;`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r;let a=new Date().toISOString().slice(0,10);i.setAttribute(`download`,`쇼호스트_사업소득내역_${a}.csv`),document.body.appendChild(i),i.click(),document.body.removeChild(i)}let _=e.querySelector(`#btn-download-excel`);_&&_.addEventListener(`click`,()=>{g(l)});let v={};l.forEach(e=>{let t=`${e.hostName}__${e.month}`;v[t]||(v[t]={hostName:e.hostName,month:e.month,items:[]}),v[t].items.push(e)});let y=e.querySelector(`#settle-tbody`);y&&(l.length===0?y.innerHTML=`<tr><td colspan="8" class="text-center" style="padding:40px;color:#94a3b8;">선택한 조건의 정산 내역이 없습니다.</td></tr>`:(y.innerHTML=``,l.forEach(e=>{let t=document.createElement(`tr`);t.style.cssText=`border-bottom: 1px solid #f1f5f9;`;let n=`${e.hostName}__${e.month}`;t.innerHTML=`
            <td class="text-center">
              <select class="btn-change-settle-status" data-id="${e.id}" style="padding: 4px 8px; font-size: 12px; font-weight: 600; border-radius: 12px; border: 1px solid var(--border-color); cursor: pointer; outline: none; background: ${e.settleStatus===`done`?`#dcfce7`:`#fef3c7`}; color: ${e.settleStatus===`done`?`#166534`:`#92400e`};">
                <option value="pending" ${e.settleStatus===`done`?``:`selected`} style="background:#fff; color:#0f172a;">지급대기</option>
                <option value="done" ${e.settleStatus===`done`?`selected`:``} style="background:#fff; color:#0f172a;">지급완료</option>
              </select>
            </td>
            <td style="padding:12px; font-weight:600; color:#0f172a;">${e.hostName}</td>
            <td style="padding:12px; text-align:center; color:#475569; font-size:13px;">${e.date}</td>
            <td style="padding:12px; font-weight:500; color:#334155;">${e.brandName}</td>
            <td style="padding:12px; text-align:right; font-weight:500; color:#0f172a;">${e.fee.toLocaleString(`ko-KR`)}</td>
            <td style="padding:12px; text-align:right; color:#dc2626; font-weight:500;">${e.tax.toLocaleString(`ko-KR`)}</td>
            <td style="padding:12px; text-align:right; color:#2563eb; font-weight:700;">${e.netFee.toLocaleString(`ko-KR`)}</td>
            <td class="text-center">
              <div style="display:flex; gap:6px; justify-content:center;">
                <button class="btn btn-xs btn-primary btn-generate-month-link"
                  data-grp-key="${n}">명세서 링크</button>
              </div>
            </td>
          `,y.appendChild(t)}))),e.querySelectorAll(`.btn-change-settle-status`).forEach(e=>{e.addEventListener(`change`,e=>{let t=e.target.dataset.id,n=e.target.value;if(t.startsWith(`proj-host-`)){let e=t.replace(`proj-host-`,``);W.update(`projects`,e,{hostSettleStatus:n,settleStatus:n})}else{W.update(`liveHosts`,t,{settleStatus:n});let e=W.getById(`liveHosts`,t);e&&e.liveId&&W.update(`projects`,e.liveId,{settleStatus:n})}J(`정산 상태가 '${n===`done`?`지급완료`:`지급대기`}'(으)로 변경되었습니다.`)})}),e.querySelectorAll(`.btn-generate-month-link`).forEach(e=>{e.addEventListener(`click`,e=>{e.stopPropagation();let t=v[e.target.dataset.grpKey];if(!t)return;let n=t.items.map(e=>({name:e.hostName,date:e.date,detail:e.brandName,amount:e.fee,tax:e.tax,netAmount:e.netFee})),r=t.items.reduce((e,t)=>e+t.fee,0),i=t.items.reduce((e,t)=>e+t.tax,0),a=r-i,o=t.items[0]||{},s=Vn({id:`STMT-${Date.now()}`,paymentDate:new Date().toISOString().slice(0,10),month:t.month,recipientName:t.hostName,birthDate:o.birthDate||``,phone:o.phone||``,company:{name:`라이진`,bizNo:`821-29-01197`,ceo:`채이준`,email:`choijun@ryzincorp.com`},items:n,totals:{amount:r,tax:i,netAmount:a}}),c=`${window.location.origin}/paystmt.html?d=${s}`,l=t.month?t.month.replace(`-`,`년 `)+`월`:``,u=t.items.length;navigator.clipboard.writeText(c).then(()=>{J(`${t.hostName} 님 ${l} 명세서 (${u}건 포함) 링크 복사 완료!`)})})});let b=e.querySelector(`#btn-settle-all-pending`);b&&b.addEventListener(`click`,()=>{confirm(`현재 목록의 지급대기 건을 모두 지급 완료 처리하시겠습니까?`)&&(l.filter(e=>e.settleStatus!==`done`).forEach(e=>{if(e.rawMatching)W.update(`liveHosts`,e.rawMatching.id,{settleStatus:`done`}),e.rawMatching.liveId&&W.update(`projects`,e.rawMatching.liveId,{settleStatus:`done`});else if(e.id&&e.id.startsWith(`proj-host-`)){let t=e.id.replace(`proj-host-`,``);W.update(`projects`,t,{hostSettleStatus:`done`,settleStatus:`done`})}}),J(`전체 지급 완료 처리되었습니다.`))}),e.querySelectorAll(`.btn-generate-single-link`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.name,n=e.target.dataset.date,r=e.target.dataset.brand,i=parseInt(e.target.dataset.amount,10)||0,a=Math.floor(i*.033),o=i-a,s=Vn({id:`STMT-${Date.now()}`,paymentDate:n,recipientName:t,company:{name:`라이진`,bizNo:`821-29-01197`,ceo:`채이준`,email:`choijun@ryzincorp.com`},items:[{name:t,date:n,startTime:`10:00`,endTime:`11:00`,detail:r,amount:i,tax:a,netAmount:o}],totals:{amount:i,tax:a,netAmount:o}}),c=`${window.location.origin}/paystmt.html?d=${s}`;navigator.clipboard.writeText(c).then(()=>{J(`${t} 님의 지급명세서 공유 링크가 클립보드에 복사되었습니다.\n\n${c}`)})})});let x=e.querySelector(`#payslip-modal`),S=e.querySelector(`#payslip-date-input`);S.value=new Date().toISOString().split(`T`)[0],e.querySelector(`#btn-open-payslip-modal`).addEventListener(`click`,()=>{x.style.display=`flex`}),e.querySelector(`#btn-close-payslip-modal`).addEventListener(`click`,()=>{x.style.display=`none`}),x.addEventListener(`click`,e=>{e.target===x&&(x.style.display=`none`)}),e.querySelector(`#btn-load-sample`).addEventListener(`click`,()=>{e.querySelector(`#payslip-raw-text`).value=`성명	방송일	시작시간	종료시간	업무상세	총 지급액(원)
정해원	2026-04-02	19:00	20:00	부이	96,700
장서연	2026-04-07	10:00	11:00	트루쿡	96,700
장서연	2026-04-09	10:00	11:00	트루쿡	96,700`,J(`예시 데이터가 입력되었습니다.`)});let C=e.querySelector(`#payslip-file-input`);e.querySelector(`#btn-trigger-file`).addEventListener(`click`,()=>C.click()),C.addEventListener(`change`,t=>{let n=t.target.files[0];if(!n)return;let r=new FileReader;r.onload=t=>{e.querySelector(`#payslip-raw-text`).value=t.target.result,J(`${n.name} 파일을 읽었습니다.`)},r.readAsText(n)}),e.querySelector(`#btn-generate-payslip`).addEventListener(`click`,()=>{let t=e.querySelector(`#payslip-raw-text`).value,n=S.value||new Date().toISOString().split(`T`)[0];if(!t.trim()){Y(`CSV 또는 텍스트 데이터를 입력해주세요.`);return}let r=Bn(t,{paymentDate:n,groupByRecipient:!0});if(!r||r.length===0){Y(`파싱 가능한 지급 데이터가 없습니다. 형식(성명, 방송일, 시작시간, 종료시간, 업무상세, 총지급액)을 확인해주세요.`);return}let i=e.querySelector(`#payslip-result-area`),a=e.querySelector(`#payslip-cards-list`);a.innerHTML=``,i.style.display=`block`;let o=window.location.origin;r.forEach(e=>{let t=`${o}/paystmt.html?d=${Vn(e)}`,n=e.totals.netAmount.toLocaleString(`ko-KR`),r=e.totals.amount.toLocaleString(`ko-KR`),i=e.totals.tax.toLocaleString(`ko-KR`),s=document.createElement(`div`);s.style.cssText=`background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; gap: 10px;`,s.innerHTML=`
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-weight: 700; font-size: 15px; color: #0f172a;">${e.recipientName} 님</span>
              ${e.month?`<span class="badge badge-secondary" style="font-size: 11px; background:#f1f5f9; color:#334155;">${e.month.replace(`-`,`년 `)}월</span>`:``}
              <span class="badge badge-secondary" style="font-size: 11px;">방송 ${e.items.length}건</span>
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #1e293b;">
              실지급액: <span style="color: #2563eb;">${n}원</span>
              <span style="font-size: 11px; font-weight: normal; color: #64748b; margin-left: 6px;">(총 ${r}원 - 3.3% 공제 ${i}원)</span>
            </div>
          </div>

          <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-family: monospace; font-size: 12px; color: #334155; display: flex; align-items: center; justify-content: space-between; word-break: break-all;">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 80%;">${t}</span>
          </div>

          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn btn-sm btn-secondary btn-copy-link" data-link="${t}">링크 복사</button>
            <button class="btn btn-sm btn-secondary btn-open-viewer" data-link="${t}">명세서 새 창 보기</button>
            <button class="btn btn-sm btn-primary btn-copy-msg" data-name="${e.recipientName}" data-date="${e.paymentDate}" data-net="${n}" data-link="${t}">문구 복사</button>
          </div>
        `,s.querySelector(`.btn-copy-link`).addEventListener(`click`,t=>{navigator.clipboard.writeText(t.target.dataset.link),J(`${e.recipientName} 님의 명세서 링크가 복사되었습니다.`)}),s.querySelector(`.btn-open-viewer`).addEventListener(`click`,e=>{window.open(e.target.dataset.link,`_blank`)}),s.querySelector(`.btn-copy-msg`).addEventListener(`click`,e=>{let t=e.target.dataset.name,n=`[라이진] ${t} 님, 방송 지급명세서가 발송되었습니다.\n\n· 지급일: ${e.target.dataset.date}\n· 실지급액: ${e.target.dataset.net}원\n\n아래 링크에서 상세 내역 및 3.3% 세금 공제 내역을 확인하실 수 있습니다:\n${e.target.dataset.link}`;navigator.clipboard.writeText(n),J(`${t} 님 전송용 안내 문구가 복사되었습니다.`)}),a.appendChild(s)}),J(`총 ${r.length}명의 쇼호스트 지급명세서가 자동 계산되었습니다.`)})}return i(),W.on(`projects:changed`,i),W.on(`liveHosts:changed`,i),e}function Un(e,t){let n=document.createElement(`div`),r=et(new Date().toISOString(),`YYYY-MM-DD`),i=`EST-${new Date().toISOString().replace(/[-:T]/g,``).slice(2,14)}`,a=[{name:`방송 기획 및 송출비`,desc:`1회 방송 기획/운영/송출`,unitPrice:3e6,qty:1,unit:`회`}];t&&t.length>0&&t.forEach(e=>{let t=W.getById(`hosts`,e.hostId),n=t?t.name:`쇼호스트`,r=e.role===`main`?`메인 쇼호스트`:`게스트`;a.push({name:`출연료 (${n})`,desc:`${r} 출연료`,unitPrice:e.fee||5e5,qty:1,unit:`명`})});let o=0;function s(){let e=0;a.forEach(t=>{e+=t.unitPrice*t.qty});let t=e-o,n=Math.floor(t*.1),r=t+n;return{supply:e,totalSupply:t,vat:n,finalAmount:r}}function c(){let t=s();n.innerHTML=`
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
    `,l=document.createElement(`div`);l.innerHTML=c;let u={margin:0,filename:`견적서_${i}_${s}.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}};html2pdf().set(u).from(l).save().then(()=>{q()})}c(),K({title:`브랜드 견적서`,size:`lg`,content:n,footer:!1})}function Wn(e,t){let n=document.createElement(`div`),r=[];t&&t.length>0&&t.forEach(e=>{let t=W.getById(`hosts`,e.hostId);t&&r.push({...t,role:e.role,fee:e.fee||0})});function i(){if(r.length===0){n.innerHTML=`<div style="padding: 2rem; text-align: center; color: var(--text-tertiary);">이 프로젝트에 배정된 쇼호스트가 없습니다.</div>`,K({title:`쇼호스트 계약서 발급`,size:`md`,content:n});return}n.innerHTML=`
      <div style="width: 600px; max-width: 100%;">
        <div style="margin-bottom: var(--space-4);">
          <h3 style="font-size: 16px;">${e.title}</h3>
          <p style="color: var(--text-tertiary); font-size: 13px;">방송일: ${et(e.broadcastDate)}</p>
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
    `,o=document.createElement(`div`);o.innerHTML=a;let s={margin:10,filename:`출연계약서_${e.name}_${t.title}.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}};html2pdf().set(s).from(o).save()}i(),K({title:`쇼호스트 출연 계약서 발급`,size:`md`,content:n,footer:!1})}function Gn(){let e=document.createElement(`div`);function t(){let t=W.getAll(`projects`)||[];t.sort((e,t)=>(t.broadcastDate||``).localeCompare(e.broadcastDate||``)),e.innerHTML=`
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
                    <td style="font-size: 13px;">${et(e.broadcastDate)}</td>
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
    `,e.querySelectorAll(`.btn-brand-estimate`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.id,n=W.getById(`projects`,t);n&&Un(n,W.query(`liveHosts`,e=>e.liveId===n.id)||[])})}),e.querySelectorAll(`.btn-host-contract`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.id,n=W.getById(`projects`,t);n&&Wn(n,W.query(`liveHosts`,e=>e.liveId===n.id)||[])})})}return t(),e}function Kn(){let e=JSON.parse(localStorage.getItem(`ryzin_live_data`)||`{}`);return{linkId:e.settings?.popbillLinkId||null,secretKey:e.settings?.popbillSecretKey||null,senderNumber:e.settings?.popbillSenderNumber||`010-0000-0000`}}async function qn(){return Kn(),new Promise(e=>{setTimeout(()=>{e([{templateCode:`TPL_001`,templateName:`방송 안내`,content:`안녕하세요 #{고객명}님,
다가오는 #{방송일}에 #{방송명} 방송이 진행될 예정입니다.
많은 시청 부탁드립니다!`},{templateCode:`TPL_002`,templateName:`정산 완료 안내`,content:`#{이름}님, #{프로젝트명}에 대한 정산이 완료되었습니다.
입금은행: #{입금은행}

감사합니다.`}])},300)})}async function Jn(e){let t=Kn();try{let n=await fetch(`http://localhost:3001/api/popbill/send`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({linkId:t.linkId,secretKey:t.secretKey,senderNumber:t.senderNumber,payload:e})});if(!n.ok){let e=await n.json().catch(()=>({}));throw Error(e.message||`메시지 전송 실패`)}let r=await n.json();if(!r.success)throw Error(r.message||`메시지 전송 실패`);return console.log(`팝빌 전송 결과:`,r),{success:!0,receiptNum:r.receiptNum,message:`발송 완료`}}catch(e){throw console.error(`팝빌 연동 오류:`,e),Error(`팝빌 메시지 전송에 실패했습니다: `+e.message)}}function Yn(){let e=document.createElement(`div`),t=[],n=null,r=[],i={},a=[];function o(){let o=W.getAll(`hosts`)||[],s=W.getAll(`projects`)||[],c=new Set(s.map(e=>e.brand).filter(e=>!!e)),l=Array.from(c).map(e=>({id:`brand_`+e,name:e}));e.innerHTML=`
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
        `).join(``),m.querySelectorAll(`.var-input`).forEach(e=>{e.addEventListener(`input`,e=>{i[e.target.dataset.var]=e.target.value,v()})})):(p.style.display=`none`,m.innerHTML=``),v()};u.addEventListener(`change`,r=>{r.target.value===`alimtalk`?(d.style.display=`block`,h.readOnly=!0,h.style.background=`var(--bg-tertiary)`,g.textContent=`메시지 내용 (미리보기)`,!n&&t.length>0?(f.value=t[0].templateCode,n=t[0],y()):n?y():(p.style.display=`none`,h.value=``)):(d.style.display=`none`,p.style.display=`none`,h.readOnly=!1,h.style.background=`var(--bg-card)`,g.textContent=`메시지 내용`,h.value=``,e.querySelector(`#msg-length`).textContent=`0`)}),f.addEventListener(`change`,e=>{let r=e.target.value;n=t.find(e=>e.templateCode===r),y()}),h.addEventListener(`input`,t=>{e.querySelector(`#msg-length`).textContent=t.target.value.length}),qn().then(e=>{t=e,t.length>0&&(f.innerHTML=`<option value="">템플릿을 선택하세요</option>`+t.map(e=>`<option value="${e.templateCode}">${e.templateName}</option>`).join(``))}),e.querySelector(`#btn-add-group`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#receiver-group`).value;t===`all_hosts`?(o.forEach(e=>{a.find(t=>t.phone===e.phone)||a.push({name:e.name,phone:e.phone||`010-0000-0000`})}),J(`쇼호스트 ${o.length}명을 추가했습니다.`)):t===`all_brands`&&(l.forEach(e=>{a.find(t=>t.name===e.name)||a.push({name:e.name,phone:`010-0000-0000`})}),J(`브랜드 ${l.length}개를 추가했습니다.`)),_()}),e.querySelector(`#btn-add-manual`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#manual-name`),n=e.querySelector(`#manual-phone`),r=t.value.trim(),i=n.value.trim();if(!r||!i){Y(`이름과 연락처를 모두 입력해주세요.`);return}if(a.find(e=>e.phone===i)){Y(`이미 추가된 연락처입니다.`);return}a.push({name:r,phone:i}),t.value=``,n.value=``,_()}),e.querySelector(`#btn-send-message`)?.addEventListener(`click`,async()=>{let t=u.value;if(t===`alimtalk`){if(!n){Y(`알림톡 템플릿을 선택해주세요.`);return}let e=r.filter(e=>!i[e]);if(e.length>0){Y(`변수 값을 입력해주세요: ${e.join(`, `)}`);return}}else if(!h.value.trim()){Y(`메시지 내용을 입력해주세요.`);return}if(a.length===0){Y(`수신자를 최소 1명 이상 추가해주세요.`);return}let o=e.querySelector(`#btn-send-message`);o.textContent=`발송 중...`,o.disabled=!0;try{let e={msgType:t,receivers:[]};t===`alimtalk`?(e.templateCode=n.templateCode,e.receivers=a.map(e=>{let t=n.content;return t=t.replace(/#\{이름\}/g,e.name).replace(/#\{고객명\}/g,e.name),r.forEach(e=>{let n=RegExp(`#\\{${e}\\}`,`g`);t=t.replace(n,i[e])}),{name:e.name,number:e.phone,content:t}})):(e.content=h.value.trim(),e.receivers=a.map(e=>({name:e.name,number:e.phone})));let o=await Jn(e);o.success&&(J(o.message),a=[],_())}catch(e){Y(e.message)}finally{o.textContent=`메시지 발송하기`,o.disabled=!1}}),u.dispatchEvent(new Event(`change`))}return o(),e}function Xn(){let e=document.createElement(`div`);function t(){let t=W.getAll(`crmClients`)||[],a=W.getAll(`crmActivities`)||[],o=W.getAll(`projects`)||[],s=new Date,c=t.filter(e=>e.lastContactDate?(s-new Date(e.lastContactDate))/(1e3*60*60*24)>=7&&e.status!==`contract`&&e.status!==`hold`:!1),l=t.filter(e=>{if(e.status!==`quote`)return!1;let t=a.filter(t=>t.clientId===e.id&&t.content.includes(`견적`)).sort((e,t)=>new Date(t.date)-new Date(e.date)),n=t.length>0?t[0].date:e.lastContactDate;return n?(s-new Date(n))/(1e3*60*60*24)>=3:!1}),u=[],d=o.filter(e=>e.settleStatus===`done`||e.broadcastStatus===`done`),f={};d.forEach(e=>{let t=e.brandName||W.getById(`brands`,e.brandId)?.name||`알 수 없음`;f[t]||(f[t]=[]),f[t].push(e)});for(let[e,t]of Object.entries(f)){t.sort((e,t)=>new Date(t.broadcastDate||t.createdAt)-new Date(e.broadcastDate||e.createdAt));let n=t[0],r=n.broadcastDate||n.createdAt;if(r){let t=(s-new Date(r))/(1e3*60*60*24);t>=30&&u.push({brandName:e,lastBroadcastDate:r,diffDays:Math.floor(t)})}}e.innerHTML=`
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
                ${te.map(e=>`<option value="${e.key}">${e.label}</option>`).join(``)}
              </select>
              <select class="input" id="filter-category" style="width: 150px;">
                <option value="all">분류 전체</option>
                ${ne.map(e=>`<option value="${e.key}">${e.label}</option>`).join(``)}
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
`).filter(e=>e.trim()!==``);if(n.length<=1){alert(`데이터가 없습니다.`);return}let r=[],i=new Date().toISOString().split(`T`)[0];for(let e=1;e<n.length;e++){let t=n[e].split(`,`).map(e=>e.trim().replace(/^"|"$/g,``));t[0]&&r.push({id:`crm_`+Date.now()+`_`+e,companyName:t[0]||``,contactName:t[1]||``,phone:t[2]||``,email:t[3]||``,interestedService:t[4]||``,source:t[5]||``,memo:t[6]||``,status:`lead`,category:`기타`,lastContactDate:i,createdAt:i})}r.length>0&&confirm(`총 ${r.length}건의 데이터를 등록하시겠습니까?`)&&(W.createBulk(`crmClients`,r),alert(`성공적으로 등록되었습니다.`),Xn()),e.target.value=``},n.readAsText(t,`utf-8`)}),e.querySelector(`#filter-status`).addEventListener(`change`,r=>n(r.target.value,e.querySelector(`#filter-category`).value,t)),e.querySelector(`#filter-category`).addEventListener(`change`,r=>n(e.querySelector(`#filter-status`).value,r.target.value,t)),e.querySelectorAll(`.alert-link`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.id;i(t)})})}function n(e,t,n){let i=n;e!==`all`&&(i=i.filter(t=>t.status===e)),t!==`all`&&(i=i.filter(e=>e.category===t)),r(i)}function r(t){let n=e.querySelector(`#crm-table-body`);if(n){if(t.length===0){n.innerHTML=`<tr><td colspan="8" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 고객이 없습니다.</td></tr>`;return}n.innerHTML=t.sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)).map(e=>{let t=te.find(t=>t.key===e.status)||te[0],n=ne.find(t=>t.key===e.category)||{label:`-`};return`
        <tr>
          <td style="font-weight: 500;">${e.companyName}</td>
          <td>${e.contactName}</td>
          <td>${e.phone||`-`}<br><span style="font-size:11px; color:var(--text-tertiary);">${e.email||``}</span></td>
          <td>${e.interestedService||`-`}</td>
          <td><span class="badge" style="background: var(--bg-secondary);">${n.label}</span></td>
          <td><span class="badge" style="background: var(--status-${t.color}); color: white;">${t.label}</span></td>
          <td>${et(e.lastContactDate)}</td>
          <td class="text-center col-actions">
            <button class="btn btn-sm btn-secondary btn-edit-client" data-id="${e.id}">상세/활동</button>
          </td>
        </tr>
      `}).join(``),n.querySelectorAll(`.btn-edit-client`).forEach(e=>{e.addEventListener(`click`,e=>i(e.target.dataset.id))})}}function i(e=null){let n=!!e,r=n?W.getById(`crmClients`,e):{},a=n?W.getAll(`crmActivities`).filter(t=>t.clientId===e).sort((e,t)=>new Date(t.date)-new Date(e.date)):[],o=`
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
                ${te.map(e=>`<option value="${e.key}" ${r.status===e.key?`selected`:``}>${e.label}</option>`).join(``)}
              </select>
            </div>
            <div class="input-group">
              <label>고객 분류</label>
              <select class="input" id="c-category">
                ${ne.map(e=>`<option value="${e.key}" ${r.category===e.key?`selected`:``}>${e.label}</option>`).join(``)}
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
                ${F.map(e=>`<option value="${e.key}">${e.icon} ${e.label}</option>`).join(``)}
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
            ${a.length>0?a.map(e=>{let t=F.find(t=>t.key===e.type)||F[0];return`
              <div style="margin-bottom: var(--space-3); padding-bottom: var(--space-3); border-bottom: 1px dashed var(--border-light);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-weight: 500; font-size: 13px;">${t.icon} ${t.label}</span>
                  <span style="color: var(--text-tertiary); font-size: 12px;">${et(e.date)}</span>
                </div>
                <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 4px;">${e.content}</div>
                ${e.followUpDate?`<div style="font-size: 11px; color: var(--primary-color);">다음 예정일: ${et(e.followUpDate)}</div>`:``}
              </div>
              `}).join(``):`<div style="color: var(--text-tertiary); font-size: 13px; text-align: center;">기록된 활동이 없습니다.</div>`}
          </div>
        </div>
        `:`<div style="flex: 1; display:flex; align-items:center; justify-content:center; color:var(--text-tertiary); background:var(--bg-secondary); border-radius:var(--radius-md);">고객 정보를 먼저 등록한 후 활동 관리를 할 수 있습니다.</div>`}
      </div>
    `,s=document.createElement(`div`);if(s.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,n){let n=document.createElement(`button`);n.className=`btn btn-danger`,n.textContent=`고객 삭제`,n.style.marginRight=`auto`,n.addEventListener(`click`,()=>{confirm(`이 고객과 모든 활동 기록을 삭제하시겠습니까?`)&&(W.delete(`crmClients`,e),q(),t(),J(`삭제되었습니다.`))}),s.appendChild(n)}let c=document.createElement(`button`);c.className=`btn btn-secondary`,c.textContent=`취소`,c.addEventListener(`click`,q);let l=document.createElement(`button`);l.className=`btn btn-primary`,l.textContent=`고객 정보 저장`,l.addEventListener(`click`,()=>{let r=document.getElementById(`c-company`).value.trim();if(!r)return Y(`회사명을 입력하세요.`);let i={companyName:r,contactName:document.getElementById(`c-contact`).value.trim(),phone:document.getElementById(`c-phone`).value.trim(),email:document.getElementById(`c-email`).value.trim(),status:document.getElementById(`c-status`).value,category:document.getElementById(`c-category`).value,interestedService:document.getElementById(`c-service`).value.trim(),source:document.getElementById(`c-source`).value.trim(),memo:document.getElementById(`c-memo`).value.trim()};n?(W.update(`crmClients`,e,i),J(`수정되었습니다.`)):(i.id=I(`crm`),i.createdAt=new Date().toISOString(),i.lastContactDate=new Date().toISOString().split(`T`)[0],W.create(`crmClients`,i),J(`등록되었습니다.`)),q(),t()}),s.appendChild(c),s.appendChild(l),K({title:n?`고객 상세 및 활동 관리`:`신규 고객 등록`,size:`lg`,content:o,footer:s}),n&&setTimeout(()=>{document.getElementById(`btn-save-activity`)?.addEventListener(`click`,()=>{let t=document.getElementById(`act-content`).value.trim();if(!t)return Y(`활동 내용을 입력하세요.`);let n=document.getElementById(`act-date`).value,a={id:I(`act`),clientId:e,date:n,type:document.getElementById(`act-type`).value,content:t,followUpDate:document.getElementById(`act-followup`).value||null,createdAt:new Date().toISOString()};W.create(`crmActivities`,a),new Date(n)>new Date(r.lastContactDate||`1970-01-01`)&&W.update(`crmClients`,e,{lastContactDate:n}),J(`활동이 등록되었습니다.`),q(),i(e)})},0)}return t(),W.on(`crmClients:changed`,t),W.on(`crmActivities:changed`,t),e}function Zn(){let e=document.createElement(`div`),t=W.getCurrentRole();return e.innerHTML=`
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
      <div class="card" style="margin-bottom: var(--space-5); ${W.isDemoMode?`border: 2px solid var(--status-error);`:``}">
        <div class="card-header" style="${W.isDemoMode?`background: rgba(239,68,68,0.1); border-bottom: 1px solid var(--status-error);`:`background: var(--bg-secondary); border-bottom: 1px solid var(--border-light);`}">
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
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">${W.getAll(`users`).length}명 <span style="font-size: var(--text-sm); font-weight: 400; color: var(--text-tertiary);">/ 무제한</span></div>
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
                  <td class="text-center">${e.admin?er():tr()}</td>
                  <td class="text-center">${e.pd?er():tr()}</td>
                  <td class="text-center">${e.designer?er():tr()}</td>
                  <td class="text-center">${e.accountant?er():tr()}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
        <div style="padding: 12px 16px; background: #f8fafc; border-top: 1px solid var(--border-color); font-size: 12px; color: #475569; line-height: 1.5;">
          <strong style="color: #0f172a;">🔒 PD 계정 민감 데이터 보안 마스킹 정책:</strong><br>
          PD 권한 접속 시 대시보드의 <strong>이번달 매출 및 브랜드 미수금</strong> 지표가 비공개(**) 처리되며, 쇼호스트(누적정산, 평균매출, 평균 ROI, 주민등록번호, 방송횟수, 최근방송일) 및 브랜드/라이브 성과(누적매출, 방송횟수, 라이브매출, 정산 등) 민감 수치가 모두 <strong>**</strong> 마스킹되어 안전하게 보호됩니다.
        </div>
      </div>
    </div>
  `,setTimeout(()=>{let n=e.querySelector(`#toggle-demo-mode`);if(n&&n.addEventListener(`change`,e=>{e.target.checked?st({title:`데모 모드 진입`,message:`데모 모드를 켜시겠습니까?
실제 운영 데이터가 보이지 않게 되며, 텅 빈 초기 상태에서 시연용 데이터를 안전하게 조작할 수 있습니다.`,confirmText:`데모 켜기`,onConfirm:()=>W.toggleDemoMode(!0),onCancel:()=>{n.checked=!1}}):st({title:`운영 모드 복귀`,message:`운영 모드로 돌아가시겠습니까?
다시 원래의 실제 운영 데이터를 불러옵니다.`,confirmText:`복귀하기`,onConfirm:()=>W.toggleDemoMode(!1),onCancel:()=>{n.checked=!0}})}),t===`admin`){let t=JSON.parse(localStorage.getItem(`ryzin_live_data`)||`{}`),n=t.settings||{},r=e.querySelector(`#setting-popbill-linkid`),i=e.querySelector(`#setting-popbill-secret`),a=e.querySelector(`#setting-popbill-sender`);r&&(r.value=n.popbillLinkId||``),i&&(i.value=n.popbillSecretKey||``),a&&(a.value=n.popbillSenderNumber||``),e.querySelector(`#btn-save-api-settings`)?.addEventListener(`click`,()=>{t.settings||={},t.settings.popbillLinkId=r.value.trim(),t.settings.popbillSecretKey=i.value.trim(),t.settings.popbillSenderNumber=a.value.trim(),localStorage.setItem(`ryzin_live_data`,JSON.stringify(t)),J(`API 연동 설정이 저장되었습니다.`)})}t===`admin`&&(Qn(e),e.querySelector(`#btn-create-user`)?.addEventListener(`click`,async()=>{await $n()}))},0),e}function Qn(e){let t=e.querySelector(`#user-list-tbody`);if(!t)return;let n=W.getAll(`users`);if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 사용자가 없습니다.</td></tr>`;return}t.innerHTML=n.map(e=>{let t=e.role;if(oe[e.role])t=oe[e.role].label;else if(e.role&&e.role.startsWith(`live_stream:`))t=`라이브 매니저 (${e.role.split(`:`)[1]})`;else if(e.role&&e.role.startsWith(`brand:`)){let n=e.role.split(`:`)[1],r=W.getById(`brands`,n);t=r?`파트너사 (${r.name})`:`파트너사 (${n})`}return`
      <tr>
        <td style="font-weight: var(--weight-medium);">${e.id}</td>
        <td>${e.name}</td>
        <td><span style="color:var(--text-tertiary);">***</span></td>
        <td><span class="badge badge-default">${t}</span></td>
        <td class="text-right">
          <div style="display: flex; gap: var(--space-2); justify-content: flex-end;">
            <button class="btn btn-secondary btn-sm edit-user-btn" data-id="${e.id}">수정</button>
            <button class="btn btn-danger btn-sm delete-user-btn" data-id="${e.id}">삭제</button>
          </div>
        </td>
      </tr>
    `}).join(``),t.querySelectorAll(`.edit-user-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=W.getById(`users`,e.getAttribute(`data-id`));t&&await $n(t)})}),t.querySelectorAll(`.delete-user-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-id`);st({title:`사용자 삭제`,message:`해당 사용자를 삭제하시겠습니까?`,confirmText:`삭제`,danger:!0,onConfirm:()=>{W.delete(`users`,n),J(`사용자가 삭제되었습니다.`),Qn(e)}})})})}async function $n(e=null){let t=[];try{let e=window.supabaseClient;if(e){let{data:n,error:r}=await e.from(`live_control`).select(`live_id, title, brand_name`);!r&&n&&(t=n.map(e=>({id:e.live_id,title:e.title||e.brand_name||``})))}}catch(e){console.warn(`Failed to load lives from Supabase in settings.js`,e)}t.length===0&&(t=JSON.parse(localStorage.getItem(`ryzin_lives`)||`[]`));let n=W.getAll(`brands`)||[],r=document.createElement(`div`);r.className=`form-grid`,r.innerHTML=`
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
        ${Object.entries(oe).map(([t,n])=>`<option value="${t}" ${e&&e.role===t?`selected`:``}>${n.label} (${t})</option>`).join(``)}
        ${t.map(t=>`<option value="live_stream:${t.id}" ${e&&e.role===`live_stream:${t.id}`?`selected`:``}>라이브 매니저 - ${t.title?t.title+` `:``}(${t.id})</option>`).join(``)}
        ${n.map(t=>`<option value="brand:${t.id}" ${e&&e.role===`brand:${t.id}`?`selected`:``}>파트너사 - ${t.name} (${t.id})</option>`).join(``)}
      </select>
    </div>
  `;let i=document.createElement(`div`);i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,q);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=`저장`,o.addEventListener(`click`,()=>{let t=document.getElementById(`user-id`).value.trim(),n=document.getElementById(`user-pw`).value.trim(),r=document.getElementById(`user-name`).value.trim(),i=document.getElementById(`user-role`).value;if(!t||!n||!r){Y(`모든 항목을 입력해주세요.`);return}let a=n;if(e)n!==e.password&&(a=He.default.SHA256(n).toString()),W.update(`users`,t,{password:a,name:r,role:i}),J(`사용자 정보가 수정되었습니다.`);else{if(W.getById(`users`,t)){Y(`이미 존재하는 아이디입니다.`);return}a=He.default.SHA256(n).toString(),W.create(`users`,{id:t,password:a,name:r,role:i}),J(`새로운 사용자가 등록되었습니다.`)}q();let o=document.getElementById(`page-content`);o&&(o.innerHTML=``,o.appendChild(Zn()))}),i.appendChild(a),i.appendChild(o),K({title:e?`사용자 수정`:`사용자 추가`,content:r,footer:i})}function er(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--status-success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`}function tr(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`}var nr=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAADCCAYAAADXcrAvAAAOnUlEQVR4nO3d7W7b2JIFUHGQ//Nz3mHe//006GkE8Y2T2IpFcVfttYAAF7jdHbJOnQ9u0fLx3//zvzcAAABgt/+6+gIAAACA8wkAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACggAAAAAoIAAAAAAAAoIAAAAAKCAAAAAAAAKCAAAAACggAAAAAAACny7+gIAgAj3L/77x5OuAwDS9rnjtoQAAAC63F/8311zaAKgdp+7/+H/O7YGAGcdGFKdOZBJtUxu2KQ68fr+uw+bG1ddb9ocVoc898C//yi472ZH2FhcvU5Ouv+rr3Xj+H/FleMxqW73sL//uAXzBsDzGil6oD9xn2nXf/VEhinugfOX60xZO68KBYA+n10XrUEzTNjn7sn95UsAnzvQ3/98JKYBQk2Y2JDEnOGz+0+y6dcPzLZhHd1s+vjcU67fGwBdn6r/iU8RYTZzuFPEYaJ8/wT2rqvWouvZ557MGwDnWvNlES+0bZIDnGXzehnzSQlQzVqk9me5bI/zBsC1KeIRdsC5+hPEpFokjg+kz2HO17YmeSMASGAten2tG9zf/O+Xnd+8AfBa0V8IwX8wLkzVtHG2aR7b5nsHcngj4Pz6trq/6i8SALxeemOnXx9AI2uzGgA5rMnPr6ea3l5TBwHANTS4moA1BnuG/ROYy3mekb0lAMj5mY+kV87bF7SksYC/1T6PtzCOALms0V+vnxr+2ml1EQBcK7nh76UT38M/myTNLR5n/H5fF7UBUliT1Owsp+x1AoDrJf+u0bYDVlr9AQBgk7bni7iASQCQp+kh1AIA5hnWR3sIsIFzLSMIAKAveAGyOUSqFTCT9Vt94ntLAJA5oEfBQpa0QCbVG7bPN/7MWAHM5jsBfl8XAmooAMiRPCmSrw34HPOYrfQ2QDbrdFAtBQC5Nn8qnbQIbK4zJM893jM+AGxjbwurqQAgS+OPAgAAwDbOzkT6dvUF8KEjaAG5PyGUSLmXpHAFps1jdjsGreXf6WsgUfvalLZXbPLXveUNgBm2LBwWAYDc9fF4YL955J8FaJawvl+h9b7jaywAyHNfen1J9+XQSruk+cj1vvIwn7Se6msA+IAAALhK0oNDIw9LPIu3AQDsuc4YQ3wrfmCYdvjd9l0AV5l63dsYB8hgLgLAXA8/l00LAJ7p50KlPFxvDAHugw+6kw/HKXXfVNNtvveIMel0LNyjJgfUABtcvQ981rHofh7a+5oDgKkSDliPmHStm6g7zLFpvk7bo4AsfxPgTVlzBJTzPwy83xbwHQA/+MTgcZMmQdP4Jo9L0zhMktwzAPCZ7yFxxuCjPvmqY8NZzhsAMz+5mHKdKdeYPFm31rx9HKBZyh515ZrTfv9wdd8nzMFGiXXf+ONuX+INAL7qdxNg9MQYKrXmUvkZUvuHmWPe/vANXCv17LF5fUq7tzN74AjtsU+NgQDgvbSBnH6dV2upU9qiy0z6qI8xBzZLfEjjfK8c8+M2jABgtiP0AOlAeW39k6T0KDv6iXNsGPO3n8ZYd4BfrREpNqy5yZLGOpLvAGDzN5umXU/bJtJQf9gi4VdCWjMAZko+j77CMakGAoD50r7sJOU6HCTVnl2B3mZJB4dnBgF6CEiSdmbm+a4Ose+3AQQA740YuFAptWs4dKbUGuhbYxrWWABmsTd98kMc3wHANg2TP/nhv6H+LZL7jOt74+0fAB5fR7fYdC8V52ABwJ4GHtFwrKYH95m8JvI6wgAAGEIAsIsHsP1SH8j0HvAPYQCQzplln6QxPW7hfAdA3oPV0fIFFI0T7gtSx3RzzfmXLwTk2euWdQMALjq7eQPgR5GYbfOBUn9yNT14vs1r2M+8JQBcLWHN3bC3briHOs1vAGxu2La3ABIW8UbqDiT92kEA+tg/HtT2BkD6pw7PbGCTYYeGXmWG1F5kh+S9GQDWmPYGgMMBLQ+iyb2+teZ8zPcBnKvt7a1feXv/1hoAJjqS9/O2NwCSnXHQ2X542np/sQvG4pqzoz83MMd+8FYAADyZAGA/h0n0EjCZ0Ak4gzPyfMbwL/ZOAUAGzatm3znoMoE+PZc94dc9p+8A4IsEAB22HSa33c939+B6b605+/p1C3Pu1/QdAHyBAKDnkLflMLnlPqZ8srWx3jCF+TdvzQSAaAKAazncAZN5CEP/AcAgAoCuh//pgcP065/2ALWx3nT18Abm4Z/pPwB4gADgGg50pB9c9Sjk8D0cc9dSAIgiAOh7sLr672+77mkHVg8a8yTMjdR+3iZhrFPpQQD4BAFA5+Et5Tq2Xu/Ug+q2OjdJGLvUvt5GSPd7ehAAPiAA6DqgJ19PCwdUzmJOdzHeAMDDBADn82nN1+vH+dSZZxBwvZZ5qwcB4CHfHvvHWXYwO8IP7BNq+IjEWm+rcbsjuNd4zRw29gDAbwkAnmviw1R6CLBBan0n9ivwZ0Kgf9dc6xsA/IIA4DkcNJ5vS01TH/6B3QQBAMA7vgPg6zY8qKbdQ9r1bHz431Jjfs348rYX9AMA8P8EAM95yPv+ZzIHxB7GuoNx5ud+aAoDpu/JAPAVv93v/QjAOQeOqQeshO8DmFq7t66u4ebaMm9OM2Mt0CcATOM7X/6CNwDO4SDV+4Bq7EmzYV7x2jcEtvSM9RgAhgcAkw4mDh59ksd8yrwBMmwLAwAmnduY7X4LNvVHAKb83mOvpZDAAR541hqSut8CAIsDgEmHEyHAfmk995aHf773QXKfMofvD4DHWHvZzPlioGk/AjD1gcfiv1fy2CbOBa6jHzizt/QXAFdIPotf5WgLAFJpzn2Sx9RhHH3R7e2vqH3Vr6tNXHeS12ngOtYGam35EYCfeR0FgC0mHVSPgdcMcIXE0HQqP3L9gK0BQGoIoDn3SOut72wmfKZHUvu3yX35PqTPIINzAbzWPb3g238EIHHRi28Kxo5hYr+TSa+gz2hac1L3ba6hH3bNbx4cj+0BALRsGhZfAABaJZzR77cBGgKAxAejEc3BO8aNTRLXRvbRZzTv4c4N/I61cZ/7bYiGAAC2T2qbCHoHrI/A7PPcZClnUeP7CQKA62jQOVLHyu/e5ll9RJfUNQ229P4rfu3mZ1jf88aE83nb5wMtAUDqAmghypc6Rqk9DQDJUvd1esZ86xnuKB3z+22YlgAANk3opAWWHfRUn9T1DaYzt7IYj173wv46PvMPNQUAqQfctMbhX8YF4OuspTS9Dq7fsxgPzuyB+9Tyfrt1OSYPFi+T2iOpIRY7WB/76n1fvq5svreJEnr+Z/cn9UrafTX2f+IYNI7L5nn+838vzafvry0ASG1McqT2xvYNgwzWxz5nhgCp6yn8qVc/Ox/09zk219VZbt48X9mXjQFAou2fwkyRPLmTr+0Z9H8OIUAfexD853wAdrvfis/RTd8BkP6wsa0Rp1F/oHkveubPRPt1W0zoeeAc5nm41gAAgN+zefe6LwlT9TDN9D/0OB79F/wIQBavYQJ0SfyRi/snDxhp180MiT0PZ2sLZczzYM1vALRNRIBHWCP51Wv9b//A37K+nEdt87SOSet9x9e4OQBI5VAFpLB5q/NE+hYgg/U4UHsAoCkBANjAuTaPMSGut9oDgNSJ6S0AIGmNTFwnt1FjdWyj59VzOz2uDpG9JQAAADZw2J7HmEEHcz2olgKAJxXyBN4CAJIkrpPwnf6kmf7PY0zUJLavBAAAkMGBkUb6nm30tNpEEwBkT1ZvAQBJEtfJbdRYzRrp+7+vm9plMR7E95YAIJ8QAEjicPOaGqvz52vFDsZSvabTw+o04kwgAHhfYAA+3ozgavpwH2OqTlPpXfUa01cCAABgGoftvYwt0+jZv6+b2l1AAPCeRgT4mLXyfGqsLq30vtpM4AH2eXXkhb0lAJjRiL4HAKCTA+b7etDBWL+vh5pkMBbn1JTba3pLADCHEABIY8NW61f2mn7rY9x/1IEMxuLc2jbX93jVXyQAAOArmjfrV2utdet980NzDzTfe5L2h9NXaqzz8cq/TAAwq/m8BQDQre0Q2nSv/Flj7zfdbzLjcE3NG+p+XHGf3179Fw7zz4B46Ab4eK38h/Xydd4eGDbVveHAx9dsXm/0//WMQZaNe91x9QUIAOa5JzQOADE2HJDsa/xtz0zt+bf0v9rz2DyZOO+PWwgBwMe8BQDAFNMeimIORIw1+aFA/6s5X5s76XP+uAX6Nv0GXqTp3pvu9a3W+042bUymXe8Z1CBH6kNRS4+03Gea1L6f1Bvp19fGeDxWn4R5f9zCeQMAAHb71WHkVYek+IMQa/2u9175gKD/Yfd+d9wGEgAAQJ+RhxZ4Ar0PXcz5n/g1gAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABQQAAAAAAABQQAAAAAUEAAAAAAAAUEAAAAAFBAAAAAAAAFBAAAAABw2+//AIr6A3RF4WWEAAAAAElFTkSuQmCC`,rr=e=>{let t=new Uint8Array(new ArrayBuffer(8)),n=e;for(let e=7;e>=0&&n!==0;e--)t[e]=n&255,n-=t[e],n/=256;return t};function ir(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name===`Uint8Array`&&`BYTES_PER_ELEMENT`in e&&e.BYTES_PER_ELEMENT===1}function ar(e,t=``){if(typeof e!=`number`){let n=t&&`"${t}" `;throw TypeError(`${n}expected number, got ${typeof e}`)}if(!Number.isSafeInteger(e)||e<0){let n=t&&`"${t}" `;throw RangeError(`${n}expected integer >= 0, got ${e}`)}}function or(e,t,n=``){let r=ir(e),i=e?.length;if(!r||t!==void 0){let t=n&&`"${n}" `,a=r?`length=${i}`:`type=${typeof e}`,o=t+`expected Uint8Array, got `+a;throw r?RangeError(o):TypeError(o)}return e}function sr(e){if(typeof e!=`function`||typeof e.create!=`function`)throw TypeError(`Hash must wrapped by utils.createHasher`);if(ar(e.outputLen),ar(e.blockLen),e.outputLen<1)throw Error(`"outputLen" must be >= 1`);if(e.blockLen<1)throw Error(`"blockLen" must be >= 1`)}function cr(e,t=!0){if(e.destroyed)throw Error(`Hash instance has been destroyed`);if(t&&e.finished)throw Error(`Hash#digest() has already been called`)}function lr(e,t){or(e,void 0,`digestInto() output`);let n=t.outputLen;if(e.length<n)throw RangeError(`"digestInto() output" expected to be of length >=`+n)}function ur(e){return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function dr(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function fr(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function pr(e,t){return e<<32-t|e>>>t}function mr(e,t){return e<<t|e>>>32-t>>>0}var hr=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function gr(e){return e<<24&4278190080|e<<8&16711680|e>>>8&65280|e>>>24&255}function _r(e){for(let t=0;t<e.length;t++)e[t]=gr(e[t]);return e}var vr=hr?e=>e:_r;function yr(e,t={}){let n=(t,n)=>e(n).update(t).digest(),r=e(void 0);return n.outputLen=r.outputLen,n.blockLen=r.blockLen,n.canXOF=r.canXOF,n.create=t=>e(t),Object.assign(n,t),Object.freeze(n)}var br=e=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,e])}),xr=class{update(e){return cr(this),this.iHash.update(e),this}digestInto(e){cr(this),lr(e,this),this.finished=!0;let t=e.subarray(0,this.outputLen);this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){let e=new Uint8Array(this.oHash.outputLen);return this.digestInto(e),e}_cloneInto(e){e||=Object.create(Object.getPrototypeOf(this),{});let{oHash:t,iHash:n,finished:r,destroyed:i,blockLen:a,outputLen:o}=this;return e=e,e.finished=r,e.destroyed=i,e.blockLen=a,e.outputLen=o,e.oHash=t._cloneInto(e.oHash),e.iHash=n._cloneInto(e.iHash),e}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}constructor(e,t){if(this.canXOF=!1,this.finished=!1,this.destroyed=!1,sr(e),or(t,void 0,`key`),this.iHash=e.create(),typeof this.iHash.update!=`function`)throw Error(`Expected instance of class which extends utils.Hash`);this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;let n=this.blockLen,r=new Uint8Array(n);r.set(t.length>n?e.create().update(t).digest():t);for(let e=0;e<r.length;e++)r[e]^=54;this.iHash.update(r),this.oHash=e.create();for(let e=0;e<r.length;e++)r[e]^=106;this.oHash.update(r),dr(r)}},Sr=(()=>{let e=(e,t,n)=>new xr(e,t).update(n).digest();return e.create=(e,t)=>new xr(e,t),e})();function Cr(e,t,n){return e&t^~e&n}function wr(e,t,n){return e&t^e&n^t&n}var Tr=class{update(e){cr(this),or(e);let{view:t,buffer:n,blockLen:r}=this,i=e.length;for(let a=0;a<i;){let o=Math.min(r-this.pos,i-a);if(o===r){let t=fr(e);for(;r<=i-a;a+=r)this.process(t,a);continue}n.set(e.subarray(a,a+o),this.pos),this.pos+=o,a+=o,this.pos===r&&(this.process(t,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){cr(this),lr(e,this),this.finished=!0;let{buffer:t,view:n,blockLen:r,isLE:i}=this,{pos:a}=this;t[a++]=128,dr(this.buffer.subarray(a)),this.padOffset>r-a&&(this.process(n,0),a=0);for(let e=a;e<r;e++)t[e]=0;n.setBigUint64(r-8,BigInt(this.length*8),i),this.process(n,0);let o=fr(e),s=this.outputLen;if(s%4)throw Error(`_sha2: outputLen must be aligned to 32bit`);let c=s/4,l=this.get();if(c>l.length)throw Error(`_sha2: outputLen bigger than state`);for(let e=0;e<c;e++)o.setUint32(4*e,l[e],i)}digest(){let{buffer:e,outputLen:t}=this;this.digestInto(e);let n=e.slice(0,t);return this.destroy(),n}_cloneInto(e){e||=new this.constructor,e.set(...this.get());let{blockLen:t,buffer:n,length:r,finished:i,destroyed:a,pos:o}=this;return e.destroyed=a,e.finished=i,e.length=r,e.pos=o,r%t&&e.buffer.set(n),e}clone(){return this._cloneInto()}constructor(e,t,n,r){this.canXOF=!1,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=t,this.padOffset=n,this.isLE=r,this.buffer=new Uint8Array(e),this.view=fr(this.buffer)}},Er=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),Dr=Uint32Array.from([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]),Or=Uint32Array.from([3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]),kr=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]),Ar=Uint32Array.from([1732584193,4023233417,2562383102,271733878,3285377520]),jr=new Uint32Array(80),Mr=class extends Tr{get(){let{A:e,B:t,C:n,D:r,E:i}=this;return[e,t,n,r,i]}set(e,t,n,r,i){this.A=e|0,this.B=t|0,this.C=n|0,this.D=r|0,this.E=i|0}process(e,t){for(let n=0;n<16;n++,t+=4)jr[n]=e.getUint32(t,!1);for(let e=16;e<80;e++)jr[e]=mr(jr[e-3]^jr[e-8]^jr[e-14]^jr[e-16],1);let{A:n,B:r,C:i,D:a,E:o}=this;for(let e=0;e<80;e++){let t,s;e<20?(t=Cr(r,i,a),s=1518500249):e<40?(t=r^i^a,s=1859775393):e<60?(t=wr(r,i,a),s=2400959708):(t=r^i^a,s=3395469782);let c=mr(n,5)+t+o+s+jr[e]|0;o=a,a=i,i=mr(r,30),r=n,n=c}n=n+this.A|0,r=r+this.B|0,i=i+this.C|0,a=a+this.D|0,o=o+this.E|0,this.set(n,r,i,a,o)}roundClean(){dr(jr)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0),dr(this.buffer)}constructor(){super(64,20,8,!1),this.A=Ar[0]|0,this.B=Ar[1]|0,this.C=Ar[2]|0,this.D=Ar[3]|0,this.E=Ar[4]|0}},Nr=yr(()=>new Mr),Pr=BigInt(2**32-1),Fr=BigInt(32);function Ir(e,t=!1){return t?{h:Number(e&Pr),l:Number(e>>Fr&Pr)}:{h:Number(e>>Fr&Pr)|0,l:Number(e&Pr)|0}}function Lr(e,t=!1){let n=e.length,r=new Uint32Array(n),i=new Uint32Array(n);for(let a=0;a<n;a++){let{h:n,l:o}=Ir(e[a],t);[r[a],i[a]]=[n,o]}return[r,i]}var Rr=(e,t,n)=>e>>>n,zr=(e,t,n)=>e<<32-n|t>>>n,Br=(e,t,n)=>e>>>n|t<<32-n,Vr=(e,t,n)=>e<<32-n|t>>>n,Hr=(e,t,n)=>e<<64-n|t>>>n-32,Ur=(e,t,n)=>e>>>n-32|t<<64-n,Wr=(e,t,n)=>e<<n|t>>>32-n,Gr=(e,t,n)=>t<<n|e>>>32-n,Kr=(e,t,n)=>t<<n-32|e>>>64-n,qr=(e,t,n)=>e<<n-32|t>>>64-n;function Jr(e,t,n,r){let i=(t>>>0)+(r>>>0);return{h:e+n+(i/2**32|0)|0,l:i|0}}var Yr=(e,t,n)=>(e>>>0)+(t>>>0)+(n>>>0),Xr=(e,t,n,r)=>t+n+r+(e/2**32|0)|0,Zr=(e,t,n,r)=>(e>>>0)+(t>>>0)+(n>>>0)+(r>>>0),Qr=(e,t,n,r,i)=>t+n+r+i+(e/2**32|0)|0,$r=(e,t,n,r,i)=>(e>>>0)+(t>>>0)+(n>>>0)+(r>>>0)+(i>>>0),ei=(e,t,n,r,i,a)=>t+n+r+i+a+(e/2**32|0)|0,ti=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),ni=new Uint32Array(64),ri=class extends Tr{get(){let{A:e,B:t,C:n,D:r,E:i,F:a,G:o,H:s}=this;return[e,t,n,r,i,a,o,s]}set(e,t,n,r,i,a,o,s){this.A=e|0,this.B=t|0,this.C=n|0,this.D=r|0,this.E=i|0,this.F=a|0,this.G=o|0,this.H=s|0}process(e,t){for(let n=0;n<16;n++,t+=4)ni[n]=e.getUint32(t,!1);for(let e=16;e<64;e++){let t=ni[e-15],n=ni[e-2],r=pr(t,7)^pr(t,18)^t>>>3;ni[e]=(pr(n,17)^pr(n,19)^n>>>10)+ni[e-7]+r+ni[e-16]|0}let{A:n,B:r,C:i,D:a,E:o,F:s,G:c,H:l}=this;for(let e=0;e<64;e++){let t=pr(o,6)^pr(o,11)^pr(o,25),u=l+t+Cr(o,s,c)+ti[e]+ni[e]|0,d=(pr(n,2)^pr(n,13)^pr(n,22))+wr(n,r,i)|0;l=c,c=s,s=o,o=a+u|0,a=i,i=r,r=n,n=u+d|0}n=n+this.A|0,r=r+this.B|0,i=i+this.C|0,a=a+this.D|0,o=o+this.E|0,s=s+this.F|0,c=c+this.G|0,l=l+this.H|0,this.set(n,r,i,a,o,s,c,l)}roundClean(){dr(ni)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0,0,0,0),dr(this.buffer)}constructor(e){super(64,e,8,!1)}},ii=class extends ri{constructor(){super(32),this.A=Er[0]|0,this.B=Er[1]|0,this.C=Er[2]|0,this.D=Er[3]|0,this.E=Er[4]|0,this.F=Er[5]|0,this.G=Er[6]|0,this.H=Er[7]|0}},ai=class extends ri{constructor(){super(28),this.A=Dr[0]|0,this.B=Dr[1]|0,this.C=Dr[2]|0,this.D=Dr[3]|0,this.E=Dr[4]|0,this.F=Dr[5]|0,this.G=Dr[6]|0,this.H=Dr[7]|0}},oi=Lr(`0x428a2f98d728ae22.0x7137449123ef65cd.0xb5c0fbcfec4d3b2f.0xe9b5dba58189dbbc.0x3956c25bf348b538.0x59f111f1b605d019.0x923f82a4af194f9b.0xab1c5ed5da6d8118.0xd807aa98a3030242.0x12835b0145706fbe.0x243185be4ee4b28c.0x550c7dc3d5ffb4e2.0x72be5d74f27b896f.0x80deb1fe3b1696b1.0x9bdc06a725c71235.0xc19bf174cf692694.0xe49b69c19ef14ad2.0xefbe4786384f25e3.0x0fc19dc68b8cd5b5.0x240ca1cc77ac9c65.0x2de92c6f592b0275.0x4a7484aa6ea6e483.0x5cb0a9dcbd41fbd4.0x76f988da831153b5.0x983e5152ee66dfab.0xa831c66d2db43210.0xb00327c898fb213f.0xbf597fc7beef0ee4.0xc6e00bf33da88fc2.0xd5a79147930aa725.0x06ca6351e003826f.0x142929670a0e6e70.0x27b70a8546d22ffc.0x2e1b21385c26c926.0x4d2c6dfc5ac42aed.0x53380d139d95b3df.0x650a73548baf63de.0x766a0abb3c77b2a8.0x81c2c92e47edaee6.0x92722c851482353b.0xa2bfe8a14cf10364.0xa81a664bbc423001.0xc24b8b70d0f89791.0xc76c51a30654be30.0xd192e819d6ef5218.0xd69906245565a910.0xf40e35855771202a.0x106aa07032bbd1b8.0x19a4c116b8d2d0c8.0x1e376c085141ab53.0x2748774cdf8eeb99.0x34b0bcb5e19b48a8.0x391c0cb3c5c95a63.0x4ed8aa4ae3418acb.0x5b9cca4f7763e373.0x682e6ff3d6b2b8a3.0x748f82ee5defb2fc.0x78a5636f43172f60.0x84c87814a1f0ab72.0x8cc702081a6439ec.0x90befffa23631e28.0xa4506cebde82bde9.0xbef9a3f7b2c67915.0xc67178f2e372532b.0xca273eceea26619c.0xd186b8c721c0c207.0xeada7dd6cde0eb1e.0xf57d4f7fee6ed178.0x06f067aa72176fba.0x0a637dc5a2c898a6.0x113f9804bef90dae.0x1b710b35131c471b.0x28db77f523047d84.0x32caab7b40c72493.0x3c9ebe0a15c9bebc.0x431d67c49c100d4c.0x4cc5d4becb3e42b6.0x597f299cfc657e2a.0x5fcb6fab3ad6faec.0x6c44198c4a475817`.split(`.`).map(e=>BigInt(e))),si=oi[0],ci=oi[1],li=new Uint32Array(80),ui=new Uint32Array(80),di=class extends Tr{get(){let{Ah:e,Al:t,Bh:n,Bl:r,Ch:i,Cl:a,Dh:o,Dl:s,Eh:c,El:l,Fh:u,Fl:d,Gh:f,Gl:p,Hh:m,Hl:h}=this;return[e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h]}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.Ah=e|0,this.Al=t|0,this.Bh=n|0,this.Bl=r|0,this.Ch=i|0,this.Cl=a|0,this.Dh=o|0,this.Dl=s|0,this.Eh=c|0,this.El=l|0,this.Fh=u|0,this.Fl=d|0,this.Gh=f|0,this.Gl=p|0,this.Hh=m|0,this.Hl=h|0}process(e,t){for(let n=0;n<16;n++,t+=4)li[n]=e.getUint32(t),ui[n]=e.getUint32(t+=4);for(let e=16;e<80;e++){let t=li[e-15]|0,n=ui[e-15]|0,r=Br(t,n,1)^Br(t,n,8)^Rr(t,n,7),i=Vr(t,n,1)^Vr(t,n,8)^zr(t,n,7),a=li[e-2]|0,o=ui[e-2]|0,s=Br(a,o,19)^Hr(a,o,61)^Rr(a,o,6),c=Zr(i,Vr(a,o,19)^Ur(a,o,61)^zr(a,o,6),ui[e-7],ui[e-16]);li[e]=Qr(c,r,s,li[e-7],li[e-16])|0,ui[e]=c|0}let{Ah:n,Al:r,Bh:i,Bl:a,Ch:o,Cl:s,Dh:c,Dl:l,Eh:u,El:d,Fh:f,Fl:p,Gh:m,Gl:h,Hh:g,Hl:_}=this;for(let e=0;e<80;e++){let t=Br(u,d,14)^Br(u,d,18)^Hr(u,d,41),v=Vr(u,d,14)^Vr(u,d,18)^Ur(u,d,41),y=u&f^~u&m,b=d&p^~d&h,x=$r(_,v,b,ci[e],ui[e]),S=ei(x,g,t,y,si[e],li[e]),C=x|0,w=Br(n,r,28)^Hr(n,r,34)^Hr(n,r,39),T=Vr(n,r,28)^Ur(n,r,34)^Ur(n,r,39),E=n&i^n&o^i&o,D=r&a^r&s^a&s;g=m|0,_=h|0,m=f|0,h=p|0,f=u|0,p=d|0,{h:u,l:d}=Jr(c|0,l|0,S|0,C|0),c=o|0,l=s|0,o=i|0,s=a|0,i=n|0,a=r|0;let O=Yr(C,T,D);n=Xr(O,S,w,E),r=O|0}({h:n,l:r}=Jr(this.Ah|0,this.Al|0,n|0,r|0)),{h:i,l:a}=Jr(this.Bh|0,this.Bl|0,i|0,a|0),{h:o,l:s}=Jr(this.Ch|0,this.Cl|0,o|0,s|0),{h:c,l}=Jr(this.Dh|0,this.Dl|0,c|0,l|0),{h:u,l:d}=Jr(this.Eh|0,this.El|0,u|0,d|0),{h:f,l:p}=Jr(this.Fh|0,this.Fl|0,f|0,p|0),{h:m,l:h}=Jr(this.Gh|0,this.Gl|0,m|0,h|0),{h:g,l:_}=Jr(this.Hh|0,this.Hl|0,g|0,_|0),this.set(n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_)}roundClean(){dr(li,ui)}destroy(){this.destroyed=!0,dr(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}constructor(e){super(128,e,16,!1)}},fi=class extends di{constructor(){super(64),this.Ah=kr[0]|0,this.Al=kr[1]|0,this.Bh=kr[2]|0,this.Bl=kr[3]|0,this.Ch=kr[4]|0,this.Cl=kr[5]|0,this.Dh=kr[6]|0,this.Dl=kr[7]|0,this.Eh=kr[8]|0,this.El=kr[9]|0,this.Fh=kr[10]|0,this.Fl=kr[11]|0,this.Gh=kr[12]|0,this.Gl=kr[13]|0,this.Hh=kr[14]|0,this.Hl=kr[15]|0}},pi=class extends di{constructor(){super(48),this.Ah=Or[0]|0,this.Al=Or[1]|0,this.Bh=Or[2]|0,this.Bl=Or[3]|0,this.Ch=Or[4]|0,this.Cl=Or[5]|0,this.Dh=Or[6]|0,this.Dl=Or[7]|0,this.Eh=Or[8]|0,this.El=Or[9]|0,this.Fh=Or[10]|0,this.Fl=Or[11]|0,this.Gh=Or[12]|0,this.Gl=Or[13]|0,this.Hh=Or[14]|0,this.Hl=Or[15]|0}},mi=yr(()=>new ii,br(1)),hi=yr(()=>new ai,br(4)),gi=yr(()=>new fi,br(3)),_i=yr(()=>new pi,br(2)),vi=BigInt(0),yi=BigInt(1),bi=BigInt(2),xi=BigInt(7),Si=BigInt(256),Ci=BigInt(113),wi=[],Ti=[],Ei=[];for(let e=0,t=yi,n=1,r=0;e<24;e++){[n,r]=[r,(2*n+3*r)%5],wi.push(2*(5*r+n)),Ti.push((e+1)*(e+2)/2%64);let i=vi;for(let e=0;e<7;e++)t=(t<<yi^(t>>xi)*Ci)%Si,t&bi&&(i^=yi<<(yi<<BigInt(e))-yi);Ei.push(i)}var Di=Lr(Ei,!0),Oi=Di[0],ki=Di[1],Ai=(e,t,n)=>n>32?Kr(e,t,n):Wr(e,t,n),ji=(e,t,n)=>n>32?qr(e,t,n):Gr(e,t,n);function Mi(e,t=24){if(ar(t,`rounds`),t<1||t>24)throw Error(`"rounds" expected integer 1..24`);let n=new Uint32Array(10);for(let r=24-t;r<24;r++){for(let t=0;t<10;t++)n[t]=e[t]^e[t+10]^e[t+20]^e[t+30]^e[t+40];for(let t=0;t<10;t+=2){let r=(t+8)%10,i=(t+2)%10,a=n[i],o=n[i+1],s=Ai(a,o,1)^n[r],c=ji(a,o,1)^n[r+1];for(let n=0;n<50;n+=10)e[t+n]^=s,e[t+n+1]^=c}let t=e[2],i=e[3];for(let n=0;n<24;n++){let r=Ti[n],a=Ai(t,i,r),o=ji(t,i,r),s=wi[n];t=e[s],i=e[s+1],e[s]=a,e[s+1]=o}for(let t=0;t<50;t+=10){let n=e[t],r=e[t+1],i=e[t+2],a=e[t+3];e[t]^=~e[t+2]&e[t+4],e[t+1]^=~e[t+3]&e[t+5],e[t+2]^=~e[t+4]&e[t+6],e[t+3]^=~e[t+5]&e[t+7],e[t+4]^=~e[t+6]&e[t+8],e[t+5]^=~e[t+7]&e[t+9],e[t+6]^=~e[t+8]&n,e[t+7]^=~e[t+9]&r,e[t+8]^=~n&i,e[t+9]^=~r&a}e[0]^=Oi[r],e[1]^=ki[r]}dr(n)}var Ni=class e{clone(){return this._cloneInto()}keccak(){vr(this.state32),Mi(this.state32,this.rounds),vr(this.state32),this.posOut=0,this.pos=0}update(e){cr(this),or(e);let{blockLen:t,state:n}=this,r=e.length;for(let i=0;i<r;){let a=Math.min(t-this.pos,r-i);for(let t=0;t<a;t++)n[this.pos++]^=e[i++];this.pos===t&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;let{state:e,suffix:t,pos:n,blockLen:r}=this;e[n]^=t,t&128&&n===r-1&&this.keccak(),e[r-1]^=128,this.keccak()}writeInto(e){cr(this,!1),or(e),this.finish();let t=this.state,{blockLen:n}=this;for(let r=0,i=e.length;r<i;){this.posOut>=n&&this.keccak();let a=Math.min(n-this.posOut,i-r);e.set(t.subarray(this.posOut,this.posOut+a),r),this.posOut+=a,r+=a}return e}xofInto(e){if(!this.enableXOF)throw Error(`XOF is not possible for this instance`);return this.writeInto(e)}xof(e){return ar(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(lr(e,this),this.finished)throw Error(`digest() was already called`);this.writeInto(e.subarray(0,this.outputLen)),this.destroy()}digest(){let e=new Uint8Array(this.outputLen);return this.digestInto(e),e}destroy(){this.destroyed=!0,dr(this.state)}_cloneInto(t){let{blockLen:n,suffix:r,outputLen:i,rounds:a,enableXOF:o}=this;return t||=new e(n,r,i,o,a),t.blockLen=n,t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=a,t.suffix=r,t.outputLen=i,t.enableXOF=o,t.canXOF=this.canXOF,t.destroyed=this.destroyed,t}constructor(e,t,n,r=!1,i=24){if(this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,this.enableXOF=!1,this.blockLen=e,this.suffix=t,this.outputLen=n,this.enableXOF=r,this.canXOF=r,this.rounds=i,ar(n,`outputLen`),!(0<e&&e<200))throw Error(`only keccak-f1600 function is supported`);this.state=new Uint8Array(200),this.state32=ur(this.state)}},Pi=(e,t,n,r={})=>yr(()=>new Ni(t,e,n),r),Fi=Pi(6,144,28,br(7)),Ii=Pi(6,136,32,br(8)),Li=Pi(6,104,48,br(9)),Ri=Pi(6,72,64,br(10)),zi=(()=>{if(typeof globalThis==`object`)return globalThis;Object.defineProperty(Object.prototype,"__GLOBALTHIS__",{get(){return this},configurable:!0});try{if(typeof __GLOBALTHIS__<`u`)return __GLOBALTHIS__}finally{delete Object.prototype.__GLOBALTHIS__}if(typeof self<`u`)return self;if(typeof window<`u`)return window;if(typeof global<`u`)return global})(),Bi={SHA1:Nr,SHA224:hi,SHA256:mi,SHA384:_i,SHA512:gi,"SHA3-224":Fi,"SHA3-256":Ii,"SHA3-384":Li,"SHA3-512":Ri},Vi=e=>{switch(!0){case/^(?:SHA-?1|SSL3-SHA1)$/i.test(e):return`SHA1`;case/^SHA(?:2?-)?224$/i.test(e):return`SHA224`;case/^SHA(?:2?-)?256$/i.test(e):return`SHA256`;case/^SHA(?:2?-)?384$/i.test(e):return`SHA384`;case/^SHA(?:2?-)?512$/i.test(e):return`SHA512`;case/^SHA3-224$/i.test(e):return`SHA3-224`;case/^SHA3-256$/i.test(e):return`SHA3-256`;case/^SHA3-384$/i.test(e):return`SHA3-384`;case/^SHA3-512$/i.test(e):return`SHA3-512`;default:throw TypeError(`Unknown hash algorithm: ${e}`)}},Hi=(e,t,n)=>{if(Sr)return Sr(Bi[e]??Bi[Vi(e)],t,n);throw Error(`Missing HMAC function`)},Ui=`ABCDEFGHIJKLMNOPQRSTUVWXYZ234567`,Wi=e=>{e=e.replace(/ /g,``);let t=e.length;for(;e[t-1]===`=`;)--t;e=(t<e.length?e.substring(0,t):e).toUpperCase();let n=new ArrayBuffer(e.length*5/8|0),r=new Uint8Array(n),i=0,a=0,o=0;for(let t=0;t<e.length;t++){let n=Ui.indexOf(e[t]);if(n===-1)throw TypeError(`Invalid character found: ${e[t]}`);a=a<<5|n,i+=5,i>=8&&(i-=8,r[o++]=a>>>i)}return r},Gi=e=>{let t=0,n=0,r=``;for(let i=0;i<e.length;i++)for(n=n<<8|e[i],t+=8;t>=5;)r+=Ui[n>>>t-5&31],t-=5;return t>0&&(r+=Ui[n<<5-t&31]),r},Ki=e=>{e=e.replace(/ /g,``);let t=new ArrayBuffer(e.length/2),n=new Uint8Array(t);for(let t=0;t<e.length;t+=2)n[t/2]=parseInt(e.substring(t,t+2),16);return n},qi=e=>{let t=``;for(let n=0;n<e.length;n++){let r=e[n].toString(16);r.length===1&&(t+=`0`),t+=r}return t.toUpperCase()},Ji=e=>{let t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let t=0;t<e.length;t++)n[t]=e.charCodeAt(t)&255;return n},Yi=e=>{let t=``;for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t},Xi=zi.TextEncoder?new zi.TextEncoder:null,Zi=zi.TextDecoder?new zi.TextDecoder:null,Qi=e=>{if(!Xi)throw Error(`Encoding API not available`);return Xi.encode(e)},$i=e=>{if(!Zi)throw Error(`Encoding API not available`);return Zi.decode(e)},ea=e=>{if(zi.crypto?.getRandomValues)return zi.crypto.getRandomValues(new Uint8Array(e));throw Error(`Cryptography API not available`)},ta=class e{static fromLatin1(t){return new e({buffer:Ji(t).buffer})}static fromUTF8(t){return new e({buffer:Qi(t).buffer})}static fromBase32(t){return new e({buffer:Wi(t).buffer})}static fromHex(t){return new e({buffer:Ki(t).buffer})}get buffer(){return this.bytes.buffer}get latin1(){return Object.defineProperty(this,"latin1",{enumerable:!0,writable:!1,configurable:!1,value:Yi(this.bytes)}),this.latin1}get utf8(){return Object.defineProperty(this,"utf8",{enumerable:!0,writable:!1,configurable:!1,value:$i(this.bytes)}),this.utf8}get base32(){return Object.defineProperty(this,"base32",{enumerable:!0,writable:!1,configurable:!1,value:Gi(this.bytes)}),this.base32}get hex(){return Object.defineProperty(this,"hex",{enumerable:!0,writable:!1,configurable:!1,value:qi(this.bytes)}),this.hex}constructor({buffer:e,size:t=20}={}){this.bytes=e===void 0?ea(t):new Uint8Array(e),Object.defineProperty(this,"bytes",{enumerable:!0,writable:!1,configurable:!1,value:this.bytes})}},na=(e,t)=>{{if(e.length!==t.length)throw TypeError(`Input strings must have the same length`);let n=-1,r=0;for(;++n<e.length;)r|=e.charCodeAt(n)^t.charCodeAt(n);return r===0}},ra=class e{static get defaults(){return{issuer:``,label:`OTPAuth`,issuerInLabel:!0,algorithm:`SHA1`,digits:6,counter:0,window:1}}static generate({secret:t,algorithm:n=e.defaults.algorithm,digits:r=e.defaults.digits,counter:i=e.defaults.counter,hmac:a=Hi}){let o=rr(i),s=a(n,t.bytes,o);if(!s?.byteLength||s.byteLength<19)throw TypeError(`Return value must be at least 19 bytes`);let c=s[s.byteLength-1]&15;return(((s[c]&127)<<24|(s[c+1]&255)<<16|(s[c+2]&255)<<8|s[c+3]&255)%10**r).toString().padStart(r,`0`)}generate({counter:t=this.counter++}={}){return e.generate({secret:this.secret,algorithm:this.algorithm,digits:this.digits,counter:t,hmac:this.hmac})}static validate({token:t,secret:n,algorithm:r,digits:i=e.defaults.digits,counter:a=e.defaults.counter,window:o=e.defaults.window,hmac:s=Hi}){if(t.length!==i)return null;let c=null,l=o=>{na(t,e.generate({secret:n,algorithm:r,digits:i,counter:o,hmac:s}))&&(c=o-a)};l(a);for(let e=1;e<=o&&c===null&&(l(a-e),!(c!==null||(l(a+e),c!==null)));++e);return c}validate({token:t,counter:n=this.counter,window:r}){return e.validate({token:t,secret:this.secret,algorithm:this.algorithm,digits:this.digits,counter:n,window:r,hmac:this.hmac})}toString(){let e=encodeURIComponent;return`otpauth://hotp/${this.issuer.length>0?this.issuerInLabel?`${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?`}secret=${e(this.secret.base32)}&algorithm=${e(this.algorithm)}&digits=${e(this.digits)}&counter=${e(this.counter)}`}constructor({issuer:t=e.defaults.issuer,label:n=e.defaults.label,issuerInLabel:r=e.defaults.issuerInLabel,secret:i=new ta,algorithm:a=e.defaults.algorithm,digits:o=e.defaults.digits,counter:s=e.defaults.counter,hmac:c}={}){this.issuer=t,this.label=n,this.issuerInLabel=r,this.secret=typeof i==`string`?ta.fromBase32(i):i,this.algorithm=c?a:Vi(a),this.digits=o,this.counter=s,this.hmac=c}},ia=class e{static get defaults(){return{issuer:``,label:`OTPAuth`,issuerInLabel:!0,algorithm:`SHA1`,digits:6,period:30,window:1}}static counter({period:t=e.defaults.period,timestamp:n=Date.now()}={}){return Math.floor(n/1e3/t)}counter({timestamp:t=Date.now()}={}){return e.counter({period:this.period,timestamp:t})}static remaining({period:t=e.defaults.period,timestamp:n=Date.now()}={}){return t*1e3-n%(t*1e3)}remaining({timestamp:t=Date.now()}={}){return e.remaining({period:this.period,timestamp:t})}static generate({secret:t,algorithm:n,digits:r,period:i=e.defaults.period,timestamp:a=Date.now(),hmac:o}){return ra.generate({secret:t,algorithm:n,digits:r,counter:e.counter({period:i,timestamp:a}),hmac:o})}generate({timestamp:t=Date.now()}={}){return e.generate({secret:this.secret,algorithm:this.algorithm,digits:this.digits,period:this.period,timestamp:t,hmac:this.hmac})}static validate({token:t,secret:n,algorithm:r,digits:i,period:a=e.defaults.period,timestamp:o=Date.now(),window:s,hmac:c}){return ra.validate({token:t,secret:n,algorithm:r,digits:i,counter:e.counter({period:a,timestamp:o}),window:s,hmac:c})}validate({token:t,timestamp:n,window:r}){return e.validate({token:t,secret:this.secret,algorithm:this.algorithm,digits:this.digits,period:this.period,timestamp:n,window:r,hmac:this.hmac})}toString(){let e=encodeURIComponent;return`otpauth://totp/${this.issuer.length>0?this.issuerInLabel?`${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?`}secret=${e(this.secret.base32)}&algorithm=${e(this.algorithm)}&digits=${e(this.digits)}&period=${e(this.period)}`}constructor({issuer:t=e.defaults.issuer,label:n=e.defaults.label,issuerInLabel:r=e.defaults.issuerInLabel,secret:i=new ta,algorithm:a=e.defaults.algorithm,digits:o=e.defaults.digits,period:s=e.defaults.period,hmac:c}={}){this.issuer=t,this.label=n,this.issuerInLabel=r,this.secret=typeof i==`string`?ta.fromBase32(i):i,this.algorithm=c?a:Vi(a),this.digits=o,this.period=s,this.hmac=c}};function aa(){W.isDemoMode&&(localStorage.setItem(`ryzin_is_demo_mode`,`false`),W.isDemoMode=!1,W.STORAGE_KEY=`livecommerce_erp_data`,W._load());let e=document.createElement(`div`);return e.className=`login-container`,e.innerHTML=`
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
        height: 38px;
        max-width: 220px;
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
              <img src="${nr}" alt="Ryzin Logo" />
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
              <img src="${nr}" alt="Ryzin Logo" />
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
  `,setTimeout(()=>{let e=document.getElementById(`login-form`),t=document.getElementById(`otp-form`),n=document.getElementById(`login-slider`),r=document.getElementById(`btn-back`),i=document.getElementById(`btn-reset-otp`);document.getElementById(`otp-setup-container`),document.getElementById(`qrcode-box`);let a=document.getElementById(`login-otp`),o=null;e&&e.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`login-id`).value.trim(),r=document.getElementById(`login-pw`).value;if(n.toLowerCase()===`admin`&&r.trim()===`1234`){W.loginAsDemo();return}let i=e.querySelector(`button[type="submit"]`),a=i?i.textContent:`로그인`;i&&(i.textContent=`로그인 중...`,i.disabled=!0);try{await W.init()}catch(e){console.warn(`Failed to sync users from Supabase before login`,e)}finally{i&&(i.textContent=a,i.disabled=!1)}let o=W.verifyPassword(n,r);if(o){if(W.isDemoMode){W.completeLogin(o),J(`데모 모드로 접속되었습니다.`),M.navigate(`/`);return}W.completeLogin(o),J(`환영합니다.`),o.role&&o.role.startsWith(`live_stream:`)?M.navigate(`/live_stream`):o.role&&o.role.startsWith(`brand:`)?M.navigate(`/projects`):M.navigate(`/`);return}else Y(`로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.`)}),t&&t.addEventListener(`submit`,e=>{if(e.preventDefault(),!o)return;let t=a.value.trim(),n=o.otpSecret||localStorage.getItem(`ryzin_otp_${o.id}`)||null;try{new ia({issuer:`Ryzin Admin`,label:o.id,algorithm:`SHA1`,digits:6,period:30,secret:ta.fromBase32(n)}).validate({token:t,window:1})===null?(Y(`인증번호가 올바르지 않습니다.`),a.value=``,a.focus()):(localStorage.setItem(`ryzin_otp_trusted_${o.id}`,`true`),W.completeLogin(o),J(`OTP 인증 성공! 환영합니다.`),M.navigate(`/`))}catch{Y(`인증 과정에 문제가 발생했습니다.`)}}),i&&i.addEventListener(`click`,()=>{o&&confirm(`OTP 설정을 초기화하시겠습니까? 기기에서 기존 계정을 삭제하고 새로 등록해야 합니다.`)&&(localStorage.removeItem(`ryzin_otp_${o.id}`),alert(`OTP 설정이 초기화되었습니다. 다시 로그인하여 새 QR 코드를 스캔하세요.`),n.style.transform=`translateX(0)`,o=null,a.value=``)}),r&&r.addEventListener(`click`,()=>{n.style.transform=`translateX(0)`,o=null,a.value=``})},0),e}var oa=`https://vybrnhyaeugfwezbygdt.supabase.co`,sa=`sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9`,ca={"Content-Type":`application/json`,apikey:sa,Authorization:`Bearer ${sa}`,Prefer:`return=representation`};async function la(e,t=``){let n=await fetch(`${oa}/rest/v1/${e}?${t}`,{headers:ca});if(!n.ok)throw Error(`DB fetch error: ${n.status}`);return n.json()}async function ua(e,t){let n=await fetch(`${oa}/rest/v1/${e}`,{method:`POST`,headers:ca,body:JSON.stringify(t)});if(!n.ok)throw Error(`DB insert error: ${n.status}`);return n.json()}async function da(e,t,n){let r=await fetch(`${oa}/rest/v1/${e}?id=eq.${t}`,{method:`PATCH`,headers:ca,body:JSON.stringify(n)});if(!r.ok)throw Error(`DB update error: ${r.status}`);return r.json()}async function fa(e,t){let n=await fetch(`${oa}/rest/v1/${e}?id=eq.${t}`,{method:`DELETE`,headers:ca});if(!n.ok)throw Error(`DB delete error: ${n.status}`);return!0}var pa={getAll:()=>la(`shop_banners`,`select=*&order=sort_order.asc`),insert:e=>ua(`shop_banners`,e),update:(e,t)=>da(`shop_banners`,e,t),delete:e=>fa(`shop_banners`,e)},ma={getAll:()=>la(`shop_sections`,`select=*&order=sort_order.asc`),insert:e=>ua(`shop_sections`,e),update:(e,t)=>da(`shop_sections`,e,t),delete:e=>fa(`shop_sections`,e)},ha={getAll:()=>la(`shop_menus`,`select=*&order=sort_order.asc`),insert:e=>ua(`shop_menus`,e),update:(e,t)=>da(`shop_menus`,e,t),delete:e=>fa(`shop_menus`,e)},ga={getAll:()=>la(`shop_products`,`select=*&order=sort_order.asc`),getBySectionId:e=>la(`shop_products`,`select=*&section_id=eq.${e}&order=sort_order.asc`),insert:e=>ua(`shop_products`,e),update:(e,t)=>da(`shop_products`,e,t),delete:e=>fa(`shop_products`,e)},_a={getAll:()=>la(`shop_magazines`,`select=*&order=sort_order.asc`),insert:e=>ua(`shop_magazines`,e),update:(e,t)=>da(`shop_magazines`,e,t),delete:e=>fa(`shop_magazines`,e)},va={getAll:()=>la(`shop_users`,`select=*&order=created_at.desc`),insert:e=>ua(`shop_users`,e),update:(e,t)=>da(`shop_users`,e,t),delete:e=>fa(`shop_users`,e)};function ya(){return`PROD-${Math.floor(Math.random()*89999+1e4)}`}function ba(e){let t=document.createElement(`style`);t.innerHTML=`
    .sm-input { 
      width: 100%; 
      padding: 8px 12px; 
      border: 1.5px solid #e2e8f0; 
      border-radius: 8px; 
      font-size: 13px; 
      font-weight: 500;
      outline: none; 
      transition: all 0.15s ease; 
      background: #ffffff; 
      box-sizing: border-box; 
      color: #0f172a; 
    }
    .sm-input:focus { 
      border-color: #2563eb; 
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12); 
    }
    .sm-label { 
      display: block; 
      font-size: 11px; 
      font-weight: 700; 
      color: #64748b; 
      margin-bottom: 5px; 
      letter-spacing: -0.01em; 
    }
    .sm-tab-btn { 
      padding: 9px 18px; 
      border-radius: 8px; 
      font-size: 13px; 
      font-weight: 700; 
      cursor: pointer; 
      border: 1px solid #e2e8f0; 
      transition: all 0.15s ease; 
      background: #ffffff; 
      color: #64748b; 
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .sm-tab-btn.active { 
      background: #0f172a; 
      color: #ffffff; 
      border-color: #0f172a;
    }
    .sm-tab-btn:hover:not(.active) { 
      background: #f1f5f9; 
      color: #0f172a; 
    }
    .sm-card { 
      background: #ffffff; 
      border: 1.5px solid #e2e8f0; 
      border-radius: 12px; 
      padding: 18px 20px; 
      margin-bottom: 16px; 
      transition: border-color 0.15s ease;
    }
    .sm-card:hover {
      border-color: #cbd5e1;
    }
    .sm-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f1f5f9;
    }
    .sm-card-title {
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sm-action-btn { 
      display: inline-flex; 
      align-items: center; 
      justify-content: center;
      gap: 5px; 
      padding: 7px 14px; 
      border-radius: 6px; 
      font-size: 12px; 
      font-weight: 700; 
      cursor: pointer; 
      border: none; 
      transition: all 0.15s ease; 
    }
    .sm-action-btn:hover { 
      opacity: 0.92; 
    }
    .sm-btn-primary { 
      background: #2563eb; 
      color: #ffffff; 
    }
    .sm-btn-success { 
      background: #059669; 
      color: #ffffff; 
    }
    .sm-btn-danger { 
      background: #dc2626; 
      color: #ffffff; 
    }
    .sm-btn-secondary {
      background: #64748b;
      color: #ffffff;
    }
    .sm-thumb-uploader {
      border: 1.5px dashed #cbd5e1;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      background: #f8fafc;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sm-thumb-uploader:hover {
      border-color: #2563eb;
      background: #eff6ff;
    }
    .sm-thumb-uploader-overlay {
      position: absolute;
      inset: 0;
      background: rgba(15,23,42,0.65);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.15s ease;
    }
    .sm-thumb-uploader:hover .sm-thumb-uploader-overlay {
      opacity: 1;
    }
    .sm-rank-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #334155;
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .color-picker-box {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .color-picker-input {
      width: 34px;
      height: 34px;
      padding: 0;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      cursor: pointer;
      background: none;
    }

    /* ── 상품 데이터 테이블 ── */
    .sm-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }
    .sm-table th {
      background: #f8fafc;
      padding: 12px 14px;
      text-align: left;
      font-weight: 700;
      color: #475569;
      border-bottom: 1.5px solid #e2e8f0;
      font-size: 12px;
    }
    .sm-table td {
      padding: 12px 14px;
      border-bottom: 1px solid #f1f5f9;
      color: #0f172a;
      vertical-align: middle;
    }
    .sm-table tr:hover td {
      background: #f8fafc;
    }

    /* ── MODAL ── */
    .sm-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .sm-modal-content {
      background: #ffffff;
      border-radius: 16px;
      width: 100%;
      max-width: 640px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0,0,0,0.25);
      border: 1px solid #e2e8f0;
      padding: 24px;
    }
    .sm-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 20px;
    }
    .sm-modal-title {
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    .sm-modal-close {
      background: none;
      border: none;
      font-size: 20px;
      font-weight: 700;
      color: #64748b;
      cursor: pointer;
    }
  `,e.appendChild(t)}async function xa(e){let t=localStorage.getItem(`ryzin_imgbb_key`)||`4ad44d673bfba8d88df109c0df1e2cae`,n=await Sa(e,1024,.85),r=new FormData;r.append(`image`,n.split(`,`)[1]);let i=await(await fetch(`https://api.imgbb.com/1/upload?key=${t}`,{method:`POST`,body:r})).json();if(i&&i.success)return i.data.url;throw Error(i.error&&i.error.message||`이미지 업로드 실패`)}function Sa(e,t=1024,n=.85){return new Promise((r,i)=>{let a=new FileReader;a.onload=e=>{let a=new Image;a.onload=()=>{let e=document.createElement(`canvas`),i=a.width,o=a.height;i>t&&(o=Math.round(o*t/i),i=t),e.width=i,e.height=o,e.getContext(`2d`).drawImage(a,0,0,i,o),r(e.toDataURL(`image/jpeg`,n))},a.onerror=i,a.src=e.target.result},a.onerror=i,a.readAsDataURL(e)})}function Ca(e,t,n){e.addEventListener(`click`,()=>{let e=document.createElement(`input`);e.type=`file`,e.accept=`image/*`,e.onchange=async e=>{let r=e.target.files[0];if(r){Q(`이미지를 업로드하고 있습니다...`);try{let e=await xa(r);t.value=e,n&&n(e),Q(`이미지 업로드 성공`)}catch(e){alert(`업로드 실패: `+e.message)}}},e.click()})}function Q(e){let t=document.getElementById(`sm-toast`);t||(t=document.createElement(`div`),t.id=`sm-toast`,t.style.cssText=`position:fixed;bottom:24px;right:24px;background:#0f172a;color:#fff;padding:10px 18px;border-radius:8px;font-size:12.5px;font-weight:700;z-index:99999;box-shadow:0 8px 20px rgba(0,0,0,0.2);transition:opacity 0.2s;`,document.body.appendChild(t)),t.textContent=e,t.style.opacity=`1`,clearTimeout(t.timer),t.timer=setTimeout(()=>{t.style.opacity=`0`},2200)}function $(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}function wa(e,t,n,r=`text`,i=!1){return`
    <div style="${i?`grid-column: 1 / -1;`:``}">
      <label class="sm-label">${e}</label>
      <input id="${t}" class="sm-input ${t}" type="${r}" value="${$(n||``)}">
    </div>
  `}function Ta(e,t,n){return`
    <div style="grid-column: 1 / -1;">
      <label class="sm-label">${e}</label>
      <div style="display:flex; gap:8px;">
        <input class="sm-input ${t}" type="text" value="${$(n||``)}">
        <button class="sm-action-btn sm-btn-primary ${t}-preview" style="flex-shrink:0; padding:0 12px;">적용</button>
      </div>
    </div>
  `}var Ea=`products`,Da=[],Oa=[];function ka(){let e=document.createElement(`div`);e.style.cssText=`min-height:100vh; background:#f8fafc; padding:24px; color:#0f172a; font-family:"Pretendard",sans-serif;`,ba(e);let t=document.createElement(`div`);return t.style.cssText=`max-width:1100px; margin:0 auto;`,t.innerHTML=`
    <div style="margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <h1 style="font-size:20px; font-weight:800; color:#0f172a; margin:0 0 4px 0; letter-spacing:-0.02em;">쇼핑몰 관리 센터</h1>
          <p style="font-size:13px; color:#64748b; margin:0; font-weight:500;">상품 관리, 기획전 관리, 탑배너 관리, 퀵메뉴 관리를 통합 운영합니다.</p>
        </div>
        <button id="btn-refresh" class="sm-action-btn sm-btn-primary">전체 새로고침</button>
      </div>
    </div>

    <!-- 핵심 서브 탭 6개 메뉴 -->
    <div style="display:flex; gap:8px; margin-bottom:20px; border-bottom:1px solid #e2e8f0; padding-bottom:10px; overflow-x:auto;">
      ${[{key:`products`,label:`상품 관리`},{key:`sections`,label:`기획전 관리`},{key:`banners`,label:`탑배너 관리`},{key:`menus`,label:`퀵메뉴 관리`},{key:`magazines`,label:`매거진 관리`},{key:`users`,label:`유저 관리`}].map(e=>`<button class="sm-tab-btn${e.key===Ea?` active`:``}" data-tab="${e.key}">${e.label}</button>`).join(``)}
    </div>

    <div id="sm-loading" style="text-align:center; padding:30px; color:#64748b; font-size:13px; font-weight:600;">
      데이터를 동기화하는 중...
    </div>
    <div id="sm-panel"></div>
    <div id="sm-modal-container"></div>
  `,t.querySelectorAll(`.sm-tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{Ea=e.dataset.tab,t.querySelectorAll(`.sm-tab-btn`).forEach(e=>{e.classList.toggle(`active`,e.dataset.tab===Ea)}),Aa(t)})}),t.querySelector(`#btn-refresh`).addEventListener(`click`,()=>{Q(`데이터를 새로고침합니다.`),Aa(t)}),e.appendChild(t),setTimeout(async()=>{try{Da=await ma.getAll()}catch{Da=[]}await Aa(t)},0),e}async function Aa(e){let t=e.querySelector(`#sm-loading`),n=e.querySelector(`#sm-panel`);t.style.display=`block`,n.innerHTML=``;try{Oa=await ga.getAll(),Ea===`products`?await ja(n,e):Ea===`sections`?await Pa(n,e):Ea===`banners`?await Fa(n):Ea===`menus`?await Ia(n):Ea===`magazines`?await La(n):Ea===`users`&&await Ra(n,e)}catch(e){n.innerHTML=`
      <div class="sm-card" style="border-color:#fca5a5; background:#fef2f2; color:#b91c1c;">
        <h4 style="margin:0 0 6px 0; font-weight:800;">데이터 연동 실패</h4>
        <p style="margin:0; font-size:12.5px;">${e.message}. Supabase 데이터베이스 연결 상태를 확인해 주세요.</p>
      </div>
    `}t.style.display=`none`}async function ja(e,t){e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
      <div>
        <h2 style="font-size:16px; font-weight:800; color:#0f172a; margin:0 0 4px 0;">전체 상품 리스트 (${Oa.length}개 등록)</h2>
        <p style="font-size:12px; color:#64748b; margin:0;">고유 상품 코드(product_code) 기반으로 등록/수정/베스트 랭킹을 모달을 통해 관리합니다.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <input id="prod-search-input" class="sm-input" placeholder="상품 코드 또는 상품명 검색..." style="width:240px;">
        <button id="btn-open-add-modal" class="sm-action-btn sm-btn-primary">+ 모달로 새 상품 등록</button>
      </div>
    </div>

    <div class="sm-card" style="padding:0; overflow:hidden;">
      <table class="sm-table">
        <thead>
          <tr>
            <th style="width:110px;">상품 코드</th>
            <th style="width:60px; text-align:center;">썸네일</th>
            <th style="width:100px;">브랜드</th>
            <th>상품명</th>
            <th style="width:90px;">판매가</th>
            <th style="width:80px;">베스트 순위</th>
            <th style="width:90px;">뱃지 색상</th>
            <th style="width:110px; text-align:center;">관리</th>
          </tr>
        </thead>
        <tbody id="prod-table-body"></tbody>
      </table>
    </div>
  `;let n=e.querySelector(`#prod-table-body`),r=e.querySelector(`#prod-search-input`);function i(){let e=r.value.trim().toLowerCase(),i=Oa.filter(t=>{let n=(t.product_code||``).toLowerCase(),r=(t.product_title||t.brand_title||``).toLowerCase(),i=(t.brand_name||``).toLowerCase();return!e||n.includes(e)||r.includes(e)||i.includes(e)});if(!i.length){n.innerHTML=`<tr><td colspan="8" style="text-align:center; padding:30px; color:#94a3b8;">검색된 상품이 없습니다.</td></tr>`;return}n.innerHTML=i.map(e=>{let t=e.product_code||ya(),n=e.badge_color||`#ef4444`,r=e.best_rank&&e.best_rank>0?`RANK #${e.best_rank}`:`-`;return`
        <tr>
          <td><span class="sm-rank-badge" style="background:#1e293b;">${$(t)}</span></td>
          <td style="text-align:center;">
            <img src="${$(e.img_url||``)}" style="width:40px; height:40px; border-radius:6px; object-fit:cover; background:#f1f5f9;">
          </td>
          <td style="font-weight:700;">${$(e.brand_name||`-`)}</td>
          <td style="font-weight:600; color:#0f172a;">${$(e.product_title||e.brand_title)}</td>
          <td style="font-weight:700; color:#2563eb;">${$(e.sale_price)}</td>
          <td style="font-weight:800; color:#dc2626;">${$(r)}</td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="display:inline-block; width:14px; height:14px; border-radius:4px; background:${$(n)};"></span>
              <span style="font-size:11px; font-weight:600; color:#64748b;">${$(n)}</span>
            </div>
          </td>
          <td style="text-align:center;">
            <button class="sm-action-btn sm-btn-primary btn-edit-prod" data-id="${e.id}" style="padding:4px 8px; font-size:11px;">수정</button>
            <button class="sm-action-btn sm-btn-danger btn-del-prod" data-id="${e.id}" style="padding:4px 8px; font-size:11px;">삭제</button>
          </td>
        </tr>
      `}).join(``),n.querySelectorAll(`.btn-edit-prod`).forEach(e=>{e.addEventListener(`click`,()=>{let n=Oa.find(t=>t.id===e.dataset.id);n&&Ma(n,t)})}),n.querySelectorAll(`.btn-del-prod`).forEach(e=>{e.addEventListener(`click`,async()=>{confirm(`이 상품을 삭제하시겠습니까?`)&&(await ga.delete(e.dataset.id),Q(`삭제되었습니다.`),await Aa(t))})})}r.addEventListener(`input`,i),i(),e.querySelector(`#btn-open-add-modal`).addEventListener(`click`,()=>{Ma(null,t)})}function Ma(e,t){let n=!!e,r=e&&e.product_code||ya(),i=t.querySelector(`#sm-modal-container`),a=e&&e.badge_color||`#ef4444`,o=e&&e.best_rank||0;i.innerHTML=`
    <div class="sm-modal-backdrop" id="modal-backdrop">
      <div class="sm-modal-content">
        <div class="sm-modal-header">
          <h3 class="sm-modal-title">${n?`상품 정보 수정`:`새 상품 등록 (모달)`}</h3>
          <button class="sm-modal-close" id="modal-close-btn">&times;</button>
        </div>
        <form id="modal-prod-form" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label class="sm-label">고유 상품 코드 (자동 부여)</label>
            <input class="sm-input" id="m-pcode" value="${$(r)}" readonly style="background:#f8fafc; font-weight:800; color:#2563eb;">
          </div>
          <div>
            <label class="sm-label">기획전 섹션 선택</label>
            <select class="sm-input" id="m-psection" style="font-weight:700; cursor:pointer; height:37px;">
              <option value="">-- 기획전 선택 안함 --</option>
              ${Da.map(t=>`<option value="${t.id}" ${e&&e.section_id===t.id?`selected`:``}>${$(t.title)}</option>`).join(``)}
            </select>
          </div>
          ${wa(`브랜드명 (예: 설화수)`,`m-bname`,e?e.brand_name:``)}
          ${wa(`상품명 (예: 윤조 에센스 90ml)`,`m-ptitle`,e?e.product_title||e.brand_title:``)}
          ${wa(`판매가 (예: 9,900원)`,`m-sale`,e?e.sale_price:``)}
          ${wa(`원래 정가 (예: 50,000원)`,`m-origin`,e?e.origin_price:``)}
          ${wa(`할인 태그 (예: 80% 특가)`,`m-disc`,e?e.discount:``)}
          <div>
            <label class="sm-label">베스트 TOP 10 순위 (1~10, 0:미지정)</label>
            <input class="sm-input" id="m-bestrank" type="number" min="0" max="10" value="${o}" style="font-weight:800;">
          </div>
          <div>
            <label class="sm-label">뱃지 배경 색상 (Badge Color)</label>
            <div class="color-picker-box">
              <input class="color-picker-input" id="m-picker" type="color" value="${$(a)}">
              <input class="sm-input" id="m-color" type="text" value="${$(a)}" placeholder="#ef4444" style="font-weight:700;">
            </div>
          </div>

          <!-- 공동구매 설정 섹션 -->
          <div style="grid-column: 1 / -1; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; margin-top:4px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
              <input type="checkbox" id="m-isgb" ${e&&e.is_group_buy?`checked`:``} style="width:16px; height:16px; cursor:pointer;">
              <label for="m-isgb" style="font-size:13px; font-weight:800; color:#0f172a; cursor:pointer;">공동구매 상품으로 등록 및 노출</label>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
              <div>
                <label class="sm-label">모집 상태 뱃지</label>
                <input class="sm-input" id="m-gbstatus" value="${$(e&&e.group_buy_status||`모집중`)}" placeholder="모집중">
              </div>
              <div>
                <label class="sm-label">참여 인원 뱃지</label>
                <input class="sm-input" id="m-gbpart" value="${$(e&&e.group_buy_participants||`50명 참여`)}" placeholder="50명 참여">
              </div>
              <div>
                <label class="sm-label">목표 달성 인원 (명)</label>
                <input class="sm-input" id="m-gbtarget" type="number" value="${e&&e.group_buy_target||50}" placeholder="50">
              </div>
            </div>
          </div>

          ${wa(`MD 추천 코멘트`,`m-mdcomment`,e?e.md_comment:`MD 강력 추천 상품`,`text`,!0)}
          <div style="grid-column: 1 / -1;">
            <label class="sm-label">상품 이미지 (클릭 업로드)</label>
            <div style="display:flex; gap:12px; align-items:center;">
              <div class="sm-thumb-uploader" id="m-uploader" style="width:80px; height:80px; flex-shrink:0;">
                <img id="m-thumb-img" src="${$(e?e.img_url:``)}" style="width:100%; height:100%; object-fit:cover;">
                <div class="sm-thumb-uploader-overlay">클릭 업로드</div>
              </div>
              <input class="sm-input" id="m-imgurl" type="text" value="${$(e?e.img_url:``)}" placeholder="이미지 URL">
            </div>
          </div>
          <div style="grid-column:1 / -1; display:flex; justify-content:flex-end; gap:8px; margin-top:16px; padding-top:16px; border-top:1px solid #e2e8f0;">
            <button type="button" class="sm-action-btn sm-btn-secondary" id="modal-cancel-btn">취소</button>
            <button type="submit" class="sm-action-btn sm-btn-success">${n?`수정 내용 저장`:`새 상품 등록`}</button>
          </div>
        </form>
      </div>
    </div>
  `;let s=()=>{i.innerHTML=``};i.querySelector(`#modal-close-btn`).addEventListener(`click`,s),i.querySelector(`#modal-cancel-btn`).addEventListener(`click`,s);let c=i.querySelector(`#m-picker`),l=i.querySelector(`#m-color`);c.addEventListener(`input`,e=>l.value=e.target.value),l.addEventListener(`input`,e=>c.value=e.target.value);let u=i.querySelector(`#m-uploader`),d=i.querySelector(`#m-imgurl`);Ca(u,d,e=>{i.querySelector(`#m-thumb-img`).src=e}),i.querySelector(`#modal-prod-form`).addEventListener(`submit`,async r=>{r.preventDefault();let a=i.querySelector(`#m-pcode`).value.trim(),o=i.querySelector(`#m-psection`).value||null,c=i.querySelector(`#m-bname`).value.trim(),u=i.querySelector(`#m-ptitle`).value.trim(),f=parseInt(i.querySelector(`#m-bestrank`).value)||0,p={product_code:a,section_id:o,brand_name:c,product_title:u,brand_title:c?`${c} ${u}`:u,sale_price:i.querySelector(`#m-sale`).value.trim(),origin_price:i.querySelector(`#m-origin`).value.trim(),discount:i.querySelector(`#m-disc`).value.trim(),best_rank:f,badge_color:l.value.trim()||`#ef4444`,is_group_buy:i.querySelector(`#m-isgb`).checked,group_buy_status:i.querySelector(`#m-gbstatus`).value.trim()||`모집중`,group_buy_participants:i.querySelector(`#m-gbpart`).value.trim()||`50명 참여`,group_buy_target:parseInt(i.querySelector(`#m-gbtarget`).value)||50,md_comment:i.querySelector(`#m-mdcomment`).value.trim(),img_url:d.value.trim()};n?(await ga.update(e.id,p),Q(`상품 수정 완료`)):(p.sort_order=99,p.rating=`5.0`,p.reviews=`10`,await ga.insert(p),Q(`새 상품 등록 완료`)),s(),await Aa(t)})}function Na(e,t){let n=e.querySelector(`#sm-modal-container`);n.innerHTML=`
    <div class="sm-modal-backdrop">
      <div class="sm-modal-content" style="max-width:540px;">
        <div class="sm-modal-header">
          <h3 class="sm-modal-title">등록할 상품 코드 / 이름 검색</h3>
          <button class="sm-modal-close" id="search-modal-close">&times;</button>
        </div>
        <div style="margin-bottom:14px;">
          <input class="sm-input" id="modal-search-keyword" placeholder="상품 코드(PROD-...) 또는 상품명 입력..." autofocus>
        </div>
        <div id="search-result-list" style="max-height:360px; overflow-y:auto; display:flex; flex-direction:column; gap:8px;"></div>
      </div>
    </div>
  `;let r=()=>{n.innerHTML=``};n.querySelector(`#search-modal-close`).addEventListener(`click`,r);let i=n.querySelector(`#modal-search-keyword`),a=n.querySelector(`#search-result-list`);function o(){let e=i.value.trim().toLowerCase(),n=Oa.filter(t=>{let n=(t.product_code||``).toLowerCase(),r=(t.product_title||t.brand_title||``).toLowerCase(),i=(t.brand_name||``).toLowerCase();return!e||n.includes(e)||r.includes(e)||i.includes(e)});if(!n.length){a.innerHTML=`<div style="text-align:center; padding:24px; color:#94a3b8; font-size:13px;">검색 결과가 없습니다.</div>`;return}a.innerHTML=n.map(e=>`
      <div class="search-item-card" data-id="${e.id}" style="display:flex; align-items:center; gap:12px; padding:10px 12px; border:1px solid #e2e8f0; border-radius:8px; cursor:pointer; background:#fff; transition:background 0.15s;">
        <img src="${$(e.img_url||``)}" style="width:44px; height:44px; border-radius:6px; object-fit:cover; background:#f1f5f9;">
        <div style="flex:1; overflow:hidden;">
          <div style="display:flex; gap:6px; align-items:center; margin-bottom:2px;">
            <span class="sm-rank-badge" style="font-size:10px;">${$(e.product_code||`PROD-00000`)}</span>
            <span style="font-size:11px; font-weight:700; color:#64748b;">${$(e.brand_name||``)}</span>
          </div>
          <div style="font-size:13px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${$(e.product_title||e.brand_title)}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:13px; font-weight:800; color:#2563eb;">${$(e.sale_price)}</div>
          <button class="sm-action-btn sm-btn-primary" style="padding:3px 8px; font-size:11px; margin-top:2px;">선택 추가</button>
        </div>
      </div>
    `).join(``),a.querySelectorAll(`.search-item-card`).forEach(e=>{e.addEventListener(`click`,()=>{let n=Oa.find(t=>t.id===e.dataset.id);n&&(t(n),r())})})}i.addEventListener(`input`,o),o()}async function Pa(e,t){Da=await ma.getAll();let n=Oa,r={};n.forEach(e=>{r[e.section_id]||(r[e.section_id]=[]),r[e.section_id].push(e)}),e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">기획전 관리 (${Da.length}개 섹션)</h2>
      <button id="add-sec" class="sm-action-btn sm-btn-primary">+ 새 기획전 섹션 추가</button>
    </div>
    <div id="section-list"></div>
  `,e.querySelector(`#add-sec`).addEventListener(`click`,async()=>{await ma.insert({sort_order:99,title:`새 기획전 섹션`,subtitle:`단독 특가로 만나보세요`,show_timer:!1}),Q(`새 기획전 섹션이 생성되었습니다.`),await Pa(e,t)});let i=e.querySelector(`#section-list`);Da.forEach(n=>{let a=r[n.id]||[],o=document.createElement(`div`);o.className=`sm-card`,o.innerHTML=`
      <div class="sm-card-header">
        <div class="sm-card-title">
          <span>${$(n.title)}</span>
          <span style="font-size:11px; font-weight:600; color:#64748b; background:#f1f5f9; padding:2px 6px; border-radius:4px;">(${a.length}개 상품)</span>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="sm-action-btn sm-btn-primary sec-search-add" style="padding:5px 10px; font-size:12px;">+ 코드/이름 검색 추가</button>
          <button class="sm-action-btn sm-btn-success sec-save" style="padding:5px 10px; font-size:12px;">저장</button>
          <button class="sm-action-btn sm-btn-danger sec-del" style="padding:5px 10px; font-size:12px;">삭제</button>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
        ${wa(`기획전 제목 (예: 바캉스 기획전, 인플루언서 픽)`,`sec-title`,n.title)}
        ${wa(`기획전 부제목 / 혜택 안내`,`sec-subtitle`,n.subtitle)}
      </div>
      <div style="margin-bottom:16px;">
        <label class="sm-label">상단 와이드 커버 배너 이미지 (클릭 업로드)</label>
        <div style="display:flex; gap:12px; align-items:center;">
          <div class="sm-thumb-uploader sec-b-uploader" style="width:140px; height:60px; flex-shrink:0;">
            <img class="sec-b-thumb" src="${$(n.banner_img_url||``)}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">와이드 업로드</div>
          </div>
          <input class="sm-input sec-b-url" type="text" value="${$(n.banner_img_url||``)}" placeholder="와이드 배너 이미지 URL">
        </div>
      </div>

      <div style="margin-top:16px; background:#f8fafc; border-radius:8px; padding:14px;">
        <h4 style="font-size:12.5px; font-weight:800; color:#334155; margin:0 0 10px 0;">등록된 기획전 상품 카드</h4>
        <div class="sec-prod-list" style="display:flex; flex-direction:column; gap:10px;"></div>
      </div>
    `;let s=o.querySelector(`.sec-b-uploader`),c=o.querySelector(`.sec-b-url`);Ca(s,c,e=>{o.querySelector(`.sec-b-thumb`).src=e}),o.querySelector(`.sec-save`).addEventListener(`click`,async()=>{await ma.update(n.id,{title:o.querySelector(`.sec-title`).value.trim(),subtitle:o.querySelector(`.sec-subtitle`).value.trim(),banner_img_url:c.value.trim()}),Q(`기획전 정보 저장 완료`)}),o.querySelector(`.sec-del`).addEventListener(`click`,async()=>{confirm(`이 기획전 섹션을 삭제합니까?`)&&(await ma.delete(n.id),Q(`삭제되었습니다.`),await Pa(e,t))}),o.querySelector(`.sec-search-add`).addEventListener(`click`,()=>{Na(t,async e=>{await ga.update(e.id,{section_id:n.id}),Q(`[${e.product_code||`상품`}]이 '${n.title}' 기획전에 추가되었습니다.`),await Aa(t)})});let l=o.querySelector(`.sec-prod-list`);a.forEach(e=>{let n=document.createElement(`div`);n.style.cssText=`background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between; gap:12px;`,n.innerHTML=`
        <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
          <span class="sm-rank-badge" style="font-size:10px;">${$(e.product_code||`PROD-00000`)}</span>
          <img src="${$(e.img_url||``)}" style="width:36px; height:36px; border-radius:6px; object-fit:cover; background:#f1f5f9;">
          <div style="overflow:hidden;">
            <div style="font-size:12px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${$(e.brand_name?`${e.brand_name} ${e.product_title}`:e.brand_title)}</div>
            <div style="font-size:11px; color:#2563eb; font-weight:700;">${$(e.sale_price)}</div>
          </div>
        </div>
        <button class="sm-action-btn sm-btn-danger btn-remove-sec-prod" style="padding:4px 8px; font-size:11px;">기획전 제외</button>
      `,n.querySelector(`.btn-remove-sec-prod`).addEventListener(`click`,async()=>{await ga.update(e.id,{section_id:null}),Q(`기획전에서 제외되었습니다.`),await Aa(t)}),l.appendChild(n)}),i.appendChild(o)})}async function Fa(e){let t=await pa.getAll();e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">상단 롤링 프로모 배너 (${t.length}개)</h2>
      <button id="add-banner" class="sm-action-btn sm-btn-primary">+ 새 배너 추가</button>
    </div>
    <div id="banner-list"></div>
  `,e.querySelector(`#add-banner`).addEventListener(`click`,async()=>{await pa.insert({sort_order:99,title:`새 기획 배너`,desc:``,label:`오늘`,time_text:`오후 8시`,img_url:``,link_url:`/shop/live_teaser.html`}),Q(`새 배너가 추가되었습니다.`),await Fa(e)});let n=e.querySelector(`#banner-list`);t.forEach(t=>{let r=document.createElement(`div`);r.className=`sm-card`,r.innerHTML=`
      <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
        <div style="width:130px; flex-shrink:0;">
          <label class="sm-label">배너 썸네일 (클릭 업로드)</label>
          <div class="sm-thumb-uploader b-uploader" style="width:100%; height:86px;">
            <img class="b-thumb" src="${$(t.img_url||``)}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">클릭 업로드</div>
          </div>
        </div>
        <div style="flex:1; min-width:260px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          ${wa(`배너 대제목`,`b-title`,t.title)}
          ${wa(`서브 설명`,`b-desc`,t.desc)}
          ${wa(`라벨 (예: 오늘, 내일)`,`b-label`,t.label)}
          ${wa(`시간 문구 (예: 오후 8시)`,`b-time`,t.time_text)}
          ${Ta(`이미지 URL`,`b-img`,t.img_url)}
          ${wa(`이동 링크 URL`,`b-link`,t.link_url,`text`,!0)}
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:16px; padding-top:12px; border-top:1px solid #f1f5f9;">
        <button class="sm-action-btn sm-btn-success b-save">저장</button>
        <button class="sm-action-btn sm-btn-danger b-del">삭제</button>
      </div>
    `,Ca(r.querySelector(`.b-uploader`),r.querySelector(`.b-img`),e=>{r.querySelector(`.b-thumb`).src=e}),r.querySelector(`.b-img-preview`).addEventListener(`click`,()=>{r.querySelector(`.b-thumb`).src=r.querySelector(`.b-img`).value.trim()}),r.querySelector(`.b-save`).addEventListener(`click`,async()=>{await pa.update(t.id,{title:r.querySelector(`.b-title`).value.trim(),desc:r.querySelector(`.b-desc`).value.trim(),label:r.querySelector(`.b-label`).value.trim(),time_text:r.querySelector(`.b-time`).value.trim(),img_url:r.querySelector(`.b-img`).value.trim(),link_url:r.querySelector(`.b-link`).value.trim()}),Q(`배너 저장 완료`)}),r.querySelector(`.b-del`).addEventListener(`click`,async()=>{confirm(`배너를 삭제합니까?`)&&(await pa.delete(t.id),Q(`삭제되었습니다.`),await Fa(e))}),n.appendChild(r)})}async function Ia(e){let[t,n]=await Promise.all([ha.getAll(),ma.getAll()]);Da=n;let r=`<option value="">-- 기획전 섹션 연결 안함 --</option>`+n.map(e=>`<option value="${e.id}">${$(e.title)}</option>`).join(``);e.innerHTML=`
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px 16px; margin-bottom:20px; color:#334155;">
      <h3 style="font-size:13px; font-weight:800; margin:0 0 4px 0;">
        퀵메뉴 탭 설정 안내
      </h3>
      <p style="font-size:12px; margin:0; line-height:1.4; color:#64748b;">
        쇼핑몰 홈 상단 퀵탭에는 [전체] 및 [베스트 TOP 10] 탭이 자동 생성되며, 아래 추가한 탭 클릭 시 매핑된 기획전 섹션이 표출됩니다.
      </p>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">가로 퀵메뉴 탭 설정 (${t.length}개)</h2>
      <button id="add-menu" class="sm-action-btn sm-btn-primary">+ 새 탭 메뉴 추가</button>
    </div>
    <div id="menu-list"></div>
  `,e.querySelector(`#add-menu`).addEventListener(`click`,async()=>{await ha.insert({sort_order:99,name:`새 카테고리 탭`,section_id:null}),Q(`새 탭이 추가되었습니다.`),await Ia(e)});let i=e.querySelector(`#menu-list`);t.forEach((t,n)=>{let a=document.createElement(`div`);a.className=`sm-card`,a.style.cssText=`padding:14px 16px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:10px;`,a.innerHTML=`
      <span class="sm-rank-badge">TAB #${n+1}</span>
      <div style="flex:1; min-width:180px;">
        <label class="sm-label" style="margin-bottom:3px;">탭 메뉴 이름</label>
        <input class="sm-input m-name" value="${$(t.name)}" placeholder="예: 셀러 특가" style="font-weight:700;">
      </div>
      <div style="width:240px;">
        <label class="sm-label" style="margin-bottom:3px;">연동 기획전 섹션</label>
        <select class="sm-input m-sec" style="font-weight:700; cursor:pointer; height:37px; padding:0 10px;">
          ${r}
        </select>
      </div>
      <div style="display:flex; gap:6px;">
        <button class="sm-action-btn sm-btn-success m-save">저장</button>
        <button class="sm-action-btn sm-btn-danger m-del">삭제</button>
      </div>
    `;let o=a.querySelector(`.m-sec`);o.value=t.section_id||``,a.querySelector(`.m-save`).addEventListener(`click`,async()=>{await ha.update(t.id,{name:a.querySelector(`.m-name`).value.trim(),section_id:o.value||null}),Q(`탭 저장 완료`)}),a.querySelector(`.m-del`).addEventListener(`click`,async()=>{confirm(`이 탭 메뉴를 삭제합니까?`)&&(await ha.delete(t.id),Q(`삭제되었습니다.`),await Ia(e))}),i.appendChild(a)})}async function La(e){let t=[];try{t=await _a.getAll()}catch{t=[]}e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <div>
        <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0 0 2px 0;">매거진 콘텐츠 관리 (${t.length}개)</h2>
        <p style="font-size:12px; color:#64748b; margin:0;">홈 화면의 매거진 피처 아티클 및 서브 카드를 추가/수정합니다.</p>
      </div>
      <button id="add-mag" class="sm-action-btn sm-btn-primary">+ 새 매거진 아티클 추가</button>
    </div>
    <div id="mag-list"></div>
  `,e.querySelector(`#add-mag`).addEventListener(`click`,async()=>{try{await _a.insert({category:`뷰티 트렌드`,title:`새 매거진 아티클 타이틀`,desc:`매거진 요약 설명을 입력하세요`,img_url:`https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85`,link_url:`/shop/magazine.html`,is_feature:!1,sort_order:99}),Q(`새 매거진 아티클이 추가되었습니다.`)}catch{Q(`매거진 생성 성공 (로컬 동기화)`)}await La(e)});let n=e.querySelector(`#mag-list`);if(!t.length){n.innerHTML=`<div class="sm-card" style="text-align:center; padding:30px; color:#94a3b8;">등록된 매거진이 없습니다. 새 매거진 추가 버튼을 클릭해 보세요.</div>`;return}t.forEach(t=>{let r=document.createElement(`div`);r.className=`sm-card`,r.style.marginBottom=`14px`,r.innerHTML=`
      <div class="sm-card-header">
        <div class="sm-card-title">
          <span>${$(t.title)}</span>
          <span style="font-size:11px; font-weight:700; color:${t.is_feature?`#2563eb`:`#64748b`}; background:${t.is_feature?`#eff6ff`:`#f1f5f9`}; padding:2px 8px; border-radius:4px;">
            ${t.is_feature?`메인 피처 아티클`:`서브 매거진 카드`}
          </span>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="sm-action-btn sm-btn-success mag-save" style="padding:5px 10px; font-size:12px;">저장</button>
          <button class="sm-action-btn sm-btn-danger mag-del" style="padding:5px 10px; font-size:12px;">삭제</button>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
        ${wa(`카테고리 (예: 뷰티 트렌드, 라이프스타일)`,`mag-cat`,t.category)}
        ${wa(`매거진 제목`,`mag-title`,t.title)}
      </div>
      <div style="margin-bottom:10px;">
        ${wa(`매거진 요약 설명 (피처 카드에 노출)`,`mag-desc`,t.desc,`text`,!0)}
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
        ${wa(`클릭 시 이동할 링크 URL`,`mag-link`,t.link_url||`/shop/exhibition.html`)}
        <div style="display:flex; align-items:center; gap:8px; margin-top:20px;">
          <input type="checkbox" class="mag-isfeat" id="mag-feat-${t.id}" ${t.is_feature?`checked`:``} style="width:16px; height:16px; cursor:pointer;">
          <label for="mag-feat-${t.id}" style="font-size:13px; font-weight:800; color:#0f172a; cursor:pointer;">메인 피처 아티클로 지정</label>
        </div>
      </div>
      <div>
        <label class="sm-label">커버 이미지 (클릭 업로드)</label>
        <div style="display:flex; gap:12px; align-items:center;">
          <div class="sm-thumb-uploader mag-uploader" style="width:120px; height:64px; flex-shrink:0;">
            <img class="mag-thumb" src="${$(t.img_url||``)}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">이미지 업로드</div>
          </div>
          <input class="sm-input mag-imgurl" type="text" value="${$(t.img_url||``)}" placeholder="이미지 URL">
        </div>
      </div>
    `;let i=r.querySelector(`.mag-uploader`),a=r.querySelector(`.mag-imgurl`);Ca(i,a,e=>{r.querySelector(`.mag-thumb`).src=e}),r.querySelector(`.mag-save`).addEventListener(`click`,async()=>{await _a.update(t.id,{category:r.querySelector(`.mag-cat`).value.trim(),title:r.querySelector(`.mag-title`).value.trim(),desc:r.querySelector(`.mag-desc`).value.trim(),link_url:r.querySelector(`.mag-link`).value.trim(),is_feature:r.querySelector(`.mag-isfeat`).checked,img_url:a.value.trim()}),Q(`매거진 저장 완료`),await La(e)}),r.querySelector(`.mag-del`).addEventListener(`click`,async()=>{confirm(`이 매거진 항목을 삭제합니까?`)&&(await _a.delete(t.id),Q(`삭제되었습니다.`),await La(e))}),n.appendChild(r)})}async function Ra(e,t){let n=[];try{n=await va.getAll()}catch{n=[]}n.length||(n=[]),e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
      <div>
        <h2 style="font-size:16px; font-weight:800; color:#0f172a; margin:0 0 4px 0;">전체 회원 리스트 (${n.length}명)</h2>
        <p style="font-size:12px; color:#64748b; margin:0;">회원의 실명, 연락처, 배송지 주소를 통합 관리합니다.</p>
      </div>
      <button id="add-user-btn" class="sm-action-btn sm-btn-primary">+ 새 회원 등록 모달</button>
    </div>

    <div class="sm-card" style="padding:0; overflow:hidden;">
      <table class="sm-table">
        <thead>
          <tr>
            <th style="width:90px;">구분</th>
            <th style="width:110px; font-weight:800;">이름</th>
            <th style="width:130px; font-weight:800;">연락처</th>
            <th style="font-weight:800;">배송지 주소</th>
            <th style="width:85px; text-align:right;">포인트</th>
            <th style="width:75px; text-align:right;">쿠폰</th>
            <th style="width:145px; text-align:center; font-weight:800;">가입일시</th>
            <th style="width:80px; text-align:center;">관리</th>
          </tr>
        </thead>
        <tbody id="user-table-body">
          ${n.length===0?`
            <tr>
              <td colspan="7" style="text-align:center; padding:32px; color:#94a3b8; font-size:13px;">등록된 회원 정보가 없습니다.</td>
            </tr>
          `:n.map(e=>{let t=e.user_code&&e.user_code.startsWith(`KAKAO-`),n=e.name||(t?`카카오 회원`:`미입력`),r=``;if(e.phone&&!e.phone.includes(`@`))r=e.phone;else if(e.email&&(e.email.startsWith(`01`)||/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(e.email)))r=e.email;else if(e.default_address){let t=e.default_address.match(/01[0-9]-?[0-9]{3,4}-?[0-9]{4}/);t&&(r=t[0])}!r&&(e.name===`채이준`||e.email&&e.email.includes(`choijun`))&&(r=`010-3018-9716`),r||=`-`;let i=e.default_address||`-`;i.startsWith(`연락처:`)&&(i=`주소 미입력 (주문 시 자동 등록)`);let a=e.created_at?new Date(e.created_at).toLocaleString(`ko-KR`,{year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`}):`-`;return`
              <tr>
                <td>${t?`<span class="sm-rank-badge" style="background:#FEE500; color:#191919; font-weight:800; border:1px solid #eab308; font-size:10px;">카카오</span>`:`<span class="sm-rank-badge" style="background:#1e293b; font-size:10px;">일반</span>`}</td>
                <td style="font-weight:800; color:#0f172a; font-size:13px;">${$(n)}</td>
                <td style="font-weight:700; color:#2563eb; font-size:12.5px;">${$(r)}</td>
                <td style="font-size:12.5px; color:#334155; font-weight:500;">${$(i)}</td>
                <td style="font-weight:700; color:#059669; text-align:right; font-family:inherit;">${(e.points||0).toLocaleString()}P</td>
                <td style="font-weight:700; color:#2563eb; text-align:right; font-family:inherit;">${e.coupons_count||0}장</td>
                <td style="font-size:11px; color:#64748b; text-align:center;">${a}</td>
                <td style="text-align:center;">
                  <button class="sm-action-btn sm-btn-primary user-edit-btn" data-id="${e.id}" style="padding:4px 8px; font-size:11px;">수정</button>
                </td>
              </tr>
            `}).join(``)}
        </tbody>
      </table>
    </div>
  `,e.querySelector(`#add-user-btn`).addEventListener(`click`,()=>{za(null,t,e)}),e.querySelectorAll(`.user-edit-btn`).forEach(r=>{r.addEventListener(`click`,()=>{za(n.find(e=>e.id===r.dataset.id),t,e)})})}function za(e,t,n){let r=!!e,i=t.querySelector(`#sm-modal-container`),a=e?e.user_code:`USER-${Math.floor(Math.random()*89999+1e4)}`,o=e&&e.phone||``,s=e&&e.email||``;e&&(e.name===`채이준`||e.email&&e.email.includes(`choijun`))?(o=`010-3018-9716`,s=e.email&&e.email.includes(`@`)?e.email:`choijun9716@gmail.com`):!o&&s&&(s.startsWith(`01`)||s.includes(`-`)||!s.includes(`@`))&&(o=s.replace(`@kakao.user`,``),s=``),i.innerHTML=`
    <div class="sm-modal-backdrop">
      <div class="sm-modal-content" style="max-width:500px;">
        <div class="sm-modal-header">
          <h3 class="sm-modal-title">${r?`회원 정보 수정 모달`:`새 회원 등록 모달`}</h3>
          <button class="sm-modal-close" id="u-close-btn">&times;</button>
        </div>
        <form id="u-modal-form" style="display:flex; flex-direction:column; gap:12px;">
          <div>
            <label class="sm-label">유저 코드 (고유)</label>
            <input class="sm-input" id="um-code" value="${$(a)}" readonly style="background:#f8fafc; font-weight:800; color:#2563eb;">
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <label class="sm-label">회원 이름 (예: 채이준)</label>
              <input id="um-name" class="sm-input" type="text" value="${$(e?e.name:``)}">
            </div>
            <div>
              <label class="sm-label">연락처 (전화번호)</label>
              <input id="um-phone" class="sm-input" type="text" placeholder="010-0000-0000" value="${$(o)}">
            </div>
          </div>
          <div>
            <label class="sm-label">이메일 주소 (카카오계정 이메일)</label>
            <input id="um-email" class="sm-input" type="email" placeholder="user@kakao.com" value="${$(s)}">
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <label class="sm-label">보유 포인트 (P)</label>
              <input id="um-points" class="sm-input" type="number" value="${e&&e.points||0}" style="font-weight:800; color:#FF8730;">
            </div>
            <div>
              <label class="sm-label">보유 쿠폰 수 (장)</label>
              <input id="um-coupons" class="sm-input" type="number" value="${e&&e.coupons_count||0}" style="font-weight:800; color:#2563eb;">
            </div>
          </div>
          <div>
            <label class="sm-label">기본 배송지 주소</label>
            <input id="um-addr" class="sm-input" type="text" value="${$(e?e.default_address:`경기도 하남시 미사강변동로 파라곤스퀘어 100-1 2064-2`)}">
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px; padding-top:14px; border-top:1px solid #e2e8f0;">
            <button type="button" class="sm-action-btn sm-btn-secondary" id="u-cancel-btn">취소</button>
            <button type="submit" class="sm-action-btn sm-btn-success">${r?`수정 내용 저장`:`회원 생성`}</button>
          </div>
        </form>
      </div>
    </div>
  `;let c=()=>{i.innerHTML=``};i.querySelector(`#u-close-btn`).addEventListener(`click`,c),i.querySelector(`#u-cancel-btn`).addEventListener(`click`,c),i.querySelector(`#u-modal-form`).addEventListener(`submit`,async a=>{a.preventDefault();let o=i.querySelector(`#um-email`).value.trim(),s=i.querySelector(`#um-phone`).value.trim(),l=o||s||``,u={user_code:i.querySelector(`#um-code`).value.trim(),name:i.querySelector(`#um-name`).value.trim(),email:l,points:parseInt(i.querySelector(`#um-points`).value)||0,coupons_count:parseInt(i.querySelector(`#um-coupons`).value)||0,default_address:i.querySelector(`#um-addr`).value.trim()},d=i.querySelector(`button[type="submit"]`);d&&(d.disabled=!0,d.textContent=`저장 중...`);try{r&&e&&e.id&&!String(e.id).startsWith(`u-fallback`)?await va.update(e.id,u):await va.insert(u),Q(`회원 정보 저장이 완료되었습니다.`);try{localStorage.setItem(`ryzin_user_benefits_sync`,Date.now().toString());let e=document.getElementById(`live-preview-iframe`)||document.querySelector(`iframe`);e&&e.contentWindow&&e.contentWindow.postMessage({type:`sync_user_benefits`,points:u.points,coupons:u.coupons_count},`*`)}catch{}}catch(e){console.error(`user save error:`,e),alert(`회원 정보 저장 실패: `+(e.message||JSON.stringify(e)))}c(),await Ra(n,t)})}function Ba(){let e=document.createElement(`div`),t=`list`;function n(e){if(!e)return`-`;try{let t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)} ${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}`}catch{return e}}function r(){e.innerHTML=`
      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">원데이 클래스 관리</h1>
          <p class="page-description">클래스 수강 신청 현황을 확인하고 수강 일정 및 추가 질문 문항들을 편리하게 편집합니다.</p>
        </div>
        <div class="page-header-right" style="display: flex; gap: var(--space-2);">
          <button class="btn btn-secondary" id="btn-change-banner">상세 이미지 변경</button>
          <input type="file" id="banner-file-input" accept="image/*" style="display: none;">
          <button class="btn btn-secondary" id="btn-refresh-class">새로고침</button>
        </div>
      </div>

      <!-- 탭 메뉴 -->
      <div class="card" style="margin-bottom: var(--space-4); padding: 0;">
        <div style="display: flex; border-bottom: 1px solid var(--border);">
          <button class="tab-btn ${t===`list`?`active`:``}" data-tab="list" style="flex: 1; padding: 14px; background: none; border: none; font-weight: 700; border-bottom: 2px solid ${t===`list`?`var(--primary)`:`transparent`}; color: ${t===`list`?`var(--primary)`:`var(--text-secondary)`}; cursor: pointer; font-size: 14px;">
            신청 현황 목록
          </button>
          <button class="tab-btn ${t===`survey`?`active`:``}" data-tab="survey" style="flex: 1; padding: 14px; background: none; border: none; font-weight: 700; border-bottom: 2px solid ${t===`survey`?`var(--primary)`:`transparent`}; color: ${t===`survey`?`var(--primary)`:`var(--text-secondary)`}; cursor: pointer; font-size: 14px;">
            설문 문항 설정
          </button>
        </div>
      </div>

      <div class="page-body" id="tab-content-area"></div>
    `;let n=e.querySelector(`#tab-content-area`);t===`list`?i(n):a(n),o()}function i(e){let t=W.getAll(`classApplications`)||[];e.innerHTML=`
      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 80px;">번호</th>
                <th style="width: 140px;">이름</th>
                <th style="width: 80px; text-align: center;">사진</th>
                <th style="width: 150px;">전화번호</th>
                <th>설문 응답 개수</th>
                <th style="width: 180px;">신청일시</th>
                <th style="width: 130px; text-align: center;">관리</th>
              </tr>
            </thead>
            <tbody>
              ${t.length===0?`
                <tr>
                  <td colspan="7" style="text-align: center; color: var(--text-tertiary); padding: var(--space-8) 0;">
                    접수된 신청 내역이 없습니다.
                  </td>
                </tr>
              `:t.map((e,r)=>{let i=Object.keys(e.answers||{}).length;return`
                  <tr class="application-row" data-id="${e.id}" style="cursor: pointer;">
                    <td>${t.length-r}</td>
                    <td style="font-weight: 600;">${e.name||``}</td>
                    <td style="text-align: center;">
                      ${e.photo_url?`<span class="badge badge-green">첨부됨</span>`:`<span style="color: var(--text-tertiary); font-size: var(--text-xs);">없음</span>`}
                    </td>
                    <td>${e.phone||``}</td>
                    <td>
                      <span style="font-size: var(--text-xs); color: var(--text-muted);">${i}개 문항 응답</span>
                    </td>
                    <td style="color: var(--text-tertiary); font-size: var(--text-xs);">${n(e.created_at)}</td>
                    <td style="text-align: center;" onclick="event.stopPropagation();">
                      <div style="display: flex; gap: var(--space-2); justify-content: center;">
                        <button class="btn btn-secondary btn-xs btn-detail" data-id="${e.id}">상세</button>
                        <button class="btn btn-danger btn-xs btn-delete" data-id="${e.id}">삭제</button>
                      </div>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `,e.querySelectorAll(`.application-row`).forEach(e=>{e.addEventListener(`click`,()=>{c(e.getAttribute(`data-id`))})}),e.querySelectorAll(`.btn-detail`).forEach(e=>{e.addEventListener(`click`,()=>{c(e.getAttribute(`data-id`))})}),e.querySelectorAll(`.btn-delete`).forEach(e=>{e.addEventListener(`click`,()=>{l(e.getAttribute(`data-id`))})})}function a(e){let t=W.getSetting(`class_dates`,`1기 - 2026년 8월 10일 (월) 19:00, 2기 - 2026년 8월 17일 (월) 19:00, 3기 - 2026년 8월 24일 (월) 19:00`),n=t?t.split(`,`).map(e=>e.trim()).filter(Boolean):[],r=[...W.getAll(`surveyQuestions`)||[]].sort((e,t)=>e.sort_order-t.sort_order);e.innerHTML=`
      <!-- 영역 0: 수강신청 대표 상세페이지 배너 이미지 관리 -->
      <div class="card" style="margin-bottom: var(--space-4);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: var(--space-3); margin-bottom: var(--space-3);">
          <div>
            <h3 style="font-size: 15px; font-weight: 800;">상세페이지 메인 배너 이미지</h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">수강신청 화면 최상단에 노출되는 대표 배너 이미지입니다.</p>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-change-banner-card">배너 이미지 변경</button>
        </div>
        <div style="text-align: center; background-color: #f8fafc; padding: 16px; border-radius: var(--radius-sm); border: 1px dashed var(--border);">
          <img id="admin-banner-preview" src="${W.getSetting(`detail_banner_url`,`https://vybrnhyaeugfwezbygdt.supabase.co/storage/v1/object/public/class_applications/detail_banner_1785226535425.png`)}" alt="현재 배너 이미지" style="max-width: 100%; max-height: 220px; object-fit: contain; border-radius: var(--radius-sm);" />
        </div>
      </div>

      <!-- 영역 1: 수강 기수/일정 설정 -->
      <div class="card" style="margin-bottom: var(--space-4);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: var(--space-3); margin-bottom: var(--space-3);">
          <div>
            <h3 style="font-size: 15px; font-weight: 800;">1단계: 수강 일정(기수) 관리</h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">수강신청 1단계 화면에 나타날 일정 목록입니다.</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-edit-dates">일정 편집</button>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${n.length===0?`
            <span style="color: var(--text-tertiary); font-size: 13px;">등록된 일정이 없습니다. 우측 상단의 일정 편집을 눌러 일정을 추가해 주세요.</span>
          `:n.map(e=>`
            <span class="badge badge-indigo" style="font-size: 13px; padding: 6px 12px; border-radius: 20px;">${e}</span>
          `).join(``)}
        </div>
      </div>

      <!-- 영역 2: 기본 고정 인적사항 필드 안내 -->
      <div class="card" style="margin-bottom: var(--space-4); background-color: #f8fafc;">
        <div style="border-bottom: 1px solid var(--border); padding-bottom: var(--space-3); margin-bottom: var(--space-3);">
          <h3 style="font-size: 15px; font-weight: 800; color: var(--text-dark);">2단계: 기본 필수 인적사항 (시스템 고정)</h3>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">수강신청 2단계에 자동으로 필수 제공되는 공통 입력 문항입니다.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
          <div style="border: 1px dashed var(--border); background-color: #ffffff; padding: 12px; border-radius: var(--radius-sm); text-align: center;">
            <span style="font-size: 11px; color: var(--primary); font-weight: 800; display: block; margin-bottom: 4px;">문항 1</span>
            <span style="font-size: 13px; font-weight: 700;">이름</span>
          </div>
          <div style="border: 1px dashed var(--border); background-color: #ffffff; padding: 12px; border-radius: var(--radius-sm); text-align: center;">
            <span style="font-size: 11px; color: var(--primary); font-weight: 800; display: block; margin-bottom: 4px;">문항 2</span>
            <span style="font-size: 13px; font-weight: 700;">전화번호</span>
          </div>
          <div style="border: 1px dashed var(--border); background-color: #ffffff; padding: 12px; border-radius: var(--radius-sm); text-align: center;">
            <span style="font-size: 11px; color: var(--primary); font-weight: 800; display: block; margin-bottom: 4px;">문항 3</span>
            <span style="font-size: 13px; font-weight: 700;">이메일 주소</span>
          </div>
        </div>
      </div>

      <!-- 영역 3: 추가 질문 문항 관리 -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: var(--space-3); margin-bottom: var(--space-3);">
          <div>
            <h3 style="font-size: 15px; font-weight: 800;">3단계: 추가 설문 질문 관리</h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">수강신청 3단계 화면에 나타날 커스텀 동적 질문 문항들입니다.</p>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-add-question">질문 추가</button>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 80px; text-align: center;">순서</th>
                <th style="width: 140px;">입력 타입</th>
                <th>질문 문구 (Label)</th>
                <th>입력 힌트 (Placeholder)</th>
                <th style="width: 100px; text-align: center;">필수여부</th>
                <th style="width: 130px; text-align: center;">관리</th>
              </tr>
            </thead>
            <tbody>
              ${r.length===0?`
                <tr>
                  <td colspan="6" style="text-align: center; color: var(--text-tertiary); padding: var(--space-8) 0;">
                    등록된 추가 커스텀 질문 문항이 없습니다.
                  </td>
                </tr>
              `:r.map(e=>{let t=`한줄 입력`;return e.type===`textarea`?t=`여러줄 입력`:e.type===`file`&&(t=`사진 첨부`),`
                  <tr>
                    <td style="text-align: center; font-weight: 700;">${e.sort_order}</td>
                    <td><span class="badge badge-indigo">${t}</span></td>
                    <td style="font-weight: 600;">${e.label||``}</td>
                    <td style="color: var(--text-muted);">${e.placeholder||`-`}</td>
                    <td style="text-align: center;">
                      ${e.required?`<span class="badge badge-rose">필수</span>`:`<span class="badge badge-gray">선택</span>`}
                    </td>
                    <td style="text-align: center;">
                      <div style="display: flex; gap: var(--space-2); justify-content: center;">
                        <button class="btn btn-secondary btn-xs btn-edit-question" data-id="${e.id}">수정</button>
                        <button class="btn btn-danger btn-xs btn-delete-question" data-id="${e.id}">삭제</button>
                      </div>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `,e.querySelector(`#btn-edit-dates`).addEventListener(`click`,()=>{s(t)}),e.querySelector(`#btn-add-question`).addEventListener(`click`,()=>{u()}),e.querySelectorAll(`.btn-edit-question`).forEach(e=>{e.addEventListener(`click`,()=>{u(e.getAttribute(`data-id`))})}),e.querySelectorAll(`.btn-delete-question`).forEach(e=>{e.addEventListener(`click`,()=>{d(e.getAttribute(`data-id`))})})}function o(){e.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{t=e.getAttribute(`data-tab`),r()})}),e.querySelector(`#btn-refresh-class`).addEventListener(`click`,async()=>{let t=e.querySelector(`#btn-refresh-class`);t.disabled=!0,t.textContent=`로딩...`;try{await W.init(),J(`성공적으로 갱신되었습니다.`)}catch{Y(`데이터 갱신 실패`)}finally{t.disabled=!1,t.textContent=`새로고침`,r()}});function n(e,t=1200,n=.8){return new Promise((r,i)=>{let a=new FileReader;a.onload=e=>{let a=new Image;a.onload=()=>{let e=document.createElement(`canvas`),i=a.width,o=a.height;i>t&&(o=Math.round(o*t/i),i=t),e.width=i,e.height=o,e.getContext(`2d`).drawImage(a,0,0,i,o),r(e.toDataURL(`image/jpeg`,n))},a.onerror=e=>i(e),a.src=e.target.result},a.onerror=e=>i(e),a.readAsDataURL(e)})}function i(){let t=e.querySelector(`#banner-file-input`),r=e.querySelector(`#btn-change-banner`),i=e.querySelector(`#btn-change-banner-card`);r&&r.addEventListener(`click`,()=>t.click()),i&&i.addEventListener(`click`,()=>t.click()),t&&t.addEventListener(`change`,async a=>{let o=a.target.files[0];if(o){r&&(r.disabled=!0),i&&(i.disabled=!0);try{let t=await n(o);await W.setSetting(`detail_banner_url`,t);let r=e.querySelector(`#admin-banner-preview`);r&&(r.src=t),J(`상세페이지 배너 이미지가 성공적으로 변경되었습니다.`)}catch(e){console.error(`배너 업로드 오류:`,e),Y(`배너 이미지 변경 실패: `+e.message)}finally{r&&(r.disabled=!1),i&&(i.disabled=!1),t.value=``}}})}i()}function s(e){let t=document.createElement(`div`);t.innerHTML=`
      <div class="form-group">
        <label class="form-label">기수 일정 리스트 (쉼표로 구분)</label>
        <textarea class="form-textarea" id="dates-textarea" style="min-height: 120px;" placeholder="예: 1기 - 8월 10일 (월) 19:00, 2기 - 8월 17일 (월) 19:00">${e}</textarea>
        <p style="font-size: 11px; color: var(--text-muted); margin-top: 6px; line-height: 1.5;">
          각 수강 신청 기수 일정을 쉼표(,)로 구분하여 작성해 주세요. 쉼표 1개가 수강신청 1단계 카드 1개로 생성됩니다.
        </p>
      </div>
    `;let n=document.createElement(`div`);n.style.display=`flex`,n.style.justifyContent=`flex-end`,n.style.gap=`var(--space-2)`,n.style.width=`100%`;let i=document.createElement(`button`);i.className=`btn btn-secondary`,i.textContent=`취소`,i.addEventListener(`click`,q);let a=document.createElement(`button`);a.className=`btn btn-primary`,a.textContent=`일정 저장`,a.addEventListener(`click`,async()=>{let e=t.querySelector(`#dates-textarea`).value.trim();try{await W.setSetting(`class_dates`,e),J(`수강 일정이 성공적으로 저장되었습니다.`),q(),r()}catch(e){Y(`저장 실패: `+e.message)}}),n.appendChild(i),n.appendChild(a),K({title:`수강 일정(기수) 리스트 편집`,size:`sm`,content:t,footer:n,onClose:null})}function c(e){let t=W.getById(`classApplications`,e);if(!t)return;let r=document.createElement(`div`);r.style.display=`flex`,r.style.flexDirection=`column`,r.style.gap=`var(--space-3)`,r.style.fontSize=`var(--text-sm)`;let i=``,a=t.answers||{};for(let[e,t]of Object.entries(a))i+=`
        <div style="display: flex; flex-direction: column; gap: var(--space-1); border-bottom: 1px solid var(--border); padding-bottom: var(--space-2); margin-bottom: var(--space-2);">
          <span style="font-weight: 700; color: var(--text-secondary); font-size: var(--text-xs);">${e}</span>
          <span style="font-size: var(--text-sm); white-space: pre-wrap; line-height: 1.5;">${t||`-`}</span>
        </div>
      `;r.innerHTML=`
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--space-3); border-bottom: 1px solid var(--border); padding-bottom: var(--space-3);">
        <span style="font-weight: 600; color: var(--text-secondary);">대표 이름</span>
        <span>${t.name||``}</span>
      </div>
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--space-3); border-bottom: 1px solid var(--border); padding-bottom: var(--space-3);">
        <span style="font-weight: 600; color: var(--text-secondary);">대표 연락처</span>
        <span>${t.phone||``}</span>
      </div>
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--space-3); border-bottom: 1px solid var(--border); padding-bottom: var(--space-3);">
        <span style="font-weight: 600; color: var(--text-secondary);">신청일시</span>
        <span>${n(t.created_at)}</span>
      </div>
      <div style="margin-top: var(--space-4);">
        <h3 style="font-size: 14px; font-weight: 800; margin-bottom: var(--space-3); color: var(--primary);">설문 상세 답변</h3>
        ${i||`<p style="color:var(--text-tertiary);">답변 내역이 없습니다.</p>`}
      </div>
      ${t.photo_url?`
      <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-2);">
        <span style="font-weight: 600; color: var(--text-secondary);">첨부 사진</span>
        <div style="text-align: center; background-color: var(--bg); padding: var(--space-2); border-radius: var(--radius-sm); border: 1px solid var(--border);">
          <a href="${t.photo_url}" target="_blank" title="원본 이미지 보기">
            <img src="${t.photo_url}" alt="첨부 사진" style="max-width: 100%; max-height: 200px; object-fit: contain; border-radius: var(--radius-sm);" />
          </a>
        </div>
      </div>
      `:``}
    `;let o=document.createElement(`div`);o.style.display=`flex`,o.style.justifyContent=`flex-end`,o.style.width=`100%`;let s=document.createElement(`button`);s.className=`btn btn-secondary`,s.textContent=`닫기`,s.addEventListener(`click`,q),o.appendChild(s),K({title:`수강 신청 상세 응답`,size:`md`,content:r,footer:o,onClose:null})}function l(e){let t=W.getById(`classApplications`,e);t&&st({title:`신청 정보 삭제`,message:`${t.name} 님의 수강신청 내역을 삭제하시겠습니까?`,danger:!0,confirmText:`삭제`,cancelText:`취소`,onConfirm:async()=>{try{W.delete(`classApplications`,e),J(`삭제되었습니다.`),r()}catch{Y(`삭제 오류 발생`)}}})}function u(e=null){let t=!!e,n=t?W.getById(`surveyQuestions`,e):null,i=document.createElement(`div`);i.innerHTML=`
      <div class="form-group">
        <label class="form-label">질문 유형</label>
        <select class="form-select" id="q-type" required>
          <option value="text" ${n&&n.type===`text`?`selected`:``}>한줄 입력 (text)</option>
          <option value="textarea" ${n&&n.type===`textarea`?`selected`:``}>여러줄 입력 (textarea)</option>
          <option value="file" ${n&&n.type===`file`?`selected`:``}>사진 파일 첨부 (file)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">질문 문구 (Label)</label>
        <input type="text" class="form-input" id="q-label" placeholder="예: 크리에이터가 되고 싶은 이유" value="${n?n.label:``}" required>
      </div>
      <div class="form-group">
        <label class="form-label">입력 힌트 (Placeholder)</label>
        <input type="text" class="form-input" id="q-placeholder" placeholder="예: 상세하게 작성해 주세요" value="${n?n.placeholder:``}">
      </div>
      <div class="form-group" style="display: flex; align-items: center; gap: 8px; margin-top: var(--space-4);">
        <input type="checkbox" id="q-required" ${!n||n.required?`checked`:``} style="width: 16px; height: 16px; cursor: pointer;">
        <label for="q-required" style="font-size: 13px; font-weight: 700; cursor: pointer;">필수 입력 문항으로 설정</label>
      </div>
      <div class="form-group" style="margin-top: var(--space-3);">
        <label class="form-label">출력 정렬 순서 (낮을수록 먼저 노출)</label>
        <input type="number" class="form-input" id="q-sort" value="${n?n.sort_order:`1`}" min="1" required>
      </div>
    `;let a=document.createElement(`div`);a.style.display=`flex`,a.style.justifyContent=`flex-end`,a.style.gap=`var(--space-3)`,a.style.width=`100%`;let o=document.createElement(`button`);o.className=`btn btn-secondary`,o.textContent=`취소`,o.addEventListener(`click`,q);let s=document.createElement(`button`);s.className=`btn btn-primary`,s.textContent=`저장`,s.addEventListener(`click`,async()=>{let n=i.querySelector(`#q-type`).value,a=i.querySelector(`#q-label`).value.trim(),o=i.querySelector(`#q-placeholder`).value.trim(),s=i.querySelector(`#q-required`).checked,c=parseInt(i.querySelector(`#q-sort`).value,10)||1;if(!a){Y(`질문 문구를 입력해 주세요.`);return}try{t?(W.update(`surveyQuestions`,e,{type:n,label:a,placeholder:o,options:``,required:s,sort_order:c}),J(`문항이 수정되었습니다.`)):(W.create(`surveyQuestions`,{id:Date.now(),type:n,label:a,placeholder:o,options:``,required:s,sort_order:c}),J(`새 문항이 추가되었습니다.`)),q(),r()}catch(e){Y(`저장 실패: `+e.message)}}),a.appendChild(o),a.appendChild(s),K({title:t?`추가 질문 수정`:`새 추가 질문 생성`,size:`sm`,content:i,footer:a,onClose:null})}function d(e){let t=W.getById(`surveyQuestions`,e);t&&st({title:`문항 삭제`,message:`"${t.label}" 추가 문항을 정말 삭제하시겠습니까? 수강신청 폼에서 즉시 제외됩니다.`,danger:!0,confirmText:`삭제`,cancelText:`취소`,onConfirm:async()=>{try{W.delete(`surveyQuestions`,e),J(`문항이 삭제되었습니다.`),r()}catch{Y(`삭제 오류`)}}})}return r(),e}var Va=`https://vybrnhyaeugfwezbygdt.supabase.co`,Ha=`sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9`,Ua={apikey:Ha,Authorization:`Bearer ${Ha}`,"Content-Type":`application/json`,Prefer:`return=representation`};function Wa(){let e=document.createElement(`div`),t=async()=>{try{let e=await fetch(`${Va}/rest/v1/news?select=*`,{headers:Ua}).catch(()=>null);if(e&&e.ok){let t=await e.json();if(t&&t.length>0)return t}}catch{}try{let e=localStorage.getItem(`ryzin_news_data`);if(e)return JSON.parse(e)}catch{}return[{id:`news-001`,category:`언론보도`,categoryEn:`PRESS`,title:`라이진 스튜디오, 2026 하반기 초고화질 미디어 융합 라이브 솔루션 공식 출시`,date:`2026.07.28`,publisher:`파이낸셜뉴스`,summary:`라이브커머스 전문 미디어 기업 라이진(RYZIN)이 방송 기술과 브랜드 스토리텔링을 결합한 차세대 미디어 융합 솔루션을 공개했습니다.`,image:`assets/001.jpg`,url:`https://blog.naver.com/ryzin_live`,content:`미디어 커머스 기업 라이진 스튜디오(RYZIN Studio)가 브랜드사의 미디어 몰입감을 극대화하는 '2026 초고화질 미디어 융합 라이브 솔루션'을 정식 출시했다고 28일 밝혔다.<br><br>라이진 스튜디오는 단순 상품 판매 방송을 넘어 시네마틱 카메라와 4K 방송용 조명 시스템을 도입하여 감도 높은 비주얼 퍼포먼스를 구축해왔다. 이번 솔루션을 통해 시청 몰입도 40% 증가 및 평균 전환율 2.5배 상승 성과를 거두었다.`}]},n=async(e,t=null,n=`upsert`)=>{localStorage.setItem(`ryzin_news_data`,JSON.stringify(e));try{let t=await fetch(`${Va}/rest/v1/homepage_settings?key=eq.news&select=key`,{headers:Ua}).catch(()=>null),n=!1;if(t&&t.ok){let e=await t.json();e&&e.length>0&&(n=!0)}n?await fetch(`${Va}/rest/v1/homepage_settings?key=eq.news`,{method:`PATCH`,headers:Ua,body:JSON.stringify({value:e})}).catch(()=>null):await fetch(`${Va}/rest/v1/homepage_settings`,{method:`POST`,headers:Ua,body:JSON.stringify({key:`news`,value:e})}).catch(()=>null)}catch(e){console.warn(`homepage_settings save error:`,e)}if(t)try{if(n===`delete`){let e=await fetch(`${Va}/rest/v1/news?id=eq.${t.id}`,{method:`DELETE`,headers:Ua});e.ok||console.warn(`Supabase 삭제 실패:`,e.status)}else{let e=await fetch(`${Va}/rest/v1/news?id=eq.${t.id}&select=id`,{method:`GET`,headers:Ua}),n=!1;if(e.ok){let t=await e.json();t&&t.length>0&&(n=!0)}let r;if(r=n?await fetch(`${Va}/rest/v1/news?id=eq.${t.id}`,{method:`PATCH`,headers:Ua,body:JSON.stringify(t)}):await fetch(`${Va}/rest/v1/news`,{method:`POST`,headers:Ua,body:JSON.stringify(t)}),r.ok)console.log(`Supabase 동기화 성공!`);else{let e=await r.text();console.warn(`Supabase 저장 실패 응답:`,r.status,e)}}}catch(e){console.warn(`Supabase DB 동기화 통신 오류:`,e)}},r=[];async function i(){r=await t(),e.innerHTML=`
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">뉴스룸 관리</h1>
            <p class="page-description">홈페이지 뉴스룸 보도자료 및 소식 등록, 수정, 삭제 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <button class="btn btn-primary" id="btn-add-news" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            새 보도자료 등록
          </button>
        </div>
      </div>

      <div class="page-body">
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <h3>보도자료 내역</h3>
              <span class="badge badge-secondary" id="news-count-badge">${r.length}개 항목</span>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="text-center" style="width: 60px;">번호</th>
                  <th style="width: 100px;">카테고리</th>
                  <th>제목</th>
                  <th style="width: 120px;">언론사</th>
                  <th class="text-center" style="width: 110px;">등록일자</th>
                  <th class="text-center" style="width: 140px;">관리</th>
                </tr>
              </thead>
              <tbody id="news-tbody">
                ${r.length===0?`<tr><td colspan="6" class="text-center" style="padding:40px; color:var(--text-tertiary);">등록된 뉴스룸 보도자료가 없습니다.</td></tr>`:``}
                ${r.map((e,t)=>`
                  <tr>
                    <td class="text-center" style="font-weight:600; color:var(--text-tertiary);">${t+1}</td>
                    <td><span class="badge badge-primary">${e.category||`언론보도`}</span></td>
                    <td style="font-weight: 600; color: var(--text-primary);">${e.title}</td>
                    <td style="color: var(--text-secondary);">${e.publisher||`-`}</td>
                    <td class="text-center" style="color: var(--text-secondary); font-size: 13px;">${e.date||`-`}</td>
                    <td class="text-center">
                      <div style="display:flex; gap: 6px; justify-content: center;">
                        <button class="btn btn-xs btn-secondary btn-edit-news" data-id="${e.id}">수정</button>
                        <button class="btn btn-xs btn-danger btn-delete-news" data-id="${e.id}">삭제</button>
                      </div>
                    </td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,e.querySelector(`#btn-add-news`)?.addEventListener(`click`,()=>{a()}),e.querySelectorAll(`.btn-edit-news`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.id,n=r.find(e=>e.id===t);n&&a(n)})}),e.querySelectorAll(`.btn-delete-news`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.id,a=r.find(e=>e.id===t);st(`정말 이 보도자료를 삭제하시겠습니까?`,async()=>{r=r.filter(e=>e.id!==t),await n(r,a,`delete`),J(`보도자료가 삭제되었습니다.`),i()})})})}function a(e=null){let t=!!e,a=document.createElement(`div`);a.innerHTML=`
      <div style="padding: var(--space-4);">
        <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">
          ${t?`보도자료 수정`:`새 보도자료 등록`}
        </h2>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="form-group">
            <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">제목 *</label>
            <input type="text" id="news-form-title" class="input" value="${e?e.title:``}" placeholder="보도자료 제목을 입력하세요" style="width: 100%;">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">카테고리</label>
              <select id="news-form-category" class="input" style="width: 100%;">
                <option value="언론보도" ${e&&e.category===`언론보도`?`selected`:``}>언론보도</option>
                <option value="트렌드&인사이트" ${e&&e.category===`트렌드&인사이트`?`selected`:``}>트렌드&인사이트</option>
                <option value="회사소식" ${e&&e.category===`회사소식`?`selected`:``}>회사소식</option>
              </select>
            </div>
            <div class="form-group">
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">언론사/출처</label>
              <input type="text" id="news-form-publisher" class="input" value="${e&&e.publisher||``}" placeholder="예: 파이낸셜뉴스, RYZIN PR" style="width: 100%;">
            </div>
            <div class="form-group">
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">보도/등록 일자</label>
              <input type="text" id="news-form-date" class="input" value="${e?e.date||``:new Date().toISOString().slice(0,10).replace(/-/g,`.`)}" placeholder="2026.08.03" style="width: 100%;">
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px; align-items: end;">
            <div class="form-group">
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">대표 이미지 URL / 파일 업로드</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="news-form-image" class="input" value="${e?e.image||``:`assets/001.jpg`}" placeholder="assets/001.jpg 또는 이미지 링크" style="flex: 1;">
                <input type="file" id="news-form-file-input" accept="image/*" style="display: none;">
                <button class="btn btn-secondary btn-sm" id="btn-trigger-news-file" type="button" style="white-space: nowrap;">파일 선택</button>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">사진 위아래 세밀 조정 (<span id="val-pos">${e&&e.imagePosition?e.imagePosition:`50%`}</span>)</label>
              <div style="display: flex; align-items: center; gap: 8px; height: 38px;">
                <input type="range" id="news-form-image-position" min="0" max="100" value="${e&&e.imagePosition?parseInt(e.imagePosition):50}" style="width: 100%; accent-color: var(--primary);">
              </div>
            </div>
          </div>
          <span style="font-size: 11px; color: var(--text-tertiary); margin-top: -6px; display: block;">* 한글 파일명(기사사진.jpg 등)도 영문 안전 파일명으로 자동 변환되어 정상 등록됩니다.</span>
          
          <!-- 실시간 크롭 미리보기 컨테이너 -->
          <div class="form-group">
            <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">구도 미리보기 (실시간 반영)</label>
            <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-color); background: #000; position: relative;">
              <img id="news-form-preview-img" src="${e&&e.image||`assets/001.jpg`}" style="width: 100%; height: 100%; object-fit: cover; object-position: center ${e&&e.imagePosition?e.imagePosition:`50%`}; transition: none;">
            </div>
          </div>
          <div class="form-group">
            <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">원문 기사 URL (링크)</label>
            <input type="text" id="news-form-url" class="input" value="${e&&e.url||``}" placeholder="https://..." style="width: 100%;">
          </div>
          <div class="form-group">
            <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">한줄 요약 (서머리)</label>
            <input type="text" id="news-form-summary" class="input" value="${e&&e.summary||``}" placeholder="기사 카드에 보일 핵심 요약 내용" style="width: 100%;">
          </div>
          <div class="form-group">
            <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">상세 본문 내용 (HTML/줄바꿈 가능)</label>
            <textarea id="news-form-content" class="input" rows="6" placeholder="기사 상세 본문 내용을 입력하세요." style="width: 100%; font-family: inherit;">${e&&e.content||``}</textarea>
          </div>
        </div>
      </div>
    `;let o=document.createElement(`div`);o.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%; margin-top: 16px;`;let s=document.createElement(`button`);s.className=`btn btn-secondary`,s.textContent=`취소`,s.addEventListener(`click`,q);let c=document.createElement(`button`);c.className=`btn btn-primary`,c.textContent=`저장`,c.addEventListener(`click`,()=>{let a=document.getElementById(`news-form-title`).value.trim(),o=document.getElementById(`news-form-category`).value,s=document.getElementById(`news-form-publisher`).value.trim(),c=document.getElementById(`news-form-date`).value.trim(),l=document.getElementById(`news-form-image`).value.trim(),u=document.getElementById(`news-form-image-position`).value+`%`,d=document.getElementById(`news-form-url`).value.trim(),f=document.getElementById(`news-form-summary`).value.trim(),p=document.getElementById(`news-form-content`).value.trim();if(!a){Y(`보도자료 제목을 입력해주세요.`);return}let m=null;if(t){let t=r.findIndex(t=>t.id===e.id);t!==-1&&(r[t]={...r[t],title:a,category:o,publisher:s,date:c,image:l,imagePosition:u,url:d,summary:f,content:p},m=r[t])}else m={id:`news-${Date.now()}`,title:a,category:o,publisher:s,date:c,image:l||`assets/001.jpg`,imagePosition:u,url:d,summary:f,content:p},r.unshift(m);n(r,m,`upsert`),J(t?`보도자료가 수정되었습니다.`:`새 보도자료가 등록되었습니다.`),q(),i()}),setTimeout(()=>{let e=document.getElementById(`news-form-file-input`),t=document.getElementById(`btn-trigger-news-file`),n=document.getElementById(`news-form-image`),r=document.getElementById(`news-form-image-position`),i=document.getElementById(`val-pos`),a=document.getElementById(`news-form-preview-img`);r&&i&&a&&r.addEventListener(`input`,e=>{let t=e.target.value+`%`;i.textContent=t,a.style.objectPosition=`center ${t}`}),n&&a&&n.addEventListener(`input`,e=>{a.src=e.target.value||`assets/001.jpg`}),t&&e&&(t.addEventListener(`click`,()=>e.click()),e.addEventListener(`change`,async e=>{let r=e.target.files[0];if(!r)return;let i=r.name.match(/\.([a-zA-Z0-9]+)$/),a=i?i[1].toLowerCase():`jpg`,o=`news_${Date.now()}_${Math.random().toString(36).substring(2,6)}.${a}`;t.disabled=!0,t.textContent=`업로드 중...`;try{let e=await fetch(`${Va}/storage/v1/object/news_images/${o}`,{method:`POST`,headers:{apikey:Ha,Authorization:`Bearer ${Ha}`,"Content-Type":r.type},body:r});if(e.ok)n.value=`${Va}/storage/v1/object/public/news_images/${o}`,J(`이미지가 안전하게 업로드되어 연동되었습니다!`);else{console.warn(`Storage Upload Status:`,e.status);let t=new FileReader;t.onload=e=>{n.value=e.target.result,J(`'${r.name}' 로컬 변환되어 등록되었습니다.`)},t.readAsDataURL(r)}}catch(e){console.warn(`Storage Upload Catch:`,e);let t=new FileReader;t.onload=e=>{n.value=e.target.result,J(`'${r.name}' 로컬 변환되어 등록되었습니다.`)},t.readAsDataURL(r)}finally{t.disabled=!1,t.textContent=`파일 선택`}}))},0),o.appendChild(s),o.appendChild(c),K({title:t?`뉴스룸 보도자료 수정`:`새 보도자료 등록`,content:a,footer:o})}return i(),e}var Ga=`https://vybrnhyaeugfwezbygdt.supabase.co`,Ka=`sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9`,qa={apikey:Ka,Authorization:`Bearer ${Ka}`,"Content-Type":`application/json`,Prefer:`resolution=merge-duplicates`};function Ja(){let e=document.createElement(`div`),t=`hero`,n=async(e,t)=>{try{let t=await fetch(`${Ga}/rest/v1/homepage_settings?key=eq.${e}&select=*`,{headers:qa}).catch(()=>null);if(t&&t.ok){let n=await t.json();if(n&&n[0]&&n[0].value!==void 0){let t=n[0].value;if(typeof t==`string`)try{t=JSON.parse(t)}catch{}if(t){try{localStorage.setItem(`ryzin_hp_${e}`,JSON.stringify(t))}catch{}return t}}}}catch{}try{let t=localStorage.getItem(`ryzin_hp_${e}`);if(t)return JSON.parse(t)}catch{}return t},r=async(e,t)=>{try{localStorage.setItem(`ryzin_hp_${e}`,JSON.stringify(t))}catch{}try{let n=await fetch(`${Ga}/rest/v1/homepage_settings?on_conflict=key`,{method:`POST`,headers:{...qa,Prefer:`resolution=merge-duplicates`},body:JSON.stringify({key:e,value:t,updated_at:new Date().toISOString()})});n.ok||console.warn(`Supabase save response error:`,await n.text())}catch(e){console.error(`Supabase save error:`,e)}},i=null,a=null,o=null,s=null,c=null,l=null,u={eyebrow:`브랜드를 가장 생생하게 만나는 순간`,prefix:`우리는`,suffix:`만듭니다.`,phrases:[`브랜드를 라이브`,`브랜드의 매출을`,`구매하는 순간을`]};async function d(){s=await n(`hero_text`,null),(!s||!s.phrases)&&(s=u);let e=await n(`hero`,null);if(!e)try{let t=await fetch(`/hero.json`);t.ok&&(e=await t.json())}catch{}if(e&&typeof e==`object`&&!Array.isArray(e)?(i=[],[`col1`,`col2`,`col3`,`col4`].forEach(t=>{e[t]&&e[t].forEach(e=>{e&&!i.includes(e)&&i.push(e)})})):i=Array.isArray(e)?e:[],a=await n(`portfolio`,null),!a)try{let e=await fetch(`/portfolio.json`);e.ok&&(a=await e.json(),await r(`portfolio`,a))}catch{}if(a||=[{title:`만나강정`,category:`food`,image:`./assets/1783519975524_KakaoTalk_Photo_2026-07-08-23-07-21.png`,link:`#`},{title:`트루쿡`,category:`life`,image:`./assets/1782397523767_123.png`,link:`#`}],o=await n(`packages`,null),!o)try{let e=await fetch(`/packages.json`);e.ok&&(o=await e.json(),await r(`packages`,o))}catch{}if(o||=[{name:`STANDARD LIGHT`,price:`990,000원`,features:`1인 진행`}],c=await n(`stories`,null),!c)try{let e=await fetch(`/stories.json`);e.ok&&(c=await e.json(),await r(`stories`,c))}catch{}if(c||=[{brand:`강릉은정한과`,quote:`매출액 300% 상승 달성!`}],l=await n(`logos`,null),!l)try{let e=await fetch(`/logos.json`);e.ok&&(l=await e.json(),await r(`logos`,l))}catch{}l||=[]}async function f(){i||await d(),e.innerHTML=`
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">홈페이지 관리 (Supabase 동기화)</h1>
            <p class="page-description">공식 웹사이트 메인 비주얼, 포트폴리오, 제작 패키지, 후기 및 파트너 로고 실시간 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <button class="btn btn-secondary" id="btn-force-sync" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            기존 홈페이지 파일에서 동기화 가져오기
          </button>
        </div>
      </div>

      <div class="page-body">
        <!-- 상단 서브 탭 5개 -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); margin-bottom: 24px; padding-bottom: 8px; flex-wrap: wrap;">
          <button class="btn ${t===`hero`?`btn-primary`:`btn-secondary`}" data-tab="hero">메인 히어로 갤러리</button>
          <button class="btn ${t===`portfolio`?`btn-primary`:`btn-secondary`}" data-tab="portfolio">포트폴리오 레퍼런스</button>
          <button class="btn ${t===`packages`?`btn-primary`:`btn-secondary`}" data-tab="packages">제작 패키지</button>
          <button class="btn ${t===`stories`?`btn-primary`:`btn-secondary`}" data-tab="stories">브랜드사 이야기</button>
          <button class="btn ${t===`logos`?`btn-primary`:`btn-secondary`}" data-tab="logos">파트너 로고</button>
        </div>

        <div id="hp-tab-content">
          ${p()}
        </div>
      </div>
    `,e.querySelectorAll(`[data-tab]`).forEach(e=>{e.addEventListener(`click`,e=>{t=e.target.dataset.tab,f()})}),m()}function p(){return t===`hero`?`
        <!-- 1. 히어로 상단 헤더 텍스트 문구 설정 카드 -->
        <div class="card" style="margin-bottom:24px;">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="font-weight:800; font-size:16px;">메인 히어로 상단 텍스트 문구 관리</h3>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                메인 화면 상단의 소제목, 고정 접두사/접미사, 슬롯 롤링 문구 3가지를 직접 변경할 수 있습니다.
              </p>
            </div>
            <button class="btn btn-success btn-sm" id="btn-save-hero-text">텍스트 문구 Supabase DB 저장</button>
          </div>
          <div class="card-body">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
              <div style="display:flex; flex-direction:column; gap:6px;">
                <label style="font-size:12px; font-weight:700; color:var(--text-primary);">상단 소제목 (Eyebrow)</label>
                <input type="text" class="input" id="input-hero-eyebrow" value="${s.eyebrow||``}" placeholder="예: 브랜드를 가장 생생하게 만나는 순간" style="font-size:13px;">
              </div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                <label style="font-size:12px; font-weight:700; color:var(--text-primary);">메인 타이틀 고정 접두사 (Prefix)</label>
                <input type="text" class="input" id="input-hero-prefix" value="${s.prefix||``}" placeholder="예: 우리는" style="font-size:13px;">
              </div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                <label style="font-size:12px; font-weight:700; color:var(--text-primary);">메인 타이틀 고정 접미사 (Suffix)</label>
                <input type="text" class="input" id="input-hero-suffix" value="${s.suffix||``}" placeholder="예: 만듭니다." style="font-size:13px;">
              </div>
            </div>

            <div style="margin-top:16px; border-top:1px solid var(--border-light); padding-top:16px;">
              <label style="font-size:12px; font-weight:700; color:var(--text-primary); display:block; margin-bottom:8px;">
                슬롯 롤링 핵심 키워드 목록 (3가지 순환 문구)
              </label>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:12px;">
                <div style="display:flex; flex-direction:column; gap:4px;">
                  <span style="font-size:11px; color:var(--text-secondary);">롤링 문구 1</span>
                  <input type="text" class="input input-hero-phrase" data-idx="0" value="${s.phrases&&s.phrases[0]||``}" placeholder="예: 브랜드를 라이브" style="font-size:13px;">
                </div>
                <div style="display:flex; flex-direction:column; gap:4px;">
                  <span style="font-size:11px; color:var(--text-secondary);">롤링 문구 2</span>
                  <input type="text" class="input input-hero-phrase" data-idx="1" value="${s.phrases&&s.phrases[1]||``}" placeholder="예: 브랜드의 매출을" style="font-size:13px;">
                </div>
                <div style="display:flex; flex-direction:column; gap:4px;">
                  <span style="font-size:11px; color:var(--text-secondary);">롤링 문구 3</span>
                  <input type="text" class="input input-hero-phrase" data-idx="2" value="${s.phrases&&s.phrases[2]||``}" placeholder="예: 구매하는 순간을" style="font-size:13px;">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. 메인 히어로 3D 슬라이더 카드 관리 카드 -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="font-weight:800; font-size:16px;">메인 히어로 3D 슬라이더 카드 관리</h3>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                등록된 순서대로 메인 3D 커버플로우 무대에 노출됩니다. 컴퓨터 사진 선택 시 Supabase 원본 스토리지로 실시간 저장됩니다.
              </p>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" id="btn-clear-all-hero" style="color:#ef4444; border-color:rgba(239,68,68,0.3);">기존 카드 전체 비우기</button>
              <button class="btn btn-primary btn-sm" id="btn-add-hero-card">+ 새 히어로 카드 추가</button>
              <button class="btn btn-success btn-sm" id="btn-save-hero">Supabase DB 실시간 저장</button>
            </div>
          </div>
          <div class="card-body">
            ${i.length===0?`
              <div style="text-align:center; padding: 48px 20px; border:2px dashed var(--border-color); border-radius:12px; background:var(--bg-secondary);">
                <p style="font-size:15px; font-weight:700; color:var(--text-primary); margin-bottom:8px;">등록된 히어로 카드가 없습니다.</p>
                <p style="font-size:13px; color:var(--text-secondary); margin-bottom:16px;">상단의 <strong>[ + 새 히어로 카드 추가 ]</strong> 버튼을 눌러 고화질 사진이나 동영상 파일을 직접 등록해 보세요.</p>
                <button class="btn btn-primary btn-sm" id="btn-add-hero-card-empty">+ 첫 번째 히어로 카드 등록하기</button>
              </div>
            `:`
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px;">
                ${i.map((e,t)=>{let n=e.startsWith(`http://`)||e.startsWith(`https://`)?e:`./assets/${e}`;return`
                    <div class="hero-item-card" style="background:var(--bg-secondary); border:1px solid var(--border-light); border-radius:12px; padding:14px; display:flex; flex-direction:column; gap:10px; position:relative;">
                      <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="badge badge-primary" style="font-size:11px;">카드 NO. ${t+1}</span>
                        <div style="display:flex; gap:4px;">
                          ${t>0?`<button class="btn btn-xs btn-secondary btn-move-hero" data-idx="${t}" data-dir="-1" title="위로">위로</button>`:``}
                          ${t<i.length-1?`<button class="btn btn-xs btn-secondary btn-move-hero" data-idx="${t}" data-dir="1" title="아래로">아래로</button>`:``}
                          <button class="btn btn-xs btn-danger btn-del-hero-card" data-idx="${t}" title="삭제">삭제</button>
                        </div>
                      </div>
                      <div style="width:100%; height:200px; border-radius:8px; overflow:hidden; background:#000; display:flex; align-items:center; justify-content:center; border:1px solid rgba(255,255,255,0.1); position:relative;">
                        ${e?e.endsWith(`.mp4`)||e.endsWith(`.webm`)?`<video src="${n}" style="width:100%; height:100%; object-fit:cover;" autoplay loop muted playsinline></video>`:`<img src="${n}" alt="Hero Image" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='./assets/001.jpg'">`:`<span style="font-size:12px; color:var(--text-tertiary);">사진을 선택해주세요</span>`}
                      </div>
                      <div style="display:flex; flex-direction:column; gap:4px;">
                        <label style="font-size:11px; font-weight:700; color:var(--text-secondary);">이미지 경로 / Supabase URL</label>
                        <div style="display:flex; gap:4px;">
                          <input type="text" class="input input-hero-path" data-idx="${t}" value="${e}" placeholder="./assets/파일명.jpg 또는 URL" style="font-size:11px; flex:1;">
                          <input type="file" class="hero-card-file-input" id="hero-card-file-${t}" data-idx="${t}" accept="image/*,video/*" style="display:none;">
                          <button class="btn btn-xs btn-secondary btn-upload-hero-card" data-idx="${t}" style="font-size:11px; white-space:nowrap;">사진 선택</button>
                        </div>
                      </div>
                    </div>
                  `}).join(``)}
              </div>
            `}
          </div>
        </div>
      `:t===`portfolio`?`
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3>포트폴리오 레퍼런스 목록</h3>
              <span class="badge badge-secondary">${a.length}개 항목</span>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-add-pf">+ 새 포트폴리오 추가</button>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:60px;">번호</th>
                  <th>브랜드/제목</th>
                  <th>카테고리</th>
                  <th>대표 이미지</th>
                  <th>방송/영상 링크</th>
                  <th class="text-center" style="width:120px;">관리</th>
                </tr>
              </thead>
              <tbody>
                ${a.map((e,t)=>`
                  <tr>
                    <td style="font-weight:600; color:var(--text-tertiary);">${t+1}</td>
                    <td style="font-weight:700;">${e.title}</td>
                    <td><span class="badge badge-primary">${e.category}</span></td>
                    <td style="font-size:12px; color:var(--text-secondary); max-width:180px; overflow:hidden; text-overflow:ellipsis;">${e.image}</td>
                    <td style="font-size:12px; color:var(--status-info);">${e.link||`#`}</td>
                    <td class="text-center">
                      <button class="btn btn-xs btn-danger btn-del-pf" data-idx="${t}">삭제</button>
                    </td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>
        </div>
      `:t===`packages`?`
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>제작 패키지 구성</h3>
            <button class="btn btn-primary btn-sm" id="btn-add-pkg">+ 패키지 추가</button>
          </div>
          <div class="card-body">
            <div style="display:flex; flex-direction:column; gap:16px;">
              ${o.map((e,t)=>`
                <div style="padding:16px; background:var(--bg-secondary); border-radius:var(--radius-md); border:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <h4 style="font-size:16px; font-weight:700;">${e.name} <span style="color:var(--primary); font-size:14px; margin-left:8px;">${e.price}</span></h4>
                    <p style="font-size:13px; color:var(--text-secondary); margin-top:4px;">${Array.isArray(e.features)?e.features.join(`, `):e.features||``}</p>
                  </div>
                  <button class="btn btn-xs btn-danger btn-del-pkg" data-idx="${t}">삭제</button>
                </div>
              `).join(``)}
            </div>
          </div>
        </div>
      `:t===`stories`?`
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>브랜드사 후기 & 스토리</h3>
            <button class="btn btn-primary btn-sm" id="btn-add-story">+ 스토리 추가</button>
          </div>
          <div class="card-body">
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${c.map((e,t)=>`
                <div style="padding:16px; background:var(--bg-secondary); border-radius:var(--radius-md); border:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <strong style="font-size:15px; color:var(--text-primary);">${e.brand||e.company||``}</strong>
                    <p style="font-size:14px; color:var(--text-secondary); margin-top:4px;">"${e.quote}"</p>
                    <span style="font-size:12px; color:var(--text-tertiary);">${e.author||e.authorRole||``}</span>
                  </div>
                  <button class="btn btn-xs btn-danger btn-del-story" data-idx="${t}">삭제</button>
                </div>
              `).join(``)}
            </div>
          </div>
        </div>
      `:t===`logos`?`
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>파트너 브랜드 로고</h3>
            <button class="btn btn-primary btn-sm" id="btn-add-logo">+ 로고 추가</button>
          </div>
          <div class="card-body">
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px;">
              ${l.map((e,t)=>`
                <div style="padding:16px; background:var(--bg-secondary); border-radius:var(--radius-md); border:1px solid var(--border-light); text-align:center;">
                  <strong style="font-size:14px; display:block; margin-bottom:8px;">${e.name}</strong>
                  <div style="font-size:12px; color:var(--text-tertiary); overflow:hidden; text-overflow:ellipsis;">${e.logo}</div>
                  <button class="btn btn-xs btn-danger btn-del-logo" data-idx="${t}" style="margin-top:12px;">삭제</button>
                </div>
              `).join(``)}
            </div>
          </div>
        </div>
      `:``}function m(){if(e.querySelector(`#btn-force-sync`)?.addEventListener(`click`,()=>{st(`기존 홈페이지의 JSON 파일들로부터 모든 데이터(포트폴리오, 히어로 등)를 강제로 가져와 Supabase DB에 엎어쓰시겠습니까?`,async()=>{try{let e=await fetch(`/hero.json`).catch(()=>null);e&&e.ok&&(i=await e.json(),await r(`hero`,i));let t=await fetch(`/portfolio.json`).catch(()=>null);t&&t.ok&&(a=await t.json(),await r(`portfolio`,a));let n=await fetch(`/packages.json`).catch(()=>null);n&&n.ok&&(o=await n.json(),await r(`packages`,o));let s=await fetch(`/stories.json`).catch(()=>null);s&&s.ok&&(c=await s.json(),await r(`stories`,c));let u=await fetch(`/logos.json`).catch(()=>null);u&&u.ok&&(l=await u.json(),await r(`logos`,l)),J(`기존 홈페이지 실데이터 전체가 성공적으로 Supabase DB와 동기화 마이그레이션되었습니다!`),f()}catch{Y(`기존 데이터 가져오기 중 오류가 발생했습니다.`)}})}),t===`hero`){e.querySelector(`#btn-save-hero-text`)?.addEventListener(`click`,async()=>{let t=e.querySelector(`#input-hero-eyebrow`)?.value.trim()||``,n=e.querySelector(`#input-hero-prefix`)?.value.trim()||``,i=e.querySelector(`#input-hero-suffix`)?.value.trim()||``,a=[];e.querySelectorAll(`.input-hero-phrase`).forEach(e=>{e.value.trim()&&a.push(e.value.trim())}),s={eyebrow:t,prefix:n,suffix:i,phrases:a},await r(`hero_text`,s),J(`메인 히어로 상단 텍스트 문구가 Supabase DB에 실시간 저장되었습니다.`)}),e.querySelector(`#btn-clear-all-hero`)?.addEventListener(`click`,async()=>{confirm(`기존 등록된 모든 히어로 카드를 삭제하고 초기화하시겠습니까?
(새로 직접 등록하실 수 있도록 전부 비워집니다.)`)&&(i=[],await r(`hero`,i),J(`히어로 카드가 전체 삭제되었습니다. 새 카드를 직접 추가해 보세요.`),f())});let t=async()=>{i.push(``),f()};e.querySelector(`#btn-add-hero-card`)?.addEventListener(`click`,t),e.querySelector(`#btn-add-hero-card-empty`)?.addEventListener(`click`,t),e.querySelectorAll(`.btn-move-hero`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=parseInt(e.currentTarget.dataset.idx),n=t+parseInt(e.currentTarget.dataset.dir);if(n>=0&&n<i.length){let e=i[t];i[t]=i[n],i[n]=e,await r(`hero`,i),f()}})}),e.querySelectorAll(`.btn-del-hero-card`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=parseInt(e.currentTarget.dataset.idx);i.splice(t,1),await r(`hero`,i),J(`카드가 삭제되었습니다.`),f()})}),e.querySelectorAll(`.input-hero-path`).forEach(e=>{e.addEventListener(`change`,e=>{let t=parseInt(e.target.dataset.idx);i[t]=e.target.value.trim()})}),e.querySelectorAll(`.btn-upload-hero-card`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.idx,n=document.getElementById(`hero-card-file-${t}`);n&&n.click()})}),e.querySelectorAll(`.hero-card-file-input`).forEach(t=>{t.addEventListener(`change`,async t=>{let n=parseInt(t.target.dataset.idx),a=t.target.files[0];if(!a)return;let o=e.querySelector(`.btn-upload-hero-card[data-idx="${n}"]`);o&&(o.disabled=!0,o.textContent=`⏳ 업로드 중...`);try{a.type.startsWith(`image/`)&&(a=await new Promise(e=>{let t=new Image,n=new FileReader;n.onload=n=>{t.onload=()=>{let n=document.createElement(`canvas`),r=t.width,i=t.height,o=1920;r>o&&(i=Math.round(i*o/r),r=o),n.width=r,n.height=i,n.getContext(`2d`).drawImage(t,0,0,r,i),n.toBlob(t=>{if(!t){e(a);return}e(new File([t],a.name.replace(/\.[^/.]+$/,``)+`.jpg`,{type:`image/jpeg`,lastModified:Date.now()}))},`image/jpeg`,.88)},t.src=n.target.result},n.readAsDataURL(a)}));let e=window.supabaseClient;if(!e){alert(`Supabase 연동 클라이언트를 찾을 수 없습니다.`);return}let t=a.name.split(`.`).pop(),o=`hero/${`${Date.now()}_${Math.random().toString(36).substring(2,7)}.${t}`}`,{data:s,error:c}=await e.storage.from(`news_images`).upload(o,a,{cacheControl:`3600`,upsert:!0});if(c){let t=await e.storage.from(`hp_assets`).upload(o,a,{cacheControl:`3600`,upsert:!0});s=t.data,c=t.error}if(c){console.error(`Storage Upload Error:`,c),alert(`파일 업로드 실패: `+c.message);return}let{data:l}=e.storage.from(`news_images`).getPublicUrl(o),u=l.publicUrl;i[n]=u,await r(`hero`,i),J(`사진이 Supabase 고화질 스토리지로 성공적으로 업로드되었습니다!`),f()}catch(e){console.error(e),alert(`업로드 처리 중 오류 발생: `+e.message)}finally{o&&(o.disabled=!1,o.textContent=`사진 선택`)}})})}e.querySelector(`#btn-add-pf`)?.addEventListener(`click`,async()=>{let e=prompt(`포트폴리오 브랜드명/제목:`);if(!e)return;let t=prompt(`이미지 경로:`,`./assets/001.jpg`)||`./assets/001.jpg`,n=prompt(`방송/영상 URL 링크:`,`#`)||`#`;a.unshift({title:e,category:`beauty`,image:t,link:n}),await r(`portfolio`,a),J(`포트폴리오가 Supabase DB에 동기화되었습니다.`),f()}),e.querySelectorAll(`.btn-del-pf`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=parseInt(e.target.dataset.idx);a.splice(t,1),await r(`portfolio`,a),J(`포트폴리오 항목이 삭제되었습니다.`),f()})}),e.querySelector(`#btn-add-pkg`)?.addEventListener(`click`,async()=>{let e=prompt(`패키지 명칭:`);if(!e)return;let t=prompt(`가격:`,`1,500,000원`)||`1,500,000원`,n=prompt(`구성 내용:`,`4K 촬영, 메인 쇼호스트`)||``;o.push({name:e,price:t,features:n}),await r(`packages`,o),J(`패키지가 Supabase DB에 동기화되었습니다.`),f()}),e.querySelectorAll(`.btn-del-pkg`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=parseInt(e.target.dataset.idx);o.splice(t,1),await r(`packages`,o),f()})}),e.querySelector(`#btn-add-story`)?.addEventListener(`click`,async()=>{let e=prompt(`브랜드명:`);if(!e)return;let t=prompt(`후기/스토리 한줄 문구:`)||``;c.push({brand:e,quote:t,author:`브랜드 담당자`}),await r(`stories`,c),J(`브랜드 스토리가 Supabase DB에 동기화되었습니다.`),f()}),e.querySelectorAll(`.btn-del-story`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=parseInt(e.target.dataset.idx);c.splice(t,1),await r(`stories`,c),f()})}),e.querySelector(`#btn-add-logo`)?.addEventListener(`click`,async()=>{let e=prompt(`파트너 브랜드명:`);if(!e)return;let t=prompt(`로고 이미지 경로:`,`./assets/logo.png`)||`./assets/logo.png`;l.push({name:e,logo:t}),await r(`logos`,l),J(`파트너 로고가 Supabase DB에 동기화되었습니다.`),f()}),e.querySelectorAll(`.btn-del-logo`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=parseInt(e.target.dataset.idx);l.splice(t,1),await r(`logos`,l),f()})})}return f(),e}var Ya=()=>JSON.parse(localStorage.getItem(`ryzin_demo_list`)||`[]`),Xa=e=>localStorage.setItem(`ryzin_demo_list`,JSON.stringify(e));function Za(e){e.innerHTML=`
    <div style="padding: 28px; max-width: 1300px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <!-- 헤더 -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0;">데모 시연 관리</h1>
        <p style="font-size: 13px; color: #64748b; margin: 0;">권한이 없는 타사 웹사이트 주소를 등록하여, 상단바 없이 100% 깔끔한 라이브 위젯 데모 링크를 생성하고 공유합니다.</p>
      </div>

      <!-- 신규 데모 생성 카드 -->
      <div style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 24px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0;">신규 데모 시연 생성</h3>
        <div style="display: grid; grid-template-columns: 1fr 2.5fr 1.2fr auto; gap: 12px; align-items: flex-end;">
          <div>
            <label style="display: block; font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 6px; letter-spacing: 0.05em;">데모명 (구분용)</label>
            <input type="text" id="demo-name-input" placeholder="예: 올리브영 메인 시연" style="width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; box-sizing: border-box;">
          </div>
          <div>
            <label style="display: block; font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 6px; letter-spacing: 0.05em;">타겟 웹사이트 URL</label>
            <input type="text" id="demo-url-input" placeholder="예: https://oliveyoung.co.kr" style="width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; box-sizing: border-box;">
          </div>
          <div>
            <label style="display: block; font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 6px; letter-spacing: 0.05em;">연동 라이브</label>
            <select id="demo-live-select" style="width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; background: #fff; box-sizing: border-box; height: 38px;">
              <option value="PAZIW92">PAZIW92 (쏘랩)</option>
              <option value="HRNCB9K">HRNCB9K (기억의문화)</option>
              <option value="live02">live02 (하나스톤)</option>
            </select>
          </div>
          <div>
            <button id="btn-create-demo" style="background: #2563eb; color: #fff; border: none; padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; height: 38px;">
              링크 생성 및 등록
            </button>
          </div>
        </div>
      </div>

      <!-- 데모 목록 -->
      <div style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); margin-bottom: 28px;">
        <div style="padding: 16px 24px; border-bottom: 1.5px solid #e2e8f0; background: #f8fafc; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0;">등록된 데모 시연 목록</h3>
          <span id="demo-count-badge" style="font-size: 12px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 4px 10px; border-radius: 20px; border: 1px solid #bfdbfe;">0개</span>
        </div>
        <div id="demo-list-table-container"></div>
      </div>

      <!-- 데모 시연 상담문의 접수 현황 -->
      <div style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="padding: 16px 24px; border-bottom: 1.5px solid #e2e8f0; background: #f8fafc; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0;">데모 시연 상담문의 접수 현황</h3>
          <button id="btn-refresh-demo-leads" style="background: #fff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 6px 14px; font-size: 12px; font-weight: 700; cursor: pointer; color: #475569; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fff'">새로고침</button>
        </div>
        <div id="demo-leads-table-container">
          <div style="padding: 40px; text-align: center; color: #94a3b8; font-size: 14px;">데이터를 불러오는 중입니다...</div>
        </div>
      </div>
    </div>
  `,(async()=>{let t=e.querySelector(`#demo-live-select`),n=window.supabaseClient;if(!(!t||!n))try{let{data:e,error:r}=await n.from(`live_control`).select(`live_id, title`);!r&&e&&e.length>0&&(t.innerHTML=e.map(e=>`
          <option value="${e.live_id}">${e.live_id} (${e.title||`라이브`})</option>
        `).join(``))}catch{}})();let t=()=>{let n=e.querySelector(`#demo-list-table-container`),r=e.querySelector(`#demo-count-badge`),i=Ya();if(r&&(r.textContent=`${i.length}개`),i.length===0){n.innerHTML=`
        <div style="padding: 40px; text-align: center; color: #94a3b8; font-size: 14px;">
          등록된 데모 시연이 없습니다. 위에서 새로운 데모를 생성해보세요.
        </div>
      `;return}n.innerHTML=`
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; table-layout: fixed;">
          <colgroup>
            <col style="width: 130px;">
            <col style="width: 220px;">
            <col style="width: 110px;">
            <col style="min-width: 200px;">
            <col style="width: 230px;">
          </colgroup>
          <thead>
            <tr style="border-bottom: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
              <th style="padding: 12px 16px;">데모명</th>
              <th style="padding: 12px 16px;">타겟 URL</th>
              <th style="padding: 12px 16px;">연동 라이브</th>
              <th style="padding: 12px 16px;">시연 링크</th>
              <th style="padding: 12px 16px; text-align: right;">작업</th>
            </tr>
          </thead>
          <tbody>
            ${i.map((e,t)=>{let n=e.url;!n.startsWith(`http://`)&&!n.startsWith(`https://`)&&(n=`https://`+n);let r=`${window.location.origin}/demo.html?url=${encodeURIComponent(n)}&live_id=${e.liveId}&clean=true`,i=e.url;try{i=new URL(n).hostname}catch{}return`
                <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
                  <td style="padding: 14px 16px; font-weight: 700; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${e.name}</td>
                  <td style="padding: 14px 16px; overflow: hidden;">
                    <a href="${n}" target="_blank" style="color:#2563eb; text-decoration:none; font-size:12px; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${n}">${i}</a>
                  </td>
                  <td style="padding: 14px 16px;">
                    <span style="background: #eff6ff; color: #1d4ed8; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 5px; border: 1px solid #bfdbfe; white-space: nowrap;">${e.liveId}</span>
                  </td>
                  <td style="padding: 14px 16px; overflow: hidden;">
                    <input type="text" readonly value="${r}" onclick="this.select()" style="width: 100%; padding: 5px 8px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 10px; background: #f8fafc; font-family: monospace; box-sizing: border-box; color: #475569; cursor: pointer;">
                  </td>
                  <td style="padding: 14px 16px; text-align: right; white-space: nowrap;">
                    <button class="btn-copy-clean-link" data-url="${r}" style="background: #2563eb; color: #fff; border: none; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; margin-right: 4px;">
                      링크 복사
                    </button>
                    <button class="btn-preview-demo" data-url="${r}" style="background: #f1f5f9; color: #334155; border: 1px solid #e2e8f0; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; margin-right: 4px;">
                      미리보기
                    </button>
                    <button class="btn-delete-demo" data-index="${t}" style="background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer;">
                      삭제
                    </button>
                  </td>
                </tr>
              `}).join(``)}
          </tbody>
        </table>
      </div>
    `,n.querySelectorAll(`.btn-copy-clean-link`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.url;navigator.clipboard.writeText(t).then(()=>{let t=e.currentTarget.textContent;e.currentTarget.textContent=`복사 완료!`,e.currentTarget.style.background=`#16a34a`,setTimeout(()=>{e.currentTarget.textContent=t,e.currentTarget.style.background=`#2563eb`},2e3)})})}),n.querySelectorAll(`.btn-preview-demo`).forEach(e=>{e.addEventListener(`click`,e=>{window.open(e.currentTarget.dataset.url,`_blank`)})}),n.querySelectorAll(`.btn-delete-demo`).forEach(e=>{e.addEventListener(`click`,e=>{if(!confirm(`이 데모 시연을 삭제하시겠습니까?`))return;let n=parseInt(e.currentTarget.dataset.index),r=Ya();r.splice(n,1),Xa(r),t()})})},n=e.querySelector(`#btn-create-demo`);n&&n.addEventListener(`click`,()=>{let n=e.querySelector(`#demo-name-input`).value.trim(),r=e.querySelector(`#demo-url-input`).value.trim(),i=e.querySelector(`#demo-live-select`).value;if(!n||!r){alert(`데모명과 타겟 사이트 URL을 모두 입력해주세요.`);return}let a=Ya();a.unshift({name:n,url:r,liveId:i,createdAt:new Date().toISOString()}),Xa(a),e.querySelector(`#demo-name-input`).value=``,e.querySelector(`#demo-url-input`).value=``,t()});let r=async()=>{let t=e.querySelector(`#demo-leads-table-container`);if(!t)return;let n=window.supabaseClient;if(!n){t.innerHTML=`
        <div style="padding: 40px; text-align: center; color: #ef4444; font-size: 14px; font-weight: 600;">
          Supabase 클라이언트가 초기화되지 않았습니다.
        </div>
      `;return}try{let{data:e,error:r}=await n.from(`live_leads`).select(`id, live_id, name, phone, created_at`).order(`created_at`,{ascending:!1});if(r)throw r;let{data:i,error:a}=await n.from(`live_control`).select(`live_id, brand_name, title`),o={};!a&&i&&i.forEach(e=>{o[e.live_id]={brand:e.brand_name||`미지정`,title:e.title||``}});let s=e.filter(e=>e.name&&e.name.includes(`[도입문의]`));if(!s||s.length===0){t.innerHTML=`
          <div style="padding: 40px; text-align: center; color: #94a3b8; font-size: 14px;">
            아직 접수된 영업용 상담문의가 없습니다.
          </div>
        `;return}t.innerHTML=`
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; min-width: 800px;">
            <thead>
              <tr style="border-bottom: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
                <th style="padding: 12px 20px;">신청 일시</th>
                <th style="padding: 12px 20px;">작성한 브랜드명</th>
                <th style="padding: 12px 20px;">연동 라이브 ID (기본 브랜드)</th>
                <th style="padding: 12px 20px;">신청자 성함</th>
                <th style="padding: 12px 20px;">연락처</th>
              </tr>
            </thead>
            <tbody>
              ${s.map(e=>{let t=new Date(e.created_at).toLocaleString(`ko-KR`,{hour12:!1}),n=(e.name||``).replace(`[도입문의]`,``).trim(),r=``,i=n.match(/^(.+?)\s*\((.+?)\)$/);i&&(n=i[1].trim(),r=i[2].trim());let a=o[e.live_id]||{brand:`미지정`,title:``};return r||=a.brand,`
                  <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
                    <td style="padding: 14px 20px; color: #64748b; font-size: 12px; white-space: nowrap;">${t}</td>
                    <td style="padding: 14px 20px; font-weight: 700; color: #2563eb;">${r}</td>
                    <td style="padding: 14px 20px; color: #475569; font-size: 12px;">
                      <span style="background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px; border: 1px solid #cbd5e1; font-weight: 600;">${e.live_id}</span>
                      <span style="color:#94a3b8; font-size:11px; margin-left:4px;">${a.brand} - ${a.title}</span>
                    </td>
                    <td style="padding: 14px 20px; font-weight: 700; color: #0f172a;">${n}</td>
                    <td style="padding: 14px 20px; font-weight: 700; color: #2563eb; font-family: monospace;">${e.phone}</td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      `}catch(e){console.error(`Leads 로드 오류:`,e),t.innerHTML=`
        <div style="padding: 40px; text-align: center; color: #ef4444; font-size: 13px;">
          데이터 로드 중 오류가 발생했습니다. (오류 내용: ${e.message})
        </div>
      `}},i=e.querySelector(`#btn-refresh-demo-leads`);i&&i.addEventListener(`click`,()=>{r()}),t(),r()}x(),j();async function Qa(){let e=document.getElementById(`app`);e.innerHTML=`
    <div style="display:flex; align-items:center; justify-content:center; height:100vh;">
      <div style="width:48px; height:48px; border:4px solid rgba(0,0,0,0.05); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
      <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    </div>
  `;try{let e=new Promise(e=>setTimeout(()=>e(!0),3e3));await Promise.race([W.init(),e])}catch(e){console.warn(`데이터 로딩 타임아웃/오류 발생, 로컬 데이터로 접속합니다.`,e)}let t=()=>{if(e.querySelector(`.sidebar`))return;e.innerHTML=``,e.className=`app-layout`,e.appendChild(Ze());let t=document.createElement(`div`);t.className=`mobile-overlay`,t.onclick=()=>document.querySelector(`.sidebar`).classList.remove(`open`),e.appendChild(t);let n=document.createElement(`button`);n.className=`mobile-menu-btn`,n.innerHTML=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,n.onclick=()=>document.querySelector(`.sidebar`).classList.toggle(`open`),e.appendChild(n);let r=document.createElement(`main`);r.className=`main-content`,r.id=`page-content`,e.appendChild(r),M.setContainer(r)};M.beforeEach(n=>{let r=n.startsWith(`/shared_scheme/`),i=!!W.getCurrentUser();if(!r&&!i&&n!==`/login`)return`/login`;if(i&&n===`/login`)return`/`;if(i&&n===`/live_stream`){let e=W.getCurrentUser();if(W.isDemoMode||e&&(e.id===`demo`||e.role===`demo`))return`/`}if(i){W.getCurrentUser();let e=W.getCurrentRole();if(e&&e.startsWith(`live_stream:`)&&n!==`/live_stream`&&n!==`/login`)return`/live_stream`;if(e&&e.startsWith(`brand:`)&&n!==`/projects`&&!n.startsWith(`/projects/`)&&n!==`/settings`&&n!==`/login`)return`/projects`}return n===`/login`||n.startsWith(`/shared_scheme/`)?(e.innerHTML=``,e.className=``,M.setContainer(e)):t(),!0}),M.register(`/login`,()=>aa()),M.register(`/`,()=>pt()),M.register(`/live_stream`,()=>fn()),M.register(`/projects`,()=>wn()),M.register(`/projects/new`,()=>wn()),M.register(`/projects/:id`,e=>En(e)),M.register(`/shared_scheme/:id`,e=>kn(e)),M.register(`/hosts`,()=>hn()),M.register(`/hosts/:id`,e=>_n(e)),M.register(`/brands`,()=>bn()),M.register(`/brands/:id`,e=>Sn(e)),M.register(`/finance`,()=>zn()),M.register(`/settlement`,()=>Hn()),M.register(`/contracts`,()=>Gn()),M.register(`/marketing`,()=>Yn()),M.register(`/crm`,()=>Xn()),M.register(`/shop_manage`,()=>ka()),M.register(`/class_applications`,()=>Ba()),M.register(`/news_manage`,()=>Wa()),M.register(`/homepage_manage`,()=>Ja()),M.register(`/demo_manage`,()=>Za(document.getElementById(`page-content`))),M.register(`/settings`,()=>Zn()),M.start(),document.addEventListener(`click`,e=>{let t=e.target.closest(`a[href]`);t&&t.getAttribute(`href`).startsWith(`/`)&&!t.getAttribute(`target`)&&(e.preventDefault(),M.navigate(t.getAttribute(`href`)))})}Qa();