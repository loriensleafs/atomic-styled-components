import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './../system/useStyles';
import combine from './../utils/combine';
import { fade } from './../utils/colorHelpers';
import { stylesPropType } from './../utils/propTypes';

function getPositionStyles({ absolute }) {
	if (absolute) {
		return {
			position: 'absolute',
			bottom: 0,
			left: 0,
			width: '100%',
		};
	}
	return null;
}

function getColorStyles({ light, theme }) {
	return {
		backgroundColor: light
			? fade(theme.palette.divider, 0.08)
			: theme.palette.divider,
	};
}

function getIndentStyles({ inset }) {
	return inset ? { margin: '72px' } : null;
}

const getStyles = combine(getPositionStyles, getColorStyles, getIndentStyles);
getStyles.propTypes = {
	absolute: PropTypes.bool,
	/**
	 * If `true`, the divider will be indented.
	 */
	inset: PropTypes.bool,
	/**
	 * If `true`, the divider will have a lighter color.
	 */
	light: PropTypes.bool,
};

const baseStyles = {
	width: '100%',
	height: '1px',
	margin: '0px',
	border: 'none',
	flexShrink: 0,
};

function Divider(props) {
	const [
		{ classes },
		{ children, className, as: C, ...passThru },
	] = useStyles(props, getStyles, { baseStyles });

	return <C className={classes}>{children}</C>;
}

Divider.displayName = 'Divider';

Divider.propTypes = {
	className: PropTypes.string,
	...stylesPropType,
	...getStyles.propTypes,
};

Divider.defaultProps = {
	absolute: false,
	inset: false,
	as: 'hr',
	light: false,
};

export default Divider;
