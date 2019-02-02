import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import throttle from './../utils/throttle';
import { cn, useStyles } from './../system';

const ROWS_HEIGHT = 19;

function getStyles() {
	return {
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
}

const Textarea = forwardRef((props, ref) => {
	const [
		{ classes },
		{
			className,
			defaultValue,
			isDisabled,
			onChange,
			rows,
			rowsMax,
			value: valueProp,
			...passThru
		},
	] = useStyles(props, getStyles, { prefixCnTo: '' });
	const value = useRef(valueProp);
	const inputRef = ref ? ref : useRef(null);
	const shadowRef = useRef(null);
	const singleLineShadowRef = useRef(null);
	const [height, setHeight] = useState(Number(rows) * ROWS_HEIGHT);
	const isControlled = value.current != null;

	const syncHeightWithShadow = useCallback(() => {
		if (!shadowRef.current) return;

		if (isControlled) {
			shadowRef.current.value =
				value.current == null ? '' : String(value);
		}

		let lineHeight = singlelineShadowRef.current.scrollHeight;
		lineHeight = lineHeight === 0 ? ROWS_HEIGHT : lineHeight;

		let newHeight = shadowRef.current.scrollHeight;

		if (Number(rowsMax) >= Number(rows)) {
			newHeight = Math.min(Number(rowsMax) * lineHeight, newHeight);
		}

		newHeight = Math.max(newHeight, lineHeight);

		// Need a large enough difference to update the height.
		// This prevents infinite rendering loops.
		if (Math.abs(height - newHeight) > 1) {
			setHeight(() => newHeight);
		}
	}, [value.current]);

	const handleChange = useCallback(event => {
		value.current = event.target.value;

		if (!isControlled) {
			shadowRef.current.value = value.current;
			syncHeightWithShadow();
		}
		if (onChange) {
			onChange(event);
		}
	}, []);

	useEffect(() => {
		let resizeHandler = throttle(handleResize);
		window.addEventListener('resize', resizeHandler);
		return () => window.removeEventListener('resize', resizeHandler);
	}, []);

	useEffect(() => syncHeightWithShadow(), [value.current]);

	return (
		<div className={classes.root}>
			<textarea
				aria-hidden="true"
				className={cn(classes.textarea, classes.shadow)}
				disabled={isDisabled}
				readOnly
				ref={singleLineShadowRef}
				rows="1"
				tabIndex={-1}
				value=""
			/>
			<textarea
				aria-hidden="true"
				className={cn(classes.textarea, classes.shadow)}
				defaultValue={defaultValue}
				disabled={isDisabled}
				readOnly
				ref={shadowRef}
				rows={rows}
				tabIndex={-1}
				value={value.current}
			/>
			<textarea
				rows={rows}
				className={cn(classes.textarea, className)}
				defaultValue={defaultValue}
				disabled={isDisabled}
				value={value.current}
				onChange={handleChange}
				ref={inputRef}
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
	isDisabled: PropTypes.bool,
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
