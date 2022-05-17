export  var os = function() {
    // if (process.client) {
        var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isiPad =/(?:iPad|PlayBook)/.test(ua),
        isTablet = isiPad || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isiPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isiPhone && !isAndroid && !isSymbian;
        return {
            isTablet: isTablet,
            isiPhone: isiPhone,
            isiOS: isiPad|| isiPhone,
            isAndroid : isAndroid,
            isPc : isPc,
        };
    // }

}();