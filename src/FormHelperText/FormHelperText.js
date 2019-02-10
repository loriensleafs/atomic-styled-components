import React from 'react';
import PropTypes from 'prop-types';
import useFormControlManager from '../FormControl/useFormControlManager';
import combine from '../utils/combine';
import { getSpacing, useStyles } from '../system';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const getDisabledStyles = ({ disabled, theme: { palette } }) =>
	disabled && {
		color: palette.text.disabled,
	};

const getErrorStyles = ({ error, theme: { palette } }) =>
	error && {
		color: palette.error.main,
	};

const getMarginStyles = ({ margin }) =>
	margin === 'dense' && getSpacing({ m: 1 });

const getVariantStyles = ({ variant }) =>
	(variant === 'filled' || variant === 'outlined') &&
	getSpacing({ mt: 2, mx: 2.5, mb: 0 });

const getBaseStyles = ({
	palette,
	typography: { fontFamilies, fontSizes },
}) => ({
	...getSpacing({ mt: 2, mx: 0, mb: 0 }),
	minHeight: '1em',
	fontFamily: fontFamilies.ui,
	fontSize: fontSizes[3],
	lineHeight: '1em',
	color: palette.text.secondary,
	textAlign: 'left',
});

const getStyles = combine(
	getBaseStyles,
	getVariantStyles,
	getMarginStyles,
	getErrorStyles,
	getDisabledStyles,
);
getStyles.propTypes = {
	// If `true`, the helper text should be displayed in a disabled state.
	disabled: PropTypes.bool,
	// If `true`, helper text should be displayed in an error state.
	error: PropTypes.bool,
	// If `true`, the helper text should use filled classes key.
	filled: PropTypes.bool,
	// If `true`, the helper text should use focused classes key.
	focused: PropTypes.bool,
	// If `dense`, will adjusts vertical spacing. From FormControl context.
	margin: PropTypes.oneOf(['dense']),
	// The variant to use.
	variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

function FormHelperText(props) {
	const mergedProps = useFormControlManager(props, [
		'error',
		'disabled',
		'filled',
		'focused',
		'margin',
		'required',
		'variant',
	]);
	const [{ classes }, { as: Component, required, ...passThru }] = useStyles(
		mergedProps,
		getStyles,
		{ whitelist: ['disabled'] },
	);

	return <Component className={classes} {...passThru} />;
}

FormHelperText.displayName = 'FormHelperText';

FormHelperText.propTypes = {
	// The content of the component.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	// If `true`, the helper text should use required classes key.
	required: PropTypes.bool,
	...getStyles.propTypes,
	...componentPropType,
	...stylesPropType,
};

FormHelperText.defaultProps = {
	as: 'p',
};

return FormHelperText;
