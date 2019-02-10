import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import FormControlContext from './FormControlContext';
import combine from '../utils/combine';
import { getSpacing, useStyles } from '../system';
import { componentPropType, stylesPropType } from '../utils';

const getWidthStyles = ({ fullWidth }) =>
	fullWidth && {
		width: '100%',
	};

const getMarginStyles = ({ margin }) =>
	(margin === 'dense' && getSpacing({ mt: 2, mb: 1 })) ||
	(margin === 'normal' && getSpacing({ mt: 3, mb: 2 })) ||
	null;

const baseStyles = {
	position: 'relative',
	minWidth: '0px',
	margin: '0px',
	padding: '0px',
	display: 'inline-flex',
	flexDirection: 'column',
	border: '0px',
	verticalAlign: 'top',
};

const getStyles = combine(getMarginStyles, getWidthStyles);
getStyles.propTypes = {
	// If `true`, the component will take up the full width of its container.
	fullWidth: PropTypes.bool,
	// If `dense` or `normal`, adjusts vertical spacing of this and children.
	margin: PropTypes.oneOf(['none', 'dense', 'normal']),
};

function FormControl(props) {
	const [
		{ classes },
		{
			as: Component,
			className,
			disabled,
			error,
			fullWidth,
			margin,
			required,
			variant,
			...passThru
		},
	] = useStyles(props, getStyles, { baseStyles });
	const [filled, setFilled] = useState(false);
	const [focused, setFocused] = useState(false);

	const handleBlur = useCallback(() => focused && setFocused(false), []);

	const handleFocus = useCallback(() => !focused && setFocused(true), []);

	const handleDirty = useCallback(() => !filled && setFilled(true), []);

	const handleClean = useCallback(() => filled && setFilled(false), []);

	const context = {
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
		<FormControlContext.Provider value={context}>
			<Component className={classes} {...passThru} />
		</FormControlContext.Provider>
	);
}

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
