import { useEffect, useRef } from 'react';

/**
 * Stores a value and passes it back to the component on each render.
 * Useful for storing a prop so on the next update the new prop value
 * can be compared to the previous one stored in the ref.
 * @param {*} value
 * @return {*} the value stored.
 */
export default function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
		return;
	});
	return ref.current;
}
