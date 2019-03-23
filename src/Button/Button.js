/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import PropTypes from 'prop-types';
import React from 'react';
import ButtonBase from '../ButtonBase/ButtonBase';
import { getSpacing, useStyles } from '../system';
import { fade } from '../utils/colorHelpers';
import combine from '../utils/combine';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const FONT_SIZE_SHIFT = 0.0625;

const getSizeStyles = ({
	fullWidth,
	mini,
	size,
	theme: {
		typography: { fontFamilies, fontSizes, fontWeights, unit },
	},
}) => {
	const dimensionStyles = {
		height: mini ? '40px' : null,
		width: mini ? '40px' : fullWidth ? '100%' : null,
	};
	const typographyStyles = {
		fontFamily: fontFamilies.ui,
		fontSize: `${fontSizes[2] - FONT_SIZE_SHIFT}${unit}`,
		fontWeight: fontWeights.medium,
	};

	switch (size) {
		case 'small':
			return {
				root: {
					...dimensionStyles,
					...typographyStyles,
					...getSpacing({ py: 1, px: 2 }),
					minHeight: '31px',
					minWidth: '64px',
				},
			};
		case 'large':
			return {
				root: {
					...dimensionStyles,
					...typographyStyles,
					...getSpacing({ py: 2, px: 3.5 }),
					minHeight: '42px',
				},
			};
		default:
			// 'medium'
			return {
				root: {
					...dimensionStyles,
					...typographyStyles,
					...getSpacing({ py: 2, px: 3 }),
					fontSize: `${fontSizes[2]}${unit}`,
					minHeight: '36px',
					minWidth: '64px',
				},
			};
	}
};

const getVariantStyles = ({
	color,
	variant,
	theme: { elevation, palette, shape },
}) => {
	const isBrand = color === 'primary' || color === 'secondary';
	const isDefault = color === 'default';
	const isLight = palette.type === 'light';

	switch (variant) {
		case 'outlined':
			return {
				root: {
					color: isBrand
						? palette[color].main
						: isDefault
						? palette.text.primary
						: 'inherit',
					border: isBrand
						? `1px solid ${fade(palette[color].main, 0.5)}`
						: `1px solid ${fade(
								palette.grey[isLight ? 'main' : 'dark'],
								0.5,
						  )}`,
					borderRadius: shape.borderRadius.round,
					':hover': {
						backgroundColor: fade(
							isBrand
								? palette[color].main
								: palette.text.primary,
							palette.action.hoverOpacity,
						),
						border: isBrand
							? `1px solid ${palette[color].main}`
							: `1px solid ${
									palette.grey[isLight ? 'main' : 'dark']
							  }`,
					},
					':disabled': {
						color: palette.action.disabled,
						border: `1px solid ${palette.action.disabled}`,
					},
				},
			};

		case 'contained':
			return {
				root: {
					backgroundColor: isBrand
						? palette[color].main
						: palette.grey.light,
					color: isBrand
						? palette[color].contrastText
						: palette.text.primary,
					boxShadow: elevation[2],
					borderRadius: shape.borderRadius.round,
					':active': {
						boxShadow: elevation[8],
					},
					':hover': {
						backgroundColor: isBrand
							? palette[color].dark
							: palette.grey.light,
					},
					':disabled': {
						backgroundColor: palette.action.disabledBg,
						color: palette.action.disabled,
						boxShadow: 'none',
					},
				},
			};

		case 'fab':
			return {
				root: {
					width: '56px',
					minWidth: '0px',
					height: '56px',
					padding: '0px',
					backgroundColor: isBrand
						? palette[color].main
						: palette.grey.light,
					color: isBrand
						? palette[color].contrastText
						: palette.text.primary,
					boxShadow: elevation[6],
					borderRadius: '50%',
					':active': {
						boxShadow: elevation[12],
					},
					':hover': {
						backgroundColor: isBrand
							? palette[color].dark
							: palette.grey.light,
					},
				},
			};

		default:
			// 'text'
			return {
				root: {
					...getSpacing({ py: 1.5, px: 2 }),
					color: isBrand
						? palette[color].main
						: isDefault
						? palette.text.primary
						: 'inherit',
					borderRadius: shape.borderRadius.round,
					':hover': {
						backgroundColor: fade(
							isBrand
								? palette[color].main
								: palette.text.primary,
							palette.action.hoverOpacity,
						),
					},
					':disabled': { color: palette.action.disabled },
				},
			};
	}
};

const getBaseStyles = props => ({
	root: {
		boxSizing: 'border-box',
		textTransform: 'uppercase',
		transition: props.theme.getTransition(
			['background-color', 'color', 'box-shadow', 'border'],
			{ duration: 'short' },
		),
		':hover': {
			textDecoration: 'none',
		},
		...getSpacing(props),
	},
	label: {
		display: 'inherit',
		alignItems: 'inherit',
		justifyContent: 'inherit',
	},
});

const getStyles = combine(getBaseStyles, getVariantStyles, getSizeStyles);
getStyles.propTypes = {
	color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
	disabled: PropTypes.bool,
	fullWidth: PropTypes.bool,
	mini: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	variant: PropTypes.oneOf([
		'text',
		'outlined',
		'contained',
		'fab',
		'extendedFab',
	]),
};

const Button = React.forwardRef((props, ref) => {
	const {
		classes,
		props: { children, disableFocusRipple, ...passThru },
		styles,
	} = useStyles(props, getStyles, {
		nested: true,
		whitelist: ['disabled', 'disableFocusRipple'],
	});

	return (
		<ButtonBase
			ref={ref}
			styles={styles.root}
			focusRipple={!disableFocusRipple}
			{...passThru}
		>
			<span className={classes.label}>{children}</span>
		</ButtonBase>
	);
});

Button.displayName = 'Button';

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	classes: PropTypes.object,
	disableFocusRipple: PropTypes.bool,
	disableRipple: PropTypes.bool,
	href: PropTypes.string,
	type: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

Button.defaultProps = {
	as: 'button',
	color: 'default',
	disabled: false,
	disableFocusRipple: false,
	fullWidth: false,
	mini: false,
	size: 'medium',
	type: 'button',
	variant: 'text',
};

export default Button;
