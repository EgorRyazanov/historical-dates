const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	devServer: {
		hot: true,
		open: true,
		compress: true,
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.s(a|c)ss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
	output: {
		path: path.resolve(__dirname, '..', './build'),
		filename: '[name].js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new ReactRefreshWebpackPlugin(),
	],
};
