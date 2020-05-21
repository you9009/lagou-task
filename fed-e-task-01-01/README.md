### 第一题. 请说出下列做种的执行结果，并解释为什么？
```js
var a = []
for (var i = 0; i < 10; i++) {
	a[i] = function() {
		console.log(i)
	}
}

a[6]()
```
*最终执行结果为：* 打印出 10
*原因：* i执行完后为9，此时i任小于10，变量提升，执行i++，得到i=10,所以无论a的索为任意值，i打印结果都为10。

---

### 第二题. 请说出下列做种的执行结果，并解释为什么？
```js
var tmp = 123
if (true) {
	console.log(tmp)
	let tmp
}
```
*最终执行结果为：* 打印出 ReferenceError: Cannot access 'tmp' before initialization。
*原因：* 在ES6中如果使用let或const声明变量，那么一对大括号界定的区域就是块级作用域，并且变量不存在提升的可能性

---

### 第三题. 结合ES6新语法，用最简单的方式找出数组中的最小值？
```js
var arr = [12, 34, 32, 89, 4]
```
*最终执行结果为：* 打印出 4
*原因：* 利用内置对象方法：Math.min和展开运算符，代码如下：
```js
var arr = [12, 34, 32, 89, 4]
var min = Math.min(...arr)
console.log(min)
```

---

### 第四题. 请详细说明 var, let, const 三种声明变量的方式之间的具体差别？
*答：*
- var 声明语句声明一个变量，并可选地将其初始化为一个值。无论发生在何处，都在执行任何代码之前进行处理。用 var 声明的变量的作用域是它当前的执行上下文，它可以是嵌套的函数，或者对于声明在任何函数外的变量来说是全局。如果你重新声明一个 JavaScript 变量，它将不会丢失其值。当赋值给未声明的变量, 则执行赋值后, 该变量会被隐式地创建为全局变量（它将成为全局对象的属性）。
- let 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。允许你声明一个作用域被限制在块级中的变量、语句或者表达式。与 var 关键字不同的是， var声明的变量只能是全局或者整个函数块的。 var 和 let 的不同之处在于后者是在编译时才初始化。就像const 一样，let不会在全局声明时（在最顶部的范围）创建window 对象的属性。
- const 声明的常量是块级作用域，很像使用 let 语句定义的变量。常量的值不能通过重新赋值来改变，并且不能重新声明。声明的常量，其作用域可以是全局或本地声明的块。 与var变量不同，全局常量不会变为窗口对象的属性。需要一个常数的初始化器；也就是说，您必须在声明的同一语句中指定它的值（这是有道理的，因为以后不能更改）。const声明创建一个值的只读引用。但这并不意味着它所持有的值是不可变的，只是变量标识符不能重新分配。例如，在引用内容是对象的情况下，这意味着可以改变对象的内容（例如，其参数）。

---

### 第五题. 请说出下列代码最终输出的结果，并解释为什么？
```js
var a = 10
var obj = {
	a: 20,
	fn() {
		setTimeout(() => {
			console.log(this.a)
		})
	}
}
obj.fn()
```
*最终执行结果为：* 打印出 20
*原因：* 箭头函数表达式没有自己的this，它只会从自己的作用域链的上一层继承this，即20

---

### 第六题. 简述 symbol 类型的用途？
*答：* 是一种基本数据类型 （primitive data type）。Symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。在ES5中，对象属性名都是字符串容易造成属性名冲突。为了避免这种情况的发生，ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。

---

### 第七题. 说说什么是浅拷贝，什么是深拷贝？
*答：*
- 浅拷贝：复制一层对象的属性，并不包括对象里面的为引用类型的数据，当改变拷贝的对象里面的引用类型时，源对象也会改变。
- 深拷贝：重新开辟一个内存空间，需要递归拷贝对象里的引用，直到子属性都为基本类型。两个对象对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性。

---

### 第八题. 谈谈你是如何理解JavaScript异步编程的，Event Loop 是做什么的，什么是宏任务，什么是微任务？
*答：*
- JavaScript异步编程：异步(async)是相对于同步(sync)而言的，同步就是一件事一件事的执行。只有前一个任务执行完毕，才能执行后一个任务。而异步是不用等待前一个任务执行完成也能够执行。
- Event Loop：即事件循环，是指浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。浏览器中的Event Loop指的是Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。
- 宏任务（MacroTask）：可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行），指script全部代码、setTimeout、setInterval、setImmediate（浏览器暂时不支持，只有IE10支持，具体可见MDN）、I/O、UI Rendering。
- 微任务（MicroTask）：可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前task任务后，下一个task之前，在渲染之前，指Process.nextTick（Node独有）、Promise、Object.observe(废弃)、MutationObserver。

---

### 第九题. 将下面异步代码使用Promise 改进？
```js
setTimeout(function() {
	var a = 'hello'
	setTimeout(function() {
		var b = 'lagou'
		setTimeout(function() {
			var c = 'I ❤ U'
			console.log(a + b + c)
		}, 10)
	}, 10)
}, 10)
```
*答：* 代码如下：
```js
const ajax = (url) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest()
		xhr.responseType = 'json'
		xhr.open('GET', url)
		xhr.onload = () => {
			if (xhr.status === 200) {
				resolve(xhr.response)
			} else {
				reject(new Error(xhr.statusText))
			}
		}
		xhr.send()
	})
}

ajax('./arr.json')
	.then((res) => {
		return ajax('./arr.json').then((e) => {
			return res[0] + ' ' + e[1]
		})
	})
	.then((res) => {
		return ajax('./arr.json').then((e) => {
			return res + ' ' + e[2]
		})
	})
	.then((res) => {
		console.log(res)
	})
// hello lagou I ❤ U

// src/arr.json
[ "hello", "lagou", "I ❤ U"]
```

---

### 第十题. 请简述TypeScript与JavaScript之间的关系？
*答：*
- JavaScript 是一种脚本，一门编程语言，它可以在网页上实现复杂的功能，网页展现给你的不再是简单的静态信息，而是实时的内容更新，交互式的地图，2D/3D 动画，滚动播放的视频等等。
- TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个严格超集，并添加了可选的静态类型和使用看起来像基于类的面向对象编程语法操作 Prototype。
- 关系 TypeScript是由 JavaScript + 类型系统 + ES6组成，并且编译后的文件依旧是JavaScript。

---

### 第十一题. 请谈谈你所认为的TypeScript优缺点？
*答：*
优点：
- 兼容性好，拥抱了 ES6 规范，支持到ES3
- 增加了代码的可读性和可维护性
- 任何一种 JavaScript 运行环境都支持
- 功能更为强大，生态也更健全，更完善
- 渐进式

缺点：
- 语言本身多了很多概念
- 学习成本大
- 项目初期，会增加一些成本
- 可能和一些库结合的不是很完美
