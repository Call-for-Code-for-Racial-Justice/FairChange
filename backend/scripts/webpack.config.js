const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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

const devConfig = {
	devtool: 'source-map',
	mode: 'development',
	watch: true,
	resolve: {
		extensions: ['.js', '.ts']
	},
	stats: {
		colors: true,
		warningsFilter: [
			/node_modules\/configuration-master/,
			/node_modules\/node-fetch/,
			/node_modules\/express/
		]
	}
};

const prodConfig = require('./webpack.prod.config');

const serverConfig = Object.assign(
	{},
	prodConfig[0],
	devConfig,
	{ plugins: [prodConfig.pluginConfigs.CopyWebpackPlugin, hardSourceWebpackPlugin] }
	// { plugins: [hardSourceWebpackPlugin] }
);

module.exports = [
	serverConfig
];
