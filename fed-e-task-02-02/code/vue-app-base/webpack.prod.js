const webpack = require('webpack')
const common = require('./webpack.common')
const marge = require('webpack-merge')

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
			chunks: 'async',
			automaticNameDelimiter: '-',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial',
					name: 'vendors'
				},
				'async-vendors': {
					test: /[\\/]node_modules[\\/]/,
					minChunks: 2,
					chunks: 'async',
					name: 'async-vendors'
				}
			}
		},
		runtimeChunk: { name: 'manifest' }
	},
	module: {
		rules: [
			{
				test: /\.(le|c)ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: true,
							reloadAll: true
						}
					},
					'css-loader',
					'less-loader'
				]
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [ 'public' ]
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash:8].css'
		}),
		new webpack.NoEmitOnErrorsPlugin()
	]
})
