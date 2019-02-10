import { useContext } from 'react';
import FormControlContext from './FormControlContext';
import { getKeys, isNil } from '../utils/helpers';

function useFormControlManager(props, states) {
	const context = useContext(FormControlContext);
	const mergedProps = useMemo(
		() =>
			states.reduce(
				(acc, state) => {
					if (context && isNil(props[state])) {
						acc[state] = context[state];
					} else {
						acc[state] = props[state];
					}

					return acc;
				},
				{ formControlDecendant: getKeys(context).length > 0 },
			),
		[context, props, states],
	);

	return mergedProps;
}

export default useFormControlManager;
