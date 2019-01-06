import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDidMount, useMotion } from './../hooks';
import { animated, useSpring } from 'react-spring/hooks';
import { componentPropType } from './../utils/propTypes';

function Fade(props) {
	const {
		appear,
		as,
		className,
		children,
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
	const [mounted, setMounted] = useState(false);
	const [easing, duration] = useMotion(ease, enter, exit, show);
	const transition = useSpring({
		native: true,
		config: { duration, easing },
		opacity: (appear && !mounted) || !show ? 0 : 1,
		onStart: () => onStart && onStart(),
		onFrame: val =>
			show ? onEntering && onEntering(val) : onExiting && onExiting(val),
		onRest: () => onEnd && onEnd(),
	});
	const Component = animated[as];

	useDidMount(() => setMounted(() => true));

	return (
		<Component
			chilren={children}
			className={className}
			style={{ ...style, ...transition }}
			{...passThru}
		/>
	);
}

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
	// Callback that is triggered at the end of the animation.
	onEnd: PropTypes.func,
	// Callback that is triggered at the start of the animation.
	onStart: PropTypes.func,
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
