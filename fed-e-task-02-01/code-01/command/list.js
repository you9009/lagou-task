const fs = require('fs')

module.exports = () => {
	let list = fs.readdirSync('src')
  console.log(list)
}
