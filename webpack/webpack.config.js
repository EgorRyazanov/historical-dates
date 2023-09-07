const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (variables) => {
	const { env } = variables;
	const envConfig = require(`./webpack.${env}.js`);
	const config = merge(commonConfig, envConfig);
	return config;
};
