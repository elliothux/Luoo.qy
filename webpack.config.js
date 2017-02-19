module.exports = {
    entry: require('path').join(__dirname, './index'),
    output: {
        path: require('path').join(__dirname),
        filename: 'index.build.js'
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