import { useContext, useMemo } from 'react';
import ThemeContext from './../theme/ThemeContext';

export default function useMotion(ease, enter, exit, state) {
	const { theme: t } = useContext(ThemeContext);
	const easing = useMemo(() => t.getEasing(ease), [ease]);
	const duration = useMemo(
		() =>
			enter && exit && state
				? t.duration[state === 'in' ? enter : exit]
				: t.duration[enter],
		[enter, exit, state],
	);

	return [easing, duration];
}
