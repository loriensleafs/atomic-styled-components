import PropTypes from 'prop-types';
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { FormControlContext, useFormControl } from '../FormControl';
import TextArea from './Textarea';
import usePrevious from '../hooks/usePrevious';
import useStyles from '../system/useStyles';
import combine from '../utils/combine';
import { componentPropType } from '../utils/propTypes';
import { isFilled } from './utils';
import { isNil } from '../utils/helpers';

const getBaseStyles = props => {
	const {
		theme: {
			getTransition,
			typography: { fontFamilies, fontSizes, unit },
			palette,
		},
	} = props;
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
			paddingTop: '6px',
			paddingRight: '0px',
			paddingBottom: '7px',
			paddingLeft: '0px',
			display: 'block',
			font: 'inherit',
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
			fontSize: `${fontSizes[3]}${unit}`,
			lineHeight: '1.1875em',
			cursor: 'text',
		},
	};
};

const getDisabledStyles = ({ disabled, theme: { palette } }) =>
	disabled && {
		root: {
			color: palette.text.disabled,
			cursor: 'default',
		},
		input: {
			opacity: 1,
		},
	};

const getFullWidthStyles = ({ fullWidth }) =>
	fullWidth && {
		root: {
			width: '100%',
		},
	};

const getMarginStyles = ({ margin, theme: { spacing } }) =>
	margin === 'dense' && {
		input: {
			paddingTop: `${spacing[1] - 1}px`,
		},
	};

const getMultilineStyles = ({ multiline, theme: { spacing } }) =>
	multiline && {
		root: {
			padding: `${spacing[1] - 2}px 0 ${spacing[1] - 1}px`,
		},
		input: {
			padding: '0px',
			resize: 'none',
		},
	};

const getTypeStyles = ({ type }) => {
	let next = {};

	if (type === 'search') {
		next = {
			'-moz-appearance': 'textfield',
			'-webkit-appearance': 'textfield',
		};
	}
	if (type !== 'text') {
		next = { ...next, height: '1.1875em' };
	}
	return {
		input: next,
	};
};

const getStyles = combine(
	getBaseStyles,
	getFullWidthStyles,
	getMultilineStyles,
	getMarginStyles,
	getTypeStyles,
	getDisabledStyles,
);
getStyles.propTypes = {
	// If `true`, the input will be disabled.
	disabled: PropTypes.bool,
	// If `true`, the input will indicate an error. From FormControl context.
	error: PropTypes.bool,
	filled: PropTypes.bool,
	focused: PropTypes.bool,
	formControlEnabled: PropTypes.object,
	// If `true`, the input will take up the full width of its container.
	fullWidth: PropTypes.bool,
	// If `dense`, adjusts vertical spacing. From the FormControl context.
	margin: PropTypes.oneOf(['dense', 'none']),
	multiline: PropTypes.bool,
	// Type of the input element. It should be a valid HTML5 input type.
	type: PropTypes.string,
};

const InputBase = forwardRef((props, refProp) => {
	const ref = refProp ? refProp : useRef(null);
	const { formControlEnabled, ...fc } = useFormControl(props, [
		'disabled',
		'error',
		'filled',
		'margin',
		'onBlur',
		'onEmpty',
		'onFilled',
		'onFocus',
		'required',
	]);
	const [focused, setFocused] = useState(
		formControlEnabled ? fc.focused : false,
	);
	const {
		classes,
		props: {
			autoComplete,
			autoFocus,
			className,
			defaultValue,
			disabled,
			endAdornment,
			id,
			fullWidth,
			multiline,
			inputComponent,
			inputProps: inputPropsProp,
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
			required,
			rows,
			rowsMax,
			startAdornment,
			type,
			value,
			...passThru
		},
	} = useStyles(
		{
			...props,
			...fc,
			focused,
			formControlEnabled,
		},
		getStyles,
		{
			nested: true,
			whitelist: [
				'endAdornment',
				'fullWidth',
				'multiline',
				'startAdornment',
				'type',
			],
		},
	);
	const controlled = !isNil(value);
	const prevDisabled = usePrevious(disabled);

	const checkDirty = useCallback(obj => {
		if (isFilled(obj)) {
			if (formControlEnabled && fc.onFilled) {
				fc.onFilled();
			}
			if (props.onFilled) {
				props.onFilled();
			}
			return;
		}
		if (formControlEnabled && fc.onEmpty) {
			fc.onEmpty();
		}
		if (props.onEmpty) {
			props.onEmpty();
		}
	}, []);

	const handleBlur = useCallback(event => {
		setFocused(false);
		if (props.onBlur) {
			props.onBlur(event);
		}
		if (formControlEnabled && fc.onBlur) {
			fc.onBlur(event);
		}
	}, []);

	const handleFocus = useCallback(event => {
		if (formControlEnabled && fc.disabled) {
			event.stopPropagation();
			return;
		}

		setFocused(true);
		if (props.onFocus) {
			props.onFocus(event);
		}
		if (formControlEnabled && fc.onFocus) {
			fc.onFocus(event);
		}
	}, []);

	const handleChange = useCallback(
		event => {
			if (!controlled) {
				checkDirty(ref.current);
			}
			if (onChange) {
				onChange(event);
			}
		},
		[controlled],
	);

	const handleClick = useCallback(event => {
		if (ref.current && event.currentTarget === event.target) {
			ref.current.focus();
		}
		if (onClick) {
			onClick(event);
		}
	}, []);

	let InputComponent = inputComponent;
	let inputProps = {
		...inputPropsProp,
		ref,
	};

	if (typeof InputComponent !== 'string') {
		inputProps = {
			type,
			...inputProps,
		};
	} else if (multiline) {
		if (rows && !rowsMax) {
			InputComponent = 'textarea';
		} else {
			InputComponent = TextArea;
			inputProps = {
				rowsMax,
				...inputProps,
			};
		}
	} else {
		inputProps = {
			type,
			...inputProps,
		};
	}

	useEffect(() => {
		if (!controlled) {
			checkDirty(ref.current);
		}
	}, []);

	useEffect(() => {
		if (!prevDisabled && disabled && formControlEnabled && fc.onBlur) {
			fc.onBlur();
		}
		if (controlled) {
			checkDirty({ value });
		}
	}, [disabled, value]);

	return (
		<div className={classes.root} onClick={handleClick} {...passThru}>
			{renderPrefix &&
				renderPrefix({
					disabled: fc.disabled,
					error: fc.error,
					filled: fc.filled,
					focused,
					startAdornment,
				})}
			{startAdornment}
			<FormControlContext.Provider value={null}>
				<InputComponent
					aria-invalid={fc.error}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					className={classes.input}
					defaultValue={defaultValue}
					disabled={fc.disabled}
					id={id}
					name={name}
					onBlur={handleBlur}
					onChange={handleChange}
					onFocus={handleFocus}
					onKeyDown={onKeyDown}
					onKeyUp={onKeyUp}
					placeholder={placeholder}
					readOnly={readOnly}
					ref={ref}
					required={fc.required}
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
	 * This property helps users to fill forms faster, especially on mobile
	 * devices.
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
	// The id of the `input` element.
	id: PropTypes.string,
	/**
	 * The component used for the native input.
	 * Either a string to use a DOM element or a component.
	 */
	inputComponent: PropTypes.elementType,
	// Attributes applied to the `input` element.
	inputProps: PropTypes.object,
	// Name attribute of the `input` element.
	name: PropTypes.string,
	onBlur: PropTypes.func,
	/**
	 * Callback fired when the value is changed.
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
	// If `true`, the input will be required.
	required: PropTypes.bool,
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
	...componentPropType,
};

InputBase.defaultProps = {
	fullWidth: false,
	inputComponent: 'input',
	multiline: false,
	type: 'text',
};

export default InputBase;
