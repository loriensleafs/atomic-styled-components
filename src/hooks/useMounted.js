import { useEffect, useRef } from 'react';

/**
 * Stores the 'mounted' state of a ref.
 */
export default function useMounted() {
	const mounted = useRef(false);
	useEffect(() => (mounted.current = true), () => (mounted.current = false), []);
	return mounted.current;
}
