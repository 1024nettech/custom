import { $ } from "/lib/js/modules/jquery.min.js";
import { set, get, del, keys, entries, clear } from "/lib/js/modules/idb-keyval.min.js";

// --- 核心填充函数 ---

function smartFillInput(el, value) {
    const input = $(el)[0]; // 确保是原生节点
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

    const nativeBtn = $targetBtn[0]; // 关键修复：转换为原生节点
    if (!nativeBtn) return false;
    if (nativeBtn.getAttribute('aria-checked') === 'true') return true;

    nativeBtn.focus();
    nativeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    return true;
}

function smartFillCheckbox($container, targetValue) {
    const $checkboxes = $container.find('div[role="checkbox"]');
    if (!$checkboxes.length) return false;
    const targetOptions = targetValue ? targetValue.split(/[,，|]/).map(s => s.trim()) : [];

    $checkboxes.each(function () {
        const nativeCb = this; // jQuery .each 中 this 就是原生节点
        const $this = $(nativeCb);
        const itemText = $this.text() || $this.attr('aria-label') || $this.parent().text();
        const isChecked = $this.attr('aria-checked') === 'true';
        const shouldBeChecked = targetOptions.some(opt => itemText.includes(opt));

        if (shouldBeChecked !== isChecked) {
            nativeCb.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        }
    });

    // 保底：一个都没选则勾选第一个
    if (targetOptions.length === 0 && $container.find('div[role="checkbox"][aria-checked="true"]').length === 0) {
        const firstNative = $checkboxes[0];
        if (firstNative) firstNative.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    }
    return true;
}

const DB_KEY = 'form_auto_fill_data';
const SUBMIT_CONF_KEY = 'form_submit_keywords';
const AUTO_SUBMIT_SWITCH_KEY = 'form_auto_submit_enabled';

async function startFilling() {
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
                    const $input = $question.find('input[type="text"], textarea');
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
        setTimeout(() => {
            const $btns = $('.uArJ5e[role="button"]');
            let nativeTargetBtn = null;

            $btns.each(function () {
                const btnText = $(this).text().trim();
                if (actionKeywords.some(key => btnText.includes(key))) {
                    if (btnText.includes('返回') || btnText.includes('Back')) return;
                    nativeTargetBtn = this; // 获取原生节点
                    return false;
                }
            });

            if (nativeTargetBtn) {
                console.log(`[自动操作] 匹配到按钮: "${$(nativeTargetBtn).text().trim()}"`);
                nativeTargetBtn.focus();
                nativeTargetBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            }
        }, 300);
    }
}

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
        .switch-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-top: 1px solid #eee; margin-top: 5px; }
        .switch-row label { font-size: 12px; font-weight: bold; color: #374151; }
        .data-preview { margin-top: 10px; font-size: 11px; color: #6b7280; background: #f9fafb; padding: 8px; border-radius: 4px; max-height: 80px; overflow-y: auto; white-space: pre-wrap; }
    `).appendTo('head');

    const currentKeywords = await get(SUBMIT_CONF_KEY) || "下一步,提交";
    const isAutoEnabled = await get(AUTO_SUBMIT_SWITCH_KEY) ?? true;

    const html = `
        <div id="auto-filler-panel">
            <div class="panel-header">Form 抢填控制台 (Fixed)</div>
            <div class="panel-body">
                <div class="input-group"><label>题目关键字</label><input type="text" id="field-title"></div>
                <div class="input-group"><label>类型</label>
                    <select id="field-type">
                        <option value="text">文本输入框</option>
                        <option value="radio">单选框</option>
                        <option value="checkbox">复选框</option>
                    </select>
                </div>
                <div class="input-group"><label>预填内容</label><input type="text" id="field-value"></div>
                <div class="btn-row">
                    <button id="btn-save" class="btn btn-save">保存题目</button>
                    <button id="btn-clear" class="btn btn-clear">清空</button>
                </div>
                <div class="input-group" style="margin-top:5px"><label>按钮关键字 (逗号隔开)</label>
                    <input type="text" id="submit-keywords" value="${currentKeywords}">
                </div>
                <div class="switch-row">
                    <label>自动翻页/提交</label>
                    <input type="checkbox" id="auto-submit-toggle" ${isAutoEnabled ? 'checked' : ''}>
                </div>
                <button id="btn-run" class="btn btn-run">🚀 手动触发填充并尝试跳转</button>
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

    $('#submit-keywords').on('input', async function () {
        await set(SUBMIT_CONF_KEY, $(this).val().trim());
    });

    $('#auto-submit-toggle').on('change', async function () {
        await set(AUTO_SUBMIT_SWITCH_KEY, $(this).prop('checked'));
    });

    $('#btn-clear').click(async () => {
        if (confirm('清空配置？')) { await del(DB_KEY); updatePreview(); }
    });

    $('#btn-run').click(startFilling);
    updatePreview();
};

$(async function () {
    await initUI();
    setInterval(async () => {
        const $unfilled = $('.geS5n').filter(function () { return !$(this).data('auto-filled'); });
        if ($unfilled.length > 0) { await startFilling(); }
    }, 100);
});
// End-221-2026.05.02.230917
