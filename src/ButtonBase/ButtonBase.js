import React, { useCallback, useMemo, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import useDidMount from './../hooks/useDidMount';
import useDidUpdate from './../hooks/useDidUpdate';
import usePrevious from './../hooks/usePrevious';
import useFocusVisible from './useFocusVisible';
import Ripples, { useRipples } from './Ripples';
import cn from './../theme/className';
import merge from './../utils/pureRecursiveMerge';
import { isFunc } from './../utils/helpers';
import ThemeContext from '../theme/ThemeContext';

export function getStyles(props) {
	return merge(
		{
			buttonStyles: {
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
		},
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);
}

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
	const keyDown = useRef(false);
	const {
		focusVisible,
		focusVisibilityHandler,
		checkFocusTimer,
		setFocusVisible,
	} = useFocusVisible();
	const prevFocusVisible = usePrevious(focusVisible);
	const [ripples, rippleStartHandler, rippleEndHandler] = useRipples();
	const Component = component === 'button' && props.href ? 'a' : component || 'button';
	const buttonProps = useMemo(
		() =>
			Component === 'button'
				? {
						disabled,
						type: type || 'button',
				  }
				: { role: 'button' },
		[Component, disabled, type],
	);
	const className = useMemo(
		() => cn(classNameProp, getStyles({ ...props, ...{ theme } }).buttonStyles),
		[props, theme],
	);

	const handleMouseDown = useCallback(
		rippleStartHandler(false, centerRipple, () => {
			clearTimeout(checkFocusTimer.current);
			if (focusVisible) {
				setFocusVisible(() => false);
			}
		}),
		[],
	);

	const handleMouseUp = useCallback(rippleEndHandler(), []);

	const handleMouseLeave = useCallback(
		rippleEndHandler(event => {
			if (focusVisible) {
				event.preventDefault();
			}
		}),
		[],
	);

	const handleTouchStart = useCallback(rippleStartHandler(false, centerRipple), []);

	const handleTouchEnd = useCallback(rippleEndHandler(), []);

	const handleTouchMove = useCallback(rippleEndHandler(), []);

	const handleBlur = useCallback(event => {
		clearTimeout(checkFocusTimer.current);
		if (focusVisible) {
			setFocusVisible(() => false);
		}
	}, []);

	const handleFocus = useCallback(
		focusVisibilityHandler(disabled, event => {
			keyDown.current = false;

			if (onFocus) {
				onFocus(event);
			}
		}),
		[],
	);

	const handleKeyDown = useCallback(event => {
		if (!keyDown.current && focusVisible && keycode(event) === 'space') {
			keyDown.current = true;
			event.persist();

			if (onKeyDown) {
				onKeyDown(event);
			}
		}
	}, []);

	const handleKeyUp = useCallback(event => {
		if (keycode(event) === 'space' && focusVisible) {
			keyDown.current = false;
			event.persist();

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
				console.log('pulsate');
			}
		},
		[focusRipple, disableRipple, prevFocusVisible, focusVisible],
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
	focusRipple: true,
	tabIndex: '0',
	type: 'button',
};

export default ButtonBase;
