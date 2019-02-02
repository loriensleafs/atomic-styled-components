import merge from '../utils/merge';
import { addLightOrDark, getContrastRatio } from '../utils/colorHelpers';

export const greys = [
	'#ffffff',
	'#fafafa',
	'#f5f5f5',
	'#eeeeee',
	'#e0e0e0',
	'#bdbdbd',
	'#9e9e9e',
	'#757575',
	'#616161',
	'#424242',
	'#000000',
];

export const common = {
	white: greys[0],
	black: greys[10],
};

export const light = {
	action: {
		active: 'rgba(0, 0, 0, 0.54)',
		hover: 'rgba(0, 0, 0, 0.08)',
		hoverOpacity: 0.08,
		selected: 'rgba(0, 0, 0, 0.14)',
		disabled: 'rgba(0, 0, 0, 0.26)',
		disabledBg: 'rgba(0, 0, 0, 0.12)',
	},
	bg: {
		default: greys[1],
		paper: common.white,
	},
	divider: 'rgba(0, 0, 0, 0.12)',
	text: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0, 0, 0, 0.54)',
		disabled: 'rgba(0, 0, 0, 0.38)',
		hint: 'rgba(0, 0, 0, 0.38)',
		icon: 'rgba(0, 0, 0, 0.54)',
	},
};

export const dark = {
	action: {
		active: common.white,
		hover: 'rgba(255, 255, 255, 0.1)',
		hoverOpacity: 0.01,
		selected: 'rgba(255, 255, 255, 0.2)',
		disabled: 'rgba(255, 255, 255, 0.3)',
		disabledBg: 'rgba(255, 255, 255, 0.12)',
	},
	bg: {
		default: '#303030',
		paper: greys[9],
	},
	divider: 'rgba(255, 255, 255, 0.12)',
	text: {
		primary: common.white,
		secondary: 'rgba(255, 255, 255, 0.7)',
		disabled: 'rgba(255, 255, 255, 0.5)',
		hint: 'rgba(255, 255, 255, 0.5)',
		icon: 'rgba(255, 255, 255, 0.5)',
	},
};

const contrastThreshold = 2;

const tonalOffset = 0.2;

const getContrastText = background =>
	getContrastRatio(background, dark.text.primary) >= contrastThreshold
		? dark.text.primary
		: light.text.primary;

const augmentColor = (
	color,
	mainShade = 500,
	lightShade = 300,
	darkShade = 700,
) => {
	if (!color.main && color[mainShade]) {
		color.main = color[mainShade];
	}

	addLightOrDark(color, 'light', lightShade, tonalOffset);
	addLightOrDark(color, 'dark', darkShade, tonalOffset);

	if (!color.contrastText) {
		color.contrastText = getContrastText(color.main);
	}

	return color;
};

export default (palette = {}) => {
	const {
		primary = {
			main: '#3B67D4',
		},
		secondary = {
			main: '#A92BBF',
		},
		error = {
			main: '#f44336',
		},
		grey = {
			main: greys[5],
			light: greys[3],
			dark: greys[7],
		},
		type = 'light',
		contrastThreshold = contrastThreshold,
		tonalOffset = tonalOffset,
		...passThru
	} = palette;

	augmentColor(primary);
	augmentColor(secondary);
	augmentColor(error);

	return merge(
		{
			common,
			type,
			primary,
			secondary,
			error,
			grey,
			contrastThreshold,
			getContrastText,
			augmentColor,
			tonalOffset,
			dark,
			light,
		},
		type === 'light' ? light : dark,
		passThru,
	);
};
