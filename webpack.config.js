module.exports = {
    entry: {
        index: require('path').join(__dirname, './static/js/index.js'),
    },
    output: {
        path: require('path').join(__dirname, './static/js/'),
        filename: '[name].build.js'
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
            }
        }]
    },
    target: "electron",
};