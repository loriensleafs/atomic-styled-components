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
		action,
		bg,
		common,
		contrastThreshold,
		divider,
		error,
		grey,
		primary,
		secondary,
		text,
		tonalOffset,
		type,
	} = palette;
	const types = {
		light: {
			action: action.light,
			bg: bg.light,
			divider: divider.light,
			text: text.light,
		},
		dark: {
			action: action.dark,
			bg: bg.dark,
			divider: divider.dark,
			text: text.dark,
		},
	};
	const getContrastText = makeGetContrastText({ ...types, ...{ contrastThreshold } });
	const augmentColor = (color, mainShade = 500, lightShade = 300, darkShade = 700) => {
		if (!color.main && color[mainShade]) color.main = color[mainShade];

		addLightOrDark(color, 'light', lightShade, tonalOffset);
		addLightOrDark(color, 'dark', darkShade, tonalOffset);
		if (!color.contrastText) color.contrastText = getContrastText(color.main);
	};

	augmentColor(primary);
	augmentColor(secondary);
	augmentColor(error);

	return {
		...types,
		action: action[type],
		bg: bg[type],
		common,
		contrastThreshold,
		divider: divider[type],
		error,
		grey,
		primary,
		secondary,
		text: text[type],
		tonalOffset,
		type,
		getContrastText,
		augmentColor,
	};
};
