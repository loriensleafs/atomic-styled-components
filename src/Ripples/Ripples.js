import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { animated, Transition } from 'react-spring';
import useDidUpdate from './../hooks/useDidUpdate';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';

export const getBaseStyles = props => ({
	rippleStyles: {
		contain: 'strict',
		zIndex: 0,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'block',
		overflow: 'hidden',
		borderRadius: 'inherit',
		pointerEvents: 'none',
		backfaceVisibility: 'hidden',
		perspective: 1000,
		willChange: 'transform',
	},
	rippleSurfaceStyles: {
		position: 'absolute',
		display: 'block',
		borderRadius: '50%',
		backgroundColor: 'currentColor',
	},
});

function Ripples(props) {
	const [ripples, setRipples] = useState(props.ripples);
	const { rippleStyles, rippleSurfaceStyles } = useStyles(props, [props], [getBaseStyles]);
	const rippleClassName = useMemo(() => cn(rippleStyles), [rippleStyles]);
	const rippleSurfaceClassName = useMemo(() => cn(rippleSurfaceStyles), [rippleSurfaceStyles]);

	function handleRest(item) {
		if (item && item.pulsate) {
			setRipples(() =>
				ripples.map(
					ripple =>
						item.key === ripple.key
							? { ...ripple, ...{ pulsateIn: !item.pulsateIn } }
							: ripple,
				),
			);
		}
	}

	useDidUpdate(() => setRipples(() => props.ripples), [props.ripples]);

	return (
		<div className={rippleClassName}>
			<Transition
				native
				items={ripples}
				from={({ key, ...style }) => ({
					...style,
					...{ opacity: 0, transform: 'scale(0)' },
				})}
				enter={{ opacity: 0.3, transform: 'scale(1)' }}
				onRest={handleRest}
				update={item => item.pulsate && { transform: `scale(${item.pulsateIn ? 1 : 0.8})` }}
				leave={{ opacity: 0, transform: 'scale(1)' }}>
				{item => props => {
					return <animated.div style={props} className={rippleSurfaceClassName} />;
				}}
			</Transition>
		</div>
	);
}

Ripples.displayName = 'Ripples';

Ripples.propTypes = {
	ripples: PropTypes.array,
};

export default Ripples;
