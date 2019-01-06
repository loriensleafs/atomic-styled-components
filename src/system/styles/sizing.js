import style from './../style';
import combine from './../../utils/combine';
import { isNum, toPx } from './../../utils/helpers';

function transformSize(val) {
	if (!isNum(val) || val > 1) {
		return toPx(val);
	}
	return val * 100 + '%';
}

const getHeightSize = style({
	prop: 'h',
	cssProp: 'height',
	transform: transformSize,
});

const getMaxHeightSize = style({
	prop: 'hMax',
	cssProp: 'maxHeight',
	transform: transformSize,
});

const getMinHeightSize = style({
	prop: 'hMin',
	cssProp: 'minHeight',
	transform: transformSize,
});

const getHeight = combine(getHeightSize, getMaxHeightSize, getMinHeightSize);
getHeight.propTypes = {
	...getHeightSize.propTypes,
	...getMaxHeightSize.propTypes,
	...getMinHeightSize.propTypes,
};

const getWidthSize = style({
	prop: 'w',
	cssProp: 'width',
	transform: transformSize,
});

const getMaxWidthSize = style({
	prop: 'wMax',
	cssProp: 'maxWidth',
	transform: transformSize,
});

const getMinWidthSize = style({
	prop: 'wMin',
	cssProp: 'minWidth',
	transform: transformSize,
});

const getWidth = combine(getWidthSize, getMaxWidthSize, getMinWidthSize);
getWidth.propTypes = {
	...getWidthSize.propTypes,
	...getMaxWidthSize.propTypes,
	...getMinWidthSize.propTypes,
};

const getSizing = combine(getHeight, getWidth);
getSizing.propTypes = {
	...getHeight.propTypes,
	...getWidth.propTypes,
};

export {
	getHeightSize,
	getMaxHeightSize,
	getMinHeightSize,
	getHeight,
	getWidthSize,
	getMaxWidthSize,
	getMinWidthSize,
	getWidth,
};

export default getSizing;
