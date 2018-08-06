import React from 'react';
import { Client } from 'styletron-engine-atomic';
import hoistStatics from 'hoist-non-react-statics';
import { ThemeConsumer } from './theme';

export const engine = window.styletronClient || new Client();

export const classify = function() {
	let classes = [];

	for (let i = 0; i < arguments.length; i++) {
		const arg = arguments[i];
		if (!arg) continue;

		const argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			classes.push(arg);
		} else if (argType === 'object' && !Array.isArray(arg)) {
			classes.push(engine.renderStyle(arg));
		}
	}

	return classes.join('');
};

export const themify = (Component) => {
	const C = ({ innerRef, ...passThruProps }) => (
		<ThemeConsumer>
			{(theme) => <Component {...passThruProps} ref={innerRef} theme={theme} />}
		</ThemeConsumer>
	);

	if (Component.propTypes) C.propTypes = Component.propTypes;

	C.displayName = `Themify(${Component.displayName || Component.name || 'Component'})`;

	return hoistStatics(C, Component);
};
