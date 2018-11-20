/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import merge from './../utils/pureRecursiveMerge';
import ButtonBase from './../ButtonBase/ButtonBase';
import { space } from 'styled-system';
import { isFunc } from './../utils/helpers';
import { fade } from './../utils/colorHelpers';

export const getColorStyles = ({ color, theme: { palette } }) =>
	(color === 'primary' || color === 'secondary') && {
		buttonStyles: {
			color: palette[color].main,
			':hover': {
				backgroundColor: fade(palette[color].main, palette.action.hoverOpacity),
			},
		},
	};

export const getFabStyles = ({ fab, theme: { elevation } }) =>
	fab && {
		buttonStyles: {
			borderRadius: '50%',
			padding: '0px',
			minWidth: '0px',
			width: '56px',
			height: '56px',
			boxShadow: elevation[6],
			':active': {
				boxShadow: elevation[12],
			},
		},
	};

export const getFullWidthStyles = ({ fullWidth }) =>
	fullWidth && {
		buttonStyles: {
			width: '100%',
		},
	};

export const getMiniStyles = ({ fab, mini }) =>
	fab &&
	mini && {
		buttonStyles: {
			width: '40px',
			height: '40px',
		},
	};

export const getSizeStyles = ({
	size,
	theme: {
		typography: { fontSizes, fontUnit },
		space,
	},
}) => {
	switch (size) {
		case 'small':
			return {
				buttonStyles: {
					padding: `${space[2] - 1}px ${space[2] + 1}px`,
					minWidth: '64px',
					minHeight: '32px',
					fontSize: `${fontSizes[2] - 0.07}${fontUnit}`,
				},
			};
		case 'large':
			return {
				buttonStyles: {
					padding: `${space[2]}px ${space[3] + space[2]}px`,
					minWidth: '112px',
					minHeight: '40px',
					fontSize: `${fontSizes[2] + 0.0625}${fontUnit}`,
				},
			};
		default:
			return {};
	}
};

export const getVariantStyles = ({ color, variant, theme: { elevation, palette, space } }) => {
	let next = {};

	if (variant === 'contained') {
		next = merge(next, {
			buttonStyles: {
				color: palette.text.primary,
				backgroundColor: palette.grey.light,
				boxShadow: elevation[2],
				':active': {
					boxShadow: elevation[8],
				},
				':disabled': {
					color: palette.action.disabled,
					boxShadow: 'none',
					backgroundColor: palette.action.disabledBg,
				},
				':hover': {
					backgroundColor: palette.grey.light,
				},
			},
		});

		if (color === 'primary' || color === 'secondary') {
			next = merge(next, {
				buttonStyles: {
					color: palette[color].contrastText,
					backgroundColor: palette[color].main,
					':hover': {
						backgroundColor: palette[color].dark,
					},
				},
			});
		}
	} else if (variant === 'outlined') {
		next = merge(next, {
			buttonStyles: {
				':disabled': {
					color: palette.action.disabled,
					backgroundColor: 'transparent',
					border: `1px solid ${palette.action.disabled}`,
				},
			},
		});
		if (color === 'primary' || color === 'secondary') {
			next = merge(next, {
				buttonStyles: {
					border: `1px solid ${fade(palette[color].main, 0.5)}`,
					':hover': {
						border: `1px solid ${palette[color].main}`,
					},
				},
			});
		} else {
			next = merge(next, {
				buttonStyles: {
					border: `1px solid ${
						palette.type === 'light' ? palette.grey.main : palette.divider.dark.light
					}`,
					':hover': {
						border: `1px solid ${
							palette.type === 'light'
								? palette.grey.dark
								: palette.divider.dark.primary
						}`,
					},
				},
			});
		}
	} else if (variant === 'extendedFab') {
		next = merge(next, {
			buttonStyles: {
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

const getStyles = props =>
	merge(
		{
			buttonStyles: {
				boxSizing: 'border-box',
				minWidth: '64px',
				minHeight: '36px',
				padding: `${props.theme.space[2]}px ${props.theme.space[3]}px`,
				fontSize: `${props.theme.typography.fontSizes[2]}${
					props.theme.typography.fontUnit
				}`,
				fontWeight: props.theme.typography.fontWeights.medium,
				lineHeight: `${props.theme.typography.lineHeights[1]}${
					props.theme.typography.fontUnit
				}`,
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
		},
		getColorStyles(props),
		getFabStyles(props),
		getMiniStyles(props),
		getFullWidthStyles(props),
		getVariantStyles(props),
		getSizeStyles(props),
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);

function Button(props) {
	const { theme } = useContext(ThemeContext);
	const {
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
		styles,
		type,
		variant,
		...passThru
	} = props;
	const { buttonStyles, labelStyles } = useMemo(() => getStyles({ ...props, ...{ theme } }), [
		props,
		theme,
	]);

	return (
		<ButtonBase
			styles={{ buttonStyles }}
			className={className}
			disabled={disabled}
			focusRipple={!disableFocusRipple}
			{...passThru}>
			<span className={cn(labelStyles)}>{children}</span>
		</ButtonBase>
	);
}

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
