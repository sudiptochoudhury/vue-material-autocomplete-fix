/*!
 * vue-material-autocomplete-fix v1.0.0-beta-15.08
 * Made with <3 by sudiptochoudhury 2022
 * Released under the MIT License.
 */
!(function(e,t){var r,n;if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("vue"));else if("function"==typeof define&&define.amd)define(["vue"],t);else{r=t("object"==typeof exports?require("vue"):e.Vue);for(n in r)("object"==typeof exports?exports:e)[n]=r[n]}})("undefined"!=typeof self?self:this,(function(e){return (function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=551)})({0:function(e,t){e.exports=function(e,t,r,n,o,u){var i,a,s,l,c,f=e=e||{},d=typeof e.default;return"object"!==d&&"function"!==d||(i=e,f=e.default),a="function"==typeof f?f.options:f,t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns,a._compiled=!0),r&&(a.functional=!0),o&&(a._scopeId=o),u?(s=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(u)},a._ssrRegister=s):n&&(s=n),s&&(l=a.functional,c=l?a.render:a.beforeCreate,l?(a._injectStyles=s,a.render=function(e,t){return s.call(t),c(e,t)}):a.beforeCreate=c?[].concat(c,s):[s]),{esModule:i,exports:f,options:a}}},1:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var o,u,i,a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t={props:{mdTheme:null},computed:{$mdActiveTheme:function(){var e=u.default.enabled,t=u.default.getThemeName,r=u.default.getAncestorTheme;return e&&!1!==this.mdTheme?t(this.mdTheme||r(this)):null}}};return(0,a.default)(t,e)},o=r(4),u=n(o),i=r(6),a=n(i)},2:function(t,r){t.exports=e},200:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e;return t||(t="$&"),'<span class="md-highlight-text-match">'+t+"</span>"}function u(e,t){var r,n,i,a,s,l;if(0===t.length)return e;if(-1===(r=e.toLowerCase().indexOf(t[0].toLowerCase())))return"";for(n=0,i=1;i<t.length&&e[r+i]===t[i];i++)n=i;return a=e.slice(0,r),s=o(e.slice(r,r+n+1)),l=u(e.slice(r+n+1),t.slice(n+1)),a+s+l}function i(e,t){var r=RegExp(t+"(?!([^<]+)?<)","gi");return e.replace(r,o())}function a(e,t,r){var n=e.text;return n&&t&&t[0]?r?u(n,t)||n:i(n,t):n}var s,l,c,f;Object.defineProperty(t,"__esModule",{value:!0}),s=r(2),l=n(s),c=r(1),f=n(c),t.default=new f.default({name:"MdHighlightText",abstract:!0,props:{mdTerm:String,mdFuzzySearch:{type:Boolean,default:!0}},render:function(e){var t,r;try{if(!(t=this.$slots.default))return null;if(t.length>1||t[0].tag)throw Error();return r=a(t[0],this.mdTerm,this.mdFuzzySearch),e("div",{staticClass:"md-highlight-text",class:this.$mdActiveTheme,domProps:{innerHTML:r}})}catch(e){l.default.util.warn("MdHighlightText can only render text nodes.",this)}return null}})},3:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var o,u,i,a,s;Object.defineProperty(t,"__esModule",{value:!0}),r(7),o=r(5),u=n(o),i=r(4),a=n(i),s=function(){var e=new u.default({ripple:!0,theming:{},locale:{startYear:1900,endYear:2099,dateFormat:"yyyy-MM-dd",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shorterDays:["S","M","T","W","T","F","S"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],shorterMonths:["J","F","M","A","M","Ju","Ju","A","Se","O","N","D"],firstDayOfAWeek:0,cancel:"Cancel",confirm:"Ok"},router:{linkActiveClass:"router-link-active"}});return Object.defineProperties(e.theming,{metaColors:{get:function(){return a.default.metaColors},set:function(e){a.default.metaColors=e}},theme:{get:function(){return a.default.theme},set:function(e){a.default.theme=e}},enabled:{get:function(){return a.default.enabled},set:function(e){a.default.enabled=e}}}),e},t.default=function(e){e.material||(e.material=s(),e.prototype.$material=e.material)}},4:function(e,t,r){"use strict";var n,o,u,i,a;Object.defineProperty(t,"__esModule",{value:!0}),n=r(2),o=(function(e){return e&&e.__esModule?e:{default:e}})(n),u=null,i=null,a=null,t.default=new o.default({data:function(){return{prefix:"md-theme-",theme:"default",enabled:!0,metaColors:!1}},computed:{themeTarget:function(){return!this.$isServer&&document.documentElement},fullThemeName:function(){return this.getThemeName()}},watch:{enabled:{immediate:!0,handler:function(){var e=this.fullThemeName,t=this.themeTarget,r=this.enabled;t&&(r?(t.classList.add(e),this.metaColors&&this.setHtmlMetaColors(e)):(t.classList.remove(e),this.metaColors&&this.setHtmlMetaColors()))}},theme:function(e,t){var r=this.getThemeName,n=this.themeTarget;e=r(e),n.classList.remove(r(t)),n.classList.add(e),this.metaColors&&this.setHtmlMetaColors(e)},metaColors:function(e){e?this.setHtmlMetaColors(this.fullThemeName):this.setHtmlMetaColors()}},methods:{getAncestorTheme:function(e){var t,r=this;return e?(t=e.mdTheme,(function e(n){if(n){var o=n.mdTheme,u=n.$parent;return o&&o!==t?o:e(u)}return r.theme})(e.$parent)):null},getThemeName:function(e){var t=e||this.theme;return this.prefix+t},setMicrosoftColors:function(e){u&&u.setAttribute("content",e)},setThemeColors:function(e){i&&i.setAttribute("content",e)},setMaskColors:function(e){a&&a.setAttribute("color",e)},setHtmlMetaColors:function(e){var t,r="#fff";e&&(t=window.getComputedStyle(document.documentElement),r=t.getPropertyValue("--"+e+"-primary")),r&&(this.setMicrosoftColors(r),this.setThemeColors(r),this.setMaskColors(r))}},mounted:function(){var e=this;u=document.querySelector('[name="msapplication-TileColor"]'),i=document.querySelector('[name="theme-color"]'),a=document.querySelector('[rel="mask-icon"]'),this.enabled&&this.metaColors&&window.addEventListener("load",(function(){e.setHtmlMetaColors(e.fullThemeName)}))}})},411:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var o,u,i,a;Object.defineProperty(t,"__esModule",{value:!0}),o=r(3),u=n(o),i=r(412),a=n(i),t.default=function(e){(0,u.default)(e),e.component(a.default.name,a.default)}},412:function(e,t,r){"use strict";function n(e){r(413)}var o,u,i,a,s,l,c,f,d,m;Object.defineProperty(t,"__esModule",{value:!0}),o=r(200),u=r.n(o);for(i in o)"default"!==i&&(function(e){r.d(t,e,(function(){return o[e]}))})(i);a=r(0),s=null,l=!1,c=n,f=null,d=null,m=a(u.a,s,l,c,f,d),t.default=m.exports},413:function(e,t){},5:function(e,t,r){"use strict";var n,o;Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t={};return o.default.util.defineReactive(t,"reactive",e),t.reactive},n=r(2),o=(function(e){return e&&e.__esModule?e:{default:e}})(n)},551:function(e,t,r){e.exports=r(411)},6:function(e,t,r){!(function(t,r){e.exports=r()})(0,(function(){"use strict";function e(e){return!!e&&"object"==typeof e}function t(e){var t=Object.prototype.toString.call(e);return"[object RegExp]"===t||"[object Date]"===t||r(e)}function r(e){return e.$$typeof===f}function n(e){return Array.isArray(e)?[]:{}}function o(e,t){return!1!==t.clone&&t.isMergeableObject(e)?s(n(e),e,t):e}function u(e,t,r){return e.concat(t).map((function(e){return o(e,r)}))}function i(e,t){if(!t.customMerge)return s;var r=t.customMerge(e);return"function"==typeof r?r:s}function a(e,t,r){var n={};return r.isMergeableObject(e)&&Object.keys(e).forEach((function(t){n[t]=o(e[t],r)})),Object.keys(t).forEach((function(u){r.isMergeableObject(t[u])&&e[u]?n[u]=i(u,r)(e[u],t[u],r):n[u]=o(t[u],r)})),n}function s(e,t,r){var n,i,s;return r=r||{},r.arrayMerge=r.arrayMerge||u,r.isMergeableObject=r.isMergeableObject||l,n=Array.isArray(t),i=Array.isArray(e),s=n===i,s?n?r.arrayMerge(e,t,r):a(e,t,r):o(t,r)}var l=function(r){return e(r)&&!t(r)},c="function"==typeof Symbol&&Symbol.for,f=c?Symbol.for("react.element"):60103;return s.all=function(e,t){if(!Array.isArray(e))throw Error("first argument should be an array");return e.reduce((function(e,r){return s(e,r,t)}),{})},s}))},7:function(e,t){}})}));