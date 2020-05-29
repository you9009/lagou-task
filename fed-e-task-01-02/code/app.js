const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

// 代码题1
// 数据
// horsepower 马力,dollar_value 价格, in_stock 库存
const cars = [
	{ name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
	{ name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
	{ name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
	{ name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
	{ name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
	{ name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]

// 练习1：使用函数组合 fp.flowRight() 重新实现下面这个函数
const isLast = (arr) => fp.last(arr)
const getKey = (obj) => fp.prop('in_stock', obj)

const f1 = fp.flowRight(getKey, isLast)
const n1 = f1(cars)
console.log('代码题1,练习1：', n1)
// 代码题1,练习1： false

// 练习2：使用 fp.flowRight()，fp.prop() 和 fp.first() 获取第一个 car 的 name
const isFirst = (arr) => fp.first(arr)
const getName = (obj) => fp.prop('name', obj)

const f2 = fp.flowRight(getName, isFirst)
const n2 = f2(cars)
console.log('代码题1,练习2：', n2)
// 代码题1,练习2： Ferrari FF

// 练习3：使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现
let _average = (xs) => fp.reduce(fp.add, 0, xs) / xs.length
let averageDollarValue = (cars) => _average(fp.map((car) => car.dollar_value, cars))
let n3 = averageDollarValue(cars)
console.log('代码题1,练习3：', n3)
// 代码题1,练习3： 790700

// 练习4：使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线链接的小写字符串，把数组中的 name 转换为这种形式：例如：sanitizeNames(["Hello World"])=>["hello_world"]
let _underscore = fp.replace(/\W+/g, '_')
const toUp = (arrs) => fp.map((i) => i.name.toUpperCase(), arrs)
const toJoin = (arrs) => fp.map((i) => _underscore(i), arrs)

const sanitizeNames = fp.flowRight(toJoin, toUp)
const n4 = sanitizeNames(cars)
console.log('代码题1,练习4：', n4)
// 代码题1,练习4： [
//   'FERRARI_FF',
//   '_SPYKER_C12_ZAGATO',
//   'JAGUAR_XKR_S',
//   'AUDI_R8',
//   'ASTON_MARTIN_ONE_77',
//   '_PAGANI_HUAYRA'
// ]


// 代码题2
// 练习1：使用 fp.add(x,y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1
let maybe = Maybe.of([ 5, 6, 1 ])
let ex1 = maybe.map((arrs) => fp.map((i) => fp.add(i, 1), arrs))
console.log('代码题2,练习1：', ex1)
// 代码题2,练习1： Maybe { _value: [ 6, 7, 2 ] }

// 练习2：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
let xs = Container.of([ 'do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do' ])
let ex2 = xs.map((i) => fp.first(i))
console.log('代码题2,练习2：', ex2)
// 代码题2,练习2： Container { _value: 'do' }

// 练习3：实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母
let safeProp = fp.curry((x, o) => Maybe.of(o[x]))
let user = { id: 2, name: 'Albert' }
let ex3 = safeProp('name', user).map((x) => fp.first(x))
console.log('代码题2,练习3：', ex3)
// 代码题2,练习3： Maybe { _value: 'A' }

// 练习4：使用 Maybe 重写 ex4，不要有 if 语句
let ex4 = function(n) {
	if (n) {
		return parseInt(n)
	}
}
const ex4_1 = Maybe.of('234').map((x) => parseInt(x))
console.log('代码题2,练习4：', ex4_1)
// 代码题2,练习4： Maybe { _value: 234 }
