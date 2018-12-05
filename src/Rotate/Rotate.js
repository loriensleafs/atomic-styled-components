import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import usePrevious from './../hooks/usePrevious';
import { animated, useSpring } from 'react-spring';

function Rotate(props) {
	const { children, deg, onEnd, onStart, ...passThru } = props;
	const prevDeg = usePrevious(deg);
	const handleStart = useCallback(() => onStart && onStart(), []);
	const handleEnd = useCallback(() => onEnd && onEnd(), []);
	const [transition] = useSpring({
		transform: `rotate(${deg}deg)`,
		from: {
			transform: `rotate(${prevDeg || deg}deg)`,
		},
		onStart: handleStart,
		onRest: handleEnd,
	});

	return (
		<animated.div style={{ ...transition, display: 'inherit' }} {...passThru}>
			{children}
		</animated.div>
	);
}

Rotate.displayName = 'Rotate';

Rotate.propTypes = {
	/**
	 * A single child content element.
	 */
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	/**
	 * The degree to animate to.
	 */
	deg: PropTypes.number,
	/**
	 * Callback that is triggered at the end of the animation.
	 */
	onEnd: PropTypes.func,
	/**
	 * Callback that is triggered at the start of the animation.
	 */
	onStart: PropTypes.func,
};

Rotate.defaultProps = {
	component: 'div',
	deg: 0,
};

export default Rotate;
