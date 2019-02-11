import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from '../system/className';
import { useMounted, useMotion, useSize } from '../hooks';
import { animated, useSpring } from 'react-spring';
import { componentPropType } from '../utils/propTypes';

const baseStyles = { overflow: 'hidden' };

const Collapse = forwardRef((props, ref) => {
	ref = ref ? ref : useRef(null);
	const {
		appear,
		as,
		children,
		className,
		collapseTo,
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
	const classes = useMemo(() => cn(className, baseStyles), [className]);
	const mounted = useMounted();
	const { scrollHeight } = useSize(ref, 'scrollHeight');
	const [height, setHeight] = useState(show ? 'auto' : collapseTo);
	const [easing, duration] = useMotion(ease, enter, exit, show);
	const transition = useSpring({
		config: { duration, easing },
		immediate: !appear && !mounted,
		height,
		onStart: () => {
			if (show && onEnter) onEnter();
			if (!show && onExit) onExit();
		},
		onFrame: val => {
			if (show && onEntering) onEntering(val);
			if (!show && onExiting) onExiting(val);
		},
		onRest: () => {
			if (show && onEntered) onEntered();
			if (!show && onExited) onExited();
		},
	});
	const Component = animated(as);

	useEffect(
		() =>
			setHeight(
				show
					? height === 'auto'
						? scrollHeight + 1
						: scrollHeight
					: collapseTo,
			),
		[scrollHeight, show],
	);

	return (
		<Component
			children={children}
			className={classes}
			ref={ref}
			style={{ ...style, ...transition }}
			{...passThru}
		/>
	);
});

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
	// Inline styles to apply to the animated wrapper.
	style: PropTypes.object,
	...componentPropType,
};

Collapse.defaultProps = {
	appear: false,
	as: 'div',
	collapseTo: 0,
	duration: {
		enter: 'standard',
		exit: 'standard',
	},
	ease: 'inOut',
};

export default Collapse;
