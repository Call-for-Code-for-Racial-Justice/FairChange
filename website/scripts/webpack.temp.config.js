
const path = require('path');
const apiServer = 'https://fairchange-backend-embrace-fair-change.embrace-dev-ocp43-vpc-7ec5d722a0ab3f463fdc90eeb94dbc70-0000.us-east.containers.appdomain.cloud';
const webpack = require('webpack');
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

const clientConfig = Object.assign({}, prodConfig[0], devConfig, {
	plugins: [prodConfig.pluginConfigs.CopyWebpackPlugin],
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
