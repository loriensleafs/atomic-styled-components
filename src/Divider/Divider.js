import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import merge from './../utils/pureRecursiveMerge';
import cn from './../theme/className';
import { fade } from './../utils/colorHelpers';
import { isFunc } from './../utils/helpers';

const getAbsoluteStyles = props =>
	props.absolute && {
		dividerStyles: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			width: '100%',
		},
	};

const getStyles = props =>
	merge(
		{
			dividerStyles: {
				width: '100%',
				height: '1px',
				margin: props.inset ? '72px' : 0,
				border: 'none',
				flexShrink: 0,
				backgroundColor: props.light
					? fade(props.theme.palette.divider, 0.08)
					: props.theme.palette.divider,
			},
		},
		getAbsoluteStyles(props),
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);

function Divider(props) {
	const { children, className: classNameProp, is: C } = props;
	const { theme } = useContext(ThemeContext);
	const className = useMemo(
		() => cn(classNameProp, getStyles({ ...props, theme }).dividerStyles),
		[props, theme],
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
};

export default Divider;
