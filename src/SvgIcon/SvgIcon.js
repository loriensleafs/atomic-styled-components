import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deep-extend';
import { space as spaceSystem, fontSize as fontSizeSystem } from 'styled-system';
import { themify, classify } from './../themify';
import { getColorStyles } from './../Icon/Icon';

/**
  * Maps props to font-size styles
  * @param {object} props
  * @param {object} props.theme
  */
export const getFontSizeStyles = ({ fontSize }) =>
	fontSize && fontSize === 'inherit'
		? {
				fontSize: 'inherit',
			}
		: {};

/**
  * Maps props to root styles
  * @param {object} props
  * @param {object} props.theme
  */
export const styles = (props) => {
	const { duration, easing } = props.theme;

	return merge(
		{
			...{
				width: '1em',
				height: '1em',
				userSelect: 'none',
				fontSize: '24px',
				display: 'inline-block',
				flexShrink: 0,
				fill: 'currentColor',
				transition: `fill ${duration.shorter}ms cubic-bezier(${easing.easeIn.join()})`,
			},
			...getFontSizeStyles(props),
			...getColorStyles(props),
			...spaceSystem(props),
			...fontSizeSystem(props),
		},
		props.$style,
	);
};

/**
 * Creates a styled SvgIcon component
 * @param {object} props
 */
const SvgIcon = (props) => {
	const {
		children,
		className,
		color,
		component: Component,
		fontSize,
		nativeColor,
		m,
		ml,
		mr,
		mt,
		mb,
		mx,
		my,
		p,
		pl,
		pr,
		pt,
		pb,
		px,
		py,
		titleAccess,
		viewBox,
		$styles,
		theme,
		...passThru
	} = props;

	return (
		<Component
			className={classify(styles(props), className)}
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
};

SvgIcon.propTypes = {
	/**
	 * Node passed into the SVG element.
	 */
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 * You can use the `nativeColor` property to apply a color attribute to the SVG element.
	 */
	color: PropTypes.oneOf([ 'inherit', 'primary', 'secondary', 'action', 'error', 'disabled' ]),
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([ PropTypes.string, PropTypes.func, PropTypes.object ]),
	/**
	 * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
	 */
	fontSize: PropTypes.oneOf([ 'inherit', 'default' ]),
	/**
	 * Applies a color attribute to the SVG element.
	 */
	nativeColor: PropTypes.string,
	/**
	 * Provides a human-readable title for the element that contains it.
	 * https://www.w3.org/TR/SVG-access/#Equivalent
	 */
	$styles: PropTypes.object,
	theme: PropTypes.object,
	titleAccess: PropTypes.string,
	/**
	 * Allows you to redefine what the coordinates without units mean inside an SVG element.
	 * For example, if the SVG element is 500 (width) by 200 (height),
	 * and you pass viewBox="0 0 50 20",
	 * this means that the coordinates inside the SVG will go from the top left corner (0,0)
	 * to bottom right (50,20) and each unit will be worth 10px.
	 */
	viewBox: PropTypes.string,
	...fontSizeSystem.propTypes,
	...spaceSystem.propTypes,
};

SvgIcon.defaultProps = {
	color: 'inherit',
	component: 'svg',
	fontSize: '24px',
	$styles: { root: {} },
	viewBox: '0 0 24 24',
};

export default themify(SvgIcon);
