import createMotion from './createMotion';
import createPalette from './createPalette';
import createResponsive from './createResponsive';
import createTypography from './createTypography';
import elevation from './elevation';
import shape from './shape';
import spacing from './spacing';

function createTheme(overrides = {}) {
	const {
		breakpoints: breakpointOverrides = [],
		duration: durationOverrides = {},
		easing: easingOverrides,
		elevation: elevationOverrides,
		palette: paletteOverrides = {},
		typography: typographyOverrides = {},
	} = overrides;
	const { easings, durations, getTransition, getEasing } = createMotion(
		durationOverrides,
		easingOverrides,
	);
	const palette = createPalette(paletteOverrides);
	const { breakpoints, getMq, mediaQueries } = createResponsive(
		breakpointOverrides,
	);
	const { pxToRem, typography } = createTypography(
		palette,
		typographyOverrides,
	);

	return {
		breakpoints,
		durations,
		easings,
		elevation: elevationOverrides ? elevationOverrides : elevation,
		getEasing,
		getMq,
		getTransition,
		maxWidth: '1200px',
		mediaQueries,
		palette,
		pxToRem,
		shape,
		spacing,
		typography,
	};
}

export default createTheme;
