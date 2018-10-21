const common = {
	black: '#000',
	white: '#fff',
};

const action = {
	light: {
		active: 'rgba(0, 0, 0, 0.54)',
		hover: 'rgba(0, 0, 0, 0.08)',
		hoverOpacity: 0.08,
		selected: 'rgba(0, 0, 0, 0.14)',
		disabled: 'rgba(0, 0, 0, 0.26)',
		disabledBg: 'rgba(0, 0, 0, 0.12)',
	},
	dark: {
		active: common.white,
		hover: 'rgba(255, 255, 255, 0.1)',
		hoverOpacity: 0.01,
		selected: 'rgba(255, 255, 255, 0.2)',
		disabled: 'rgba(255, 255, 255, 0.3)',
		disabledBg: 'rgba(255, 255, 255, 0.12)',
	},
};

const bg = {
	light: {
		main: '#edf0f2',
		appbar: '#fff',
		chip: '#E0E0E0',
		header: '#fff',
		paper: '#fff',
		tab: '#fff',
	},
	dark: {
		main: '#303030',
		appbar: '#166EA3',
		chip: '#757575',
		header: '#166EA3',
		paper: '#616161',
		tab: '#C85C44',
	},
};

const divider = {
	light: {
		main: 'rgba(0,0,0,0.075)',
		light: 'rgba(0, 0, 0, 0.05)',
		dark: 'rgba(0,0,0,0.1)',
	},
	dark: {
		main: 'rgba(255,255,255,0.09)',
		light: 'rgba(255,255,255,0.075)',
		dark: 'rgba(255,255,255,0.1)',
	},
};

const text = {
	light: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0, 0, 0, 0.54)',
		disabled: 'rgba(0, 0, 0, 0.38)',
		hint: 'rgba(0, 0, 0, 0.38)',
		icon: 'rgba(0, 0, 0, 0.6)',
	},
	dark: {
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
		light: '#7ece62',
		dark: '#508a3c',
	},
	secondary: {
		main: '#ed7653',
		light: '#F07051',
		dark: 'C85C44',
	},
	error: {
		main: '#f44336',
		light: '#e57373',
		dark: '#d32f2f',
	},
	grey: {
		main: '#bdbdbd',
		light: '#eeeeee',
		dark: '#757575',
	},
	action,
	bg,
	common,
	divider,
	text,
};
