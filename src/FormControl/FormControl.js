import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FormControlContext from './FormControlContext';
import combine from './../utils/combine';
import { getSpacing, useStyles } from '../system';

function getWidthStyles({ isFullWidth }) {
	return (
		isFullWidth && {
			width: '100%',
		}
	);
}

function getMarginStyles({ margin }) {
	switch (margin) {
		case 'dense':
			return getSpacing({ mt: 2, mb: 1 });
		case 'normal':
			return getSpacing({ mt: 3, mb: 2 });
	}
}

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
	isFullWidth: PropTypes.bool,
	/**
	 * If `dense` or `normal`, will adjust vertical spacing of this and
	 * contained components.
	 */
	margin: PropTypes.oneOf(['none', 'dense', 'normal']),
};

function FormControl(props) {
	const [
		{ classes },
		{
			as: Component,
			className,
			isDisabled,
			isFullWidth,
			isRequired,
			hasError,
			margin,
			variant,
			...passThru
		},
	] = useStyles(props, getStyles, {
		baseStyles,
		whitelist: ['isFullWidth', 'margin'],
	});
	const [hasStartAdornment, setHasStartAdornment] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const handleBlur = useCallback(
		() => isFocused && setIsFocused(() => false),
		[],
	);

	const handleFocus = useCallback(
		() => !isFocused && setIsFocused(() => true),
		[],
	);

	const handleDirty = useCallback(
		() => !isFilled && setIsFilled(() => true),
		[],
	);

	const handleClean = useCallback(
		() => isFilled && setIsFilled(() => false),
		[],
	);

	const context = {
		hasStartAdornment,
		hasError,
		isDisabled,
		isFilled,
		isFocused,
		isRequired,
		margin,
		onBlur: handleBlur,
		onEmpty: handleClean,
		onFilled: handleDirty,
		onFocus: handleFocus,
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
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	as: componentPropType,
	// The contents of the form control.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object,
	className: PropTypes.string,
	// If `true`, the label should be displayed in an error state.
	hasError: PropTypes.bool,
	/**
	 * If `true`, the label, input and helper text are displayed in a disabled
	 * state.
	 */
	isDisabled: PropTypes.bool,
	// If `true`, the label will indicate that the input is required.
	isRequired: PropTypes.bool,
	// The variant to use.
	variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
	...getStyles.propTypes,
};

FormControl.defaultProps = {
	as: 'div',
	hasError: false,
	isDisabled: false,
	isFullWidth: false,
	isRequired: false,
	margin: 'none',
	variant: 'standard',
};

export default FormControl;
