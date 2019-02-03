import style from './style';
import combine from '../../utils/combine';

const getBg = style({
	prop: 'bg',
	cssProp: 'backgroundColor',
	themeKey: 'palette',
});

const getColor = style({
	prop: 'color',
	themeKey: 'palette',
});

const getColors = combine(getBg, getColor);
getColors.propTypes = {
	...getBg.propTypes,
	...getColor.propTypes,
};

export { getBg, getColor };

export default getColors;
