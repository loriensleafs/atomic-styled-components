import { style } from 'styled-system';
import { getDimension } from './utils';

export const height = style({
	prop: 'height',
	cssProperty: 'height',
	transformValue: getDimension,
});

export const maxHeight = style({
	prop: 'maxHeight',
	cssProperty: 'maxHeight',
	transformValue: getDimension,
});

export const minHeight = style({
	prop: 'minHeight',
	cssProperty: 'minHeight',
	transformValue: getDimension,
});
