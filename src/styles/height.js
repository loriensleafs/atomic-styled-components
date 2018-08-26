import { responsiveStyle } from 'styled-system';
import { dimension } from './utils';

export const height = responsiveStyle({
	prop: 'height',
	cssProperty: 'height',
	transformValue: dimension,
});

export const maxHeight = responsiveStyle({
	prop: 'maxHeight',
	cssProperty: 'maxHeight',
	transformValue: dimension,
});

export const minHeight = responsiveStyle({
	prop: 'minHeight',
	cssProperty: 'minHeight',
	transformValue: dimension,
});
