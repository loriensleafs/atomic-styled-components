/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deep-extend';
import ButtonBase from './../ButtonBase';
import { classify, themify } from './../themify';
import { fade } from './../utils/colorHelpers';

/**
  * Maps props to color styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.color='default']
  */
export const getColorStyles = ({ color, theme }) =>
	color === 'primary' || color === 'secondary'
		? {
				color: theme.colors[color].main,
				':hover': {
					backgroundColor: fade(theme.colors[color].main, theme.colors.action.hoverOpacity),
				},
			}
		: {};

/**
  * Maps props to fab styles
  * @param {object} props
  * @param {object} props.theme
  * @param {boolean} [props.fab=false]
  */
export const getFabStyles = ({ fab, theme }) =>
	fab
		? {
				borderRadius: '50%',
				padding: 0,
				minWidth: 0,
				width: 56,
				height: 56,
				boxShadow: theme.elevation[6],
				':active': {
					boxShadow: theme.elevation[12],
				},
			}
		: {};

/**
  * Maps props to full width styles
  * @param {object} props
  * @param {object} props.theme
  * @param {boolean} [props.fullWidth=false]
  */
export const getFullWidthStyles = ({ fullWidth }) =>
	fullWidth
		? {
				width: '100%',
			}
		: {};

/**
  * Maps props to mini button type styles
  * @param {object} props
  * @param {object} props.theme
  * @param {boolean} [props.fab=false]
  * @param {boolean} [props.mini=false]
  */
export const getMiniStyles = ({ fab, mini }) =>
	fab && mini
		? {
				width: 40,
				height: 40,
			}
		: {};

/**
  * Maps props to size styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.size='medium']
  */
export const getSizeStyles = (props) => {
	const { fontSizes, fontUnit, space } = props.theme;

	switch (props.size) {
		case 'small':
			return {
				padding: `${space[2] - 1}px ${space[2]}px`,
				minWidth: 64,
				minHeight: 32,
				fontSize: `${fontSizes[2] - 0.7}${fontUnit}`,
			};
		case 'large':
			return {
				padding: `${space[2]}px ${space[3] + space[2]}px`,
				minWidth: 112,
				minHeight: 32,
				fontSize: `${fontSizes[2]}${fontUnit}`,
			};
		default:
			return {};
	}
};

/**
  * Maps props to variant styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.variant='text']
  */
export const getVariantStyles = (props) => {
	const { colors, elevation, space } = props.theme;
	let next = {};

	if (props.variant === 'contained') {
		next = merge({}, next, {
			color: colors.text.secondary,
			backgroundColor: colors.gray.light,
			boxShadow: elevation[4],
			':focus': {
				boxShadow: elevation[6],
			},
			':active': {
				boxShadow: elevation[8],
			},
			':disabled': {
				color: colors.action.disabled,
				boxShadow: 'none',
				backgroundColor: colors.action.disabledBg,
			},
			':hover': {
				backgroundColor: colors.gray.light,
			},
		});

		if (props.color === 'primary' || props.color === 'secondary') {
			next = merge({}, next, {
				color: colors[props.color].contrast,
				backgroundColor: colors[props.color].main,
				':hover': {
					backgroundColor: colors[props.color].dark,
				},
			});
		}
	} else if (props.variant === 'outlined') {
		next = merge({}, next, {
			border: `1px solid ${colors.type === 'light'
				? colors.divider.light
				: colors.divider.contrast.light}`,
		});
	} else if (props.variant === 'extendedFab') {
		next = merge({}, next, {
			borderRadius: 48 / 2,
			padding: `0 ${space[3]}`,
			width: 'auto',
			minWidth: 48,
			height: 48,
		});
	}
	return next;
};

/**
  * Gets styles for all components/elements
  * @param {object} props
  */
const styles = (props) => {
	const {
		colors,
		duration,
		easing,
		fontSizes,
		fontUnit,
		lineHeights,
		radius,
		space,
	} = props.theme;

	return {
		root: merge(
			{
				boxSizing: 'border-box',
				minWidth: 64,
				minHeight: 36,
				padding: `${space[2]}px ${space[3]}px`,
				fontSize: `${fontSizes[2]}${fontUnit}`,
				lineHeight: `${lineHeights[2]}${fontUnit}`,
				borderRadius: `${radius}`,
				color: `${colors.text.primary}`,
				transition: `background-color ${duration.short}ms ${easing.easeIn}, color ${duration.short}ms ${easing.easeIn}, box-shadow ${duration.short}ms ${easing.easeIn}`,
				':hover': {
					textDecoration: 'none',
					backgroundColor: fade(colors.text.primary, 0.8),
				},
				':disabled': {
					backgroundColor: colors.action.disabled,
				},
			},
			getColorStyles(props),
			getFabStyles(props),
			getMiniStyles(props),
			getFullWidthStyles(props),
			getSizeStyles(props),
			getVariantStyles(props),
		),
		label: {
			display: 'inherit',
			alignItems: 'inherit',
			justifyContent: 'inherit',
		},
	};
};

/**
 * Creates a styled Button component
 * @param {object} props
 */
const Button = (props) => {
	const {
		blacklist,
		children,
		color,
		className,
		disabled,
		disableFocusRipple,
		disableRipple,
		fullWidth,
		mini,
		size,
		$styles,
		theme,
		type,
		variant,
		...passThru
	} = props;
	const { root: rootStyles, label: labelStyles } = styles(props);

	return (
		<ButtonBase
			$styles={merge({}, { root: rootStyles }, $styles)}
			className={className}
			disabled={disabled}
			focusRipple={!disableFocusRipple}
			{...passThru}
		>
			<span className={classify(merge({}, labelStyles, $styles.label))}>{children}</span>
		</ButtonBase>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	color: PropTypes.oneOf([ 'default', 'inherit', 'primary', 'secondary' ]),
	disabled: PropTypes.bool,
	disableFocusRipple: PropTypes.bool,
	disableRipple: PropTypes.bool,
	fullWidth: PropTypes.bool,
	href: PropTypes.string,
	mini: PropTypes.bool,
	size: PropTypes.oneOf([ 'small', 'medium', 'large' ]),
	$styles: PropTypes.object,
	theme: PropTypes.object,
	type: PropTypes.string,
	variant: PropTypes.oneOf([ 'text', 'outlined', 'contained', 'fab', 'extendedFab' ]),
};

Button.defaultProps = {
	color: 'default',
	component: 'button',
	disabled: false,
	disableFocusRipple: false,
	fullWidth: false,
	mini: false,
	size: 'medium',
	$styles: {
		root: {},
		label: {},
	},
	type: 'button',
	variant: 'text',
};

export default themify(Button);
