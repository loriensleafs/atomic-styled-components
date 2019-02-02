import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from './../FormLabel';
import useFormControl from './../FormControl/useFormControl';
import useStyles from './../system/useStyles';
import combine from './../utils/combine';
import { isNil } from './../utils/helpers';

function getMarginStyles(props) {
	const { margin, variant } = props;

	if (margin === 'dense') {
		switch (variant) {
			case 'filled':
				return {
					transform: 'translate(12px, 20px) scale(0.75)',
				};
			case 'outlined':
				return {
					transform: 'translate(14px, 17px) scale(1)',
				};
			default:
				return {
					transform: 'translate(0, 21px) scale(1)',
				};
		}
	}
}

function getShrinkStyles(props) {
	const { margin, shrink, variant } = props;
	const isDense = margin === 'dense';

	if (shrink) {
		switch (variant) {
			case 'filled':
				return {
					transform: isDense
						? 'translate(12px, 7px) scale(0.75)'
						: 'translate(12px, 10px) scale(0.75)',
					transformOrigin: 'top left',
				};
			case 'outlined':
				return {
					transformOrigin: 'top left',
				};
		}
	}
}

function getAnimatedStyles(props) {
	const {
		disableAnimation,
		theme: { getTransition },
	} = props;

	return (
		!disableAnimation && {
			transition: getTransition(['color', 'transform'], {
				duration: 'shorter',
				easing: 'out',
			}),
		}
	);
}

const getStyles = combine(getAnimatedStyles, getMarginStyles, getShrinkStyles);
getStyles.propTypes = {
	/**
	 * If `dense`, will adjust vertical spacing. This is normally obtained via
	 * context from FormControl.
	 */
	margin: PropTypes.oneOf(['dense']),
	// If `true`, the label is shrunk.
	shrink: PropTypes.bool,
	// The variant to use.
	variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

/**
 * Chrome's autofill feature gives the input field a yellow background.
 * Since the input field is behind the label in the HTML tree, the
 * input field is drawn last and hides the label with an opaque
 * background color.  zIndex: 1 will raise the label above opaque
 * background-colors of input.
 */
const baseStyles = {
	zIndex: 1,
	pointerEvents: 'none',
	transformOrigin: 'top left',
};

function InputLabel(props) {
	const [mergedProps, context] = useFormControl(props, ['margin', 'variant']);
	let shrinkProp = mergedProps.shrink;

	if (isNil(shrinkProp) && context) {
		shrinkProp =
			context.isFilled || context.isFocused || context.isAdornedStart;
	}

	const [
		{ classes },
		{
			children,
			className,
			disableAnimation,
			FormLabelClasses,
			margin,
			shrink,
			variant,
			...passThru
		},
	] = useStyles({ ...mergedProps, shrink: shrinkProp }, getStyles, {
		baseStyles,
		whitelist: ['margin', 'shrink', 'variant'],
	});

	return (
		<FormLabel data-shrink={shrink} className={classes} {...passThru}>
			{children}
		</FormLabel>
	);
}

InputLabel.displayName = 'InputLabel';

InputLabel.propTypes = {
	// The contents of the `InputLabel`.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	// If `true`, the transition animation is disabled.
	disableAnimation: PropTypes.bool,
	// If `true`, apply disabled class.
	isDisabled: PropTypes.bool,
	// If `true`, the label will be displayed in an error state.
	// If `true`, the input of this label is focused.
	isFocused: PropTypes.bool,
	// `classes` applied to the [`FormLabel`](/api/form-label/) element.
	// If `true`, the label will indicate that the input is required.
	isRequired: PropTypes.bool,
	hasError: PropTypes.bool,
	FormLabelClasses: PropTypes.object,
	...getStyles.propTypes,
};

InputLabel.defaultProps = {
	disableAnimation: false,
};

return InputLabel;
