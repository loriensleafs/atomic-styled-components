import React, { cloneElement, memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from '../system/className';
import { animated, useSpring } from 'react-spring';
import { useMeasure, useMotion } from './../hooks';
import { componentPropType } from './../utils/propTypes';

const getSlideIn = direction =>
	`translate${
		direction === 'left' || direction === 'right' ? 'X' : 'Y'
	}(0px)`;

const getSlideOut = (direction, rect) => {
	const { top, right, bottom, left, width, height } = rect;
	switch (direction) {
		case 'left':
			return `translateX(${Math.abs(left) + width}px)`;

		case 'right':
			return `translateX(-${Math.abs(right) + width}px)`;

		case 'up':
			return `translateY(${Math.abs(bottom) + height}px)`;

		case 'down':
			return `translateY(-${Math.abs(top) + height}px)`;
	}
};

const baseStyles = {
	willChange: 'transform',
};

const Slide = memo(props => {
	const {
		appear,
		as,
		children: childrenProp,
		className,
		disableWrapper,
		direction,
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
	const [rect, ref] = useMeasure();
	const [easing, duration] = useMotion(ease, enter, exit, show);
	const [init, setInit] = useState(false);
	const [ready, setReady] = useState(false);
	const [started, setStarted] = useState(false);
	// Only calculate the slideIn value once.
	const slideIn = useMemo(() => getSlideIn(direction), []);
	// Recalculate the slideOut value when the rect changes.
	const slideOut = useMemo(() => getSlideOut(direction, rect), [rect]);

	function onStart() {
		if (show && onEnter) onEnter();
		if (!show && onExit) onExit();
	}

	function onFrame(val) {
		if (show && onEntering) onEntering(val);
		if (!show && onExiting) onExiting(val);
	}

	function onRest() {
		if (!init) setInit(true);
		if (init && !ready) setReady(true);
		if (init && ready && !started) setStarted(true);
		if (ready && show && onEntered) onEntered();
		if (ready && !show && onExited) onExited();
	}

	const [{ transform }, setTransition] = useSpring(() => ({
		config: { duration, easing },
		immediate: true,
		transform: slideIn,
		onStart,
		onFrame,
	}));

	if (!ready) style.visibility = 'hidden';

	const Component = animated(as);
	const children = disableWrapper ? (
		cloneElement(childrenProp, {
			...childrenProp.props,
			className: classes,
			ref,
		})
	) : (
		<animated.div className={classes} ref={ref}>
			{childrenProp}
		</animated.div>
	);

	useEffect(() => {
		if (ready && !started) {
			ref.current.style.visibility = 'visible';
		}
		setTransition({
			immediate: !ready,
			transform: (!ready && appear && show) || !show ? slideOut : slideIn,
			onRest,
			onStart,
			onFrame,
		});
	}, [init, ready, started, show]);

	return (
		<Component
			className={className}
			style={{ ...style, willChange: 'transform', transform }}
			{...passThru}
		>
			{children}
		</Component>
	);
});

Slide.displayName = 'Slide';

Slide.propTypes = {
	// If the child component shown on mount should be transitioned in.
	appear: PropTypes.bool,
	// The component(s) that will be transitioned in/out.
	children: PropTypes.node,
	className: PropTypes.string,
	// The direction the children component(s) enter/exit from.
	direction: PropTypes.oneOf(['down', 'right', 'up', 'left']),
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

Slide.defaultProps = {
	appear: false,
	as: 'div',
	direction: 'down',
	disableWrapper: false,
	duration: {
		enter: 'entering',
		exit: 'leaving',
	},
	ease: 'inOut',
};

export default Slide;
