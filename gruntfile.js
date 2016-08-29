module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            uses_defaults: {}
        },
        watch: {
            css: {
                files: 'styles/**/*.less',
                tasks: ['less:dev', 'concat:css'],
                options: {
                    livereload: true
                }
            },
           js: {
                files: 'scripts/**/*.js',
                tasks: ['concat:js'],
                options: {
                    livereload: true
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: ['**'],
                    dest: 'dist/assets/'
                }]
            }
        },
        concat: {
            options: {
                sourceMap: true,
                separator: '\n'
            },
            css: {
                files: {
                    'dist/styles/main.css': ['dist/styles/css/my.css ', 'dist/styles/css/vendor.css']
                }
            },
           js: {
                files: {
                    'dist/scripts/app.js': [
                        'scripts/app.js',
                        'scripts/players.controller.js',
                        'scripts/players.service.js',
                        'scripts/editPlayers.modal.controller.js',
                        'scripts/deletePlayers.modal.controller.js',
                        'scripts/addPlayers.modal.controller.js'
                        ],
                    'dist/scripts/vendor.js': [
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/angular/angular.js',
                        'node_modules/bootstrap/dist/js/bootstrap.js',
                        'node_modules/angular-animate/angular-animate.js',
                        'node_modules/angular-translate/dist/angular-translate.js',
                        'node_modules/angular-sanitize/angular-sanitize.js',
                        'node_modules/angular-translate-loader-partial/angular-translate-loader-partial.js',
                        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
                    ]

                }
            }
        },

        less: {
            dev: {
                options: {
                    sourceMap: false
                },
                files: {
                    'dist/styles/css/vendor.css' : 'node_modules/@vizexplorer/viz-ui-theme/generics.less',
                    'dist/styles/css/my.css' : 'styles/style.less'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('build', [

        'less:dev',
        'concat:css',
        'concat:js',


    ]);
    grunt.registerTask('default', ['build'])
};