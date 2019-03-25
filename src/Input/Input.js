import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import InputBase from '../InputBase';
import { getSpacing } from '../system';
import combine from '../utils/combine';
import { stylesPropType } from '../utils/propTypes';

const getBaseStyles = () => ({
	position: 'relative',
});

const getDisabledStyles = ({
	disabled,
	disableUnderline,
	theme: { palette },
}) =>
	disabled &&
	!disableUnderline && {
		':before': {
			borderBottomStyle: 'dotted',
		},
		':hover:before': {
			borderBottom: `1px dotted ${palette.text.disabled}`,
		},
	};

const getErrorStyles = ({ error, disableUnderline, theme: { palette } }) =>
	!disableUnderline &&
	error && {
		':hover:before': {
			borderBottom: `2px solid ${palette.error.main}`,
		},
		':after': {
			borderBottomColor: palette.error.main,
			transform: 'scaleX(1)',
		},
	};

const getFocusedStyles = ({ focused, theme: { palette } }) =>
	focused && {
		':before': {
			borderBottom: `1px solid ${
				palette.type === 'light'
					? 'rgba(0,0,0,0.42)'
					: 'rgba(255,255,255, 0.7)'
			}`,
		},
		':after': {
			transform: 'scaleX(1)',
		},
		':hover:before': {
			borderBottom: `1px solid ${
				palette.type === 'light'
					? 'rgba(0,0,0,0.42)'
					: 'rgba(255,255,255, 0.7)'
			}`,
		},
	};

const getFormControlStyles = ({ formControl }) =>
	formControl.enabled && getSpacing({ mt: 3 });

const getUnderlineStyles = ({
	disableUnderline,
	theme: { getTransition, palette },
}) =>
	!disableUnderline && {
		':before': {
			content: '"\\00a0"',
			position: 'absolute',
			right: '0px',
			bottom: '0px',
			left: '0px',
			borderBottom: `1px solid ${
				palette.type === 'light'
					? 'rgba(0,0,0,0.42)'
					: 'rgba(255,255,255, 0.7)'
			}`,
			transition: getTransition('border-bottom-color', {
				duration: 'shorter',
				easing: 'out',
			}),
			pointerEvents: 'none',
		},
		':after': {
			content: '""',
			position: 'absolute',
			right: '0px',
			left: '0px',
			bottom: '0px',
			borderBottom: `2px solid ${palette.primary[palette.type]}`,
			transform: 'scaleX(0)',
			transition: getTransition('transform', {
				duration: 'shorter',
				easing: 'out',
			}),
			pointerEvents: 'none',
		},
		':hover:before': {
			borderBottom: `2px solid ${palette.text.primary}`,
			// Reset on touch devices so we don't add specificity.
			'@media (hover: none)': {
				borderBottom: `1px solid ${
					palette.type === 'light'
						? 'rgba(0, 0, 0, 0.42)'
						: 'rgba(255, 255, 255, 0.7)'
				}`,
			},
		},
	};

const getInputStyles = combine(
	getBaseStyles,
	getUnderlineStyles,
	getDisabledStyles,
	getErrorStyles,
	getFocusedStyles,
	getFormControlStyles,
);

const getStyles = props => ({ root: getInputStyles(props) });
getStyles.propsTypes = {
	// If `true`, the input will not have an underline.
	disableUnderline: PropTypes.bool,
	// If 'true', Input is should be displayed in an error state.
	error: PropTypes.bool,
	// If the label is a descendant of 'FormControl'
	formControl: PropTypes.bool,
};

const Input = forwardRef((props, ref) => (
	<InputBase ref={ref} styles={getStyles} {...props} />
));

Input.displayName = 'Input';

Input.propTypes = {
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
	// If `true`, the input will take up the full width of its container.
	fullWidth: PropTypes.bool,
	// The id of the `input` element.
	id: PropTypes.string,
	/**
	 * The component used for the native input.
	 * Either a string to use a DOM element or a component.
	 */
	inputComponent: PropTypes.elementType,
	// Attributes applied to the `input` element.
	inputProps: PropTypes.object,
	// Use that property to pass a ref callback to the native input component.
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	// If `dense`, will adjusts vertical spacing. From FormControl context.
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
	...getStyles.propTypes,
	...stylesPropType,
};

InputBase.defaultProps = {
	fullWidth: false,
	inputComponent: 'input',
	multiline: false,
	type: 'text',
};

export default Input;
