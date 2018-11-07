import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import merge from './../utils/pureRecursiveMerge';
import cn from './../theme/className';
import { fade } from './../utils/colorHelpers';
import { isFunc } from './../utils/helpers';

const getAbsoluteStyles = ({ absolute }) =>
	absolute && {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
	};

function Divider(props) {
	const { theme } = useContext(ThemeContext);
	const { absolute, inset, light, styles, children, className: classNameProp, is: C } = props;
	const className = cn(
		classNameProp,
		merge(
			{
				width: '100%',
				height: '1px',
				margin: inset ? '72px' : 0,
				border: 'none',
				flexShrink: 0,
				backgroundColor: light ? fade(theme.palette.divider, 0.08) : theme.palette.divider,
			},
			getAbsoluteStyles({ absolute }),
			isFunc(styles) ? styles(props) : styles,
		),
	);

	return <C className={className}>{children}</C>;
}

Divider.displayName = 'Divider';

Divider.propTypes = {
	absolute: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * If `true`, the divider will be indented.
	 */
	inset: PropTypes.bool,
	/**
	 * If `true`, the divider will have a lighter color.
	 */
	light: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Divider.defaultProps = {
	is: 'hr',
	absolute: false,
	inset: false,
	light: false,
	styles: {},
};

export default Divider;
