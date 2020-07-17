const webpack = require('webpack')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist')
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		},
		extensions: [ '.js', '.vue' ]
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/i,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10 * 1024,
						esModule: false,
						name: 'img/[name].[hash:8].[ext]'
					}
				}
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
				use: [
					'eslint-loader',
					{
						loader: 'babel-loader?cacheDirectory',
						options: {
							presets: [ '@babel/preset-env' ]
						}
					}
				]
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
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			BASE_URL: JSON.stringify('/')
		}),
		new HtmlWebpackPlugin({
			title: require('./package.json').name,
			template: path.join(__dirname, 'public/index.html'),
			inject: true
		}),
		new StyleLintPlugin({
			files: [ 'src/**/*.{vue,htm,html,css,sss,less,scss,sass}' ]
		}),
		new webpack.ProgressPlugin((percentage, message, ...args) => {
			if (percentage == 1) {
				console.info(percentage, message, ...args)
			}
		})
	]
}
