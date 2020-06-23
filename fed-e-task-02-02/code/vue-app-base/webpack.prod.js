const common = require('./webpack.common')
const marge = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = marge(common, {
	mode: 'production',
	devtool: 'nosources-source-map',
	optimization: {
		minimize: true,
		minimizer: [ new TerserWebpackPlugin(), new OptimizeCssAssetsWebpackPlugin() ],
		splitChunks: {
			name: `vendors`,
			chunks: 'all',
			automaticNameDelimiter: '-'
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
			},
			{
				test: /\.less$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader' ]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [ 'public' ]
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].[hash:8].css'
		})
	]
})
