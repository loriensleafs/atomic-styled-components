import { useState, useEffect, useMemo } from './react';
import { aliases, breakpoints } from './../theme/createResponsive';
import merge from './../utils/pureRecursiveMerge';

const getBreakpoints = bps =>
	bps.map((bp, idx, arr) => {
		if (idx === 0) {
			return `(max-width: ${arr[1]}px)`;
		} else if (idx === arr.length - 1) {
			return `(min-width: ${bp}px)`;
		} else {
			return `(min-width: ${bp + 1}px) and (max-width: ${arr[idx + 1]}px)`;
		}
	});

const getListeners = mqls => mqls.map((mql, idx) => window.matchMedia(mql));

const getMediaQueries = mqs =>
	mqs.map((mq, idx) => ({ [aliases[idx]]: mqs.matches })).reduce(merge, {});

const useMedia = (bps = breakpoints) => {
	const mediaQueries = useMemo(() => getBreakpoints(bps), [bps]);
	const [state, setState] = useState({});

	useEffect(
		() => {
			let mounted = true;
			const mqls = getListeners(mediaQueries);
			const onChange = () => mounted && setState(getMediaQueries(mqls));
			mqls.forEach(mql => mql.addListener(onChange));
			setState(getMediaQueries(mqls));

			return () => {
				mounted = false;
				mqls.forEach(mql => mql.removeListener(onChange));
			};
		},
		[mediaQueries],
	);

	return state;
};

export default useMedia;
