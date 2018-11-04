import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../styles/className';
import { isFunc } from './../utils/helpers';

function Paper({ children, className: classNameProp, elevation, square, styles, ...passThru }) {
	const { theme } = useContext(ThemeContext);
	const className = cn(classNameProp, {
		...{
			backgroundColor: theme.palette.bg.paper,
			boxShadow: theme.elevation[elevation],
			borderRadius: square ? '0px' : theme.shape.borderRadius,
		},
		...(isFunc(styles) ? styles({ elevation, square, theme, ...passThru }) : styles),
	});
	return <div className={className}>{children}</div>;
}

Paper.displayName = 'Paper';

Paper.propTypes = {
	/**
	 * Shadow depth, corresponds to `dp` in the spec.
	 * It's accepting values between 0 and 24 inclusive.
	 */
	elevation: PropTypes.number,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * If `true`, rounded corners are disabled.
	 */
	square: PropTypes.bool,
};

Paper.defaultProps = {
	elevation: 2,
	square: false,
};
export default Paper;
