import React from 'react';
import PropTypes from 'prop-types';
import combine from './../utils/combine';
import { getSpacing, getText, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getColorStyles(props) {
	if (props.disabled) {
		return {
			color: props.theme.palette.action.disabled,
		};
	} else if (
		props.color === 'primary' ||
		props.color === 'secondary' ||
		props.color === 'error'
	) {
		return {
			color: props.theme.palette[props.color].main,
		};
	} else if (props.color === 'active') {
		return {
			color: props.theme.palette.action.active,
		};
	}
	return null;
}

function getTextStyles(props) {
	if (props.fontSize && props.fontSize === 'inherit') {
		return {
			fontSize: 'inherit',
		};
	}
	return null;
}

function getBaseStyles(props) {
	return {
		width: '1em',
		height: '1em',
		userSelect: 'none',
		fontSize: '24px',
		display: 'inline-block',
		flexShrink: 0,
		fill: 'currentColor',
		transition: props.theme.getTransition('fill', 'shorter', 'in'),
	};
}

const getStyles = combine(
	getBaseStyles,
	getTextStyles,
	getColorStyles,
	getSpacing,
	getText,
);
getStyles.propTypes = {
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 * You can use the `nativeColor` property to apply a color attribute to the SVG element.
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
	 * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
	 */
	fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	...getSpacing.propTypes,
	...getText.propTypes,
};

function SvgIcon(props) {
	const [
		{ classes },
		{
			children,
			className,
			component: Component,
			nativeColor,
			titleAccess,
			viewBox,
			...passThru
		},
	] = useStyles(props, getStyles);

	return (
		<Component
			className={classes}
			focusable="false"
			viewBox={viewBox}
			color={nativeColor}
			aria-hidden={titleAccess ? 'false' : 'true'}
			{...passThru}
		>
			{children}
			{titleAccess ? <title>{titleAccess}</title> : null}
		</Component>
	);
}

SvgIcon.displayName = 'SvgIcon';

SvgIcon.propTypes = {
	/**
	 * Node passed into the SVG element.
	 */
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	/**
	 * Applies a color attribute to the SVG element.
	 */
	nativeColor: PropTypes.string,
	/**
	 * Provides a human-readable title for the element that contains it.
	 * https://www.w3.org/TR/SVG-access/#Equivalent
	 */
	...stylesPropType,
	titleAccess: PropTypes.string,
	/**
	 * Allows you to redefine what the coordinates without units mean inside an SVG element.
	 * For example, if the SVG element is 500 (width) by 200 (height),
	 * and you pass viewBox="0 0 50 20",
	 * this means that the coordinates inside the SVG will go from the top left corner (0,0)
	 * to bottom right (50,20) and each unit will be worth 10px.
	 */
	viewBox: PropTypes.string,
	...getStyles.propTypes,
};

SvgIcon.defaultProps = {
	color: 'inherit',
	component: 'svg',
	fontSize: '24px',
	viewBox: '0 0 24 24',
};

export default SvgIcon;
