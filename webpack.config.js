/* Thanks to https://github.com/petehunt/webpack-howto */
require('es6-promise').polyfill();
var webpack = require('webpack');
var path = require('path');

var appPath = path.join(__dirname, 'app');
var appModulesPath = path.join(appPath, 'js');
var nodeModulesPath = path.join(__dirname, 'node_modules');
var bowerComponentsPath = path.join(__dirname, 'app', 'bower_components');

module.exports = {
    context: appPath,

    entry: './main.js',
    output: {
        path: appPath,
        filename: 'armada.js'
    },
    resolve: {
        root: [appModulesPath, nodeModulesPath, bowerComponentsPath],
        alias: {
            'jquery': nodeModulesPath + '/jquery/dist/jquery.min.js',
            'jquery-number': bowerComponentsPath + '/jquery-number/jquery.number.js',
            'patternfly': nodeModulesPath + '/patternfly/dist/js/patternfly.js',
            'patternfly-css': nodeModulesPath + '/patternfly/dist/css/patternfly.css',
            'patternfly-additions-css': nodeModulesPath + '/patternfly/dist/css/patternfly-additions.css'
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

    contentBase: appPath,
    module: {
        noParse: [
            nodeModulesPath + '/jquery/dist/jquery.min.js'
        ],
        loaders: [
            // Exports Angular
            { test: /[\/]angular\.js$/, loader: "exports?angular" },
            // Markup Loaders
            { test: /\.css$/, loader: 'style-loader!css-loader' },
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
            sourceMap: false,
            mangle: false
        })
    ]
};
