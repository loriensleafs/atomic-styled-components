/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import merge from './../utils/pureRecursiveMerge';
import { space as spaceSystem } from 'styled-system';
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
				root: {
					color: theme.colors[color].main,
					':hover': {
						backgroundColor: fade(
							theme.colors[color].main,
							theme.colors.action.hoverOpacity,
						),
					},
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
				root: {
					borderRadius: '50%',
					padding: '0px',
					minWidth: '0px',
					width: '56px',
					height: '56px',
					boxShadow: theme.elevation[6],
					':active': {
						boxShadow: theme.elevation[12],
					},
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
				root: {
					width: '100%',
				},
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
				root: {
					width: '40px',
					height: '40px',
				},
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
				root: {
					padding: `${space[2] - 1}px ${space[2] + 1}px`,
					minWidth: '64px',
					minHeight: '32px',
					fontSize: `${fontSizes[1] - 0.07}${fontUnit}`,
				},
			};
		case 'large':
			return {
				root: {
					padding: `${space[2]}px ${space[3] + space[2]}px`,
					minWidth: '112px',
					minHeight: '40px',
					fontSize: `${fontSizes[1] + 0.0625}${fontUnit}`,
				},
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
			root: {
				color: colors.text.secondary,
				backgroundColor: colors.gray.light,
				boxShadow: elevation[2],
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
		});

		if (props.color === 'primary' || props.color === 'secondary') {
			next = merge({}, next, {
				root: {
					color: colors[props.color].contrast,
					backgroundColor: colors[props.color].main,
					':hover': {
						backgroundColor: colors[props.color].dark,
					},
				},
			});
		}
	} else if (props.variant === 'outlined') {
		next = merge({}, next, {
			root: {
				':disabled': {
					color: colors.action.disabled,
					backgroundColor: 'transparent',
					border: `1px solid ${colors.action.disabled}`,
				},
			},
		});
		if (props.color === 'primary' || props.color === 'secondary') {
			next = merge({}, next, {
				root: {
					border: `1px solid ${fade(colors[props.color].main, 0.5)}`,
					':hover': {
						border: `1px solid ${colors[props.color].main}`,
					},
				},
			});
		} else {
			next = merge({}, next, {
				root: {
					border: `1px solid ${colors.type === 'light'
						? colors.gray.main
						: colors.divider.contrast.light}`,
					':hover': {
						border: `1px solid ${colors.type === 'light'
							? colors.gray.dark
							: colors.divider.contrast.primary}`,
					},
				},
			});
		}
	} else if (props.variant === 'extendedFab') {
		next = merge({}, next, {
			root: {
				borderRadius: `${48 / 2}px`,
				padding: `0 ${space[3]}`,
				width: 'auto',
				minWidth: '48px',
				height: '48px',
			},
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
		fontWeights,
		lineHeights,
		radius,
		space,
		$styles,
	} = props.theme;

	return merge(
		{
			root: {
				boxSizing: 'border-box',
				minWidth: '64px',
				minHeight: '36px',
				padding: `${space[2]}px ${space[3]}px`,
				fontSize: `${fontSizes[1]}${fontUnit}`,
				fontWeight: fontWeights.medium,
				lineHeight: `${lineHeights[1]}${fontUnit}`,
				borderRadius: `${radius}`,
				color: `${colors.text.primary}`,
				textTransform: 'uppercase',
				transition: `background-color ${duration.short}ms cubic-bezier(${easing.inOut.join()}), color ${duration.short}ms cubic-bezier(${easing.inOut.join()}), box-shadow ${duration.shortest}ms cubic-bezier(${easing.in.join()}), border ${duration.short}ms cubic-bezier(${easing.inOut.join()})`,
				':hover': {
					textDecoration: 'none',
					backgroundColor: colors.text.light,
				},
				':disabled': {
					color: colors.action.disabled,
					backgroundColor: colors.action.disabledBg,
				},
				...spaceSystem(props),
			},
			label: {
				display: 'inherit',
				alignItems: 'inherit',
				justifyContent: 'inherit',
			},
		},
		getColorStyles(props),
		getFabStyles(props),
		getMiniStyles(props),
		getFullWidthStyles(props),
		getVariantStyles(props),
		getSizeStyles(props),
		$styles,
	);
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
			$styles={{ root: rootStyles }}
			className={className}
			disabled={disabled}
			focusRipple={!disableFocusRipple}
			{...passThru}
		>
			<span className={classify(labelStyles)}>{children}</span>
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
	...spaceSystem.propTypes,
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
