import { useCallback, useEffect, useMemo, useState } from 'react';
import { aliases, breakpoints } from '../theme/createResponsive';

const getBps = bps => [0, ...bps].map(bp => `(min-width: ${bp}px)`);

const getQuery = (queries, query) => {
	const alias = aliases[queries.indexOf(query.media)];
	const next = { [alias]: query.matches };
	if (query.matches) next.active = alias;
	return next;
};

const initialState = queries =>
	queries.reduce(
		(acc, q) => ({ ...acc, ...getQuery(queries, matchMedia(q)) }),
		{},
	);

const useMedia = (bps = breakpoints) => {
	const queries = useMemo(() => getBps(bps), [bps]);
	const [media, setMedia] = useState(initialState(queries));

	const handleChange = useCallback(
		list =>
			setMedia(state => ({
				...state,
				...getQuery(queries, list),
			})),
		[queries],
	);

	useEffect(() => {
		let lists = queries.map(q => matchMedia(q));
		lists.forEach(l => l.addListener(handleChange));
		return () => lists.forEach(l => l.removeListener(handleChange));
	}, [queries]);

	return media;
};

export default useMedia;
