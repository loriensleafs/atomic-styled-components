import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import useDidUpdate from './../hooks/useDidUpdate';
import usePrevious from './../hooks/usePrevious';
import useStyles from './../hooks/useStyles';
import Ripples, { useRippleManager } from './../Ripples';
import cn from './../theme/className';

export const getBaseStyles = {
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
};

const ButtonBase = React.forwardRef((props, ref) => {
	ref = ref ? ref : useRef(null);
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
	ref = ref ? ref : useRef(null);
	const [ripples, rippleHandler, startRipple] = useRippleManager(ref);
	const [focused, setFocused] = useState(false);
	const prevFocused = usePrevious(focused);
	const keyDown = useRef(false);
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
	const { rootStyles } = useStyles([getBaseStyles], {
		...props,
		focusVisible: focused,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [
		classNameProp,
		rootStyles,
	]);

	const handleMouseDown = rippleHandler(
		{
			type: 'start',
			center: centerRipple,
		},
		useCallback(() => focused && setFocused(() => false), []),
	);

	const handleMouseUp = rippleHandler({ type: 'end' });

	const handleMouseLeave = rippleHandler(
		{ type: 'end' },
		useCallback(event => focused && event.preventDefault(), []),
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
			setFocused(() => false);
			if (onBlur) onBlur(event);
		}, []),
	);

	const handleFocus = useCallback(event => {
		keyDown.current = false;
		setFocused(() => true);
		if (onFocusVisible) onFocusVisible(event);
		if (onFocus) onFocus(event);
	}, []);

	const handleKeyDown = useCallback(event => {
		const key = keycode(event);

		if (focusRipple && !keyDown.current && focused && key === 'space') {
			keyDown.current = true;

			if (onKeyDown) onKeyDown(event);

			if (
				event.target === event.currentTarget &&
				component &&
				!isButton &&
				(key === 'space' || key === 'enter') &&
				!(ref.current.tagName === 'A' && ref.current.href)
			) {
				event.preventDefault();
			}
		}
	}, []);

	const handleKeyUp = useCallback(event => {
		if (focusRipple && keycode(event) === 'space' && focused) {
			keyDown.current = false;
			if (onKeyUp) onKeyUp(event);
		}
	}, []);

	useDidUpdate(
		() => {
			if (
				focusRipple &&
				!disableRipple &&
				!prevFocused &&
				focused &&
				ripples.length < 1
			) {
				startRipple({ center: true, pulsate: true });
			}
		},
		[disabled, focused],
	);

	return (
		<Component
			className={className}
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
			tabIndex={disabled ? '-1' : tabIndex}
			{...buttonProps}
			{...passThru}
		>
			{children}
			{!disableRipple && !disabled && (
				<Ripples ripples={ripples} {...RippleProps} />
			)}
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
	/**
	 * Use that property to pass a ref callback to the native button component.
	 */
	ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
	component: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
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
