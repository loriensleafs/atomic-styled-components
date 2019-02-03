import { isFn } from './../utils/helpers';

const FONT_SIZE_SCALE = [0.625, 0.75, 0.875, 1, 1.25, 1.5, 2.125, 3, 3.75, 6];

const LINE_HEIGHT_SCALE = [1.125, 1.25, 1.5, 1.75, 2, 2.125, 3, 4.5, 5.5, 6.5];

function makeCreateVariant(pxToRem) {
	return function(
		color,
		fontFamily,
		fontWeight,
		fontSize,
		lineHeight,
		uppercase = false,
	) {
		return {
			color,
			fontFamily,
			fontWeight,
			fontSize: pxToRem(fontSize),
			lineHeight,
			...(uppercase ? { textTransform: 'uppercase' } : null),
		};
	};
}

function createTypography(palette, typography = {}) {
	const {
		text: { primary, secondary },
	} = palette;
	const {
		fontFamilies = {
			paragraph: '"Roboto", "Helvetica", "Arial", sans-serif',
			header: '"Roboto", "Helvetica", "Arial", sans-serif',
			ui: '"Roboto", "Helvetica", "Arial", sans-serif',
		},
		fontSizes = FONT_SIZE_SCALE,
		fontWeights = {
			light: 300,
			regular: 400,
			medium: 500,
			bold: 600,
		},
		htmlFontSize = 16,
		letterSpacings = {
			normal: 'normal',
			caps: '0.025em',
		},
		lineHeights = LINE_HEIGHT_SCALE,
		unit = 'rem',
	} = isFn(typography) ? typography(palette) : typography;
	const pxToRem = (size = 14) => `${size / htmlFontSize}rem`;
	const createVariant = makeCreateVariant(pxToRem);

	return {
		pxToRem,
		typography: {
			fontFamilies,
			fontSizes,
			fontWeights,
			htmlFontSize,
			letterSpacings,
			lineHeights,
			unit,
			variants: {
				h1: createVariant(
					primary,
					fontFamilies.header,
					fontWeights.light,
					96,
					1,
				),
				h2: createVariant(
					primary,
					fontFamilies.header,
					fontWeights.light,
					60,
					1,
				),
				h3: createVariant(
					primary,
					fontFamilies.header,
					fontWeights.regular,
					48,
					1.04,
				),
				h4: createVariant(
					primary,
					fontFamilies.header,
					fontWeights.regular,
					34,
					1.17,
				),
				h5: createVariant(
					primary,
					fontFamilies.header,
					fontWeights.regular,
					24,
					1.33,
				),
				h6: createVariant(
					primary,
					fontFamilies.header,
					fontWeights.medium,
					20,
					1.6,
				),
				subtitle1: createVariant(
					primary,
					fontFamilies.header,
					fontWeights.regular,
					16,
					1.75,
				),
				subtitle2: createVariant(
					primary,
					fontFamilies.header,
					fontWeights.medium,
					14,
					1.57,
				),
				body1: createVariant(
					primary,
					fontFamilies.paragraph,
					fontWeights.regular,
					16,
					1.5,
				),
				body2: createVariant(
					primary,
					fontFamilies.paragraph,
					fontWeights.regular,
					14,
					1.5,
				),
				button: createVariant(
					primary,
					fontFamilies.ui,
					fontWeights.medium,
					14,
					1.5,
					true,
				),
				caption: createVariant(
					primary,
					fontFamilies.paragraph,
					fontWeights.regular,
					12,
					1.66,
				),
				overline: createVariant(
					primary,
					fontFamilies.paragraph,
					fontWeights.regular,
					10,
					2.66,
					true,
				),
			},
		},
	};
}

export { FONT_SIZE_SCALE, LINE_HEIGHT_SCALE };

export default createTypography;
