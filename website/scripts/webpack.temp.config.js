
const path = require('path');
const apiServer = process.env.API_SERVER;
console.log({ apiServer });
const webpack = require('webpack');
const devConfig = {
	mode: 'production',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		mainFields: ['browser', 'main', 'module']
	}
};

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
