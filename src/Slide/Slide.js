import React from 'react';
import PropTypes from 'prop-types';
import useTransition from './../hooks/useTransition';
import useSlideManager from './useSlideManager';
import { animated as a, useSpring } from 'react-spring/hooks';
import { componentPropType } from './../utils/propTypes';

function Slide(props) {
	const {
		as,
		children,
		className,
		ease,
		enter,
		exit,
		direction,
		in: inProp,
		onEnd,
		onStart,
		onEntering,
		onExiting,
		style = {},
		...passThru
	} = props;
	const [slideIn, slideOut, ref] = useSlideManager(direction);
	const [easing, duration] = useTransition(ease, enter, exit, inProp);
	const Component = a[as];
	const transition = useSpring({
		native: true,
		transform: inProp ? slideIn : slideOut,
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
			className={className}
			ref={ref}
			style={{ ...style, ...transition }}
			{...passThru}
		/>
	);
}

Slide.displayName = 'Slide';

Slide.propTypes = {
	/**
	 * A single child content element.
	 */
	children: PropTypes.node,
	className: PropTypes.string,
	containerRef: PropTypes.any,
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
	 * Callback that is triggered at the end of the animation.
	 */
	onEnd: PropTypes.func,
	/**
	 * Callback that is triggered at the start of the animation.
	 */
	onStart: PropTypes.func,
	/**
	 * Callback that is triggered while the animation is entering.
	 */
	onEntering: PropTypes.func,
	/**
	 * Callback that is triggered while the animation is exiting.
	 */
	onExiting: PropTypes.func,
	/**
	 * Inline styles that will be applied to the animated wrapper
	 * component.
	 */
	style: PropTypes.object,
	...componentPropType,
};

Slide.defaultProps = {
	as: 'div',
	direction: 'down',
	enter: 'entering',
	exit: 'leaving',
	ease: 'inOut',
};

export default Slide;
