import merge from './merge';
import { isArr, isNil, isObj } from './helpers';

function pureRecursiveCloneArray(arr) {
	return [...arr].reduce(
		(next, item, idx) =>
			!isNil(item)
				? [
						...next,
						...(isArr(item)
							? pureRecursiveCloneArray(item)
							: [isObj(item) ? merge(item) : item]),
				  ]
				: next,
		[],
	);
}

export default pureRecursiveCloneArray;
