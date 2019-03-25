import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import useFormControl from '../FormControl/useFormControl';
import { getSpacing, useStyles } from '../system';
import combine from '../utils/combine';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const getBaseStyles = ({
	theme: {
		palette,
		typography: { fontFamilies, fontSizes, unit },
	},
}) => ({
	...getSpacing({ mt: 2, mx: 0, mb: 0 }),
	minHeight: '1em',
	fontFamily: fontFamilies.ui,
	fontSize: `${fontSizes[1]}${unit}`,
	lineHeight: '1em',
	color: palette.text.secondary,
	textAlign: 'left',
});

const getDisabledStyles = ({ disabled, theme: { palette } }) =>
	disabled && { color: palette.text.disabled };

const getErrorStyles = ({ disabled, error, theme: { palette } }) =>
	!disabled && error && { color: palette.error.main };

const getMarginStyles = ({ margin }) =>
	margin === 'dense' && getSpacing({ m: 1 });

const getVariantStyles = ({ variant }) =>
	(variant === 'filled' || variant === 'outlined') &&
	getSpacing({ mt: 2, mx: 2.5, mb: 0 });

const getStyles = combine(
	getBaseStyles,
	getMarginStyles,
	getVariantStyles,
	getDisabledStyles,
	getErrorStyles,
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
	// If `true`, the helper text should use required classes key.
	required: PropTypes.bool,
	// The variant to use.
	variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

const FormHelperText = forwardRef((props, ref) => {
	const { formControlEnabled, ...fc } = useFormControl(props, [
		'error',
		'disabled',
		'filled',
		'focused',
		'margin',
		'required',
		'variant',
	]);
	const {
		classes,
		props: { as: Component, ...passThru },
	} = useStyles({ ...props, ...fc }, getStyles);

	return <Component className={classes} ref={ref} {...passThru} />;
});

FormHelperText.displayName = 'FormHelperText';

FormHelperText.propTypes = {
	// The content of the component.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object,
	className: PropTypes.string,
	...getStyles.propTypes,
	...componentPropType,
	...stylesPropType,
};

FormHelperText.defaultProps = {
	as: 'p',
};

export default FormHelperText;
