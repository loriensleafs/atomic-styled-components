import { useCallback, useState, useRef } from 'react';
import useDidUpdate from './useDidUpdate';
import useDidMount from './useDidMount';
import useWillUnmount from './useWillUnmount';
import ResizeObserver from 'resize-observer-polyfill';
import { isArr } from './../utils/helpers';

/**
 * Determines when a ref is being resized.
 * @returns {array} The ref that is being observed.  The rect of the
 * observered ref.
 */
export default function useResize() {
	const ref = useRef();
	const observer = useRef(false);
	const [rect, setRect] = useState(false);

	const handleResize = useCallback(entries => {
		if (!isArr(entries) || entries.length < 1 || !ref.current) return;

		const { clientWidth, scrollLeft, scrollWidth } = entries[0].target;
		const rect = entries[0].target.getBoundingClientRect();

		setRect(() => ({ ...rect, clientWidth, scrollLeft, scrollWidth }));
	}, []);

	useDidMount(() => {
		observer.current = new ResizeObserver(handleResize);
	});

	useDidUpdate(
		() => {
			if (ref.current) {
				observer.current.observe(ref.current);
			}
		},
		[ref.current],
	);

	useWillUnmount(() => observer.current && observer.current.disconnect());

	return [ref, rect];
}
