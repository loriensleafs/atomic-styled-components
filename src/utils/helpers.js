export const capitalize = (string) =>
	typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : string;

export const num = (n) => typeof n === 'number' && !isNaN(n);

export const px = (n) => (num(n) ? n + 'px' : n);

export const merge = (a, b) =>
	Object.assign(
		{},
		a,
		b,
		Object.keys(b || {}).reduce(
			(obj, key) =>
				Object.assign(obj, {
					[key]:
						a[key] !== null && typeof a[key] === 'object'
							? merge(a[key], b[key])
							: b[key],
				}),
			{},
		),
	);
