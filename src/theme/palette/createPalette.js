import merge from './../../utils/pureRecursiveMerge';
import defaultPalette from './defaultPalette';
import { addLightOrDark, darken, getContrastRatio, lighten } from './utils';

const makeGetContrastText = ({ contrastThreshold, light, dark }) => (background) =>
	getContrastRatio(background, dark.text.primary) >= contrastThreshold
		? dark.text.primary
		: light.text.primary;

export default (palette = {}) => {
	palette = merge(defaultPalette, palette);
	const {
		type,
		contrastThreshold,
		tonalOffset,
		primary,
		secondary,
		error,
		grey,
		common,
		light,
		dark,
	} = palette;

	const getContrastText = makeGetContrastText(palette);
	const augmentColor = (color, mainShade = 500, lightShade = 300, darkShade = 700) => {
		if (!color.main && color[mainShade]) {
			color.main = color[mainShade];
		}

		addLightOrDark(color, 'light', lightShade, tonalOffset);
		addLightOrDark(color, 'dark', darkShade, tonalOffset);

		if (!color.contrastText) {
			color.contrastText = getContrastText(color.main);
		}
	};

	augmentColor(primary);
	augmentColor(secondary);
	augmentColor(error);

	return {
		type,
		contrastThreshold,
		tonalOffset,
		primary,
		secondary,
		error,
		grey,
		common,
		light,
		dark,
		...palette[type],
	};
};
