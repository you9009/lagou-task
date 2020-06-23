const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	mode: 'none',
	entry: './src/main.js',
	output: {
		filename: 'assets/js/[name].[hash:8].js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10 * 1024,
						esModule: false,
						name: '[name].[hash:8].[ext]',
						outputPath: 'assets/img/'
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'eslint-loader',
					{
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env' ]
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [ 'vue-style-loader', 'css-loader' ]
			},
			{
				test: /\.less$/,
				use: [ 'vue-style-loader', 'css-loader', 'less-loader' ]
			},
			{
				test: /\.vue$/,
				use: {
					loader: 'vue-loader',
					options: {
						transformAssetUrls: {
							video: [ 'src', 'poster' ],
							source: 'src',
							img: 'src',
							image: [ 'xlink:href', 'href' ],
							use: [ 'xlink:href', 'href' ]
						}
					}
				}
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			title: require('./package.json').name,
			template: './public/index.html'
		}),
		new webpack.DefinePlugin({
			BASE_URL: JSON.stringify('/')
		})
	]
}
