import { useCallback, useEffect, useState } from 'react';
import { aliases, breakpoints as bps } from './../theme/createResponsive';
import { capitalize } from './../utils/helpers';

function getInitialMq(lists) {
	return lists.reduce((acc, list, idx) => {
		if (list.matches) {
			return aliases[idx];
		} else {
			return acc;
		}
	}, null);
}

function getInitialMqs(lists) {
	const mq = getInitialMq(lists);
	const mqIdx = aliases.indexOf(mq);
	return aliases.reduce(
		(acc, alias, idx) => ({
			...acc,
			[`is${capitalize(alias)}`]: idx <= mqIdx,
		}),
		{ mq },
	);
}

function getMq(bp, max = false) {
	return `(${max ? 'max' : 'min'}-width: ${bp}px)`;
}

const useMedia = () => {
	const mqLists = [0, ...bps].map(bp => window.matchMedia(getMq(bp)));
	const [mq, setMq] = useState(getInitialMqs(mqLists));

	const handleResize = useCallback(
		idx => e => {
			let next = { [`is${capitalize(aliases[idx])}`]: e.matches };

			if (e.matches) {
				next.mq = aliases[idx];
			}

			setMq(state => ({ ...state, ...next }));
		},
		[mq],
	);

	useEffect(() => {
		const listenerFns = mqLists.map((l, i) => {
			const listener = handleResize(i);
			l.addListener(listener);
			return listener;
		});

		return () => {
			listenerFns.forEach((fn, i) => mqLists[i].removeListener(fn));
		};
	}, []);

	return mq;
};

export default useMedia;
