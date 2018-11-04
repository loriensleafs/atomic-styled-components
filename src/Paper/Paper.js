import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../styles/className';

const Paper = ({
	children,
	className: classNameProp,
	$elevation = 2,
	$square = false,
	$styles,
	...passThru
}) => {
	const { theme } = useContext(ThemeContext);
	const className = cn(classNameProp, {
		...{
			backgroundColor: theme.palette.bg.paper,
			boxShadow: theme.elevation[$elevation],
			borderRadius: $square ? '0px' : theme.shape.borderRadius,
		},
		...(typeof $styles === 'function'
			? $styles({ $elevation, $square, $styles, theme, ...passThru })
			: $styles),
	});
	return <div className={className}>{children}</div>;
};

Paper.displayName = 'Paper';

Paper.propTypes = {
	$styles: PropTypes.object,
	/**
	 * If `true`, rounded corners are disabled.
	 */
	$square: PropTypes.bool,
	/**
	 * Shadow depth, corresponds to `dp` in the spec.
	 * It's accepting values between 0 and 24 inclusive.
	 */
	elevation: PropTypes.number,
};
export default Paper;
