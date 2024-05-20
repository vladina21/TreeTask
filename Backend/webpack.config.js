import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './index.js', // Replace with your actual entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },  
  resolve: {
    fallback: {
      crypto: false, 
      buffer: false,
      zlib: false,
      querystring: false,
      buffer: false,
      path: false,
      stream: false,
      os: false,
      http: false,
      querystring: false,
      string_decoder: false,
      util: false,
      url: false,
      fs: false, 
      net: false, 
      crypto: false, 
      async_hooks: false,
    },
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
