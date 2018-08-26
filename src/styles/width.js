import { responsiveStyle } from 'styled-system';
import { dimension } from './utils';

export const minWidth = responsiveStyle({
	prop: 'minWidth',
	cssProperty: 'minWidth',
	transformValue: dimension,
});

export const maxWidth = responsiveStyle({
	prop: 'maxWidth',
	cssProperty: 'maxWidth',
	transformValue: dimension,
});
