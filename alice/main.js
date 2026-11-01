/**
 * 远程核心单文件 - 逻辑、表现分离，刷新逻辑自我内聚
 */

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
        width: 180px;
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
    }
    .tm-refresh-icon-btn {
        cursor: pointer;
        font-size: 14px;
        color: #8c8c8c;
        transition: color 0.2s, transform 0.3s;
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
        <div id="tm-social-panel" style="top: ${pos.top}; left: ${pos.left};">
            <div class="tm-panel-title">
                <span>📊 数据看板 (${siteName})</span>
                <span id="tm-refresh-cache-btn" class="tm-refresh-icon-btn" title="刷新缓存">🔄</span>
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

// ================= [数据配置层] =================
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
const { $, getValue, setValue, setClipboard, baseUrl } = window.__SocialToolAPI__ || {};

(function main() {
    if (!$) return;

    const currentHost = window.location.hostname;
    let currentConfig = null;
    for (const key in SITE_CONFIGS) {
        if (currentHost.includes(key)) {
            currentConfig = SITE_CONFIGS[key];
            break;
        }
    }
    if (!currentConfig) return;

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

    $(function () {
        // 1. 注入样式
        if (!$('#tm-panel-global-styles').length) {
            $('<style id="tm-panel-global-styles">').text(PANEL_STYLES).appendTo('head');
        }

        // 2. 渲染独立 HTML
        const savedPos = getValue('panel_position', { top: '100px', left: '100px' });
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

        // 4. 远程脚本内聚的“强刷缓存”自加载函数
        $(document)
            .off('click', '#tm-refresh-cache-btn')
            .on('click', '#tm-refresh-cache-btn', function () {
                // 清理自身所有的定时器、DOM 节点、和样式表
                clearInterval(updateTimer);
                $('#tm-social-panel').remove();
                $('#tm-panel-global-styles').remove();
                $('#tm-core-script').remove();

                // 核心：不需要宿主参与，远程 JS 内部直接生成带有最新时间戳的请求，强制拉取最新代码
                const script = document.createElement('script');
                script.id = 'tm-core-script';
                script.type = 'module';
                script.src = `${baseUrl}?t=${Date.now()}`;
                document.head.appendChild(script);
            });

        // 5. 一键复制
        $(document)
            .off('click', '#tm-copy-btn')
            .on('click', '#tm-copy-btn', function () {
                const data = getAllMetrics();
                const textToCopy = [
                    data.play,
                    data.like,
                    data.comment,
                    data.collect,
                    data.share,
                ].join('\n');
                setClipboard(textToCopy);

                const $btn = $(this);
                const originalText = $btn.text();
                $btn.text('✅ 复制成功！').addClass('success');
                setTimeout(() => {
                    $btn.text(originalText).removeClass('success');
                }, 1200);
            });

        // 6. 拖拽逻辑
        $panel.off('mousedown').on('mousedown', function (e) {
            if ($(e.target).is('button') || $(e.target).hasClass('tm-refresh-icon-btn')) return;

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
                setValue('panel_position', { top: $panel.css('top'), left: $panel.css('left') });
            });
        });
    });
})();
