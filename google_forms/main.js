import { $ } from "/lib/js/modules/jquery.min.js";
import { set, get, del } from "/lib/js/modules/idb-keyval.min.js";

/**
 * Form Auto-Filler Pro (2026 Optimized Edition)
 * 功能：自动匹配题目、智能模拟输入、自定义频率控制、多页自动翻页
 */

// --- 核心常量 (IndexedDB 键) ---
const DB_KEY = 'form_auto_fill_data';
const SUBMIT_CONF_KEY = 'form_submit_keywords';
const AUTO_SUBMIT_SWITCH_KEY = 'form_auto_submit_enabled';
const PANEL_POS_KEY = 'form_panel_position';
const POLLING_INTERVAL_KEY = 'form_polling_interval';
const SUBMIT_DELAY_KEY = 'form_submit_delay';

let isProcessing = false;
let pollingTimer = null;

// --- 核心填充逻辑 ---

function smartFillInput(el, value) {
    const input = $(el)[0];
    if (!input) return false;
    let elementProto = (input instanceof HTMLInputElement) ? HTMLInputElement.prototype :
        (input instanceof HTMLTextAreaElement) ? HTMLTextAreaElement.prototype : null;
    if (!elementProto) return false;

    const nativeSetter = Object.getOwnPropertyDescriptor(elementProto, "value").set;
    if (!nativeSetter) return false;

    input.focus();
    nativeSetter.call(input, value);
    // 触发关键事件以绕过框架监听（如 React/Vue）
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.blur();
    return true;
}

function smartFillRadio($container, targetOptionText) {
    const $radioBtns = $container.find('div[role="radio"]');
    if (!$radioBtns.length) return false;
    let $targetBtn = null;

    if (targetOptionText) {
        $radioBtns.each(function () {
            const $this = $(this);
            const content = ($this.text() + ($this.attr('aria-label') || '') + $this.parent().text()).toLowerCase();
            if (content.includes(targetOptionText.toLowerCase())) {
                $targetBtn = $this;
                return false;
            }
        });
    }
    if (!$targetBtn) $targetBtn = $radioBtns.first();

    const nativeBtn = $targetBtn[0];
    if (!nativeBtn || nativeBtn.getAttribute('aria-checked') === 'true') return true;

    nativeBtn.focus();
    nativeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    return true;
}

function smartFillCheckbox($container, targetValue) {
    const $checkboxes = $container.find('div[role="checkbox"]');
    if (!$checkboxes.length) return false;
    const targetOptions = targetValue ? targetValue.split(/[,，|]/).map(s => s.trim().toLowerCase()) : [];

    $checkboxes.each(function () {
        const $this = $(this);
        const itemText = ($this.text() || $this.attr('aria-label') || $this.parent().text()).toLowerCase();
        const isChecked = $this.attr('aria-checked') === 'true';
        const shouldBeChecked = targetOptions.some(opt => itemText.includes(opt));

        if (shouldBeChecked !== isChecked) {
            this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        }
    });
    return true;
}

async function startFilling() {
    if (isProcessing) return;
    isProcessing = true;

    const config = await get(DB_KEY) || {};
    const submitConfigRaw = await get(SUBMIT_CONF_KEY) || "下一步,提交,Submit,Next";
    const autoSubmitEnabled = await get(AUTO_SUBMIT_SWITCH_KEY) ?? true;
    const submitDelay = await get(SUBMIT_DELAY_KEY) || 100;
    const actionKeywords = submitConfigRaw.split(/[,，]/).map(s => s.trim());

    // 扫描题目容器 (针对 Google Forms 标准类名)
    const $questions = $('.geS5n');

    $questions.each(function () {
        const $question = $(this);
        if ($question.data('auto-filled')) return;

        const $titleEl = $question.find('.M7eMe, .HoXoMd');
        if (!$titleEl.length) return;
        const fullTitle = $titleEl.text().trim();

        for (const [matchText, detail] of Object.entries(config)) {
            if (fullTitle.includes(matchText)) {
                const targetValue = detail["值"];
                const type = detail["类型"];

                if (type === 'text') {
                    const $input = $question.find('input[type="text"], input[type="email"], input[type="number"], input[type="tel"], input[type="url"], textarea');
                    if ($input.length) smartFillInput($input, targetValue);
                } else if (type === 'radio') {
                    smartFillRadio($question, targetValue);
                } else if (type === 'checkbox') {
                    smartFillCheckbox($question, targetValue);
                }
                $question.data('auto-filled', true);
            }
        }
    });

    if (autoSubmitEnabled) {
        const $btns = $('.uArJ5e[role="button"]');
        let nativeTargetBtn = null;

        $btns.each(function () {
            const btnText = $(this).text().trim();
            if (actionKeywords.some(key => btnText.includes(key))) {
                if (btnText.includes('返回') || btnText.includes('Back')) return;
                nativeTargetBtn = this;
                return false;
            }
        });

        if (nativeTargetBtn && !$(nativeTargetBtn).data('clicked')) {
            $(nativeTargetBtn).data('clicked', true);
            console.log(`[自动执行] ${submitDelay}ms 后点击: "${$(nativeTargetBtn).text().trim()}"`);
            setTimeout(() => {
                nativeTargetBtn.focus();
                nativeTargetBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            }, submitDelay);
        }
    }
    isProcessing = false;
}

// --- UI 界面构建 ---

const initUI = async () => {
    const savedPos = await get(PANEL_POS_KEY) || { top: '20px', right: '20px', left: 'auto' };
    const currentKeywords = await get(SUBMIT_CONF_KEY) || "下一步,提交";
    const isAutoEnabled = await get(AUTO_SUBMIT_SWITCH_KEY) ?? true;
    const pollingInterval = await get(POLLING_INTERVAL_KEY) || 100;
    const submitDelay = await get(SUBMIT_DELAY_KEY) || 100;

    $('<style>').text(`
        #auto-filler-panel { 
            position: fixed; 
            width: 300px; 
            background: #ffffff; 
            border-radius: 12px; 
            box-shadow: 0 12px 40px rgba(0,0,0,0.2); 
            z-index: 999999; 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
            border: 1px solid #e5e7eb; 
            overflow: hidden;
            user-select: none;
        }
        
        .panel-header { 
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); 
            color: white; 
            padding: 14px 15px; 
            font-weight: bold; 
            font-size: 14px;
            cursor: move; 
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .panel-body { 
            padding: 15px; 
            display: flex; 
            flex-direction: column; 
            gap: 12px; 
            box-sizing: border-box;
        }

        .input-group { 
            display: flex; 
            flex-direction: column; 
            gap: 4px; 
            width: 100%;
            box-sizing: border-box; 
        }

        .input-group label { 
            font-size: 11px; 
            color: #6b7280; 
            font-weight: 700; 
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .input-group input, .input-group select { 
            border: 1px solid #d1d5db; 
            padding: 8px; 
            border-radius: 6px; 
            font-size: 13px; 
            outline: none; 
            width: 100%;             /* 核心修复：占据100%父容器宽度 */
            box-sizing: border-box;  /* 核心修复：确保padding不撑开宽度 */
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .input-group input:focus { 
            border-color: #3b82f6; 
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); 
        }

        /* 左右排列的定时器行 */
        .timer-row { 
            display: flex; 
            gap: 10px; 
            width: 100%; 
            box-sizing: border-box;
            border-top: 1px solid #f3f4f6;
            padding-top: 10px;
        }
        
        .timer-row .input-group { 
            flex: 1; /* 两个输入框平分 */
        }

        .btn-row { 
            display: flex; 
            gap: 8px; 
        }

        .btn { 
            flex: 1; 
            padding: 10px; 
            border-radius: 6px; 
            border: none; 
            cursor: pointer; 
            font-size: 12px; 
            font-weight: bold; 
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
        }

        .btn:active { transform: scale(0.95); }

        .btn-save { background: #2563eb; color: white; }
        .btn-save:hover { background: #1d4ed8; }

        .btn-clear { background: #f3f4f6; color: #4b5563; }
        .btn-clear:hover { background: #e5e7eb; }

        .btn-run { 
            background: #059669; 
            color: white; 
            width: 100%; 
            margin-top: 4px;
            font-size: 13px;
            box-shadow: 0 2px 4px rgba(5, 150, 105, 0.2);
        }
        .btn-run:hover { background: #047857; }

        .switch-row { 
            display: flex; 
            align-items: center; 
            justify-content: space-between; 
            padding: 10px 0; 
            border-top: 1px solid #f3f4f6;
            margin-top: 2px;
        }
        
        .switch-row label { font-size: 12px; font-weight: 600; color: #374151; }
        
        /* 自定义美化 checkbox 开关 (可选) */
        #auto-submit-toggle { width: 16px; height: 16px; cursor: pointer; }

        .data-preview { 
            margin-top: 5px; 
            font-size: 11px; 
            color: #4b5563; 
            background: #f9fafb; 
            padding: 10px; 
            border-radius: 6px; 
            max-height: 100px; 
            overflow-y: auto; 
            white-space: pre-wrap; 
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace; 
            border: 1px solid #eee;
        }

        /* 滚动条美化 */
        .data-preview::-webkit-scrollbar { width: 4px; }
        .data-preview::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
    `).appendTo('head');

    const html = `
        <div id="auto-filler-panel" style="top:${savedPos.top}; right:${savedPos.right}; left:${savedPos.left}">
            <div class="panel-header" title="左键长按可拖动控制台位置">Form 抢填控制台</div>
            <div class="panel-body">
                <div class="input-group">
                    <label title="题目中包含这些字就会触发填充。例如输入‘姓名’，可匹配‘您的姓名是什么？’">题目关键字 ⓘ</label>
                    <input type="text" id="field-title" placeholder="例如: 姓名">
                </div>
                <div class="input-group">
                    <select id="field-type" title="选择匹配的题目类型">
                        <option value="text">文本输入 (含Email/数字)</option>
                        <option value="radio">单选框 (点击匹配项)</option>
                        <option value="checkbox">复选框 (点击匹配项)</option>
                    </select>
                </div>
                <div class="input-group">
                    <input type="text" id="field-value" placeholder="预填内容 / 选项关键字" title="文本框填入内容；单/多选填入选项包含的文字">
                </div>
                <div class="btn-row">
                    <button id="btn-save" class="btn btn-save">保存配置</button>
                    <button id="btn-clear" class="btn btn-clear">清空全部</button>
                </div>
                
                <div class="timer-row">
                    <div class="input-group">
                        <label title="检查页面是否有新题目的频率。越小越快，推荐 50-200ms">轮询间隔(ms) ⓘ</label>
                        <input type="number" id="polling-interval" value="${pollingInterval}">
                    </div>
                    <div class="input-group">
                        <label title="匹配到按钮后延迟多久点击。0ms最快，模拟真人建议 300ms">点击延迟(ms) ⓘ</label>
                        <input type="number" id="submit-delay" value="${submitDelay}">
                    </div>
                </div>

                <div class="input-group">
                    <label title="匹配按钮上的文字，多个用英文逗号隔开。如：提交,下一步,Next">提交按钮关键字 ⓘ</label>
                    <input type="text" id="submit-keywords" value="${currentKeywords}">
                </div>
                <div class="switch-row" title="开启后，填完当前页题目将自动尝试点击‘下一步’或‘提交’">
                    <label>自动翻页/提交</label>
                    <input type="checkbox" id="auto-submit-toggle" ${isAutoEnabled ? 'checked' : ''}>
                </div>
                <button id="btn-run" class="btn btn-run" title="不等待定时器，立即执行一次全页面扫描填充">🚀 立即执行填充</button>
                <div id="preview" class="data-preview" title="当前已保存的数据结构"></div>
            </div>
        </div>`;

    $('body').append(html);

    const $panel = $('#auto-filler-panel');

    // --- 动态定时器逻辑 ---
    const startPolling = (ms) => {
        if (pollingTimer) clearInterval(pollingTimer);
        pollingTimer = setInterval(async () => {
            const $unfilled = $('.geS5n').filter(function () {
                return !$(this).data('auto-filled') && $(this).find('.M7eMe, .HoXoMd').length > 0;
            });
            if ($unfilled.length > 0) await startFilling();
        }, ms);
    };

    // --- 事件绑定 ---
    $('#polling-interval').on('change', async function () {
        const val = Math.max(10, parseInt($(this).val()) || 100);
        await set(POLLING_INTERVAL_KEY, val);
        startPolling(val);
    });

    $('#submit-delay').on('change', async function () {
        const val = Math.max(0, parseInt($(this).val()) || 0);
        await set(SUBMIT_DELAY_KEY, val);
    });

    $('#btn-save').click(async () => {
        const title = $('#field-title').val().trim();
        if (!title) return;
        const data = await get(DB_KEY) || {};
        data[title] = { "类型": $('#field-type').val(), "值": $('#field-value').val().trim() };
        await set(DB_KEY, data);
        $('#preview').text(JSON.stringify(data, null, 2));
    });

    $('#btn-clear').click(async () => {
        if (confirm('确定清空所有配置数据吗？')) {
            await del(DB_KEY);
            $('#preview').text('{}');
        }
    });

    $('#submit-keywords').on('input', async function () {
        await set(SUBMIT_CONF_KEY, $(this).val().trim());
    });

    $('#auto-submit-toggle').on('change', async function () {
        await set(AUTO_SUBMIT_SWITCH_KEY, $(this).prop('checked'));
    });

    $('#btn-run').click(startFilling);

    // --- 拖拽实现 ---
    // 2. 交互修复：精确的拖拽计算
    const header = $panel.find('.panel-header')[0];
    header.onmousedown = (e) => {
        const rect = $panel[0].getBoundingClientRect();
        // 关键点：记录鼠标按下时的相对位置
        const shiftX = e.clientX - rect.left;
        const shiftY = e.clientY - rect.top;

        const onMouseMove = (ev) => {
            // 使用客户端坐标移动
            $panel.css({ left: (ev.clientX - shiftX) + 'px', top: (ev.clientY - shiftY) + 'px', right: 'auto' });
        };

        $(document).on('mousemove', onMouseMove);
        $(document).one('mouseup', () => {
            $(document).off('mousemove', onMouseMove);
            set(PANEL_POS_KEY, { top: $panel.css('top'), left: $panel.css('left'), right: 'auto' });
        });
    };

    // 初始化运行
    startPolling(pollingInterval);
    const initialData = await get(DB_KEY) || {};
    $('#preview').text(JSON.stringify(initialData, null, 2));
};

// 入口
$(initUI);
// End-434-2026.05.03.104619
