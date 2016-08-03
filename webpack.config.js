/* Thanks to https://github.com/petehunt/webpack-howto */
require('es6-promise').polyfill();
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var buildPath = path.join(__dirname, 'build');

var appPath = path.join(__dirname, 'app');
var appModulesPath = path.join(appPath, 'js');
var nodeModulesPath = path.join(__dirname, 'node_modules');
var bowerComponentsPath = path.join(__dirname, 'app', 'bower_components');

var outputFilename = 'armada.js';
var outputPath = appPath;
var isProduction = false;
if (process.env.NODE_ENV == 'production') {
    outputFilename = 'armada.[hash].js';
    outputPath = buildPath;
    isProduction = true;
}

module.exports = {
    context: appPath,

    entry: [
        './main.js'
    ],
    output: {
        path: outputPath,
        filename: outputFilename
    },
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:8000/',
                secure: false
            }
        }
    },
    resolve: {
        root: [appModulesPath, nodeModulesPath, bowerComponentsPath],
        alias: {
            'http-auth-interceptor': nodeModulesPath + '/angular-http-auth-interceptor/angular-http-auth-interceptor.js',
            'jquery': nodeModulesPath + '/jquery/dist/jquery.min.js',
            'jquery-number': bowerComponentsPath + '/jquery-number/jquery.number.min.js',
            'patternfly': nodeModulesPath + '/patternfly/dist/js/patternfly.min.js',
            'patternfly.css': nodeModulesPath + '/patternfly/dist/css/patternfly.min.css',
            'patternfly.additions.css': nodeModulesPath + '/patternfly/dist/css/patternfly-additions.min.css',
            'c3': nodeModulesPath + '/c3/c3.min.js',
            'c3.css': nodeModulesPath + '/c3/c3.min.css',
            'd3': nodeModulesPath + '/d3/d3.min.js',
            'nya-bootstrap-select.css': nodeModulesPath + '/nya-bootstrap-select/dist/css/nya-bs-select.min.css',
            'nya-bootstrap-select': nodeModulesPath +     '/nya-bootstrap-select/dist/js/nya-bs-select.min.js',
            'font-awesome.css': nodeModulesPath + '/font-awesome/css/font-awesome.css',
            'font-awesome.fonts': nodeModulesPath + '/font-awesome/fonts/fontawesome-webfont.woff2',
            'angular-patternfly': bowerComponentsPath + '/angular-patternfly/dist/angular-patternfly.min.js'
        },
        extensions: [
            '',
            '.js',
            '.html',
            '.css'
        ]
    },
    resolveLoader: {
        root: nodeModulesPath
    },
    devTool: 'eval-source-map',

    contentBase: appPath,
    module: {
        noParse: [
            'jquery',
            'jquery-number',
            'patternfly',
            'patternfly.css',
            'patternfly.additions.css',
            'c3',
            'c3.css',
            'd3',
            'nya-bootstrap-select',
            'nya-bootstrap-select.css',
            'angular-patternfly'
        ],
        loaders: [
            // Exports Angular
            { 
                test: /[\/]angular\.js$/, 
                loader: "exports?angular" 
            },
            // Markup Loaders
            { 
                test: /\.css$/, 
                loader: 'style-loader!css-loader?sourceMap'
            },
            { 
                test: /\.(png|jpg|gif)$/, 
                loader: 'url-loader?limit=8192' 
            }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=2000000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery"
        })
    ].concat(isProduction ? [
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: true
        }),
        function() {
            this.plugin("done", function(stats) {
                var replaceInFile = function (input, output, toReplace, replacement) {
                    var replacer = function (match) {
                        console.log('Replacing in %s: %s => %s', input, match, replacement);
                        return replacement
                    };
                    var str = fs.readFileSync(input, 'utf8');
                    var out = str.replace(new RegExp(toReplace, 'g'), replacer);
                    fs.writeFileSync(output, out);
                };

                var hash = stats.hash; // Build's hash, found in `stats` since build lifecycle is done.

                replaceInFile(
                    path.join(appPath,  'index.html'),
                    path.join(buildPath, 'index.html'),
                    'armada.js',
                    'armada.' + hash + '.js'
                );
            });
        }
    ] : [
        new webpack.DefinePlugin({
            ON_TEST: process.env.NODE_ENV === "test"
        })
    ])
};
