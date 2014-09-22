module.exports = function(config) {
    config.set({
        basePath: '../',

        files: [
            'source/chnNumConverter.js',
            'test/unit/**/*.js'
        ],
        logLevel: 'info',

        exclude: [],

        autoWatch: true,

        frameworks: ['jasmine', 'sinon'],

        //browsers: ['PhantomJS', 'Chrome_without_security'],
        browsers: ['Chrome_without_security'],
        // you can define custom flags
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    }
                }
                /*,
                flags: ['--remote-debugger-port=9000']*/
            },
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        },
        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-sinon',
            'karma-coverage',
            'karma-phantomjs-launcher'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
        reporters: ['progress', 'coverage', 'junit'],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'source/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }

    })
}
