import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

function Fade(props) {
	const { children, in: inProp, onEnd, onStart, ...passThru } = props;
	const handleStart = useCallback(() => onStart && onStart(), []);
	const handleEnd = useCallback(() => onEnd && onEnd(), []);
	const [transition] = useSpring({
		opacity: inProp ? 1 : 0,
		from: {
			opacity: inProp ? 0 : 1,
		},
		onStart: handleStart,
		onRest: handleEnd,
	});

	return (
		<animated.div style={transition} {...passThru}>
			{children}
		</animated.div>
	);
}

Fade.displayName = 'Fade';

Fade.propTypes = {
	/**
	 * A single child content element.
	 */
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	/**
	 * If `true`, the component will transition in.
	 */
	in: PropTypes.bool,
	/**
	 * Callback that is triggered at the end of the animation.
	 */
	onEnd: PropTypes.func,
	/**
	 * Callback that is triggered at the start of the animation.
	 */
	onStart: PropTypes.func,
};

export default Fade;
