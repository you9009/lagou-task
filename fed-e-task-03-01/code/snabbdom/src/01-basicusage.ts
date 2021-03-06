import { h, init } from 'snabbdom'

// 1.hello world
// 参数：数组，模块
// patch是核心函数
// 返回值：patch函数，作用对比两个VNode的差异更新到真实DOM
let patch = init([])

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串的话，就是标签中的内容
let vnode = h('div#level.cls', 'hello world')
let app = document.querySelector('#app')
// 第一个参数：可以是DOM，内部会把DOM元素转换成VNode
// 第二个参数：VNode
// 返回值：VNode
let oldVnode = patch(app, vnode)

// 假设的时刻
vnode = h('div', 'this is new')
patch(oldVnode, vnode)
