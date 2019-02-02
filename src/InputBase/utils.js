export function hasValue(value) {
	return value != null && !(Array.isArray(value) && value.length === 0);
}

export function isFilled(obj) {
	return obj && (hasValue(obj.value) && obj.value !== '');
}

export function isAdornedStart(obj) {
	return obj.startAdornment;
}
