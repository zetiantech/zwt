export function generateCronExpression(startHour, endHour, times) {
  // 13 36 11-21 * * ?
  // 随机秒位
  let cron = Math.ceil(Math.random() * 59).toString()
  cron += ' '
  // 分位平均间隔, 使用ceil宁少勿滥
  const span = Math.ceil(60 / times)
  // 循环从0开始寻找执行点, 便宜量为最大是span/4,的随机值(除数越小,两次随机靠近的几率越大), 直到times或者60分钟
  for (let i = 0; i < 60; i += span) {
    const point = i + Math.round(Math.random() * span / 4)
    if (point < 60) {
      // 可以填入
      if (i === 0) {
        // 第一个不用打逗号
        cron += point.toString()
      } else {
        cron += ',' + point.toString()
      }
    }
  }
  cron += ' '
  // 小时部分采用时间段, 小时后面固定
  cron += startHour.toString() + '-' + endHour.toString() + ' * * ?'
  return cron
}
