import React from 'react';
import PropTypes from 'prop-types';
import InputBase from '../InputBase';
import useStyles from '../system/useStyles';
import combine from '../utils/combine';
import { componentPropType } from '../utils/propTypes';

const getErrorStyles = ({ error, theme: { palette } }) =>
	error && {
		':after': {
			borderBottomColor: palette.error.main,
			transform: 'scaleX(1)',
		},
	};

const getUnderlinedStyles = ({
	disableUnderline,
	error,
	disabled,
	focused,
	theme: { getTransition, palette },
}) => {
	const isLight = palette.type === 'light';
	const bottomLineColor = isLight
		? 'rgba(0,0,0,0.42)'
		: 'rgba(255,255,255, 0.7)';
	const next = {};

	if (!disableUnderline) {
		next = {
			':before': {
				content: '"\\00a0"',
				position: 'absolute',
				right: '0px',
				bottom: '0px',
				left: '0px',
				borderBottom: `1px solid ${bottomLineColor}`,
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
			':disabled:before': {
				borderBottomStyle: 'dotted',
			},
			':focused:after': {
				transform: 'scaleX(1)',
			},
		};
	}

	if (!error && !focused && !disabled) {
		next[':hover'] = {
			borderBotom: `2px solid ${palette.text.primary}`,
			// Reset on touch devices so we don't add specificity.
			'@media (hover: none)': {
				borderBottom: `1px solid ${bottomLineColor}`,
			},
		};
	}

	return next;
};

const baseStyles = {
	position: 'relative',
};

const getStyles = combine(getUnderlinedStyles, getErrorStyles);
getStyles.propsTypes = {
	// If `true`, the input will not have an underline.
	disableUnderline: PropTypes.bool,
	// If 'true', Input is should be displayed in an error state.
	error: PropTypes.bool,
	// If `true`, the input will be disabled.
	disabled: PropTypes.bool,
};

function Input(props) {
	const [{ styles }, { disableUnderline, ...passThru }] = useStyles(
		props,
		getStyles,
		{
			baseStyles,
			whitelist: ['disableUnderline', 'error', 'disabled'],
		},
	);

	return <InputBase styles={styles} {...passThru} />;
}

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
	// If `true`, the input will take up the full width of its container.
	fullWidth: PropTypes.bool,
	// The id of the `input` element.
	id: PropTypes.string,
	// Attributes applied to the `input` element.
	inputProps: PropTypes.object,
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
	...componentPropType,
};

InputBase.defaultProps = {
	as: 'input',
	fullWidth: false,
	multiline: false,
	type: 'text',
};

export default Input;
