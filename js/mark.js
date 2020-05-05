/*!***************************************************
* mark.js v8.11.1
* https://markjs.io/
* Copyright (c) 2014–2018, Julian Kühnel
* Released under the MIT license https://git.io/vwTVl
*****************************************************/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):e.Mark=t(e.jQuery)}(this,function(e){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e;class t{constructor(e,t=!0,s=[],r=5e3){this.ctx=e,this.iframes=t,this.exclude=s,this.iframesTimeout=r}static matches(e,t){const s="string"==typeof t?[t]:t,r=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector;if(r){let t=!1;return s.every(s=>!r.call(e,s)||(t=!0,!1)),t}return!1}getContexts(){let e,t=[];return(e=void 0!==this.ctx&&this.ctx?NodeList.prototype.isPrototypeOf(this.ctx)?Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?this.ctx:"string"==typeof this.ctx?Array.prototype.slice.call(document.querySelectorAll(this.ctx)):[this.ctx]:[]).forEach(e=>{const s=t.filter(t=>t.contains(e)).length>0;-1!==t.indexOf(e)||s||t.push(e)}),t}getIframeContents(e,t,s=(()=>{})){let r;try{const t=e.contentWindow;if(r=t.document,!t||!r)throw new Error("iframe inaccessible")}catch(e){s()}r&&t(r)}isIframeBlank(e){const t="about:blank",s=e.getAttribute("src").trim(),r=e.contentWindow.location.href;return r===t&&s!==t&&s}observeIframeLoad(e,t,s){let r=!1,i=null;const n=()=>{if(!r){r=!0,clearTimeout(i);try{this.isIframeBlank(e)||(e.removeEventListener("load",n),this.getIframeContents(e,t,s))}catch(e){s()}}};e.addEventListener("load",n),i=setTimeout(n,this.iframesTimeout)}onIframeReady(e,t,s){try{"complete"===e.contentWindow.document.readyState?this.isIframeBlank(e)?this.observeIframeLoad(e,t,s):this.getIframeContents(e,t,s):this.observeIframeLoad(e,t,s)}catch(e){s()}}waitForIframes(e,t){let s=0;this.forEachIframe(e,()=>!0,e=>{s++,this.waitForIframes(e.querySelector("html"),()=>{--s||t()})},e=>{e||t()})}forEachIframe(e,s,r,i=(()=>{})){let n=e.querySelectorAll("iframe"),o=n.length,a=0;n=Array.prototype.slice.call(n);const c=()=>{--o<=0&&i(a)};o||c(),n.forEach(e=>{t.matches(e,this.exclude)?c():this.onIframeReady(e,t=>{s(e)&&(a++,r(t)),c()},c)})}createIterator(e,t,s){return document.createNodeIterator(e,t,s,!1)}createInstanceOnIframe(e){return new t(e.querySelector("html"),this.iframes)}compareNodeIframe(e,t,s){const r=e.compareDocumentPosition(s),i=Node.DOCUMENT_POSITION_PRECEDING;if(r&i){if(null===t)return!0;if(t.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_FOLLOWING)return!0}return!1}getIteratorNode(e){const t=e.previousNode();let s;return{prevNode:t,node:s=null===t?e.nextNode():e.nextNode()&&e.nextNode()}}checkIframeFilter(e,t,s,r){let i=!1,n=!1;return r.forEach((e,t)=>{e.val===s&&(i=t,n=e.handled)}),this.compareNodeIframe(e,t,s)?(!1!==i||n?!1===i||n||(r[i].handled=!0):r.push({val:s,handled:!0}),!0):(!1===i&&r.push({val:s,handled:!1}),!1)}handleOpenIframes(e,t,s,r){e.forEach(e=>{e.handled||this.getIframeContents(e.val,e=>{this.createInstanceOnIframe(e).forEachNode(t,s,r)})})}iterateThroughNodes(e,t,s,r,i){const n=this.createIterator(t,e,r);let o,a,c=[],h=[],l=()=>(({prevNode:a,node:o}=this.getIteratorNode(n)),o);for(;l();)this.iframes&&this.forEachIframe(t,e=>this.checkIframeFilter(o,a,e,c),t=>{this.createInstanceOnIframe(t).forEachNode(e,e=>h.push(e),r)}),h.push(o);h.forEach(e=>{s(e)}),this.iframes&&this.handleOpenIframes(c,e,s,r),i()}forEachNode(e,t,s,r=(()=>{})){const i=this.getContexts();let n=i.length;n||r(),i.forEach(i=>{const o=()=>{this.iterateThroughNodes(e,i,t,s,()=>{--n<=0&&r()})};this.iframes?this.waitForIframes(i,o):o()})}}class s{constructor(e){this.ctx=e,this.ie=!1;const t=window.navigator.userAgent;(t.indexOf("MSIE")>-1||t.indexOf("Trident")>-1)&&(this.ie=!0)}set opt(e){this._opt=Object.assign({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:()=>{},noMatch:()=>{},filter:()=>!0,done:()=>{},debug:!1,log:window.console},e)}get opt(){return this._opt}get iterator(){return new t(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}log(e,t="debug"){const s=this.opt.log;this.opt.debug&&"object"==typeof s&&"function"==typeof s[t]&&s[t](`mark.js: ${e}`)}escapeStr(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}createRegExp(e){return"disabled"!==this.opt.wildcards&&(e=this.setupWildcardsRegExp(e)),e=this.escapeStr(e),Object.keys(this.opt.synonyms).length&&(e=this.createSynonymsRegExp(e)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),this.opt.diacritics&&(e=this.createDiacriticsRegExp(e)),e=this.createMergedBlanksRegExp(e),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.createJoinersRegExp(e)),"disabled"!==this.opt.wildcards&&(e=this.createWildcardsRegExp(e)),e=this.createAccuracyRegExp(e)}createSynonymsRegExp(e){const t=this.opt.synonyms,s=this.opt.caseSensitive?"":"i",r=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(let i in t)if(t.hasOwnProperty(i)){const n=t[i],o="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(i):this.escapeStr(i),a="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(n):this.escapeStr(n);""!==o&&""!==a&&(e=e.replace(new RegExp(`(${this.escapeStr(o)}|${this.escapeStr(a)})`,`gm${s}`),r+`(${this.processSynomyms(o)}|`+`${this.processSynomyms(a)})`+r))}return e}processSynomyms(e){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),e}setupWildcardsRegExp(e){return(e=e.replace(/(?:\\)*\?/g,e=>"\\"===e.charAt(0)?"?":"")).replace(/(?:\\)*\*/g,e=>"\\"===e.charAt(0)?"*":"")}createWildcardsRegExp(e){let t="withSpaces"===this.opt.wildcards;return e.replace(/\u0001/g,t?"[\\S\\s]?":"\\S?").replace(/\u0002/g,t?"[\\S\\s]*?":"\\S*")}setupIgnoreJoinersRegExp(e){return e.replace(/[^(|)\\]/g,(e,t,s)=>{let r=s.charAt(t+1);return/[(|)\\]/.test(r)||""===r?e:e+"\0"})}createJoinersRegExp(e){let t=[];const s=this.opt.ignorePunctuation;return Array.isArray(s)&&s.length&&t.push(this.escapeStr(s.join(""))),this.opt.ignoreJoiners&&t.push("\\u00ad\\u200b\\u200c\\u200d"),t.length?e.split(/\u0000+/).join(`[${t.join("")}]*`):e}createDiacriticsRegExp(e){const t=this.opt.caseSensitive?"":"i",s=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"];let r=[];return e.split("").forEach(i=>{s.every(s=>{if(-1!==s.indexOf(i)){if(r.indexOf(s)>-1)return!1;e=e.replace(new RegExp(`[${s}]`,`gm${t}`),`[${s}]`),r.push(s)}return!0})}),e}createMergedBlanksRegExp(e){return e.replace(/[\s]+/gim,"[\\s]+")}createAccuracyRegExp(e){const t="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿";let s=this.opt.accuracy,r="string"==typeof s?s:s.value,i="string"==typeof s?[]:s.limiters,n="";switch(i.forEach(e=>{n+=`|${this.escapeStr(e)}`}),r){case"partially":default:return`()(${e})`;case"complementary":return`()([^${n="\\s"+(n||this.escapeStr(t))}]*${e}[^${n}]*)`;case"exactly":return`(^|\\s${n})(${e})(?=$|\\s${n})`}}getSeparatedKeywords(e){let t=[];return e.forEach(e=>{this.opt.separateWordSearch?e.split(" ").forEach(e=>{e.trim()&&-1===t.indexOf(e)&&t.push(e)}):e.trim()&&-1===t.indexOf(e)&&t.push(e)}),{keywords:t.sort((e,t)=>t.length-e.length),length:t.length}}isNumeric(e){return Number(parseFloat(e))==e}checkRanges(e){if(!Array.isArray(e)||"[object Object]"!==Object.prototype.toString.call(e[0]))return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(e),[];const t=[];let s=0;return e.sort((e,t)=>e.start-t.start).forEach(e=>{let{start:r,end:i,valid:n}=this.callNoMatchOnInvalidRanges(e,s);n&&(e.start=r,e.length=i-r,t.push(e),s=i)}),t}callNoMatchOnInvalidRanges(e,t){let s,r,i=!1;return e&&void 0!==e.start?(r=(s=parseInt(e.start,10))+parseInt(e.length,10),this.isNumeric(e.start)&&this.isNumeric(e.length)&&r-t>0&&r-s>0?i=!0:(this.log("Ignoring invalid or overlapping range: "+`${JSON.stringify(e)}`),this.opt.noMatch(e))):(this.log(`Ignoring invalid range: ${JSON.stringify(e)}`),this.opt.noMatch(e)),{start:s,end:r,valid:i}}checkWhitespaceRanges(e,t,s){let r,i=!0,n=s.length,o=t-n,a=parseInt(e.start,10)-o;return(r=(a=a>n?n:a)+parseInt(e.length,10))>n&&(r=n,this.log(`End range automatically set to the max value of ${n}`)),a<0||r-a<0||a>n||r>n?(i=!1,this.log(`Invalid range: ${JSON.stringify(e)}`),this.opt.noMatch(e)):""===s.substring(a,r).replace(/\s+/g,"")&&(i=!1,this.log("Skipping whitespace only range: "+JSON.stringify(e)),this.opt.noMatch(e)),{start:a,end:r,valid:i}}getTextNodes(e){let t="",s=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,e=>{s.push({start:t.length,end:(t+=e.textContent).length,node:e})},e=>this.matchesExclude(e.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT,()=>{e({value:t,nodes:s})})}matchesExclude(e){return t.matches(e,this.opt.exclude.concat(["script","style","title","head","html"]))}wrapRangeInTextNode(e,t,s){const r=this.opt.element?this.opt.element:"mark",i=e.splitText(t),n=i.splitText(s-t);let o=document.createElement(r);return o.setAttribute("data-markjs","true"),this.opt.className&&o.setAttribute("class",this.opt.className),o.textContent=i.textContent,i.parentNode.replaceChild(o,i),n}wrapRangeInMappedTextNode(e,t,s,r,i){e.nodes.every((n,o)=>{const a=e.nodes[o+1];if(void 0===a||a.start>t){if(!r(n.node))return!1;const a=t-n.start,c=(s>n.end?n.end:s)-n.start,h=e.value.substr(0,n.start),l=e.value.substr(c+n.start);if(n.node=this.wrapRangeInTextNode(n.node,a,c),e.value=h+l,e.nodes.forEach((t,s)=>{s>=o&&(e.nodes[s].start>0&&s!==o&&(e.nodes[s].start-=c),e.nodes[s].end-=c)}),s-=c,i(n.node.previousSibling,n.start),!(s>n.end))return!1;t=n.end}return!0})}wrapMatches(e,t,s,r,i){const n=0===t?0:t+1;this.getTextNodes(t=>{t.nodes.forEach(t=>{let i;for(t=t.node;null!==(i=e.exec(t.textContent))&&""!==i[n];){if(!s(i[n],t))continue;let o=i.index;if(0!==n)for(let e=1;e<n;e++)o+=i[e].length;t=this.wrapRangeInTextNode(t,o,o+i[n].length),r(t.previousSibling),e.lastIndex=0}}),i()})}wrapMatchesAcrossElements(e,t,s,r,i){const n=0===t?0:t+1;this.getTextNodes(t=>{let o;for(;null!==(o=e.exec(t.value))&&""!==o[n];){let i=o.index;if(0!==n)for(let e=1;e<n;e++)i+=o[e].length;const a=i+o[n].length;this.wrapRangeInMappedTextNode(t,i,a,e=>s(o[n],e),(t,s)=>{e.lastIndex=s,r(t)})}i()})}wrapRangeFromIndex(e,t,s,r){this.getTextNodes(i=>{const n=i.value.length;e.forEach((e,r)=>{let{start:o,end:a,valid:c}=this.checkWhitespaceRanges(e,n,i.value);c&&this.wrapRangeInMappedTextNode(i,o,a,s=>t(s,e,i.value.substring(o,a),r),t=>{s(t,e)})}),r()})}unwrapMatches(e){const t=e.parentNode;let s=document.createDocumentFragment();for(;e.firstChild;)s.appendChild(e.removeChild(e.firstChild));t.replaceChild(s,e),this.ie?this.normalizeTextNode(t):t.normalize()}normalizeTextNode(e){if(e){if(3===e.nodeType)for(;e.nextSibling&&3===e.nextSibling.nodeType;)e.nodeValue+=e.nextSibling.nodeValue,e.parentNode.removeChild(e.nextSibling);else this.normalizeTextNode(e.firstChild);this.normalizeTextNode(e.nextSibling)}}markRegExp(e,t){this.opt=t,this.log(`Searching with expression "${e}"`);let s=0,r="wrapMatches";const i=e=>{s++,this.opt.each(e)};this.opt.acrossElements&&(r="wrapMatchesAcrossElements"),this[r](e,this.opt.ignoreGroups,(e,t)=>this.opt.filter(t,e,s),i,()=>{0===s&&this.opt.noMatch(e),this.opt.done(s)})}mark(e,t){this.opt=t;let s=0,r="wrapMatches";const{keywords:i,length:n}=this.getSeparatedKeywords("string"==typeof e?[e]:e),o=this.opt.caseSensitive?"":"i",a=e=>{let t=new RegExp(this.createRegExp(e),`gm${o}`),c=0;this.log(`Searching with expression "${t}"`),this[r](t,1,(t,r)=>this.opt.filter(r,e,s,c),e=>{c++,s++,this.opt.each(e)},()=>{0===c&&this.opt.noMatch(e),i[n-1]===e?this.opt.done(s):a(i[i.indexOf(e)+1])})};this.opt.acrossElements&&(r="wrapMatchesAcrossElements"),0===n?this.opt.done(s):a(i[0])}markRanges(e,t){this.opt=t;let s=0,r=this.checkRanges(e);r&&r.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(r)),this.wrapRangeFromIndex(r,(e,t,s,r)=>this.opt.filter(e,t,s,r),(e,t)=>{s++,this.opt.each(e,t)},()=>{this.opt.done(s)})):this.opt.done(s)}unmark(e){this.opt=e;let s=this.opt.element?this.opt.element:"*";s+="[data-markjs]",this.opt.className&&(s+=`.${this.opt.className}`),this.log(`Removal selector "${s}"`),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,e=>{this.unwrapMatches(e)},e=>{const r=t.matches(e,s),i=this.matchesExclude(e);return!r||i?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}}return e.fn.mark=function(e,t){return new s(this.get()).mark(e,t),this},e.fn.markRegExp=function(e,t){return new s(this.get()).markRegExp(e,t),this},e.fn.markRanges=function(e,t){return new s(this.get()).markRanges(e,t),this},e.fn.unmark=function(e){return new s(this.get()).unmark(e),this},e});