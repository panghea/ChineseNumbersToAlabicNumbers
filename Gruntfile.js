module.exports = function(grunt) {
    // プロジェクトの設定
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "jsbeautifier": {
            files: ["source/**/*.js", 'test/**/*.js', 'Gruntfile.js', 'config/karma.conf.js', '!**/lib/**/*.js'],
            options: {
                jslintHappy: true,
                keepArrayIndentation: true,
            }
        },
        jshint: {
            options: {
                globals: {
                    jQuery: true,
                    "document": true,
                    "angular": true
                },
                jshintrc: ".jshintrc"
            },
            all: {
                files: [{
                    src: ['Gruntfile.js', 'source/**/*.js'],
                    filter: function(item) {
                        return !/node/.test(item) && !/jquery|lib|diff|isbn|ecl|diff|lodash|package.json|Grunt|bootstrap/.test(item);
                    }
                }]
            }
        },
        uglify: {
            options: {
                dead_code: false,
                mangle: false,
                compress: true,
                drop_console: true,
                beautify: {
                    ascii_only: true,
                    beautify: true
                }
            },
            comp: {
                options: {
                    compress: {
                        drop_console: true,
                        dead_code: false
                    },
                    mangle: true,
                    beautify: {
                        ascii_only: true,
                        beautify: false
                    }
                },
                files: [{
                    src: './source/*.js', // マッチする実際のパターン
                    dest: './build/chnNumConverter.min.js', // 遷移先のパスの先頭部分
                }, ],
            },
            ball: {
                options: {
                    compress: true
                },
                mangle: false,
                files: [{
                    expand: false, // 動的拡張機能を有効
                    cwd: "source",
                    src: ['./source/chnNumConverter.js'], // マッチする実際のパターン
                    dest: './build/chnNumConverter.min.js', // 遷移先のパスの先頭部分
                    ext: '.js', // 遷移先のファイルパスにつける拡張子
                    filter: function(item) {
                        return !/node/.test(item);
                    },
                }, ],
            },
            build: {
                files: [{
                    expand: true, // 動的拡張機能を有効
                    cwd: "source",
                    src: ['**/*.js', '!Grunt*', '!**/lib/*'], // マッチする実際のパターン
                    dest: './build/', // 遷移先のパスの先頭部分
                    ext: '.js', // 遷移先のファイルパスにつける拡張子
                    filter: function(item) {
                        return !/node/.test(item);
                    },
                }, ],
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "source",
                    src: ['**', '!package.json', '!Grunt*', '!node*'],
                    dest: './build/',
                    filter: function(item) {
                        return !/node/.test(item);
                    }
                }],
            }
        },
        clean: {
            options: {
                force: true,
            },
            build: {
                src: ["./build/", "coverage/*", "test_out/*"],
            },
            cov: {
                src: ["coverage/*", "test_out/*"],
            },
        },
        karma: {
            options: {
                //logLevel: "info",
                files: [
                    'source/**/*.js',
                    'test/unit/**/*.js', {
                        pattern: 'source/data/*.json',
                        watched: true,
                        served: true,
                        included: false
                    }

                ],
                exclude: []
            },
            build: { // release用 buildファイルを対象にする
                options: {
                    files: [
                        'build/**/*.js',
                        'test/unit/**/*.js', {
                            pattern: 'source/data/*.json',
                            watched: true,
                            served: true,
                            included: false
                        }

                    ],
                    exclude: []
                },
                singleRun: true,
                configFile: 'config/karma.conf.js'
            },
            single: {
                singleRun: true,
                configFile: 'config/karma.conf.js'
            },
            simple: {
                configFile: 'config/karma.conf.js',
                preprocessors: {}
            },
            unit: {
                browsers: ['PhantomJS', 'Chrome_without_security'],
                configFile: 'config/karma.conf.js'
            },
        }
    });
    // プラグインのロードによって"uglify"タスクが提供されます。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-regex-replace');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-shell');
    // デフォルトのタスクを指定
    //grunt.registerTask('default', ['jsbeautifier', 'shell', 'jshint', 'clean',  'uglify', /*'karma:single','karma:build',*/ 'compress' /*, 'regex-replace:cleanComment'*/ ]); // , 'uglify', 'copy:originalJs']);
    grunt.registerTask('default', ['jsbeautifier', 'jshint', 'clean:cov', 'uglify:comp', 'uglify:ball', 'karma:build' /*, 'regex-replace:cleanComment'*/ ]); // , 'uglify', 'copy:originalJs']);
    grunt.registerTask('single', ['jsbeautifier', 'jshint', 'clean', 'uglify', 'karma:single']);
    grunt.registerTask('simple', ['jsbeautifier', 'jshint', 'clean', 'uglify', 'karma:simple']);
    grunt.registerTask('hint', ['jsbeautifier', 'jshint', 'clean:cov', 'uglify', 'karma:unit']);
    grunt.registerTask('build', ['jsbeautifier', 'jshint', 'clean:cov', 'uglify:comp', 'karma:build' /*, 'regex-replace:cleanComment'*/ ]); // , 'uglify', 'copy:originalJs']);
    grunt.registerTask('indent', ['jsbeautifier']);
};
