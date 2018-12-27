import merge from './../utils/pureRecursiveMerge';
import createMotion from './createMotion';
import createPalette from './createPalette';
import createResponsive from './createResponsive';
import createTypography from './createTypography';
import elevation from './elevation';
import shape from './shape';
import space from './space';

export default (overrides = {}) => {
	const {
		breakpoints: breakpointOverrides = [],
		duration: durationOverrides = {},
		easing: easingOverrides = {},
		elevation: elevationOverrides,
		palette: paletteOverrides = {},
		typography: typographyOverrides = {},
		...passThru
	} = overrides;
	const motion = createMotion(durationOverrides, easingOverrides);
	const palette = createPalette(paletteOverrides);
	const responsive = createResponsive(breakpointOverrides);
	const { pxToRem, ...typography } = createTypography(palette, typographyOverrides);
	return merge(
		{
			elevation: elevationOverrides || elevation,
			maxWidth: '1200px',
			...motion,
			palette,
			pxToRem,
			shape,
			space,
			...responsive,
			typography,
		},
		passThru,
	);
};
