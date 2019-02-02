/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './../ButtonBase/ButtonBase';
import combine from './../utils/combine';
import {
	getBg,
	getColor,
	getElevation,
	getSizing,
	getSpacing,
	getText,
	useStyles,
} from './../system';
import { fade } from './../utils/colorHelpers';
import { componentPropType, stylesPropType } from './../utils/propTypes';

const FONT_SIZE_SHIFT = 0.0625;

function getSizeStyles(props) {
	const { isFullWidth, mini, size, theme } = props;
	const { fontSizes } = theme.typography;
	const w = mini ? 40 : isFullWidth ? 1 : null;
	const h = mini ? 40 : null;
	const text = {
		fontFamily: 'ui',
		fontWeight: 'medium',
	};

	switch (size) {
		case 'small':
			return {
				fontSize: `${fontSizes[2] - FONT_SIZE_SHIFT}rem`,
				...getSizing({ hMin: 31, wMin: 64, h, w }),
				...getSpacing({ py: 1, px: 2 }),
				...getText(text),
			};
		case 'large':
			return {
				fontSize: `${fontSizes[2] + FONT_SIZE_SHIFT}rem`,
				...getSizing({ hMin: 42, h, w }),
				...getSpacing({ py: 2, px: 3.5 }),
				...getText(text),
			};
		default:
			// 'medium'
			return {
				...getSizing({ hMin: 36, wMin: 64, h, w }),
				...getSpacing({ py: 2, px: 3 }),
				...getText({ fontSize: 2, ...text }),
			};
	}
}

function getVariantStyles(props) {
	const {
		color,
		variant,
		theme: { palette, shape },
	} = props;
	const isBrand = color === 'primary' || color === 'secondary';
	const isDefault = color === 'default';
	const isLight = palette.type === 'light';

	switch (variant) {
		case 'outlined':
			return {
				...getColor({
					color: isBrand
						? `${color}.main`
						: isDefault
						? 'text.primary'
						: 'inherit',
				}),
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
					...getColor({ color: 'action.disabled' }),
					border: `1px solid ${palette.action.disabled}`,
				},
			};

		case 'contained':
			return {
				...getBg({ bg: isBrand ? `${color}.main` : `grey.light` }),
				...getColor({
					color: isBrand ? `${color}.contrastText` : 'text.primary',
				}),
				...getElevation({ elevation: 2 }),
				borderRadius: shape.borderRadius.round,
				':active': getElevation({ elevation: 8 }),
				':hover': getBg({
					bg: isBrand ? `${color}.dark` : 'grey.light',
				}),
				':disabled': {
					...getBg({ bg: 'action.disabledBg' }),
					...getColor({ color: 'action.disabled' }),
					boxShadow: 'none',
				},
			};

		case 'fab':
			return {
				...getBg({ bg: isBrand ? `${color}.main` : `grey.light` }),
				...getColor({
					color: isBrand ? `${color}.contrastText` : 'text.primary',
				}),
				...getElevation({ elevation: 6 }),
				width: '56px',
				minWidth: '0px',
				height: '56px',
				padding: '0px',
				borderRadius: '50%',
				':active': getElevation({ elevation: 12 }),
				':hover': getBg({
					bg: isBrand ? `${color}.dark` : 'grey.light',
				}),
			};

		default:
			// 'text'
			return {
				...getColor({
					color: isBrand
						? `${color}.main`
						: isDefault
						? 'text.primary'
						: 'inherit',
				}),
				...getSpacing({ py: 1.5, px: 2 }),
				borderRadius: shape.borderRadius.round,
				':hover': {
					backgroundColor: fade(
						isBrand ? palette[color].main : palette.text.primary,
						palette.action.hoverOpacity,
					),
				},
				':disabled': getColor({ color: 'action.disabled' }),
			};
	}
}

const getRootStyles = combine(getSizeStyles, getVariantStyles, getSpacing);

function getStyles(props) {
	const { getTransition } = props.theme;

	return {
		root: {
			...{
				boxSizing: 'border-box',
				textTransform: 'uppercase',
				transition: getTransition(
					['background-color', 'color', 'box-shadow', 'border'],
					{ duration: 'short' },
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
	};
}
getStyles.propTypes = {
	color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
	isFullWidth: PropTypes.bool,
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
	] = useStyles(props, getStyles, { whitelist: ['isDisabled'] });

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
	isDisabled: PropTypes.bool,
	href: PropTypes.string,
	type: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

Button.defaultProps = {
	as: 'button',
	color: 'default',
	disableFocusRipple: false,
	isDisabled: false,
	isFullWidth: false,
	mini: false,
	size: 'medium',
	type: 'button',
	variant: 'text',
};

export default Button;
