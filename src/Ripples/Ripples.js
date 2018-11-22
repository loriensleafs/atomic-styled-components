import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { animated, Transition } from 'react-spring';
import useDidUpdate from './../hooks/useDidUpdate';
import cn from './../theme/className';
import merge from './../utils/pureRecursiveMerge';
import { isFunc } from './../utils/helpers';

export const getStyles = props =>
	merge(
		{
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
		},
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);

function Ripples(props) {
	const [ripples, setRipples] = useState(props.ripples);
	const { rippleStyles, rippleSurfaceStyles } = useMemo(() => getStyles(props), [props.styles]);
	const rippleClassName = useMemo(() => cn(rippleStyles), [props.styles]);
	const rippleSurfaceClassName = useMemo(() => cn(rippleSurfaceStyles), [props.styles]);

	function handleRest(item) {
		if (item.pulsate) {
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

Ripples.propTypes = {
	ripples: PropTypes.object,
};

export default Ripples;
