/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './../ButtonBase/ButtonBase';
import combine from './../utils/combine';
import {
	getColors,
	getElevation,
	getSizing,
	getSpacing,
	getText,
	useStyles,
} from './../system';
import { fade } from './../utils/colorHelpers';
import { componentPropType, stylesPropType } from './../utils/propTypes';

function getSizeStyles({ fullWidth, mini, size }) {
	const w = mini ? 40 : fullWidth ? 1 : null;
	const h = mini ? 40 : null;
	const text = {
		fontFamily: 'ui',
		fontWeight: 'medium',
		lineHeight: 1,
	};

	switch (size) {
		case 'small':
			return {
				...getSizing({ h, hMin: 31, w, wMin: 64 }),
				...getSpacing({ py: 1, px: 2 }),
				...getText({ ...text, fontSize: '0.8125rem' }),
			};
		case 'large':
			return {
				...getSizing({ h, hMin: 42, w }),
				...getSpacing({ py: 2, px: 3.5 }),
				...getText({ ...text, fontSize: '0.9375rem' }),
			};
		default:
			// 'medium'
			return {
				...getSizing({ h, hMin: 36, w, wMin: 64 }),
				...getSpacing({ py: 2, px: 3 }),
				...getText({ ...text, fontSize: 2 }),
			};
	}
}

function getVariantStyles(props) {
	const { color, variant, theme } = props;
	const { palette, shape } = theme;
	const isBrandColor = color === 'primary' || color === 'secondary';
	const isDefaultColor = color === 'default';

	switch (variant) {
		case 'outlined':
			return {
				...getColors({
					color: isBrandColor
						? `${color}.main`
						: isDefaultColor
						? 'text.primary'
						: 'inherit',
				}),
				border: isBrandColor
					? `1px solid ${fade(palette[color].main, 0.5)}`
					: `1px solid ${fade(
							palette.grey[
								palette.type === 'light' ? 'main' : 'dark'
							],
							0.5,
					  )}`,
				borderRadius: `${shape.borderRadius.round}`,
				':hover': {
					backgroundColor: fade(
						isBrandColor
							? palette[color].main
							: palette.text.primary,
						palette.action.hoverOpacity,
					),
					border: isBrandColor
						? `1px solid ${palette[color].main}`
						: `1px solid ${
								palette.grey[
									palette.type === 'light' ? 'main' : 'dark'
								]
						  }`,
				},
				':disabled': {
					border: `1px solid ${palette.action.disabled}`,
				},
			};

		case 'contained':
			return {
				...getColors({
					bg: isBrandColor ? `${color}.main` : `grey.light`,
					color: isBrandColor
						? `${color}.contrastText`
						: 'text.primary',
				}),
				...getElevation({ elevation: 2 }),
				borderRadius: `${shape.borderRadius.round}`,
				':active': getElevation({ elevation: 8 }),
				':hover': getColors({
					bg: isBrandColor ? `${color}.dark` : 'grey.light',
				}),
				':disabled': {
					...getColors({
						bg: 'action.disabledBackground',
						color: 'action.disabled',
					}),
					boxShadow: 'none',
				},
			};

		case 'fab':
			return {
				...getColors({
					bg: isBrandColor ? `${color}.main` : `grey.light`,
					color: isBrandColor
						? `${color}.contrastText`
						: 'text.primary',
				}),
				...getElevation({ elevation: 6 }),
				width: '56px',
				minWidth: '0px',
				height: '56px',
				padding: '0px',
				borderRadius: '50%',
				':active': getElevation({ elevation: 12 }),
				':hover': getColors({
					bg: isBrandColor ? `${color}.dark` : 'grey.light',
				}),
			};

		default:
			// 'text'
			return {
				...getColors({
					color: isBrandColor
						? `${color}.main`
						: isDefaultColor
						? 'text.primary'
						: 'inherit',
				}),
				...getSpacing({ py: 1.5, px: 2 }),
				borderRadius: `${shape.borderRadius.round}`,
				':hover': {
					backgroundColor: fade(
						isBrandColor
							? palette[color].main
							: palette.text.primary,
						palette.action.hoverOpacity,
					),
				},
			};
	}
}

const getRootStyles = combine(getSizeStyles, getVariantStyles, getSpacing);

const getStyles = props => ({
	root: {
		...{
			boxSizing: 'border-box',
			textTransform: 'uppercase',
			transition: props.theme.getTransition(
				['background-color', 'color', 'box-shadow', 'border'],
				'short',
			),
			':hover': {
				textDecoration: 'none',
			},
		},
		...getRootStyles(props),
	},
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
		{ children, disabled, disableFocusRipple, ...passThru },
		styles,
		classes,
	] = useStyles(props, getStyles);

	return (
		<ButtonBase
			ref={ref}
			styles={styles.root}
			disabled={disabled}
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
