import { useCallback, useEffect, useMemo, useState } from 'react';
import { aliases, breakpoints } from '../theme/createResponsive';
import { capitalize } from '../utils/helpers';

const getBps = bps => [0, ...bps].map(bp => `(min-width: ${bp}px)`);

const getMq = (mqs, { media, matches }) => {
	const alias = aliases[mqs.indexOf(media)];
	const next = { [`is${capitalize(alias)}`]: matches };

	if (matches) {
		next.mq = alias;
	}

	return next;
};

const getInitState = mqs =>
	mqs.reduce((a, mq) => ({ ...a, ...getMq(mqs, matchMedia(mq)) }), {});

const useMedia = (bps = breakpoints) => {
	const mqs = useMemo(() => getBps(bps), [bps]);
	const [media, setMedia] = useState(getInitState(mqs));

	const handleChange = useCallback(
		list => setMedia(state => ({ ...state, ...getMq(mqs, list) })),
		[mqs],
	);

	useEffect(() => {
		let lists = mqs.map(mq => matchMedia(mq));
		lists.forEach(l => l.addListener(handleChange));
		return () => lists.forEach(l => l.removeListener(handleChange));
	}, [mqs]);

	return media;
};

export default useMedia;
