    // Karma configuration
    // Generated on Wed Aug 31 2016 10:00:09 GMT+1200 (New Zealand Standard Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-translate/dist/angular-translate.js',
            'node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'dist/scripts/app.js',
            'tests/*.js'
        ],

        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'dist/**/*.js': 'coverage',
            'dist/**/*.json': 'ng-json2js'
        },



        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-spec-reporter',
            'karma-jasmine',
            'karma-coverage'
            // 'karma-ng-json2js-preprocessor'
        ],

        // ngJson2JsPreprocessor: {
        //     stripPrefix: 'dist/i18n/',
        //     prependPrefix: 'language/'
        // },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        client: {
            captureConsole: true
        }
    })
}
