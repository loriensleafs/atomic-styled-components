/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';
import merge from './../utils/pureRecursiveMerge';
import ButtonBase from './../ButtonBase/ButtonBase';
import { space } from 'styled-system';
import { fade } from './../utils/colorHelpers';

export const getColorStyles = props =>
	(props.color === 'primary' || props.color === 'secondary') && {
		rootStyles: {
			color: props.theme.palette[props.color].main,
			':hover': {
				backgroundColor: fade(
					props.theme.palette[props.color].main,
					props.theme.palette.action.hoverOpacity,
				),
			},
		},
	};

export const getFabStyles = props =>
	props.fab && {
		rootStyles: {
			borderRadius: '50%',
			padding: '0px',
			minWidth: '0px',
			width: '56px',
			height: '56px',
			boxShadow: props.theme.elevation[6],
			':active': {
				boxShadow: props.theme.elevation[12],
			},
		},
	};

export const getFullWidthStyles = props =>
	props.fullWidth && {
		rootStyles: {
			width: '100%',
		},
	};

export const getMiniStyles = props =>
	props.fab &&
	props.mini && {
		rootStyles: {
			width: '40px',
			height: '40px',
		},
	};

export const getSizeStyles = props => {
	switch (props.size) {
		case 'small':
			return {
				rootStyles: {
					padding: `${props.theme.space[2] - 1}px ${props.theme.space[2] + 1}px`,
					minWidth: '64px',
					minHeight: '32px',
					fontSize: `${props.theme.typography.fontSizes[2] - 0.07}${
						props.theme.typography.fontUnit
					}`,
				},
			};
		case 'large':
			return {
				rootStyles: {
					padding: `${props.theme.space[2]}px ${props.theme.space[3] +
						props.theme.space[2]}px`,
					minWidth: '112px',
					minHeight: '40px',
					fontSize: `${props.theme.typography.fontSizes[2] + 0.0625}${
						props.theme.typography.fontUnit
					}`,
				},
			};
		default:
			return {};
	}
};

export const getVariantStyles = props => {
	let next = {};

	if (props.variant === 'contained') {
		next = merge(next, {
			rootStyles: {
				color: props.theme.palette.text.primary,
				backgroundColor: props.theme.palette.grey.light,
				boxShadow: props.theme.elevation[2],
				':active': {
					boxShadow: props.theme.elevation[8],
				},
				':disabled': {
					color: props.theme.palette.action.disabled,
					boxShadow: 'none',
					backgroundColor: props.theme.palette.action.disabledBg,
				},
				':hover': {
					backgroundColor: props.theme.palette.grey.light,
				},
			},
		});

		if (props.color === 'primary' || props.color === 'secondary') {
			next = merge(next, {
				rootStyles: {
					color: props.theme.palette[props.color].contrastText,
					backgroundColor: props.theme.palette[props.color].main,
					':hover': {
						backgroundColor: props.theme.palette[props.color].dark,
					},
				},
			});
		}
	} else if (props.variant === 'outlined') {
		next = merge(next, {
			rootStyles: {
				':disabled': {
					color: props.theme.palette.action.disabled,
					backgroundColor: 'transparent',
					border: `1px solid ${props.theme.palette.action.disabled}`,
				},
			},
		});
		if (props.color === 'primary' || props.color === 'secondary') {
			next = merge(next, {
				rootStyles: {
					border: `1px solid ${fade(props.theme.palette[props.color].main, 0.5)}`,
					':hover': {
						border: `1px solid ${props.theme.palette[props.color].main}`,
					},
				},
			});
		} else {
			next = merge(next, {
				rootStyles: {
					border: `1px solid ${
						props.theme.palette.type === 'light'
							? props.theme.palette.grey.main
							: props.theme.palette.divider.dark.light
					}`,
					':hover': {
						border: `1px solid ${
							props.theme.palette.type === 'light'
								? props.theme.palette.grey.dark
								: props.theme.palette.divider.dark.primary
						}`,
					},
				},
			});
		}
	} else if (props.variant === 'extendedFab') {
		next = merge(next, {
			rootStyles: {
				borderRadius: `${48 / 2}px`,
				padding: `0 ${props.theme.space[3]}`,
				width: 'auto',
				minWidth: '48px',
				height: '48px',
			},
		});
	}
	return next;
};

const getBaseStyles = props => ({
	rootStyles: {
		boxSizing: 'border-box',
		minWidth: '64px',
		minHeight: '36px',
		padding: `${props.theme.space[2]}px ${props.theme.space[3]}px`,
		fontFamily: props.theme.typography.fontFamily,
		fontSize: `${props.theme.typography.fontSizes[2]}${props.theme.typography.fontUnit}`,
		fontWeight: props.theme.typography.fontWeights.medium,
		lineHeight: `${props.theme.typography.lineHeights[1]}${props.theme.typography.fontUnit}`,
		borderRadius: `${props.theme.shape.borderRadius.round}`,
		color: `${props.theme.palette.text.primary}`,
		textTransform: 'uppercase',
		transition: `background-color ${
			props.theme.duration.short
		}ms cubic-bezier(${props.theme.easing.inOut.join()}), color ${
			props.theme.duration.short
		}ms cubic-bezier(${props.theme.easing.inOut.join()}), box-shadow ${
			props.theme.duration.shortest
		}ms cubic-bezier(${props.theme.easing.in.join()}), border ${
			props.theme.duration.short
		}ms cubic-bezier(${props.theme.easing.inOut.join()})`,
		':hover': {
			textDecoration: 'none',
			backgroundColor: props.theme.palette.grey.light,
		},
		':disabled': {
			color: props.theme.palette.action.disabled,
			backgroundColor: props.theme.palette.action.disabledBg,
		},
		...space(props),
	},
	labelStyles: {
		display: 'inherit',
		alignItems: 'inherit',
		justifyContent: 'inherit',
	},
});

function Button(props) {
	const {
		children,
		color,
		className,
		disabled,
		disableFocusRipple,
		disableRipple,
		fab,
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
		styles,
		type,
		variant,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const { rootStyles, labelStyles } = useStyles(
		[
			getBaseStyles,
			getColorStyles,
			getFabStyles,
			getMiniStyles,
			getFullWidthStyles,
			getVariantStyles,
			getSizeStyles,
		],
		{
			color,
			disabled,
			disableFocusRipple,
			disableRipple,
			fab,
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
			styles,
			type,
			variant,
			theme,
		},
	);
	const labelClassName = useMemo(() => cn(labelStyles), [labelStyles]);

	return (
		<ButtonBase
			styles={{ rootStyles }}
			className={className}
			disabled={disabled}
			focusRipple={!disableFocusRipple}
			{...passThru}>
			<span className={labelClassName}>{children}</span>
		</ButtonBase>
	);
}

Button.displayName = 'Button';

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
	disabled: PropTypes.bool,
	disableFocusRipple: PropTypes.bool,
	disableRipple: PropTypes.bool,
	fullWidth: PropTypes.bool,
	href: PropTypes.string,
	mini: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	type: PropTypes.string,
	variant: PropTypes.oneOf(['text', 'outlined', 'contained', 'fab', 'extendedFab']),
	...space.propTypes,
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
};

export default Button;
