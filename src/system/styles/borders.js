import PropTypes from 'prop-types';
import style from './style';
import combine from '../../utils/combine';

const getBorderRadius = style({
	prop: 'radius',
	cssProp: 'borderRadius',
	themeKey: 'shape.borderRadius',
});
getBorderRadius.propTypes = {
	radius: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(['circular', 'round', 'square']),
	]),
};

const getBorderTop = style({
	prop: 'borderTop',
});

const getBorderRight = style({
	prop: 'borderRight',
});

const getBorderBottom = style({
	prop: 'borderBottom',
});

const getBorderLeft = style({
	prop: 'borderLeft',
});

const getBorderColor = style({
	prop: 'borderColor',
	themeKey: 'palette',
});

const getBorderSize = combine(
	getBorderTop,
	getBorderRight,
	getBorderBottom,
	getBorderLeft,
);
getBorderSize.propTypes = {
	...getBorderTop.propTypes,
	...getBorderRight.propTypes,
	...getBorderLeft.propTypes,
	...getBorderBottom.propTypes,
};

const getBorders = combine(getBorderRadius, getBorderColor, getBorderSize);
getBorders.propTypes = {
	...getBorderRadius.propTypes,
	...getBorderColor.propTypes,
	...getBorderSize.propTypes,
};

export { getBorderRadius, getBorderColor, getBorderSize };

export default getBorders;
