# 作业
## Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化
## 一、简答题
### 1、请简述 Vue 首次渲染的过程。
**过程：**

- 首次渲染之前，进行vue的初始化，也就是初始化实例成员以及静态成员
   - 当初始化结束之后，调用构造函数，就是new Vue()
   - 在构造函数中，调用了构造函数this._init()，相当于整个vue的入口
- 在this._init()这个方法中，最终调用了vm.$mount()
- 第一个vm.$mount()是entry-runtime-with-compiler.js也就是入口文件所使用的，作用是把模板编译成render函数，过程是：
   - 先判断是否传入了render，如果没有的话，会去获取template选项，如果template也没有的话，会把el中的内容作为模板，然后把模板编译成render函数
   - 具体是通过compileToFunctions()生成的render()渲染函数
   - 当render函数编译好之后，会把render()函数存储到options.render中
   - 接下来就会调用到runtime/index.js中的，也就是第二个vm.$mount()
- 第二个vm.$mount()：
   - 重新获取el，因为如果是运行时版本的话，是不会执行这个入口的
- 接下来调用mountComponent(this,el)
   - mountComponent(this,el)是在lifecycle.js文件中定义的
   - 首先判断是否是render选择，如果没有，但是传入了模板，并且当前是开发环境的话，会发送警告，警告运行时版本不支持编译器。
   - 触发生命周期函数beforeMount
   - 定义updateComponent
      - 在当前函数中调用render和update这两个方法
      - render方法是生成虚拟dom
      - update方法是虚拟dom转换成真实dom，并且挂载到页面上
   - 创建watcher实例
      - 创建watcher的时候，传入了updateComponent函数
      - 调用get()方法
         - 当创建完watcher时会调用一次get方法
         - 在get方法中，会调用updateComponent()
         - 在updateComponent()中会调用，render和update方法
         - 在render方法中，最终调用了用户传入的render，或者我们把模板编译生成的render()
         - 最终会把生成的虚拟dom，也就是生成的vnode，返回
         - 最后在调用vm._update(vnode...),中调用了vm.__patch__(vm.$el,vnode)方法，用于把虚拟dom转换成真实dom，并且挂在到页面上，把我们生成的真实dom，设置到vm.$el中
   - watcher对象创建完毕之后，触发生命周期函数mounted，于是挂载结束
   - 最终返回vue示例：return vm



### 2、请简述 Vue 响应式原理。
**原理：**

- 首先从vue示例中的init方法开始的：
   - 在init方法中首先调用initState(),初始化vue示例的状态
   - 在initState方法中调用了initdata()，把data属性注入到vue实例上，并且调用observe()
   - observe()是把data对象转换成响应式对象，observe()是响应式的入口
- observe(value)，接收一个参数，这个参数就是响应式需要处理的对象，功能是：
   - 首先判断value是否是对象，如果不是直接返回
   - 判断value对象是否有__ob__，如果有，说明这个对象之前已经做过响应化的处理，直接返回
   - 如果没有，为这个对象创建observer对象，功能：
      - 首先，为当前的value对象定义不可枚举的__ob__属性，并且把当前observer对象记录到__ob__中来，
      - 然后进行数组的响应式处理：设置数组中的特殊方法，这些方法调用时，需要发送通知，发送通知时，是找到数组对象对应的__ob__，也就是observer对象，在找到observer对象的dep，调用的dep的notify方法，调用完数组中的方法之后，是遍历数组中的每一个成员，对每一个成员再去调用observe人，如果这个成员是对象的话，也会把这个对象转换成响应式对象。
      - 对象的响应式处理，调用walk方法：如果当前value是对象的话，此时调用walk方法：
         - 遍历这个对象的所有属性 ，对每一个属性调用defineReactive
   - 最后把observer返回
- defineReactive，功能：
   - 为每一个属性创建dep对象，让dep去收集依赖
      - 首先在watcher对象的get方法中调用pushTarget记录Dep.target属性
      - 访问date中的成员的时候收集依赖，defineReactive的getter中收集依赖
      - 把属性对应的watcher对象添加到dep的subs数组中,为属性收集依赖
      - 给childOb收集依赖，目的是子对象添加和删除成员时发送通知
   - 如果当前的值是对象，会调用observe，也就是如果当前属性的值是对象，就是把这个对象也转换成响应式对象
   - 核心：定义getters和setter
      - getters：
         - 收集依赖，为每一个属性收集依赖，如果这个属性是对象，也需要为子对象收集依赖，在getter中，最终返回属性的值
      - setter：
         - 首先保存新值，如果新值是对象的话，需要调用observe，把新设置的对象也转换成相应式的对象
         - 数据发生变化时，发送通知，调用dep.notify()方法
- watcher数据发生变化时：
   - 通过dep.nitify发送通知，在调用watcher对象的update方法
   - queueWatcher()判断watcher是否被处理，如果没有的话添加queue队列中，并调用刷新任务队列的函数flushSchedulerQueue()
   - flushScheduleQueue
      - 触发beforeUpdate钩子函数
      - 并调用wacher.run
         - run()-->get()-->getter()-->updateComponent
      - 清空上一次的依赖
      - 触发actived钩子函数
      - 触发update钩子函数


### 3、请简述虚拟 DOM 中 Key 的作用和好处。
**作用：**
在v-for的过程中给每一个节点，设置key属性，以便能跟踪每一个节点的身份，从而重用和重新排序现有元素

**好处：**
主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

### 4、请简述 Vue 中模板编译的过程。
**过程：编译的过程中，标记根节点，对静态根节点进行优化处理，重新渲染的时候不需要再处理静态根节点，因为不会改变。**

- 入口函数：compileToFunctions(template...）
   - 内部先从缓存中，加载编译好的渲染函数：render函数
   - 如果缓存中没有的话，调用complie(template, options)
- 合并选项：complie(template, options)
   - 先合并选项
   - 再去调用baseCompile(template.trim0,finalOptions)编译模板
- 模板编译核心：baseCompile(template.trim0,finalOptions)
   - parse()：把template模板转换成AST tree，也就是抽象语法树
   - optimize()：对抽象语法数进行优化
      - 标记静态语法数AST tree中的所有静态根节点：sub trees
      - 检测到静态子树，设置为静态，不需要再每次重新渲染的时候重新生成节点
      - patch阶段跳过静态子树
   - generate()：AST tree生成js的创建代码
- compileToFunctions(template..)：以上编译后回到此处
   - 继续把上一步中生成的字符串形式js代码转换为函数
   - createFunction()
   - render和staticRenderFns初始化完毕，挂载到vue示例的options对应的属性中
