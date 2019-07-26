// 非空验证
function isNull (arg1) {
  return !arg1 && arg1 !== 0 && typeof arg1 !== 'boolean' ? true : false
}
// 验证全部是数字
function isNumber (str) {
  var res = /^[1-9]*[1-9][0-9]*$/
  if (!res.test(str)) {
    return false
  } else {
    return true
  }
}
// 验证特殊字符
function isSpecial (str) {
  var res = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
  if (res.test(str)) {
    return false
  } else {
    return true
  }
}
// 验证只能输入汉字
function isChinese (str) {
  var res = /^[\u4e00-\u9fa5]*$/
  if (res.test(str)) {
    return false
  } else {
    return true
  }
}
// 验证手机号码
function isPhone (str) {
  var res = /^(?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})$/
  if (res.test(str)) {
    return false
  } else {
    return true
  }
}
// 验证金额
function isMoney (str) {
  var res = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
  if (res.test(str)) {
    return false
  } else {
    return true
  }
}
// 验证身份证号码
function isIdCard (str) {
  var res = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
  if (res.test(str)) {
    return false
  } else {
    return true
  }
}
// 时间戳转化为时间
function changeDate (millis, style) {
  var time = new Date(millis)
  // 年
  var year = time.getFullYear()
  // 月
  var month = addZero(time.getMonth() + 1)
  // 日
  var date = addZero(time.getDate())
  if (style === 'YYYY-MM-DD') {
    return year + '-' + month + '-' + date
  } else {
    // 时
    var hour = addZero(time.getHours())
    // 分
    var minute = addZero(time.getMinutes())
    // 秒
    var second = addZero(time.getSeconds())
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  }
}
// 小于10，加0
function addZero (val) {
  if (val >= 0 && val <= 9) {
    return '0' + val
  }
}
// 时间转化为时间戳
function changeTimestamp (time) {
  var date = new Date(time)
  return date.getTime()
}
export { isNull, isNumber, isSpecial, isChinese, isPhone, isMoney, isIdCard, changeDate, changeTimestamp }
