import { useEffect, useRef } from 'react';

/**
 * Triggers the function when the component is updated.
 * @param {function} cb Callback to run after the render is committed to the
 * screen.
 * @param {array} conditions The callback will only run after a render if one
 * or more of the values in the conditions array changes.
 * @param {function} hook [useEffect] By default the 'useEffect' hook is used,
 * but it can be replaced by the 'useLayoutEffect' or 'useMutationEffect' hook.
 * @return {function}
 */
export default function useDidUpdate(cb, conditions = [], hook = useEffect) {
	const didMount = useRef(false);
	hook(() => {
		if (!didMount.current) {
			didMount.current = true;
			return;
		}

		return cb && cb(); //eslint-disable-line
	}, conditions);
}
