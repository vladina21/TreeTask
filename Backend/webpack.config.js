const path = require('path');

module.exports = {
  entry: './index.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Add other loaders as needed (e.g., for CSS, images, etc.)
    ],
  },
  // Add other configuration options as needed (e.g., plugins)
};