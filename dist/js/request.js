!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Request=e()}}(function(){return function o(i,s,a){function f(t,e){if(!s[t]){if(!i[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var u=s[t]={exports:{}};i[t][0].call(u.exports,function(e){return f(i[t][1][e]||e)},u,u.exports,o,i,s,a)}return s[t].exports}for(var l="function"==typeof require&&require,e=0;e<a.length;e++)f(a[e]);return f}({1:[function(e,t,n){t.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},{}],2:[function(e,t,n){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}t.exports=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}},{}],3:[function(e,t,n){t.exports=function(e){return e&&e.__esModule?e:{default:e}}},{}],4:[function(e,t,n){"use strict";var r=e("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=r(e("@babel/runtime/helpers/classCallCheck")),o=r(e("@babel/runtime/helpers/createClass")),s={},i=function(){function t(e){(0,u.default)(this,t),this.async=e.async,this.data=e.data,this.header=e.header,this.onprogress=e.onprogress,this.timeout=e.timeout,this.url=e.url}return(0,o.default)(t,[{key:"delete",value:function(){return this.constructor.delete(this)}},{key:"get",value:function(){return this.constructor.get(this)}},{key:"patch",value:function(){return this.constructor.patch(this)}},{key:"post",value:function(){return this.constructor.post(this)}},{key:"put",value:function(){return this.constructor.put(this)}}],[{key:"delete",value:function(e){return this._request("DELETE",e)}},{key:"get",value:function(e){return this._request("GET",e)}},{key:"patch",value:function(e){return this._request("PATCH",e)}},{key:"post",value:function(e){return this._request("POST",e)}},{key:"put",value:function(e){return this._request("PUT",e)}},{key:"_request",value:function(e,r){var t=r.url;if(r.pending&&s[e]&&s[e][t])return s[e][t];var n=r.header,u=new XMLHttpRequest;if(u.open(e,t,void 0===r.async||null===r.async||r.async),n)for(var o in n)u.setRequestHeader(o,n[o]);u.timeout=r.timeout||0,u.send(r.data);var i=new Promise(function(t,n){u.onabort=function(e){n({error:e})},u.onerror=function(e){n({error:e})},r.onprogress&&(u.onprogress=r.onprogress),u.onreadystatechange=function(){if(4===u.readyState){var e=u.status;100<=e&&e<400&&t({data:u.responseText,status:e}),400<=e&&e<600&&n({data:u.responseText,status:e})}},u.ontimeout=function(e){n({error:e})}});return s[e]||(s[e]={}),(s[e][t]=i).then(function(){delete s[e][t]},function(){delete s[e][t]}),i}}]),t}();n.default=i},{"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}]},{},[4])(4)});