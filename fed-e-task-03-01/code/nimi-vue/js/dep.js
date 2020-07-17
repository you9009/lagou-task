class Dep {
  constructor () {
    // 储存所有的观察者
    this.subs = []
  }

  // 添加观察者
  addSubs (sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 发送通知
  notify () {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
