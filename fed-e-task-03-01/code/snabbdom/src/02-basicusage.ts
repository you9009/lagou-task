// div中方式子元素h1,p

// 1.映入依赖库
import { h, init } from 'snabbdom'

// 2.初始化项目
let patch = init([])

// 创建节点
let vnode = h('div.level-02', [
  h('h1','hello h1'),
  h('p','hello p')
])

// 3.获取占位
let app = document.querySelector('#app')

// 4.渲染页面
let oldvnode = patch(app, vnode)

// 模拟2秒后更新数据
setTimeout(() => {
  vnode = h('div.level-02', [
    h('h1', 'this is new h1'),
    h('p','this is new p')
  ])
  patch(oldvnode, vnode)

  // 2秒后清空页面上的内容
  patch(oldvnode, h('!'))
}, 2000);
