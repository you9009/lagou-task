// 实现这个项目的构建任务

const loadGruntTasks = require('load-grunt-tasks')

module.exports = function(grunt) {
	'use strict'
	const config = {
		app: 'src', // 源文件目录
		dest: 'dest' // 目标文件目录
	}
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// 清空
		clean: {
			temp: '<%= config.dest %>/**'
		},
		csslint: {
			// 检查 CSS 语法
			src: [ '<%= config.app %>/**/*.css' ]
		},
		sass: {
			options: {
				implementation: sass
			},
			main: {
				files: {
					'<%= config.dest %>/styles/main.css': '<%= config.app %>/**/*.scss'
				}
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: 0, // 移除 CSS 文件中的所有注释
				report: 'gzip'
			},
			minify: {
				expand: true,
				cwd: '<%= config.app %>/assets/styles',
				src: [ 'global.css' ],
				dest: '<%= config.dest %>/styles/'
			}
		},
		jshint: {
			files: [ '<%= config.app %>/**/*.js' ],
			options: {
				curly: true,
				eqeqeq: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				node: true,
				globals: {
					exports: true,
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		imagemin: {
			// /压缩优化图片大小
			dist: {
				options: {
					optimizationLevel: 3
				},
				files: [
					{
						expand: true,
						cwd: '<%= config.app %>/assets/',
						src: [ '**/*.{png,jpg,jpeg}' ], // 优化 img 目录下所有 png/jpg/jpeg 图片
						dest: '<%= config.dest %>/assets/images/' // 优化后的图片保存位置，默认覆盖
					}
				]
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [ '<%= config.app %>/**/*.js' ],
				dest: '<%= config.dest %>/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				//为true表示允许添加头部信息
				stripBanners: true,
				//在头部添加 js文件名和时间的注释
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'<%= config.dest %>/<%= pkg.name %>.min.js': [ '<%= concat.dist.dest %>' ]
				}
			}
		},
		htmlmin: {
      //html 压缩
			options: {
				removeComments: true,
				removeCommentsFromCDATA: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true
			},
			build: {
				expand: true,
				cwd: '<%= config.app %>/',
				src: [ '*.html' ],
				dest: '<%= config.dest %>/'
			}
		},
		copy: {
			font: {
				expand: true,
				cwd: '<%= config.app %>/assets/font/',
				src: [ '**' ],
				dest: '<%= config.dest %>/font/'
			},
			images: {
				expand: true,
				cwd: '<%= config.app %>/assets/images/',
				src: [ '*.svg' ],
				dest: '<%= config.dest %>/images/'
			}
		},
		watch: {
			files: [ '<%= jshint.files %>' ],
			tasks: [ 'jshint' ]
		}
	})
	// 加载所有的grunt插件中的任务
	loadGruntTasks(grunt)
	// 定义默认任务
	grunt.registerTask('default', [
		'clean',
		'csslint',
		'sass',
		'cssmin',
		'jshint',
		'concat',
		'uglify',
		'imagemin',
		'htmlmin',
		'watch'
	])
}
