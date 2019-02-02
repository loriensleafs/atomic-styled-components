import { useContext } from 'react';
import FormControlContext from './FormControlContext';

export default function useFormControlContext(props, states) {
	const context = useContext(FormControlContext);
	const mergedProps = useMemo(
		() =>
			states.reduce((acc, state) => {
				if (context && isNil(props[state])) {
					acc[state] = context[state];
				} else {
					acc[state] = props[state];
				}

				return acc;
			}, {}),
		[context, props, states],
	);

	return [mergedProps, context];
}
