import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import FilledInput from '../FilledInput';
import FormControl from '../FormControl';
import FormHelperText from '../FormHelperText';
import Input from '../Input';
import InputLabel from '../InputLabel';
import OutlinedInput from '../OutlinedInput';

const variantComponent = {
	standard: Input,
	filled: FilledInput,
	outlined: OutlinedInput,
};

/**
 * The `TextField` is a convenience wrapper for the most common cases (80%).
 * It cannot be all things to all people, otherwise the API would grow out of control.
 *
 * ## Advanced Configuration
 *
 * It's important to understand that the text field is a simple abstraction
 * on top of the following components:
 * - [FormControl](/api/form-control/)
 * - [InputLabel](/api/input-label/)
 * - [Input](/api/input/)
 * - [FormHelperText](/api/form-helper-text/)
 *
 * If you wish to alter the properties applied to the native input, you can do so as follows:
 *
 * ```jsx
 * const inputProps = {
 *   step: 300,
 * };
 *
 * return <TextField id="time" type="time" inputProps={inputProps} />;
 * ```
 *
 * For advanced cases, please look at the source of TextField by clicking on the
 * "Edit this page" button above. Consider either:
 * - using the upper case props for passing values directly to the components
 * - using the underlying components directly as shown in the demos
 */
const TextField = forwardRef((props, ref) => {
	const {
		autoComplete,
		autoFocus,
		children,
		className,
		defaultValue,
		error,
		FormControlProps,
		FormHelperTextProps,
		fullWidth,
		helperText,
		id,
		InputLabelProps,
		inputProps,
		InputProps,
		label,
		multiline,
		name,
		onBlur,
		onChange,
		onFocus,
		placeholder,
		required,
		rows,
		rowsMax,
		select,
		SelectProps,
		type,
		value,
		variant,
		...passThru
	} = props;
	const [labelWidth, setLabelWidth] = useState(0);
	const labelRef = useRef(null);

	useEffect(() => {
		if (variant === 'outlined' && labelRef.current) {
			// StrictMode ready.
			setLabelWidth(labelRef.current ? labelRef.current.offsetWidth : 0);
		}
	}, [variant]);

	const InputMore = {};

	if (variant === 'outlined') {
		if (InputLabelProps && typeof InputLabelProps.shrink !== 'undefined') {
			InputMore.notched = InputLabelProps.shrink;
		}

		InputMore.labelWidth = labelWidth;
	}

	const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
	const InputComponent = variantComponent[variant];
	const InputElement = (
		<InputComponent
			aria-describedby={helperTextId}
			autoComplete={autoComplete}
			autoFocus={autoFocus}
			defaultValue={defaultValue}
			fullWidth={fullWidth}
			id={id}
			inputProps={inputProps}
			multiline={multiline}
			name={name}
			onBlur={onBlur}
			onChange={onChange}
			onFocus={onFocus}
			placeholder={placeholder}
			ref={ref}
			rows={rows}
			rowsMax={rowsMax}
			type={type}
			value={value}
			{...InputMore}
			{...InputProps}
		/>
	);

	return (
		<FormControl
			className={className}
			defaultValue={
				defaultValue
					? defaultValue
					: InputProps && InputProps.defaultValue
					? InputProps.defaultValue
					: null
			}
			error={error}
			fullWidth={fullWidth}
			required={required}
			variant={variant}
			{...FormControlProps}
			{...passThru}
		>
			{label && (
				<InputLabel htmlFor={id} ref={labelRef} {...InputLabelProps}>
					{label}
				</InputLabel>
			)}
			{InputElement}
			{helperText && (
				<FormHelperText id={helperTextId} {...FormHelperTextProps}>
					{helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
});

TextField.displayName = 'TextField';

TextField.propTypes = {
	/**
	 * This property helps users to fill forms faster, especially on mobile
	 * devices.
	 * The name can be confusing, as it's more like an autofill.
	 * You can learn more about it here:
	 * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
	 */
	autoComplete: PropTypes.string,
	// If `true`, the input will be focused during the first mount.
	autoFocus: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	// The default value of the `Input` element.
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// If `true`, the input will be disabled.
	disabled: PropTypes.bool,
	// If `true`, the label will be displayed in an error state.
	error: PropTypes.bool,
	// Props applied to the FormControl element.
	FormControlProps: PropTypes.object,
	// Props applied to the FormHelperText element.
	FormHelperTextProps: PropTypes.object,
	// If `true`, the input will take up the full width of its container.
	fullWidth: PropTypes.bool,
	// The helper text content.
	helperText: PropTypes.node,
	/**
	 * The id of the `input` element.
	 * Use this property to make `label` and `helperText` accessible for screen
	 * readers.
	 */
	id: PropTypes.string,
	// Properties applied to the [`InputLabel`](/api/input-label/) element.
	InputLabelProps: PropTypes.object,
	// Properties applied to the `Input` element.
	InputProps: PropTypes.object,
	// Attributes applied to the native `input` element.
	inputProps: PropTypes.object,
	// The label content.
	label: PropTypes.node,
	/**
	 * If `dense` or `normal`, will adjust vertical spacing of this and
	 * contained components.
	 */
	margin: PropTypes.oneOf(['none', 'dense', 'normal']),
	// If `true`, a textarea element will be rendered instead of an input.
	multiline: PropTypes.bool,
	// Name attribute of the `input` element.
	name: PropTypes.string,
	onBlur: PropTypes.func,
	/**
	 * Callback fired when the value is changed.
	 * @param {object} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value`.
	 */
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	// The short hint displayed in the input before the user enters a value.
	placeholder: PropTypes.string,
	/**
	 * If `true`, the label is displayed as required and the input will be
	 * required.
	 */
	required: PropTypes.bool,
	// Number of rows to display when multiline option is set to true.
	rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/**
	 * Maximum number of rows to display when multiline option is set to true.
	 */
	rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/**
	 * Render a `Select` element while passing the `Input` element to `Select` as `input` parameter.
	 * If this option is set you must pass the options of the select as children.
	 */
	select: PropTypes.bool,
	// Properties applied to the [`Select`](/api/select/) element.
	SelectProps: PropTypes.object,
	/**
	 * Type attribute of the `Input` element. It should be a valid HTML5 input
	 * type.
	 */
	type: PropTypes.string,
	// The value of the `Input` element, required for a controlled component.
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool,
			]),
		),
	]),
	// The variant to use.
	variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

TextField.defaultProps = {
	required: false,
	select: false,
	variant: 'standard',
};

export default TextField;
