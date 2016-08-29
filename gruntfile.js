'use strict';
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            usesDefault: {}
        },
        watch: {
            css: {
                files: 'styles/**/*.less',
                tasks: ['less:dev', 'concat:css', 'cssmin'],
                options: {
                    livereload: true
                }
            },
           js: {
                files: 'scripts/**/*.js',
                tasks: ['jshint', 'concat:js', 'uglify:js'],
                options: {
                    livereload: true
                }
            },
            index: {
                files: 'index.html',
                tasks: ['copy:index'],
                options: {
                    livereload: true
                }
            }
        },
        copy: {
            assets: {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: ['**'],
                    dest: 'dist/assets/'
                }]
            },
            data: {
                files: [{
                    expand: true,
                    cwd: 'data/',
                    src: ['**'],
                    dest: 'dist/data/'
                }]
            },
            index: {
                files: [{
                    expand: true,
                    src: ['./index.html'],
                    dest: 'dist/'
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
                    'dist/styles/main.css': [
                        'dist/styles/css/my.css ',
                        'dist/styles/css/vendor.css'
                    ]
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
        },
        uglify: {
            js: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/scripts/app.min.map'
                },
                files: {
                   'dist/scripts/app.min.js':['dist/scripts/vendor.js', 'dist/scripts/app.js']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/styles/main.min.css': ['dist/styles/main.css']
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: ['gruntfile.js', 'scripts/**/*.js']
            }
        }
    });

    // Load the plugins that provide the tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default tasks.
    grunt.registerTask('build', [
        'jshint',
        'less:dev',
        'concat:css',
        'cssmin',
        'concat:js',
        'uglify:js',
        'copy:assets',
        'copy:index',
        'copy:data'
    ]);
    grunt.registerTask('default', ['build']);
};