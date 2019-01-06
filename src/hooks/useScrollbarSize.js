import { useCallback, useEffect, useState } from 'react';
import throttle from './../utils/throttle';

/**
 * Measures the height and width values of the browser scrollbars.
 * @param {Element} ref The element to use when measuring the scrollbars.
 * @returns {object} An object containing both the height and width values of
 * the scrollbar.
 */
export default function useScrollbarSize(ref = { current: window }) {
	const [{ height, width }, setSize] = useState({
		height: null,
		width: null,
	});

	const handleResize = useCallback(
		throttle(event => {
			if (ref.current) {
				setSize(() => ({
					height: (ref.current.offsetHeight =
						ref.current.clientHeight),
					width: (ref.current.offsetWidth = ref.current.clientWidth),
				}));
			}
		}),
		[],
	);

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize, false);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return [height, width];
}
