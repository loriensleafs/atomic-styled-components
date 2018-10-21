import React from 'react';
import { createContext } from 'react';
import merge from './../utils/pureRecursiveMerge';
import createPalette from './palette/createPalette';
import elevation from './elevation';
import { duration, easing } from './motion';
import { breakpoints, mediaQueries } from './responsive';
import space from './space';
import { fontUnit, fontFamily, fontSizes, lineHeights, fontWeights, letterSpacings } from './text';

// styled-system's `borderRadius` function can hook into the `radii`
// object/array
export const radii = [ 0, 4, 6 ];
export const radius = '4px';
export const maxWidth = '1280px';

export const defaultTheme = {
	breakpoints,
	duration,
	easing,
	elevation,
	fontUnit,
	fontFamily,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
	maxWidth,
	mediaQueries,
	palette: createPalette(),
	radius,
	space,
};

const { Provider, Consumer } = createContext(defaultTheme);

const ThemeProvider = ({ theme = {}, children }) => (
	<Provider value={merge(defaultTheme, theme)}>{children}</Provider>
);

export { ThemeProvider, Consumer as ThemeConsumer };
