import React from 'react';
import PropTypes from 'prop-types';
import useFormControl from './../FormControl/useFormControl';
import combine from './../utils/combine';
import { getSpacing, useStyles } from './../system';
import { componentPropType } from './../utils/propTypes';

function getErrorStyles(props) {
	const {
		hasError,
		theme: { palette },
	} = props;

	return (
		hasError && {
			color: palette.error.main,
		}
	);
}

function getMarginStyles({ margin }) {
	return margin === 'dense' && getSpacing({ m: 1 });
}

function getVariantStyles({ variant }) {
	return (
		(variant === 'filled' || variant === 'outlined') &&
		getSpacing({
			mt: 2,
			mx: 2.5,
			mb: 0,
		})
	);
}

function getBaseStyles(props) {
	const {
		palette,
		typography: { fontFamilies, fontSizes },
	} = props.theme;

	return {
		...getSpacing({
			mt: 2,
			mx: 0,
			mb: 0,
		}),
		minHeight: '1em',
		fontFamily: fontFamilies.ui,
		fontSize: fontSizes[3],
		lineHeight: '1em',
		color: palette.text.secondary,
		textAlign: 'left',
		':disabled': {
			color: palette.text.disabled,
		},
	};
}

const getStyles = combine(
	getBaseStyles,
	getVariantStyles,
	getMarginStyles,
	getErrorStyles,
);
getStyles.propTypes = {
	// If `true`, helper text should be displayed in an error state.
	hasError: PropTypes.bool,
	margin: PropTypes.oneOf(['dense']),
	// The variant to use.
	variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

function FormHelperText(props) {
	const [mergedProps] = useFormControl(props, [
		'hasError',
		'isDisabled',
		'isFilled',
		'isFocused',
		'isRequired',
		'margin',
		'variant',
	]);
	const [
		{ classes, styles },
		{
			as: Component,
			className,
			hasError,
			isDisabled,
			isFilled,
			isFocused,
			isRequired,
			margin,
			variant,
			...passThru
		},
	] = useStyles(mergedProps, getStyles, {
		whitelist: ['hasError', 'margin', 'variant'],
	});

	return (
		<Component
			className={classes}
			disabled={isDisabled}
			required={isRequired}
			{...passThru}
		/>
	);
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
	isDisabled: PropTypes.bool,
	// If `true`, the helper text should use filled classes key.
	isFilled: PropTypes.bool,
	// If `true`, the helper text should use focused classes key.
	isFocused: PropTypes.bool,
	// If `true`, the helper text should use required classes key.
	isRequired: PropTypes.bool,
	/**
	 * If `dense`, will adjust vertical spacing. This is normally obtained via
	 * context from
	 * FormControl.
	 */
	...componentPropType,
	...getStyles.propTypes,
};

FormHelperText.defaultProps = {
	as: 'p',
};

return FormHelperText;
