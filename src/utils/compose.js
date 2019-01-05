import merge from './merge';

function compose(...fns) {
	const fn = props =>
		fns
			.map(fn => fn(props))
			.filter(Boolean)
			.reduce(merge, {});
	fn.propTypes = fns.map(fn => fn.propTypes).reduce(merge, {});

	return fn;
}

export default compose;
