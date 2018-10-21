import { style } from 'styled-system';
import { dimension } from './utils';

export const minWidth = style({
	prop: 'minWidth',
	cssProperty: 'minWidth',
	transformValue: dimension,
});

export const maxWidth = style({
	prop: 'maxWidth',
	cssProperty: 'maxWidth',
	transformValue: dimension,
});
