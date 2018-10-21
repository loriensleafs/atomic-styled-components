import merge from './pureRecursiveMerge';
import { isArray, isNil, isObject } from './helpers';

function pureRecursiveCloneArray(arr) {
	return [ ...arr ].reduce(
		(next, item, idx) =>
			!isNil(item)
				? [
						...next,
						...(isArray(item)
							? pureRecursiveCloneArray(item)
							: [ isObject(item) ? merge(item) : item ]),
					]
				: next,
		[],
	);
}

export default pureRecursiveCloneArray;
