import merge from './../utils/pureRecursiveMerge';
import createBreakpoints from './createBreakpoints';
import createPalette from './createPalette';
import createTypography from './createTypography';
import elevation from './elevation';
import shape from './shape';
import space from './space';
import { duration, easing } from './motion';

export default (overrides = {}) => {
	const {
		breakpoints: breakpointsOverrides = {},
		elevation: elevationOverrides,
		palette: paletteOverrides = {},
		typography: typographyOverrides = {},
		...passThru
	} = overrides;
	const palette = createPalette(paletteOverrides);
	const breakpoints = createBreakpoints(breakpointsOverrides);

	return merge(
		{
			breakpoints,
			duration,
			easing,
			elevation: elevationOverrides || elevation,
			maxWidth: '1200px',
			palette,
			shape,
			space,
		},
		createTypography(palette, typographyOverrides),
		passThru,
	);
};
