import PropTypes from 'prop-types';
import { style } from 'styled-system';
import { getDimension } from './utils';

export const width = style({
	prop: 'w',
	cssProperty: 'width',
	transformValue: getDimension,
});

width.propTypes = {
	w: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.string]),
};

export const maxWidth = style({
	prop: 'wMax',
	cssProperty: 'maxWidth',
	transformValue: getDimension,
});

maxWidth.propTypes = {
	wMax: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.string]),
};

export const minWidth = style({
	prop: 'wMin',
	cssProperty: 'minWidth',
	transformValue: getDimension,
});

minWidth.propTypes = {
	wMin: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.string]),
};
