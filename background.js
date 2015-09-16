chrome.contextMenus.create({
    type: 'normal',
    title: '读取二维码信息',
    contexts: ['image'],
    onclick: processImageData
});

function processImageData(info) {
    qrcode.callback = function (data) {
        copyToClipboard(data);
        if (qrcode.isUrl(data) && ( data.indexOf('http://') == 0 || data.indexOf('ftp://') == 0 || data.indexOf('https://') == 0)) {
            chrome.tabs.create({
                url: data
            });
        } else {
            alert('已经拷贝到剪切板');
        }
    };
    qrcode.decode(info.srcUrl);
}

function copyToClipboard(text) {
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}