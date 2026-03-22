/**
 * 休眠函数：返回一个指定毫秒后resolve的Promise
 * @param {number} ms - 休眠毫秒数
 * @returns {Promise<void>} Promise对象
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 等待指定文本的元素出现（核心用于等待Draft saved状态提示）
 * @param {string} targetText - 目标匹配文本，默认"Draft saved"
 * @param {number} interval - 轮询检查间隔(ms)，默认10ms
 * @param {number} timeout - 超时时间(ms)，默认100000ms
 * @returns {Promise<HTMLElement>} 找到的目标元素Promise
 * @rejects {Error} 超时未找到元素时抛出错误
 */
async function waitForElementByText(
    targetText = "Draft saved",
    interval = 10,
    timeout = 100000
) {
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
        // 轮询检查函数
        const checkElement = () => {
            // 1. 超时判断：超过设定时间则拒绝Promise
            if (Date.now() - startTime > timeout) {
                reject(new Error(`超时(${timeout}ms)：未找到文本为 "${targetText}" 的元素`));
                return;
            }

            // 2. 查找目标元素并验证文本
            const targetElement = document.querySelector('div.pMDWAf');
            if (targetElement && targetElement.textContent.trim() === targetText) {
                resolve(targetElement);
                return;
            }

            // 3. 未找到则继续轮询
            setTimeout(checkElement, interval);
        };

        // 启动首次检查
        checkElement();
    });
}

/**
 * 根据文本内容查找页面中的链接元素
 * @param {string} text - 要匹配的链接文本（包含匹配）
 * @returns {HTMLElement|null} 匹配的a标签元素，未找到返回null
 */
function findLinkByText(text) {
    const links = document.querySelectorAll('a');
    for (const link of links) {
        if (link.textContent.trim().includes(text)) {
            return link;
        }
    }
    return null;
}

/**
 * 模拟完整的用户交互事件（通用事件触发工具函数）
 * 覆盖鼠标事件、焦点事件、谷歌jsaction框架事件
 * @param {HTMLElement} element - 目标操作元素
 * @param {string} [eventType='click'] - 主要触发的事件类型，默认click
 */
function triggerUserEvents(element, eventType = 'click') {
    if (!element) return;

    // 1. 模拟完整鼠标事件流（进入→按下→松开→点击）
    element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    element.dispatchEvent(new MouseEvent('mousedown', {
        bubbles: true, cancelable: true, button: 0
    }));
    element.dispatchEvent(new MouseEvent('mouseup', {
        bubbles: true, cancelable: true, button: 0
    }));
    element.dispatchEvent(new MouseEvent(eventType, {
        bubbles: true, cancelable: true
    }));

    // 2. 模拟焦点事件（聚焦→失焦）
    element.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    element.dispatchEvent(new FocusEvent('blur', { bubbles: true }));

    // 3. 触发谷歌jsaction框架内置事件
    if (window.google?.jsaction?.trigger) {
        window.google.jsaction.trigger(element, eventType);
        window.google.jsaction.trigger(element, 'rcuQ6b');
        window.google.jsaction.trigger(element, 'JIbuQc');
    }

    // 4. 解析并触发元素上的jsaction自定义事件
    const jsActionStr = element.getAttribute('jsaction') || '';
    if (jsActionStr) {
        jsActionStr.split(';').map(pair => pair.split(':'))
            .forEach(([eventName, methodName]) => {
                if (eventName && methodName) {
                    element.dispatchEvent(new CustomEvent(eventName, {
                        bubbles: true,
                        cancelable: true,
                        detail: { action: methodName }
                    }));
                }
            });
    }
}

// ======================== 表单操作核心函数 ========================

/**
 * 处理表单第一页：勾选复选框并点击Next按钮
 * @returns {Promise<boolean>} 操作是否成功
 */
async function handleFirstPageForm() {
    console.log('📝 开始处理表单第一页');

    // 1. 定位并勾选复选框
    const checkbox = document.querySelector('div[role="checkbox"]');
    if (!checkbox) {
        console.error('❌ 未找到复选框元素');
        return false;
    }

    // 触发复选框点击并强制更新选中状态
    checkbox.click();
    checkbox.setAttribute('aria-checked', 'true');
    triggerUserEvents(checkbox);

    // 同步表单状态变更事件
    ['input', 'change', 'blur'].forEach(eventType => {
        checkbox.dispatchEvent(new Event(eventType, { bubbles: true }));
    });
    console.log('✅ 复选框已勾选');

    // 等待草稿保存状态确认
    await waitForElementByText();

    // 2. 延迟点击Next按钮（确保状态同步完成）
    setTimeout(() => {
        // 多策略定位Next按钮（提高兼容性）
        let nextButton = Array.from(document.querySelectorAll('[role="button"]'))
            .find(btn => btn.textContent.trim().includes('Next'));
        if (!nextButton) nextButton = document.querySelector('[jsname="OCpkoe"]');
        if (!nextButton) nextButton = document.querySelector('.ThHDze .lRwqcd [role="button"]');

        if (!nextButton) {
            console.error('❌ 未找到Next按钮');
            return false;
        }

        // 触发按钮完整交互事件
        triggerUserEvents(nextButton);
        console.log('✅ Next按钮已点击');
    }, 100);

    return true;
}

/**
 * 填充表单输入框（定位前3个.geS5n容器内的输入框）
 * @param {string} name - 姓名（填充第一个输入框）
 * @param {string} phone - 电话（填充第二个输入框）
 * @param {string} passport - 护照ID（填充第三个输入框）
 * @returns {boolean} 填充是否成功
 */
function fillFormInputs(name, phone, passport) {
    console.log('📝 开始填充表单输入框');

    // 获取所有.geS5n输入框容器
    const inputContainers = document.querySelectorAll('form .geS5n');
    if (inputContainers.length === 0) {
        console.error('❌ 未找到任何.geS5n输入框容器');
        return false;
    }

    /**
     * 填充单个输入框的核心逻辑
     * @param {HTMLElement} container - 输入框容器
     * @param {string} value - 要填充的值
     * @returns {boolean} 填充是否成功
     */
    const fillInput = (container, value) => {
        if (!container || !value) return false;

        // 多策略定位输入框元素
        let input = container.querySelector('form input[jsname="YPqjbf"]') ||
            container.querySelector('form input.whsOnd.zHQkBf');

        if (!input) {
            console.error('❌ 未找到输入框元素');
            return false;
        }

        // 模拟完整用户输入流程
        input.focus();          // 聚焦
        input.value = '';       // 清空原有值
        input.dispatchEvent(new Event('input', { bubbles: true })); // 触发输入事件
        input.value = value;    // 设置新值
        input.dispatchEvent(new Event('input', { bubbles: true })); // 触发输入事件
        input.dispatchEvent(new Event('change', { bubbles: true }));// 触发变更事件
        input.dispatchEvent(new Event('blur', { bubbles: true }));  // 失焦

        // 触发谷歌表单内置输入事件
        if (window.google?.jsaction?.trigger) {
            window.google.jsaction.trigger(input, 'input');
        }

        console.log(`✅ 输入框填充完成：${value}`);
        return true;
    };

    // 依次填充前三个输入框
    if (inputContainers[0]) fillInput(inputContainers[0], name);
    if (inputContainers[1]) fillInput(inputContainers[1], phone);
    if (inputContainers[2]) fillInput(inputContainers[2], passport);

    console.log('✅ 所有指定输入框填充完成');
    return true;
}

/**
 * 选择表单单选按钮（默认选择第一个radio元素）
 * @returns {boolean} 选择是否成功
 */
function selectRadioButton() {
    console.log('📝 开始选择单选按钮');

    // 定位目标单选按钮
    let radioBtn = document.querySelector('form div[role="radio"]');

    if (!radioBtn) {
        console.error('❌ 未找到目标单选按钮');
        return false;
    }

    // 跳过已选中的情况
    if (radioBtn.getAttribute('aria-checked') === 'true') {
        console.log('ℹ️ 单选按钮已选中，无需重复操作');
        return true;
    }

    // 模拟用户选择操作
    radioBtn.focus();
    triggerUserEvents(radioBtn);
    radioBtn.setAttribute('aria-checked', 'true');
    radioBtn.dispatchEvent(new Event('change', { bubbles: true }));

    console.log('✅ 单选按钮已选中');
    return true;
}

/**
 * 提交表单（防重复提交，多策略定位提交按钮）
 * @returns {boolean} 提交操作是否触发成功
 */
function submitForm() {
    console.log('📝 开始提交表单');

    // 多策略定位提交按钮
    let submitButton = document.querySelector('[aria-label="Submit"][role="button"]');
    if (!submitButton) {
        submitButton = Array.from(document.querySelectorAll('[role="button"]'))
            .find(btn => btn.textContent.trim().includes('Submit'));
    }
    if (!submitButton) {
        submitButton = document.querySelector('[jsname="M2UYVd"][role="button"]');
    }

    if (!submitButton) {
        console.error('❌ 未找到Submit提交按钮');
        return false;
    }

    // 触发提交按钮完整交互事件
    triggerUserEvents(submitButton);

    // 触发表单原生提交事件
    const form = submitButton.closest('form');
    if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }

    console.log('✅ 表单提交操作已触发');
    return true;
}

// ======================== UI与数据存储函数 ========================

/**
 * 初始化应用：创建UI → 读取本地存储 → 检查数据 → 启动主程序
 */
async function initApp() {
    // 1. 创建用户输入界面（用于填写/保存姓名、电话、护照）
    createInputUI();

    // 2. 从localStorage读取已保存的表单数据
    const savedFormData = getFormDataFromLocalStorage();

    // 3. 检查数据完整性，不完整则提示用户
    if (!savedFormData.name || !savedFormData.phone || !savedFormData.passport) {
        alert('请先填写表单数据并保存！');
        return;
    }

    // 4. 数据完整则启动主程序
    await main(savedFormData);
}

/**
 * 创建用户输入UI：包含姓名/电话/护照输入框 + 保存按钮 + 样式美化
 * 同时包含表单页面的样式优化（精简布局、调整元素位置）
 */
function createInputUI() {
    // 1. 创建样式表（UI样式 + 表单页面优化样式）
    const style = document.createElement('style');
    style.textContent = `
        #wrapperx {
            width:260px;
            height:161px;
            position: fixed;
            top: 23px;
            right: 95px;
            z-index: 9999;
            background-color: white;
            padding: 20px;
            border: 1px solid rgb(204, 204, 204);
            border-radius: 8px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px;
        }

        #wrapperx label {
            margin: 5px 0;
            display: inline-block;
        }

        #wrapperx input {
            width: 200px;
            padding: 5px;
            margin: 5px 0 10px;
            border: 1px solid #ccc;
        }

        #wrapperx button {
            padding: 8px 16px;
            background-color: rgb(76, 175, 80);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
        }

        #wrapperx button:hover {
            background-color: #45a049;
        }

        /* 表单页面样式优化 */
        .teQAzf { width: 90vw !important; }
        .vnFTpb { display: none !important; } /* 隐藏头部图片 */
        .N0gd6 { padding: 0 !important; }      /* 调整首个大标题内边距 */
        
        /* 隐藏冗余文本/区域 */
        .cBGGJ, .zAVwcb, .md0UAd, .gubaDc,
        .nYdzXd, .T2dutf, form+div, .wJFUN {
            display: none !important;
        }

        /* 输入框容器样式调整 */
        .geS5n {
            position: relative;
            padding: 0 24px !important;
        }

        /* 表单子模块标题样式 */
        .z12JJ { margin: 10px 0 !important; }

        /* 输入框/单选框位置调整（右对齐） */
        .z12JJ+div {
            position: absolute;
            top: 0;
            right: 0;
        }

        /* 单选/复选框列表横向排列 */
        .SG0AAe { justify-content: unset !important; }
        .nWQGrd, .eBFwI {
            width: auto !important;
            display: inline-block !important;
        }

        /* 提交按钮固定位置 */
        .QvWxOd {
            position: fixed !important;
            top: 30px;
            right: 400px;
        }
    `;
    document.head.appendChild(style);

    // 2. 创建UI容器
    const wrapper = document.createElement('div');
    wrapper.id = 'wrapperx';

    // 3. 创建姓名输入项
    const nameLabel = document.createElement('label');
    nameLabel.textContent = '姓名：';
    const nameInput = document.createElement('input');
    nameInput.id = 'nameInput';
    nameInput.type = 'text';
    nameInput.placeholder = '请输入姓名';

    // 4. 创建手机输入项
    const phoneLabel = document.createElement('label');
    phoneLabel.textContent = '手机：';
    const phoneInput = document.createElement('input');
    phoneInput.id = 'phoneInput';
    phoneInput.type = 'text';
    phoneInput.placeholder = '请输入手机号';

    // 5. 创建护照输入项
    const passportLabel = document.createElement('label');
    passportLabel.textContent = '护照：';
    const passportInput = document.createElement('input');
    passportInput.id = 'passportInput';
    passportInput.type = 'text';
    passportInput.placeholder = '请输入护照号';

    // 6. 创建保存按钮（绑定保存事件）
    const saveBtn = document.createElement('button');
    saveBtn.id = 'savex';
    saveBtn.textContent = '保存数据';
    saveBtn.addEventListener('click', saveFormDataToLocalStorage);

    // 6. 创建清除按钮（绑定保存事件）
    const clearBtn = document.createElement('button');
    clearBtn.id = 'clearx';
    clearBtn.textContent = '清除数据';
    clearBtn.addEventListener('click', clearLocalStorage);

    // 7. 组装UI元素
    const br = document.createElement('br');
    wrapper.appendChild(nameLabel);
    wrapper.appendChild(nameInput);
    wrapper.appendChild(br);
    wrapper.appendChild(phoneLabel);
    wrapper.appendChild(phoneInput);
    wrapper.appendChild(br);
    wrapper.appendChild(passportLabel);
    wrapper.appendChild(passportInput);
    wrapper.appendChild(br);
    wrapper.appendChild(saveBtn);
    wrapper.appendChild(clearBtn);

    // 8. 将UI添加到页面
    document.body.appendChild(wrapper);

    // 9. 填充已保存的数据到输入框（回显）
    const savedData = getFormDataFromLocalStorage();
    if (savedData.name) document.getElementById('nameInput').value = savedData.name;
    if (savedData.phone) document.getElementById('phoneInput').value = savedData.phone;
    if (savedData.passport) document.getElementById('passportInput').value = savedData.passport;
}

/**
 * 从localStorage读取表单数据
 * @returns {Object} 包含name/phone/passport的对象（无数据则返回空对象）
 */
function getFormDataFromLocalStorage() {
    try {
        const data = localStorage.getItem('formData');
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('读取本地存储失败：', error);
        return {};
    }
}

/**
 * 将输入框中的数据保存到localStorage
 * 保存前会验证数据完整性（姓名/电话/护照不能为空）
 */
function saveFormDataToLocalStorage() {
    // 获取并清洗输入值
    const name = document.getElementById('nameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const passport = document.getElementById('passportInput').value.trim();

    // 验证数据完整性
    if (!name || !phone || !passport) {
        alert('请填写完整的表单数据！');
        return;
    }

    // 保存到本地存储
    const formData = { name, phone, passport };
    localStorage.setItem('formData', JSON.stringify(formData));
    alert('数据保存成功！');
}

// 清除localStorage数据
function clearLocalStorage() {
    localStorage.clear();
    document.getElementById('nameInput').value = "";
    document.getElementById('phoneInput').value = "";
    document.getElementById('passportInput').value = "";
    alert('数据清除成功！');
}

// ======================== 主程序逻辑 ========================

/**
 * 主程序：根据页面类型自动处理表单
 * @param {Object} FORM_DATA - 包含name/phone/passport的表单数据
 */
async function main(FORM_DATA) {
    try {
        // 页面类型判断：检测是否是提交后的页面
        const submitAnotherLink = findLinkByText('Submit another response');
        const radioButton = document.querySelector('div[role="radio"]');

        // 分支逻辑：处理不同页面
        if (radioButton && !submitAnotherLink) {
            // 非第一页：填充输入框 → 等待保存 → 选单选按钮 → 等待保存 → （可选提交）
            fillFormInputs(FORM_DATA.name, FORM_DATA.phone, FORM_DATA.passport);
            await waitForElementByText();
            selectRadioButton();
            await waitForElementByText();
            submitForm();
        } else {
            // 第一页：勾选复选框 + 点击Next按钮
            await handleFirstPageForm();
        }
    } catch (error) {
        console.error('❌ 表单自动处理过程中出错：', error);
    }
}

// 启动应用
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initApp();
} else {
    // 如果 DOM 还没准备好，就等它准备好
    document.addEventListener('DOMContentLoaded', initApp);
}
// End-550-2026.03.22.155424
