module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: ['Gruntfile.js', 'scripts/*.js', 'json/*.json'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},

		less: {
			development: {
				options: {
				compress: false,
				yuicompress: true,
				optimization: 2,
				},
				files: {
					"styles/css/main.css": "styles/less/main.less"
				}	
			}
		},

		watch: {
			styles: {
				files: ['styles/less/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			},

			jshint: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['watch']);
};