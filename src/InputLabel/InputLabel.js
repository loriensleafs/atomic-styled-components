import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import useFormControl from '../FormControl/useFormControl';
import FormLabel from '../FormLabel';
import useStyles from '../system/useStyles';
import combine from '../utils/combine';
import { stylesPropType } from '../utils/propTypes';

const baseStyles = {
	root: {
		display: 'block',
		transformOrigin: 'top left',
	},
};

const getAnimatedStyles = ({ disableAnimation, theme: { getTransition } }) =>
	!disableAnimation && {
		transition: getTransition(['color', 'transform'], {
			duration: 'shorter',
			easing: 'out',
		}),
	};

const getFormControlStyles = ({ formControlEnabled }) =>
	formControlEnabled && {
		position: 'absolute',
		top: '0px',
		left: '0px',
		// Slight alteration to spec spacing to match visual spec result.
		transform: 'translate(0, 24px) scale(1)',
	};

const getMarginStyles = ({ margin, variant }) => {
	switch (variant) {
		case 'filled':
			return {
				transform:
					margin === 'dense'
						? 'translate(12px, 17px) scale(1)'
						: 'translate(12px, 20px) scale(1)',
			};
		case 'outlined':
			return {
				transform:
					margin === 'dense'
						? 'translate(14px, 17px) scale(1)'
						: 'translate(14px, 20px) scale(1)',
			};
		default:
			return {
				transform: 'translate(0, 21px) scale(1)',
			};
	}
};

const getShrinkStyles = ({ margin, shrink, variant }) => {
	if (!shrink) {
		return null;
	}

	switch (variant) {
		case 'filled':
			return {
				transform:
					margin === 'dense'
						? 'translate(12px, 7px) scale(0.75)'
						: 'translate(12px, 10px) scale(0.75)',
				transformOrigin: 'top left',
			};
		case 'outlined':
			return {
				transform: 'translate(14px, -6px) scale(0.75)',
				transformOrigin: 'top left',
			};
		default:
			return {
				transform: 'translate(0, 1.5px) scale(0.75)',
				transformOrigin: 'top left',
			};
	}
};

const getVariantStyles = ({ variant }) =>
	(variant === 'filled' || variant === 'outlined') && {
		/**
		 * Chrome's autofill feature gives the input field a yellow
		 * background. Since the input field is behind the label in the
		 * HTML tree, the input field is drawn last and hides the label
		 * with an opaque background color. zIndex: 1 will raise the
		 * label above opaque background-colors of input.
		 */
		zIndex: 1,
		pointerEvents: 'none',
	};

const getStyles = combine(
	getAnimatedStyles,
	getFormControlStyles,
	getMarginStyles,
	getShrinkStyles,
	getVariantStyles,
);
getStyles.propTypes = {
	// If `true`, apply disabled class.
	disabled: PropTypes.bool,
	// If `true`, the transition animation is disabled.
	disableAnimation: PropTypes.bool,
	// If the label is a descendant of 'FormControl'
	formControlEnabled: PropTypes.bool,
	// If `dense`, will adjust vertical spacing.
	margin: PropTypes.oneOf(['dense']),
	// If `true`, the label is shrunk.
	shrink: PropTypes.bool,
	// The variant to use.
	variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

const InputLabel = forwardRef((props, ref) => {
	const { formControlEnabled, ...fc } = useFormControl(props, [
		'filled',
		'focused',
		'margin',
		'variant',
	]);
	const shrink =
		typeof props.shrink === 'undefined' && formControlEnabled
			? fc.filled || fc.focused
			: props.shrink;
	const {
		props: { children, ...passThru },
		styles,
	} = useStyles({ ...props, ...fc, formControlEnabled, shrink }, getStyles, {
		baseStyles,
	});

	return (
		<FormLabel
			data-shrink={shrink}
			className={props.clasName}
			ref={ref}
			styles={{ root: styles }}
			{...passThru}
		>
			{children}
		</FormLabel>
	);
});

InputLabel.displayName = 'InputLabel';

InputLabel.propTypes = {
	// The contents of the `InputLabel`.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object,
	className: PropTypes.string,
	// If `true`, the input of this label is focused.
	focused: PropTypes.bool,
	required: PropTypes.bool,
	...getStyles.propTypes,
	...stylesPropType,
};

InputLabel.defaultProps = {
	disableAnimation: false,
};

export default InputLabel;
