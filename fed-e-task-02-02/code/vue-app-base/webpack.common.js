const webpack = require('webpack')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: './src/main.js',
	output: {
		filename: '[name].[hash:8].js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /.css$/,
				use: [ 'vue-style-loader', 'css-loader' ]
			},
			{
				test: /.less$/,
				use: [ 'vue-style-loader', 'css-loader', 'less-loader' ]
			},
			{
				test: /.(png|jpe?g|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10 * 1024
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			},
			{
				test: /.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
}
