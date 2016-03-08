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
if (process.env.NODE_ENV == 'production') {
    outputFilename = 'armada.[hash].js';
    outputPath = buildPath;
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
            'c3': nodeModulesPath + '/patternfly/components/c3/c3.min.js',
            'c3.css': nodeModulesPath + '/patternfly/components/c3/c3.min.css',
            'd3': nodeModulesPath + '/patternfly/components/d3/d3.min.js',
            'nya-bootstrap-select.css': nodeModulesPath + '/nya-bootstrap-select/dist/css/nya-bs-select.min.css',
            'nya-bootstrap-select': nodeModulesPath +     '/nya-bootstrap-select/dist/js/nya-bs-select.min.js',
            'angular-patternfly': bowerComponentsPath + '/angular-patternfly/dist/angular-patternfly.min.js',
            'angular-patternfly.css': bowerComponentsPath + '/angular-patternfly/dist/styles/angular-patternfly.min.css'
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
    devTool: 'source-map',

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
            'angular-patternfly',
            'angular-patternfly.css'
        ],
        loaders: [
            // Exports Angular
            { test: /[\/]angular\.js$/, loader: "exports?angular" },
            // Markup Loaders
            { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap' },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.DefinePlugin({
            ON_TEST: process.env.NODE_ENV === "test"
        }),
        function() {
            this.plugin("done", function(stats) {
                if (process.env.NODE_ENV === 'production') {
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
                }
            });
        }
    ]
};
