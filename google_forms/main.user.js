// ==UserScript==
// @name         Google Forms 自动填写
// @namespace    http://tampermonkey.net
// @version      2026.05.02.211802
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

    const _0x3a7455 = _0x78e4; (function (_0x54d3f0, _0x2343e5) { const _0x3eb1e0 = _0x78e4, _0x512e79 = _0x54d3f0(); while (!![]) { try { const _0x10e1ee = -parseInt(_0x3eb1e0(0xd9)) / 0x1 + parseInt(_0x3eb1e0(0xdd)) / 0x2 + parseInt(_0x3eb1e0(0xca)) / 0x3 * (parseInt(_0x3eb1e0(0xd1)) / 0x4) + -parseInt(_0x3eb1e0(0xd0)) / 0x5 + parseInt(_0x3eb1e0(0xcd)) / 0x6 + parseInt(_0x3eb1e0(0xc8)) / 0x7 + -parseInt(_0x3eb1e0(0xdb)) / 0x8 * (parseInt(_0x3eb1e0(0xc9)) / 0x9); if (_0x10e1ee === _0x2343e5) break; else _0x512e79['push'](_0x512e79['shift']()); } catch (_0xee1768) { _0x512e79['push'](_0x512e79['shift']()); } } }(_0x663a, 0x57f7a), unsafeWindow['GM_webRequest'] = GM_webRequest, unsafeWindow[_0x3a7455(0xd8)] = GM_addElement, unsafeWindow[_0x3a7455(0xdc)] = GM_xmlhttpRequest, unsafeWindow[_0x3a7455(0xc6)] = GM_openInTab); function initTrustedTypesBypass() { const _0xc1208 = _0x3a7455; if (window[_0xc1208(0xc5)] && window[_0xc1208(0xc5)][_0xc1208(0xd4)]) try { !window[_0xc1208(0xc5)][_0xc1208(0xcb)] && (window['trustedTypes'][_0xc1208(0xd4)](_0xc1208(0xd6), { 'createHTML': _0x1b6e76 => _0x1b6e76, 'createScript': _0x20eaaf => _0x20eaaf, 'createScriptURL': _0x3f6957 => _0x3f6957 }), console[_0xc1208(0xcf)](_0xc1208(0xd7))); } catch (_0x2be403) { console[_0xc1208(0xda)](_0xc1208(0xde), _0x2be403); } } function stripCSPHeaders() { const _0x2c7a30 = _0x3a7455; typeof GM_webRequest !== 'undefined' && (GM_webRequest([{ 'selector': 'https:\x20//docs.google.com*', 'action': { 'removeResponseHeaders': [_0x2c7a30(0xd5), _0x2c7a30(0xd3)] } }]), console[_0x2c7a30(0xcf)](_0x2c7a30(0xce))); } function loadExternalScript(_0x17e34f) { const _0x145418 = _0x3a7455; return console[_0x145418(0xcf)](_0x145418(0xc4), _0x17e34f), GM_addElement(_0x145418(0xc7), { 'src': _0x17e34f, 'type': _0x145418(0xd2) }); } initTrustedTypesBypass(), stripCSPHeaders(); const EXTERNAL_JS_URL = _0x3a7455(0xcc); function _0x663a() { const _0xde07ad = ['[注入成功]\x20CSP\x20移除规则已注册', 'log', '600865UwdFPz', '124GiwkGs', 'text/javascript', 'content-security-policy-report-only', 'createPolicy', 'content-security-policy', 'default', '[注入成功]\x20Trusted\x20Types\x20策略已生效', 'GM_addElement', '8100iWcbRC', 'warn', '24mElDil', 'GM_xmlhttpRequest', '1353056MLXTht', '[跳过]\x20Trusted\x20Types\x20策略已存在或被锁定:\x20', '[加载中]\x20外部脚本:\x20', 'trustedTypes', 'GM_openInTab', 'script', '3909794dXekpG', '3681936pclqIu', '38538ZONmSp', 'defaultPolicy', 'https://1024nettech.github.io/custom/goole_forms/main.js', '495618TaQhFb']; _0x663a = function () { return _0xde07ad; }; return _0x663a(); } function _0x78e4(_0x4668ac, _0x2ac970) { _0x4668ac = _0x4668ac - 0xc4; const _0x663a17 = _0x663a(); let _0x78e4cc = _0x663a17[_0x4668ac]; return _0x78e4cc; } loadExternalScript(EXTERNAL_JS_URL);
})();
// End-91-2026.05.02.211802
