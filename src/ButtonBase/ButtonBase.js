import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Ripples, { useRipples } from '../Ripples';
import useFocus from './useFocus';
import useStyles from '../system/useStyles';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const baseStyles = {
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
};

const ButtonBase = forwardRef((props, ref) => {
	ref = ref ? ref : useRef(null);
	const {
		classes,
		props: {
			as,
			action,
			centerRipple,
			children,
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
			tabIndex,
			type = 'button',
			...passThru
		},
	} = useStyles(props, null, { baseStyles });
	const focus = useFocus(ref);
	const ripple = useRipples(ref);
	const keyDown = useRef(true);
	const Component = props.href ? 'a' : as ? as : 'button';
	const isButton = as === 'button';
	const buttonProps = isButton ? { disabled, type } : { role: 'button' };

	const handleMouseDown = ripple.createHandler(
		{ type: 'start', center: centerRipple },
		focus.mouseDownHandler,
	);

	const handleMouseUp = ripple.createHandler({ type: 'end' });

	const handleMouseLeave = ripple.createHandler(
		{ type: 'end' },
		useCallback(event => focus.visible && event.preventDefault(), [
			focus.visible,
		]),
	);

	const handleTouchStart = ripple.createHandler({
		type: 'start',
		center: centerRipple,
	});

	const handleTouchEnd = ripple.createHandler({ type: 'end' });

	const handleTouchMove = ripple.createHandler({ type: 'end' });

	const handleBlur = ripple.createHandler(
		{ type: 'end' },
		useCallback(
			event => {
				focus.blurHandler(event);
				if (onBlur) onBlur(event);
			},
			[focus.visible],
		),
	);

	const handleFocus = useCallback(
		event => {
			if (disabled) return;
			event.persist();
			focus.focusHandler(event);
			if (onFocus) onFocus(event);
		},
		[focus.visible],
	);

	const handleKeyDown = useCallback(
		event => {
			if (focusRipple && !keyDown.current && focus.visible) {
				keyDown.current = true;
				event.persist();
				ripple.remove();
				ripple.add({ pulsate: true, center: true });
			}

			if (onKeyDown) onKeyDown(event);

			if (
				event.target === event.currentTarget &&
				!isButton &&
				(event.key === ' ' || event.key === 'Enter') &&
				!(ref.current.tagName === 'A' && ref.current.href)
			) {
				event.preventDefault();
				if (onClick) onClick(event);
			}
		},
		[focus.visible],
	);

	const handleKeyUp = useCallback(
		event => {
			if (focusRipple && focus.visible) {
				keyDown.current = false;
				event.persist();
				ripple.remove();
				ripple.add({ pulsate: true, center: true });
			}

			if (onKeyUp) onKeyUp(event);
		},
		[focus.visible],
	);

	useEffect(() => {
		if (action) {
			action({
				focusVisible: () => {
					focus.set(true);
					ref.current.focus();
				},
			});
		}
	}, []);

	useEffect(() => {
		if (
			focusRipple &&
			!disableRipple &&
			!focus.previous &&
			focus.visible &&
			keyDown.current
		) {
			ripple.add({ center: true, pulsate: true });
		}
	}, [disabled, focus.visible]);

	return (
		<Component
			className={classes}
			disabled={disabled}
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
			ref={ref}
			tabIndex={disabled ? '-1' : tabIndex}
			{...buttonProps}
			{...passThru}
		>
			{children}
			{!disableRipple && !disabled && <Ripples {...ripple.props} />}
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
	// If `true`, the base button will be disabled.
	disabled: PropTypes.bool,
	// If `true`, the ripple effect will be disabled.
	disableRipple: PropTypes.bool,
	// If `true`, the touch ripple effect will be disabled.
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
