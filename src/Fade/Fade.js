import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMotion from '../hooks/useMotion';
import { animated, useSpring } from 'react-spring/hooks';
import { componentPropType } from '../utils/propTypes';

const Fade = forwardRef((props, ref) => {
	const {
		appear,
		as,
		className,
		children,
		duration: { enter, exit },
		ease,
		onEnter,
		onEntering,
		onEntered,
		onExit,
		onExiting,
		onExited,
		show,
		style = {},
		...passThru
	} = props;
	const [mounted, setMounted] = useState(false);
	const [easing, duration] = useMotion(ease, enter, exit, show);
	const Component = animated(as);
	const transition = useSpring({
		native: true,
		config: { duration, easing },
		opacity: (appear && !mounted) || !show ? 0 : 1,
		onStart: () => {
			if (show && onEnter) {
				onEnter();
			}
			if (!show && onExit) {
				onExit();
			}
		},
		onFrame: val => {
			if (show && onEntering) {
				onEntering(val);
			}
			if (!show && onExiting) {
				onExiting(val);
			}
		},
		onRest: () => {
			if (show && onEntered) {
				onEntered();
			}
			if (!show && onExited) {
				onExited();
			}
		},
	});

	useEffect(() => setMounted(true), []);

	return (
		<Component
			children={children}
			className={className}
			ref={ref}
			style={{ ...style, ...transition }}
			{...passThru}
		/>
	);
});

Fade.displayName = 'Fade';

Fade.propTypes = {
	// If a child component shown on mount should be transitioned in.
	appear: PropTypes.bool,
	// The content node to be collapsed.
	children: PropTypes.node,
	className: PropTypes.string,
	duration: PropTypes.shape({
		// The duration type the animation should use to transition in.
		enter: PropTypes.string,
		// The duration type the animation should use to transition out.
		exit: PropTypes.string,
	}),
	// The easing type the animation should use.
	ease: PropTypes.string,
	// Callback that is triggered when enter animation starts.
	onEnter: PropTypes.func,
	// Callback that is triggered while the animation is entering.
	onEntering: PropTypes.func,
	// Callback that is triggered at the start of the animation.
	onEntered: PropTypes.func,
	// Callback that is trigged when exit animation starts.
	onExit: PropTypes.func,
	// Callback that is triggered while the animation is exiting.
	onExiting: PropTypes.func,
	// Callback that is triggered at the end of the animation.
	onExited: PropTypes.func,
	// If `true`, the component will transition in.
	show: PropTypes.bool,
	// Inline styles to apply to the animated wrapper.
	style: PropTypes.object,
	...componentPropType,
};

Fade.defaultProps = {
	appear: false,
	as: 'div',
	duration: {
		enter: 'entering',
		exit: 'leaving',
	},
	ease: 'inOut',
};

export default Fade;
