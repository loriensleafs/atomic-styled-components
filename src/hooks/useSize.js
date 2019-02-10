import ResizeObserver from 'resize-observer-polyfill';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { isArr, isFn, isObj, getKeys, toArr } from '../utils/helpers';

const CLIENT = [
	'clientHeight',
	'clientWidth',
	'offsetHeight',
	'offsetTop',
	'offsetLeft',
	'offsetParent',
	'offsetWidth',
	'scrollHeight',
	'scrollLeft',
	'scrollTop',
	'scrollWidth',
];

const RECT = ['bottom', 'height', 'left', 'right', 'top', 'width'];

const contains = (src, target) => {
	target = isObj(target) ? getKeys(target) : target;
	return isArr(src) && src.some(n => target.includes(n));
};

const getRef = ref => ref.current;

const getRect = ref => ref.current.getBoundingClientRect().toJSON();

const getProps = (src, target, props) => ref => {
	const deps = src.filter(prop => target.includes(prop));
	props = isFn(props) ? props(ref) : props;
	return deps.reduce((a, p) => ({ ...a, [p]: props[p] }), {});
};

const makeReducer = props => (state, ref) => {
	const reducers = [];
	if (contains(CLIENT, props)) reducers.push(getProps(CLIENT, props, getRef));
	if (contains(RECT, props)) reducers.push(getProps(RECT, props, getRect));
	return reducers.reduce((a, r) => ({ ...a, ...r(ref) }), state);
};

function useSize(ref, watch = RECT) {
	const reducer = useMemo(() => makeReducer(toArr(watch)), []);
	const [size, dispatch] = useReducer(reducer, {});

	const handleResize = useCallback(() => dispatch(ref), [ref]);

	useEffect(() => {
		if (ref.current) {
			let observer = new ResizeObserver(handleResize);
			observer.observe(ref.current);

			dispatch(ref);

			return () => {
				observer.disconnect(ref.current);
				observer = null;
			};
		}
	}, [ref]);

	return size;
}

export default useSize;
