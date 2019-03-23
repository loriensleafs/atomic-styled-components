import PropTypes from 'prop-types';
import React from 'react';
import { getFontSize, getSpacing, useStyles } from '../styles';
import combine from '../utils/combine';
import { stylesPropType } from '../utils/propTypes';

const getColorStyles = ({ color, disabled, theme: { palette } }) => {
	if (disabled) return { color: palette.action.disabled };

	switch (color) {
		case 'primary':
		case 'secondary':
		case 'error':
			return { color: palette[color].main };
		case 'active':
			return { color: palette.action.active };
		default:
			// 'inherit'
			return { root: { color: 'inherit' } };
	}
};

const getStyles = combine(getColorStyles, getFontSize, getSpacing);
getStyles.propTypes = {
	/**
	 * The color of the component. It supports those theme colors that make
	 * sense for this component.
	 */
	color: PropTypes.oneOf([
		'inherit',
		'primary',
		'secondary',
		'action',
		'error',
		'disabled',
	]),
	...getFontSize.propTypes,
	...getSpacing.propTypes,
};

const baseStyles = {
	userSelect: 'none',
	fontSize: '24px',
	width: '1em',
	height: '1em',
	overflow: 'hidden',
	flexShrink: 0,
};

function Icon(props) {
	const {
		classes,
		props: { children, ...passThru },
	} = useStyles(props, getStyles, { baseStyles });

	return (
		<span
			className={classes}
			aria-hidden="true"
			disabled={disabled}
			{...passThru}
		>
			{children}
		</span>
	);
}

Icon.displayName = 'Icon';

Icon.propTypes = {
	// The name of the icon font ligature.
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * The fontSize applied to the icon. Defaults to 24px, but can be configure
	 * to inherit font size.
	 */
	fontSize: PropTypes.oneOf(['inherit', 'default']),
	...stylesPropType,
	...getStyles.propTypes,
};

Icon.defaultProps = {
	color: 'inherit',
	fontSize: 'default',
};

export default Icon;
