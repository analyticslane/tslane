const path = require('path');
const webpack = require('webpack');

const NpmDtsPlugin = require('npm-dts-webpack-plugin')

const package = require('./package.json');
const library = package.name;
const filename = `${package.name}_${package.version}.js`;
const typesname = `bundles/${package.name}_${package.version}.d.ts`;
const mapname = `${package.name}_map_${package.version}.js`;

const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString();

const definePlugin = new webpack.DefinePlugin({
  VERSION: JSON.stringify(package.version),
  HASH: JSON.stringify(commitHash)
});

module.exports = [{
  name: 'map',
  entry: './src/index-bundle.ts',
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: mapname,
    library: library,
    path: path.resolve(__dirname, 'bundles'),
  }
}, {
  name: 'production',
  entry: './src/index-bundle.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: filename,
    library: library,
    path: path.resolve(__dirname, 'bundles'),
  },
  plugins: [
    definePlugin,
    new NpmDtsPlugin({ output: typesname })
  ]
}];
