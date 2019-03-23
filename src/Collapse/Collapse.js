import PropTypes from 'prop-types';
import React, { cloneElement, useMemo } from 'react';
import { animated, useSpring } from 'react-spring';
import { useMeasure, useMotion, usePrevious } from '../hooks';
import cn from '../system/className';
import { componentPropType } from '../utils/propTypes';

const baseStyles = {
	position: 'relative',
	overflow: 'hidden',
	willChange: 'height',
};

function Collapse(props) {
	const {
		appear,
		as,
		children: childrenProp,
		className,
		collapseTo,
		disableWrapper,
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
	const prevShow = usePrevious(show);
	const [rect, ref] = useMeasure();
	const [easing, duration] = useMotion(ease, enter, exit, show);
	const { height } = useSpring({
		config: { duration, easing },
		from: {
			height: show ? collapseTo : rect.height,
		},
		to: {
			height: show ? rect.height : collapseTo,
		},
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
	const children = disableWrapper ? (
		cloneElement(childrenProp, { ...childrenProp.props, ref })
	) : (
		<animated.div ref={ref}>{childrenProp}</animated.div>
	);

	return (
		<Component
			className={classes}
			style={{
				height: show && prevShow === show ? 'auto' : height,
			}}
			{...passThru}
		>
			{children}
		</Component>
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
	disableWrapper: PropTypes.bool,
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
	disableWrapper: false,
	duration: {
		enter: 'standard',
		exit: 'standard',
	},
	ease: 'inOut',
};

export default Collapse;
