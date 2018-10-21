import { style } from 'styled-system';
import { dimension } from './utils';

export const height = style({
	prop: 'height',
	cssProperty: 'height',
	transformValue: dimension,
});

export const maxHeight = style({
	prop: 'maxHeight',
	cssProperty: 'maxHeight',
	transformValue: dimension,
});

export const minHeight = style({
	prop: 'minHeight',
	cssProperty: 'minHeight',
	transformValue: dimension,
});
