import { useCallback, useEffect, useState, useRef } from 'react';

/**
 * Uses raf to make sure a function only runs once just before a page is
 * rendered to the screen.
 * 		- Will only run the callback when the browser/device hardware is ready
 * 		to make changes to the screen.
 * 		- Paused/slowed down when code is running inside of a background tab.
 * @param {function} cb The callback to trigger during the animationFrame.
 * @returns {function} Sets the state that will be passed to the throtted
 * callback function.
 */
export default function useThrottle(cb) {
	const af = useRef(false);
	const [event, handler] = useState(null);

	const cancel = useCallback(() => af.current && cancelAnimationFrame(af.current), []);

	useEffect(
		() => {
			cancel();
			af.current = requestAnimationFrame(() => cb(event));
			return () => af.current && cancelAnimationFrame(af.current);
		},
		[event],
	);

	return [handler, cancel];
}
