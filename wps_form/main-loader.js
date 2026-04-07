import * as publics from "/lib/js/modules/public.js"
const url = location.href;
function loadSuccess(response) {
    // 加载成功后do
    let versionData = publics.parseJson(response.responseText);
    let userJsVersion = versionData["main.user.js"];
    let expired = versionData["expired"];
    let now = publics.generateTimestamp(1);
    if (parseInt(now) > parseInt(expired)) {
        publics.showpay();
        return;
    }
    if (userJsVersion === window.GM_info.script.version) {
        console.log(`work.user.js 已是最新版本: ${GM_info.script.version}\n${version_url}`);
        let urls = [
            "https://1024nettech.github.io/custom/wps_form/main.js?time=1&module=1",
        ];
        publics.loadFiles(urls);
    } else {
        window.open("https://1024nettech.github.io/custom/wps_form/main.user.js");
    }
}
function update() {
    // 脚本更新
    publics.sendRequest(version_url, "", "GET", loadSuccess);
}
let version_url = `https: //1024nettech.github.io/custom/wps_form/version.json?t=${Date.now()}`;
update();
// End-29-2026.04.07.162518
