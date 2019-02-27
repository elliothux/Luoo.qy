const path = require('path');


module.exports = {
  entry: path.resolve(__dirname, './index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
  },
  target: 'node',
  externals: [],
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
        exclude: /node_modules/,
      },
    ],
  },
};
