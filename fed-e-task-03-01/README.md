# 作业

## 一、简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么?
```javascript
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```
解答：不是响应式数据
内部原理是：Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property。或者使用全局 Vue.set 方法的别名vm.$set 实例方法实现。有时你可能需要为已有对象赋值多个新 property，比如使用 Object.assign() 或 _.extend()。但是，这样添加到对象上的新 property 不会触发更新。在这种情况下，你应该用原对象与要混合进去的对象的 property 一起创建一个新的对象。如下：
```javascript
this.dog = Object.assign({}, this.dog, { name: 'Trump' })
```

### 2、请简述 Diff 算法的执行过程
diff算法的核心是调用patch，patch接收oldVnode和vnode两个参数，对比两个Vnode是否相同，通过节点的key值，不是相同的节点，重新渲染。是相同节点，判断Vnode中是否有文本，有文本且与oldVnode不同，更新文本。新的Vnode中包含children，需要判断子节点是否有变化，则执行updateChildren函数比较子节点。
 
## 二、编程题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
代码地址：code/vue-router 

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
代码地址：code/nimi-router
 
### 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：
![](https://cdn.nlark.com/yuque/0/2020/png/243369/1594887589159-916887a8-2883-49b8-afe3-ff5fe1ab62a5.png#align=left&display=inline&height=705&margin=%5Bobject%20Object%5D&originHeight=705&originWidth=1278&size=0&status=done&style=none&width=1278)<br />
代码地址：code/snabbdom
