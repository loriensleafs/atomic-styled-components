import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { ThemeConsumer } from './../theme';

export default (Component) => {
	const C = ({ innerRef, ref, ...passThru }) => (
		<ThemeConsumer>
			{(theme) => <Component ref={innerRef || ref} theme={theme} {...passThru} />}
		</ThemeConsumer>
	);

	hoistStatics(C, Component);
	C.displayName = `Themified(${Component.displayName || Component.name || 'Component'})`;
	C.propTypes = Component.propTypes || {};
	C.defaultProps = Component.defaultProps || {};

	return C;
};
