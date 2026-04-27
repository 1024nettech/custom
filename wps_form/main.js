import { $ } from "/lib/js/modules/jquery.min.js";
import { set, get, del, keys, entries, clear } from "/lib/js/modules/idb-keyval.min.js"
const FIELD_TYPE = { TEXTAREA: "textarea", RADIO: "radio" };
const STORAGE_KEY_POS = "formSavePanelPosition";
const STORAGE_KEY_AUTO = "formAutoSubmitState";
const STORAGE_KEY_DELAY = "formAutoDelayTime";
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
// 虚拟预览函数：在元素位置显示预填内容
function previewFill(element, value) {
    if (!element) return;
    const $el = $(element);
    // 移除同一个容器内的旧预览
    $el.closest(".ksapc-questions-write-container").find(".fill-preview-span").remove();
    const $span = $(`<span class="fill-preview-span" style="
        margin-left: 10px;
        color: #ff9800;
        font-weight: bold;
        font-size: 13px;
        background: #fff3e0;
        padding: 2px 8px;
        border-radius: 4px;
        border: 1px solid #ffb74d;
        display: inline-block;
        vertical-align: middle;
    ">预览: ${value}</span>`);
    // 尝试插入到输入框后面，如果是 radio 则插入到文本后面
    if ($el.is("input[type='radio']")) {
        $el.closest(".ksapc-radio").append($span);
    } else {
        $el.after($span);
    }
}
// 核心填充逻辑
async function executeBatchFill() {
    const allFields = await entries();
    const configKeys = [STORAGE_KEY_POS, STORAGE_KEY_AUTO, STORAGE_KEY_DELAY];
    const dataFields = allFields.filter(([key]) => !configKeys.includes(key));
    // 判断是否为模拟阶段（不开始收集）
    const isMock = $("body").text().includes("当前暂未开始收集表单");
    let successCount = 0;
    dataFields.forEach(([_, fieldData]) => {
        if (fieldData.title && fieldData.value) {
            const result = doRealFill(fieldData.title, fieldData.value, fieldData.type, isMock);
            if (result) successCount++;
        }
    });
    if (successCount > 0) {
        if (isMock) {
            console.log(`🛠️ 模拟模式：已完成 ${successCount} 个字段预览，不触发提交。`);
            return;
        }
        // 正常提交流程
        // $(".src-components-write-footer-index__submitBtn").click();
        // let t = setInterval(() => {
        //     const $confirmBtn = $(".ksapc-btn-middle.ksapc-btn-primary:contains(确 认)");
        //     if ($confirmBtn.length) {
        //         $confirmBtn.click();
        //         clearInterval(t);
        //     }
        // }, 100);
        // console.log(`🚀 任务完成：填充并提交了 ${successCount} 个字段`);
        // 正常提交流程
        $(".src-components-write-footer-index__submitBtn").click();

        // 使用 MutationObserver 替代轮询
        const observer = new MutationObserver((mutations, obs) => {
            const $confirmBtn = $(".ksapc-btn-middle.ksapc-btn-primary:contains(确 认)");
            if ($confirmBtn.length) {
                $confirmBtn.click();
                console.log("✅ 确认按钮已自动点击");
                obs.disconnect(); // 成功点击后停止监听
            }
        });

        // 开始监听整个 body 的子节点变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 设置一个保险：5秒后如果还没出现就自动停止监听，防止内存泄露
        setTimeout(() => observer.disconnect(), 5000);

        console.log(`🚀 任务完成：填充并触发提交（成功匹配 ${successCount} 个字段）`);

    }
}
async function createPanel() {
    const isAuto = await get(STORAGE_KEY_AUTO) || false;
    const delayTime = await get(STORAGE_KEY_DELAY) || 800;
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
    $("#delayInput").on("input", async function () {
        const val = parseInt($(this).val()) || 0;
        await set(STORAGE_KEY_DELAY, val);
    });
    $("#autoTrigger").on("change", async function () {
        await set(STORAGE_KEY_AUTO, $(this).prop("checked"));
    });
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
function doRealFill(title, value, type, isMock = false) {
    let isFound = false;
    $(".ksapc-questions-write-container").each(function () {
        const $container = $(this);
        if (!$container.text().includes(title)) return;
        isFound = true;
        if (type === FIELD_TYPE.TEXTAREA) {
            let inputEl = $container.find("textarea")[0] || $container.find("input")[0];
            if (inputEl) {
                isMock ? previewFill(inputEl, value) : fillWpsInput(inputEl, value);
            }
        } else if (type === FIELD_TYPE.RADIO) {
            $container.find(".ant-radio-wrapper.ksapc-radio").each(function () {
                if ($(this).text().includes(value)) {
                    const radioInput = $(this).find("input.ant-radio-input")[0];
                    if (radioInput) {
                        isMock ? previewFill(radioInput, value) : radioInput.click();
                    }
                }
            });
        }
    });
    return isFound;
}
$(createPanel);
// End-215-2026.04.27.111449
