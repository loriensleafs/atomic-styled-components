import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import ThemeContext from '../theme/ThemeContext';
import useDidMount from './../hooks/useDidMount';
import useDidUpdate from './../hooks/useDidUpdate';
import usePrevious from './../hooks/usePrevious';
import useStyles from './../hooks/useStyles';
import useFocusVisible from './useFocusVisible';
import Ripples, { useRipples } from './../Ripples';
import cn from './../theme/className';

export const getBaseStyles = props => ({
	rootStyles: {
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
		marginTop: 0,
		marginRight: 0,
		marginBottom: 0,
		marginLeft: 0,
		// Remove the padding in Firefox.
		padding: 0,
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
});

function ButtonBase(props) {
	const {
		action,
		centerRipple,
		children,
		className: classNameProp,
		component,
		disabled,
		disableRipple,
		disableTouchRipple,
		focusRipple,
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
		styles,
		tabIndex,
		RippleProps,
		type,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const buttonRef = useRef(null);
	const [keyDown, setKeyDown] = useState(false);
	const {
		focusVisible,
		focusVisibilityHandler,
		checkFocusTimer,
		setFocusVisible,
	} = useFocusVisible();
	const prevFocusVisible = usePrevious(focusVisible || false);
	const [ripples, rippleStartHandler, rippleEndHandler] = useRipples();
	const isButton = component === 'button';
	const Component = isButton && props.href ? 'a' : component || 'button';
	const buttonProps = useMemo(
		() =>
			isButton
				? {
						disabled,
						type: type || 'button',
				  }
				: {
						role: 'button',
				  },
		[Component, disabled, type],
	);
	const { rootStyles } = useStyles(
		{ ...props, focusVisible, theme },
		[props, focusVisible, theme],
		[getBaseStyles],
	);
	const className = useMemo(() => cn(classNameProp, rootStyles), [rootStyles]);

	const handleMouseDown = useCallback(
		rippleStartHandler(buttonRef.current, false, centerRipple, () => {
			clearTimeout(checkFocusTimer.current);
			if (focusVisible) setFocusVisible(() => false);
		}),
		[],
	);

	const handleMouseUp = useCallback(rippleEndHandler(), []);

	const handleMouseLeave = useCallback(
		rippleEndHandler(event => focusVisible && event.preventDefault()),
		[],
	);

	const handleTouchStart = useCallback(
		rippleStartHandler(buttonRef.current, false, centerRipple),
		[],
	);

	const handleTouchEnd = useCallback(rippleEndHandler(), []);

	const handleTouchMove = useCallback(rippleEndHandler(), []);

	const handleBlur = useCallback(
		rippleEndHandler(event => {
			clearTimeout(checkFocusTimer.current);
			setFocusVisible(() => false);
			if (onBlur) onBlur(event);
		}),
		[],
	);

	const handleFocus = useCallback(event => {
		focusVisibilityHandler(
			buttonRef.current,
			disabled,
			event => {
				setFocusVisible(() => true);
				setKeyDown(() => false);
				if (onFocusVisible) onFocusVisible(event);
			},
			false,
		)(event);

		if (onFocus) {
			onFocus(event);
		}
	}, []);

	const handleKeyDown = useCallback(event => {
		const key = keycode(event);

		if (focusRipple && !keyDown && focusVisible && key === 'space') {
			event.persist();
			setKeyDown(() => true);
			rippleEndHandler(() => rippleStartHandler(buttonRef.current)())();

			if (onKeyDown) {
				onKeyDown(event);
			}

			if (
				event.target === event.currentTarget &&
				component &&
				component !== 'button' &&
				(key === 'space' || key === 'enter') &&
				!(buttonRef.current.tagName === 'A' && buttonRef.current.href)
			) {
				event.preventDefault();
				if (props.onClick) {
					props.onClick(event);
				}
			}
		}
	}, []);

	const handleKeyUp = useCallback(event => {
		if (focusRipple && keycode(event) === 'space' && focusVisible) {
			event.persist();
			setKeyDown(() => false);
			rippleEndHandler(() => rippleStartHandler(buttonRef.current, true, true)())();

			if (onKeyUp) {
				onKeyUp(event);
			}
		}
	}, []);

	useDidMount(() => {
		if (action) {
			action({
				focusVisible: () => {
					setFocusVisible(() => true);
					if (buttonRef.current) {
						buttonRef.current.focus();
					}
				},
			});
		}
	});

	useDidUpdate(
		() => {
			if (focusRipple && !disableRipple && !prevFocusVisible && focusVisible) {
				rippleStartHandler(buttonRef.current, true, true)();
			}
		},
		[disabled, prevFocusVisible, focusVisible, keyDown],
	);

	return (
		<Component
			className={className}
			onBlur={handleBlur}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeave}
			onMouseUp={handleMouseUp}
			onTouchEnd={handleTouchEnd}
			onTouchMove={handleTouchMove}
			onTouchStart={handleTouchStart}
			ref={buttonRef}
			tabIndex={disabled ? '-1' : tabIndex}
			{...buttonProps}
			{...passThru}>
			{children}
			{!disableRipple && !disabled && <Ripples ripples={ripples} {...RippleProps} />}
		</Component>
	);
}

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
	/**
	 * Use that property to pass a ref callback to the native button component.
	 */
	buttonRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * If `true`, the ripples will be centered.
	 * They won't start at the cursor interaction position.
	 */
	centerRipple: PropTypes.bool,
	/**
	 * The content of the component.
	 */
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
	/**
	 * If `true`, the base button will be disabled.
	 */
	disabled: PropTypes.bool,
	/**
	 * If `true`, the ripple effect will be disabled.
	 */
	disableRipple: PropTypes.bool,
	/**
	 * If `true`, the touch ripple effect will be disabled.
	 */
	disableTouchRipple: PropTypes.bool,
	/**
	 * If `true`, the base button will have a keyboard focus ripple.
	 * `disableRipple` must also be `false`.
	 */
	focusRipple: PropTypes.bool,
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
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/**
	 * Properties applied to the `TouchRipple` element.
	 */
	RippleProps: PropTypes.object,
	/**
	 * Used to control the button's purpose.
	 * This property passes the value to the `type` attribute of the native button component.
	 * Valid property values include `button`, `submit`, and `reset`.
	 */
	type: PropTypes.string,
};

ButtonBase.defaultProps = {
	centerRipple: false,
	component: 'button',
	disableRipple: false,
	disableTouchRipple: false,
	focusRipple: false,
	tabIndex: '0',
	type: 'button',
};

export default ButtonBase;
