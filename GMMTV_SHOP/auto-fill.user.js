// ==UserScript==
// @name         GMMTV SHOP Google Forms 自动填写
// @namespace    http://tampermonkey.net
// @version      2026.03.22.174203
// @description  GMMTV SHOP Google Forms 自动填写
// @author       Kay
// @match        https://docs.google.com/forms/*
// @icon         https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1633159205592221.png
// @grant        GM_webRequest
// @grant        GM_addElement
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @grant        unsafeWindow
// @connect      *
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';
    function _0x1661() { const _0x5a174 = ['1466292smdpkQ', '38835RCDXPY', 'log', 'content-security-policy-report-only', '[注入成功]\x20CSP\x20移除规则已注册', 'trustedTypes', 'GM_webRequest', 'defaultPolicy', 'createPolicy', '329289gkKEUx', 'GM_openInTab', 'GM_addElement', 'script', '150ZNczMU', '[加载中]\x20外部脚本:\x20', '2638909kCegxO', 'content-security-policy', 'https:\x20//docs.google.com*', '[跳过]\x20Trusted\x20Types\x20策略已存在或被锁定:\x20', '[注入成功]\x20Trusted\x20Types\x20策略已生效', '541958vKTfWY', '966588CKdIxU', '7539256xVlKWX', 'warn']; _0x1661 = function () { return _0x5a174; }; return _0x1661(); } const _0x23c69c = _0x47b0; (function (_0x336836, _0x425570) { const _0x4921f1 = _0x47b0, _0x23727e = _0x336836(); while (!![]) { try { const _0x10d920 = -parseInt(_0x4921f1(0x1a2)) / 0x1 + -parseInt(_0x4921f1(0x1ad)) / 0x2 + -parseInt(_0x4921f1(0x199)) / 0x3 + parseInt(_0x4921f1(0x1ae)) / 0x4 + -parseInt(_0x4921f1(0x19a)) / 0x5 * (parseInt(_0x4921f1(0x1a6)) / 0x6) + parseInt(_0x4921f1(0x1a8)) / 0x7 + parseInt(_0x4921f1(0x1af)) / 0x8; if (_0x10d920 === _0x425570) break; else _0x23727e['push'](_0x23727e['shift']()); } catch (_0x1c029b) { _0x23727e['push'](_0x23727e['shift']()); } } }(_0x1661, 0x43d4a), unsafeWindow[_0x23c69c(0x19f)] = GM_webRequest, unsafeWindow[_0x23c69c(0x1a4)] = GM_addElement, unsafeWindow['GM_xmlhttpRequest'] = GM_xmlhttpRequest, unsafeWindow[_0x23c69c(0x1a3)] = GM_openInTab); function _0x47b0(_0x3153a8, _0x5e1a4b) { _0x3153a8 = _0x3153a8 - 0x199; const _0x16616c = _0x1661(); let _0x47b062 = _0x16616c[_0x3153a8]; return _0x47b062; } function initTrustedTypesBypass() { const _0x4435bd = _0x23c69c; if (window[_0x4435bd(0x19e)] && window['trustedTypes'][_0x4435bd(0x1a1)]) try { !window['trustedTypes'][_0x4435bd(0x1a0)] && (window['trustedTypes'][_0x4435bd(0x1a1)]('default', { 'createHTML': _0x32973e => _0x32973e, 'createScript': _0xc3ba61 => _0xc3ba61, 'createScriptURL': _0x54fcb1 => _0x54fcb1 }), console[_0x4435bd(0x19b)](_0x4435bd(0x1ac))); } catch (_0x1c2fa8) { console[_0x4435bd(0x1b0)](_0x4435bd(0x1ab), _0x1c2fa8); } } function stripCSPHeaders() { const _0x5883b8 = _0x23c69c; typeof GM_webRequest !== 'undefined' && (GM_webRequest([{ 'selector': _0x5883b8(0x1aa), 'action': { 'removeResponseHeaders': [_0x5883b8(0x1a9), _0x5883b8(0x19c)] } }]), console[_0x5883b8(0x19b)](_0x5883b8(0x19d))); } function loadExternalScript(_0x23b4d9) { const _0x12ac1b = _0x23c69c; return console[_0x12ac1b(0x19b)](_0x12ac1b(0x1a7), _0x23b4d9), GM_addElement(_0x12ac1b(0x1a5), { 'src': _0x23b4d9, 'type': 'text/javascript' }); } initTrustedTypesBypass(), stripCSPHeaders(); const EXTERNAL_JS_URL = 'https://1024nettech.github.io/custom/GMMTV_SHOP/auto-fill.js'; loadExternalScript(EXTERNAL_JS_URL);
})();
// End-91-2026.03.22.174203
