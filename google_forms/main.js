// --- 核心填充函数 ---

function smartFillInput(el, value) {
    if (!el) return false;
    let elementProto = (el instanceof HTMLInputElement) ? HTMLInputElement.prototype :
        (el instanceof HTMLTextAreaElement) ? HTMLTextAreaElement.prototype : null;
    if (!elementProto) return false;
    
    const nativeSetter = Object.getOwnPropertyDescriptor(elementProto, "value").set;
    if (!nativeSetter) return false;
    
    el.focus();
    nativeSetter.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.blur();
    return true;
}

function smartFillRadio(container, targetOptionText) {
    const radioBtns = container.querySelectorAll('div[role="radio"]');
    if (!radioBtns.length) return false;
    
    let targetBtn = null;
    if (targetOptionText) {
        for (const btn of radioBtns) {
            const ariaLabel = btn.getAttribute('aria-label') || "";
            if (btn.textContent.includes(targetOptionText) || ariaLabel.includes(targetOptionText) || btn.parentElement.textContent.includes(targetOptionText)) {
                targetBtn = btn;
                break;
            }
        }
    }
    
    if (!targetBtn) targetBtn = radioBtns[0];
    if (targetBtn.getAttribute('aria-checked') === 'true') return true;
    
    targetBtn.focus();
    targetBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    return true;
}

function smartFillCheckbox(container, targetValue) {
    const checkboxes = container.querySelectorAll('div[role="checkbox"]');
    if (!checkboxes.length) return false;

    const targetOptions = targetValue ? targetValue.split(/[,，|]/).map(s => s.trim()) : [];

    checkboxes.forEach(btn => {
        const itemText = btn.textContent || btn.getAttribute('aria-label') || btn.parentElement.textContent;
        const isChecked = btn.getAttribute('aria-checked') === 'true';
        const shouldBeChecked = targetOptions.some(opt => itemText.includes(opt));

        if (shouldBeChecked !== isChecked) {
            btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        }
    });

    if (targetOptions.length === 0 && !container.querySelector('div[role="checkbox"][aria-checked="true"]')) {
        checkboxes[0].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    }
    return true;
}

const DB_KEY = 'form_auto_fill_data';

function startFilling() {
    const config = JSON.parse(localStorage.getItem(DB_KEY) || '{}');
    const questions = document.querySelectorAll('.geS5n');

    questions.forEach(question => {
        const titleEl = question.querySelector('.M7eMe, .HoXoMd');
        if (!titleEl) return;
        const fullTitle = titleEl.textContent.trim();

        for (const [matchText, detail] of Object.entries(config)) {
            if (fullTitle.includes(matchText)) {
                const targetValue = detail["值"];
                const type = detail["类型"];

                if (type === 'text') {
                    const input = question.querySelector('input[type="text"], textarea');
                    if (input) smartFillInput(input, targetValue);
                } else if (type === 'radio') {
                    smartFillRadio(question, targetValue);
                } else if (type === 'checkbox') {
                    smartFillCheckbox(question, targetValue);
                }
            }
        }
    });
}

// --- UI 逻辑 ---
const initUI = () => {
    const style = document.createElement('style');
    style.textContent = `
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
        .btn-clear { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; }
        .data-preview { margin-top: 10px; font-size: 11px; color: #6b7280; background: #f9fafb; padding: 8px; border-radius: 4px; max-height: 80px; overflow-y: auto; white-space: pre-wrap; border: 1px inset #eee; }
    `;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.id = 'auto-filler-panel';
    panel.innerHTML = `
        <div class="panel-header">Form 抢填控制台 (Native)</div>
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
        </div>`;
    document.body.appendChild(panel);

    const updatePreview = () => {
        const data = localStorage.getItem(DB_KEY) || '{}';
        document.getElementById('preview').textContent = JSON.stringify(JSON.parse(data), null, 2);
    };

    document.getElementById('btn-save').addEventListener('click', () => {
        const title = document.getElementById('field-title').value.trim();
        if (!title) return;
        const data = JSON.parse(localStorage.getItem(DB_KEY) || '{}');
        data[title] = { 
            "类型": document.getElementById('field-type').value, 
            "值": document.getElementById('field-value').value.trim() 
        };
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        updatePreview();
    });

    document.getElementById('btn-clear').addEventListener('click', () => {
        if (confirm('确定清空所有配置吗？')) {
            localStorage.removeItem(DB_KEY);
            updatePreview();
        }
    });

    document.getElementById('btn-run').addEventListener('click', startFilling);
    
    updatePreview();
};

// 兼容不同的加载时机
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUI);
} else {
    initUI();
}
