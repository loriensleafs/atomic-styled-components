import { useContext, useMemo } from 'react';
import FormControlContext from './FormControlContext';

export default function useFormControl(props, states) {
	const formControl = useContext(FormControlContext);
	const formControlEnabled = typeof formControl !== 'undefined';
	const mergedProps = useMemo(
		() =>
			states.reduce(
				(acc, state) => {
					acc[state] = props[state];

					if (
						formControlEnabled &&
						typeof props[state] === 'undefined'
					) {
						acc[state] = formControl[state];
					}
					return acc;
				},
				{ enabled: formControlEnabled },
			),
		[formControl, props],
	);
	return mergedProps;
}
