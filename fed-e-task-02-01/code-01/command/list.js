const fs = require('fs')

module.exports = () => {
	if (!fs.existsSync('dist')) {
		fs.mkdir('dist', (err) => {
			if (err) throw err
		})
	}
	let list = fs.readdirSync('dist')
	console.log(list)
}
