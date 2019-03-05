const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
  },
  target: 'electron-main',
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          // {loader: 'babel-loader',},
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
        resolve: {
          extensions: ['.ts', '.js', '.json'],
        },
        exclude: /node_modules/,
      }
    ],
  },
};
