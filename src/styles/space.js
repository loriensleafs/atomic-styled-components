import PropTypes from 'prop-types';
import merge from './../utils/pureRecursiveMerge';
import { px, num } from './../utils/helpers';

const createMediaQuery = n => `@media screen and (min-width: ${px(n)})`;
const get = (obj, ...paths) =>
	paths
		.join('.')
		.split('.')
		.reduce((a, b) => (a && a[b] ? a[b] : null), obj);
export const cloneFunc = fn => (...args) => fn(...args);
const defaultBreakpoints = [40, 52, 64].map(n => n + 'em');
const is = n => n !== undefined && n !== null;
const isNegative = n => n < 0;
const isPartial = n => n % 1 == 0.5;
const REG = /^[mp][trblxy]?$/;
const properties = {
	m: 'margin',
	p: 'padding',
};
const directions = {
	t: 'Top',
	r: 'Right',
	b: 'Bottom',
	l: 'Left',
	x: ['Left', 'Right'],
	y: ['Top', 'Bottom'],
};

const getProperties = key => {
	const [a, b] = key.split('');
	const property = properties[a];
	const direction = directions[b] || '';
	return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction];
};

const getValue = scale => n => {
	if (!num(n)) {
		return px(scale[n] || n);
	}
	const abs = Math.abs(Math.floor(n));
	const neg = isNegative(n);
	const partial = isPartial(n);
	const baseValue = scale[abs] || abs;
	const value = partial ? baseValue + baseValue * 0.5 : baseValue;
	if (!num(value)) {
		return neg ? '-' + value : value;
	}
	return px(value * (neg ? -1 : 1));
};

const defaultScale = [4, 8, 16, 32, 64, 128, 256, 512];

export const space = props => {
	const keys = Object.keys(props)
		.filter(key => REG.test(key))
		.sort();
	const scale = get(props.theme, 'space') || defaultScale;
	const getStyle = getValue(scale);

	return keys
		.map(key => {
			const value = props[key];
			const properties = getProperties(key);

			const style = n =>
				is(n)
					? properties.reduce(
							(a, prop) => ({
								...a,
								[prop]: getStyle(n),
							}),
							{},
					  )
					: null;

			if (!Array.isArray(value)) {
				return style(value);
			}

			const breakpoints = [
				null,
				...(get(props.theme, 'breakpoints') || defaultBreakpoints).map(createMediaQuery),
			];

			let styles = {};

			for (let i = 0; i < value.length; i++) {
				const media = breakpoints[i];
				if (!media) {
					styles = style(value[i]) || {};
					continue;
				}
				const rule = style(value[i]);
				if (!rule) continue;
				styles[media] = rule;
			}

			return styles;
		})
		.reduce(merge, {});
};

const responsivePropType = PropTypes.oneOfType([
	PropTypes.number,
	PropTypes.string,
	PropTypes.array,
]);

space.propTypes = {
	m: cloneFunc(responsivePropType),
	mt: cloneFunc(responsivePropType),
	mr: cloneFunc(responsivePropType),
	mb: cloneFunc(responsivePropType),
	ml: cloneFunc(responsivePropType),
	mx: cloneFunc(responsivePropType),
	my: cloneFunc(responsivePropType),
	p: cloneFunc(responsivePropType),
	pt: cloneFunc(responsivePropType),
	pr: cloneFunc(responsivePropType),
	pb: cloneFunc(responsivePropType),
	pl: cloneFunc(responsivePropType),
	px: cloneFunc(responsivePropType),
	py: cloneFunc(responsivePropType),
};
