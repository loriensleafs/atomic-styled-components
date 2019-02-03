/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './../ButtonBase/ButtonBase';
import merge from './../utils/merge';
import { getSpacing, useStyles } from './../system';
import { fade } from './../utils/colorHelpers';
import { componentPropType, stylesPropType } from './../utils/propTypes';

const FONT_SIZE_SHIFT = 0.0625;

const getSizeStyles = ({
	fullWidth,
	mini,
	size,
	theme: {
		typography: { fontFamilies, fontSizes, fontWeights, unit },
	},
}) => {
	const styles = {
		fontFamily: fontFamilies.ui,
		fontSize: `${fontSizes[2] - FONT_SIZE_SHIFT}${unit}`,
		fontWeight: fontWeights.medium,
		height: mini ? '40px' : null,
		width: mini ? '40px' : fullWidth ? '100%' : null,
	};

	switch (size) {
		case 'small':
			return {
				...styles,
				...getSpacing({ py: 1, px: 2 }),
				minHeight: '31px',
				minWidth: '64px',
			};
		case 'large':
			return {
				...styles,
				...getSpacing({ py: 2, px: 3.5 }),
				minHeight: '42px',
			};
		default:
			// 'medium'
			return {
				...styles,
				...getSpacing({ py: 2, px: 3 }),
				fontSize: fontSizes[2] + unit,
				minHeight: '36px',
				minWidth: '64px',
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
						isBrand ? palette[color].main : palette.text.primary,
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
			};

		case 'contained':
			return {
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
			};

		case 'fab':
			return {
				backgroundColor: isBrand
					? palette[color].main
					: palette.grey.light,
				color: isBrand
					? palette[color].contrastText
					: palette.text.primary,
				boxShadow: elevation[6],
				width: '56px',
				minWidth: '0px',
				height: '56px',
				padding: '0px',
				borderRadius: '50%',
				':active': {
					boxShadow: elevation[12],
				},
				':hover': {
					backgroundColor: isBrand
						? palette[color].dark
						: palette.grey.light,
				},
			};

		default:
			// 'text'
			return {
				...getSpacing({ py: 1.5, px: 2 }),
				color: isBrand
					? palette[color].main
					: isDefault
					? palette.text.primary
					: 'inherit',
				borderRadius: shape.borderRadius.round,
				':hover': {
					backgroundColor: fade(
						isBrand ? palette[color].main : palette.text.primary,
						palette.action.hoverOpacity,
					),
				},
				':disabled': { color: palette.action.disabled },
			};
	}
};

const getStyles = props => ({
	root: merge(
		{
			boxSizing: 'border-box',
			textTransform: 'uppercase',
			transition: props.theme.getTransition(
				['background-color', 'color', 'box-shadow', 'border'],
				{ duration: 'short' },
			),
			':hover': {
				textDecoration: 'none',
			},
		},
		getVariantStyles(props),
		getSizeStyles(props),
		getSpacing(props),
	),
	label: {
		display: 'inherit',
		alignItems: 'inherit',
		justifyContent: 'inherit',
	},
});
getStyles.propTypes = {
	color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
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
	const [
		{ styles, classes },
		{ children, disableFocusRipple, ...passThru },
	] = useStyles(props, getStyles, { whitelist: ['disabled'] });

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
	disabled: PropTypes.bool,
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
