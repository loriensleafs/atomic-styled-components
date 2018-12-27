import React from 'react';
import PropTypes from 'prop-types';
import useSlideManager from './useSlideManager';
import { animated as a, useSpring } from 'react-spring/hooks';

function Slide(props) {
	const {
		children,
		className,
		component: componentProp,
		direction,
		in: inProp,
		onEnd,
		onStart,
		onEntering,
		onExiting,
		style = {},
	} = props;
	const [slideIn, slideOut, ref] = useSlideManager(direction);
	const Component = a[componentProp];
	const transition = useSpring({
		native: true,
		transform: inProp ? slideIn : slideOut,
		onStart: () => onStart && onStart(),
		onFrame: val =>
			inProp
				? onEntering && onEntering(val)
				: onExiting && onExiting(val),
		onRest: () => onEnd && onEnd(),
	});

	return (
		<Component
			children={children}
			className={className}
			ref={ref}
			style={{ ...style, ...transition }}
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
	/**
	 * The tag type the animated wrapper component should be.
	 */
	component: PropTypes.string,
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
};

Slide.defaultProps = {
	component: 'div',
	direction: 'down',
};

export default Slide;
