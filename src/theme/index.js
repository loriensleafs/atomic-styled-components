import { createContext } from 'react';
import colors from './color';
import elevation from './elevation';
import motion from './motion';
import responsive from './responsive';
import space from './space';
import text from './text';

// styled-system's `borderRadius` function can hook into the `radii`
// object/array
export const radii = [ 0, 4, 6 ];
export const radius = '4px';

export const maxWidth = '1280px';

export const theme = {
	...{
		boxShadow: elevation,
	},
	elevation,
	...motion,
	...responsive,
	space,
	...text,
	colors,
	radii,
	radius,
	maxWidth,
};

const { Provider, Consumer } = createContext(theme);

export { Provider as ThemeProvider, Consumer as ThemeConsumer };
