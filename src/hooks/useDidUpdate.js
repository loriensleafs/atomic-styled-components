import { useEffect, useRef } from 'react';

/**
 * Triggers the function when the component is updated.
 * @param {Function} fn - Callback to run after the render is committed to the
 * screen.
 * @param {Array} conditions - fn will only run after a render if one or more of
 * the values in the conditions array changes.
 * @param {Function} hook [useEffect] - By default the 'useEffect' hook is used,
 * but it can be replaced by the 'useLayoutEffect' or 'useMutationEffect' hook.
 * @return {null|Function}
 */
export default function useDidUpdate(fn, conditions = [], hook = useEffect) {
	const didMount = useRef(false);
	hook(() => {
		if (!didMount.current) {
			didMount.current = true;
			return;
		}
		// Cleanup effect when fn returns a function.
		return fn && fn(); //eslint-disable-line
	}, conditions);
}
