
const path = require('path');
const apiServer = process.env.API_SERVER || "http://[::1]:3000";
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const devConfig = {
	devtool: 'source-map',
	mode: 'development',
	watch: true,
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		mainFields: ['browser', 'main', 'module']
	},
	stats: {
		colors: true
	}
};

const BFF = process.env.BFF_HOST || "http://localhost:9999";

const port = process.env.PORT || 9000;

const prodConfig = require('./webpack.prod.config');

const hardSourceWebpackPlugin = new HardSourceWebpackPlugin({
	// Either an absolute path or relative to webpack's options.context.
	cacheDirectory: '../cache/[confighash]',
	info: {
		// 'none' or 'test'.
		mode: 'none',
		// 'debug', 'log', 'info', 'warn', or 'error'.
		level: 'debug'
	},
	// Clean up large, old caches automatically.
	cachePrune: {
		// Caches younger than `maxAge` are not considered for deletion. They must
		// be at least this (default: 2 days) old in milliseconds.
		maxAge: 2 * 24 * 60 * 60 * 1000,
		// All caches together must be larger than `sizeThreshold` before any
		// caches will be deleted. Together they must be at least this
		// (default: 50 MB) big in bytes.
		sizeThreshold: 50 * 1024 * 1024
	}
});

const clientConfig = Object.assign({}, prodConfig[0], devConfig, {
	plugins: [prodConfig.pluginConfigs.CopyWebpackPlugin, hardSourceWebpackPlugin],
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		compress: true,
		historyApiFallback: true,
		disableHostCheck: true,
		writeToDisk: true,
		port: port,
		proxy: {
			// '/login': {
			// 	target: apiServer,
			// 	secure: false,
			// 	logLevel: 'debug',
			// 	changeOrigin: true,
			// 	proxyTimeout: 60000
			// },
			'/api': {
				target: apiServer,
				secure: false,
				logLevel: 'debug',
				changeOrigin: true,
				proxyTimeout: 60000
			}
		}
	}
});

module.exports = [
	clientConfig
];
