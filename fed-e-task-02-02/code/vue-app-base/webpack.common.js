const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
		filename: 'assets/js/[name].[hash:8].js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
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
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			BASE_URL: JSON.stringify('/')
		})
	]
}
