const webpack = require('webpack')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
	entry: './src/main.js',
	output: {
		filename: '[name].[hash:8].js',
		path: path.join(__dirname, 'dist')
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		},
		extensions: [ '.js', '.jsx', '.json' ]
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
						outputPath: 'assets/images/'
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
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			title: require('./package.json').name,
			template: './public/index.html'
		}),
		new webpack.DefinePlugin({
			BASE_URL: JSON.stringify('/')
		}),
		new StyleLintPlugin({
			files: [ '**/*.{vue,htm,html,css,sss,less,scss,sass}' ]
		}),
		new webpack.ProgressPlugin((percentage, message, ...args) => {
			if (percentage == 1) {
				console.info(percentage, message, ...args)
			}
		})
	]
}
