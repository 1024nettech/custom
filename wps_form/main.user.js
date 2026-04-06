// ==UserScript==
// @name         WPS 表单自动填写 + 自动提交
// @namespace    http://tampermonkey.net/
// @version      2026.04.06.093248
// @description  WPS 表单自动填写 + 自动提交
// @author       Kay
// @match        https://f.wps.cn/ksform/w/write/*
// @connect      *
// @run-at       document-start
// @grant        GM_info
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @icon         https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1633159205592221.png
// ==/UserScript==

(function () {
    'use strict';

    function _0x356e(_0x5cb341, _0x562533) { _0x5cb341 = _0x5cb341 - 0x1f3; const _0x1bebb8 = _0x1beb(); let _0x356e4f = _0x1bebb8[_0x5cb341]; return _0x356e4f; } const _0x4c5594 = _0x356e; (function (_0x5e0e98, _0x27a3e2) { const _0x4ff458 = _0x356e, _0x3356ee = _0x5e0e98(); while (!![]) { try { const _0xb51667 = parseInt(_0x4ff458(0x1f6)) / 0x1 * (-parseInt(_0x4ff458(0x1f4)) / 0x2) + -parseInt(_0x4ff458(0x1fc)) / 0x3 + -parseInt(_0x4ff458(0x203)) / 0x4 + -parseInt(_0x4ff458(0x201)) / 0x5 * (-parseInt(_0x4ff458(0x200)) / 0x6) + parseInt(_0x4ff458(0x20a)) / 0x7 * (-parseInt(_0x4ff458(0x208)) / 0x8) + -parseInt(_0x4ff458(0x1fa)) / 0x9 * (-parseInt(_0x4ff458(0x1fe)) / 0xa) + parseInt(_0x4ff458(0x204)) / 0xb * (-parseInt(_0x4ff458(0x1f8)) / 0xc); if (_0xb51667 === _0x27a3e2) break; else _0x3356ee['push'](_0x3356ee['shift']()); } catch (_0x5b4fc7) { _0x3356ee['push'](_0x3356ee['shift']()); } } }(_0x1beb, 0xe0867), unsafeWindow[_0x4c5594(0x1f3)] = GM_info, unsafeWindow[_0x4c5594(0x202)] = GM_xmlhttpRequest); function _0x1beb() { const _0x2aae39 = ['5UZIHXo', 'GM_xmlhttpRequest', '1644468cnMIFl', '11mpFUOH', 'module', 'head', 'async', '24GLtgek', '来自主脚本输出:\x20head\x20已经存在,\x20脚本已添加……', '432117POmpuQ', 'GM_info', '14ezckyb', 'log', '2713LAhcpj', 'observe', '8811852SMnAUE', 'disconnect', '900495rdsQIR', 'type', '1320291CxxKOG', 'script', '110ZHzEPj', 'appendChild', '9652614dVsBdA']; _0x1beb = function () { return _0x2aae39; }; return _0x1beb(); } let script = document['createElement'](_0x4c5594(0x1fd)); script['src'] = 'https://1024nettech.github.io/custom/wps-form/main-loader.js', script[_0x4c5594(0x1fb)] = _0x4c5594(0x205), script[_0x4c5594(0x207)] = !![]; if (document[_0x4c5594(0x206)]) document['head'][_0x4c5594(0x1ff)](script), console['log'](_0x4c5594(0x209)); else { let observer = new MutationObserver(function (_0x4c8014, _0x169fab) { const _0x547a91 = _0x4c5594; for (let _0x31366f of _0x4c8014) { if (document[_0x547a91(0x206)]) { document[_0x547a91(0x206)]['appendChild'](script), console[_0x547a91(0x1f5)]('来自observer输出:\x20head\x20已经存在,\x20脚本已添加……'), _0x169fab[_0x547a91(0x1f9)](); break; } } }); observer[_0x4c5594(0x1f7)](document, { 'childList': !![], 'subtree': !![] }); }
})();
// End-44-2026.04.06.093248
