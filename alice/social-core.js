// social-core.js (此文件放在 GitHub Pages 上)
// 注意：这里不需要再写 ==UserScript== 头部，直接写执行逻辑

(function () {
    'use strict';

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
            status: 'ok',
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
            status: 'ok',
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
            status: 'ok',
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
            status: 'ok',
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
            status: 'ok',
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
            status: 'ok',
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
            status: 'NOok',
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
            status: 'NOok',
        },
        'v.autohome.com.cn': {
            name: '懂车帝',
            selectors: {
                play: '',
                like: '',
                comment: '.GTnews_top_tieCount',
                collect: '',
                share: '',
            },
            status: 'NOok',
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
            status: 'ok',
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
            status: 'ok',
        },
        // 在此处根据需要继续添加其他域名的选择器映射...
    };

    const currentHost = window.location.hostname;
    let currentConfig = null;
    for (const key in SITE_CONFIGS) {
        if (currentHost.includes(key)) {
            currentConfig = SITE_CONFIGS[key];
            break;
        }
    }

    if (!currentConfig) return;

    // 更新外壳上的标题名
    $('#tm-panel-title').text(`📊 数据看板 (${currentConfig.name})`);

    function getValueBySelector(selector) {
        if (!selector || selector.trim() === '') return '/';
        const $el = $(selector);
        if ($el.length === 0) return '/';
        const rawText = $el.text().trim();
        if (!rawText) return '/';
        const match = rawText.match(/\d+(\.\d+)?万?/);
        return match ? match[0] : '/';
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

    // 轮询更新数据
    const metricsTimer = setInterval(() => {
        // 如果外壳面板被意外移除了，销毁定时器
        if ($('#tm-social-panel').length === 0) {
            clearInterval(metricsTimer);
            return;
        }
        const data = getAllMetrics();
        $('#tm-p-play').text(data.play);
        $('#tm-p-like').text(data.like);
        $('#tm-p-comment').text(data.comment);
        $('#tm-p-collect').text(data.collect);
        $('#tm-p-share').text(data.share);
    }, 1000);

    // 一键复制事件（先解绑再绑定，防止重复加载时事件叠加）
    $(document)
        .off('click', '#tm-copy-btn')
        .on('click', '#tm-copy-btn', function () {
            const data = getAllMetrics();
            const textToCopy = [data.play, data.like, data.comment, data.collect, data.share].join(
                '\n',
            );

            // 💡 依然可以直接调用 GM_setClipboard，因为它是被 eval 在油猴沙盒内的
            GM_setClipboard(textToCopy);

            const $btn = $(this);
            const originalText = $btn.text();
            $btn.text('✅ 复制成功！').css('background', '#52c41a');
            setTimeout(() => {
                $btn.text(originalText).css('background', '#1890ff');
            }, 1200);
        });
})();
// End-202-6253-2026.10.31.180618
