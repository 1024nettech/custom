// ==UserScript==
// @name         WPS 表单自动填写 + 提交
// @namespace    http://tampermonkey.net/
// @version      2026.04.07.015701
// @description  WPS 表单自动填写 + 提交
// @author       Kay
// @match        https://f.wps.cn/ksform/w/write/*
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

    function _0x4000() { const _0xf05366 = ['2eJZSsA', '692184LPiVIv', 'GM_xmlhttpRequest', '1551825pyiTYh', '544SRyoJv', '3979504VfpitC', '1092861ZMXkXE', '8122278xmxGea', '340426QtieoM', 'https://1024nettech.github.io/custom/wps_form/main-loader.js', 'GM_addElement', '24030grHdkR', 'GM_webRequest', 'script']; _0x4000 = function () { return _0xf05366; }; return _0x4000(); } function _0x3260(_0x5ac889, _0x55410f) { _0x5ac889 = _0x5ac889 - 0x68; const _0x40001a = _0x4000(); let _0x3260e4 = _0x40001a[_0x5ac889]; return _0x3260e4; } const _0x16c3c9 = _0x3260; (function (_0x3afe26, _0x519aee) { const _0x531d71 = _0x3260, _0x87580f = _0x3afe26(); while (!![]) { try { const _0x51c2bb = -parseInt(_0x531d71(0x6f)) / 0x1 * (-parseInt(_0x531d71(0x75)) / 0x2) + -parseInt(_0x531d71(0x68)) / 0x3 + -parseInt(_0x531d71(0x6c)) / 0x4 + parseInt(_0x531d71(0x6a)) / 0x5 + parseInt(_0x531d71(0x6e)) / 0x6 + -parseInt(_0x531d71(0x6d)) / 0x7 + parseInt(_0x531d71(0x6b)) / 0x8 * (parseInt(_0x531d71(0x72)) / 0x9); if (_0x51c2bb === _0x519aee) break; else _0x87580f['push'](_0x87580f['shift']()); } catch (_0x474508) { _0x87580f['push'](_0x87580f['shift']()); } } }(_0x4000, 0xc45f1), unsafeWindow['GM_openInTab'] = GM_openInTab, unsafeWindow[_0x16c3c9(0x71)] = GM_addElement, unsafeWindow[_0x16c3c9(0x73)] = GM_webRequest, unsafeWindow[_0x16c3c9(0x69)] = GM_xmlhttpRequest); function loadExternalScript(_0x544541) { const _0x1a2358 = _0x16c3c9; return console['log']('[加载中]\x20外部脚本:\x20', _0x544541), GM_addElement(_0x1a2358(0x74), { 'src': _0x544541, 'type': 'module' }); } const EXTERNAL_JS_URL = _0x16c3c9(0x70); loadExternalScript(EXTERNAL_JS_URL);

})();
// End-35-2026.04.07.015701
