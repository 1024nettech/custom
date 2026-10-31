// social-core.js (部署在 GitHub Pages)
(function () {
    'use strict';
alert();
    // 确保油猴桥梁已就绪
    const bridge = window.TMSocialBridge;
    if (!bridge) {
        console.error('油猴桥梁注入失败，请检查外壳脚本。');
        return;
    }

    // 检查页面是否配置 jQuery（部分网站自带，若无则动态引入，这里假设油猴已提前注入或网站自带）
    if (typeof jQuery === 'undefined') return;
    const $ = jQuery;

    // 清理可能由于单页应用历史遗留的旧面板与定时器
    $('#tm-social-panel').remove();
    if (window.tmSocialTimer) clearInterval(window.tmSocialTimer);

    // ================= 配置与选择器 =================
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

    // ================= UI 绘制 =================
    // 使用桥梁调用油猴的数据持久化函数
    const savedPos = bridge.getValue('panel_position', { top: '100px', left: '100px' });
    const $panel = $(`
        <div id="tm-social-panel" style="position:fixed; top:${savedPos.top}; left:${savedPos.left}; z-index:999999; background:#fff; border:1px solid #ccc; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.15); padding:12px; font-family:Arial,sans-serif; font-size:13px; color:#333; width:180px; cursor:move; user-select:none;">
            <div style="font-weight:bold; margin-bottom:8px; border-bottom:1px solid #eee; padding-bottom:4px; display:flex; justify-content:space-between; align-items:center;">
                <span>📊 数据看板 (${currentConfig.name})</span>
                <span id="tm-refresh-cache" title="强刷远程代码缓存" style="cursor:pointer; font-size:12px; color:#999; padding:2px 4px;">🔄</span>
            </div>
            <div>
                <div style="margin-bottom: 4px;">播放: <span id="tm-p-play" style="font-weight:600;color:#1890ff;">/</span></div>
                <div style="margin-bottom: 4px;">点赞: <span id="tm-p-like" style="font-weight:600;color:#52c41a;">/</span></div>
                <div style="margin-bottom: 4px;">评论: <span id="tm-p-comment" style="font-weight:600;color:#fa8c16;">/</span></div>
                <div style="margin-bottom: 4px;">收藏: <span id="tm-p-collect" style="font-weight:600;color:#722ed1;">/</span></div>
                <div style="margin-bottom: 10px;">转发: <span id="tm-p-share" style="font-weight:600;color:#eb2f96;">/</span></div>
                <button id="tm-copy-btn" style="width:100%; background:#1890ff; color:#fff; border:none; padding:6px; border-radius:4px; cursor:pointer; font-size:12px;">一键复制数据</button>
            </div>
        </div>
    `);
    $('body').append($panel);

    // ================= 核心抓取逻辑 =================
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

    // 数据动态轮询
    window.tmSocialTimer = setInterval(() => {
        if ($('#tm-social-panel').length === 0) {
            clearInterval(window.tmSocialTimer);
            return;
        }
        const data = getAllMetrics();
        $('#tm-p-play').text(data.play);
        $('#tm-p-like').text(data.like);
        $('#tm-p-comment').text(data.comment);
        $('#tm-p-collect').text(data.collect);
        $('#tm-p-share').text(data.share);
    }, 1000);

    // ================= 事件交互控制 =================
    // 一键复制
    $(document)
        .off('click', '#tm-copy-btn')
        .on('click', '#tm-copy-btn', function () {
            const data = getAllMetrics();
            const textToCopy = [data.play, data.like, data.comment, data.collect, data.share].join(
                '\n',
            );

            // 💡 通过桥梁调用剪贴板特权
            bridge.setClipboard(textToCopy);

            const $btn = $(this);
            $btn.text('✅ 复制成功！').css('background', '#52c41a');
            setTimeout(() => {
                $btn.text('一键复制数据').css('background', '#1890ff');
            }, 1200);
        });

    // 刷新远程缓存
    $(document)
        .off('click', '#tm-refresh-cache')
        .on('click', '#tm-refresh-cache', function (e) {
            e.stopPropagation();
            if (confirm('是否立即强制更新远程 GitHub 匹配规则与核心代码？')) {
                bridge.triggerRefresh(); // 💡 通过桥梁触发强刷
            }
        });

    // 面板拖拽逻辑
    $panel.on('mousedown', function (e) {
        if ($(e.target).is('button') || $(e.target).is('#tm-refresh-cache')) return;
        const offset = $panel.offset();
        const startX = e.pageX - offset.left;
        const startY = e.pageY - offset.top;

        $(document).on('mousemove.dragPanel', function (ev) {
            let left = ev.pageX - startX - $(window).scrollLeft();
            let top = ev.pageY - startY - $(window).scrollTop();
            left = Math.max(0, Math.min(left, $(window).width() - $panel.outerWidth()));
            top = Math.max(0, Math.min(top, $(window).height() - $panel.outerHeight()));
            $panel.css({ left: left + 'px', top: top + 'px' });
        });

        $(document).on('mouseup.dragPanel', function () {
            $(document).off('.dragPanel');
            // 💡 拖拽完毕通过桥梁把新位置坐标存进油猴
            bridge.setValue('panel_position', { top: $panel.css('top'), left: $panel.css('left') });
        });
    });
})();
