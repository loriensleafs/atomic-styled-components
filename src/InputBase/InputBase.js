import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import TextArea from 'TextArea';
import FormControlContext from '../FormControl/FormControlContext';
import useFormControl from '../FormControl/useFormControl';
import useStyles from '../system/useStyles';
import usePrevious from '../hooks/usePrevious';
import combine from '../utils';
import { isFilled } from 'utils';
import { componentPropType } from '../utils/propTypes';

const getFullWidthStyles = ({ fullWidth }) =>
	fullWidth && {
		root: {
			width: '100%',
		},
	};

const getMarginStyles = ({ margin, theme: { spacing } }) =>
	margin === 'dense' && {
		input: {
			paddingTop: `${spacing[0] - 1}px`,
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
};

const getBaseStyles = ({
	theme: {
		getTransition,
		typography: { fontFamilies, fontSizes },
		palette,
	},
}) => {
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
};

const getStyles = combine(
	getBaseStyles,
	getTypeStyles,
	getMarginStyles,
	getMultilineStyles,
	getFullWidthStyles,
);
getStyles.propTypes = {
	// If `true`, the input will take up the full width of its container.
	fullWidth: PropTypes.bool,
	// If `dense`, adjusts vertical spacing. From the FormControl context.
	margin: PropTypes.oneOf(['dense', 'none']),
	multiline: PropTypes.bool,
	// Type of the input element. It should be a valid HTML5 input type.
	type: PropTypes.string,
};

const InputBase = forwardRef((props, ref) => {
	ref = ref ? ref : useRef(null);
	const [mergedProps, context] = useFormControl(props, [
		'error',
		'disabled',
		'filled',
		'margin',
		'required',
	]);
	const [
		{ classes },
		{
			as,
			autoComplete,
			autoFocus,
			className,
			defaultValue,
			endAdornment,
			error,
			id,
			fullWidth,
			multiline,
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
		whitelist: ['fullWidth', 'multiline', 'margin', 'type'],
	});
	const mounted = useRef(false);
	const [focused, setFocused] = useState(false);
	const isControlled = value !== null;
	const prevDisabled = usePrevious(disabled);

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
		setFocused(false);

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

		setFocused(true);

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

	let InputComponent = as;
	let inputProps = { ref };

	if (typeof InputComponent !== 'string') {
		inputProps = {
			...inputProps,
			disabled: disabled,
			required: required,
			type,
		};
	} else if (multiline) {
		if (rows && !rowsMax) {
			InputComponent = 'textarea';
			inputProps = {
				...inputProps,
				disabled: disabled,
				required: required,
			};
		} else {
			InputComponent = TextArea;
			inputProps = {
				...inputProps,
				disabled,
				required,
				rowsMax,
			};
		}
	} else {
		inputProps = {
			...inputProps,
			disabled,
			required,
			type,
		};
	}

	useEffect(() => {
		if ((!mounted.current && !isControlled) || isControlled) {
			mounted.current = true;
			checkDirty(props);
		}
		if (!prevDisabled && disabled && context && context.onBlur) {
			context.onBlur();
		}
	}, [disabled, mounted, value]);

	return (
		<div className={classes.root} onClick={handleClick} {...passThru}>
			{renderPrefix && renderPrefix({ startAdornment, focused })}
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
	// If `true`, the input will be disabled.
	disabled: PropTypes.bool,
	// End `InputAdornment` for this component.
	endAdornment: PropTypes.node,
	//  If `true`, the input will indicate an error. From FormControl context.
	error: PropTypes.bool,
	// The id of the `input` element.
	id: PropTypes.string,
	// Attributes applied to the `input` element.
	inputProps: PropTypes.object,
	// Use that property to pass a ref callback to the native input component.
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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

export default InpupBase;
