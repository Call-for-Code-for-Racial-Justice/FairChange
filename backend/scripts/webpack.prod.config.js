const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pluginConfigs = {
	CopyWebpackPlugin: new CopyWebpackPlugin({
		patterns: [
			{ from: 'configuration.json' }
		]
	}, {}),
	EnvironmentPlugin: new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	})
};

const baseConfig = {
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '../dist')
	},
	stats: "errors-only",
	mode: 'production',
	node: {
		path: true,
		__dirname: true
	},
	module: {
		// noParse: [/\/ws\//],
		rules: [
			{
				enforce: "pre",
				test: [
					/\.js$/,
					/\.ts$/
				],
				exclude: [
					/node_modules/,
					/lib/,
					/vcap.local.js/
				],
				loader: "eslint-loader"
				// options: {
				// 	"print-config": true
				// }
			},
			{
				test: [
					/\.js$/,
					/\.ts$/
				],
				exclude: [
					/node_modules/,
					/lib/,
					/vcap.local.js/
				],
				use: [
					{
						loader: 'babel-loader'
					},
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: false
							// configFile: resolvePath('./tsconfig.json'),
							// context: ROOT_DIR
							// getCustomTransformers: () => ({
							// 	before: [transformateurRepoGraphql()]
							// }),
						}
					}
				]
			},
			{
				type: 'javascript/auto',
				test: /\.mjs$/,
				include: [
					/node_modules/,
					/lib/,
					/vcap.local.js/
				],
				use: []
			}
		]
	}
};

const serverConfig = Object.assign({}, baseConfig, {
	entry: {
		server: path.join(__dirname, '../driver.ts')
	},
	resolve: {
		extensions: ['.js', '.ts']
	},
	target: 'node',
	plugins: []
});

module.exports = [serverConfig];

module.exports.pluginConfigs = pluginConfigs;
