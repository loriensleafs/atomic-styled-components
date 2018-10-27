import { style } from 'styled-system';
import { getDimension } from './utils';

export const minWidth = style({
	prop: 'minWidth',
	cssProperty: 'minWidth',
	transformValue: getDimension,
});

export const maxWidth = style({
	prop: 'maxWidth',
	cssProperty: 'maxWidth',
	transformValue: getDimension,
});
