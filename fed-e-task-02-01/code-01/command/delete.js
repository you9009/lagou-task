const fs = require('fs')

module.exports = (name) => {
	const delName = 'src/' + name + '.vue'
	if (fs.existsSync(delName)) {
		fs.unlink(delName, (err) => {
			if (err) throw err
			console.log("\033[32m 文件删除成功！ \033[0m")
		})
	} else {
		console.log("\033[31m 删除失败，当前文件不存在！ \033[0m")
	}
}
