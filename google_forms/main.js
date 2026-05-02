import { $ } from "/lib/js/modules/jquery.min.js";
import { set, get, del, keys, entries, clear } from "/lib/js/modules/idb-keyval.min.js";

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
            if ($this.text().includes(targetOptionText) || $this.attr('aria-label')?.includes(targetOptionText) || $this.parent().text().includes(targetOptionText)) {
                $targetBtn = $this;
                return false;
            }
        });
    }
    if (!$targetBtn) $targetBtn = $radioBtns.first();
    if ($targetBtn.attr('aria-checked') === 'true') return true;
    $targetBtn.focus();
    $targetBtn[0].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    return true;
}

function smartFillCheckbox($container, targetValue) {
    const $checkboxes = $container.find('div[role="checkbox"]');
    if (!$checkboxes.length) return false;
    const targetOptions = targetValue ? targetValue.split(/[,，|]/).map(s => s.trim()) : [];
    $checkboxes.each(function () {
        const $this = $(this);
        const itemText = $this.text() || $this.attr('aria-label') || $this.parent().text();
        const isChecked = $this.attr('aria-checked') === 'true';
        const shouldBeChecked = targetOptions.some(opt => itemText.includes(opt));
        if (shouldBeChecked !== isChecked) {
            this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        }
    });
    if (targetOptions.length === 0 && $container.find('div[role="checkbox"][aria-checked="true"]').length === 0) {
        $checkboxes.first()[0].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    }
    return true;
}

const DB_KEY = 'form_auto_fill_data';
const SUBMIT_CONF_KEY = 'form_submit_keywords';

async function startFilling() {
    const config = await get(DB_KEY) || {};
    const submitConfigRaw = await get(SUBMIT_CONF_KEY) || "下一步,提交,Submit,Next";
    const actionKeywords = submitConfigRaw.split(/[,，]/).map(s => s.trim());

    const $questions = $('.geS5n');
    let filledAny = false;

    // 1. 填充题目
    $questions.each(function () {
        const $question = $(this);
        if ($question.data('auto-filled')) return; // 跳过已处理题目

        const $titleEl = $question.find('.M7eMe, .HoXoMd');
        if (!$titleEl.length) return;
        const fullTitle = $titleEl.text().trim();

        for (const [matchText, detail] of Object.entries(config)) {
            if (fullTitle.includes(matchText)) {
                const targetValue = detail["值"];
                const type = detail["类型"];

                if (type === 'text') {
                    const $input = $question.find('input[type="text"], textarea');
                    if ($input.length) smartFillInput($input, targetValue);
                } else if (type === 'radio') {
                    smartFillRadio($question, targetValue);
                } else if (type === 'checkbox') {
                    smartFillCheckbox($question, targetValue);
                }
                $question.data('auto-filled', true);
                filledAny = true;
            }
        }
    });

    // 2. 查找并点击操作按钮 (下一步/提交)
    setTimeout(() => {
        const $btns = $('.uArJ5e[role="button"]');
        let $targetBtn = null;

        $btns.each(function () {
            const btnText = $(this).text().trim();
            // 匹配关键词且排除“返回”按钮
            if (actionKeywords.some(key => btnText.includes(key))) {
                if (btnText.includes('返回') || btnText.includes('Back')) return;
                $targetBtn = $(this);
                return false;
            }
        });

        if ($targetBtn && $targetBtn.length) {
            console.log(`[自动操作] 匹配到按钮: "${$targetBtn.text().trim()}"，正在点击...`);
            $targetBtn[0].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        }
    }, 300); // 给 300ms 缓冲，确保 Google 脚本捕获了所有 input change
}

// --- UI 逻辑 ---
const initUI = async () => {
    $('<style>').text(`
        #auto-filler-panel { position: fixed; top: 20px; right: 20px; width: 300px; background: white; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 9999; font-family: sans-serif; border: 1px solid #e5e7eb; }
        .panel-header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 12px 15px; font-weight: bold; border-radius: 12px 12px 0 0; }
        .panel-body { padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .input-group { display: flex; flex-direction: column; gap: 4px; }
        .input-group label { font-size: 11px; color: #6b7280; font-weight: bold; }
        .input-group input, .input-group select { border: 1px solid #d1d5db; padding: 6px; border-radius: 4px; font-size: 13px; outline: none; }
        .btn-row { display: flex; gap: 8px; }
        .btn { flex: 1; padding: 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px; font-weight: bold; }
        .btn-save { background: #2563eb; color: white; }
        .btn-run { background: #10b981; color: white; width: 100%; margin-top: 5px; }
        .btn-clear { background: #f3f4f6; color: #374151; }
        .data-preview { margin-top: 10px; font-size: 11px; color: #6b7280; background: #f9fafb; padding: 8px; border-radius: 4px; max-height: 80px; overflow-y: auto; white-space: pre-wrap; }
    `).appendTo('head');

    const currentKeywords = await get(SUBMIT_CONF_KEY) || "下一步,提交";

    const html = `
        <div id="auto-filler-panel">
            <div class="panel-header">Form 抢填控制台 (多页优化版)</div>
            <div class="panel-body">
                <div class="input-group"><label>题目关键字</label><input type="text" id="field-title"></div>
                <div class="input-group"><label>元素类型</label>
                    <select id="field-type">
                        <option value="text">文本输入框</option>
                        <option value="radio">单选框</option>
                        <option value="checkbox">复选框</option>
                    </select>
                </div>
                <div class="input-group"><label>预填内容 (多选逗号隔开)</label><input type="text" id="field-value"></div>
                <div class="btn-row">
                    <button id="btn-save" class="btn btn-save">保存题目</button>
                    <button id="btn-clear" class="btn btn-clear">清空配置</button>
                </div>
                <div class="input-group" style="border-top:1px solid #eee; padding-top:10px">
                    <label>按钮关键字 (多个用逗号隔开)</label>
                    <input type="text" id="submit-keywords" value="${currentKeywords}">
                </div>
                <button id="btn-run" class="btn btn-run">🚀 立即开始自动填充</button>
                <div id="preview" class="data-preview"></div>
            </div>
        </div>`;

    $('body').append(html);

    const updatePreview = async () => {
        const data = await get(DB_KEY) || {};
        $('#preview').text(JSON.stringify(data, null, 2));
    };

    $('#btn-save').click(async () => {
        const title = $('#field-title').val().trim();
        if (!title) return;
        const data = await get(DB_KEY) || {};
        data[title] = { "类型": $('#field-type').val(), "值": $('#field-value').val().trim() };
        await set(DB_KEY, data);
        updatePreview();
    });

    // 自动保存按钮配置
    $('#submit-keywords').on('input', async function () {
        await set(SUBMIT_CONF_KEY, $(this).val().trim());
    });

    $('#btn-clear').click(async () => {
        if (confirm('清空题目配置？')) { await del(DB_KEY); updatePreview(); }
    });

    $('#btn-run').click(startFilling);
    updatePreview();
};

$(async function () {
    await initUI();
    console.log("多页自动填表脚本已就绪...");

    // 自动运行轮询：每100ms检查一次页面变化
    setInterval(async () => {
        // 查找当前页面中尚未填充的题目
        const $unfilled = $('.geS5n').filter(function () {
            return !$(this).data('auto-filled');
        });

        if ($unfilled.length > 0) {
            console.log("检测到新页面或未填充题目，正在执行...");
            await startFilling();
        }
    }, 100);
});
// End-213-2026.05.02.224615
