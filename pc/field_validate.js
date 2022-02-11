export function isPhone(rule, value,callback) {
    var myreg=/^1[3-9]\d{9}$/;
    if (!myreg.test(value)) {
        callback('手机号码不正确')
    } else {
        callback()
    }
}