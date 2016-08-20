require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');

module.exports = [
    {
        name: 'server',
        entry: './src/server/index.js',
        target: 'node',
        output: {
            path: __dirname + '/public/server',
            filename: 'bundle.js',
        },
        module: {
            loaders: [
                {
                    test: /.js/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react', 'stage-2']
                    }
                },
                {
                    test: /\.json?$/,
                    loader: 'json'
                }
            ]
        }
    },
    {
        name: 'client',
        entry: './src/client/index.js',
        output: {
            path: __dirname + '/public/client',
            filename: 'bundle.js',
        },
        module: {
            loaders: [
                {
                    test: /.js/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react', 'stage-2']
                    }
                },
                {
                    test: /\.json?$/,
                    loader: 'json'
                }
            ]
        }
    },
    {
        name: 'test-client',
        entry: './src/test/client.js',
        target: 'node',
        output: {
            path: __dirname + '/public/test',
            filename: 'client-test.js',
        },
        module: {
            loaders: [
                {
                    test: /.js/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react', 'stage-2']
                    }
                },
                {
                    test: /\.json?$/,
                    loader: 'json'
                }
            ]
        }
    },
    {
        name: 'test-server',
        entry: './src/test/server.js',
        target: 'node',
        output: {
            path: __dirname + '/public/test',
            filename: 'server-test.js',
        },
        module: {
            loaders: [
                {
                    test: /.js/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react', 'stage-2']
                    }
                },
                {
                    test: /\.json?$/,
                    loader: 'json'
                }
            ]
        }
    }
];