import { useCallback, useMemo, useRef, useReducer } from 'react';
import { useDidMount, useDidUpdate } from './../hooks';
import debounce from 'debounce';
import { capitalize } from './../utils/helpers';

const GUTTER = 24;

function getAxis(direction) {
	return direction === 'left' || direction === 'right' ? 'x' : 'y';
}

function initialState(isX) {
	const axis = isX ? 'X' : 'Y';
	const method = `inner${isX ? 'Width' : 'Height'}`;

	return `translate${axis}(-${window[method]}px)`;
}

function slideOutReducer(state = {}, { direction, ref }) {
	const { top, left, width, height } = ref.current
		? ref.current.getBoundingClientRect()
		: window.getBoundingClientRect();

	switch (direction) {
		case 'left':
			return `translateX(${window.innerWidth - left}px)`;

		case 'right':
			return `translateX(-${left + width + GUTTER}px)`;

		case 'up':
			return `translateY(${window.innerHeight - top}px)`;

		case 'down':
			return `translateY(-${top + height + GUTTER}px)`;

		default:
			return state;
	}
}

export default function useSlideManager(direction) {
	const ref = useRef(null);
	const isX = useMemo(() => getAxis(direction) === 'x', [direction]);
	const slideIn = useMemo(() => `translate${isX ? 'X' : 'Y'}(0px)`, [isX]);
	const [slideOut, dispatch] = useReducer(slideOutReducer, initialState(isX));

	const handleResize = useCallback(
		debounce(() => isX && dispatch({ ref, direction }), 166),
		[],
	);

	useDidMount(() => {
		if (isX) dispatch({ ref, direction });
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	useDidUpdate(() => dispatch({ ref, direction }), [direction, ref.current]);

	return [slideIn, slideOut, ref];
}
