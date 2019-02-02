import React, {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Ripples, { useRippleManager } from '../Ripples';
import usePrevious from '../hooks/usePrevious';
import cn from '../system/className';
import merge from '../utils/merge';
import { isFn } from '../utils/helpers';
import { componentPropType, stylesPropType } from '../utils/propTypes';

function getStyles(props) {
	const { className, styles: stylesProp } = props;
	const styles = merge(
		{
			position: 'relative',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			// Removes the grey highlight.
			WebkitTapHighlightColor: 'transparent',
			// Reset default value
			backgroundColor: 'transparent',
			// Disable the focus ring for mouse, touch and keyboard users.
			outline: 'none',
			border: 0,
			// Remove the margin in Safari.
			marginTop: '0px',
			marginRight: '0px',
			marginBottom: '0px',
			marginLeft: '0px',
			// Remove the padding in Firefox.
			paddingTop: '0px',
			paddingRight: '0px',
			paddingBottom: '0px',
			paddingLeft: '0px',
			borderRadius: 0,
			cursor: 'pointer',
			userSelect: 'none',
			verticalAlign: 'middle',
			// Reset
			'-moz-appearance': 'none',
			'-webkit-appearance': 'none',
			textDecoration: 'none',
			// So we take precedent over the style of a native <a /> element.
			color: 'inherit',
			':disabled': {
				// Disable the link interactions.
				pointerEvents: 'none',
				cursor: 'default',
			},
		},
		isFn(stylesProp) ? stylesProp(props) : stylesProp || {},
	);

	return cn(className, styles);
}

const ButtonBase = forwardRef((props, ref) => {
	ref = ref ? ref : useRef(null);
	const {
		as,
		action,
		centerRipple,
		children,
		className,
		disableRipple,
		disableTouchRipple,
		focusRipple,
		isDisabled,
		onBlur,
		onFocus,
		onFocusVisible,
		onKeyDown,
		onKeyUp,
		onMouseDown,
		onMouseLeave,
		onMouseUp,
		onTouchEnd,
		onTouchMove,
		onTouchStart,
		styles = {},
		tabIndex,
		type = 'button',
		...passThru
	} = props;
	const [rippleProps, rippleHandler, addRipple] = useRippleManager(ref);
	const [isFocused, setIsFocused] = useState(false);
	const prevIsFocused = usePrevious(isFocused);
	const keyDown = useRef(false);
	const Component = props.href ? 'a' : as ? as : 'button';
	const buttonProps =
		as === 'button' ? { disabled: isDisabled, type } : { role: 'button' };
	const classes = useMemo(() => getStyles(props), [className, styles]);

	const handleMouseDown = rippleHandler(
		{ type: 'start', center: centerRipple },
		useCallback(() => {
			if (isFocused) {
				setIsFocused(false);
			}
		}, []),
	);

	const handleMouseUp = rippleHandler({ type: 'end' });

	const handleMouseLeave = rippleHandler(
		{ type: 'end' },
		useCallback(event => {
			if (isFocused) {
				event.preventDefault();
			}
		}, []),
	);

	const handleTouchStart = rippleHandler({
		type: 'start',
		center: centerRipple,
	});

	const handleTouchEnd = rippleHandler({ type: 'end' });

	const handleTouchMove = rippleHandler({ type: 'end' });

	const handleContextMenu = rippleHandler({ type: 'end' });

	const handleBlur = rippleHandler(
		{ type: 'end' },
		useCallback(event => {
			setIsFocused(false);
			if (onBlur) {
				onBlur(event);
			}
		}, []),
	);

	const handleFocus = useCallback(event => {
		keyDown.current = false;
		setIsFocused(true);

		if (onFocusVisible) {
			onFocusVisible(event);
		}

		if (onFocus) {
			onFocus(event);
		}
	}, []);

	const handleKeyDown = useCallback(event => {
		const key = keycode(event);

		if (focusRipple && !keyDown.current && isFocused && key === 'space') {
			keyDown.current = true;

			if (onKeyDown) {
				onKeyDown(event);
			}

			if (
				as &&
				as === 'button' &&
				event.target === event.currentTarget &&
				(key === 'space' || key === 'enter') &&
				!(ref.current.tagName === 'A' && ref.current.href)
			) {
				event.preventDefault();
			}
		}
	}, []);

	const handleKeyUp = useCallback(event => {
		if (focusRipple && keycode(event) === 'space' && isFocused) {
			keyDown.current = false;
			if (onKeyUp) {
				onKeyUp(event);
			}
		}
	}, []);

	useEffect(() => {
		if (
			isFocused &&
			focusRipple &&
			!isDisabled &&
			!disableRipple &&
			!prevIsFocused &&
			keyDown.current
		) {
			addRipple({ center: true, pulsate: true });
		}
	}, [isDisabled, isFocused, keyDown]);

	return (
		<Component
			className={classes}
			disabled={isDisabled}
			onBlur={handleBlur}
			onContextMenu={handleContextMenu}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeave}
			onMouseUp={handleMouseUp}
			onTouchEnd={handleTouchEnd}
			onTouchMove={handleTouchMove}
			onTouchStart={handleTouchStart}
			ref={ref}
			tabIndex={isDisabled ? '-1' : tabIndex}
			{...buttonProps}
			{...passThru}
		>
			{children}
			{!disableRipple && !isDisabled && <Ripples {...rippleProps} />}
		</Component>
	);
});

ButtonBase.displayName = 'ButtonBase';

ButtonBase.propTypes = {
	/**
	 * Callback fired when the component mounts.
	 * This is useful when you want to trigger an action programmatically.
	 * It currently only supports `focusVisible()` action.
	 *
	 * @param {object} actions - This object contains all possible actions
	 * that can be triggered programmatically.
	 */
	action: PropTypes.func,
	// If `true`, the ripples will be centered (not at cursor position).
	centerRipple: PropTypes.bool,
	// The content of the component.
	children: PropTypes.node,
	className: PropTypes.string,
	// If `true`, the ripple effect will be disabled.
	disableRipple: PropTypes.bool,
	// If `true`, the touch ripple effect will be disabled.
	disableTouchRipple: PropTypes.bool,
	/**
	 * If `true`, the base button will have a keyboard focus ripple.
	 * `disableRipple` must also be `false`.
	 */
	focusRipple: PropTypes.bool,
	// If `true`, the base button will be disabled.
	isDisabled: PropTypes.bool,
	onBlur: PropTypes.func,
	onClick: PropTypes.func,
	onFocus: PropTypes.func,
	/**
	 * Callback fired when the component is focused with a keyboard.
	 * We trigger a `onFocus` callback too.
	 */
	onFocusVisible: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	onMouseDown: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onMouseUp: PropTypes.func,
	onTouchEnd: PropTypes.func,
	onTouchMove: PropTypes.func,
	onTouchStart: PropTypes.func,
	role: PropTypes.string,
	// Use that property to pass a ref callback to the native button component.
	ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	// Properties applied to the `TouchRipple` element.
	RippleProps: PropTypes.object,
	tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/**
	 * Used to control the button's purpose.
	 * This property passes the value to the `type` attribute of the native
	 * button component.
	 * Valid property values include `button`, `submit`, and `reset`.
	 */
	type: PropTypes.string,
	...componentPropType,
	...stylesPropType,
};

ButtonBase.defaultProps = {
	as: 'button',
	centerRipple: false,
	disableRipple: false,
	disableTouchRipple: false,
	focusRipple: false,
	tabIndex: '0',
	type: 'button',
};

export default ButtonBase;
