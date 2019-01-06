import { useEffect } from 'react';
import { isFn } from './../utils/helpers';

/**
 * Triggers the function when the component is unmounted.
 * @param {function} cb Callback to run after the component is unmounted.
 * @param {function} hook [useEffect] By default the 'useEffect' hook is used,
 * but it can be replaced by the 'useLayoutEffect' or 'useMutationEffect' hook.
 */
export default function useWillUnmount(cb, hook = useEffect) {
	hook(() => cb && isFn(cb) && cb(), []);
}
