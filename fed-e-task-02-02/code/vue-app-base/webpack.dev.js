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
		hot: true,
		open: true
	},
	plugins: []
})
