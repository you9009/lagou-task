const fs = require('fs')

module.exports = () => {
	let list = fs.readdirSync('dist')
  console.log(list)
}
