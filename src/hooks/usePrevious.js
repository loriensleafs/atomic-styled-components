import { useEffect, useRef } from 'react';

/**
 * function SomeComponent(props) {
 *     const previousSomeProp = usePrevious(props.someProp);
 * }
 */
export default value => {
	const ref = useRef();
	useEffect(() => (ref.current = value));
	return ref.current;
};
