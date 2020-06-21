const common = require('./webpack.common')
const marge = require('webpack-merge')

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = marge(common, {
	mode: 'production',
	devtool: 'nosources-source-map',
	plugins: [
		new CopyWebpackPlugin({
			patterns: [ 'public' ]
		})
	]
})
