import { useCallback, useEffect, useState } from 'react';
import useThrottle from './useThrottle';

/**
 * Measures the height and width values of the browser scrollbars.
 * @param {Element} ref The element to use when measuring the scrollbars.
 * @returns {object} An object containing both the height and width values of
 * the scrollbar.
 */
export default function useScrollbarSize(ref = { current: window }) {
	const [{ height, width }, setSize] = useState({ height: null, width: null });

	const handleScrollbarSizeChange = useCallback(event => {
		if (ref.current) {
			setSize(() => ({
				height: (ref.current.offsetHeight = ref.current.clientHeight),
				width: (ref.current.offsetWidth = ref.current.clientWidth),
			}));
		}
	}, []);

	const throttledHandler = useThrottle(handleScrollbarSizeChange);

	useEffect(() => {
		handleScrollbarSizeChange();
		window.addEventListener('resize', throttledHandler);
		return () => window.removeEventListener('resize', throttledHandler);
	}, []);

	return [height, width];
}
