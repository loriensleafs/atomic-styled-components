const grey = [
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

const common = {
	white: grey[0],
	black: grey[10],
};

const light = {
	action: {
		active: 'rgba(0, 0, 0, 0.54)',
		hover: 'rgba(0, 0, 0, 0.08)',
		hoverOpacity: 0.08,
		selected: 'rgba(0, 0, 0, 0.14)',
		disabled: 'rgba(0, 0, 0, 0.26)',
		disabledBg: 'rgba(0, 0, 0, 0.12)',
	},
	bg: {
		default: grey[1],
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

const dark = {
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
		paper: grey[9],
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

export default {
	type: 'light',
	contrastThreshold: 2,
	tonalOffset: 0.2,
	primary: {
		main: '#61ac47',
	},
	secondary: {
		main: '#ed7653',
	},
	error: {
		main: '#f44336',
	},
	grey: {
		main: grey[5],
		light: grey[3],
		dark: grey[7],
	},
	common,
	light,
	dark,
};
