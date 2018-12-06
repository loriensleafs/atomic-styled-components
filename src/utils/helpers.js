export const capitalize = string =>
	typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : string;

export const clamp = (val, min, max) => Math.min(Math.max(min, val), max);

export const num = n => typeof n === 'number' && !isNaN(n);

export const px = n => (num(n) ? n + 'px' : n);

export const isNil = n => n === null || typeof n === 'undefined';

export const isFunc = n => typeof n === 'function';

export const isArray = n => Array.isArray(n);

export const isString = n => typeof n === 'string';

export const isNum = n => !isNaN(parseFloat(n));

export const isObject = n => !isNil(n) && !isArray(n) && typeof n === 'object';

export const arr = n => (isArray(n) ? n : [n]);

export const formatMs = milliseconds => `${Math.round(milliseconds)}ms`;
