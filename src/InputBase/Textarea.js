import PropTypes from 'prop-types';
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { cn, useStyles } from '../system';
import throttle from '../utils/throttle';

const ROWS_HEIGHT = 19;

const baseStyles = {
	root: {
		position: 'relative',
		width: '100%',
	},
	textarea: {
		boxSizing: 'border-box',
		width: '100%',
		height: '100%',
		padding: '0px',
		border: 'none',
		outline: 'none',
		font: 'inherit',
		resize: 'none',
		cursor: 'inherit',
		background: 'transparent',
	},
	shadow: {
		position: 'absolute',
		height: 'auto',
		visibility: 'hidden',
		overflow: 'hidden',
		whiteSpace: 'pre-wrap',
	},
};

const Textarea = forwardRef((props, ref) => {
	const {
		classes,
		props: {
			className,
			defaultValue,
			disabled,
			onChange,
			rows,
			rowsMax,
			value: valueProp,
			style,
			...passThru
		},
	} = useStyles(props, null, { baseStyles, nested: true });
	const shadowRef = useRef(null);
	const singlelineShadowRef = useRef(null);
	const [value, setValue] = useState(value || defaultValue || '');
	const [height, setHeight] = useState(Number(rows) * ROWS_HEIGHT);
	const controlled = valueProp != null;

	const syncHeightWithShadow = useCallback(() => {
		if (!shadowRef.current) {
			return;
		}
		if (controlled) {
			shadowRef.current.value = value;
		}

		let newHeight = shadowRef.current.scrollHeight;
		let lineHeight = singlelineShadowRef.current.scrollHeight;
		lineHeight = lineHeight === 0 ? ROWS_HEIGHT : lineHeight;

		if (Number(rowsMax) >= Number(rows)) {
			newHeight = Math.min(Number(rowsMax) * lineHeight, newHeight);
		}

		newHeight = Math.max(newHeight, lineHeight);

		// Need a large enough difference to update the height.
		// This prevents infinite rendering loops.
		if (Math.abs(height - newHeight) > 1) {
			setHeight(newHeight);
		}
	}, [height, value]);

	const handleChange = useCallback(
		event => {
			setValue(event.target.value);
			if (onChange) {
				onChange(event);
			}
		},
		[value],
	);

	const handleResize = useCallback(throttle(syncHeightWithShadow), [
		height,
		value,
	]);

	useEffect(() => {
		syncHeightWithShadow();
		window.addEventListener('resize', handleResize);
		() => {
			window.removeEventListener('resize', handleResize);
			handleResize.cancel();
		};
	}, []);

	useEffect(() => {
		if (!controlled) {
			shadowRef.current.value = value;
			syncHeightWithShadow();
		}
	}, [value]);

	return (
		<div className={classes.root}>
			<textarea
				aria-hidden="true"
				className={cn(classes.textarea, classes.shadow)}
				disabled={disabled}
				readOnly
				ref={singlelineShadowRef}
				rows="1"
				tabIndex={-1}
				value=""
			/>
			<textarea
				aria-hidden="true"
				className={cn(classes.textarea, classes.shadow)}
				defaultValue={defaultValue}
				disabled={disabled}
				readOnly
				ref={shadowRef}
				rows={rows}
				tabIndex={-1}
				value={value}
			/>
			<textarea
				rows={rows}
				className={cn(classes.textarea, className)}
				defaultValue={defaultValue}
				disabled={disabled}
				value={value}
				onChange={handleChange}
				ref={ref}
				style={{ height, ...style }}
				{...passThru}
			/>
		</div>
	);
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
	classes: PropTypes.object,
	className: PropTypes.string,
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	// Number of rows to display when multiline option is set to true.
	rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// Maximum number of rows to display when multiline option is set to true.
	rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	style: PropTypes.object,
	// Use that property to pass a ref callback to the native textarea element.
	textareaRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Textarea.defaultProps = {
	rows: 1,
};

export default Textarea;
