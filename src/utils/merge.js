import isMergeable from 'is-mergeable-object';
import { getKeys, is, isArr, isObj } from './helpers';

function getEmptyOfType(val) {
	return isArr(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value) {
	return isMergeable(value) ? deepmerge(getEmptyOfType(value), value) : value;
}

function mergeArray(target, source) {
	return [...target, ...source].map(el => {
		return cloneUnlessOtherwiseSpecified(el);
	});
}

function mergeObject(target, source) {
	var destination = {};
	if (isMergeable(target)) {
		getKeys(target).forEach(key => {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key]);
		});
	}

	if (is(source)) {
		getKeys(source).forEach(key => {
			if (!isMergeable(source[key]) || !target[key]) {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key]);
			} else {
				destination[key] = deepmerge(target[key], source[key]);
			}
		});
	}
	return destination;
}

function deepmerge(target, src) {
	const srcIsArray = isArr(src);
	const srcIsObj = isObj(src);
	const targetIsArray = isArr(target);
	const targetIsObj = isObj(target);
	const srcAndTargetTypesMatch =
		srcIsArray === targetIsArray || (srcIsObj && targetIsObj);

	if (!srcAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(src);
	} else if (srcIsArray && targetIsArray) {
		return mergeArray(target, src);
	} else {
		return mergeObject(target, src);
	}
}

function merge(...args) {
	if (args.length < 2) {
		if (args.length < 2) {
			if (isObj(args[0])) return { ...args[0] };
			if (isArr(args[0])) return [...args[0]];
			return args[0];
		}
	}

	return args.reduce(
		(acc, next) => {
			if (isArr(next) && !isArr(acc)) {
				return deepmerge(acc, ...next);
			} else {
				return deepmerge(acc, next);
			}
		},
		isArr(args[0]) ? [] : {},
	);
}

export default merge;
