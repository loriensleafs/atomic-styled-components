import { useContext, useMemo } from 'react';
import ThemeContext from './../theme/ThemeContext';

export default function useTransition(ease, enter, exit, state) {
	const { duration: dur, getEasingFn } = useContext(ThemeContext).theme;
	const easing = useMemo(() => getEasingFn(ease), [ease]);
	const duration = useMemo(
		() =>
			enter && exit && state
				? dur[state === 'in' ? enter : exit]
				: dur[enter],
		[enter, exit, state],
	);

	return [easing, duration];
}
