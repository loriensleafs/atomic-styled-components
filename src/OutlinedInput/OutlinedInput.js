import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import InputBase from '../InputBase';
import { getSpacing } from '../system';
import combine from '../utils/combine';
import { componentPropType, stylesPropType } from '../utils/propTypes';
import NotchedOutline from './NotchedOutline';

const getBaseStyles = () => ({
	root: {
		position: 'relative',
	},
	input: {
		padding: '18.5px 14px',
	},
});

const getEndAdornmentStyles = ({ endAdornment }) =>
	endAdornment && {
		root: getSpacing({ pl: 14 }),
		input: getSpacing({ pl: 0 }),
	};

const getMarginStyles = ({ margin }) =>
	margin === 'dense' && {
		input: {
			paddingTop: '15px',
			paddingBottom: '15px',
		},
	};

const getMultilineStyles = ({ multilined }) =>
	multilined && {
		root: {
			// Prevent pading issue with fullWidth.
			boxSizing: 'border-box',
			padding: '18.5px 14px',
		},
		input: {
			padding: '0px',
		},
	};

const getStartAdornmentStyles = ({ startAdornment }) =>
	startAdornment && {
		root: getSpacing({ pr: 14 }),
		input: getSpacing({ pr: 0 }),
	};

const getOutlinedInputStyles = combine(
	getBaseStyles,
	getMarginStyles,
	getMultilineStyles,
	getEndAdornmentStyles,
	getStartAdornmentStyles,
);

const getStyles = props => getOutlinedInputStyles(props);
getStyles.propTypes = {};

const OutlinedInput = forwardRef(
	({ labelWidth, notched, notchedOutlineProps, ...props }, ref) => (
		<InputBase
			ref={ref}
			renderPrefix={({
				filled,
				focused,
				startAdornment,
				...passThru
			}) => (
				<NotchedOutline
					focused={focused}
					labelWidth={labelWidth}
					notched={
						typeof notched !== 'undefined'
							? notched
							: Boolean(startAdornment || filled || focused)
					}
					{...passThru}
					{...notchedOutlineProps}
				/>
			)}
			styles={getStyles}
			{...props}
		/>
	),
);

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
	classes: PropTypes.object,
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
	// If `true`, the input will be disabled.
	disabled: PropTypes.bool,
	// End `InputAdornment` for this component.
	endAdornment: PropTypes.node,
	/**
	 * If `true`, the input will indicate an error. This is normally obtained
	 * via context from
	 * FormControl.
	 */
	error: PropTypes.bool,
	// The id of the `input` element.
	id: PropTypes.string,
	/**
	 * The component used for the native input.
	 * Either a string to use a DOM element or a component.
	 */
	inputComponent: PropTypes.any,
	// Attributes applied to the `input` element.
	inputProps: PropTypes.object,
	// Use that property to pass a ref callback to the native input component.
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	// If `true`, the input will take up the full width of its container.
	fullWidth: PropTypes.bool,
	// The width of the legend.
	labelWidth: PropTypes.number.isRequired,
	/**
	 * If `dense`, will adjust vertical spacing. This is normally obtained via
	 * context from
	 * FormControl.
	 */
	margin: PropTypes.oneOf(['dense', 'none']),
	// If `true`, a textarea element will be rendered.
	multiline: PropTypes.bool,
	// Name attribute of the `input` element.
	name: PropTypes.string,
	/**
	 * Callback fired when the value is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value`.
	 */
	// If `true`, the outline is notched to accommodate the label.
	notched: PropTypes.bool,
	onChange: PropTypes.func,
	// The short hint displayed in the input before the user enters a value.
	placeholder: PropTypes.string,
	/**
	 * It prevents the user from changing the value of the field
	 * (not from interacting with the field).
	 */
	readOnly: PropTypes.bool,
	// If `true`, the input will be required.
	required: PropTypes.bool,
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
	fullWidth: false,
	inputComponent: 'input',
	multiline: false,
	type: 'text',
};

export default OutlinedInput;
