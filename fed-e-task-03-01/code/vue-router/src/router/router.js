let _Vue = null

export default class VueRouter {
  // 构造函数
  constructor (options) {
    this.options = options
    this.mode = this.options.mode
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  static install (Vue) {
    // 1.判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2.把Vue构造函数记录到全局变量
    _Vue = Vue
    // 3.把创建Vue示例时候传入的router对象注入到vue实例上
    // 混入
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue, this.mode)
    this.initEvent()
  }

  createRouteMap () {
    // 遍历所有的路由规则，把路由规则解析成键值对的形式，存储到routeMap中
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component
    })
  }

  // 注册全局事件
  initComponents (Vue, mode) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h(
          'a',
          {
            attrs: {
              href: this.to
            },
            on: {
              click: this.clickHandler
            }
          },
          [this.$slots.default]
        )
      },
      methods: {
        clickHandler (e) {
          if (mode === 'hash') {
            location.hash = this.to
          }
          if (mode === 'history') {
            history.pushState({}, '', this.to)
          }
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
      // template: '<a :href="to"><slot></slot></a>'
    })

    const self = this
    Vue.component('router-view', {
      render (h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  // 模拟路由
  initEvent () {
    if (this.mode === 'history') {
      window.addEventListener('popstate', () => {
        this.data.current = window.location.pathname
      })
    }
    if (this.mode === 'hash') {
      if (!location.hash) {
        location.hash = '/'
      }
      window.addEventListener('hashchange', () => {
        this.data.current = window.location.hash.slice(1)
      })
    }
  }
}
