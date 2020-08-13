const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pluginConfigs = {
	CopyWebpackPlugin: new CopyWebpackPlugin({
		patterns: [
			{ from: 'index.html', to: 'index.html' },
			{ from: "img", to: "img" },
			{ from: "files", to: "files" },
			{ from: 'css', to: 'css' },
			{ from: 'js', to: 'js' },
			{ from: 'views', to: 'views' },
			{ from: 'node_modules/carbon-components/css/carbon-components.css', to: 'css/carbon-components.css' }
		]
	}),
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
		__dirname: true,
		fs: "empty",
		net: "empty"
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: [
					/\.js$/,
					/\.jsx$/,
					/\.ts$/,
					/\.spec.ts$/,
					/\.tsx$/,
					/\.spec.tsx$/,
					/\.graphql$/
				],
				exclude: [
					/node_modules/,
					/lib/,
					/vcap.local.js/,
					/source\/js\/bootstrap/
				],
				loader: "eslint-loader",
				options: {
					"print-config": true
				}
			},
			{
				test: [
					/\.js$/,
					/\.jsx$/,
					/\.ts$/,
					/\.tsx$/,
					/\.graphql$/
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
			// {
			// 	type: 'javascript/auto',
			// 	test: /\.mjs$/,
			// 	exclude: [
			// 		/node_modules/,
			// 		/lib/,
			// 		/vcap.local.js/
			// 	]
			// },
			{
				test: /\.svg$/,
				loader: 'file-loader'
			},
			// Component / Page CSS
			{
				test: [/\.module.scss$/],
				exclude: [/^(?!(.*)module.scss$).*\.scss$/],
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: '[name]__[local]__[hash:base64:5]'
							},
							sourceMap: true,
							localsConvention: 'camelCaseOnly'
						}
					},
					{
						loader: "sass-loader"
					}
				]
			},
			// Global CSS
			{
				test: [/\.scss$/],
				exclude: [/\.module.scss$/],
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: false
						}
					},
					{
						loader: "sass-loader"
					}
				]
			}
		]
	}
};

const clientConfig = Object.assign({}, baseConfig, {
	entry: {
		bundle: path.join(__dirname, '../app.tsx')
	},
	target: 'web',
	resolve: {
		extensions: [
			".jsx",
			".js",
			".tsx",
			".ts"
		],
		mainFields: ['browser', 'main', 'module']
		// alias: {
		// 	common: path.resolve(__dirname, "website/common/"),
		// 	modules: path.resolve(__dirname, "website/modules/"),
		// 	assets: path.resolve(__dirname, "website/assets/"),
		// 	root: path.resolve(__dirname, "website/")
		// }
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({ options: {} }),
		pluginConfigs.CopyWebpackPlugin,
		pluginConfigs.EnvironmentPlugin
	]
});

module.exports = [
	clientConfig
];

module.exports.pluginConfigs = pluginConfigs;
