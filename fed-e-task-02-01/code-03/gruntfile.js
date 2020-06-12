const loadGruntTasks = require('load-grunt-tasks')

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
	date: new Date()
}

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// 清空
		clean: {
			build: [ 'dist', 'temp' ],
			temp: [ 'temp' ]
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				esversion: 6,
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			},
			build: [ 'src/**/*.js' ]
		},
		babel: {
			options: {
				sourceMap: false,
				presets: [ '@babel/preset-env' ]
			},
			build: {
				files: [
					{
						expand: true,
						cwd: 'src/assets/',
						src: [ '**/*.js' ],
						dest: 'dist/assets/'
					}
				]
			}
		},
		uglify: {
			options: {
				sourceMap: false,
				mangle: true,
				comments: false,
				includeSources: true
			},
			build: {
				files: [
					{
						expand: true,
						cwd: 'dist/assets/',
						src: [ '**/*.js' ],
						dest: 'dist/assets/'
					}
				]
			}
		},
		sass: {
			build: {
				options: {
					style: 'compressed'
				},
				files: [
					{
						expand: true,
						cwd: 'src/assets/styles/',
						src: '*.{sass,scss}',
						dest: 'dist/assets/styles/',
						ext: '.css'
					}
				]
			}
		},
		cssmin: {
			css: {
				src: 'temp/styles/vendor.css',
				dest: 'dist/assets/styles/vendor.css'
			}
		},
		imagemin: {
			build: {
				options: {
					optimizationLevel: 3
				},
				files: [
					{
						expand: true,
						cwd: 'src/assets/images/',
						src: [ '*.{png,jpg,jpeg}' ],
						dest: 'dist/assets/images/'
					}
				]
			}
		},
		swigtemplates: {
			options: {
				templatesDir: 'src/',
				defaultContext: {
					pkg: '<%= pkg %>',
					menus: data.menus,
					date: data.date
				}
			},
			production: {
				dest: 'dist',
				src: [ 'src/*.html' ]
			}
		},
		useref: {
			html: 'dist/*.html',
			temp: [ 'dist' ]
		},
		htmlmin: {
			build: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [
					{
						expand: true,
						cwd: 'dist/',
						src: [ '*.html' ],
						dest: 'dist/',
						ext: '.html',
						extDot: 'first'
					}
				]
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			js: {
				src: [
					'./node_modules/jquery/dist/jquery.js',
					'./node_modules/popper.js/dist/umd/popper.js',
					'./node_modules/bootstrap/dist/js/bootstrap.js'
				],
				dest: 'dist/assets/scripts/vendor.js'
			},
			css: {
				src: [ './node_modules/bootstrap/dist/css/bootstrap.css' ],
				dest: 'temp/styles/vendor.css'
			}
		},
		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'src/assets/fonts/',
						src: [ '**' ],
						dest: 'dist/assets/fonts/'
					},
					{
						expand: true,
						cwd: 'src/assets/images/',
						src: [ '**' ],
						dest: 'dist/assets/images/'
					},
					{
						expand: true,
						cwd: 'public/',
						src: [ '**' ],
						dest: 'dist/'
					}
				]
			}
		},
		watch: {
			client: {
				files: [ '**' ],
				options: {
					livereload: true
				}
			}
		}
	})
	// 加载所有的grunt插件中的任务
	loadGruntTasks(grunt)

	grunt.registerTask('default', [
		'clean:build',
		'sass',
		'babel',
		'swigtemplates',
		'copy',
		'concat',
		'imagemin',
		'uglify',
		'cssmin',
		'useref',
		'htmlmin',
		'clean:temp'
	])
	grunt.registerTask('watch', [ 'watch' ])
	grunt.registerTask('clear', [ 'clean:build' ])
}
