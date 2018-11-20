import React, { forwardRef, useState, useContext, useRef, useCallback, useMemo } from 'react';
import keycode from 'keycode';
import { useSpring, animated, Transition, config } from 'react-spring';
import ThemeContext from './../theme/ThemeContext';
import useDidMount from './../hooks/useDidMount';
import useDidUpdate from './../hooks/useDidUpdate';
import useWillUnmount from './../hooks/useWillUnmount';
import usePrevious from './../hooks/usePrevious';
import cn from './../theme/className';
import merge from './../utils/pureRecursiveMerge';
import { isFunc, isNil } from './../utils/helpers';

function getRippleRect(
	pulsate = false,
	center = false,
	{ clientX, clientY, touches, currentTarget: ref },
) {
	const centered = center || (clientX === 0 && clientY === 0) || (!clientX && !touches);
	const touch = isNil(touches);
	const rect = ref ? ref.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };
	const x = clientX ? clientX : touches[0].x;
	const y = clientX ? clientY : touches[0].y;
	let rippleX;
	let rippleY;
	let rippleSize;

	if (centered || (x === 0 && y === 0) || (!x && !touch)) {
		rippleX = Math.round(rect.width / 2);
		rippleY = Math.round(rect.height / 2);
	} else {
		rippleX = Math.round(x - rect.left);
		rippleY = Math.round(y - rect.top);
	}

	if (centered) {
		rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
		if (rippleSize % 2 === 0) rippleSize += 1;
	} else {
		const sizeX = Math.max(Math.abs((ref ? ref.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
		const sizeY = Math.max(Math.abs((ref ? ref.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
		rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
	}

	return {
		height: rippleSize + 'px',
		width: rippleSize + 'px',
		top: -(rippleSize / 2) + rippleY + 'px',
		left: -(rippleSize / 2) + rippleX + 'px',
	};
}

export function useRipples() {
	const [ripples, setRipples] = useState([]);

	const rippleStartHandler = (pulsate, center, cb) => event => {
		console.log('startRippleHandler');

		if (cb) cb(event);

		if (event.defaultPrevented) return;

		const ripple = {
			...getRippleRect(pulsate, center, event),
			...{ key: ripples.length === 0 ? 1 : ripples.length },
		};

		setRipples(() => [...ripples, ripple]);
	};

	const rippleEndHandler = cb => event => {
		console.log('handleRippleEnd');
		if (cb) cb(event);

		if (event.defaultPrevented) return;

		setRipples(() => ripples.slice(1));
	};

	return [ripples, rippleStartHandler, rippleEndHandler];
}

function getStyles(props) {
	return merge(
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
}

export default function Ripples(props) {
	const { rippleStyles, rippleSurfaceStyles } = useMemo(() => getStyles(props), [props.styles]);
	const rippleClassName = useMemo(() => cn(rippleStyles), [props.styles]);
	const rippleSurfaceClassName = useMemo(() => cn(rippleSurfaceStyles), [props.styles]);

	return (
		<div className={rippleClassName}>
			<Transition
				native
				items={props.ripples}
				from={({ key, ...style }) => ({
					...style,
					...{ opacity: 0, transform: 'scale(0)' },
				})}
				enter={{ opacity: 0.3, transform: 'scale(1)' }}
				leave={{ opacity: 0, transform: 'scale(1)' }}>
				{item => props => {
					return <animated.div style={props} className={rippleSurfaceClassName} />;
				}}
			</Transition>
		</div>
	);
}
