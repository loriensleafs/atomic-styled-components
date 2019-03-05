import { useContext, useMemo } from 'react';
import ThemeContext from '../theme/ThemeContext';

function useMotion(easing = 'inOut', enter = 'standard', exit, state = 'show') {
	const { durations, getEasing } = useContext(ThemeContext).theme;
	const ease = useMemo(() => getEasing(easing), [easing]);
	const duration = useMemo(
		() =>
			enter && exit && state
				? durations[state === 'show' ? enter : exit]
				: durations[enter],
		[enter, exit, state],
	);

	return [ease, duration];
}

export default useMotion;
