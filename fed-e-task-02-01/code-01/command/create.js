const fs = require('fs')
const path = require('path')

const args = process.argv.splice(2)
const componentName = args[1]

let template = fs.readFileSync(path.join(__dirname, './temp.vue'), 'utf8')
let content = template.replace(/componentName/g, componentName)

module.exports = (name) => {
	if (!fs.existsSync('dist')) {
		fs.mkdir('dist', (err) => {
			if (err) throw err
		})
	}

	if (fs.existsSync('dist/' + name + '.vue')) {
		console.log("\033[31m 创建失败，当前文件已存在！ \033[0m")
	} else {
		fs.writeFile('dist/' + name + '.vue', content, (err) => {
			if (err) throw err
			console.log("\033[32m 文件创建成功! \033[0m")
		})
	}
}
