import React from 'react';
import PropTypes from 'prop-types';
import useMotion from './../hooks/useMotion';
import { animated, useSpring } from 'react-spring';
import { componentPropType } from './../utils/propTypes';

function Rotate(props) {
	const {
		as,
		children,
		className,
		deg,
		duration: durationProp,
		ease,
		onEnd,
		onStart,
		onUpdate,
		style = {},
		...passThru
	} = props;
	const [easing, duration] = useMotion(ease, durationProp);
	const transition = useSpring({
		native: true,
		config: { duration, easing },
		display: 'inherit',
		transform: `rotate(${deg}deg)`,
		onStart: () => onStart && onStart(),
		onFrame: val => onUpdate && onUpdate(val),
		onRest: () => onEnd && onEnd(),
	});
	const Component = animated[as];

	return (
		<Component
			children={children}
			className={className}
			style={{ ...style, ...transition }}
			{...passThru}
		/>
	);
}

Rotate.displayName = 'Rotate';

Rotate.propTypes = {
	// The content node to be rotated.
	children: PropTypes.node,
	className: PropTypes.string,
	// The duration type the animation should use.
	duration: PropTypes.string,
	// The easing type the animation should use.
	ease: PropTypes.string,
	// The degree to animate to.
	deg: PropTypes.number,
	// Callback that is triggered at the end of the animation.
	onEnd: PropTypes.func,
	// Callback that is triggered at the start of the animation.
	onStart: PropTypes.func,
	// Callback that is triggered while the animation is entering.
	onUpdate: PropTypes.func,
	// Inline styles to apply to the animated wrapper.
	style: PropTypes.object,
	...componentPropType,
};

Rotate.defaultProps = {
	as: 'div',
	deg: 0,
	duration: 'shorter',
	ease: 'inOut',
};

export default Rotate;
