import cloneArray from './pureRecursiveCloneArray';
import { isObject, isArray } from './helpers';

const safeGetProperty = (object, property) =>
	property === '__proto__' ? undefined : object[property];

function pureRecursiveMerge(...args) {
	if (args.length < 1 || typeof args[0] !== 'object') return false;
	if (args.length < 2) {
		if (isObject(args[0])) return { ...args[0] };
		if (isArray(args[0])) return cloneArray(args[0]);
		return args[0];
	}

	return args.slice(1).reduce(
		(merged, obj, idx) =>
			!isObject(obj)
				? { ...merged }
				: Object.keys(obj).reduce(
						(prevMerge, key) => {
							const src = safeGetProperty(merged, key);
							const val = safeGetProperty(obj, key);

							// Value is not an object/array, overwrite don't extend
							if (typeof val !== 'object' && typeof val !== 'undefined') {
								prevMerge[key] = val;
								// Clone arrays (and recursive clone objects inside)
							} else if (Array.isArray(val)) {
								prevMerge[key] = cloneArray(val);
								// If both src and new value are objects then merge them
							} else if (isObject(src) && isObject(val)) {
								prevMerge[key] = pureRecursiveMerge(src, val);
								// Src is not an object/array or is null then extend val
							} else if (
								typeof src !== 'object' ||
								src === null ||
								Array.isArray(src)
							) {
								prevMerge[key] = pureRecursiveMerge({}, val);
							}

							return prevMerge;
						},
						{ ...merged },
					),
		isObject(args[0]) ? args[0] : {},
	);
}

export default pureRecursiveMerge;
