export const fontUnit = 'rem';

export const fontFamily = `'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif`;

export const fontSizes = [ 0.75, 0.875, 1, 1.125, 1.5, 1.75, 2.125, 2.8125, 3.5, 5 ];

export const lineHeights = [ 1.125, 1.25, 1.5, 1.75, 2, 2.125, 3, 4.5, 5.5, 6.5 ];

// styled-system's `fontWeight` function can hook into the `fontWeights` object
export const fontWeights = {
	light: 300,
	regular: 400,
	medium: 500,
	bold: 600,
};

export const letterSpacings = {
	normal: 'normal',
	caps: '0.025em',
};

export default {
	fontUnit,
	fontFamily,
	fontSizes,
	lineHeights,
	fontWeights,
	letterSpacings,
};
