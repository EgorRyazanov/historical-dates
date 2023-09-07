const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.s(a|c)ss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
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
		filename: '[name].[contenthash].js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	],
};
