import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '../FormLabel';
import useFormControlManager from '../FormControl/useFormControlManager';
import useStyles from '../system/useStyles';
import combine from '../utils/combine';
import { isNil } from '../utils/helpers';
import { stylesPropType } from '../utils/propTypes';

const getMarginStyles = ({ margin, variant }) => {
	if (margin == 'dense') {
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
};

const getShrinkStyles = ({ margin, shrink, variant }) => {
	if (shrink) {
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
					transformOrigin: 'top left',
				};
		}
	}
};

const getAnimatedStyles = ({ disableAnimation, theme: { getTransition } }) =>
	!disableAnimation && {
		transition: getTransition(['color', 'transform'], {
			duration: 'shorter',
			easing: 'out',
		}),
	};

const getFormControlStyles = ({ formControlDecendant }) =>
	formControlDecendant && {
		position: 'absolute',
		top: '0px',
		left: '0px',
		// slight alteration to spec spacing to match visual spec result
		transform: 'translate(0, 24px) scale(1)',
	};

const getStyles = combine(
	getAnimatedStyles,
	getMarginStyles,
	getShrinkStyles,
	getFormControlStyles,
);
getStyles.propTypes = {
	// If `true`, the transition animation is disabled.
	disableAnimation: PropTypes.bool,
	// If the label is a descendant of 'FormControl'
	formControlDecendant: PropTypes.bool,
	// If `dense`, will adjust vertical spacing.
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
	const {
		filled,
		focused,
		shrink: fcShrink,
		...fcProps
	} = useFormControlManager(props, [
		'filled',
		'focused',
		'margin',
		'variant',
	]);
	const shrink = (isNil(fcShrink) && (filled || focused)) || fcShrink;
	const [{ classes }, { children, ...passThru }] = useStyles(
		{ ...fcProps, shrink },
		getStyles,
		{
			baseStyles,
		},
	);

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
	// If `true`, apply disabled class.
	disabled: PropTypes.bool,
	// If `true`, the label will be displayed in an error state.
	error: PropTypes.bool,
	// If `true`, the input of this label is focused.
	focused: PropTypes.bool,
	required: PropTypes.bool,
	...getStyles.propTypes,
	...stylesPropType,
};

InputLabel.defaultProps = {
	disableAnimation: false,
};

return InputLabel;
