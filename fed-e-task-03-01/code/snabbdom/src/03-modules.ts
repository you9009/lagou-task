// 1.导入模块
// 2.注册模块
// 3.使用h()函数的第二个参数传入模块需要的数据（对象）

import { h, init } from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

let patch = init([ style, eventlisteners ])

let vnode = h(
	'div',
	{
		style: {
			backgroundColor: 'red'
		},
		on: {
			click: eventHandler
		}
	},
	[ h('h1', 'this is h1'), h('p', 'this is p') ]
)

function eventHandler() {
	console.log('这里是点击事件')
}

let app = document.querySelector('#app')

patch(app, vnode)
