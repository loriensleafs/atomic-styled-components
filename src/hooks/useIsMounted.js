import { useEffect, useRef } from 'react';

/**
 * Stores the 'mounted' state of a ref.
 */
export default function useIsMounted() {
	const mounted = useRef(false);

	useEffect(() => {
		mounted.current = true;
		return () => (mounted.current = false);
	}, []);

	return mounted.current;
}
