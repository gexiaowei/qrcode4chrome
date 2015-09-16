chrome.tabs.getSelected(function (tab) {
    console.log(tab);
    $('#qrcodeCanvas').qrcode({
        width: 250,
        height: 250,
        text: tab.url
    });
});