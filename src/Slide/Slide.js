import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useSlideManager from './useSlideManager';
import { useIsMounted, useMotion, usePrevious } from './../hooks';
import { animated, useSpring } from 'react-spring/hooks';
import { componentPropType } from './../utils/propTypes';

const Slide = forwardRef((props, ref) => {
	const {
		appear,
		as,
		children,
		className,
		direction,
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
	const [isMeasured, setIsMeasured] = useState(false);
	const [slideIn, slideOut, _ref] = useSlideManager(direction, ref);
	const [easing, duration] = useMotion(ease, enter, exit, show);
	const isMounted = useIsMounted();
	const Component = animated(as);
	const transition = useSpring({
		native: true,
		config: { duration, easing },
		immediate: !isMounted,
		to: {
			transform:
				(appear && isMounted && isMeasured && show) ||
				(!appear && isMounted && show)
					? slideIn
					: slideOut,
			visibility:
				(appear && isMounted && isMeasured) || !appear
					? 'visible'
					: 'hidden',
		},
		onStart: () => onStart && onStart(),
		onFrame: val =>
			show ? onEntering && onEntering(val) : onExiting && onExiting(val),
		onRest: () => onEnd && onEnd(),
	});

	useEffect(
		() => {
			if (isMounted && !isMeasured) {
				setIsMeasured(() => true);
			}
		},
		[isMeasured, isMounted],
	);

	return (
		<Component
			className={className}
			ref={_ref}
			style={{ ...style, ...transition }}
			{...passThru}
		>
			{children}
		</Component>
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
