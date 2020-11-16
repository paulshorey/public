(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{arr_diff:()=>N,arr_from_value:()=>k,arr_includes:()=>J,arr_length:()=>O,arr_mix:()=>S,arr_remove_item:()=>C,arr_truthy_values:()=>P,default:()=>A});var n={};t.r(n),t.d(n,{asort_by_length:()=>R,asort_by_width:()=>T});var r={};t.r(r),t.d(r,{astrings_shuffle_first_last:()=>G,astrings_shuffle_first_last_loose:()=>V,astrings_shuffle_first_last_strict:()=>$,astrings_shuffle_last:()=>F,astrings_shuffle_last3:()=>B,astrings_shuffle_last3_strict:()=>K,astrings_shuffle_last_strict:()=>L,matrix_flatten_to_strings:()=>I});var i={};t.r(i),t.d(i,{parse_cli_args:()=>D});var o={};t.r(o),t.d(o,{anonFunction:()=>H});var l={};t.r(l),t.d(l,{average:()=>Q,is_number:()=>X,mean:()=>W});var s={};t.r(s),t.d(s,{json_parse:()=>nt,obj_first_value:()=>tt,obj_from_array:()=>Z,obj_is_empty:()=>et,obj_is_equal:()=>Y,obj_merge:()=>rt});var a={};t.r(a),t.d(a,{forEachAsync:()=>ot,sleep:()=>it});var f={};t.r(f),t.d(f,{aggregate_req_body_query:()=>lt});var u={};t.r(u),t.d(u,{str_capitalize:()=>at,str_hash:()=>st,str_insert:()=>ht,str_sanitize_loosely:()=>ft,str_sanitize_strictly:()=>ut,str_syllables_count:()=>_t,str_trim_char:()=>ct,str_trim_non_alpha:()=>gt});var h={};t.r(h),t.d(h,{object_from_querystring:()=>pt,queryStringReplaceKeyValue:()=>mt,querystring_from_object:()=>dt});var c={};t.r(c),t.d(c,{api_get:()=>xt,api_post:()=>wt,api_put:()=>vt,load_script:()=>yt,parse_axios_error:()=>bt});var g={};t.r(g),t.d(g,{js:()=>St,jsp:()=>Ot,log:()=>jt});var _={};t.r(_),t.d(_,{isRetina:()=>kt});var d={};function p(t,e){return this.indexOf(t.substr(t.indexOf(".")+1))-this.indexOf(e.substr(e.indexOf(".")+1))}function m(t,e=!1){return e?t.sort(((t,e)=>e.toString().length-t.toString().length)):t.sort(((t,e)=>t.toString().length-e.toString().length))}function y(t,e){let n=t.length,r=e.length;this.fix_min_length&&(t.length<this.fix_min_length&&(n=this.fix_min_length),e.length<this.fix_min_length&&(r=this.fix_min_length));let i=(n-this.min_length)/this.delta_length,o=(r-this.min_length)/this.delta_length;return i+(this.arr_positions[t]-this.min_position)/this.delta_position*this.prefer_position-(o+(this.arr_positions[e]-this.min_position)/this.delta_position*this.prefer_position)}function b(t,e){let n=this[t]||0;return(this[e]||0)-n}function x(t,e){let n=this[t];return this[e]-n}function w(t,e){let n=(this.delta_rating-(this.max_rating-(void 0!==this.ratings[t]?this.ratings[t]:this.median_rating)))/this.delta_rating,r=(this.delta_rating-(this.max_rating-(void 0!==this.ratings[e]?this.ratings[e]:this.median_rating)))/this.delta_rating,i=(this.max_index-this.indexes[t])/this.delta_index*this.multiply_position;return r+(this.max_index-this.indexes[e])/this.delta_index*this.multiply_position-(n+i)}function v(t,e){let n=t[this.prop1_key],r=e[this.prop1_key];return this.prop1_asc?n-r:r-n}function j(t,e){let n=(this.delta_rating-(this.max_rating-(void 0!==t[this.rating_key]?t[this.rating_key]:this.median_rating)))/this.delta_rating,r=(this.delta_rating-(this.max_rating-(void 0!==e[this.rating_key]?e[this.rating_key]:this.median_rating)))/this.delta_rating,i=(this.max_index-t.index)/this.delta_index*this.multiply_position;return r+(this.max_index-e.index)/this.delta_index*this.multiply_position-(n+i)}function S(t){let e=[],n=0;for(let e of t)n=Math.max(e.length,n);let r=0;for(;;){for(let n of t)n[r]&&e.push(n[r]);if(r++,r>=n)break}return e}function O(t){return t&&t.length?t.length:0}function k(t,e){let n=[];for(let r=0;r<e;r++)n.push(t);return n}function N(t,e){return t.filter((function(t){return!e.includes(t)}))}function C(t=[],e=""){return t.filter((t=>t!==e))}function J(t,e){return t.filter((function(t){return e.includes(t)}))}function P(t){return t.filter((t=>!!t))}t.r(d),t.d(d,{ends_in_vowel:()=>Jt,is_vowel:()=>Ct,syllable_count:()=>Nt});let q={arr_mix:S,arr_length:O,arr_from_value:k,arr_diff:N,arr_remove_item:C,arr_includes:J,arr_truthy_values:P};"object"==typeof window&&(window.uui=q);const A=q,R=function(t,e=!1){let n=z.bind({desc:e});return t.sort(n)},T=function(t,e=!1){let n=U.bind({desc:e});return t.sort(n)};function z(t,e){return this.desc?e.toString().length-t.toString().length:t.toString().length-e.toString().length}function U(t,e){let n=this.desc,r=M(JSON.stringify(t||"")),i=M(JSON.stringify(e||""));return n?i-r:r-i}function M(t){t=(t||"").toString();let e=0;for(let n of t)e+=E[n.toLowerCase()]||15;return e}const E={0:7,1:4,2:6,3:7,4:7,5:7,6:7,7:6,8:7,9:7,a:6,b:7,c:6,d:7,e:6,f:2,g:6,h:6,i:3,j:2,k:5,l:3,m:9,n:6,o:6,p:6,q:6,r:3,s:5,t:3,u:6,v:5,w:9,x:5,y:5,z:5},I=function(t){if(t.length){if(1===t.length)return t[0];{let e=[],n=I(t.slice(1));for(let r=0;r<n.length;r++)for(let i=0;i<t[0].length;i++)e.push(t[0][i]+" "+n[r]);return e}}return[]},L=function(t){let e=[],n="",r=0;for(;t.length!==r;){r=t.length;for(let r=0;r<t.length;r++){let i=t[r],o=i[i.length-1];n!==o&&(e.push(i),n=o,t.splice(r,1),r--)}}return[...new Set([...e,...t])]},$=function(t){let e=[],n="",r="",i=0;for(;t.length!==i;){i=t.length;for(let i=0;i<t.length;i++){let o=t[i],l=o[0],s=o[o.length-1];r!==s&&n!==l&&(e.push(o),n=l,r=s,t.splice(i,1),i--)}}return[...new Set([...e,...t])]},F=function(t=[]){let e=[],n=[],r=0,i="";t:for(;r<1e3;){r++;let o=t[0]+e[0]+n[0];if(o===i)break t;if(i=o,!t.length&&!e.length)break t;if(!n.length){n.push(t.shift());continue t}let l=n[n.length-1]||"",s=l[l.length-1]||"",a=n[n.length-2]||"",f=a[a.length-1]||"";if(e.length)for(let t of e){if(!t)continue;let r=t[t.length-1];if(r!==s||r!==f){n.push(e.shift());continue t}}if(t[0]){let r=t.shift(),i=r[r.length-1];i===s&&i===f?e.push(r):n.push(r)}}return[...n,...e,...t]},G=function(t=[]){let e=[],n=[],r=0,i="";t:for(;r<1e3;){r++;let o=t[0]+e[0]+n[0];if(o===i)break t;if(i=o,!t.length&&!e.length)break t;if(!n.length){n.push(t.shift());continue t}let l=n[n.length-1]||"",s=l[0]||"",a=l[l.length-1]||"",f=n[n.length-2]||"",u=f[0]||"",h=f[f.length-1]||"";if(e.length)for(let t of e){if(!t)continue;let r=t[0],i=t[t.length-1];if(!(r===s&&r===u||i===a&&i===h)){n.push(e.shift());continue t}}if(t[0]){let r=t.shift(),i=r[0],o=r[r.length-1];i===s&&i===u||o===a&&o===h?e.push(r):n.push(r)}}return[...n,...e,...t]},K=function(t){let e=[],n="",r=0;for(;t.length!==r;){r=t.length;for(let r=0;r<t.length;r++){let i=t[r],o=i[i.length-3]+i[i.length-2]+i[i.length-1];n!==o&&(e.push(i),n=o,t.splice(r,1),r--)}}return[...new Set([...e,...t])]},V=function(t=[]){let e=[],n=[],r=0,i="";t:for(;r<1e3;){r++;let o=t[0]+e[0]+n[0];if(o===i)break t;if(i=o,!t.length&&!e.length)break t;if(!n.length){n.push(t.shift());continue t}let l=n[n.length-1]||"",s=l[0]||"",a=l[l.length-1]||"",f=n[n.length-2]||"",u=f[0]||"",h=f[f.length-1]||"",c=n[n.length-3]||"",g=c[0]||"",_=c[c.length-1]||"";if(e.length)for(let t of e){if(!t)continue;let r=t[0],i=t[t.length-1];if(!(r===s&&r===u&&r===g||i===a&&i===h&&i===_)){n.push(e.shift());continue t}}if(t[0]){let r=t.shift(),i=r[0],o=r[r.length-1];i===s&&i===u&&i===g||o===a&&o===h&&o===_?e.push(r):n.push(r)}}return[...n,...e,...t]},B=function(t=[]){let e=[],n=[],r=0,i="";t:for(;r<1e3;){r++;let o=t[0]+e[0]+n[0];if(o===i)break t;if(i=o,!t.length&&!e.length)break t;if(!n.length){n.push(t.shift());continue t}let l=n[n.length-1]||"",s=l[l.length-1]||"",a=n[n.length-2]||"",f=a[a.length-1]||"";if(e.length)for(let t of e){if(!t)continue;let r=t[t.length-1];if(r!==s||r!==f){n.push(e.shift());continue t}}if(t[0]){let r=t.shift(),i=r[r.length-1];i===s&&i===f?e.push(r):n.push(r)}}return[...n,...e,...t]};function D(){if("undefined"==typeof process)return{};let t={};for(let e=0;e<process.argv.length;e++){let n=process.argv[e];if(0===e)t.__node__=n;else if(1===e)t.__file__=n;else{let e=n.split("=");t[e[0]]=e[1]}}return t}const H=(t,e)=>{try{t()}catch(t){cconsole?cconsole.error(t):console.error(t),"exit"===e&&"undefined"!=typeof process&&process.exit()}},Q=function(t){return t.reduce(((t,e)=>e+t))/t.length},W=function(t){t.sort(((t,e)=>t-e));let e=Math.floor((t.length-1)/2),n=Math.ceil((t.length-1)/2);return(t[e]+t[n])/2},X=function(t){return null!==t&&("string"==typeof t&&(t=Number(t)),!isNaN(t))},Y=function(t,e){return JSON.stringify(t)===JSON.stringify(e)},Z=function(t,e=!0){let n={};for(let r of t)n[r]=e;return n},tt=function(t){for(let e in t)return t[e]},et=function(t){for(let e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0},nt=function t(e){let n;if("string"==typeof e&&(e.includes("[")||e.includes("{")))try{n=JSON.parse(e)}catch(t){try{n=JSON.parse(e.replace(/[\r\n]+/g,"").replace(/[\t]+/g," "))}catch(t){n=e.includes("[")?[]:{}}}else n=e;if("object"==typeof n)for(let e in n)n.hasOwnProperty(e)&&(n[e]=t(n[e]));return n},rt=function t(e,n){let r={},i=[...new Set([...Object.keys(e),...Object.keys(n)])];for(let o of i)if(e.hasOwnProperty(o)&&n.hasOwnProperty(o)){let i=e[o],l=n[o];if(typeof i!=typeof l)r[o]=l||i;else switch(typeof i){case"object":l&&i?Array.isArray(l)&&Array.isArray(i)?r[o]=[...new Set([...e[o],...n[o]])]:Array.isArray(l)||Array.isArray(i)?r[o]=e[o]:r[o]=t(e[o],n[o]):r[o]=l||i;break;default:r[o]=l||i}}else n.hasOwnProperty(o)?r[o]=n[o]:r[o]=e[o];return r},it=function(t=0){return new Promise((e=>setTimeout(e,t)))},ot=async function(t,e){for(let n of t)await e(n)},lt=function(t){let e={};if(t.body&&(e=t.body),t.query)for(let n in t.query){let r=t.query[n];if(0!==r){if(r&&(r=decodeURIComponent(r).trim(),r))if("undefined"!==r)if("null"!==r)if("true"!==r)if("false"!==r){if(['"',"{","["].includes(r[0]))try{r=JSON.parse(r)}catch(t){r=""}e[n]=r}else e[n]=!1;else e[n]=!0;else e[n]="null";else e[n]="undefined"}else e[n]=0}return e},st=function(t){let e=0;if(0===t.length)return e;for(let n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n),e&=e;return e+""},at=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},ft=function(t){return t.replace(/_-/g," ").replace(/[^\w ]+/g,"").toLowerCase().trim()},ut=function(t){return t.replace(/[^\w]+/g,"").toLowerCase().trim()},ht=function(t="",e=0,n=""){return t.substring(0,e)+n+t.substring(e,t.length)},ct=function(t,e){return"]"===e&&(e="\\]"),"\\"===e&&(e="\\\\"),t.replace(new RegExp("^["+e+"]+|["+e+"]+$","g"),"")},gt=function(t){return t.replace(new RegExp("^[^a-z]+|[^a-z]+$","gi"),"")},_t=function(t){if((t=t.toLowerCase()).length<=3)return 1;let e=(t=(t=t.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"")).replace(/^y/,"")).match(/[aeiouy]{1,2}/g);return e?e.length:0};function dt(t={}){let e=Object.keys(t).map((e=>encodeURIComponent(e)+"="+encodeURIComponent(t[e]))).join("&");return e&&(e="?"+e),e}function pt(t=""){let e={},n=t.replace("?","").split("&");for(let t of n){if(!t)continue;let n=t.split("="),r=n[0];r&&(e[r]=n[1]||"")}for(let t in e)e[t]=decodeURIComponent(e[t]||"").trim();return e}function mt(t,e,n){t=ct(t,"&"),t=ct(t,"?");let r=JSON.parse('{"'+decodeURI(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}');r[e]=n;let i="?";for(let t of Object.entries(r))i+=t[0]+"=",i+=t[1]+"&";return ct(i,"&")}const yt=function(t,e,n={}){return!!t&&"object"==typeof window&&"object"==typeof document&&new Promise(((e,r)=>{let i=document.createElement("script");function o(t,n){(n||!i.readyState||/loaded|complete/.test(i.readyState))&&(i.onload=null,i.onreadystatechange=null,i=void 0,n?r():e())}i={...i,async:!0,defer:!0,...n},i.onload=o,i.onreadystatechange=o,i.src=t,window.document.body.append(i)}))},bt=function(t){let e=t.response&&t.response.data&&t.response.data.error||t;if("object"==typeof e){let t=e[0]||e.message;return"undefined"!=typeof console&&console.error("axios error",t),t}{let t=e;return"undefined"!=typeof console&&console.error("axios error",t),t}},xt=function(t="",e={}){return fetch(t+dt(e),{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json; charset=utf-8"},redirect:"follow",referrer:"no-referrer"}).then((t=>t.json())).then((t=>t.data))},wt=function(t="",e={}){return fetch(t,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json; charset=utf-8"},redirect:"follow",referrer:"no-referrer",body:JSON.stringify(e)}).then((t=>t.json()))},vt=function(t="",e={}){return fetch(t,{method:"PUT",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json; charset=utf-8"},redirect:"follow",referrer:"no-referrer",body:JSON.stringify(e)}).then((t=>t.json()))},jt=function(){let t="log";["log","info","warn","error","table","debug","trace"].includes(arguments[0])&&(t=arguments.shift()),console[t](...arguments)},St=function(t){return JSON.stringify(t)},Ot=function(t){return JSON.parse(JSON.stringify(t))},kt=function(){return"object"==typeof window&&window.matchMedia("(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)").matches},Nt=function(t){if(!t)return 0;let e=t,n=(t=(t=(t=t.replace("ue","e")).substr(0,t.length-1)).replace(/[^aeiouy]+/g," ")).split(" ").map((t=>t.trim())).filter((t=>!!t)).length;return 0===n?e.length:n},Ct=function(t){return["a","e","i","o","u","y"].includes(t)},Jt=function(t){return["a","e","i","o","u","y"].includes(t[t.length-1])};let Pt={asort_objects:{by_property:function(t,e,n=!1){return t.sort(v.bind({arr:t,prop1_key:e,prop1_asc:n}))},by_property_and_position:function(t,e,n=1){let r={min_rating:null,max_rating:null};r.rating_key=e;for(let n of t){let t=n[e];(null===r.min_rating||t<r.min_rating)&&(r.min_rating=t),(null===r.max_rating||t>r.max_rating)&&(r.max_rating=t)}r.delta_rating=r.max_rating-r.min_rating,r.median_rating=r.min_rating+r.delta_rating/2,r.min_index=0,r.max_index=t.length-1;for(let e in t)t[e].index=e;return r.delta_index=r.max_index-r.min_index,r.multiply_position=n,t.sort(j.bind(r))}},asort_strings:{by_extension:function(t,e){return t.sort(p.bind(e))},by_length_and_position:function(t,e=10,n=0){if(!t)return[];try{let r=m([...t]);if(!r[0])return t;let i={};for(let e in t)i[t[e]]=e;let o={min_length:r[0].length,max_length:r[r.length-1].length,min_position:0,max_position:t.length,delta_position:t.length,arr_positions:i,prefer_position:e};return n&&(o.fix_min_length=n,o.min_length=n),o.delta_length=o.max_length-o.min_length,t.sort(y.bind(o))}catch(e){return console.error("invalid input array to asort_by_length_and_position()"),t}},by_length_asc:m,by_matches_in_list:function(t,e){let n={};for(let r of t){let t=r.replace(/[^a-z0-9]/gi,""),i=0;for(let n of e)t.includes(n)&&(i++,t=t.replace(n,""));n[r]=i}return t.sort(b.bind(n))},by_rating:function(t,e){let n={};for(let r of t)n[r]=e[r]||0;return t.sort(x.bind(n))},by_rating_and_position:function(t,e,n=1){let r={min_rating:null,max_rating:null};r.ratings=e;for(let t in e){let n=e[t];(null===r.min_rating||n<r.min_rating)&&(r.min_rating=n),(null===r.max_rating||n>r.max_rating)&&(r.max_rating=n)}r.delta_rating=r.max_rating-r.min_rating,r.median_rating=r.min_rating+r.delta_rating/2,r.min_index=0,r.max_index=t.length-1,r.indexes={};for(let e in t){let n=t[e];r.indexes[n]=e}return r.delta_index=r.max_index-r.min_index,r.multiply_position=n,t.sort(w.bind(r))},strings_combine_lists:function(t,e){let n=new Set,r={};for(let t in arguments)r[t]=-1;for(let t=0;t<50;t++)for(let t in arguments){let e=arguments[t][r[t]++];e&&n.add(e)}return[...n]}},arrays:e,asort_words:n,astrings:r,cli:i,functions:o,numbers:l,objects:s,promises:a,req:f,requests:c,sh:g,strings:u,ui:_,urls:h,words:d};"object"==typeof window&&(window.uui=Pt)})();