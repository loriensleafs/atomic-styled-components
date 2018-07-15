import colors from './color';
import elevation from './elevation';
import motion from './motion';
import responsive from './responsive';
import space from './space';
import text from './text';

// styled-system's `borderRadius` function can hook into the `radii` object/array
export const radii = [ 0, 4, 6 ];
export const radius = '4px';

export const maxContainerWidth = '1280px';

const theme = {
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
	maxContainerWidth,
};

export default theme;
