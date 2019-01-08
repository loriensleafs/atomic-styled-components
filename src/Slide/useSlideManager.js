import { useCallback, useMemo, useRef, useReducer } from 'react';
import { useDidMount } from './../hooks';
import throttle from './../utils/throttle';

function getSlideIn(direction) {
	const isX = direction === 'left' || direction === 'right';
	return `translate${isX ? 'X' : 'Y'}(0px)`;
}

function slideOutStyle(state, { direction, ref }) {
	const {
		top,
		right,
		bottom,
		left,
		width,
		height,
	} = ref.current.getBoundingClientRect();

	switch (direction) {
		case 'left':
			return `translateX(${Math.abs(left) + width}px)`;

		case 'right':
			return `translateX(-${Math.abs(right) + width}px)`;

		case 'up':
			return `translateY(${Math.abs(bottom) + height}px)`;

		case 'down':
			return `translateY(-${Math.abs(top) + height}px)`;

		default:
			return state;
	}
}

export default function useSlideManager(direction, appear, ref) {
	ref = ref ? ref : useRef(null);
	const slideIn = useMemo(() => getSlideIn(direction), [direction]);
	const [slideOut, dispatch] = useReducer(
		slideOutStyle,
		appear ? undefined : slideIn,
	);

	const handleResize = useCallback(
		throttle(() => dispatch({ ref, direction })),
		[],
	);

	useDidMount(() => {
		dispatch({ ref, direction });
		window.addEventListener('resize', handleResize, false);
		return () => window.removeEventListener('resize', handleResize, false);
	});

	return [slideIn, slideOut, ref];
}
