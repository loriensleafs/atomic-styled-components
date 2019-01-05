import merge from './../utils/merge';
import { isFn, isObj } from './../utils/helpers';

function reduce(reducers, props) {
	return reducers.reduce(
		(acc, reducer) =>
			isFn(reducer)
				? merge(acc, reducer(props))
				: isObj(reducer)
				? merge(acc, reducer)
				: acc,
		{},
	);
}

function combine(...reducers) {
	return function(arg) {
		return isFn(arg) ? arg(reducers) : reduce(reducers, arg);
	};
}

export default combine;
