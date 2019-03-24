export const hasValue = value =>
	value != null && !(Array.isArray(value) && value.length === 0);

export const isFilled = obj => obj && (hasValue(obj.value) && obj.value !== '');

export const isAdornedStart = obj => obj.startAdornment;
