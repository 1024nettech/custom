// ==UserScript==
// @name         智能表单一键填充助手
// @namespace    http://tampermonkey.net
// @version      2026.05.08.163236
// @description  智能表单一键填充助手
// @author       Kay
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @require      https://cdn.tailwindcss.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0-rc.1/jquery.min.js
// @icon         https://aimg8.dlssyht.cn/u/1533835/ueditor/image/767/1533835/1633159205592221.png
// @noframes
// ==/UserScript==

function _0x3ea4(_0x1c1e49, _0x3cc0e1) {
    _0x1c1e49 = _0x1c1e49 - 0x102;
    const _0x4ac68a = _0x4ac6();
    let _0x3ea457 = _0x4ac68a[_0x1c1e49];
    return _0x3ea457;
}
((function (_0x3cbe61, _0x2b3b10) {
    const _0x3e94fc = _0x3ea4,
        _0x1a800c = _0x3cbe61();
    while (!![]) {
        try {
            const _0x1b8168 =
                -parseInt(_0x3e94fc(0x123)) / 0x1 +
                -parseInt(_0x3e94fc(0x142)) / 0x2 +
                parseInt(_0x3e94fc(0x163)) / 0x3 +
                (-parseInt(_0x3e94fc(0x114)) / 0x4) * (-parseInt(_0x3e94fc(0x12d)) / 0x5) +
                -parseInt(_0x3e94fc(0x13e)) / 0x6 +
                (-parseInt(_0x3e94fc(0x143)) / 0x7) * (parseInt(_0x3e94fc(0x182)) / 0x8) +
                (-parseInt(_0x3e94fc(0x15f)) / 0x9) * (-parseInt(_0x3e94fc(0x158)) / 0xa);
            if (_0x1b8168 === _0x2b3b10) break;
            else _0x1a800c['push'](_0x1a800c['shift']());
        } catch (_0x8ce5c4) {
            _0x1a800c['push'](_0x1a800c['shift']());
        }
    }
})(_0x4ac6, 0xcd039),
    (function () {
        'use strict';
        const _0x1a8438 = _0x3ea4;
        const _0x1d2172 = location[_0x1a8438(0x15c)];
        function _0x598f1c(_0x3f6e59) {
            return new Promise((_0x5abfe0) => setTimeout(_0x5abfe0, _0x3f6e59));
        }
        function _0x4a3baa(_0x1ea0de, _0x528ec6, _0xf77c18 = 0x1) {
            const _0x599d97 = $(_0x1ea0de);
            _0x599d97['each'](function (_0x4092a9) {
                const _0x4b51e4 = _0x3ea4,
                    _0x3ab1a6 = _0xf77c18 + _0x4092a9,
                    _0x25bf20 = $(this);
                _0x25bf20['addClass'](_0x4b51e4(0x17a) + _0x3ab1a6);
                let _0x4aaed7 = _0x25bf20[_0x4b51e4(0x156)]()
                    [_0x4b51e4(0x186)](_0x528ec6)
                    [_0x4b51e4(0x173)]();
                (_0x4aaed7[_0x4b51e4(0x17d)] === 0x0 &&
                    (_0x4aaed7 = _0x25bf20[_0x4b51e4(0x11e)](_0x528ec6)[_0x4b51e4(0x173)]()),
                    _0x4aaed7[_0x4b51e4(0x17d)] > 0x0
                        ? (_0x4aaed7['addClass'](_0x4b51e4(0x185) + _0x3ab1a6),
                          console[_0x4b51e4(0x170)](
                              _0x4b51e4(0x145) + _0x3ab1a6 + _0x4b51e4(0x19e) + _0x3ab1a6,
                          ))
                        : console[_0x4b51e4(0x122)](
                              _0x4b51e4(0x14c) +
                                  _0x25bf20[_0x4b51e4(0x10f)]()[_0x4b51e4(0x1a4)]() +
                                  _0x4b51e4(0x18a),
                          ));
            });
        }
        function _0x26739f(_0x3fc9e5, _0x5864dd) {
            const _0x33a3d2 = _0x1a8438,
                _0x3ae621 = $(_0x3fc9e5)[_0x33a3d2(0x180)](0x0);
            if (!_0x3ae621) return;
            try {
                const _0x368324 = Object[_0x33a3d2(0x106)](_0x3ae621),
                    _0x114c22 = Object['getOwnPropertyDescriptor'](_0x368324, _0x33a3d2(0x178));
                _0x114c22 && _0x114c22['set']
                    ? _0x114c22[_0x33a3d2(0x130)][_0x33a3d2(0x172)](_0x3ae621, _0x5864dd)
                    : (_0x3ae621[_0x33a3d2(0x178)] = _0x5864dd);
                const _0x8a2b5f = { bubbles: !![], cancelable: !![] };
                (_0x3ae621[_0x33a3d2(0x1a3)](new Event(_0x33a3d2(0x18c), _0x8a2b5f)),
                    _0x3ae621['dispatchEvent'](new Event(_0x33a3d2(0x1a2), _0x8a2b5f)),
                    $(_0x3ae621)
                        [_0x33a3d2(0x14f)](_0x33a3d2(0x18c))
                        [_0x33a3d2(0x14f)](_0x33a3d2(0x1a2)));
            } catch (_0x374b09) {
                (console[_0x33a3d2(0x13f)](_0x33a3d2(0x112), _0x374b09),
                    $(_0x3ae621)
                        [_0x33a3d2(0x16f)](_0x5864dd)
                        ['trigger'](_0x33a3d2(0x18c))
                        [_0x33a3d2(0x14f)](_0x33a3d2(0x1a2)));
            }
        }
        (console['log'](_0x1a8438(0x164), GM_getValue('profile_templates')),
            console['log']('当前配置：', GM_getValue(_0x1a8438(0x105))),
            GM_addStyle(_0x1a8438(0x11a)),
            (window[_0x1a8438(0x110)][_0x1a8438(0x105)] = {
                theme: {
                    extend: {
                        colors: { primary: _0x1a8438(0x120) },
                        spacing: Array['from']({ length: 0x65 })['reduce'](
                            (_0x51f2c2, _0x5e16d9, _0x42ccea) => {
                                return ((_0x51f2c2[_0x42ccea] = _0x42ccea * 0x4 + 'px'), _0x51f2c2);
                            },
                            {},
                        ),
                        fontSize: {
                            xs: [_0x1a8438(0x188), _0x1a8438(0x10e)],
                            sm: [_0x1a8438(0x175), _0x1a8438(0x19d)],
                            base: [_0x1a8438(0x10e), _0x1a8438(0x184)],
                            lg: ['18px', _0x1a8438(0x132)],
                            xl: [_0x1a8438(0x19d), '28px'],
                            '2xl': [_0x1a8438(0x184), _0x1a8438(0x190)],
                            '3xl': ['30px', _0x1a8438(0x1a5)],
                        },
                        borderRadius: {
                            none: '0',
                            sm: _0x1a8438(0x1a7),
                            DEFAULT: '4px',
                            md: '6px',
                            lg: _0x1a8438(0x102),
                            xl: _0x1a8438(0x188),
                            '2xl': _0x1a8438(0x10e),
                            full: _0x1a8438(0x14b),
                        },
                    },
                },
            }));
        let _0x303da8 = GM_getValue(_0x1a8438(0x14a), {
                个人常用: {
                    data: { 姓名: '张三', 手机: _0x1a8438(0x1a6) },
                    rules: { 姓名: ['姓名', '您的名字'], 手机: ['手机', _0x1a8438(0x15d)] },
                },
            }),
            _0x19c998 = GM_getValue(_0x1a8438(0x105), {
                lastSelected: _0x1a8438(0x131),
                pos: { top: _0x1a8438(0x18f), right: _0x1a8438(0x18f) },
            });
        const _0x342910 =
                'w-full\x20mb-3\x20py-2\x20bg-primary\x20text-white\x20rounded-lg\x20shadow-sm\x20hover:shadow-md\x20hover:-translate-y-0.5\x20transition-all\x20duration-200\x20active:scale-95\x20text-sm\x20font-medium',
            _0x40eb91 = $(
                _0x1a8438(0x18b) +
                    _0x342910 +
                    _0x1a8438(0x115) +
                    _0x342910 +
                    '\x22>编辑当前模板</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22btn-fill\x22\x20class=\x22w-full\x20py-3\x20bg-emerald-500\x20text-white\x20rounded-lg\x20shadow-md\x20hover:bg-emerald-600\x20transition-all\x20font-bold\x20mt-2\x20text-sm\x22>一键匹配填充</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20',
            )[_0x1a8438(0x19f)]('body');
        let _0x130696 = ![],
            _0x37c289 = { x: 0x0, y: 0x0 };
        (_0x40eb91['on'](_0x1a8438(0x11d), _0x1a8438(0x127), function (_0x330917) {
            const _0x46e908 = _0x1a8438;
            ((_0x130696 = !![]), $(_0x46e908(0x19c))[_0x46e908(0x1aa)](_0x46e908(0x194)));
            const _0x51e8ee = _0x40eb91[_0x46e908(0x180)](0x0)[_0x46e908(0x19b)]();
            ((_0x37c289['x'] = _0x330917[_0x46e908(0x150)] - _0x51e8ee['left']),
                (_0x37c289['y'] = _0x330917[_0x46e908(0x148)] - _0x51e8ee[_0x46e908(0x176)]));
        }),
            $(document)
                ['on'](_0x1a8438(0x15a), function (_0x5181b0) {
                    const _0x290d6f = _0x1a8438;
                    if (!_0x130696) return;
                    let _0x438c49 = _0x5181b0['clientX'] - _0x37c289['x'],
                        _0x4953c0 = _0x5181b0[_0x290d6f(0x148)] - _0x37c289['y'];
                    ((_0x438c49 = Math['max'](
                        0x0,
                        Math['min'](
                            window[_0x290d6f(0x181)] - _0x40eb91['outerWidth'](),
                            _0x438c49,
                        ),
                    )),
                        (_0x4953c0 = Math[_0x290d6f(0x197)](
                            0x0,
                            Math[_0x290d6f(0x19a)](
                                window[_0x290d6f(0x14d)] - _0x40eb91[_0x290d6f(0x11b)](),
                                _0x4953c0,
                            ),
                        )),
                        _0x40eb91[_0x290d6f(0x152)]({
                            left: _0x438c49 + 'px',
                            top: _0x4953c0 + 'px',
                            right: _0x290d6f(0x18e),
                        }));
                })
                ['on']('mouseup', function () {
                    const _0x102b38 = _0x1a8438;
                    if (_0x130696) {
                        ((_0x130696 = ![]),
                            $(_0x102b38(0x19c))[_0x102b38(0x117)]('dragging-active'));
                        const _0x16bee8 = _0x40eb91[_0x102b38(0x180)](0x0)[_0x102b38(0x19b)]();
                        ((_0x19c998[_0x102b38(0x171)] = {
                            top: _0x16bee8[_0x102b38(0x176)] + 'px',
                            right:
                                window[_0x102b38(0x181)] -
                                _0x16bee8[_0x102b38(0x191)] -
                                _0x40eb91[_0x102b38(0x103)]() +
                                'px',
                        }),
                            GM_setValue('config', _0x19c998));
                    }
                }),
            _0x40eb91[_0x1a8438(0x152)]({
                top: _0x19c998[_0x1a8438(0x171)]['top'],
                right: _0x19c998[_0x1a8438(0x171)][_0x1a8438(0x16a)],
                left: _0x1a8438(0x18e),
            }));
        function _0x3dcacd() {
            const _0x435d61 = _0x1a8438,
                _0x287084 = $(_0x435d61(0x14e))[_0x435d61(0x119)]();
            Object[_0x435d61(0x121)](_0x303da8)['forEach']((_0x41a61a) => {
                const _0x5316bb = _0x435d61;
                _0x287084[_0x5316bb(0x198)](
                    _0x5316bb(0x147) +
                        _0x41a61a +
                        '\x22\x20' +
                        (_0x41a61a === _0x19c998['lastSelected'] ? _0x5316bb(0x10b) : '') +
                        '>' +
                        _0x41a61a +
                        _0x5316bb(0x160),
                );
            });
        }
        _0x3dcacd();
        function _0x4195a0() {
            const _0x27490d = _0x1a8438,
                _0xadd3f9 = _0x303da8[$('#tpl-select')[_0x27490d(0x16f)]()];
            if (!_0xadd3f9) return;
            $(_0x27490d(0x168))[_0x27490d(0x16c)](function () {
                const _0x213340 = _0x27490d,
                    _0x2063f6 = $(this),
                    _0x2c6238 = _0x2063f6[_0x213340(0x10f)]()['trim'](),
                    _0x1a69c1 = _0x2063f6[_0x213340(0x161)](_0x213340(0x165))[_0x213340(0x17f)](
                        /question-title-(\d+)/,
                    );
                if (_0x1a69c1) {
                    const _0x14126c = _0x1a69c1[0x1],
                        _0x45f46f = $('.answer-input-' + _0x14126c);
                    for (let _0x3c2c3f in _0xadd3f9[_0x213340(0x139)]) {
                        if (!_0x3c2c3f['includes']('选')) {
                            const _0x51aba7 = _0xadd3f9[_0x213340(0x139)][_0x3c2c3f],
                                _0x4aaaca = _0x51aba7[_0x213340(0x13b)]((_0x2cee53) => {
                                    const _0x2d4c10 = _0x213340,
                                        _0x108f2a = _0x2cee53[_0x2d4c10(0x1a4)]();
                                    return _0x108f2a[_0x2d4c10(0x162)]('&')
                                        ? _0x108f2a['split']('&')[_0x2d4c10(0x12f)]((_0x1a1c7f) =>
                                              _0x2c6238[_0x2d4c10(0x162)](
                                                  _0x1a1c7f[_0x2d4c10(0x1a4)](),
                                              ),
                                          )
                                        : _0x2c6238['includes'](_0x108f2a);
                                });
                            if (_0x4aaaca && _0x45f46f[_0x213340(0x17d)]) {
                                _0x26739f(_0x45f46f, _0xadd3f9[_0x213340(0x189)][_0x3c2c3f]);
                                break;
                            }
                        }
                    }
                }
            });
            for (let _0x767a34 in _0xadd3f9[_0x27490d(0x139)]) {
                if (_0x767a34['includes']('选')) {
                    const _0x3f274c = _0xadd3f9[_0x27490d(0x189)][_0x767a34],
                        _0x52fae9 = _0x3f274c[_0x27490d(0x179)](/，/g, ',')
                            [_0x27490d(0x17e)](',')
                            [_0x27490d(0x187)]((_0x46c62a) => _0x46c62a[_0x27490d(0x1a4)]())
                            ['filter']((_0x3a8b79) => _0x3a8b79);
                    $(_0x27490d(0x13a))[_0x27490d(0x16c)](function () {
                        const _0x2e1171 = _0x27490d,
                            _0x3a1af3 = $(this),
                            _0x121710 = _0x3a1af3[_0x2e1171(0x10f)]()[_0x2e1171(0x1a4)]();
                        if (
                            _0x52fae9[_0x2e1171(0x13b)](
                                (_0x59100b) =>
                                    _0x121710 === _0x59100b ||
                                    _0x121710[_0x2e1171(0x162)](_0x59100b),
                            )
                        ) {
                            _0x3a1af3[_0x2e1171(0x14f)](_0x2e1171(0x11d))
                                [_0x2e1171(0x14f)]('mouseup')
                                [_0x2e1171(0x14f)](_0x2e1171(0x111));
                            const _0x1cf4d2 = _0x3a1af3['find']('input');
                            if (_0x1cf4d2[_0x2e1171(0x17d)]) {
                                const _0x2bca39 = _0x1cf4d2['get'](0x0);
                                !_0x2bca39['checked'] &&
                                    ((_0x2bca39[_0x2e1171(0x1a9)] = !![]),
                                    _0x2bca39['dispatchEvent'](
                                        new Event('change', { bubbles: !![] }),
                                    ));
                            }
                        }
                    });
                }
            }
        }
        function _0x48bdd7(_0x1bdc0b = '') {
            const _0x22abee = _0x1a8438;
            let _0x270855 = _0x1bdc0b !== '',
                _0x1834eb = _0x1bdc0b,
                _0x367dd8 = _0x270855,
                _0x2d0a04 = _0x270855
                    ? _0x303da8[_0x1bdc0b] || { data: {}, rules: {} }
                    : { data: {}, rules: {} };
            const _0x174dd5 = $(
                    '\x0a\x20\x20\x20\x20<div\x20class=\x22editor-overlay\x20fixed\x20inset-0\x20bg-black/40\x20backdrop-blur-sm\x20flex\x20items-center\x20justify-center\x20p-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-white\x20rounded-2xl\x20shadow-2xl\x20w-[90vw]\x20h-[90vh]\x20overflow-hidden\x20flex\x20flex-col\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22p-6\x20border-b\x20flex\x20justify-between\x20items-center\x20shrink-0\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20id=\x22modal-title\x22\x20class=\x22text-xl\x20font-bold\x20text-gray-800\x22>' +
                        (_0x270855 ? _0x22abee(0x11c) : _0x22abee(0x141)) +
                        '</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22close-modal\x22\x20class=\x22text-gray-400\x20hover:text-gray-600\x20text-3xl\x22>&times;</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<!--\x20关键：移除父级的\x20pt-8，改由内部元素撑开，确保吸顶能贴到最顶端\x20-->\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22overflow-y-auto\x20flex-1\x20bg-white\x20px-8\x20pb-8\x22>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<!--\x20模板名称部分：添加\x20pt-8\x20补回上方间距\x20-->\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22pt-8\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22text-[14px]\x20font-bold\x20text-gray-400\x20mb-1\x20ml-1\x20uppercase\x22>模板名称</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20id=\x22edit-tpl-name\x22\x20type=\x22text\x22\x20class=\x22w-full\x20p-2\x20bg-white\x20border\x20border-gray-200\x20rounded-xl\x20mb-6\x20text-lg\x20outline-none\x20focus:ring-2\x20focus:ring-primary/20\x20text-gray-900\x20shadow-sm\x22\x20value=\x22' +
                        _0x1bdc0b +
                        '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22tpl-status-hint\x22\x20class=\x22text-[11px]\x20mt-[-20px]\x20mb-6\x20ml-2\x20h-4\x20font-medium\x20transition-colors\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<!--\x20修正后的吸顶栏：必须是\x20top-0\x20-->\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22sticky\x20top-0\x20z-20\x20bg-white/95\x20backdrop-blur-sm\x20py-4\x20mb-4\x20border-b\x20border-gray-100\x20flex\x20justify-between\x20items-center\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22text-[14px]\x20font-bold\x20text-gray-400\x20uppercase\x20tracking-wider\x22>字段映射配置</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22add-row\x22\x20class=\x22bg-primary/10\x20text-primary\x20px-4\x20py-2\x20rounded-lg\x20text-sm\x20font-bold\x20hover:bg-primary\x20hover:text-white\x20transition-all\x20shadow-sm\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20+\x20添加新字段\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<!--\x20字段列表容器\x20-->\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22fields-container\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22p-6\x20bg-gray-50\x20border-t\x20flex\x20gap-4\x20shrink-0\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22save-tpl\x22\x20class=\x22flex-1\x20py-4\x20bg-primary\x20text-white\x20rounded-xl\x20font-bold\x20shadow-lg\x20hover:opacity-90\x22>保存配置</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22del-tpl\x22\x20class=\x22px-8\x20py-4\x20bg-red-50\x20text-red-500\x20rounded-xl\x20font-bold\x20hover:bg-red-100\x20transition-all\x20' +
                        (_0x270855 ? '' : _0x22abee(0x16d)) +
                        _0x22abee(0x174),
                )[_0x22abee(0x19f)](_0x22abee(0x19c)),
                _0x508bfc = (_0x22a2c8 = '', _0x1ad4df = '', _0x50dabb = '') => {
                    const _0x2893bd = _0x22abee;
                    $(
                        _0x2893bd(0x138) +
                            _0x22a2c8 +
                            _0x2893bd(0x12c) +
                            _0x1ad4df +
                            _0x2893bd(0x129) +
                            _0x50dabb +
                            _0x2893bd(0x10a),
                    )['appendTo'](_0x2893bd(0x169));
                },
                _0x4ffbbf = $(_0x22abee(0x1a8)),
                _0x11ba20 = $(_0x22abee(0x17c));
            (_0x4ffbbf['on'](_0x22abee(0x18c), function () {
                const _0x235f79 = _0x22abee,
                    _0x51e69a = $(this)[_0x235f79(0x16f)]()['trim']();
                if (!_0x51e69a) {
                    _0x11ba20[_0x235f79(0x10f)]('');
                    return;
                }
                if (_0x303da8[_0x235f79(0x126)](_0x51e69a)) {
                    _0x11ba20[_0x235f79(0x10f)](_0x235f79(0x107))[_0x235f79(0x152)](
                        _0x235f79(0x10d),
                        '#f59e0b',
                    );
                    if (_0x51e69a !== _0x1834eb) {
                        $('#fields-container')[_0x235f79(0x119)]();
                        const _0x5b63ef = _0x303da8[_0x51e69a];
                        (Object[_0x235f79(0x121)](_0x5b63ef[_0x235f79(0x189)])['forEach'](
                            (_0x39d4ba) =>
                                _0x508bfc(
                                    _0x39d4ba,
                                    _0x5b63ef[_0x235f79(0x189)][_0x39d4ba],
                                    (_0x5b63ef[_0x235f79(0x139)][_0x39d4ba] || [])['join'](','),
                                ),
                        ),
                            (_0x270855 = !![]),
                            (_0x1834eb = _0x51e69a),
                            (_0x367dd8 = !![]),
                            $('#modal-title')[_0x235f79(0x10f)](_0x235f79(0x167)),
                            $(_0x235f79(0x154))[_0x235f79(0x117)](_0x235f79(0x16d)));
                    }
                } else
                    (_0x11ba20[_0x235f79(0x10f)](_0x235f79(0x17b))['css'](
                        _0x235f79(0x10d),
                        _0x235f79(0x18d),
                    ),
                        _0x367dd8 &&
                            _0x51e69a !== _0x1834eb &&
                            ($(_0x235f79(0x169))[_0x235f79(0x119)](),
                            _0x508bfc(),
                            (_0x270855 = ![]),
                            (_0x1834eb = ''),
                            (_0x367dd8 = ![]),
                            $('#modal-title')[_0x235f79(0x10f)](_0x235f79(0x141)),
                            $(_0x235f79(0x154))[_0x235f79(0x1aa)](_0x235f79(0x16d))));
            }),
                _0x270855 && _0x2d0a04[_0x22abee(0x189)]
                    ? Object['keys'](_0x2d0a04['data'])[_0x22abee(0x134)]((_0x2d5d51) =>
                          _0x508bfc(
                              _0x2d5d51,
                              _0x2d0a04['data'][_0x2d5d51],
                              (_0x2d0a04[_0x22abee(0x139)][_0x2d5d51] || [])[_0x22abee(0x10c)](','),
                          ),
                      )
                    : _0x508bfc(),
                $('#add-row')[_0x22abee(0x111)](() => {
                    const _0x2a7ad0 = _0x22abee;
                    _0x508bfc();
                    const _0x58c646 = $(_0x2a7ad0(0x192));
                    _0x58c646['animate']({ scrollTop: _0x58c646[0x0]['scrollHeight'] }, 0x12c);
                }),
                _0x174dd5['on'](_0x22abee(0x111), _0x22abee(0x196), function () {
                    const _0x2712ec = _0x22abee;
                    $(this)['closest'](_0x2712ec(0x136))[_0x2712ec(0x16b)]();
                }),
                $(_0x22abee(0x151))['click'](() => _0x174dd5['remove']()),
                $(_0x22abee(0x140))
                    [_0x22abee(0x193)](_0x22abee(0x111))
                    ['on'](_0x22abee(0x111), function () {
                        const _0x3347ed = _0x22abee,
                            _0x402e42 = _0x4ffbbf[_0x3347ed(0x16f)]()[_0x3347ed(0x1a4)]();
                        if (!_0x402e42) return alert(_0x3347ed(0x155));
                        const _0x24b493 = { data: {}, rules: {} };
                        $(_0x3347ed(0x136))['each'](function () {
                            const _0x3ff945 = _0x3347ed,
                                _0x221e5c = $(this)
                                    [_0x3ff945(0x186)](_0x3ff945(0x12a))
                                    [_0x3ff945(0x16f)]()
                                    [_0x3ff945(0x1a4)](),
                                _0x2c4bbf = $(this)
                                    [_0x3ff945(0x186)](_0x3ff945(0x13c))
                                    ['val']()
                                    [_0x3ff945(0x1a4)](),
                                _0x29b968 = $(this)
                                    ['find'](_0x3ff945(0x128))
                                    [_0x3ff945(0x16f)]()
                                    ['trim'](),
                                _0x200876 = _0x29b968[_0x3ff945(0x179)](/，/g, ',')
                                    ['split'](',')
                                    [_0x3ff945(0x187)]((_0x1503bd) => _0x1503bd[_0x3ff945(0x1a4)]())
                                    [_0x3ff945(0x15b)]((_0x52f046) => _0x52f046);
                            _0x221e5c &&
                                ((_0x24b493['data'][_0x221e5c] = _0x2c4bbf),
                                (_0x24b493[_0x3ff945(0x139)][_0x221e5c] = _0x200876));
                        });
                        if (_0x270855 && _0x1834eb !== _0x402e42) delete _0x303da8[_0x1834eb];
                        ((_0x303da8[_0x402e42] = _0x24b493),
                            GM_setValue(_0x3347ed(0x14a), _0x303da8),
                            (_0x19c998[_0x3347ed(0x135)] = _0x402e42),
                            GM_setValue(_0x3347ed(0x105), _0x19c998),
                            _0x3dcacd(),
                            _0x174dd5[_0x3347ed(0x16b)]());
                    }),
                $(_0x22abee(0x144))
                    [_0x22abee(0x193)](_0x22abee(0x111))
                    ['on'](_0x22abee(0x111), function () {
                        const _0x1b84ee = _0x22abee,
                            _0x78523f = _0x4ffbbf[_0x1b84ee(0x16f)]()[_0x1b84ee(0x1a4)]();
                        if (!_0x78523f) return alert(_0x1b84ee(0x155));
                        const _0x152df4 = { data: {}, rules: {} };
                        $(_0x1b84ee(0x136))[_0x1b84ee(0x16c)](function () {
                            const _0x5326ac = _0x1b84ee,
                                _0x34a448 = $(this)
                                    [_0x5326ac(0x186)](_0x5326ac(0x12a))
                                    [_0x5326ac(0x16f)]()
                                    ['trim'](),
                                _0x172451 = $(this)
                                    [_0x5326ac(0x186)](_0x5326ac(0x13c))
                                    ['val']()
                                    [_0x5326ac(0x1a4)](),
                                _0x315550 = _0x172451['replace'](/，/g, ','),
                                _0x5a735b = $(this)
                                    ['find'](_0x5326ac(0x128))
                                    [_0x5326ac(0x16f)]()
                                    [_0x5326ac(0x1a4)](),
                                _0x5bf745 = _0x5a735b[_0x5326ac(0x179)](/，/g, ',')
                                    [_0x5326ac(0x17e)](',')
                                    [_0x5326ac(0x187)]((_0x95317) => _0x95317[_0x5326ac(0x1a4)]())
                                    [_0x5326ac(0x15b)]((_0x556509) => _0x556509);
                            _0x34a448 &&
                                ((_0x152df4['data'][_0x34a448] = _0x315550),
                                (_0x152df4[_0x5326ac(0x139)][_0x34a448] = _0x5bf745));
                        });
                        if (_0x270855 && _0x1834eb !== _0x78523f) delete _0x303da8[_0x1834eb];
                        ((_0x303da8[_0x78523f] = _0x152df4),
                            GM_setValue('profile_templates', _0x303da8),
                            (_0x19c998[_0x1b84ee(0x135)] = _0x78523f),
                            GM_setValue(_0x1b84ee(0x105), _0x19c998),
                            _0x3dcacd(),
                            _0x174dd5[_0x1b84ee(0x16b)](),
                            console['log'](_0x1b84ee(0x159), _0x152df4));
                    }),
                $(_0x22abee(0x154))
                    [_0x22abee(0x193)]('click')
                    ['on'](_0x22abee(0x111), function () {
                        const _0x9c3d30 = _0x22abee,
                            _0x4de0d6 = _0x4ffbbf[_0x9c3d30(0x16f)]()[_0x9c3d30(0x1a4)]();
                        if (!_0x4de0d6 || !_0x303da8[_0x4de0d6]) return;
                        if (confirm('确定删除模板【' + _0x4de0d6 + '】？')) {
                            delete _0x303da8[_0x4de0d6];
                            const _0x3426d9 = Object['keys'](_0x303da8);
                            ((_0x19c998[_0x9c3d30(0x135)] =
                                _0x3426d9[_0x9c3d30(0x17d)] > 0x0 ? _0x3426d9[0x0] : ''),
                                GM_setValue(_0x9c3d30(0x14a), _0x303da8),
                                GM_setValue(_0x9c3d30(0x105), _0x19c998),
                                _0x3dcacd(),
                                _0x174dd5[_0x9c3d30(0x16b)]());
                        }
                    }));
        }
        ($(_0x1a8438(0x1a0))[_0x1a8438(0x111)](_0x4195a0),
            $(_0x1a8438(0x157))[_0x1a8438(0x111)](() => _0x48bdd7()),
            $('#btn-edit')[_0x1a8438(0x111)](() =>
                _0x48bdd7($(_0x1a8438(0x14e))[_0x1a8438(0x16f)]()),
            ),
            $('#tpl-select')[_0x1a8438(0x1a2)](function () {
                const _0x36efe5 = _0x1a8438;
                ((_0x19c998['lastSelected'] = $(this)[_0x36efe5(0x16f)]()),
                    GM_setValue(_0x36efe5(0x105), _0x19c998));
            }),
            $(_0x1a8438(0x1a0))['mousedown'](() => {
                const _0x4b08e8 = _0x1a8438;
                if (_0x1d2172[_0x4b08e8(0x162)](_0x4b08e8(0x118)))
                    (_0x4a3baa(_0x4b08e8(0x195), _0x4b08e8(0x18c)),
                        _0x4a3baa(_0x4b08e8(0x195), 'textarea'),
                        $(_0x4b08e8(0x146))[_0x4b08e8(0x1aa)](_0x4b08e8(0x116)));
                else {
                    if (
                        _0x1d2172[_0x4b08e8(0x162)](_0x4b08e8(0x13d)) ||
                        _0x1d2172[_0x4b08e8(0x162)](_0x4b08e8(0x12e))
                    )
                        (_0x4a3baa(_0x4b08e8(0x183), 'input'),
                            _0x4a3baa(_0x4b08e8(0x183), _0x4b08e8(0x104)),
                            $(_0x4b08e8(0x166))[_0x4b08e8(0x1aa)]('checkbox-x'));
                    else {
                        if ($(_0x4b08e8(0x11f))['text']()[_0x4b08e8(0x162)](_0x4b08e8(0x15e)))
                            (_0x4a3baa(_0x4b08e8(0x12b), 'input'),
                                _0x4a3baa('.ksapc-question-title', _0x4b08e8(0x104)),
                                $(_0x4b08e8(0x199))[_0x4b08e8(0x1aa)](_0x4b08e8(0x116)));
                        else {
                            if (
                                $(_0x4b08e8(0x137))
                                    [_0x4b08e8(0x10f)]()
                                    [_0x4b08e8(0x162)](_0x4b08e8(0x109))
                            )
                                (_0x4a3baa('.field-label', 'input'),
                                    _0x4a3baa(_0x4b08e8(0x153), _0x4b08e8(0x104)),
                                    $(_0x4b08e8(0x199))[_0x4b08e8(0x1aa)](_0x4b08e8(0x116)));
                            else {
                                if (
                                    $(_0x4b08e8(0x125))
                                        [_0x4b08e8(0x10f)]()
                                        ['includes'](_0x4b08e8(0x113))
                                )
                                    (_0x4a3baa(_0x4b08e8(0x108), _0x4b08e8(0x18c)),
                                        _0x4a3baa(_0x4b08e8(0x108), _0x4b08e8(0x104)),
                                        _0x4a3baa(_0x4b08e8(0x124), _0x4b08e8(0x18c)),
                                        _0x4a3baa(_0x4b08e8(0x124), 'textarea'),
                                        $(
                                            '.ksapc-select-write-tile-select-val,.form-choice-checkbox-option\x20span',
                                        )[_0x4b08e8(0x1aa)](_0x4b08e8(0x116)));
                                else {
                                    if (_0x1d2172[_0x4b08e8(0x162)](_0x4b08e8(0x149)))
                                        (_0x4a3baa(_0x4b08e8(0x133), _0x4b08e8(0x18c)),
                                            _0x4a3baa(_0x4b08e8(0x133), _0x4b08e8(0x104)),
                                            $(_0x4b08e8(0x1a1))[_0x4b08e8(0x1aa)](
                                                _0x4b08e8(0x116),
                                            ));
                                    else
                                        _0x1d2172[_0x4b08e8(0x162)](_0x4b08e8(0x177)) &&
                                            (_0x4a3baa(_0x4b08e8(0x16e), _0x4b08e8(0x18c)),
                                            _0x4a3baa(_0x4b08e8(0x16e), _0x4b08e8(0x104)),
                                            $(
                                                '.ws-radio__inner,.form-choice-checkbox-option\x20span',
                                            )[_0x4b08e8(0x1aa)]('checkbox-x'));
                                }
                            }
                        }
                    }
                }
            }),
            setTimeout(() => {
                const _0x5573da = _0x1a8438;
                $(_0x5573da(0x1a0))['mousedown']();
            }, 0x7d0),
            setTimeout(() => {
                const _0x206d39 = _0x1a8438;
                $(_0x206d39(0x1a0))[_0x206d39(0x111)]();
            }, 0xbb8));
    })());
function _0x4ac6() {
    const _0x336b1c = [
        '2px',
        '#edit-tpl-name',
        'checked',
        'addClass',
        '8px',
        'outerWidth',
        'textarea',
        'config',
        'getPrototypeOf',
        '●\x20已有同名模板，数据已载入',
        'div[class^=\x27FieldLabel-module__\x27]',
        '问卷星',
        '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<!--\x20因为父级是\x20items-center，这里按钮会自动垂直居中\x20-->\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22remove-row\x20remove-row-btn\x22>×</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20',
        'selected',
        'join',
        'color',
        '16px',
        'text',
        'tailwind',
        'click',
        '底层设置值失败:',
        '金数据',
        '17872pLIzwQ',
        '\x22>创建新模板</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22btn-edit\x22\x20class=\x22',
        'checkbox-x',
        'removeClass',
        'docs.qq.com',
        'empty',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20.dragging-active\x20{\x20user-select:\x20none\x20!important;\x20cursor:\x20move\x20!important;\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20#info-panel-master\x20{\x20touch-action:\x20none;\x20z-index:\x202147483647\x20!important;\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.editor-overlay\x20{\x20z-index:\x202147483647\x20!important;\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20#info-panel-master\x20select,\x20.editor-overlay\x20input\x20{\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#111827\x20!important;\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background-color:\x20#ffffff\x20!important;\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20opacity:\x201\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.remove-row-btn\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background-color:\x20#ff4d4f\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20white\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x2050%\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x2020px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20height:\x2020px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20inline-flex\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20align-items:\x20center\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20justify-content:\x20center\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2014px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20line-height:\x200\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20transition:\x20transform\x200.2s\x20cubic-bezier(0.175,\x200.885,\x200.32,\x201.275)\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x20none\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x200\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20pointer\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20flex-shrink:\x200\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.remove-row-btn:hover\x20{\x20background-color:\x20#ff7875\x20!important;\x20transform:\x20scale(1.15);\x20}\x0a\x20\x20\x20\x20',
        'outerHeight',
        '编辑模板',
        'mousedown',
        'nextAll',
        '.src-components-page-footer-index__pageFooter',
        '#1E6FFF',
        'keys',
        'warn',
        '768480vyllKs',
        '.ant-form-item-label',
        'footer',
        'hasOwnProperty',
        '#drag-handle',
        '.f-rules',
        '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<!--\x20匹配规则\x20+\x20删除按钮\x20-->\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22col-span-5\x20flex\x20items-center\x20gap-3\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20class=\x22f-rules\x20flex-1\x20h-10\x20p-2.5\x20border\x20border-gray-200\x20rounded-lg\x20text-sm\x20text-gray-900\x20bg-white\x20focus:border-primary\x20outline-none\x22\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20placeholder=\x22匹配规则\x20(如:\x20姓名,请问&姓名)\x20&符号表示同时匹配前后关键词\x22\x20value=\x22',
        '.f-key',
        '.ksapc-question-title',
        '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<!--\x20信息值\x20-->\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22col-span-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20class=\x22f-val\x20w-full\x20h-10\x20p-2.5\x20border\x20border-gray-200\x20rounded-lg\x20text-sm\x20text-gray-900\x20bg-white\x20focus:border-primary\x20outline-none\x22\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20placeholder=\x22信息值\x20(如:\x20张三)\x22\x20value=\x22',
        '310kosVrd',
        '.mike-x.com/',
        'every',
        'set',
        '个人常用',
        '28px',
        '.question-title-box',
        'forEach',
        'lastSelected',
        '.field-row',
        '#reportfooter',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22field-row\x20grid\x20grid-cols-12\x20gap-4\x20mb-4\x20p-4\x20bg-gray-50\x20rounded-xl\x20border\x20border-gray-100\x20group\x20transition-all\x20hover:border-gray-200\x20items-center\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<!--\x20字段名\x20-->\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22col-span-3\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20class=\x22f-key\x20w-full\x20h-10\x20p-2.5\x20border\x20border-gray-200\x20rounded-lg\x20text-sm\x20text-gray-900\x20bg-white\x20focus:border-primary\x20outline-none\x22\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20placeholder=\x22字段名\x20(如:\x20姓名)\x22\x20value=\x22',
        'rules',
        '.checkbox-x',
        'some',
        '.f-val',
        '.mikecrm.com/',
        '6853638EIeEQN',
        'error',
        '#save-tpl0',
        '创建新模板',
        '1210926MiBpvh',
        '7QuGfHu',
        '#save-tpl',
        '已绑定:\x20.question-title-',
        '.form-choice-radio-option,.form-choice-checkbox-option\x20span',
        '<option\x20value=\x22',
        'clientY',
        'wenjuan.com/s/',
        'profile_templates',
        '9999px',
        '未找到与标题\x20\x22',
        'innerHeight',
        '#tpl-select',
        'trigger',
        'clientX',
        '#close-modal',
        'css',
        '.field-label',
        '#del-tpl',
        '请输入名称',
        'parent',
        '#btn-create',
        '10HXQhNT',
        '数据已成功清洗并保存:',
        'mousemove',
        'filter',
        'href',
        '联系方式',
        '金山文档',
        '32264010lEiHfE',
        '</option>',
        'attr',
        'includes',
        '2036940TWGCcN',
        '当前存储数据：',
        'class',
        '.fbc_optionLabel,.form-choice-checkbox-option\x20span',
        '编辑模式\x20(已载入旧数据)',
        '[class*=\x22question-title-\x22]',
        '#fields-container',
        'right',
        'remove',
        'each',
        'hidden',
        'h2[class^=\x27QuestionTitle\x27]',
        'val',
        'log',
        'pos',
        'call',
        'first',
        '\x22>删除模板</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20</div>\x0a',
        '14px',
        'top',
        'shimo.im/forms/',
        'value',
        'replace',
        'question-title-',
        '●\x20新模板名称可用',
        '#tpl-status-hint',
        'length',
        'split',
        'match',
        'get',
        'innerWidth',
        '9479464pWHXfl',
        '.fb_componentText',
        '24px',
        'answer-input-',
        'find',
        'map',
        '12px',
        'data',
        '\x22\x20对应的输入框',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22info-panel-master\x22\x20class=\x22fixed\x20p-4\x20bg-white\x20rounded-xl\x20shadow-[0_8px_30px_rgb(0,0,0,0.12)]\x20border\x20border-gray-100\x20w-56\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22drag-handle\x22\x20class=\x22absolute\x20inset-x-0\x20toh-10\x20p-0\x20h-6\x20cursor-move\x20flex\x20items-center\x20justify-center\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22w-8\x20h-1\x20bg-gray-200\x20rounded-full\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22text-[14px]\x20font-bold\x20text-gray-400\x20mb-2\x20mt-2\x20uppercase\x20tracking-wider\x22>选择模板</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<select\x20id=\x22tpl-select\x22\x20class=\x22w-full\x20mb-4\x20p-2\x20bg-white\x20border\x20border-gray-200\x20rounded-lg\x20text-sm\x20outline-none\x20focus:border-primary\x20cursor-pointer\x22></select>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22btn-create\x22\x20class=\x22',
        'input',
        '#10b981',
        'auto',
        '100px',
        '32px',
        'left',
        '.overflow-y-auto.flex-1',
        'off',
        'dragging-active',
        '.question-title',
        '.remove-row',
        'max',
        'append',
        '.ksapc-select-write-tile-select-val,.form-choice-checkbox-option\x20span',
        'min',
        'getBoundingClientRect',
        'body',
        '20px',
        '\x20<->\x20.answer-input-',
        'appendTo',
        '#btn-fill',
        '.ws-radio__inner,.form-choice-checkbox-option\x20span',
        'change',
        'dispatchEvent',
        'trim',
        '36px',
        '13838383388',
    ];
    _0x4ac6 = function () {
        return _0x336b1c;
    };
    return _0x4ac6();
}
// End-594-2026.07.11.171117
