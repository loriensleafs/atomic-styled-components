import React, { Component } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import ThemeContext from './ThemeContext';

export default (C) => {
	class Themified extends Component {
		render() {
			const { innerRef, ref, ...passThru } = this.props;
			const { theme } = this.context;

			return <C ref={innerRef || ref || null} theme={theme} {...passThru} />;
		}
	}

	Themified.contextType = ThemeContext;
	Themified.displayName = `Themified(${C.displayName || C.name || 'Component'})`;

	hoistNonReactStatics(Themified, C);

	return Themified;
};
