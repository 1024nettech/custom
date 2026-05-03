import { $ } from "/lib/js/modules/jquery.min.js";
import { set, get, del } from "/lib/js/modules/idb-keyval.min.js";

// --- 核心常量 ---
const DB_KEY = 'form_auto_fill_data';
const SUBMIT_CONF_KEY = 'form_submit_keywords';
const AUTO_SUBMIT_SWITCH_KEY = 'form_auto_submit_enabled';
const PANEL_POS_KEY = 'form_panel_position';

let isProcessing = false; // 运行锁

// --- 核心填充函数 ---

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
    // 触发多种事件确保框架监听生效
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
        const nativeCb = this;
        const $this = $(nativeCb);
        const itemText = ($this.text() || $this.attr('aria-label') || $this.parent().text()).toLowerCase();
        const isChecked = $this.attr('aria-checked') === 'true';
        const shouldBeChecked = targetOptions.some(opt => itemText.includes(opt));

        if (shouldBeChecked !== isChecked) {
            nativeCb.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        }
    });

    if (targetOptions.length === 0 && $container.find('div[role="checkbox"][aria-checked="true"]').length === 0) {
        const firstNative = $checkboxes[0];
        if (firstNative) firstNative.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    }
    return true;
}

async function startFilling() {
    if (isProcessing) return;
    isProcessing = true;

    const config = await get(DB_KEY) || {};
    const submitConfigRaw = await get(SUBMIT_CONF_KEY) || "下一步,提交,Submit,Next";
    const autoSubmitEnabled = await get(AUTO_SUBMIT_SWITCH_KEY) ?? true;
    const actionKeywords = submitConfigRaw.split(/[,，]/).map(s => s.trim());

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
                    // 改进：支持更多的 input 类型
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
            console.log(`[自动操作] 匹配到按钮: "${$(nativeTargetBtn).text().trim()}"`);
            setTimeout(() => {
                nativeTargetBtn.focus();
                nativeTargetBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            }, 100);
        }
    }
    isProcessing = false;
}

// --- UI 控制 ---

const initUI = async () => {
    const savedPos = await get(PANEL_POS_KEY) || { top: '20px', right: '20px', left: 'auto' };

    $('<style>').text(`
        #auto-filler-panel { position: fixed; width: 300px; background: white; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 9999; font-family: sans-serif; border: 1px solid #e5e7eb; user-select: none; }
        .panel-header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 12px 15px; font-weight: bold; border-radius: 12px 12px 0 0; cursor: move; }
        .panel-body { padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .input-group { display: flex; flex-direction: column; gap: 4px; }
        .input-group label { font-size: 11px; color: #6b7280; font-weight: bold; }
        .input-group input, .input-group select { border: 1px solid #d1d5db; padding: 6px; border-radius: 4px; font-size: 13px; outline: none; }
        .btn-row { display: flex; gap: 8px; }
        .btn { flex: 1; padding: 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px; font-weight: bold; transition: opacity 0.2s; }
        .btn:hover { opacity: 0.8; }
        .btn-save { background: #2563eb; color: white; }
        .btn-run { background: #10b981; color: white; width: 100%; margin-top: 5px; }
        .btn-clear { background: #f3f4f6; color: #374151; }
        .switch-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-top: 1px solid #eee; margin-top: 5px; }
        .switch-row label { font-size: 12px; font-weight: bold; color: #374151; }
        .data-preview { margin-top: 10px; font-size: 11px; color: #6b7280; background: #f9fafb; padding: 8px; border-radius: 4px; max-height: 120px; overflow-y: auto; white-space: pre-wrap; font-family: monospace; }
    `).appendTo('head');

    const currentKeywords = await get(SUBMIT_CONF_KEY) || "下一步,提交";
    const isAutoEnabled = await get(AUTO_SUBMIT_SWITCH_KEY) ?? true;

    const html = `
        <div id="auto-filler-panel" style="top:${savedPos.top}; right:${savedPos.right}; left:${savedPos.left}">
            <div class="panel-header">Form 抢填控制台 (Drag Me)</div>
            <div class="panel-body">
                <div class="input-group"><label>题目关键字</label><input type="text" id="field-title" placeholder="例如: 姓名"></div>
                <div class="input-group"><label>类型</label>
                    <select id="field-type">
                        <option value="text">文本 (含Email/Tel)</option>
                        <option value="radio">单选框</option>
                        <option value="checkbox">复选框</option>
                    </select>
                </div>
                <div class="input-group"><label>预填内容</label><input type="text" id="field-value" placeholder="多选请用逗号隔开"></div>
                <div class="btn-row">
                    <button id="btn-save" class="btn btn-save">保存题目</button>
                    <button id="btn-clear" class="btn btn-clear">清空配置</button>
                </div>
                <div class="input-group" style="margin-top:5px"><label>按钮关键字 (逗号隔开)</label>
                    <input type="text" id="submit-keywords" value="${currentKeywords}">
                </div>
                <div class="switch-row">
                    <label>自动翻页/提交</label>
                    <input type="checkbox" id="auto-submit-toggle" ${isAutoEnabled ? 'checked' : ''}>
                </div>
                <button id="btn-run" class="btn btn-run">🚀 手动执行填充</button>
                <div id="preview" class="data-preview"></div>
            </div>
        </div>`;

    $('body').append(html);

    const $panel = $('#auto-filler-panel');
    const updatePreview = async () => {
        const data = await get(DB_KEY) || {};
        $('#preview').text(JSON.stringify(data, null, 2));
    };

    // --- 拖拽实现 ---
    // --- 拖拽实现 (修复版) ---
    const header = $panel.find('.panel-header')[0]; // 获取原生节点
    const panelEl = $panel[0];

    header.onmousedown = (e) => {
        // 屏蔽右键点击引发的位移
        if (e.button === 2) return;

        // 计算鼠标相对于面板左上角的偏移
        const rect = panelEl.getBoundingClientRect();
        let shiftX = e.clientX - rect.left;
        let shiftY = e.clientY - rect.top;

        // 设置为绝对定位并取消 right 约束，防止坐标冲突
        panelEl.style.right = 'auto';
        panelEl.style.bottom = 'auto';

        function moveAt(pageX, pageY) {
            // 使用 pageX 考虑滚动位移，减去初始偏移量
            panelEl.style.left = (pageX - shiftX) + 'px';
            panelEl.style.top = (pageY - shiftY) + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // 监听整个文档，防止鼠标移动过快脱离 header
        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = async () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
            // 持久化保存
            await set(PANEL_POS_KEY, {
                top: panelEl.style.top,
                left: panelEl.style.left,
                right: 'auto'
            });
        };
    };

    // 禁用系统原生拖拽效果干扰
    header.ondragstart = () => false;
    // 阻止 header 上的右键菜单触发位移异常
    header.oncontextmenu = (e) => { e.stopPropagation(); };


    // --- 事件绑定 ---
    $('#btn-save').click(async () => {
        const title = $('#field-title').val().trim();
        if (!title) return;
        const data = await get(DB_KEY) || {};
        data[title] = { "类型": $('#field-type').val(), "值": $('#field-value').val().trim() };
        await set(DB_KEY, data);
        updatePreview();
    });

    $('#submit-keywords').on('input', async function () {
        await set(SUBMIT_CONF_KEY, $(this).val().trim());
    });

    $('#auto-submit-toggle').on('change', async function () {
        await set(AUTO_SUBMIT_SWITCH_KEY, $(this).prop('checked'));
    });

    $('#btn-clear').click(async () => {
        if (confirm('确定清空所有题目配置吗？')) { await del(DB_KEY); updatePreview(); }
    });

    $('#btn-run').click(startFilling);
    updatePreview();
};

// --- 初始化执行 ---
$(async function () {
    await initUI();
    // 持续监听新出现的题目（用于多页表单）
    setInterval(async () => {
        const $unfilled = $('.geS5n').filter(function () {
            return !$(this).data('auto-filled') && $(this).find('.M7eMe, .HoXoMd').length > 0;
        });
        if ($unfilled.length > 0) {
            await startFilling();
        }
    }, 100);
});
// End-294-2026.05.03.100806
