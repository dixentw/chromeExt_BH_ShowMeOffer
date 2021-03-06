var path = require('path');
var webpack = require('webpack');

var config = {
    entry: './writer/main.js',
    output: {
        path: path.resolve(__dirname, 'smo_extension/writer'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets:['react','es2015']
            }
        }]
    },
	plugins: [
    	new webpack.optimize.UglifyJsPlugin({minimize: true})
  	] 
};

module.exports = config;
