import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import useTransition from './../hooks/useTransition';
import { animated as a, useSpring } from 'react-spring/hooks';

function Fade(props) {
	const {
		children,
		component: componentProp,
		ease,
		enter,
		exit,
		in: inProp,
		onEnd,
		onStart,
		onEntering,
		onExiting,
		style = {},
		...passThru
	} = props;
	const [easing, duration] = useTransition(ease, enter, exit, inProp);
	const Component = a[componentProp];
	const transition = useSpring({
		native: true,
		opacity: inProp ? 1 : 0,
		onStart: () => onStart && onStart(),
		onFrame: val =>
			inProp
				? onEntering && onEntering(val)
				: onExiting && onExiting(val),
		onRest: () => onEnd && onEnd(),
		config: { duration, easing },
	});

	return (
		<Component
			children={children}
			className={props.className}
			style={{ ...style, ...transition }}
			{...passThru}
		/>
	);
}

Fade.displayName = 'Fade';

Fade.propTypes = {
	/**
	 * The content node to be collapsed.
	 */
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * The tag type the animated wrapper component should be.
	 */
	component: PropTypes.string,
	/**
	 * The duration type the animation should use to transition in.
	 */
	enter: PropTypes.string,
	/**
	 * The duration type the animation should use to transition out.
	 */
	exit: PropTypes.string,
	/**
	 * The easing type the animation should use.
	 */
	ease: PropTypes.string,
	/**
	 * If `true`, the component will transition in.
	 */
	in: PropTypes.bool,
	/**
	 * Callback that is triggered at the end of the animation.
	 */
	onEnd: PropTypes.func,
	/**
	 * Callback that is triggered at the start of the animation.
	 */
	onStart: PropTypes.func,
	/**
	 * Inline styles that will be applied to the animated wrapper
	 * component.
	 */
	style: PropTypes.object,
};

Fade.defaultProps = {
	component: 'div',
	enter: 'entering',
	exit: 'leaving',
	ease: 'inOut',
};

export default Fade;
