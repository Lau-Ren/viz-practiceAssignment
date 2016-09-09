'use strict';
module.exports = function(grunt) {
    var serveStatic = require('serve-static');
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                port: 9001,
                hostname: 'localhost',
                livereload: 35730
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect().use(
                                '/',
                                serveStatic('./dist')
                            ),
                            connect().use(
                                '/node_modules',
                                serveStatic('./node_modules')
                            ),
                        ];
                    }
                }
            }
        },
        watch: {
            css: {
                files: 'styles/**/*.less',
                tasks: ['less:dev', 'concat:css'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
           myJS: {
                files: 'scripts/**/*.js',
                tasks: ['jshint', 'concat:myJS'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            index: {
                files: 'index.html',
                tasks: ['copy:index'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            templates: {
                files: 'views/**/*.js',
                tasks: ['html2js:dist', 'concat:myJS'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
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
           myJS: {
                files: {
                    'dist/scripts/app.js': [
                        'scripts/app.js',
                        'scripts/players.controller.js',
                        'scripts/players.service.js',
                        'scripts/editPlayers.modal.controller.js',
                        'scripts/deletePlayers.modal.controller.js',
                        'scripts/addPlayers.modal.controller.js'
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
                    'dist/styles/main.css' : 'styles/style.less'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/scripts/bundle.js': 'dist/scripts/app.js'
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
        },
        html2js: {
            options: {
                existingModule: true,
                htmlmin: {
                    removeComments: true
                },
                module: 'PlayersModule',
                singleModule: true
            },
            dist: {
                src: ['views/*.html'],
                dest: 'dist/scripts/templates.js'
            }
        },
        karma: {
            unit: {
                configFile: 'my.conf.js',
                singleRun: true
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
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-babel');


    grunt.registerTask('serve', 'Compile and watch for changes', function () {
        grunt.task.run([
            'jshint',
            'less:dev',
            'html2js',
            'concat:myJS',
            'babel',
            'copy:assets',
            'copy:index',
            'copy:data',
            'connect:livereload',
            'watch'
        ]);
    });


    grunt.registerTask('build', [
        'jshint',
        'less:dev',
        'html2js',
        'concat:myJS',
        'babel',
        'copy:assets',
        'copy:index',
        'copy:data',
        'karma'
    ]);
    grunt.registerTask('default', ['build']);
};