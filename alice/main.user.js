// ==UserScript==
// @name         社媒平台播放量/点赞/评论/收藏/转发数据抓取, 一键复制工具
// @namespace    http://tampermonkey.net
// @version      2026.11.02.153832
// @description  社媒平台播放量/点赞/评论/收藏/转发数据抓取, 一键复制工具
// @author       Kay
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0/jquery.min.js
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    // ================= [样式表现分离层] =================
    const PANEL_STYLES = `
    #tm-social-panel {
        position: fixed;
        z-index: 999999;
        background: #ffffff;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        padding: 12px;
        font-family: Arial, sans-serif;
        font-size: 13px;
        color: #333;
        min-width: 180px;
        width: max-content;
        cursor: move;
        user-select: none;
    }
    .tm-panel-title {
        font-weight: bold;
        margin-bottom: 8px;
        border-bottom: 1px solid #eee;
        padding-bottom: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        white-space: nowrap;
    }
    .tm-refresh-icon-btn:hover { color: #1890ff; transform: rotate(180deg); }
    .tm-metric-item { margin-bottom: 4px; }
    .tm-metric-item span { font-weight: 600; }
    #tm-p-play { color: #1890ff; }
    #tm-p-like { color: #52c41a; }
    #tm-p-comment { color: #fa8c16; }
    #tm-p-collect { color: #722ed1; }
    #tm-p-share { color: #eb2f96; margin-bottom: 10px; }
    #tm-copy-btn {
        width: 100%;
        background: #1890ff;
        color: #fff;
        border: none;
        padding: 6px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: background 0.3s;
    }
    #tm-copy-btn.success { background: #52c41a !important; }
`;

    // ================= [DOM 结构分离层] =================
    function renderPanelTemplate(siteName, pos) {
        return `
        <div id="tm-social-panel" style="top: ${pos.top}; right: ${pos.right};">
            <div class="tm-panel-title">
                <span>📊 数据看板 (${siteName})</span>
            </div>
            <div class="tm-metric-item">播放: <span id="tm-p-play">/</span></div>
            <div class="tm-metric-item">点赞: <span id="tm-p-like">/</span></div>
            <div class="tm-metric-item">评论: <span id="tm-p-comment">/</span></div>
            <div class="tm-metric-item">收藏: <span id="tm-p-collect">/</span></div>
            <div class="tm-metric-item" style="margin-bottom: 10px;">转发: <span id="tm-p-share">/</span></div>
            <button id="tm-copy-btn">一键复制数据</button>
        </div>
    `;
    }

    // ================= [数据配置层, 选择器可以传数组, 优先匹配靠前选择器] =================
    const SITE_CONFIGS = {
        'channels.weixin.qq.com': {
            name: '视频号',
            selectors: {
                play: '',
                like: '.operate-item-text:eq(0)',
                comment: '.operate-item-text:eq(3)',
                collect: '.operate-item-text:eq(2)',
                share: '.operate-item-text:eq(1)',
            },
        },
        'mp.weixin.qq.com': {
            name: '微信公众号',
            selectors: {
                play: '',
                like: '.operate-item-text:eq(0)',
                comment: '.operate-item-text:eq(3)',
                collect: '.operate-item-text:eq(2)',
                share: '.operate-item-text:eq(1)',
            },
        },
        'weibo.com': {
            name: '微博',
            selectors: {
                play: '._plusInfo_12xiz_71',
                like: '.woo-like-count',
                comment: '._num_198pe_46:eq(1)',
                collect: '',
                share: '._num_198pe_46:eq(0)',
            },
        },
        'v.douyin.com': {
            name: '抖音',
            selectors: {
                play: '',
                like: '.hIpNkUXt:eq(0)',
                comment: '.hIpNkUXt:eq(1)',
                collect: '.hIpNkUXt:eq(2)',
                share: '.sB3y0d3B',
            },
        },
        'video.sina.com.cn': {
            name: '新浪汽车PC端',
            selectors: {
                play: '',
                like: '.barlike .sum',
                comment: '.mcomment:eq(0) .sum',
                collect: '',
                share: '',
            },
        },
        'www.163.com': {
            name: '网易汽车PC端',
            selectors: {
                play: '',
                like: '',
                comment: '.GTnews_top_tieCount',
                collect: '',
                share: '',
            },
        },
        'v.autohome.com.cn': {
            name: '汽车之家PC端',
            selectors: {
                play: '',
                like: '',
                comment: '.GTnews_top_tieCount',
                collect: '',
                share: '',
            },
        },
        'chejiahao.autohome.com.cn': {
            name: '汽车之家车家号',
            selectors: {
                play: '',
                like: '',
                comment: '.GTnews_top_tieCount',
                collect: '',
                share: '',
            },
        },
        'www.dongchedi.com': {
            name: '懂车帝',
            selectors: {
                play: '',
                like: '',
                comment: '',
                collect: '',
                share: '',
            },
        },
        'www.toutiao.com': {
            name: '今日头条',
            selectors: {
                play: '.views-count',
                like: '.like-count',
                comment: '.comment-count',
                collect: '.favour-count',
                share: '',
            },
        },
        'vc.yiche.com': {
            name: '易车号',
            selectors: {
                play: '',
                like: '.news-detail-icons-left-dianzan',
                comment: '#yc-commentpc-number',
                collect: '.favour-count',
                share: '',
            },
        },
        // 在此处根据需要继续添加其他域名的选择器映射...
    };

    // ================= [交互逻辑层] =================
    const currentHost = window.location.hostname;
    let currentConfig = null;
    for (const key in SITE_CONFIGS) {
        if (currentHost.includes(key)) {
            currentConfig = SITE_CONFIGS[key];
            break;
        }
    }
    if (!currentConfig) return;

    function getValueBySelector(selectorOrArray) {
        // 1. 如果没有传值，或者传了空字符串/空数组，直接返回 /
        if (!selectorOrArray || selectorOrArray.length === 0) return '/';

        // 2. 统一转换为数组处理（如果是字符串，包装成单元素数组）
        const selectors = Array.isArray(selectorOrArray) ? selectorOrArray : [selectorOrArray];

        // 3. 遍历数组，优先使用检测到且有文本的第一个选择器
        for (const selector of selectors) {
            if (!selector || selector.trim() === '') continue;

            const $el = $(selector);
            if ($el.length > 0) {
                const rawText = $el.text().trim();
                if (rawText) {
                    const match = rawText.match(/\d+(\.\d+)?万?/);
                    if (match) return match[0]; // 成功匹配到数字则直接返回，中断后续循环
                }
            }
        }

        // 4. 如果所有选择器都没匹配到，返回 /
        return '/';
    }

    function getAllMetrics() {
        const selectors = currentConfig.selectors;
        return {
            play: getValueBySelector(selectors.play),
            like: getValueBySelector(selectors.like),
            comment: getValueBySelector(selectors.comment),
            collect: getValueBySelector(selectors.collect),
            share: getValueBySelector(selectors.share),
        };
    }
    // 1. 注入样式
    if (!$('#tm-panel-global-styles').length) {
        $('<style id="tm-panel-global-styles">').text(PANEL_STYLES).appendTo('head');
    }

    // 2. 渲染独立 HTML
    const savedPos = GM_getValue('panel_position', { top: '100px', right: '100px' });
    const $panel = $(renderPanelTemplate(currentConfig.name, savedPos));
    $('body').append($panel);

    // 3. 轮询更新
    const updateTimer = setInterval(() => {
        if (!$('#tm-social-panel').length) {
            clearInterval(updateTimer);
            return;
        }
        const data = getAllMetrics();
        $('#tm-p-play').text(data.play);
        $('#tm-p-like').text(data.like);
        $('#tm-p-comment').text(data.comment);
        $('#tm-p-collect').text(data.collect);
        $('#tm-p-share').text(data.share);
    }, 1000);

    // 4. 一键复制
    $(document)
        .off('click', '#tm-copy-btn')
        .on('click', '#tm-copy-btn', function () {
            const data = getAllMetrics();
            const textToCopy = [data.play, data.like, data.comment, data.collect, data.share].join(
                '\n',
            );
            GM_setClipboard(textToCopy);

            const $btn = $(this);
            const originalText = $btn.text();
            $btn.text('✅ 复制成功！').addClass('success');
            setTimeout(() => {
                $btn.text(originalText).removeClass('success');
            }, 1200);
        });

    // 5. 拖拽逻辑
    $panel.off('mousedown').on('mousedown', function (e) {
        if ($(e.target).is('button') || $(e.target).hasClass('tm-refresh-icon-btn')) return;

        const offset = $panel.offset();
        const startX = e.pageX - offset.left;
        const startY = e.pageY - offset.top;

        $(document).on('mousemove.dragPanel', function (ev) {
            const windowWidth = $(window).width();
            const panelWidth = $panel.outerWidth();

            let left = ev.pageX - startX - $(window).scrollLeft();
            let top = ev.pageY - startY - $(window).scrollTop();

            // 边缘碰撞限制
            left = Math.max(0, Math.min(left, windowWidth - panelWidth));
            top = Math.max(0, Math.min(top, $(window).height() - $panel.outerHeight()));

            // 将 left 动态转换为 right 布局定位，并移除 left 属性
            let right = windowWidth - left - panelWidth;

            $panel.css({ right: right + 'px', top: top + 'px', left: 'auto' });
        });

        $(document).on('mouseup.dragPanel', function () {
            $(document).off('.dragPanel');
            GM_setValue('panel_position', {
                top: $panel.css('top'),
                right: $panel.css('right'),
            });
        });
    });

})();
// End-323-10742-2026.11.02.153832
