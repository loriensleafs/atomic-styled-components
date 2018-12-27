import { useCallback, useEffect, useMemo, useRef, useReducer } from 'react';
import debounce from 'debounce';

const GUTTER = 24;

function getAxis(direction) {
	return direction === 'left' || direction === 'right' ? 'X' : 'Y';
}

function slideOutReducer(
	state = {},
	{ direction, left = 0, top = 0, width = 0, height = 0 },
) {
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
	const slideIn = useMemo(() => `translate${getAxis(direction)}(0px)`, [
		direction,
	]);
	const [slideOut, dispatch] = useReducer(slideOutReducer);
	const handleResize = useCallback(
		debounce(
			() =>
				getAxis(direction) === 'X' &&
				dispatch({
					...ref.current.getBoundingClientRect().toJSON(),
					direction,
				}),
			166,
		),
		[],
	);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(
		() =>
			dispatch({
				...ref.current.getBoundingClientRect().toJSON(),
				direction,
			}),
		[direction],
	);

	return [slideIn, slideOut, ref];
}
