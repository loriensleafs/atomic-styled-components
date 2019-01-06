import style from './../style';
import combine from './../../utils/combine';
import { toPx } from './../../utils/helpers';

const getTop = style({
	prop: 'top',
	transform: toPx,
});

const getRight = style({
	prop: 'right',
	transform: toPx,
});

const getBottom = style({
	prop: 'bottom',
	transform: toPx,
});

const getLeft = style({
	prop: 'left',
	transform: toPx,
});

const getZIndex = style({
	prop: 'zIndex',
});

const getPosition = style({
	prop: 'position',
});

const getPositions = combine(
	getTop,
	getRight,
	getBottom,
	getLeft,
	getZIndex,
	getPosition,
);
getPositions.propTypes = {
	...getTop.propTypes,
	...getRight.propTypes,
	...getBottom.propTypes,
	...getLeft.propTypes,
	...getZIndex.propTypes,
	...getPosition.propTypes,
};

export { getTop, getRight, getBottom, getLeft, getZIndex, getPosition };

export default getPositions;
