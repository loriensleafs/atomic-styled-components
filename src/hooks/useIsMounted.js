import { useEffect, useRef } from 'react';

/**
 * Stores the 'mounted' state of a ref.
 */
function useIsMounted(ref) {
	const mounted = useRef(false);

	useEffect(() => {
		if (typeof ref === 'undefined' || ref.current) {
			mounted.current = true;
		}
		return () => (mounted.current = false);
	}, [ref]);

	return mounted.current;
}

export default useIsMounted;
