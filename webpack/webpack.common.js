const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, '..', './src/index.tsx'),
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.scss'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
				exclude: /node_modules/,
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '..', './src/index.html'),
		}),
	],
	stats: 'errors-only',
};
