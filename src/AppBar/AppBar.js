import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Paper from './../Paper';
import combine from './../utils/combine';
import { getColors, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getColorStyles({ color, theme }) {
	switch (color) {
		case 'primary':
		case 'secondary':
			return getColors({
				bg: `${color}.main`,
				color: `${color}.contrastText`,
			});
		case 'default':
			return getColors({
				bg: `grey.${theme.palette.type}`,
			});
		default:
			// 'inherit'
			return null;
	}
}

function getPositionStyles({ position }) {
	switch (position) {
		case 'absolute':
			return { position: 'absolute' };
		case 'relative':
			return { position: 'relative' };
		case 'static':
			return { position: 'static' };
		case 'sticky':
			return { position: 'sticky' };
		default:
			// 'fixed'
			return { position: 'fixed' };
	}
}

const getStyles = combine(getPositionStyles, getColorStyles);
getStyles.propTypes = {
	color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'default']),
	position: PropTypes.oneOf([
		'absolute',
		'fixed',
		'relative',
		'static',
		'sticky',
	]),
};

const baseStyles = {
	boxSizing: 'border-box',
	zIndex: 1100,
	top: '0px',
	left: 'auto',
	right: '0px',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	flexShrink: 0,
};

const AppBar = forwardRef((props, ref) => {
	const [{ styles }, { children, ...passThru }] = useStyles(
		props,
		getStyles,
		{
			baseStyles,
		},
	);

	return (
		<Paper
			as="header"
			elevation={4}
			styles={styles}
			radius="square"
			ref={ref}
			{...passThru}
		>
			{children}
		</Paper>
	);
});

AppBar.displayName = 'AppBar';

AppBar.propTypes = {
	/**
	 * The content of the component.
	 */
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	...getColorStyles.propTypes,
	/**
	 * The positioning type.
	 * Note: `sticky` is not universally supported and will fall back to
	 * `static` when unavailable.
	 */
	...getPositionStyles.propTypes,
	...stylesPropType,
};

AppBar.defaultProps = {
	color: 'primary',
	position: 'fixed',
};

export default AppBar;
