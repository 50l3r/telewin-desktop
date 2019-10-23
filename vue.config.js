const path = require('path');

module.exports = {
	chainWebpack: (config) => { config.resolve.alias.set('@', path.resolve(__dirname, 'src')); },
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				win: {
					icon: './favicon.ico',
				},
			},
		},
	},
};
