import merge from './../utils/merge';
import createMotion from './createMotion';
import createPalette from './createPalette';
import createResponsive from './createResponsive';
import createTypography from './createTypography';
import elevation from './elevation';
import shape from './shape';
import space from './space';

function createTheme(overrides = {}) {
	const {
		breakpoints: breakpointOverrides = [],
		duration: durationOverrides = {},
		easing: easingOverrides = {},
		elevation: elevationOverrides,
		palette: paletteOverrides = {},
		typography: typographyOverrides = {},
	} = overrides;
	const { easing, duration, getTransition, getEasing } = createMotion(
		durationOverrides,
		easingOverrides,
	);
	const palette = createPalette(paletteOverrides);
	const { breakpoints, mediaQueries, getMediaQuery } = createResponsive(
		breakpointOverrides,
	);
	const { pxToRem, typography } = createTypography(
		palette,
		typographyOverrides,
	);
	return {
		breakpoints,
		duration,
		easing,
		elevation: elevationOverrides || elevation,
		getEasing,
		getMediaQuery,
		getTransition,
		maxWidth: '1200px',
		mediaQueries,
		palette,
		pxToRem,
		shape,
		space,
		typography,
	};
}

export default createTheme;
