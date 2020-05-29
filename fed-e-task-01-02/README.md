## 作业

### 简答题

- **描述引用计数的工作原理和优缺点**

工作原理：

  - 核心思想：设置引用数，判断当前引用数是否为0
  - 引用计数器
  - 引用关系改变时修改引用数字
  - 引用数字为0时立即回收

优点：

  - 发现垃圾时立即回收
  - 最大限度减少程序暂停

缺点：

  - 无法回收循环引用的对象
  - 时间开销大/资源消耗大

<br />

- **描述标记整理算法的工作原理**

工作原理：

  - 标记整理可以看做是标记清除的增强
  - 标记阶段的操作和标记清除一致
  - 清除阶段会闲执行整理，移动对象位置**

<br />

- **描述V8中新生代存储区垃圾回收的流程**

答：

  - 新生代内存区分为二个等大小空间
  - 回收过程采用复制算法+标记整理
  - 使用空间From，空闲空间为To
  - 活动对象存储于From空间
  - 标记整理后将活动对象拷贝至To
  - From与To交换空间完成释放

<br />

- **描述增量标记算法在何时使用，及工作原理**

使用：

  - 页面出现延迟加载或经常性暂停
  - 页面持续性出现糟糕的性能
  - 页面的性能随时间延长越来越差

工作原理：将标记的过程拆分成很多部分，每次只标记一小部分，然后恢复业务代码的执行，再标记，循环交替执行标记。这样原来应用程序卡顿的整个时间就会变分拆成多个细小的时间片，会极大的提高应用程序的响应度。<br />

### 代码题1
基于以下代码完成下面的四个练习
```javascript
const fp = require('lodash/fp')
// 数据
// horsepower 马力,dollar_value 价格, in_stock 库存
const cars = [
	{ name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
	{ name: ' Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
	{ name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
	{ name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
	{ name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
	{ name: ' Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]
```
**<br />**练习1：**使用函数组合 fp.flowRight() 重新实现下面这个函数
```javascript
let isLastInStock = function(cars) {
	// 获取最后一条数据
	let last_car = fp.last(cars)
	// 获取最后一条数据的in_stock属性值
	return fp.prop('in_stock', last_car)
}
```
```javascript
const isLast = (arr) => fp.last(arr)
const getKey = (obj) => fp.prop('in_stock', obj)

const f = fp.flowRight(getKey, isLast)
const n1 = f(cars)
console.log(n1)
// false
```
**<br />**练习2：**使用 fp.flowRight()，fp.prop() 和 fp.first() 获取第一个 car 的 name
```javascript
const isFirst = (arr) => fp.first(arr)
const getKey = (obj) => fp.prop('name', obj)

const f = fp.flowRight(getKey, isFirst)
const n2 = f(cars)
console.log(n2)
// Ferrari FF
```


**练习3：**使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现
```javascript
let _average = function(xs) {
	return fp.reduce(fp.add, 0, xs) / xs.length
}
// <- 无须改动

let averageDollarValue = function(cars) {
	let dollar_values = fp.map(function(car) {
		return car.dollar_value
	}, cars)
	return _average(dollar_values)
}
```
```javascript
let _average = (xs) => fp.reduce(fp.add, 0, xs) / xs.length
let averageDollarValue = (cars) => _average(fp.map((car) => car.dollar_value, cars))
let n3 = averageDollarValue(cars)
console.log(n3)
// 790700
```
**练习4：**使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线链接的小写字符串，把数组中的 name 转换为这种形式：例如：sanitizeNames(["Hello World"])=>["hello_world"]
```javascript
let _underscore = fp.replace(/\W+/g, '_')
// <-无须改动，并在sanitizeNames中使用它
```
```javascript
let _underscore = fp.replace(/\W+/g, '_')
const toUp = (arrs) => fp.map((i) => i.name.toUpperCase(), arrs)
const toJoin = (arrs) => fp.map((i) => _underscore(i), arrs)

const sanitizeNames = fp.flowRight(toJoin, toUp)
const n4 = sanitizeNames(cars)
console.log(n4)
// [
//   'FERRARI_FF',
//   'SPYKER_C12_ZAGATO',
//   'JAGUAR_XKR_S',
//   'AUDI_R8',
//   'ASTON_MARTIN_ONE_77',
//   'PAGANI_HUAYRA'
// ]
```

### 代码题2
基于下面提供的代码，完成后续的四个练习
```javascript
// support.js
class Container {
	static of(value) {
		return new Container(value)
	}
	constructor(value) {
		this._value = value
	}
	map(fn) {
		return Container.of(fn(this._value))
	}
}

class Maybe {
	static of(x) {
		return new Maybe(x)
	}
	isNothing() {
		return this._value === null || this._value === undefined
	}
	constructor(x) {
		this._value = x
	}
	map(fn) {
		return this.isNothing() ? this : Maybe.of(fn(this._value))
	}
}

module.exports = {
	Maybe,
	Container
}
```
**<br />**练习1：**使用 fp.add(x,y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1
```javascript
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let maybe = Maybe.of([ 5, 6, 1 ])
let ex1 = '' //···你需要实现的位置
```
```javascript
let ex1 = maybe.map((arrs) => fp.map((i) => fp.add(i, 1), arrs))
console.log(ex1)
// Maybe { _value: [ 6, 7, 2 ] }
```
**练习2：**实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
```javascript
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let xs = Container.of([ 'do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do' ])
let ex2 = '' // ···你需要实现的位置
```
```javascript
let ex2 = xs.map((i) => fp.first(i))
console.log(ex2)
// Container { _value: 'do' }
```
**练习3：**实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母
```javascript
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let safeProp = fp.curry(function(x, o) {
	return Maybe.of(o[x])
})

let user = { id: 2, name: 'Albert' }
let ex3 = '' // ···你需要实现的位置
```
```javascript
let ex3 = safeProp('name', user).map((x) => fp.first(x))
console.log(ex3)
// Maybe { _value: 'A' }
```
**练习4：**使用 Maybe 重写 ex4，不要有 if 语句
```javascript
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let ex4 = function(n) {
	if (n) { return parseInt(n) }
}
```
```javascript
const ex4_1 = Maybe.of('234').map((x) => parseInt(x))
console.log(ex4_1)
// Maybe { _value: 234 }
```
