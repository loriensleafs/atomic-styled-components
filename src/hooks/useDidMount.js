import { useEffect } from 'react';

/**
 * Triggers the function when the initial rendering occurs.
 * @param {Function} fn - Callback to run after the render is committed to the
 * screen.
 * @param {Function} hook [useEffect] - By default the 'useEffect' hook is used,
 * but it can be replaced by the 'useLayoutEffect' or 'useMutationEffect' hook.
 * @return {void}
 */
export default function useDidMount(fn, hook = useEffect) {
	hook(() => {
		if (fn && typeof fn === 'function') {
			fn();
		}
	}, []);
}
