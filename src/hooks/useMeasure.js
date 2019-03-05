import { useEffect, useMemo, useReducer, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const reducer = (state, rect) => (rect ? rect : state);

export default function useMeasure(refProp) {
	const ref = refProp ? refProp : useRef();
	const [rect, dispatch] = useReducer(reducer, {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	});
	const observer = useMemo(
		() =>
			new ResizeObserver(([entry]) =>
				dispatch(entry.contentRect.toJSON()),
			),
		[],
	);

	useEffect(() => {
		if (ref.current) {
			observer.observe(ref.current);
			dispatch(ref.current.getBoundingClientRect().toJSON());
			return () => observer.disconnect;
		}
	}, []);

	return [rect, ref];
}
