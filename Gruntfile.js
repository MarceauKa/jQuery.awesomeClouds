module.exports = function(grunt) {
	grunt.initConfig({
		uglify: {
			minifyJS: {
				files: {
					'jquery.awesomeClouds.min.js': ['jquery.awesomeClouds.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify']);
};