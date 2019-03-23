import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { getSpacing, getText, useStyles } from './../system';
import combine from './../utils/combine';
import { componentPropType, stylesPropType } from './../utils/propTypes';

const getColorStyles = props => {
	const {
		disabled,
		color,
		theme: { palette },
	} = props;

	if (props.disabled) {
		return { color: palette.action.disabled };
	} else if (
		color === 'primary' ||
		color === 'secondary' ||
		color === 'error'
	) {
		return { color: palette[color].main };
	} else if (color === 'active') {
		return { color: palette.action.active };
	}
};

const getTextStyles = ({ fontSize }) =>
	fontSize && fontSize === 'inherit' && { fontSize: 'inherit' };

const getBaseStyles = ({ theme }) => ({
	width: '1em',
	height: '1em',
	userSelect: 'none',
	fontSize: '24px',
	display: 'inline-block',
	flexShrink: 0,
	fill: 'currentColor',
	transition: theme.getTransition('fill', {
		duration: 'shorter',
		easing: 'in',
	}),
});

const getStyles = combine(
	getBaseStyles,
	getTextStyles,
	getColorStyles,
	getSpacing,
	getText,
);
getStyles.propTypes = {
	/**
	 * The color of the component. It supports those theme colors that make
	 * sense for this component.
	 * You can use the `nativeColor` property to apply a color attribute to the
	 * SVG element.
	 */
	color: PropTypes.oneOf([
		'inherit',
		'primary',
		'secondary',
		'action',
		'error',
		'disabled',
	]),
	/**
	 * The fontSize applied to the icon. Defaults to 24px, but can be configure
	 * to inherit font size.
	 */
	fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	...getSpacing.propTypes,
	...getText.propTypes,
};

const SvgIcon = forwardRef((props, ref) => {
	const {
		classes,
		props: {
			as: Component,
			children,
			nativeColor,
			titleAccess,
			viewBox,
			...passThru
		},
	} = useStyles(props, getStyles);

	return (
		<Component
			aria-hidden={titleAccess ? 'false' : 'true'}
			className={classes}
			color={nativeColor}
			focusable="false"
			ref={ref}
			viewBox={viewBox}
			{...passThru}
		>
			{children}
			{titleAccess ? <title>{titleAccess}</title> : null}
		</Component>
	);
});

SvgIcon.displayName = 'SvgIcon';

SvgIcon.propTypes = {
	// Node passed into the SVG element.
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	// Applies a color attribute to the SVG element.
	nativeColor: PropTypes.string,
	/**
	 * Provides a human-readable title for the element that contains it.
	 * https://www.w3.org/TR/SVG-access/#Equivalent
	 */
	titleAccess: PropTypes.string,
	/**
	 * Allows you to redefine what the coordinates without units mean inside an
	 * SVG element.
	 * For example, if the SVG element is 500 (width) by 200 (height),
	 * and you pass viewBox="0 0 50 20",
	 * this means that the coordinates inside the SVG will go from the top left
	 * corner (0,0)
	 * to bottom right (50,20) and each unit will be worth 10px.
	 */
	viewBox: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

SvgIcon.defaultProps = {
	as: 'svg',
	color: 'inherit',
	fontSize: '24px',
	viewBox: '0 0 24 24',
};

export default SvgIcon;
