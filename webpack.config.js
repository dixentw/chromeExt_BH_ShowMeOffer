var path = require('path');

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
    }
};

module.exports = config;
