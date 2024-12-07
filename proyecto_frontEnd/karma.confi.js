//karma configuration file, see link form more information
//https://karma-runner.github.io/1.0/config/configuration-file.html

const { plugin } = require("postcss")

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugin: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            jasmine: {},
            ClearContext: false
        },
        jasmineHtmlReporter: { suppressAll: true },

        coverageReporter: {
            dir: require('path').join(__dirname, './coverage'),
            subdir: '.',
            reporters: [
                { type: 'html', subdir: 'html-report' },
                { type: 'lcov', subdir: 'lcov-report' }
            ]
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['chrome'],
        singleRun: false,
        restartOnFileChange: true
    });
};