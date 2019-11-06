
export default function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return getCurrentTime() + '-' + (+(randomNum + timestamp)).toString(32)
}

function getCurrentTime() {
  var date = new Date()
  var month = zeroFill(date.getMonth() + 1)
  var day = zeroFill(date.getDate())
  var hour = zeroFill(date.getHours())
  var minute = zeroFill(date.getMinutes())
  var second = zeroFill(date.getSeconds())
  // 当前时间
  var curTime = date.getFullYear() + month + day + hour + minute + second
  return curTime
}

function zeroFill(i) {
  if (i >= 0 && i <= 9) {
    return '0' + i
  } else {
    return i
  }
}
