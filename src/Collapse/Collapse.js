import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring/hooks';

function Collapse(props) {
	const {
		children,
		collapsedHeight,
		component: Component,
		in: inProp,
		onEnd,
		onStart,
		...passThru
	} = props;
	const ref = useRef();
	const handleStart = useCallback(() => onStart && onStart(), []);
	const handleEnd = useCallback(() => onEnd && onEnd(), []);
	const [transition] = useSpring({
		height: inProp ? ref.current.clientHeight : collapsedHeight,
		from: {
			height: collapsedHeight,
		},
		onStart: handleStart,
		onRest: handleEnd,
	});

	return (
		<animated.div style={{ ...transition, overflow: 'hidden' }} {...passThru}>
			<Component ref={ref}>{children}</Component>
		</animated.div>
	);
}

Collapse.displayName = 'Collapse';

Collapse.propTypes = {
	/**
	 * The content node to be collapsed.
	 */
	children: PropTypes.node,
	/**
	 * The height of the container when collapsed.
	 */
	collapsedHeight: PropTypes.number,
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

Collapse.defaultProps = {
	collapsedHeight: 0,
	component: 'div',
};

export default Collapse;
