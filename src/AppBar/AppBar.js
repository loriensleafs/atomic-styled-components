import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Paper from '../Paper';
import useStyles from '../system/useStyles';
import combine from '../utils/combine';
import { stylesPropType } from '../utils/propTypes';

const getColorStyles = ({ color, theme: { palette } }) => {
	switch (color) {
		case 'primary':
		case 'secondary':
			return {
				color: palette[color].contrastText,
				backgroundColor: palette[color].main,
			};
		case 'default':
			return { backgroundColor: palette.grey[palette.type] };
	}
};

const getPositionStyles = ({ position }) => {
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
};

const getStyles = combine(getPositionStyles, getColorStyles);
getStyles.propTypes = {
	// The color of the component.  Supports theme colors that make sense.
	color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'default']),
	// The positioning type.
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
	const {
		props: { children, ...passThru },
		styles,
	} = useStyles(props, getStyles, { baseStyles });

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
	// The content of the component.
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	...getStyles.propTypes,
	...stylesPropType,
};

AppBar.defaultProps = {
	color: 'primary',
	position: 'fixed',
};

export default AppBar;
