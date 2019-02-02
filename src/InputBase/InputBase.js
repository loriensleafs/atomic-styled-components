import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import TextArea from './TextArea';
import FormControlContext from './../FormControl/FormControlContext';
import useFormControl from './../FormControl/useFormControl';
import useStyles from './../system/useStyles';
import usePrevious from './../hooks/usePrevious';
import combine from './../utils';
import { isFilled } from './utils';

function getFullWidthStyles({ isFullWidth }) {
	return (
		isFullWidth && {
			root: {
				width: '100%',
			},
		}
	);
}

function getMarginStyles(props) {
	const {
		margin,
		theme: { spacing },
	} = props;

	return (
		margin === 'dense' && {
			input: {
				paddingTop: `${spacing[0] - 1}px`,
			},
		}
	);
}

function getMultilineStyles(props) {
	const {
		isMultiline,
		theme: { spacing },
	} = props;

	return (
		isMultiline && {
			root: {
				padding: `${spacing[1] - 2}px 0 ${spacing[1] - 1}px`,
			},
			input: {
				padding: '0px',
				resize: 'none',
			},
		}
	);
}

function getTypeStyles({ type }) {
	const next = {};

	if (type === 'search') {
		next = {
			'-moz-appearance': 'textfield',
			'-webkit-appearance': 'textfield',
		};
	}
	if (type !== 'text') {
		next = { ...next, height: '1.1875em' };
	}

	return { input: next };
}

function getBaseStyles(props) {
	const {
		getTransition,
		typography: { fontFamilies, fontSizes },
		palette,
	} = props.theme;
	const isLight = palette.type === 'light';
	const placeholder = {
		color: 'currentColor',
		opacity: isLight ? 0.42 : 0.5,
		transition: getTransition('opacity', { duration: 'shorter' }),
	};

	return {
		formControl: {},
		input: {
			boxSizing: 'content-box',
			width: '100%',
			minWidth: '0px',
			margin: '0px',
			padding: '6px 0 7px',
			display: 'block',
			border: '0px',
			background: 'none',
			color: 'currentColor',
			WebkitTapHighlightColor: 'transparent',
			'::-webkit-search-decoration': {
				'-webkit-appearance': 'none',
			},
			'::-webkit-input-placeholder': placeholder,
			'::-moz-placeholder': placeholder,
			'::-ms-input-placeholder': placeholder,
			'::-ms-input-placeholder': placeholder,
			':disabled': {
				opacity: 1,
			},
			':focus': {
				outline: 0,
			},
			':invalid': {
				boxShadow: 'none',
			},
		},
		root: {
			display: 'inline-flex',
			alignItems: 'center',
			color: palette.text.primary,
			fontFamily: fontFamilies.ui,
			fontSize: fontSizes[3],
			lineHeight: '1.1875em',
			cursor: 'text',
			':disabled': {
				color: palette.text.disabled,
				cursor: 'default',
			},
		},
	};
}

const getStyles = combine(
	getBaseStyles,
	getTypeStyles,
	getMarginStyles,
	getMultilineStyles,
	getFullWidthStyles,
);
getStyles.propTypes = {
	// If `true`, the input will take up the full width of its container.
	isFullWidth: PropTypes.bool,
	isMultiline: PropTypes.bool,
	margin: PropTypes.oneOf(['dense', 'none']),
	// Type of the input element. It should be a valid HTML5 input type.
	type: PropTypes.string,
};

const InputBase = forwardRef((props, ref) => {
	ref = ref ? ref : useRef(null);
	const [mergedProps, context] = useFormControl(props, [
		'hasError',
		'isDisabled',
		'isFilled',
		'isRequired',
		'margin',
	]);
	const [
		{ classes },
		{
			autoComplete,
			autoFocus,
			className,
			defaultValue,
			endAdornment,
			hasError,
			id,
			isDisabled,
			isFullWidth,
			isMultiline,
			isRequired,
			inputComponent,
			inputProps,
			margin,
			name,
			onBlur,
			onChange,
			onClick,
			onEmpty,
			onFilled,
			onFocus,
			onKeyDown,
			onKeyUp,
			placeholder,
			readOnly,
			renderPrefix,
			rows,
			rowsMax,
			startAdornment,
			type,
			value,
			...passThru
		},
	] = useStyles(mergedProps, getStyles, {
		whitelist: ['isFullWidth', 'isMultiline', 'margin', 'type'],
	});
	const [isFocused, setIsFocused] = useState(false);
	const prevDisabled = usePrevious(disabled);
	const isControlled = value !== null;

	const checkDirty = useCallback(obj => {
		if (isFilled(obj)) {
			if (context && context.onFilled) {
				context.onFilled();
			}
			if (onFilled) {
				onFilled();
			}
			return;
		}
		if (context && context.onEmpty) {
			context.onEmpty();
		}
		if (onEmpty) {
			onEmpty();
		}
	}, []);

	const handleBlur = useCallback(event => {
		setIsFocused(() => false);

		if (onBlur) {
			onBlur(event);
		}
		if (context && context.onBlur) {
			context.onBlur(event);
		}
	}, []);

	const handleFocus = useCallback(event => {
		if (context && context.disabled) {
			event.stopPropagation();
			return;
		}

		setIsFocused(() => true);

		if (onFocus) {
			onFocus(event);
		}
		if (context && context.onFocus) {
			context.focus(event);
		}
	}, []);

	const handleChange = useCallback(event => {
		if (!isControlled) {
			checkDirty(ref.current);
		}
		if (onChange) {
			onChange(event);
		}
	}, []);

	const handleClick = useCallback(event => {
		if (ref.current && event.currentTarget === event.target) {
			ref.current.focus();
		}
		if (onClick) {
			onClick(event);
		}
	}, []);

	let InputComponent = inputComponent;
	let inputProps = { ref };

	if (typeof InputComponent !== 'string') {
		inputProps = {
			...inputProps,
			disabled: isDisabled,
			required: isRequired,
			type,
		};
	} else if (isMultiline) {
		if (rows && !rowsMax) {
			InputComponent = 'textarea';
			inputProps = {
				...inputProps,
				disabled: isDisabled,
				required: isRequired,
			};
		} else {
			InputComponent = TextArea;
			inputProps = {
				...inputProps,
				isDisabled,
				isRequired,
				rowsMax,
			};
		}
	} else {
		inputProps = {
			...inputProps,
			isDisabled,
			isRequired,
			type,
		};
	}

	useEffect(() => {
		if (!isControlled) {
			checkDirty(ref.current);
		}
	}, []);

	useEffect(() => {
		if (isControlled) {
			checkDirty(props);
		}
		if (!prevDisabled && isDisabled && context && context.onBlur) {
			context.onBlur();
		}
	}, [isDisabled, value]);

	return (
		<div className={classes.root} onClick={handleClick} {...passThru}>
			{renderPrefix &&
				renderPrefix({ startAdornment, focused: isFocused })}
			{startAdornment}
			<FormControlContext.Provider value={null}>
				<InputComponent
					aria-invalid={error}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					className={classes.input}
					defaultValue={defaultValue}
					id={id}
					name={name}
					onBlur={handleBlur}
					onChange={handleChange}
					onFocus={handleFocus}
					onKeyDown={onKeyDown}
					onKeyUp={onKeyUp}
					placeholder={placeholder}
					readOnly={readOnly}
					rows={rows}
					value={value}
					{...inputProps}
				/>
			</FormControlContext.Provider>
			{endAdornment}
		</div>
	);
});

InputBase.displayName = 'InputBase';

InputBase.propTypes = {
	/**
	 * This property helps users to fill forms faster, especially on mobile devices.
	 * The name can be confusing, as it's more like an autofill.
	 * You can learn more about it here:
	 * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
	 */
	autoComplete: PropTypes.string,
	// If `true`, the input will be focused during the first mount.
	autoFocus: PropTypes.bool,
	// Override or extend the styles applied to the component.
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
	// If `true`, the input will be disabled.
	isDisabled: PropTypes.bool,
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
	// If `true`, the input will be required.
	isRequired: PropTypes.bool,
	// Name attribute of the `input` element.
	name: PropTypes.string,
	onBlur: PropTypes.func,
	/**
	 * Callback fired when the value is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value`.
	 */
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	onEmpty: PropTypes.func,
	onFilled: PropTypes.func,
	onFocus: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	// The short hint displayed in the input before the user enters a value.
	placeholder: PropTypes.string,
	// Prevents the user from changing the field value (still interactive).
	readOnly: PropTypes.bool,
	renderPrefix: PropTypes.func,
	// Number of rows to display when multiline option is set to true.
	rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// Maximum number of rows to display when multiline option is set to true.
	rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// Start `InputAdornment` for this component.
	startAdornment: PropTypes.node,
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
};

InputBase.defaultProps = {
	fullWidth: false,
	inputComponent: 'input',
	multiline: false,
	type: 'text',
};

export default InpupBase;
