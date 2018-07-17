import PropTypes from 'prop-types';
import React, { Component } from 'react';
import tag from 'clean-tag';
import { styled } from './../styled';

const StyledButtonBase = styled(tag.button, ({ theme, ...props }) => ({
	...{
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
		margin: 0,
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
}));

StyledButtonBase.displayName = 'StyledButtonBase';

StyledButtonBase.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	color: PropTypes.oneOf([ 'default', 'inherit', 'primary', 'secondary' ]),
	disabled: PropTypes.bool,
	disableFocusRipple: PropTypes.bool,
	disableRipple: PropTypes.bool,
	fullWidth: PropTypes.bool,
	href: PropTypes.string,
	mini: PropTypes.bool,
	size: PropTypes.oneOf([ 'small', 'medium', 'large' ]),
	type: PropTypes.string,
	variant: PropTypes.oneOf([ 'text', 'outlined', 'contained', 'fab', 'extendedFab' ]),
};

class ButtonBase extends Component {
	ripple = null;

	button = null;

	focusVisibleTimeout = null;

	focusVisibleCheckTime = 50;

	focusVisibleMaxCheckTimes = 5;

	handleMouseDown = () => {};

	handleMouseUp = () => {};

	handleMouseLeave = () => {};

	handleTouchStart = () => {};

	handleTouchEnd = () => {};

	handleTouchMove = () => {};

	handleBlur = () => {};

	state = {};

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {}

	componentWillUnmount() {}

	onRippleRef = (node) => {};

	onFocusVisibleHandler = (event) => {};

	static getDerivedStateFromProps(nextProps, prevState) {}

	handleKeyDown = (event) => {};

	handleKeyUp = (event) => {};

	handleFocus = (event) => {};

	render() {}
}

ButtonBase.propTypes = {
	/**
	 * Callback fired when the component mounts.
	 * This is useful when you want to trigger an action programmatically.
	 * It currently only supports `focusVisible()` action.
	 *
	 * @param {object} actions This object contains all possible actions
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
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object.isRequired,
	/**
	 * @ignore
	 */
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
	/**
	 * @ignore
	 */
	onBlur: PropTypes.func,
	/**
	 * @ignore
	 */
	onClick: PropTypes.func,
	/**
	 * @ignore
	 */
	onFocus: PropTypes.func,
	/**
	 * Callback fired when the component is focused with a keyboard.
	 * We trigger a `onFocus` callback too.
	 */
	onFocusVisible: PropTypes.func,
	/**
	 * @ignore
	 */
	onKeyDown: PropTypes.func,
	/**
	 * @ignore
	 */
	onKeyUp: PropTypes.func,
	/**
	 * @ignore
	 */
	onMouseDown: PropTypes.func,
	/**
	 * @ignore
	 */
	onMouseLeave: PropTypes.func,
	/**
	 * @ignore
	 */
	onMouseUp: PropTypes.func,
	/**
	 * @ignore
	 */
	onTouchEnd: PropTypes.func,
	/**
	 * @ignore
	 */
	onTouchMove: PropTypes.func,
	/**
	 * @ignore
	 */
	onTouchStart: PropTypes.func,
	/**
	 * @ignore
	 */
	role: PropTypes.string,
	/**
	 * @ignore
	 */
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
	focusRipple: false,
	tabIndex: '0',
	type: 'button',
};

export default StyledButtonBase;
