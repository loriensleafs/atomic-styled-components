import PropTypes from 'prop-types';
import style from './style';
import variant from './variant';
import combine from '../../utils/combine';
import {
	FONT_SIZE_SCALE,
	LINE_HEIGHT_SCALE,
} from './../../theme/createTypography';
import { toRem } from './../../utils/helpers';

/**
 * Text variants.
 */
const getTextVariant = variant({
	themeKey: 'typography.variants',
});
getTextVariant.propTypes = {
	variant: PropTypes.oneOf([
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'subtitle1',
		'subtitle2',
		'body1',
		'body2',
		'button',
		'caption',
		'overline',
	]),
};

const getFontFamily = style({
	prop: 'fontFamily',
	cssProp: 'fontFamily',
	themeKey: 'typography.fontFamilies',
});

const getFontSize = style({
	prop: 'fontSize',
	themeKey: 'typography.fontSizes',
	themeMap: FONT_SIZE_SCALE.map(n => `${n}rem`),
	transform: toRem,
});

const getFontStyle = style({
	prop: 'fontStyle',
});

const getFontWeight = style({
	prop: 'fontWeight',
	themeKey: 'typography.fontWeights',
});

const getLineHeight = style({
	prop: 'lineHeight',
	themeKey: 'typography.lineHeights',
	themeMap: LINE_HEIGHT_SCALE.map(n => `${n}rem`),
	transform: toRem,
});

const getTextAlign = style({
	prop: 'textAlign',
});

const getWhiteSpace = style({
	prop: 'whiteSpace',
});

const getText = combine(
	getTextVariant,
	getFontFamily,
	getFontSize,
	getFontStyle,
	getFontWeight,
	getLineHeight,
	getTextAlign,
	getWhiteSpace,
);
getText.propTypes = {
	...getTextVariant.propTypes,
	...getFontFamily.propTypes,
	...getFontSize.propTypes,
	...getFontStyle.propTypes,
	...getFontWeight.propTypes,
	...getLineHeight.propTypes,
	...getTextAlign.propTypes,
	...getWhiteSpace.propTypes,
};

export {
	getTextVariant,
	getFontFamily,
	getFontSize,
	getFontStyle,
	getFontWeight,
	getLineHeight,
	getTextAlign,
	getWhiteSpace,
};

export default getText;
