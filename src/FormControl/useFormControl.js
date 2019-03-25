import { useContext, useMemo } from 'react';
import { getKeys, isObj } from '../utils/helpers';
import FormControlContext from './FormControlContext';

export default function useFormControl(props, states) {
	const formControl = useContext(FormControlContext);
	const formControlEnabled =
		isObj(formControl) && getKeys(formControl).length > 0;
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
				{ formControlEnabled },
			),
		[formControl, props],
	);
	return mergedProps;
}
