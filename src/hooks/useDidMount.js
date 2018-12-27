import { useEffect } from 'react';
import { isFunc } from './../utils/helpers';

/**
 * Triggers the function when the initial rendering occurs.
 * @param {function} cb Callback to run after the render is committed to the
 * screen.
 * @param {function} hook [useEffect] By default the 'useEffect' hook is used,
 * but it can be replaced by the 'useLayoutEffect' or 'useMutationEffect' hook.
 */
export default function useDidMount(cb, hook = useEffect) {
	hook(() => cb && isFunc(cb) && cb(), []);
}
