import PropTypes from 'prop-types';
import { style } from 'styled-system';
import { getDimension } from './utils';

export const height = style({
	prop: 'h',
	cssProperty: 'height',
	transformValue: getDimension,
});

height.propTypes = {
	h: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.string]),
};

export const maxHeight = style({
	prop: 'hMax',
	cssProperty: 'maxHeight',
	transformValue: getDimension,
});

maxHeight.propTypes = {
	hMax: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.string]),
};

export const minHeight = style({
	prop: 'hMin',
	cssProperty: 'minHeight',
	transformValue: getDimension,
});

minHeight.propTypes = {
	hMin: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.string]),
};
