import React from 'react';
import PropTypes from 'prop-types';
import InputBase from './../InputBase';
import combine from './../utils/combine';
import { getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getAdornmentStyles(props) {
	const { hasEndAdornment, hasStartAdornment } = props;
	const next = {};

	if (hasStartAdornment) {
		next.root = getSpacing({ pl: 2.5 });
		next.input = getSpacing({ pl: 0 });
	}
	if (hasEndAdornment) {
		next.root = getSpacing({ pr: 2.5 });
		next.input = getSpacing({ pr: 0 });
	}

	return next;
}

function getErrorStyles(props) {
	const {
		hasError,
		theme: { palette },
	} = props;

	return (
		hasError && {
			root: {
				':after': {
					borderBottomColor: palette.error.main,
					transform: 'scaleX(1)',
				},
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
				padding: '27px 12px 10px',
			},
			input: {
				padding: '0px',
			},
		}
	);
}

function getUnderlinedStyles(props) {
	const {
		disableUnderline,
		hasError,
		isDisabled,
		isFocused,
		theme: { getTransition, palette },
	} = props;
	const isLight = palette.type === 'light';
	const bottomLineColor = isLight
		? 'rgba(0,0,0,0.42)'
		: 'rgba(255,255,255, 0.7)';
	let next = {};

	if (!disableUnderline) {
		next = {
			root: {
				':before': {
					content: '"\\00a0"',
					position: 'absolute',
					right: '0px',
					bottom: '0px',
					left: '0px',
					borderBottom: `1px solid ${bottomLineColor}`,
					transition: getTransition('border-bottom-color', {
						duration: 'shorter',
					}),
					pointerEvents: 'none',
				},
				':after': {
					content: '""',
					position: 'absolute',
					right: '0px',
					bottom: '0px',
					left: '0px',
					borderBottom: `2px solid ${palette.primary[palette.type]}`,
					transform: 'scaleX(0)',
					transition: getTransition('transform', {
						duration: 'shorter',
						easing: 'out',
					}),
					pointerEvents: 'none',
				},
				':disabled:before': {
					borderBottom: `1px dotted ${bottomLineColor}`,
				},
			},
		};

		if (!hasError && !isDisabled && !isFocused) {
			next.root[':hover'] = {
				borderBottom: `1px solid ${palette.text.primary}`,
			};
		}
	}

	return next;
}

function getBaseStyles(props) {
	const { getTransition, palette, shape } = props.theme;
	const isLight = palette.type === 'light';

	return {
		root: {
			position: 'relative',
			backgroundColor: isLight
				? 'rgba(0, 0, 0, 0.09)'
				: 'rgba(255, 255, 255, 0.09)',
			borderTopLeftRadius: shape.borderRadius.round,
			borderTopRightRadius: shape.borderRadius.round,
			transition: getTransition('background-color', {
				duration: 'shorter',
				easing: 'out',
			}),
			':hover': {
				backgroundColor: isLight
					? 'rgba(0, 0, 0, 0.13)'
					: 'rgba(255, 255, 255, 0.13)',
				// Reset on touch devices so as not to add specificity.
				'@media (hover: none)': {
					backgroundColor: isLight
						? 'rgba(0, 0, 0, 0.09)'
						: 'rgba(255, 255, 255, 0.09)',
				},
			},
			':focused:after': {
				backgroundColor: isLight
					? 'rgba(0, 0, 0, 0.09)'
					: 'rgba(255, 255, 255, 0.12)',
			},
			':disabled': {
				backgroundColor: isLight
					? 'rgba(0, 0, 0, 0.12)'
					: 'rgba(255, 255, 255, 0.12)',
			},
		},
		input: {
			padding: '27px 12px 10px',
		},
	};
}

const getStyles = combine(
	getBaseStyles,
	getUnderlinedStyles,
	getMultilineStyles,
	getErrorStyles,
	getAdornmentStyles,
);
getStyles.propTypes = {
	// If `true`, the input will not have an underline.
	disableUnderline: PropTypes.bool,
	/**
	 * If `true`, the input will indicate an error. This is normally obtained
	 * via context from
	 * FormControl.
	 */
	hasError: PropTypes.bool,
	// If `true`, the input will be disabled.
	isDisabled: PropTypes.bool,
	// If `true`, a textarea element will be rendered.
	isMultiline: PropTypes.bool,
};

function FilledInput(props) {
	const [{ styles }, { className, ...passThru }] = useStyles(
		props,
		getStyles,
		{
			whitelist: ['hasError', 'isDisabled', 'isMultiline'],
		},
	);

	return <InputBase styles={styles} {...passThru} />;
}

FilledInput.displayName = 'FilledInput';

FilledInput.propTypes = {
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
	/**
	 * If `dense`, will adjust vertical spacing. This is normally obtained via
	 * context from
	 * FormControl.
	 */
	margin: PropTypes.oneOf(['dense', 'none']),
	// If `true`, the input will take up the full width of its container.
	isFullWidth: PropTypes.bool,
	// If `true`, the input will be required.
	isRequired: PropTypes.bool,
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
	...getStyles.propTypes,
	...stylesPropType,
};

InputBase.defaultProps = {
	isFullWidth: false,
	isMultiline: false,
	inputComponent: 'input',
	type: 'text',
};

export default FilledInput;
