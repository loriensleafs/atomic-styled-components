/* eslint-disable no-unused-vars */

import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';
import { findDOMNode } from 'react-dom';
import keycode from 'keycode';
import ownerWindow from './../utils/ownerWindow';
import TouchRipple from './TouchRipple';
import createRippleHandler from './createRippleHandler';
import { listenForFocusKeys, detectFocusVisible } from './focusVisible';
import { classify } from './../theme';
import merge from './../utils/pureRecursiveMerge';

export const styles = {
	root: {
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
};

/**
 * Creates a ButtonBase component
 * @class
 */
class ButtonBase extends Component {
	ripple = null;

	keyDown = false; // Used to help track keyboard activation keyDown

	button = createRef();

	focusVisibleTimeout = null;

	focusVisibleCheckTime = 50;

	focusVisibleMaxCheckTimes = 5;

	handleMouseDown = createRippleHandler(this, 'MouseDown', 'start', () => {
		clearTimeout(this.focusVisibleTimeout);
		if (this.state.focusVisible) this.setState({ focusVisible: false });
	});

	handleMouseUp = createRippleHandler(this, 'MouseUp', 'stop');

	handleMouseLeave = createRippleHandler(this, 'MouseLeave', 'stop', (event) => {
		if (this.state.focusVisible) {
			event.preventDefault();
		}
	});

	handleTouchStart = createRippleHandler(this, 'TouchStart', 'start');

	handleTouchEnd = createRippleHandler(this, 'TouchEnd', 'stop');

	handleTouchMove = createRippleHandler(this, 'TouchMove', 'stop');

	handleBlur = createRippleHandler(this, 'Blur', 'stop', () => {
		clearTimeout(this.focusVisibleTimeout);
		if (this.state.focusVisible) this.setState({ focusVisible: false });
	});

	state = {};

	componentDidMount() {
		this.button = findDOMNode(this);
		listenForFocusKeys(ownerWindow(this.button));

		if (this.props.action) {
			this.props.action({
				focusVisible: () => {
					this.this.setState({ focusVisible: true });
					this.button.focus();
				},
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.focusRipple &&
			!this.props.disableRipple &&
			!prevState.focusVisible &&
			this.state.focusVisible
		) {
			this.ripple.pulsate();
		}
	}

	componentWillUnmount() {
		this.button = null;
		clearTimeout(this.focusVisibleTimeout);
	}

	onRippleRef = (element) => {
		this.ripple = element;
	};

	onFocusVisibleHandler = (event) => {
		this.keyDown = false;
		this.setState({ focusVisible: true });

		if (this.props.onFocusVisible) this.props.onFocusVisible(event);
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (typeof prevState.focusVisible === 'undefined') {
			return {
				focusVisible: false,
				lastDisabled: nextProps.disabled,
			};
		}

		// The blur won't fire when the disabled state is set on a focused input.
		// We need to book keep the focused state manually.
		if (!prevState.prevState && nextProps.disabled && prevState.focusVisible) {
			return {
				focusVisible: false,
				lastDisabled: nextProps.disabled,
			};
		}

		return {
			lastDisabled: nextProps.disabled,
		};
	}

	handleKeyDown = (event) => {
		const { component, focusRipple, onKeyDown, onClick } = this.props;
		const key = keycode(event);

		// Check if key is already down to avoid repeats being counted as multiple activations.
		if (
			focusRipple &&
			!this.keyDown &&
			this.state.focusVisible &&
			this.ripple &&
			key === 'space'
		) {
			this.keyDown = true;
			event.persist();
			this.ripple.stop(event, () => {
				this.ripple.start(event);
			});
		}

		if (onKeyDown) onKeyDown(event);

		// Keyboard accessibility for non interactive elements
		if (
			event.target === event.currentTarget &&
			component &&
			component !== 'button' &&
			(key === 'space' || key === 'enter') &&
			!(this.button.tagName === 'A' && this.button.href)
		) {
			event.preventDefault();
			if (onClick) onClick(event);
		}
	};

	handleKeyUp = (event) => {
		if (
			this.props.focusRipple &&
			keycode(event) === 'space' &&
			this.ripple &&
			this.state.focusVisible
		) {
			this.keyDown = false;
			event.persist();
			this.ripple.stop(event, () => this.ripple.pulsate(event));
		}

		if (this.props.onKeyUp) this.props.onKeyUp(event);
	};

	handleFocus = (event) => {
		if (this.props.disabled) return;

		// Fix for https://github.com/facebook/react/issues/7769
		if (!this.button) this.button = event.currentTarget;

		event.persist();
		detectFocusVisible(this, this.button, () => this.onFocusVisibleHandler(event));

		if (this.props.onFocus) this.props.onFocus(event);
	};

	render() {
		const {
			actions,
			buttonRef,
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
			onkeyUp,
			onMouseDown,
			onMouseLeave,
			onMouseUp,
			onTouchEnd,
			onTouchMove,
			onTouchStart,
			$styles,
			tabIndex,
			TouchRippleProps,
			type,
			theme,
			...passThru
		} = this.props;

		const className = classify(merge({}, styles.root, $styles.root), classNameProp);

		const buttonProps = {};

		let ComponentProp = component;

		if (ComponentProp === 'button' && passThru.href) {
			ComponentProp = 'a';
		}

		if (ComponentProp === 'button') {
			buttonProps.type = type || 'button';
			buttonProps.disabled = disabled;
		} else {
			buttonProps.role = 'button';
		}

		return (
			<ComponentProp
				className={className}
				onBlur={this.handleBlur}
				onFocus={this.handleFocus}
				onKeyDown={this.handleKeyDown}
				onKeyUp={this.handleKeyUp}
				onMouseDown={this.handleMouseDown}
				onMouseLeave={this.handleMouseLeave}
				onMouseUp={this.handleMouseUp}
				onTouchEnd={this.handleTouchEnd}
				onTouchMove={this.handleTouchMove}
				onTouchStart={this.handleTouchStart}
				ref={buttonRef}
				tabIndex={disabled ? '-1' : tabIndex}
				{...buttonProps}
				{...passThru}
			>
				{children}
				{!disableRipple && !disabled ? (
					<TouchRipple
						innerRef={this.onRippleRef}
						center={centerRipple}
						{...TouchRippleProps}
					/>
				) : null}
			</ComponentProp>
		);
	}
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
	buttonRef: PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]),
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
	component: PropTypes.oneOfType([ PropTypes.string, PropTypes.func, PropTypes.object ]),
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
	/**
	 * This property can help a person know which element has the keyboard focus.
	 * The class name will be applied when the element gain the focus throught a keyboard interaction.
	 * It's a polyfill for the [CSS :focus-visible feature](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
	 * The rational for using this feature [is explain here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
	 */
	focusVisibleClassName: PropTypes.string,
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
	$styles: PropTypes.object,
	tabIndex: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
	/**
	 * Properties applied to the `TouchRipple` element.
	 */
	TouchRippleProps: PropTypes.object,
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
	$styles: { root: {} },
	tabIndex: '0',
	type: 'button',
};

export default ButtonBase;
