import { set, get, del, keys, entries } from "/lib/js/modules/idb-keyval.min.js"
import * as publics from "/lib/js/modules/public.js"
const FIELD_TYPE = {
    TEXTAREA: 'textarea',
    RADIO: 'radio'
};

const STORAGE_KEY_POS = 'formSavePanelPosition';

// 通用赋值：支持 textarea 与 input 自动兼容
function fillWpsInput(element, value) {
    if (!element) return console.warn("未找到输入框元素");

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype, "value"
    ).set;
    const nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype, "value"
    ).set;

    element.focus();

    if (element.tagName === "TEXTAREA") {
        nativeTextareaValueSetter.call(element, value);
    } else {
        nativeInputValueSetter.call(element, value);
    }

    const inputEvent = new Event("input", { bubbles: true, cancelable: true });
    element.dispatchEvent(inputEvent);
    const changeEvent = new Event("change", { bubbles: true, cancelable: true });
    element.dispatchEvent(changeEvent);

    setTimeout(() => element.blur(), 20);
    console.log("✅ 输入框填写成功: ", value);
}

async function savePanelPosition(left, top, right) {
    await publics.setAndLog(STORAGE_KEY_POS, { left, top, right });
}
async function loadPanelPosition() {
    return await publics.getAndLog(STORAGE_KEY_POS) || { right: '50px', top: '84px' };
}

async function createPanel() {
    const html = `
            <style>
                #formSavePanel {
                    padding: 14px;
                    border-radius: 12px;
                    position: fixed;
                    width: 340px;
                    background: #fff;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    z-index: 99999999;
                    font-family: 微软雅黑;
                    user-select: none;
                }
                #dragHeader {
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 12px;
                    cursor: move;
                }
                #fieldTitle,#fieldValue,#fieldType {
                    width: 100%;
                    padding: 9px;
                    margin-bottom: 10px;
                    border-radius: 6px;
                    border: 1px solid #ddd;
                }
                #batchRealFillBtn,#clearAllBtn {
                    width: 100%;
                    padding: 10px;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                    margin-bottom: 8px;
                }
                #batchRealFillBtn { background: #28a745; }
                #clearAllBtn { background: #dc3545; }
            </style>
            <div id="formSavePanel">
                <div id="dragHeader">💾 一键保存填充</div>
                <input id="fieldTitle" type="text" placeholder="字段标题（姓名、班级、学号）">
                <input id="fieldValue" type="text" placeholder="要填入的值">
                <select id="fieldType">
                    <option value="textarea">文本输入框</option>
                    <option value="radio">单选框</option>
                </select>
                <button id="batchRealFillBtn">🔥 一键保存 + 填充提交</button>
                <button id="clearAllBtn">⚠️ 清除所有存储数据</button>
            </div>
        `;
    $('body').append(html);

    const pos = await loadPanelPosition();
    if (pos.right) {
        $("#formSavePanel").css({ right: pos.right, top: pos.top });
    } else {
        $("#formSavePanel").css({ left: pos.left, top: pos.top });
    }
    initDrag($("#formSavePanel"), $('#dragHeader'));

    // 一键 = 保存当前输入 + 批量填充 + 自动提交
    $('#batchRealFillBtn').on('click', async () => {
        const title = $('#fieldTitle').val().trim();
        const value = $('#fieldValue').val().trim();
        const type = $('#fieldType').val();

        if (title && value) {
            await publics.setAndLog(title, { title, value, type });
            console.log(`✅ 已保存字段: ${title} → ${value}`);
        }

        const allFields = await entries();
        if (!allFields.length) return console.log('暂无保存的字段数据');

        let successCount = 0;
        allFields.forEach(([_, fieldData]) => {
            if (fieldData.title && fieldData.value && fieldData.type) {
                const result = doRealFill(fieldData.title, fieldData.value, fieldData.type);
                if (result) successCount++;
            }
        });

        $(".src-components-write-footer-index__submitBtn").click();
        let t = setInterval(() => {
            if ($(".ksapc-btn-middle.ksapc-btn-primary:contains(确 认)").length) {
                $(".ksapc-btn-middle.ksapc-btn-primary:contains(确 认)").click();
                clearInterval(t);
            }
        }, 100);

        console.log(`✅ 填充提交完成 | 成功匹配字段: ${successCount} 个`);
    });

    $('#clearAllBtn').on('click', async () => {
        if (!confirm('⚠️ 确定清除所有数据？不可恢复！')) return;
        await publics.clearAll();
        console.log('✅ 已清空所有存储数据');
    });
}

function initDrag($element, $handle) {
    let isDragging = false, startX, startY, initialLeft, initialTop, initialRight;
    $handle.css('cursor', 'move');

    $handle.on('mousedown', e => {
        isDragging = true;
        startX = e.clientX; startY = e.clientY;
        initialLeft = parseInt($element.css('left')) || null;
        initialTop = parseInt($element.css('top')) || null;
        initialRight = parseInt($element.css('right')) || null;
        $element.css('transition', 'none');
        e.preventDefault();
    });

    $(document).on('mousemove', e => {
        if (!isDragging) return;
        if (initialRight !== null) {
            let newRight = initialRight - (e.clientX - startX);
            let newTop = initialTop + (e.clientY - startY);
            $element.css({ right: newRight + 'px', top: newTop + 'px' });
        } else {
            let newLeft = initialLeft + (e.clientX - startX);
            let newTop = initialTop + (e.clientY - startY);
            $element.css({ left: newLeft + 'px', top: newTop + 'px' });
        }
    });

    $(document).on('mouseup', async () => {
        if (isDragging) {
            let pos = {
                left: $element.css('left'),
                top: $element.css('top'),
                right: $element.css('right')
            };
            await savePanelPosition(pos.left, pos.top, pos.right);
        }
        isDragging = false;
    });
}

// 核心填充逻辑：textarea 不存在时自动找 input
function doRealFill(title, value, type) {
    let isFound = false;
    $('.ksapc-questions-write-container').each(function () {
        const $container = $(this);
        if (!$container.text().includes(title)) return;
        isFound = true;

        if (type === FIELD_TYPE.TEXTAREA) {
            // 先找 textarea
            let inputEl = $container.find('textarea')[0];
            // 找不到则找 input
            if (!inputEl) inputEl = $container.find('input')[0];
            if (inputEl) fillWpsInput(inputEl, value);
        }

        if (type === FIELD_TYPE.RADIO) {
            $('.ant-radio-wrapper.ksapc-radio').each(function () {
                const $item = $(this);
                if ($item.text().includes(value)) {
                    const radioInput = $item.find('input.ant-radio-input')[0];
                    if (radioInput) radioInput.click();
                    console.log(`✅ 单选框选中: ${title} → ${value}`);
                }
            });
        }
    });
    return isFound;
}

$(function () {
    createPanel();
});
// End-220-2026.04.06.095628
