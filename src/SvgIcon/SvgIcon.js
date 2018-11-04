import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import merge from './../utils/pureRecursiveMerge';
import ThemeContext from './../theme/ThemeContext';
import cn from './../styles/className';
import { space, fontSize } from 'styled-system';
import { getColorStyles } from './../Icon/Icon';
import { isFunc } from './../utils/helpers';

export const getFontSizeStyles = ({ fontSize }) =>
	fontSize &&
	fontSize === 'inherit' && {
		fontSize: 'inherit',
	};

export const getStyles = props =>
	merge(
		{
			width: '1em',
			height: '1em',
			userSelect: 'none',
			fontSize: '24px',
			display: 'inline-block',
			flexShrink: 0,
			fill: 'currentColor',
			transition: `fill ${
				props.theme.duration.shorter
			}ms cubic-bezier(${props.theme.easing.in.join()})`,
		},
		getFontSizeStyles(props),
		getColorStyles(props),
		space(props),
		fontSize(props),
		isFunc(props.styles) ? props.styles(props) : props.styles,
	);

function SvgIcon(props) {
	const { theme } = useContext(ThemeContext);
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
		styles,
		...passThru
	} = props;

	return (
		<Component
			className={cn(getStyles({ ...props, ...{ theme } }), className)}
			focusable="false"
			viewBox={viewBox}
			color={nativeColor}
			aria-hidden={titleAccess ? 'false' : 'true'}
			{...passThru}>
			{children}
			{titleAccess ? <title>{titleAccess}</title> : null}
		</Component>
	);
}

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
	color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'action', 'error', 'disabled']),
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
	/**
	 * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
	 */
	fontSize: PropTypes.oneOf(['inherit', 'default']),
	/**
	 * Applies a color attribute to the SVG element.
	 */
	nativeColor: PropTypes.string,
	/**
	 * Provides a human-readable title for the element that contains it.
	 * https://www.w3.org/TR/SVG-access/#Equivalent
	 */
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	titleAccess: PropTypes.string,
	/**
	 * Allows you to redefine what the coordinates without units mean inside an SVG element.
	 * For example, if the SVG element is 500 (width) by 200 (height),
	 * and you pass viewBox="0 0 50 20",
	 * this means that the coordinates inside the SVG will go from the top left corner (0,0)
	 * to bottom right (50,20) and each unit will be worth 10px.
	 */
	viewBox: PropTypes.string,
	...fontSize.propTypes,
	...space.propTypes,
};

SvgIcon.defaultProps = {
	color: 'inherit',
	component: 'svg',
	fontSize: '24px',
	styles: {},
	viewBox: '0 0 24 24',
};

export default SvgIcon;
