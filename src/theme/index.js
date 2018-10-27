import React from 'react';
import { createContext } from 'react';
import merge from './../utils/pureRecursiveMerge';
import createPalette from './palette/createPalette';
import elevation from './elevation';
import { easing, duration, transition, getAutoHeightDuration } from './motion';
import { breakpoints, mediaQueries } from './responsive';
import space from './space';
import { fontUnit, fontFamily, fontSizes, lineHeights, fontWeights, letterSpacings } from './text';

export const defaultTheme = {
	breakpoints,
	easing,
	duration,
	transition,
	getAutoHeightDuration,
	elevation,
	fontUnit,
	fontFamily,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
	maxWidth: '1280px',
	mediaQueries,
	palette: createPalette(),
	radius: '4px',
	space,
};

const { Provider, Consumer } = createContext(defaultTheme);

const ThemeProvider = ({ theme = {}, children }) => (
	<Provider value={merge(defaultTheme, theme)}>{children}</Provider>
);

export { ThemeProvider, Consumer as ThemeConsumer };
