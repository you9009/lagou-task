const path = require('path')
const gulp = require('gulp')

const del = require('del')
const Comb = require('csscomb')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const standard = require('standard')
const browserSync = require('browser-sync')

const gulpLoadPlugins = require('gulp-load-plugins')
const minimist = require('minimist')

const data = {
	menus: [
		{
			name: 'Home',
			icon: 'aperture',
			link: 'index.html'
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

const config = {
	src: 'src',
	dest: 'dist',
	public: 'public',
	temp: 'temp',
	paths: {
		pages: '**/*.html',
		styles: 'assets/styles/**/*.scss',
		scripts: 'assets/scripts/**/*.js',
		images: 'assets/images/**/*.{jpg,jpeg,png,gif,svg}',
		fonts: 'assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'
	}
}

const Plugins = gulpLoadPlugins()
const bs = browserSync.create()
const argv = minimist(process.argv.slice(2))
const isProd = process.env.NODE_ENV ? process.env.NODE_ENV === 'production' : argv.production || argv.prod || false

const clean = () => {
	return del([ config.temp, config.dest ])
}

const cleanTemp = () => {
	return del([ config.temp ])
}

const lint = (done) => {
	const comb = new Comb('csscomb')
	comb.processPath(config.src)
	const cwd = path.join(__dirname, config.src)
	standard.lintFiles(config.paths.scripts, { cwd, fix: true }, done)
}

const style = () => {
	return gulp
		.src(config.paths.styles, { cwd: config.src, base: config.src, sourcemaps: !isProd })
		.pipe(Plugins.plumber({ errorHandler: Plugins.sass.logError }))
		.pipe(Plugins.sass.sync({ outputStyle: 'compressed', precision: 10, includePaths: [ '.' ] }))
		.pipe(Plugins.postcss([ autoprefixer() ]))
		.pipe(gulp.dest(config.temp, { sourcemaps: '.' }))
		.pipe(bs.reload({ stream: true }))
}

const script = () => {
	return gulp
		.src(config.paths.scripts, { cwd: config.src, base: config.src, sourcemaps: !isProd })
		.pipe(Plugins.plumber())
		.pipe(Plugins.babel({ presets: [ '@babel/preset-env' ] }))
		.pipe(gulp.dest(config.temp, { sourcemaps: '.' }))
		.pipe(bs.reload({ stream: true }))
}

const page = () => {
	return gulp
		.src(config.paths.pages, { cwd: config.src, base: config.src, ignore: [ '{layouts,partials}/**' ] })
		.pipe(Plugins.plumber())
		.pipe(Plugins.swig({ defaults: { cache: false, locals: data } }))
		.pipe(gulp.dest(config.temp))
}

const useref = () => {
	const beautifyOpts = { indent_size: 2, max_preserve_newlines: 1 }
	const uglifyOpts = { compress: { drop_console: true } }
	const postcssOpts = [ cssnano({ safe: true, autoprefixer: false }) ]
	const htmlminOpts = {
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true,
		processConditionalComments: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true
	}

	return gulp
		.src(config.paths.pages, { cwd: config.temp, base: config.temp })
		.pipe(Plugins.plumber())
		.pipe(Plugins.useref({ searchPath: [ '.', '..' ] }))
		.pipe(Plugins.if(/\.js$/, Plugins.if(isProd, Plugins.uglify(uglifyOpts), Plugins.beautify.js(beautifyOpts))))
		.pipe(
			Plugins.if(/\.css$/, Plugins.if(isProd, Plugins.postcss(postcssOpts), Plugins.beautify.css(beautifyOpts)))
		)
		.pipe(
			Plugins.if(/\.html$/, Plugins.if(isProd, Plugins.htmlmin(htmlminOpts), Plugins.beautify.html(beautifyOpts)))
		)
		.pipe(gulp.dest(config.dest))
}

const image = () => {
	return gulp
		.src(config.paths.images, { cwd: config.src, base: config.src, since: gulp.lastRun(image) })
		.pipe(Plugins.plumber())
		.pipe(Plugins.if(isProd, Plugins.imagemin()))
		.pipe(gulp.dest(config.dest))
}

const font = () => {
	return gulp
		.src(config.paths.fonts, { cwd: config.src, base: config.src })
		.pipe(Plugins.plumber())
		.pipe(Plugins.if(isProd, Plugins.imagemin()))
		.pipe(gulp.dest(config.dest))
}

const extra = () => {
	return gulp.src('**', { cwd: config.public, base: config.public, dot: true }).pipe(gulp.dest(config.dest))
}

const measure = () => {
	return gulp
		.src('**', { cwd: config.dest })
		.pipe(Plugins.plumber())
		.pipe(Plugins.size({ title: `${isProd ? 'Prodcuction' : 'Development'} mode build`, gzip: true }))
}

const upload = () => {
	return gulp.src('**', { cwd: config.dest }).pipe(Plugins.plumber()).pipe(
		Plugins.ghPages({
			cacheDir: `${config.temp}/publish`,
			branch: argv.branch === undefined ? 'gh-pages' : argv.branch
		})
	)
}

const devServer = () => {
	gulp.watch(config.paths.styles, { cwd: config.src }, style)
	gulp.watch(config.paths.scripts, { cwd: config.src }, script)
	gulp.watch(config.paths.pages, { cwd: config.src }, page)
	gulp.watch([ config.paths.images, config.paths.fonts ], { cwd: config.src }, bs.reload)
	gulp.watch('**', { cwd: config.public }, bs.reload)

	bs.init({
		notify: false,
		port: argv.port === undefined ? 1234 : argv.port,
		open: argv.open === undefined ? false : argv.open,
		plugins: [ `bs-html-injector?files[]=${config.temp}/*.html` ],
		server: {
			baseDir: [ config.temp, config.src, config.public ],
			routes: { '/node_modules': 'node_modules' }
		}
	})
}

const distServer = () => {
	bs.init({
		notify: false,
		port: argv.port === undefined ? 1234 : argv.port,
		open: argv.open === undefined ? false : argv.open,
		server: config.dest
	})
}

const compile = gulp.parallel(style, script, page)

const serve = gulp.series(compile, devServer)

const build = gulp.series(clean, gulp.parallel(gulp.series(compile, useref), image, font, extra), measure)

const builddist = gulp.series(build, cleanTemp)

const start = gulp.series(build, distServer)

const deploy = gulp.series(build, upload, cleanTemp)

module.exports = { clean, lint, compile, serve, builddist, start, deploy }
