const path = require('path');

module.exports = {
	// So parent files don't get applied
	root: true,
	globals: {
		preval: false,
	},
	env: {
		es6: true,
		browser: true,
		node: true,
		mocha: true,
	},
	extends: ['plugin:import/recommended', 'airbnb'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 7,
		sourceType: 'module',
	},
	plugins: [
		'babel',
		'import',
		'jsx-a11y',
		'mocha',
		'material-ui',
		'prettier',
	],
	// settings: {
	// 	'import/resolver': {
	// 		webpack: {
	// 			config: path.join(__dirname, './docs/webpackBaseConfig.js'),
	// 		},
	// 	},
	// },
	rules: {
		'linebreak-style': 0, // Don't play nicely with Windows
		'arrow-body-style': 0, // Incompatible with prettier
		'arrow-parens': 0, // Incompatible with prettier
		'array-bracket-spacing': 0,
		'object-curly-newline': 0, // Incompatible with prettier
		'function-paren-newline': 0, // Incompatible with prettier
		indent: 0, // Incompatible with prettier
		'implicit-arrow-linebreak': 0, // Incompatible with prettier
		'space-before-function-paren': 0, // Incompatible with prettier
		'eol-last': 0,
		'comma-dangle': 0,
		'comma-spacing': 0,
		'consistent-return': 0,
		'default-case': 0,
		'no-confusing-arrow': 0, // Incompatible with prettier
		'no-mixed-operators': 0, // Incompatible with prettier
		'no-tabs': 0,
		'no-return-assign': 0,
		'no-use-before-define': 0,
		'no-console': 0,
		'no-var': 0,
		'no-unused-vars': 0,
		'no-plusplus': 0,
		'no-continue': 0,
		'no-nested-ternary': 0,
		'no-unneeded-ternary': 0,
		'no-mixed-spaces-and-tabs': 0,
		'no-shadow': 0,
		'no-undef': 0,
		'no-unused-expressions': 0,
		'no-restricted-syntax': 0,
		'no-debugger': 0,
		'no-underscore-dangle': 0,
		semi: 0,
		quotes: 0,

		'prefer-template': 0,
		'prefer-const': 0,
		'prefer-rest-params': 0,
		'vars-on-top': 0,
		'no-else-return': 0,
		'spaced-comment': 0,
		'max-len': 0,
		'consistent-this': ['error', 'self'],
		'prefer-destructuring': 0, // airbnb is using error. destructuring harm grep potential.
		'no-alert': 'error', // airbnb is using warn
		'no-param-reassign': 0, // airbnb use error
		'no-prototype-builtins': 0, // airbnb use error
		'no-useless-return': 0,
		'no-void': 0,
		'object-shorthand': 0,
		'object-curly-spacing': 0,
		'operator-linebreak': 0, // airbnb use error

		// It would be better to enable this rule, but it might slow us down.
		'import/no-extraneous-dependencies': 0,
		'import/namespace': ['error', { allowComputed: true }],
		'import/order': 0,
		'import/no-useless-path-segments': 0,
		'import/no-mutable-exports': 0,

		'jsx-a11y/label-has-associated-control': 'error',
		'jsx-a11y/label-has-for': 0,
		'jsx-a11y/no-autofocus': 0, // We are a library, people do what they want.
		'react/jsx-curly-brace-presence': 0, // airbnb use error, it's buggy
		'react/jsx-wrap-multilines': 0,
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.js'],
			},
		], //
		'react/jsx-handler-names': 0,
		'react/jsx-indent': 0, // Incompatible with prettier
		'react/jsx-indent-props': 0, // Incompatible with prettier
		'react/jsx-no-bind': 0,
		'react/jsx-one-expression-per-line': 0, // Incompatible with prettier
		'react/default-props-match-prop-types': 0,
		'react/forbid-prop-types': 0, // airbnb use error
		'react/require-default-props': 0, // airbnb use error, it's buggy
		'react/destructuring-assignment': 0, // airbnb use errorairbnb is using .jsx
		'react/no-children-prop': 0,
		'react/no-danger': 'error', // airbnb is using warn
		'react/no-direct-mutation-state': 'error', // airbnb is using off
		'react/no-find-dom-node': 0, // airbnb use error
		'react/sort-prop-types': 0, // airbnb use off
		'react/prop-types': 0,
		'react/no-unescaped-entities': 0,
		'react/no-unused-prop-types': 0,

		'material-ui/docgen-ignore-before-comment': 0,

		'mocha/handle-done-callback': 'error',
		'mocha/no-exclusive-tests': 'error',
		'mocha/no-global-tests': 'error',
		'mocha/no-pending-tests': 'error',
		'mocha/no-skipped-tests': 'error',

		'flowtype/define-flow-type': 0,
		'flowtype/require-valid-file-annotation': 0,
		'flowtype/require-parameter-type': 0,
		'flowtype/require-return-type': 0,
		'flowtype/space-after-type-colon': 0,
		'flowtype/space-before-type-colon': 0,
		'flowtype/type-id-match': 0,
		'flowtype/use-flow-type': 0,

		'prettier/prettier': 0,
	},
};
