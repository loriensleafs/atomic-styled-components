import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { getSpacing, useStyles } from '../system';
import { componentPropType, stylesPropType } from '../utils';
import combine from '../utils/combine';
import FormControlContext from './FormControlContext';

const baseStyles = {
	position: 'relative',
	minWidth: '0px',
	display: 'inline-flex',
	flexDirection: 'column',
	border: '0px',
	verticalAlign: 'top',
};

const getMarginStyles = ({ margin }) =>
	margin === 'dense'
		? getSpacing({ mt: 2, mb: 1 })
		: margin === 'normal'
		? getSpacing({ mt: 3, mb: 2 })
		: {
				margin: '0px',
				padding: '0px',
		  };

const getWidthStyles = ({ fullWidth }) => fullWidth && { width: '100%' };

const getStyles = combine(getMarginStyles, getWidthStyles);
getStyles.propTypes = {
	// If `true`, the component will take up the full width of its container.
	fullWidth: PropTypes.bool,
	// If `dense` or `normal`, adjusts vertical spacing of this and children.
	margin: PropTypes.oneOf(['none', 'dense', 'normal']),
};

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state
 * always stays consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 *
 * ⚠️ Only one input can be used within a FormControl.
 */
const FormControl = forwardRef((props, ref) => {
	const {
		classes,
		props: {
			as: Component,
			defaultValue,
			disabled,
			error,
			filled: filledProp,
			fullWidth,
			margin,
			required,
			variant,
			...passThru
		},
	} = useStyles(props, getStyles, { baseStyles, whitelist: ['margin'] });
	const [filled, setFilled] = useState(filledProp);
	const [focused, setFocused] = useState(false);

	const handleBlur = useCallback(() => setFocused(false), []);

	const handleFocus = useCallback(() => setFocused(true), []);

	const handleDirty = useCallback(() => setFilled(true), []);

	const handleClean = useCallback(() => setFilled(false), []);

	useEffect(() => {
		if (disabled && focused) {
			setFocused(false);
		}
	}, [disabled, focused]);

	const childContext = {
		error,
		disabled,
		filled,
		focused,
		margin,
		onBlur: handleBlur,
		onEmpty: handleClean,
		onFilled: handleDirty,
		onFocus: handleFocus,
		required,
		variant,
	};

	return (
		<FormControlContext.Provider value={childContext}>
			<Component className={classes} ref={ref} {...passThru} />
		</FormControlContext.Provider>
	);
});

FormControl.displayName = 'FormControl';

FormControl.propTypes = {
	// The contents of the form control.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object,
	className: PropTypes.string,
	// The default input value. Important for setting initial filled state.
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.object,
		PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool,
				PropTypes.object,
			]),
		),
	]),
	// If `true`, the label should be displayed in an error state.
	error: PropTypes.bool,
	// If `true`, the label, input and helper text display an disabled state.
	disabled: PropTypes.bool,
	// If `true`, the label will indicate that the input is required.
	required: PropTypes.bool,
	// The variant to use.
	variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
	...getStyles.propTypes,
	...componentPropType,
	...stylesPropType,
};

FormControl.defaultProps = {
	as: 'div',
	disabled: false,
	error: false,
	fullWidth: false,
	margin: 'none',
	required: false,
	variant: 'standard',
};

export default FormControl;
