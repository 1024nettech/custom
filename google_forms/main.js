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

/**
 * 复选框自动填充
 * @param {string} targetValue - 支持多选，例如 "选项A,选项B"
 */
function smartFillCheckbox($container, targetValue) {
    const $checkboxes = $container.find('div[role="checkbox"]');
    if (!$checkboxes.length) return false;

    // 将预填内容按常见分隔符切分为数组
    const targetOptions = targetValue ? targetValue.split(/[,，|]/).map(s => s.trim()) : [];

    $checkboxes.each(function () {
        const $this = $(this);
        const itemText = $this.text() || $this.attr('aria-label') || $this.parent().text();
        const isChecked = $this.attr('aria-checked') === 'true';

        // 匹配逻辑：如果选项文本在目标数组中
        const shouldBeChecked = targetOptions.some(opt => itemText.includes(opt));

        // 只有在状态不一致时才触发点击（避免取消已选中的）
        if (shouldBeChecked !== isChecked) {
            this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        }
    });

    // 保底逻辑：如果没填要求且一个都没选，则勾选第一个
    if (targetOptions.length === 0 && $container.find('div[role="checkbox"][aria-checked="true"]').length === 0) {
        $checkboxes.first()[0].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    }
    return true;
}

const DB_KEY = 'form_auto_fill_data';

async function startFilling() {
    const config = await get(DB_KEY) || {};
    const $questions = $('.geS5n');

    $questions.each(function () {
        const $question = $(this);
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
            }
        }
    });
}

// --- UI 逻辑 ---
const initUI = () => {
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

    const html = `
        <div id="auto-filler-panel">
            <div class="panel-header">Form 抢填控制台</div>
            <div class="panel-body">
                <div class="input-group"><label>标题关键字</label><input type="text" id="field-title"></div>
                <div class="input-group"><label>元素类型</label>
                    <select id="field-type">
                        <option value="text">文本输入框</option>
                        <option value="radio">单选框</option>
                        <option value="checkbox">复选框</option>
                    </select>
                </div>
                <div class="input-group"><label>预填内容 (多选逗号隔开)</label><input type="text" id="field-value"></div>
                <div class="btn-row">
                    <button id="btn-save" class="btn btn-save">保存</button>
                    <button id="btn-clear" class="btn btn-clear">清空</button>
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

    $('#btn-clear').click(async () => {
        if (confirm('清空？')) { await del(DB_KEY); updatePreview(); }
    });

    $('#btn-run').click(startFilling);
    updatePreview();
};

initUI();
