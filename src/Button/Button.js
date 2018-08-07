/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import { classify, themify } from './../styled';
import ButtonBase from './../ButtonBase';
import { fade } from './../utils/colorHelpers';

/**
 * Maps props to styles
 * Button component color styles
 */
export const getColorStyles = (props) => {
	const { colors } = props.theme;
	let next = {};

	if (props.color === 'primary') {
		next = {
			...next,
			...{
				color: colors.primary.main,
				':hover': {
					backgroundColor: fade(colors.primary.main, colors.action.hoverOpacity),
				},
			},
		};
	} else if (props.color === 'secondary') {
		next = {
			...next,
			...{
				color: colors.secondary.main,
				':hover': {
					backgroundColor: fade(colors.secondary.main, colors.action.hoverOpacity),
				},
			},
		};
	}
	return next;
};

/**
 * Maps props to styles
 * Button component fab styles
 */
export const getFabStyles = (props) => {
	const { elevation } = props.theme;
	let next = {};

	if (props.fab) {
		next = {
			...next,
			...{
				borderRadius: '50%',
				padding: 0,
				minWidth: 0,
				width: 56,
				height: 56,
				boxShadow: elevation[6],
				':active': {
					boxShadow: elevation[12],
				},
			},
		};
	}
	return next;
};

/**
 * Maps props to styles
 * Button component full width styles
 */
export const getFullWidthStyles = (props) => {
	return props.fullWidth
		? {
				width: '100%',
			}
		: {};
};

/**
 * Maps props to styles
 * Button component mini variation styles
 */
export const getMiniStyles = (props) => {
	let next = {};

	if (props.fab && props.mini) {
		next = {
			...next,
			...{
				width: 40,
				height: 40,
			},
		};
	}
	return next;
};

/**
 * Maps props to styles
 * Button component size styles
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
 * Maps props to styles
 * Button component variant styles
 */
export const getVariantStyles = (props) => {
	const { colors, elevation, space } = props.theme;
	let next = {};

	if (props.variant === 'contained') {
		next = {
			...next,
			...{
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
			},
		};

		if (props.color === 'primary' || props.color === 'secondary') {
			next = {
				...next,
				...{
					color: colors[props.color].contrast,
					backgroundColor: colors[props.color].main,
					':hover': {
						backgroundColor: colors[props.color].dark,
					},
				},
			};
		}
	} else if (props.variant === 'outlined') {
		next = {
			...next,
			...{
				border: `1px solid ${colors.type === 'light'
					? colors.divider.light
					: colors.divider.contrast.light}`,
			},
		};
	} else if (props.variant === 'extendedFab') {
		next = {
			...next,
			...{
				borderRadius: 48 / 2,
				padding: `0 ${space[3]}`,
				width: 'auto',
				minWidth: 48,
				height: 48,
			},
		};
	}
	return next;
};

/**
 * Maps props to styles
 * Button component composed root styles
 */
const getRootStyles = (props) => {
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
		...{
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
		...getColorStyles(props),
		...getFabStyles(props),
		...getMiniStyles(props),
		...getFullWidthStyles(props),
		...getSizeStyles(props),
		...getVariantStyles(props),
	};
};

const labelStyles = {
	display: 'inherit',
	alignItems: 'inherit',
	justifyContent: 'inherit',
};

// Composed Button component
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
		href,
		labelStyles: labelStylesProp = {},
		mini,
		size,
		styles = {},
		theme,
		type,
		variant,
		...passThru
	} = props;

	const labelClassName = classify({ ...labelStyles, ...labelStylesProp }, labelClassName);

	return (
		<ButtonBase
			styles={{ ...getRootStyles(props), ...styles }}
			className={className}
			disabled={disabled}
			focusRipple={!disableFocusRipple}
			{...passThru}
		>
			<span className={labelClassName}>{children}</span>
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
	styles: PropTypes.object,
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
	type: 'button',
	variant: 'text',
	blacklist: [
		'color',
		'disableFocusRipple',
		'disableRipple',
		'fullWidth',
		'focusRipple',
		'mini',
		'size',
		'variant',
	],
};

export default themify(Button);
