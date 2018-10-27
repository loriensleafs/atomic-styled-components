import merge from './pureRecursiveMerge';

export default (...funcs) => {
	const fn = (props) => funcs.map((fn) => fn(props)).filter(Boolean).reduce(merge, {});

	fn.propTypes = funcs.map((fn) => fn.propTypes).reduce(merge, {});
	return fn;
};
