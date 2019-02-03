import React from 'react';
import PropTypes from 'prop-types';
import useFormControl from '../FormControl/useFormControl';
import combine from '../utils/combine';
import { getSpacing, useStyles } from '../system';
import { componentPropType } from '../utils/propTypes';

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
	':disabled': {
		color: palette.text.disabled,
	},
});

const getStyles = combine(
	getBaseStyles,
	getVariantStyles,
	getMarginStyles,
	getErrorStyles,
);
getStyles.propTypes = {
	// If `true`, helper text should be displayed in an error state.
	error: PropTypes.bool,
	// If `dense`, will adjusts vertical spacing. From FormControl context.
	margin: PropTypes.oneOf(['dense']),
	// The variant to use.
	variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

function FormHelperText(props) {
	const [mergedProps] = useFormControl(props, [
		'error',
		'disabled',
		'filled',
		'focused',
		'margin',
		'required',
		'variant',
	]);
	const [
		{ classes, styles },
		{
			as: Component,
			className,
			error,
			filled,
			focused,
			margin,
			variant,
			...passThru
		},
	] = useStyles(mergedProps, getStyles, {
		whitelist: ['error', 'margin', 'variant'],
	});

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
	// If `true`, the helper text should be displayed in a disabled state.
	disabled: PropTypes.bool,
	// If `true`, the helper text should use filled classes key.
	filled: PropTypes.bool,
	// If `true`, the helper text should use focused classes key.
	focused: PropTypes.bool,
	// If `true`, the helper text should use required classes key.
	required: PropTypes.bool,
	...componentPropType,
	...getStyles.propTypes,
};

FormHelperText.defaultProps = {
	as: 'p',
};

return FormHelperText;
