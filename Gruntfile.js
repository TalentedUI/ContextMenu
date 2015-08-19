module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*\n' + 'Name: <%= pkg.name %>  - Version: <%= pkg.version %> \n' + 'Author: <%= pkg.author %> \n' + 'Last Updated: <%= grunt.template.today(new Date()) %>\n' + '*/' + '\n' + '\n',
                mangle: false
            },
            output_target: {
                files: {
                    'build/talented-ui.contextmenu.min.js': [
                        'src/talented-ui.contextmenu.js'
                    ]
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            output_target: {
                files: {
                    'build/talented-ui.contextmenu.min.css': [
                        'src/talented-ui.contextmenu.css'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('build', ['uglify','cssmin']);

};
