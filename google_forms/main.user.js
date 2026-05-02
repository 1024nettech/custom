// ==UserScript==
// @name         Google Forms 自动填写
// @namespace    http://tampermonkey.net
// @version      2026.05.02.224741
// @description  Google Forms 自动填写
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

    const _0x3ecfa5 = _0x48f7; (function (_0x4cd9c3, _0x5da3d3) { const _0x17c573 = _0x48f7, _0x42e146 = _0x4cd9c3(); while (!![]) { try { const _0x56ea9d = parseInt(_0x17c573(0x119)) / 0x1 * (-parseInt(_0x17c573(0x11b)) / 0x2) + parseInt(_0x17c573(0x114)) / 0x3 * (parseInt(_0x17c573(0x10e)) / 0x4) + -parseInt(_0x17c573(0x10d)) / 0x5 + -parseInt(_0x17c573(0x110)) / 0x6 * (-parseInt(_0x17c573(0x11d)) / 0x7) + parseInt(_0x17c573(0x118)) / 0x8 * (parseInt(_0x17c573(0x115)) / 0x9) + -parseInt(_0x17c573(0x10b)) / 0xa * (-parseInt(_0x17c573(0x106)) / 0xb) + -parseInt(_0x17c573(0x107)) / 0xc * (parseInt(_0x17c573(0x116)) / 0xd); if (_0x56ea9d === _0x5da3d3) break; else _0x42e146['push'](_0x42e146['shift']()); } catch (_0x549aa7) { _0x42e146['push'](_0x42e146['shift']()); } } }(_0x1d0c, 0x459ca), unsafeWindow[_0x3ecfa5(0x120)] = GM_webRequest, unsafeWindow[_0x3ecfa5(0x108)] = GM_addElement, unsafeWindow[_0x3ecfa5(0x11f)] = GM_xmlhttpRequest, unsafeWindow[_0x3ecfa5(0x11a)] = GM_openInTab); function initTrustedTypesBypass() { const _0x2a547f = _0x3ecfa5; if (window['trustedTypes'] && window[_0x2a547f(0x121)]['createPolicy']) try { !window[_0x2a547f(0x121)][_0x2a547f(0x10f)] && (window[_0x2a547f(0x121)]['createPolicy'](_0x2a547f(0x117), { 'createHTML': _0x1f3b03 => _0x1f3b03, 'createScript': _0x1802a7 => _0x1802a7, 'createScriptURL': _0x4702d8 => _0x4702d8 }), console[_0x2a547f(0x11c)](_0x2a547f(0x11e))); } catch (_0x589a79) { console[_0x2a547f(0x111)](_0x2a547f(0x112), _0x589a79); } } function stripCSPHeaders() { const _0x267ae0 = _0x3ecfa5; typeof GM_webRequest !== 'undefined' && (GM_webRequest([{ 'selector': _0x267ae0(0x113), 'action': { 'removeResponseHeaders': [_0x267ae0(0x10c), 'content-security-policy-report-only'] } }]), console[_0x267ae0(0x11c)]('[注入成功]\x20CSP\x20移除规则已注册')); } function _0x48f7(_0x3b6aa2, _0x20ba28) { _0x3b6aa2 = _0x3b6aa2 - 0x106; const _0x1d0c21 = _0x1d0c(); let _0x48f792 = _0x1d0c21[_0x3b6aa2]; return _0x48f792; } function loadExternalScript(_0x3fe7ca) { const _0x4bdb7e = _0x3ecfa5; return console[_0x4bdb7e(0x11c)]('[加载中]\x20外部脚本:\x20', _0x3fe7ca), GM_addElement(_0x4bdb7e(0x10a), { 'src': _0x3fe7ca, 'type': 'module' }); } initTrustedTypesBypass(), stripCSPHeaders(); const EXTERNAL_JS_URL = _0x3ecfa5(0x109); function _0x1d0c() { const _0xb85e4c = ['2355yfNDVw', '207iJErWJ', '65mFlCTF', 'default', '104504zLWIvc', '63641GjWQHg', 'GM_openInTab', '8biszDQ', 'log', '225659cYQWTh', '[注入成功]\x20Trusted\x20Types\x20策略已生效', 'GM_xmlhttpRequest', 'GM_webRequest', 'trustedTypes', '11QVSUZl', '1355412TAAleW', 'GM_addElement', 'https://1024nettech.github.io/custom/google_forms/main.js', 'script', '5698820pqNXxI', 'content-security-policy', '1251915OcdgRO', '1976RQfhma', 'defaultPolicy', '18UWIuCE', 'warn', '[跳过]\x20Trusted\x20Types\x20策略已存在或被锁定:\x20', 'https:\x20//docs.google.com*']; _0x1d0c = function () { return _0xb85e4c; }; return _0x1d0c(); } loadExternalScript(EXTERNAL_JS_URL);
})();
// End-91-2026.05.02.224741
