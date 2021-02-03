const path = require('path');
const webpack = require('webpack');

const package = require('./package.json');
const library = package.name;
const filename = `${package.name}_${package.version}.js`;
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
    entry: './src/index.ts',
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
    entry: './src/index.ts',
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
    plugins: [definePlugin]
}];
