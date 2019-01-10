import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useMotion from './../hooks/useMotion';
import { animated, useSpring } from 'react-spring/hooks';
import { componentPropType } from './../utils/propTypes';

function Collapse(props) {
	const {
		appear,
		as,
		children,
		className,
		collapseTo,
		duration: { enter, exit },
		ease,
		onEnd,
		onStart,
		onEntering,
		onExiting,
		show,
		style = {},
		...passThru
	} = props;
	const ref = useRef(null);
	const [expandTo, setExpandTo] = useState('auto');
	const [easing, duration] = useMotion(ease, enter, exit, show);
	const transition = useSpring({
		native: true,
		config: { duration, easing },
		to: {
			overflow: 'hidden',
			height: (appear && !ref.current) || !show ? collapseTo : expandTo,
		},
		onStart: () => onStart && onStart(),
		onFrame: val =>
			show ? onEntering && onEntering(val) : onExiting && onExiting(val),
		onRest: () => onEnd && onEnd(),
	});
	const Component = animated(as);

	useEffect(
		() => {
			setExpandTo(() => ref.current.scrollHeight);
		},
		[expandTo, show],
	);

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

Collapse.displayName = 'Collapse';

Collapse.propTypes = {
	// If a child component shown on mount should be transitioned in.
	appear: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	// The height the animated container should be when collapsed.
	collapseTo: PropTypes.number,
	duration: PropTypes.shape({
		// The duration type the animation should use to transition in.
		enter: PropTypes.string,
		// The duration type the animation should use to transition out.
		exit: PropTypes.string,
	}),
	// The easing type the animation should use.
	ease: PropTypes.string,
	// Callback that is triggered at the end of the animation.
	onEnd: PropTypes.func,
	// Callback that is triggered at the start of the animation.
	onStart: PropTypes.func,
	// Callback that is triggered while the animation is entering.
	onEntering: PropTypes.func,
	// Callback that is triggered while the animation is exiting.
	onExiting: PropTypes.func,
	// Inline styles to apply to the animated wrapper.
	style: PropTypes.object,
	...componentPropType,
};

Collapse.defaultProps = {
	appear: false,
	as: 'div',
	collapseTo: 0,
	duration: {
		enter: 'entering',
		exit: 'leaving',
	},
	ease: 'inOut',
};

export default Collapse;
