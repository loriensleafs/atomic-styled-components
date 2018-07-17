import React from 'react';
import PropTypes from 'prop-types';
import { styled, withStyle } from './../styled';
import ButtonBase from './ButtonBase';
import { fade } from './../utils/colorHelpers';

// Button component prop types
export const buttonPropTypes = {
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
	type: PropTypes.string,
	variant: PropTypes.oneOf([ 'text', 'outlined', 'contained', 'fab', 'extendedFab' ]),
};

// Button color styles parser
const color = ({ theme, ...props }) => {
	let next = {};
	if (props.color === 'primary') {
		next = {
			...next,
			...{
				color: theme.colors.primary.main,
				':hover': {
					backgroundColor: fade(theme.colors.primary.main, theme.colors.action.hoverOpacity),
				},
			},
		};
	} else if (props.color === 'secondary') {
		next = {
			...next,
			...{
				color: theme.colors.secondary.main,
				':hover': {
					backgroundColor: fade(theme.colors.secondary.main, theme.colors.action.hoverOpacity),
				},
			},
		};
	}
	return next;
};

// Button fab styles parser
const fab = ({ theme, ...props }) => {
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
				boxShadow: theme.elevation[6],
				':active': {
					boxShadow: theme.elevation[12],
				},
			},
		};
	}
	return next;
};

// Button full width styles parser
const fullWidth = ({ theme, ...props }) => {
	return props.fullWidth
		? {
				width: '100%',
			}
		: {};
};

// Button mini variation styles parser
const mini = ({ theme, ...props }) => {
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

// Button size styles parser
const size = ({ theme, ...props }) => {
	switch (props.size) {
		case 'small':
			return {
				padding: `${theme.space[2] - 1}px ${theme.space[2]}px`,
				minWidth: 64,
				minHeight: 32,
				fontSize: `${theme.fontSizes[2] - 0.7}${theme.fontUnit}`,
			};
		case 'large':
			return {
				padding: `${theme.space[2]}px ${theme.space[3] + theme.space[2]}px`,
				minWidth: 112,
				minHeight: 32,
				fontSize: `${theme.fontSizes[2]}${theme.fontUnit}`,
			};
		default:
			return {};
	}
};

// Button variant styles parser
const variant = ({ theme, ...props }) => {
	let next = {};

	if (props.variant === 'contained') {
		next = {
			...next,
			...{
				color: theme.colors.text.secondary,
				backgroundColor: theme.colors.gray.light,
				boxShadow: theme.elevation[4],
				':focus': {
					boxShadow: theme.elevation[6],
				},
				':active': {
					boxShadow: theme.elevation[8],
				},
				':disabled': {
					color: theme.colors.action.disabled,
					boxShadow: 'none',
					backgroundColor: theme.colors.action.disabledBg,
				},
				':hover': {
					backgroundColor: theme.colors.gray.light,
				},
			},
		};

		if (props.color === 'primary') {
			next = {
				...next,
				...{
					color: theme.colors.primary.contrast,
					backgroundColor: theme.colors.primary.main,
					':hover': {
						backgroundColor: theme.colors.primary.dark,
					},
				},
			};
		} else if (props.color === 'secondary') {
			next = {
				...next,
				...{
					color: theme.colors.secondary.contrast,
					backgroundColor: theme.colors.secondary.main,
					':hover': {
						backgroundColor: theme.colors.secondary.dark,
					},
				},
			};
		}
	} else if (props.variant === 'outlined') {
		next = {
			...next,
			...{
				border: `1px solid ${theme.colors.type === 'light'
					? theme.colors.divider.light
					: theme.colors.divider.contrast.light}`,
			},
		};
	} else if (props.variant === 'extendedFab') {
		next = {
			...next,
			...{
				borderRadius: 48 / 2,
				padding: `0 ${theme.space[3]}`,
				width: 'auto',
				minWidth: 48,
				height: 48,
			},
		};
	}
	return next;
};

// StyledButtonLabel component
const StyledButtonLabel = styled('span', {
	display: 'inherit',
	alignItems: 'inherit',
	justifyContent: 'inherit',
});

// StyledButton component
const StyledButton = withStyle(ButtonBase, (props) => {
	const { colors, fontSizes, fontUnit, lineHeights, radius, space } = props.theme;

	return {
		...{
			boxSizing: 'border-box',
			minWidth: 64,
			minHeight: 36,
			padding: `${space[2]}px ${space[3]}px`,
			fontSize: `${fontSizes[2]}${fontUnit}`,
			lineHeight: `${lineHeights[2]}${fontUnit}`,
			borderRadius: `${radius}`,
			color: `${colors}`,
			':hover': {
				textDecoration: 'none',
				backgroundColor: fade(colors.text.primary, 0.8),
			},
			':disabled': {
				backgroundColor: colors.action.disabled,
			},
		},
		...color(props),
		...fab(props),
		...mini(props),
		...fullWidth(props),
		...size(props),
		...variant(props),
	};
});

StyledButton.propTypes = buttonPropTypes;

// Button component
const Button = (props) => {
	const {
		children,
		color,
		className = '',
		disabled,
		disableFocusRipple,
		disableRipple,
		fullWidth,
		href,
		labelClassName = '',
		mini,
		size,
		type,
		variant,
		...passThruProps
	} = props;

	return (
		<StyledButton
			color={color}
			className={className}
			disabled={disabled}
			disableRipple={disableRipple}
			focusRipple={!disableFocusRipple}
			fullWidth={fullWidth}
			mini={mini}
			size={size}
			type={type}
			variant={variant}
			{...passThruProps}
		>
			<StyledButtonLabel className={labelClassName}>{children}</StyledButtonLabel>
		</StyledButton>
	);
};

Button.propTypes = buttonPropTypes;

Button.defaultProps = {
	color: 'default',
	// component: 'button',
	disabled: false,
	disableFocusRipple: false,
	fullWidth: false,
	mini: false,
	size: 'medium',
	type: 'button',
	variant: 'text',
};

export default Button;
