import { useContext, useMemo } from 'react';
import ThemeContext from '../theme/ThemeContext';

function useMotion(easing = 'inOut', enter = 'standard', exit, state = 'show') {
	const { durations, getEasing } = useContext(ThemeContext).theme;

	return [
		useMemo(() => getEasing(easing), [easing]),
		useMemo(
			() =>
				enter && exit && state
					? durations[state === 'show' ? enter : exit]
					: durations[enter],
			[enter, exit, state],
		),
	];
}

export default useMotion;
