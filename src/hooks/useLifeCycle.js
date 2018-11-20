import { useEffect } from 'react';

export default ({ onMount, onUnmount }) => () =>
	useEffect(() => {
		onMount && onMount();
		return () => onUnmount && onUnmount();
	}, []);
