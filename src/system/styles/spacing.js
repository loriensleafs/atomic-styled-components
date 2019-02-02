import merge from '../../utils/merge';
import { theme } from '../../theme';
import {
	getKeys,
	is,
	isArr,
	isNeg,
	isNum,
	isPartial,
	toPx,
} from '../../utils/helpers';
import { responsivePropType } from '../../utils/propTypes';

const cloneFunc = fn => (...args) => fn(...args);
const REG = /^[mp][trblxy]?$/;
const PROPERTIES = {
	m: 'margin',
	p: 'padding',
};
const DIRECTIONS = {
	t: 'Top',
	r: 'Right',
	b: 'Bottom',
	l: 'Left',
	x: ['Left', 'Right'],
	y: ['Top', 'Bottom'],
};

const getProperties = key => {
	const [a, b] = key.split('');
	const property = PROPERTIES[a];
	const direction = DIRECTIONS[b] || '';
	return isArr(direction)
		? direction.map(dir => property + dir)
		: [property + direction];
};

const getValue = scale => n => {
	if (!isNum(n)) return toPx(scale[n] || n);
	const abs = Math.abs(Math.floor(n));
	const neg = isNeg(n);
	const partial = isPartial(n);
	const baseValue = scale[abs] || abs;
	const value = partial ? baseValue + baseValue * 0.5 : baseValue;
	if (!isNum(value)) return neg ? '-' + value : value;
	return toPx(value * (neg ? -1 : 1));
};

const getSpacing = props => {
	const keys = getKeys(props)
		.filter(key => REG.test(key))
		.sort();
	const breakpoints = [null, ...theme.mediaQueries];
	const scale = theme.spacing;
	const getStyle = getValue(scale);

	return keys
		.map(key => {
			const value = props[key];
			const properties = getProperties(key);
			const style = n =>
				is(n)
					? properties.reduce(
							(a, prop) => ({ ...a, [prop]: getStyle(n) }),
							{},
					  )
					: null;

			if (!isArr(value)) return style(value);

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

getSpacing.propTypes = {
	m: responsivePropType,
	mt: responsivePropType,
	mr: responsivePropType,
	mb: responsivePropType,
	ml: responsivePropType,
	mx: responsivePropType,
	my: responsivePropType,
	p: responsivePropType,
	pt: responsivePropType,
	pr: responsivePropType,
	pb: responsivePropType,
	pl: responsivePropType,
	px: responsivePropType,
	py: responsivePropType,
};

export default getSpacing;
