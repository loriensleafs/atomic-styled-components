import { useEffect, useRef } from 'react';

/**
 * Stores a value and passes it back to the component on each render.
 * Useful for storing a prop so on the next update the new prop value
 * can be compared to the previous one stored in the ref.
 * @param {*} value The value to store.
 * @returns {*} The stored value.
 */
function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export default usePrevious;
