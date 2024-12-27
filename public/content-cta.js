var NostrContent = (function (exports) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$2=globalThis,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$1=Symbol(),o$2=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$2.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$2.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$1),i$2=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$3(o,t,s$1)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const{is:i$1,defineProperty:e$3,getOwnPropertyDescriptor:r$3,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$1,getPrototypeOf:n$2}=Object,a=globalThis,c$1=a.trustedTypes,l=c$1?c$1.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$1(t,s),y={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$3(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$3(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...h$1(t),...o$1(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d("elementProperties")]=new Map,b[d("finalized")]=new Map,p?.({ReactiveElement:b}),(a.reactiveElementVersions??=[]).push("2.0.4");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const n$1=globalThis,c=n$1.trustedTypes,h=c?c.createPolicy("lit-html",{createHTML:t=>t}):void 0,f="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,m="?"+v,_=`<${m}>`,w=document,lt=()=>w.createComment(""),st=t=>null===t||"object"!=typeof t&&"function"!=typeof t,g=Array.isArray,$=t=>g(t)||"function"==typeof t?.[Symbol.iterator],x="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,E=/-->/g,k=/>/g,O=RegExp(`>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),S=/'/g,j=/"/g,M=/^(?:script|style|textarea|title)$/i,P=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),ke=P(1),R=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),V=new WeakMap,I=w.createTreeWalker(w,129);function N(t,i){if(!g(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==h?h.createHTML(i):i}const U=(t,i)=>{const s=t.length-1,e=[];let h,o=2===i?"<svg>":3===i?"<math>":"",n=T;for(let i=0;i<s;i++){const s=t[i];let r,l,c=-1,a=0;for(;a<s.length&&(n.lastIndex=a,l=n.exec(s),null!==l);)a=n.lastIndex,n===T?"!--"===l[1]?n=E:void 0!==l[1]?n=k:void 0!==l[2]?(M.test(l[2])&&(h=RegExp("</"+l[2],"g")),n=O):void 0!==l[3]&&(n=O):n===O?">"===l[0]?(n=h??T,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?O:'"'===l[3]?j:S):n===j||n===S?n=O:n===E||n===k?n=T:(n=O,h=void 0);const u=n===O&&t[i+1].startsWith("/>")?" ":"";o+=n===T?s+_:c>=0?(e.push(r),s.slice(0,c)+f+s.slice(c)+v+u):s+v+(-2===c?i:u);}return [N(t,o+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class B{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let h=0,o=0;const n=t.length-1,r=this.parts,[l,a]=U(t,i);if(this.el=B.createElement(l,s),I.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(e=I.nextNode())&&r.length<n;){if(1===e.nodeType){if(e.hasAttributes())for(const t of e.getAttributeNames())if(t.endsWith(f)){const i=a[o++],s=e.getAttribute(t).split(v),n=/([.?@])?(.*)/.exec(i);r.push({type:1,index:h,name:n[2],strings:s,ctor:"."===n[1]?Y:"?"===n[1]?Z:"@"===n[1]?q:G}),e.removeAttribute(t);}else t.startsWith(v)&&(r.push({type:6,index:h}),e.removeAttribute(t));if(M.test(e.tagName)){const t=e.textContent.split(v),i=t.length-1;if(i>0){e.textContent=c?c.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],lt()),I.nextNode(),r.push({type:2,index:++h});e.append(t[i],lt());}}}else if(8===e.nodeType)if(e.data===m)r.push({type:2,index:h});else {let t=-1;for(;-1!==(t=e.data.indexOf(v,t+1));)r.push({type:7,index:h}),t+=v.length-1;}h++;}}static createElement(t,i){const s=w.createElement("template");return s.innerHTML=t,s}}function z(t,i,s=t,e){if(i===R)return i;let h=void 0!==e?s.o?.[e]:s.l;const o=st(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s.o??=[])[e]=h:s.l=h),void 0!==h&&(i=z(t,h._$AS(t,i.values),h,e)),i}class F{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??w).importNode(i,!0);I.currentNode=e;let h=I.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new et(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new K(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=I.nextNode(),o++);}return I.currentNode=w,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class et{get _$AU(){return this._$AM?._$AU??this.v}constructor(t,i,s,e){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this.v=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=z(this,t,i),st(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==R&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):$(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==D&&st(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=B.createElement(N(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new F(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=V.get(t.strings);return void 0===i&&V.set(t.strings,i=new B(t)),i}k(t){g(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new et(this.O(lt()),this.O(lt()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this.v=t,this._$AP?.(t));}}class G{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=D;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=z(this,t,i,0),o=!st(t)||t!==this._$AH&&t!==R,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=z(this,e[s+n],i,n),r===R&&(r=this._$AH[n]),o||=!st(r)||r!==this._$AH[n],r===D?t=D:t!==D&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class Y extends G{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===D?void 0:t;}}class Z extends G{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==D);}}class q extends G{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=z(this,t,i,0)??D)===R)return;const s=this._$AH,e=t===D&&s!==D||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==D&&(s===D||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class K{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t);}}const Re=n$1.litHtmlPolyfillSupport;Re?.(B,et),(n$1.litHtmlVersions??=[]).push("3.2.0");const Q=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new et(i.insertBefore(lt(),t),t,void 0,s??{});}return h._$AI(t),h};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class s extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Q(i,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return R}}s._$litElement$=!0,s[("finalized")]=!0,globalThis.litElementHydrateSupport?.({LitElement:s});const r$2=globalThis.litElementPolyfillSupport;r$2?.({LitElement:s});(globalThis.litElementVersions??=[]).push("4.0.6");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$1=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const o={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.P(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function r(r){return n({...r,state:!0,attribute:!1})}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const e$2=(e,t,c)=>(c.configurable=!0,c.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,c),c);

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function e$1(e,r){return (n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;return e$2(n,s,{get(){return o(this)}})}}

    const TWStyles = i$2 ` /*! tailwindcss v3.4.6 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:initial}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:initial;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:initial}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}:host{font-family:OpenSans,sans-serif;font-size:16px}*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.left-0{left:0}.left-1{left:.25rem}.left-1\\/2{left:50%}.right-\\[12px\\]{right:12px}.top-1{top:.25rem}.top-1\\/2{top:50%}.top-\\[8px\\]{top:8px}.\\!z-\\[9999999\\]{z-index:9999999!important}.m-0{margin:0}.m-1{margin:.25rem}.m-auto{margin:auto}.mx-auto{margin-left:auto;margin-right:auto}.my-\\[2px\\]{margin-top:2px;margin-bottom:2px}.mb-\\[16px\\]{margin-bottom:16px}.ml-\\[4px\\]{margin-left:4px}.mr-\\[8px\\]{margin-right:8px}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.hidden{display:none}.h-\\[20px\\]{height:20px}.h-\\[24px\\]{height:24px}.h-\\[28px\\]{height:28px}.h-\\[32px\\]{height:32px}.h-\\[48px\\]{height:48px}.h-\\[80px\\]{height:80px}.max-h-\\[600px\\]{max-height:600px}.min-h-\\[10rem\\]{min-height:10rem}.w-1{width:.25rem}.w-1\\/2{width:50%}.w-\\[20px\\]{width:20px}.w-\\[24px\\]{width:24px}.w-\\[28px\\]{width:28px}.w-\\[32px\\]{width:32px}.w-\\[48px\\]{width:48px}.w-\\[80\\%\\]{width:80%}.w-\\[80px\\]{width:80px}.w-\\[calc\\(100\\%-32px\\)\\]{width:calc(100% - 32px)}.w-full{width:100%}.min-w-\\[60px\\]{min-width:60px}.max-w-\\[200px\\]{max-width:200px}.max-w-\\[512px\\]{max-width:512px}.max-w-\\[75\\%\\]{max-width:75%}.flex-grow{flex-grow:1}.-translate-x-1{--tw-translate-x:-0.25rem}.-translate-x-1,.-translate-x-1\\/2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-x-1\\/2{--tw-translate-x:-50%}.-translate-y-1{--tw-translate-y:-0.25rem}.-translate-y-1,.-translate-y-1\\/2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y:-50%}.scale-\\[4\\]{--tw-scale-x:4;--tw-scale-y:4}.scale-\\[4\\],.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes slideInBlurredTop{0%{transform:translate(-50%,-200%);transform-origin:50% 0;filter:blur(40px);opacity:0}to{transform:translate(-50%,-50%);transform-origin:50% 50%;filter:blur(0);opacity:1}}.animate-slide-in-blurred-top{animation:slideInBlurredTop .2s cubic-bezier(.785,.135,.15,.86) both}@keyframes slideInBottom{0%{transform:translateY(1000px);opacity:0}to{transform:translateY(0);opacity:1}}.animate-slide-in-bottom{animation:slideInBottom .3s cubic-bezier(.25,.46,.45,.94) both}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.resize{resize:both}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.gap-3{gap:.75rem}.gap-\\[12px\\]{gap:12px}.gap-\\[16px\\]{gap:16px}.gap-\\[4px\\]{gap:4px}.gap-\\[8px\\]{gap:8px}.overflow-auto{overflow:auto}.overflow-hidden,.truncate{overflow:hidden}.truncate{white-space:nowrap}.text-ellipsis,.truncate{text-overflow:ellipsis}.text-nowrap{text-wrap:nowrap}.rounded-\\[10px\\]{border-radius:10px}.rounded-\\[2px\\]{border-radius:2px}.rounded-\\[5px\\]{border-radius:5px}.rounded-\\[6px\\]{border-radius:6px}.rounded-\\[8px\\]{border-radius:8px}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.border{border-width:1px}.border-2{border-width:2px}.border-\\[1\\.5px\\]{border-width:1.5px}.border-\\[1px\\]{border-width:1px}.border-gray-100{--tw-border-opacity:1;border-color:rgb(243 244 246/var(--tw-border-opacity))}.border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219/var(--tw-border-opacity))}.border-neutral-300{--tw-border-opacity:1;border-color:rgb(212 212 212/var(--tw-border-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgb(249 250 251/var(--tw-bg-opacity))}.bg-neutral-200{--tw-bg-opacity:1;background-color:rgb(229 229 229/var(--tw-bg-opacity))}.bg-sky-600{--tw-bg-opacity:1;background-color:rgb(2 132 199/var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-opacity-50{--tw-bg-opacity:0.5}.bg-opacity-80{--tw-bg-opacity:0.8}.bg-opacity-90{--tw-bg-opacity:0.9}.bg-opacity-95{--tw-bg-opacity:0.95}.fill-blue-600{fill:#2563eb}.object-cover{-o-object-fit:cover;object-fit:cover}.p-2{padding:.5rem}.p-\\[12px\\]{padding:12px}.p-\\[24px\\]{padding:24px}.p-\\[6px\\]{padding:6px}.p-\\[8px\\]{padding:8px}.px-\\[12px\\]{padding-left:12px;padding-right:12px}.px-\\[8px\\]{padding-left:8px;padding-right:8px}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-\\[12px\\]{padding-top:12px;padding-bottom:12px}.py-\\[4px\\]{padding-top:4px;padding-bottom:4px}.pe-\\[8px\\]{padding-inline-end:8px}.ps-\\[8px\\]{padding-inline-start:8px}.text-left{text-align:left}.text-center{text-align:center}.align-middle{vertical-align:middle}.text-\\[14px\\]{font-size:14px}.text-\\[15px\\]{font-size:15px}.text-\\[16px\\]{font-size:16px}.text-\\[20px\\]{font-size:20px}.text-\\[32px\\]{font-size:32px}.text-base{font-size:16px;line-height:24px}.text-lg{font-size:18px;line-height:28px}.text-sm{font-size:14px;line-height:20px}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.leading-tight{line-height:1.25}.tracking-wide{letter-spacing:.025em}.text-\\[\\#ECC94B\\]{--tw-text-opacity:1;color:rgb(236 201 75/var(--tw-text-opacity))}.text-black{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity))}.text-gray-200{--tw-text-opacity:1;color:rgb(229 231 235/var(--tw-text-opacity))}.text-neutral-600{--tw-text-opacity:1;color:rgb(82 82 82/var(--tw-text-opacity))}.text-neutral-900{--tw-text-opacity:1;color:rgb(23 23 23/var(--tw-text-opacity))}.text-sky-600{--tw-text-opacity:1;color:rgb(2 132 199/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.shadow-lg{--tw-shadow:0 10px 15px -3px #0000001a,0 4px 6px -4px #0000001a;--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.shadow-lg,.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px #0000001a,0 2px 4px -2px #0000001a;--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid #0000;outline-offset:2px}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}emoji-picker{--num-columns:8;--emoji-size:26px;--emoji-padding:8px;--border-radius:4px;--input-border-radius:6px;--input-padding:8px 16px;--input-font-size:16px;--input-placeholder-color:#6b7280;--input-border-color:#e5e7eb;--outline-size:1px;--button-hover-background:#e5e7eb}@media screen and (max-width:480px){emoji-picker{--num-columns:6}}.placeholder\\:font-light::-moz-placeholder{font-weight:300}.placeholder\\:font-light::placeholder{font-weight:300}.backdrop\\:bg-black::backdrop{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.backdrop\\:bg-opacity-50::backdrop{--tw-bg-opacity:0.5}.backdrop\\:backdrop-blur-sm::backdrop{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.hover\\:bg-neutral-100:hover{--tw-bg-opacity:1;background-color:rgb(245 245 245/var(--tw-bg-opacity))}.hover\\:bg-sky-700:hover{--tw-bg-opacity:1;background-color:rgb(3 105 161/var(--tw-bg-opacity))}.hover\\:bg-slate-50:hover{--tw-bg-opacity:1;background-color:rgb(248 250 252/var(--tw-bg-opacity))}.hover\\:bg-opacity-100:hover{--tw-bg-opacity:1}.hover\\:text-sky-700:hover{--tw-text-opacity:1;color:rgb(3 105 161/var(--tw-text-opacity))}.hover\\:opacity-95:hover{opacity:.95}.focus\\:border-sky-600:focus{--tw-border-opacity:1;border-color:rgb(2 132 199/var(--tw-border-opacity))}.active\\:bg-gray-200:active{--tw-bg-opacity:1;background-color:rgb(229 231 235/var(--tw-bg-opacity))}.active\\:bg-sky-800:active{--tw-bg-opacity:1;background-color:rgb(7 89 133/var(--tw-bg-opacity))}.active\\:bg-slate-100:active{--tw-bg-opacity:1;background-color:rgb(241 245 249/var(--tw-bg-opacity))}.active\\:opacity-85:active{opacity:.85}@media not all and (min-width:768px){.max-md\\:w-full{width:100%}.max-md\\:px-\\[8px\\]{padding-left:8px;padding-right:8px}} `;

    const Icons = {
        LoadingSpinner: ke `<svg
    aria-hidden="true"
    class="w-[32px] h-[32px] text-gray-200 animate-spin fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>`,
        Close: ke `
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.18849 19.0508C6.81935 19.4199 6.80177 20.0791 7.19728 20.4658C7.58399 20.8525 8.24317 20.8438 8.61231 20.4746L13.9912 15.0869L19.3789 20.4746C19.7568 20.8525 20.4072 20.8525 20.794 20.4658C21.1719 20.0703 21.1807 19.4287 20.794 19.0508L15.415 13.6631L20.794 8.28419C21.1807 7.90626 21.1807 7.25587 20.794 6.86915C20.3984 6.49122 19.7568 6.48243 19.3789 6.86036L13.9912 12.2481L8.61231 6.86036C8.24317 6.49122 7.5752 6.47364 7.19728 6.86915C6.81056 7.25587 6.81935 7.91505 7.18849 8.28419L12.5762 13.6631L7.18849 19.0508Z"
        fill="currentColor"
      />
    </svg>
  `,
        Dots: ke `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_403_2930)">
        <path
          d="M2 14.0003C3.10457 14.0003 4 13.1049 4 12.0003C4 10.8957 3.10457 10.0003 2 10.0003C0.89543 10.0003 0 10.8957 0 12.0003C0 13.1049 0.89543 14.0003 2 14.0003Z"
          fill="currentColor"
        />
        <path
          d="M12.0001 14.0003C13.1046 14.0003 14.0001 13.1049 14.0001 12.0003C14.0001 10.8957 13.1046 10.0003 12.0001 10.0003C10.8955 10.0003 10.0001 10.8957 10.0001 12.0003C10.0001 13.1049 10.8955 14.0003 12.0001 14.0003Z"
          fill="currentColor"
        />
        <path
          d="M22 14.0003C23.1045 14.0003 24 13.1049 24 12.0003C24 10.8957 23.1045 10.0003 22 10.0003C20.8954 10.0003 19.9999 10.8957 19.9999 12.0003C19.9999 13.1049 20.8954 14.0003 22 14.0003Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_403_2930">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  `,
        Like: ke `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `,
        Follow: ke `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 8.5V13.5M17.5 11H22.5M8 15H16C18.2091 15 20 16.7909 20 19V21H4V19C4 16.7909 5.79086 15 8 15ZM16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
        LinkOut: ke `
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 3H29V10M27.5 4.5L20 12M17 5H8C6.34315 5 5 6.34315 5 8V24C5 25.6569 6.34315 27 8 27H24C25.6569 27 27 25.6569 27 24V15"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
        Light: ke `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.1036 2.39888C18.1672 2.35234 18.2503 2.42265 18.215 2.49303L14.2531 10.3841C14.146 10.5974 14.2629 10.8552 14.494 10.9153L17.3855 11.6666C17.9974 11.8256 18.1501 12.6238 17.6401 12.9975L5.89657 21.6012C5.83304 21.6477 5.74988 21.5774 5.78522 21.507L9.74706 13.616C9.85418 13.4026 9.7373 13.1448 9.50623 13.0848L6.61471 12.3335C6.00281 12.1745 5.85008 11.3762 6.36008 11.0026L18.1036 2.39888Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  `,
        Repost: ke `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.2806 9.97021L14.7806 2.47021C14.6757 2.36526 14.5421 2.29375 14.3967 2.26473C14.2512 2.23572 14.1004 2.25049 13.9633 2.30719C13.8262 2.36389 13.709 2.45996 13.6265 2.58326C13.5441 2.70657 13.5 2.85156 13.4999 2.9999V6.78271C11.0681 6.99083 8.38213 8.18146 6.17244 10.0555C3.51182 12.313 1.85526 15.2221 1.50744 18.2465C1.48026 18.4816 1.52794 18.7193 1.64368 18.9258C1.75943 19.1322 1.93735 19.2969 2.15212 19.3964C2.36689 19.4959 2.60757 19.5251 2.83991 19.4799C3.07225 19.4347 3.28441 19.3174 3.44619 19.1446C4.47744 18.0468 8.14682 14.5752 13.4999 14.2696V17.9999C13.5 18.1482 13.5441 18.2932 13.6265 18.4165C13.709 18.5398 13.8262 18.6359 13.9633 18.6926C14.1004 18.7493 14.2512 18.7641 14.3967 18.7351C14.5421 18.706 14.6757 18.6345 14.7806 18.5296L22.2806 11.0296C22.4208 10.889 22.4996 10.6985 22.4996 10.4999C22.4996 10.3013 22.4208 10.1108 22.2806 9.97021ZM14.9999 16.1896V13.4999C14.9999 13.301 14.9209 13.1102 14.7803 12.9696C14.6396 12.8289 14.4489 12.7499 14.2499 12.7499C11.6174 12.7499 9.05338 13.4371 6.62901 14.7936C5.39427 15.4876 4.24383 16.3219 3.20057 17.2799C3.74432 15.0449 5.11494 12.9196 7.14276 11.1993C9.31963 9.35333 11.9765 8.2499 14.2499 8.2499C14.4489 8.2499 14.6396 8.17088 14.7803 8.03023C14.9209 7.88957 14.9999 7.69881 14.9999 7.4999V4.81115L20.6896 10.4999L14.9999 16.1896Z"
      fill="currentColor"
    />
  </svg> `,
        Zap: ke `<svg viewBox="0 0 24 24" width="16" height="16" class="text-[#ECC94B]">
    <path
      d="M13 2L4.09344 12.6879C3.74463 13.1064 3.57023 13.3157 3.56756 13.4925C3.56524 13.6461 3.63372 13.7923 3.75324 13.8889C3.89073 14 4.16316 14 4.70802 14H12L11 22L19.9065 11.3121C20.2553 10.8936 20.4297 10.6843 20.4324 10.5075C20.4347 10.3539 20.3663 10.2077 20.2467 10.1111C20.1092 10 19.8368 10 19.292 10H12L13 2Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    ></path>
  </svg>`,
        Bookmark: ke `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"
      fill="currentColor"
    ></path>
  </svg>`,
        Profile: ke `<svg width="24" height="24" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.1346 10.2376C17.1346 11.3339 16.6992 12.3852 15.924 13.1603C15.1489 13.9355 14.0975 14.371 13.0013 14.371C11.9051 14.371 10.8537 13.9355 10.0786 13.1603C9.30344 12.3852 8.86797 11.3339 8.86797 10.2376C8.86797 9.1414 9.30344 8.09007 10.0786 7.31492C10.8537 6.53977 11.9051 6.1043 13.0013 6.1043C14.0975 6.1043 15.1489 6.53977 15.924 7.31492C16.6992 8.09007 17.1346 9.1414 17.1346 10.2376ZM14.6748 11.9111C15.1186 11.4673 15.368 10.8653 15.368 10.2376C15.368 9.60995 15.1186 9.00798 14.6748 8.56414C14.231 8.12031 13.629 7.87096 13.0013 7.87096C12.3736 7.87096 11.7717 8.12031 11.3278 8.56414C10.884 9.00798 10.6346 9.60995 10.6346 10.2376C10.6346 10.8653 10.884 11.4673 11.3278 11.9111C11.7717 12.355 12.3736 12.6043 13.0013 12.6043C13.629 12.6043 14.231 12.355 14.6748 11.9111Z"
      fill="#616161"
      stroke="white"
      stroke-width="0.4"
    />
    <path
      d="M13.0712 17.6203C11.8189 17.6194 10.585 17.921 9.47431 18.4995C8.36364 19.078 7.40915 19.9162 6.69203 20.9428L6.58562 21.0951L6.72972 21.2124C8.50119 22.6545 10.7164 23.4403 13.0007 23.437C15.3253 23.4402 17.577 22.6261 19.3623 21.1372L19.5049 21.0182L19.3967 20.8672C18.6766 19.8618 17.727 19.0428 16.6268 18.4781C15.5267 17.9134 14.3078 17.6194 13.0712 17.6203ZM13.0712 17.6203L13.0711 17.8203L13.0709 17.6203C13.071 17.6203 13.0711 17.6203 13.0712 17.6203ZM3.05065 13.487V13.487C3.05065 15.7974 3.83902 17.9248 5.16011 19.614L5.31976 19.8182L5.47677 19.612C6.36726 18.4426 7.51605 17.4949 8.83341 16.8429C10.1508 16.1909 11.601 15.8524 13.0709 15.8536H13.0713C14.5221 15.8523 15.9541 16.1821 17.2582 16.8179C18.5622 17.4538 19.704 18.3789 20.5964 19.5228L20.7559 19.7273L20.9131 19.5211C21.871 18.2647 22.516 16.7983 22.7947 15.2432C23.0733 13.6881 22.9777 12.089 22.5156 10.5782C22.0536 9.06742 21.2384 7.68837 20.1376 6.55516C19.0367 5.42196 17.6819 4.56718 16.1851 4.06155C14.6883 3.55592 13.0926 3.41398 11.5301 3.64748C9.96758 3.88097 8.48312 4.48319 7.19955 5.4043C5.91597 6.3254 4.87019 7.53892 4.14872 8.94444C3.42726 10.35 3.05085 11.9071 3.05065 13.487ZM1.28398 13.487C1.28398 7.01619 6.52986 1.77031 13.0007 1.77031C19.4714 1.77031 24.7173 7.01619 24.7173 13.487C24.7173 19.9578 19.4714 25.2036 13.0007 25.2036C6.52986 25.2036 1.28398 19.9578 1.28398 13.487Z"
      fill="#616161"
      stroke="white"
      stroke-width="0.4"
    />
  </svg> `,
        ProfileBig: ke `<svg width="48" height="48" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.1346 10.2376C17.1346 11.3339 16.6992 12.3852 15.924 13.1603C15.1489 13.9355 14.0975 14.371 13.0013 14.371C11.9051 14.371 10.8537 13.9355 10.0786 13.1603C9.30344 12.3852 8.86797 11.3339 8.86797 10.2376C8.86797 9.1414 9.30344 8.09007 10.0786 7.31492C10.8537 6.53977 11.9051 6.1043 13.0013 6.1043C14.0975 6.1043 15.1489 6.53977 15.924 7.31492C16.6992 8.09007 17.1346 9.1414 17.1346 10.2376ZM14.6748 11.9111C15.1186 11.4673 15.368 10.8653 15.368 10.2376C15.368 9.60995 15.1186 9.00798 14.6748 8.56414C14.231 8.12031 13.629 7.87096 13.0013 7.87096C12.3736 7.87096 11.7717 8.12031 11.3278 8.56414C10.884 9.00798 10.6346 9.60995 10.6346 10.2376C10.6346 10.8653 10.884 11.4673 11.3278 11.9111C11.7717 12.355 12.3736 12.6043 13.0013 12.6043C13.629 12.6043 14.231 12.355 14.6748 11.9111Z"
      fill="#616161"
      stroke="white"
      stroke-width="0.4"
    />
    <path
      d="M13.0712 17.6203C11.8189 17.6194 10.585 17.921 9.47431 18.4995C8.36364 19.078 7.40915 19.9162 6.69203 20.9428L6.58562 21.0951L6.72972 21.2124C8.50119 22.6545 10.7164 23.4403 13.0007 23.437C15.3253 23.4402 17.577 22.6261 19.3623 21.1372L19.5049 21.0182L19.3967 20.8672C18.6766 19.8618 17.727 19.0428 16.6268 18.4781C15.5267 17.9134 14.3078 17.6194 13.0712 17.6203ZM13.0712 17.6203L13.0711 17.8203L13.0709 17.6203C13.071 17.6203 13.0711 17.6203 13.0712 17.6203ZM3.05065 13.487V13.487C3.05065 15.7974 3.83902 17.9248 5.16011 19.614L5.31976 19.8182L5.47677 19.612C6.36726 18.4426 7.51605 17.4949 8.83341 16.8429C10.1508 16.1909 11.601 15.8524 13.0709 15.8536H13.0713C14.5221 15.8523 15.9541 16.1821 17.2582 16.8179C18.5622 17.4538 19.704 18.3789 20.5964 19.5228L20.7559 19.7273L20.9131 19.5211C21.871 18.2647 22.516 16.7983 22.7947 15.2432C23.0733 13.6881 22.9777 12.089 22.5156 10.5782C22.0536 9.06742 21.2384 7.68837 20.1376 6.55516C19.0367 5.42196 17.6819 4.56718 16.1851 4.06155C14.6883 3.55592 13.0926 3.41398 11.5301 3.64748C9.96758 3.88097 8.48312 4.48319 7.19955 5.4043C5.91597 6.3254 4.87019 7.53892 4.14872 8.94444C3.42726 10.35 3.05085 11.9071 3.05065 13.487ZM1.28398 13.487C1.28398 7.01619 6.52986 1.77031 13.0007 1.77031C19.4714 1.77031 24.7173 7.01619 24.7173 13.487C24.7173 19.9578 19.4714 25.2036 13.0007 25.2036C6.52986 25.2036 1.28398 19.9578 1.28398 13.487Z"
      fill="#616161"
      stroke="white"
      stroke-width="0.4"
    />
  </svg> `,
        Share: ke `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.59 13.51L15.42 17.49"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.41 6.51001L8.59 10.49"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`,
        Nostr: ke `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="_8"
    x="0px"
    y="0px"
    viewBox="0 0 256 256"
    style="enable-background:new 0 0 256 256;"
    xml:space="preserve"
  >
    <style type="text/css">
      .st0 {
        fill: none;
      }
      .st1 {
        fill: #ffffff;
      }
      .st2 {
        fill: #662482;
      }
    </style>
    <g>
      <path
        class="st0"
        d="M0,0v256h256V0H0z M231.2,159.2c0,20.7,0,31.1-3.5,42.2c-4.4,12.2-14,21.8-26.2,26.2   c-11.1,3.5-21.5,3.5-42.2,3.5H96.8c-20.7,0-31.1,0-42.2-3.5c-12.2-4.4-21.8-14-26.2-26.2c-3.5-11.1-3.5-21.5-3.5-42.2V96.8   c0-20.7,0-31.1,3.5-42.2c4.4-12.2,14-21.8,26.2-26.2c11.2-3.5,21.5-3.5,42.2-3.5h62.5c20.7,0,31.1,0,42.2,3.5   c12.2,4.4,21.8,14,26.2,26.2c3.5,11.1,3.5,21.5,3.5,42.2V159.2z"
      />
      <circle class="st1" cx="137.9" cy="99" r="12.1" />
      <path
        class="st1"
        d="M210.8,115.9c0-47.3-27.7-68.7-64.4-68.7c-16.4,0-31,4.4-42.4,12.5c-3.8,2.7-9,0.1-9-4.5   c0-3.1-2.5-5.7-5.7-5.7H57.7c-3.1,0-5.7,2.5-5.7,5.7v144c0,3.1,2.5,5.7,5.7,5.7h33.7c3.1,0,5.6-2.5,5.6-5.6v-8.4   c0-62.8-33.2-109.8-0.4-116c30-5.7,64.1-3,64.5,20.1c0,2,0.3,8,8.6,11.2c5,2,12.6,2.6,22.6,2.4c0,0,9.1-0.7,9.1,8.5   c0,11.5-20.4,10.7-20.4,10.7c-6.7,0.3-22.6-1.5-31.7,1.2c-4.8,1.5-9,4.2-11.5,9.1c-4.2,8.3-6.2,26.5-6.5,45.5v15.5   c0,3.1,2.5,5.7,5.7,5.7h68c3.1,0,5.7-2.5,5.7-5.7l0,0V115.9z"
      />
      <path
        class="st2"
        d="M227.6,54.6c-4.4-12.2-14-21.8-26.2-26.2c-11.1-3.5-21.5-3.5-42.2-3.5H96.8c-20.7,0-31.1,0-42.2,3.5   c-12.2,4.4-21.8,14-26.2,26.2c-3.5,11.2-3.5,21.5-3.5,42.2v62.5c0,20.7,0,31.1,3.5,42.2c4.4,12.2,14,21.8,26.2,26.2   c11.2,3.5,21.5,3.5,42.2,3.5h62.5c20.7,0,31.1,0,42.2-3.5c12.2-4.4,21.8-14,26.2-26.2c3.5-11.1,3.5-21.5,3.5-42.2V96.8   C231.2,76.1,231.2,65.7,227.6,54.6z M205.1,204.8h-68c-3.1,0-5.7-2.5-5.7-5.7v-15.5c0.3-19,2.3-37.2,6.5-45.5   c2.5-5,6.7-7.7,11.5-9.1c9-2.7,24.9-0.9,31.7-1.2c0,0,20.4,0.8,20.4-10.7c0-9.3-9.1-8.5-9.1-8.5c-10,0.3-17.7-0.4-22.6-2.4   c-8.3-3.3-8.6-9.2-8.6-11.2c-0.4-23.1-34.5-25.9-64.5-20.1c-32.8,6.2,0.4,53.3,0.4,116v8.4c-0.1,3.1-2.5,5.6-5.6,5.6H57.7   c-3.1,0-5.7-2.5-5.7-5.7v-144c0-3.1,2.5-5.7,5.7-5.7h31.7c3.1,0,5.7,2.5,5.7,5.7c0,4.7,5.2,7.2,9,4.5c11.4-8.2,26-12.5,42.4-12.5   c36.7,0,64.4,21.4,64.4,68.7v83.2l0,0C210.8,202.3,208.3,204.8,205.1,204.8z M125.7,99c0-6.7,5.4-12.1,12.1-12.1S150,92.3,150,99   s-5.4,12.1-12.1,12.1S125.7,105.8,125.7,99z"
      />
    </g>
  </svg>`,
        TwitterX: ke `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
    <path
      d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"
    ></path>
  </svg>`,
        Facebook: ke `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
    <path
      fill="#3F51B5"
      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
    ></path>
    <path
      fill="#FFF"
      d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
    ></path>
  </svg>`,
        Reddit: ke `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
    <path
      d="M 29 3 C 26.894531 3 24.433594 4.652344 24.0625 12.03125 C 24.375 12.023438 24.683594 12 25 12 C 25.351563 12 25.714844 12.019531 26.0625 12.03125 C 26.300781 7.597656 27.355469 5 29 5 C 29.703125 5 30.101563 5.382813 30.84375 6.1875 C 31.710938 7.128906 32.84375 8.351563 35.0625 8.8125 C 35.027344 8.550781 35 8.269531 35 8 C 35 7.578125 35.042969 7.179688 35.125 6.78125 C 33.75 6.40625 33.023438 5.613281 32.3125 4.84375 C 31.519531 3.984375 30.609375 3 29 3 Z M 41 4 C 38.792969 4 37 5.796875 37 8 C 37 10.203125 38.792969 12 41 12 C 43.207031 12 45 10.203125 45 8 C 45 5.796875 43.207031 4 41 4 Z M 25 14 C 12.867188 14 3 20.179688 3 29 C 3 37.820313 12.867188 45 25 45 C 37.132813 45 47 37.820313 47 29 C 47 20.179688 37.132813 14 25 14 Z M 7.5 14.9375 C 6.039063 14.9375 4.652344 15.535156 3.59375 16.59375 C 1.871094 18.316406 1.515625 20.792969 2.5 22.84375 C 4.011719 19.917969 6.613281 17.421875 9.96875 15.5625 C 9.207031 15.175781 8.363281 14.9375 7.5 14.9375 Z M 42.5 14.9375 C 41.636719 14.9375 40.792969 15.175781 40.03125 15.5625 C 43.386719 17.421875 45.988281 19.917969 47.5 22.84375 C 48.484375 20.792969 48.128906 18.316406 46.40625 16.59375 C 45.347656 15.535156 43.960938 14.9375 42.5 14.9375 Z M 17 23 C 18.65625 23 20 24.34375 20 26 C 20 27.65625 18.65625 29 17 29 C 15.34375 29 14 27.65625 14 26 C 14 24.34375 15.34375 23 17 23 Z M 33 23 C 34.65625 23 36 24.34375 36 26 C 36 27.65625 34.65625 29 33 29 C 31.34375 29 30 27.65625 30 26 C 30 24.34375 31.34375 23 33 23 Z M 16.0625 34 C 16.3125 34.042969 16.558594 34.183594 16.71875 34.40625 C 16.824219 34.554688 19.167969 37.6875 25 37.6875 C 30.910156 37.6875 33.257813 34.46875 33.28125 34.4375 C 33.597656 33.988281 34.234375 33.867188 34.6875 34.1875 C 35.136719 34.503906 35.222656 35.109375 34.90625 35.5625 C 34.789063 35.730469 31.9375 39.6875 25 39.6875 C 18.058594 39.6875 15.210938 35.730469 15.09375 35.5625 C 14.777344 35.109375 14.859375 34.503906 15.3125 34.1875 C 15.539063 34.027344 15.8125 33.957031 16.0625 34 Z"
      fill="#ff4b13"
    ></path>
  </svg>`,
        Pinterest: ke `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="20" fill="#E60023"></circle>
    <path
      fill="#FFF"
      d="M24.4439087,11.4161377c-8.6323242,0-13.2153931,5.7946167-13.2153931,12.1030884	c0,2.9338379,1.5615234,6.5853882,4.0599976,7.7484131c0.378418,0.1762085,0.581543,0.1000366,0.668457-0.2669067	c0.0668945-0.2784424,0.4038086-1.6369019,0.5553589-2.2684326c0.0484619-0.2015381,0.0246582-0.3746338-0.1384277-0.5731201	c-0.8269653-1.0030518-1.4884644-2.8461304-1.4884644-4.5645752c0-4.4115601,3.3399658-8.6799927,9.0299683-8.6799927	c4.9130859,0,8.3530884,3.3484497,8.3530884,8.1369019c0,5.4099731-2.7322998,9.1584473-6.2869263,9.1584473	c-1.9630737,0-3.4330444-1.6238403-2.9615479-3.6153564c0.5654297-2.3769531,1.6569214-4.9415283,1.6569214-6.6584473	c0-1.5354004-0.8230591-2.8169556-2.5299683-2.8169556c-2.006958,0-3.6184692,2.0753784-3.6184692,4.8569336	c0,1.7700195,0.5984497,2.9684448,0.5984497,2.9684448s-1.9822998,8.3815308-2.3453979,9.9415283	c-0.4019775,1.72229-0.2453003,4.1416016-0.0713501,5.7233887l0,0c0.4511108,0.1768799,0.9024048,0.3537598,1.3687744,0.4981079l0,0	c0.8168945-1.3278198,2.0349731-3.5056763,2.4864502-5.2422485c0.2438354-0.9361572,1.2468872-4.7546387,1.2468872-4.7546387	c0.6515503,1.2438965,2.5561523,2.296936,4.5831299,2.296936c6.0314941,0,10.378418-5.546936,10.378418-12.4400024	C36.7738647,16.3591919,31.3823242,11.4161377,24.4439087,11.4161377z"
    ></path>
  </svg>`,
        Telegram: ke `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
    <linearGradient
      id="BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1"
      x1="9.858"
      x2="38.142"
      y1="9.858"
      y2="38.142"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stop-color="#33bef0"></stop>
      <stop offset="1" stop-color="#0a85d9"></stop>
    </linearGradient>
    <path
      fill="url(#BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1)"
      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
    ></path>
    <path
      d="M10.119,23.466c8.155-3.695,17.733-7.704,19.208-8.284c3.252-1.279,4.67,0.028,4.448,2.113	c-0.273,2.555-1.567,9.99-2.363,15.317c-0.466,3.117-2.154,4.072-4.059,2.863c-1.445-0.917-6.413-4.17-7.72-5.282	c-0.891-0.758-1.512-1.608-0.88-2.474c0.185-0.253,0.658-0.763,0.921-1.017c1.319-1.278,1.141-1.553-0.454-0.412	c-0.19,0.136-1.292,0.935-1.745,1.237c-1.11,0.74-2.131,0.78-3.862,0.192c-1.416-0.481-2.776-0.852-3.634-1.223	C8.794,25.983,8.34,24.272,10.119,23.466z"
      opacity=".05"
    ></path>
    <path
      d="M10.836,23.591c7.572-3.385,16.884-7.264,18.246-7.813c3.264-1.318,4.465-0.536,4.114,2.011	c-0.326,2.358-1.483,9.654-2.294,14.545c-0.478,2.879-1.874,3.513-3.692,2.337c-1.139-0.734-5.723-3.754-6.835-4.633	c-0.86-0.679-1.751-1.463-0.71-2.598c0.348-0.379,2.27-2.234,3.707-3.614c0.833-0.801,0.536-1.196-0.469-0.508	c-1.843,1.263-4.858,3.262-5.396,3.625c-1.025,0.69-1.988,0.856-3.664,0.329c-1.321-0.416-2.597-0.819-3.262-1.078	C9.095,25.618,9.075,24.378,10.836,23.591z"
      opacity=".07"
    ></path>
    <path
      fill="#fff"
      d="M11.553,23.717c6.99-3.075,16.035-6.824,17.284-7.343c3.275-1.358,4.28-1.098,3.779,1.91	c-0.36,2.162-1.398,9.319-2.226,13.774c-0.491,2.642-1.593,2.955-3.325,1.812c-0.833-0.55-5.038-3.331-5.951-3.984	c-0.833-0.595-1.982-1.311-0.541-2.721c0.513-0.502,3.874-3.712,6.493-6.21c0.343-0.328-0.088-0.867-0.484-0.604	c-3.53,2.341-8.424,5.59-9.047,6.013c-0.941,0.639-1.845,0.932-3.467,0.466c-1.226-0.352-2.423-0.772-2.889-0.932	C9.384,25.282,9.81,24.484,11.553,23.717z"
    ></path>
  </svg>`,
        Linkedin: ke `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
    <path
      fill="#0b65c2"
      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
    ></path>
    <path
      d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
      opacity=".05"
    ></path>
    <path
      d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
      opacity=".07"
    ></path>
    <path
      fill="#fff"
      d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
    ></path>
  </svg>`,
        Mail: ke `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 68 50" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M67.6499 1.65098C67.8718 1.47337 68 1.21115 68 0.934765C68 0.418508 67.5614 0 67.0203 0H1.52087C0.680918 0 0 0.649685 0 1.45111C0 1.88251 0.201168 2.29154 0.548927 2.56723L32.4798 27.8811C33.1757 28.4328 34.1854 28.4305 34.8786 27.8759L67.6499 1.65098ZM3.06762 9.98123C1.84813 9.01445 0 9.84192 0 11.3547V48.2143C0 49.2005 0.837925 50 1.87156 50H66.1284C67.1621 50 68 49.2005 68 48.2143V10.6373C68 9.12063 66.1437 8.29446 64.9258 9.26907L35.0912 33.1439L34.8917 33.3035C34.1985 33.8582 33.1888 33.8604 32.493 33.3088L32.2927 33.15L3.06762 9.98123Z"
      fill="#4D0072"
    />
  </svg>`,
        Quotes: ke `<svg
    width="20px"
    height="20px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    class="bi bi-chat-quote"
  >
    <path
      d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
    />
    <path
      d="M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"
    />
  </svg>`,
        Highlight: ke `<svg
    version="1.1"
    id="designs"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="20px"
    height="20px"
    viewBox="0 0 32 32"
    xml:space="preserve"
  >
    <style type="text/css">
      .sketchy_een {
        fill: #111918;
      }
    </style>
    <path
      class="sketchy_een"
      d="M29.969,8.608c-0.061-0.219-0.207-0.41-0.402-0.524c-0.052-0.031-0.109-0.05-0.166-0.069
	c-0.205-0.182-0.412-0.363-0.61-0.551c-0.225-0.215-0.439-0.439-0.664-0.652c-0.24-0.229-0.473-0.465-0.709-0.699
	c-0.236-0.234-0.487-0.455-0.739-0.676c-0.522-0.457-1.013-0.95-1.527-1.417c-0.554-0.502-1.088-1.027-1.637-1.533
	c-0.109-0.1-0.24-0.158-0.375-0.195c-0.008-0.008-0.01-0.019-0.018-0.028c-0.157-0.157-0.384-0.243-0.608-0.243
	c-0.213,0-0.425,0.077-0.573,0.243c-0.597,0.666-1.21,1.308-1.872,1.907c-0.605,0.548-1.222,1.086-1.836,1.622
	c-1.222,1.064-2.382,2.205-3.509,3.365c-1.076,1.107-2.193,2.171-3.306,3.239c-0.56,0.538-1.099,1.094-1.683,1.606
	c-0.276,0.242-0.558,0.483-0.833,0.725c-0.264,0.23-0.51,0.485-0.755,0.733c-0.355,0.363-0.715,0.723-1.092,1.06
	c-0.172,0.155-0.228,0.383-0.204,0.604c-0.057,0.184-0.062,0.385,0.011,0.559c0.019,0.23,0.04,0.459,0.047,0.688
	c0.006,0.224,0.017,0.454,0,0.679c-0.079,0.373-0.195,0.742-0.332,1.099c-0.159,0.34-0.356,0.661-0.543,0.986
	c-0.173,0.302-0.368,0.593-0.581,0.871c0.011-0.014,0.022-0.028,0.033-0.042c-0.104,0.144-0.172,0.287-0.172,0.481
	c0,0.138,0.049,0.267,0.117,0.385c-0.074,0.288-0.028,0.61,0.204,0.809c0.033,0.028,0.066,0.058,0.099,0.086
	c-0.263,0.316-0.527,0.63-0.786,0.949c-0.355,0.433-0.692,0.881-1.054,1.308c-0.209,0.244-0.418,0.483-0.613,0.737
	c-0.116,0.15-0.217,0.309-0.323,0.465c-0.205,0.294-0.39,0.603-0.595,0.898c-0.066,0.094-0.092,0.205-0.101,0.318
	C2.102,28.558,2,28.772,2,28.999c0,0.461,0.38,0.83,0.837,0.835c1.042,0.018,2.087,0.051,3.131,0.042
	c0.862-0.008,1.731-0.024,2.589,0.072c0.033,0.005,0.064,0.008,0.096,0.011c0.004,0.001,0.009,0.001,0.013,0.002
	c-0.003,0-0.007-0.001-0.01-0.001c0.067,0.006,0.13,0.003,0.193-0.003c0.289,0.062,0.602-0.001,0.824-0.223
	c0.465-0.465,0.929-0.93,1.387-1.402c0.062,0.085,0.123,0.172,0.216,0.226c0.255,0.15,0.551,0.115,0.786-0.025
	c0.143-0.034,0.279-0.092,0.386-0.203c0.203-0.211,0.416-0.41,0.625-0.611c0.166-0.159,0.328-0.322,0.505-0.469
	c0.445-0.329,0.914-0.619,1.415-0.854c0.243-0.092,0.487-0.167,0.742-0.217c0.034-0.002,0.067-0.004,0.101-0.004
	c0.341,0.075,0.667,0.19,0.989,0.322c0.191,0.079,0.459,0.018,0.63-0.083c0.11-0.064,0.195-0.159,0.264-0.265
	c0.011-0.01,0.027-0.014,0.038-0.025c0.018-0.018,0.025-0.043,0.041-0.062c0.032-0.024,0.075-0.037,0.099-0.067
	c0.072-0.087,0.138-0.177,0.205-0.265c0.403-0.522,0.764-1.074,1.161-1.601c0.254-0.323,0.517-0.637,0.761-0.967
	c0.248-0.335,0.495-0.67,0.747-1.003c0.512-0.672,0.995-1.367,1.497-2.049c0.52-0.709,1.038-1.423,1.553-2.138
	c0.489-0.678,0.95-1.373,1.407-2.071c0.709-1.082,1.47-2.128,2.23-3.172c0.4-0.55,0.778-1.117,1.166-1.677
	c0.41-0.595,0.837-1.178,1.255-1.767C30.01,9.1,30.026,8.818,29.969,8.608z M6.018,28.339c-0.607-0.031-1.212-0.07-1.817-0.107
	c0.123-0.177,0.245-0.354,0.374-0.526c0.189-0.233,0.395-0.45,0.587-0.679c0.231-0.276,0.445-0.566,0.67-0.847
	c0.37-0.466,0.765-0.91,1.163-1.354c0.025,0.022,0.05,0.043,0.074,0.065c0.461,0.412,0.94,0.804,1.413,1.204
	c0.393,0.33,0.778,0.668,1.164,1.007c-0.415,0.436-0.833,0.872-1.216,1.334c-0.351-0.024-0.701-0.048-1.052-0.057
	C6.924,28.369,6.469,28.363,6.018,28.339z M13.663,25.312c-0.213,0.114-0.414,0.254-0.617,0.388
	c-0.187,0.124-0.374,0.248-0.554,0.386c-0.301,0.231-0.579,0.491-0.862,0.746c-0.283-0.24-0.568-0.479-0.843-0.728
	c-0.416-0.376-0.841-0.743-1.263-1.113c-0.883-0.775-1.682-1.636-2.551-2.427c0.168-0.233,0.338-0.465,0.492-0.706
	c0.264-0.416,0.52-0.849,0.69-1.312c0.077-0.211,0.146-0.427,0.207-0.644c0.074-0.258,0.13-0.517,0.152-0.781
	c0.153,0.122,0.307,0.241,0.458,0.366c0.321,0.266,0.633,0.544,0.948,0.814c0.313,0.27,0.634,0.526,0.95,0.792
	c0.634,0.542,1.253,1.103,1.89,1.641c0.644,0.548,1.269,1.119,1.89,1.694c0.117,0.108,0.23,0.217,0.344,0.327
	C14.528,24.882,14.083,25.083,13.663,25.312z M26.909,10.7c-0.459,0.747-0.993,1.448-1.492,2.167
	c-0.487,0.702-0.967,1.405-1.442,2.114c-0.221,0.333-0.433,0.67-0.654,1.001c-0.24,0.359-0.491,0.709-0.743,1.06
	c-0.656,0.918-1.324,1.828-1.966,2.756c-0.315,0.455-0.63,0.904-0.962,1.348c-0.326,0.434-0.639,0.88-0.967,1.315
	c-0.159,0.2-0.322,0.398-0.477,0.6c-0.171,0.223-0.335,0.453-0.499,0.68c-0.164,0.226-0.325,0.453-0.488,0.678
	c-0.182-0.156-0.363-0.313-0.543-0.469c-0.299-0.26-0.603-0.512-0.902-0.772c-0.638-0.554-1.263-1.121-1.917-1.659
	c-1.279-1.05-2.54-2.126-3.82-3.178c-0.489-0.402-0.974-0.81-1.457-1.219c0.262-0.258,0.526-0.516,0.783-0.778
	c0.514-0.52,1.064-0.995,1.608-1.482c0.581-0.518,1.135-1.074,1.695-1.618c0.536-0.522,1.068-1.048,1.594-1.578
	c0.579-0.585,1.172-1.161,1.756-1.744c0.548-0.55,1.119-1.074,1.687-1.604c0.601-0.563,1.208-1.117,1.832-1.653
	c0.64-0.546,1.289-1.084,1.939-1.62c0.418-0.344,0.803-0.722,1.178-1.109c0.459,0.403,0.917,0.806,1.386,1.198
	c0.534,0.445,1.034,0.928,1.533,1.413c0.238,0.233,0.491,0.451,0.735,0.68c0.24,0.227,0.483,0.455,0.725,0.68
	c0.229,0.211,0.451,0.43,0.682,0.636c0.117,0.107,0.236,0.212,0.357,0.316C27.67,9.466,27.288,10.082,26.909,10.7z M22.423,15.018
	c-0.404,0.591-0.833,1.16-1.251,1.744c-0.205,0.286-0.408,0.575-0.619,0.859c-0.191,0.26-0.392,0.514-0.579,0.778
	c-0.38,0.534-0.723,1.094-1.096,1.633c-0.37,0.538-0.743,1.078-1.139,1.598c-0.112,0.148-0.221,0.262-0.41,0.315
	c-0.177,0.047-0.37,0.024-0.528-0.069c-0.154-0.091-0.268-0.24-0.315-0.412c-0.045-0.158-0.037-0.39,0.069-0.528
	c0.41-0.536,0.806-1.088,1.18-1.649c0.357-0.532,0.684-1.08,1.064-1.596c0.818-1.113,1.566-2.278,2.329-3.432
	c0.152-0.229,0.4-0.369,0.658-0.369c0.123,0,0.249,0.032,0.369,0.101C22.489,14.186,22.656,14.679,22.423,15.018z"
    />
  </svg> `,
        Comment: ke `<svg
    width="20px"
    height="20px"
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
  >
    <title>comment-3</title>
    <desc>Created with Sketch Beta.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
      <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-204.000000, -255.000000)" fill="#000000">
        <path
          d="M228,267 C226.896,267 226,267.896 226,269 C226,270.104 226.896,271 228,271 C229.104,271 230,270.104 230,269 C230,267.896 229.104,267 228,267 L228,267 Z M220,281 C218.832,281 217.704,280.864 216.62,280.633 L211.912,283.463 L211.975,278.824 C208.366,276.654 206,273.066 206,269 C206,262.373 212.268,257 220,257 C227.732,257 234,262.373 234,269 C234,275.628 227.732,281 220,281 L220,281 Z M220,255 C211.164,255 204,261.269 204,269 C204,273.419 206.345,277.354 210,279.919 L210,287 L217.009,282.747 C217.979,282.907 218.977,283 220,283 C228.836,283 236,276.732 236,269 C236,261.269 228.836,255 220,255 L220,255 Z M212,267 C210.896,267 210,267.896 210,269 C210,270.104 210.896,271 212,271 C213.104,271 214,270.104 214,269 C214,267.896 213.104,267 212,267 L212,267 Z M220,267 C218.896,267 218,267.896 218,269 C218,270.104 218.896,271 220,271 C221.104,271 222,270.104 222,269 C222,267.896 221.104,267 220,267 L220,267 Z"
          id="comment-3"
          sketch:type="MSShapeGroup"
        ></path>
      </g>
    </g>
  </svg>`,
        Message: ke `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22 12.5C22 12.0086 21.9947 11.0172 21.9842 10.5244C21.9189 7.45883 21.8862 5.92606 20.7551 4.79063C19.6239 3.6552 18.0497 3.61565 14.9012 3.53654C12.9607 3.48778 11.0393 3.48778 9.09882 3.53653C5.95033 3.61563 4.37608 3.65518 3.24495 4.79062C2.11382 5.92605 2.08114 7.45882 2.01576 10.5243C1.99474 11.51 1.99475 12.4899 2.01577 13.4756C2.08114 16.5411 2.11383 18.0739 3.24496 19.2093C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C9.90159 20.4836 10.7011 20.4954 11.5 20.4989"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 6L8.91302 9.92462C11.4387 11.3585 12.5613 11.3585 15.087 9.92462L22 6"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M22 17.5L14 17.5M22 17.5C22 16.7998 20.0057 15.4915 19.5 15M22 17.5C22 18.2002 20.0057 19.5085 19.5 20"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `,
    };

    const ACTIONS = {
        zap: {
            value: 'zap',
            label: 'Zap',
            icon: Icons.Light,
        },
        like: {
            value: 'like',
            label: 'Like',
            icon: Icons.Like,
        },
        bookmark: {
            value: 'bookmark',
            label: 'Bookmark',
            icon: Icons.Bookmark,
        },
        share: {
            value: 'share',
            label: 'Share',
            icon: Icons.Share,
        },
        follow: {
            value: 'follow',
            label: 'Follow',
            icon: Icons.Follow,
        },
        'open-with': {
            value: 'open-with',
            label: 'Open with',
            icon: Icons.LinkOut,
        },
        dm: {
            value: 'dm',
            label: 'Send message',
            icon: Icons.Message,
        },
    };
    const SELECTION_ACTIONS = {
        comment: {
            value: 'comment',
            label: 'Comment',
            icon: Icons.Comment,
        },
        quote: {
            value: 'quote',
            label: 'Quote',
            icon: Icons.Quotes,
        },
        highlight: {
            value: 'highlight',
            label: 'Highlight',
            icon: Icons.Highlight,
        },
    };
    const APPS = [
        {
            id: 'nostr',
            name: 'Nostr',
            icon: Icons.Nostr,
        },
        {
            id: 'twitter',
            name: 'Twitter',
            icon: Icons.TwitterX,
        },
        {
            id: 'facebook',
            name: 'Facebook',
            icon: Icons.Facebook,
        },
        {
            id: 'reddit',
            name: 'Reddit',
            icon: Icons.Reddit,
        },
        {
            id: 'pinterest',
            name: 'Pinterest',
            icon: Icons.Pinterest,
        },
        {
            id: 'telegram',
            name: 'Telegram',
            icon: Icons.Telegram,
        },
        {
            id: 'linkedin',
            name: 'Linkedin',
            icon: Icons.Linkedin,
        },
        {
            id: 'email',
            name: 'Email',
            icon: Icons.Mail,
        },
    ];
    const CTA_LIST_ATTR = 'data-cta-list';
    const CTA_MAIN_ACTION_ATTR = 'data-cta-main';
    const BUTTON_COLOR_ATTR = 'data-button-color';
    const BUTTON_TEXT_COLOR_ATTR = 'data-text-button-color';
    const NPUB_ATTR = 'data-user-npub';
    const EVENT_ADDR_ATTR = 'data-event-addr';
    const EVENT_ID_ATTR = 'data-event-id';
    const EVENT_AUTHOR_ATTR = 'data-author-npub';
    const DEFAULT_BUTTON_COLOR = '#245b9e';
    const DEFAULT_BUTTON_TEXT_COLOR = '#fff';
    const DEFAULT_MAIN_ACTION = ACTIONS['zap'];

    const userRelaysCache = new Map();
    const prepareActionsList = (actions, ACTIONS, mainActionKey) => {
        const actionsList = actions.split(',');
        const modalActions = actionsList
            .map((key) => {
            if (mainActionKey && key === mainActionKey)
                return;
            return ACTIONS[key];
        })
            .filter(Boolean);
        if (mainActionKey) {
            const mainAction = ACTIONS[mainActionKey];
            if (mainAction)
                return [mainAction, ...modalActions];
        }
        return modalActions;
    };
    // function getNostrMeta(metaNostrName: string) {
    //   const metas = document.getElementsByTagName('meta')
    //   // @ts-ignore
    //   for (const meta of metas) {
    //     const name = meta.getAttribute('name') || meta.getAttribute('property')
    //     if (name !== 'nostr:' + metaNostrName) continue
    //     const content = meta.getAttribute('content')
    //     if (!content) {
    //       console.log('Bad meta nostr:id value: ', content)
    //       continue
    //     }
    //     return content
    //   }
    //   return undefined
    // }
    function parseIdAddr(idAddr, eventId) {
        let id = '';
        let addr = '';
        try {
            // @ts-ignore
            const { type, data } = window.nostrSite.nostrTools.nip19.decode(idAddr);
            switch (type) {
                case 'note':
                    id = data;
                    break;
                case 'nevent':
                    id = data.id;
                    break;
                case 'naddr':
                    addr = data.kind + ':' + data.pubkey + ':' + data.identifier;
                    break;
            }
            if (!id && eventId) {
                // @ts-ignore
                const { type, data } = window.nostrSite.nostrTools.nip19.decode(eventId);
                switch (type) {
                    case 'note':
                        id = data;
                        break;
                    case 'nevent':
                        id = data.id;
                        break;
                }
            }
        }
        catch (e) {
            console.log('content-cta bad event id', idAddr);
        }
        return [id, addr];
    }
    // export function getIdAddr() {
    //   const idAddr = getNostrMeta('id')
    //   let [id, addr] = parseIdAddr(idAddr)
    //   // ensure we have event id
    //   if (!id) {
    //     const eventId = getNostrMeta('event_id')
    //     ;[id] = parseIdAddr(eventId)
    //   }
    //   return [id, addr]
    // }
    function npubToPubkey(npub) {
        try {
            // @ts-ignore
            const { type, data } = window.nostrSite.nostrTools.nip19.decode(npub);
            switch (type) {
                case 'npub':
                    return data;
            }
        }
        catch (e) {
            console.log('content-cta bad npub', npub, e);
        }
        return '';
    }
    async function getReadRelays({ authorPubkey, userPubkey }) {
        // @ts-ignore
        const site = window.nostrSite.renderer.getSite();
        const relays = [];
        // FIXME actually we might want to only read from site's relays bcs those might be
        // used for moderation... OTOH single-relay-site is a foreign concept atm
        // so not sure if we should focus on it too much.
        // reading from site's inbox
        if (site.contributor_inbox_relays)
            relays.push(...site.contributor_inbox_relays);
        if (!relays.length && site.contributor_relays)
            relays.push(...site.contributor_relays);
        // reading from author's inbox
        const authorRelays = await getUserRelays(authorPubkey);
        relays.push(...authorRelays.read);
        if (!authorRelays.read.length)
            relays.push(...authorRelays.write);
        // reading from user's outbox
        const userRelays = await getUserRelays(userPubkey);
        relays.push(...userRelays.write);
        if (!userRelays.write.length)
            relays.push(...userRelays.read);
        // fallback
        if (!relays.length)
            relays.push(...['wss://relay.nostr.band', 'wss://relay.damus.io', 'wss://relay.primal.net']);
        // dedup
        return [...new Set(relays)];
    }
    async function getWriteRelays({ authorPubkey, event }) {
        // we write to the same relays that we're reading from, that's the whole point!
        return await getReadRelays({ authorPubkey, userPubkey: event.pubkey });
    }
    async function getUserRelays(pubkey) {
        if (!userRelaysCache.has(pubkey)) {
            // @ts-ignore
            const renderer = window.nostrSite.renderer;
            console.log('content-cta fetch relays', pubkey);
            const relays = await renderer.fetchRelays([pubkey]);
            console.log('content-cta fetched relays', pubkey, relays);
            userRelaysCache.set(pubkey, relays);
        }
        return userRelaysCache.get(pubkey);
    }
    async function publish(event, authorPubkey) {
        // @ts-ignore
        const renderer = window.nostrSite.renderer;
        return await renderer.publishEvent(event, {
            relays: await getWriteRelays({ event, authorPubkey }),
        });
    }
    function getRef() {
        return window.location.origin + window.location.pathname + window.location.search;
    }
    function getClient() {
        return window.location.origin;
    }
    function getTagRelay() {
        // @ts-ignore
        const renderer = window.nostrSite.renderer;
        const site = renderer.getSite();
        return site.contributor_relays && site.contributor_relays.length
            ? site.contributor_relays[0]
            : 'wss://relay.nostr.band/';
    }
    async function publishReaction({ eventAddr, eventId, authorPubkey, emoji, }) {
        const [id, addr] = parseIdAddr(eventAddr, eventId);
        console.log('id', id, 'addr', addr, 'author', authorPubkey);
        if (!id && !addr)
            throw new Error('No id/addr');
        if (!authorPubkey)
            throw new Error('No author');
        // @ts-ignore
        const pubkey = await window.nostr.getPublicKey();
        // template
        const event = {
            kind: 7,
            content: emoji,
            pubkey,
            created_at: Math.floor(Date.now() / 1000),
            tags: [
                ['p', authorPubkey],
                ['r', getRef()],
                ['client', getClient()],
            ],
        };
        if (id)
            event.tags.push(['e', id, getTagRelay()]);
        if (addr)
            event.tags.push(['a', addr, getTagRelay()]);
        // custom emoji? url or data-url
        if (emoji.startsWith('http') || emoji.startsWith('data')) {
            event.content = ':custom:';
            event.tags.push(['emoji', 'custom', emoji]);
        }
        return publish(event, authorPubkey);
    }
    async function publishNote({ authorPubkey, text }) {
        // @ts-ignore
        const pubkey = await window.nostr.getPublicKey();
        // template
        const event = {
            kind: 1,
            content: text,
            pubkey,
            created_at: Math.floor(Date.now() / 1000),
            tags: [
                ['p', authorPubkey],
                ['r', getRef()],
                ['client', getClient()],
            ],
        };
        // NDK will auto-parse the nostr: links and #hashtags
        return publish(event, authorPubkey);
    }
    async function publishFollow(followPubkey) {
        // @ts-ignore
        const pubkey = await window.nostr.getPublicKey();
        // @ts-ignore
        const renderer = window.nostrSite.renderer;
        const KIND = 3;
        const relays = await getUserRelays(pubkey);
        const contactList = await renderer.fetchEvent({
            kinds: [KIND],
            authors: [pubkey],
        }, { relays, outboxRelays: true, timeoutMs: 10000 });
        const event = {
            // defaults
            tags: [],
            content: '',
            // copy
            ...(contactList ? contactList.rawEvent() : {}),
            // ensure
            kind: KIND,
            pubkey,
            created_at: Math.floor(Date.now() / 1000),
        };
        if (!event.tags.find((t) => t.length >= 2 && t[1] === followPubkey))
            event.tags.push(['p', followPubkey, getTagRelay()]);
        return publish(event, followPubkey);
    }
    async function publishBookmark({ eventAddr, eventId, authorPubkey, }) {
        const [id, addr] = parseIdAddr(eventAddr, eventId);
        if (!id && !addr)
            return;
        // @ts-ignore
        const pubkey = await window.nostr.getPublicKey();
        // @ts-ignore
        const renderer = window.nostrSite.renderer;
        const KIND = 10003;
        const relays = await getUserRelays(pubkey);
        const list = await renderer.fetchEvent({
            kinds: [KIND],
            authors: [pubkey],
        }, { relays, timeoutMs: 10000 });
        // template
        const event = {
            // defaults
            tags: [],
            content: '',
            // copy
            ...(list ? list.rawEvent() : {}),
            // ensure
            kind: KIND,
            pubkey,
            created_at: Math.floor(Date.now() / 1000),
        };
        if (!event.tags.find((t) => t.length >= 2 && t[1] === (id || addr))) {
            if (id)
                event.tags.push(['e', id, getTagRelay()]);
            if (addr)
                event.tags.push(['a', addr, getTagRelay()]);
        }
        return publish(event, authorPubkey);
    }
    async function publishHighlight({ eventAddr, eventId, authorPubkey, text, comment, }) {
        const [id, addr] = parseIdAddr(eventAddr, eventId);
        console.log('id', id, 'addr', addr, 'author', authorPubkey);
        if (!id && !addr)
            throw new Error('No id/addr');
        if (!authorPubkey)
            throw new Error('No author');
        // @ts-ignore
        const pubkey = await window.nostr.getPublicKey();
        // template
        const event = {
            kind: 9802,
            content: text,
            pubkey,
            created_at: Math.floor(Date.now() / 1000),
            tags: [
                ['p', authorPubkey],
                ['r', getRef()],
                ['client', getClient()],
            ],
        };
        if (id)
            event.tags.push(['e', id, getTagRelay()]);
        if (addr)
            event.tags.push(['a', addr, getTagRelay()]);
        if (comment)
            event.tags.push(['comment', comment]);
        // NDK will auto-parse the nostr: links and #hashtags
        return publish(event, authorPubkey);
    }
    async function publishReply({ eventAddr, eventId, authorPubkey, text, }) {
        const [id, addr] = parseIdAddr(eventAddr, eventId);
        console.log('id', id, 'addr', addr, 'author', authorPubkey);
        if (!id && !addr)
            throw new Error('No id/addr');
        if (!authorPubkey)
            throw new Error('No author');
        // @ts-ignore
        const pubkey = await window.nostr.getPublicKey();
        // template
        const event = {
            kind: 1,
            content: text,
            pubkey,
            created_at: Math.floor(Date.now() / 1000),
            tags: [
                ['p', authorPubkey],
                ['r', getRef()],
                ['client', getClient()],
            ],
        };
        if (id)
            event.tags.push(['e', id, getTagRelay(), 'root']);
        if (addr)
            event.tags.push(['a', addr, getTagRelay(), 'root']);
        return publish(event, authorPubkey);
    }
    function getCompletionForEvent(e) {
        switch (e.kind) {
            case 7:
                return 'reaction';
            case 1:
                // reply is 'note', root is 'share'
                if (e.tags.find((t) => t.length >= 4 && (t[0] === 'e' || t[0] === 'a') && t[3] === 'root'))
                    return 'note';
                else
                    return 'share';
            case 3:
                return 'follow';
            case 9802:
                return 'highlight';
            case 9735:
                return 'zap';
            case 10003:
                return 'bookmark';
        }
        return '';
    }

    function assertNonEmptyString (str) {
      if (typeof str !== 'string' || !str) {
        throw new Error('expected a non-empty string, got: ' + str)
      }
    }

    function assertNumber (number) {
      if (typeof number !== 'number') {
        throw new Error('expected a number, got: ' + number)
      }
    }

    const DB_VERSION_CURRENT = 1;
    const DB_VERSION_INITIAL = 1;
    const STORE_EMOJI = 'emoji';
    const STORE_KEYVALUE = 'keyvalue';
    const STORE_FAVORITES = 'favorites';
    const FIELD_TOKENS = 'tokens';
    const INDEX_TOKENS = 'tokens';
    const FIELD_UNICODE = 'unicode';
    const INDEX_COUNT = 'count';
    const FIELD_GROUP = 'group';
    const FIELD_ORDER = 'order';
    const INDEX_GROUP_AND_ORDER = 'group-order';
    const KEY_ETAG = 'eTag';
    const KEY_URL = 'url';
    const KEY_PREFERRED_SKINTONE = 'skinTone';
    const MODE_READONLY = 'readonly';
    const MODE_READWRITE = 'readwrite';
    const INDEX_SKIN_UNICODE = 'skinUnicodes';
    const FIELD_SKIN_UNICODE = 'skinUnicodes';

    const DEFAULT_DATA_SOURCE$1 = 'https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json';
    const DEFAULT_LOCALE$1 = 'en';

    // like lodash's uniqBy but much smaller
    function uniqBy$1 (arr, func) {
      const set = new Set();
      const res = [];
      for (const item of arr) {
        const key = func(item);
        if (!set.has(key)) {
          set.add(key);
          res.push(item);
        }
      }
      return res
    }

    function uniqEmoji (emojis) {
      return uniqBy$1(emojis, _ => _.unicode)
    }

    function initialMigration (db) {
      function createObjectStore (name, keyPath, indexes) {
        const store = keyPath
          ? db.createObjectStore(name, { keyPath })
          : db.createObjectStore(name);
        if (indexes) {
          for (const [indexName, [keyPath, multiEntry]] of Object.entries(indexes)) {
            store.createIndex(indexName, keyPath, { multiEntry });
          }
        }
        return store
      }

      createObjectStore(STORE_KEYVALUE);
      createObjectStore(STORE_EMOJI, /* keyPath */ FIELD_UNICODE, {
        [INDEX_TOKENS]: [FIELD_TOKENS, /* multiEntry */ true],
        [INDEX_GROUP_AND_ORDER]: [[FIELD_GROUP, FIELD_ORDER]],
        [INDEX_SKIN_UNICODE]: [FIELD_SKIN_UNICODE, /* multiEntry */ true]
      });
      createObjectStore(STORE_FAVORITES, undefined, {
        [INDEX_COUNT]: ['']
      });
    }

    const openIndexedDBRequests = {};
    const databaseCache = {};
    const onCloseListeners = {};

    function handleOpenOrDeleteReq (resolve, reject, req) {
      // These things are almost impossible to test with fakeIndexedDB sadly
      /* istanbul ignore next */
      req.onerror = () => reject(req.error);
      /* istanbul ignore next */
      req.onblocked = () => reject(new Error('IDB blocked'));
      req.onsuccess = () => resolve(req.result);
    }

    async function createDatabase (dbName) {
      const db = await new Promise((resolve, reject) => {
        const req = indexedDB.open(dbName, DB_VERSION_CURRENT);
        openIndexedDBRequests[dbName] = req;
        req.onupgradeneeded = e => {
          // Technically there is only one version, so we don't need this `if` check
          // But if an old version of the JS is in another browser tab
          // and it gets upgraded in the future and we have a new DB version, well...
          // better safe than sorry.
          /* istanbul ignore else */
          if (e.oldVersion < DB_VERSION_INITIAL) {
            initialMigration(req.result);
          }
        };
        handleOpenOrDeleteReq(resolve, reject, req);
      });
      // Handle abnormal closes, e.g. "delete database" in chrome dev tools.
      // No need for removeEventListener, because once the DB can no longer
      // fire "close" events, it will auto-GC.
      // Unfortunately cannot test in fakeIndexedDB: https://github.com/dumbmatter/fakeIndexedDB/issues/50
      /* istanbul ignore next */
      db.onclose = () => closeDatabase(dbName);
      return db
    }

    function openDatabase (dbName) {
      if (!databaseCache[dbName]) {
        databaseCache[dbName] = createDatabase(dbName);
      }
      return databaseCache[dbName]
    }

    function dbPromise (db, storeName, readOnlyOrReadWrite, cb) {
      return new Promise((resolve, reject) => {
        // Use relaxed durability because neither the emoji data nor the favorites/preferred skin tone
        // are really irreplaceable data. IndexedDB is just a cache in this case.
        const txn = db.transaction(storeName, readOnlyOrReadWrite, { durability: 'relaxed' });
        const store = typeof storeName === 'string'
          ? txn.objectStore(storeName)
          : storeName.map(name => txn.objectStore(name));
        let res;
        cb(store, txn, (result) => {
          res = result;
        });

        txn.oncomplete = () => resolve(res);
        /* istanbul ignore next */
        txn.onerror = () => reject(txn.error);
      })
    }

    function closeDatabase (dbName) {
      // close any open requests
      const req = openIndexedDBRequests[dbName];
      const db = req && req.result;
      if (db) {
        db.close();
        const listeners = onCloseListeners[dbName];
        /* istanbul ignore else */
        if (listeners) {
          for (const listener of listeners) {
            listener();
          }
        }
      }
      delete openIndexedDBRequests[dbName];
      delete databaseCache[dbName];
      delete onCloseListeners[dbName];
    }

    function deleteDatabase (dbName) {
      return new Promise((resolve, reject) => {
        // close any open requests
        closeDatabase(dbName);
        const req = indexedDB.deleteDatabase(dbName);
        handleOpenOrDeleteReq(resolve, reject, req);
      })
    }

    // The "close" event occurs during an abnormal shutdown, e.g. a user clearing their browser data.
    // However, it doesn't occur with the normal "close" event, so we handle that separately.
    // https://www.w3.org/TR/IndexedDB/#close-a-database-connection
    function addOnCloseListener (dbName, listener) {
      let listeners = onCloseListeners[dbName];
      if (!listeners) {
        listeners = onCloseListeners[dbName] = [];
      }
      listeners.push(listener);
    }

    // list of emoticons that don't match a simple \W+ regex
    // extracted using:
    // require('emoji-picker-element-data/en/emojibase/data.json').map(_ => _.emoticon).filter(Boolean).filter(_ => !/^\W+$/.test(_))
    const irregularEmoticons = new Set([
      ':D', 'XD', ":'D", 'O:)',
      ':X', ':P', ';P', 'XP',
      ':L', ':Z', ':j', '8D',
      'XO', '8)', ':B', ':O',
      ':S', ":'o", 'Dx', 'X(',
      'D:', ':C', '>0)', ':3',
      '</3', '<3', '\\M/', ':E',
      '8#'
    ]);

    function extractTokens (str) {
      return str
        .split(/[\s_]+/)
        .map(word => {
          if (!word.match(/\w/) || irregularEmoticons.has(word)) {
            // for pure emoticons like :) or :-), just leave them as-is
            return word.toLowerCase()
          }

          return word
            .replace(/[)(:,]/g, '')
            .replace(/’/g, "'")
            .toLowerCase()
        }).filter(Boolean)
    }

    const MIN_SEARCH_TEXT_LENGTH$1 = 2;

    // This is an extra step in addition to extractTokens(). The difference here is that we expect
    // the input to have already been run through extractTokens(). This is useful for cases like
    // emoticons, where we don't want to do any tokenization (because it makes no sense to split up
    // ">:)" by the colon) but we do want to lowercase it to have consistent search results, so that
    // the user can type ':P' or ':p' and still get the same result.
    function normalizeTokens (str) {
      return str
        .filter(Boolean)
        .map(_ => _.toLowerCase())
        .filter(_ => _.length >= MIN_SEARCH_TEXT_LENGTH$1)
    }

    // Transform emoji data for storage in IDB
    function transformEmojiData (emojiData) {
      const res = emojiData.map(({ annotation, emoticon, group, order, shortcodes, skins, tags, emoji, version }) => {
        const tokens = [...new Set(
          normalizeTokens([
            ...(shortcodes || []).map(extractTokens).flat(),
            ...(tags || []).map(extractTokens).flat(),
            ...extractTokens(annotation),
            emoticon
          ])
        )].sort();
        const res = {
          annotation,
          group,
          order,
          tags,
          tokens,
          unicode: emoji,
          version
        };
        if (emoticon) {
          res.emoticon = emoticon;
        }
        if (shortcodes) {
          res.shortcodes = shortcodes;
        }
        if (skins) {
          res.skinTones = [];
          res.skinUnicodes = [];
          res.skinVersions = [];
          for (const { tone, emoji, version } of skins) {
            res.skinTones.push(tone);
            res.skinUnicodes.push(emoji);
            res.skinVersions.push(version);
          }
        }
        return res
      });
      return res
    }

    // helper functions that help compress the code better

    function callStore (store, method, key, cb) {
      store[method](key).onsuccess = e => (cb && cb(e.target.result));
    }

    function getIDB (store, key, cb) {
      callStore(store, 'get', key, cb);
    }

    function getAllIDB (store, key, cb) {
      callStore(store, 'getAll', key, cb);
    }

    function commit (txn) {
      /* istanbul ignore else */
      if (txn.commit) {
        txn.commit();
      }
    }

    // like lodash's minBy
    function minBy (array, func) {
      let minItem = array[0];
      for (let i = 1; i < array.length; i++) {
        const item = array[i];
        if (func(minItem) > func(item)) {
          minItem = item;
        }
      }
      return minItem
    }

    // return an array of results representing all items that are found in each one of the arrays
    //

    function findCommonMembers (arrays, uniqByFunc) {
      const shortestArray = minBy(arrays, _ => _.length);
      const results = [];
      for (const item of shortestArray) {
        // if this item is included in every array in the intermediate results, add it to the final results
        if (!arrays.some(array => array.findIndex(_ => uniqByFunc(_) === uniqByFunc(item)) === -1)) {
          results.push(item);
        }
      }
      return results
    }

    async function isEmpty (db) {
      return !(await get(db, STORE_KEYVALUE, KEY_URL))
    }

    async function hasData (db, url, eTag) {
      const [oldETag, oldUrl] = await Promise.all([KEY_ETAG, KEY_URL]
        .map(key => get(db, STORE_KEYVALUE, key)));
      return (oldETag === eTag && oldUrl === url)
    }

    async function doFullDatabaseScanForSingleResult (db, predicate) {
      // This batching algorithm is just a perf improvement over a basic
      // cursor. The BATCH_SIZE is an estimate of what would give the best
      // perf for doing a full DB scan (worst case).
      //
      // Mini-benchmark for determining the best batch size:
      //
      // PERF=1 pnpm build:rollup && pnpm test:adhoc
      //
      // (async () => {
      //   performance.mark('start')
      //   await $('emoji-picker').database.getEmojiByShortcode('doesnotexist')
      //   performance.measure('total', 'start')
      //   console.log(performance.getEntriesByName('total').slice(-1)[0].duration)
      // })()
      const BATCH_SIZE = 50; // Typically around 150ms for 6x slowdown in Chrome for above benchmark
      return dbPromise(db, STORE_EMOJI, MODE_READONLY, (emojiStore, txn, cb) => {
        let lastKey;

        const processNextBatch = () => {
          emojiStore.getAll(lastKey && IDBKeyRange.lowerBound(lastKey, true), BATCH_SIZE).onsuccess = e => {
            const results = e.target.result;
            for (const result of results) {
              lastKey = result.unicode;
              if (predicate(result)) {
                return cb(result)
              }
            }
            if (results.length < BATCH_SIZE) {
              return cb()
            }
            processNextBatch();
          };
        };
        processNextBatch();
      })
    }

    async function loadData (db, emojiData, url, eTag) {
      try {
        const transformedData = transformEmojiData(emojiData);
        await dbPromise(db, [STORE_EMOJI, STORE_KEYVALUE], MODE_READWRITE, ([emojiStore, metaStore], txn) => {
          let oldETag;
          let oldUrl;
          let todo = 0;

          function checkFetched () {
            if (++todo === 2) { // 2 requests made
              onFetched();
            }
          }

          function onFetched () {
            if (oldETag === eTag && oldUrl === url) {
              // check again within the transaction to guard against concurrency, e.g. multiple browser tabs
              return
            }
            // delete old data
            emojiStore.clear();
            // insert new data
            for (const data of transformedData) {
              emojiStore.put(data);
            }
            metaStore.put(eTag, KEY_ETAG);
            metaStore.put(url, KEY_URL);
            commit(txn);
          }

          getIDB(metaStore, KEY_ETAG, result => {
            oldETag = result;
            checkFetched();
          });

          getIDB(metaStore, KEY_URL, result => {
            oldUrl = result;
            checkFetched();
          });
        });
      } finally {
      }
    }

    async function getEmojiByGroup (db, group) {
      return dbPromise(db, STORE_EMOJI, MODE_READONLY, (emojiStore, txn, cb) => {
        const range = IDBKeyRange.bound([group, 0], [group + 1, 0], false, true);
        getAllIDB(emojiStore.index(INDEX_GROUP_AND_ORDER), range, cb);
      })
    }

    async function getEmojiBySearchQuery (db, query) {
      const tokens = normalizeTokens(extractTokens(query));

      if (!tokens.length) {
        return []
      }

      return dbPromise(db, STORE_EMOJI, MODE_READONLY, (emojiStore, txn, cb) => {
        // get all results that contain all tokens (i.e. an AND query)
        const intermediateResults = [];

        const checkDone = () => {
          if (intermediateResults.length === tokens.length) {
            onDone();
          }
        };

        const onDone = () => {
          const results = findCommonMembers(intermediateResults, _ => _.unicode);
          cb(results.sort((a, b) => a.order < b.order ? -1 : 1));
        };

        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          const range = i === tokens.length - 1
            ? IDBKeyRange.bound(token, token + '\uffff', false, true) // treat last token as a prefix search
            : IDBKeyRange.only(token); // treat all other tokens as an exact match
          getAllIDB(emojiStore.index(INDEX_TOKENS), range, result => {
            intermediateResults.push(result);
            checkDone();
          });
        }
      })
    }

    // This could have been implemented as an IDB index on shortcodes, but it seemed wasteful to do that
    // when we can already query by tokens and this will give us what we're looking for 99.9% of the time
    async function getEmojiByShortcode (db, shortcode) {
      const emojis = await getEmojiBySearchQuery(db, shortcode);

      // In very rare cases (e.g. the shortcode "v" as in "v for victory"), we cannot search because
      // there are no usable tokens (too short in this case). In that case, we have to do an inefficient
      // full-database scan, which I believe is an acceptable tradeoff for not having to have an extra
      // index on shortcodes.

      if (!emojis.length) {
        const predicate = _ => ((_.shortcodes || []).includes(shortcode.toLowerCase()));
        return (await doFullDatabaseScanForSingleResult(db, predicate)) || null
      }

      return emojis.filter(_ => {
        const lowerShortcodes = (_.shortcodes || []).map(_ => _.toLowerCase());
        return lowerShortcodes.includes(shortcode.toLowerCase())
      })[0] || null
    }

    async function getEmojiByUnicode (db, unicode) {
      return dbPromise(db, STORE_EMOJI, MODE_READONLY, (emojiStore, txn, cb) => (
        getIDB(emojiStore, unicode, result => {
          if (result) {
            return cb(result)
          }
          getIDB(emojiStore.index(INDEX_SKIN_UNICODE), unicode, result => cb(result || null));
        })
      ))
    }

    function get (db, storeName, key) {
      return dbPromise(db, storeName, MODE_READONLY, (store, txn, cb) => (
        getIDB(store, key, cb)
      ))
    }

    function set (db, storeName, key, value) {
      return dbPromise(db, storeName, MODE_READWRITE, (store, txn) => {
        store.put(value, key);
        commit(txn);
      })
    }

    function incrementFavoriteEmojiCount (db, unicode) {
      return dbPromise(db, STORE_FAVORITES, MODE_READWRITE, (store, txn) => (
        getIDB(store, unicode, result => {
          store.put((result || 0) + 1, unicode);
          commit(txn);
        })
      ))
    }

    function getTopFavoriteEmoji (db, customEmojiIndex, limit) {
      if (limit === 0) {
        return []
      }
      return dbPromise(db, [STORE_FAVORITES, STORE_EMOJI], MODE_READONLY, ([favoritesStore, emojiStore], txn, cb) => {
        const results = [];
        favoritesStore.index(INDEX_COUNT).openCursor(undefined, 'prev').onsuccess = e => {
          const cursor = e.target.result;
          if (!cursor) { // no more results
            return cb(results)
          }

          function addResult (result) {
            results.push(result);
            if (results.length === limit) {
              return cb(results) // done, reached the limit
            }
            cursor.continue();
          }

          const unicodeOrName = cursor.primaryKey;
          const custom = customEmojiIndex.byName(unicodeOrName);
          if (custom) {
            return addResult(custom)
          }
          // This could be done in parallel (i.e. make the cursor and the get()s parallelized),
          // but my testing suggests it's not actually faster.
          getIDB(emojiStore, unicodeOrName, emoji => {
            if (emoji) {
              return addResult(emoji)
            }
            // emoji not found somehow, ignore (may happen if custom emoji change)
            cursor.continue();
          });
        };
      })
    }

    // trie data structure for prefix searches
    // loosely based on https://github.com/nolanlawson/substring-trie

    const CODA_MARKER = ''; // marks the end of the string

    function trie (arr, itemToTokens) {
      const map = new Map();
      for (const item of arr) {
        const tokens = itemToTokens(item);
        for (const token of tokens) {
          let currentMap = map;
          for (let i = 0; i < token.length; i++) {
            const char = token.charAt(i);
            let nextMap = currentMap.get(char);
            if (!nextMap) {
              nextMap = new Map();
              currentMap.set(char, nextMap);
            }
            currentMap = nextMap;
          }
          let valuesAtCoda = currentMap.get(CODA_MARKER);
          if (!valuesAtCoda) {
            valuesAtCoda = [];
            currentMap.set(CODA_MARKER, valuesAtCoda);
          }
          valuesAtCoda.push(item);
        }
      }

      const search = (query, exact) => {
        let currentMap = map;
        for (let i = 0; i < query.length; i++) {
          const char = query.charAt(i);
          const nextMap = currentMap.get(char);
          if (nextMap) {
            currentMap = nextMap;
          } else {
            return []
          }
        }

        if (exact) {
          const results = currentMap.get(CODA_MARKER);
          return results || []
        }

        const results = [];
        // traverse
        const queue = [currentMap];
        while (queue.length) {
          const currentMap = queue.shift();
          const entriesSortedByKey = [...currentMap.entries()].sort((a, b) => a[0] < b[0] ? -1 : 1);
          for (const [key, value] of entriesSortedByKey) {
            if (key === CODA_MARKER) { // CODA_MARKER always comes first; it's the empty string
              results.push(...value);
            } else {
              queue.push(value);
            }
          }
        }
        return results
      };

      return search
    }

    const requiredKeys$1 = [
      'name',
      'url'
    ];

    function assertCustomEmojis (customEmojis) {
      const isArray = customEmojis && Array.isArray(customEmojis);
      const firstItemIsFaulty = isArray &&
        customEmojis.length &&
        (!customEmojis[0] || requiredKeys$1.some(key => !(key in customEmojis[0])));
      if (!isArray || firstItemIsFaulty) {
        throw new Error('Custom emojis are in the wrong format')
      }
    }

    function customEmojiIndex (customEmojis) {
      assertCustomEmojis(customEmojis);

      const sortByName = (a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;

      //
      // all()
      //
      const all = customEmojis.sort(sortByName);

      //
      // search()
      //
      const emojiToTokens = emoji => {
        const set = new Set();
        if (emoji.shortcodes) {
          for (const shortcode of emoji.shortcodes) {
            for (const token of extractTokens(shortcode)) {
              set.add(token);
            }
          }
        }
        return set
      };
      const searchTrie = trie(customEmojis, emojiToTokens);
      const searchByExactMatch = _ => searchTrie(_, true);
      const searchByPrefix = _ => searchTrie(_, false);

      // Search by query for custom emoji. Similar to how we do this in IDB, the last token
      // is treated as a prefix search, but every other one is treated as an exact match.
      // Then we AND the results together
      const search = query => {
        const tokens = extractTokens(query);
        const intermediateResults = tokens.map((token, i) => (
          (i < tokens.length - 1 ? searchByExactMatch : searchByPrefix)(token)
        ));
        return findCommonMembers(intermediateResults, _ => _.name).sort(sortByName)
      };

      //
      // byShortcode, byName
      //
      const shortcodeToEmoji = new Map();
      const nameToEmoji = new Map();
      for (const customEmoji of customEmojis) {
        nameToEmoji.set(customEmoji.name.toLowerCase(), customEmoji);
        for (const shortcode of (customEmoji.shortcodes || [])) {
          shortcodeToEmoji.set(shortcode.toLowerCase(), customEmoji);
        }
      }

      const byShortcode = shortcode => shortcodeToEmoji.get(shortcode.toLowerCase());
      const byName = name => nameToEmoji.get(name.toLowerCase());

      return {
        all,
        search,
        byShortcode,
        byName
      }
    }

    const isFirefoxContentScript = typeof wrappedJSObject !== 'undefined';

    // remove some internal implementation details, i.e. the "tokens" array on the emoji object
    // essentially, convert the emoji from the version stored in IDB to the version used in-memory
    function cleanEmoji (emoji) {
      if (!emoji) {
        return emoji
      }
      // if inside a Firefox content script, need to clone the emoji object to prevent Firefox from complaining about
      // cross-origin object. See: https://github.com/nolanlawson/emoji-picker-element/issues/356
      /* istanbul ignore if */
      if (isFirefoxContentScript) {
        emoji = structuredClone(emoji);
      }
      delete emoji.tokens;
      if (emoji.skinTones) {
        const len = emoji.skinTones.length;
        emoji.skins = Array(len);
        for (let i = 0; i < len; i++) {
          emoji.skins[i] = {
            tone: emoji.skinTones[i],
            unicode: emoji.skinUnicodes[i],
            version: emoji.skinVersions[i]
          };
        }
        delete emoji.skinTones;
        delete emoji.skinUnicodes;
        delete emoji.skinVersions;
      }
      return emoji
    }

    function warnETag (eTag) {
      if (!eTag) {
        console.warn('emoji-picker-element is more efficient if the dataSource server exposes an ETag header.');
      }
    }

    const requiredKeys = [
      'annotation',
      'emoji',
      'group',
      'order',
      'version'
    ];

    function assertEmojiData (emojiData) {
      if (!emojiData ||
        !Array.isArray(emojiData) ||
        !emojiData[0] ||
        (typeof emojiData[0] !== 'object') ||
        requiredKeys.some(key => (!(key in emojiData[0])))) {
        throw new Error('Emoji data is in the wrong format')
      }
    }

    function assertStatus (response, dataSource) {
      if (Math.floor(response.status / 100) !== 2) {
        throw new Error('Failed to fetch: ' + dataSource + ':  ' + response.status)
      }
    }

    async function getETag (dataSource) {
      const response = await fetch(dataSource, { method: 'HEAD' });
      assertStatus(response, dataSource);
      const eTag = response.headers.get('etag');
      warnETag(eTag);
      return eTag
    }

    async function getETagAndData (dataSource) {
      const response = await fetch(dataSource);
      assertStatus(response, dataSource);
      const eTag = response.headers.get('etag');
      warnETag(eTag);
      const emojiData = await response.json();
      assertEmojiData(emojiData);
      return [eTag, emojiData]
    }

    // TODO: including these in blob-util.ts causes typedoc to generate docs for them,
    // even with --excludePrivate ¯\_(ツ)_/¯
    /** @private */
    /**
     * Convert an `ArrayBuffer` to a binary string.
     *
     * Example:
     *
     * ```js
     * var myString = blobUtil.arrayBufferToBinaryString(arrayBuff)
     * ```
     *
     * @param buffer - array buffer
     * @returns binary string
     */
    function arrayBufferToBinaryString(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var length = bytes.byteLength;
        var i = -1;
        while (++i < length) {
            binary += String.fromCharCode(bytes[i]);
        }
        return binary;
    }
    /**
     * Convert a binary string to an `ArrayBuffer`.
     *
     * ```js
     * var myBuffer = blobUtil.binaryStringToArrayBuffer(binaryString)
     * ```
     *
     * @param binary - binary string
     * @returns array buffer
     */
    function binaryStringToArrayBuffer(binary) {
        var length = binary.length;
        var buf = new ArrayBuffer(length);
        var arr = new Uint8Array(buf);
        var i = -1;
        while (++i < length) {
            arr[i] = binary.charCodeAt(i);
        }
        return buf;
    }

    // generate a checksum based on the stringified JSON
    async function jsonChecksum (object) {
      const inString = JSON.stringify(object);
      let inBuffer = binaryStringToArrayBuffer(inString);

      // this does not need to be cryptographically secure, SHA-1 is fine
      const outBuffer = await crypto.subtle.digest('SHA-1', inBuffer);
      const outBinString = arrayBufferToBinaryString(outBuffer);
      const res = btoa(outBinString);
      return res
    }

    async function checkForUpdates (db, dataSource) {
      // just do a simple HEAD request first to see if the eTags match
      let emojiData;
      let eTag = await getETag(dataSource);
      if (!eTag) { // work around lack of ETag/Access-Control-Expose-Headers
        const eTagAndData = await getETagAndData(dataSource);
        eTag = eTagAndData[0];
        emojiData = eTagAndData[1];
        if (!eTag) {
          eTag = await jsonChecksum(emojiData);
        }
      }
      if (await hasData(db, dataSource, eTag)) ; else {
        if (!emojiData) {
          const eTagAndData = await getETagAndData(dataSource);
          emojiData = eTagAndData[1];
        }
        await loadData(db, emojiData, dataSource, eTag);
      }
    }

    async function loadDataForFirstTime (db, dataSource) {
      let [eTag, emojiData] = await getETagAndData(dataSource);
      if (!eTag) {
        // Handle lack of support for ETag or Access-Control-Expose-Headers
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers#Browser_compatibility
        eTag = await jsonChecksum(emojiData);
      }

      await loadData(db, emojiData, dataSource, eTag);
    }

    class Database {
      constructor ({ dataSource = DEFAULT_DATA_SOURCE$1, locale = DEFAULT_LOCALE$1, customEmoji = [] } = {}) {
        this.dataSource = dataSource;
        this.locale = locale;
        this._dbName = `emoji-picker-element-${this.locale}`;
        this._db = undefined;
        this._lazyUpdate = undefined;
        this._custom = customEmojiIndex(customEmoji);

        this._clear = this._clear.bind(this);
        this._ready = this._init();
      }

      async _init () {
        const db = this._db = await openDatabase(this._dbName);

        addOnCloseListener(this._dbName, this._clear);
        const dataSource = this.dataSource;
        const empty = await isEmpty(db);

        if (empty) {
          await loadDataForFirstTime(db, dataSource);
        } else { // offline-first - do an update asynchronously
          this._lazyUpdate = checkForUpdates(db, dataSource);
        }
      }

      async ready () {
        const checkReady = async () => {
          if (!this._ready) {
            this._ready = this._init();
          }
          return this._ready
        };
        await checkReady();
        // There's a possibility of a race condition where the element gets added, removed, and then added again
        // with a particular timing, which would set the _db to undefined.
        // We *could* do a while loop here, but that seems excessive and could lead to an infinite loop.
        if (!this._db) {
          await checkReady();
        }
      }

      async getEmojiByGroup (group) {
        assertNumber(group);
        await this.ready();
        return uniqEmoji(await getEmojiByGroup(this._db, group)).map(cleanEmoji)
      }

      async getEmojiBySearchQuery (query) {
        assertNonEmptyString(query);
        await this.ready();
        const customs = this._custom.search(query);
        const natives = uniqEmoji(await getEmojiBySearchQuery(this._db, query)).map(cleanEmoji);
        return [
          ...customs,
          ...natives
        ]
      }

      async getEmojiByShortcode (shortcode) {
        assertNonEmptyString(shortcode);
        await this.ready();
        const custom = this._custom.byShortcode(shortcode);
        if (custom) {
          return custom
        }
        return cleanEmoji(await getEmojiByShortcode(this._db, shortcode))
      }

      async getEmojiByUnicodeOrName (unicodeOrName) {
        assertNonEmptyString(unicodeOrName);
        await this.ready();
        const custom = this._custom.byName(unicodeOrName);
        if (custom) {
          return custom
        }
        return cleanEmoji(await getEmojiByUnicode(this._db, unicodeOrName))
      }

      async getPreferredSkinTone () {
        await this.ready();
        return (await get(this._db, STORE_KEYVALUE, KEY_PREFERRED_SKINTONE)) || 0
      }

      async setPreferredSkinTone (skinTone) {
        assertNumber(skinTone);
        await this.ready();
        return set(this._db, STORE_KEYVALUE, KEY_PREFERRED_SKINTONE, skinTone)
      }

      async incrementFavoriteEmojiCount (unicodeOrName) {
        assertNonEmptyString(unicodeOrName);
        await this.ready();
        return incrementFavoriteEmojiCount(this._db, unicodeOrName)
      }

      async getTopFavoriteEmoji (limit) {
        assertNumber(limit);
        await this.ready();
        return (await getTopFavoriteEmoji(this._db, this._custom, limit)).map(cleanEmoji)
      }

      set customEmoji (customEmojis) {
        this._custom = customEmojiIndex(customEmojis);
      }

      get customEmoji () {
        return this._custom.all
      }

      async _shutdown () {
        await this.ready(); // reopen if we've already been closed/deleted
        try {
          await this._lazyUpdate; // allow any lazy updates to process before closing/deleting
        } catch (err) { /* ignore network errors (offline-first) */ }
      }

      // clear references to IDB, e.g. during a close event
      _clear () {
        // We don't need to call removeEventListener or remove the manual "close" listeners.
        // The memory leak tests prove this is unnecessary. It's because:
        // 1) IDBDatabases that can no longer fire "close" automatically have listeners GCed
        // 2) we clear the manual close listeners in databaseLifecycle.js.
        this._db = this._ready = this._lazyUpdate = undefined;
      }

      async close () {
        await this._shutdown();
        await closeDatabase(this._dbName);
      }

      async delete () {
        await this._shutdown();
        await deleteDatabase(this._dbName);
      }
    }

    // via https://unpkg.com/browse/emojibase-data@6.0.0/meta/groups.json
    const allGroups = [
      [-1, '✨', 'custom'],
      [0, '😀', 'smileys-emotion'],
      [1, '👋', 'people-body'],
      [3, '🐱', 'animals-nature'],
      [4, '🍎', 'food-drink'],
      [5, '🏠️', 'travel-places'],
      [6, '⚽', 'activities'],
      [7, '📝', 'objects'],
      [8, '⛔️', 'symbols'],
      [9, '🏁', 'flags']
    ].map(([id, emoji, name]) => ({ id, emoji, name }));

    const groups = allGroups.slice(1);

    const MIN_SEARCH_TEXT_LENGTH = 2;
    const NUM_SKIN_TONES = 6;

    /* istanbul ignore next */
    const rIC = typeof requestIdleCallback === 'function' ? requestIdleCallback : setTimeout;

    // check for ZWJ (zero width joiner) character
    function hasZwj (emoji) {
      return emoji.unicode.includes('\u200d')
    }

    // Find one good representative emoji from each version to test by checking its color.
    // Ideally it should have color in the center. For some inspiration, see:
    // https://about.gitlab.com/blog/2018/05/30/journey-in-native-unicode-emoji/
    //
    // Note that for certain versions (12.1, 13.1), there is no point in testing them explicitly, because
    // all the emoji from this version are compound-emoji from previous versions. So they would pass a color
    // test, even in browsers that display them as double emoji. (E.g. "face in clouds" might render as
    // "face without mouth" plus "fog".) These emoji can only be filtered using the width test,
    // which happens in checkZwjSupport.js.
    const versionsAndTestEmoji = {
      '🫨': 15.1, // shaking head, technically from v15 but see note above
      '🫠': 14,
      '🥲': 13.1, // smiling face with tear, technically from v13 but see note above
      '🥻': 12.1, // sari, technically from v12 but see note above
      '🥰': 11,
      '🤩': 5,
      '👱‍♀️': 4,
      '🤣': 3,
      '👁️‍🗨️': 2,
      '😀': 1,
      '😐️': 0.7,
      '😃': 0.6
    };

    const TIMEOUT_BEFORE_LOADING_MESSAGE = 1000; // 1 second
    const DEFAULT_SKIN_TONE_EMOJI = '🖐️';
    const DEFAULT_NUM_COLUMNS = 8;

    // Based on https://fivethirtyeight.com/features/the-100-most-used-emojis/ and
    // https://blog.emojipedia.org/facebook-reveals-most-and-least-used-emojis/ with
    // a bit of my own curation. (E.g. avoid the "OK" gesture because of connotations:
    // https://emojipedia.org/ok-hand/)
    const MOST_COMMONLY_USED_EMOJI = [
      '😊',
      '😒',
      '❤️',
      '👍️',
      '😍',
      '😂',
      '😭',
      '☺️',
      '😔',
      '😩',
      '😏',
      '💕',
      '🙌',
      '😘'
    ];

    // It's important to list Twemoji Mozilla before everything else, because Mozilla bundles their
    // own font on some platforms (notably Windows and Linux as of this writing). Typically, Mozilla
    // updates faster than the underlying OS, and we don't want to render older emoji in one font and
    // newer emoji in another font:
    // https://github.com/nolanlawson/emoji-picker-element/pull/268#issuecomment-1073347283
    const FONT_FAMILY = '"Twemoji Mozilla","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",' +
      '"Noto Color Emoji","EmojiOne Color","Android Emoji",sans-serif';

    /* istanbul ignore next */
    const DEFAULT_CATEGORY_SORTING = (a, b) => a < b ? -1 : a > b ? 1 : 0;

    // Test if an emoji is supported by rendering it to canvas and checking that the color is not black
    // See https://about.gitlab.com/blog/2018/05/30/journey-in-native-unicode-emoji/
    // and https://www.npmjs.com/package/if-emoji for inspiration
    // This implementation is largely borrowed from if-emoji, adding the font-family


    const getTextFeature = (text, color) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;

      const ctx = canvas.getContext('2d', {
        // Improves the performance of `getImageData()`
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getContextAttributes#willreadfrequently
        willReadFrequently: true
      });
      ctx.textBaseline = 'top';
      ctx.font = `100px ${FONT_FAMILY}`;
      ctx.fillStyle = color;
      ctx.scale(0.01, 0.01);
      ctx.fillText(text, 0, 0);

      return ctx.getImageData(0, 0, 1, 1).data
    };

    const compareFeatures = (feature1, feature2) => {
      const feature1Str = [...feature1].join(',');
      const feature2Str = [...feature2].join(',');
      // This is RGBA, so for 0,0,0, we are checking that the first RGB is not all zeroes.
      // Most of the time when unsupported this is 0,0,0,0, but on Chrome on Mac it is
      // 0,0,0,61 - there is a transparency here.
      return feature1Str === feature2Str && !feature1Str.startsWith('0,0,0,')
    };

    function testColorEmojiSupported (text) {
      // Render white and black and then compare them to each other and ensure they're the same
      // color, and neither one is black. This shows that the emoji was rendered in color.
      const feature1 = getTextFeature(text, '#000');
      const feature2 = getTextFeature(text, '#fff');
      return feature1 && feature2 && compareFeatures(feature1, feature2)
    }

    // rather than check every emoji ever, which would be expensive, just check some representatives from the
    // different emoji releases to determine what the font supports

    function determineEmojiSupportLevel () {
      const entries = Object.entries(versionsAndTestEmoji);
      try {
        // start with latest emoji and work backwards
        for (const [emoji, version] of entries) {
          if (testColorEmojiSupported(emoji)) {
            return version
          }
        }
      } catch (e) { // canvas error
      } finally {
      }
      // In case of an error, be generous and just assume all emoji are supported (e.g. for canvas errors
      // due to anti-fingerprinting add-ons). Better to show some gray boxes than nothing at all.
      return entries[0][1] // first one in the list is the most recent version
    }

    // Check which emojis we know for sure aren't supported, based on Unicode version level
    let promise;
    const detectEmojiSupportLevel = () => {
      if (!promise) {
        // Delay so it can run while the IDB database is being created by the browser (on another thread).
        // This helps especially with first load – we want to start pre-populating the database on the main thread,
        // and then wait for IDB to commit everything, and while waiting we run this check.
        promise = new Promise(resolve => (
          rIC(() => (
            resolve(determineEmojiSupportLevel()) // delay so ideally this can run while IDB is first populating
          ))
        ));
      }
      return promise
    };
    // determine which emojis containing ZWJ (zero width joiner) characters
    // are supported (rendered as one glyph) rather than unsupported (rendered as two or more glyphs)
    const supportedZwjEmojis = new Map();

    const VARIATION_SELECTOR = '\ufe0f';
    const SKINTONE_MODIFIER = '\ud83c';
    const ZWJ = '\u200d';
    const LIGHT_SKIN_TONE = 0x1F3FB;
    const LIGHT_SKIN_TONE_MODIFIER = 0xdffb;

    // TODO: this is a naive implementation, we can improve it later
    // It's only used for the skintone picker, so as long as people don't customize with
    // really exotic emoji then it should work fine
    function applySkinTone (str, skinTone) {
      if (skinTone === 0) {
        return str
      }
      const zwjIndex = str.indexOf(ZWJ);
      if (zwjIndex !== -1) {
        return str.substring(0, zwjIndex) +
          String.fromCodePoint(LIGHT_SKIN_TONE + skinTone - 1) +
          str.substring(zwjIndex)
      }
      if (str.endsWith(VARIATION_SELECTOR)) {
        str = str.substring(0, str.length - 1);
      }
      return str + SKINTONE_MODIFIER + String.fromCodePoint(LIGHT_SKIN_TONE_MODIFIER + skinTone - 1)
    }

    function halt (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Implementation left/right or up/down navigation, circling back when you
    // reach the start/end of the list
    function incrementOrDecrement (decrement, val, arr) {
      val += (decrement ? -1 : 1);
      if (val < 0) {
        val = arr.length - 1;
      } else if (val >= arr.length) {
        val = 0;
      }
      return val
    }

    // like lodash's uniqBy but much smaller
    function uniqBy (arr, func) {
      const set = new Set();
      const res = [];
      for (const item of arr) {
        const key = func(item);
        if (!set.has(key)) {
          set.add(key);
          res.push(item);
        }
      }
      return res
    }

    // We don't need all the data on every emoji, and there are specific things we need
    // for the UI, so build a "view model" from the emoji object we got from the database

    function summarizeEmojisForUI (emojis, emojiSupportLevel) {
      const toSimpleSkinsMap = skins => {
        const res = {};
        for (const skin of skins) {
          // ignore arrays like [1, 2] with multiple skin tones
          // also ignore variants that are in an unsupported emoji version
          // (these do exist - variants from a different version than their base emoji)
          if (typeof skin.tone === 'number' && skin.version <= emojiSupportLevel) {
            res[skin.tone] = skin.unicode;
          }
        }
        return res
      };

      return emojis.map(({ unicode, skins, shortcodes, url, name, category, annotation }) => ({
        unicode,
        name,
        shortcodes,
        url,
        category,
        annotation,
        id: unicode || name,
        skins: skins && toSimpleSkinsMap(skins)
      }))
    }

    // import rAF from one place so that the bundle size is a bit smaller
    const rAF = requestAnimationFrame;

    // "Svelte action"-like utility to detect layout changes via ResizeObserver.
    // If ResizeObserver is unsupported, we just use rAF once and don't bother to update.


    let resizeObserverSupported = typeof ResizeObserver === 'function';

    function resizeObserverAction (node, abortSignal, onUpdate) {
      let resizeObserver;
      if (resizeObserverSupported) {
        resizeObserver = new ResizeObserver(onUpdate);
        resizeObserver.observe(node);
      } else { // just run once, don't bother trying to track it
        rAF(onUpdate);
      }

      // cleanup function (called on destroy)
      abortSignal.addEventListener('abort', () => {
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      });
    }

    // get the width of the text inside of a DOM node, via https://stackoverflow.com/a/59525891/680742
    function calculateTextWidth (node) {
      // skip running this in jest/vitest because we don't need to check for emoji support in that environment
      /* istanbul ignore else */
      {
        const range = document.createRange();
        range.selectNode(node.firstChild);
        return range.getBoundingClientRect().width
      }
    }

    let baselineEmojiWidth;

    /**
     * Check if the given emojis containing ZWJ characters are supported by the current browser (don't render
     * as double characters) and return true if all are supported.
     * @param zwjEmojisToCheck
     * @param baselineEmoji
     * @param emojiToDomNode
     */
    function checkZwjSupport (zwjEmojisToCheck, baselineEmoji, emojiToDomNode) {
      let allSupported = true;
      for (const emoji of zwjEmojisToCheck) {
        const domNode = emojiToDomNode(emoji);
        const emojiWidth = calculateTextWidth(domNode);
        if (typeof baselineEmojiWidth === 'undefined') { // calculate the baseline emoji width only once
          baselineEmojiWidth = calculateTextWidth(baselineEmoji);
        }
        // On Windows, some supported emoji are ~50% bigger than the baseline emoji, but what we really want to guard
        // against are the ones that are 2x the size, because those are truly broken (person with red hair = person with
        // floating red wig, black cat = cat with black square, polar bear = bear with snowflake, etc.)
        // So here we set the threshold at 1.8 times the size of the baseline emoji.
        const supported = emojiWidth / 1.8 < baselineEmojiWidth;
        supportedZwjEmojis.set(emoji.unicode, supported);

        if (!supported) {
          allSupported = false;
        }
      }
      return allSupported
    }

    // like lodash's uniq

    function uniq (arr) {
      return uniqBy(arr, _ => _)
    }

    // Note we put this in its own function outside Picker.js to avoid Svelte doing an invalidation on the "setter" here.
    // At best the invalidation is useless, at worst it can cause infinite loops:
    // https://github.com/nolanlawson/emoji-picker-element/pull/180
    // https://github.com/sveltejs/svelte/issues/6521
    // Also note tabpanelElement can be null if the element is disconnected immediately after connected
    function resetScrollTopIfPossible (element) {
      /* istanbul ignore else */
      if (element) { // Makes me nervous not to have this `if` guard
        element.scrollTop = 0;
      }
    }

    function getFromMap (cache, key, func) {
      let cached = cache.get(key);
      if (!cached) {
        cached = func();
        cache.set(key, cached);
      }
      return cached
    }

    function toString (value) {
      return '' + value
    }

    function parseTemplate (htmlString) {
      const template = document.createElement('template');
      template.innerHTML = htmlString;
      return template
    }

    const parseCache = new WeakMap();
    const domInstancesCache = new WeakMap();
    // This needs to be a symbol because it needs to be different from any possible output of a key function
    const unkeyedSymbol = Symbol('un-keyed');

    // Not supported in Safari <=13
    const hasReplaceChildren = 'replaceChildren' in Element.prototype;
    function replaceChildren (parentNode, newChildren) {
      /* istanbul ignore else */
      if (hasReplaceChildren) {
        parentNode.replaceChildren(...newChildren);
      } else { // minimal polyfill for Element.prototype.replaceChildren
        parentNode.innerHTML = '';
        parentNode.append(...newChildren);
      }
    }

    function doChildrenNeedRerender (parentNode, newChildren) {
      let oldChild = parentNode.firstChild;
      let oldChildrenCount = 0;
      // iterate using firstChild/nextSibling because browsers use a linked list under the hood
      while (oldChild) {
        const newChild = newChildren[oldChildrenCount];
        // check if the old child and new child are the same
        if (newChild !== oldChild) {
          return true
        }
        oldChild = oldChild.nextSibling;
        oldChildrenCount++;
      }
      // if new children length is different from old, we must re-render
      return oldChildrenCount !== newChildren.length
    }

    function patchChildren (newChildren, instanceBinding) {
      const { targetNode } = instanceBinding;
      let { targetParentNode } = instanceBinding;

      let needsRerender = false;

      if (targetParentNode) { // already rendered once
        needsRerender = doChildrenNeedRerender(targetParentNode, newChildren);
      } else { // first render of list
        needsRerender = true;
        instanceBinding.targetNode = undefined; // placeholder node not needed anymore, free memory
        instanceBinding.targetParentNode = targetParentNode = targetNode.parentNode;
      }
      // avoid re-rendering list if the dom nodes are exactly the same before and after
      if (needsRerender) {
        replaceChildren(targetParentNode, newChildren);
      }
    }

    function patch (expressions, instanceBindings) {
      for (const instanceBinding of instanceBindings) {
        const {
          targetNode,
          currentExpression,
          binding: {
            expressionIndex,
            attributeName,
            attributeValuePre,
            attributeValuePost
          }
        } = instanceBinding;

        const expression = expressions[expressionIndex];

        if (currentExpression === expression) {
          // no need to update, same as before
          continue
        }

        instanceBinding.currentExpression = expression;

        if (attributeName) { // attribute replacement
          targetNode.setAttribute(attributeName, attributeValuePre + toString(expression) + attributeValuePost);
        } else { // text node / child element / children replacement
          let newNode;
          if (Array.isArray(expression)) { // array of DOM elements produced by tag template literals
            patchChildren(expression, instanceBinding);
          } else if (expression instanceof Element) { // html tag template returning a DOM element
            newNode = expression;
            targetNode.replaceWith(newNode);
          } else { // primitive - string, number, etc
            // nodeValue is faster than textContent supposedly https://www.youtube.com/watch?v=LY6y3HbDVmg
            // note we may be replacing the value in a placeholder text node
            targetNode.nodeValue = toString(expression);
          }
          if (newNode) {
            instanceBinding.targetNode = newNode;
          }
        }
      }
    }

    function parse (tokens) {
      let htmlString = '';

      let withinTag = false;
      let withinAttribute = false;
      let elementIndexCounter = -1; // depth-first traversal order

      const elementsToBindings = new Map();
      const elementIndexes = [];

      for (let i = 0, len = tokens.length; i < len; i++) {
        const token = tokens[i];
        htmlString += token;

        if (i === len - 1) {
          break // no need to process characters - no more expressions to be found
        }

        for (let j = 0; j < token.length; j++) {
          const char = token.charAt(j);
          switch (char) {
            case '<': {
              const nextChar = token.charAt(j + 1);
              if (nextChar === '/') { // closing tag
                // leaving an element
                elementIndexes.pop();
              } else { // not a closing tag
                withinTag = true;
                elementIndexes.push(++elementIndexCounter);
              }
              break
            }
            case '>': {
              withinTag = false;
              withinAttribute = false;
              break
            }
            case '=': {
              withinAttribute = true;
              break
            }
          }
        }

        const elementIndex = elementIndexes[elementIndexes.length - 1];
        const bindings = getFromMap(elementsToBindings, elementIndex, () => []);

        let attributeName;
        let attributeValuePre;
        let attributeValuePost;
        if (withinAttribute) {
          // I never use single-quotes for attribute values in HTML, so just support double-quotes or no-quotes
          const match = /(\S+)="?([^"=]*)$/.exec(token);
          attributeName = match[1];
          attributeValuePre = match[2];
          attributeValuePost = /^[^">]*/.exec(tokens[i + 1])[0];
        }

        const binding = {
          attributeName,
          attributeValuePre,
          attributeValuePost,
          expressionIndex: i
        };

        bindings.push(binding);

        if (!withinTag && !withinAttribute) {
          // Add a placeholder text node, so we can find it later. Note we only support one dynamic child text node
          htmlString += ' ';
        }
      }

      const template = parseTemplate(htmlString);

      return {
        template,
        elementsToBindings
      }
    }

    function traverseAndSetupBindings (dom, elementsToBindings) {
      const instanceBindings = [];
      // traverse dom
      const treeWalker = document.createTreeWalker(dom, NodeFilter.SHOW_ELEMENT);

      let element = dom;
      let elementIndex = -1;
      do {
        const bindings = elementsToBindings.get(++elementIndex);
        if (bindings) {
          for (let i = 0; i < bindings.length; i++) {
            const binding = bindings[i];

            const targetNode = binding.attributeName
              ? element // attribute binding, just use the element itself
              : element.firstChild; // not an attribute binding, so has a placeholder text node

            const instanceBinding = {
              binding,
              targetNode,
              targetParentNode: undefined,
              currentExpression: undefined
            };

            instanceBindings.push(instanceBinding);
          }
        }
      } while ((element = treeWalker.nextNode()))

      return instanceBindings
    }

    function parseHtml (tokens) {
      // All templates and bound expressions are unique per tokens array
      const { template, elementsToBindings } = getFromMap(parseCache, tokens, () => parse(tokens));

      // When we parseHtml, we always return a fresh DOM instance ready to be updated
      const dom = template.cloneNode(true).content.firstElementChild;
      const instanceBindings = traverseAndSetupBindings(dom, elementsToBindings);

      return function updateDomInstance (expressions) {
        patch(expressions, instanceBindings);
        return dom
      }
    }

    function createFramework (state) {
      const domInstances = getFromMap(domInstancesCache, state, () => new Map());
      let domInstanceCacheKey = unkeyedSymbol;

      function html (tokens, ...expressions) {
        // Each unique lexical usage of map() is considered unique due to the html`` tagged template call it makes,
        // which has lexically unique tokens. The unkeyed symbol is just used for html`` usage outside of a map().
        const domInstancesForTokens = getFromMap(domInstances, tokens, () => new Map());
        const updateDomInstance = getFromMap(domInstancesForTokens, domInstanceCacheKey, () => parseHtml(tokens));

        return updateDomInstance(expressions) // update with expressions
      }

      function map (array, callback, keyFunction) {
        return array.map((item, index) => {
          const originalCacheKey = domInstanceCacheKey;
          domInstanceCacheKey = keyFunction(item);
          try {
            return callback(item, index)
          } finally {
            domInstanceCacheKey = originalCacheKey;
          }
        })
      }

      return { map, html }
    }

    function render (container, state, helpers, events, actions, refs, abortSignal, actionContext, firstRender) {
      const { labelWithSkin, titleForEmoji, unicodeWithSkin } = helpers;
      const { html, map } = createFramework(state);

      function emojiList (emojis, searchMode, prefix) {
        return map(emojis, (emoji, i) => {
          return html`<button role="${searchMode ? 'option' : 'menuitem'}" aria-selected="${searchMode ? i === state.activeSearchItem : ''}" aria-label="${labelWithSkin(emoji, state.currentSkinTone)}" title="${titleForEmoji(emoji)}" class="${
                'emoji' +
                (searchMode && i === state.activeSearchItem ? ' active' : '') +
                (emoji.unicode ? '' : ' custom-emoji')
              }" id="${`${prefix}-${emoji.id}`}" style="${emoji.unicode ? '' : `--custom-emoji-background: url(${JSON.stringify(emoji.url)})`}">${
        emoji.unicode
          ? unicodeWithSkin(emoji, state.currentSkinTone)
          : ''
      }</button>`
          // It's important for the cache key to be unique based on the prefix, because the framework caches based on the
          // unique tokens + cache key, and the same emoji may be used in the tab as well as in the fav bar
        }, emoji => `${prefix}-${emoji.id}`)
      }

      const section = () => {
        return html`<section data-ref="rootElement" class="picker" aria-label="${state.i18n.regionLabel}" style="${state.pickerStyle}"><div class="pad-top"></div><div class="search-row"><div class="search-wrapper"><input id="search" class="search" type="search" role="combobox" enterkeyhint="search" placeholder="${state.i18n.searchLabel}" autocapitalize="none" autocomplete="off" spellcheck="true" aria-expanded="${!!(state.searchMode && state.currentEmojis.length)}" aria-controls="search-results" aria-describedby="search-description" aria-autocomplete="list" aria-activedescendant="${state.activeSearchItemId ? `emo-${state.activeSearchItemId}` : ''}" data-ref="searchElement" data-on-input="onSearchInput" data-on-keydown="onSearchKeydown"><label class="sr-only" for="search">${state.i18n.searchLabel}</label> <span id="search-description" class="sr-only">${state.i18n.searchDescription}</span></div><div class="skintone-button-wrapper ${state.skinTonePickerExpandedAfterAnimation ? 'expanded' : ''}"><button id="skintone-button" class="emoji ${state.skinTonePickerExpanded ? 'hide-focus' : ''}" aria-label="${state.skinToneButtonLabel}" title="${state.skinToneButtonLabel}" aria-describedby="skintone-description" aria-haspopup="listbox" aria-expanded="${state.skinTonePickerExpanded}" aria-controls="skintone-list" data-on-click="onClickSkinToneButton">${state.skinToneButtonText}</button></div><span id="skintone-description" class="sr-only">${state.i18n.skinToneDescription}</span><div data-ref="skinToneDropdown" id="skintone-list" class="skintone-list hide-focus ${state.skinTonePickerExpanded ? '' : 'hidden no-animate'}" style="transform:translateY(${state.skinTonePickerExpanded ? 0 : 'calc(-1 * var(--num-skintones) * var(--total-emoji-size))'})" role="listbox" aria-label="${state.i18n.skinTonesLabel}" aria-activedescendant="skintone-${state.activeSkinTone}" aria-hidden="${!state.skinTonePickerExpanded}" tabIndex="-1" data-on-focusout="onSkinToneOptionsFocusOut" data-on-click="onSkinToneOptionsClick" data-on-keydown="onSkinToneOptionsKeydown" data-on-keyup="onSkinToneOptionsKeyup">${
    map(state.skinTones, (skinTone, i) => {
    return html`<div id="skintone-${i}" class="emoji ${i === state.activeSkinTone ? 'active' : ''}" aria-selected="${i === state.activeSkinTone}" role="option" title="${state.i18n.skinTones[i]}" aria-label="${state.i18n.skinTones[i]}">${skinTone}</div>`
    }, skinTone => skinTone)
        }</div></div><div class="nav" role="tablist" style="grid-template-columns:repeat(${state.groups.length},1fr)" aria-label="${state.i18n.categoriesLabel}" data-on-keydown="onNavKeydown" data-on-click="onNavClick">${
            map(state.groups, (group) => {
              return html`<button role="tab" class="nav-button" aria-controls="tab-${group.id}" aria-label="${state.i18n.categories[group.name]}" aria-selected="${!state.searchMode && state.currentGroup.id === group.id}" title="${state.i18n.categories[group.name]}" data-group-id="${group.id}"><div class="nav-emoji emoji">${group.emoji}</div></button>`
            }, group => group.id)
          }</div><div class="indicator-wrapper"><div class="indicator" style="transform:translateX(${(/* istanbul ignore next */ (state.isRtl ? -1 : 1)) * state.currentGroupIndex * 100}%)"></div></div><div class="message ${state.message ? '' : 'gone'}" role="alert" aria-live="polite">${state.message}</div><div data-ref="tabpanelElement" class="tabpanel ${(!state.databaseLoaded || state.message) ? 'gone' : ''}" role="${state.searchMode ? 'region' : 'tabpanel'}" aria-label="${state.searchMode ? state.i18n.searchResultsLabel : state.i18n.categories[state.currentGroup.name]}" id="${state.searchMode ? '' : `tab-${state.currentGroup.id}`}" tabIndex="0" data-on-click="onEmojiClick"><div data-action="calculateEmojiGridStyle">${
              map(state.currentEmojisWithCategories, (emojiWithCategory, i) => {
                return html`<div><div id="menu-label-${i}" class="category ${state.currentEmojisWithCategories.length === 1 && state.currentEmojisWithCategories[0].category === '' ? 'gone' : ''}" aria-hidden="true">${
                  state.searchMode
                    ? state.i18n.searchResultsLabel
                    : (
                      emojiWithCategory.category
                        ? emojiWithCategory.category
                        : (
                          state.currentEmojisWithCategories.length > 1
                            ? state.i18n.categories.custom
                            : state.i18n.categories[state.currentGroup.name]
                        )
                    )
                }</div><div class="emoji-menu ${i !== 0 && !state.searchMode && state.currentGroup.id === -1 ? 'visibility-auto' : ''}" style="${`--num-rows: ${Math.ceil(emojiWithCategory.emojis.length / state.numColumns)}`}" data-action="updateOnIntersection" role="${state.searchMode ? 'listbox' : 'menu'}" aria-labelledby="menu-label-${i}" id="${state.searchMode ? 'search-results' : ''}">${
              emojiList(emojiWithCategory.emojis, state.searchMode, /* prefix */ 'emo')
            }</div></div>`
              }, emojiWithCategory => emojiWithCategory.category)
            }</div></div><div class="favorites onscreen emoji-menu ${state.message ? 'gone' : ''}" role="menu" aria-label="${state.i18n.favoritesLabel}" data-on-click="onEmojiClick">${
            emojiList(state.currentFavorites, /* searchMode */ false, /* prefix */ 'fav')
          }</div><button data-ref="baselineEmoji" aria-hidden="true" tabindex="-1" class="abs-pos hidden emoji baseline-emoji">😀</button></section>`
      };

      const rootDom = section();

      // helper for traversing the dom, finding elements by an attribute, and getting the attribute value
      const forElementWithAttribute = (attributeName, callback) => {
        for (const element of container.querySelectorAll(`[${attributeName}]`)) {
          callback(element, element.getAttribute(attributeName));
        }
      };

      if (firstRender) { // not a re-render
        container.appendChild(rootDom);

        // we only bind events/refs once - there is no need to find them again given this component structure

        // bind events
        for (const eventName of ['click', 'focusout', 'input', 'keydown', 'keyup']) {
          forElementWithAttribute(`data-on-${eventName}`, (element, listenerName) => {
            element.addEventListener(eventName, events[listenerName]);
          });
        }

        // find refs
        forElementWithAttribute('data-ref', (element, ref) => {
          refs[ref] = element;
        });

        // destroy/abort logic
        abortSignal.addEventListener('abort', () => {
          container.removeChild(rootDom);
        });
      }

      // set up actions - these are re-bound on every render
      forElementWithAttribute('data-action', (element, action) => {
        let boundActions = actionContext.get(action);
        if (!boundActions) {
          actionContext.set(action, (boundActions = new WeakSet()));
        }

        // avoid applying the same action to the same element multiple times
        if (!boundActions.has(element)) {
          boundActions.add(element);
          actions[action](element);
        }
      });
    }

    /* istanbul ignore next */
    const qM = typeof queueMicrotask === 'function' ? queueMicrotask : callback => Promise.resolve().then(callback);

    function createState (abortSignal) {
      let destroyed = false;
      let currentObserver;

      const propsToObservers = new Map();
      const dirtyObservers = new Set();

      let queued;

      const flush = () => {
        if (destroyed) {
          return
        }
        const observersToRun = [...dirtyObservers];
        dirtyObservers.clear(); // clear before running to force any new updates to run in another tick of the loop
        try {
          for (const observer of observersToRun) {
            observer();
          }
        } finally {
          queued = false;
          if (dirtyObservers.size) { // new updates, queue another one
            queued = true;
            qM(flush);
          }
        }
      };

      const state = new Proxy({}, {
        get (target, prop) {
          if (currentObserver) {
            let observers = propsToObservers.get(prop);
            if (!observers) {
              observers = new Set();
              propsToObservers.set(prop, observers);
            }
            observers.add(currentObserver);
          }
          return target[prop]
        },
        set (target, prop, newValue) {
          if (target[prop] !== newValue) {
            target[prop] = newValue;
            const observers = propsToObservers.get(prop);
            if (observers) {
              for (const observer of observers) {
                dirtyObservers.add(observer);
              }
              if (!queued) {
                queued = true;
                qM(flush);
              }
            }
          }
          return true
        }
      });

      const createEffect = (callback) => {
        const runnable = () => {
          const oldObserver = currentObserver;
          currentObserver = runnable;
          try {
            return callback()
          } finally {
            currentObserver = oldObserver;
          }
        };
        return runnable()
      };

      // destroy logic
      abortSignal.addEventListener('abort', () => {
        destroyed = true;
      });

      return {
        state,
        createEffect
      }
    }

    // Compare two arrays, with a function called on each item in the two arrays that returns true if the items are equal
    function arraysAreEqualByFunction (left, right, areEqualFunc) {
      if (left.length !== right.length) {
        return false
      }
      for (let i = 0; i < left.length; i++) {
        if (!areEqualFunc(left[i], right[i])) {
          return false
        }
      }
      return true
    }

    const intersectionObserverCache = new WeakMap();

    function intersectionObserverAction (node, abortSignal, listener) {
      /* istanbul ignore else */
      {
        // The scroll root is always `.tabpanel`
        const root = node.closest('.tabpanel');

        let observer = intersectionObserverCache.get(root);
        if (!observer) {
          // TODO: replace this with the contentvisibilityautostatechange event when all supported browsers support it.
          // For now we use IntersectionObserver because it has better cross-browser support, and it would be bad for
          // old Safari versions if they eagerly downloaded all custom emoji all at once.
          observer = new IntersectionObserver(listener, {
            root,
            // trigger if we are 1/2 scroll container height away so that the images load a bit quicker while scrolling
            rootMargin: '50% 0px 50% 0px',
            // trigger if any part of the emoji grid is intersecting
            threshold: 0
          });

          // avoid creating a new IntersectionObserver for every category; just use one for the whole root
          intersectionObserverCache.set(root, observer);

          // assume that the abortSignal is always the same for this root node; just add one event listener
          abortSignal.addEventListener('abort', () => {
            observer.disconnect();
          });
        }

        observer.observe(node);
      }
    }

    /* eslint-disable prefer-const,no-labels,no-inner-declarations */

    // constants
    const EMPTY_ARRAY = [];

    const { assign } = Object;

    function createRoot (shadowRoot, props) {
      const refs = {};
      const abortController = new AbortController();
      const abortSignal = abortController.signal;
      const { state, createEffect } = createState(abortSignal);
      const actionContext = new Map();

      // initial state
      assign(state, {
        skinToneEmoji: undefined,
        i18n: undefined,
        database: undefined,
        customEmoji: undefined,
        customCategorySorting: undefined,
        emojiVersion: undefined
      });

      // public props
      assign(state, props);

      // private props
      assign(state, {
        initialLoad: true,
        currentEmojis: [],
        currentEmojisWithCategories: [],
        rawSearchText: '',
        searchText: '',
        searchMode: false,
        activeSearchItem: -1,
        message: undefined,
        skinTonePickerExpanded: false,
        skinTonePickerExpandedAfterAnimation: false,
        currentSkinTone: 0,
        activeSkinTone: 0,
        skinToneButtonText: undefined,
        pickerStyle: undefined,
        skinToneButtonLabel: '',
        skinTones: [],
        currentFavorites: [],
        defaultFavoriteEmojis: undefined,
        numColumns: DEFAULT_NUM_COLUMNS,
        isRtl: false,
        currentGroupIndex: 0,
        groups: groups,
        databaseLoaded: false,
        activeSearchItemId: undefined
      });

      //
      // Update the current group based on the currentGroupIndex
      //
      createEffect(() => {
        if (state.currentGroup !== state.groups[state.currentGroupIndex]) {
          state.currentGroup = state.groups[state.currentGroupIndex];
        }
      });

      //
      // Utils/helpers
      //

      const focus = id => {
        shadowRoot.getElementById(id).focus();
      };

      const emojiToDomNode = emoji => shadowRoot.getElementById(`emo-${emoji.id}`);

      // fire a custom event that crosses the shadow boundary
      const fireEvent = (name, detail) => {
        refs.rootElement.dispatchEvent(new CustomEvent(name, {
          detail,
          bubbles: true,
          composed: true
        }));
      };

      //
      // Comparison utils
      //

      const compareEmojiArrays = (a, b) => a.id === b.id;

      const compareCurrentEmojisWithCategories = (a, b) => {
        const { category: aCategory, emojis: aEmojis } = a;
        const { category: bCategory, emojis: bEmojis } = b;

        if (aCategory !== bCategory) {
          return false
        }

        return arraysAreEqualByFunction(aEmojis, bEmojis, compareEmojiArrays)
      };

      //
      // Update utils to avoid excessive re-renders
      //

      // avoid excessive re-renders by checking the value before setting
      const updateCurrentEmojis = (newEmojis) => {
        if (!arraysAreEqualByFunction(state.currentEmojis, newEmojis, compareEmojiArrays)) {
          state.currentEmojis = newEmojis;
        }
      };

      // avoid excessive re-renders
      const updateSearchMode = (newSearchMode) => {
        if (state.searchMode !== newSearchMode) {
          state.searchMode = newSearchMode;
        }
      };

      // avoid excessive re-renders
      const updateCurrentEmojisWithCategories = (newEmojisWithCategories) => {
        if (!arraysAreEqualByFunction(state.currentEmojisWithCategories, newEmojisWithCategories, compareCurrentEmojisWithCategories)) {
          state.currentEmojisWithCategories = newEmojisWithCategories;
        }
      };

      // Helpers used by PickerTemplate

      const unicodeWithSkin = (emoji, currentSkinTone) => (
        (currentSkinTone && emoji.skins && emoji.skins[currentSkinTone]) || emoji.unicode
      );

      const labelWithSkin = (emoji, currentSkinTone) => (
        uniq([
          (emoji.name || unicodeWithSkin(emoji, currentSkinTone)),
          emoji.annotation,
          ...(emoji.shortcodes || EMPTY_ARRAY)
        ].filter(Boolean)).join(', ')
      );

      const titleForEmoji = (emoji) => (
        emoji.annotation || (emoji.shortcodes || EMPTY_ARRAY).join(', ')
      );

      const helpers = {
        labelWithSkin, titleForEmoji, unicodeWithSkin
      };
      const events = {
        onClickSkinToneButton,
        onEmojiClick,
        onNavClick,
        onNavKeydown,
        onSearchKeydown,
        onSkinToneOptionsClick,
        onSkinToneOptionsFocusOut,
        onSkinToneOptionsKeydown,
        onSkinToneOptionsKeyup,
        onSearchInput
      };
      const actions = {
        calculateEmojiGridStyle,
        updateOnIntersection
      };

      let firstRender = true;
      createEffect(() => {
        render(shadowRoot, state, helpers, events, actions, refs, abortSignal, actionContext, firstRender);
        firstRender = false;
      });

      //
      // Determine the emoji support level (in requestIdleCallback)
      //

      // mount logic
      if (!state.emojiVersion) {
        detectEmojiSupportLevel().then(level => {
          // Can't actually test emoji support in Jest/Vitest/JSDom, emoji never render in color in Cairo
          /* istanbul ignore next */
          if (!level) {
            state.message = state.i18n.emojiUnsupportedMessage;
          }
        });
      }

      //
      // Set or update the database object
      //

      createEffect(() => {
        // show a Loading message if it takes a long time, or show an error if there's a network/IDB error
        async function handleDatabaseLoading () {
          let showingLoadingMessage = false;
          const timeoutHandle = setTimeout(() => {
            showingLoadingMessage = true;
            state.message = state.i18n.loadingMessage;
          }, TIMEOUT_BEFORE_LOADING_MESSAGE);
          try {
            await state.database.ready();
            state.databaseLoaded = true; // eslint-disable-line no-unused-vars
          } catch (err) {
            console.error(err);
            state.message = state.i18n.networkErrorMessage;
          } finally {
            clearTimeout(timeoutHandle);
            if (showingLoadingMessage) { // Seems safer than checking the i18n string, which may change
              showingLoadingMessage = false;
              state.message = ''; // eslint-disable-line no-unused-vars
            }
          }
        }

        if (state.database) {
          /* no await */
          handleDatabaseLoading();
        }
      });

      //
      // Global styles for the entire picker
      //

      createEffect(() => {
        state.pickerStyle = `
      --num-groups: ${state.groups.length}; 
      --indicator-opacity: ${state.searchMode ? 0 : 1}; 
      --num-skintones: ${NUM_SKIN_TONES};`;
      });

      //
      // Set or update the customEmoji
      //

      createEffect(() => {
        if (state.customEmoji && state.database) {
          updateCustomEmoji(); // re-run whenever customEmoji change
        }
      });

      createEffect(() => {
        if (state.customEmoji && state.customEmoji.length) {
          if (state.groups !== allGroups) { // don't update unnecessarily
            state.groups = allGroups;
          }
        } else if (state.groups !== groups) {
          if (state.currentGroupIndex) {
            // If the current group is anything other than "custom" (which is first), decrement.
            // This fixes the odd case where you set customEmoji, then pick a category, then unset customEmoji
            state.currentGroupIndex--;
          }
          state.groups = groups;
        }
      });

      //
      // Set or update the preferred skin tone
      //

      createEffect(() => {
        async function updatePreferredSkinTone () {
          if (state.databaseLoaded) {
            state.currentSkinTone = await state.database.getPreferredSkinTone();
          }
        }

        /* no await */ updatePreferredSkinTone();
      });

      createEffect(() => {
        state.skinTones = Array(NUM_SKIN_TONES).fill().map((_, i) => applySkinTone(state.skinToneEmoji, i));
      });

      createEffect(() => {
        state.skinToneButtonText = state.skinTones[state.currentSkinTone];
      });

      createEffect(() => {
        state.skinToneButtonLabel = state.i18n.skinToneLabel.replace('{skinTone}', state.i18n.skinTones[state.currentSkinTone]);
      });

      //
      // Set or update the favorites emojis
      //

      createEffect(() => {
        async function updateDefaultFavoriteEmojis () {
          const { database } = state;
          const favs = (await Promise.all(MOST_COMMONLY_USED_EMOJI.map(unicode => (
            database.getEmojiByUnicodeOrName(unicode)
          )))).filter(Boolean); // filter because in Jest/Vitest tests we don't have all the emoji in the DB
          state.defaultFavoriteEmojis = favs;
        }

        if (state.databaseLoaded) {
          /* no await */ updateDefaultFavoriteEmojis();
        }
      });

      function updateCustomEmoji () {
        // Certain effects have an implicit dependency on customEmoji since it affects the database
        // Getting it here on the state ensures this effect re-runs when customEmoji change.
        const { customEmoji, database } = state;
        const databaseCustomEmoji = customEmoji || EMPTY_ARRAY;
        if (database.customEmoji !== databaseCustomEmoji) {
          // Avoid setting this if the customEmoji have _not_ changed, because the setter triggers a re-computation of the
          // `customEmojiIndex`. Note we don't bother with deep object changes.
          database.customEmoji = databaseCustomEmoji;
        }
      }

      createEffect(() => {
        async function updateFavorites () {
          updateCustomEmoji(); // re-run whenever customEmoji change
          const { database, defaultFavoriteEmojis, numColumns } = state;
          const dbFavorites = await database.getTopFavoriteEmoji(numColumns);
          const favorites = await summarizeEmojis(uniqBy([
            ...dbFavorites,
            ...defaultFavoriteEmojis
          ], _ => (_.unicode || _.name)).slice(0, numColumns));
          state.currentFavorites = favorites;
        }

        if (state.databaseLoaded && state.defaultFavoriteEmojis) {
          /* no await */ updateFavorites();
        }
      });

      //
      // Re-run whenever the emoji grid changes size, and re-calc style/layout-related state variables:
      // 1) Re-calculate the --num-columns var because it may have changed
      // 2) Re-calculate whether we're in RTL mode or not.
      //
      // The benefit of doing this in one place is to align with rAF/ResizeObserver
      // and do all the calculations in one go. RTL vs LTR is not strictly layout-related,
      // but since we're already reading the style here, and since it's already aligned with
      // the rAF loop, this is the most appropriate place to do it perf-wise.
      //

      function calculateEmojiGridStyle (node) {
        resizeObserverAction(node, abortSignal, () => {
          /* istanbul ignore next */
          { // jsdom throws errors for this kind of fancy stuff
            // read all the style/layout calculations we need to make
            const style = getComputedStyle(refs.rootElement);
            const newNumColumns = parseInt(style.getPropertyValue('--num-columns'), 10);
            const newIsRtl = style.getPropertyValue('direction') === 'rtl';

            // write to state variables
            state.numColumns = newNumColumns;
            state.isRtl = newIsRtl;
          }
        });
      }

      // Re-run whenever the custom emoji in a category are shown/hidden. This is an optimization that simulates
      // what we'd get from `<img loading=lazy>` but without rendering an `<img>`.
      function updateOnIntersection (node) {
        intersectionObserverAction(node, abortSignal, (entries) => {
          for (const { target, isIntersecting } of entries) {
            target.classList.toggle('onscreen', isIntersecting);
          }
        });
      }

      //
      // Set or update the currentEmojis. Check for invalid ZWJ renderings
      // (i.e. double emoji).
      //

      createEffect(() => {
        async function updateEmojis () {
          const { searchText, currentGroup, databaseLoaded, customEmoji } = state;
          if (!databaseLoaded) {
            state.currentEmojis = [];
            state.searchMode = false;
          } else if (searchText.length >= MIN_SEARCH_TEXT_LENGTH) {
            const newEmojis = await getEmojisBySearchQuery(searchText);
            if (state.searchText === searchText) { // if the situation changes asynchronously, do not update
              updateCurrentEmojis(newEmojis);
              updateSearchMode(true);
            }
          } else { // database is loaded and we're not in search mode, so we're in normal category mode
            const { id: currentGroupId } = currentGroup;
            // avoid race condition where currentGroupId is -1 and customEmoji is undefined/empty
            if (currentGroupId !== -1 || (customEmoji && customEmoji.length)) {
              const newEmojis = await getEmojisByGroup(currentGroupId);
              if (state.currentGroup.id === currentGroupId) { // if the situation changes asynchronously, do not update
                updateCurrentEmojis(newEmojis);
                updateSearchMode(false);
              }
            }
          }
        }

        /* no await */ updateEmojis();
      });

      const resetScrollTopInRaf = () => {
        rAF(() => resetScrollTopIfPossible(refs.tabpanelElement));
      };

      // Some emojis have their ligatures rendered as two or more consecutive emojis
      // We want to treat these the same as unsupported emojis, so we compare their
      // widths against the baseline widths and remove them as necessary
      createEffect(() => {
        const { currentEmojis, emojiVersion } = state;
        const zwjEmojisToCheck = currentEmojis
          .filter(emoji => emoji.unicode) // filter custom emoji
          .filter(emoji => hasZwj(emoji) && !supportedZwjEmojis.has(emoji.unicode));
        if (!emojiVersion && zwjEmojisToCheck.length) {
          // render now, check their length later
          updateCurrentEmojis(currentEmojis);
          rAF(() => checkZwjSupportAndUpdate(zwjEmojisToCheck));
        } else {
          const newEmojis = emojiVersion ? currentEmojis : currentEmojis.filter(isZwjSupported);
          updateCurrentEmojis(newEmojis);
          // Reset scroll top to 0 when emojis change
          resetScrollTopInRaf();
        }
      });

      function checkZwjSupportAndUpdate (zwjEmojisToCheck) {
        const allSupported = checkZwjSupport(zwjEmojisToCheck, refs.baselineEmoji, emojiToDomNode);
        if (allSupported) {
          // Even if all emoji are supported, we still need to reset the scroll top to 0 when emojis change
          resetScrollTopInRaf();
        } else {
          // Force update. We only do this if there are any unsupported ZWJ characters since otherwise,
          // for browsers that support all emoji, it would be an unnecessary extra re-render.
          state.currentEmojis = [...state.currentEmojis];
        }
      }

      function isZwjSupported (emoji) {
        return !emoji.unicode || !hasZwj(emoji) || supportedZwjEmojis.get(emoji.unicode)
      }

      async function filterEmojisByVersion (emojis) {
        const emojiSupportLevel = state.emojiVersion || await detectEmojiSupportLevel();
        // !version corresponds to custom emoji
        return emojis.filter(({ version }) => !version || version <= emojiSupportLevel)
      }

      async function summarizeEmojis (emojis) {
        return summarizeEmojisForUI(emojis, state.emojiVersion || await detectEmojiSupportLevel())
      }

      async function getEmojisByGroup (group) {
        // -1 is custom emoji
        const emoji = group === -1 ? state.customEmoji : await state.database.getEmojiByGroup(group);
        return summarizeEmojis(await filterEmojisByVersion(emoji))
      }

      async function getEmojisBySearchQuery (query) {
        return summarizeEmojis(await filterEmojisByVersion(await state.database.getEmojiBySearchQuery(query)))
      }

      createEffect(() => {
      });

      //
      // Derive currentEmojisWithCategories from currentEmojis. This is always done even if there
      // are no categories, because it's just easier to code the HTML this way.
      //

      createEffect(() => {
        function calculateCurrentEmojisWithCategories () {
          const { searchMode, currentEmojis } = state;
          if (searchMode) {
            return [
              {
                category: '',
                emojis: currentEmojis
              }
            ]
          }
          const categoriesToEmoji = new Map();
          for (const emoji of currentEmojis) {
            const category = emoji.category || '';
            let emojis = categoriesToEmoji.get(category);
            if (!emojis) {
              emojis = [];
              categoriesToEmoji.set(category, emojis);
            }
            emojis.push(emoji);
          }
          return [...categoriesToEmoji.entries()]
            .map(([category, emojis]) => ({ category, emojis }))
            .sort((a, b) => state.customCategorySorting(a.category, b.category))
        }

        const newEmojisWithCategories = calculateCurrentEmojisWithCategories();
        updateCurrentEmojisWithCategories(newEmojisWithCategories);
      });

      //
      // Handle active search item (i.e. pressing up or down while searching)
      //

      createEffect(() => {
        state.activeSearchItemId = state.activeSearchItem !== -1 && state.currentEmojis[state.activeSearchItem].id;
      });

      //
      // Handle user input on the search input
      //

      createEffect(() => {
        const { rawSearchText } = state;
        rIC(() => {
          state.searchText = (rawSearchText || '').trim(); // defer to avoid input delays, plus we can trim here
          state.activeSearchItem = -1;
        });
      });

      function onSearchKeydown (event) {
        if (!state.searchMode || !state.currentEmojis.length) {
          return
        }

        const goToNextOrPrevious = (previous) => {
          halt(event);
          state.activeSearchItem = incrementOrDecrement(previous, state.activeSearchItem, state.currentEmojis);
        };

        switch (event.key) {
          case 'ArrowDown':
            return goToNextOrPrevious(false)
          case 'ArrowUp':
            return goToNextOrPrevious(true)
          case 'Enter':
            if (state.activeSearchItem === -1) {
              // focus the first option in the list since the list must be non-empty at this point (it's verified above)
              state.activeSearchItem = 0;
            } else { // there is already an active search item
              halt(event);
              return clickEmoji(state.currentEmojis[state.activeSearchItem].id)
            }
        }
      }

      //
      // Handle user input on nav
      //

      function onNavClick (event) {
        const { target } = event;
        const closestTarget = target.closest('.nav-button');
        /* istanbul ignore if */
        if (!closestTarget) {
          return // This should never happen, but makes me nervous not to have it
        }
        const groupId = parseInt(closestTarget.dataset.groupId, 10);
        refs.searchElement.value = ''; // clear search box input
        state.rawSearchText = '';
        state.searchText = '';
        state.activeSearchItem = -1;
        state.currentGroupIndex = state.groups.findIndex(_ => _.id === groupId);
      }

      function onNavKeydown (event) {
        const { target, key } = event;

        const doFocus = el => {
          if (el) {
            halt(event);
            el.focus();
          }
        };

        switch (key) {
          case 'ArrowLeft':
            return doFocus(target.previousElementSibling)
          case 'ArrowRight':
            return doFocus(target.nextElementSibling)
          case 'Home':
            return doFocus(target.parentElement.firstElementChild)
          case 'End':
            return doFocus(target.parentElement.lastElementChild)
        }
      }

      //
      // Handle user input on an emoji
      //

      async function clickEmoji (unicodeOrName) {
        const emoji = await state.database.getEmojiByUnicodeOrName(unicodeOrName);
        const emojiSummary = [...state.currentEmojis, ...state.currentFavorites]
          .find(_ => (_.id === unicodeOrName));
        const skinTonedUnicode = emojiSummary.unicode && unicodeWithSkin(emojiSummary, state.currentSkinTone);
        await state.database.incrementFavoriteEmojiCount(unicodeOrName);
        fireEvent('emoji-click', {
          emoji,
          skinTone: state.currentSkinTone,
          ...(skinTonedUnicode && { unicode: skinTonedUnicode }),
          ...(emojiSummary.name && { name: emojiSummary.name })
        });
      }

      async function onEmojiClick (event) {
        const { target } = event;
        /* istanbul ignore if */
        if (!target.classList.contains('emoji')) {
          // This should never happen, but makes me nervous not to have it
          return
        }
        halt(event);
        const id = target.id.substring(4); // replace 'emo-' or 'fav-' prefix

        /* no await */ clickEmoji(id);
      }

      //
      // Handle user input on the skintone picker
      //

      function changeSkinTone (skinTone) {
        state.currentSkinTone = skinTone;
        state.skinTonePickerExpanded = false;
        focus('skintone-button');
        fireEvent('skin-tone-change', { skinTone });
        /* no await */ state.database.setPreferredSkinTone(skinTone);
      }

      function onSkinToneOptionsClick (event) {
        const { target: { id } } = event;
        const match = id && id.match(/^skintone-(\d)/); // skintone option format
        /* istanbul ignore if */
        if (!match) { // not a skintone option
          return // This should never happen, but makes me nervous not to have it
        }
        halt(event);
        const skinTone = parseInt(match[1], 10); // remove 'skintone-' prefix
        changeSkinTone(skinTone);
      }

      function onClickSkinToneButton (event) {
        state.skinTonePickerExpanded = !state.skinTonePickerExpanded;
        state.activeSkinTone = state.currentSkinTone;
        // this should always be true, since the button is obscured by the listbox, so this `if` is just to be sure
        if (state.skinTonePickerExpanded) {
          halt(event);
          rAF(() => focus('skintone-list'));
        }
      }

      // To make the animation nicer, change the z-index of the skintone picker button
      // *after* the animation has played. This makes it appear that the picker box
      // is expanding "below" the button
      createEffect(() => {
        if (state.skinTonePickerExpanded) {
          refs.skinToneDropdown.addEventListener('transitionend', () => {
            state.skinTonePickerExpandedAfterAnimation = true; // eslint-disable-line no-unused-vars
          }, { once: true });
        } else {
          state.skinTonePickerExpandedAfterAnimation = false; // eslint-disable-line no-unused-vars
        }
      });

      function onSkinToneOptionsKeydown (event) {
        // this should never happen, but makes me nervous not to have it
        /* istanbul ignore if */
        if (!state.skinTonePickerExpanded) {
          return
        }
        const changeActiveSkinTone = async nextSkinTone => {
          halt(event);
          state.activeSkinTone = nextSkinTone;
        };

        switch (event.key) {
          case 'ArrowUp':
            return changeActiveSkinTone(incrementOrDecrement(true, state.activeSkinTone, state.skinTones))
          case 'ArrowDown':
            return changeActiveSkinTone(incrementOrDecrement(false, state.activeSkinTone, state.skinTones))
          case 'Home':
            return changeActiveSkinTone(0)
          case 'End':
            return changeActiveSkinTone(state.skinTones.length - 1)
          case 'Enter':
            // enter on keydown, space on keyup. this is just how browsers work for buttons
            // https://lists.w3.org/Archives/Public/w3c-wai-ig/2019JanMar/0086.html
            halt(event);
            return changeSkinTone(state.activeSkinTone)
          case 'Escape':
            halt(event);
            state.skinTonePickerExpanded = false;
            return focus('skintone-button')
        }
      }

      function onSkinToneOptionsKeyup (event) {
        // this should never happen, but makes me nervous not to have it
        /* istanbul ignore if */
        if (!state.skinTonePickerExpanded) {
          return
        }
        switch (event.key) {
          case ' ':
            // enter on keydown, space on keyup. this is just how browsers work for buttons
            // https://lists.w3.org/Archives/Public/w3c-wai-ig/2019JanMar/0086.html
            halt(event);
            return changeSkinTone(state.activeSkinTone)
        }
      }

      async function onSkinToneOptionsFocusOut (event) {
        // On blur outside of the skintone listbox, collapse the skintone picker.
        const { relatedTarget } = event;
        // The `else` should never happen, but makes me nervous not to have it
        /* istanbul ignore else */
        if (!relatedTarget || relatedTarget.id !== 'skintone-list') {
          state.skinTonePickerExpanded = false;
        }
      }

      function onSearchInput (event) {
        state.rawSearchText = event.target.value;
      }

      return {
        $set (newState) {
          assign(state, newState);
        },
        $destroy () {
          abortController.abort();
        }
      }
    }

    const DEFAULT_DATA_SOURCE = 'https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json';
    const DEFAULT_LOCALE = 'en';

    var enI18n = {
      categoriesLabel: 'Categories',
      emojiUnsupportedMessage: 'Your browser does not support color emoji.',
      favoritesLabel: 'Favorites',
      loadingMessage: 'Loading…',
      networkErrorMessage: 'Could not load emoji.',
      regionLabel: 'Emoji picker',
      searchDescription: 'When search results are available, press up or down to select and enter to choose.',
      searchLabel: 'Search',
      searchResultsLabel: 'Search results',
      skinToneDescription: 'When expanded, press up or down to select and enter to choose.',
      skinToneLabel: 'Choose a skin tone (currently {skinTone})',
      skinTonesLabel: 'Skin tones',
      skinTones: [
        'Default',
        'Light',
        'Medium-Light',
        'Medium',
        'Medium-Dark',
        'Dark'
      ],
      categories: {
        custom: 'Custom',
        'smileys-emotion': 'Smileys and emoticons',
        'people-body': 'People and body',
        'animals-nature': 'Animals and nature',
        'food-drink': 'Food and drink',
        'travel-places': 'Travel and places',
        activities: 'Activities',
        objects: 'Objects',
        symbols: 'Symbols',
        flags: 'Flags'
      }
    };

    var baseStyles = ":host{--emoji-size:1.375rem;--emoji-padding:0.5rem;--category-emoji-size:var(--emoji-size);--category-emoji-padding:var(--emoji-padding);--indicator-height:3px;--input-border-radius:0.5rem;--input-border-size:1px;--input-font-size:1rem;--input-line-height:1.5;--input-padding:0.25rem;--num-columns:8;--outline-size:2px;--border-size:1px;--border-radius:0;--skintone-border-radius:1rem;--category-font-size:1rem;display:flex;width:min-content;height:400px}:host,:host(.light){color-scheme:light;--background:#fff;--border-color:#e0e0e0;--indicator-color:#385ac1;--input-border-color:#999;--input-font-color:#111;--input-placeholder-color:#999;--outline-color:#999;--category-font-color:#111;--button-active-background:#e6e6e6;--button-hover-background:#d9d9d9}:host(.dark){color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}@media (prefers-color-scheme:dark){:host{color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}}:host([hidden]){display:none}button{margin:0;padding:0;border:0;background:0 0;box-shadow:none;-webkit-tap-highlight-color:transparent}button::-moz-focus-inner{border:0}input{padding:0;margin:0;line-height:1.15;font-family:inherit}input[type=search]{-webkit-appearance:none}:focus{outline:var(--outline-color) solid var(--outline-size);outline-offset:calc(-1*var(--outline-size))}:host([data-js-focus-visible]) :focus:not([data-focus-visible-added]){outline:0}:focus:not(:focus-visible){outline:0}.hide-focus{outline:0}*{box-sizing:border-box}.picker{contain:content;display:flex;flex-direction:column;background:var(--background);border:var(--border-size) solid var(--border-color);border-radius:var(--border-radius);width:100%;height:100%;overflow:hidden;--total-emoji-size:calc(var(--emoji-size) + (2 * var(--emoji-padding)));--total-category-emoji-size:calc(var(--category-emoji-size) + (2 * var(--category-emoji-padding)))}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.hidden{opacity:0;pointer-events:none}.abs-pos{position:absolute;left:0;top:0}.gone{display:none!important}.skintone-button-wrapper,.skintone-list{background:var(--background);z-index:3}.skintone-button-wrapper.expanded{z-index:1}.skintone-list{position:absolute;inset-inline-end:0;top:0;z-index:2;overflow:visible;border-bottom:var(--border-size) solid var(--border-color);border-radius:0 0 var(--skintone-border-radius) var(--skintone-border-radius);will-change:transform;transition:transform .2s ease-in-out;transform-origin:center 0}@media (prefers-reduced-motion:reduce){.skintone-list{transition-duration:.001s}}@supports not (inset-inline-end:0){.skintone-list{right:0}}.skintone-list.no-animate{transition:none}.tabpanel{overflow-y:auto;scrollbar-gutter:stable;-webkit-overflow-scrolling:touch;will-change:transform;min-height:0;flex:1;contain:content}.emoji-menu{display:grid;grid-template-columns:repeat(var(--num-columns),var(--total-emoji-size));justify-content:space-around;align-items:flex-start;width:100%}.emoji-menu.visibility-auto{content-visibility:auto;contain-intrinsic-size:calc(var(--num-columns)*var(--total-emoji-size)) calc(var(--num-rows)*var(--total-emoji-size))}.category{padding:var(--emoji-padding);font-size:var(--category-font-size);color:var(--category-font-color)}.emoji,button.emoji{font-size:var(--emoji-size);display:flex;align-items:center;justify-content:center;border-radius:100%;height:var(--total-emoji-size);width:var(--total-emoji-size);line-height:1;overflow:hidden;font-family:var(--emoji-font-family);cursor:pointer}@media (hover:hover) and (pointer:fine){.emoji:hover,button.emoji:hover{background:var(--button-hover-background)}}.emoji.active,.emoji:active,button.emoji.active,button.emoji:active{background:var(--button-active-background)}.custom-emoji::after{content:\"\";width:var(--emoji-size);height:var(--emoji-size);background-repeat:no-repeat;background-position:center center;background-size:contain;background-image:none}.onscreen .custom-emoji::after{background-image:var(--custom-emoji-background)}.nav,.nav-button{align-items:center}.nav{display:grid;justify-content:space-between;contain:content}.nav-button{display:flex;justify-content:center}.nav-emoji{font-size:var(--category-emoji-size);width:var(--total-category-emoji-size);height:var(--total-category-emoji-size)}.indicator-wrapper{display:flex;border-bottom:1px solid var(--border-color)}.indicator{width:calc(100%/var(--num-groups));height:var(--indicator-height);opacity:var(--indicator-opacity);background-color:var(--indicator-color);will-change:transform,opacity;transition:opacity .1s linear,transform .25s ease-in-out}@media (prefers-reduced-motion:reduce){.indicator{will-change:opacity;transition:opacity .1s linear}}.pad-top,input.search{background:var(--background);width:100%}.pad-top{height:var(--emoji-padding);z-index:3}.search-row{display:flex;align-items:center;position:relative;padding-inline-start:var(--emoji-padding);padding-bottom:var(--emoji-padding)}.search-wrapper{flex:1;min-width:0}input.search{padding:var(--input-padding);border-radius:var(--input-border-radius);border:var(--input-border-size) solid var(--input-border-color);color:var(--input-font-color);font-size:var(--input-font-size);line-height:var(--input-line-height)}input.search::placeholder{color:var(--input-placeholder-color)}.favorites{overflow-y:auto;scrollbar-gutter:stable;display:flex;flex-direction:row;border-top:var(--border-size) solid var(--border-color);contain:content}.message{padding:var(--emoji-padding)}";

    const PROPS = [
      'customEmoji',
      'customCategorySorting',
      'database',
      'dataSource',
      'i18n',
      'locale',
      'skinToneEmoji',
      'emojiVersion'
    ];

    // Styles injected ourselves, so we can declare the FONT_FAMILY variable in one place
    const EXTRA_STYLES = `:host{--emoji-font-family:${FONT_FAMILY}}`;

    class PickerElement extends HTMLElement {
      constructor (props) {
        super();
        this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = baseStyles + EXTRA_STYLES;
        this.shadowRoot.appendChild(style);
        this._ctx = {
          // Set defaults
          locale: DEFAULT_LOCALE,
          dataSource: DEFAULT_DATA_SOURCE,
          skinToneEmoji: DEFAULT_SKIN_TONE_EMOJI,
          customCategorySorting: DEFAULT_CATEGORY_SORTING,
          customEmoji: null,
          i18n: enI18n,
          emojiVersion: null,
          ...props
        };
        // Handle properties set before the element was upgraded
        for (const prop of PROPS) {
          if (prop !== 'database' && Object.prototype.hasOwnProperty.call(this, prop)) {
            this._ctx[prop] = this[prop];
            delete this[prop];
          }
        }
        this._dbFlush(); // wait for a flush before creating the db, in case the user calls e.g. a setter or setAttribute
      }

      connectedCallback () {
        // The _cmp may be defined if the component was immediately disconnected and then reconnected. In that case,
        // do nothing (preserve the state)
        if (!this._cmp) {
          this._cmp = createRoot(this.shadowRoot, this._ctx);
        }
      }

      disconnectedCallback () {
        // Check in a microtask if the element is still connected. If so, treat this as a "move" rather than a disconnect
        // Inspired by Vue: https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue
        qM(() => {
          // this._cmp may be defined if connect-disconnect-connect-disconnect occurs synchronously
          if (!this.isConnected && this._cmp) {
            this._cmp.$destroy();
            this._cmp = undefined;

            const { database } = this._ctx;
            database.close()
              // only happens if the database failed to load in the first place, so we don't care
              .catch(err => console.error(err));
          }
        });
      }

      static get observedAttributes () {
        return ['locale', 'data-source', 'skin-tone-emoji', 'emoji-version'] // complex objects aren't supported, also use kebab-case
      }

      attributeChangedCallback (attrName, oldValue, newValue) {
        this._set(
          // convert from kebab-case to camelcase
          // see https://github.com/sveltejs/svelte/issues/3852#issuecomment-665037015
          attrName.replace(/-([a-z])/g, (_, up) => up.toUpperCase()),
          // convert string attribute to float if necessary
          attrName === 'emoji-version' ? parseFloat(newValue) : newValue
        );
      }

      _set (prop, newValue) {
        this._ctx[prop] = newValue;
        if (this._cmp) {
          this._cmp.$set({ [prop]: newValue });
        }
        if (['locale', 'dataSource'].includes(prop)) {
          this._dbFlush();
        }
      }

      _dbCreate () {
        const { locale, dataSource, database } = this._ctx;
        // only create a new database if we really need to
        if (!database || database.locale !== locale || database.dataSource !== dataSource) {
          this._set('database', new Database({ locale, dataSource }));
        }
      }

      // Update the Database in one microtask if the locale/dataSource change. We do one microtask
      // so we don't create two Databases if e.g. both the locale and the dataSource change
      _dbFlush () {
        qM(() => (
          this._dbCreate()
        ));
      }
    }

    const definitions = {};

    for (const prop of PROPS) {
      definitions[prop] = {
        get () {
          if (prop === 'database') {
            // in rare cases, the microtask may not be flushed yet, so we need to instantiate the DB
            // now if the user is asking for it
            this._dbCreate();
          }
          return this._ctx[prop]
        },
        set (val) {
          if (prop === 'database') {
            throw new Error('database is read-only')
          }
          this._set(prop, val);
        }
      };
    }

    Object.defineProperties(PickerElement.prototype, definitions);

    /* istanbul ignore else */
    if (!customElements.get('emoji-picker')) { // if already defined, do nothing (e.g. same script imported twice)
      customElements.define('emoji-picker', PickerElement);
    }

    let LoadingSpinner = class LoadingSpinner extends s {
        render() {
            return ke `
      <div role="status" class="flex justify-center items-center min-h-[10rem]">
        ${Icons.LoadingSpinner}
        <span class="sr-only">Loading...</span>
      </div>
    `;
        }
    };
    LoadingSpinner.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    LoadingSpinner = __decorate([
        t$1('np-content-cta-loading')
    ], LoadingSpinner);

    let Modal = class Modal extends s {
        constructor() {
            super(...arguments);
            this.title = '';
            this.closeButton = true;
        }
        _handleCloseModal() {
            this.dispatchEvent(new Event(`close-modal`));
            document.body.style.overflow = 'initial';
        }
        _handleBackdrop(e) {
            if (e.target === this.dialog)
                this._handleCloseModal();
        }
        updated() {
            if (!this.dialog)
                return;
            this.dialog.showModal();
            document.body.style.overflow = 'hidden';
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            document.body.style.overflow = 'initial';
        }
        render() {
            return ke `
      <dialog
        class="fixed shadow-lg rounded-[8px] w-[calc(100%-32px)] max-w-[512px] m-0 left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 backdrop:bg-black backdrop:bg-opacity-50 backdrop:backdrop-blur-sm animate-slide-in-blurred-top"
        aria-modal="true"
        aria-labelledby="np-content-modal-title"
        id="content-cta-dialog"
        @close=${this._handleCloseModal}
        @click=${this._handleBackdrop}
      >
        <div class="bg-white p-[24px] w-full">
          ${this.closeButton
            ? ke `<button
                class="absolute top-[8px] right-[12px] p-[8px] hover:bg-slate-50 rounded-full transition-colors active:bg-slate-100"
                title="Close modal"
                aria-label="Close"
                @click=${this._handleCloseModal}
              >
                ${Icons.Close}
              </button>`
            : D}
          <h2 class="text-sm tracking-wide uppercase font-semibold mb-[16px] text-center" id="np-content-modal-title">
            ${this.title}
          </h2>
          <slot></slot>
        </div>
      </dialog>
    `;
        }
    };
    Modal.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], Modal.prototype, "title", void 0);
    __decorate([
        n()
    ], Modal.prototype, "closeButton", void 0);
    __decorate([
        e$1('#content-cta-dialog')
    ], Modal.prototype, "dialog", void 0);
    Modal = __decorate([
        t$1('np-content-cta-modal')
    ], Modal);

    const GOOD_APP_PUBKEYS = [
        '20986fb83e775d96d188ca5c9df10ce6d613e0eb7e5768a0f0b12b37cdac21b3', // yakihonne
        '97c70a44366a6535c145b333f973ea86dfdc2d7a99da618c40c64705ad98e322', // hodlbod
        'a19aadee53bc71d25afef365067a3978ac30d5520d36ec8cc74d77a872af7359', // satlantis
        '460c25e682fda7832b52d1f22d3d22b3176d972f60dcdc3212ed8c92ef85065c', // vitor
        '3356de61b39647931ce8b2140b2bab837e0810c0ef515bbe92de0248040b8bdd', // brugeman
        '73c6bb92440a9344279f7a36aa3de1710c9198b1e9e8a394cd13e0dd5c994c63', // highlighter
        'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52', // pablo
        '9be0be0fc079548233231614e4e1efc9f28b0db398011efeecf05fe570e5dd33', // nostur
        'e8ed3798c6ffebffa08501ac39e271662bfd160f688f94c45d692d8767dd345a', // archinox
        '7fa56f5d6962ab1e3cd424e758c3002b8665f7b0d8dcee9fe9e288d7751ac194', // verbiricha
        '266815e0c9210dfa324c6cba3573b14bee49da4209a9456f9484e5106cd408a5', // hzrd149
        '45c41f21e1cf715fa6d9ca20b8e002a574db7bb49e96ee89834c66dac5446b7a', // flycat
        '128bc05aa6fd421d00c3c3389329f39cfc750b035db6cdad2eb0f983bff5629f', // nosta
        '126103bfddc8df256b6e0abfd7f3797c80dcc4ea88f7c2f87dd4104220b4d65f', // lume/reya
        'b7c6f6915cfa9a62fff6a1f02604de88c23c6c6c6d1b8f62c7cc10749f307e81', // florian
        '818a39b5f164235f86254b12ca586efccc1f95e98b45cb1c91c71dc5d9486dda', // nostr.band
        '63fe6318dc58583cfe16810f86dd09e18bfd76aabc24a0081ce2856f330504ed', // kieran
        '84de35e2584d2b144aae823c9ed0b0f3deda09648530b93d1a2a146d1dea9864', // snort
        '7d4e04503ab26615dd5f29ec08b52943cbe5f17bacc3012b26220caa232ab14c', // habla
    ];
    let ModalApps = class ModalApps extends s {
        constructor() {
            super(...arguments);
            this.open = false;
            this.userPubkey = '';
            this.eventAddr = '';
            this.kind = undefined;
            this.apps = [];
            this.isLoading = false;
            this.error = '';
        }
        _handleClose() {
            this.dispatchEvent(new Event(`close-modal`));
        }
        async loadData() {
            this.error = '';
            this.isLoading = true;
            try {
                const id = this.eventAddr;
                if (!id)
                    throw new Error('No nostr id');
                // @ts-ignore
                const object = await window.nostrSite.store.get(id);
                if (!object)
                    throw new Error('No object ' + id);
                const kind = object.event.kind;
                if (kind === undefined || kind < 0)
                    throw new Error('Bad kind');
                const eventId = object.event.id;
                console.log('content-cta apps for kind', kind);
                // @ts-ignore
                const events = await window.nostrSite.renderer.fetchEvents({
                    kinds: [31990],
                    '#k': ['' + kind],
                }, { relays: ['wss://relay.nostr.band'], timeoutMs: 2000 });
                console.log('content-cta app events', events);
                const pubkeys = [];
                const apps = [...events].map((ev) => {
                    const urlTag = ev.tags.find((t) => {
                        if (t.length < 2)
                            return false;
                        if (t[0] !== 'web' &&
                            t[0] !== 'ios' &&
                            t[0] !== 'android' &&
                            t[0] !== 'macos' &&
                            t[0] !== 'windows' &&
                            t[0] !== 'linux')
                            return false;
                        if (t.length === 2 || t[2] === '')
                            return true;
                        if (kind === 0 && (t[2] === 'npub' || t[2] === 'nprofile'))
                            return true;
                        if (kind === 3 || (kind >= 10000 && kind < 20000) || (kind >= 30000 && kind < 40000)) {
                            if (t[2] === 'naddr')
                                return true;
                        }
                        else {
                            if (t[2] === 'nevent' || t[2] === 'note')
                                return true;
                        }
                    });
                    let url = '';
                    if (urlTag) {
                        let bech32 = id;
                        if (urlTag.length >= 3) {
                            // @ts-ignore
                            const { data } = window.nostrSite.nostrTools.nip19.decode(id);
                            // @ts-ignore
                            const relays = window.nostrSite.renderer.prepareRelays();
                            // crop, otherwise nevent/nprofile/naddr becomes too large
                            if (relays.length > 5)
                                relays.length = 5;
                            switch (urlTag[2]) {
                                case 'nprofile':
                                    // @ts-ignore
                                    bech32 = window.nostrSite.nostrTools.nip19.nprofileEncode({
                                        pubkey: data,
                                        relays,
                                    });
                                    break;
                                case 'nevent':
                                    // @ts-ignore
                                    bech32 = window.nostrSite.nostrTools.nip19.neventEncode({
                                        id: eventId,
                                        kind,
                                        relays,
                                    });
                                    break;
                                case 'note':
                                    // @ts-ignore
                                    bech32 = window.nostrSite.nostrTools.nip19.noteEncode(eventId);
                                    break;
                                case 'naddr':
                                    // re-format naddr to add relays
                                    // @ts-ignore
                                    bech32 = window.nostrSite.nostrTools.nip19.naddrEncode({
                                        pubkey: data.pubkey,
                                        identifier: data.identifier,
                                        kind,
                                        relays,
                                    });
                                    break;
                            }
                        }
                        url = urlTag[1].replace('<bech32>', bech32);
                    }
                    // console.log('urlTag', urlTag, url, kind, ev)
                    let profile = undefined;
                    try {
                        profile = JSON.parse(ev.content);
                    }
                    catch { }
                    if (!profile)
                        pubkeys.push(ev.pubkey);
                    return {
                        id: ev.id,
                        pubkey: ev.pubkey,
                        name: profile ? profile.display_name || profile.name : '',
                        icon: profile ? profile.picture : '',
                        url,
                        trusted: GOOD_APP_PUBKEYS.includes(ev.pubkey),
                    };
                });
                // @ts-ignore
                const profiles = await window.nostrSite.renderer.fetchProfiles(pubkeys);
                for (const p of profiles) {
                    if (!p.profile)
                        continue;
                    const app = apps.find((a) => a.pubkey === p.pubkey);
                    if (!app.name)
                        app.name = p.profile.display_name || p.profile.name;
                    if (!app.icon)
                        app.icon = p.profile.picture;
                }
                apps.push({
                    id: 'native',
                    name: 'Other native app',
                    icon: '',
                    pubkey: '',
                    url: 'nostr:' + id,
                    trusted: false,
                });
                // drop invalid, sort by trusted status
                this.apps = apps
                    .filter((a) => !!a.url && !!a.name)
                    .sort((a, b) => {
                    if (a.trusted === b.trusted)
                        return 0;
                    if (a.trusted)
                        return -1;
                    return 1;
                });
                console.log('content-cta apps', this.apps);
                this.isLoading = false;
            }
            catch (e) {
                this.error = e.message;
                this.isLoading = false;
            }
        }
        updated(changedProperties) {
            if (changedProperties.has('open') && this.open) {
                this.loadData();
            }
        }
        renderContent() {
            if (this.error) {
                return ke `<div class="flex justify-center items-center min-h-[10rem]">
        <h1 class="text-center">Oops... Something went wrong!</h1>
      </div>`;
            }
            if (this.isLoading) {
                return ke `<np-content-cta-loading></np-content-cta-loading>`;
            }
            return ke ` <div class="flex flex-col gap-[12px] max-h-[600px] overflow-auto">
      ${this.apps.map((app) => {
            return ke ` <a
          href="${app.url}"
          target="_blank"
          rel="noreferrer noopener"
          class="py-[12px] px-[8px] cursor-pointer flex items-center hover:bg-neutral-100"
        >
          <div
            class="rounded-[6px] bg-neutral-200 w-[28px] h-[28px] mr-[8px] flex items-center justify-center font-bold"
          >
            ${app.icon &&
                ke `<img
              src=${app.icon}
              alt=${app.name}
              @error=${(e) => e.target.remove()}
              class="rounded-md"
            />`}
          </div>
          <h2 class="text-lg font-medium leading-tight text-neutral-900 truncate">${app.name}</h2>
        </a>`;
        })}
    </div>`;
        }
        render() {
            if (!this.open)
                return D;
            return ke `
      <np-content-cta-modal @close-modal=${this._handleClose} .title=${'Apps'}>
        ${this.renderContent()}
      </np-content-cta-modal>
    `;
        }
    };
    ModalApps.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], ModalApps.prototype, "open", void 0);
    __decorate([
        n()
    ], ModalApps.prototype, "userPubkey", void 0);
    __decorate([
        n()
    ], ModalApps.prototype, "eventAddr", void 0);
    __decorate([
        n()
    ], ModalApps.prototype, "kind", void 0);
    __decorate([
        r()
    ], ModalApps.prototype, "apps", void 0);
    __decorate([
        r()
    ], ModalApps.prototype, "isLoading", void 0);
    __decorate([
        r()
    ], ModalApps.prototype, "error", void 0);
    ModalApps = __decorate([
        t$1('np-content-cta-modal-apps')
    ], ModalApps);

    let ModalLogin = class ModalLogin extends s {
        constructor() {
            super(...arguments);
            this.open = false;
        }
        _handleClose() {
            this.dispatchEvent(new Event(`close-modal`));
        }
        render() {
            if (!this.open)
                return D;
            return ke `
      <np-content-cta-modal @close-modal=${this._handleClose} .title=${'Introduce yourself'}>
        <div class="flex flex-col gap-3">
          <p class="max-w-[75%] m-auto text-center text-sm text-neutral-600">
            Please type your name or a pseudonym. You can change it later.
          </p>
          <input
            placeholder="Your name"
            class="w-full outline-none border-neutral-300 border-[1.5px] rounded-md p-2 py-3 focus:border-sky-600 placeholder:font-light transition-colors"
          />
          <button class="bg-sky-600 rounded-lg p-2 text-white hover:bg-sky-700 active:bg-sky-800 transition-colors">
            Continue
          </button>
          <p class="text-center">
            Already have a Nostr account? <a href="/" class="text-sky-600 hover:text-sky-700">Login &rarr;</a>
          </p>
        </div>
      </np-content-cta-modal>
    `;
        }
    };
    ModalLogin.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], ModalLogin.prototype, "open", void 0);
    ModalLogin = __decorate([
        t$1('np-content-cta-modal-login')
    ], ModalLogin);

    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const rt=o=>void 0===o.strings;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.t=t,this._$AM=e,this.i=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const mt=(i,t)=>{const e=i._$AN;if(void 0===e)return !1;for(const i of e)i._$AO?.(t,!1),mt(i,t);return !0},_t=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t;}while(0===e?.size)},wt=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),gt(t);}};function bt(i){void 0!==this._$AN?(_t(this),this._$AM=i,wt(this)):this._$AM=i;}function yt(i,t=!1,e=0){const s=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(t)if(Array.isArray(s))for(let i=e;i<s.length;i++)mt(s[i],!1),_t(s[i]);else null!=s&&(mt(s,!1),_t(s));else mt(this,i);}const gt=i=>{i.type==t.CHILD&&(i._$AP??=yt,i._$AQ??=bt);};class $t extends i{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,e){super._$AT(i,t,e),wt(this),this.isConnected=i._$AU;}_$AO(i,t=!0){i!==this.isConnected&&(this.isConnected=i,i?this.reconnected?.():this.disconnected?.()),t&&(mt(this,i),_t(this));}setValue(i){if(rt(this.t))this.t._$AI(i,this);else {const t=[...this.t._$AH];t[this.i]=i,this.t._$AI(t,this,0);}}disconnected(){}reconnected(){}}

    const qt=new WeakMap,Kt=e(class extends $t{render(t){return D}update(t,[i]){const s=i!==this.Y;return s&&void 0!==this.Y&&this.rt(void 0),(s||this.lt!==this.ct)&&(this.Y=i,this.ht=t.options?.host,this.rt(this.ct=t.element)),D}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.Y){const i=this.ht??globalThis;let s=qt.get(i);void 0===s&&(s=new WeakMap,qt.set(i,s)),void 0!==s.get(this.Y)&&this.Y.call(this.ht,void 0),s.set(this.Y,t),void 0!==t&&this.Y.call(this.ht,t);}else this.Y.value=t;}get lt(){return "function"==typeof this.Y?qt.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});

    let ModalEmoji = class ModalEmoji extends s {
        constructor() {
            super(...arguments);
            this.open = false;
        }
        _handleClose() {
            this.dispatchEvent(new Event(`close-modal`));
        }
        async _handleEmojiClick(event) {
            if (!event.detail.unicode)
                return;
            this._handleClose();
            if (this.publish)
                this.publish(event.detail.unicode);
        }
        render() {
            if (!this.open)
                return D;
            const refCallback = (element) => {
                if (!element)
                    return;
                const picker = element;
                picker.addEventListener('emoji-click', this._handleEmojiClick.bind(this));
            };
            return ke `
      <np-content-cta-modal @close-modal=${this._handleClose} .title=${'Click on emoji'}>
        <div class="flex flex-col gap-[8px]">
          <emoji-picker class="light w-full" @emoji-picker=${this._handleEmojiClick} ${Kt(refCallback)}></emoji-picker>
          <p class="w-full text-[14px] text-center text-gray">Click on emoji to post your reaction</p>
        </div>
      </np-content-cta-modal>
    `;
        }
    };
    ModalEmoji.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], ModalEmoji.prototype, "open", void 0);
    __decorate([
        n()
    ], ModalEmoji.prototype, "publish", void 0);
    ModalEmoji = __decorate([
        t$1('np-content-cta-modal-emoji')
    ], ModalEmoji);

    let ModalShareApps = class ModalShareApps extends s {
        constructor() {
            super(...arguments);
            this.open = false;
            this.ready = false;
            this.openModal = () => undefined;
            this.onShareNostr = () => undefined;
            this.accent = '';
            this.apps = APPS;
        }
        _handleClose() {
            this.dispatchEvent(new Event(`close-modal`));
        }
        _handleAppClick(app) {
            // console.log(app)
            this._handleClose();
            if (app.id === 'nostr') {
                return this.onShareNostr();
            }
            // @ts-ignore
            const site = window.nostrSite.renderer.getSite();
            const title = document.querySelector('title');
            const img = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
            const text = encodeURIComponent(title?.innerText || site.title);
            const ref = encodeURIComponent(window.location.href);
            let url = '';
            switch (app.id) {
                case 'twitter':
                    // FIXME also get hashtags from post
                    url = `https://twitter.com/intent/tweet?original_referer=${ref}&text=${text}&url=${ref}`;
                    break;
                case 'facebook':
                    url = `https://www.facebook.com/dialog/share?href=${ref}`;
                    break;
                case 'reddit':
                    url = `https://www.reddit.com/submit?title=${ref}`;
                    break;
                case 'pinterest':
                    url = `https://pinterest.com/pin/create/button/?url=${ref}&media=${img}`;
                    break;
                case 'telegram':
                    url = `https://t.me/share/url?url=${ref}&text=${text}`;
                    break;
                case 'linkedin':
                    url = `https://www.linkedin.com/shareArticle?mini=true&url=${ref}`;
                    break;
                case 'email':
                    url = `mailto:?subject=${text}&body=${ref}`;
                    break;
            }
            console.log('url', url, 'img', img);
            if (url)
                window.open(url, '_blank', 'noopener,noreferrer');
        }
        render() {
            if (!this.open)
                return D;
            return ke `
      <np-content-cta-modal @close-modal=${this._handleClose} .title=${'Share'}>
        <div class="flex flex-col gap-[8px] max-h-[600px] overflow-auto">
          ${this.apps.map((app) => {
            return ke ` <button
              class="py-[12px] px-[8px] cursor-pointer flex items-center hover:bg-neutral-100"
              @click=${() => this._handleAppClick(app)}
            >
              <div class="rounded-[6px] w-[28px] h-[28px] mr-[8px] flex items-center justify-center font-bold">
                ${app.icon}
              </div>
              <h2 class="text-base font-medium leading-tight text-neutral-900 truncate">${app.name}</h2>
            </button>`;
        })}
        </div>
      </np-content-cta-modal>
    `;
        }
    };
    ModalShareApps.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], ModalShareApps.prototype, "open", void 0);
    __decorate([
        n()
    ], ModalShareApps.prototype, "ready", void 0);
    __decorate([
        n()
    ], ModalShareApps.prototype, "openModal", void 0);
    __decorate([
        n()
    ], ModalShareApps.prototype, "onShareNostr", void 0);
    __decorate([
        n()
    ], ModalShareApps.prototype, "accent", void 0);
    __decorate([
        r()
    ], ModalShareApps.prototype, "apps", void 0);
    ModalShareApps = __decorate([
        t$1('np-content-cta-modal-share-apps')
    ], ModalShareApps);

    let ModalNostrShare = class ModalNostrShare extends s {
        constructor() {
            super(...arguments);
            this.open = false;
            this.text = '';
            this.highlightText = '';
            this.reply = false;
            this.accent = '';
        }
        _postMessage() {
            this._handleClose();
            if (this.highlightText) {
                this.publishHighlight(this.highlightText, this.textarea.value);
            }
            else {
                console.log(this.textarea.value);
                if (this.textarea.value) {
                    if (this.reply)
                        this.publishReply(this.textarea.value);
                    else
                        this.publishNote(this.textarea.value);
                }
            }
        }
        _handleClose() {
            this.dispatchEvent(new Event(`close-modal`));
        }
        render() {
            if (!this.open)
                return D;
            return ke `
      <np-content-cta-modal
        @close-modal=${this._handleClose}
        .title=${this.highlightText ? 'Highlight' : this.reply ? 'Comment on Nostr' : 'Share on Nostr'}
      >
        <div class="flex flex-col gap-[8px]">
          ${this.highlightText
            ? ke `<blockquote>
                <p>«${this.highlightText}»</p>
              </blockquote>`
            : D}
          <textarea
            class="w-full outline-none border-neutral-300 border-[1.5px] rounded-md p-2 py-3 placeholder:font-light transition-colors"
            style="${this.accent ? `border: 1px solid ${this.accent}` : ''}"
            rows="5"
            placeholder=${this.highlightText ? 'Optional comment' : 'Enter something'}
            id="np-textarea"
            @change=${(e) => (this.text = e.target.value)}
            .value=${this.text}
          ></textarea>
          <p class="w-full text-[14px] text-center text-gray">
            ${this.highlightText
            ? 'Highlight of this post will be published.'
            : this.reply
                ? 'A reply to this post will be published.'
                : 'A new thread will be started with your note.'}
          </p>
          <button
            class="rounded-lg p-2 text-white transition-colors"
            style="${this.accent ? `background-color: ${this.accent}` : ''}"
            @click=${this._postMessage}
          >
            Post
          </button>
        </div>
      </np-content-cta-modal>
    `;
        }
    };
    ModalNostrShare.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], ModalNostrShare.prototype, "open", void 0);
    __decorate([
        n()
    ], ModalNostrShare.prototype, "text", void 0);
    __decorate([
        n()
    ], ModalNostrShare.prototype, "highlightText", void 0);
    __decorate([
        n()
    ], ModalNostrShare.prototype, "reply", void 0);
    __decorate([
        n()
    ], ModalNostrShare.prototype, "publishNote", void 0);
    __decorate([
        n()
    ], ModalNostrShare.prototype, "publishReply", void 0);
    __decorate([
        n()
    ], ModalNostrShare.prototype, "publishHighlight", void 0);
    __decorate([
        n()
    ], ModalNostrShare.prototype, "accent", void 0);
    __decorate([
        e$1('#np-textarea')
    ], ModalNostrShare.prototype, "textarea", void 0);
    ModalNostrShare = __decorate([
        t$1('np-content-cta-modal-nostr-share')
    ], ModalNostrShare);

    let ModalLoading = class ModalLoading extends s {
        constructor() {
            super(...arguments);
            this.open = false;
            this.loading = "";
        }
        getTitle() {
            switch (this.loading) {
                case "bookmark": return "Posting bookmark...";
                case "follow": return "Following...";
                case "note": return "Publishing...";
                case "reaction": return "Posting your reaction...";
                case "share": return "Sharing...";
                case "highlight": return "Highlighting...";
            }
        }
        render() {
            if (!this.open)
                return D;
            return ke `
      <np-content-cta-modal .title=${this.getTitle()} .closeButton=${false}>
        <np-content-cta-loading></np-content-cta-loading>
      </np-content-cta-modal>
    `;
        }
    };
    ModalLoading.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], ModalLoading.prototype, "open", void 0);
    __decorate([
        n()
    ], ModalLoading.prototype, "loading", void 0);
    ModalLoading = __decorate([
        t$1('np-content-cta-modal-loading')
    ], ModalLoading);

    let ModalCompletion = class ModalCompletion extends s {
        constructor() {
            super(...arguments);
            this.open = false;
            this.title = 'Title';
            this.text = '';
            this.buttonText = '';
            this.avatar = '';
            this.userName = '';
        }
        _getProfilePicture(picture, name) {
            const username = name || 'User';
            if (!picture)
                return Icons.ProfileBig;
            return ke `<img alt="${username}" src="${picture}" class="rounded-full h-[48px] w-[48px]" />`;
        }
        _handleClose() {
            this.dispatchEvent(new Event(`close-modal`));
        }
        render() {
            if (!this.open)
                return D;
            return ke `
      <np-content-cta-modal @close-modal=${this._handleClose}>
        <div class="flex flex-col gap-[12px] items-center">
          <span class="h-[48px] w-[48px] inline-block"> ${this._getProfilePicture(this.avatar, this.userName)} </span>
          <h1 class="font-medium text-[20px]">${this.title}</h1>
          <p class="w-full text-[14px] text-center">${this.text}</p>
          <button
            class="w-full bg-sky-600 rounded-lg p-2 text-white hover:bg-sky-700 active:bg-sky-800 transition-colors"
            @click=${this._handleClose}
          >
            ${this.buttonText || 'Cancel'}
          </button>
        </div>
      </np-content-cta-modal>
    `;
        }
    };
    ModalCompletion.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], ModalCompletion.prototype, "open", void 0);
    __decorate([
        n()
    ], ModalCompletion.prototype, "title", void 0);
    __decorate([
        n()
    ], ModalCompletion.prototype, "text", void 0);
    __decorate([
        n()
    ], ModalCompletion.prototype, "buttonText", void 0);
    __decorate([
        n()
    ], ModalCompletion.prototype, "avatar", void 0);
    __decorate([
        n()
    ], ModalCompletion.prototype, "userName", void 0);
    ModalCompletion = __decorate([
        t$1('np-content-cta-modal-completion')
    ], ModalCompletion);

    let ModalReaction = class ModalReaction extends s {
        constructor() {
            super(...arguments);
            this.open = false;
            this.accent = '';
            this.dispatchLike = () => undefined;
            this.loading = false;
            this.profiles = [];
        }
        _handleClose() {
            this.dispatchEvent(new Event(`close-modal`));
        }
        async loadData() {
            if (!this.reaction)
                return;
            // @ts-ignore
            const nostrSite = window.nostrSite;
            const pubkeys = this.reaction.pubkeys || [];
            const profiles = await nostrSite.renderer.fetchProfiles([...pubkeys]);
            this.profiles = profiles;
        }
        async updated(changedProperties) {
            if (changedProperties.has('reaction') && this.reaction) {
                try {
                    this.loading = true;
                    await this.loadData();
                    this.loading = false;
                }
                catch {
                    this.loading = false;
                }
            }
        }
        _getProfilePicture(picture, name) {
            const username = name || 'User';
            if (!picture)
                return Icons.Profile;
            return ke `<img alt="${username}" src="${picture}" class="rounded-full h-[24px] w-[24px] object-cover" />`;
        }
        _handlePostReaction() {
            this._handleClose();
            this.dispatchLike(this.reaction.id);
        }
        _getProfileInfo(profile) {
            return {
                name: profile.profile?.display_name || profile.profile?.name || profile.id.substring(0, 10) + '...',
                picture: profile.profile?.picture || '',
            };
        }
        render() {
            if (!this.open || !this.reaction)
                return D;
            return ke `
      <np-content-cta-modal @close-modal=${this._handleClose} .title=${'Reactions'}>
        <div class="flex flex-col gap-[16px]">
          <div class="w-[80px] h-[80px] mx-auto flex items-center justify-center">
            <div class="scale-[4]">${this.reaction.icon}</div>
          </div>
          ${this.profiles.length
            ? ke ` <div class="flex flex-col gap-[4px] items-center">
                <p class="text-[15px]">Reacted (${this.reaction.count}):</p>
                <div class="flex flex-col gap-[8px] overflow-auto w-full" style="max-height: 350px">
                  ${this.profiles.map((profile) => {
                const { name, picture } = this._getProfileInfo(profile);
                return ke `<div class="p-[8px] rounded-[5px] bg-gray-50 hover:bg-gray-100" title="${profile.id}">
                      <a
                        class="flex items-center gap-[8px]"
                        href="https://njump.me/${profile.id}"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <span title="${name}" class="h-[24px] w-[24px] inline-block">
                          ${this._getProfilePicture(picture, name)}
                        </span>
                        <h2 class="text-[16px] font-medium leading-tight text-neutral-900 truncate">${name}</h2>
                      </a>
                    </div>`;
            })}
                </div>
              </div>`
            : ke `<div class="flex items-center justify-center">${Icons.LoadingSpinner}</div>`}
          <button
            class="w-full bg-sky-600 rounded-lg p-2 text-white hover:bg-sky-700 active:bg-sky-800 transition-colors flex items-center gap-[8px] justify-center"
            @click=${this._handlePostReaction}
            style="${this.accent ? `background-color: ${this.accent}` : ''}"
          >
            Post ${this.reaction.icon} reaction
          </button>
        </div>
      </np-content-cta-modal>
    `;
        }
    };
    ModalReaction.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], ModalReaction.prototype, "open", void 0);
    __decorate([
        n()
    ], ModalReaction.prototype, "reaction", void 0);
    __decorate([
        n()
    ], ModalReaction.prototype, "accent", void 0);
    __decorate([
        n()
    ], ModalReaction.prototype, "dispatchLike", void 0);
    __decorate([
        r()
    ], ModalReaction.prototype, "loading", void 0);
    __decorate([
        r()
    ], ModalReaction.prototype, "profiles", void 0);
    ModalReaction = __decorate([
        t$1('np-content-cta-modal-reaction')
    ], ModalReaction);

    let ModalZap = class ModalZap extends s {
        constructor() {
            super(...arguments);
            this.open = false;
            this.accent = '';
            this.dispatchZap = () => undefined;
        }
        _handleClose() {
            this.dispatchEvent(new Event(`close-modal`));
        }
        _getProfilePicture(picture, name) {
            const username = name || 'User';
            if (!picture)
                return Icons.ProfileBig;
            return ke `<img alt="${username}" src="${picture}" class="rounded-full h-[48px] w-[48px] object-cover" />`;
        }
        getSuggestedAmount() {
            return this.zap.amount + 1;
        }
        _handleZap() {
            this._handleClose();
            this.dispatchZap(this.getSuggestedAmount());
        }
        render() {
            if (!this.open || !this.zap)
                return D;
            // @ts-ignore
            const npub = window.nostrSite.nostrTools.nip19.npubEncode(this.zap.pubkey);
            return ke `
      <np-content-cta-modal @close-modal=${this._handleClose} .title=${'Zap'}>
        <div class="flex flex-col gap-[16px] items-center">
          <a
            class="flex flex-col items-center gap-[8px]"
            href="https://njump.me/${npub}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="h-[48px] w-[48px] inline-block">
              ${this._getProfilePicture(this.zap.profile.picture, this.zap.profile.name)}
            </span>
            <h2 class="text-lg font-medium leading-tight text-neutral-900 truncate">${this.zap.profile.name}</h2>
          </a>
          <div class="flex justify-center items-center gap-[8px] m-1">
            <div class="flex items-center justify-center" style="width: 64px; height: 64px">
              <div class="scale-[4]">${Icons.Zap}</div>
            </div>
            <span class="text-[32px] font-medium">${this.zap.amount} sats</span>
          </div>
          ${this.zap.comment ? ke ` <p class="w-full text-[14px] text-center">${this.zap.comment}</p>` : D}
          <button
            class="w-full bg-sky-600 rounded-lg p-2 text-white hover:bg-sky-700 active:bg-sky-800 transition-colors flex items-center gap-[8px] justify-center"
            @click=${this._handleZap}
            style="${this.accent ? `background-color: ${this.accent}` : ''}"
          >
            ${Icons.Zap} Zap ${this.getSuggestedAmount()}
          </button>
        </div>
      </np-content-cta-modal>
    `;
        }
    };
    ModalZap.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], ModalZap.prototype, "open", void 0);
    __decorate([
        n()
    ], ModalZap.prototype, "zap", void 0);
    __decorate([
        n()
    ], ModalZap.prototype, "accent", void 0);
    __decorate([
        n()
    ], ModalZap.prototype, "dispatchZap", void 0);
    ModalZap = __decorate([
        t$1('np-content-cta-modal-zap')
    ], ModalZap);

    const PLUS_REACTION = ke `<svg viewBox="0 0 24 24" class="w-[20px] h-[20px]">
  <path
    d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  ></path>
</svg>`;
    const MINUS_REACTION = ke `<svg viewBox="0 0 24 24" class="w-[20px] h-[20px]">
  <path
    d="M17.0001 2V13M22.0001 9.8V5.2C22.0001 4.07989 22.0001 3.51984 21.7821 3.09202C21.5903 2.71569 21.2844 2.40973 20.908 2.21799C20.4802 2 19.9202 2 18.8001 2H8.11806C6.65658 2 5.92584 2 5.33563 2.26743C4.81545 2.50314 4.37335 2.88242 4.06129 3.36072C3.70722 3.90339 3.59611 4.62564 3.37388 6.07012L2.8508 9.47012C2.5577 11.3753 2.41114 12.3279 2.69386 13.0691C2.94199 13.7197 3.4087 14.2637 4.01398 14.6079C4.70358 15 5.66739 15 7.59499 15H8.40005C8.96011 15 9.24013 15 9.45404 15.109C9.64221 15.2049 9.79519 15.3578 9.89106 15.546C10.0001 15.7599 10.0001 16.0399 10.0001 16.6V19.5342C10.0001 20.896 11.104 22 12.4659 22C12.7907 22 13.0851 21.8087 13.217 21.5119L16.5778 13.9502C16.7306 13.6062 16.807 13.4343 16.9278 13.3082C17.0346 13.1967 17.1658 13.1115 17.311 13.0592C17.4753 13 17.6635 13 18.0398 13H18.8001C19.9202 13 20.4802 13 20.908 12.782C21.2844 12.5903 21.5903 12.2843 21.7821 11.908C22.0001 11.4802 22.0001 10.9201 22.0001 9.8Z"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  ></path>
</svg>`;
    const REACTIONS_MOCK_DATA = [
        {
            id: 'e1',
            icon: '🤙',
            count: 28,
        },
        {
            id: 'e2',
            icon: '❤️',
            count: 6,
        },
        {
            id: 'e3',
            icon: '🚀',
            count: 5,
        },
        {
            id: 'e5',
            icon: '!',
            count: 55,
        },
        {
            id: 'e6',
            icon: '?',
            count: 550,
        },
        {
            id: 'e4',
            icon: '!',
            count: 112,
        },
    ];
    let Reactions = class Reactions extends s {
        constructor() {
            super(...arguments);
            this.ready = false;
            this.user = '';
            this.author = '';
            this.id = '';
            this.addr = '';
            this.accent = '';
            this.updateTrigger = 0;
            this.reactions = [];
            this.dispatchLike = () => undefined;
            this.since = 0;
            this.loading = false;
            this.selectedReaction = null;
        }
        async loadData() {
            // @ts-ignore
            console.log(Date.now(), 'content-cta reactions starting', window.nostrSite);
            // @ts-ignore
            const nostrSite = window.nostrSite;
            if (!nostrSite) {
                this.reactions = REACTIONS_MOCK_DATA;
                return;
            }
            await nostrSite.tabReady;
            console.log(Date.now(), 'content-cta reactions loading');
            const [id, addr] = [this.id, this.addr];
            if (!id && !addr)
                return;
            const filter = {
                kinds: [7],
                limit: 500,
                since: this.since + 1,
            };
            const filters = [];
            if (id)
                filters.push({ ...filter, '#e': [id] });
            if (addr)
                filters.push({ ...filter, '#a': [addr] });
            const relays = await getReadRelays({ authorPubkey: this.author, userPubkey: this.user });
            const events = await nostrSite.renderer.fetchEvents(filters, { relays, timeoutMs: 10000 });
            console.log(Date.now(), 'content-cta reaction events since', this.since, [...events]);
            console.log('reactions user pubkey', this.user);
            const reactions = [...this.reactions];
            for (const e of [...events]) {
                this.since = Math.max(this.since, e.created_at);
                const [shortcode, url] = nostrSite.utils.tvs(e, 'emoji') || ['', ''];
                // console.log('shortcode, url', shortcode, url, e.id)
                let id = e.content;
                let icon = id;
                if (url && e.content.trim() === ':' + shortcode + ':') {
                    id = url;
                    icon = ke `<img src=${url} alt=${shortcode} height="24" width="24" />`;
                }
                else if (!id || (/([\x00-\x7F])/.test(id) && id.length > 1)) {
                    console.log('bad emoji', id, e.id);
                    id = '+';
                }
                if (id === '+')
                    icon = PLUS_REACTION;
                else if (id === '-')
                    icon = MINUS_REACTION;
                const r = reactions.find((r) => r.id === id);
                if (r) {
                    r.count++;
                    r.pubkeys.push(e.pubkey);
                }
                else {
                    reactions.push({
                        id,
                        icon,
                        count: 1,
                        pubkeys: [e.pubkey],
                    });
                }
            }
            console.log('content-cta reactions', reactions);
            this.reactions = reactions;
            this.prepareData();
        }
        prepareData() {
            if (!this.reactions.length)
                return;
            console.log('reactions user pubkey', this.user);
            this.reactions.forEach((r) => (r.accent = Boolean(this.user && r.pubkeys && r.pubkeys.includes(this.user))));
            this.reactions.sort((a, b) => {
                if (a.accent === b.accent)
                    return b.count - a.count;
                return a.accent ? -1 : 1;
            });
        }
        async updated(changedProperties) {
            if (changedProperties.has('ready') || changedProperties.has('user') || changedProperties.has('updateTrigger')) {
                if (this.ready) {
                    if (this.loading)
                        return;
                    this.loading = true;
                    try {
                        await this.loadData();
                    }
                    catch { }
                    this.loading = false;
                }
            }
        }
        handleForceScrollSideways(event) {
            event.preventDefault();
            let [x, y] = [event.deltaX, event.deltaY];
            let magnitude;
            if (x === 0) {
                magnitude = y > 0 ? -30 : 30;
            }
            else {
                magnitude = x;
            }
            this.scrollContainer?.scrollBy({
                left: magnitude,
            });
        }
        firstUpdated() {
            if (this.scrollContainer) {
                this.scrollContainer.onwheel = (event) => {
                    this.handleForceScrollSideways(event);
                };
            }
        }
        _handleReactionClick(reaction) {
            this.selectedReaction = reaction;
        }
        _handleCloseReactionModal() {
            this.selectedReaction = null;
        }
        render() {
            return ke ` <div class="flex gap-[4px] overflow-auto scrollbar-hide" id="reactions-scroll-container">
        ${this.reactions.map((reaction) => {
            return ke `<button
            title="${reaction.id}${reaction.accent ? ' - your reaction' : ''}"
            class="flex justify-center items-center gap-[8px] px-[12px] border-[1px] border-gray-300 hover:bg-gray-100 h-[32px] active:bg-gray-200 rounded-[5px] min-w-[60px] text-[14px]"
            style="${reaction.accent ? `border: 1px solid ${this.accent}` : ''}"
            @click=${() => this._handleReactionClick(reaction)}
          >
            <span class="text-nowrap">${reaction.icon}</span>
            <span class="text-nowrap">${reaction.count}</span>
          </button>`;
        })}
      </div>
      <np-content-cta-modal-reaction
        .open=${!!this.selectedReaction}
        .accent=${this.accent}
        @close-modal=${this._handleCloseReactionModal}
        .reaction=${this.selectedReaction}
        .dispatchLike=${this.dispatchLike}
      >
      </np-content-cta-modal-reaction>`;
        }
    };
    Reactions.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], Reactions.prototype, "ready", void 0);
    __decorate([
        n()
    ], Reactions.prototype, "user", void 0);
    __decorate([
        n()
    ], Reactions.prototype, "author", void 0);
    __decorate([
        n()
    ], Reactions.prototype, "id", void 0);
    __decorate([
        n()
    ], Reactions.prototype, "addr", void 0);
    __decorate([
        n()
    ], Reactions.prototype, "accent", void 0);
    __decorate([
        n()
    ], Reactions.prototype, "updateTrigger", void 0);
    __decorate([
        n()
    ], Reactions.prototype, "reactions", void 0);
    __decorate([
        n()
    ], Reactions.prototype, "dispatchLike", void 0);
    __decorate([
        e$1('#reactions-scroll-container')
    ], Reactions.prototype, "scrollContainer", void 0);
    __decorate([
        r()
    ], Reactions.prototype, "since", void 0);
    __decorate([
        r()
    ], Reactions.prototype, "loading", void 0);
    __decorate([
        r()
    ], Reactions.prototype, "selectedReaction", void 0);
    Reactions = __decorate([
        t$1('np-content-cta-reactions')
    ], Reactions);

    var lib = {};

    (function (exports) {
    	/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    	Object.defineProperty(exports, "__esModule", { value: true });
    	exports.bytes = exports.stringToBytes = exports.str = exports.bytesToString = exports.hex = exports.utf8 = exports.bech32m = exports.bech32 = exports.base58check = exports.base58xmr = exports.base58xrp = exports.base58flickr = exports.base58 = exports.base64url = exports.base64 = exports.base32crockford = exports.base32hex = exports.base32 = exports.base16 = exports.utils = exports.assertNumber = void 0;
    	function assertNumber(n) {
    	    if (!Number.isSafeInteger(n))
    	        throw new Error(`Wrong integer: ${n}`);
    	}
    	exports.assertNumber = assertNumber;
    	function chain(...args) {
    	    const wrap = (a, b) => (c) => a(b(c));
    	    const encode = Array.from(args)
    	        .reverse()
    	        .reduce((acc, i) => (acc ? wrap(acc, i.encode) : i.encode), undefined);
    	    const decode = args.reduce((acc, i) => (acc ? wrap(acc, i.decode) : i.decode), undefined);
    	    return { encode, decode };
    	}
    	function alphabet(alphabet) {
    	    return {
    	        encode: (digits) => {
    	            if (!Array.isArray(digits) || (digits.length && typeof digits[0] !== 'number'))
    	                throw new Error('alphabet.encode input should be an array of numbers');
    	            return digits.map((i) => {
    	                assertNumber(i);
    	                if (i < 0 || i >= alphabet.length)
    	                    throw new Error(`Digit index outside alphabet: ${i} (alphabet: ${alphabet.length})`);
    	                return alphabet[i];
    	            });
    	        },
    	        decode: (input) => {
    	            if (!Array.isArray(input) || (input.length && typeof input[0] !== 'string'))
    	                throw new Error('alphabet.decode input should be array of strings');
    	            return input.map((letter) => {
    	                if (typeof letter !== 'string')
    	                    throw new Error(`alphabet.decode: not string element=${letter}`);
    	                const index = alphabet.indexOf(letter);
    	                if (index === -1)
    	                    throw new Error(`Unknown letter: "${letter}". Allowed: ${alphabet}`);
    	                return index;
    	            });
    	        },
    	    };
    	}
    	function join(separator = '') {
    	    if (typeof separator !== 'string')
    	        throw new Error('join separator should be string');
    	    return {
    	        encode: (from) => {
    	            if (!Array.isArray(from) || (from.length && typeof from[0] !== 'string'))
    	                throw new Error('join.encode input should be array of strings');
    	            for (let i of from)
    	                if (typeof i !== 'string')
    	                    throw new Error(`join.encode: non-string input=${i}`);
    	            return from.join(separator);
    	        },
    	        decode: (to) => {
    	            if (typeof to !== 'string')
    	                throw new Error('join.decode input should be string');
    	            return to.split(separator);
    	        },
    	    };
    	}
    	function padding(bits, chr = '=') {
    	    assertNumber(bits);
    	    if (typeof chr !== 'string')
    	        throw new Error('padding chr should be string');
    	    return {
    	        encode(data) {
    	            if (!Array.isArray(data) || (data.length && typeof data[0] !== 'string'))
    	                throw new Error('padding.encode input should be array of strings');
    	            for (let i of data)
    	                if (typeof i !== 'string')
    	                    throw new Error(`padding.encode: non-string input=${i}`);
    	            while ((data.length * bits) % 8)
    	                data.push(chr);
    	            return data;
    	        },
    	        decode(input) {
    	            if (!Array.isArray(input) || (input.length && typeof input[0] !== 'string'))
    	                throw new Error('padding.encode input should be array of strings');
    	            for (let i of input)
    	                if (typeof i !== 'string')
    	                    throw new Error(`padding.decode: non-string input=${i}`);
    	            let end = input.length;
    	            if ((end * bits) % 8)
    	                throw new Error('Invalid padding: string should have whole number of bytes');
    	            for (; end > 0 && input[end - 1] === chr; end--) {
    	                if (!(((end - 1) * bits) % 8))
    	                    throw new Error('Invalid padding: string has too much padding');
    	            }
    	            return input.slice(0, end);
    	        },
    	    };
    	}
    	function normalize(fn) {
    	    if (typeof fn !== 'function')
    	        throw new Error('normalize fn should be function');
    	    return { encode: (from) => from, decode: (to) => fn(to) };
    	}
    	function convertRadix(data, from, to) {
    	    if (from < 2)
    	        throw new Error(`convertRadix: wrong from=${from}, base cannot be less than 2`);
    	    if (to < 2)
    	        throw new Error(`convertRadix: wrong to=${to}, base cannot be less than 2`);
    	    if (!Array.isArray(data))
    	        throw new Error('convertRadix: data should be array');
    	    if (!data.length)
    	        return [];
    	    let pos = 0;
    	    const res = [];
    	    const digits = Array.from(data);
    	    digits.forEach((d) => {
    	        assertNumber(d);
    	        if (d < 0 || d >= from)
    	            throw new Error(`Wrong integer: ${d}`);
    	    });
    	    while (true) {
    	        let carry = 0;
    	        let done = true;
    	        for (let i = pos; i < digits.length; i++) {
    	            const digit = digits[i];
    	            const digitBase = from * carry + digit;
    	            if (!Number.isSafeInteger(digitBase) ||
    	                (from * carry) / from !== carry ||
    	                digitBase - digit !== from * carry) {
    	                throw new Error('convertRadix: carry overflow');
    	            }
    	            carry = digitBase % to;
    	            digits[i] = Math.floor(digitBase / to);
    	            if (!Number.isSafeInteger(digits[i]) || digits[i] * to + carry !== digitBase)
    	                throw new Error('convertRadix: carry overflow');
    	            if (!done)
    	                continue;
    	            else if (!digits[i])
    	                pos = i;
    	            else
    	                done = false;
    	        }
    	        res.push(carry);
    	        if (done)
    	            break;
    	    }
    	    for (let i = 0; i < data.length - 1 && data[i] === 0; i++)
    	        res.push(0);
    	    return res.reverse();
    	}
    	const gcd = (a, b) => (!b ? a : gcd(b, a % b));
    	const radix2carry = (from, to) => from + (to - gcd(from, to));
    	function convertRadix2(data, from, to, padding) {
    	    if (!Array.isArray(data))
    	        throw new Error('convertRadix2: data should be array');
    	    if (from <= 0 || from > 32)
    	        throw new Error(`convertRadix2: wrong from=${from}`);
    	    if (to <= 0 || to > 32)
    	        throw new Error(`convertRadix2: wrong to=${to}`);
    	    if (radix2carry(from, to) > 32) {
    	        throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
    	    }
    	    let carry = 0;
    	    let pos = 0;
    	    const mask = 2 ** to - 1;
    	    const res = [];
    	    for (const n of data) {
    	        assertNumber(n);
    	        if (n >= 2 ** from)
    	            throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
    	        carry = (carry << from) | n;
    	        if (pos + from > 32)
    	            throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
    	        pos += from;
    	        for (; pos >= to; pos -= to)
    	            res.push(((carry >> (pos - to)) & mask) >>> 0);
    	        carry &= 2 ** pos - 1;
    	    }
    	    carry = (carry << (to - pos)) & mask;
    	    if (!padding && pos >= from)
    	        throw new Error('Excess padding');
    	    if (!padding && carry)
    	        throw new Error(`Non-zero padding: ${carry}`);
    	    if (padding && pos > 0)
    	        res.push(carry >>> 0);
    	    return res;
    	}
    	function radix(num) {
    	    assertNumber(num);
    	    return {
    	        encode: (bytes) => {
    	            if (!(bytes instanceof Uint8Array))
    	                throw new Error('radix.encode input should be Uint8Array');
    	            return convertRadix(Array.from(bytes), 2 ** 8, num);
    	        },
    	        decode: (digits) => {
    	            if (!Array.isArray(digits) || (digits.length && typeof digits[0] !== 'number'))
    	                throw new Error('radix.decode input should be array of strings');
    	            return Uint8Array.from(convertRadix(digits, num, 2 ** 8));
    	        },
    	    };
    	}
    	function radix2(bits, revPadding = false) {
    	    assertNumber(bits);
    	    if (bits <= 0 || bits > 32)
    	        throw new Error('radix2: bits should be in (0..32]');
    	    if (radix2carry(8, bits) > 32 || radix2carry(bits, 8) > 32)
    	        throw new Error('radix2: carry overflow');
    	    return {
    	        encode: (bytes) => {
    	            if (!(bytes instanceof Uint8Array))
    	                throw new Error('radix2.encode input should be Uint8Array');
    	            return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
    	        },
    	        decode: (digits) => {
    	            if (!Array.isArray(digits) || (digits.length && typeof digits[0] !== 'number'))
    	                throw new Error('radix2.decode input should be array of strings');
    	            return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
    	        },
    	    };
    	}
    	function unsafeWrapper(fn) {
    	    if (typeof fn !== 'function')
    	        throw new Error('unsafeWrapper fn should be function');
    	    return function (...args) {
    	        try {
    	            return fn.apply(null, args);
    	        }
    	        catch (e) { }
    	    };
    	}
    	function checksum(len, fn) {
    	    assertNumber(len);
    	    if (typeof fn !== 'function')
    	        throw new Error('checksum fn should be function');
    	    return {
    	        encode(data) {
    	            if (!(data instanceof Uint8Array))
    	                throw new Error('checksum.encode: input should be Uint8Array');
    	            const checksum = fn(data).slice(0, len);
    	            const res = new Uint8Array(data.length + len);
    	            res.set(data);
    	            res.set(checksum, data.length);
    	            return res;
    	        },
    	        decode(data) {
    	            if (!(data instanceof Uint8Array))
    	                throw new Error('checksum.decode: input should be Uint8Array');
    	            const payload = data.slice(0, -len);
    	            const newChecksum = fn(payload).slice(0, len);
    	            const oldChecksum = data.slice(-len);
    	            for (let i = 0; i < len; i++)
    	                if (newChecksum[i] !== oldChecksum[i])
    	                    throw new Error('Invalid checksum');
    	            return payload;
    	        },
    	    };
    	}
    	exports.utils = { alphabet, chain, checksum, radix, radix2, join, padding };
    	exports.base16 = chain(radix2(4), alphabet('0123456789ABCDEF'), join(''));
    	exports.base32 = chain(radix2(5), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), padding(5), join(''));
    	exports.base32hex = chain(radix2(5), alphabet('0123456789ABCDEFGHIJKLMNOPQRSTUV'), padding(5), join(''));
    	exports.base32crockford = chain(radix2(5), alphabet('0123456789ABCDEFGHJKMNPQRSTVWXYZ'), join(''), normalize((s) => s.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1')));
    	exports.base64 = chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'), padding(6), join(''));
    	exports.base64url = chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'), padding(6), join(''));
    	const genBase58 = (abc) => chain(radix(58), alphabet(abc), join(''));
    	exports.base58 = genBase58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
    	exports.base58flickr = genBase58('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ');
    	exports.base58xrp = genBase58('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz');
    	const XMR_BLOCK_LEN = [0, 2, 3, 5, 6, 7, 9, 10, 11];
    	exports.base58xmr = {
    	    encode(data) {
    	        let res = '';
    	        for (let i = 0; i < data.length; i += 8) {
    	            const block = data.subarray(i, i + 8);
    	            res += exports.base58.encode(block).padStart(XMR_BLOCK_LEN[block.length], '1');
    	        }
    	        return res;
    	    },
    	    decode(str) {
    	        let res = [];
    	        for (let i = 0; i < str.length; i += 11) {
    	            const slice = str.slice(i, i + 11);
    	            const blockLen = XMR_BLOCK_LEN.indexOf(slice.length);
    	            const block = exports.base58.decode(slice);
    	            for (let j = 0; j < block.length - blockLen; j++) {
    	                if (block[j] !== 0)
    	                    throw new Error('base58xmr: wrong padding');
    	            }
    	            res = res.concat(Array.from(block.slice(block.length - blockLen)));
    	        }
    	        return Uint8Array.from(res);
    	    },
    	};
    	const base58check = (sha256) => chain(checksum(4, (data) => sha256(sha256(data))), exports.base58);
    	exports.base58check = base58check;
    	const BECH_ALPHABET = chain(alphabet('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), join(''));
    	const POLYMOD_GENERATORS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
    	function bech32Polymod(pre) {
    	    const b = pre >> 25;
    	    let chk = (pre & 0x1ffffff) << 5;
    	    for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
    	        if (((b >> i) & 1) === 1)
    	            chk ^= POLYMOD_GENERATORS[i];
    	    }
    	    return chk;
    	}
    	function bechChecksum(prefix, words, encodingConst = 1) {
    	    const len = prefix.length;
    	    let chk = 1;
    	    for (let i = 0; i < len; i++) {
    	        const c = prefix.charCodeAt(i);
    	        if (c < 33 || c > 126)
    	            throw new Error(`Invalid prefix (${prefix})`);
    	        chk = bech32Polymod(chk) ^ (c >> 5);
    	    }
    	    chk = bech32Polymod(chk);
    	    for (let i = 0; i < len; i++)
    	        chk = bech32Polymod(chk) ^ (prefix.charCodeAt(i) & 0x1f);
    	    for (let v of words)
    	        chk = bech32Polymod(chk) ^ v;
    	    for (let i = 0; i < 6; i++)
    	        chk = bech32Polymod(chk);
    	    chk ^= encodingConst;
    	    return BECH_ALPHABET.encode(convertRadix2([chk % 2 ** 30], 30, 5, false));
    	}
    	function genBech32(encoding) {
    	    const ENCODING_CONST = encoding === 'bech32' ? 1 : 0x2bc830a3;
    	    const _words = radix2(5);
    	    const fromWords = _words.decode;
    	    const toWords = _words.encode;
    	    const fromWordsUnsafe = unsafeWrapper(fromWords);
    	    function encode(prefix, words, limit = 90) {
    	        if (typeof prefix !== 'string')
    	            throw new Error(`bech32.encode prefix should be string, not ${typeof prefix}`);
    	        if (!Array.isArray(words) || (words.length && typeof words[0] !== 'number'))
    	            throw new Error(`bech32.encode words should be array of numbers, not ${typeof words}`);
    	        const actualLength = prefix.length + 7 + words.length;
    	        if (limit !== false && actualLength > limit)
    	            throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
    	        prefix = prefix.toLowerCase();
    	        return `${prefix}1${BECH_ALPHABET.encode(words)}${bechChecksum(prefix, words, ENCODING_CONST)}`;
    	    }
    	    function decode(str, limit = 90) {
    	        if (typeof str !== 'string')
    	            throw new Error(`bech32.decode input should be string, not ${typeof str}`);
    	        if (str.length < 8 || (limit !== false && str.length > limit))
    	            throw new TypeError(`Wrong string length: ${str.length} (${str}). Expected (8..${limit})`);
    	        const lowered = str.toLowerCase();
    	        if (str !== lowered && str !== str.toUpperCase())
    	            throw new Error(`String must be lowercase or uppercase`);
    	        str = lowered;
    	        const sepIndex = str.lastIndexOf('1');
    	        if (sepIndex === 0 || sepIndex === -1)
    	            throw new Error(`Letter "1" must be present between prefix and data only`);
    	        const prefix = str.slice(0, sepIndex);
    	        const _words = str.slice(sepIndex + 1);
    	        if (_words.length < 6)
    	            throw new Error('Data must be at least 6 characters long');
    	        const words = BECH_ALPHABET.decode(_words).slice(0, -6);
    	        const sum = bechChecksum(prefix, words, ENCODING_CONST);
    	        if (!_words.endsWith(sum))
    	            throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
    	        return { prefix, words };
    	    }
    	    const decodeUnsafe = unsafeWrapper(decode);
    	    function decodeToBytes(str) {
    	        const { prefix, words } = decode(str, false);
    	        return { prefix, words, bytes: fromWords(words) };
    	    }
    	    return { encode, decode, decodeToBytes, decodeUnsafe, fromWords, fromWordsUnsafe, toWords };
    	}
    	exports.bech32 = genBech32('bech32');
    	exports.bech32m = genBech32('bech32m');
    	exports.utf8 = {
    	    encode: (data) => new TextDecoder().decode(data),
    	    decode: (str) => new TextEncoder().encode(str),
    	};
    	exports.hex = chain(radix2(4), alphabet('0123456789abcdef'), join(''), normalize((s) => {
    	    if (typeof s !== 'string' || s.length % 2)
    	        throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
    	    return s.toLowerCase();
    	}));
    	const CODERS = {
    	    utf8: exports.utf8, hex: exports.hex, base16: exports.base16, base32: exports.base32, base64: exports.base64, base64url: exports.base64url, base58: exports.base58, base58xmr: exports.base58xmr
    	};
    	const coderTypeError = `Invalid encoding type. Available types: ${Object.keys(CODERS).join(', ')}`;
    	const bytesToString = (type, bytes) => {
    	    if (typeof type !== 'string' || !CODERS.hasOwnProperty(type))
    	        throw new TypeError(coderTypeError);
    	    if (!(bytes instanceof Uint8Array))
    	        throw new TypeError('bytesToString() expects Uint8Array');
    	    return CODERS[type].encode(bytes);
    	};
    	exports.bytesToString = bytesToString;
    	exports.str = exports.bytesToString;
    	const stringToBytes = (type, str) => {
    	    if (!CODERS.hasOwnProperty(type))
    	        throw new TypeError(coderTypeError);
    	    if (typeof str !== 'string')
    	        throw new TypeError('stringToBytes() expects string');
    	    return CODERS[type].decode(str);
    	};
    	exports.stringToBytes = stringToBytes;
    	exports.bytes = exports.stringToBytes; 
    } (lib));

    const {bech32, hex, utf8} = lib;

    // defaults for encode; default timestamp is current time at call
    const DEFAULTNETWORK = {
      // default network is bitcoin
      bech32: 'bc',
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      validWitnessVersions: [0]
    };
    const TESTNETWORK = {
      bech32: 'tb',
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      validWitnessVersions: [0]
    };
    const SIGNETNETWORK = {
      bech32: 'tbs',
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      validWitnessVersions: [0]
    };
    const REGTESTNETWORK = {
      bech32: 'bcrt',
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      validWitnessVersions: [0]
    };
    const SIMNETWORK = {
      bech32: 'sb',
      pubKeyHash: 0x3f,
      scriptHash: 0x7b,
      validWitnessVersions: [0]
    };

    const FEATUREBIT_ORDER = [
      'option_data_loss_protect',
      'initial_routing_sync',
      'option_upfront_shutdown_script',
      'gossip_queries',
      'var_onion_optin',
      'gossip_queries_ex',
      'option_static_remotekey',
      'payment_secret',
      'basic_mpp',
      'option_support_large_channel'
    ];

    const DIVISORS = {
      m: BigInt(1e3),
      u: BigInt(1e6),
      n: BigInt(1e9),
      p: BigInt(1e12)
    };

    const MAX_MILLISATS = BigInt('2100000000000000000');

    const MILLISATS_PER_BTC = BigInt(1e11);

    const TAGCODES = {
      payment_hash: 1,
      payment_secret: 16,
      description: 13,
      payee: 19,
      description_hash: 23, // commit to longer descriptions (used by lnurl-pay)
      expiry: 6, // default: 3600 (1 hour)
      min_final_cltv_expiry: 24, // default: 9
      fallback_address: 9,
      route_hint: 3, // for extra routing info (private etc.)
      feature_bits: 5,
      metadata: 27
    };

    // reverse the keys and values of TAGCODES and insert into TAGNAMES
    const TAGNAMES = {};
    for (let i = 0, keys = Object.keys(TAGCODES); i < keys.length; i++) {
      const currentName = keys[i];
      const currentCode = TAGCODES[keys[i]].toString();
      TAGNAMES[currentCode] = currentName;
    }

    const TAGPARSERS = {
      1: words => hex.encode(bech32.fromWordsUnsafe(words)), // 256 bits
      16: words => hex.encode(bech32.fromWordsUnsafe(words)), // 256 bits
      13: words => utf8.encode(bech32.fromWordsUnsafe(words)), // string variable length
      19: words => hex.encode(bech32.fromWordsUnsafe(words)), // 264 bits
      23: words => hex.encode(bech32.fromWordsUnsafe(words)), // 256 bits
      27: words => hex.encode(bech32.fromWordsUnsafe(words)), // variable
      6: wordsToIntBE, // default: 3600 (1 hour)
      24: wordsToIntBE, // default: 9
      3: routingInfoParser, // for extra routing info (private etc.)
      5: featureBitsParser // keep feature bits as array of 5 bit words
    };

    function getUnknownParser(tagCode) {
      return words => ({
        tagCode: parseInt(tagCode),
        words: bech32.encode('unknown', words, Number.MAX_SAFE_INTEGER)
      })
    }

    function wordsToIntBE(words) {
      return words.reverse().reduce((total, item, index) => {
        return total + item * Math.pow(32, index)
      }, 0)
    }

    // first convert from words to buffer, trimming padding where necessary
    // parse in 51 byte chunks. See encoder for details.
    function routingInfoParser(words) {
      const routes = [];
      let pubkey,
        shortChannelId,
        feeBaseMSats,
        feeProportionalMillionths,
        cltvExpiryDelta;
      let routesBuffer = bech32.fromWordsUnsafe(words);
      while (routesBuffer.length > 0) {
        pubkey = hex.encode(routesBuffer.slice(0, 33)); // 33 bytes
        shortChannelId = hex.encode(routesBuffer.slice(33, 41)); // 8 bytes
        feeBaseMSats = parseInt(hex.encode(routesBuffer.slice(41, 45)), 16); // 4 bytes
        feeProportionalMillionths = parseInt(
          hex.encode(routesBuffer.slice(45, 49)),
          16
        ); // 4 bytes
        cltvExpiryDelta = parseInt(hex.encode(routesBuffer.slice(49, 51)), 16); // 2 bytes

        routesBuffer = routesBuffer.slice(51);

        routes.push({
          pubkey,
          short_channel_id: shortChannelId,
          fee_base_msat: feeBaseMSats,
          fee_proportional_millionths: feeProportionalMillionths,
          cltv_expiry_delta: cltvExpiryDelta
        });
      }
      return routes
    }

    function featureBitsParser(words) {
      const bools = words
        .slice()
        .reverse()
        .map(word => [
          !!(word & 0b1),
          !!(word & 0b10),
          !!(word & 0b100),
          !!(word & 0b1000),
          !!(word & 0b10000)
        ])
        .reduce((finalArr, itemArr) => finalArr.concat(itemArr), []);
      while (bools.length < FEATUREBIT_ORDER.length * 2) {
        bools.push(false);
      }

      const featureBits = {};

      FEATUREBIT_ORDER.forEach((featureName, index) => {
        let status;
        if (bools[index * 2]) {
          status = 'required';
        } else if (bools[index * 2 + 1]) {
          status = 'supported';
        } else {
          status = 'unsupported';
        }
        featureBits[featureName] = status;
      });

      const extraBits = bools.slice(FEATUREBIT_ORDER.length * 2);
      featureBits.extra_bits = {
        start_bit: FEATUREBIT_ORDER.length * 2,
        bits: extraBits,
        has_required: extraBits.reduce(
          (result, bit, index) =>
            index % 2 !== 0 ? result || false : result || bit,
          false
        )
      };

      return featureBits
    }

    function hrpToMillisat(hrpString, outputString) {
      let divisor, value;
      if (hrpString.slice(-1).match(/^[munp]$/)) {
        divisor = hrpString.slice(-1);
        value = hrpString.slice(0, -1);
      } else if (hrpString.slice(-1).match(/^[^munp0-9]$/)) {
        throw new Error('Not a valid multiplier for the amount')
      } else {
        value = hrpString;
      }

      if (!value.match(/^\d+$/))
        throw new Error('Not a valid human readable amount')

      const valueBN = BigInt(value);

      const millisatoshisBN = divisor
        ? (valueBN * MILLISATS_PER_BTC) / DIVISORS[divisor]
        : valueBN * MILLISATS_PER_BTC;

      if (
        (divisor === 'p' && !(valueBN % BigInt(10) === BigInt(0))) ||
        millisatoshisBN > MAX_MILLISATS
      ) {
        throw new Error('Amount is outside of valid range')
      }

      return outputString ? millisatoshisBN.toString() : millisatoshisBN
    }

    // decode will only have extra comments that aren't covered in encode comments.
    // also if anything is hard to read I'll comment.
    function decode(paymentRequest, network) {
      if (typeof paymentRequest !== 'string')
        throw new Error('Lightning Payment Request must be string')
      if (paymentRequest.slice(0, 2).toLowerCase() !== 'ln')
        throw new Error('Not a proper lightning payment request')

      const sections = [];
      const decoded = bech32.decode(paymentRequest, Number.MAX_SAFE_INTEGER);
      paymentRequest = paymentRequest.toLowerCase();
      const prefix = decoded.prefix;
      let words = decoded.words;
      let letters = paymentRequest.slice(prefix.length + 1);
      let sigWords = words.slice(-104);
      words = words.slice(0, -104);

      // Without reverse lookups, can't say that the multipier at the end must
      // have a number before it, so instead we parse, and if the second group
      // doesn't have anything, there's a good chance the last letter of the
      // coin type got captured by the third group, so just re-regex without
      // the number.
      let prefixMatches = prefix.match(/^ln(\S+?)(\d*)([a-zA-Z]?)$/);
      if (prefixMatches && !prefixMatches[2])
        prefixMatches = prefix.match(/^ln(\S+)$/);
      if (!prefixMatches) {
        throw new Error('Not a proper lightning payment request')
      }

      // "ln" section
      sections.push({
        name: 'lightning_network',
        letters: 'ln'
      });

      // "bc" section
      const bech32Prefix = prefixMatches[1];
      let coinNetwork;
      if (!network) {
        switch (bech32Prefix) {
          case DEFAULTNETWORK.bech32:
            coinNetwork = DEFAULTNETWORK;
            break
          case TESTNETWORK.bech32:
            coinNetwork = TESTNETWORK;
            break
          case SIGNETNETWORK.bech32:
            coinNetwork = SIGNETNETWORK;
            break
          case REGTESTNETWORK.bech32:
            coinNetwork = REGTESTNETWORK;
            break
          case SIMNETWORK.bech32:
            coinNetwork = SIMNETWORK;
            break
        }
      } else {
        if (
          network.bech32 === undefined ||
          network.pubKeyHash === undefined ||
          network.scriptHash === undefined ||
          !Array.isArray(network.validWitnessVersions)
        )
          throw new Error('Invalid network')
        coinNetwork = network;
      }
      if (!coinNetwork || coinNetwork.bech32 !== bech32Prefix) {
        throw new Error('Unknown coin bech32 prefix')
      }
      sections.push({
        name: 'coin_network',
        letters: bech32Prefix,
        value: coinNetwork
      });

      // amount section
      const value = prefixMatches[2];
      let millisatoshis;
      if (value) {
        const divisor = prefixMatches[3];
        millisatoshis = hrpToMillisat(value + divisor, true);
        sections.push({
          name: 'amount',
          letters: prefixMatches[2] + prefixMatches[3],
          value: millisatoshis
        });
      } else {
        millisatoshis = null;
      }

      // "1" separator
      sections.push({
        name: 'separator',
        letters: '1'
      });

      // timestamp
      const timestamp = wordsToIntBE(words.slice(0, 7));
      words = words.slice(7); // trim off the left 7 words
      sections.push({
        name: 'timestamp',
        letters: letters.slice(0, 7),
        value: timestamp
      });
      letters = letters.slice(7);

      let tagName, parser, tagLength, tagWords;
      // we have no tag count to go on, so just keep hacking off words
      // until we have none.
      while (words.length > 0) {
        const tagCode = words[0].toString();
        tagName = TAGNAMES[tagCode] || 'unknown_tag';
        parser = TAGPARSERS[tagCode] || getUnknownParser(tagCode);
        words = words.slice(1);

        tagLength = wordsToIntBE(words.slice(0, 2));
        words = words.slice(2);

        tagWords = words.slice(0, tagLength);
        words = words.slice(tagLength);

        sections.push({
          name: tagName,
          tag: letters[0],
          letters: letters.slice(0, 1 + 2 + tagLength),
          value: parser(tagWords) // see: parsers for more comments
        });
        letters = letters.slice(1 + 2 + tagLength);
      }

      // signature
      sections.push({
        name: 'signature',
        letters: letters.slice(0, 104),
        value: hex.encode(bech32.fromWordsUnsafe(sigWords))
      });
      letters = letters.slice(104);

      // checksum
      sections.push({
        name: 'checksum',
        letters: letters
      });

      let result = {
        paymentRequest,
        sections,

        get expiry() {
          let exp = sections.find(s => s.name === 'expiry');
          if (exp) return getValue('timestamp') + exp.value
        },

        get route_hints() {
          return sections.filter(s => s.name === 'route_hint').map(s => s.value)
        }
      };

      for (let name in TAGCODES) {
        if (name === 'route_hint') {
          // route hints can be multiple, so this won't work for them
          continue
        }

        Object.defineProperty(result, name, {
          get() {
            return getValue(name)
          }
        });
      }

      return result

      function getValue(name) {
        let section = sections.find(s => s.name === name);
        return section ? section.value : undefined
      }
    }

    var bolt11 = {
      decode,
      hrpToMillisat
    };

    const ZAPS_MOCK_DATA = [
        {
            id: 'e1',
            amount: 2800,
            pubkey: '',
            profile: {
                picture: '',
                name: 'John Doe',
            },
            comment: 'Some cool comment, and it is very long comment ',
        },
        {
            id: 'e2',
            amount: 6960,
            pubkey: '',
            profile: {
                picture: 'https://image.nostr.build/89ad0e9a72ff60b6c8c7dc71bb92800598c56d09cad44a4ff6b700479104811f.jpg',
                name: 'John Doe',
            },
            comment: '',
        },
        {
            id: 'e3',
            amount: 100,
            pubkey: '',
            profile: {
                picture: 'https://m.primal.net/IAbB.jpg',
                name: 'John Doe',
            },
            comment: 'Some cool comment',
        },
        {
            id: 'e1',
            amount: 2800,
            pubkey: '',
            profile: {
                picture: 'https://void.cat/d/LdLxqc3dPmtZboZ1NTe4HP',
                name: 'John Doe',
            },
            comment: 'Some cool comment',
        },
        {
            id: 'e2',
            amount: 6960,
            pubkey: '',
            profile: {
                picture: 'https://image.nostr.build/89ad0e9a72ff60b6c8c7dc71bb92800598c56d09cad44a4ff6b700479104811f.jpg',
                name: 'John Doe',
            },
            comment: 'Some cool comment',
        },
        {
            id: 'e3',
            amount: 100,
            pubkey: '',
            profile: {
                picture: 'https://m.primal.net/IAbB.jpg',
                name: 'John Doe',
            },
            comment: 'Some cool comment',
        },
        {
            id: 'e1',
            amount: 2800,
            pubkey: '',
            profile: {
                picture: 'https://void.cat/d/LdLxqc3dPmtZboZ1NTe4HP',
                name: 'John Doe',
            },
            comment: 'Some cool comment',
        },
        {
            id: 'e2',
            amount: 6960,
            pubkey: '',
            profile: {
                picture: 'https://image.nostr.build/89ad0e9a72ff60b6c8c7dc71bb92800598c56d09cad44a4ff6b700479104811f.jpg',
                name: 'John Doe',
            },
            comment: 'Some cool comment',
        },
        {
            id: 'e3',
            amount: 100,
            pubkey: '',
            profile: {
                picture: 'https://m.primal.net/IAbB.jpg',
                name: 'John Doe',
            },
            comment: 'Some cool comment',
        },
        {
            id: 'e4',
            amount: 1000000,
            pubkey: '',
            profile: {
                picture: 'https://m.primal.net/IAbB.jpg',
                name: 'John Doe',
            },
            comment: 'Some cool comment',
        },
        {
            id: 'e5',
            amount: 1000000000,
            pubkey: '',
            profile: {
                picture: 'https://m.primal.net/IAbB.jpg',
                name: 'John Doe',
            },
            comment: 'Some cool comment',
        },
    ];
    let Zaps = class Zaps extends s {
        constructor() {
            super(...arguments);
            this.ready = false;
            this.user = '';
            this.author = '';
            this.id = '';
            this.addr = '';
            this.authorPubkey = '';
            this.accent = '';
            this.updateTrigger = 0;
            this.zaps = [];
            this.dispatchZap = () => undefined;
            this.since = 0;
            this.loading = false;
            this.selectedZap = null;
        }
        prepareZapsAmount(amount) {
            const formatter = Intl.NumberFormat('en', { notation: 'compact' });
            return formatter.format(amount);
        }
        async loadData() {
            // @ts-ignore
            console.log(Date.now(), 'content-cta zaps starting', window.nostrSite);
            // @ts-ignore
            const nostrSite = window.nostrSite;
            if (!nostrSite) {
                this.zaps = ZAPS_MOCK_DATA;
                return;
            }
            await nostrSite.tabReady;
            console.log(Date.now(), 'content-cta zaps loading');
            // FIXME tests
            const [id, addr] = [this.id, this.addr];
            if (!id && !addr)
                return;
            const filter = {
                kinds: [9735],
                limit: 500,
                since: this.since + 1,
            };
            const filters = [];
            if (id)
                filters.push({ ...filter, '#e': [id] });
            if (addr)
                filters.push({ ...filter, '#a': [addr] });
            const relays = await getReadRelays({ authorPubkey: this.author, userPubkey: this.user });
            const events = await nostrSite.renderer.fetchEvents(filters, { relays, timeoutMs: 10000 });
            console.log(Date.now(), 'content-cta zaps', events);
            // get zap authors and amounts
            const pubkeys = new Set(this.zaps.map((z) => z.pubkey));
            const zaps = [...this.zaps];
            for (const e of [...events]) {
                // cursor
                this.since = Math.max(this.since, e.created_at);
                let pubkey = '';
                let amount = 0;
                let comment = '';
                try {
                    const desc = JSON.parse(nostrSite.utils.tv(e, 'description'));
                    if (desc.pubkey.length !== 64)
                        throw new Error('Bad zap pubkey');
                    pubkey = desc.pubkey;
                    amount = Number(nostrSite.utils.tv(desc, 'amount'));
                    comment = desc.content;
                    if (!amount) {
                        const req = bolt11.decode(nostrSite.utils.tv(e, 'bolt11'));
                        amount = Number(req.sections.find((s) => s.name === 'amount').value);
                    }
                    amount /= 1000; // msat => sat
                }
                catch (err) {
                    console.log('invalid zap description', e, err);
                }
                if (!pubkey || !amount)
                    continue;
                pubkeys.add(pubkey);
                zaps.push({
                    id: e.id,
                    amount,
                    pubkey,
                    profile: {
                        picture: '',
                        name: nostrSite.nostrTools.nip19.npubEncode(pubkey).substring(0, 10) + '...',
                    },
                    comment,
                });
            }
            if (pubkeys.size) {
                const profiles = await nostrSite.renderer.fetchProfiles([...pubkeys]);
                console.log(Date.now(), 'content-cta zap profiles', profiles);
                for (const z of zaps) {
                    const p = profiles.find((p) => p.pubkey === z.pubkey);
                    if (p && p.profile) {
                        z.profile.name = p.profile.display_name || p.profile.name || z.profile.name;
                        z.profile.picture = p.profile.picture;
                    }
                }
            }
            console.log('zaps user pubkey', this.user);
            zaps.forEach((z) => (z.accent = z.pubkey === this.user));
            zaps.sort((a, b) => {
                if (a.accent === b.accent)
                    return b.amount - a.amount;
                return a.accent ? -1 : 1;
            });
            this.zaps = zaps;
        }
        async updated(changedProperties) {
            if (changedProperties.has('ready') || changedProperties.has('user') || changedProperties.has('updateTrigger')) {
                if (this.ready) {
                    if (this.loading)
                        return;
                    this.loading = true;
                    try {
                        await this.loadData();
                    }
                    catch { }
                    this.loading = false;
                }
            }
        }
        handleForceScrollSideways(event) {
            event.preventDefault();
            let [x, y] = [event.deltaX, event.deltaY];
            let magnitude;
            if (x === 0) {
                magnitude = y > 0 ? -30 : 30;
            }
            else {
                magnitude = x;
            }
            this.scrollContainer?.scrollBy({
                left: magnitude,
            });
        }
        firstUpdated() {
            if (this.scrollContainer) {
                this.scrollContainer.onwheel = (event) => {
                    this.handleForceScrollSideways(event);
                };
            }
        }
        _getProfilePicture(picture, name) {
            const username = name || 'User';
            if (!picture)
                return Icons.Profile;
            return ke `<img alt="${username}" src="${picture}" class="rounded-full h-[24px] w-[24px]" />`;
        }
        _handleZapClick(zap) {
            this.selectedZap = zap;
        }
        _handleCloseZapModal() {
            this.selectedZap = null;
        }
        render() {
            return ke `<div class="flex gap-[4px] overflow-auto scrollbar-hide" id="zaps-scroll-container">
        ${this.zaps.map((zap) => {
            return ke `<div
            class="flex items-center gap-[8px] py-[4px] ps-[8px] pe-[8px] rounded-[5px] border-[1px] border-gray-300 hover:bg-gray-100 cursor-pointer"
            style="${zap.accent ? `border: 1px solid ${this.accent}` : ''}"
            @click=${() => this._handleZapClick(zap)}
          >
            ${Icons.Zap}
            <span class="text-[14px] font-medium text-nowrap">${this.prepareZapsAmount(zap.amount)}</span>

            <span title="${zap.profile.name}" class="h-[24px] w-[24px] inline-block">
              ${this._getProfilePicture(zap.profile.picture, zap.profile.name)}
            </span>
            <p class="text-[14px] font-medium text-nowrap max-w-[200px] overflow-hidden text-ellipsis">
              ${zap.comment}
            </p>
          </div>`;
        })}
      </div>
      <np-content-cta-modal-zap
        .open=${!!this.selectedZap}
        @close-modal=${this._handleCloseZapModal}
        .zap=${this.selectedZap}
        .accent=${this.accent}
        .dispatchZap=${this.dispatchZap}
      ></np-content-cta-modal-zap> `;
        }
    };
    Zaps.styles = [
        i$2 `
      :host {
        display: block;
        overflow: auto;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], Zaps.prototype, "ready", void 0);
    __decorate([
        n()
    ], Zaps.prototype, "user", void 0);
    __decorate([
        n()
    ], Zaps.prototype, "author", void 0);
    __decorate([
        n()
    ], Zaps.prototype, "id", void 0);
    __decorate([
        n()
    ], Zaps.prototype, "addr", void 0);
    __decorate([
        n()
    ], Zaps.prototype, "authorPubkey", void 0);
    __decorate([
        n()
    ], Zaps.prototype, "accent", void 0);
    __decorate([
        n()
    ], Zaps.prototype, "updateTrigger", void 0);
    __decorate([
        n()
    ], Zaps.prototype, "zaps", void 0);
    __decorate([
        n()
    ], Zaps.prototype, "dispatchZap", void 0);
    __decorate([
        e$1('#zaps-scroll-container')
    ], Zaps.prototype, "scrollContainer", void 0);
    __decorate([
        r()
    ], Zaps.prototype, "since", void 0);
    __decorate([
        r()
    ], Zaps.prototype, "loading", void 0);
    __decorate([
        r()
    ], Zaps.prototype, "selectedZap", void 0);
    Zaps = __decorate([
        t$1('np-content-cta-zaps')
    ], Zaps);

    let ContentSelection = class ContentSelection extends s {
        constructor() {
            super(...arguments);
            this.actions = [];
            this.selectedText = '';
            this._handleMouseUp = () => {
                const selection = window.getSelection();
                if (!selection)
                    return;
                if (selection.isCollapsed)
                    this._hidePopupMenu();
            };
            this._handleSelectionChange = () => {
                if (!this.actions.length)
                    return;
                const selection = window.getSelection();
                if (!selection)
                    return;
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    let selectedNode = range.commonAncestorContainer;
                    if (selectedNode.nodeType !== Node.ELEMENT_NODE && selectedNode.parentNode) {
                        selectedNode = selectedNode.parentNode;
                    }
                    // @ts-ignore
                    const npContent = selectedNode?.closest('np-content');
                    if (!npContent)
                        return this._hidePopupMenu();
                    this.selectedText = selection.toString();
                    if (this.selectedText.trim().length > 0)
                        this._showPopupMenu(range);
                    else
                        this._hidePopupMenu();
                }
            };
            this._handleText = (type) => {
                this.onAction(type, this.selectedText);
                this._hidePopupMenu();
            };
        }
        connectedCallback() {
            super.connectedCallback();
            this.addEventListener('mouseup', this._handleMouseUp);
            document.addEventListener('selectionchange', this._handleSelectionChange);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.removeEventListener('mouseup', this._handleMouseUp);
            document.removeEventListener('selectionchange', this._handleSelectionChange);
        }
        _showPopupMenu(range) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = window.setTimeout(() => {
                const popup = this.popup;
                popup.style.display = 'flex';
                popup.style.visibility = 'hidden';
                const rects = range.getClientRects();
                if (rects.length === 0) {
                    popup.style.display = 'none';
                    return;
                }
                const lastRect = rects[rects.length - 1];
                let proposedLeft = lastRect.right + window.scrollX;
                let proposedTop = lastRect.bottom + window.scrollY;
                requestAnimationFrame(() => {
                    const popupWidth = popup.offsetWidth;
                    const popupHeight = popup.offsetHeight;
                    if (proposedLeft + popupWidth > window.innerWidth) {
                        proposedLeft = window.innerWidth - popupWidth - 10;
                    }
                    if (proposedTop + popupHeight > window.scrollY + window.innerHeight - popupWidth) {
                        proposedTop = window.scrollY + lastRect.bottom - popupHeight - 10;
                    }
                    popup.style.left = `${proposedLeft}px`;
                    popup.style.top = `${proposedTop}px`;
                    popup.style.visibility = 'visible';
                    popup.style.display = 'flex';
                });
            }, 500);
        }
        _hidePopupMenu() {
            this.popup.style.display = 'none';
        }
        render() {
            return ke `
      <div
        class="my-[2px] ml-[4px] mr-[8px] p-[12px] absolute hidden bg-white shadow-md  rounded-[10px] flex-col gap-[8px] !z-[9999999]"
        id="np-content-selection-popup"
      >
        ${this.actions.map((a) => ke `
            <button
              class="p-[8px] hover:bg-slate-50 rounded-[2px] transition-colors active:bg-slate-100 border-[1px] flex justify-start gap-[8px] items-center"
              @click="${() => this._handleText(a.value)}"
            >
              ${a.icon}
              <span class="flex-grow text-left text-[14px] text-black">${a.label}</span>
            </button>
          `)}
      </div>
    `;
        }
    };
    ContentSelection.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n()
    ], ContentSelection.prototype, "onAction", void 0);
    __decorate([
        n({ attribute: false })
    ], ContentSelection.prototype, "actions", void 0);
    __decorate([
        r()
    ], ContentSelection.prototype, "selectedText", void 0);
    __decorate([
        r()
    ], ContentSelection.prototype, "debounceTimer", void 0);
    __decorate([
        e$1('#np-content-selection-popup')
    ], ContentSelection.prototype, "popup", void 0);
    ContentSelection = __decorate([
        t$1('np-content-cta-selection')
    ], ContentSelection);

    let MainCta = class MainCta extends s {
        constructor() {
            super(...arguments);
            this.buttonColor = DEFAULT_BUTTON_COLOR;
            this.buttonTextColor = DEFAULT_BUTTON_TEXT_COLOR;
            this.mainAction = DEFAULT_MAIN_ACTION;
            this.inView = false;
        }
        connectedCallback() {
            super.connectedCallback();
            window.addEventListener('scroll', () => this.updateVisibility());
        }
        firstUpdated() {
            this.updateVisibility();
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            window.removeEventListener('scroll', () => this.updateVisibility());
        }
        updateVisibility() {
            if (!this.mainButton)
                return;
            const mainButtonRect = this.mainButton.getBoundingClientRect();
            this.inView = mainButtonRect.top <= window.innerHeight;
        }
        _handleMainCtaClick() {
            this.dispatchEvent(new Event(`main-cta-click`));
        }
        _handleDotsClick() {
            this.dispatchEvent(new Event(`dots-click`));
        }
        render() {
            return ke `
      <div class="w-full flex align-middle gap-[12px]">
        <button
          class=" w-full border-2 rounded-[5px] p-[6px] hover:opacity-95 active:opacity-85 transition-opacity flex justify-center gap-[8px] items-center"
          style="background-color: ${this.buttonColor}; color: ${this.buttonTextColor}"
          @click=${this._handleMainCtaClick}
          id=${'np-content-main-cta'}
        >
          <div class="w-[24px] h-[24px]">${this.mainAction.icon}</div>
          ${this.mainAction.label}
        </button>
        <button
          class="p-[8px] hover:bg-slate-50 rounded-[5px] transition-colors active:bg-slate-100 "
          @click=${this._handleDotsClick}
        >
          ${Icons.Dots}
        </button>
      </div>

      ${this.inView
            ? D
            : ke `<div class="fixed w-full left-0 animate-slide-in-bottom" style='bottom: 0'>
            <div
              class="mx-auto w-1/2 max-md:w-full max-md:px-[8px] bg-gray-50 bg-opacity-50 border-gray-100 border-[1px] p-[6px] rounded-[8px] shadow-sm"
            >
              <div class="w-full flex align-middle gap-[12px]">
                <button
                  class=" w-full border-2 rounded-[5px] p-[6px] hover:opacity-95 active:opacity-85 transition-opacity flex justify-center gap-[8px] items-center"
                  style="background-color: ${this.buttonColor}; color: ${this.buttonTextColor}"
                  @click=${this._handleMainCtaClick}
                >
                  <div class="w-[24px] h-[24px]">${this.mainAction.icon}</div>
                  ${this.mainAction.label}
                </button>
                <button
                  class="p-[8px] rounded-[5px] bg-neutral-200 border-gray-300 border-[1px] bg-opacity-95 hover:bg-opacity-100"
                  @click=${this._handleDotsClick}
                >
                  ${Icons.Dots}
                </button>
              </div>
            </div>
          </div>`}
    `;
        }
    };
    MainCta.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n({ attribute: false })
    ], MainCta.prototype, "buttonColor", void 0);
    __decorate([
        n({ attribute: false })
    ], MainCta.prototype, "buttonTextColor", void 0);
    __decorate([
        n({ attribute: false })
    ], MainCta.prototype, "mainAction", void 0);
    __decorate([
        e$1('#np-content-main-cta')
    ], MainCta.prototype, "mainButton", void 0);
    __decorate([
        r()
    ], MainCta.prototype, "inView", void 0);
    MainCta = __decorate([
        t$1('np-content-main-cta')
    ], MainCta);

    function loadFonts() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap');
        document.head.appendChild(link);
    }
    function injectSelectionElement() {
        // this one must be a child of the 'body'
        const element = document.createElement('np-content-cta-selection');
        if (document.body)
            document.body.append(element);
    }
    function init() {
        loadFonts();
        injectSelectionElement();
    }
    // no need to wait really, and if we do wait then we might
    // be too late before the index.ts starts executing
    // if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
    // else init()
    init();
    // // Handle functions
    // const openAppsModal = (id: string, kind: number, userPubkey: string) => {
    //   console.log({ id, kind, userPubkey })
    //   const exists = document.getElementById('apps-modal-instance') as ModalApps | null
    //   if (exists) {
    //     exists.open = true
    //     return
    //   }
    //   const root = document.createElement('np-content-cta-modal-apps') as ModalApps
    //   root.id = 'apps-modal-instance'
    //   root.open = true
    //   root.idParam = id
    //   root.kind = kind
    //   root.userPubkey = userPubkey
    //   root.addEventListener('close-modal', () => (root.open = false))
    //   document.body.appendChild(root)
    // }
    // const openLoginModal = () => {
    //   const exists = document.getElementById('login-modal-instance') as ModalLogin | null
    //   if (exists) {
    //     exists.open = true
    //     return
    //   }
    //   const root = document.createElement('np-content-cta-modal-login') as ModalLogin
    //   root.id = 'login-modal-instance'
    //   root.open = true
    //   root.addEventListener('close-modal', () => (root.open = false))
    //   document.body.appendChild(root)
    // }
    // export { openAppsModal, openLoginModal }

    async function waitNostrSite() {
        // @ts-ignore
        if (!window.nostrSite)
            await new Promise((ok) => document.addEventListener('npLoad', ok));
        // @ts-ignore
        return window.nostrSite.plugins.register('content-cta');
    }
    exports.NostrContentCta = class NostrContentCta extends s {
        constructor() {
            super(...arguments);
            this.buttonColor = DEFAULT_BUTTON_COLOR;
            this.buttonTextColor = DEFAULT_BUTTON_TEXT_COLOR;
            this.actions = [];
            this.selectionActions = [];
            this.mainAction = DEFAULT_MAIN_ACTION;
            this.userNpub = '';
            this.eventAddr = '';
            this.eventId = '';
            this.eventAuthorNpub = '';
            this.actionsModalOpen = false;
            this.showEmojiPicker = false;
            this.showShareOptions = false;
            this.appsModalOpen = false;
            this.nostrShareModalOpen = false;
            this.ready = false;
            this.updateTrigger = 0;
            this.loading = '';
            this.completion = '';
            this.authorName = '';
            this.authorAvatar = '';
            this.nostrText = '';
            this.highlightText = '';
            this.nostrReply = false;
            this.pluginEndpoint = undefined;
        }
        connectedCallback() {
            super.connectedCallback();
            this.id = 'np-content-cta';
            const mainAction = this.getAttribute(CTA_MAIN_ACTION_ATTR) || 'zap';
            this.mainAction = ACTIONS[mainAction];
            const actions = this.getAttribute(CTA_LIST_ATTR) || Object.keys(ACTIONS).join(',');
            this.actions = prepareActionsList(actions, ACTIONS, mainAction);
            const selectionActions = this.getAttribute(CTA_LIST_ATTR) || Object.keys(SELECTION_ACTIONS).join(',');
            this.selectionActions = prepareActionsList(selectionActions, SELECTION_ACTIONS);
            this.buttonColor = this.getAttribute(BUTTON_COLOR_ATTR) || DEFAULT_BUTTON_COLOR;
            this.buttonTextColor = this.getAttribute(BUTTON_TEXT_COLOR_ATTR) || DEFAULT_BUTTON_TEXT_COLOR;
            waitNostrSite().then((ep) => {
                this.pluginEndpoint = ep;
                const pubkeyToNpub = (pubkey) => {
                    // @ts-ignore
                    return pubkey ? window.nostrSite.nostrTools.nip19.npubEncode(pubkey) : '';
                };
                // @ts-ignore
                this.userNpub = pubkeyToNpub(window.nostrSite.user()?.pubkey);
                this.pluginEndpoint.subscribe('auth', (info) => {
                    console.log('content-cta auth', info);
                    this.userNpub = pubkeyToNpub(info.pubkey);
                });
                this.pluginEndpoint.subscribe('action-open-with', () => {
                    this._handleOpenAppsModal();
                });
                this.pluginEndpoint.subscribe('action-like', () => {
                    this._handleShowEmojiPicker();
                });
                this.pluginEndpoint.subscribe('action-share', () => {
                    this._handleShowShareOptions();
                });
                this.pluginEndpoint.subscribe('event-published', (e) => {
                    console.log('content-cta on event published', e);
                    this.updateTrigger = Date.now();
                    const completion = getCompletionForEvent(e);
                    if (completion)
                        this._handleShowCompletionModal(completion);
                });
                this.pluginEndpoint.subscribe('action-follow', () => {
                    this._handleFollow();
                });
                this.pluginEndpoint.subscribe('action-bookmark', () => {
                    this._handleBookmark();
                });
                this.pluginEndpoint.subscribe('action-quote', (text) => {
                    this._handleSelectionChange('quote', text);
                });
                this.pluginEndpoint.subscribe('action-highlight', (text) => {
                    this._handleSelectionChange('highlight', text);
                });
                this.pluginEndpoint.subscribe('action-comment', (text) => {
                    this._handleSelectionChange('comment', text);
                });
                const selection = document.querySelector('np-content-cta-selection');
                selection.onAction = this._handleSelectionChange.bind(this);
                selection.actions = this.selectionActions;
                console.log('content-cta ready', this.actions, this.selectionActions);
                this.ready = true;
                // @ts-ignore
                const nostrSite = window.nostrSite;
                nostrSite.tabReady.then(async () => {
                    const renderer = nostrSite.renderer;
                    const profiles = await renderer.fetchProfiles([this.authorPubkey()]);
                    if (profiles.length) {
                        this.authorName = profiles[0].profile.display_name || profiles[0].profile.display_name;
                        this.authorAvatar = profiles[0].profile.picture;
                    }
                });
            });
        }
        userPubkey() {
            return this.userNpub ? npubToPubkey(this.userNpub) : '';
        }
        authorPubkey() {
            return npubToPubkey(this.eventAuthorNpub);
        }
        _handleOpenActionsModal() {
            this.actionsModalOpen = true;
        }
        _handleCloseActionsModal() {
            this.actionsModalOpen = false;
        }
        _handleOpenAppsModal() {
            this.appsModalOpen = true;
        }
        _handleCloseAppsModal() {
            this.appsModalOpen = false;
        }
        _handleShowEmojiPicker() {
            this.showEmojiPicker = true;
        }
        _handleCloseEmojiPicker() {
            this.showEmojiPicker = false;
        }
        _handleShowShareOptions() {
            this.showShareOptions = true;
        }
        _handleCloseShareOptions() {
            this.showShareOptions = false;
        }
        _handleShowCompletionModal(completion) {
            this.completion = completion;
        }
        _handleCloseCompletionModal() {
            this.completion = '';
        }
        _handleCloseNostrShareModal() {
            this.nostrShareModalOpen = false;
        }
        _handleShowNostrShareModal() {
            this.nostrShareModalOpen = true;
        }
        _handleSelectionChange(type, text) {
            if (type === 'quote') {
                this._initNostrText(); // reset
                // prepend the quote
                this.nostrText = '> ' + text + '\n' + this.nostrText;
                this.highlightText = ''; // reset
                this.nostrReply = false;
            }
            else if (type === 'comment') {
                // quote
                this.nostrText = '> ' + text + '\n';
                this.highlightText = ''; // reset
                this.nostrReply = true;
            }
            else if (type === 'highlight') {
                this.nostrText = ''; // clear, it's optional
                this.highlightText = text;
                this.nostrReply = false;
            }
            // doesn't work in sync way
            setTimeout(() => {
                this._handleShowNostrShareModal();
            }, 0);
        }
        _handleCloseModal() {
            this._handleCloseActionsModal();
            this._handleCloseAppsModal();
            this._handleCloseEmojiPicker();
            this._handleCloseShareOptions();
            this._handleCloseCompletionModal();
            this._handleCloseNostrShareModal();
        }
        // private _onSelectionAction(type: string, text: string) {
        //   this.pluginEndpoint?.dispatch(`action-${type}`, text)
        // }
        _handleButtonClick(type) {
            this.pluginEndpoint?.dispatch(`action-${type}`);
            // close the actions modal
            this.actionsModalOpen = false;
        }
        async _publishReaction(text) {
            try {
                this.loading = 'reaction';
                const nostrEvent = await publishReaction({
                    eventAddr: this.eventAddr,
                    eventId: this.eventId,
                    authorPubkey: this.authorPubkey(),
                    emoji: text,
                });
                // a generalized way to notify nostr-site about the new relevant event
                this.pluginEndpoint?.dispatch('event-published', nostrEvent);
                this.loading = '';
            }
            catch {
                this.loading = '';
            }
        }
        async _publishNote(text) {
            try {
                this.loading = 'note';
                const nostrEvent = await publishNote({ authorPubkey: this.authorPubkey(), text });
                this.pluginEndpoint?.dispatch('event-published', nostrEvent);
                this.loading = '';
            }
            catch {
                this.loading = '';
            }
        }
        async _publishHighlight(text, comment) {
            try {
                this.loading = 'highlight';
                const nostrEvent = await publishHighlight({
                    eventAddr: this.eventAddr,
                    eventId: this.eventId,
                    authorPubkey: this.authorPubkey(),
                    text,
                    comment,
                });
                this.pluginEndpoint?.dispatch('event-published', nostrEvent);
                this.loading = '';
            }
            catch {
                this.loading = '';
            }
        }
        async _publishReply(text) {
            try {
                this.loading = 'note';
                const nostrEvent = await publishReply({
                    eventAddr: this.eventAddr,
                    eventId: this.eventId,
                    authorPubkey: this.authorPubkey(),
                    text,
                });
                this.pluginEndpoint?.dispatch('event-published', nostrEvent);
                this.loading = '';
            }
            catch {
                this.loading = '';
            }
        }
        async _handleFollow() {
            const pubkey = this.authorPubkey();
            console.log('follow pubkey', pubkey);
            try {
                this.loading = 'follow';
                const nostrEvent = await publishFollow(pubkey);
                this.pluginEndpoint?.dispatch('event-published', nostrEvent);
                this.loading = '';
            }
            catch {
                this.loading = '';
            }
        }
        async _handleBookmark() {
            try {
                this.loading = 'bookmark';
                const nostrEvent = await publishBookmark({
                    eventAddr: this.eventAddr,
                    eventId: this.eventId,
                    authorPubkey: this.authorPubkey(),
                });
                this.pluginEndpoint?.dispatch('event-published', nostrEvent);
                this.loading = '';
            }
            catch {
                this.loading = '';
            }
        }
        _handleShareNostr() {
            this._initNostrText(); // reset
            this.highlightText = ''; // clear
            return this._handleShowNostrShareModal();
        }
        _initNostrText() {
            // @ts-ignore
            const nostrSite = window.nostrSite;
            if (!nostrSite)
                return;
            const id = this.eventAddr;
            const nip19 = nostrSite.nostrTools.nip19;
            const renderer = nostrSite.renderer;
            const site = renderer.getSite();
            const relay = site.contributor_relays && site.contributor_relays.length ? site.contributor_relays[0] : '';
            let text = id;
            if (relay) {
                const { type, data } = nip19.decode(id);
                if (type === 'note')
                    text = nip19.neventEncode({ id: data, relays: [relay] });
                else if (type === 'naddr')
                    text = nip19.naddrEncode({ ...data, relays: [relay] });
            }
            console.log('text', text, id, relay);
            this.nostrText = `\nnostr:${text}`;
        }
        isCompletion() {
            return !!this.getCompletionText();
        }
        getCompletionText() {
            switch (this.completion) {
                case 'bookmark':
                    return 'Thank you for your bookmark!';
                case 'follow':
                    return 'Thank you for following!';
                case 'note':
                    return 'Thank you for posting!';
                case 'reaction':
                    return 'Thank you for your reaction!';
                case 'share':
                    return 'Thank you for sharing!';
                case 'highlight':
                    return 'Thank you for highlighting!';
                case 'zap':
                    return 'Thank you for the zap!';
            }
        }
        _handleDispatchZap(amount) {
            this.pluginEndpoint?.dispatch(`action-zap`, amount);
        }
        renderActionsModal() {
            if (!this.actionsModalOpen || this.appsModalOpen || this.showEmojiPicker || this.showShareOptions)
                return D;
            return ke `
      <np-content-cta-modal @close-modal=${this._handleCloseModal.bind(this)} .title=${'Actions'}>
        <div class="flex flex-col gap-[8px]">
          ${this.actions.map((action) => {
            return ke ` <button
              @click=${() => this._handleButtonClick(action.value)}
              id="${action.value}"
              class="p-[8px] hover:bg-slate-50 rounded-[2px] transition-colors active:bg-slate-100 border-2 flex justify-center gap-[8px] items-center"
              ${action.value === this.mainAction.value ? `style="background-color: ${this.buttonColor}"` : ``}
            >
              <div class="w-[80%] flex justify-end">
                <div class="w-[24px] h-[24px]">${action.icon}</div>
              </div>

              <div class="w-full flex justify-start">
                <div>${action.label}</div>
              </div>
            </button>`;
        })}
        </div>
      </np-content-cta-modal>
    `;
        }
        render() {
            const [id, addr] = parseIdAddr(this.eventAddr, this.eventId);
            return ke `
      <div class="w-full flex flex-col gap-[8px]">
        <np-content-cta-zaps
          .ready=${this.ready}
          .user=${this.userPubkey()}
          .author=${this.authorPubkey()}
          .id=${id}
          .addr=${addr}
          .authorPubkey=${this.authorPubkey()}
          .accent=${this.buttonColor}
          .updateTrigger=${this.updateTrigger}
          .dispatchZap=${this._handleDispatchZap.bind(this)}
        ></np-content-cta-zaps>

        <np-content-cta-reactions
          .ready=${this.ready}
          .user=${this.userPubkey()}
          .author=${this.authorPubkey()}
          .id=${id}
          .addr=${addr}
          .accent=${this.buttonColor}
          .updateTrigger=${this.updateTrigger}
          .dispatchLike=${this._publishReaction.bind(this)}
        ></np-content-cta-reactions>

        <np-content-main-cta
          @main-cta-click=${() => this._handleButtonClick(this.mainAction.value)}
          @dots-click=${this._handleOpenActionsModal.bind(this)}
          .buttonColor=${this.buttonColor}
          .buttonTextColor=${this.buttonTextColor}
          .mainAction=${this.mainAction}
        ></np-content-main-cta>
      </div>

      ${this.renderActionsModal()}

      <np-content-cta-modal-apps
        @close-modal=${this._handleCloseModal.bind(this)}
        .open=${this.appsModalOpen}
        .eventAddr=${this.eventAddr}
      >
      </np-content-cta-modal-apps>

      <np-content-cta-modal-emoji
        @close-modal=${this._handleCloseModal.bind(this)}
        .open=${this.showEmojiPicker}
        .publish=${this._publishReaction.bind(this)}
      >
      </np-content-cta-modal-emoji>

      <np-content-cta-modal-share-apps
        @close-modal=${this._handleCloseModal.bind(this)}
        .open=${this.showShareOptions}
        .onShareNostr=${this._handleShareNostr.bind(this)}
        .accent=${this.buttonColor}
        .ready=${this.ready}
        .openModal=${this._handleShowShareOptions.bind(this)}
      >
      </np-content-cta-modal-share-apps>

      <np-content-cta-modal-loading .open=${!!this.loading} .loading=${this.loading}></np-content-cta-modal-loading>

      <np-content-cta-modal-completion
        @close-modal=${this._handleCloseModal.bind(this)}
        .open=${this.isCompletion()}
        .title=${this.authorName}
        .avatar=${this.authorAvatar}
        .text=${this.getCompletionText()}
        .buttonText=${'Continue'}
      ></np-content-cta-modal-completion>

      <np-content-cta-modal-nostr-share
        @close-modal=${this._handleCloseModal.bind(this)}
        .open=${this.nostrShareModalOpen}
        .publishNote=${this._publishNote.bind(this)}
        .publishReply=${this._publishReply.bind(this)}
        .publishHighlight=${this._publishHighlight.bind(this)}
        .text=${this.nostrText}
        .reply=${this.nostrReply}
        .accent=${this.buttonColor}
        .highlightText=${this.highlightText}
      >
      </np-content-cta-modal-nostr-share>
    `;
        }
    };
    exports.NostrContentCta.styles = [
        i$2 `
      :host {
        display: block;
      }
    `,
        TWStyles,
    ];
    __decorate([
        n({ attribute: false })
    ], exports.NostrContentCta.prototype, "buttonColor", void 0);
    __decorate([
        n({ attribute: false })
    ], exports.NostrContentCta.prototype, "buttonTextColor", void 0);
    __decorate([
        n({ attribute: false })
    ], exports.NostrContentCta.prototype, "actions", void 0);
    __decorate([
        n({ attribute: false })
    ], exports.NostrContentCta.prototype, "selectionActions", void 0);
    __decorate([
        n({ attribute: false })
    ], exports.NostrContentCta.prototype, "mainAction", void 0);
    __decorate([
        n({ attribute: NPUB_ATTR })
    ], exports.NostrContentCta.prototype, "userNpub", void 0);
    __decorate([
        n({ attribute: EVENT_ADDR_ATTR })
    ], exports.NostrContentCta.prototype, "eventAddr", void 0);
    __decorate([
        n({ attribute: EVENT_ID_ATTR })
    ], exports.NostrContentCta.prototype, "eventId", void 0);
    __decorate([
        n({ attribute: EVENT_AUTHOR_ATTR })
    ], exports.NostrContentCta.prototype, "eventAuthorNpub", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "actionsModalOpen", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "showEmojiPicker", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "showShareOptions", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "appsModalOpen", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "nostrShareModalOpen", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "ready", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "updateTrigger", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "loading", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "completion", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "authorName", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "authorAvatar", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "nostrText", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "highlightText", void 0);
    __decorate([
        r()
    ], exports.NostrContentCta.prototype, "nostrReply", void 0);
    exports.NostrContentCta = __decorate([
        t$1('np-content-cta')
    ], exports.NostrContentCta);

    return exports;

})({});
