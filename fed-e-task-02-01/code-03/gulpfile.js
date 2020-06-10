// 实现这个项目的构建任务
const path = require('path')
const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')
const loadPlugins = require('gulp-load-plugins')
const minimist = require('minimist')
const Comb = require('csscomb')
const standard = require('standard')
const autoprefixer = require('autoprefixer')

const plugins = loadPlugins()
const bs = browserSync.create()
const argv = minimist(process.argv.slice(2))

const data = {
	menus: [
		{
			name: 'Home',
			icon: 'aperture',
			link: 'index.html'
		},
		{
			name: 'Features',
			link: 'features.html'
		},
		{
			name: 'About',
			link: 'about.html'
		},
		{
			name: 'Contact',
			link: '#',
			children: [
				{
					name: 'Twitter',
					link: 'https://twitter.com/w_zce'
				},
				{
					name: 'About',
					link: 'https://weibo.com/zceme'
				},
				{
					name: 'divider'
				},
				{
					name: 'About',
					link: 'https://github.com/zce'
				}
			]
		}
	],
	pkg: require('./package.json'),
	date: new Date()
}

const clean = () => {
	return del([ 'dist', 'temp' ])
}

const lint = (done) => {
	const comb = new Comb(require('./.csscomb.json'))
	comb.processPath('src')
	const cwd = path.join(__dirname, 'src')
	standard.lintFiles('src/assets/scripts/*.js', { cwd, fix: true }, done)
}

const style = () => {
	return src('src/assets/styles/*.scss', { base: 'src' })
		.pipe(plugins.sass({ outputStyle: 'expanded' }))
		.pipe(plugins.postcss(autoprefixer()))
		.pipe(dest('temp'))
		.pipe(bs.reload({ stream: true }))
}

const script = () => {
	return src('src/assets/scripts/*.js', { base: 'src' })
		.pipe(plugins.babel({ presets: [ '@babel/preset-env' ] }))
		.pipe(dest('temp'))
		.pipe(bs.reload({ stream: true }))
}

const page = () => {
	return src('src/*.html', { base: 'src' })
		.pipe(plugins.swig({ data }))
		.pipe(dest('temp'))
		.pipe(bs.reload({ stream: true }))
}

const image = () => {
	return src('src/assets/images/**', { base: 'src' }).pipe(plugins.imagemin()).pipe(dest('dist'))
}

const font = () => {
	return src('src/assets/fonts/**', { base: 'src' }).pipe(plugins.imagemin()).pipe(dest('dist'))
}

const extra = () => {
	return src('public/**', { base: 'public' }).pipe(dest('dist'))
}

const serve = () => {
	watch('src/assets/styles/*.scss', style)
	watch('src/assets/scripts/*.js', script)
	watch('src/*.html', page)
	// watch('src/assets/images/**', image)
	// watch('src/assets/fonts/**', font)
	// watch('public/**', extra)
	watch([ 'src/assets/images/**', 'src/assets/fonts/**', 'public/**' ], bs.reload)

	bs.init({
		notify: false,
		port: 1234,
		// files: 'dist/**',
		server: {
			baseDir: [ 'temp', 'src', 'public' ],
			routes: {
				'/node_modules': 'node_modules'
			}
		}
	})
}

const useref = () => {
	return src('temp/*.html', { base: 'temp' })
		.pipe(plugins.useref({ searchPath: [ 'temp', '.' ] }))
		.pipe(plugins.if(/\.js$/, plugins.uglify()))
		.pipe(plugins.if(/\.css$/, plugins.cleanCss()))
		.pipe(
			plugins.if(
				/\.html$/,
				plugins.htmlmin({
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: true
				})
			)
		)
		.pipe(dest('dist'))
}

const distServer = () => {
	bs.init({
		notify: false,
		port: argv.port === undefined ? 2080 : argv.port,
		open: argv.open === undefined ? false : argv.open,
		server: 'dist'
	})
}

const measure = () => {
	return src('**', { cwd: config.dest })
		.pipe(plugins.plumber())
		.pipe(plugins.size({ title: `${isProd ? 'Prodcuction' : 'Development'} mode build`, gzip: true }))
}

const upload = () => {
	return src('**', { cwd: config.dest })
		.pipe(plugins.plumber())
		.pipe(
			plugins.ghPages({ cacheDir: `temp/publish`, branch: argv.branch === undefined ? 'gh-pages' : argv.branch })
		)
}

const compile = parallel(style, script, page)
const build = series(clean, parallel(series(compile, useref), image, font, extra), measure)
const develop = series(compile, serve)
const start = series(build, distServer)
const deploy = series(build, upload)

module.exports = {
	clean,
	lint,
	serve,
	build,
	develop,
	start,
	deploy
}
