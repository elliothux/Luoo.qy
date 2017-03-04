module.exports = {
    entry: {
        index: require('path').join(__dirname, './index.js'),
    },
    output: {
        path: require('path').join(__dirname),
        filename: '[name].build.js'
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    target: "electron",
};