import React, {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import { useMounted, useMotion, useSize } from './../hooks';
import { animated, useSpring } from 'react-spring';
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

const Slide = forwardRef((props, ref) => {
	ref = ref ? ref : useRef(null);
	const {
		appear,
		as,
		children,
		className,
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
	const [ready, setReady] = useState(false);
	const [easing, duration] = useMotion(ease, enter, exit, show);
	const rect = useSize(ref);
	const mounted = useMounted();
	const slideIn = getSlideIn(direction);
	const slideOut = mounted && getSlideOut(direction, rect);
	const Component = animated(as);

	const handleStart = useCallback(() => {
		if (show && onEnter) onEnter();
		if (!show && onExit) onExit();
	}, [show]);

	const handleFrame = useCallback(
		val => {
			if (show && onEntering) onEntering(val);
			if (!show && onExiting) onExiting(val);
		},
		[show],
	);

	const handleRest = useCallback(() => {
		if (show && onEntered) onEntered();
		if (!show && onExited) onExited();
	}, [show]);

	const [transition, setTransition] = useSpring(() => ({
		immediate: true,
		transform: slideIn,
		onStart: handleStart,
		onFrame: handleFrame,
		onRest: handleRest,
		config: { duration, easing },
	}));

	if (!mounted || show) {
		style.visibility = 'hidden';
	}

	useEffect(() => {
		const measured = !!slideOut;
		let onRest = handleRest;
		let immediate;
		let transform;

		if (measured && !ready) {
			immediate = true;
			onRest = () => setReady(true);
			if ((!show && !appear) || (show && appear)) transform = slideOut;
			if (!appear && show) ref.current.style.visibility = 'visible';
		} else if (ready) {
			immediate = false;
			ref.current.style.visibility = 'visible';
			if (!show) transform = slideOut;
			if (show) transform = slideIn;
		}

		if (transform) {
			setTransition({
				immediate,
				transform,
				onRest,
				onStart: handleStart,
				onFrame: handleFrame,
				config: { duration, easing },
			});
		}
	}, [ready, show, slideOut]);

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

Slide.displayName = 'Slide';

Slide.propTypes = {
	// If a child component shown on mount should be transitioned in.
	appear: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	// The direction the children component(s) enter/exit from.
	direction: PropTypes.oneOf(['down', 'right', 'up', 'left']),
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
	duration: {
		enter: 'entering',
		exit: 'leaving',
	},
	ease: 'inOut',
};

export default Slide;
