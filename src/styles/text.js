import { style } from 'styled-system';
import { px } from './../utils/helpers';

export const fontFamily = style({
	prop: 'font',
	key: 'typography.fontFamily',
});

export const fontSize = style({
	prop: 'fontSize',
	key: 'typography.fontSizes',
	transformValue: px,
	scale: [0.625, 0.75, 0.875, 1, 1.25, 1.5, 2.125, 3, 3.75, 6],
});

export const fontWeight = style({
	prop: 'fontWeight',
	key: 'typography.fontWeights',
});

export const lineHeight = style({
	prop: 'lineHeight',
	key: 'typography.lineHeights',
});
