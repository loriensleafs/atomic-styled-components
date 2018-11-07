import merge from './../utils/pureRecursiveMerge';
import { isFunc } from './../utils/helpers';

export const makeCreateVariant = pxToRem => (
	color,
	fontFamily,
	fontWeight,
	fontSize,
	lineHeight,
	uppercase = false,
) => ({
	color,
	fontFamily,
	fontWeight,
	fontSize: pxToRem(fontSize),
	lineHeight,
	...(uppercase ? { textTransform: 'uppercase' } : null),
});

export default (palette, typography = {}) => {
	const {
		text: { primary, secondary },
	} = palette;
	const {
		htmlFontSize = 16,
		fontUnit = 'rem',
		fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
		fontSizes = [0.625, 0.75, 0.875, 1, 1.25, 1.5, 2.125, 3, 3.75, 6],
		lineHeights = [1.125, 1.25, 1.5, 1.75, 2, 2.125, 3, 4.5, 5.5, 6.5],
		fontWeights = {
			light: 300,
			regular: 400,
			medium: 500,
			bold: 600,
		},
		letterSpacings = {
			normal: 'normal',
			caps: '0.025em',
		},
		...passThru
	} = isFunc(typography) ? typography(palette) : typography;
	const pxToRem = (size = 14) => `${size / htmlFontSize}rem`;
	const createVariant = makeCreateVariant(pxToRem);

	return merge(
		{
			htmlFontSize,
			fontUnit,
			fontFamily,
			fontSizes,
			lineHeights,
			fontWeights,
			letterSpacings,
			variants: {
				pxToRem,
				h1: createVariant(primary, fontFamily, fontWeights.light, 96, 1),
				h2: createVariant(primary, fontFamily, fontWeights.light, 60, 1),
				h3: createVariant(primary, fontFamily, fontWeights.light, 48, 1.04),
				h4: createVariant(primary, fontFamily, fontWeights.light, 34, 1.17),
				h5: createVariant(primary, fontFamily, fontWeights.light, 24, 1.33),
				h6: createVariant(primary, fontFamily, fontWeights.light, 20, 1.6),
				subtitle1: createVariant(primary, fontFamily, fontWeights.light, 16, 1.75),
				subtitle2: createVariant(primary, fontFamily, fontWeights.light, 14, 1.57),
				body1: createVariant(primary, fontFamily, fontWeights.light, 16, 1.5),
				body2: createVariant(primary, fontFamily, fontWeights.light, 14, 1.5),
				button: createVariant(primary, fontFamily, fontWeights.light, 14, 1.5, true),
				caption: createVariant(primary, fontFamily, fontWeights.light, 12, 1.66),
				overline: createVariant(primary, fontFamily, fontWeights.light, 10, 2.66, true),
			},
		},
		passThru,
	);
};
