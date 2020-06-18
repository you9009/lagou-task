
# 作业
## 一、简答题
### 1、Webpack 的构建流程主要有哪些环境？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
mode：

- **development**：默认值，启用 NamedChunksPlugin 和 NamedModulesPlugin
- **production**：启用 FlagDependencyUsagePlugin ， FlagIncludedChunksPlugin ， ModuleConcatenationPlugin ， NoEmitOnErrorsPlugin ， OccurrenceOrderPlugin ， SideEffectsFlagPlugin 和 TerserPlugin 
- **none**：不做任何优化


<br />以下来自[Webpak官网](https://webpack.docschina.org/concepts/)：<br />**概念：**<br />本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle，<br />**配置文件的核心概念：**

- **入口(entry)**：告诉webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
- **输出(output)**：告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。
   - filename：设置输出文件的文件名
   - path： 指定filename所在的目录
- **loader**：让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中。
   - test 属性，识别出哪些文件会被转换。
   - use 属性，定义出在进行转换时，应该使用哪个 loader。
- **插件(plugins)**：打包优化，资源管理，注入环境变量。
- **模式(mode)**：通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 production。
- **浏览器兼容性(browser compatibility)**：webpack 支持所有符合 ES5 标准 的浏览器（不支持 IE8 及以下版本）。webpack 的 import() 和 require.ensure() 需要 Promise。不支持旧版本浏览器。



### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
**答：**loader负责资源文件从输入到输出的转换，并且对于同一个资源可以一次进行使用多个loader，plugin目的在于解决 loader无法实现的其他事，如：打包优化，资源管理，注入环境变量等。<br />**<br />**开发思路：**

- loader：根据需求对source进行转换，并返回相应的JavaScript代码
- plugin：通过钩子机制实现，类似于事件，根据所需要实现的功能使用生命周期中的钩子，挂载函数实现扩展。



## 二、编程题
### 1、使用 Webpack 实现 Vue 项目打包任务
具体任务及说明：<br />
<br />先下载任务的基础代码：[https://github.com/lagoufed/fed-e-001/raw/master/tasks/02-02-base-code.zip](https://github.com/lagoufed/fed-e-001/raw/master/tasks/02-02-base-code.zip)<br />
<br />这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构<br />
<br />有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）<br />
<br />这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务<br />
<br />尽可能的使用上所有你了解到的功能和特性<br />
<br />**作业要求**<br />本次作业的中的编程题要求大家完成相应代码过后，录制一个小视频简单介绍一下实现思路，演示一下相应功能。最终将录制的视频和代码统一提交至作业仓库。
