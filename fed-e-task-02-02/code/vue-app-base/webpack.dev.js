const webpack = require('webpack')
const path = require('path')
const common = require('./webpack.common')
const marge = require('webpack-merge')

module.exports = marge(common, {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		compress: true,
		port: '1234',
		hotOnly: true,
		open: true,
		stats: 'errors-only'
	},
	module: {
		rules: [
			{
				test: /\.(le|c)ss$/i,
				use: [ 'vue-style-loader', 'css-loader', 'less-loader' ]
			}
		]
	},
	plugins: [ new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin() ]
})
