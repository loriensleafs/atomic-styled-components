import ResizeObserver from 'resize-observer-polyfill';
import { useCallback, useEffect, useRef } from 'react';
import { toArr } from './../utils/helpers';

const SIZE_PROPS = [
	'bottom',
	'clientWidth',
	'height',
	'left',
	'right',
	'scrollHeight',
	'scrollLeft',
	'scrollWidth',
	'top',
	'width',
];

function getSize(ref) {
	const size = {
		...ref.getBoundingClientRect().toJSON(),
		clientWidth: ref.clientWidth,
		scrollLeft: ref.scrollLeft,
		scrollHeight: ref.scrollHeight,
		scrollWidth: ref.scrollWidth,
	};

	return SIZE_PROPS.reduce(
		(acc, prop) => ({ ...acc, [prop]: size[prop] }),
		{},
	);
}

export default function useSize(ref, watch = SIZE_PROPS) {
	const size = useRef({});

	const handleResize = useCallback(
		() => {
			if (ref.current) {
				const { current } = size;
				const next = getSize(ref.current);

				if (!toArr(watch).every(prop => current[prop] === next[prop])) {
					size.current = next;
				}
			}
		},
		[ref],
	);

	useEffect(
		() => {
			handleResize();
			let observer = new ResizeObserver(() => handleResize());
			observer.observe(ref.current);

			return () => {
				observer.disconnect(ref.current);
				observer = null;
			};
		},
		[ref.current],
	);

	return size.current;
}
