export default {
  // 获取指定日期零点时间戳，默认今天
  getTimestrap(date) {
    if (typeof date === 'number') return date
    const d = date ? new Date(date) : new Date()
    return d.setHours(0, 0, 0, 0)
  }
}