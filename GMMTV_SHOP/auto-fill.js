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
        if (radioButton && !submitAnotherLink && document.title.trim().startsWith("28")) {
            // 非第一页：填充输入框 → 等待保存 → 选单选按钮 → 等待保存 → （可选提交）
            fillFormInputs(FORM_DATA.name, FORM_DATA.phone, FORM_DATA.passport);
            await waitForElementByText();
            selectRadioButton();
            await waitForElementByText();
            submitForm();
        } else if (document.title.trim().startsWith("28")) {
            // 第一页：勾选复选框 + 点击Next按钮
            await handleFirstPageForm();
        }
    } catch (error) {
        console.error('❌ 表单自动处理过程中出错：', error);
    }
}



// ——————————————————————————————————————————————————————————————————————————————————监听链接
function open_link() {
    // ========== 配置项（用户可提前设置） ==========
    const TARGET_URL = "https://nitter.net/GmmtvShop"; // 请求地址
    const CHECK_INTERVAL = 100; // 时间检测间隔(ms)
    const TARGET_TIME = "130000"; // 目标时间（6位数字格式：时+分+秒）
    const STORAGE_KEY = "gmmtv_request_sent"; // 本地存储标识
    const LINK_FILTER = "forms.gle"; // 要筛选的链接关键词

    // ========== 工具函数：补零（确保两位数） ==========
    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    // ========== 核心函数：精准获取北京时间（返回6位数字格式） ==========
    function getBeijingTime() {
        // 1. 先获取本地时间的UTC等效时间（消除本地时区偏移）
        const now = new Date();
        const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000));

        // 2. UTC时间 + 8小时 = 北京时间（UTC+8）
        const beijingTime = new Date(utcTime.getTime() + 8 * 60 * 60 * 1000);

        // 提取时/分/秒（补零确保两位数）
        const hour = padZero(beijingTime.getHours());
        const minute = padZero(beijingTime.getMinutes());
        const second = padZero(beijingTime.getSeconds());

        // 拼接为6位数字格式（如130000、160530）
        const timeNum6 = parseInt(`${hour}${minute}${second}`, 10);
        const timeStr6 = `${hour}${minute}${second}`;

        // 调试信息：输出多种格式方便核对
        console.log(`[时间调试] 本地时间: ${now.toLocaleTimeString()} | 北京时间: ${timeStr6} (数字格式: ${timeNum6})`);
        return timeStr6
        return {
            timeNum6: timeNum6, // 6位数字格式（核心比对值）
            timeStr6: timeStr6, // 6位字符串格式（用于展示）
            full: beijingTime   // 完整Date对象（用于日期判断）
        };
    }

    // ========== 核心函数：发送GET请求并处理响应 ==========
    function sendRequestAndProcess() {
        console.log("[GMMTV] 开始发送请求:", TARGET_URL);

        GM_xmlhttpRequest({
            method: "GET",
            url: TARGET_URL,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
            onload: function (response) {
                if (response.status === 200) {
                    console.log("[GMMTV] 请求成功，开始解析响应");
                    // 创建临时DOM解析HTML
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, "text/html");

                    // 只定位第一个.timeline-item
                    const firstTimelineItem = doc.querySelector(".timeline .timeline-item");

                    if (firstTimelineItem) {
                        const tweetContent = firstTimelineItem.querySelector(".tweet-content");
                        if (tweetContent) {
                            // 提取所有forms.gle链接
                            const formsLinks = extractFormsLinks(tweetContent);

                            if (formsLinks.length > 0) {
                                console.log(`[GMMTV] 共找到 ${formsLinks.length} 个forms.gle链接，将全部自动打开`);
                                // 循环打开所有找到的链接
                                formsLinks.forEach((link, index) => {
                                    console.log(`[GMMTV] 正在打开第 ${index + 1} 个链接: ${link}`);
                                    GM_openInTab(link, { active: true });
                                });
                            } else {
                                console.log("[GMMTV] 第一个.timeline-item中未找到forms.gle链接");
                                alert("未找到任何包含forms.gle的链接！");
                            }
                        } else {
                            console.error("[GMMTV] 未找到.tweet-content元素");
                            alert("解析失败：未找到.tweet-content元素！");
                        }
                    } else {
                        console.error("[GMMTV] 未找到.timeline-item元素");
                        alert("解析失败：未找到.timeline-item元素！");
                    }
                } else {
                    console.error("[GMMTV] 请求失败，状态码:", response.status);
                    alert(`请求失败！状态码：${response.status}`);
                }
            },
            onerror: function (error) {
                console.error("[GMMTV] 请求出错:", error);
                alert("请求出错：" + JSON.stringify(error));
            },
            timeout: 100000
        });
    }

    // ========== 核心函数：提取所有包含forms.gle的链接 ==========
    function extractFormsLinks(tweetContentElement) {
        const allLinks = tweetContentElement.querySelectorAll("a");
        const formsLinks = [];

        // 筛选包含forms.gle的链接
        allLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href && href.includes(LINK_FILTER)) {
                formsLinks.push(href);
                console.log(`[GMMTV] 找到forms.gle链接[${formsLinks.length - 1}]: ${href}`);
            }
        });

        return formsLinks;
    }

    // ========== 核心函数：时间检测逻辑（直接比对6位数字） ==========
    function checkTimeAndExecute() {
        const beijingTime = getBeijingTime();
        // 检查是否已发送过请求（按日期存储）
        const hasSent = localStorage.getItem(STORAGE_KEY) === "true";

        // 直接比对6位数字格式的时间
        if (beijingTime == TARGET_TIME && !hasSent) {
            console.log(`[GMMTV] 到达目标时间${TARGET_TIME}，执行请求`);
            localStorage.setItem(STORAGE_KEY, "true"); // 标记已发送
            sendRequestAndProcess();
        }
    }

    // ========== 启动定时检测 ==========
    console.log(`[GMMTV] 脚本已启动，将在北京时间${TARGET_TIME}自动执行`);
    setInterval(checkTimeAndExecute, CHECK_INTERVAL);
}

function test_open_links() {
    let formsLinks = ["https://forms.gle/mAFjpras72RjT1mw6", "https://forms.gle/mAFjpras72RjT1mw7"]
    formsLinks.forEach((link, index) => {
        console.log(`[GMMTV] 正在打开第 ${index + 1} 个链接: ${link}`);
        GM_openInTab(link, { active: true });
    });
}

// ——————————————————————————————————————————————————————————————————————————————————监听链接

// 启动应用
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initApp();
    open_link();
    // test_open_links();
} else {
    // 如果 DOM 还没准备好，就等它准备好
    document.addEventListener('DOMContentLoaded', initApp);
    open_link();
    // test_open_links();
}
// End-702-2026.03.22.174127
