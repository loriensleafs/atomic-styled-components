import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { ThemeConsumer } from './../theme';

export default (Component) => {
	const C = ({ innerRef, ...passThru }) => (
		<ThemeConsumer>
			{(theme) => <Component {...passThru} ref={innerRef} theme={theme} />}
		</ThemeConsumer>
	);

	if (Component.propTypes) C.propTypes = Component.propTypes;

	C.displayName = `Themify(${Component.displayName || Component.name || 'Component'})`;

	return hoistStatics(C, Component);
};
