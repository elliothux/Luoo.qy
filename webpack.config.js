let path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname),
        filename: 'index.build.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.js|jsx$/, loaders: ['babel'] }

        ]
    },
    target: "electron"
};