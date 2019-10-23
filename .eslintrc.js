module.exports = {
	root: true,
	'globals': {
		"$": true
	},
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
	],
	rules: {
		'no-console': 0,
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'no-param-reassign': 0,
		'global-require': 0,
		indent: [
			'error',
			'tab',
		],
		'no-tabs': 0,
		semi: [
			2,
			'always',
		],
		'max-len': 0,
		'vue/name-property-casing': [
			'error',
			'PascalCase',
		],
		'vue/prop-name-casing': [
			'error',
			'camelCase',
		],
		'vue/component-name-in-template-casing': [
			'error',
			'kebab-case',
			{
				registeredComponentsOnly: false,
				ignores: [],
			},
		],
		'vue/html-indent': [
			'error',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: [],
			},
		],
		'vue/max-attributes-per-line': 0,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};
