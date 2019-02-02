import React from 'react';
import PropTypes from 'prop-types';
import InputBase from './../InputBase';
import NotchedOutline from './NotchedOutline';
import combine from './../utils/combine';
import { getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getAdornmentStyles(props) {
	const { hasEndAdornment, hasStartAdornment } = props;
	const next = {};

	if (hasStartAdornment) {
		next.root = getSpacing({ pl: 14 });
		next.input = getSpacing({ pl: 0 });
	}
	if (hasEndAdornment) {
		next.root = getSpacing({ pr: 14 });
		next.input = getSpacing({ pr: 0 });
	}

	return next;
}

function getNotchedOutlineStyles(props) {
	const {
		hasError,
		isDisabled,
		isFocused,
		isNotched,
		theme: { palette },
	} = props;
	const isLight = palette.type === 'light';
	let next = {};

	if (isNotched) {
		next = {
			root: {
				borderColor: isLight
					? 'rgba(0, 0, 0, 0.23)'
					: 'rgba(255, 255, 255, 0.23)',
				':focused': {
					borderColor: palette.primary.main,
					borderWidth: '2px',
				},
				':disabled': {
					borderColor: palette.action.disabled,
				},
			},
		};

		if (hasError) {
			next = {
				...next,
				borderColor: palette.error.main,
			};
		}

		if (!hasError && !isDisabled && !isFocused) {
			next = {
				...next,
				root: {
					':hover': {
						borderColor: palette.text.primary,
						// Reset on touch devices so as not to add specificity.
						'@media (hover:none)': {
							borderColor: isLight
								? 'rgba(0, 0, 0, 0.23)'
								: 'rgba(255, 255, 255, 0.23)',
						},
					},
				},
			};
		}
	}

	return next;
}

function getMarginStyles({ margin }) {
	return (
		margin === 'dense' && {
			input: {
				paddingTop: '15px',
				paddingBottom: '15px',
			},
		}
	);
}

function getMultilineStyles({ isMultilined }) {
	return (
		isMultilined && {
			root: {
				// Prevent pading issue with isFullWidth.
				boxSizing: 'border-box',
				padding: '18.5px 14px',
			},
			input: {
				padding: '0px',
			},
		}
	);
}

const baseStyles = {
	root: {
		position: 'relative',
	},
	input: {
		padding: '18.5px 14px',
	},
};

const getStyles = combine(
	getMultilineStyles,
	getMarginStyles,
	getNotchedOutlineStyles,
	getAdornmentStyles,
);
getStyles.propTypes = {};

function OutlinedInput(props) {
	const [{ styles }, { labelWidth, isNotched, ...passThru }] = useStyles(
		props,
		getStyles,
		{
			baseStyles,
			whitelist: [
				'hasError',
				'hasStartAdornment',
				'hasEndAdornment',
				'isMultilined',
				'isNotched',
				'margin',
			],
		},
	);

	return (
		<InputBase
			renderPrefix={state => (
				<NotchedOutline
					labelWidth={labelWidth}
					notched={
						typeof isNotched !== 'undefined'
							? notched
							: Boolean(
									state.hasStartAdornment ||
										state.isFilled ||
										state.isFocused,
							  )
					}
				/>
			)}
			styles={styles}
			{...passThru}
		/>
	);
}

OutlinedInput.displayName = 'OutlinedInput';

OutlinedInput.propTypes = {
	/**
	 * This property helps users to fill forms faster, especially on mobile devices.
	 * The name can be confusing, as it's more like an autofill.
	 * You can learn more about it here:
	 * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
	 */
	autoComplete: PropTypes.string,
	// If `true`, the input will be focused during the first mount.
	autoFocus: PropTypes.bool,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object.isRequired,
	// The CSS class name of the wrapper element.
	className: PropTypes.string,
	// The default input value, useful when not controlling the component.
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
	// End `InputAdornment` for this component.
	endAdornment: PropTypes.node,
	/**
	 * If `true`, the input will indicate an error. This is normally obtained
	 * via context from
	 * FormControl.
	 */
	hasError: PropTypes.bool,
	// The id of the `input` element.
	id: PropTypes.string,
	/**
	 * The component used for the native input.
	 * Either a string to use a DOM element or a component.
	 */
	inputComponent: componentPropType,
	// Attributes applied to the `input` element.
	inputProps: PropTypes.object,
	// Use that property to pass a ref callback to the native input component.
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	// If `true`, the input will be disabled.
	isDisabled: PropTypes.bool,
	// If `true`, the input will take up the full width of its container.
	isFullWidth: PropTypes.bool,
	// If `true`, a textarea element will be rendered.
	isMultiline: PropTypes.bool,
	// If `true`, the outline is notched to accommodate the label.
	isNotched: PropTypes.bool,
	// If `true`, the input will be required.
	isRequired: PropTypes.bool,
	// The width of the legend.
	labelWidth: PropTypes.number.isRequired,
	/**
	 * If `dense`, will adjust vertical spacing. This is normally obtained via
	 * context from
	 * FormControl.
	 */
	margin: PropTypes.oneOf(['dense', 'none']),
	// Name attribute of the `input` element.
	name: PropTypes.string,
	/**
	 * Callback fired when the value is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value`.
	 */
	onChange: PropTypes.func,
	// The short hint displayed in the input before the user enters a value.
	placeholder: PropTypes.string,
	/**
	 * It prevents the user from changing the value of the field
	 * (not from interacting with the field).
	 */
	readOnly: PropTypes.bool,
	// Number of rows to display when multiline option is set to true.
	rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// Maximum number of rows to display when multiline option is set to true.
	rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// Start `InputAdornment` for this component.
	startAdornment: PropTypes.node,
	// Type of the input element. It should be a valid HTML5 input type.
	type: PropTypes.string,
	// The input value, required for a controlled component.
	value: PropTypes.oneOfType([
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
	...stylesPropType,
};

OutlinedInput.defaultProps = {
	isFullWidth: false,
	isMultiline: false,
	inputComponent: 'input',
	type: 'text',
};

export default OutlinedInput;
