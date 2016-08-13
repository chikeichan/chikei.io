var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    entry: {
        server: './src/client/index.js',
        client: './src/server/index.js'
    },
    output: { 
        path: __dirname,
        filename: './public/[name].bundle.js' 
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};