import { $ } from "/lib/js/modules/jquery.min.js";
import { set, get, del, keys, entries, clear } from "/lib/js/modules/idb-keyval.min.js"

const FIELD_TYPE = { TEXTAREA: "textarea", RADIO: "radio" };
const STORAGE_KEY_POS = "formSavePanelPosition";
const STORAGE_KEY_AUTO = "formAutoSubmitState";
const STORAGE_KEY_DELAY = "formAutoDelayTime"; // 新增：存储延迟时间

// 通用赋值逻辑
function fillWpsInput(element, value) {
    if (!element) return;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    const nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
    element.focus();
    if (element.tagName === "TEXTAREA") {
        nativeTextareaValueSetter.call(element, value);
    } else {
        nativeInputValueSetter.call(element, value);
    }
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
    setTimeout(() => element.blur(), 20);
}

// 核心填充逻辑
async function executeBatchFill0() {
    const allFields = await entries();
    const configKeys = [STORAGE_KEY_POS, STORAGE_KEY_AUTO, STORAGE_KEY_DELAY];
    const dataFields = allFields.filter(([key]) => !configKeys.includes(key));

    let successCount = 0;
    dataFields.forEach(([_, fieldData]) => {
        if (fieldData.title && fieldData.value) {
            const result = doRealFill(fieldData.title, fieldData.value, fieldData.type);
            if (result) successCount++;
        }
    });

    if (successCount > 0) {
        $(".src-components-write-footer-index__submitBtn").click();
        let t = setInterval(() => {
            const $confirmBtn = $(".ksapc-btn-middle.ksapc-btn-primary:contains(确 认)");
            if ($confirmBtn.length) {
                $confirmBtn.click();
                clearInterval(t);
            }
        }, 100);
        console.log(`🚀 任务完成：填充并提交了 ${successCount} 个字段`);
    }
}

// 核心填充逻辑
async function executeBatchFill() {
    const allFields = await entries();
    const configKeys = [STORAGE_KEY_POS, STORAGE_KEY_AUTO, STORAGE_KEY_DELAY];
    const dataFields = allFields.filter(([key]) => !configKeys.includes(key));

    let successCount = 0;
    dataFields.forEach(([_, fieldData]) => {
        if (fieldData.title && fieldData.value) {
            const result = doRealFill(fieldData.title, fieldData.value, fieldData.type);
            if (result) successCount++;
        }
    });

    if (successCount > 0) {
        // 新增判断：如果页面包含“暂未开始收集”提示，则终止提交
        const isNotStarted = $("body").text().includes("当前暂未开始收集表单");

        if (isNotStarted) {
            console.log(`⚠️ 页面显示“暂未开始收集”，已完成 ${successCount} 个字段填充，停止自动提交。`);
            return; // 提前退出，不执行后续点击逻辑
        }

        // 正常提交逻辑
        $(".src-components-write-footer-index__submitBtn").click();
        let t = setInterval(() => {
            const $confirmBtn = $(".ksapc-btn-middle.ksapc-btn-primary:contains(确 认)");
            if ($confirmBtn.length) {
                $confirmBtn.click();
                clearInterval(t);
            }
        }, 100);
        console.log(`🚀 任务完成：填充并提交了 ${successCount} 个字段`);
    }
}




async function createPanel() {
    const isAuto = await get(STORAGE_KEY_AUTO) || false;
    const delayTime = await get(STORAGE_KEY_DELAY) || 800; // 默认800ms

    const html = `
            <style>
                #formSavePanel { padding: 14px; border-radius: 12px; position: fixed; width: 340px; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.15); z-index: 99999999; font-family: 微软雅黑; }
                #dragHeader { font-weight: bold; font-size: 16px; margin-bottom: 12px; cursor: move; display: flex; justify-content: space-between; align-items: center; }
                #fieldTitle,#fieldValue,#fieldType,#delayInput { width: 100%; padding: 9px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #ddd; box-sizing: border-box;}
                #batchRealFillBtn,#clearAllBtn { width: 100%; padding: 10px; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-bottom: 8px; }
                #batchRealFillBtn { background: #28a745; }
                #clearAllBtn { background: #dc3545; }
                .config-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 13px; color: #666; }
                .auto-box { cursor: pointer; display: flex; align-items: center; }
                .auto-box input { margin-right: 4px; }
                #delayInput { width: 70px; margin-bottom: 0; padding: 4px 6px; }
            </style>
            <div id="formSavePanel">
                <div id="dragHeader">
                    <span>💾 一键保存填充</span>
                    <label class="auto-box"><input type="checkbox" id="autoTrigger" ${isAuto ? 'checked' : ''}>自动提交</label>
                </div>
                
                <div class="config-row">
                    <span>自动触发延迟 (ms):</span>
                    <input type="number" id="delayInput" value="${delayTime}" step="100" min="0">
                </div>

                <input id="fieldTitle" type="text" placeholder="字段标题（姓名、学号）">
                <input id="fieldValue" type="text" placeholder="要填入的值">
                <select id="fieldType">
                    <option value="textarea">文本输入框</option>
                    <option value="radio">单选框</option>
                </select>
                <button id="batchRealFillBtn">🔥 手动保存 + 填充提交</button>
                <button id="clearAllBtn">⚠️ 清除所有存储数据</button>
            </div>
        `;
    $("body").append(html);

    const pos = await get(STORAGE_KEY_POS) || { right: "50px", top: "84px" };
    $("#formSavePanel").css(pos.right ? { right: pos.right, top: pos.top } : { left: pos.left, top: pos.top });
    initDrag($("#formSavePanel"), $("#dragHeader"));

    // 保存延迟设置
    $("#delayInput").on("input", async function () {
        const val = parseInt($(this).val()) || 0;
        await set(STORAGE_KEY_DELAY, val);
    });

    // 自动开关
    $("#autoTrigger").on("change", async function () {
        await set(STORAGE_KEY_AUTO, $(this).prop("checked"));
    });

    // 手动执行
    $("#batchRealFillBtn").on("click", async () => {
        const title = $("#fieldTitle").val().trim();
        const value = $("#fieldValue").val().trim();
        const type = $("#fieldType").val();
        if (title && value) await set(title, { title, value, type });
        executeBatchFill();
    });

    $("#clearAllBtn").on("click", async () => {
        if (!confirm("⚠️ 确定清除所有数据？")) return;
        await clear();
        location.reload();
    });

    // 自动触发逻辑
    if (isAuto) {
        console.log(`检测到自动模式，将在 ${delayTime}ms 后执行...`);
        setTimeout(executeBatchFill, delayTime);
    }
}

function initDrag($element, $handle) {
    let isDragging = false, startX, startY, initialLeft, initialTop, initialRight;
    $handle.on("mousedown", e => {
        if ($(e.target).closest('.auto-box').length) return;
        isDragging = true;
        startX = e.clientX; startY = e.clientY;
        initialLeft = parseInt($element.css("left")) || null;
        initialTop = parseInt($element.css("top")) || null;
        initialRight = parseInt($element.css("right")) || null;
        e.preventDefault();
    });
    $(document).on("mousemove", e => {
        if (!isDragging) return;
        if (initialRight !== null) {
            $element.css({ right: (initialRight - (e.clientX - startX)) + "px", top: (initialTop + (e.clientY - startY)) + "px" });
        } else {
            $element.css({ left: (initialLeft + (e.clientX - startX)) + "px", top: (initialTop + (e.clientY - startY)) + "px" });
        }
    }).on("mouseup", async () => {
        if (isDragging) {
            await set(STORAGE_KEY_POS, { left: $element.css("left"), top: $element.css("top"), right: $element.css("right") });
        }
        isDragging = false;
    });
}

function doRealFill(title, value, type) {
    let isFound = false;
    $(".ksapc-questions-write-container").each(function () {
        const $container = $(this);
        if (!$container.text().includes(title)) return;
        isFound = true;
        if (type === FIELD_TYPE.TEXTAREA) {
            let inputEl = $container.find("textarea")[0] || $container.find("input")[0];
            if (inputEl) fillWpsInput(inputEl, value);
        } else if (type === FIELD_TYPE.RADIO) {
            $container.find(".ant-radio-wrapper.ksapc-radio").each(function () {
                if ($(this).text().includes(value)) {
                    const radioInput = $(this).find("input.ant-radio-input")[0];
                    if (radioInput) radioInput.click();
                }
            });
        }
    });
    return isFound;
}

$(createPanel);
// End-216-2026.04.27.103738
