/**
 * Validation methods.
 */
const is = n => n !== undefined && n !== null;

const isArr = n => Array.isArray(n);

const isEq = (a, b) => a === b;

const isFn = n => typeof n === 'function';

const isNeg = n => n < 0;

const isNil = n => !is(n);

const isNum = n => typeof n === 'number';

const isObj = n => !isNil(n) && !isArr(n) && typeof n === 'object';

const isPartial = n => n % 1 === 0.5;

const isStr = n => typeof n === 'string';

/**
 * Conversion Methods.
 */
const toArr = n => (isArr(n) ? n : [n]);

const toMs = milliseconds => `${Math.round(milliseconds)}ms`;

const toPx = n => (isNum(n) ? n + 'px' : n);

const toRem = n => (isNum(n) ? n + 'rem' : n);

const capitalize = str =>
	isStr(str) ? str.charAt(0).toUpperCase() + str.slice(1) : str;

const clamp = (val, min, max) => Math.min(Math.max(min, val), max);

/**
 * Getter methods.
 */
const getKeys = n => Object.keys(n);

const getPath = (obj, ...paths) =>
	paths
		.join('.')
		.split('.')
		.reduce((a, b) => (a && a[b] ? a[b] : null), obj);

const getVals = n => Object.values(n);

/**
 * Misc methods.
 */
const noop = n => n;

export {
	is,
	isArr,
	isEq,
	isFn,
	isNeg,
	isNil,
	isNum,
	isObj,
	isPartial,
	isStr,
	toArr,
	toMs,
	toPx,
	toRem,
	capitalize,
	clamp,
	getKeys,
	getPath,
	getVals,
	noop,
};
