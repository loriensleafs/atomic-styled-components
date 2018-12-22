import { useEffect } from 'react';

/**
 * Triggers the function when the component is unmounted.
 * @param {Function} fn - Callback to run after the component is unmounted.
 * @param {Function} hook [useEffect] - By default the 'useEffect' hook is used,
 * but it can be replaced by the 'useLayoutEffect' or 'useMutationEffect' hook.
 * @return {void}
 */
export default function useWillUnmount(fn, hook = useEffect) {
	hook(() => {
		if (fn && typeof fn === 'function') {
			fn();
		}
	}, []);
}
