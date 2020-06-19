# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

serve: 请使用 Webpack Dev Server 实现此任务
build: 请使用 Webpack 实现此任务
lint: 请使用 ESLint 实现此任务

webpack
webpack-cli
webpack-dev-server
webpack-merge

eslint
babel-eslint
eslint-loader
eslint-plugin-vue
@vue/cli-plugin-babel

babel-loader
@babel/core
@babel/preset-env

vue-loader
vue-style-loader
vue-template-compiler

<!-- stylelint 支持在 Vue 单文件组件的样式部分的代码校验。 -->
stylelint
stylelint-webpack-plugin

less-loader
css-loader
style-loader

file-loader
url-loader

html-webpack-plugin
copy-webpack-plugin
clean-webpack-plugin
mini-css-extract-plugin
