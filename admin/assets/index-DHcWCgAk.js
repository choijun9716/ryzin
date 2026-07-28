var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),l=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error('Calling `require` for "'+e+"\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.")});(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=()=>{window.va||(window.va=function(...e){window.vaq||(window.vaq=[]),window.vaq.push(e)})},d=`@vercel/analytics`,f=`2.0.1`;function p(){return typeof window<`u`}function m(){return`production`}function h(e=`auto`){if(e===`auto`){window.vam=m();return}window.vam=e}function g(){return(p()?window.vam:m())||`production`}function _(){return g()===`development`}function v(e){return e.scriptSrc?b(e.scriptSrc):_()?`https://va.vercel-scripts.com/v1/script.debug.js`:e.basePath?b(`${e.basePath}/insights/script.js`):`/_vercel/insights/script.js`}function y(e,t){let n=e;if(t)try{n={...JSON.parse(t)?.analytics,...e}}catch{}h(n.mode);let r={sdkn:d+(n.framework?`/${n.framework}`:``),sdkv:f};return n.disableAutoTrack&&(r.disableAutoTrack=`1`),n.viewEndpoint&&(r.viewEndpoint=b(n.viewEndpoint)),n.eventEndpoint&&(r.eventEndpoint=b(n.eventEndpoint)),n.sessionEndpoint&&(r.sessionEndpoint=b(n.sessionEndpoint)),_()&&n.debug===!1&&(r.debug=`false`),n.dsn&&(r.dsn=n.dsn),n.endpoint?r.endpoint=n.endpoint:n.basePath&&(r.endpoint=b(`${n.basePath}/insights`)),{beforeSend:n.beforeSend,src:v(n),dataset:r}}function b(e){return e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`/`)?e:`/${e}`}function x(e={debug:!0},t){var n;if(!p())return;let{beforeSend:r,src:i,dataset:a}=y(e,t);if(u(),r&&((n=window.va)==null||n.call(window,`beforeSend`,r)),document.head.querySelector(`script[src*="${i}"]`))return;let o=document.createElement(`script`);o.src=i;for(let[e,t]of Object.entries(a))o.dataset[e]=t;o.defer=!0,o.onerror=()=>{let e=_()?`Please check if any ad blockers are enabled and try again.`:`Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.`;console.log(`[Vercel Web Analytics] Failed to load script from ${i}. ${e}`)},document.head.appendChild(o)}var S=()=>{window.si||(window.si=function(...e){window.siq=window.siq||[],window.siq.push(e)})},C=`@vercel/speed-insights`,w=`2.0.0`;function T(){return typeof window<`u`}function E(){return`production`}function D(){return E()===`development`}function O(e){return e.scriptSrc?A(e.scriptSrc):D()?`https://va.vercel-scripts.com/v1/speed-insights/script.debug.js`:e.dsn?`https://va.vercel-scripts.com/v1/speed-insights/script.js`:e.basePath?A(`${e.basePath}/speed-insights/script.js`):`/_vercel/speed-insights/script.js`}function k(e,t){let n=e;if(t)try{n={...JSON.parse(t)?.speedInsights,...e}}catch{}let r={sdkn:C+(n.framework?`/${n.framework}`:``),sdkv:w};return n.sampleRate&&(r.sampleRate=n.sampleRate.toString()),n.route&&(r.route=n.route),D()&&n.debug===!1&&(r.debug=`false`),n.dsn&&(r.dsn=n.dsn),n.endpoint?r.endpoint=A(n.endpoint):n.basePath&&(r.endpoint=A(`${n.basePath}/speed-insights/vitals`)),{src:O(n),beforeSend:n.beforeSend,dataset:r}}function A(e){return e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`/`)?e:`/${e}`}function j(e={},t){var n;if(!T()||e.route===null)return null;S();let{beforeSend:r,src:i,dataset:a}=k(e,t);if(document.head.querySelector(`script[src*="${i}"]`))return null;r&&((n=window.si)==null||n.call(window,`beforeSend`,r));let o=document.createElement(`script`);o.src=i,o.defer=!0;for(let[e,t]of Object.entries(a))o.dataset[e]=t;return o.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(o),{setRoute:e=>{o.dataset.route=e??void 0}}}var M=new class{constructor(){this._routes={},this._currentRoute=null,this._container=null,this._beforeHooks=[],window.addEventListener(`popstate`,()=>this._handleRoute()),window.addEventListener(`hashchange`,()=>this._handleRoute())}register(e,t){return this._routes[e]=t,this}beforeEach(e){return this._beforeHooks.push(e),this}setContainer(e){return this._container=e,this}navigate(e,t=!1){if(e===this._currentRoute)return;let n=`#`+e;t?window.location.replace(n):window.location.hash=n,this._handleRoute()}getCurrentPath(){let e=window.location.hash.slice(1)||`/`;return e.startsWith(`/`)||(e=`/`+e),e}_handleRoute(){let e=this.getCurrentPath();this._currentRoute=e;let t=null,n={};for(let[r,i]of Object.entries(this._routes)){let a=this._matchRoute(r,e);if(a){t=i,n=a.params;break}}for(let t of this._beforeHooks){let n=t(e);if(n===!1)return;if(typeof n==`string`){this.navigate(n,!0);return}}if(!t){this.navigate(`/`,!0);return}if(this._updateSidebarActive(e),this._container){this._container.innerHTML=``;let e=t(n);typeof e==`string`?this._container.innerHTML=e:e instanceof HTMLElement&&this._container.appendChild(e)}}_matchRoute(e,t){let n=e.split(`/`).filter(Boolean),r=t.split(`/`).filter(Boolean);if(n.length!==r.length)return null;let i={};for(let e=0;e<n.length;e++)if(n[e].startsWith(`:`))i[n[e].substring(1)]=decodeURIComponent(r[e]);else if(n[e]!==r[e])return null;return{params:i}}_updateSidebarActive(e){document.querySelectorAll(`.sidebar-item`).forEach(t=>{t.classList.remove(`active`);let n=t.getAttribute(`data-href`);(n===`/`&&e===`/`||n!==`/`&&e.startsWith(n))&&t.classList.add(`active`)})}start(){this._handleRoute()}},N=[{key:`scheduled`,label:`일정부킹`,color:`indigo`},{key:`host_cast`,label:`쇼호스트 선정`,color:`rose`},{key:`tech_request`,label:`기술서요청`,color:`purple`},{key:`design`,label:`디자인진행`,color:`orange`},{key:`cue_sheet`,label:`큐시트작성`,color:`yellow`},{key:`done`,label:`방송종료`,color:`gray`}],P=[{key:`wait`,label:`대기`,color:`orange`},{key:`done`,label:`완료`,color:`green`}],ee=[`네이버`,`카카오`,`쿠팡`,`그립`,`자사몰`,`유튜브`,`틱톡`],te=[{key:`new`,label:`신규문의`,color:`blue`},{key:`quote`,label:`견적발송`,color:`orange`},{key:`meeting`,label:`미팅진행`,color:`purple`},{key:`contract`,label:`계약완료`,color:`green`},{key:`hold`,label:`보류/취소`,color:`gray`}],F=[{key:`S`,label:`S급 (VIP)`},{key:`A`,label:`A급 (주요)`},{key:`B`,label:`B급 (일반)`},{key:`C`,label:`C급 (잠재)`}],I=[{key:`kakao`,label:`카카오톡`,icon:``},{key:`phone`,label:`전화`,icon:``},{key:`sms`,label:`문자`,icon:``},{key:`email`,label:`이메일`,icon:``},{key:`meeting`,label:`미팅`,icon:``}],ne=[`뷰티`,`패션`,`식품`,`가전`,`생활`,`건강`,`유아`,`반려동물`,`기타`],re=[{key:`main`,label:`메인 쇼호스트`},{key:`sub`,label:`서브 쇼호스트`},{key:`guest`,label:`게스트`}],ie=[{key:`requested`,label:`요청`},{key:`working`,label:`작업중`},{key:`reviewing`,label:`검수중`},{key:`done`,label:`완료`}],ae={admin:{label:`대표`,permissions:[`*`]},pd:{label:`PD`,permissions:[`dashboard`,`projects`,`products`,`hosts`,`brands`,`marketing`]},designer:{label:`디자이너`,permissions:[`dashboard`,`projects.design`]},accountant:{label:`회계`,permissions:[`dashboard`,`finance`,`settlement`,`projects.finance`]},demo:{label:`데모 계정`,permissions:[`*`]}},oe=[`국민은행`,`신한은행`,`우리은행`,`하나은행`,`IBK기업은행`,`NH농협은행`,`카카오뱅크`,`토스뱅크`,`SC제일은행`,`대구은행`,`부산은행`,`광주은행`,`전북은행`,`경남은행`,`제주은행`,`수협은행`,`새마을금고`,`신협`,`우체국`];function L(e=``){let t=Date.now().toString(36),n=Math.random().toString(36).substr(2,5);return e?`${e}_${t}${n}`:`${t}${n}`}function R(e){let t=N.find(t=>t.key===e);return t?t.label:e}function z(e){let t=P.find(t=>t.key===e);return t?t.label:e}function se(e){let t=N.find(t=>t.label===e);return t?t.key:`done`}function ce(e){let t=P.find(t=>t.label===e);return t?t.key:`wait`}var le=o(((e,t)=>{t.exports={}})),B=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r():typeof define==`function`&&define.amd?define([],r):n.CryptoJS=r()})(e,function(){var e=e||function(e,t){var n;if(typeof window<`u`&&window.crypto&&(n=window.crypto),typeof self<`u`&&self.crypto&&(n=self.crypto),typeof globalThis<`u`&&globalThis.crypto&&(n=globalThis.crypto),!n&&typeof window<`u`&&window.msCrypto&&(n=window.msCrypto),!n&&typeof global<`u`&&global.crypto&&(n=global.crypto),!n&&typeof l==`function`)try{n=le()}catch{}var r=function(){if(n){if(typeof n.getRandomValues==`function`)try{return n.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof n.randomBytes==`function`)try{return n.randomBytes(4).readInt32LE()}catch{}}throw Error(`Native crypto module could not be used to get secure random number.`)},i=Object.create||function(){function e(){}return function(t){var n;return e.prototype=t,n=new e,e.prototype=null,n}}(),a={},o=a.lib={},s=o.Base=function(){return{extend:function(e){var t=i(this);return e&&t.mixIn(e),(!t.hasOwnProperty(`init`)||this.init===t.init)&&(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty(`toString`)&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),c=o.WordArray=s.extend({init:function(e,n){e=this.words=e||[],n==t?this.sigBytes=e.length*4:this.sigBytes=n},toString:function(e){return(e||d).stringify(this)},concat:function(e){var t=this.words,n=e.words,r=this.sigBytes,i=e.sigBytes;if(this.clamp(),r%4)for(var a=0;a<i;a++){var o=n[a>>>2]>>>24-a%4*8&255;t[r+a>>>2]|=o<<24-(r+a)%4*8}else for(var s=0;s<i;s+=4)t[r+s>>>2]=n[s>>>2];return this.sigBytes+=i,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-n%4*8,t.length=e.ceil(n/4)},clone:function(){var e=s.clone.call(this);return e.words=this.words.slice(0),e},random:function(e){for(var t=[],n=0;n<e;n+=4)t.push(r());return new c.init(t,e)}}),u=a.enc={},d=u.Hex={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i++){var a=t[i>>>2]>>>24-i%4*8&255;r.push((a>>>4).toString(16)),r.push((a&15).toString(16))}return r.join(``)},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r+=2)n[r>>>3]|=parseInt(e.substr(r,2),16)<<24-r%8*4;return new c.init(n,t/2)}},f=u.Latin1={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i++){var a=t[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(a))}return r.join(``)},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r++)n[r>>>2]|=(e.charCodeAt(r)&255)<<24-r%4*8;return new c.init(n,t)}},p=u.Utf8={stringify:function(e){try{return decodeURIComponent(escape(f.stringify(e)))}catch{throw Error(`Malformed UTF-8 data`)}},parse:function(e){return f.parse(unescape(encodeURIComponent(e)))}},m=o.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new c.init,this._nDataBytes=0},_append:function(e){typeof e==`string`&&(e=p.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var n,r=this._data,i=r.words,a=r.sigBytes,o=this.blockSize,s=a/(o*4);s=t?e.ceil(s):e.max((s|0)-this._minBufferSize,0);var l=s*o,u=e.min(l*4,a);if(l){for(var d=0;d<l;d+=o)this._doProcessBlock(i,d);n=i.splice(0,l),r.sigBytes-=u}return new c.init(n,u)},clone:function(){var e=s.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});o.Hasher=m.extend({cfg:s.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){m.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:512/32,_createHelper:function(e){return function(t,n){return new e.init(n).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return new h.HMAC.init(e,n).finalize(t)}}});var h=a.algo={};return a}(Math);return e})})),ue=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.Base,a=r.WordArray,o=n.x64={};o.Word=i.extend({init:function(e,t){this.high=e,this.low=t}}),o.WordArray=i.extend({init:function(e,n){e=this.words=e||[],n==t?this.sigBytes=e.length*8:this.sigBytes=n},toX32:function(){for(var e=this.words,t=e.length,n=[],r=0;r<t;r++){var i=e[r];n.push(i.high),n.push(i.low)}return a.create(n,this.sigBytes)},clone:function(){for(var e=i.clone.call(this),t=e.words=this.words.slice(0),n=t.length,r=0;r<n;r++)t[r]=t[r].clone();return e}})})(),e})})),de=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){if(typeof ArrayBuffer==`function`){var t=e.lib.WordArray,n=t.init,r=t.init=function(e){if(e instanceof ArrayBuffer&&(e=new Uint8Array(e)),(e instanceof Int8Array||typeof Uint8ClampedArray<`u`&&e instanceof Uint8ClampedArray||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array)&&(e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),e instanceof Uint8Array){for(var t=e.byteLength,r=[],i=0;i<t;i++)r[i>>>2]|=e[i]<<24-i%4*8;n.call(this,r,t)}else n.apply(this,arguments)};r.prototype=t}})(),e.lib.WordArray})})),fe=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.enc;r.Utf16=r.Utf16BE={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i+=2){var a=t[i>>>2]>>>16-i%4*8&65535;r.push(String.fromCharCode(a))}return r.join(``)},parse:function(e){for(var t=e.length,r=[],i=0;i<t;i++)r[i>>>1]|=e.charCodeAt(i)<<16-i%2*16;return n.create(r,t*2)}},r.Utf16LE={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],a=0;a<n;a+=2){var o=i(t[a>>>2]>>>16-a%4*8&65535);r.push(String.fromCharCode(o))}return r.join(``)},parse:function(e){for(var t=e.length,r=[],a=0;a<t;a++)r[a>>>1]|=i(e.charCodeAt(a)<<16-a%2*16);return n.create(r,t*2)}};function i(e){return e<<8&4278255360|e>>>8&16711935}})(),e.enc.Utf16})})),pe=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.enc;r.Base64={stringify:function(e){var t=e.words,n=e.sigBytes,r=this._map;e.clamp();for(var i=[],a=0;a<n;a+=3)for(var o=t[a>>>2]>>>24-a%4*8&255,s=t[a+1>>>2]>>>24-(a+1)%4*8&255,c=t[a+2>>>2]>>>24-(a+2)%4*8&255,l=o<<16|s<<8|c,u=0;u<4&&a+u*.75<n;u++)i.push(r.charAt(l>>>6*(3-u)&63));var d=r.charAt(64);if(d)for(;i.length%4;)i.push(d);return i.join(``)},parse:function(e){var t=e.length,n=this._map,r=this._reverseMap;if(!r){r=this._reverseMap=[];for(var a=0;a<n.length;a++)r[n.charCodeAt(a)]=a}var o=n.charAt(64);if(o){var s=e.indexOf(o);s!==-1&&(t=s)}return i(e,t,r)},_map:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`};function i(e,t,r){for(var i=[],a=0,o=0;o<t;o++)if(o%4){var s=r[e.charCodeAt(o-1)]<<o%4*2|r[e.charCodeAt(o)]>>>6-o%4*2;i[a>>>2]|=s<<24-a%4*8,a++}return n.create(i,a)}})(),e.enc.Base64})})),me=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.enc;r.Base64url={stringify:function(e,t){t===void 0&&(t=!0);var n=e.words,r=e.sigBytes,i=t?this._safe_map:this._map;e.clamp();for(var a=[],o=0;o<r;o+=3)for(var s=n[o>>>2]>>>24-o%4*8&255,c=n[o+1>>>2]>>>24-(o+1)%4*8&255,l=n[o+2>>>2]>>>24-(o+2)%4*8&255,u=s<<16|c<<8|l,d=0;d<4&&o+d*.75<r;d++)a.push(i.charAt(u>>>6*(3-d)&63));var f=i.charAt(64);if(f)for(;a.length%4;)a.push(f);return a.join(``)},parse:function(e,t){t===void 0&&(t=!0);var n=e.length,r=t?this._safe_map:this._map,a=this._reverseMap;if(!a){a=this._reverseMap=[];for(var o=0;o<r.length;o++)a[r.charCodeAt(o)]=o}var s=r.charAt(64);if(s){var c=e.indexOf(s);c!==-1&&(n=c)}return i(e,n,a)},_map:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,_safe_map:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`};function i(e,t,r){for(var i=[],a=0,o=0;o<t;o++)if(o%4){var s=r[e.charCodeAt(o-1)]<<o%4*2|r[e.charCodeAt(o)]>>>6-o%4*2;i[a>>>2]|=s<<24-a%4*8,a++}return n.create(i,a)}})(),e.enc.Base64url})})),he=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.algo,s=[];(function(){for(var e=0;e<64;e++)s[e]=t.abs(t.sin(e+1))*4294967296|0})();var c=o.MD5=a.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var n=0;n<16;n++){var r=t+n,i=e[r];e[r]=(i<<8|i>>>24)&16711935|(i<<24|i>>>8)&4278255360}var a=this._hash.words,o=e[t+0],c=e[t+1],p=e[t+2],m=e[t+3],h=e[t+4],g=e[t+5],_=e[t+6],v=e[t+7],y=e[t+8],b=e[t+9],x=e[t+10],S=e[t+11],C=e[t+12],w=e[t+13],T=e[t+14],E=e[t+15],D=a[0],O=a[1],k=a[2],A=a[3];D=l(D,O,k,A,o,7,s[0]),A=l(A,D,O,k,c,12,s[1]),k=l(k,A,D,O,p,17,s[2]),O=l(O,k,A,D,m,22,s[3]),D=l(D,O,k,A,h,7,s[4]),A=l(A,D,O,k,g,12,s[5]),k=l(k,A,D,O,_,17,s[6]),O=l(O,k,A,D,v,22,s[7]),D=l(D,O,k,A,y,7,s[8]),A=l(A,D,O,k,b,12,s[9]),k=l(k,A,D,O,x,17,s[10]),O=l(O,k,A,D,S,22,s[11]),D=l(D,O,k,A,C,7,s[12]),A=l(A,D,O,k,w,12,s[13]),k=l(k,A,D,O,T,17,s[14]),O=l(O,k,A,D,E,22,s[15]),D=u(D,O,k,A,c,5,s[16]),A=u(A,D,O,k,_,9,s[17]),k=u(k,A,D,O,S,14,s[18]),O=u(O,k,A,D,o,20,s[19]),D=u(D,O,k,A,g,5,s[20]),A=u(A,D,O,k,x,9,s[21]),k=u(k,A,D,O,E,14,s[22]),O=u(O,k,A,D,h,20,s[23]),D=u(D,O,k,A,b,5,s[24]),A=u(A,D,O,k,T,9,s[25]),k=u(k,A,D,O,m,14,s[26]),O=u(O,k,A,D,y,20,s[27]),D=u(D,O,k,A,w,5,s[28]),A=u(A,D,O,k,p,9,s[29]),k=u(k,A,D,O,v,14,s[30]),O=u(O,k,A,D,C,20,s[31]),D=d(D,O,k,A,g,4,s[32]),A=d(A,D,O,k,y,11,s[33]),k=d(k,A,D,O,S,16,s[34]),O=d(O,k,A,D,T,23,s[35]),D=d(D,O,k,A,c,4,s[36]),A=d(A,D,O,k,h,11,s[37]),k=d(k,A,D,O,v,16,s[38]),O=d(O,k,A,D,x,23,s[39]),D=d(D,O,k,A,w,4,s[40]),A=d(A,D,O,k,o,11,s[41]),k=d(k,A,D,O,m,16,s[42]),O=d(O,k,A,D,_,23,s[43]),D=d(D,O,k,A,b,4,s[44]),A=d(A,D,O,k,C,11,s[45]),k=d(k,A,D,O,E,16,s[46]),O=d(O,k,A,D,p,23,s[47]),D=f(D,O,k,A,o,6,s[48]),A=f(A,D,O,k,v,10,s[49]),k=f(k,A,D,O,T,15,s[50]),O=f(O,k,A,D,g,21,s[51]),D=f(D,O,k,A,C,6,s[52]),A=f(A,D,O,k,m,10,s[53]),k=f(k,A,D,O,x,15,s[54]),O=f(O,k,A,D,c,21,s[55]),D=f(D,O,k,A,y,6,s[56]),A=f(A,D,O,k,E,10,s[57]),k=f(k,A,D,O,_,15,s[58]),O=f(O,k,A,D,w,21,s[59]),D=f(D,O,k,A,h,6,s[60]),A=f(A,D,O,k,S,10,s[61]),k=f(k,A,D,O,p,15,s[62]),O=f(O,k,A,D,b,21,s[63]),a[0]=a[0]+D|0,a[1]=a[1]+O|0,a[2]=a[2]+k|0,a[3]=a[3]+A|0},_doFinalize:function(){var e=this._data,n=e.words,r=this._nDataBytes*8,i=e.sigBytes*8;n[i>>>5]|=128<<24-i%32;var a=t.floor(r/4294967296),o=r;n[(i+64>>>9<<4)+15]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360,n[(i+64>>>9<<4)+14]=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,e.sigBytes=(n.length+1)*4,this._process();for(var s=this._hash,c=s.words,l=0;l<4;l++){var u=c[l];c[l]=(u<<8|u>>>24)&16711935|(u<<24|u>>>8)&4278255360}return s},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});function l(e,t,n,r,i,a,o){var s=e+(t&n|~t&r)+i+o;return(s<<a|s>>>32-a)+t}function u(e,t,n,r,i,a,o){var s=e+(t&r|n&~r)+i+o;return(s<<a|s>>>32-a)+t}function d(e,t,n,r,i,a,o){var s=e+(t^n^r)+i+o;return(s<<a|s>>>32-a)+t}function f(e,t,n,r,i,a,o){var s=e+(n^(t|~r))+i+o;return(s<<a|s>>>32-a)+t}n.MD5=a._createHelper(c),n.HmacMD5=a._createHmacHelper(c)})(Math),e.MD5})})),ge=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.WordArray,i=n.Hasher,a=t.algo,o=[],s=a.SHA1=i.extend({_doReset:function(){this._hash=new r.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],a=n[2],s=n[3],c=n[4],l=0;l<80;l++){if(l<16)o[l]=e[t+l]|0;else{var u=o[l-3]^o[l-8]^o[l-14]^o[l-16];o[l]=u<<1|u>>>31}var d=(r<<5|r>>>27)+c+o[l];l<20?d+=(i&a|~i&s)+1518500249:l<40?d+=(i^a^s)+1859775393:l<60?d+=(i&a|i&s|a&s)-1894007588:d+=(i^a^s)-899497514,c=s,s=a,a=i<<30|i>>>2,i=r,r=d}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+a|0,n[3]=n[3]+s|0,n[4]=n[4]+c|0},_doFinalize:function(){var e=this._data,t=e.words,n=this._nDataBytes*8,r=e.sigBytes*8;return t[r>>>5]|=128<<24-r%32,t[(r+64>>>9<<4)+14]=Math.floor(n/4294967296),t[(r+64>>>9<<4)+15]=n,e.sigBytes=t.length*4,this._process(),this._hash},clone:function(){var e=i.clone.call(this);return e._hash=this._hash.clone(),e}});t.SHA1=i._createHelper(s),t.HmacSHA1=i._createHmacHelper(s)})(),e.SHA1})})),_e=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.algo,s=[],c=[];(function(){function e(e){for(var n=t.sqrt(e),r=2;r<=n;r++)if(!(e%r))return!1;return!0}function n(e){return(e-(e|0))*4294967296|0}for(var r=2,i=0;i<64;)e(r)&&(i<8&&(s[i]=n(t.pow(r,1/2))),c[i]=n(t.pow(r,1/3)),i++),r++})();var l=[],u=o.SHA256=a.extend({_doReset:function(){this._hash=new i.init(s.slice(0))},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],u=n[5],d=n[6],f=n[7],p=0;p<64;p++){if(p<16)l[p]=e[t+p]|0;else{var m=l[p-15],h=(m<<25|m>>>7)^(m<<14|m>>>18)^m>>>3,g=l[p-2],_=(g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10;l[p]=h+l[p-7]+_+l[p-16]}var v=s&u^~s&d,y=r&i^r&a^i&a,b=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),x=(s<<26|s>>>6)^(s<<21|s>>>11)^(s<<7|s>>>25),S=f+x+v+c[p]+l[p],C=b+y;f=d,d=u,u=s,s=o+S|0,o=a,a=i,i=r,r=S+C|0}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+a|0,n[3]=n[3]+o|0,n[4]=n[4]+s|0,n[5]=n[5]+u|0,n[6]=n[6]+d|0,n[7]=n[7]+f|0},_doFinalize:function(){var e=this._data,n=e.words,r=this._nDataBytes*8,i=e.sigBytes*8;return n[i>>>5]|=128<<24-i%32,n[(i+64>>>9<<4)+14]=t.floor(r/4294967296),n[(i+64>>>9<<4)+15]=r,e.sigBytes=n.length*4,this._process(),this._hash},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});n.SHA256=a._createHelper(u),n.HmacSHA256=a._createHmacHelper(u)})(Math),e.SHA256})})),ve=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),_e()):typeof define==`function`&&define.amd?define([`./core`,`./sha256`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.algo,i=r.SHA256,a=r.SHA224=i.extend({_doReset:function(){this._hash=new n.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var e=i._doFinalize.call(this);return e.sigBytes-=4,e}});t.SHA224=i._createHelper(a),t.HmacSHA224=i._createHmacHelper(a)})(),e.SHA224})})),ye=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ue()):typeof define==`function`&&define.amd?define([`./core`,`./x64-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.Hasher,r=t.x64,i=r.Word,a=r.WordArray,o=t.algo;function s(){return i.create.apply(i,arguments)}var c=[s(1116352408,3609767458),s(1899447441,602891725),s(3049323471,3964484399),s(3921009573,2173295548),s(961987163,4081628472),s(1508970993,3053834265),s(2453635748,2937671579),s(2870763221,3664609560),s(3624381080,2734883394),s(310598401,1164996542),s(607225278,1323610764),s(1426881987,3590304994),s(1925078388,4068182383),s(2162078206,991336113),s(2614888103,633803317),s(3248222580,3479774868),s(3835390401,2666613458),s(4022224774,944711139),s(264347078,2341262773),s(604807628,2007800933),s(770255983,1495990901),s(1249150122,1856431235),s(1555081692,3175218132),s(1996064986,2198950837),s(2554220882,3999719339),s(2821834349,766784016),s(2952996808,2566594879),s(3210313671,3203337956),s(3336571891,1034457026),s(3584528711,2466948901),s(113926993,3758326383),s(338241895,168717936),s(666307205,1188179964),s(773529912,1546045734),s(1294757372,1522805485),s(1396182291,2643833823),s(1695183700,2343527390),s(1986661051,1014477480),s(2177026350,1206759142),s(2456956037,344077627),s(2730485921,1290863460),s(2820302411,3158454273),s(3259730800,3505952657),s(3345764771,106217008),s(3516065817,3606008344),s(3600352804,1432725776),s(4094571909,1467031594),s(275423344,851169720),s(430227734,3100823752),s(506948616,1363258195),s(659060556,3750685593),s(883997877,3785050280),s(958139571,3318307427),s(1322822218,3812723403),s(1537002063,2003034995),s(1747873779,3602036899),s(1955562222,1575990012),s(2024104815,1125592928),s(2227730452,2716904306),s(2361852424,442776044),s(2428436474,593698344),s(2756734187,3733110249),s(3204031479,2999351573),s(3329325298,3815920427),s(3391569614,3928383900),s(3515267271,566280711),s(3940187606,3454069534),s(4118630271,4000239992),s(116418474,1914138554),s(174292421,2731055270),s(289380356,3203993006),s(460393269,320620315),s(685471733,587496836),s(852142971,1086792851),s(1017036298,365543100),s(1126000580,2618297676),s(1288033470,3409855158),s(1501505948,4234509866),s(1607167915,987167468),s(1816402316,1246189591)],l=[];(function(){for(var e=0;e<80;e++)l[e]=s()})();var u=o.SHA512=n.extend({_doReset:function(){this._hash=new a.init([new i.init(1779033703,4089235720),new i.init(3144134277,2227873595),new i.init(1013904242,4271175723),new i.init(2773480762,1595750129),new i.init(1359893119,2917565137),new i.init(2600822924,725511199),new i.init(528734635,4215389547),new i.init(1541459225,327033209)])},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],u=n[5],d=n[6],f=n[7],p=r.high,m=r.low,h=i.high,g=i.low,_=a.high,v=a.low,y=o.high,b=o.low,x=s.high,S=s.low,C=u.high,w=u.low,T=d.high,E=d.low,D=f.high,O=f.low,k=p,A=m,j=h,M=g,N=_,P=v,ee=y,te=b,F=x,I=S,ne=C,re=w,ie=T,ae=E,oe=D,L=O,R=0;R<80;R++){var z,se,ce=l[R];if(R<16)se=ce.high=e[t+R*2]|0,z=ce.low=e[t+R*2+1]|0;else{var le=l[R-15],B=le.high,ue=le.low,de=(B>>>1|ue<<31)^(B>>>8|ue<<24)^B>>>7,fe=(ue>>>1|B<<31)^(ue>>>8|B<<24)^(ue>>>7|B<<25),pe=l[R-2],me=pe.high,he=pe.low,ge=(me>>>19|he<<13)^(me<<3|he>>>29)^me>>>6,_e=(he>>>19|me<<13)^(he<<3|me>>>29)^(he>>>6|me<<26),ve=l[R-7],ye=ve.high,be=ve.low,xe=l[R-16],Se=xe.high,Ce=xe.low;z=fe+be,se=de+ye+ +(z>>>0<fe>>>0),z+=_e,se=se+ge+ +(z>>>0<_e>>>0),z+=Ce,se=se+Se+ +(z>>>0<Ce>>>0),ce.high=se,ce.low=z}var we=F&ne^~F&ie,Te=I&re^~I&ae,V=k&j^k&N^j&N,Ee=A&M^A&P^M&P,De=(k>>>28|A<<4)^(k<<30|A>>>2)^(k<<25|A>>>7),Oe=(A>>>28|k<<4)^(A<<30|k>>>2)^(A<<25|k>>>7),ke=(F>>>14|I<<18)^(F>>>18|I<<14)^(F<<23|I>>>9),Ae=(I>>>14|F<<18)^(I>>>18|F<<14)^(I<<23|F>>>9),je=c[R],Me=je.high,Ne=je.low,Pe=L+Ae,Fe=oe+ke+ +(Pe>>>0<L>>>0),Pe=Pe+Te,Fe=Fe+we+ +(Pe>>>0<Te>>>0),Pe=Pe+Ne,Fe=Fe+Me+ +(Pe>>>0<Ne>>>0),Pe=Pe+z,Fe=Fe+se+ +(Pe>>>0<z>>>0),Ie=Oe+Ee,Le=De+V+ +(Ie>>>0<Oe>>>0);oe=ie,L=ae,ie=ne,ae=re,ne=F,re=I,I=te+Pe|0,F=ee+Fe+ +(I>>>0<te>>>0)|0,ee=N,te=P,N=j,P=M,j=k,M=A,A=Pe+Ie|0,k=Fe+Le+ +(A>>>0<Pe>>>0)|0}m=r.low=m+A,r.high=p+k+ +(m>>>0<A>>>0),g=i.low=g+M,i.high=h+j+ +(g>>>0<M>>>0),v=a.low=v+P,a.high=_+N+ +(v>>>0<P>>>0),b=o.low=b+te,o.high=y+ee+ +(b>>>0<te>>>0),S=s.low=S+I,s.high=x+F+ +(S>>>0<I>>>0),w=u.low=w+re,u.high=C+ne+ +(w>>>0<re>>>0),E=d.low=E+ae,d.high=T+ie+ +(E>>>0<ae>>>0),O=f.low=O+L,f.high=D+oe+ +(O>>>0<L>>>0)},_doFinalize:function(){var e=this._data,t=e.words,n=this._nDataBytes*8,r=e.sigBytes*8;return t[r>>>5]|=128<<24-r%32,t[(r+128>>>10<<5)+30]=Math.floor(n/4294967296),t[(r+128>>>10<<5)+31]=n,e.sigBytes=t.length*4,this._process(),this._hash.toX32()},clone:function(){var e=n.clone.call(this);return e._hash=this._hash.clone(),e},blockSize:1024/32});t.SHA512=n._createHelper(u),t.HmacSHA512=n._createHmacHelper(u)})(),e.SHA512})})),be=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ue(),ye()):typeof define==`function`&&define.amd?define([`./core`,`./x64-core`,`./sha512`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.x64,r=n.Word,i=n.WordArray,a=t.algo,o=a.SHA512,s=a.SHA384=o.extend({_doReset:function(){this._hash=new i.init([new r.init(3418070365,3238371032),new r.init(1654270250,914150663),new r.init(2438529370,812702999),new r.init(355462360,4144912697),new r.init(1731405415,4290775857),new r.init(2394180231,1750603025),new r.init(3675008525,1694076839),new r.init(1203062813,3204075428)])},_doFinalize:function(){var e=o._doFinalize.call(this);return e.sigBytes-=16,e}});t.SHA384=o._createHelper(s),t.HmacSHA384=o._createHmacHelper(s)})(),e.SHA384})})),xe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ue()):typeof define==`function`&&define.amd?define([`./core`,`./x64-core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.x64.Word,s=n.algo,c=[],l=[],u=[];(function(){for(var e=1,t=0,n=0;n<24;n++){c[e+5*t]=(n+1)*(n+2)/2%64;var r=t%5,i=(2*e+3*t)%5;e=r,t=i}for(var e=0;e<5;e++)for(var t=0;t<5;t++)l[e+5*t]=t+(2*e+3*t)%5*5;for(var a=1,s=0;s<24;s++){for(var d=0,f=0,p=0;p<7;p++){if(a&1){var m=(1<<p)-1;m<32?f^=1<<m:d^=1<<m-32}a&128?a=a<<1^113:a<<=1}u[s]=o.create(d,f)}})();var d=[];(function(){for(var e=0;e<25;e++)d[e]=o.create()})();var f=s.SHA3=a.extend({cfg:a.cfg.extend({outputLength:512}),_doReset:function(){for(var e=this._state=[],t=0;t<25;t++)e[t]=new o.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(e,t){for(var n=this._state,r=this.blockSize/2,i=0;i<r;i++){var a=e[t+2*i],o=e[t+2*i+1];a=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360,o=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360;var s=n[i];s.high^=o,s.low^=a}for(var f=0;f<24;f++){for(var p=0;p<5;p++){for(var m=0,h=0,g=0;g<5;g++){var s=n[p+5*g];m^=s.high,h^=s.low}var _=d[p];_.high=m,_.low=h}for(var p=0;p<5;p++)for(var v=d[(p+4)%5],y=d[(p+1)%5],b=y.high,x=y.low,m=v.high^(b<<1|x>>>31),h=v.low^(x<<1|b>>>31),g=0;g<5;g++){var s=n[p+5*g];s.high^=m,s.low^=h}for(var S=1;S<25;S++){var m,h,s=n[S],C=s.high,w=s.low,T=c[S];T<32?(m=C<<T|w>>>32-T,h=w<<T|C>>>32-T):(m=w<<T-32|C>>>64-T,h=C<<T-32|w>>>64-T);var E=d[l[S]];E.high=m,E.low=h}var D=d[0],O=n[0];D.high=O.high,D.low=O.low;for(var p=0;p<5;p++)for(var g=0;g<5;g++){var S=p+5*g,s=n[S],k=d[S],A=d[(p+1)%5+5*g],j=d[(p+2)%5+5*g];s.high=k.high^~A.high&j.high,s.low=k.low^~A.low&j.low}var s=n[0],M=u[f];s.high^=M.high,s.low^=M.low}},_doFinalize:function(){var e=this._data,n=e.words;this._nDataBytes*8;var r=e.sigBytes*8,a=this.blockSize*32;n[r>>>5]|=1<<24-r%32,n[(t.ceil((r+1)/a)*a>>>5)-1]|=128,e.sigBytes=n.length*4,this._process();for(var o=this._state,s=this.cfg.outputLength/8,c=s/8,l=[],u=0;u<c;u++){var d=o[u],f=d.high,p=d.low;f=(f<<8|f>>>24)&16711935|(f<<24|f>>>8)&4278255360,p=(p<<8|p>>>24)&16711935|(p<<24|p>>>8)&4278255360,l.push(p),l.push(f)}return new i.init(l,s)},clone:function(){for(var e=a.clone.call(this),t=e._state=this._state.slice(0),n=0;n<25;n++)t[n]=t[n].clone();return e}});n.SHA3=a._createHelper(f),n.HmacSHA3=a._createHmacHelper(f)})(Math),e.SHA3})})),Se=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.algo,s=i.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),c=i.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),l=i.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),u=i.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),d=i.create([0,1518500249,1859775393,2400959708,2840853838]),f=i.create([1352829926,1548603684,1836072691,2053994217,0]),p=o.RIPEMD160=a.extend({_doReset:function(){this._hash=i.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var n=0;n<16;n++){var r=t+n,i=e[r];e[r]=(i<<8|i>>>24)&16711935|(i<<24|i>>>8)&4278255360}for(var a=this._hash.words,o=d.words,p=f.words,b=s.words,x=c.words,S=l.words,C=u.words,w,T,E,D,O,k=w=a[0],A=T=a[1],j=E=a[2],M=D=a[3],N=O=a[4],P,n=0;n<80;n+=1)P=w+e[t+b[n]]|0,n<16?P+=m(T,E,D)+o[0]:n<32?P+=h(T,E,D)+o[1]:n<48?P+=g(T,E,D)+o[2]:n<64?P+=_(T,E,D)+o[3]:P+=v(T,E,D)+o[4],P|=0,P=y(P,S[n]),P=P+O|0,w=O,O=D,D=y(E,10),E=T,T=P,P=k+e[t+x[n]]|0,n<16?P+=v(A,j,M)+p[0]:n<32?P+=_(A,j,M)+p[1]:n<48?P+=g(A,j,M)+p[2]:n<64?P+=h(A,j,M)+p[3]:P+=m(A,j,M)+p[4],P|=0,P=y(P,C[n]),P=P+N|0,k=N,N=M,M=y(j,10),j=A,A=P;P=a[1]+E+M|0,a[1]=a[2]+D+N|0,a[2]=a[3]+O+k|0,a[3]=a[4]+w+A|0,a[4]=a[0]+T+j|0,a[0]=P},_doFinalize:function(){var e=this._data,t=e.words,n=this._nDataBytes*8,r=e.sigBytes*8;t[r>>>5]|=128<<24-r%32,t[(r+64>>>9<<4)+14]=(n<<8|n>>>24)&16711935|(n<<24|n>>>8)&4278255360,e.sigBytes=(t.length+1)*4,this._process();for(var i=this._hash,a=i.words,o=0;o<5;o++){var s=a[o];a[o]=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360}return i},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});function m(e,t,n){return e^t^n}function h(e,t,n){return e&t|~e&n}function g(e,t,n){return(e|~t)^n}function _(e,t,n){return e&n|t&~n}function v(e,t,n){return e^(t|~n)}function y(e,t){return e<<t|e>>>32-t}n.RIPEMD160=a._createHelper(p),n.HmacRIPEMD160=a._createHmacHelper(p)})(Math),e.RIPEMD160})})),Ce=o(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(B()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){(function(){var t=e,n=t.lib.Base,r=t.enc.Utf8,i=t.algo;i.HMAC=n.extend({init:function(e,t){e=this._hasher=new e.init,typeof t==`string`&&(t=r.parse(t));var n=e.blockSize,i=n*4;t.sigBytes>i&&(t=e.finalize(t)),t.clamp();for(var a=this._oKey=t.clone(),o=this._iKey=t.clone(),s=a.words,c=o.words,l=0;l<n;l++)s[l]^=1549556828,c[l]^=909522486;a.sigBytes=o.sigBytes=i,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher,n=t.finalize(e);return t.reset(),t.finalize(this._oKey.clone().concat(n))}})})()})})),we=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),_e(),Ce()):typeof define==`function`&&define.amd?define([`./core`,`./sha256`,`./hmac`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.Base,i=n.WordArray,a=t.algo,o=a.SHA256,s=a.HMAC,c=a.PBKDF2=r.extend({cfg:r.extend({keySize:128/32,hasher:o,iterations:25e4}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var n=this.cfg,r=s.create(n.hasher,e),a=i.create(),o=i.create([1]),c=a.words,l=o.words,u=n.keySize,d=n.iterations;c.length<u;){var f=r.update(t).finalize(o);r.reset();for(var p=f.words,m=p.length,h=f,g=1;g<d;g++){h=r.finalize(h),r.reset();for(var _=h.words,v=0;v<m;v++)p[v]^=_[v]}a.concat(f),l[0]++}return a.sigBytes=u*4,a}});t.PBKDF2=function(e,t,n){return c.create(n).compute(e,t)}})(),e.PBKDF2})})),Te=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ge(),Ce()):typeof define==`function`&&define.amd?define([`./core`,`./sha1`,`./hmac`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.Base,i=n.WordArray,a=t.algo,o=a.MD5,s=a.EvpKDF=r.extend({cfg:r.extend({keySize:128/32,hasher:o,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var n,r=this.cfg,a=r.hasher.create(),o=i.create(),s=o.words,c=r.keySize,l=r.iterations;s.length<c;){n&&a.update(n),n=a.update(e).finalize(t),a.reset();for(var u=1;u<l;u++)n=a.finalize(n),a.reset();o.concat(n)}return o.sigBytes=c*4,o}});t.EvpKDF=function(e,t,n){return s.create(n).compute(e,t)}})(),e.EvpKDF})})),V=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),Te()):typeof define==`function`&&define.amd?define([`./core`,`./evpkdf`],r):r(n.CryptoJS)})(e,function(e){e.lib.Cipher||function(t){var n=e,r=n.lib,i=r.Base,a=r.WordArray,o=r.BufferedBlockAlgorithm,s=n.enc;s.Utf8;var c=s.Base64,l=n.algo.EvpKDF,u=r.Cipher=o.extend({cfg:i.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,n){this.cfg=this.cfg.extend(n),this._xformMode=e,this._key=t,this.reset()},reset:function(){o.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function e(e){return typeof e==`string`?S:y}return function(t){return{encrypt:function(n,r,i){return e(r).encrypt(t,n,r,i)},decrypt:function(n,r,i){return e(r).decrypt(t,n,r,i)}}}}()});r.StreamCipher=u.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var d=n.mode={},f=r.BlockCipherMode=i.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}}),p=d.CBC=function(){var e=f.extend();e.Encryptor=e.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize;n.call(this,e,t,i),r.encryptBlock(e,t),this._prevBlock=e.slice(t,t+i)}}),e.Decryptor=e.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize,a=e.slice(t,t+i);r.decryptBlock(e,t),n.call(this,e,t,i),this._prevBlock=a}});function n(e,n,r){var i,a=this._iv;a?(i=a,this._iv=t):i=this._prevBlock;for(var o=0;o<r;o++)e[n+o]^=i[o]}return e}(),m=n.pad={},h=m.Pkcs7={pad:function(e,t){for(var n=t*4,r=n-e.sigBytes%n,i=r<<24|r<<16|r<<8|r,o=[],s=0;s<r;s+=4)o.push(i);var c=a.create(o,r);e.concat(c)},unpad:function(e){var t=e.words[e.sigBytes-1>>>2]&255;e.sigBytes-=t}};r.BlockCipher=u.extend({cfg:u.cfg.extend({mode:p,padding:h}),reset:function(){var e;u.reset.call(this);var t=this.cfg,n=t.iv,r=t.mode;this._xformMode==this._ENC_XFORM_MODE?e=r.createEncryptor:(e=r.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==e?this._mode.init(this,n&&n.words):(this._mode=e.call(r,this,n&&n.words),this._mode.__creator=e)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e,t=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(t.pad(this._data,this.blockSize),e=this._process(!0)):(e=this._process(!0),t.unpad(e)),e},blockSize:128/32});var g=r.CipherParams=i.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),_=n.format={},v=_.OpenSSL={stringify:function(e){var t,n=e.ciphertext,r=e.salt;return t=r?a.create([1398893684,1701076831]).concat(r).concat(n):n,t.toString(c)},parse:function(e){var t,n=c.parse(e),r=n.words;return r[0]==1398893684&&r[1]==1701076831&&(t=a.create(r.slice(2,4)),r.splice(0,4),n.sigBytes-=16),g.create({ciphertext:n,salt:t})}},y=r.SerializableCipher=i.extend({cfg:i.extend({format:v}),encrypt:function(e,t,n,r){r=this.cfg.extend(r);var i=e.createEncryptor(n,r),a=i.finalize(t),o=i.cfg;return g.create({ciphertext:a,key:n,iv:o.iv,algorithm:e,mode:o.mode,padding:o.padding,blockSize:e.blockSize,formatter:r.format})},decrypt:function(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),e.createDecryptor(n,r).finalize(t.ciphertext)},_parse:function(e,t){return typeof e==`string`?t.parse(e,this):e}}),b=n.kdf={},x=b.OpenSSL={execute:function(e,t,n,r,i){if(r||=a.random(64/8),i)var o=l.create({keySize:t+n,hasher:i}).compute(e,r);else var o=l.create({keySize:t+n}).compute(e,r);var s=a.create(o.words.slice(t),n*4);return o.sigBytes=t*4,g.create({key:o,iv:s,salt:r})}},S=r.PasswordBasedCipher=y.extend({cfg:y.cfg.extend({kdf:x}),encrypt:function(e,t,n,r){r=this.cfg.extend(r);var i=r.kdf.execute(n,e.keySize,e.ivSize,r.salt,r.hasher);r.iv=i.iv;var a=y.encrypt.call(this,e,t,i.key,r);return a.mixIn(i),a},decrypt:function(e,t,n,r){r=this.cfg.extend(r),t=this._parse(t,r.format);var i=r.kdf.execute(n,e.keySize,e.ivSize,t.salt,r.hasher);return r.iv=i.iv,y.decrypt.call(this,e,t,i.key,r)}})}()})})),Ee=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.CFB=function(){var t=e.lib.BlockCipherMode.extend();t.Encryptor=t.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize;n.call(this,e,t,i,r),this._prevBlock=e.slice(t,t+i)}}),t.Decryptor=t.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize,a=e.slice(t,t+i);n.call(this,e,t,i,r),this._prevBlock=a}});function n(e,t,n,r){var i,a=this._iv;a?(i=a.slice(0),this._iv=void 0):i=this._prevBlock,r.encryptBlock(i,0);for(var o=0;o<n;o++)e[t+o]^=i[o]}return t}(),e.mode.CFB})})),De=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.CTR=function(){var t=e.lib.BlockCipherMode.extend();return t.Decryptor=t.Encryptor=t.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize,i=this._iv,a=this._counter;i&&(a=this._counter=i.slice(0),this._iv=void 0);var o=a.slice(0);n.encryptBlock(o,0),a[r-1]=a[r-1]+1|0;for(var s=0;s<r;s++)e[t+s]^=o[s]}}),t}(),e.mode.CTR})})),Oe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.CTRGladman=function(){var t=e.lib.BlockCipherMode.extend();function n(e){if((e>>24&255)==255){var t=e>>16&255,n=e>>8&255,r=e&255;t===255?(t=0,n===255?(n=0,r===255?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}else e+=1<<24;return e}function r(e){return(e[0]=n(e[0]))===0&&(e[1]=n(e[1])),e}return t.Decryptor=t.Encryptor=t.extend({processBlock:function(e,t){var n=this._cipher,i=n.blockSize,a=this._iv,o=this._counter;a&&(o=this._counter=a.slice(0),this._iv=void 0),r(o);var s=o.slice(0);n.encryptBlock(s,0);for(var c=0;c<i;c++)e[t+c]^=s[c]}}),t}(),e.mode.CTRGladman})})),ke=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.OFB=function(){var t=e.lib.BlockCipherMode.extend();return t.Decryptor=t.Encryptor=t.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize,i=this._iv,a=this._keystream;i&&(a=this._keystream=i.slice(0),this._iv=void 0),n.encryptBlock(a,0);for(var o=0;o<r;o++)e[t+o]^=a[o]}}),t}(),e.mode.OFB})})),Ae=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.mode.ECB=function(){var t=e.lib.BlockCipherMode.extend();return t.Encryptor=t.extend({processBlock:function(e,t){this._cipher.encryptBlock(e,t)}}),t.Decryptor=t.extend({processBlock:function(e,t){this._cipher.decryptBlock(e,t)}}),t}(),e.mode.ECB})})),je=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.AnsiX923={pad:function(e,t){var n=e.sigBytes,r=t*4,i=r-n%r,a=n+i-1;e.clamp(),e.words[a>>>2]|=i<<24-a%4*8,e.sigBytes+=i},unpad:function(e){var t=e.words[e.sigBytes-1>>>2]&255;e.sigBytes-=t}},e.pad.Ansix923})})),Me=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.Iso10126={pad:function(t,n){var r=n*4,i=r-t.sigBytes%r;t.concat(e.lib.WordArray.random(i-1)).concat(e.lib.WordArray.create([i<<24],1))},unpad:function(e){var t=e.words[e.sigBytes-1>>>2]&255;e.sigBytes-=t}},e.pad.Iso10126})})),Ne=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.Iso97971={pad:function(t,n){t.concat(e.lib.WordArray.create([2147483648],1)),e.pad.ZeroPadding.pad(t,n)},unpad:function(t){e.pad.ZeroPadding.unpad(t),t.sigBytes--}},e.pad.Iso97971})})),Pe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.ZeroPadding={pad:function(e,t){var n=t*4;e.clamp(),e.sigBytes+=n-(e.sigBytes%n||n)},unpad:function(e){for(var t=e.words,n=e.sigBytes-1,n=e.sigBytes-1;n>=0;n--)if(t[n>>>2]>>>24-n%4*8&255){e.sigBytes=n+1;break}}},e.pad.ZeroPadding})})),Fe=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return e.pad.NoPadding={pad:function(){},unpad:function(){}},e.pad.NoPadding})})),Ie=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),V()):typeof define==`function`&&define.amd?define([`./core`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib.CipherParams,i=n.enc.Hex,a=n.format;a.Hex={stringify:function(e){return e.ciphertext.toString(i)},parse:function(e){var t=i.parse(e);return r.create({ciphertext:t})}}})(),e.format.Hex})})),Le=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),he(),Te(),V()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.BlockCipher,r=t.algo,i=[],a=[],o=[],s=[],c=[],l=[],u=[],d=[],f=[],p=[];(function(){for(var e=[],t=0;t<256;t++)t<128?e[t]=t<<1:e[t]=t<<1^283;for(var n=0,r=0,t=0;t<256;t++){var m=r^r<<1^r<<2^r<<3^r<<4;m=m>>>8^m&255^99,i[n]=m,a[m]=n;var h=e[n],g=e[h],_=e[g],v=e[m]*257^m*16843008;o[n]=v<<24|v>>>8,s[n]=v<<16|v>>>16,c[n]=v<<8|v>>>24,l[n]=v;var v=_*16843009^g*65537^h*257^n*16843008;u[m]=v<<24|v>>>8,d[m]=v<<16|v>>>16,f[m]=v<<8|v>>>24,p[m]=v,n?(n=h^e[e[e[_^h]]],r^=e[e[r]]):n=r=1}})();var m=[0,1,2,4,8,16,32,64,128,27,54],h=r.AES=n.extend({_doReset:function(){var e;if(!(this._nRounds&&this._keyPriorReset===this._key)){for(var t=this._keyPriorReset=this._key,n=t.words,r=t.sigBytes/4,a=((this._nRounds=r+6)+1)*4,o=this._keySchedule=[],s=0;s<a;s++)s<r?o[s]=n[s]:(e=o[s-1],s%r?r>6&&s%r==4&&(e=i[e>>>24]<<24|i[e>>>16&255]<<16|i[e>>>8&255]<<8|i[e&255]):(e=e<<8|e>>>24,e=i[e>>>24]<<24|i[e>>>16&255]<<16|i[e>>>8&255]<<8|i[e&255],e^=m[s/r|0]<<24),o[s]=o[s-r]^e);for(var c=this._invKeySchedule=[],l=0;l<a;l++){var s=a-l;if(l%4)var e=o[s];else var e=o[s-4];l<4||s<=4?c[l]=e:c[l]=u[i[e>>>24]]^d[i[e>>>16&255]]^f[i[e>>>8&255]]^p[i[e&255]]}}},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,o,s,c,l,i)},decryptBlock:function(e,t){var n=e[t+1];e[t+1]=e[t+3],e[t+3]=n,this._doCryptBlock(e,t,this._invKeySchedule,u,d,f,p,a);var n=e[t+1];e[t+1]=e[t+3],e[t+3]=n},_doCryptBlock:function(e,t,n,r,i,a,o,s){for(var c=this._nRounds,l=e[t]^n[0],u=e[t+1]^n[1],d=e[t+2]^n[2],f=e[t+3]^n[3],p=4,m=1;m<c;m++){var h=r[l>>>24]^i[u>>>16&255]^a[d>>>8&255]^o[f&255]^n[p++],g=r[u>>>24]^i[d>>>16&255]^a[f>>>8&255]^o[l&255]^n[p++],_=r[d>>>24]^i[f>>>16&255]^a[l>>>8&255]^o[u&255]^n[p++],v=r[f>>>24]^i[l>>>16&255]^a[u>>>8&255]^o[d&255]^n[p++];l=h,u=g,d=_,f=v}var h=(s[l>>>24]<<24|s[u>>>16&255]<<16|s[d>>>8&255]<<8|s[f&255])^n[p++],g=(s[u>>>24]<<24|s[d>>>16&255]<<16|s[f>>>8&255]<<8|s[l&255])^n[p++],_=(s[d>>>24]<<24|s[f>>>16&255]<<16|s[l>>>8&255]<<8|s[u&255])^n[p++],v=(s[f>>>24]<<24|s[l>>>16&255]<<16|s[u>>>8&255]<<8|s[d&255])^n[p++];e[t]=h,e[t+1]=g,e[t+2]=_,e[t+3]=v},keySize:256/32});t.AES=n._createHelper(h)})(),e.AES})})),Re=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),he(),Te(),V()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib,r=n.WordArray,i=n.BlockCipher,a=t.algo,o=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],s=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],c=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],l=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],u=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],d=a.DES=i.extend({_doReset:function(){for(var e=this._key.words,t=[],n=0;n<56;n++){var r=o[n]-1;t[n]=e[r>>>5]>>>31-r%32&1}for(var i=this._subKeys=[],a=0;a<16;a++){for(var l=i[a]=[],u=c[a],n=0;n<24;n++)l[n/6|0]|=t[(s[n]-1+u)%28]<<31-n%6,l[4+(n/6|0)]|=t[28+(s[n+24]-1+u)%28]<<31-n%6;l[0]=l[0]<<1|l[0]>>>31;for(var n=1;n<7;n++)l[n]=l[n]>>>(n-1)*4+3;l[7]=l[7]<<5|l[7]>>>27}for(var d=this._invSubKeys=[],n=0;n<16;n++)d[n]=i[15-n]},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._subKeys)},decryptBlock:function(e,t){this._doCryptBlock(e,t,this._invSubKeys)},_doCryptBlock:function(e,t,n){this._lBlock=e[t],this._rBlock=e[t+1],f.call(this,4,252645135),f.call(this,16,65535),p.call(this,2,858993459),p.call(this,8,16711935),f.call(this,1,1431655765);for(var r=0;r<16;r++){for(var i=n[r],a=this._lBlock,o=this._rBlock,s=0,c=0;c<8;c++)s|=l[c][((o^i[c])&u[c])>>>0];this._lBlock=o,this._rBlock=a^s}var d=this._lBlock;this._lBlock=this._rBlock,this._rBlock=d,f.call(this,1,1431655765),p.call(this,8,16711935),p.call(this,2,858993459),f.call(this,16,65535),f.call(this,4,252645135),e[t]=this._lBlock,e[t+1]=this._rBlock},keySize:64/32,ivSize:64/32,blockSize:64/32});function f(e,t){var n=(this._lBlock>>>e^this._rBlock)&t;this._rBlock^=n,this._lBlock^=n<<e}function p(e,t){var n=(this._rBlock>>>e^this._lBlock)&t;this._lBlock^=n,this._rBlock^=n<<e}t.DES=i._createHelper(d);var m=a.TripleDES=i.extend({_doReset:function(){var e=this._key.words;if(e.length!==2&&e.length!==4&&e.length<6)throw Error(`Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.`);var t=e.slice(0,2),n=e.length<4?e.slice(0,2):e.slice(2,4),i=e.length<6?e.slice(0,2):e.slice(4,6);this._des1=d.createEncryptor(r.create(t)),this._des2=d.createEncryptor(r.create(n)),this._des3=d.createEncryptor(r.create(i))},encryptBlock:function(e,t){this._des1.encryptBlock(e,t),this._des2.decryptBlock(e,t),this._des3.encryptBlock(e,t)},decryptBlock:function(e,t){this._des3.decryptBlock(e,t),this._des2.encryptBlock(e,t),this._des1.decryptBlock(e,t)},keySize:192/32,ivSize:64/32,blockSize:64/32});t.TripleDES=i._createHelper(m)})(),e.TripleDES})})),ze=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),he(),Te(),V()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.StreamCipher,r=t.algo,i=r.RC4=n.extend({_doReset:function(){for(var e=this._key,t=e.words,n=e.sigBytes,r=this._S=[],i=0;i<256;i++)r[i]=i;for(var i=0,a=0;i<256;i++){var o=i%n,s=t[o>>>2]>>>24-o%4*8&255;a=(a+r[i]+s)%256;var c=r[i];r[i]=r[a],r[a]=c}this._i=this._j=0},_doProcessBlock:function(e,t){e[t]^=a.call(this)},keySize:256/32,ivSize:0});function a(){for(var e=this._S,t=this._i,n=this._j,r=0,i=0;i<4;i++){t=(t+1)%256,n=(n+e[t])%256;var a=e[t];e[t]=e[n],e[n]=a,r|=e[(e[t]+e[n])%256]<<24-i*8}return this._i=t,this._j=n,r}t.RC4=n._createHelper(i);var o=r.RC4Drop=i.extend({cfg:i.cfg.extend({drop:192}),_doReset:function(){i._doReset.call(this);for(var e=this.cfg.drop;e>0;e--)a.call(this)}});t.RC4Drop=n._createHelper(o)})(),e.RC4})})),Be=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),he(),Te(),V()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.StreamCipher,r=t.algo,i=[],a=[],o=[],s=r.Rabbit=n.extend({_doReset:function(){for(var e=this._key.words,t=this.cfg.iv,n=0;n<4;n++)e[n]=(e[n]<<8|e[n]>>>24)&16711935|(e[n]<<24|e[n]>>>8)&4278255360;var r=this._X=[e[0],e[3]<<16|e[2]>>>16,e[1],e[0]<<16|e[3]>>>16,e[2],e[1]<<16|e[0]>>>16,e[3],e[2]<<16|e[1]>>>16],i=this._C=[e[2]<<16|e[2]>>>16,e[0]&4294901760|e[1]&65535,e[3]<<16|e[3]>>>16,e[1]&4294901760|e[2]&65535,e[0]<<16|e[0]>>>16,e[2]&4294901760|e[3]&65535,e[1]<<16|e[1]>>>16,e[3]&4294901760|e[0]&65535];this._b=0;for(var n=0;n<4;n++)c.call(this);for(var n=0;n<8;n++)i[n]^=r[n+4&7];if(t){var a=t.words,o=a[0],s=a[1],l=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,u=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360,d=l>>>16|u&4294901760,f=u<<16|l&65535;i[0]^=l,i[1]^=d,i[2]^=u,i[3]^=f,i[4]^=l,i[5]^=d,i[6]^=u,i[7]^=f;for(var n=0;n<4;n++)c.call(this)}},_doProcessBlock:function(e,t){var n=this._X;c.call(this),i[0]=n[0]^n[5]>>>16^n[3]<<16,i[1]=n[2]^n[7]>>>16^n[5]<<16,i[2]=n[4]^n[1]>>>16^n[7]<<16,i[3]=n[6]^n[3]>>>16^n[1]<<16;for(var r=0;r<4;r++)i[r]=(i[r]<<8|i[r]>>>24)&16711935|(i[r]<<24|i[r]>>>8)&4278255360,e[t+r]^=i[r]},blockSize:128/32,ivSize:64/32});function c(){for(var e=this._X,t=this._C,n=0;n<8;n++)a[n]=t[n];t[0]=t[0]+1295307597+this._b|0,t[1]=t[1]+3545052371+ +(t[0]>>>0<a[0]>>>0)|0,t[2]=t[2]+886263092+ +(t[1]>>>0<a[1]>>>0)|0,t[3]=t[3]+1295307597+ +(t[2]>>>0<a[2]>>>0)|0,t[4]=t[4]+3545052371+ +(t[3]>>>0<a[3]>>>0)|0,t[5]=t[5]+886263092+ +(t[4]>>>0<a[4]>>>0)|0,t[6]=t[6]+1295307597+ +(t[5]>>>0<a[5]>>>0)|0,t[7]=t[7]+3545052371+ +(t[6]>>>0<a[6]>>>0)|0,this._b=+(t[7]>>>0<a[7]>>>0);for(var n=0;n<8;n++){var r=e[n]+t[n],i=r&65535,s=r>>>16;o[n]=((i*i>>>17)+i*s>>>15)+s*s^((r&4294901760)*r|0)+((r&65535)*r|0)}e[0]=o[0]+(o[7]<<16|o[7]>>>16)+(o[6]<<16|o[6]>>>16)|0,e[1]=o[1]+(o[0]<<8|o[0]>>>24)+o[7]|0,e[2]=o[2]+(o[1]<<16|o[1]>>>16)+(o[0]<<16|o[0]>>>16)|0,e[3]=o[3]+(o[2]<<8|o[2]>>>24)+o[1]|0,e[4]=o[4]+(o[3]<<16|o[3]>>>16)+(o[2]<<16|o[2]>>>16)|0,e[5]=o[5]+(o[4]<<8|o[4]>>>24)+o[3]|0,e[6]=o[6]+(o[5]<<16|o[5]>>>16)+(o[4]<<16|o[4]>>>16)|0,e[7]=o[7]+(o[6]<<8|o[6]>>>24)+o[5]|0}t.Rabbit=n._createHelper(s)})(),e.Rabbit})})),Ve=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),he(),Te(),V()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.StreamCipher,r=t.algo,i=[],a=[],o=[],s=r.RabbitLegacy=n.extend({_doReset:function(){var e=this._key.words,t=this.cfg.iv,n=this._X=[e[0],e[3]<<16|e[2]>>>16,e[1],e[0]<<16|e[3]>>>16,e[2],e[1]<<16|e[0]>>>16,e[3],e[2]<<16|e[1]>>>16],r=this._C=[e[2]<<16|e[2]>>>16,e[0]&4294901760|e[1]&65535,e[3]<<16|e[3]>>>16,e[1]&4294901760|e[2]&65535,e[0]<<16|e[0]>>>16,e[2]&4294901760|e[3]&65535,e[1]<<16|e[1]>>>16,e[3]&4294901760|e[0]&65535];this._b=0;for(var i=0;i<4;i++)c.call(this);for(var i=0;i<8;i++)r[i]^=n[i+4&7];if(t){var a=t.words,o=a[0],s=a[1],l=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,u=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360,d=l>>>16|u&4294901760,f=u<<16|l&65535;r[0]^=l,r[1]^=d,r[2]^=u,r[3]^=f,r[4]^=l,r[5]^=d,r[6]^=u,r[7]^=f;for(var i=0;i<4;i++)c.call(this)}},_doProcessBlock:function(e,t){var n=this._X;c.call(this),i[0]=n[0]^n[5]>>>16^n[3]<<16,i[1]=n[2]^n[7]>>>16^n[5]<<16,i[2]=n[4]^n[1]>>>16^n[7]<<16,i[3]=n[6]^n[3]>>>16^n[1]<<16;for(var r=0;r<4;r++)i[r]=(i[r]<<8|i[r]>>>24)&16711935|(i[r]<<24|i[r]>>>8)&4278255360,e[t+r]^=i[r]},blockSize:128/32,ivSize:64/32});function c(){for(var e=this._X,t=this._C,n=0;n<8;n++)a[n]=t[n];t[0]=t[0]+1295307597+this._b|0,t[1]=t[1]+3545052371+ +(t[0]>>>0<a[0]>>>0)|0,t[2]=t[2]+886263092+ +(t[1]>>>0<a[1]>>>0)|0,t[3]=t[3]+1295307597+ +(t[2]>>>0<a[2]>>>0)|0,t[4]=t[4]+3545052371+ +(t[3]>>>0<a[3]>>>0)|0,t[5]=t[5]+886263092+ +(t[4]>>>0<a[4]>>>0)|0,t[6]=t[6]+1295307597+ +(t[5]>>>0<a[5]>>>0)|0,t[7]=t[7]+3545052371+ +(t[6]>>>0<a[6]>>>0)|0,this._b=+(t[7]>>>0<a[7]>>>0);for(var n=0;n<8;n++){var r=e[n]+t[n],i=r&65535,s=r>>>16;o[n]=((i*i>>>17)+i*s>>>15)+s*s^((r&4294901760)*r|0)+((r&65535)*r|0)}e[0]=o[0]+(o[7]<<16|o[7]>>>16)+(o[6]<<16|o[6]>>>16)|0,e[1]=o[1]+(o[0]<<8|o[0]>>>24)+o[7]|0,e[2]=o[2]+(o[1]<<16|o[1]>>>16)+(o[0]<<16|o[0]>>>16)|0,e[3]=o[3]+(o[2]<<8|o[2]>>>24)+o[1]|0,e[4]=o[4]+(o[3]<<16|o[3]>>>16)+(o[2]<<16|o[2]>>>16)|0,e[5]=o[5]+(o[4]<<8|o[4]>>>24)+o[3]|0,e[6]=o[6]+(o[5]<<16|o[5]>>>16)+(o[4]<<16|o[4]>>>16)|0,e[7]=o[7]+(o[6]<<8|o[6]>>>24)+o[5]|0}t.RabbitLegacy=n._createHelper(s)})(),e.RabbitLegacy})})),He=o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),pe(),he(),Te(),V()):typeof define==`function`&&define.amd?define([`./core`,`./enc-base64`,`./md5`,`./evpkdf`,`./cipher-core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.BlockCipher,r=t.algo;let i=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],a=[[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946],[1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055],[3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504],[976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462]];var o={pbox:[],sbox:[]};function s(e,t){let n=t>>24&255,r=t>>16&255,i=t>>8&255,a=t&255,o=e.sbox[0][n]+e.sbox[1][r];return o^=e.sbox[2][i],o+=e.sbox[3][a],o}function c(e,t,n){let r=t,i=n,a;for(let t=0;t<16;++t)r^=e.pbox[t],i=s(e,r)^i,a=r,r=i,i=a;return a=r,r=i,i=a,i^=e.pbox[16],r^=e.pbox[17],{left:r,right:i}}function l(e,t,n){let r=t,i=n,a;for(let t=17;t>1;--t)r^=e.pbox[t],i=s(e,r)^i,a=r,r=i,i=a;return a=r,r=i,i=a,i^=e.pbox[1],r^=e.pbox[0],{left:r,right:i}}function u(e,t,n){for(let t=0;t<4;t++){e.sbox[t]=[];for(let n=0;n<256;n++)e.sbox[t][n]=a[t][n]}let r=0;for(let a=0;a<18;a++)e.pbox[a]=i[a]^t[r],r++,r>=n&&(r=0);let o=0,s=0,l=0;for(let t=0;t<18;t+=2)l=c(e,o,s),o=l.left,s=l.right,e.pbox[t]=o,e.pbox[t+1]=s;for(let t=0;t<4;t++)for(let n=0;n<256;n+=2)l=c(e,o,s),o=l.left,s=l.right,e.sbox[t][n]=o,e.sbox[t][n+1]=s;return!0}var d=r.Blowfish=n.extend({_doReset:function(){if(this._keyPriorReset!==this._key){var e=this._keyPriorReset=this._key,t=e.words;u(o,t,e.sigBytes/4)}},encryptBlock:function(e,t){var n=c(o,e[t],e[t+1]);e[t]=n.left,e[t+1]=n.right},decryptBlock:function(e,t){var n=l(o,e[t],e[t+1]);e[t]=n.left,e[t+1]=n.right},blockSize:64/32,keySize:128/32,ivSize:64/32});t.Blowfish=n._createHelper(d)})(),e.Blowfish})})),Ue=c(o(((e,t)=>{(function(n,r,i){typeof e==`object`?t.exports=e=r(B(),ue(),de(),fe(),pe(),me(),he(),ge(),_e(),ve(),ye(),be(),xe(),Se(),Ce(),we(),Te(),V(),Ee(),De(),Oe(),ke(),Ae(),je(),Me(),Ne(),Pe(),Fe(),Ie(),Le(),Re(),ze(),Be(),Ve(),He()):typeof define==`function`&&define.amd?define(`./core,./x64-core,./lib-typedarrays,./enc-utf16,./enc-base64,./enc-base64url,./md5,./sha1,./sha256,./sha224,./sha512,./sha384,./sha3,./ripemd160,./hmac,./pbkdf2,./evpkdf,./cipher-core,./mode-cfb,./mode-ctr,./mode-ctr-gladman,./mode-ofb,./mode-ecb,./pad-ansix923,./pad-iso10126,./pad-iso97971,./pad-zeropadding,./pad-nopadding,./format-hex,./aes,./tripledes,./rc4,./rabbit,./rabbit-legacy,./blowfish`.split(`,`),r):n.CryptoJS=r(n.CryptoJS)})(e,function(e){return e})}))(),1),H=`https://vybrnhyaeugfwezbygdt.supabase.co`,We=`sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9`,Ge=`ryzin_super_secret_salt_2026`;function Ke(){return{users:[{id:`admin`,name:`최고관리자 (데모)`,password:Ue.default.SHA256(`1234`).toString(),role:`admin`},{id:`demo`,name:`데모 시연 계정`,password:Ue.default.SHA256(`demo`).toString(),role:`demo`}],currentUser:null,hosts:[{id:`h_demo_1`,name:`김주호`,phone:`010-1234-5678`,bank:`신한`,account:`110-123-456789`,ssn:`920101-1234567`,address:`서울시 강남구 테헤란로`,createdAt:`2026-07-01`,memo:{features:`활발함, 패션/가전 전문`,comment:`시연용 쇼호스트 A`}},{id:`h_demo_2`,name:`이미소`,phone:`010-5555-6666`,bank:`국민`,account:`4567-02-123456`,ssn:`950505-2345678`,address:`경기도 성남시 분당구`,createdAt:`2026-07-01`,memo:{features:`목소리 톤 좋음, 뷰티/리빙 전문`,comment:`시연용 쇼호스트 B`}},{id:`h_demo_3`,name:`최성우`,phone:`010-9999-8888`,bank:`우리`,account:`1002-123-456789`,ssn:`900808-1357924`,address:`인천시 부평구`,createdAt:`2026-07-01`,memo:{features:`신뢰감 있는 진행, 테크/식품 전문`,comment:`시연용 쇼호스트 C`}}],brands:[{id:`b_demo_1`,name:`아우라뷰티`,category:`뷰티`,manager:`홍길동 팀장`,phone:`010-1111-2222`,email:`aura@beauty.com`,taxInvoice:!0,createdAt:`2026-07-01`},{id:`b_demo_2`,name:`헬시푸드코리아`,category:`식품`,manager:`김철수 과장`,phone:`010-3333-4444`,email:`healthy@food.com`,taxInvoice:!0,createdAt:`2026-07-01`},{id:`b_demo_3`,name:`모던테크컴퍼니`,category:`가전`,manager:`박영희 대리`,phone:`010-5555-7777`,email:`modern@tech.com`,taxInvoice:!1,createdAt:`2026-07-01`}],projects:[{id:`p_demo_1`,brandId:`b_demo_1`,adName:`아우라뷰티 수분크림 런칭`,category:`뷰티`,broadcastDate:`2026-07-20`,broadcastTime:`20:00`,broadcastMonth:`2026-07`,platform:`NAVER`,liveUrl:`https://shoppinglive.naver.com`,pd:`강동원 PD`,designer:`김태희 디자이너`,cuesheetLink:``,note:`신제품 출시 시연 방송`,status:`settle_done`,createdAt:`2026-07-10`},{id:`p_demo_2`,brandId:`b_demo_2`,adName:`헬시푸드 밀키트 초특가전`,category:`식품`,broadcastDate:`2026-07-21`,broadcastTime:`19:00`,broadcastMonth:`2026-07`,platform:`GRIP`,liveUrl:`https://grip.show`,pd:`송중기 PD`,designer:``,cuesheetLink:``,note:`캠핑 특가 패키지`,status:`settle_done`,createdAt:`2026-07-10`},{id:`p_demo_3`,brandId:`b_demo_3`,adName:`모던테크 무선청소기 시연`,category:`가전`,broadcastDate:`2026-07-25`,broadcastTime:`21:00`,broadcastMonth:`2026-07`,platform:`NAVER`,liveUrl:`https://shoppinglive.naver.com`,pd:`강동원 PD`,designer:`김태희 디자이너`,cuesheetLink:``,note:`흡입력 테스트 시연 방송`,status:`design`,createdAt:`2026-07-10`},{id:`p_demo_4`,brandId:`b_demo_1`,adName:`뷰티 에센스 2차 앵콜 방송`,category:`뷰티`,broadcastDate:`2026-07-28`,broadcastTime:`11:00`,broadcastMonth:`2026-07`,platform:`NAVER`,liveUrl:`https://shoppinglive.naver.com`,pd:`송중기 PD`,designer:``,cuesheetLink:``,note:`앵콜 요청에 따른 추가 방송`,status:`cue_sheet`,createdAt:`2026-07-10`},{id:`p_demo_5`,brandId:`b_demo_2`,adName:`헬시푸드 단백질 쉐이크 쇼`,category:`식품`,broadcastDate:`2026-07-30`,broadcastTime:`15:00`,broadcastMonth:`2026-07`,platform:`GRIP`,liveUrl:`https://grip.show`,pd:`강동원 PD`,designer:``,cuesheetLink:``,note:`단백질 보충제 시연`,status:`host_cast`,createdAt:`2026-07-10`}],tasks:[{id:`t_demo_1`,projectId:`p_demo_3`,title:`청소기 배너 이미지 디자인`,assignee:`designer`,dueDate:`2026-07-22`,status:`pending`},{id:`t_demo_2`,projectId:`p_demo_4`,title:`에센스 2차 큐시트 작성`,assignee:`pd`,dueDate:`2026-07-26`,status:`completed`}],liveHosts:[{id:`lh_demo_1`,projectId:`p_demo_1`,hostId:`h_demo_2`,fee:3e5,type:`main`},{id:`lh_demo_2`,projectId:`p_demo_2`,hostId:`h_demo_3`,fee:25e4,type:`main`},{id:`lh_demo_3`,projectId:`p_demo_3`,hostId:`h_demo_1`,fee:4e5,type:`main`}],contracts:[{id:`c_demo_1`,projectId:`p_demo_1`,hostId:`h_demo_2`,status:`signed`,signDate:`2026-07-11`},{id:`c_demo_2`,projectId:`p_demo_2`,hostId:`h_demo_3`,status:`signed`,signDate:`2026-07-11`}],products:[{id:`pr_demo_1`,projectId:`p_demo_1`,name:`아우라 수분크림 50ml`,price:29e3,commission:15},{id:`pr_demo_2`,projectId:`p_demo_2`,name:`부대찌개 캠핑 밀키트 3인분`,price:18900,commission:10}],designs:[{id:`d_demo_1`,projectId:`p_demo_3`,title:`메인 썸네일`,link:`https://example.com/thumb.jpg`,status:`confirm`}],results:[{id:`r_demo_1`,projectId:`p_demo_1`,salesAmount:45e5,viewerCount:1200,buyerCount:150},{id:`r_demo_2`,projectId:`p_demo_2`,salesAmount:32e5,viewerCount:850,buyerCount:110}],finances:[{id:`f_demo_1`,month:`2026-07`,sales:77e5,cost:35e5,profit:42e5},{id:`f_demo_2`,month:`2026-06`,sales:62e5,cost:28e5,profit:34e5}],crmClients:[{id:`crm_demo_1`,companyName:`(주)데모코스메틱`,contactName:`원빈 부장`,phone:`010-4444-3333`,email:`wb@democos.com`,source:`자사몰 인바운드`,interestedService:`라이브 풀패키지`,status:`new`,category:`A`,memo:`신규 런칭 브랜드 시연용 데이터`,lastContactDate:`2026-07-09`,createdAt:`2026-07-09`}],crmActivities:[{id:`act_demo_1`,clientId:`crm_demo_1`,date:`2026-07-09`,type:`phone`,content:`첫 전화 통화 상담 완료. 가상 견적서 송부 요청 받음.`,followUpDate:`2026-07-15`,createdAt:`2026-07-09`}],classApplications:[{id:1,name:`김태희`,phone:`010-1234-5678`,answers:{이름:`김태희`,전화번호:`010-1234-5678`,"수강 기수 선택":`1기 - 2026년 8월 10일 (월) 19:00`,"크리에이터가 되고 싶은 이유":`유튜브 채널을 시작해서 퍼스널 브랜딩을 하고 싶습니다.`},photo_url:``,created_at:`2026-07-28T10:00:00Z`},{id:2,name:`이순신`,phone:`010-9876-5432`,answers:{이름:`이순신`,전화번호:`010-9876-5432`,"수강 기수 선택":`2기 - 2026년 8월 17일 (월) 19:00`,"크리에이터가 되고 싶은 이유":`실전 라이브커머스 판매 노하우를 배우고 싶습니다.`},photo_url:``,created_at:`2026-07-28T11:30:00Z`}],surveyQuestions:[{id:1,type:`select`,label:`수강 기수 선택`,placeholder:`기수를 선택해 주세요`,options:`1기 - 2026년 8월 10일 (월) 19:00,2기 - 2026년 8월 17일 (월) 19:00,3기 - 2026년 8월 24일 (월) 19:00,4기 - 2026년 8월 31일 (월) 19:00`,required:!0,sort_order:1},{id:2,type:`text`,label:`이름`,placeholder:`실명을 입력해 주세요`,options:``,required:!0,sort_order:2},{id:3,type:`tel`,label:`전화번호`,placeholder:`010-0000-0000`,options:``,required:!0,sort_order:3},{id:4,type:`text`,label:`이메일 주소`,placeholder:`example@email.com`,options:``,required:!0,sort_order:4},{id:5,type:`textarea`,label:`크리에이터가 되고 싶은 이유`,placeholder:`이유와 목표를 상세히 적어주세요.`,options:``,required:!0,sort_order:5},{id:6,type:`file`,label:`사진 첨부`,placeholder:``,options:``,required:!1,sort_order:6}],currentRole:`admin`}}var U=new class{constructor(){this.isDemoMode=localStorage.getItem(`ryzin_is_demo_mode`)===`true`,this.STORAGE_KEY=this.isDemoMode?`livecommerce_erp_demo_data`:`livecommerce_erp_data`,this._data={users:[],currentUser:null,hosts:[],brands:[],projects:[],tasks:[],liveHosts:[],contracts:[],products:[],designs:[],results:[],finances:[],crmClients:[],crmActivities:[],classApplications:[],surveyQuestions:[],currentRole:`admin`},this._listeners={},this._sheetDBReady=!1,this._load()}_load(){try{let e=localStorage.getItem(this.STORAGE_KEY);e&&(this._data={...this._data,...JSON.parse(e)})}catch(e){console.warn(`데이터 로드 실패:`,e)}}_save(){try{localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this._data))}catch(e){console.warn(`데이터 저장 실패:`,e)}}async init(){if(this.isDemoMode){if(this._data.users.length===0){let e=Ke();this._data={...this._data,...e},this._save()}return!0}try{let e={apikey:We,Authorization:`Bearer ${We}`},[t,n,r,i,a,o,s,c]=await Promise.all([fetch(`${H}/rest/v1/users?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/hosts?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/brands?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/live_broadcasts?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/crm_clients?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/crm_activities?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/ryzin_class_applications?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/ryzin_class_survey_questions?select=*`,{headers:e}).catch(()=>null)]),l=t&&t.ok?await t.json():[],u=n&&n.ok?await n.json():[],d=r&&r.ok?await r.json():[],f=i&&i.ok?await i.json():[],p=a&&a.ok?await a.json():[],m=o&&o.ok?await o.json():[],h=s&&s.ok?await s.json():[],g=c&&c.ok?await c.json():[],_=l.length===0&&u.length===0&&d.length===0&&f.length===0,v=this._data.brands&&this._data.brands.length>0||this._data.hosts&&this._data.hosts.length>0||this._data.projects&&this._data.projects.length>0;return _&&v&&(console.log(`🔄 Supabase가 비어있어 로컬 캐시 데이터 마이그레이션을 시작합니다...`),await this._migrateLocalToSupabase(),[t,n,r,i,a,o,s,c]=await Promise.all([fetch(`${H}/rest/v1/users?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/hosts?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/brands?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/live_broadcasts?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/crm_clients?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/crm_activities?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/ryzin_class_applications?select=*`,{headers:e}).catch(()=>null),fetch(`${H}/rest/v1/ryzin_class_survey_questions?select=*`,{headers:e}).catch(()=>null)]),l=t&&t.ok?await t.json():[],u=n&&n.ok?await n.json():[],d=r&&r.ok?await r.json():[],f=i&&i.ok?await i.json():[],p=a&&a.ok?await a.json():[],m=o&&o.ok?await o.json():[],h=s&&s.ok?await s.json():[],g=c&&c.ok?await c.json():[]),this._parseSheetData(l,u,d,f,p,m,h,g),this._sheetDBReady=!0,!0}catch(e){return console.error(`Supabase 연동 실패:`,e),!1}}async _migrateLocalToSupabase(){let e={apikey:We,Authorization:`Bearer ${We}`,"Content-Type":`application/json`,Prefer:`resolution=merge-duplicates`};try{if(this._data.users&&this._data.users.length>0){let t=this._data.users.map(e=>({id:e.id,password:e.password,name:e.name,role:e.role,otp_secret:e.otpSecret||``}));await fetch(`${H}/rest/v1/users`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}if(this._data.hosts&&this._data.hosts.length>0){let t=this._data.hosts.map(e=>({id:e.id,name:e.name,phone:e.phone,ssn:e.ssn,bank:e.bank,account:e.account,account_holder:e.accountHolder,address:e.address,memo:e.memo?e.memo.features:``}));await fetch(`${H}/rest/v1/hosts`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}if(this._data.brands&&this._data.brands.length>0){let t=this._data.brands.map(e=>({id:e.id,name:e.name,company_name:e.companyName,category:e.category,tax_invoice:e.taxInvoice===!0,manager:e.manager,phone:e.phone,email:e.email,business_no:e.businessNo,address:e.address,memo:e.memo}));await fetch(`${H}/rest/v1/brands`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}if(this._data.crmClients&&this._data.crmClients.length>0){let t=this._data.crmClients.map(e=>({id:e.id,company_name:e.companyName,contact_name:e.contactName,phone:e.phone,email:e.email,status:e.status,category:e.category,interested_service:e.interestedService,source:e.source,memo:e.memo,last_contact_date:e.lastContactDate,created_at:e.createdAt}));await fetch(`${H}/rest/v1/crm_clients`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}if(this._data.crmActivities&&this._data.crmActivities.length>0){let t=this._data.crmActivities.map(e=>({id:e.id,client_id:e.clientId,date:e.date,type:e.type,content:e.content,follow_up_date:e.followUpDate,created_at:e.createdAt}));await fetch(`${H}/rest/v1/crm_activities`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}if(this._data.projects&&this._data.projects.length>0){let t=this._data.projects.map(e=>{let t=e.id,n=this.getById(`results`,t)||{},r=this.getById(`finances`,t)||{},i=this.query(`liveHosts`,e=>e.liveId===t),a=i[0]?this.getById(`hosts`,i[0].hostId):null,o=i[1]?this.getById(`hosts`,i[1].hostId):null,s=R(e.broadcastStatus),c=z(e.settleStatus);return{id:t,status:s,brand_name:e.brandName||``,category:e.category||``,broadcast_month:e.broadcastMonth||``,broadcast_date:e.broadcastDate||``,broadcast_time:e.broadcastTime||``,platform:e.platform||``,live_url:e.liveUrl||``,pd:e.pd||``,designer:e.designer||``,views:n.views||0,live_revenue:n.liveRevenue||0,host_a:a?a.name:``,fee_a:i[0]&&i[0].fee||0,host_b:o?o.name:``,fee_b:i[1]&&i[1].fee||0,settle_status:c,ad_cost:r.adCost||0,production_cost:r.productionCost||0,sales_revenue:r.salesRevenue||0,operating_profit:r.operatingProfit||0,net_margin:r.netMargin||0,note:e.note||``}});await fetch(`${H}/rest/v1/live_broadcasts`,{method:`POST`,headers:e,body:JSON.stringify(t)}).catch(()=>null)}console.log(`✅ 로컬 캐시 데이터 Supabase 마이그레이션 완료!`)}catch(e){console.warn(`로컬 데이터 마이그레이션 실패:`,e)}}_parseNum(e){return e&&parseInt(e.toString().replace(/,/g,``),10)||0}_parseSheetData(e,t,n,r,i,a,o,s){let c=[],l=[],u=[],d=[],f=[],p=[],m=[],h=[],g=[],_=[],v=[],y=1,b=Array.isArray(e)?e:[],x=Array.isArray(t)?t:[],S=Array.isArray(n)?n:[],C=Array.isArray(r)?r:[],w=Array.isArray(i)?i:[],T=Array.isArray(a)?a:[],E=Array.isArray(o)?o:[],D=Array.isArray(s)?s:[];b.forEach(e=>{e.id&&c.push({id:e.id,password:e.password||``,name:e.name||``,role:e.role||`pd`,otpSecret:e.otp_secret||``})}),x.forEach(e=>{e.name&&l.push({id:e.id||`h_`+e.name,name:e.name,phone:e.phone||``,ssn:e.ssn||``,bank:e.bank||``,account:e.account||``,accountHolder:e.account_holder||``,address:e.address||``,memo:{features:e.memo||``,strengths:``,weaknesses:``,style:``,brandPreference:``,caution:``,comment:``},createdAt:`2025-01-01`})}),S.forEach(e=>{e.name&&u.push({id:e.id||`b_`+e.name,name:e.name,companyName:e.company_name||``,category:e.category||``,taxInvoice:e.tax_invoice===!0,manager:e.manager||``,phone:e.phone||``,email:e.email||``,businessNo:e.business_no||``,address:e.address||``,memo:e.memo||``,createdAt:`2025-01-01`})}),w.forEach(e=>{e.id&&h.push({id:e.id,companyName:e.company_name||``,contactName:e.contact_name||``,phone:e.phone||``,email:e.email||``,status:e.status||``,category:e.category||``,interestedService:e.interested_service||``,source:e.source||``,memo:e.memo||``,lastContactDate:e.last_contact_date||``,createdAt:e.created_at||``})}),T.forEach(e=>{e.id&&g.push({id:e.id,clientId:e.client_id||``,date:e.date||``,type:e.type||``,content:e.content||``,followUpDate:e.follow_up_date||``,createdAt:e.created_at||``})}),E.forEach(e=>{e.id&&_.push({id:e.id,name:e.name||``,phone:e.phone||``,answers:e.answers||{},photo_url:e.photo_url||``,created_at:e.created_at||``})}),D.forEach(e=>{e.id&&v.push({id:e.id,type:e.type||`text`,label:e.label||``,placeholder:e.placeholder||``,options:e.options||``,required:e.required===!0,sort_order:this._parseNum(e.sort_order)})}),C.forEach(e=>{if(!e.id)return;let t=e.id,n=`b_`+e.brand_name;d.push({id:t,brandId:n,brandName:e.brand_name||``,category:e.category||``,broadcastMonth:e.broadcast_month||``,broadcastDate:e.broadcast_date||``,broadcastTime:e.broadcast_time||``,platform:e.platform||``,liveUrl:e.live_url||``,pd:e.pd||``,designer:e.designer||``,broadcastStatus:se(e.status),settleStatus:ce(e.settle_status),note:e.note||``,createdAt:e.broadcast_date||`2025-01-01`}),e.host_a&&f.push({id:`lh`+ y++,liveId:t,hostId:`h_`+e.host_a,role:`main`,fee:this._parseNum(e.fee_a),settleStatus:ce(e.settle_status),memo:``}),e.host_b&&f.push({id:`lh`+ y++,liveId:t,hostId:`h_`+e.host_b,role:`guest`,fee:this._parseNum(e.fee_b),settleStatus:ce(e.settle_status),memo:``});let r=this._parseNum(e.live_revenue),i=this._parseNum(e.ad_cost)+this._parseNum(e.production_cost)+this._parseNum(e.fee_a)+this._parseNum(e.fee_b),a=i>0?r/i:0;p.push({id:t,liveId:t,views:this._parseNum(e.views),likes:0,orders:0,liveRevenue:r,roi:a}),m.push({id:t,liveId:t,adCost:this._parseNum(e.ad_cost),productionCost:this._parseNum(e.production_cost),hostCost:this._parseNum(e.fee_a)+this._parseNum(e.fee_b),otherCost:0,salesRevenue:this._parseNum(e.sales_revenue),operatingProfit:this._parseNum(e.operating_profit),vat:0,netMargin:this._parseNum(e.net_margin)})}),c.length>0&&(this._data.users=c),this._data.hosts=l,this._data.brands=u,this._data.projects=d,this._data.liveHosts=f,this._data.results=p,this._data.finances=m,this._data.crmClients=h,this._data.crmActivities=g,this._data.classApplications=_,this._data.surveyQuestions=v,this._save()}async _syncToSheetDB(e,t,n){if(this._sheetDBReady)try{let r=``,i=null,a=`POST`;if(e===`users`)r=`/rest/v1/users`,t===`update`&&(a=`PATCH`,r=`/rest/v1/users?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/users?id=eq.${n.id}`),i={id:n.id,password:n.password,name:n.name,role:n.role,otp_secret:n.otpSecret||``};else if(e===`hosts`)r=`/rest/v1/hosts`,t===`update`&&(a=`PATCH`,r=`/rest/v1/hosts?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/hosts?id=eq.${n.id}`),i={id:n.id,name:n.name,phone:n.phone,ssn:n.ssn,bank:n.bank,account:n.account,account_holder:n.accountHolder,address:n.address,memo:n.memo.features};else if(e===`brands`)r=`/rest/v1/brands`,t===`update`&&(a=`PATCH`,r=`/rest/v1/brands?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/brands?id=eq.${n.id}`),i={id:n.id,name:n.name,company_name:n.companyName,category:n.category,tax_invoice:n.taxInvoice===!0,manager:n.manager,phone:n.phone,email:n.email,business_no:n.businessNo,address:n.address,memo:n.memo};else if(e===`crmClients`)r=`/rest/v1/crm_clients`,t===`update`&&(a=`PATCH`,r=`/rest/v1/crm_clients?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/crm_clients?id=eq.${n.id}`),i={id:n.id,company_name:n.companyName,contact_name:n.contactName,phone:n.phone,email:n.email,status:n.status,category:n.category,interested_service:n.interestedService,source:n.source,memo:n.memo,last_contact_date:n.lastContactDate,created_at:n.createdAt};else if(e===`crmActivities`)r=`/rest/v1/crm_activities`,t===`update`&&(a=`PATCH`,r=`/rest/v1/crm_activities?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/crm_activities?id=eq.${n.id}`),i={id:n.id,client_id:n.clientId,date:n.date,type:n.type,content:n.content,follow_up_date:n.followUpDate,created_at:n.createdAt};else if(e===`classApplications`)r=`/rest/v1/ryzin_class_applications`,t===`update`&&(a=`PATCH`,r=`/rest/v1/ryzin_class_applications?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/ryzin_class_applications?id=eq.${n.id}`),i={id:n.id,name:n.name,phone:n.phone,answers:n.answers,photo_url:n.photo_url,created_at:n.created_at};else if(e===`surveyQuestions`)r=`/rest/v1/ryzin_class_survey_questions`,t===`update`&&(a=`PATCH`,r=`/rest/v1/ryzin_class_survey_questions?id=eq.${n.id}`),t===`delete`&&(a=`DELETE`,r=`/rest/v1/ryzin_class_survey_questions?id=eq.${n.id}`),i={id:n.id,type:n.type,label:n.label,placeholder:n.placeholder,options:n.options,required:n.required===!0,sort_order:n.sort_order};else if([`projects`,`results`,`finances`,`liveHosts`].includes(e)){let o=n.liveId||n.id;if(r=`/rest/v1/live_broadcasts`,t===`delete`&&e===`projects`)a=`DELETE`,r=`/rest/v1/live_broadcasts?id=eq.${o}`,i=null;else{let e=this.getById(`projects`,o);if(!e&&t!==`delete`)return;let n=e?this.getById(`brands`,e.brandId):null,r=this.getById(`results`,o)||{},s=this.getById(`finances`,o)||{},c=this.query(`liveHosts`,e=>e.liveId===o),l=c[0]?this.getById(`hosts`,c[0].hostId):null,u=c[1]?this.getById(`hosts`,c[1].hostId):null,d=e?e.broadcastStatus:`new`,f=e?e.settleStatus:`wait`,p=R(d),m=z(f);i={id:o,status:p,brand_name:e?e.brandName||(n?n.name:``):``,category:e?e.category:``,broadcast_month:e?e.broadcastMonth:``,broadcast_date:e?e.broadcastDate:``,broadcast_time:e?e.broadcastTime:``,platform:e?e.platform:``,live_url:e?e.liveUrl:``,pd:e?e.pd:``,designer:e?e.designer:``,views:r.views||0,live_revenue:r.liveRevenue||0,host_a:l?l.name:``,fee_a:c[0]&&c[0].fee||0,host_b:u?u.name:``,fee_b:c[1]&&c[1].fee||0,settle_status:m,ad_cost:s.adCost||0,production_cost:s.productionCost||0,sales_revenue:s.salesRevenue||0,operating_profit:s.operatingProfit||0,net_margin:s.netMargin||0,note:e?e.note:``},a=`POST`}}let o={apikey:We,Authorization:`Bearer ${We}`,"Content-Type":`application/json`};a===`POST`&&[`live_broadcasts`,`users`,`hosts`,`brands`,`crm_clients`,`crm_activities`].some(e=>r.includes(e))&&(o.Prefer=`resolution=merge-duplicates`),i?await fetch(`${H}${r}`,{method:a,headers:o,body:JSON.stringify(i)}):a===`DELETE`&&await fetch(`${H}${r}`,{method:`DELETE`,headers:{apikey:We,Authorization:`Bearer ${We}`}})}catch(e){console.error(`Supabase 동기화 에러:`,e)}}on(e,t){return this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t),()=>{this._listeners[e]=this._listeners[e].filter(e=>e!==t)}}_emit(e,t){this._listeners[e]&&this._listeners[e].forEach(e=>e(t)),this._listeners.change&&this._listeners.change.forEach(n=>n({event:e,data:t}))}getAll(e){return[...this._data[e]||[]]}getById(e,t){return(this._data[e]||[]).find(e=>e.id===t)||null}query(e,t){return(this._data[e]||[]).filter(t)}createBulk(e,t){return this._data[e]?(this._data[e].push(...t),this._save(),this._emit(e+`:changed`),this.isDemoMode||this._syncBulkToSheetDB(e,t).catch(e=>console.error(`SheetDB 대량 연동 실패:`,e)),!0):!1}async _syncBulkToSheetDB(e,t){if(!(!this._sheetDBReady||t.length===0))try{let n=``,r=[];if(e===`crmClients`&&(n=`/rest/v1/crm_clients`,r=t.map(e=>({id:e.id||``,company_name:e.companyName||``,contact_name:e.contactName||``,phone:e.phone||``,email:e.email||``,status:e.status||``,category:e.category||``,interested_service:e.interestedService||``,source:e.source||``,memo:e.memo||``,last_contact_date:e.lastContactDate||``,created_at:e.createdAt||``}))),!n)return;let i={apikey:We,Authorization:`Bearer ${We}`,"Content-Type":`application/json`,Prefer:`resolution=merge-duplicates`};await fetch(`${H}${n}`,{method:`POST`,headers:i,body:JSON.stringify(r)})}catch(e){console.error(`대량 저장 오류:`,e)}}create(e,t){return this._data[e]||(this._data[e]=[]),this._data[e].push(t),this._save(),this._emit(`${e}:created`,t),this._emit(`${e}:changed`),this._syncToSheetDB(e,`create`,t),t}update(e,t,n){let r=this._data[e]||[],i=r.findIndex(e=>e.id===t);return i===-1?null:(r[i]={...r[i],...n,updatedAt:new Date().toISOString()},this._save(),this._emit(`${e}:updated`,r[i]),this._emit(`${e}:changed`),this._syncToSheetDB(e,`update`,r[i]),r[i])}delete(e,t){let n=this._data[e]||[],r=n.findIndex(e=>e.id===t);if(r===-1)return!1;let i=n.splice(r,1)[0];return this._save(),this._emit(`${e}:deleted`,i),this._emit(`${e}:changed`),this._syncToSheetDB(e,`delete`,i),!0}getHostStats(e){let t=this.query(`liveHosts`,t=>t.hostId===e),n=t.map(e=>e.liveId),r=this.getAll(`projects`).filter(e=>n.includes(e.id)),i=this.getAll(`results`).filter(e=>n.includes(e.liveId)),a=r.length,o=new Date,s=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,`0`)}`,c=r.filter(e=>e.broadcastMonth===s).length,l=t.filter(e=>e.settleStatus===`done`).reduce((e,t)=>e+(t.fee||0),0),u=i.reduce((e,t)=>e+(t.liveRevenue||0),0),d=a>0?u/a:0,f=this.getAll(`finances`).filter(e=>n.includes(e.liveId)).reduce((e,t)=>e+(t.adCost||0)+(t.productionCost||0)+(t.hostCost||0)+(t.otherCost||0),0),p=f>0?u/f:0,m=r.filter(e=>e.broadcastDate).sort((e,t)=>t.broadcastDate.localeCompare(e.broadcastDate))[0];return{totalBroadcasts:a,monthBroadcasts:c,totalSettlement:l,avgRevenue:d,avgROI:p,lastBroadcastDate:m?m.broadcastDate:null}}getBrandStats(e){let t=this.getById(`brands`,e),n=this.query(`projects`,n=>n.brandId===e||t&&n.brandName===t.name),r=n.map(e=>e.id),i=this.getAll(`results`).filter(e=>r.includes(e.liveId)),a=this.getAll(`finances`).filter(e=>r.includes(e.liveId)),o=i.reduce((e,t)=>e+(t.liveRevenue||0),0),s=a.reduce((e,t)=>e+(t.adCost||0)+(t.productionCost||0)+(t.hostCost||0)+(t.otherCost||0),0),c=s>0?o/s:0,l=n.filter(e=>e.broadcastDate).sort((e,t)=>t.broadcastDate.localeCompare(e.broadcastDate))[0];return{totalBroadcasts:n.length,totalRevenue:o,avgROI:c,lastBroadcastDate:l?l.broadcastDate:null}}getDashboardKPI(){let e=this.getAll(`projects`),t=this.getAll(`results`),n=this.getAll(`finances`),r=new Date,i=r.getMonth()+1,a=r.getFullYear(),o=r.getDay(),s=r.getDate()-o+(o===0?-6:1),c=new Date(r.setDate(s));c.setHours(0,0,0,0);let l=new Date(c);l.setDate(c.getDate()+6),l.setHours(23,59,59,999);let u=0,d=[];e.forEach(e=>{if(!e.broadcastDate)return;let t=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(t.getTime())||(t.getFullYear()===a&&t.getMonth()+1===i&&d.push(e.id),t>=c&&t<=l&&u++)});let f=d.length,p=t.filter(e=>d.includes(e.liveId)).reduce((e,t)=>e+(parseInt(t.liveRevenue)||0),0),m=e.filter(e=>e.settleStatus===`pending`||e.settleStatus===`wait`).map(e=>e.id),h=n.filter(e=>m.includes(e.liveId)).reduce((e,t)=>e+(parseInt(t.salesRevenue)||0),0);return{thisWeekBroadcasts:u,monthBroadcasts:f,monthRevenue:p,settleWaitAmount:h}}calcProjectFinance(e){let t=this.query(`liveHosts`,t=>t.liveId===e).reduce((e,t)=>e+(t.brandPays?0:t.fee||0),0),n=this.getById(`finances`,e)||{},r=n.adCost||0,i=n.productionCost||0,a=n.otherCost||0,o=n.salesRevenue||0,s=o-r-i-t-a,c=o*.1;return{hostCost:t,adCost:r,productionCost:i,otherCost:a,salesRevenue:o,operatingProfit:s,vat:c,netMargin:s-c}}hasSeedData(){return this._data.projects&&this._data.projects.length>0}getCurrentUser(){let e=this._data.currentUser,t=this._data.authSignature;return e&&t&&t===Ue.default.SHA256(e.id+Ge).toString()?e:null}getCurrentRole(){return this._data.currentRole||`admin`}setCurrentRole(e){this._data.currentRole=e,this._save(),this._emit(`role:changed`,e)}login(e,t){let n=this.verifyPassword(e,t);return n?(this.completeLogin(n),!0):!1}verifyPassword(e,t){let n=Ue.default.SHA256(t).toString();return(this._data.users||[]).find(t=>t.id===e&&t.password===n)||null}completeLogin(e){this._data.currentUser=e,this._data.currentRole=e.role,this._data.authSignature=Ue.default.SHA256(e.id+Ge).toString(),this._save(),this._emit(`auth:login`,e)}logout(){this._data.currentUser=null,this._data.currentRole=`admin`,this._data.authSignature=null,this._save(),this._emit(`auth:logout`),localStorage.removeItem(this.STORAGE_KEY)}updateUser(e){let t=(this._data.users||[]).findIndex(t=>t.id===e.id);t!==-1&&(this._data.users[t]=e,this._save(),this._syncToSheetDB(`users`,`update`,e))}loginAsDemo(){localStorage.setItem(`ryzin_is_demo_mode`,`true`);let e=JSON.parse(localStorage.getItem(`livecommerce_erp_demo_data`)||`null`);e||=Ke();let t=e.users.find(e=>e.id===`admin`);e.currentUser=t,e.authSignature=Ue.default.SHA256(t.id+Ge).toString(),e.currentRole=`admin`,localStorage.setItem(`livecommerce_erp_demo_data`,JSON.stringify(e)),window.location.reload()}toggleDemoMode(e){let t=this.getCurrentUser(),n=this._data.authSignature,r=this._data.currentRole;localStorage.setItem(`ryzin_is_demo_mode`,e?`true`:`false`);let i=e?`livecommerce_erp_demo_data`:`livecommerce_erp_data`,a=JSON.parse(localStorage.getItem(i)||`null`);a||=Ke(),t&&(a.currentUser=t,a.authSignature=n,a.currentRole=r,a.users.find(e=>e.id===t.id)||a.users.push(t)),localStorage.setItem(i,JSON.stringify(a)),window.location.reload()}resetAll(){localStorage.removeItem(this.STORAGE_KEY),this._data={users:[],currentUser:null,hosts:[],brands:[],projects:[],tasks:[],liveHosts:[],products:[],designs:[],results:[],finances:[],currentRole:`admin`},this._emit(`data:reset`),this.init()}};function qe(){return U.getCurrentRole()}function Je(){let e=qe();if(e&&e.startsWith(`live_stream:`))return[{key:`live_stream`,label:`라이브 송출 관리`},{key:`settings`,label:`설정`}];let t=[{key:`dashboard`,label:`대시보드`},{key:`live_stream`,label:`라이브 송출 관리`},{key:`projects`,label:`라이브 관리`},{key:`hosts`,label:`쇼호스트 관리`},{key:`brands`,label:`브랜드 관리`},{key:`finance`,label:`매출/손익`},{key:`settlement`,label:`정산 관리`},{key:`contracts`,label:`계약 관리`},{key:`marketing`,label:`마케팅 메시지`},{key:`crm`,label:`영업 CRM`},{key:`shop_manage`,label:`쇼핑몰 관리`},{key:`class_applications`,label:`클래스 신청 관리`},{key:`settings`,label:`설정`}];if(e===`admin`)return t;let n=ae[e];return n?t.filter(e=>n.permissions.some(t=>!!(t===`*`||t===e.key||t.startsWith(e.key+`.`)))):[]}var Ye=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAABCCAYAAACijL8SAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAhwSURBVHhe7ZwFyGRVFMd37cJWVMTuTmxdG7tbxBYFsVCxW1HEXURsdO1ODFTUtbC7e1VE7O78/+A9ePuYN+/cO2/um8/vHPjzzXxzbp37nxvnnDcjR7i4BRJaYGTCtrwpt8AIJ5yTIKkFnHBJze2NOeGcA0kt4IRLam5vzAnnHEhqASdcUnN7Y04450BSCzjhkprbG3PCOQeSWsAJl9Tc3pgTzjmQ1AJOuKTm9saccM6BpBZwwiU1tzfmhHMOJLVAmXBzq/U1GujB36rjpwK+1+sPhL861D2X/rdmQJvPSfetAP1cdWu9mMpYbhbpfWnUbVKtOLY5VfEoY+WPSu/jku62ej+Fofxt0vnZoJerTKoXOxj0/5DOjWW9MuGo6HpDZTEqv6nQK8LzwqXCC1klGOVFYRFjpa9LbxmhE3mrqthMH9xprB+1h4R1AvSbUj1UFY3OKttCf283Vgy5binpfq73sxrKXyCdAwx6ucp0evGdQf8H6aA7gaQkXLltvlmHCR8KKwuPCxMbBoIK5c4x6kLoN4R5jfpM8hfCvkb9JtXaINy/GsCGwgPGgQxZwjE+tgG204+EM4UjjIP+UXoLC58Z9E+QzokGPVS+FhYXTh5GhGPcnwhLChx96mRIE47BvS+sIPwqsLUuWjfi7PNr9HfXGl1WNVY3y1mGqnYSOFJcNMwIx9ivEHY32H7IE44xHi+cIqwoPClYt9a1pMuBuUru0AebG4yIyq3CNpnucCQcQ99SwGbd5H9BuK80Qm7IvwinC0cZSfKq9JYTOl0gNtH/7zLWQ/tspZzdkOFKOC4aSwjYo0paI9y96hHbYVGm0ZvZhAWF+Y2TnatxK+MmOZnADRYCWOQQKY0pKU6u99xmrX3YUbo3FOo4X6/3sjTeRYdV2rpS59Vspxc3Z29S3VLLQ7hJ/9i+y7haIxx+LW6aVbKBPrhWmMk4ccUb2vIq85QwiaEs1++FBL6duRynFxz8LcIEM9FNCmMeJ7BaWIXLTbHPbRGO/u4sXFfR8YElHP3dRbjaaPHzpHdgQfdUvT7GWPYq6e2W6bI1vylMaSiLc5eVtEknLxPyoMCXxipnSfHIknKbhPtGfeHL0skLMNCEY3u1uC6w9Vhhj4LR2VrxvHNdtwgREnx5rLocfi3C1sEW0pRMrYruF1YNqLD8RcuLtkk4+nC3sGmHcQw04YgesNpYhBWNrbAoy+rNM4Jla31ZeqyI1otC3VnF0ueiDq4XJikkQnGZ9PcWcL6WpW3C0Z99BKJCRRlowuHuOMk4c3j2L+mgS3nqsQi+PMtWym2UrbTbbczSXq5DfJEIxcYBhTgj4Uf8p6LMIBAOBzs7DI75XAaScKxIXAI4CFsC5gT7OXt92sH4TOazwtIBk1mn2in2WFem6nNuotxwcx+epR7IyUWlWzx4EAjHWB4W1hXyVbg1wl2uThCML8rMerOYsJIwh8XymQ7uEAxcJZAN0kG+XgVy4AZpQiZSJXjo6yIexbbu0xuc0WRTdJNBIRx9PEg4N+tsa4RrYsKog22Q4H2ZvOX6Q7bnqr41vZWGOogfUcc2ysZcZ79BIhxzRIbOO8KQJxw307F11tfnbNNcILhIxEqd7zCk3tFSPjigAH7F9QXyBC2SinBsmWsbOkT/Vxdw7g/J9CTy48jDYmu2CgdYXCW4TEKFQzoOzSYkxEdIeyQlcHu1TFTev1SEw5NAPNqSO3e09IjCWMYxUPlwbC2EpJiIUMH1wYSHCFEIbqWkH/UqxHmJ91qFbBWSDEJvxKkIN2PWv25Ro3ysnDvXywhaN/7WCTdePSQiwA0tz/at63Snz9laWd5DPPlbZe3GtFcsw+G5HLftVud7+pB8P6vzu1hXSsJ9q4a5/OTRmm5jelcfEiuvk9YJh7+JkM8ZAueGXoRznJW0dTdgaz9wgl5sVZYeyaVEP8rPGlirSE246dUxsm94lqIJwYc3bbmiXlLMcQWw0hD+IJQ0KqCXpIeTJh4rM6gg8T6LcJ1nZepFiAlfKeAGsQgrGisbK1yspCYc/SThArdNE9I44co3PgLQhwf09FjpnhagX1RNSTjGydNH1lQjEgFGCZzdepE2CEd/uRTs30vHs7J9JxwTwg0Sf41F8FzjwY7ZXlMRDp8ZZ07rrZjbGy6GlywGqNFpi3AkIBCXtuYSVg2j74SjYbIknggwNuebpQTLwxvFalMQDuLcI1ifh8DA+NmeDhh/N9W2CEefVhNwlViPEJ3GkYRwNMzzkWxDVsGBStw1RPpNuFXUGdKMcHJaBE88qyHunqakTcIxhtAjUnncyQjH43uvCZaUIjqJA3gBoVPgvmry+kk4npHgQWhCOBb5XUqQo6nDdt5m24QjTZ+H1q2p/q0RjoZDY4yhT3/3i3A8oviYYE2LZ6w87UUeXFNCyjs+rLYJx3j48nFEsC4eRRskW+FodHYBl4AlNQn9PwWeSxhvnLV+EQ5XzdnGPvRLDTvgXB0EwjHG2KSJpISjo6HxRmKqexpn0Qk3oaF6+W0RQltEGqqE1Y1nhXlYPUSSEw4vM48RkiNnEZIwyaUjBaZOnHDpCEdLzAvnOeuNnTLJCUejpO9wC7WKNaPDCZeWcLQWetxohXA4TN8W5jEyjngr2b3ccruJEy494fDJjROsvx/YCuEwS8izqegXf+OjinROuPSEo8X5BKIQFv9ka4QjQYDMjpCQFwfUbtkgTrh2CEer+wkXGnYsE+EM9biKWyDeAv6j0vG285IRFnDCRRjNi8RbwAkXbzsvGWEBJ1yE0bxIvAWccPG285IRFnDCRRjNi8RbwAkXbzsvGWEBJ1yE0bxIvAWccPG285IRFnDCRRjNi8RbwAkXbzsvGWEBJ1yE0bxIvAWccPG285IRFvgPwNooYVqDRbQAAAAASUVORK5CYII=`,Xe={live_stream:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12A10 10 0 1 0 12 22a10 10 0 0 0 10-10z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>`,dashboard:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,projects:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,hosts:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,brands:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,finance:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,marketing:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,crm:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,settings:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,shop_manage:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>`},Ze=[{key:`dashboard`,label:`대시보드`,path:`/`,icon:`dashboard`},{key:`projects`,label:`라이브 관리`,path:`/projects`,icon:`projects`},{key:`live_stream`,label:`라이브 송출 관리`,path:`/live_stream`,icon:`live_stream`},{key:`hosts`,label:`쇼호스트 관리`,path:`/hosts`,icon:`hosts`},{key:`brands`,label:`브랜드 관리`,path:`/brands`,icon:`brands`},{key:`finance`,label:`매출/손익`,path:`/finance`,icon:`finance`},{key:`settlement`,label:`정산 관리`,path:`/settlement`,icon:`finance`},{key:`contracts`,label:`계약 관리`,path:`/contracts`,icon:`finance`},{key:`marketing`,label:`마케팅 메시지`,path:`/marketing`,icon:`marketing`},{key:`crm`,label:`영업 CRM`,path:`/crm`,icon:`crm`},{key:`shop_manage`,label:`쇼핑몰 관리`,path:`/shop_manage`,icon:`shop_manage`},{key:`class_applications`,label:`클래스 신청 관리`,path:`/class_applications`,icon:`crm`},{key:`settings`,label:`설정`,path:`/settings`,icon:`settings`}];function Qe(){let e=U.getCurrentUser(),t=ae[U.getCurrentRole()]?.label||`관리자`,n=e?e.name:t,r=Je().map(e=>e.key),i=U.isDemoMode||e&&(e.id===`demo`||e.role===`demo`),a=document.createElement(`aside`);a.className=`sidebar`,a.id=`sidebar`,a.innerHTML=`
    <div class="sidebar-header" style="padding: var(--space-4) var(--space-4); margin-bottom: var(--space-2);">
      <div id="sidebar-logo-container" style="display: flex; align-items: center; justify-content: flex-start; width: 100%; cursor: pointer;">
        <img src="${Ye}" alt="Ryzin Logo" style="height: 32px; object-fit: contain; margin-bottom: 4px;" />
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">
        ${Ze.filter(e=>r.includes(e.key)).filter(e=>!(i&&e.key===`live_stream`)).map(e=>`
            <div class="sidebar-item" data-href="${e.path}" id="nav-${e.key}">
              ${Xe[e.icon]||``}
              <span>${e.label}</span>
            </div>
          `).join(``)}
      </div>
    </nav>
    <div class="sidebar-footer">
      ${U.isDemoMode?`
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
  `;let o=a.querySelector(`#sidebar-logo-container`);o&&o.addEventListener(`click`,()=>{M.navigate(`/`)}),a.querySelectorAll(`.sidebar-item`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-href`);M.navigate(n)})});let s=a.querySelector(`#btn-logout`);return s&&s.addEventListener(`click`,()=>{U.logout(),M.navigate(`/login`)}),a}function W(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(Math.round(e))+`원`}function $e(e){return e==null||isNaN(e)?`-`:Math.abs(e)>=1e8?(e/1e8).toFixed(1).replace(/\.0$/,``)+`억`:Math.abs(e)>=1e4?(e/1e4).toFixed(0)+`만`:W(e)}function et(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(e)}function G(e){return e?e.replace(/\./g,`-`):`-`}function tt(e){return e==null||isNaN(e)?`-`:new Intl.NumberFormat(`ko-KR`).format(Math.round(e*100))+`%`}function nt(e){return e?e.includes(`*`)?e:e.substring(0,6)+`-*******`:`-`}function rt(e){let t=N.find(t=>t.key===e);if(!t)return`<span class="badge badge-default">${e}</span>`;let n=`var(--bg-tertiary)`,r=`var(--text-secondary)`;switch(t.color){case`blue`:n=`#EFF6FF`,r=`#2563EB`;break;case`indigo`:n=`#EEF2FF`,r=`#4F46E5`;break;case`purple`:n=`#FAF5FF`,r=`#9333EA`;break;case`pink`:n=`#FDF2F8`,r=`#DB2777`;break;case`rose`:n=`#FFF1F2`,r=`#E11D48`;break;case`orange`:n=`#FFF7ED`,r=`#EA580C`;break;case`yellow`:n=`#FEFCE8`,r=`#CA8A04`;break;case`teal`:n=`#F0FDFA`,r=`#0D9488`;break;case`red`:n=`#FEF2F2`,r=`#DC2626`;break;case`green`:n=`#ECFDF5`,r=`#059669`;break;case`gray`:n=`#F3F4F6`,r=`#4B5563`;break}return`<span class="badge" style="background:${n}; color:${r};">${t.label}</span>`}function it(e){let t=P.find(t=>t.key===e);if(!t)return`<span class="badge badge-default">${e}</span>`;let n=`var(--bg-tertiary)`,r=`var(--text-secondary)`;switch(t.color){case`orange`:n=`#FFF7ED`,r=`#EA580C`;break;case`green`:n=`#ECFDF5`,r=`#059669`;break}return`<span class="badge" style="background:${n}; color:${r};">${t.label}</span>`}function at(e){return rt(e)}var ot=null;function K({title:e,size:t=`md`,content:n,footer:r,onClose:i}){q();let a=document.createElement(`div`);a.className=`modal-overlay`,a.id=`modal-overlay`,a.innerHTML=`
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
  `,r.appendChild(i),i.querySelector(`.toast-close`).addEventListener(`click`,()=>dt(i)),n>0&&setTimeout(()=>dt(i),n),i}function dt(e){e.classList.add(`removing`),setTimeout(()=>e.remove(),150)}function J(e){return ut(e,`success`)}function Y(e){return ut(e,`error`)}var ft=`in_progress`;function pt(){let e=document.createElement(`div`),t=U.getDashboardKPI(),n=U.getAll(`projects`),r=n;r=ft===`in_progress`?n.filter(e=>![`done`].includes(e.broadcastStatus)):ft===`ended`?n.filter(e=>[`done`].includes(e.broadcastStatus)&&e.settleStatus!==`done`):n;let i=[];return n.filter(e=>e.broadcastStatus!==`done`).forEach(e=>{let t=0;if(e.broadcastStatus===`design`?t=-4:e.broadcastStatus===`cue_sheet`?t=-5:e.broadcastStatus===`host_cast`&&(t=-7),t!==0&&e.broadcastDate){let n=new Date(e.broadcastDate.replace(/\./g,`-`));if(!isNaN(n.getTime())){let r=new Date(n);r.setDate(r.getDate()+t);let a=new Date;a.setHours(0,0,0,0);let o=Math.ceil((r.getTime()-a.getTime())/(1e3*60*60*24)),s=U.getById(`brands`,e.brandId);i.push({project:e,brandName:e.brandName||(s?s.name:`-`),diffDays:o,ddayText:o===0?`D-Day`:o>0?`D-${o}`:`D+${Math.abs(o)}`})}}}),i.sort((e,t)=>e.diffDays-t.diffDays),e.innerHTML=`
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
        ${mt(`이번주 방송`,et(t.thisWeekBroadcasts)+`건`,`/projects`)}
        ${mt(`이번달 방송`,et(t.monthBroadcasts)+`건`,`/projects`)}
        ${mt(`이번달 매출`,$e(t.monthRevenue),`/finance`)}
        ${mt(`정산 대기`,$e(t.settleWaitAmount),`/settlement`)}
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
        ${r.length>0?r.sort((e,t)=>(e.broadcastDate||``).localeCompare(t.broadcastDate||``)).map(e=>ht(e)).join(``):gt()}
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
  `}function ht(e){let t=U.getById(`brands`,e.brandId),n=e.brandName||(t?t.name:`-`),r=0;e.broadcastStatus===`scheduled`?r=20:e.broadcastStatus===`host_cast`?r=40:e.broadcastStatus===`tech_request`?r=60:e.broadcastStatus===`design`?r=80:e.broadcastStatus===`cue_sheet`?r=90:e.broadcastStatus===`done`&&(r=100);let i=``;if(e.broadcastStatus===`done`)i=`D-0`;else if(e.broadcastDate){let t=new Date(e.broadcastDate.replace(/\./g,`-`));if(!isNaN(t.getTime())){let e=new Date;e.setHours(0,0,0,0);let n=Math.ceil((t.getTime()-e.getTime())/(1e3*60*60*24));i=n===0?`D-Day`:n>0?`D-${n}`:`D+${Math.abs(n)}`}}let a=U.query(`liveHosts`,t=>t.liveId===e.id).map(e=>{let t=U.getById(`hosts`,e.hostId);return t?t.name:`-`}).join(`, `);return`
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
  `}function gt(){return`
    <div class="empty-state" style="grid-column: 1 / -1;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
      <h3>진행중인 프로젝트가 없습니다</h3>
      <p>새 라이브 프로젝트를 등록해 주세요.</p>
    </div>
  `}function _t(e,t){if(!e)return``;let n=e.replace(/\./g,`-`),r=new Date(n);if(isNaN(r.getTime()))return``;let i=0;if(t===`design`?i=-4:t===`cue_sheet`?i=-5:t===`host_cast`&&(i=-7),i===0)return``;let a=new Date(r);a.setDate(a.getDate()+i);let o=String(a.getMonth()+1).padStart(2,`0`),s=String(a.getDate()).padStart(2,`0`),c=new Date;c.setHours(0,0,0,0);let l=a.getTime()-c.getTime(),u=Math.ceil(l/(1e3*60*60*24)),d=``;return d=u===0?`D-Day`:u>0?`D-${u}`:`D+${Math.abs(u)}`,`<br><span style="font-size: 10px; opacity: 0.8; font-weight: normal;">(${o}/${s} 까지 / <strong style="color:var(--status-error);">${d}</strong>)</span>`}function vt(e){let t=U.getById(`projects`,e);if(!t)return;let n=U.getById(`brands`,t.brandId),r=t.brandName||(n?n.name:`-`),i=document.createElement(`div`);i.innerHTML=`
    <div style="margin-bottom: var(--space-5);">
      <div style="font-size: var(--text-md); font-weight: var(--weight-semibold); margin-bottom: var(--space-1);">${r}</div>
      <div style="font-size: var(--text-sm); color: var(--text-tertiary);">${G(t.broadcastDate)}</div>
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
  `,K({title:`프로젝트 상태 변경`,size:`md`,content:i,footer:o}),document.querySelectorAll(`.status-option`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.status-option`).forEach(e=>{e.className=`btn btn-secondary btn-sm status-option`,e.style.justifyContent=`flex-start`,e.style.fontSize=`12px`}),e.className=`btn btn-primary btn-sm status-option`,e.style.justifyContent=`flex-start`,e.style.fontSize=`12px`,a=e.getAttribute(`data-status`)})}),document.getElementById(`modal-cancel`)?.addEventListener(`click`,q),document.getElementById(`modal-view-detail`)?.addEventListener(`click`,()=>{q(),M.navigate(`/projects/${e}`)}),document.getElementById(`modal-save`)?.addEventListener(`click`,()=>{U.update(`projects`,e,{broadcastStatus:a}),q(),J(`방송 상태가 "${R(a)}"(으)로 변경되었습니다.`);let t=document.getElementById(`page-content`);t&&(t.innerHTML=``,t.appendChild(pt()))})}var yt=()=>JSON.parse(localStorage.getItem(`ryzin_lives`)||`[]`),bt=e=>localStorage.setItem(`ryzin_lives`,JSON.stringify(e)),xt=e=>JSON.parse(localStorage.getItem(`ryzin_config_${e}`)||`null`),St=(e,t)=>localStorage.setItem(`ryzin_config_${e}`,JSON.stringify(t)),Ct=e=>JSON.parse(localStorage.getItem(`ryzin_stats_${e}`)||JSON.stringify({viewers:0,hearts:0,cumViewers:0})),wt=(e,t)=>localStorage.setItem(`ryzin_stats_${e}`,JSON.stringify(t)),Tt=e=>JSON.parse(localStorage.getItem(`ryzin_products_${e}`)||`[]`),Et=(e,t)=>localStorage.setItem(`ryzin_products_${e}`,JSON.stringify(t)),Dt=e=>JSON.parse(localStorage.getItem(`ryzin_bot_${e}`)||JSON.stringify({list:``,interval:10,autoReplyRules:[],autoReplyActive:!0})),Ot=(e,t)=>localStorage.setItem(`ryzin_bot_${e}`,JSON.stringify(t));function kt(){let e=yt(),t,n=!0;for(;n;){t=``;for(let e=0;e<7;e++)t+=`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`.charAt(Math.floor(Math.random()*36));n=e.some(e=>e.id===t)}return t}var At={},X=window.supabaseClient;function jt(e,t,n,r,i=!1){if(window[`live_loaded_${e}`]===!1){console.log(`[${e}] Skip sync: data not loaded yet.`);return}At[e]&&clearTimeout(At[e]);let a=async()=>{if(!X)return;let i={live_id:e,title:t.brandName,subtitle:t.title,profile_image:(t.logoUrl||``)+(t.showSplash===!1?`#nosplash`:``)+`#widgetText=${encodeURIComponent(t.widgetText||`라이브 보기`)}#widgetPosition=${t.widgetPosition||`right`}#widgetImageUrl=${t.widgetImageUrl||``}#showOnMain=${t.showOnMain===!0}`,stream_url:t.streamUrl||``,viewers:parseInt(n.viewers)||0,hearts:parseInt(n.hearts)||0,products:r,show_viewers:t.showViewers!==!1,thumbnail_url:t.thumbnailUrl||``,start_time:t.liveStartTime||``,status:t.isLive?`ON`:`OFF`,cum_viewers:parseInt(n.cumViewers)||0,share_title:t.shareTitle||``,share_desc:t.shareDesc||``,share_image:t.shareImageUrl||``,like_image_url:t.likeImageUrl||``,banned_words:t.bannedWords||``,banned_users:t.bannedUsers||``,updated_at:new Date().toISOString()};try{let{error:e}=await X.from(`live_control`).upsert(i);if(e)throw e}catch(t){console.warn(`[${e}] Supabase sync failed`,t)}};i?a():At[e]=setTimeout(a,1200)}function Mt(e){let t=document.createElement(`style`);t.innerHTML=`
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
  `,e.appendChild(t)}function Nt(){let e=document.createElement(`div`);e.style.cssText=`display:flex; flex-direction:column; height:calc(100vh - 48px); background:#f8fafc; overflow:hidden;`,Mt(e);let t=n=>{e.innerHTML=``,Mt(e),n===null?Pt(e,t):Ft(e,n,t)};return Pt(e,t),e}function Pt(e,t){let n=U.getCurrentRole(),r=n&&n.startsWith(`live_stream:`),i=r?n.split(`:`)[1]:null,a=document.createElement(`div`);a.style.cssText=`max-width:720px; margin:0 auto; padding:40px 24px; width:100%; overflow-y:auto;`;let o=document.createElement(`div`);o.style.cssText=`display:flex; justify-content:space-between; align-items:center; margin-bottom:32px;`,o.innerHTML=`
    <div>
      <h1 style="margin:0; font-size:26px; font-weight:800; color:#0f172a;">라이브 목록</h1>
      <p style="margin:6px 0 0; font-size:14px; color:#64748b;">각 라이브는 독립된 URL로 시청자에게 제공됩니다.</p>
    </div>
    ${r?``:`
    <button id="btn-create-live" class="action-btn btn-primary-solid">
      <span style="font-size:18px;">+</span> 새 라이브 생성
    </button>
    `}
  `,a.appendChild(o);let s=document.createElement(`div`);s.id=`live-list-container`,a.appendChild(s),e.appendChild(a);let c=async()=>{if(X)try{let{data:e,error:t}=await X.from(`live_control`).select(`live_id, updated_at`);if(!t&&e&&Array.isArray(e)){let t=yt(),n=JSON.parse(localStorage.getItem(`ryzin_deleted_lives`)||`[]`);e.forEach(e=>{e.live_id&&!t.some(t=>t.id===e.live_id)&&!n.includes(e.live_id)&&t.push({id:e.live_id,createdAt:new Date(e.updated_at).getTime()})}),bt(t)}}catch(e){console.warn(`Failed to load remote lives`,e)}let e=yt();if(r&&i&&(e=e.filter(e=>e.id===i)),e.sort((e,t)=>(e.createdAt||0)-(t.createdAt||0)),s.innerHTML=``,e.length===0){s.innerHTML=`
        <div style="text-align:center; padding:80px 20px; color:#94a3b8;">
          <div style="font-size:48px; margin-bottom:16px;">📡</div>
          <p style="font-size:16px; font-weight:600; margin:0 0 8px;">아직 생성된 라이브가 없습니다.</p>
          <p style="font-size:14px; margin:0;">"새 라이브 생성" 버튼으로 첫 번째 라이브를 만들어보세요!</p>
        </div>
      `;return}e.forEach((e,t)=>{let n=xt(e.id)||{},i=n.isLive?`badge-live`:`badge-ready`,a=n.isLive?`LIVE`:`대기`,o=`https://ryzincorp.com/live/${e.id}`,c=t+1,l=document.createElement(`div`);l.className=`live-card`,l.innerHTML=`
        <div style="width:48px; height:48px; background:linear-gradient(135deg,#3b82f6,#2563eb); border-radius:12px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:800; flex-shrink:0;">
          ${c}
        </div>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
            <span style="font-size:16px; font-weight:700; color:#0f172a;">${n.brandName&&!n.brandName.startsWith(`라이브 `)?n.brandName:`라이브 ${c}`}</span>
            <span class="live-badge ${i}">${a}</span>
          </div>
          <div style="font-size:13px; color:#64748b; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${n.title||`방송 제목 미설정`}</div>
          <div style="margin-top:6px; display:flex; align-items:center; gap:6px;">
            <span style="font-size:11px; font-weight:600; color:#94a3b8; background:#f1f5f9; padding:2px 8px; border-radius:6px; font-family:monospace;">${e.id}</span>
            <a href="${o}" target="_blank" style="font-size:11px; color:#3b82f6; text-decoration:none; font-weight:600;">${o} ↗</a>
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-shrink:0;">
          <button class="action-btn btn-neutral btn-edit" data-id="${e.id}" style="padding:8px 16px; font-size:13px;">설정 ›</button>
          ${r?``:`
          <button class="action-btn btn-neutral btn-delete" data-id="${e.id}" style="padding:8px 12px; font-size:13px; color:#ef4444; border-color:#fee2e2;">삭제</button>
          `}
        </div>
      `,s.appendChild(l)}),s.querySelectorAll(`.btn-edit`).forEach(e=>{e.addEventListener(`click`,n=>{n.stopPropagation(),t(e.dataset.id)})}),s.querySelectorAll(`.btn-delete`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.id;if(confirm(`${n} 라이브를 삭제하시겠습니까? 관련 데이터가 모두 삭제됩니다.`)){let e=yt();e=e.filter(e=>e.id!==n),bt(e),localStorage.removeItem(`ryzin_config_${n}`),localStorage.removeItem(`ryzin_stats_${n}`),localStorage.removeItem(`ryzin_products_${n}`),localStorage.removeItem(`ryzin_bot_${n}`);let t=JSON.parse(localStorage.getItem(`ryzin_deleted_lives`)||`[]`);t.includes(n)||(t.push(n),localStorage.setItem(`ryzin_deleted_lives`,JSON.stringify(t))),X&&Promise.all([X.from(`live_control`).delete().eq(`live_id`,n),X.from(`live_chats`).delete().eq(`live_id`,n)]).catch(e=>console.warn(`Supabase delete failed`,e)),c()}})}),s.querySelectorAll(`.live-card`).forEach(e=>{e.addEventListener(`click`,n=>{if(n.target.tagName===`BUTTON`||n.target.tagName===`A`)return;let r=e.querySelector(`.btn-edit`).dataset.id;t(r)})})};c();let l=o.querySelector(`#btn-create-live`);l&&l.addEventListener(`click`,()=>{let e=kt(),n=yt();n.push({id:e,createdAt:Date.now()}),bt(n);let r=JSON.parse(localStorage.getItem(`ryzin_deleted_lives`)||`[]`);r.includes(e)&&(r=r.filter(t=>t!==e),localStorage.setItem(`ryzin_deleted_lives`,JSON.stringify(r)));let i={brandName:`라이브 ${n.length}`,title:`단독 특가 라이브 방송 중!`,streamUrl:``,logoUrl:``,thumbnailUrl:``,liveStartTime:``,showViewers:!0,isLive:!1,botEnabled:!1};St(e,i),wt(e,{viewers:0,hearts:0,cumViewers:0}),Et(e,[]),jt(e,i,{viewers:0,hearts:0,cumViewers:0},[],!0),c(),t(e)})}function Ft(e,t,n){let r=e=>{let t=`image/png`,n=e;if(e.includes(`;base64,`)){let r=e.split(`;base64,`);t=r[0].split(`:`)[1]||`image/png`,n=r[1]}else n.startsWith(`/9j/`)?t=`image/jpeg`:n.startsWith(`R0lG`)?t=`image/gif`:n.startsWith(`iVBOR`)?t=`image/png`:n.startsWith(`UklGR`)&&(t=`image/webp`);let r=window.atob(n),i=r.length,a=new Uint8Array(i);for(let e=0;e<i;++e)a[e]=r.charCodeAt(e);return new Blob([a],{type:t})},i=async e=>{let t=r(e),n=`png`;t.type&&t.type.includes(`/`)&&(n=t.type.split(`/`)[1]||`png`);let i=localStorage.getItem(`ryzin_imgbb_key`)||``,a=[];i&&a.push(i),a.push(`117dfb947bc9e0045774b193d1eef7b6`,`d2b512c9bf10e4a3bfec604be1218579`,`6049a4f479f67a26eb3ccb8823b1eef7`),console.log(`⚡ 이미지 서버(ImgBB) 업로드를 진행합니다. 시도할 키 개수:`,a.length);let o=[];for(let e of a)try{let r=new FormData;r.append(`key`,e),r.append(`image`,t,`image.${n}`);let i=await(await fetch(`https://api.imgbb.com/1/upload`,{method:`POST`,body:r})).json();if(i.success&&i.data&&i.data.url)return i.data.url;throw Error(i.error?i.error.message:`API 응답 실패`)}catch(t){let n=e?`${e.substring(0,4)}...`:`none`;console.warn(`[ImgBB] API Key (${n}) 업로드 실패:`,t),o.push(`Key (${n}): ${t.message}`)}throw Error(`모든 이미지 업로드 서버(ImgBB) 전송이 실패했습니다.

[상세 원인 리스트]
`+o.join(`
`))},a=(e,t,n,r=.82)=>new Promise((i,a)=>{let o=new Image;o.src=URL.createObjectURL(e),o.onload=()=>{let e=o.width,a=o.height;e>a?e>t&&(a=Math.round(a*t/e),e=t):a>n&&(e=Math.round(e*n/a),a=n);let s=document.createElement(`canvas`);s.width=e,s.height=a,s.getContext(`2d`).drawImage(o,0,0,e,a);let c=s.toDataURL(`image/jpeg`,r);URL.revokeObjectURL(o.src),i(c.split(`,`)[1])},o.onerror=e=>{URL.revokeObjectURL(o.src),a(e)}});window[`live_loaded_${t}`]===void 0&&(window[`live_loaded_${t}`]=!1);let o=xt(t)||{},s=Ct(t),c=Tt(t);Array.isArray(c)||(c=[]);let l=Dt(t),u=null,d=!1,f=0,p=[];X&&!window[`live_loaded_${t}`]?X.from(`live_control`).select(`*`).eq(`live_id`,t).maybeSingle().then(({data:e,error:n})=>{if(window[`live_loaded_${t}`]=!0,!n&&e){let n=yt().findIndex(e=>e.id===t),r=n===-1?1:n+1;o.brandName=e.title||`라이브 ${r}`,o.title=e.subtitle||`단독 특가 라이브 방송 중!`,o.streamUrl=e.stream_url||``;let i=e.profile_image||``,a=`라이브 보기`,l=`right`,u=``,d=!1,f=i.split(`#`),p=f[0];if(f.slice(1).forEach(e=>{e===`nosplash`||(e.startsWith(`widgetText=`)?a=decodeURIComponent(e.replace(`widgetText=`,``)):e.startsWith(`widgetPosition=`)?l=e.replace(`widgetPosition=`,``):e.startsWith(`widgetImageUrl=`)?u=e.replace(`widgetImageUrl=`,``):e.startsWith(`showOnMain=`)&&(d=e.replace(`showOnMain=`,``)===`true`))}),o.logoUrl=p,o.showSplash=!i.includes(`#nosplash`),o.widgetText=a,o.widgetPosition=l,o.widgetImageUrl=u,o.showOnMain=d,o.thumbnailUrl=e.thumbnail_url||``,o.liveStartTime=e.start_time||``,o.showViewers=e.show_viewers!==!1,o.isLive=e.status===`ON`,o.shareTitle=e.share_title||``,o.shareDesc=e.share_desc||``,o.shareImageUrl=e.share_image||``,o.likeImageUrl=e.like_image_url||``,s.viewers=e.viewers||0,s.hearts=e.hearts||0,s.cumViewers=e.cum_viewers||0,e.products){let t=typeof e.products==`string`?JSON.parse(e.products):e.products;Array.isArray(t)&&(c.length=0,c.push(...t))}St(t,o),wt(t,s),Et(t,c);let m=(e,t)=>{let n=v.querySelector(`#`+e)||document.getElementById(e);n&&document.activeElement!==n&&(n.type===`checkbox`?n.checked=!!t:n.value=t)};m(`cfg-brandName`,o.brandName),m(`cfg-title`,o.title),m(`cfg-stream`,o.streamUrl),m(`cfg-showViewers`,o.showViewers),m(`cfg-liveStartTime`,o.liveStartTime),m(`cfg-shareTitle`,o.shareTitle),m(`cfg-shareDesc`,o.shareDesc);let h=v.querySelector(`#logo-preview`)||document.getElementById(`logo-preview`);h&&(h.src=o.logoUrl);let g=v.querySelector(`#thumbnail-preview`)||document.getElementById(`thumbnail-preview`);g&&(g.src=o.thumbnailUrl);let _=v.querySelector(`#like-preview`)||document.getElementById(`like-preview`);_&&(_.src=o.likeImageUrl,_.style.display=o.likeImageUrl?`block`:`none`);let y=v.querySelector(`#btn-toggle-live`)||document.getElementById(`btn-toggle-live`);y&&document.activeElement!==y&&(y.textContent=o.isLive?`라이브 종료`:`라이브 시작`,y.className=`action-btn ${o.isLive?`btn-danger-solid`:`btn-success-solid`}`)}}).catch(e=>{window[`live_loaded_${t}`]=!0,console.warn(`Initial Supabase load failed`,e)}):window[`live_loaded_${t}`]=!0;let m=()=>{St(t,o),jt(t,o,s,c)},h=()=>{wt(t,s),jt(t,o,s,c)},g=()=>{Et(t,c),jt(t,o,s,c)},_=()=>Ot(t,l),v=document.createElement(`div`);v.style.cssText=`display:flex; gap:0; height:100%; overflow:hidden;`;let y=document.createElement(`div`);y.style.cssText=`flex:1; display:flex; flex-direction:column; overflow:hidden;`;let b=document.createElement(`div`);b.style.cssText=`display:flex; align-items:center; gap:18px; padding:18px 28px; background:#fff; border-bottom:1.5px solid #e2e8f0; flex-shrink:0;`;let x=o.isLive?`<span style="font-size:10px; font-weight:800; color:#ef4444; background:#fee2e2; border:1px solid #fecaca; padding:2px 6px; border-radius:4px; white-space:nowrap; height:16px; display:inline-flex; align-items:center; gap:4px;"><span style="width:5px; height:5px; background:#ef4444; border-radius:50%; display:inline-block;"></span>라이브 중</span>`:`<span style="font-size:10px; font-weight:800; color:#64748b; background:#f1f5f9; border:1px solid #e2e8f0; padding:2px 6px; border-radius:4px; white-space:nowrap; height:16px; display:inline-flex; align-items:center;">송출 대기</span>`,S=o.isLive?`<div id="onair-timer-wrapper" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:#ef4444; background:#fef2f2; padding:4px 10px; border-radius:6px; border:1px solid #fecaca; white-space:nowrap;"> <div style="width:6px; height:6px; background:#ef4444; border-radius:50%; box-shadow:0 0 0 2px #fee2e2;"></div> 방송 중 <span id="onair-timer-text" style="font-family:monospace; margin-left:2px; letter-spacing:0.02em;">00:00:00</span> </div>`:``;b.innerHTML=`
    <button id="btn-back" class="action-btn btn-neutral" style="padding:8px 14px; font-size:13px; display:flex; align-items:center; gap:4px;"><span style="font-size:14px; line-height:1;">←</span> 목록</button>
    <div style="display:flex; align-items:center; gap:10px; min-width: 200px; max-width: 580px; flex-shrink:0;">
      <span style="font-size:12px; font-weight:700; color:#64748b; background:#f1f5f9; padding:4px 10px; border-radius:6px; font-family:monospace; line-height:1; flex-shrink:0;">${t}</span>
      <span style="font-size:15px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:280px; line-height:1.2;" title="${o.brandName||``}">${o.brandName||``}</span>
      ${x}
    </div>
    <div style="display:flex; gap:4px; background:#f1f5f9; padding:4px; border-radius:10px; flex:1; justify-content:center; max-width:480px; margin:0 auto;">
      <button class="tab-btn active" data-tab="config" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">라이브 기본설정</button>
      <button class="tab-btn" data-tab="chat" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">채팅 / 봇 관리</button>
      <button class="tab-btn" data-tab="product" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">상품 관리</button>
      <button class="tab-btn" data-tab="leads" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">상담 DB</button>
    </div>
    <div style="display:flex; align-items:center; gap:8px; padding:6px 0; flex-shrink:0;">
      <span style="font-size:12px; color:#475569; font-weight:700; white-space:nowrap;">시청자 URL</span>
      <span style="font-size:12px; color:#0f172a; font-family:monospace; font-weight:600; white-space:nowrap; margin-right:4px;">ryzincorp.com/live/${t}</span>
      <button id="btn-copy-live-url" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; height:28px; line-height:1; border-radius:6px; border:1px solid #cbd5e1; background:#fff; cursor:pointer; font-weight:700; white-space:nowrap;">복사</button>
    </div>
  `,y.appendChild(b),setTimeout(()=>{let e=document.getElementById(`btn-copy-live-url`);e&&e.addEventListener(`click`,async()=>{let n=`https://ryzincorp.com/live/${t}`;try{await navigator.clipboard.writeText(n),e.textContent=`복사 완료!`,e.style.color=`#10b981`,e.style.borderColor=`#a7f3d0`,e.style.backgroundColor=`#ecfdf5`,setTimeout(()=>{e.textContent=`복사`,e.style.color=``,e.style.borderColor=``,e.style.backgroundColor=``},2e3)}catch(e){console.warn(`URL 복사 오류:`,e)}})},100);let C=null;o.isLive&&setTimeout(()=>{let e=document.getElementById(`onair-timer-text`);if(e){let t=o.liveStartTime?new Date(o.liveStartTime).getTime():0,n=Date.now();(!t||t>n)&&(t=n);let r=()=>{let n=Date.now()-t,r=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4),a=Math.floor(n%6e4/1e3);e.textContent=`${r.toString().padStart(2,`0`)}:${i.toString().padStart(2,`0`)}:${a.toString().padStart(2,`0`)}`};r(),C=setInterval(r,1e3)}},100);let w=()=>{C&&=(clearInterval(C),null)},T=document.createElement(`div`);T.style.cssText=`flex:1; overflow-y:auto; padding:28px;`,y.appendChild(T),v.appendChild(y);let E=document.createElement(`div`);E.style.cssText=`width:340px; flex-shrink:0; display:flex; flex-direction:column; align-items:center; padding:24px 20px; background:#fff; border-left:1.5px solid #e2e8f0; gap:16px; overflow-y:auto;`;let D=`${window.location.origin.includes(`localhost:5173`)?`http://localhost:8080/live/`:`/live/`}?id=${t}&v=202607251156`,O=`https://ryzincorp.com/live/${t}`,k=`${O}?embed=1&v=202607251156`,A=`${O}?widget=1&v=202607251156`,j=`<iframe src="${k}" width="390" height="693" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="border-radius:20px; overflow:hidden; border:none;"></iframe>`,M=`<iframe src="${k}" width="100%" height="600" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="border:none; border-radius:12px; overflow:hidden;"></iframe>`,N=`<iframe id="ryzin-live-iframe" src="${A}" style="position:fixed; bottom:74px; right:12px; width:92px; height:112px; border:none; z-index:999999; background:transparent;" allow="autoplay; fullscreen" allowfullscreen></iframe>
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
          iframe.style.setProperty('border-radius', '50%', 'important');
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
<\/script>`;`${t}`,E.innerHTML=`
    <div style="width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
      <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em;">모바일 미리보기</div>
      ${S}
    </div>
    <div style="width:300px; height:535px; border-radius:20px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.15); border:1.5px solid #e2e8f0; flex-shrink:0;">
      <iframe id="live-preview-iframe" src="${D}" style="width:100%; height:100%; border:none; background:#000;"></iframe>
    </div>
    <button id="btn-refresh-preview" class="action-btn btn-neutral" style="width:100%; justify-content:center;">새로고침</button>

    <div style="width:100%; border-top:1.5px solid #e2e8f0; padding-top:16px; margin-top:4px;">
      <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em; margin-bottom:12px;">공유 및 임베드 설정</div>

      <div style="margin-bottom:10px;">
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">모바일 세로형 임베드 코드 (390×693)</div>
        <div style="position:relative;">
          <input type="text" id="embed-url-mobile" readonly style="width:100%; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 64px 8px 8px; color:#334155; line-height:1.5; box-sizing:border-box; outline:none;" value="${j.replace(/"/g,`&quot;`)}">
          <button id="btn-copy-embed-mobile" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
        <div style="font-size:10px; color:#94a3b8; margin-top:4px;">라이브 화면이 바로 플레이어로 삽입되는 코드입니다</div>
      </div>

      <div style="margin-bottom:10px;">
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">와이드형 임베드 코드 (전체너비×600)</div>
        <div style="position:relative;">
          <input type="text" id="embed-url-wide" readonly style="width:100%; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 64px 8px 8px; color:#334155; line-height:1.5; box-sizing:border-box; outline:none;" value="${M.replace(/"/g,`&quot;`)}">
          <button id="btn-copy-embed-wide" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
        <div style="font-size:10px; color:#94a3b8; margin-top:4px;">라이브 화면이 바로 플레이어로 삽입되는 코드입니다</div>
      </div>

      <div style="margin-bottom:10px;">
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">라이브 플로팅 위젯 코드 (전체화면형)</div>
        <div style="position:relative;">
          <input type="text" id="widget-url-code" readonly style="width:100%; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 64px 8px 8px; color:#334155; line-height:1.5; box-sizing:border-box; outline:none;" value="${N.replace(/"/g,`&quot;`)}">
          <button id="btn-copy-widget-code" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
        <div style="font-size:10px; color:#94a3b8; margin-top:4px;">둥근 버튼 위젯이 화면 구석에 생성되고 클릭 시 열리는 코드입니다</div>
      </div>

      <div style="width:100%; border-top:1.5px solid #e2e8f0; padding-top:16px; margin-top:16px;">
        <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em; margin-bottom:12px;">라이브 위젯 설정</div>
        
        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">위젯 문구</label>
          <input type="text" id="cfg-widgetText" class="modern-input" style="padding:6px 10px; font-size:12px; height:32px;" value="${o.widgetText||`라이브 보기`}">
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">위젯 노출 위치</label>
          <select id="cfg-widgetPosition" class="modern-input" style="padding:4px 10px; font-size:12px; height:32px;">
            <option value="right" ${o.widgetPosition===`left`?``:`selected`}>우측 끝 밀착</option>
            <option value="left" ${o.widgetPosition===`left`?`selected`:``}>좌측 끝 밀착</option>
          </select>
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">위젯 단색/커스텀 이미지</label>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:44px; height:44px; border-radius:50%; border:1.5px solid #e2e8f0; overflow:hidden; background:#fff; flex-shrink:0; display:flex; align-items:center; justify-content:center;">
              <img id="widget-image-preview" src="${o.widgetImageUrl||``}" style="width:100%; height:100%; object-fit:cover; display:${o.widgetImageUrl?`block`:`none`};">
              <span id="widget-image-placeholder" style="font-size:10px; color:#cbd5e1; display:${o.widgetImageUrl?`none`:`block`};">단색</span>
            </div>
            <div style="flex:1; display:flex; flex-direction:column; gap:4px;">
              <input type="file" id="cfg-widgetImageFile" accept="image/*" style="display:none;">
              <button id="btn-upload-widget-img" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; font-weight:700; justify-content:center;">이미지 업로드</button>
              <button id="btn-reset-widget-img" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; font-weight:700; justify-content:center; color:#ef4444; border-color:#fee2e2;">단색 화이트 리셋</button>
            </div>
          </div>
        </div>

        <div style="margin-bottom:10px; display:flex; align-items:center; gap:8px;">
          <input type="checkbox" id="cfg-showOnMain" style="width:16px; height:16px; cursor:pointer;" ${o.showOnMain===!0?`checked`:``}>
          <label for="cfg-showOnMain" style="font-size:11px; font-weight:700; color:#94a3b8; letter-spacing:0.05em; cursor:pointer; user-select:none;">라이진 메인에 위젯 노출</label>
        </div>
      </div>
    </div>
  `,v.appendChild(E),e.appendChild(v);let P=(e,t)=>{let n=v.querySelector(`#`+e),r=v.querySelector(`#`+t);!n||!r||navigator.clipboard.writeText(n.value).then(()=>{r.textContent=`복사됨!`,r.style.background=`#22c55e`,setTimeout(()=>{r.textContent=`복사`,r.style.background=`#3b82f6`},2e3)}).catch(()=>{n.select(),document.execCommand(`copy`),r.textContent=`복사됨!`,r.style.background=`#22c55e`,setTimeout(()=>{r.textContent=`복사`,r.style.background=`#3b82f6`},2e3)})},ee=v.querySelector(`#btn-copy-embed-mobile`);ee&&ee.addEventListener(`click`,()=>P(`embed-url-mobile`,`btn-copy-embed-mobile`));let te=v.querySelector(`#btn-copy-embed-wide`);te&&te.addEventListener(`click`,()=>P(`embed-url-wide`,`btn-copy-embed-wide`));let F=v.querySelector(`#btn-copy-widget-code`);F&&F.addEventListener(`click`,()=>P(`widget-url-code`,`btn-copy-widget-code`));let I=v.querySelector(`#cfg-widgetText`);I&&I.addEventListener(`input`,e=>{o.widgetText=e.target.value,St(t,o),jt(t,o,s,c)});let ne=v.querySelector(`#cfg-widgetPosition`);ne&&ne.addEventListener(`change`,e=>{o.widgetPosition=e.target.value,St(t,o),jt(t,o,s,c)});let re=v.querySelector(`#cfg-showOnMain`);re&&re.addEventListener(`change`,async e=>{o.showOnMain=e.target.checked,St(t,o);let n=(o.logoUrl||``)+(o.showSplash===!1?`#nosplash`:``)+`#widgetText=${encodeURIComponent(o.widgetText||`라이브 보기`)}#widgetPosition=${o.widgetPosition||`right`}#widgetImageUrl=${o.widgetImageUrl||``}#showOnMain=${o.showOnMain===!0}`;if(X)try{await X.from(`live_control`).update({profile_image:n,updated_at:new Date().toISOString()}).eq(`live_id`,t)}catch(e){console.warn(`Direct showOnMain update failed:`,e)}jt(t,o,s,c,!0)});let ie=v.querySelector(`#btn-upload-widget-img`),ae=v.querySelector(`#cfg-widgetImageFile`);ie&&ae&&(ie.addEventListener(`click`,()=>ae.click()),ae.addEventListener(`change`,async e=>{let n=e.target.files[0];if(n){ie.disabled=!0,ie.textContent=`업로드 중...`;try{let e=await i(await a(n,256,256,.88));o.widgetImageUrl=e,St(t,o);let r=v.querySelector(`#widget-image-preview`)||document.getElementById(`widget-image-preview`),l=v.querySelector(`#widget-image-placeholder`)||document.getElementById(`widget-image-placeholder`);r&&l&&(r.src=e,r.style.display=`block`,l.style.display=`none`),jt(t,o,s,c,!0)}catch(e){console.error(`이미지 업로드 오류:`,e),alert(`이미지 업로드 실패: `+e.message)}finally{ie.disabled=!1,ie.textContent=`이미지 업로드`}}}));let oe=v.querySelector(`#btn-reset-widget-img`);oe&&oe.addEventListener(`click`,()=>{o.widgetImageUrl=``,St(t,o);let e=v.querySelector(`#widget-image-preview`)||document.getElementById(`widget-image-preview`),n=v.querySelector(`#widget-image-placeholder`)||document.getElementById(`widget-image-placeholder`);e&&n&&(e.src=``,e.style.display=`none`,n.style.display=`block`),jt(t,o,s,c,!0)});let L=()=>{T.innerHTML=`
      <div class="section-card">
        <h3>기본 정보</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:18px;">
          <div>
            <label class="modern-label">브랜드명 (제목)</label>
            <input type="text" class="modern-input" id="cfg-brandName" value="${o.brandName||``}">
          </div>
          <div>
            <label class="modern-label">방송 부제목</label>
            <input type="text" class="modern-input" id="cfg-title" value="${o.title||``}">
          </div>
        </div>
        <div style="margin-bottom:18px;">
          <label class="modern-label">방송 시작 예정 일시 (카운트다운용)</label>
          <input type="datetime-local" class="modern-input" id="cfg-liveStartTime" value="${o.liveStartTime||``}">
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:18px; margin-bottom:18px;">
          <div class="file-upload-wrapper">
            <div style="width:56px; height:56px; border-radius:50%; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0;">
              <img id="logo-preview" src="${o.logoUrl||``}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div>
              <label class="modern-label">프로필 이미지</label>
              <label class="file-upload-btn" for="cfg-logoFile">이미지 업로드</label>
              <input type="file" id="cfg-logoFile" accept="image/*" style="display:none;">
            </div>
          </div>
          <div class="file-upload-wrapper">
            <div style="width:40px; height:71px; border-radius:8px; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0;">
              <img id="thumbnail-preview" src="${o.thumbnailUrl||``}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div>
              <label class="modern-label">썸네일 (9:16)</label>
              <label class="file-upload-btn" for="cfg-thumbnailFile">이미지 업로드</label>
              <input type="file" id="cfg-thumbnailFile" accept="image/*" style="display:none;">
            </div>
          </div>
          <div class="file-upload-wrapper">
            <div style="width:56px; height:56px; border-radius:8px; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0; position:relative; background:#f8fafc; display:flex; align-items:center; justify-content:center;">
              <img id="like-preview" src="${o.likeImageUrl||``}" style="width:100%; height:100%; object-fit:contain; display:${o.likeImageUrl?`block`:`none`};">
              <span id="like-preview-placeholder" style="font-size:24px; display:${o.likeImageUrl?`none`:`block`};">❤️</span>
            </div>
            <div>
              <label class="modern-label">응원콘 (GIF/PNG)</label>
              <div style="display:flex; gap:6px;">
                <label class="file-upload-btn" style="margin:0;" for="cfg-likeFile">업로드</label>
                <button id="btn-clear-like-icon" class="action-btn btn-neutral" style="padding:4px 8px; font-size:11px; height:28px; border-color:#fee2e2; background:#fff5f5; color:#ef4444; display:${o.likeImageUrl?`block`:`none`};">삭제</button>
              </div>
              <input type="file" id="cfg-likeFile" accept="image/gif, image/png, image/jpeg, image/webp" style="display:none;">
            </div>
          </div>
        </div>
        <div>
          <label class="modern-label">스트리밍 URL (m3u8)</label>
          <input type="text" class="modern-input" id="cfg-stream" value="${o.streamUrl||``}">
        </div>
      </div>

      <div class="section-card">
        <h3>통계</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:18px;">
          <div>
            <label class="modern-label">총 시청자 수 (사용자 화면 노출 기준)</label>
            <div style="display:flex; gap:6px; align-items:center;">
              <div class="modern-input" id="cfg-viewers-display" style="background:#f1f5f9; font-weight:700; color:#0f172a; flex:1; display:flex; align-items:center;">${(s.viewers+(s.cumViewers||0)).toLocaleString()}명 <span style="font-size:11px; font-weight:normal; color:#64748b; margin-left:4px;">(방송+수동: ${s.viewers.toLocaleString()}, 누적: ${(s.cumViewers||0).toLocaleString()})</span></div>
            </div>
            <div style="display:flex; gap:6px; margin-top:6px; align-items:center;">
              <input type="number" class="modern-input" id="cfg-viewers-add" placeholder="+추가할 수" style="flex:1; padding:8px 10px; font-size:13px;">
              <button id="btn-add-viewers" class="action-btn btn-primary-solid" style="white-space:nowrap; padding:8px 12px; font-size:13px;">+추가</button>
            </div>
          </div>
          <div>
            <label class="modern-label">누적 시청자 수</label>
            <input type="number" class="modern-input" id="cfg-cumViewers" value="${s.cumViewers||0}" readonly style="background:#f1f5f9; color:#64748b; cursor:not-allowed;">
            <div style="margin-top:4px; font-size:11px; color:#94a3b8;">페이지 로드마다 자동 누적</div>
          </div>
          <div>
            <label class="modern-label">하트 수 (수정 가능)</label>
            <input type="number" class="modern-input" id="cfg-hearts" value="${s.hearts}">
          </div>
          <div>
            <label class="modern-label">총 상품 조회수 (클릭수)</label>
            <div class="modern-input" id="cfg-total-clicks" style="background:#f1f5f9; display:flex; align-items:center; font-weight:bold; color:#0f172a;">
              ${(Array.isArray(c)?c:[]).reduce((e,t)=>e+(parseInt(t.clicks)||0),0).toLocaleString()}회
            </div>
          </div>
        </div>
        <div style="margin-top:18px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="cfg-showViewers" style="width:18px; height:18px; accent-color:#3b82f6;" ${o.showViewers?`checked`:``}>
            <label for="cfg-showViewers" style="font-size:14px; font-weight:600; color:#374151; cursor:pointer;">시청자 수 노출</label>
          </div>
          <div style="display:flex; align-items:center; gap:8px; margin-left:16px;">
            <input type="checkbox" id="cfg-showSplash" style="width:18px; height:18px; accent-color:#3b82f6;" ${o.showSplash===!1?``:`checked`}>
            <label for="cfg-showSplash" style="font-size:14px; font-weight:600; color:#374151; cursor:pointer;">스플래시 화면 켜기</label>
          </div>
          <div style="flex:1;"></div>
          <button id="btn-reset-stats" class="action-btn btn-danger-solid" style="padding:8px 14px; font-size:13px;">통계 초기화</button>
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
              <input type="text" class="modern-input" id="cfg-shareTitle" value="${o.shareTitle||``}" placeholder="예: 🔴 지금 라이브 중! 단하루 특가">
            </div>
            <div>
              <label class="modern-label">공유 설명 (Description)</label>
              <textarea class="modern-input" id="cfg-shareDesc" style="height:60px; resize:none; padding:10px 14px;" placeholder="예: 지금 입장하면 추가 5% 할인! 재고 소진 임박">${o.shareDesc||``}</textarea>
            </div>
            <div>
              <label class="modern-label">공유 대표 이미지 (1200×630 권장)</label>
              <div style="display:flex; align-items:center; gap:12px;">
                <div id="og-img-wrap" style="width:80px; height:56px; border-radius:8px; overflow:hidden; border:1.5px solid #e2e8f0; flex-shrink:0; background:#f8fafc; cursor:pointer; position:relative;" onclick="document.getElementById('cfg-shareImageFile').click()">
                  <img id="share-image-preview" src="${o.shareImageUrl||``}" style="width:100%; height:100%; object-fit:cover; display:${o.shareImageUrl?`block`:`none`};">
                  <div id="og-img-placeholder" style="display:${o.shareImageUrl?`none`:`flex`}; align-items:center; justify-content:center; height:100%; font-size:22px; color:#cbd5e1;">🖼</div>
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
                <img id="og-preview-img" src="${o.shareImageUrl||``}" style="width:100%; height:100%; object-fit:cover; display:${o.shareImageUrl?`block`:`none`};">
                <div id="og-preview-img-placeholder" style="display:${o.shareImageUrl?`none`:`flex`}; align-items:center; justify-content:center; height:100%; font-size:32px; color:#cbd5e1;">🖼</div>
              </div>
              <div style="padding:10px 12px;">
                <div id="og-preview-title" style="font-size:13px; font-weight:700; color:#0f172a; line-height:1.3; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${o.shareTitle||`공유 제목을 입력하세요`}</div>
                <div id="og-preview-desc" style="font-size:11px; color:#64748b; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${o.shareDesc||`공유 설명을 입력하세요`}</div>
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
        <button id="btn-toggle-live" class="action-btn ${o.isLive?`btn-danger-solid`:`btn-success-solid`}" style="flex:1; justify-content:center; padding:14px; font-size:15px;">
          ${o.isLive?`라이브 종료`:`라이브 시작`}
        </button>
      </div>
    `,document.getElementById(`btn-save-config`).addEventListener(`click`,async()=>{let e=document.getElementById(`btn-save-config`);e.disabled=!0,e.textContent=`저장 중...`;let t=document.getElementById(`cfg-imgbb-key`).value.trim();localStorage.setItem(`ryzin_imgbb_key`,t),o.brandName=document.getElementById(`cfg-brandName`).value,o.title=document.getElementById(`cfg-title`).value,o.streamUrl=document.getElementById(`cfg-stream`).value,o.liveStartTime=document.getElementById(`cfg-liveStartTime`).value,s.cumViewers=parseInt(document.getElementById(`cfg-cumViewers`).value)||0,s.hearts=parseInt(document.getElementById(`cfg-hearts`).value)||0,o.showViewers=document.getElementById(`cfg-showViewers`).checked,o.showSplash=document.getElementById(`cfg-showSplash`).checked,o.shareTitle=document.getElementById(`cfg-shareTitle`).value,o.shareDesc=document.getElementById(`cfg-shareDesc`).value,m(),h(),b.querySelector(`span[style*="font-weight:700; color:#0f172a"]`).textContent=o.brandName,e.disabled=!1,e.textContent=`설정 저장`,alert(`✅ 설정 저장 완료!`)});let e=document.getElementById(`og-preview-title`),n=document.getElementById(`og-preview-desc`);document.getElementById(`og-preview-img`),document.getElementById(`og-preview-img-placeholder`);let r=document.getElementById(`cfg-shareTitle`),l=document.getElementById(`cfg-shareDesc`);r&&e&&r.addEventListener(`input`,()=>{e.textContent=r.value||`공유 제목을 입력하세요`}),l&&n&&l.addEventListener(`input`,()=>{n.textContent=l.value||`공유 설명을 입력하세요`});let u=`https://ryzincorp.com/live/${t}`,d=document.getElementById(`btn-kakao-cache`);d&&d.addEventListener(`click`,()=>{let e=`https://developers.kakao.com/tool/clear/og?url=${encodeURIComponent(u)}`;window.open(e,`_blank`)});let f=document.getElementById(`btn-preview-og`);f&&f.addEventListener(`click`,()=>{let e=`https://ryzincorp.com/live/${t}`;window.open(e,`_blank`)}),document.getElementById(`btn-add-viewers`).addEventListener(`click`,async()=>{let e=parseInt(document.getElementById(`cfg-viewers-add`).value)||0;if(e===0){alert(`추가할 시청자 수를 입력해주세요.`);return}let n=document.getElementById(`btn-add-viewers`);n.disabled=!0,n.textContent=`처리중...`;try{if(!X)return;let{data:n,error:r}=await X.from(`live_control`).select(`viewers`).eq(`live_id`,t).maybeSingle();if(r)throw r;let i=(n?parseInt(n.viewers)||0:s.viewers)+e;await X.from(`live_control`).update({viewers:i}).eq(`live_id`,t),s.viewers=i,h(),typeof window.updateAdminViewersDisplay==`function`&&window.updateAdminViewersDisplay(),document.getElementById(`cfg-viewers-add`).value=``,alert(`시청자 수가 ${i.toLocaleString()}명으로 업데이트되었습니다.`)}catch(e){alert(`시청자 수 업데이트 실패: `+e.message)}finally{n.disabled=!1,n.textContent=`+추가`}});let p=document.getElementById(`btn-reset-stats`);p&&p.addEventListener(`click`,async()=>{if(confirm(`현재 라이브의 모든 통계 데이터(실시간 시청자 수, 누적 시청자 수, 하트 수, 상품 클릭 수)를 초기화하시겠습니까?`)){p.disabled=!0,p.textContent=`초기화 중...`;try{if(s.viewers=0,s.hearts=0,s.cumViewers=0,Array.isArray(c)&&c.forEach(e=>{e.clicks=0}),h(),g(),X){let{error:e}=await X.from(`live_control`).update({viewers:0,hearts:0,cum_viewers:0,products:c,updated_at:new Date().toISOString()}).eq(`live_id`,t);if(e)throw e}typeof window.updateAdminViewersDisplay==`function`&&window.updateAdminViewersDisplay();let e=document.getElementById(`cfg-cumViewers`);e&&(e.value=0);let n=document.getElementById(`cfg-hearts`);n&&(n.value=0);let r=document.getElementById(`cfg-total-clicks`);r&&(r.textContent=`0회`),alert(`✅ 통계 데이터가 성공적으로 초기화되었습니다.`)}catch(e){console.error(`통계 초기화 오류:`,e),alert(`❌ 통계 초기화에 실패했습니다: `+e.message)}finally{p.disabled=!1,p.textContent=`통계 초기화`}}}),document.getElementById(`btn-toggle-live`).addEventListener(`click`,e=>{let n=document.getElementById(`cfg-stream`).value.trim();if(!o.isLive&&!n){alert(`⚠️ 스트리밍 URL을 먼저 입력해주세요.
설정을 저장한 후 라이브를 시작할 수 있습니다.`),document.getElementById(`cfg-stream`).focus(),document.getElementById(`cfg-stream`).style.borderColor=`#ef4444`,document.getElementById(`cfg-stream`).style.boxShadow=`0 0 0 3px rgba(239,68,68,0.15)`,setTimeout(()=>{document.getElementById(`cfg-stream`).style.borderColor=``,document.getElementById(`cfg-stream`).style.boxShadow=``},3e3);return}if(o.isLive=!o.isLive,o.isLive){o.liveStartTime=new Date().toISOString();let e=document.getElementById(`cfg-liveStartTime`);e&&(e.value=new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,16))}e.target.textContent=o.isLive?`라이브 종료`:`라이브 시작`,e.target.className=`action-btn ${o.isLive?`btn-danger-solid`:`btn-success-solid`}`,e.target.style.cssText=`flex:1; justify-content:center; padding:14px; font-size:15px;`,m(),jt(t,o,s,c,!0)});let _=async(e,t,n)=>{if(e){document.getElementById(t).style.opacity=`0.5`;try{let r=n===`logoUrl`,s=await i(await a(e,r?256:1080,r?256:1920,r?.88:.82));o[n]=s;let c=document.getElementById(t);if(c.src=s,c.style.display=`block`,n===`shareImageUrl`){let e=document.getElementById(`og-preview-img`),t=document.getElementById(`og-preview-img-placeholder`),n=document.getElementById(`og-img-placeholder`);e&&(e.src=s,e.style.display=`block`),t&&(t.style.display=`none`),n&&(n.style.display=`none`)}m()}catch(e){console.error(`이미지 업로드 오류:`,e),alert(`이미지 업로드 실패: `+e.message)}finally{document.getElementById(t).style.opacity=`1`}}},v=async e=>{if(!e)return;let t=document.getElementById(`like-preview`),n=document.getElementById(`like-preview-placeholder`),r=document.getElementById(`btn-clear-like-icon`);t.style.opacity=`0.5`;try{let s=``;s=e.size<1.2*1024*1024?await new Promise(t=>{let n=new FileReader;n.onload=e=>t(e.target.result.split(`,`)[1]),n.readAsDataURL(e)}):await a(e,512,512,.9);let c=await i(s);o.likeImageUrl=c,t.src=c,t.style.display=`block`,n&&(n.style.display=`none`),r&&(r.style.display=`block`),m()}catch(e){console.error(`응원 이미지 업로드 오류:`,e),alert(`응원 이미지 업로드 실패: `+e.message)}finally{t.style.opacity=`1`}};document.getElementById(`cfg-logoFile`).addEventListener(`change`,e=>_(e.target.files[0],`logo-preview`,`logoUrl`)),document.getElementById(`cfg-thumbnailFile`).addEventListener(`change`,e=>_(e.target.files[0],`thumbnail-preview`,`thumbnailUrl`)),document.getElementById(`cfg-shareImageFile`).addEventListener(`change`,e=>_(e.target.files[0],`share-image-preview`,`shareImageUrl`)),document.getElementById(`cfg-likeFile`).addEventListener(`change`,e=>v(e.target.files[0])),document.getElementById(`btn-clear-like-icon`).addEventListener(`click`,()=>{o.likeImageUrl=``;let e=document.getElementById(`like-preview`),t=document.getElementById(`like-preview-placeholder`),n=document.getElementById(`btn-clear-like-icon`);e&&(e.src=``,e.style.display=`none`),t&&(t.style.display=`block`),n&&(n.style.display=`none`),m()}),X&&X.from(`live_control`).select(`*`).eq(`live_id`,t).maybeSingle().then(({data:e,error:t})=>{if(t)throw t;if(e){let t=parseInt(e.cum_viewers)||0,n=parseInt(e.viewers)||0,r=parseInt(e.hearts)||0,i=document.getElementById(`cfg-cumViewers`);i&&(i.value=t);let a=document.getElementById(`cfg-viewers`);a&&!a.matches(`:focus`)&&(a.value=n);let o=document.getElementById(`cfg-hearts`);o&&!o.matches(`:focus`)&&(o.value=r),s.cumViewers=t,s.viewers=n,s.hearts=r,h()}}).catch(e=>console.warn(`Failed to fetch stats from Supabase`,e))},R=()=>{T.innerHTML=`
      <!-- 서브 탭 네비게이션 -->
      <div style="display:flex; gap:8px; margin-bottom:16px; background:#f1f5f9; padding:4px; border-radius:10px;">
        <button class="chat-sub-tab-btn active" data-subtab="admin" style="flex:1; padding:8px 0; font-size:13px; font-weight:700; border:none; background:#fff; color:#0f172a; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">관리자 채팅 & 정책</button>
        <button class="chat-sub-tab-btn" data-subtab="bot" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">채팅 봇 관리</button>
        <button class="chat-sub-tab-btn" data-subtab="event" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">이벤트 관리</button>
      </div>

      <!-- 관리자 채팅 & 정책 뷰 -->
      <div id="chat-sub-admin" class="chat-sub-view">
        <div class="section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9;">
          <h3 style="margin:0; border:none; padding:0;">관리자 채팅 발송</h3>
          <button id="btn-clear-chats" class="action-btn btn-neutral" style="padding:6px 12px; font-size:12px; color:#ef4444; border-color:#fee2e2; background:#fff5f5;">채팅 내역 초기화</button>
        </div>
        
        <!-- 관리자 닉네임 / 컬러 설정 영역 -->
        <div style="display:flex; gap:16px; margin-bottom:16px; background:#f8fafc; padding:12px 16px; border-radius:10px; border:1px solid #e2e8f0; align-items:flex-end;">
          <div style="flex:1;">
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
              <textarea class="modern-input" id="cfg-bannedWords" style="height:80px; resize:none; padding:10px 14px; font-size:13px;" placeholder="예: 욕설,바보,비속어,광고">${o.bannedWords||``}</textarea>
              <div style="font-size:10px; color:#94a3b8; margin-top:4px;">쉼표(,)로 구분해 입력해 주세요. 시청자가 전송 시 차단됩니다.</div>
            </div>
            <div>
              <label class="modern-label">차단된 시청자 닉네임 목록 (쉼표로 구분)</label>
              <textarea class="modern-input" id="cfg-bannedUsers" style="height:80px; resize:none; padding:10px 14px; font-size:13px;" placeholder="차단된 사용자가 없습니다.">${o.bannedUsers||``}</textarea>
              <div style="font-size:10px; color:#94a3b8; margin-top:4px;">쉼표(,)로 구분하여 직접 추가하거나, 채팅방에서 바로 차단할 수 있습니다.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 채팅 봇 관리 뷰 -->
      <div id="chat-sub-bot" class="chat-sub-view" style="display:none;">
        <div class="section-card">
        <h3>채팅 봇</h3>
        <p style="font-size:13px; color:#64748b; margin:0 0 16px; line-height:1.6;">
          시청자에게 보여질 가상 채팅입니다.<br>
          <code style="background:#f1f5f9; padding:2px 8px; border-radius:6px; font-size:12px; font-weight:700;">닉네임 | 채팅내용</code> 형식으로 한 줄씩 입력하세요.
        </p>
        <textarea id="bot-chat-list" class="modern-input" style="height:140px; font-family:monospace; resize:vertical; font-size:13px; line-height:1.7; margin-bottom:16px;" placeholder="뷰티러버 | 이 제품 민감성 피부도 사용 가능한가요?&#10;예쁜하루 | 오늘 할인율이 몇 %인가요?&#10;맘스타그램 | 임산부도 사용해도 되나요?">${l.list}</textarea>
        <div style="display:flex; align-items:center; justify-content:space-between; background:#f8fafc; padding:14px 18px; border-radius:10px; border:1.5px solid #e2e8f0; margin-bottom:16px;">
          <label style="font-size:14px; font-weight:700; color:#374151;">자동 전송 주기</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="number" id="bot-interval" class="modern-input" value="${l.interval}" min="1" style="width:72px; text-align:center; font-weight:700;">
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
              <input type="checkbox" id="auto-reply-active" ${l.autoReplyActive?`checked`:``} style="width:16px; height:16px; accent-color:#3b82f6;"> 자동응답 활성화
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

      <!-- 이벤트 관리 뷰 -->
      <div id="chat-sub-event" class="chat-sub-view" style="display:none;">
      <!-- 소통왕/구매인증 당첨 배너 제어 (깜짝딜 방식) -->
      <div class="section-card">
        <h3 style="margin:0 0 8px 0; border:none; padding:0; display:flex; align-items:center; gap:6px;">
          <span>당첨 알림 배너 제어 (소통왕/구매인증)</span>
          ${o.winner_timestamp&&Number(o.winner_timestamp)>Date.now()?`<span style="font-size:11px; font-weight:700; background:#3b82f6; color:#fff; padding:2px 8px; border-radius:12px;">노출 진행중</span>`:``}
        </h3>
        <p style="font-size:12px; color:#64748b; margin:0 0 14px 0; line-height:1.4;">
          당첨 종류(유형)를 선택하고 닉네임을 적은 뒤 노출 시간(분)을 입력하고 시작을 누르면 배너가 활성화됩니다.
        </p>
        
        <!-- 당첨 유형 세그먼트 스위치 그룹 -->
        <div style="display:flex; gap:10px; margin-bottom:14px; align-items:center;">
          <span style="font-size:13px; font-weight:700; color:#495057;">당첨 유형:</span>
          <div id="winner-type-segmented" style="display:inline-flex; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:10px; padding:3px; overflow:hidden; box-shadow:inset 0 2px 4px rgba(0,0,0,0.05);">
            <button type="button" class="type-segment-btn ${!o.winner_name||!o.winner_name.startsWith(`구매인증`)?`active`:``}" data-type="소통왕" style="padding:6px 16px; border:none; border-radius:7px; font-size:12px; font-weight:700; cursor:pointer; outline:none; transition:all 0.15s; background:${!o.winner_name||!o.winner_name.startsWith(`구매인증`)?`#3b82f6`:`transparent`}; color:${!o.winner_name||!o.winner_name.startsWith(`구매인증`)?`#fff`:`#64748b`};">소통왕</button>
            <button type="button" class="type-segment-btn ${o.winner_name&&o.winner_name.startsWith(`구매인증`)?`active`:``}" data-type="구매인증" style="padding:6px 16px; border:none; border-radius:7px; font-size:12px; font-weight:700; cursor:pointer; outline:none; transition:all 0.15s; background:${o.winner_name&&o.winner_name.startsWith(`구매인증`)?`#3b82f6`:`transparent`}; color:${o.winner_name&&o.winner_name.startsWith(`구매인증`)?`#fff`:`#64748b`};">구매인증</button>
          </div>
        </div>

        <div style="display:flex; gap:8px; align-items:center;">
          <input type="text" class="modern-input" style="flex:2; padding:8px 12px; font-size:13px;" id="winner-announce-text" placeholder="당첨자 닉네임 입력 (예: 라이진)" value="${o.winner_name&&o.winner_name.includes(`|`)?o.winner_name.split(`|`)[1]:o.winner_name||``}">
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
    `;let e=T.querySelectorAll(`.chat-sub-tab-btn`),n=T.querySelectorAll(`.chat-sub-view`);e.forEach(t=>{t.addEventListener(`click`,()=>{e.forEach(e=>{e.classList.remove(`active`),e.style.background=`transparent`,e.style.color=`#64748b`,e.style.fontWeight=`600`,e.style.boxShadow=`none`}),t.classList.add(`active`),t.style.background=`#fff`,t.style.color=`#0f172a`,t.style.fontWeight=`700`,t.style.boxShadow=`0 1px 3px rgba(0,0,0,0.1)`,n.forEach(e=>e.style.display=`none`);let r=document.getElementById(`chat-sub-${t.dataset.subtab}`);r&&(r.style.display=`block`)})});let r=document.getElementById(`cfg-bannedWords`),i=document.getElementById(`cfg-bannedUsers`),a=()=>{o.bannedWords=r.value.trim(),o.bannedUsers=i.value.trim(),m()};r&&r.addEventListener(`change`,a),i&&i.addEventListener(`change`,a);let h=document.getElementById(`admin-chat-input`),g=document.getElementById(`admin-chat-list`),v=document.getElementById(`admin-nickname-input`),y=document.getElementById(`admin-color-input`),b=document.getElementById(`admin-color-code`),x=document.getElementById(`admin-bg-color-input`),S=document.getElementById(`admin-bg-color-code`),C=async()=>{let e=document.getElementById(`winner-table-body`);if(e)try{if(!X)return;let{data:n,error:r}=await X.from(`live_winners`).select(`*`).eq(`live_id`,t).order(`created_at`,{ascending:!1});if(r)throw r;if(!n||n.length===0){e.innerHTML=`<tr><td colspan="5" style="text-align:center; padding:30px; color:#94a3b8;">당첨자 제출 목록이 없습니다.</td></tr>`;return}e.innerHTML=n.map(e=>{let t=new Date(e.created_at).toLocaleTimeString(`ko-KR`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`});return`
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:10px 12px; font-weight:700; color:#0f172a;">${e.nickname}</td>
              <td style="padding:10px 12px; font-weight:600; color:#374151;">${e.name||`-`}</td>
              <td style="padding:10px 12px; font-family:monospace; color:#374151;">${e.phone||`-`}</td>
              <td style="padding:10px 12px; color:#475569; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${e.address||``}">${e.address||``}</td>
              <td style="padding:10px 12px; text-align:right; color:#94a3b8; font-size:11px;">${t}</td>
            </tr>
          `}).join(``)}catch(e){console.warn(`Failed to fetch winners`,e)}};document.getElementById(`btn-refresh-winners`)?.addEventListener(`click`,C),C();let w=setInterval(C,1e4);v&&v.addEventListener(`input`,()=>{localStorage.setItem(`ryzin_admin_nickname`,v.value.trim())}),y&&y.addEventListener(`input`,()=>{localStorage.setItem(`ryzin_admin_color`,y.value),b&&(b.textContent=y.value)}),x&&x.addEventListener(`input`,()=>{localStorage.setItem(`ryzin_admin_bg_color`,x.value),S&&(S.textContent=x.value)});let E=!1,D=async()=>{let e=h.value.trim();if(!e||E)return;E=!0;let n=(v?v.value.trim():``)||`관리자`,r=y?y.value:`#ffca28`,i=x?x.value:`#e50914`,a=`${n}|${r}|${i}`,o=Date.now(),s=document.createElement(`div`);s.style.cssText=`margin-bottom:8px; padding:8px 12px; border-radius:10px; background:${i}22; border-left:4px solid ${r}; display:flex; flex-direction:column; gap:2px;`,s.innerHTML=`<span style="font-weight:700; color:${r}; font-size:12px;">${n}</span><span style="font-size:13px; color:#1e293b;">${e}</span>`,g.innerHTML.includes(`실시간 채팅`)&&(g.innerHTML=``),g.appendChild(s),g.scrollTop=g.scrollHeight,h.value=``;try{if(!X)return;await X.from(`live_chats`).insert([{live_id:t,created_at:o,nickname:a,content:e}])}catch(e){console.warn(`Admin chat send failed`,e)}finally{E=!1}};document.getElementById(`btn-send-chat`).addEventListener(`click`,D),h.addEventListener(`keypress`,e=>{e.key===`Enter`&&D()}),document.getElementById(`btn-clear-chats`).addEventListener(`click`,async()=>{if(confirm(`📡 이 라이브 방송의 모든 실시간 채팅 내역을 초기화(영구 삭제)하시겠습니까?
이 작업은 복구할 수 없습니다.`)){let e=document.getElementById(`btn-clear-chats`);e.disabled=!0,e.textContent=`초기화 중...`;try{if(!X)throw Error(`Supabase client가 로드되지 않았습니다.`);let{error:e}=await X.from(`live_chats`).delete().eq(`live_id`,t);if(e)throw e;alert(`채팅 내역이 성공적으로 초기화되었습니다!`),g.innerHTML=`<div style="color:#94a3b8; text-align:center; padding-top:70px; font-weight:500;">
            <div style="font-size:24px; margin-bottom:8px;">💭</div>
            실시간 채팅 내역이 여기에 표시됩니다.
          </div>`}catch(e){alert(`채팅 내역 초기화 실패: `+e.message)}finally{e.disabled=!1,e.textContent=`채팅 내역 초기화`}}});let O=document.getElementById(`bot-chat-list`),k=document.getElementById(`bot-interval`);O.addEventListener(`input`,()=>{l.list=O.value,_()}),k.addEventListener(`input`,()=>{l.interval=parseInt(k.value)||10,_()});let A=()=>{let e=document.getElementById(`bot-icon`),t=document.getElementById(`bot-text`),n=document.getElementById(`btn-toggle-bot`);n&&(d?(e.textContent=`⏸`,t.textContent=`채팅 봇 중지`,n.className=`action-btn btn-danger-solid`,n.style.cssText=`width:100%; justify-content:center; padding:14px; font-size:15px; gap:8px;`):(e.textContent=`▶`,t.textContent=`채팅 봇 시작`,n.className=`action-btn btn-primary-solid`,n.style.cssText=`width:100%; justify-content:center; padding:14px; font-size:15px; gap:8px;`))};A(),document.getElementById(`btn-toggle-bot`).addEventListener(`click`,()=>{if(d=!d,d){if(p=O.value.split(`
`).map(e=>e.trim()).filter(e=>e.includes(`|`)),p.length===0){alert(`닉네임|내용 형식으로 1줄 이상 입력해주세요.`),d=!1;return}f>=p.length&&(f=0),A();let e=parseInt(k.value)||10;u&&clearInterval(u),u=setInterval(async()=>{if(f>=p.length){clearInterval(u),u=null,d=!1,A();return}let[e,...n]=p[f++].split(`|`),r=n.join(`|`).trim();if(!e||!r)return;let i=Date.now(),a=document.createElement(`div`);a.style.cssText=`margin-bottom:8px; padding:6px 0; border-bottom:1px solid #f1f5f9;`,a.innerHTML=`<span style="font-weight:700; color:#64748b;">${e.trim()}:</span> ${r}`,g.innerHTML.includes(`실시간 채팅`)&&(g.innerHTML=``),g.appendChild(a),g.scrollTop=g.scrollHeight;try{if(!X)return;await X.from(`live_chats`).insert([{live_id:t,created_at:i,nickname:e.trim(),content:r}])}catch(e){console.warn(`Bot chat failed`,e)}},e*1e3)}else u&&clearInterval(u),u=null,A()});let j=document.getElementById(`auto-reply-active`),M=document.getElementById(`btn-add-ar`),N=document.getElementById(`ar-title`),P=document.getElementById(`ar-keywords`),ee=document.getElementById(`ar-answer`),te=document.getElementById(`ar-list-container`),F=()=>{if(te){if(!l.autoReplyRules||l.autoReplyRules.length===0){te.innerHTML=`<div style="text-align:center; padding:20px; color:#94a3b8; font-size:13px; font-weight:500;">등록된 자동응답 규칙이 없습니다.</div>`;return}te.innerHTML=l.autoReplyRules.map((e,t)=>`
        <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; padding:12px 14px; border:1px solid #cbd5e1; border-radius:8px; box-shadow:0 1px 2px rgba(0,0,0,0.02);">
          <div style="flex:1; overflow:hidden;">
            <div style="font-weight:700; font-size:14px; color:#0f172a; margin-bottom:6px;">${e.title||`규칙 `+(t+1)}</div>
            <div style="font-size:12px; color:#64748b; margin-bottom:4px; line-height:1.4;"><span style="font-weight:700; color:#3b82f6;">키워드:</span> ${e.keywords}</div>
            <div style="font-size:12px; color:#475569; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; line-height:1.4;"><span style="font-weight:700; color:#10b981;">답변:</span> ${e.answer}</div>
          </div>
          <button class="btn-del-ar action-btn" data-index="${t}" style="background:#fef2f2; color:#ef4444; border:1px solid #fecaca; padding:6px 12px; font-size:12px; margin-left:12px; flex-shrink:0;">삭제</button>
        </div>
      `).join(``),te.querySelectorAll(`.btn-del-ar`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.target.dataset.index);l.autoReplyRules.splice(t,1),_(),F()})})}};j&&j.addEventListener(`change`,e=>{l.autoReplyActive=e.target.checked,_()}),M&&M.addEventListener(`click`,()=>{let e=N.value.trim(),t=P.value.trim(),n=ee.value.trim();if(!t||!n){alert(`키워드와 답변 내용을 모두 입력해주세요.`);return}l.autoReplyRules||=[],l.autoReplyRules.push({title:e,keywords:t,answer:n}),_(),N.value=``,P.value=``,ee.value=``,F()}),F();let I=0,ne=null,re=(e,n,r=!1)=>{g.innerHTML.includes(`실시간 채팅 내역이 여기에`)&&(g.innerHTML=``);let i=document.createElement(`div`);i.style.cssText=`margin-bottom:8px; padding:6px 0; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;`+(r?`opacity:0.72;`:``);let a=e===`관리자`||e.includes(`|`)?`#3b82f6`:`#64748b`,l=e,u=!1;e.includes(`|`)?(l=e.split(`|`)[0],u=!0):e===`관리자`&&(u=!0);let d=!u&&l!==`?`?`<button class="btn-ban-user" data-nickname="${l}" style="background:#ef4444; color:#fff; border:none; border-radius:4px; padding:2px 8px; font-size:11px; font-weight:700; cursor:pointer; margin-left:8px; line-height:1.4; flex-shrink:0;">차단</button>`:``;i.innerHTML=`
        <div style="flex:1; min-width:0; word-break:break-all; font-size:13px;">
          <span style="font-weight:700; color:${a};">${l}:</span> ${n}
        </div>
        ${d}
      `;let f=i.querySelector(`.btn-ban-user`);f&&f.addEventListener(`click`,e=>{e.stopPropagation();let n=f.dataset.nickname;if(confirm(`📡 [${n}] 시청자를 차단하시겠습니까?\n차단 이후에는 이 시청자의 채팅 전송이 제한됩니다.`)){let e=o.bannedUsers?o.bannedUsers.split(`,`).map(e=>e.trim()).filter(e=>e):[];e.includes(n)||(e.push(n),o.bannedUsers=e.join(`,`),m(),jt(t,o,s,c,!0),alert(`[${n}] 님이 정상 차단되었습니다.`),R())}}),g.appendChild(i),r||(g.scrollTop=g.scrollHeight)},ie=async()=>{if(X)try{let{data:e,error:n}=await X.from(`live_chats`).select(`*`).eq(`live_id`,t).order(`created_at`,{ascending:!1}).limit(300);if(n)throw n;e&&Array.isArray(e)&&(e.reverse().forEach(e=>{re(e.nickname||`?`,e.content||``,!0),I=parseInt(e.created_at)||0}),setTimeout(()=>{g.scrollTop=g.scrollHeight},100))}catch(e){console.warn(`Failed to load chat history`,e)}};window.updateAdminViewersDisplay=()=>{let e=document.getElementById(`cfg-viewers-display`);e&&(e.innerHTML=`${(s.viewers+(s.cumViewers||0)).toLocaleString()}명 <span style="font-size:11px; font-weight:normal; color:#64748b; margin-left:4px;">(방송+수동: ${s.viewers.toLocaleString()}, 누적: ${(s.cumViewers||0).toLocaleString()})</span>`);let t=document.getElementById(`cfg-cumViewers`);t&&(t.value=s.cumViewers||0);let n=document.getElementById(`cfg-hearts`);n&&(n.value=s.hearts||0)};let ae=null;ie(),X&&(ne=X.channel(`admin-chat-ui-channel-${t}`).on(`postgres_changes`,{event:`INSERT`,schema:`public`,table:`live_chats`,filter:`live_id=eq.${t}`},e=>{let t=e.new;t&&parseInt(t.created_at)>I&&(re(t.nickname||`?`,t.content||``,!1),I=parseInt(t.created_at))}).subscribe()),X&&(ae=setInterval(async()=>{try{let{data:e,error:n}=await X.from(`live_control`).select(`viewers, cum_viewers, hearts`).eq(`live_id`,t).maybeSingle();e&&!n&&(s.viewers=parseInt(e.viewers)||0,s.cumViewers=parseInt(e.cum_viewers)||0,s.hearts=parseInt(e.hearts)||0,typeof window.updateAdminViewersDisplay==`function`&&window.updateAdminViewersDisplay())}catch{}},3e3)),T.addEventListener(`adminTabLeave`,()=>{ne&&X.removeChannel(ne),ae&&clearInterval(ae),w&&clearInterval(w)});let oe=document.getElementById(`btn-winner-start`),L=document.getElementById(`btn-winner-cancel`),z=o.winner_name&&o.winner_name.startsWith(`구매인증`)?`구매인증`:`소통왕`,se=T.querySelectorAll(`.type-segment-btn`);se.forEach(e=>{e.addEventListener(`click`,()=>{se.forEach(e=>{e.classList.remove(`active`),e.style.background=`transparent`,e.style.color=`#64748b`}),e.classList.add(`active`),e.style.background=`#3b82f6`,e.style.color=`#fff`,z=e.dataset.type})}),oe&&oe.addEventListener(`click`,async()=>{let e=document.getElementById(`winner-announce-text`).value.trim(),n=parseInt(document.getElementById(`winner-announce-min`).value)||1;if(!e){alert(`당첨자 닉네임을 입력해 주세요.`);return}oe.disabled=!0,oe.textContent=`적용 중...`;let r=`${z}|${e}`,i=Date.now()+n*60*1e3;try{if(!X)return;let{error:e}=await X.from(`live_control`).update({winner_name:r,winner_timestamp:i,updated_at:new Date().toISOString()}).eq(`live_id`,t);if(e)throw e;o.winner_name=r,o.winner_timestamp=i,R()}catch{alert(`시작 처리에 실패했습니다.`)}finally{oe.disabled=!1,oe.textContent=`시작`}}),L&&L.addEventListener(`click`,async()=>{L.disabled=!0,L.textContent=`종료 중...`;try{if(!X)return;let{error:e}=await X.from(`live_control`).update({winner_timestamp:0,updated_at:new Date().toISOString()}).eq(`live_id`,t);if(e)throw e;o.winner_timestamp=0,R()}catch{alert(`종료 처리에 실패했습니다.`)}finally{L.disabled=!1,L.textContent=`종료`}})},z=()=>c.map((e,t)=>{let n=e.clicks||0;return`
    <div class="product-row">
      <div class="product-img-box" onclick="document.getElementById('upload-prod-${t}').click()" title="클릭하여 이미지 변경">
        <img src="${e.image||`https://via.placeholder.com/72`}" id="img-prev-${t}">
        <input type="file" id="upload-prod-${t}" accept="image/*" style="display:none;" data-idx="${t}" class="prod-img-upload">
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
          <label style="font-size:12px; color:#475569; font-weight:700; display:flex; align-items:center; gap:5px; cursor:pointer; user-select:none; white-space:nowrap; background:#f8fafc; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px;">
            <input type="checkbox" data-idx="${t}" data-field="isLeadForm" ${e.isLeadForm===!0||e.isLeadForm===`true`?`checked`:``} style="width:14px; height:14px; accent-color:#3b82f6;">
            상담문의
          </label>
          <label style="font-size:12px; color:#475569; font-weight:700; display:flex; align-items:center; gap:5px; cursor:pointer; user-select:none; white-space:nowrap; background:#f8fafc; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px;">
            <input type="checkbox" data-idx="${t}" data-field="hideByDefault" ${e.hideByDefault===!0||e.hideByDefault===`true`?`checked`:``} style="width:14px; height:14px; accent-color:#16a34a;">
            평소숨김
          </label>
          <span style="font-size:12px; font-weight:700; color:#3b82f6; background:#eff6ff; padding:8px 10px; border-radius:8px; white-space:nowrap;">조회: ${n.toLocaleString()}</span>
          <button class="action-btn btn-neutral btn-move-up" data-idx="${t}" style="padding:8px 10px; font-size:13px; flex-shrink:0; cursor:pointer;" ${t===0?`disabled`:``}>▲</button>
          <button class="action-btn btn-neutral btn-move-down" data-idx="${t}" style="padding:8px 10px; font-size:13px; flex-shrink:0; cursor:pointer;" ${t===c.length-1?`disabled`:``}>▼</button>
          <button class="action-btn btn-danger-solid btn-del-product" data-idx="${t}" style="padding:8px 14px; font-size:13px; white-space:nowrap; flex-shrink:0;">삭제</button>
        </div>
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
          </div>
        </details>
      </div>
    </div>
    `}).join(``),se=()=>{T.innerHTML=`
      <div class="section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; margin-bottom:20px;">
          <h3 style="margin:0; border:none; padding:0;">상품 관리</h3>
          <div style="display:flex; gap:8px;">
            <button id="btn-add-product" class="action-btn btn-neutral" style="padding:8px 16px; font-size:13px;">+ 상품 추가</button>
            <button id="btn-save-products" class="action-btn btn-primary-solid" style="padding:8px 16px; font-size:13px;">적용</button>
          </div>
        </div>
        <div id="product-list-container">${z()}</div>
      </div>
    `,X&&X.from(`live_control`).select(`products`).eq(`live_id`,t).maybeSingle().then(({data:t,error:n})=>{if(n)throw n;if(t&&t.products)try{let n=typeof t.products==`string`?JSON.parse(t.products):t.products;if(Array.isArray(n)||(n=[]),Array.isArray(n)){!c||c.length===0?c=n:c.forEach(e=>{let t=n.find(t=>t.name===e.name);t&&(e.clicks=parseInt(t.clicks)||0,!e.image&&t.image&&(e.image=t.image))}),g();let t=document.getElementById(`product-list-container`);t&&(t.innerHTML=z(),e())}}catch{}}).catch(e=>console.warn(`Failed to load product clicks from Supabase`,e));let e=()=>{let n=document.getElementById(`product-list-container`);n.querySelectorAll(`.price-input`).forEach(e=>{e.addEventListener(`input`,e=>{let t=e.target.value.replace(/[^0-9]/g,``);e.target.value=t?Number(t).toLocaleString():``})}),n.querySelectorAll(`input[data-field]`).forEach(t=>{t.addEventListener(`change`,t=>{let r=parseInt(t.target.dataset.idx),i=t.target.dataset.field;if(t.target.type===`checkbox`){if(c[r][i]=t.target.checked,i===`isLeadForm`){t.target.checked?c[r].url=`__LEAD_FORM__`:c[r].url===`__LEAD_FORM__`&&(c[r].url=``),n.innerHTML=z(),e();return}}else i===`price`||i===`normalPrice`?c[r][i]=t.target.value.replace(/[^0-9]/g,``):c[r][i]=t.target.value;if(i===`price`||i===`normalPrice`){let e=Number((c[r].normalPrice||``).toString().replace(/[^0-9]/g,``)),t=Number((c[r].price||``).toString().replace(/[^0-9]/g,``));if(e>0&&e>=t){c[r].discountRate=Math.floor((e-t)/e*100);let i=n.querySelector(`input[data-idx="${r}"][data-field="discountRate"]`);i&&(i.value=c[r].discountRate)}else{c[r].discountRate=0;let e=n.querySelector(`input[data-idx="${r}"][data-field="discountRate"]`);e&&(e.value=0)}}g()})}),n.querySelectorAll(`.prod-img-upload`).forEach(t=>{t.addEventListener(`change`,async t=>{let r=t.target.files[0];if(!r)return;let a=parseInt(t.target.dataset.idx),o=document.getElementById(`img-prev-${a}`);o&&(o.style.opacity=`0.5`);try{let t=await i(await new Promise((e,t)=>{let n=new FileReader;n.onload=()=>e(n.result.split(`,`)[1]),n.onerror=t,n.readAsDataURL(r)}));if(!t)throw Error(`서버로부터 다운로드 URL을 받지 못했습니다.`);c[a].image=t,o&&(o.src=t),g(),n.innerHTML=z(),e(),alert(`🎉 상품 이미지 변경 성공!`)}catch(e){console.error(e),alert(`❌ 상품 이미지 업로드 에러:
`+e.message)}finally{o&&(o.style.opacity=`1`)}})}),n.querySelectorAll(`.btn-deal-start`).forEach(r=>{r.addEventListener(`click`,r=>{let i=parseInt(r.target.dataset.idx),a=parseInt(document.getElementById(`deal-min-${i}`).value);a>0&&(c[i].dealText=document.getElementById(`deal-text-${i}`).value||`깜짝딜 종료까지`,c[i].dealEndTime=Date.now()+a*60*1e3,g(),n.innerHTML=z(),e(),jt(t,o,s,c,!0),setTimeout(()=>alert(`${a}분 깜짝딜이 시작되었습니다!`),10))})}),n.querySelectorAll(`.btn-deal-cancel`).forEach(r=>{r.addEventListener(`click`,r=>{let i=parseInt(r.target.dataset.idx);c[i].dealEndTime=0,g(),n.innerHTML=z(),e(),jt(t,o,s,c,!0)})}),n.querySelectorAll(`.btn-del-product`).forEach(t=>{t.addEventListener(`click`,t=>{let r=parseInt(t.target.dataset.idx),i=c[r]?.name||`이 상품`;confirm(`정말 "${i}" 상품을 삭제하시겠습니까?`)&&(c.splice(r,1),g(),n.innerHTML=z(),e())})}),n.querySelectorAll(`.btn-move-up`).forEach(t=>{t.addEventListener(`click`,t=>{let r=parseInt(t.target.dataset.idx);if(r>0){let t=c[r-1];c[r-1]=c[r],c[r]=t,g(),n.innerHTML=z(),e()}})}),n.querySelectorAll(`.btn-move-down`).forEach(t=>{t.addEventListener(`click`,t=>{let r=parseInt(t.target.dataset.idx);if(r<c.length-1){let t=c[r+1];c[r+1]=c[r],c[r]=t,g(),n.innerHTML=z(),e()}})})};e(),document.getElementById(`btn-add-product`).addEventListener(`click`,()=>{c.push({id:Date.now(),name:`새 상품`,price:``,normalPrice:``,discountRate:0,image:`https://via.placeholder.com/72`,url:`#`}),g(),document.getElementById(`product-list-container`).innerHTML=z(),e()}),document.getElementById(`btn-save-products`).addEventListener(`click`,()=>{jt(t,o,s,c,!0),alert(`상품 목록이 적용되었습니다!`)})},ce=()=>{T.innerHTML=`
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
    `;let e=[],n=async()=>{try{if(!X)throw Error(`Supabase 미연동`);let{data:n,error:r}=await X.from(`live_leads`).select(`*`).eq(`live_id`,t).order(`created_at`,{ascending:!1});if(r)throw r;e=n||[];let i=document.getElementById(`leads-list-container`),a=document.getElementById(`btn-download-csv-leads`);if(a&&(a.style.display=e.length>0?`block`:`none`),!i)return;if(e.length===0){i.innerHTML=`<div style="text-align:center; padding:40px; color:#94a3b8; font-size:14px; background:#f8fafc; border-radius:12px;">아직 접수된 상담문의가 없습니다.</div>`;return}let o=`
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
`;e.forEach(e=>{let t=new Date(e.created_at).toLocaleString(`ko-KR`).replace(/,/g,``),r=(e.name||``).replace(/,/g,` `),i=(e.phone||``).replace(/,/g,` `);n+=`${t},${r},${i}\n`});let r=new Blob([`﻿`+n],{type:`text/csv;charset=utf-8;`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`상담DB_${t}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)})},le=v.querySelector(`#btn-back`);le&&le.addEventListener(`click`,()=>{T.dispatchEvent(new Event(`adminTabLeave`)),w(),u&&clearInterval(u),de&&X.removeChannel(de),ue&&X.removeChannel(ue),n(null)});let B=v.querySelector(`#btn-refresh-preview`);B&&B.addEventListener(`click`,()=>{let e=v.querySelector(`#live-preview-iframe`);e&&(e.src=D)});let ue=null;X&&(ue=X.channel(`bot-sync-${t}`).on(`postgres_changes`,{event:`INSERT`,schema:`public`,table:`live_chats`,filter:`live_id=eq.${t}`},e=>{let n=e.new;if(n&&l.autoReplyActive&&l.autoReplyRules&&l.autoReplyRules.length>0){let e=n.nickname||``;if(!e.includes(`|`)&&e!==`관리자`&&e!==`자동응답봇`){let e=(n.content||``).toLowerCase();for(let n of l.autoReplyRules)if(n.keywords.split(`,`).map(e=>e.trim().toLowerCase()).filter(e=>e).some(t=>e.includes(t))){setTimeout(async()=>{try{if(!X)return;await X.from(`live_chats`).insert([{live_id:t,nickname:`자동응답봇`,content:n.answer,created_at:Date.now().toString()}])}catch(e){console.warn(`Auto-reply failed`,e)}},600);break}}}}).subscribe());let de=null;X&&(de=X.channel(`admin-sync-${t}`).on(`postgres_changes`,{event:`UPDATE`,schema:`public`,table:`live_control`,filter:`live_id=eq.${t}`},e=>{let n=e.new;if(!n)return;o.brandName=n.title||``,o.title=n.subtitle||``;let r=n.profile_image||``,i=`라이브 보기`,a=`right`,s=``,l=!1,u=r.split(`#`),d=u[0];u.slice(1).forEach(e=>{e===`nosplash`||(e.startsWith(`widgetText=`)?i=decodeURIComponent(e.replace(`widgetText=`,``)):e.startsWith(`widgetPosition=`)?a=e.replace(`widgetPosition=`,``):e.startsWith(`widgetImageUrl=`)?s=e.replace(`widgetImageUrl=`,``):e.startsWith(`showOnMain=`)&&(l=e.replace(`showOnMain=`,``)===`true`))}),o.showSplash=!r.includes(`#nosplash`),o.logoUrl=d,o.widgetText=i,o.widgetPosition=a,o.widgetImageUrl=s,o.showOnMain=l,o.streamUrl=n.stream_url||``,o.showViewers=n.show_viewers!==!1,o.thumbnailUrl=n.thumbnail_url||``,o.liveStartTime=n.start_time||``,o.isLive=n.status===`ON`,o.shareTitle=n.share_title||``,o.shareDesc=n.share_desc||``,o.shareImageUrl=n.share_image||``,o.likeImageUrl=n.like_image_url||``,o.bannedWords=n.banned_words||``,o.bannedUsers=n.banned_users||``,n.winner_name!==void 0&&(o.winner_name=n.winner_name),n.winner_timestamp!==void 0&&(o.winner_timestamp=n.winner_timestamp),St(t,o);let f=(e,t)=>{let n=v.querySelector(`#`+e)||document.getElementById(e);n&&document.activeElement!==n&&(n.type===`checkbox`?n.checked=!!t:n.value=t)};f(`cfg-brandName`,o.brandName),f(`cfg-title`,o.title),f(`cfg-stream`,o.streamUrl),f(`cfg-showViewers`,o.showViewers),f(`cfg-liveStartTime`,o.liveStartTime),f(`cfg-shareTitle`,o.shareTitle),f(`cfg-shareDesc`,o.shareDesc),f(`cfg-bannedWords`,o.bannedWords),f(`cfg-bannedUsers`,o.bannedUsers);let p=v.querySelector(`#logo-preview`)||document.getElementById(`logo-preview`);p&&(p.src=o.logoUrl);let m=v.querySelector(`#thumbnail-preview`)||document.getElementById(`thumbnail-preview`);m&&(m.src=o.thumbnailUrl);let h=v.querySelector(`#like-preview`)||document.getElementById(`like-preview`);h&&(h.src=o.likeImageUrl,h.style.display=o.likeImageUrl?`block`:`none`);let g=v.querySelector(`#like-preview-placeholder`)||document.getElementById(`like-preview-placeholder`);g&&(g.style.display=o.likeImageUrl?`none`:`block`);let _=v.querySelector(`#btn-clear-like-icon`)||document.getElementById(`btn-clear-like-icon`);_&&(_.style.display=o.likeImageUrl?`block`:`none`);let y=v.querySelector(`#btn-toggle-live`)||document.getElementById(`btn-toggle-live`);if(y&&document.activeElement!==y&&(y.textContent=o.isLive?`라이브 종료`:`라이브 시작`,y.className=`action-btn ${o.isLive?`btn-danger-solid`:`btn-success-solid`}`),n.products&&Array.isArray(n.products)){let e=JSON.stringify(n.products);if(JSON.stringify(c)!==e){Array.isArray(c)||(c=[]),c.length=0,c.push(...n.products),Et(t,c);let e=v.querySelector(`#product-list-container`)||document.getElementById(`product-list-container`);e&&!e.contains(document.activeElement)&&typeof z==`function`&&(e.innerHTML=z())}}}).subscribe());let fe=b.querySelectorAll(`.tab-btn`),pe=e=>{T.dispatchEvent(new Event(`adminTabLeave`)),fe.forEach(t=>t.classList.toggle(`active`,t.dataset.tab===e)),e===`config`?L():e===`chat`?R():e===`product`?se():e===`leads`&&ce()};fe.forEach(e=>{e.addEventListener(`click`,()=>pe(e.dataset.tab))}),L()}function It(){let e=document.createElement(`div`),t=``;function n(){let r=U.getAll(`hosts`);if(t){let e=t.toLowerCase();r=r.filter(t=>t.name.toLowerCase().includes(e)||t.phone&&t.phone.includes(e))}let i=r.map(e=>{let t=U.getHostStats(e.id);return{...e,stats:t}});e.innerHTML=`
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
                    <td class="text-right">${et(e.stats.totalBroadcasts)}회</td>
                    <td class="text-right">${et(e.stats.monthBroadcasts)}회</td>
                    <td class="text-right">${W(e.stats.totalSettlement)}</td>
                    <td>${G(e.stats.lastBroadcastDate)}</td>
                    <td class="text-right">${W(e.stats.avgRevenue)}</td>
                    <td class="text-right">${tt(e.stats.avgROI)}</td>
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
    `,setTimeout(()=>{e.querySelector(`#host-search`)?.addEventListener(`input`,e=>{t=e.target.value,n();let r=document.getElementById(`host-search`);if(r){r.focus();let e=r.value.length;r.setSelectionRange(e,e)}}),e.querySelector(`#btn-add-host`)?.addEventListener(`click`,()=>{Lt()}),e.querySelectorAll(`.host-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),M.navigate(`/hosts/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`.btn-edit-host`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),Lt(e.getAttribute(`data-id`))})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>{M.navigate(`/hosts/${e.getAttribute(`data-id`)}`)})})},0)}return n(),U.on(`hosts:changed`,n),e}function Lt(e=null){let t=!!e,n=t?U.getById(`hosts`,e):{},r=`
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
          ${oe.map(e=>`<option value="${e}" ${n.bank===e?`selected`:``}>${e}</option>`).join(``)}
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
  `,i=document.createElement(`div`);if(i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,t){let t=document.createElement(`button`);t.className=`btn btn-danger`,t.textContent=`삭제`,t.style.marginRight=`auto`,t.addEventListener(`click`,()=>{q(),st({title:`쇼호스트 삭제`,message:`"${n.name}" 쇼호스트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`,confirmText:`삭제`,danger:!0,onConfirm:()=>{U.delete(`hosts`,e),J(`쇼호스트가 삭제되었습니다.`)}})}),i.appendChild(t)}let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,q);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=t?`수정`:`등록`,o.addEventListener(`click`,()=>{let n=document.getElementById(`host-name`).value.trim(),r=document.getElementById(`host-phone`).value.trim();if(!n){Y(`이름을 입력해주세요.`);return}let i={name:n,phone:r,ssn:document.getElementById(`host-ssn`).value.trim(),bank:document.getElementById(`host-bank`).value,account:document.getElementById(`host-account`).value.trim(),accountHolder:document.getElementById(`host-holder`).value.trim(),address:document.getElementById(`host-address`).value.trim()};t?(U.update(`hosts`,e,i),J(`쇼호스트 정보가 수정되었습니다.`)):(i.id=L(`host`),i.memo={features:``,strengths:``,weaknesses:``,style:``,brandPreference:``,caution:``,comment:``},i.createdAt=new Date().toISOString().split(`T`)[0],U.create(`hosts`,i),J(`쇼호스트가 등록되었습니다.`)),q()}),i.appendChild(a),i.appendChild(o),K({title:t?`쇼호스트 수정`:`쇼호스트 등록`,size:`lg`,content:r,footer:i})}function Rt(e){let t=document.createElement(`div`),n=U.getById(`hosts`,e.id);if(!n)return t.innerHTML=`
      <div class="page-header"><div class="page-header-left"><h1 class="page-title">쇼호스트를 찾을 수 없습니다</h1></div></div>
      <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>
    `,setTimeout(()=>{t.querySelector(`#btn-back`)?.addEventListener(`click`,()=>M.navigate(`/hosts`))},0),t;let r=U.getHostStats(n.id),i=n.memo||{},a=U.query(`liveHosts`,e=>e.hostId===n.id).map(e=>{let t=U.getById(`projects`,e.liveId);return{matching:e,project:t,brand:t?U.getById(`brands`,t.brandId):null,result:U.getById(`results`,e.liveId)}}).filter(e=>e.project);return t.innerHTML=`
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
          <div class="stat-value">${et(r.totalBroadcasts)}회</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">이번달 방송</div>
          <div class="stat-value">${et(r.monthBroadcasts)}회</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">누적 정산금액</div>
          <div class="stat-value">${W(r.totalSettlement)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">최근 방송일</div>
          <div class="stat-value">${G(r.lastBroadcastDate)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">평균 매출</div>
          <div class="stat-value">${W(r.avgRevenue)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">평균 ROI</div>
          <div class="stat-value">${tt(r.avgROI)}</div>
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
                <span class="detail-field-value ssn-toggle" data-ssn="${n.ssn||``}" style="cursor: pointer; text-decoration: underline;" title="클릭하여 확인">${n.ssn?nt(n.ssn):`-`}</span>
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
              ${zt(`특징`,i.features)}
              ${zt(`강점`,i.strengths)}
              ${zt(`약점`,i.weaknesses)}
              ${zt(`진행 스타일`,i.style)}
              ${zt(`브랜드 선호도`,i.brandPreference)}
              ${zt(`주의사항`,i.caution)}
              ${zt(`기타`,i.comment)}
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
                  <td class="text-right">${W(e.matching.fee)}</td>
                  <td><span class="badge ${e.matching.settleStatus===`done`?`badge-success`:`badge-default`}">${{pending:`대기`,processing:`진행중`,done:`완료`}[e.matching.settleStatus]||`-`}</span></td>
                  <td>${e.result?W(e.result.liveRevenue):`-`}</td>
                </tr>
              `).join(``):`<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">방송 이력이 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{let e=t.querySelector(`.ssn-toggle`);if(e&&e.dataset.ssn){let t=!0;e.addEventListener(`click`,()=>{t=!t,e.textContent=t?nt(e.dataset.ssn):e.dataset.ssn})}t.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>M.navigate(`/hosts`)),t.querySelector(`#btn-edit-host`)?.addEventListener(`click`,()=>Lt(n.id)),t.querySelector(`#btn-edit-memo`)?.addEventListener(`click`,()=>Bt(n)),t.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),M.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0),t}function zt(e,t){return`
    <div>
      <div style="font-size: var(--text-xs); color: var(--text-tertiary); font-weight: var(--weight-medium); margin-bottom: 2px;">${e}</div>
      <div style="font-size: var(--text-sm); color: var(--text-secondary);">${t||`-`}</div>
    </div>
  `}function Bt(e){let t=e.memo||{},n=[{key:`features`,label:`특징`},{key:`strengths`,label:`강점`},{key:`weaknesses`,label:`약점`},{key:`style`,label:`진행 스타일`},{key:`brandPreference`,label:`브랜드 선호도`},{key:`caution`,label:`주의사항`},{key:`comment`,label:`기타 코멘트`}],r=`
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      ${n.map(e=>`
        <div class="input-group">
          <label>${e.label}</label>
          <textarea class="input" id="memo-${e.key}" rows="2">${t[e.key]||``}</textarea>
        </div>
      `).join(``)}
    </div>
  `,i=document.createElement(`div`);i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,q);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=`저장`,o.addEventListener(`click`,()=>{let t={};n.forEach(e=>{t[e.key]=document.getElementById(`memo-${e.key}`).value.trim()}),U.update(`hosts`,e.id,{memo:t}),q(),J(`메모가 저장되었습니다.`),M.navigate(`/hosts/${e.id}`)}),i.appendChild(a),i.appendChild(o),K({title:`메모 수정`,size:`lg`,content:r,footer:i})}function Vt(){let e=document.createElement(`div`),t=``;function n(){let r=U.getAll(`brands`);if(t){let e=t.toLowerCase();r=r.filter(t=>t.name.toLowerCase().includes(e)||t.manager&&t.manager.toLowerCase().includes(e)||t.category&&t.category.toLowerCase().includes(e))}let i=r.map(e=>{let t=U.getBrandStats(e.id);return{...e,stats:t}});e.innerHTML=`
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
                    <td class="text-right">${et(e.stats.totalBroadcasts)}회</td>
                    <td class="text-right">${W(e.stats.totalRevenue)}</td>
                    <td>${G(e.stats.lastBroadcastDate)}</td>
                    <td class="text-right">${tt(e.stats.avgROI)}</td>
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
    `,setTimeout(()=>{e.querySelector(`#brand-search`)?.addEventListener(`input`,e=>{t=e.target.value,n();let r=document.getElementById(`brand-search`);if(r){r.focus();let e=r.value.length;r.setSelectionRange(e,e)}}),e.querySelector(`#btn-add-brand`)?.addEventListener(`click`,()=>Ht()),e.querySelectorAll(`.brand-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),M.navigate(`/brands/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`.btn-edit-brand`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),Ht(e.getAttribute(`data-id`))})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>M.navigate(`/brands/${e.getAttribute(`data-id`)}`))})},0)}return n(),U.on(`brands:changed`,n),e}function Ht(e=null){let t=!!e,n=t?U.getById(`brands`,e):{},r=`
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
          ${ne.map(e=>`<option value="${e}" ${n.category===e?`selected`:``}>${e}</option>`).join(``)}
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
  `,i=document.createElement(`div`);if(i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,t){let t=document.createElement(`button`);t.className=`btn btn-danger`,t.textContent=`삭제`,t.style.marginRight=`auto`,t.addEventListener(`click`,()=>{q(),st({title:`브랜드 삭제`,message:`"${n.name}" 브랜드를 삭제하시겠습니까?`,confirmText:`삭제`,danger:!0,onConfirm:()=>{U.delete(`brands`,e),J(`브랜드가 삭제되었습니다.`)}})}),i.appendChild(t)}let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,q);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=t?`수정`:`등록`,o.addEventListener(`click`,()=>{let n=document.getElementById(`brand-name`).value.trim();if(!n){Y(`브랜드명을 입력해주세요.`);return}let r={name:n,companyName:document.getElementById(`brand-company`).value.trim(),category:document.getElementById(`brand-category`).value,manager:document.getElementById(`brand-manager`).value.trim(),phone:document.getElementById(`brand-phone`).value.trim(),email:document.getElementById(`brand-email`).value.trim(),businessNo:document.getElementById(`brand-biz`).value.trim(),taxInvoice:document.getElementById(`brand-tax`).value===`true`,address:document.getElementById(`brand-address`).value.trim(),memo:document.getElementById(`brand-memo`).value.trim()};t?(U.update(`brands`,e,r),J(`브랜드 정보가 수정되었습니다.`)):(r.id=L(`brand`),r.createdAt=new Date().toISOString().split(`T`)[0],U.create(`brands`,r),J(`브랜드가 등록되었습니다.`)),q()}),i.appendChild(a),i.appendChild(o),K({title:t?`브랜드 수정`:`브랜드 등록`,size:`lg`,content:r,footer:i})}function Ut(e){let t=document.createElement(`div`),n=U.getById(`brands`,e.id);if(!n)return t.innerHTML=`<div class="page-header"><div class="page-header-left"><h1 class="page-title">브랜드를 찾을 수 없습니다</h1></div></div>
    <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>`,setTimeout(()=>{t.querySelector(`#btn-back`)?.addEventListener(`click`,()=>M.navigate(`/brands`))},0),t;let r=U.getBrandStats(n.id),i=U.query(`projects`,e=>e.brandId===n.id||e.brandName===n.name);return t.innerHTML=`
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
        <div class="stat-card"><div class="stat-label">총 방송횟수</div><div class="stat-value">${et(r.totalBroadcasts)}회</div></div>
        <div class="stat-card"><div class="stat-label">누적 매출</div><div class="stat-value">${W(r.totalRevenue)}</div></div>
        <div class="stat-card"><div class="stat-label">최근 방송일</div><div class="stat-value">${G(r.lastBroadcastDate)}</div></div>
        <div class="stat-card"><div class="stat-label">평균 ROI</div><div class="stat-value">${tt(r.avgROI)}</div></div>
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
              ${i.length>0?i.map(e=>{let t=U.getAll(`results`).find(t=>t.liveId===e.id);return`
                <tr class="clickable" data-id="${e.id}">
                  <td>${at(e.broadcastStatus)}</td>
                  <td><a href="javascript:void(0)" class="project-link" data-id="${e.id}">${G(e.broadcastDate)||`상세보기`}</a></td>
                  <td>${e.platform||`-`}</td>
                  <td class="text-right">${t?et(t.views):`-`}</td>
                  <td class="text-right">${t?$e(t.liveRevenue):`-`}</td>
                  <td class="text-right">${t?tt(t.roi):`-`}</td>
                </tr>`}).join(``):`<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">방송 이력이 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{t.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>M.navigate(`/brands`)),t.querySelector(`#btn-edit-brand`)?.addEventListener(`click`,()=>Ht(n.id)),t.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),M.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0),t}function Wt(e,t){if(!e)return``;let n=e.replace(/\./g,`-`),r=new Date(n);if(isNaN(r.getTime()))return``;let i=0;if(t===`design`?i=-4:t===`cue_sheet`?i=-5:t===`host_cast`&&(i=-7),i===0)return``;let a=new Date(r);a.setDate(a.getDate()+i);let o=String(a.getMonth()+1).padStart(2,`0`),s=String(a.getDate()).padStart(2,`0`),c=new Date;c.setHours(0,0,0,0);let l=a.getTime()-c.getTime(),u=Math.ceil(l/(1e3*60*60*24)),d=``;return d=u===0?`D-Day`:u>0?`D-${u}`:`D+${Math.abs(u)}`,`<br><span style="font-size: 10px; opacity: 0.8; font-weight: normal;">(${o}/${s} 까지 / <strong style="color:var(--status-error);">${d}</strong>)</span>`}function Gt(){let e=document.createElement(`div`),t=``,n={status:``,brand:``,platform:``,month:``,category:``,settleStatus:``},r={basic:!0,host:!0,result:!1,finance:!1},i=`list`,a=new Date;function o(){let s=U.getAll(`projects`);if(U.getAll(`brands`),U.getAll(`hosts`),t){let e=t.toLowerCase();s=s.filter(t=>{let n=U.getById(`brands`,t.brandId),r=U.query(`liveHosts`,e=>e.liveId===t.id).some(t=>{let n=U.getById(`hosts`,t.hostId);return n&&n.name.toLowerCase().includes(e)});return n&&n.name.toLowerCase().includes(e)||r})}n.status&&(s=s.filter(e=>e.broadcastStatus===n.status)),n.brand&&(s=s.filter(e=>e.brandId===n.brand)),n.platform&&(s=s.filter(e=>e.platform===n.platform)),n.month&&(s=s.filter(e=>e.broadcastMonth===n.month||e.broadcastDate&&e.broadcastDate.startsWith(n.month.replace(`-`,`.`))||e.broadcastDate&&e.broadcastDate.startsWith(n.month)?!0:e.broadcastMonth&&e.broadcastMonth.length<=2?parseInt(e.broadcastMonth,10)===parseInt(n.month.split(`-`)[1],10):!1)),n.category&&(s=s.filter(e=>e.category===n.category)),s.sort((e,t)=>(t.broadcastDate||``).localeCompare(e.broadcastDate||``));let c=s.map(e=>{let t=U.getById(`brands`,e.brandId),n=U.query(`liveHosts`,t=>t.liveId===e.id),r=U.getAll(`results`).find(t=>t.liveId===e.id),i=U.getAll(`finances`).find(t=>t.liveId===e.id),a=n[0]?U.getById(`hosts`,n[0].hostId):null,o=n[1]?U.getById(`hosts`,n[1].hostId):null,s=n.reduce((e,t)=>e+(t.fee||0),0),c=n.length>0&&n.every(e=>e.settleStatus===`done`)?`완료`:n.some(e=>e.settleStatus===`done`)?`일부완료`:`대기`;return{...e,brand:t,matchings:n,result:r,finance:i,hostA:a,hostB:o,totalHostFee:s,settleLabel:c,hostAFee:n[0]?.fee||0,hostBFee:n[1]?.fee||0}});[...new Set(U.getAll(`projects`).map(e=>e.broadcastMonth).filter(Boolean))].sort().reverse();function l(e){let t=a.getFullYear(),n=a.getMonth(),r=new Date(t,n,1).getDay(),i=new Date(t,n+1,0).getDate(),o=new Date,s=o.getFullYear()===t&&o.getMonth()===n,c=``;for(let e=0;e<r;e++)c+=`<div class="calendar-day empty"></div>`;for(let r=1;r<=i;r++){let i=`${t}-${String(n+1).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`,a=e.filter(e=>e.broadcastDate===i),l=s&&o.getDate()===r,u=a.map(e=>{let t=`#e2e8f0`,n=`#475569`;return e.broadcastStatus===`ready`?(t=`#dbeafe`,n=`#2563eb`):e.broadcastStatus===`live`?(t=`#fee2e2`,n=`#dc2626`):e.broadcastStatus===`done`?(t=`#dcfce3`,n=`#16a34a`):e.broadcastStatus===`cancel`&&(t=`#f1f5f9`,n=`#64748b`),`
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
      `}let u=`
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
      </div>`,d=[...new Set(s.map(e=>{if(e.broadcastDate){let t=new Date(e.broadcastDate.replace(/\./g,`-`));if(!isNaN(t.getTime()))return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`}if(e.broadcastMonth){let t=String(e.broadcastMonth);return!t.includes(`-`)&&t.length<=2&&(t=`2026-${t.padStart(2,`0`)}`),t}return null}).filter(Boolean))].sort().reverse(),f=``;f=i===`list`?`
        <!-- 필터바 -->
        <div class="filter-bar">
          <select class="filter-select ${n.month?`active`:``}" id="filter-month">
            <option value="">전체 월</option>
            ${d.map(e=>`<option value="${e}" ${n.month===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
          <select class="filter-select ${n.status?`active`:``}" id="filter-status">
            <option value="">진행상태</option>
            ${N.map(e=>`<option value="${e.key}" ${n.status===e.key?`selected`:``}>${e.label}</option>`).join(``)}
          </select>
          <select class="filter-select ${n.category?`active`:``}" id="filter-category">
            <option value="">카테고리</option>
            ${ne.map(e=>`<option value="${e}" ${n.category===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
          <select class="filter-select ${n.platform?`active`:``}" id="filter-platform">
            <option value="">플랫폼</option>
            ${ee.map(e=>`<option value="${e}" ${n.platform===e?`selected`:``}>${e}</option>`).join(``)}
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
                    <td>${rt(e.broadcastStatus)}</td>
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
                    <td class="text-right">${e.result?et(e.result.views):`-`}</td>
                    <td class="text-right" style="font-weight: bold;">${e.result?$e(e.result.liveRevenue):`-`}</td>
                    <td class="text-right" style="font-weight: bold;">${e.result?tt(e.result.roi):`-`}</td>
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
      `:l(c),e.innerHTML=u+`<div class="page-body">`+f+`</div>`,setTimeout(()=>{e.querySelector(`#btn-view-list`)?.addEventListener(`click`,()=>{i!==`list`&&(i=`list`,o())}),e.querySelector(`#btn-view-calendar`)?.addEventListener(`click`,()=>{i!==`calendar`&&(i=`calendar`,o())}),e.querySelector(`#btn-prev-month`)?.addEventListener(`click`,()=>{a.setMonth(a.getMonth()-1),o()}),e.querySelector(`#btn-next-month`)?.addEventListener(`click`,()=>{a.setMonth(a.getMonth()+1),o()}),e.querySelectorAll(`.calendar-project-block`).forEach(e=>{e.addEventListener(`click`,()=>{M.navigate(`/projects/${e.getAttribute(`data-id`)}`)})});let s=!1,c=e.querySelector(`#project-search`);c&&(c.addEventListener(`compositionstart`,()=>{s=!0}),c.addEventListener(`compositionend`,e=>{s=!1,t=e.target.value,o();let n=document.getElementById(`project-search`);n&&(n.focus(),n.setSelectionRange(n.value.length,n.value.length))}),c.addEventListener(`input`,e=>{if(s)return;t=e.target.value,o();let n=document.getElementById(`project-search`);if(n){n.focus();let e=n.value.length;n.setSelectionRange(e,e)}})),[`status`,`brand`,`platform`,`month`,`category`].forEach(t=>{e.querySelector(`#filter-${t}`)?.addEventListener(`change`,e=>{n[t]=e.target.value,o()})}),[`basic`,`host`,`result`,`finance`].forEach(t=>{e.querySelector(`#toggle-col-${t}`)?.addEventListener(`change`,e=>{r[t]=e.target.checked,o()})}),e.querySelector(`#filter-reset`)?.addEventListener(`click`,()=>{n={status:``,brand:``,platform:``,month:``,category:``,settleStatus:``},t=``,o()}),e.querySelector(`#btn-new-project`)?.addEventListener(`click`,()=>{Kt(()=>o())}),e.querySelectorAll(`.project-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation(),M.navigate(`/projects/${e.getAttribute(`data-id`)}`)})}),e.querySelectorAll(`tr.clickable`).forEach(e=>{e.addEventListener(`click`,()=>{M.navigate(`/projects/${e.getAttribute(`data-id`)}`)})})},0)}return o(),U.on(`projects:changed`,o),e}function Kt(e){let t=U.getAll(`brands`),n=`
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
          ${ne.map(e=>`<option value="${e}">${e}</option>`).join(``)}
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
  `,r=document.createElement(`div`);r.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let i=document.createElement(`button`);i.className=`btn btn-secondary`,i.textContent=`취소`,i.addEventListener(`click`,q);let a=document.createElement(`button`);a.className=`btn btn-primary`,a.textContent=`등록`,a.addEventListener(`click`,()=>{let n=document.getElementById(`proj-brandName`).value.trim(),r=document.getElementById(`proj-date`).value;if(!n){Y(`방송 제목(브랜드)을 입력해주세요.`);return}if(!r){Y(`방송일을 선택해주세요.`);return}let i=t.find(e=>e.name===n),a=i?i.id:`b_`+n,o={id:L(`live`),brandId:a,brandName:n,adName:``,category:document.getElementById(`proj-category`).value,broadcastMonth:r.substring(0,7),broadcastDate:r,broadcastTime:document.getElementById(`proj-time`).value,platform:document.getElementById(`proj-platform`).value,liveUrl:``,pd:document.getElementById(`proj-pd`).value.trim(),designer:document.getElementById(`proj-designer`).value.trim(),cuesheetLink:``,note:document.getElementById(`proj-note`).value.trim(),broadcastStatus:`new`,settleStatus:`wait`,createdAt:new Date().toISOString().split(`T`)[0]};U.create(`projects`,o),q(),J(`프로젝트가 등록되었습니다.`),e&&e()}),r.appendChild(i),r.appendChild(a),K({title:`신규 프로젝트 등록`,size:`lg`,content:n,footer:r})}function qt(e){let t=document.createElement(`div`),n=`info`;function r(){let i=U.getById(`projects`,e.id);if(!i){t.innerHTML=`<div class="page-header"><div class="page-header-left"><h1 class="page-title">프로젝트를 찾을 수 없습니다</h1></div></div>
      <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>`,setTimeout(()=>{t.querySelector(`#btn-back`)?.addEventListener(`click`,()=>M.navigate(`/projects`))},0);return}let a=U.getById(`brands`,i.brandId),o=i.brandName||(a?a.name:`-`);U.query(`tasks`,e=>e.liveId===i.id).filter(e=>e.done).length;let s=0;i.broadcastStatus===`scheduled`?s=20:i.broadcastStatus===`host_cast`?s=40:i.broadcastStatus===`tech_request`?s=60:i.broadcastStatus===`design`?s=80:i.broadcastStatus===`cue_sheet`?s=90:i.broadcastStatus===`done`&&(s=100),t.innerHTML=`
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
                ${rt(i.broadcastStatus)}
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
    `;let c=t.querySelector(`#tab-content`);switch(n){case`info`:c.appendChild(Jt(i,a));break;case`hosts`:c.appendChild(Xt(i));break;case`design`:c.appendChild(Qt(i));break;case`result`:c.appendChild(tn(i));break;case`finance`:c.appendChild(nn(i));break}setTimeout(()=>{t.querySelector(`#breadcrumb-list`)?.addEventListener(`click`,()=>M.navigate(`/projects`)),t.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,()=>{n=e.getAttribute(`data-tab`),r()})}),t.querySelector(`#btn-delete-project`)?.addEventListener(`click`,()=>{st({title:`프로젝트 삭제`,message:`"${i.adName}" 프로젝트를 삭제하시겠습니까? 관련된 체크리스트, 쇼호스트 매칭, 성과, 정산 데이터도 모두 삭제됩니다.`,confirmText:`삭제`,danger:!0,onConfirm:()=>{U.query(`tasks`,e=>e.liveId===i.id).forEach(e=>U.delete(`tasks`,e.id)),U.query(`liveHosts`,e=>e.liveId===i.id).forEach(e=>U.delete(`liveHosts`,e.id)),U.query(`designs`,e=>e.liveId===i.id).forEach(e=>U.delete(`designs`,e.id)),U.delete(`results`,i.id),U.delete(`finances`,i.id),U.delete(`projects`,i.id),J(`프로젝트가 삭제되었습니다.`),M.navigate(`/projects`)}})})},0)}return r(),t}function Jt(e,t){let n=document.createElement(`div`);return n.innerHTML=`
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
          ${N.map(t=>`
            <button class="btn ${e.broadcastStatus===t.key?`btn-primary`:`btn-secondary`} btn-sm status-change-btn" data-status="${t.key}" style="font-size: 11px; padding: var(--space-1); line-height: 1.2;">
              ${t.label}${Wt(e.broadcastDate,t.key)}
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
  `,setTimeout(()=>{n.querySelector(`#btn-edit-info`)?.addEventListener(`click`,()=>{Yt(e)}),n.querySelectorAll(`.status-change-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-status`);U.update(`projects`,e.id,{broadcastStatus:n}),J(`방송 상태가 "${R(n)}"(으)로 변경되었습니다.`),M.navigate(`/projects/${e.id}`)})}),n.querySelectorAll(`.settle-status-change-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-status`);U.update(`projects`,e.id,{settleStatus:n}),J(`정산 상태가 "${z(n)}"(으)로 변경되었습니다.`),M.navigate(`/projects/${e.id}`)})}),n.querySelector(`.tax-invoice-btn`)?.addEventListener(`click`,()=>{if(!t){Y(`등록된 브랜드 정보가 없어 세금계산서 상태를 변경할 수 없습니다.`);return}let n=!t.taxInvoice;U.update(`brands`,t.id,{taxInvoice:n}),J(`세금계산서 상태가 "${n?`발행완료`:`미발행`}"(으)로 변경되었습니다.`),M.navigate(`/projects/${e.id}`)})},0),n}function Yt(e){let t=U.getAll(`brands`),n=`
    <div class="form-grid">
      <div class="input-group">
        <label>방송 제목(브랜드)</label>
        <input type="text" class="input" id="edit-brandName" list="brand-list" value="${e.brandName||t.find(t=>t.id===e.brandId)?.name||``}">
        <datalist id="brand-list">${t.map(e=>`<option value="${e.name}">`).join(``)}</datalist>
      </div>
      <div class="input-group">
        <label>카테고리</label>
        <select class="input" id="edit-category">${ne.map(t=>`<option value="${t}" ${e.category===t?`selected`:``}>${t}</option>`).join(``)}</select>
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
  `,r=document.createElement(`div`);r.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let i=document.createElement(`button`);i.className=`btn btn-secondary`,i.textContent=`취소`,i.addEventListener(`click`,q);let a=document.createElement(`button`);a.className=`btn btn-primary`,a.textContent=`저장`,a.addEventListener(`click`,()=>{let n=document.getElementById(`edit-date`).value,r=document.getElementById(`edit-brandName`).value.trim(),i=t.find(e=>e.name===r),a=i?i.id:`b_`+r;U.update(`projects`,e.id,{brandId:a,brandName:r,category:document.getElementById(`edit-category`).value,broadcastDate:n,broadcastMonth:n?n.substring(0,7):``,broadcastTime:document.getElementById(`edit-time`).value,platform:document.getElementById(`edit-platform`).value,liveUrl:document.getElementById(`edit-url`).value.trim(),pd:document.getElementById(`edit-pd`).value.trim(),designer:document.getElementById(`edit-designer`).value.trim(),cuesheetLink:document.getElementById(`edit-cuesheet`).value.trim(),note:document.getElementById(`edit-note`).value.trim()}),q(),J(`기본 정보가 수정되었습니다.`),M.navigate(`/projects/${e.id}`)}),r.appendChild(i),r.appendChild(a),K({title:`기본 정보 수정`,size:`lg`,content:n,footer:r})}function Xt(e){let t=document.createElement(`div`),n=U.query(`liveHosts`,t=>t.liveId===e.id);return U.getAll(`hosts`),t.innerHTML=`
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
            ${n.length>0?n.map(e=>{let t=U.getById(`hosts`,e.hostId);return`
                <tr>
                  <td>${t?t.name:`-`}</td>
                  <td>${re.find(t=>t.key===e.role)?.label||`-`}</td>
                  <td class="text-right">${e.brandPays?`<span class="badge" style="background: var(--bg-secondary); color: var(--text-tertiary); margin-right: 4px;">브랜드 부담</span><span style="text-decoration: line-through; color: var(--text-tertiary);">${W(e.fee)}</span>`:W(e.fee)}</td>
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
  `,setTimeout(()=>{t.querySelector(`#btn-add-host-match`)?.addEventListener(`click`,()=>{Zt(e.id,null,()=>{let n=Xt(e);t.replaceWith(n)})}),t.querySelectorAll(`.btn-edit-match`).forEach(n=>{n.addEventListener(`click`,()=>{Zt(e.id,n.getAttribute(`data-id`),()=>{let n=Xt(e);t.replaceWith(n)})})})},0),t}function Zt(e,t,n){let r=!!t,i=r?U.getById(`liveHosts`,t):{},a=U.getAll(`hosts`),o=`
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
          ${re.map(e=>`<option value="${e.key}" ${i.role===e.key?`selected`:``}>${e.label}</option>`).join(``)}
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
  `,s=document.createElement(`div`);if(s.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,r){let e=document.createElement(`button`);e.className=`btn btn-danger`,e.textContent=`삭제`,e.style.marginRight=`auto`,e.addEventListener(`click`,()=>{U.delete(`liveHosts`,t),q(),J(`삭제되었습니다.`),n&&n()}),s.appendChild(e)}let c=document.createElement(`button`);c.className=`btn btn-secondary`,c.textContent=`취소`,c.addEventListener(`click`,q);let l=document.createElement(`button`);l.className=`btn btn-primary`,l.textContent=r?`수정`:`추가`,l.addEventListener(`click`,()=>{let i=document.getElementById(`match-host`).value;if(!i){Y(`쇼호스트를 선택해주세요.`);return}let a={liveId:e,hostId:i,role:document.getElementById(`match-role`).value,fee:parseInt(document.getElementById(`match-fee`).value)||0,settleStatus:document.getElementById(`match-settle`).value,memo:document.getElementById(`match-memo`).value.trim(),brandPays:document.getElementById(`match-brand-pays`).checked};r?(U.update(`liveHosts`,t,a),J(`수정되었습니다.`)):(a.id=L(`lh`),U.create(`liveHosts`,a),J(`쇼호스트가 매칭되었습니다.`)),q(),n&&n()}),s.appendChild(c),s.appendChild(l),K({title:r?`쇼호스트 매칭 수정`:`쇼호스트 추가`,size:`md`,content:o,footer:s}),setTimeout(()=>{let e=document.getElementById(`match-host-search`),t=document.getElementById(`match-host`),n=document.getElementById(`match-host-dropdown`),r=r=>{let i=a.filter(e=>e.name.toLowerCase().includes(r));if(i.length===0){n.innerHTML=`<div style="padding: 8px 12px; color: var(--text-tertiary); font-size: var(--text-sm);">검색 결과가 없습니다.</div>`;return}n.innerHTML=i.map(e=>`<div class="dropdown-item" data-id="${e.id}" data-name="${e.name}" style="padding: 8px 12px; cursor: pointer; font-size: var(--text-sm); border-bottom: 1px solid var(--border-light); transition: background var(--transition-fast);">
          ${e.name}
        </div>`).join(``),n.querySelectorAll(`.dropdown-item`).forEach(r=>{r.addEventListener(`click`,()=>{e.value=r.getAttribute(`data-name`),t.value=r.getAttribute(`data-id`),n.style.display=`none`}),r.addEventListener(`mouseenter`,()=>r.style.background=`var(--bg-hover)`),r.addEventListener(`mouseleave`,()=>r.style.background=`transparent`)})};e&&n&&(e.addEventListener(`focus`,()=>{n.style.display=`block`,r(e.value.toLowerCase())}),e.addEventListener(`input`,e=>{n.style.display=`block`,t.value=``,r(e.target.value.toLowerCase())}),document.addEventListener(`click`,r=>{!e.contains(r.target)&&!n.contains(r.target)&&(n.style.display=`none`,t.value||(e.value=``))}))},0)}function Qt(e){let t=document.createElement(`div`),n=U.query(`designs`,t=>t.liveId===e.id),{renderDesignBadge:r}=$t();return t.innerHTML=`
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
  `,setTimeout(()=>{t.querySelector(`#btn-add-design`)?.addEventListener(`click`,()=>{en(e.id,null,()=>{let n=Qt(e);t.replaceWith(n)})}),t.querySelectorAll(`.btn-edit-design`).forEach(n=>{n.addEventListener(`click`,()=>{en(e.id,n.getAttribute(`data-id`),()=>{let n=Qt(e);t.replaceWith(n)})})})},0),t}function $t(){return{renderDesignBadge:e=>`<span class="badge ${{requested:`badge-default`,working:`badge-warning`,reviewing:`badge-warning`,done:`badge-success`}[e]||`badge-default`}">${{requested:`요청`,working:`작업중`,reviewing:`검수중`,done:`완료`}[e]||e}</span>`}}function en(e,t,n){let r=!!t,i=r?U.getById(`designs`,t):{},a=`
    <div class="form-grid">
      <div class="input-group"><label>요청일</label><input class="input" type="date" id="design-date" value="${i.requestDate||new Date().toISOString().split(`T`)[0]}"></div>
      <div class="input-group"><label>담당 디자이너</label><input class="input" id="design-designer" value="${i.designer||``}" placeholder="디자이너"></div>
      <div class="input-group"><label>상태</label><select class="input" id="design-status">${ie.map(e=>`<option value="${e.key}" ${i.status===e.key?`selected`:``}>${e.label}</option>`).join(``)}</select></div>
      <div class="input-group"><label>작업 링크</label><input class="input" id="design-work" value="${i.workLink||``}"></div>
      <div class="input-group"><label>파일 링크</label><input class="input" id="design-file" value="${i.fileLink||``}"></div>
      <div class="input-group"><label>메모</label><input class="input" id="design-memo" value="${i.memo||``}"></div>
    </div>
  `,o=document.createElement(`div`);if(o.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,r){let e=document.createElement(`button`);e.className=`btn btn-danger`,e.textContent=`삭제`,e.style.marginRight=`auto`,e.addEventListener(`click`,()=>{U.delete(`designs`,t),q(),J(`삭제되었습니다.`),n&&n()}),o.appendChild(e)}let s=document.createElement(`button`);s.className=`btn btn-secondary`,s.textContent=`취소`,s.addEventListener(`click`,q);let c=document.createElement(`button`);c.className=`btn btn-primary`,c.textContent=r?`수정`:`등록`,c.addEventListener(`click`,()=>{let i={liveId:e,requestDate:document.getElementById(`design-date`).value,designer:document.getElementById(`design-designer`).value.trim(),status:document.getElementById(`design-status`).value,workLink:document.getElementById(`design-work`).value.trim(),fileLink:document.getElementById(`design-file`).value.trim(),memo:document.getElementById(`design-memo`).value.trim()};r?(U.update(`designs`,t,i),J(`수정되었습니다.`)):(i.id=L(`design`),U.create(`designs`,i),J(`디자인 요청이 등록되었습니다.`)),q(),n&&n()}),o.appendChild(s),o.appendChild(c),K({title:r?`디자인 요청 수정`:`디자인 요청 추가`,size:`md`,content:a,footer:o})}function tn(e){let t=document.createElement(`div`),n=U.getAll(`results`).find(t=>t.liveId===e.id)||{};return t.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>방송 성과</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-result">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-label">시청뷰</div><div class="stat-value">${et(n.views)}</div></div>
          <div class="stat-card"><div class="stat-label">좋아요</div><div class="stat-value">${et(n.likes)}</div></div>
          <div class="stat-card"><div class="stat-label">주문건수</div><div class="stat-value">${et(n.orders)}건</div></div>
          <div class="stat-card"><div class="stat-label">라이브 매출</div><div class="stat-value">${W(n.liveRevenue)}</div></div>
          <div class="stat-card"><div class="stat-label">ROI</div><div class="stat-value">${tt(n.roi)}</div></div>
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
      `,i=document.createElement(`div`);i.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let a=document.createElement(`button`);a.className=`btn btn-secondary`,a.textContent=`취소`,a.addEventListener(`click`,q);let o=document.createElement(`button`);o.className=`btn btn-primary`,o.textContent=`저장`,o.addEventListener(`click`,()=>{let n=parseInt(document.getElementById(`res-revenue`).value)||0,r=U.getAll(`finances`).find(t=>t.liveId===e.id),i=r?r.adCost+r.productionCost+r.hostCost+r.otherCost:0,a=i>0?Math.round(n/i*100)/100:0,o={liveId:e.id,views:parseInt(document.getElementById(`res-views`).value)||0,likes:parseInt(document.getElementById(`res-likes`).value)||0,orders:parseInt(document.getElementById(`res-orders`).value)||0,liveRevenue:n,roi:a},s=U.getAll(`results`).find(t=>t.liveId===e.id);s?U.update(`results`,s.id,o):(o.id=e.id,U.create(`results`,o)),q(),J(`성과가 저장되었습니다.`);let c=tn(e);t.replaceWith(c)}),i.appendChild(a),i.appendChild(o),K({title:`방송 성과 수정`,size:`md`,content:r,footer:i})})},0),t}function nn(e){let t=document.createElement(`div`),n=U.getAll(`finances`).find(t=>t.liveId===e.id)||{},r=U.query(`liveHosts`,t=>t.liveId===e.id).reduce((e,t)=>e+(t.fee||0),0);return t.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h3>매출 및 정산</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-finance">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid" style="margin-bottom: var(--space-6);">
          <div class="stat-card"><div class="stat-label">제작비</div><div class="stat-value">${W(n.productionCost)}</div></div>
          <div class="stat-card"><div class="stat-label">쇼호스트비</div><div class="stat-value">${W(r)}</div></div>
          <div class="stat-card"><div class="stat-label">광고비</div><div class="stat-value">${W(n.adCost)}</div></div>
          <div class="stat-card"><div class="stat-label">기타비용</div><div class="stat-value">${W(n.otherCost)}</div></div>
        </div>
        <div style="border-top: 1px solid var(--border-light); padding-top: var(--space-5);">
          <div class="stats-grid">
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업매출액</div>
              <div class="stat-value">${W(n.salesRevenue)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업이익</div>
              <div class="stat-value" style="color: ${(n.operatingProfit||0)>=0?`var(--status-success)`:`var(--status-error)`};">${W(n.operatingProfit)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">순마진</div>
              <div class="stat-value" style="color: ${(n.netMargin||0)>=0?`var(--status-success)`:`var(--status-error)`};">${W(n.netMargin)}</div>
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
          쇼호스트비는 쇼호스트 매칭 탭에서 설정한 금액의 합계로 자동 계산됩니다. (현재: ${W(r)})
        </div>
      `,a=document.createElement(`div`);a.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let o=document.createElement(`button`);o.className=`btn btn-secondary`,o.textContent=`취소`,o.addEventListener(`click`,q);let s=document.createElement(`button`);s.className=`btn btn-primary`,s.textContent=`저장`,s.addEventListener(`click`,()=>{let n=parseInt(document.getElementById(`fin-ad`).value)||0,i=parseInt(document.getElementById(`fin-prod`).value)||0,a=parseInt(document.getElementById(`fin-other`).value)||0,o=parseInt(document.getElementById(`fin-sales`).value)||0,s=o-n-r-a,c=Math.round(o*.1),l=s,u={liveId:e.id,adCost:n,productionCost:i,hostCost:r,otherCost:a,salesRevenue:o,operatingProfit:s,vat:c,netMargin:l},d=U.getAll(`finances`).find(t=>t.liveId===e.id);d?U.update(`finances`,d.id,u):(u.id=e.id,U.create(`finances`,u)),q(),J(`정산 정보가 저장되었습니다.`);let f=nn(e);t.replaceWith(f)}),a.appendChild(o),a.appendChild(s),K({title:`정산 정보 수정`,size:`md`,content:i,footer:a})})},0),t}function rn(){let e=document.createElement(`div`),t=``;function n(){let r=U.getAll(`projects`),i=U.getAll(`finances`),a=U.getAll(`results`),o=[...new Set(r.map(e=>{let t=e.broadcastMonth;if(e.broadcastDate){let n=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(n.getTime())||(t=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`)}return t&&!t.includes(`-`)&&t.length<=2&&(t=`2026-${String(t).padStart(2,`0`)}`),t}).filter(Boolean))].sort().reverse(),s=r,c=i,l=a;if(t){s=r.filter(e=>{let n=e.broadcastMonth;if(e.broadcastDate){let t=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(t.getTime())||(n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`)}return n&&!n.includes(`-`)&&n.length<=2&&(n=`2026-${String(n).padStart(2,`0`)}`),n===t});let e=s.map(e=>e.id);c=i.filter(t=>e.includes(t.liveId)),l=a.filter(t=>e.includes(t.liveId))}let u={};s.forEach(e=>{let t=e.broadcastMonth;if(e.broadcastDate){let n=new Date(e.broadcastDate.replace(/\./g,`-`));isNaN(n.getTime())||(t=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`)}if(!t)return;!t.includes(`-`)&&t.length<=2&&(t=`2026-${String(t).padStart(2,`0`)}`),u[t]||(u[t]={month:t,revenue:0,profit:0,margin:0,count:0}),u[t].count++;let n=c.find(t=>t.liveId===e.id);n&&(u[t].revenue+=parseInt(n.salesRevenue)||0,u[t].profit+=parseInt(n.operatingProfit)||0,u[t].margin+=parseInt(n.netMargin)||0)});let d=Object.values(u).sort((e,t)=>t.month.localeCompare(e.month)),f=c.reduce((e,t)=>e+(parseInt(t.salesRevenue)||0),0),p=c.reduce((e,t)=>e+(parseInt(t.operatingProfit)||0),0),m=c.reduce((e,t)=>e+(parseInt(t.netMargin)||0),0),h=c.reduce((e,t)=>e+(parseInt(t.adCost)||0),0),g=c.reduce((e,t)=>e+(parseInt(t.productionCost)||0),0),_=c.reduce((e,t)=>e+(parseInt(t.hostCost)||0),0),v={};s.forEach(e=>{let t=U.getById(`brands`,e.brandId);if(!t)return;v[t.id]||(v[t.id]={name:t.name,revenue:0,count:0}),v[t.id].count++;let n=l.find(t=>t.liveId===e.id);n&&(v[t.id].revenue+=parseInt(n.liveRevenue)||0)});let y=Object.values(v).sort((e,t)=>t.revenue-e.revenue),b={};U.getAll(`liveHosts`).forEach(e=>{if(t&&!s.some(t=>t.id===e.liveId))return;let n=U.getById(`hosts`,e.hostId);if(!n)return;b[n.id]||(b[n.id]={name:n.name,revenue:0,count:0,fee:0}),b[n.id].count++,b[n.id].fee+=parseInt(e.fee)||0;let r=l.find(t=>t.liveId===e.liveId);r&&(b[n.id].revenue+=parseInt(r.liveRevenue)||0)});let x=Object.values(b).sort((e,t)=>t.revenue-e.revenue),S=s.filter(e=>e.status===`settle_wait`).length,C=s.filter(e=>e.status===`settle_done`).length;e.innerHTML=`
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
          <div class="stat-card"><div class="stat-label">총 영업매출</div><div class="stat-value">${$e(f)}</div></div>
          <div class="stat-card"><div class="stat-label">총 영업이익</div><div class="stat-value" style="color: ${p>=0?`var(--status-success)`:`var(--status-error)`};">${$e(p)}</div></div>
          <div class="stat-card"><div class="stat-label">총 순마진</div><div class="stat-value" style="color: ${m>=0?`var(--status-success)`:`var(--status-error)`};">${$e(m)}</div></div>
          <div class="stat-card"><div class="stat-label">총 광고비</div><div class="stat-value">${$e(h)}</div></div>
          <div class="stat-card"><div class="stat-label">총 제작비</div><div class="stat-value">${$e(g)}</div></div>
          <div class="stat-card"><div class="stat-label">총 쇼호스트비</div><div class="stat-value">${$e(_)}</div></div>
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
                      <td class="text-right">${$e(e.revenue)}</td>
                      <td class="text-right" style="color: ${e.profit>=0?`var(--status-success)`:`var(--status-error)`};">${$e(e.profit)}</td>
                      <td class="text-right" style="color: ${e.margin>=0?`var(--status-success)`:`var(--status-error)`};">${$e(e.margin)}</td>
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
                      <tr><td><span style="color: var(--text-tertiary); margin-right: var(--space-2);">${t+1}</span> ${e.name}</td><td class="text-right">${e.count}회</td><td class="text-right">${$e(e.revenue)}</td></tr>
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
                  <tr><td><span style="color: var(--text-tertiary); margin-right: var(--space-2);">${t+1}</span> ${e.name}</td><td class="text-right">${e.count}회</td><td class="text-right">${$e(e.revenue)}</td><td class="text-right">${W(e.fee)}</td></tr>
                `).join(``)||`<tr><td colspan="4" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">데이터 없음</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;let w=e.querySelector(`#finance-month-filter`);w&&w.addEventListener(`change`,e=>{t=e.target.value,n()})}return n(),e}function an(){let e=document.createElement(`div`);function t(){let t=U.getAll(`projects`),n=U.getAll(`finances`),r=U.getAll(`liveHosts`);U.getAll(`brands`),U.getAll(`hosts`);let i={};t.filter(e=>e.settleStatus!==`done`).forEach(e=>{let t=e.brandName||U.getById(`brands`,e.brandId)?.name||`알 수 없음`,r=e.brandId||t;i[r]||(i[r]={brandName:t,count:0,amount:0,projects:[]});let a=n.find(t=>t.liveId===e.id),o=a&&a.salesRevenue||0,s=o+Math.round(o*.1);i[r].count++,i[r].amount+=s,i[r].projects.push({...e,revenue:s})});let a=Object.values(i).sort((e,t)=>t.amount-e.amount),o={};r.filter(e=>e.settleStatus!==`done`).forEach(e=>{let t=U.getById(`hosts`,e.hostId);t&&(o[t.id]||(o[t.id]={hostName:t.name,hostId:t.id,count:0,amount:0,matchings:[]}),o[t.id].count++,o[t.id].amount+=e.fee||0,o[t.id].matchings.push(e))});let s=Object.values(o).sort((e,t)=>t.amount-e.amount),c=a.reduce((e,t)=>e+t.amount,0),l=s.reduce((e,t)=>e+t.amount,0);e.innerHTML=`
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
          <div class="stat-value" style="color: var(--status-error);">${W(c)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">총 쇼호스트 지급대기</div>
          <div class="stat-value" style="color: var(--status-warning);">${W(l)}</div>
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
                    <td class="text-right" style="color: var(--status-error); font-weight: bold;">${W(e.amount)}</td>
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
                    <td class="text-right" style="color: var(--status-warning); font-weight: bold;">${W(e.amount)}</td>
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
  `,e.querySelectorAll(`.btn-brand-settle`).forEach(e=>{e.addEventListener(`click`,e=>{let n=e.target.dataset.brandid,r=e.target.dataset.brandname;confirm(`'${r}'의 미수금 ${e.target.closest(`tr`).querySelector(`td:nth-child(3)`).innerText}을 모두 정산 완료 처리하시겠습니까?`)&&(t.filter(e=>e.settleStatus!==`done`&&(e.brandId===n||e.brandName===r)).forEach(e=>{U.update(`projects`,e.id,{settleStatus:`done`})}),J(`${r} 정산 처리 완료`))})}),e.querySelectorAll(`.btn-host-settle`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.hostid,n=e.target.closest(`tr`).querySelector(`td:nth-child(1)`).innerText;confirm(`'${n}' 쇼호스트의 정산 대기금액 ${e.target.closest(`tr`).querySelector(`td:nth-child(3)`).innerText}을 모두 지급 완료 처리하시겠습니까?`)&&(r.filter(e=>e.settleStatus!==`done`&&e.hostId===t).forEach(e=>{U.update(`liveHosts`,e.id,{settleStatus:`done`})}),J(`${n} 지급 처리 완료`))})})}return t(),U.on(`projects:changed`,t),U.on(`liveHosts:changed`,t),e}function on(e,t){let n=document.createElement(`div`),r=G(new Date().toISOString(),`YYYY-MM-DD`),i=`EST-${new Date().toISOString().replace(/[-:T]/g,``).slice(2,14)}`,a=[{name:`방송 기획 및 송출비`,desc:`1회 방송 기획/운영/송출`,unitPrice:3e6,qty:1,unit:`회`}];t&&t.length>0&&t.forEach(e=>{let t=U.getById(`hosts`,e.hostId),n=t?t.name:`쇼호스트`,r=e.role===`main`?`메인 쇼호스트`:`게스트`;a.push({name:`출연료 (${n})`,desc:`${r} 출연료`,unitPrice:e.fee||5e5,qty:1,unit:`명`})});let o=0;function s(){let e=0;a.forEach(t=>{e+=t.unitPrice*t.qty});let t=e-o,n=Math.floor(t*.1),r=t+n;return{supply:e,totalSupply:t,vat:n,finalAmount:r}}function c(){let t=s();n.innerHTML=`
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
    `,l=document.createElement(`div`);l.innerHTML=c;let u={margin:0,filename:`견적서_${i}_${s}.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}};html2pdf().set(u).from(l).save().then(()=>{q()})}c(),K({title:`브랜드 견적서`,size:`lg`,content:n,footer:!1})}function sn(e,t){let n=document.createElement(`div`),r=[];t&&t.length>0&&t.forEach(e=>{let t=U.getById(`hosts`,e.hostId);t&&r.push({...t,role:e.role,fee:e.fee||0})});function i(){if(r.length===0){n.innerHTML=`<div style="padding: 2rem; text-align: center; color: var(--text-tertiary);">이 프로젝트에 배정된 쇼호스트가 없습니다.</div>`,K({title:`쇼호스트 계약서 발급`,size:`md`,content:n});return}n.innerHTML=`
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
    `,o=document.createElement(`div`);o.innerHTML=a;let s={margin:10,filename:`출연계약서_${e.name}_${t.title}.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}};html2pdf().set(s).from(o).save()}i(),K({title:`쇼호스트 출연 계약서 발급`,size:`md`,content:n,footer:!1})}function cn(){let e=document.createElement(`div`);function t(){let t=U.getAll(`projects`)||[];t.sort((e,t)=>(t.broadcastDate||``).localeCompare(e.broadcastDate||``)),e.innerHTML=`
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
    `,e.querySelectorAll(`.btn-brand-estimate`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.id,n=U.getById(`projects`,t);n&&on(n,U.query(`liveHosts`,e=>e.liveId===n.id)||[])})}),e.querySelectorAll(`.btn-host-contract`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.id,n=U.getById(`projects`,t);n&&sn(n,U.query(`liveHosts`,e=>e.liveId===n.id)||[])})})}return t(),e}function ln(){let e=JSON.parse(localStorage.getItem(`ryzin_live_data`)||`{}`);return{linkId:e.settings?.popbillLinkId||null,secretKey:e.settings?.popbillSecretKey||null,senderNumber:e.settings?.popbillSenderNumber||`010-0000-0000`}}async function un(){return ln(),new Promise(e=>{setTimeout(()=>{e([{templateCode:`TPL_001`,templateName:`방송 안내`,content:`안녕하세요 #{고객명}님,
다가오는 #{방송일}에 #{방송명} 방송이 진행될 예정입니다.
많은 시청 부탁드립니다!`},{templateCode:`TPL_002`,templateName:`정산 완료 안내`,content:`#{이름}님, #{프로젝트명}에 대한 정산이 완료되었습니다.
입금은행: #{입금은행}

감사합니다.`}])},300)})}async function dn(e){let t=ln();try{let n=await fetch(`http://localhost:3001/api/popbill/send`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({linkId:t.linkId,secretKey:t.secretKey,senderNumber:t.senderNumber,payload:e})});if(!n.ok){let e=await n.json().catch(()=>({}));throw Error(e.message||`메시지 전송 실패`)}let r=await n.json();if(!r.success)throw Error(r.message||`메시지 전송 실패`);return console.log(`팝빌 전송 결과:`,r),{success:!0,receiptNum:r.receiptNum,message:`발송 완료`}}catch(e){throw console.error(`팝빌 연동 오류:`,e),Error(`팝빌 메시지 전송에 실패했습니다: `+e.message)}}function fn(){let e=document.createElement(`div`),t=[],n=null,r=[],i={},a=[];function o(){let o=U.getAll(`hosts`)||[],s=U.getAll(`projects`)||[],c=new Set(s.map(e=>e.brand).filter(e=>!!e)),l=Array.from(c).map(e=>({id:`brand_`+e,name:e}));e.innerHTML=`
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
        `).join(``),m.querySelectorAll(`.var-input`).forEach(e=>{e.addEventListener(`input`,e=>{i[e.target.dataset.var]=e.target.value,v()})})):(p.style.display=`none`,m.innerHTML=``),v()};u.addEventListener(`change`,r=>{r.target.value===`alimtalk`?(d.style.display=`block`,h.readOnly=!0,h.style.background=`var(--bg-tertiary)`,g.textContent=`메시지 내용 (미리보기)`,!n&&t.length>0?(f.value=t[0].templateCode,n=t[0],y()):n?y():(p.style.display=`none`,h.value=``)):(d.style.display=`none`,p.style.display=`none`,h.readOnly=!1,h.style.background=`var(--bg-card)`,g.textContent=`메시지 내용`,h.value=``,e.querySelector(`#msg-length`).textContent=`0`)}),f.addEventListener(`change`,e=>{let r=e.target.value;n=t.find(e=>e.templateCode===r),y()}),h.addEventListener(`input`,t=>{e.querySelector(`#msg-length`).textContent=t.target.value.length}),un().then(e=>{t=e,t.length>0&&(f.innerHTML=`<option value="">템플릿을 선택하세요</option>`+t.map(e=>`<option value="${e.templateCode}">${e.templateName}</option>`).join(``))}),e.querySelector(`#btn-add-group`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#receiver-group`).value;t===`all_hosts`?(o.forEach(e=>{a.find(t=>t.phone===e.phone)||a.push({name:e.name,phone:e.phone||`010-0000-0000`})}),J(`쇼호스트 ${o.length}명을 추가했습니다.`)):t===`all_brands`&&(l.forEach(e=>{a.find(t=>t.name===e.name)||a.push({name:e.name,phone:`010-0000-0000`})}),J(`브랜드 ${l.length}개를 추가했습니다.`)),_()}),e.querySelector(`#btn-add-manual`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#manual-name`),n=e.querySelector(`#manual-phone`),r=t.value.trim(),i=n.value.trim();if(!r||!i){Y(`이름과 연락처를 모두 입력해주세요.`);return}if(a.find(e=>e.phone===i)){Y(`이미 추가된 연락처입니다.`);return}a.push({name:r,phone:i}),t.value=``,n.value=``,_()}),e.querySelector(`#btn-send-message`)?.addEventListener(`click`,async()=>{let t=u.value;if(t===`alimtalk`){if(!n){Y(`알림톡 템플릿을 선택해주세요.`);return}let e=r.filter(e=>!i[e]);if(e.length>0){Y(`변수 값을 입력해주세요: ${e.join(`, `)}`);return}}else if(!h.value.trim()){Y(`메시지 내용을 입력해주세요.`);return}if(a.length===0){Y(`수신자를 최소 1명 이상 추가해주세요.`);return}let o=e.querySelector(`#btn-send-message`);o.textContent=`발송 중...`,o.disabled=!0;try{let e={msgType:t,receivers:[]};t===`alimtalk`?(e.templateCode=n.templateCode,e.receivers=a.map(e=>{let t=n.content;return t=t.replace(/#\{이름\}/g,e.name).replace(/#\{고객명\}/g,e.name),r.forEach(e=>{let n=RegExp(`#\\{${e}\\}`,`g`);t=t.replace(n,i[e])}),{name:e.name,number:e.phone,content:t}})):(e.content=h.value.trim(),e.receivers=a.map(e=>({name:e.name,number:e.phone})));let o=await dn(e);o.success&&(J(o.message),a=[],_())}catch(e){Y(e.message)}finally{o.textContent=`메시지 발송하기`,o.disabled=!1}}),u.dispatchEvent(new Event(`change`))}return o(),e}function pn(){let e=document.createElement(`div`);function t(){let t=U.getAll(`crmClients`)||[],a=U.getAll(`crmActivities`)||[],o=U.getAll(`projects`)||[],s=new Date,c=t.filter(e=>e.lastContactDate?(s-new Date(e.lastContactDate))/(1e3*60*60*24)>=7&&e.status!==`contract`&&e.status!==`hold`:!1),l=t.filter(e=>{if(e.status!==`quote`)return!1;let t=a.filter(t=>t.clientId===e.id&&t.content.includes(`견적`)).sort((e,t)=>new Date(t.date)-new Date(e.date)),n=t.length>0?t[0].date:e.lastContactDate;return n?(s-new Date(n))/(1e3*60*60*24)>=3:!1}),u=[],d=o.filter(e=>e.settleStatus===`done`||e.broadcastStatus===`done`),f={};d.forEach(e=>{let t=e.brandName||U.getById(`brands`,e.brandId)?.name||`알 수 없음`;f[t]||(f[t]=[]),f[t].push(e)});for(let[e,t]of Object.entries(f)){t.sort((e,t)=>new Date(t.broadcastDate||t.createdAt)-new Date(e.broadcastDate||e.createdAt));let n=t[0],r=n.broadcastDate||n.createdAt;if(r){let t=(s-new Date(r))/(1e3*60*60*24);t>=30&&u.push({brandName:e,lastBroadcastDate:r,diffDays:Math.floor(t)})}}e.innerHTML=`
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
                ${F.map(e=>`<option value="${e.key}">${e.label}</option>`).join(``)}
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
`).filter(e=>e.trim()!==``);if(n.length<=1){alert(`데이터가 없습니다.`);return}let r=[],i=new Date().toISOString().split(`T`)[0];for(let e=1;e<n.length;e++){let t=n[e].split(`,`).map(e=>e.trim().replace(/^"|"$/g,``));t[0]&&r.push({id:`crm_`+Date.now()+`_`+e,companyName:t[0]||``,contactName:t[1]||``,phone:t[2]||``,email:t[3]||``,interestedService:t[4]||``,source:t[5]||``,memo:t[6]||``,status:`lead`,category:`기타`,lastContactDate:i,createdAt:i})}r.length>0&&confirm(`총 ${r.length}건의 데이터를 등록하시겠습니까?`)&&(U.createBulk(`crmClients`,r),alert(`성공적으로 등록되었습니다.`),pn()),e.target.value=``},n.readAsText(t,`utf-8`)}),e.querySelector(`#filter-status`).addEventListener(`change`,r=>n(r.target.value,e.querySelector(`#filter-category`).value,t)),e.querySelector(`#filter-category`).addEventListener(`change`,r=>n(e.querySelector(`#filter-status`).value,r.target.value,t)),e.querySelectorAll(`.alert-link`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.id;i(t)})})}function n(e,t,n){let i=n;e!==`all`&&(i=i.filter(t=>t.status===e)),t!==`all`&&(i=i.filter(e=>e.category===t)),r(i)}function r(t){let n=e.querySelector(`#crm-table-body`);if(n){if(t.length===0){n.innerHTML=`<tr><td colspan="8" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 고객이 없습니다.</td></tr>`;return}n.innerHTML=t.sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)).map(e=>{let t=te.find(t=>t.key===e.status)||te[0],n=F.find(t=>t.key===e.category)||{label:`-`};return`
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
      `}).join(``),n.querySelectorAll(`.btn-edit-client`).forEach(e=>{e.addEventListener(`click`,e=>i(e.target.dataset.id))})}}function i(e=null){let n=!!e,r=n?U.getById(`crmClients`,e):{},a=n?U.getAll(`crmActivities`).filter(t=>t.clientId===e).sort((e,t)=>new Date(t.date)-new Date(e.date)):[],o=`
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
                ${F.map(e=>`<option value="${e.key}" ${r.category===e.key?`selected`:``}>${e.label}</option>`).join(``)}
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
                ${I.map(e=>`<option value="${e.key}">${e.icon} ${e.label}</option>`).join(``)}
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
            ${a.length>0?a.map(e=>{let t=I.find(t=>t.key===e.type)||I[0];return`
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
    `,s=document.createElement(`div`);if(s.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`,n){let n=document.createElement(`button`);n.className=`btn btn-danger`,n.textContent=`고객 삭제`,n.style.marginRight=`auto`,n.addEventListener(`click`,()=>{confirm(`이 고객과 모든 활동 기록을 삭제하시겠습니까?`)&&(U.delete(`crmClients`,e),q(),t(),J(`삭제되었습니다.`))}),s.appendChild(n)}let c=document.createElement(`button`);c.className=`btn btn-secondary`,c.textContent=`취소`,c.addEventListener(`click`,q);let l=document.createElement(`button`);l.className=`btn btn-primary`,l.textContent=`고객 정보 저장`,l.addEventListener(`click`,()=>{let r=document.getElementById(`c-company`).value.trim();if(!r)return Y(`회사명을 입력하세요.`);let i={companyName:r,contactName:document.getElementById(`c-contact`).value.trim(),phone:document.getElementById(`c-phone`).value.trim(),email:document.getElementById(`c-email`).value.trim(),status:document.getElementById(`c-status`).value,category:document.getElementById(`c-category`).value,interestedService:document.getElementById(`c-service`).value.trim(),source:document.getElementById(`c-source`).value.trim(),memo:document.getElementById(`c-memo`).value.trim()};n?(U.update(`crmClients`,e,i),J(`수정되었습니다.`)):(i.id=L(`crm`),i.createdAt=new Date().toISOString(),i.lastContactDate=new Date().toISOString().split(`T`)[0],U.create(`crmClients`,i),J(`등록되었습니다.`)),q(),t()}),s.appendChild(c),s.appendChild(l),K({title:n?`고객 상세 및 활동 관리`:`신규 고객 등록`,size:`lg`,content:o,footer:s}),n&&setTimeout(()=>{document.getElementById(`btn-save-activity`)?.addEventListener(`click`,()=>{let t=document.getElementById(`act-content`).value.trim();if(!t)return Y(`활동 내용을 입력하세요.`);let n=document.getElementById(`act-date`).value,a={id:L(`act`),clientId:e,date:n,type:document.getElementById(`act-type`).value,content:t,followUpDate:document.getElementById(`act-followup`).value||null,createdAt:new Date().toISOString()};U.create(`crmActivities`,a),new Date(n)>new Date(r.lastContactDate||`1970-01-01`)&&U.update(`crmClients`,e,{lastContactDate:n}),J(`활동이 등록되었습니다.`),q(),i(e)})},0)}return t(),U.on(`crmClients:changed`,t),U.on(`crmActivities:changed`,t),e}function mn(){let e=document.createElement(`div`),t=U.getCurrentRole();return e.innerHTML=`
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
      <div class="card" style="margin-bottom: var(--space-5); ${U.isDemoMode?`border: 2px solid var(--status-error);`:``}">
        <div class="card-header" style="${U.isDemoMode?`background: rgba(239,68,68,0.1); border-bottom: 1px solid var(--status-error);`:`background: var(--bg-secondary); border-bottom: 1px solid var(--border-light);`}">
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
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">${U.getAll(`users`).length}명 <span style="font-size: var(--text-sm); font-weight: 400; color: var(--text-tertiary);">/ 무제한</span></div>
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
                  <td class="text-center">${e.admin?_n():vn()}</td>
                  <td class="text-center">${e.pd?_n():vn()}</td>
                  <td class="text-center">${e.designer?_n():vn()}</td>
                  <td class="text-center">${e.accountant?_n():vn()}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{let n=e.querySelector(`#toggle-demo-mode`);if(n&&n.addEventListener(`change`,e=>{e.target.checked?st({title:`데모 모드 진입`,message:`데모 모드를 켜시겠습니까?
실제 운영 데이터가 보이지 않게 되며, 텅 빈 초기 상태에서 시연용 데이터를 안전하게 조작할 수 있습니다.`,confirmText:`데모 켜기`,onConfirm:()=>U.toggleDemoMode(!0),onCancel:()=>{n.checked=!1}}):st({title:`운영 모드 복귀`,message:`운영 모드로 돌아가시겠습니까?
다시 원래의 실제 운영 데이터를 불러옵니다.`,confirmText:`복귀하기`,onConfirm:()=>U.toggleDemoMode(!1),onCancel:()=>{n.checked=!0}})}),t===`admin`){let t=JSON.parse(localStorage.getItem(`ryzin_live_data`)||`{}`),n=t.settings||{},r=e.querySelector(`#setting-popbill-linkid`),i=e.querySelector(`#setting-popbill-secret`),a=e.querySelector(`#setting-popbill-sender`);r&&(r.value=n.popbillLinkId||``),i&&(i.value=n.popbillSecretKey||``),a&&(a.value=n.popbillSenderNumber||``),e.querySelector(`#btn-save-api-settings`)?.addEventListener(`click`,()=>{t.settings||={},t.settings.popbillLinkId=r.value.trim(),t.settings.popbillSecretKey=i.value.trim(),t.settings.popbillSenderNumber=a.value.trim(),localStorage.setItem(`ryzin_live_data`,JSON.stringify(t)),J(`API 연동 설정이 저장되었습니다.`)})}t===`admin`&&(hn(e),e.querySelector(`#btn-create-user`)?.addEventListener(`click`,async()=>{await gn()}))},0),e}function hn(e){let t=e.querySelector(`#user-list-tbody`);if(!t)return;let n=U.getAll(`users`);if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 사용자가 없습니다.</td></tr>`;return}t.innerHTML=n.map(e=>`
    <tr>
      <td style="font-weight: var(--weight-medium);">${e.id}</td>
      <td>${e.name}</td>
      <td><span style="color:var(--text-tertiary);">***</span></td>
      <td><span class="badge badge-default">${ae[e.role]?.label||(e.role&&e.role.startsWith(`live_stream:`)?`송출 관리자 (${e.role.split(`:`)[1]})`:e.role)}</span></td>
      <td class="text-right">
        <div style="display: flex; gap: var(--space-2); justify-content: flex-end;">
          <button class="btn btn-secondary btn-sm edit-user-btn" data-id="${e.id}">수정</button>
          <button class="btn btn-danger btn-sm delete-user-btn" data-id="${e.id}">삭제</button>
        </div>
      </td>
    </tr>
  `).join(``),t.querySelectorAll(`.edit-user-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=U.getById(`users`,e.getAttribute(`data-id`));t&&await gn(t)})}),t.querySelectorAll(`.delete-user-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-id`);st({title:`사용자 삭제`,message:`해당 사용자를 삭제하시겠습니까?`,confirmText:`삭제`,danger:!0,onConfirm:()=>{U.delete(`users`,n),J(`사용자가 삭제되었습니다.`),hn(e)}})})})}async function gn(e=null){let t=[];try{let e=window.supabaseClient;if(e){let{data:n,error:r}=await e.from(`live_control`).select(`live_id`);!r&&n&&(t=n.map(e=>({id:e.live_id})))}}catch(e){console.warn(`Failed to load lives from Supabase in settings.js`,e)}t.length===0&&(t=JSON.parse(localStorage.getItem(`ryzin_lives`)||`[]`));let n=document.createElement(`div`);n.className=`form-grid`,n.innerHTML=`
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
        ${Object.entries(ae).map(([t,n])=>`<option value="${t}" ${e&&e.role===t?`selected`:``}>${n.label} (${t})</option>`).join(``)}
        ${t.map(t=>`<option value="live_stream:${t.id}" ${e&&e.role===`live_stream:${t.id}`?`selected`:``}>송출 관리자 (${t.id})</option>`).join(``)}
      </select>
    </div>
  `;let r=document.createElement(`div`);r.style.cssText=`display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;`;let i=document.createElement(`button`);i.className=`btn btn-secondary`,i.textContent=`취소`,i.addEventListener(`click`,q);let a=document.createElement(`button`);a.className=`btn btn-primary`,a.textContent=`저장`,a.addEventListener(`click`,()=>{let t=document.getElementById(`user-id`).value.trim(),n=document.getElementById(`user-pw`).value.trim(),r=document.getElementById(`user-name`).value.trim(),i=document.getElementById(`user-role`).value;if(!t||!n||!r){Y(`모든 항목을 입력해주세요.`);return}let a=n;if(e)n!==e.password&&(a=Ue.default.SHA256(n).toString()),U.update(`users`,t,{password:a,name:r,role:i}),J(`사용자 정보가 수정되었습니다.`);else{if(U.getById(`users`,t)){Y(`이미 존재하는 아이디입니다.`);return}a=Ue.default.SHA256(n).toString(),U.create(`users`,{id:t,password:a,name:r,role:i}),J(`새로운 사용자가 등록되었습니다.`)}q();let o=document.getElementById(`page-content`);o&&(o.innerHTML=``,o.appendChild(mn()))}),r.appendChild(i),r.appendChild(a),K({title:e?`사용자 수정`:`사용자 추가`,content:n,footer:r})}function _n(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--status-success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`}function vn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`}var yn=e=>{let t=new Uint8Array(new ArrayBuffer(8)),n=e;for(let e=7;e>=0&&n!==0;e--)t[e]=n&255,n-=t[e],n/=256;return t};function bn(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name===`Uint8Array`&&`BYTES_PER_ELEMENT`in e&&e.BYTES_PER_ELEMENT===1}function xn(e,t=``){if(typeof e!=`number`){let n=t&&`"${t}" `;throw TypeError(`${n}expected number, got ${typeof e}`)}if(!Number.isSafeInteger(e)||e<0){let n=t&&`"${t}" `;throw RangeError(`${n}expected integer >= 0, got ${e}`)}}function Sn(e,t,n=``){let r=bn(e),i=e?.length;if(!r||t!==void 0){let t=n&&`"${n}" `,a=r?`length=${i}`:`type=${typeof e}`,o=t+`expected Uint8Array, got `+a;throw r?RangeError(o):TypeError(o)}return e}function Cn(e){if(typeof e!=`function`||typeof e.create!=`function`)throw TypeError(`Hash must wrapped by utils.createHasher`);if(xn(e.outputLen),xn(e.blockLen),e.outputLen<1)throw Error(`"outputLen" must be >= 1`);if(e.blockLen<1)throw Error(`"blockLen" must be >= 1`)}function wn(e,t=!0){if(e.destroyed)throw Error(`Hash instance has been destroyed`);if(t&&e.finished)throw Error(`Hash#digest() has already been called`)}function Tn(e,t){Sn(e,void 0,`digestInto() output`);let n=t.outputLen;if(e.length<n)throw RangeError(`"digestInto() output" expected to be of length >=`+n)}function En(e){return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function Dn(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function On(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function kn(e,t){return e<<32-t|e>>>t}function An(e,t){return e<<t|e>>>32-t>>>0}var jn=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function Mn(e){return e<<24&4278190080|e<<8&16711680|e>>>8&65280|e>>>24&255}function Nn(e){for(let t=0;t<e.length;t++)e[t]=Mn(e[t]);return e}var Pn=jn?e=>e:Nn;function Fn(e,t={}){let n=(t,n)=>e(n).update(t).digest(),r=e(void 0);return n.outputLen=r.outputLen,n.blockLen=r.blockLen,n.canXOF=r.canXOF,n.create=t=>e(t),Object.assign(n,t),Object.freeze(n)}var In=e=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,e])}),Ln=class{update(e){return wn(this),this.iHash.update(e),this}digestInto(e){wn(this),Tn(e,this),this.finished=!0;let t=e.subarray(0,this.outputLen);this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){let e=new Uint8Array(this.oHash.outputLen);return this.digestInto(e),e}_cloneInto(e){e||=Object.create(Object.getPrototypeOf(this),{});let{oHash:t,iHash:n,finished:r,destroyed:i,blockLen:a,outputLen:o}=this;return e=e,e.finished=r,e.destroyed=i,e.blockLen=a,e.outputLen=o,e.oHash=t._cloneInto(e.oHash),e.iHash=n._cloneInto(e.iHash),e}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}constructor(e,t){if(this.canXOF=!1,this.finished=!1,this.destroyed=!1,Cn(e),Sn(t,void 0,`key`),this.iHash=e.create(),typeof this.iHash.update!=`function`)throw Error(`Expected instance of class which extends utils.Hash`);this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;let n=this.blockLen,r=new Uint8Array(n);r.set(t.length>n?e.create().update(t).digest():t);for(let e=0;e<r.length;e++)r[e]^=54;this.iHash.update(r),this.oHash=e.create();for(let e=0;e<r.length;e++)r[e]^=106;this.oHash.update(r),Dn(r)}},Rn=(()=>{let e=(e,t,n)=>new Ln(e,t).update(n).digest();return e.create=(e,t)=>new Ln(e,t),e})();function zn(e,t,n){return e&t^~e&n}function Bn(e,t,n){return e&t^e&n^t&n}var Vn=class{update(e){wn(this),Sn(e);let{view:t,buffer:n,blockLen:r}=this,i=e.length;for(let a=0;a<i;){let o=Math.min(r-this.pos,i-a);if(o===r){let t=On(e);for(;r<=i-a;a+=r)this.process(t,a);continue}n.set(e.subarray(a,a+o),this.pos),this.pos+=o,a+=o,this.pos===r&&(this.process(t,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){wn(this),Tn(e,this),this.finished=!0;let{buffer:t,view:n,blockLen:r,isLE:i}=this,{pos:a}=this;t[a++]=128,Dn(this.buffer.subarray(a)),this.padOffset>r-a&&(this.process(n,0),a=0);for(let e=a;e<r;e++)t[e]=0;n.setBigUint64(r-8,BigInt(this.length*8),i),this.process(n,0);let o=On(e),s=this.outputLen;if(s%4)throw Error(`_sha2: outputLen must be aligned to 32bit`);let c=s/4,l=this.get();if(c>l.length)throw Error(`_sha2: outputLen bigger than state`);for(let e=0;e<c;e++)o.setUint32(4*e,l[e],i)}digest(){let{buffer:e,outputLen:t}=this;this.digestInto(e);let n=e.slice(0,t);return this.destroy(),n}_cloneInto(e){e||=new this.constructor,e.set(...this.get());let{blockLen:t,buffer:n,length:r,finished:i,destroyed:a,pos:o}=this;return e.destroyed=a,e.finished=i,e.length=r,e.pos=o,r%t&&e.buffer.set(n),e}clone(){return this._cloneInto()}constructor(e,t,n,r){this.canXOF=!1,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=t,this.padOffset=n,this.isLE=r,this.buffer=new Uint8Array(e),this.view=On(this.buffer)}},Hn=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),Un=Uint32Array.from([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]),Wn=Uint32Array.from([3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]),Gn=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]),Kn=Uint32Array.from([1732584193,4023233417,2562383102,271733878,3285377520]),qn=new Uint32Array(80),Jn=class extends Vn{get(){let{A:e,B:t,C:n,D:r,E:i}=this;return[e,t,n,r,i]}set(e,t,n,r,i){this.A=e|0,this.B=t|0,this.C=n|0,this.D=r|0,this.E=i|0}process(e,t){for(let n=0;n<16;n++,t+=4)qn[n]=e.getUint32(t,!1);for(let e=16;e<80;e++)qn[e]=An(qn[e-3]^qn[e-8]^qn[e-14]^qn[e-16],1);let{A:n,B:r,C:i,D:a,E:o}=this;for(let e=0;e<80;e++){let t,s;e<20?(t=zn(r,i,a),s=1518500249):e<40?(t=r^i^a,s=1859775393):e<60?(t=Bn(r,i,a),s=2400959708):(t=r^i^a,s=3395469782);let c=An(n,5)+t+o+s+qn[e]|0;o=a,a=i,i=An(r,30),r=n,n=c}n=n+this.A|0,r=r+this.B|0,i=i+this.C|0,a=a+this.D|0,o=o+this.E|0,this.set(n,r,i,a,o)}roundClean(){Dn(qn)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0),Dn(this.buffer)}constructor(){super(64,20,8,!1),this.A=Kn[0]|0,this.B=Kn[1]|0,this.C=Kn[2]|0,this.D=Kn[3]|0,this.E=Kn[4]|0}},Yn=Fn(()=>new Jn),Xn=BigInt(2**32-1),Zn=BigInt(32);function Qn(e,t=!1){return t?{h:Number(e&Xn),l:Number(e>>Zn&Xn)}:{h:Number(e>>Zn&Xn)|0,l:Number(e&Xn)|0}}function $n(e,t=!1){let n=e.length,r=new Uint32Array(n),i=new Uint32Array(n);for(let a=0;a<n;a++){let{h:n,l:o}=Qn(e[a],t);[r[a],i[a]]=[n,o]}return[r,i]}var er=(e,t,n)=>e>>>n,tr=(e,t,n)=>e<<32-n|t>>>n,nr=(e,t,n)=>e>>>n|t<<32-n,rr=(e,t,n)=>e<<32-n|t>>>n,ir=(e,t,n)=>e<<64-n|t>>>n-32,ar=(e,t,n)=>e>>>n-32|t<<64-n,or=(e,t,n)=>e<<n|t>>>32-n,sr=(e,t,n)=>t<<n|e>>>32-n,cr=(e,t,n)=>t<<n-32|e>>>64-n,lr=(e,t,n)=>e<<n-32|t>>>64-n;function ur(e,t,n,r){let i=(t>>>0)+(r>>>0);return{h:e+n+(i/2**32|0)|0,l:i|0}}var dr=(e,t,n)=>(e>>>0)+(t>>>0)+(n>>>0),fr=(e,t,n,r)=>t+n+r+(e/2**32|0)|0,pr=(e,t,n,r)=>(e>>>0)+(t>>>0)+(n>>>0)+(r>>>0),mr=(e,t,n,r,i)=>t+n+r+i+(e/2**32|0)|0,hr=(e,t,n,r,i)=>(e>>>0)+(t>>>0)+(n>>>0)+(r>>>0)+(i>>>0),gr=(e,t,n,r,i,a)=>t+n+r+i+a+(e/2**32|0)|0,_r=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),vr=new Uint32Array(64),yr=class extends Vn{get(){let{A:e,B:t,C:n,D:r,E:i,F:a,G:o,H:s}=this;return[e,t,n,r,i,a,o,s]}set(e,t,n,r,i,a,o,s){this.A=e|0,this.B=t|0,this.C=n|0,this.D=r|0,this.E=i|0,this.F=a|0,this.G=o|0,this.H=s|0}process(e,t){for(let n=0;n<16;n++,t+=4)vr[n]=e.getUint32(t,!1);for(let e=16;e<64;e++){let t=vr[e-15],n=vr[e-2],r=kn(t,7)^kn(t,18)^t>>>3;vr[e]=(kn(n,17)^kn(n,19)^n>>>10)+vr[e-7]+r+vr[e-16]|0}let{A:n,B:r,C:i,D:a,E:o,F:s,G:c,H:l}=this;for(let e=0;e<64;e++){let t=kn(o,6)^kn(o,11)^kn(o,25),u=l+t+zn(o,s,c)+_r[e]+vr[e]|0,d=(kn(n,2)^kn(n,13)^kn(n,22))+Bn(n,r,i)|0;l=c,c=s,s=o,o=a+u|0,a=i,i=r,r=n,n=u+d|0}n=n+this.A|0,r=r+this.B|0,i=i+this.C|0,a=a+this.D|0,o=o+this.E|0,s=s+this.F|0,c=c+this.G|0,l=l+this.H|0,this.set(n,r,i,a,o,s,c,l)}roundClean(){Dn(vr)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0,0,0,0),Dn(this.buffer)}constructor(e){super(64,e,8,!1)}},br=class extends yr{constructor(){super(32),this.A=Hn[0]|0,this.B=Hn[1]|0,this.C=Hn[2]|0,this.D=Hn[3]|0,this.E=Hn[4]|0,this.F=Hn[5]|0,this.G=Hn[6]|0,this.H=Hn[7]|0}},xr=class extends yr{constructor(){super(28),this.A=Un[0]|0,this.B=Un[1]|0,this.C=Un[2]|0,this.D=Un[3]|0,this.E=Un[4]|0,this.F=Un[5]|0,this.G=Un[6]|0,this.H=Un[7]|0}},Sr=$n(`0x428a2f98d728ae22.0x7137449123ef65cd.0xb5c0fbcfec4d3b2f.0xe9b5dba58189dbbc.0x3956c25bf348b538.0x59f111f1b605d019.0x923f82a4af194f9b.0xab1c5ed5da6d8118.0xd807aa98a3030242.0x12835b0145706fbe.0x243185be4ee4b28c.0x550c7dc3d5ffb4e2.0x72be5d74f27b896f.0x80deb1fe3b1696b1.0x9bdc06a725c71235.0xc19bf174cf692694.0xe49b69c19ef14ad2.0xefbe4786384f25e3.0x0fc19dc68b8cd5b5.0x240ca1cc77ac9c65.0x2de92c6f592b0275.0x4a7484aa6ea6e483.0x5cb0a9dcbd41fbd4.0x76f988da831153b5.0x983e5152ee66dfab.0xa831c66d2db43210.0xb00327c898fb213f.0xbf597fc7beef0ee4.0xc6e00bf33da88fc2.0xd5a79147930aa725.0x06ca6351e003826f.0x142929670a0e6e70.0x27b70a8546d22ffc.0x2e1b21385c26c926.0x4d2c6dfc5ac42aed.0x53380d139d95b3df.0x650a73548baf63de.0x766a0abb3c77b2a8.0x81c2c92e47edaee6.0x92722c851482353b.0xa2bfe8a14cf10364.0xa81a664bbc423001.0xc24b8b70d0f89791.0xc76c51a30654be30.0xd192e819d6ef5218.0xd69906245565a910.0xf40e35855771202a.0x106aa07032bbd1b8.0x19a4c116b8d2d0c8.0x1e376c085141ab53.0x2748774cdf8eeb99.0x34b0bcb5e19b48a8.0x391c0cb3c5c95a63.0x4ed8aa4ae3418acb.0x5b9cca4f7763e373.0x682e6ff3d6b2b8a3.0x748f82ee5defb2fc.0x78a5636f43172f60.0x84c87814a1f0ab72.0x8cc702081a6439ec.0x90befffa23631e28.0xa4506cebde82bde9.0xbef9a3f7b2c67915.0xc67178f2e372532b.0xca273eceea26619c.0xd186b8c721c0c207.0xeada7dd6cde0eb1e.0xf57d4f7fee6ed178.0x06f067aa72176fba.0x0a637dc5a2c898a6.0x113f9804bef90dae.0x1b710b35131c471b.0x28db77f523047d84.0x32caab7b40c72493.0x3c9ebe0a15c9bebc.0x431d67c49c100d4c.0x4cc5d4becb3e42b6.0x597f299cfc657e2a.0x5fcb6fab3ad6faec.0x6c44198c4a475817`.split(`.`).map(e=>BigInt(e))),Cr=Sr[0],wr=Sr[1],Tr=new Uint32Array(80),Er=new Uint32Array(80),Dr=class extends Vn{get(){let{Ah:e,Al:t,Bh:n,Bl:r,Ch:i,Cl:a,Dh:o,Dl:s,Eh:c,El:l,Fh:u,Fl:d,Gh:f,Gl:p,Hh:m,Hl:h}=this;return[e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h]}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.Ah=e|0,this.Al=t|0,this.Bh=n|0,this.Bl=r|0,this.Ch=i|0,this.Cl=a|0,this.Dh=o|0,this.Dl=s|0,this.Eh=c|0,this.El=l|0,this.Fh=u|0,this.Fl=d|0,this.Gh=f|0,this.Gl=p|0,this.Hh=m|0,this.Hl=h|0}process(e,t){for(let n=0;n<16;n++,t+=4)Tr[n]=e.getUint32(t),Er[n]=e.getUint32(t+=4);for(let e=16;e<80;e++){let t=Tr[e-15]|0,n=Er[e-15]|0,r=nr(t,n,1)^nr(t,n,8)^er(t,n,7),i=rr(t,n,1)^rr(t,n,8)^tr(t,n,7),a=Tr[e-2]|0,o=Er[e-2]|0,s=nr(a,o,19)^ir(a,o,61)^er(a,o,6),c=pr(i,rr(a,o,19)^ar(a,o,61)^tr(a,o,6),Er[e-7],Er[e-16]);Tr[e]=mr(c,r,s,Tr[e-7],Tr[e-16])|0,Er[e]=c|0}let{Ah:n,Al:r,Bh:i,Bl:a,Ch:o,Cl:s,Dh:c,Dl:l,Eh:u,El:d,Fh:f,Fl:p,Gh:m,Gl:h,Hh:g,Hl:_}=this;for(let e=0;e<80;e++){let t=nr(u,d,14)^nr(u,d,18)^ir(u,d,41),v=rr(u,d,14)^rr(u,d,18)^ar(u,d,41),y=u&f^~u&m,b=d&p^~d&h,x=hr(_,v,b,wr[e],Er[e]),S=gr(x,g,t,y,Cr[e],Tr[e]),C=x|0,w=nr(n,r,28)^ir(n,r,34)^ir(n,r,39),T=rr(n,r,28)^ar(n,r,34)^ar(n,r,39),E=n&i^n&o^i&o,D=r&a^r&s^a&s;g=m|0,_=h|0,m=f|0,h=p|0,f=u|0,p=d|0,{h:u,l:d}=ur(c|0,l|0,S|0,C|0),c=o|0,l=s|0,o=i|0,s=a|0,i=n|0,a=r|0;let O=dr(C,T,D);n=fr(O,S,w,E),r=O|0}({h:n,l:r}=ur(this.Ah|0,this.Al|0,n|0,r|0)),{h:i,l:a}=ur(this.Bh|0,this.Bl|0,i|0,a|0),{h:o,l:s}=ur(this.Ch|0,this.Cl|0,o|0,s|0),{h:c,l}=ur(this.Dh|0,this.Dl|0,c|0,l|0),{h:u,l:d}=ur(this.Eh|0,this.El|0,u|0,d|0),{h:f,l:p}=ur(this.Fh|0,this.Fl|0,f|0,p|0),{h:m,l:h}=ur(this.Gh|0,this.Gl|0,m|0,h|0),{h:g,l:_}=ur(this.Hh|0,this.Hl|0,g|0,_|0),this.set(n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_)}roundClean(){Dn(Tr,Er)}destroy(){this.destroyed=!0,Dn(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}constructor(e){super(128,e,16,!1)}},Or=class extends Dr{constructor(){super(64),this.Ah=Gn[0]|0,this.Al=Gn[1]|0,this.Bh=Gn[2]|0,this.Bl=Gn[3]|0,this.Ch=Gn[4]|0,this.Cl=Gn[5]|0,this.Dh=Gn[6]|0,this.Dl=Gn[7]|0,this.Eh=Gn[8]|0,this.El=Gn[9]|0,this.Fh=Gn[10]|0,this.Fl=Gn[11]|0,this.Gh=Gn[12]|0,this.Gl=Gn[13]|0,this.Hh=Gn[14]|0,this.Hl=Gn[15]|0}},kr=class extends Dr{constructor(){super(48),this.Ah=Wn[0]|0,this.Al=Wn[1]|0,this.Bh=Wn[2]|0,this.Bl=Wn[3]|0,this.Ch=Wn[4]|0,this.Cl=Wn[5]|0,this.Dh=Wn[6]|0,this.Dl=Wn[7]|0,this.Eh=Wn[8]|0,this.El=Wn[9]|0,this.Fh=Wn[10]|0,this.Fl=Wn[11]|0,this.Gh=Wn[12]|0,this.Gl=Wn[13]|0,this.Hh=Wn[14]|0,this.Hl=Wn[15]|0}},Ar=Fn(()=>new br,In(1)),jr=Fn(()=>new xr,In(4)),Mr=Fn(()=>new Or,In(3)),Nr=Fn(()=>new kr,In(2)),Pr=BigInt(0),Fr=BigInt(1),Ir=BigInt(2),Lr=BigInt(7),Rr=BigInt(256),zr=BigInt(113),Br=[],Vr=[],Hr=[];for(let e=0,t=Fr,n=1,r=0;e<24;e++){[n,r]=[r,(2*n+3*r)%5],Br.push(2*(5*r+n)),Vr.push((e+1)*(e+2)/2%64);let i=Pr;for(let e=0;e<7;e++)t=(t<<Fr^(t>>Lr)*zr)%Rr,t&Ir&&(i^=Fr<<(Fr<<BigInt(e))-Fr);Hr.push(i)}var Ur=$n(Hr,!0),Wr=Ur[0],Gr=Ur[1],Kr=(e,t,n)=>n>32?cr(e,t,n):or(e,t,n),qr=(e,t,n)=>n>32?lr(e,t,n):sr(e,t,n);function Jr(e,t=24){if(xn(t,`rounds`),t<1||t>24)throw Error(`"rounds" expected integer 1..24`);let n=new Uint32Array(10);for(let r=24-t;r<24;r++){for(let t=0;t<10;t++)n[t]=e[t]^e[t+10]^e[t+20]^e[t+30]^e[t+40];for(let t=0;t<10;t+=2){let r=(t+8)%10,i=(t+2)%10,a=n[i],o=n[i+1],s=Kr(a,o,1)^n[r],c=qr(a,o,1)^n[r+1];for(let n=0;n<50;n+=10)e[t+n]^=s,e[t+n+1]^=c}let t=e[2],i=e[3];for(let n=0;n<24;n++){let r=Vr[n],a=Kr(t,i,r),o=qr(t,i,r),s=Br[n];t=e[s],i=e[s+1],e[s]=a,e[s+1]=o}for(let t=0;t<50;t+=10){let n=e[t],r=e[t+1],i=e[t+2],a=e[t+3];e[t]^=~e[t+2]&e[t+4],e[t+1]^=~e[t+3]&e[t+5],e[t+2]^=~e[t+4]&e[t+6],e[t+3]^=~e[t+5]&e[t+7],e[t+4]^=~e[t+6]&e[t+8],e[t+5]^=~e[t+7]&e[t+9],e[t+6]^=~e[t+8]&n,e[t+7]^=~e[t+9]&r,e[t+8]^=~n&i,e[t+9]^=~r&a}e[0]^=Wr[r],e[1]^=Gr[r]}Dn(n)}var Yr=class e{clone(){return this._cloneInto()}keccak(){Pn(this.state32),Jr(this.state32,this.rounds),Pn(this.state32),this.posOut=0,this.pos=0}update(e){wn(this),Sn(e);let{blockLen:t,state:n}=this,r=e.length;for(let i=0;i<r;){let a=Math.min(t-this.pos,r-i);for(let t=0;t<a;t++)n[this.pos++]^=e[i++];this.pos===t&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;let{state:e,suffix:t,pos:n,blockLen:r}=this;e[n]^=t,t&128&&n===r-1&&this.keccak(),e[r-1]^=128,this.keccak()}writeInto(e){wn(this,!1),Sn(e),this.finish();let t=this.state,{blockLen:n}=this;for(let r=0,i=e.length;r<i;){this.posOut>=n&&this.keccak();let a=Math.min(n-this.posOut,i-r);e.set(t.subarray(this.posOut,this.posOut+a),r),this.posOut+=a,r+=a}return e}xofInto(e){if(!this.enableXOF)throw Error(`XOF is not possible for this instance`);return this.writeInto(e)}xof(e){return xn(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(Tn(e,this),this.finished)throw Error(`digest() was already called`);this.writeInto(e.subarray(0,this.outputLen)),this.destroy()}digest(){let e=new Uint8Array(this.outputLen);return this.digestInto(e),e}destroy(){this.destroyed=!0,Dn(this.state)}_cloneInto(t){let{blockLen:n,suffix:r,outputLen:i,rounds:a,enableXOF:o}=this;return t||=new e(n,r,i,o,a),t.blockLen=n,t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=a,t.suffix=r,t.outputLen=i,t.enableXOF=o,t.canXOF=this.canXOF,t.destroyed=this.destroyed,t}constructor(e,t,n,r=!1,i=24){if(this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,this.enableXOF=!1,this.blockLen=e,this.suffix=t,this.outputLen=n,this.enableXOF=r,this.canXOF=r,this.rounds=i,xn(n,`outputLen`),!(0<e&&e<200))throw Error(`only keccak-f1600 function is supported`);this.state=new Uint8Array(200),this.state32=En(this.state)}},Xr=(e,t,n,r={})=>Fn(()=>new Yr(t,e,n),r),Zr=Xr(6,144,28,In(7)),Qr=Xr(6,136,32,In(8)),$r=Xr(6,104,48,In(9)),ei=Xr(6,72,64,In(10)),ti=(()=>{if(typeof globalThis==`object`)return globalThis;Object.defineProperty(Object.prototype,"__GLOBALTHIS__",{get(){return this},configurable:!0});try{if(typeof __GLOBALTHIS__<`u`)return __GLOBALTHIS__}finally{delete Object.prototype.__GLOBALTHIS__}if(typeof self<`u`)return self;if(typeof window<`u`)return window;if(typeof global<`u`)return global})(),ni={SHA1:Yn,SHA224:jr,SHA256:Ar,SHA384:Nr,SHA512:Mr,"SHA3-224":Zr,"SHA3-256":Qr,"SHA3-384":$r,"SHA3-512":ei},ri=e=>{switch(!0){case/^(?:SHA-?1|SSL3-SHA1)$/i.test(e):return`SHA1`;case/^SHA(?:2?-)?224$/i.test(e):return`SHA224`;case/^SHA(?:2?-)?256$/i.test(e):return`SHA256`;case/^SHA(?:2?-)?384$/i.test(e):return`SHA384`;case/^SHA(?:2?-)?512$/i.test(e):return`SHA512`;case/^SHA3-224$/i.test(e):return`SHA3-224`;case/^SHA3-256$/i.test(e):return`SHA3-256`;case/^SHA3-384$/i.test(e):return`SHA3-384`;case/^SHA3-512$/i.test(e):return`SHA3-512`;default:throw TypeError(`Unknown hash algorithm: ${e}`)}},ii=(e,t,n)=>{if(Rn)return Rn(ni[e]??ni[ri(e)],t,n);throw Error(`Missing HMAC function`)},ai=`ABCDEFGHIJKLMNOPQRSTUVWXYZ234567`,oi=e=>{e=e.replace(/ /g,``);let t=e.length;for(;e[t-1]===`=`;)--t;e=(t<e.length?e.substring(0,t):e).toUpperCase();let n=new ArrayBuffer(e.length*5/8|0),r=new Uint8Array(n),i=0,a=0,o=0;for(let t=0;t<e.length;t++){let n=ai.indexOf(e[t]);if(n===-1)throw TypeError(`Invalid character found: ${e[t]}`);a=a<<5|n,i+=5,i>=8&&(i-=8,r[o++]=a>>>i)}return r},si=e=>{let t=0,n=0,r=``;for(let i=0;i<e.length;i++)for(n=n<<8|e[i],t+=8;t>=5;)r+=ai[n>>>t-5&31],t-=5;return t>0&&(r+=ai[n<<5-t&31]),r},ci=e=>{e=e.replace(/ /g,``);let t=new ArrayBuffer(e.length/2),n=new Uint8Array(t);for(let t=0;t<e.length;t+=2)n[t/2]=parseInt(e.substring(t,t+2),16);return n},li=e=>{let t=``;for(let n=0;n<e.length;n++){let r=e[n].toString(16);r.length===1&&(t+=`0`),t+=r}return t.toUpperCase()},ui=e=>{let t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let t=0;t<e.length;t++)n[t]=e.charCodeAt(t)&255;return n},di=e=>{let t=``;for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t},fi=ti.TextEncoder?new ti.TextEncoder:null,pi=ti.TextDecoder?new ti.TextDecoder:null,mi=e=>{if(!fi)throw Error(`Encoding API not available`);return fi.encode(e)},hi=e=>{if(!pi)throw Error(`Encoding API not available`);return pi.decode(e)},gi=e=>{if(ti.crypto?.getRandomValues)return ti.crypto.getRandomValues(new Uint8Array(e));throw Error(`Cryptography API not available`)},_i=class e{static fromLatin1(t){return new e({buffer:ui(t).buffer})}static fromUTF8(t){return new e({buffer:mi(t).buffer})}static fromBase32(t){return new e({buffer:oi(t).buffer})}static fromHex(t){return new e({buffer:ci(t).buffer})}get buffer(){return this.bytes.buffer}get latin1(){return Object.defineProperty(this,"latin1",{enumerable:!0,writable:!1,configurable:!1,value:di(this.bytes)}),this.latin1}get utf8(){return Object.defineProperty(this,"utf8",{enumerable:!0,writable:!1,configurable:!1,value:hi(this.bytes)}),this.utf8}get base32(){return Object.defineProperty(this,"base32",{enumerable:!0,writable:!1,configurable:!1,value:si(this.bytes)}),this.base32}get hex(){return Object.defineProperty(this,"hex",{enumerable:!0,writable:!1,configurable:!1,value:li(this.bytes)}),this.hex}constructor({buffer:e,size:t=20}={}){this.bytes=e===void 0?gi(t):new Uint8Array(e),Object.defineProperty(this,"bytes",{enumerable:!0,writable:!1,configurable:!1,value:this.bytes})}},vi=(e,t)=>{{if(e.length!==t.length)throw TypeError(`Input strings must have the same length`);let n=-1,r=0;for(;++n<e.length;)r|=e.charCodeAt(n)^t.charCodeAt(n);return r===0}},yi=class e{static get defaults(){return{issuer:``,label:`OTPAuth`,issuerInLabel:!0,algorithm:`SHA1`,digits:6,counter:0,window:1}}static generate({secret:t,algorithm:n=e.defaults.algorithm,digits:r=e.defaults.digits,counter:i=e.defaults.counter,hmac:a=ii}){let o=yn(i),s=a(n,t.bytes,o);if(!s?.byteLength||s.byteLength<19)throw TypeError(`Return value must be at least 19 bytes`);let c=s[s.byteLength-1]&15;return(((s[c]&127)<<24|(s[c+1]&255)<<16|(s[c+2]&255)<<8|s[c+3]&255)%10**r).toString().padStart(r,`0`)}generate({counter:t=this.counter++}={}){return e.generate({secret:this.secret,algorithm:this.algorithm,digits:this.digits,counter:t,hmac:this.hmac})}static validate({token:t,secret:n,algorithm:r,digits:i=e.defaults.digits,counter:a=e.defaults.counter,window:o=e.defaults.window,hmac:s=ii}){if(t.length!==i)return null;let c=null,l=o=>{vi(t,e.generate({secret:n,algorithm:r,digits:i,counter:o,hmac:s}))&&(c=o-a)};l(a);for(let e=1;e<=o&&c===null&&(l(a-e),!(c!==null||(l(a+e),c!==null)));++e);return c}validate({token:t,counter:n=this.counter,window:r}){return e.validate({token:t,secret:this.secret,algorithm:this.algorithm,digits:this.digits,counter:n,window:r,hmac:this.hmac})}toString(){let e=encodeURIComponent;return`otpauth://hotp/${this.issuer.length>0?this.issuerInLabel?`${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?`}secret=${e(this.secret.base32)}&algorithm=${e(this.algorithm)}&digits=${e(this.digits)}&counter=${e(this.counter)}`}constructor({issuer:t=e.defaults.issuer,label:n=e.defaults.label,issuerInLabel:r=e.defaults.issuerInLabel,secret:i=new _i,algorithm:a=e.defaults.algorithm,digits:o=e.defaults.digits,counter:s=e.defaults.counter,hmac:c}={}){this.issuer=t,this.label=n,this.issuerInLabel=r,this.secret=typeof i==`string`?_i.fromBase32(i):i,this.algorithm=c?a:ri(a),this.digits=o,this.counter=s,this.hmac=c}},bi=class e{static get defaults(){return{issuer:``,label:`OTPAuth`,issuerInLabel:!0,algorithm:`SHA1`,digits:6,period:30,window:1}}static counter({period:t=e.defaults.period,timestamp:n=Date.now()}={}){return Math.floor(n/1e3/t)}counter({timestamp:t=Date.now()}={}){return e.counter({period:this.period,timestamp:t})}static remaining({period:t=e.defaults.period,timestamp:n=Date.now()}={}){return t*1e3-n%(t*1e3)}remaining({timestamp:t=Date.now()}={}){return e.remaining({period:this.period,timestamp:t})}static generate({secret:t,algorithm:n,digits:r,period:i=e.defaults.period,timestamp:a=Date.now(),hmac:o}){return yi.generate({secret:t,algorithm:n,digits:r,counter:e.counter({period:i,timestamp:a}),hmac:o})}generate({timestamp:t=Date.now()}={}){return e.generate({secret:this.secret,algorithm:this.algorithm,digits:this.digits,period:this.period,timestamp:t,hmac:this.hmac})}static validate({token:t,secret:n,algorithm:r,digits:i,period:a=e.defaults.period,timestamp:o=Date.now(),window:s,hmac:c}){return yi.validate({token:t,secret:n,algorithm:r,digits:i,counter:e.counter({period:a,timestamp:o}),window:s,hmac:c})}validate({token:t,timestamp:n,window:r}){return e.validate({token:t,secret:this.secret,algorithm:this.algorithm,digits:this.digits,period:this.period,timestamp:n,window:r,hmac:this.hmac})}toString(){let e=encodeURIComponent;return`otpauth://totp/${this.issuer.length>0?this.issuerInLabel?`${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?issuer=${e(this.issuer)}&`:`${e(this.label)}?`}secret=${e(this.secret.base32)}&algorithm=${e(this.algorithm)}&digits=${e(this.digits)}&period=${e(this.period)}`}constructor({issuer:t=e.defaults.issuer,label:n=e.defaults.label,issuerInLabel:r=e.defaults.issuerInLabel,secret:i=new _i,algorithm:a=e.defaults.algorithm,digits:o=e.defaults.digits,period:s=e.defaults.period,hmac:c}={}){this.issuer=t,this.label=n,this.issuerInLabel=r,this.secret=typeof i==`string`?_i.fromBase32(i):i,this.algorithm=c?a:ri(a),this.digits=o,this.period=s,this.hmac=c}},xi=o(((e,t)=>{t.exports=function(){return typeof Promise==`function`&&Promise.prototype&&Promise.prototype.then}})),Si=o((e=>{var t,n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(e){if(!e)throw Error(`"version" cannot be null or undefined`);if(e<1||e>40)throw Error(`"version" should be in range from 1 to 40`);return e*4+17},e.getSymbolTotalCodewords=function(e){return n[e]},e.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t},e.setToSJISFunction=function(e){if(typeof e!=`function`)throw Error(`"toSJISFunc" is not a valid function.`);t=e},e.isKanjiModeEnabled=function(){return t!==void 0},e.toSJIS=function(e){return t(e)}})),Ci=o((e=>{e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`l`:case`low`:return e.L;case`m`:case`medium`:return e.M;case`q`:case`quartile`:return e.Q;case`h`:case`high`:return e.H;default:throw Error(`Unknown EC Level: `+t)}}e.isValid=function(e){return e&&e.bit!==void 0&&e.bit>=0&&e.bit<4},e.from=function(n,r){if(e.isValid(n))return n;try{return t(n)}catch{return r}}})),wi=o(((e,t)=>{function n(){this.buffer=[],this.length=0}n.prototype={get:function(e){let t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)==1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},t.exports=n})),Ti=o(((e,t)=>{function n(e){if(!e||e<1)throw Error(`BitMatrix size must be defined and greater than 0`);this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}n.prototype.set=function(e,t,n,r){let i=e*this.size+t;this.data[i]=n,r&&(this.reservedBit[i]=!0)},n.prototype.get=function(e,t){return this.data[e*this.size+t]},n.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},n.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},t.exports=n})),Ei=o((e=>{var t=Si().getSymbolSize;e.getRowColCoords=function(e){if(e===1)return[];let n=Math.floor(e/7)+2,r=t(e),i=r===145?26:Math.ceil((r-13)/(2*n-2))*2,a=[r-7];for(let e=1;e<n-1;e++)a[e]=a[e-1]-i;return a.push(6),a.reverse()},e.getPositions=function(t){let n=[],r=e.getRowColCoords(t),i=r.length;for(let e=0;e<i;e++)for(let t=0;t<i;t++)e===0&&t===0||e===0&&t===i-1||e===i-1&&t===0||n.push([r[e],r[t]]);return n}})),Di=o((e=>{var t=Si().getSymbolSize,n=7;e.getPositions=function(e){let r=t(e);return[[0,0],[r-n,0],[0,r-n]]}})),Oi=o((e=>{e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(e){return e!=null&&e!==``&&!isNaN(e)&&e>=0&&e<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(e){let n=e.size,r=0,i=0,a=0,o=null,s=null;for(let c=0;c<n;c++){i=a=0,o=s=null;for(let l=0;l<n;l++){let n=e.get(c,l);n===o?i++:(i>=5&&(r+=t.N1+(i-5)),o=n,i=1),n=e.get(l,c),n===s?a++:(a>=5&&(r+=t.N1+(a-5)),s=n,a=1)}i>=5&&(r+=t.N1+(i-5)),a>=5&&(r+=t.N1+(a-5))}return r},e.getPenaltyN2=function(e){let n=e.size,r=0;for(let t=0;t<n-1;t++)for(let i=0;i<n-1;i++){let n=e.get(t,i)+e.get(t,i+1)+e.get(t+1,i)+e.get(t+1,i+1);(n===4||n===0)&&r++}return r*t.N2},e.getPenaltyN3=function(e){let n=e.size,r=0,i=0,a=0;for(let t=0;t<n;t++){i=a=0;for(let o=0;o<n;o++)i=i<<1&2047|e.get(t,o),o>=10&&(i===1488||i===93)&&r++,a=a<<1&2047|e.get(o,t),o>=10&&(a===1488||a===93)&&r++}return r*t.N3},e.getPenaltyN4=function(e){let n=0,r=e.data.length;for(let t=0;t<r;t++)n+=e.data[t];return Math.abs(Math.ceil(n*100/r/5)-10)*t.N4};function n(t,n,r){switch(t){case e.Patterns.PATTERN000:return(n+r)%2==0;case e.Patterns.PATTERN001:return n%2==0;case e.Patterns.PATTERN010:return r%3==0;case e.Patterns.PATTERN011:return(n+r)%3==0;case e.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(r/3))%2==0;case e.Patterns.PATTERN101:return n*r%2+n*r%3==0;case e.Patterns.PATTERN110:return(n*r%2+n*r%3)%2==0;case e.Patterns.PATTERN111:return(n*r%3+(n+r)%2)%2==0;default:throw Error(`bad maskPattern:`+t)}}e.applyMask=function(e,t){let r=t.size;for(let i=0;i<r;i++)for(let a=0;a<r;a++)t.isReserved(a,i)||t.xor(a,i,n(e,a,i))},e.getBestMask=function(t,n){let r=Object.keys(e.Patterns).length,i=0,a=1/0;for(let o=0;o<r;o++){n(o),e.applyMask(o,t);let r=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(o,t),r<a&&(a=r,i=o)}return i}})),ki=o((e=>{var t=Ci(),n=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(e,r){switch(r){case t.L:return n[(e-1)*4+0];case t.M:return n[(e-1)*4+1];case t.Q:return n[(e-1)*4+2];case t.H:return n[(e-1)*4+3];default:return}},e.getTotalCodewordsCount=function(e,n){switch(n){case t.L:return r[(e-1)*4+0];case t.M:return r[(e-1)*4+1];case t.Q:return r[(e-1)*4+2];case t.H:return r[(e-1)*4+3];default:return}}})),Ai=o((e=>{var t=new Uint8Array(512),n=new Uint8Array(256);(function(){let e=1;for(let r=0;r<255;r++)t[r]=e,n[e]=r,e<<=1,e&256&&(e^=285);for(let e=255;e<512;e++)t[e]=t[e-255]})(),e.log=function(e){if(e<1)throw Error(`log(`+e+`)`);return n[e]},e.exp=function(e){return t[e]},e.mul=function(e,r){return e===0||r===0?0:t[n[e]+n[r]]}})),ji=o((e=>{var t=Ai();e.mul=function(e,n){let r=new Uint8Array(e.length+n.length-1);for(let i=0;i<e.length;i++)for(let a=0;a<n.length;a++)r[i+a]^=t.mul(e[i],n[a]);return r},e.mod=function(e,n){let r=new Uint8Array(e);for(;r.length-n.length>=0;){let e=r[0];for(let i=0;i<n.length;i++)r[i]^=t.mul(n[i],e);let i=0;for(;i<r.length&&r[i]===0;)i++;r=r.slice(i)}return r},e.generateECPolynomial=function(n){let r=new Uint8Array([1]);for(let i=0;i<n;i++)r=e.mul(r,new Uint8Array([1,t.exp(i)]));return r}})),Mi=o(((e,t)=>{var n=ji();function r(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}r.prototype.initialize=function(e){this.degree=e,this.genPoly=n.generateECPolynomial(this.degree)},r.prototype.encode=function(e){if(!this.genPoly)throw Error(`Encoder not initialized`);let t=new Uint8Array(e.length+this.degree);t.set(e);let r=n.mod(t,this.genPoly),i=this.degree-r.length;if(i>0){let e=new Uint8Array(this.degree);return e.set(r,i),e}return r},t.exports=r})),Ni=o((e=>{e.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}})),Pi=o((e=>{var t=`[0-9]+`,n=`[A-Z $%*+\\-./:]+`,r=`(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+`;r=r.replace(/u/g,`\\u`);var i=`(?:(?![A-Z0-9 $%*+\\-./:]|`+r+`)(?:.|[\r
]))+`;e.KANJI=new RegExp(r,`g`),e.BYTE_KANJI=RegExp(`[^A-Z0-9 $%*+\\-./:]+`,`g`),e.BYTE=new RegExp(i,`g`),e.NUMERIC=new RegExp(t,`g`),e.ALPHANUMERIC=new RegExp(n,`g`);var a=RegExp(`^`+r+`$`),o=RegExp(`^[0-9]+$`),s=RegExp(`^[A-Z0-9 $%*+\\-./:]+$`);e.testKanji=function(e){return a.test(e)},e.testNumeric=function(e){return o.test(e)},e.testAlphanumeric=function(e){return s.test(e)}})),Fi=o((e=>{var t=Ni(),n=Pi();e.NUMERIC={id:`Numeric`,bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:`Alphanumeric`,bit:2,ccBits:[9,11,13]},e.BYTE={id:`Byte`,bit:4,ccBits:[8,16,16]},e.KANJI={id:`Kanji`,bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(e,n){if(!e.ccBits)throw Error(`Invalid mode: `+e);if(!t.isValid(n))throw Error(`Invalid version: `+n);return n>=1&&n<10?e.ccBits[0]:n<27?e.ccBits[1]:e.ccBits[2]},e.getBestModeForData=function(t){return n.testNumeric(t)?e.NUMERIC:n.testAlphanumeric(t)?e.ALPHANUMERIC:n.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(e){if(e&&e.id)return e.id;throw Error(`Invalid mode`)},e.isValid=function(e){return e&&e.bit&&e.ccBits};function r(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`numeric`:return e.NUMERIC;case`alphanumeric`:return e.ALPHANUMERIC;case`kanji`:return e.KANJI;case`byte`:return e.BYTE;default:throw Error(`Unknown mode: `+t)}}e.from=function(t,n){if(e.isValid(t))return t;try{return r(t)}catch{return n}}})),Ii=o((e=>{var t=Si(),n=ki(),r=Ci(),i=Fi(),a=Ni(),o=7973,s=t.getBCHDigit(o);function c(t,n,r){for(let i=1;i<=40;i++)if(n<=e.getCapacity(i,r,t))return i}function l(e,t){return i.getCharCountIndicator(e,t)+4}function u(e,t){let n=0;return e.forEach(function(e){let r=l(e.mode,t);n+=r+e.getBitsLength()}),n}function d(t,n){for(let r=1;r<=40;r++)if(u(t,r)<=e.getCapacity(r,n,i.MIXED))return r}e.from=function(e,t){return a.isValid(e)?parseInt(e,10):t},e.getCapacity=function(e,r,o){if(!a.isValid(e))throw Error(`Invalid QR Code version`);o===void 0&&(o=i.BYTE);let s=(t.getSymbolTotalCodewords(e)-n.getTotalCodewordsCount(e,r))*8;if(o===i.MIXED)return s;let c=s-l(o,e);switch(o){case i.NUMERIC:return Math.floor(c/10*3);case i.ALPHANUMERIC:return Math.floor(c/11*2);case i.KANJI:return Math.floor(c/13);case i.BYTE:default:return Math.floor(c/8)}},e.getBestVersionForData=function(e,t){let n,i=r.from(t,r.M);if(Array.isArray(e)){if(e.length>1)return d(e,i);if(e.length===0)return 1;n=e[0]}else n=e;return c(n.mode,n.getLength(),i)},e.getEncodedBits=function(e){if(!a.isValid(e)||e<7)throw Error(`Invalid QR Code version`);let n=e<<12;for(;t.getBCHDigit(n)-s>=0;)n^=o<<t.getBCHDigit(n)-s;return e<<12|n}})),Li=o((e=>{var t=Si(),n=1335,r=21522,i=t.getBCHDigit(n);e.getEncodedBits=function(e,a){let o=e.bit<<3|a,s=o<<10;for(;t.getBCHDigit(s)-i>=0;)s^=n<<t.getBCHDigit(s)-i;return(o<<10|s)^r}})),Ri=o(((e,t)=>{var n=Fi();function r(e){this.mode=n.NUMERIC,this.data=e.toString()}r.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let t,n,r;for(t=0;t+3<=this.data.length;t+=3)n=this.data.substr(t,3),r=parseInt(n,10),e.put(r,10);let i=this.data.length-t;i>0&&(n=this.data.substr(t),r=parseInt(n,10),e.put(r,i*3+1))},t.exports=r})),zi=o(((e,t)=>{var n=Fi(),r=`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:`.split(``);function i(e){this.mode=n.ALPHANUMERIC,this.data=e}i.getBitsLength=function(e){return 11*Math.floor(e/2)+e%2*6},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let n=r.indexOf(this.data[t])*45;n+=r.indexOf(this.data[t+1]),e.put(n,11)}this.data.length%2&&e.put(r.indexOf(this.data[t]),6)},t.exports=i})),Bi=o(((e,t)=>{var n=Fi();function r(e){this.mode=n.BYTE,typeof e==`string`?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}r.getBitsLength=function(e){return e*8},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},t.exports=r})),Vi=o(((e,t)=>{var n=Fi(),r=Si();function i(e){this.mode=n.KANJI,this.data=e}i.getBitsLength=function(e){return e*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let n=r.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error(`Invalid SJIS character: `+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}},t.exports=i})),Hi=o(((e,t)=>{var n={single_source_shortest_paths:function(e,t,r){var i={},a={};a[t]=0;var o=n.PriorityQueue.make();o.push(t,0);for(var s,c,l,u,d,f,p,m,h;!o.empty();)for(l in s=o.pop(),c=s.value,u=s.cost,d=e[c]||{},d)d.hasOwnProperty(l)&&(f=d[l],p=u+f,m=a[l],h=a[l]===void 0,(h||m>p)&&(a[l]=p,o.push(l,p),i[l]=c));if(r!==void 0&&a[r]===void 0){var g=[`Could not find a path from `,t,` to `,r,`.`].join(``);throw Error(g)}return i},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],r=t;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,t,r){var i=n.single_source_shortest_paths(e,t,r);return n.extract_shortest_path_from_predecessor_list(i,r)},PriorityQueue:{make:function(e){var t=n.PriorityQueue,r={},i;for(i in e||={},t)t.hasOwnProperty(i)&&(r[i]=t[i]);return r.queue=[],r.sorter=e.sorter||t.default_sorter,r},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){var n={value:e,cost:t};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t!==void 0&&(t.exports=n)})),Ui=o((e=>{var t=Fi(),n=Ri(),r=zi(),i=Bi(),a=Vi(),o=Pi(),s=Si(),c=Hi();function l(e){return unescape(encodeURIComponent(e)).length}function u(e,t,n){let r=[],i;for(;(i=e.exec(n))!==null;)r.push({data:i[0],index:i.index,mode:t,length:i[0].length});return r}function d(e){let n=u(o.NUMERIC,t.NUMERIC,e),r=u(o.ALPHANUMERIC,t.ALPHANUMERIC,e),i,a;return s.isKanjiModeEnabled()?(i=u(o.BYTE,t.BYTE,e),a=u(o.KANJI,t.KANJI,e)):(i=u(o.BYTE_KANJI,t.BYTE,e),a=[]),n.concat(r,i,a).sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function f(e,o){switch(o){case t.NUMERIC:return n.getBitsLength(e);case t.ALPHANUMERIC:return r.getBitsLength(e);case t.KANJI:return a.getBitsLength(e);case t.BYTE:return i.getBitsLength(e)}}function p(e){return e.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?(e[e.length-1].data+=t.data,e):(e.push(t),e)},[])}function m(e){let n=[];for(let r=0;r<e.length;r++){let i=e[r];switch(i.mode){case t.NUMERIC:n.push([i,{data:i.data,mode:t.ALPHANUMERIC,length:i.length},{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.ALPHANUMERIC:n.push([i,{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.KANJI:n.push([i,{data:i.data,mode:t.BYTE,length:l(i.data)}]);break;case t.BYTE:n.push([{data:i.data,mode:t.BYTE,length:l(i.data)}])}}return n}function h(e,n){let r={},i={start:{}},a=[`start`];for(let o=0;o<e.length;o++){let s=e[o],c=[];for(let e=0;e<s.length;e++){let l=s[e],u=``+o+e;c.push(u),r[u]={node:l,lastCount:0},i[u]={};for(let e=0;e<a.length;e++){let o=a[e];r[o]&&r[o].node.mode===l.mode?(i[o][u]=f(r[o].lastCount+l.length,l.mode)-f(r[o].lastCount,l.mode),r[o].lastCount+=l.length):(r[o]&&(r[o].lastCount=l.length),i[o][u]=f(l.length,l.mode)+4+t.getCharCountIndicator(l.mode,n))}}a=c}for(let e=0;e<a.length;e++)i[a[e]].end=0;return{map:i,table:r}}function g(e,o){let c,l=t.getBestModeForData(e);if(c=t.from(o,l),c!==t.BYTE&&c.bit<l.bit)throw Error(`"`+e+`" cannot be encoded with mode `+t.toString(c)+`.
 Suggested mode is: `+t.toString(l));switch(c===t.KANJI&&!s.isKanjiModeEnabled()&&(c=t.BYTE),c){case t.NUMERIC:return new n(e);case t.ALPHANUMERIC:return new r(e);case t.KANJI:return new a(e);case t.BYTE:return new i(e)}}e.fromArray=function(e){return e.reduce(function(e,t){return typeof t==`string`?e.push(g(t,null)):t.data&&e.push(g(t.data,t.mode)),e},[])},e.fromString=function(t,n){let r=h(m(d(t,s.isKanjiModeEnabled())),n),i=c.find_path(r.map,`start`,`end`),a=[];for(let e=1;e<i.length-1;e++)a.push(r.table[i[e]].node);return e.fromArray(p(a))},e.rawSplit=function(t){return e.fromArray(d(t,s.isKanjiModeEnabled()))}})),Wi=o((e=>{var t=Si(),n=Ci(),r=wi(),i=Ti(),a=Ei(),o=Di(),s=Oi(),c=ki(),l=Mi(),u=Ii(),d=Li(),f=Fi(),p=Ui();function m(e,t){let n=e.size,r=o.getPositions(t);for(let t=0;t<r.length;t++){let i=r[t][0],a=r[t][1];for(let t=-1;t<=7;t++)if(!(i+t<=-1||n<=i+t))for(let r=-1;r<=7;r++)a+r<=-1||n<=a+r||(t>=0&&t<=6&&(r===0||r===6)||r>=0&&r<=6&&(t===0||t===6)||t>=2&&t<=4&&r>=2&&r<=4?e.set(i+t,a+r,!0,!0):e.set(i+t,a+r,!1,!0))}}function h(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}function g(e,t){let n=a.getPositions(t);for(let t=0;t<n.length;t++){let r=n[t][0],i=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)t===-2||t===2||n===-2||n===2||t===0&&n===0?e.set(r+t,i+n,!0,!0):e.set(r+t,i+n,!1,!0)}}function _(e,t){let n=e.size,r=u.getEncodedBits(t),i,a,o;for(let t=0;t<18;t++)i=Math.floor(t/3),a=t%3+n-8-3,o=(r>>t&1)==1,e.set(i,a,o,!0),e.set(a,i,o,!0)}function v(e,t,n){let r=e.size,i=d.getEncodedBits(t,n),a,o;for(a=0;a<15;a++)o=(i>>a&1)==1,a<6?e.set(a,8,o,!0):a<8?e.set(a+1,8,o,!0):e.set(r-15+a,8,o,!0),a<8?e.set(8,r-a-1,o,!0):a<9?e.set(8,15-a-1+1,o,!0):e.set(8,15-a-1,o,!0);e.set(r-8,8,1,!0)}function y(e,t){let n=e.size,r=-1,i=n-1,a=7,o=0;for(let s=n-1;s>0;s-=2)for(s===6&&s--;;){for(let n=0;n<2;n++)if(!e.isReserved(i,s-n)){let r=!1;o<t.length&&(r=(t[o]>>>a&1)==1),e.set(i,s-n,r),a--,a===-1&&(o++,a=7)}if(i+=r,i<0||n<=i){i-=r,r=-r;break}}}function b(e,n,i){let a=new r;i.forEach(function(t){a.put(t.mode.bit,4),a.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),t.write(a)});let o=(t.getSymbolTotalCodewords(e)-c.getTotalCodewordsCount(e,n))*8;for(a.getLengthInBits()+4<=o&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(0);let s=(o-a.getLengthInBits())/8;for(let e=0;e<s;e++)a.put(e%2?17:236,8);return x(a,e,n)}function x(e,n,r){let i=t.getSymbolTotalCodewords(n),a=i-c.getTotalCodewordsCount(n,r),o=c.getBlocksCount(n,r),s=o-i%o,u=Math.floor(i/o),d=Math.floor(a/o),f=d+1,p=u-d,m=new l(p),h=0,g=Array(o),_=Array(o),v=0,y=new Uint8Array(e.buffer);for(let e=0;e<o;e++){let t=e<s?d:f;g[e]=y.slice(h,h+t),_[e]=m.encode(g[e]),h+=t,v=Math.max(v,t)}let b=new Uint8Array(i),x=0,S,C;for(S=0;S<v;S++)for(C=0;C<o;C++)S<g[C].length&&(b[x++]=g[C][S]);for(S=0;S<p;S++)for(C=0;C<o;C++)b[x++]=_[C][S];return b}function S(e,n,r,a){let o;if(Array.isArray(e))o=p.fromArray(e);else if(typeof e==`string`){let t=n;if(!t){let n=p.rawSplit(e);t=u.getBestVersionForData(n,r)}o=p.fromString(e,t||40)}else throw Error(`Invalid data`);let c=u.getBestVersionForData(o,r);if(!c)throw Error(`The amount of data is too big to be stored in a QR Code`);if(!n)n=c;else if(n<c)throw Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+c+`.
`);let l=b(n,r,o),d=new i(t.getSymbolSize(n));return m(d,n),h(d),g(d,n),v(d,r,0),n>=7&&_(d,n),y(d,l),isNaN(a)&&(a=s.getBestMask(d,v.bind(null,d,r))),s.applyMask(a,d),v(d,r,a),{modules:d,version:n,errorCorrectionLevel:r,maskPattern:a,segments:o}}e.create=function(e,r){if(e===void 0||e===``)throw Error(`No input text`);let i=n.M,a,o;return r!==void 0&&(i=n.from(r.errorCorrectionLevel,n.M),a=u.from(r.version),o=s.from(r.maskPattern),r.toSJISFunc&&t.setToSJISFunction(r.toSJISFunc)),S(e,a,i,o)}})),Gi=o((e=>{function t(e){if(typeof e==`number`&&(e=e.toString()),typeof e!=`string`)throw Error(`Color should be defined as hex string`);let t=e.slice().replace(`#`,``).split(``);if(t.length<3||t.length===5||t.length>8)throw Error(`Invalid hex color: `+e);(t.length===3||t.length===4)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),t.length===6&&t.push(`F`,`F`);let n=parseInt(t.join(``),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:`#`+t.slice(0,6).join(``)}}e.getOptions=function(e){e||={},e.color||={};let n=e.margin===void 0||e.margin===null||e.margin<0?4:e.margin,r=e.width&&e.width>=21?e.width:void 0,i=e.scale||4;return{width:r,scale:r?4:i,margin:n,color:{dark:t(e.color.dark||`#000000ff`),light:t(e.color.light||`#ffffffff`)},type:e.type,rendererOpts:e.rendererOpts||{}}},e.getScale=function(e,t){return t.width&&t.width>=e+t.margin*2?t.width/(e+t.margin*2):t.scale},e.getImageWidth=function(t,n){let r=e.getScale(t,n);return Math.floor((t+n.margin*2)*r)},e.qrToImageData=function(t,n,r){let i=n.modules.size,a=n.modules.data,o=e.getScale(i,r),s=Math.floor((i+r.margin*2)*o),c=r.margin*o,l=[r.color.light,r.color.dark];for(let e=0;e<s;e++)for(let n=0;n<s;n++){let u=(e*s+n)*4,d=r.color.light;if(e>=c&&n>=c&&e<s-c&&n<s-c){let t=Math.floor((e-c)/o),r=Math.floor((n-c)/o);d=l[+!!a[t*i+r]]}t[u++]=d.r,t[u++]=d.g,t[u++]=d.b,t[u]=d.a}}})),Ki=o((e=>{var t=Gi();function n(e,t,n){e.clearRect(0,0,t.width,t.height),t.style||={},t.height=n,t.width=n,t.style.height=n+`px`,t.style.width=n+`px`}function r(){try{return document.createElement(`canvas`)}catch{throw Error(`You need to specify a canvas element`)}}e.render=function(e,i,a){let o=a,s=i;o===void 0&&(!i||!i.getContext)&&(o=i,i=void 0),i||(s=r()),o=t.getOptions(o);let c=t.getImageWidth(e.modules.size,o),l=s.getContext(`2d`),u=l.createImageData(c,c);return t.qrToImageData(u.data,e,o),n(l,s,c),l.putImageData(u,0,0),s},e.renderToDataURL=function(t,n,r){let i=r;i===void 0&&(!n||!n.getContext)&&(i=n,n=void 0),i||={};let a=e.render(t,n,i),o=i.type||`image/png`,s=i.rendererOpts||{};return a.toDataURL(o,s.quality)}})),qi=o((e=>{var t=Gi();function n(e,t){let n=e.a/255,r=t+`="`+e.hex+`"`;return n<1?r+` `+t+`-opacity="`+n.toFixed(2).slice(1)+`"`:r}function r(e,t,n){let r=e+t;return n!==void 0&&(r+=` `+n),r}function i(e,t,n){let i=``,a=0,o=!1,s=0;for(let c=0;c<e.length;c++){let l=Math.floor(c%t),u=Math.floor(c/t);!l&&!o&&(o=!0),e[c]?(s++,c>0&&l>0&&e[c-1]||(i+=o?r(`M`,l+n,.5+u+n):r(`m`,a,0),a=0,o=!1),l+1<t&&e[c+1]||(i+=r(`h`,s),s=0)):a++}return i}e.render=function(e,r,a){let o=t.getOptions(r),s=e.modules.size,c=e.modules.data,l=s+o.margin*2,u=o.color.light.a?`<path `+n(o.color.light,`fill`)+` d="M0 0h`+l+`v`+l+`H0z"/>`:``,d=`<path `+n(o.color.dark,`stroke`)+` d="`+i(c,s,o.margin)+`"/>`,f=`viewBox="0 0 `+l+` `+l+`"`,p=`<svg xmlns="http://www.w3.org/2000/svg" `+(o.width?`width="`+o.width+`" height="`+o.width+`" `:``)+f+` shape-rendering="crispEdges">`+u+d+`</svg>
`;return typeof a==`function`&&a(null,p),p}}));o((e=>{var t=xi(),n=Wi(),r=Ki(),i=qi();function a(e,r,i,a,o){let s=[].slice.call(arguments,1),c=s.length,l=typeof s[c-1]==`function`;if(!l&&!t())throw Error(`Callback required as last argument`);if(l){if(c<2)throw Error(`Too few arguments provided`);c===2?(o=i,i=r,r=a=void 0):c===3&&(r.getContext&&o===void 0?(o=a,a=void 0):(o=a,a=i,i=r,r=void 0))}else{if(c<1)throw Error(`Too few arguments provided`);return c===1?(i=r,r=a=void 0):c===2&&!r.getContext&&(a=i,i=r,r=void 0),new Promise(function(t,o){try{t(e(n.create(i,a),r,a))}catch(e){o(e)}})}try{let t=n.create(i,a);o(null,e(t,r,a))}catch(e){o(e)}}e.create=n.create,e.toCanvas=a.bind(null,r.render),e.toDataURL=a.bind(null,r.renderToDataURL),e.toString=a.bind(null,function(e,t,n){return i.render(e,n)})}))();function Ji(){U.isDemoMode&&(localStorage.setItem(`ryzin_is_demo_mode`,`false`),U.isDemoMode=!1,U.STORAGE_KEY=`livecommerce_erp_data`,U._load());let e=document.createElement(`div`);return e.className=`login-container`,e.innerHTML=`
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
              <img src="${Ye}" alt="Ryzin Logo" />
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
              <img src="${Ye}" alt="Ryzin Logo" />
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
  `,setTimeout(()=>{let e=document.getElementById(`login-form`),t=document.getElementById(`otp-form`),n=document.getElementById(`login-slider`),r=document.getElementById(`btn-back`),i=document.getElementById(`btn-reset-otp`);document.getElementById(`otp-setup-container`),document.getElementById(`qrcode-box`);let a=document.getElementById(`login-otp`),o=null;e&&e.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`login-id`).value.trim(),r=document.getElementById(`login-pw`).value;if(n.toLowerCase()===`admin`&&r.trim()===`1234`){U.loginAsDemo();return}let i=e.querySelector(`button[type="submit"]`),a=i?i.textContent:`로그인`;i&&(i.textContent=`로그인 중...`,i.disabled=!0);try{await U.init()}catch(e){console.warn(`Failed to sync users from Supabase before login`,e)}finally{i&&(i.textContent=a,i.disabled=!1)}let o=U.verifyPassword(n,r);if(o){if(U.isDemoMode){U.completeLogin(o),J(`데모 모드로 접속되었습니다.`),M.navigate(`/`);return}U.completeLogin(o),J(`환영합니다.`),M.navigate(`/`);return}else Y(`로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.`)}),t&&t.addEventListener(`submit`,e=>{if(e.preventDefault(),!o)return;let t=a.value.trim(),n=o.otpSecret||localStorage.getItem(`ryzin_otp_${o.id}`)||null;try{new bi({issuer:`Ryzin Admin`,label:o.id,algorithm:`SHA1`,digits:6,period:30,secret:_i.fromBase32(n)}).validate({token:t,window:1})===null?(Y(`인증번호가 올바르지 않습니다.`),a.value=``,a.focus()):(localStorage.setItem(`ryzin_otp_trusted_${o.id}`,`true`),U.completeLogin(o),J(`OTP 인증 성공! 환영합니다.`),M.navigate(`/`))}catch{Y(`인증 과정에 문제가 발생했습니다.`)}}),i&&i.addEventListener(`click`,()=>{o&&confirm(`OTP 설정을 초기화하시겠습니까? 기기에서 기존 계정을 삭제하고 새로 등록해야 합니다.`)&&(localStorage.removeItem(`ryzin_otp_${o.id}`),alert(`OTP 설정이 초기화되었습니다. 다시 로그인하여 새 QR 코드를 스캔하세요.`),n.style.transform=`translateX(0)`,o=null,a.value=``)}),r&&r.addEventListener(`click`,()=>{n.style.transform=`translateX(0)`,o=null,a.value=``})},0),e}var Yi=`https://vybrnhyaeugfwezbygdt.supabase.co`,Xi=`sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9`,Zi={"Content-Type":`application/json`,apikey:Xi,Authorization:`Bearer ${Xi}`,Prefer:`return=representation`};async function Qi(e,t=``){let n=await fetch(`${Yi}/rest/v1/${e}?${t}`,{headers:Zi});if(!n.ok)throw Error(`DB fetch error: ${n.status}`);return n.json()}async function $i(e,t){let n=await fetch(`${Yi}/rest/v1/${e}`,{method:`POST`,headers:Zi,body:JSON.stringify(t)});if(!n.ok)throw Error(`DB insert error: ${n.status}`);return n.json()}async function ea(e,t,n){let r=await fetch(`${Yi}/rest/v1/${e}?id=eq.${t}`,{method:`PATCH`,headers:Zi,body:JSON.stringify(n)});if(!r.ok)throw Error(`DB update error: ${r.status}`);return r.json()}async function ta(e,t){let n=await fetch(`${Yi}/rest/v1/${e}?id=eq.${t}`,{method:`DELETE`,headers:Zi});if(!n.ok)throw Error(`DB delete error: ${n.status}`);return!0}var na={getAll:()=>Qi(`shop_banners`,`select=*&order=sort_order.asc`),insert:e=>$i(`shop_banners`,e),update:(e,t)=>ea(`shop_banners`,e,t),delete:e=>ta(`shop_banners`,e)},ra={getAll:()=>Qi(`shop_sections`,`select=*&order=sort_order.asc`),insert:e=>$i(`shop_sections`,e),update:(e,t)=>ea(`shop_sections`,e,t),delete:e=>ta(`shop_sections`,e)},ia={getAll:()=>Qi(`shop_menus`,`select=*&order=sort_order.asc`),insert:e=>$i(`shop_menus`,e),update:(e,t)=>ea(`shop_menus`,e,t),delete:e=>ta(`shop_menus`,e)},aa={getAll:()=>Qi(`shop_products`,`select=*&order=sort_order.asc`),getBySectionId:e=>Qi(`shop_products`,`select=*&section_id=eq.${e}&order=sort_order.asc`),insert:e=>$i(`shop_products`,e),update:(e,t)=>ea(`shop_products`,e,t),delete:e=>ta(`shop_products`,e)},oa={getAll:()=>Qi(`shop_magazines`,`select=*&order=sort_order.asc`),insert:e=>$i(`shop_magazines`,e),update:(e,t)=>ea(`shop_magazines`,e,t),delete:e=>ta(`shop_magazines`,e)},sa={getAll:()=>Qi(`shop_users`,`select=*&order=created_at.desc`),insert:e=>$i(`shop_users`,e),update:(e,t)=>ea(`shop_users`,e,t),delete:e=>ta(`shop_users`,e)};function ca(){return`PROD-${Math.floor(Math.random()*89999+1e4)}`}function la(e){let t=document.createElement(`style`);t.innerHTML=`
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
  `,e.appendChild(t)}async function ua(e){let t=localStorage.getItem(`ryzin_imgbb_key`)||`4ad44d673bfba8d88df109c0df1e2cae`,n=await da(e,1024,.85),r=new FormData;r.append(`image`,n.split(`,`)[1]);let i=await(await fetch(`https://api.imgbb.com/1/upload?key=${t}`,{method:`POST`,body:r})).json();if(i&&i.success)return i.data.url;throw Error(i.error&&i.error.message||`이미지 업로드 실패`)}function da(e,t=1024,n=.85){return new Promise((r,i)=>{let a=new FileReader;a.onload=e=>{let a=new Image;a.onload=()=>{let e=document.createElement(`canvas`),i=a.width,o=a.height;i>t&&(o=Math.round(o*t/i),i=t),e.width=i,e.height=o,e.getContext(`2d`).drawImage(a,0,0,i,o),r(e.toDataURL(`image/jpeg`,n))},a.onerror=i,a.src=e.target.result},a.onerror=i,a.readAsDataURL(e)})}function fa(e,t,n){e.addEventListener(`click`,()=>{let e=document.createElement(`input`);e.type=`file`,e.accept=`image/*`,e.onchange=async e=>{let r=e.target.files[0];if(r){Z(`이미지를 업로드하고 있습니다...`);try{let e=await ua(r);t.value=e,n&&n(e),Z(`이미지 업로드 성공`)}catch(e){alert(`업로드 실패: `+e.message)}}},e.click()})}function Z(e){let t=document.getElementById(`sm-toast`);t||(t=document.createElement(`div`),t.id=`sm-toast`,t.style.cssText=`position:fixed;bottom:24px;right:24px;background:#0f172a;color:#fff;padding:10px 18px;border-radius:8px;font-size:12.5px;font-weight:700;z-index:99999;box-shadow:0 8px 20px rgba(0,0,0,0.2);transition:opacity 0.2s;`,document.body.appendChild(t)),t.textContent=e,t.style.opacity=`1`,clearTimeout(t.timer),t.timer=setTimeout(()=>{t.style.opacity=`0`},2200)}function Q(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}function $(e,t,n,r=`text`,i=!1){return`
    <div style="${i?`grid-column: 1 / -1;`:``}">
      <label class="sm-label">${e}</label>
      <input class="sm-input ${t}" type="${r}" value="${Q(n||``)}">
    </div>
  `}function pa(e,t,n){return`
    <div style="grid-column: 1 / -1;">
      <label class="sm-label">${e}</label>
      <div style="display:flex; gap:8px;">
        <input class="sm-input ${t}" type="text" value="${Q(n||``)}">
        <button class="sm-action-btn sm-btn-primary ${t}-preview" style="flex-shrink:0; padding:0 12px;">적용</button>
      </div>
    </div>
  `}var ma=`products`,ha=[],ga=[];function _a(){let e=document.createElement(`div`);e.style.cssText=`min-height:100vh; background:#f8fafc; padding:24px; color:#0f172a; font-family:"Pretendard",sans-serif;`,la(e);let t=document.createElement(`div`);return t.style.cssText=`max-width:1100px; margin:0 auto;`,t.innerHTML=`
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
      ${[{key:`products`,label:`상품 관리`},{key:`sections`,label:`기획전 관리`},{key:`banners`,label:`탑배너 관리`},{key:`menus`,label:`퀵메뉴 관리`},{key:`magazines`,label:`매거진 관리`},{key:`users`,label:`유저 관리`}].map(e=>`<button class="sm-tab-btn${e.key===ma?` active`:``}" data-tab="${e.key}">${e.label}</button>`).join(``)}
    </div>

    <div id="sm-loading" style="text-align:center; padding:30px; color:#64748b; font-size:13px; font-weight:600;">
      데이터를 동기화하는 중...
    </div>
    <div id="sm-panel"></div>
    <div id="sm-modal-container"></div>
  `,t.querySelectorAll(`.sm-tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{ma=e.dataset.tab,t.querySelectorAll(`.sm-tab-btn`).forEach(e=>{e.classList.toggle(`active`,e.dataset.tab===ma)}),va(t)})}),t.querySelector(`#btn-refresh`).addEventListener(`click`,()=>{Z(`데이터를 새로고침합니다.`),va(t)}),e.appendChild(t),setTimeout(async()=>{try{ha=await ra.getAll()}catch{ha=[]}await va(t)},0),e}async function va(e){let t=e.querySelector(`#sm-loading`),n=e.querySelector(`#sm-panel`);t.style.display=`block`,n.innerHTML=``;try{ga=await aa.getAll(),ma===`products`?await ya(n,e):ma===`sections`?await Sa(n,e):ma===`banners`?await Ca(n):ma===`menus`?await wa(n):ma===`magazines`?await Ta(n):ma===`users`&&await Ea(n,e)}catch(e){n.innerHTML=`
      <div class="sm-card" style="border-color:#fca5a5; background:#fef2f2; color:#b91c1c;">
        <h4 style="margin:0 0 6px 0; font-weight:800;">데이터 연동 실패</h4>
        <p style="margin:0; font-size:12.5px;">${e.message}. Supabase 데이터베이스 연결 상태를 확인해 주세요.</p>
      </div>
    `}t.style.display=`none`}async function ya(e,t){e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
      <div>
        <h2 style="font-size:16px; font-weight:800; color:#0f172a; margin:0 0 4px 0;">전체 상품 리스트 (${ga.length}개 등록)</h2>
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
  `;let n=e.querySelector(`#prod-table-body`),r=e.querySelector(`#prod-search-input`);function i(){let e=r.value.trim().toLowerCase(),i=ga.filter(t=>{let n=(t.product_code||``).toLowerCase(),r=(t.product_title||t.brand_title||``).toLowerCase(),i=(t.brand_name||``).toLowerCase();return!e||n.includes(e)||r.includes(e)||i.includes(e)});if(!i.length){n.innerHTML=`<tr><td colspan="8" style="text-align:center; padding:30px; color:#94a3b8;">검색된 상품이 없습니다.</td></tr>`;return}n.innerHTML=i.map(e=>{let t=e.product_code||ca(),n=e.badge_color||`#ef4444`,r=e.best_rank&&e.best_rank>0?`RANK #${e.best_rank}`:`-`;return`
        <tr>
          <td><span class="sm-rank-badge" style="background:#1e293b;">${Q(t)}</span></td>
          <td style="text-align:center;">
            <img src="${Q(e.img_url||``)}" style="width:40px; height:40px; border-radius:6px; object-fit:cover; background:#f1f5f9;">
          </td>
          <td style="font-weight:700;">${Q(e.brand_name||`-`)}</td>
          <td style="font-weight:600; color:#0f172a;">${Q(e.product_title||e.brand_title)}</td>
          <td style="font-weight:700; color:#2563eb;">${Q(e.sale_price)}</td>
          <td style="font-weight:800; color:#dc2626;">${Q(r)}</td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="display:inline-block; width:14px; height:14px; border-radius:4px; background:${Q(n)};"></span>
              <span style="font-size:11px; font-weight:600; color:#64748b;">${Q(n)}</span>
            </div>
          </td>
          <td style="text-align:center;">
            <button class="sm-action-btn sm-btn-primary btn-edit-prod" data-id="${e.id}" style="padding:4px 8px; font-size:11px;">수정</button>
            <button class="sm-action-btn sm-btn-danger btn-del-prod" data-id="${e.id}" style="padding:4px 8px; font-size:11px;">삭제</button>
          </td>
        </tr>
      `}).join(``),n.querySelectorAll(`.btn-edit-prod`).forEach(e=>{e.addEventListener(`click`,()=>{let n=ga.find(t=>t.id===e.dataset.id);n&&ba(n,t)})}),n.querySelectorAll(`.btn-del-prod`).forEach(e=>{e.addEventListener(`click`,async()=>{confirm(`이 상품을 삭제하시겠습니까?`)&&(await aa.delete(e.dataset.id),Z(`삭제되었습니다.`),await va(t))})})}r.addEventListener(`input`,i),i(),e.querySelector(`#btn-open-add-modal`).addEventListener(`click`,()=>{ba(null,t)})}function ba(e,t){let n=!!e,r=e&&e.product_code||ca(),i=t.querySelector(`#sm-modal-container`),a=e&&e.badge_color||`#ef4444`,o=e&&e.best_rank||0;i.innerHTML=`
    <div class="sm-modal-backdrop" id="modal-backdrop">
      <div class="sm-modal-content">
        <div class="sm-modal-header">
          <h3 class="sm-modal-title">${n?`상품 정보 수정`:`새 상품 등록 (모달)`}</h3>
          <button class="sm-modal-close" id="modal-close-btn">&times;</button>
        </div>
        <form id="modal-prod-form" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label class="sm-label">고유 상품 코드 (자동 부여)</label>
            <input class="sm-input" id="m-pcode" value="${Q(r)}" readonly style="background:#f8fafc; font-weight:800; color:#2563eb;">
          </div>
          <div>
            <label class="sm-label">기획전 섹션 선택</label>
            <select class="sm-input" id="m-psection" style="font-weight:700; cursor:pointer; height:37px;">
              <option value="">-- 기획전 선택 안함 --</option>
              ${ha.map(t=>`<option value="${t.id}" ${e&&e.section_id===t.id?`selected`:``}>${Q(t.title)}</option>`).join(``)}
            </select>
          </div>
          ${$(`브랜드명 (예: 설화수)`,`m-bname`,e?e.brand_name:``)}
          ${$(`상품명 (예: 윤조 에센스 90ml)`,`m-ptitle`,e?e.product_title||e.brand_title:``)}
          ${$(`판매가 (예: 9,900원)`,`m-sale`,e?e.sale_price:``)}
          ${$(`원래 정가 (예: 50,000원)`,`m-origin`,e?e.origin_price:``)}
          ${$(`할인 태그 (예: 80% 특가)`,`m-disc`,e?e.discount:``)}
          <div>
            <label class="sm-label">베스트 TOP 10 순위 (1~10, 0:미지정)</label>
            <input class="sm-input" id="m-bestrank" type="number" min="0" max="10" value="${o}" style="font-weight:800;">
          </div>
          <div>
            <label class="sm-label">뱃지 배경 색상 (Badge Color)</label>
            <div class="color-picker-box">
              <input class="color-picker-input" id="m-picker" type="color" value="${Q(a)}">
              <input class="sm-input" id="m-color" type="text" value="${Q(a)}" placeholder="#ef4444" style="font-weight:700;">
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
                <input class="sm-input" id="m-gbstatus" value="${Q(e&&e.group_buy_status||`모집중`)}" placeholder="모집중">
              </div>
              <div>
                <label class="sm-label">참여 인원 뱃지</label>
                <input class="sm-input" id="m-gbpart" value="${Q(e&&e.group_buy_participants||`50명 참여`)}" placeholder="50명 참여">
              </div>
              <div>
                <label class="sm-label">목표 달성 인원 (명)</label>
                <input class="sm-input" id="m-gbtarget" type="number" value="${e&&e.group_buy_target||50}" placeholder="50">
              </div>
            </div>
          </div>

          ${$(`MD 추천 코멘트`,`m-mdcomment`,e?e.md_comment:`MD 강력 추천 상품`,`text`,!0)}
          <div style="grid-column: 1 / -1;">
            <label class="sm-label">상품 이미지 (클릭 업로드)</label>
            <div style="display:flex; gap:12px; align-items:center;">
              <div class="sm-thumb-uploader" id="m-uploader" style="width:80px; height:80px; flex-shrink:0;">
                <img id="m-thumb-img" src="${Q(e?e.img_url:``)}" style="width:100%; height:100%; object-fit:cover;">
                <div class="sm-thumb-uploader-overlay">클릭 업로드</div>
              </div>
              <input class="sm-input" id="m-imgurl" type="text" value="${Q(e?e.img_url:``)}" placeholder="이미지 URL">
            </div>
          </div>
          <div style="grid-column:1 / -1; display:flex; justify-content:flex-end; gap:8px; margin-top:16px; padding-top:16px; border-top:1px solid #e2e8f0;">
            <button type="button" class="sm-action-btn sm-btn-secondary" id="modal-cancel-btn">취소</button>
            <button type="submit" class="sm-action-btn sm-btn-success">${n?`수정 내용 저장`:`새 상품 등록`}</button>
          </div>
        </form>
      </div>
    </div>
  `;let s=()=>{i.innerHTML=``};i.querySelector(`#modal-close-btn`).addEventListener(`click`,s),i.querySelector(`#modal-cancel-btn`).addEventListener(`click`,s);let c=i.querySelector(`#m-picker`),l=i.querySelector(`#m-color`);c.addEventListener(`input`,e=>l.value=e.target.value),l.addEventListener(`input`,e=>c.value=e.target.value);let u=i.querySelector(`#m-uploader`),d=i.querySelector(`#m-imgurl`);fa(u,d,e=>{i.querySelector(`#m-thumb-img`).src=e}),i.querySelector(`#modal-prod-form`).addEventListener(`submit`,async r=>{r.preventDefault();let a=i.querySelector(`#m-pcode`).value.trim(),o=i.querySelector(`#m-psection`).value||null,c=i.querySelector(`#m-bname`).value.trim(),u=i.querySelector(`#m-ptitle`).value.trim(),f=parseInt(i.querySelector(`#m-bestrank`).value)||0,p={product_code:a,section_id:o,brand_name:c,product_title:u,brand_title:c?`${c} ${u}`:u,sale_price:i.querySelector(`#m-sale`).value.trim(),origin_price:i.querySelector(`#m-origin`).value.trim(),discount:i.querySelector(`#m-disc`).value.trim(),best_rank:f,badge_color:l.value.trim()||`#ef4444`,is_group_buy:i.querySelector(`#m-isgb`).checked,group_buy_status:i.querySelector(`#m-gbstatus`).value.trim()||`모집중`,group_buy_participants:i.querySelector(`#m-gbpart`).value.trim()||`50명 참여`,group_buy_target:parseInt(i.querySelector(`#m-gbtarget`).value)||50,md_comment:i.querySelector(`#m-mdcomment`).value.trim(),img_url:d.value.trim()};n?(await aa.update(e.id,p),Z(`상품 수정 완료`)):(p.sort_order=99,p.rating=`5.0`,p.reviews=`10`,await aa.insert(p),Z(`새 상품 등록 완료`)),s(),await va(t)})}function xa(e,t){let n=e.querySelector(`#sm-modal-container`);n.innerHTML=`
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
  `;let r=()=>{n.innerHTML=``};n.querySelector(`#search-modal-close`).addEventListener(`click`,r);let i=n.querySelector(`#modal-search-keyword`),a=n.querySelector(`#search-result-list`);function o(){let e=i.value.trim().toLowerCase(),n=ga.filter(t=>{let n=(t.product_code||``).toLowerCase(),r=(t.product_title||t.brand_title||``).toLowerCase(),i=(t.brand_name||``).toLowerCase();return!e||n.includes(e)||r.includes(e)||i.includes(e)});if(!n.length){a.innerHTML=`<div style="text-align:center; padding:24px; color:#94a3b8; font-size:13px;">검색 결과가 없습니다.</div>`;return}a.innerHTML=n.map(e=>`
      <div class="search-item-card" data-id="${e.id}" style="display:flex; align-items:center; gap:12px; padding:10px 12px; border:1px solid #e2e8f0; border-radius:8px; cursor:pointer; background:#fff; transition:background 0.15s;">
        <img src="${Q(e.img_url||``)}" style="width:44px; height:44px; border-radius:6px; object-fit:cover; background:#f1f5f9;">
        <div style="flex:1; overflow:hidden;">
          <div style="display:flex; gap:6px; align-items:center; margin-bottom:2px;">
            <span class="sm-rank-badge" style="font-size:10px;">${Q(e.product_code||`PROD-00000`)}</span>
            <span style="font-size:11px; font-weight:700; color:#64748b;">${Q(e.brand_name||``)}</span>
          </div>
          <div style="font-size:13px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${Q(e.product_title||e.brand_title)}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:13px; font-weight:800; color:#2563eb;">${Q(e.sale_price)}</div>
          <button class="sm-action-btn sm-btn-primary" style="padding:3px 8px; font-size:11px; margin-top:2px;">선택 추가</button>
        </div>
      </div>
    `).join(``),a.querySelectorAll(`.search-item-card`).forEach(e=>{e.addEventListener(`click`,()=>{let n=ga.find(t=>t.id===e.dataset.id);n&&(t(n),r())})})}i.addEventListener(`input`,o),o()}async function Sa(e,t){ha=await ra.getAll();let n=ga,r={};n.forEach(e=>{r[e.section_id]||(r[e.section_id]=[]),r[e.section_id].push(e)}),e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">기획전 관리 (${ha.length}개 섹션)</h2>
      <button id="add-sec" class="sm-action-btn sm-btn-primary">+ 새 기획전 섹션 추가</button>
    </div>
    <div id="section-list"></div>
  `,e.querySelector(`#add-sec`).addEventListener(`click`,async()=>{await ra.insert({sort_order:99,title:`새 기획전 섹션`,subtitle:`단독 특가로 만나보세요`,show_timer:!1}),Z(`새 기획전 섹션이 생성되었습니다.`),await Sa(e,t)});let i=e.querySelector(`#section-list`);ha.forEach(n=>{let a=r[n.id]||[],o=document.createElement(`div`);o.className=`sm-card`,o.innerHTML=`
      <div class="sm-card-header">
        <div class="sm-card-title">
          <span>${Q(n.title)}</span>
          <span style="font-size:11px; font-weight:600; color:#64748b; background:#f1f5f9; padding:2px 6px; border-radius:4px;">(${a.length}개 상품)</span>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="sm-action-btn sm-btn-primary sec-search-add" style="padding:5px 10px; font-size:12px;">+ 코드/이름 검색 추가</button>
          <button class="sm-action-btn sm-btn-success sec-save" style="padding:5px 10px; font-size:12px;">저장</button>
          <button class="sm-action-btn sm-btn-danger sec-del" style="padding:5px 10px; font-size:12px;">삭제</button>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
        ${$(`기획전 제목 (예: 바캉스 기획전, 인플루언서 픽)`,`sec-title`,n.title)}
        ${$(`기획전 부제목 / 혜택 안내`,`sec-subtitle`,n.subtitle)}
      </div>
      <div style="margin-bottom:16px;">
        <label class="sm-label">상단 와이드 커버 배너 이미지 (클릭 업로드)</label>
        <div style="display:flex; gap:12px; align-items:center;">
          <div class="sm-thumb-uploader sec-b-uploader" style="width:140px; height:60px; flex-shrink:0;">
            <img class="sec-b-thumb" src="${Q(n.banner_img_url||``)}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">와이드 업로드</div>
          </div>
          <input class="sm-input sec-b-url" type="text" value="${Q(n.banner_img_url||``)}" placeholder="와이드 배너 이미지 URL">
        </div>
      </div>

      <div style="margin-top:16px; background:#f8fafc; border-radius:8px; padding:14px;">
        <h4 style="font-size:12.5px; font-weight:800; color:#334155; margin:0 0 10px 0;">등록된 기획전 상품 카드</h4>
        <div class="sec-prod-list" style="display:flex; flex-direction:column; gap:10px;"></div>
      </div>
    `;let s=o.querySelector(`.sec-b-uploader`),c=o.querySelector(`.sec-b-url`);fa(s,c,e=>{o.querySelector(`.sec-b-thumb`).src=e}),o.querySelector(`.sec-save`).addEventListener(`click`,async()=>{await ra.update(n.id,{title:o.querySelector(`.sec-title`).value.trim(),subtitle:o.querySelector(`.sec-subtitle`).value.trim(),banner_img_url:c.value.trim()}),Z(`기획전 정보 저장 완료`)}),o.querySelector(`.sec-del`).addEventListener(`click`,async()=>{confirm(`이 기획전 섹션을 삭제합니까?`)&&(await ra.delete(n.id),Z(`삭제되었습니다.`),await Sa(e,t))}),o.querySelector(`.sec-search-add`).addEventListener(`click`,()=>{xa(t,async e=>{await aa.update(e.id,{section_id:n.id}),Z(`[${e.product_code||`상품`}]이 '${n.title}' 기획전에 추가되었습니다.`),await va(t)})});let l=o.querySelector(`.sec-prod-list`);a.forEach(e=>{let n=document.createElement(`div`);n.style.cssText=`background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between; gap:12px;`,n.innerHTML=`
        <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
          <span class="sm-rank-badge" style="font-size:10px;">${Q(e.product_code||`PROD-00000`)}</span>
          <img src="${Q(e.img_url||``)}" style="width:36px; height:36px; border-radius:6px; object-fit:cover; background:#f1f5f9;">
          <div style="overflow:hidden;">
            <div style="font-size:12px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${Q(e.brand_name?`${e.brand_name} ${e.product_title}`:e.brand_title)}</div>
            <div style="font-size:11px; color:#2563eb; font-weight:700;">${Q(e.sale_price)}</div>
          </div>
        </div>
        <button class="sm-action-btn sm-btn-danger btn-remove-sec-prod" style="padding:4px 8px; font-size:11px;">기획전 제외</button>
      `,n.querySelector(`.btn-remove-sec-prod`).addEventListener(`click`,async()=>{await aa.update(e.id,{section_id:null}),Z(`기획전에서 제외되었습니다.`),await va(t)}),l.appendChild(n)}),i.appendChild(o)})}async function Ca(e){let t=await na.getAll();e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">상단 롤링 프로모 배너 (${t.length}개)</h2>
      <button id="add-banner" class="sm-action-btn sm-btn-primary">+ 새 배너 추가</button>
    </div>
    <div id="banner-list"></div>
  `,e.querySelector(`#add-banner`).addEventListener(`click`,async()=>{await na.insert({sort_order:99,title:`새 기획 배너`,desc:``,label:`오늘`,time_text:`오후 8시`,img_url:``,link_url:`/shop/live_teaser.html`}),Z(`새 배너가 추가되었습니다.`),await Ca(e)});let n=e.querySelector(`#banner-list`);t.forEach(t=>{let r=document.createElement(`div`);r.className=`sm-card`,r.innerHTML=`
      <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
        <div style="width:130px; flex-shrink:0;">
          <label class="sm-label">배너 썸네일 (클릭 업로드)</label>
          <div class="sm-thumb-uploader b-uploader" style="width:100%; height:86px;">
            <img class="b-thumb" src="${Q(t.img_url||``)}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">클릭 업로드</div>
          </div>
        </div>
        <div style="flex:1; min-width:260px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          ${$(`배너 대제목`,`b-title`,t.title)}
          ${$(`서브 설명`,`b-desc`,t.desc)}
          ${$(`라벨 (예: 오늘, 내일)`,`b-label`,t.label)}
          ${$(`시간 문구 (예: 오후 8시)`,`b-time`,t.time_text)}
          ${pa(`이미지 URL`,`b-img`,t.img_url)}
          ${$(`이동 링크 URL`,`b-link`,t.link_url,`text`,!0)}
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:16px; padding-top:12px; border-top:1px solid #f1f5f9;">
        <button class="sm-action-btn sm-btn-success b-save">저장</button>
        <button class="sm-action-btn sm-btn-danger b-del">삭제</button>
      </div>
    `,fa(r.querySelector(`.b-uploader`),r.querySelector(`.b-img`),e=>{r.querySelector(`.b-thumb`).src=e}),r.querySelector(`.b-img-preview`).addEventListener(`click`,()=>{r.querySelector(`.b-thumb`).src=r.querySelector(`.b-img`).value.trim()}),r.querySelector(`.b-save`).addEventListener(`click`,async()=>{await na.update(t.id,{title:r.querySelector(`.b-title`).value.trim(),desc:r.querySelector(`.b-desc`).value.trim(),label:r.querySelector(`.b-label`).value.trim(),time_text:r.querySelector(`.b-time`).value.trim(),img_url:r.querySelector(`.b-img`).value.trim(),link_url:r.querySelector(`.b-link`).value.trim()}),Z(`배너 저장 완료`)}),r.querySelector(`.b-del`).addEventListener(`click`,async()=>{confirm(`배너를 삭제합니까?`)&&(await na.delete(t.id),Z(`삭제되었습니다.`),await Ca(e))}),n.appendChild(r)})}async function wa(e){let[t,n]=await Promise.all([ia.getAll(),ra.getAll()]);ha=n;let r=`<option value="">-- 기획전 섹션 연결 안함 --</option>`+n.map(e=>`<option value="${e.id}">${Q(e.title)}</option>`).join(``);e.innerHTML=`
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
  `,e.querySelector(`#add-menu`).addEventListener(`click`,async()=>{await ia.insert({sort_order:99,name:`새 카테고리 탭`,section_id:null}),Z(`새 탭이 추가되었습니다.`),await wa(e)});let i=e.querySelector(`#menu-list`);t.forEach((t,n)=>{let a=document.createElement(`div`);a.className=`sm-card`,a.style.cssText=`padding:14px 16px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:10px;`,a.innerHTML=`
      <span class="sm-rank-badge">TAB #${n+1}</span>
      <div style="flex:1; min-width:180px;">
        <label class="sm-label" style="margin-bottom:3px;">탭 메뉴 이름</label>
        <input class="sm-input m-name" value="${Q(t.name)}" placeholder="예: 셀러 특가" style="font-weight:700;">
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
    `;let o=a.querySelector(`.m-sec`);o.value=t.section_id||``,a.querySelector(`.m-save`).addEventListener(`click`,async()=>{await ia.update(t.id,{name:a.querySelector(`.m-name`).value.trim(),section_id:o.value||null}),Z(`탭 저장 완료`)}),a.querySelector(`.m-del`).addEventListener(`click`,async()=>{confirm(`이 탭 메뉴를 삭제합니까?`)&&(await ia.delete(t.id),Z(`삭제되었습니다.`),await wa(e))}),i.appendChild(a)})}async function Ta(e){let t=[];try{t=await oa.getAll()}catch{t=[]}e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <div>
        <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0 0 2px 0;">매거진 콘텐츠 관리 (${t.length}개)</h2>
        <p style="font-size:12px; color:#64748b; margin:0;">홈 화면의 매거진 피처 아티클 및 서브 카드를 추가/수정합니다.</p>
      </div>
      <button id="add-mag" class="sm-action-btn sm-btn-primary">+ 새 매거진 아티클 추가</button>
    </div>
    <div id="mag-list"></div>
  `,e.querySelector(`#add-mag`).addEventListener(`click`,async()=>{try{await oa.insert({category:`뷰티 트렌드`,title:`새 매거진 아티클 타이틀`,desc:`매거진 요약 설명을 입력하세요`,img_url:`https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85`,link_url:`/shop/magazine.html`,is_feature:!1,sort_order:99}),Z(`새 매거진 아티클이 추가되었습니다.`)}catch{Z(`매거진 생성 성공 (로컬 동기화)`)}await Ta(e)});let n=e.querySelector(`#mag-list`);if(!t.length){n.innerHTML=`<div class="sm-card" style="text-align:center; padding:30px; color:#94a3b8;">등록된 매거진이 없습니다. 새 매거진 추가 버튼을 클릭해 보세요.</div>`;return}t.forEach(t=>{let r=document.createElement(`div`);r.className=`sm-card`,r.style.marginBottom=`14px`,r.innerHTML=`
      <div class="sm-card-header">
        <div class="sm-card-title">
          <span>${Q(t.title)}</span>
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
        ${$(`카테고리 (예: 뷰티 트렌드, 라이프스타일)`,`mag-cat`,t.category)}
        ${$(`매거진 제목`,`mag-title`,t.title)}
      </div>
      <div style="margin-bottom:10px;">
        ${$(`매거진 요약 설명 (피처 카드에 노출)`,`mag-desc`,t.desc,`text`,!0)}
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
        ${$(`클릭 시 이동할 링크 URL`,`mag-link`,t.link_url||`/shop/exhibition.html`)}
        <div style="display:flex; align-items:center; gap:8px; margin-top:20px;">
          <input type="checkbox" class="mag-isfeat" id="mag-feat-${t.id}" ${t.is_feature?`checked`:``} style="width:16px; height:16px; cursor:pointer;">
          <label for="mag-feat-${t.id}" style="font-size:13px; font-weight:800; color:#0f172a; cursor:pointer;">메인 피처 아티클로 지정</label>
        </div>
      </div>
      <div>
        <label class="sm-label">커버 이미지 (클릭 업로드)</label>
        <div style="display:flex; gap:12px; align-items:center;">
          <div class="sm-thumb-uploader mag-uploader" style="width:120px; height:64px; flex-shrink:0;">
            <img class="mag-thumb" src="${Q(t.img_url||``)}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">이미지 업로드</div>
          </div>
          <input class="sm-input mag-imgurl" type="text" value="${Q(t.img_url||``)}" placeholder="이미지 URL">
        </div>
      </div>
    `;let i=r.querySelector(`.mag-uploader`),a=r.querySelector(`.mag-imgurl`);fa(i,a,e=>{r.querySelector(`.mag-thumb`).src=e}),r.querySelector(`.mag-save`).addEventListener(`click`,async()=>{await oa.update(t.id,{category:r.querySelector(`.mag-cat`).value.trim(),title:r.querySelector(`.mag-title`).value.trim(),desc:r.querySelector(`.mag-desc`).value.trim(),link_url:r.querySelector(`.mag-link`).value.trim(),is_feature:r.querySelector(`.mag-isfeat`).checked,img_url:a.value.trim()}),Z(`매거진 저장 완료`),await Ta(e)}),r.querySelector(`.mag-del`).addEventListener(`click`,async()=>{confirm(`이 매거진 항목을 삭제합니까?`)&&(await oa.delete(t.id),Z(`삭제되었습니다.`),await Ta(e))}),n.appendChild(r)})}async function Ea(e,t){let n=[];try{n=await sa.getAll()}catch{n=[]}n.length||(n=[{id:`u-fallback-1`,user_code:`USER-CHAEJUN`,name:`채이준`,email:`chaejun@ryzin.com`,points:2500,coupons_count:3,membership_active:!0,default_address:`경기도 하남시 미사강변동로 파라곤스퀘어 100-1 2064-2`,created_at:`2026-07-22`}]),e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
      <div>
        <h2 style="font-size:16px; font-weight:800; color:#0f172a; margin:0 0 4px 0;">전체 회원 리스트 (${n.length}명)</h2>
        <p style="font-size:12px; color:#64748b; margin:0;">가입된 회원 데이터, 보유 포인트, 쿠폰 수, 멤버십 활성화 여부, 기본 배송지를 관리합니다.</p>
      </div>
      <button id="add-user-btn" class="sm-action-btn sm-btn-primary">+ 새 회원 등록 모달</button>
    </div>

    <div class="sm-card" style="padding:0; overflow:hidden;">
      <table class="sm-table">
        <thead>
          <tr>
            <th style="width:120px;">유저 코드</th>
            <th style="width:90px;">회원명</th>
            <th>이메일</th>
            <th style="width:100px;">보유 포인트</th>
            <th style="width:80px;">쿠폰 수</th>
            <th style="width:90px;">멤버십</th>
            <th>기본 배송지 주소</th>
            <th style="width:110px; text-align:center;">관리</th>
          </tr>
        </thead>
        <tbody id="user-table-body">
          ${n.map(e=>`
            <tr>
              <td><span class="sm-rank-badge" style="background:#1e293b;">${Q(e.user_code||`USER-0000`)}</span></td>
              <td style="font-weight:800; color:#0f172a;">${Q(e.name)}</td>
              <td style="font-weight:600; color:#64748b;">${Q(e.email)}</td>
              <td style="font-weight:800; color:#2563eb;">${(e.points||0).toLocaleString()}P</td>
              <td style="font-weight:700;">${e.coupons_count||0}장</td>
              <td>
                <span style="font-size:11px; font-weight:800; padding:3px 8px; border-radius:4px; ${e.membership_active?`background:#dbeafe; color:#1e40af;`:`background:#f1f5f9; color:#64748b;`}">
                  ${e.membership_active?`멤버십 회원`:`일반 회원`}
                </span>
              </td>
              <td style="font-size:12px; color:#475569; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${Q(e.default_address||`-`)}</td>
              <td style="text-align:center;">
                <button class="sm-action-btn sm-btn-primary user-edit-btn" data-id="${e.id}" style="padding:4px 8px; font-size:11px;">수정</button>
              </td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
  `,e.querySelector(`#add-user-btn`).addEventListener(`click`,()=>{Da(null,t,e)}),e.querySelectorAll(`.user-edit-btn`).forEach(r=>{r.addEventListener(`click`,()=>{Da(n.find(e=>e.id===r.dataset.id),t,e)})})}function Da(e,t,n){let r=!!e,i=t.querySelector(`#sm-modal-container`),a=e?e.user_code:`USER-${Math.floor(Math.random()*89999+1e4)}`;i.innerHTML=`
    <div class="sm-modal-backdrop">
      <div class="sm-modal-content" style="max-width:500px;">
        <div class="sm-modal-header">
          <h3 class="sm-modal-title">${r?`회원 정보 수정 모달`:`새 회원 등록 모달`}</h3>
          <button class="sm-modal-close" id="u-close-btn">&times;</button>
        </div>
        <form id="u-modal-form" style="display:flex; flex-direction:column; gap:12px;">
          <div>
            <label class="sm-label">유저 코드 (고유)</label>
            <input class="sm-input" id="um-code" value="${Q(a)}" readonly style="background:#f8fafc; font-weight:800; color:#2563eb;">
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            ${$(`회원 이름 (예: 채이준)`,`um-name`,e?e.name:``)}
            ${$(`이메일 주소`,`um-email`,e?e.email:``,`email`)}
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <label class="sm-label">보유 포인트 (P)</label>
              <input class="sm-input" id="um-points" type="number" value="${e?e.points||0:2500}" style="font-weight:800; color:#FF8730;">
            </div>
            <div>
              <label class="sm-label">보유 쿠폰 수 (장)</label>
              <input class="sm-input" id="um-coupons" type="number" value="${e?e.coupons_count||0:3}" style="font-weight:800;">
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px; margin:4px 0;">
            <input type="checkbox" id="um-mem" ${e&&e.membership_active?`checked`:r?``:`checked`} style="width:16px; height:16px; cursor:pointer;">
            <label for="um-mem" style="font-size:13px; font-weight:800; color:#0f172a; cursor:pointer;">라이진 멤버십 활성화 (월 8만원 절약 혜택)</label>
          </div>
          ${$(`기본 배송지 주소`,`um-addr`,e?e.default_address:`경기도 하남시 미사강변동로 파라곤스퀘어 100-1 2064-2`)}
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px; padding-top:14px; border-top:1px solid #e2e8f0;">
            <button type="button" class="sm-action-btn sm-btn-secondary" id="u-cancel-btn">취소</button>
            <button type="submit" class="sm-action-btn sm-btn-success">${r?`수정 내용 저장`:`회원 생성`}</button>
          </div>
        </form>
      </div>
    </div>
  `;let o=()=>{i.innerHTML=``};i.querySelector(`#u-close-btn`).addEventListener(`click`,o),i.querySelector(`#u-cancel-btn`).addEventListener(`click`,o),i.querySelector(`#u-modal-form`).addEventListener(`submit`,async a=>{a.preventDefault();let s={user_code:i.querySelector(`#um-code`).value.trim(),name:i.querySelector(`#um-name`).value.trim(),email:i.querySelector(`#um-email`).value.trim(),points:parseInt(i.querySelector(`#um-points`).value)||0,coupons_count:parseInt(i.querySelector(`#um-coupons`).value)||0,membership_active:i.querySelector(`#um-mem`).checked,default_address:i.querySelector(`#um-addr`).value.trim()};try{r&&e&&e.id&&!String(e.id).startsWith(`u-fallback`)?await sa.update(e.id,s):await sa.insert(s),Z(`회원 정보 저장이 완료되었습니다.`)}catch{Z(`회원 정보 저장 완료`)}o(),await Ea(n,t)})}var Oa=`https://vybrnhyaeugfwezbygdt.supabase.co`,ka=`sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9`;function Aa(){let e=document.createElement(`div`),t=`list`;function n(e){if(!e)return`-`;try{let t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)} ${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}`}catch{return e}}function r(){e.innerHTML=`
      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">원데이 클래스 관리</h1>
          <p class="page-description">클래스 수강 신청 현황을 확인하고 설문 문항 및 배너 이미지를 실시간으로 편집합니다.</p>
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
    `;let n=e.querySelector(`#tab-content-area`);t===`list`?i(n):a(n),o()}function i(e){let t=U.getAll(`classApplications`)||[];e.innerHTML=`
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
    `,e.querySelectorAll(`.application-row`).forEach(e=>{e.addEventListener(`click`,()=>{s(e.getAttribute(`data-id`))})}),e.querySelectorAll(`.btn-detail`).forEach(e=>{e.addEventListener(`click`,()=>{s(e.getAttribute(`data-id`))})}),e.querySelectorAll(`.btn-delete`).forEach(e=>{e.addEventListener(`click`,()=>{c(e.getAttribute(`data-id`))})})}function a(e){let t=[...U.getAll(`surveyQuestions`)||[]].sort((e,t)=>e.sort_order-t.sort_order);e.innerHTML=`
      <div style="display: flex; justify-content: flex-end; margin-bottom: var(--space-3);">
        <button class="btn btn-primary btn-sm" id="btn-add-question">설문 문항 추가</button>
      </div>

      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 80px; text-align: center;">순서</th>
                <th style="width: 140px;">입력 타입</th>
                <th>질문 문구 (Label)</th>
                <th>입력 힌트 (Placeholder)</th>
                <th>선택 옵션 (options)</th>
                <th style="width: 100px; text-align: center;">필수여부</th>
                <th style="width: 130px; text-align: center;">관리</th>
              </tr>
            </thead>
            <tbody>
              ${t.length===0?`
                <tr>
                  <td colspan="7" style="text-align: center; color: var(--text-tertiary); padding: var(--space-8) 0;">
                    등록된 설문 문항이 없습니다.
                  </td>
                </tr>
              `:t.map(e=>{let t=`한줄 입력`;return e.type===`textarea`?t=`여러줄 입력`:e.type===`select`?t=`선택박스`:e.type===`tel`?t=`연락처`:e.type===`file`&&(t=`사진 첨부`),`
                  <tr>
                    <td style="text-align: center; font-weight: 700;">${e.sort_order}</td>
                    <td><span class="badge badge-indigo">${t}</span></td>
                    <td style="font-weight: 600;">${e.label||``}</td>
                    <td style="color: var(--text-muted);">${e.placeholder||`-`}</td>
                    <td style="max-width: 200px;" class="text-ellipsis">${e.options||`-`}</td>
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
    `,e.querySelector(`#btn-add-question`).addEventListener(`click`,()=>{l()}),e.querySelectorAll(`.btn-edit-question`).forEach(e=>{e.addEventListener(`click`,()=>{l(e.getAttribute(`data-id`))})}),e.querySelectorAll(`.btn-delete-question`).forEach(e=>{e.addEventListener(`click`,()=>{u(e.getAttribute(`data-id`))})})}function o(){e.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{t=e.getAttribute(`data-tab`),r()})}),e.querySelector(`#btn-refresh-class`).addEventListener(`click`,async()=>{let t=e.querySelector(`#btn-refresh-class`);t.disabled=!0,t.textContent=`로딩...`;try{await U.init(),J(`성공적으로 갱신되었습니다.`)}catch{Y(`데이터 갱신 실패`)}finally{t.disabled=!1,t.textContent=`새로고침`,r()}});let n=e.querySelector(`#banner-file-input`),i=e.querySelector(`#btn-change-banner`);i.addEventListener(`click`,()=>{n.click()}),n.addEventListener(`change`,async e=>{let t=e.target.files[0];if(t){i.disabled=!0,i.textContent=`업로드 중...`;try{let e=window.supabaseClient||window.supabase.createClient(Oa,ka);try{let{data:t}=await e.storage.listBuckets();t&&t.some(e=>e.id===`class_applications`)||await e.storage.createBucket(`class_applications`,{public:!0})}catch(e){console.warn(`자동 버킷 생성 시도 실패:`,e)}let{data:n,error:r}=await e.storage.from(`class_applications`).upload(`class_detail_banner.png`,t,{upsert:!0});if(r)throw r.message&&r.message.includes(`Bucket not found`)?Error(`Supabase Storage에 class_applications Public 버킷을 생성해 주세요.`):r;J(`상세페이지 배너 이미지가 변경되었습니다.`)}catch(e){console.error(e),Y(`배너 이미지 변경 실패: `+e.message)}finally{i.disabled=!1,i.textContent=`상세 이미지 변경`,n.value=``}}})}function s(e){let t=U.getById(`classApplications`,e);if(!t)return;let r=document.createElement(`div`);r.style.display=`flex`,r.style.flexDirection=`column`,r.style.gap=`var(--space-3)`,r.style.fontSize=`var(--text-sm)`;let i=``,a=t.answers||{};for(let[e,t]of Object.entries(a))i+=`
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
    `;let o=document.createElement(`div`);o.style.display=`flex`,o.style.justifyContent=`flex-end`,o.style.width=`100%`;let s=document.createElement(`button`);s.className=`btn btn-secondary`,s.textContent=`닫기`,s.addEventListener(`click`,q),o.appendChild(s),K({title:`수강 신청 상세 응답`,size:`md`,content:r,footer:o,onClose:null})}function c(e){let t=U.getById(`classApplications`,e);t&&st({title:`신청 정보 삭제`,message:`${t.name} 님의 수강신청 내역을 삭제하시겠습니까?`,danger:!0,confirmText:`삭제`,cancelText:`취소`,onConfirm:async()=>{try{U.delete(`classApplications`,e),J(`삭제되었습니다.`),r()}catch{Y(`삭제 오류 발생`)}}})}function l(e=null){let t=!!e,n=t?U.getById(`surveyQuestions`,e):null,i=document.createElement(`div`);i.innerHTML=`
      <div class="form-group">
        <label class="form-label">질문 유형</label>
        <select class="form-select" id="q-type" required>
          <option value="text" ${n&&n.type===`text`?`selected`:``}>한줄 입력 (text)</option>
          <option value="textarea" ${n&&n.type===`textarea`?`selected`:``}>여러줄 입력 (textarea)</option>
          <option value="select" ${n&&n.type===`select`?`selected`:``}>선택박스 (select)</option>
          <option value="tel" ${n&&n.type===`tel`?`selected`:``}>연락처 입력 (tel)</option>
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
      <div class="form-group" id="options-group" style="display: ${n&&n.type===`select`?`block`:`none`};">
        <label class="form-label">선택 옵션 목록 (콤마로 구분)</label>
        <input type="text" class="form-input" id="q-options" placeholder="예: 1기,2기,3기" value="${n?n.options:``}">
        <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">옵션들을 쉼표(,)로 구분하여 입력하세요.</p>
      </div>
      <div class="form-group" style="display: flex; align-items: center; gap: 8px; margin-top: var(--space-4);">
        <input type="checkbox" id="q-required" ${!n||n.required?`checked`:``} style="width: 16px; height: 16px; cursor: pointer;">
        <label for="q-required" style="font-size: 13px; font-weight: 700; cursor: pointer;">필수 입력 문항으로 설정</label>
      </div>
      <div class="form-group" style="margin-top: var(--space-3);">
        <label class="form-label">출력 정렬 순서 (낮을수록 먼저 노출)</label>
        <input type="number" class="form-input" id="q-sort" value="${n?n.sort_order:`1`}" min="1" required>
      </div>
    `,i.querySelector(`#q-type`).addEventListener(`change`,e=>{let t=i.querySelector(`#options-group`);e.target.value===`select`?t.style.display=`block`:t.style.display=`none`});let a=document.createElement(`div`);a.style.display=`flex`,a.style.justifyContent=`flex-end`,a.style.gap=`var(--space-3)`,a.style.width=`100%`;let o=document.createElement(`button`);o.className=`btn btn-secondary`,o.textContent=`취소`,o.addEventListener(`click`,q);let s=document.createElement(`button`);s.className=`btn btn-primary`,s.textContent=`저장`,s.addEventListener(`click`,async()=>{let n=i.querySelector(`#q-type`).value,a=i.querySelector(`#q-label`).value.trim(),o=i.querySelector(`#q-placeholder`).value.trim(),s=i.querySelector(`#q-options`).value.trim(),c=i.querySelector(`#q-required`).checked,l=parseInt(i.querySelector(`#q-sort`).value,10)||1;if(!a){Y(`질문 문구를 입력해 주세요.`);return}if(n===`select`&&!s){Y(`선택박스 옵션을 1개 이상 콤마로 구분해 입력해 주세요.`);return}try{t?(U.update(`surveyQuestions`,e,{type:n,label:a,placeholder:o,options:s,required:c,sort_order:l}),J(`문항이 수정되었습니다.`)):(U.create(`surveyQuestions`,{id:Date.now(),type:n,label:a,placeholder:o,options:s,required:c,sort_order:l}),J(`새 문항이 추가되었습니다.`)),q(),r()}catch(e){console.error(e),Y(`저장 실패: `+e.message)}}),a.appendChild(o),a.appendChild(s),K({title:t?`설문 문항 수정`:`새 설문 문항 추가`,size:`sm`,content:i,footer:a,onClose:null})}function u(e){let t=U.getById(`surveyQuestions`,e);t&&st({title:`문항 삭제`,message:`"${t.label}" 문항을 정말 삭제하시겠습니까? 신청 폼에서 즉시 제외됩니다.`,danger:!0,confirmText:`삭제`,cancelText:`취소`,onConfirm:async()=>{try{U.delete(`surveyQuestions`,e),J(`문항이 삭제되었습니다.`),r()}catch{Y(`삭제 오류`)}}})}return r(),e}x(),j();async function ja(){let e=document.getElementById(`app`);if(e.innerHTML=`
    <div style="display:flex; align-items:center; justify-content:center; height:100vh;">
      <div style="width:48px; height:48px; border:4px solid rgba(0,0,0,0.05); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
      <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    </div>
  `,!await U.init()){e.innerHTML=`
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; gap:16px;">
        <div style="color:var(--danger); font-weight:600; font-size:var(--text-lg);">구글 시트 연동에 실패했습니다.</div>
        <div style="color:var(--text-secondary);">SheetDB API 주소나 네트워크 상태를 확인해주세요.</div>
      </div>
    `;return}let t=()=>{if(e.querySelector(`.sidebar`))return;e.innerHTML=``,e.className=`app-layout`,e.appendChild(Qe());let t=document.createElement(`div`);t.className=`mobile-overlay`,t.onclick=()=>document.querySelector(`.sidebar`).classList.remove(`open`),e.appendChild(t);let n=document.createElement(`button`);n.className=`mobile-menu-btn`,n.innerHTML=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,n.onclick=()=>document.querySelector(`.sidebar`).classList.toggle(`open`),e.appendChild(n);let r=document.createElement(`main`);r.className=`main-content`,r.id=`page-content`,e.appendChild(r),M.setContainer(r)};M.beforeEach(n=>{let r=!!U.getCurrentUser();if(!r&&n!==`/login`)return`/login`;if(r&&n===`/login`)return`/`;if(r&&n===`/live_stream`){let e=U.getCurrentUser();if(U.isDemoMode||e&&(e.id===`demo`||e.role===`demo`))return`/`}return n===`/login`?(e.innerHTML=``,e.className=``,M.setContainer(e)):t(),!0}),M.register(`/login`,()=>Ji()),M.register(`/`,()=>pt()),M.register(`/live_stream`,()=>Nt()),M.register(`/projects`,()=>Gt()),M.register(`/projects/new`,()=>Gt()),M.register(`/projects/:id`,e=>qt(e)),M.register(`/hosts`,()=>It()),M.register(`/hosts/:id`,e=>Rt(e)),M.register(`/brands`,()=>Vt()),M.register(`/brands/:id`,e=>Ut(e)),M.register(`/finance`,()=>rn()),M.register(`/settlement`,()=>an()),M.register(`/contracts`,()=>cn()),M.register(`/marketing`,()=>fn()),M.register(`/crm`,()=>pn()),M.register(`/shop_manage`,()=>_a()),M.register(`/class_applications`,()=>Aa()),M.register(`/settings`,()=>mn()),M.start(),document.addEventListener(`click`,e=>{let t=e.target.closest(`a[href]`);t&&t.getAttribute(`href`).startsWith(`/`)&&!t.getAttribute(`target`)&&(e.preventDefault(),M.navigate(t.getAttribute(`href`)))})}ja();