import PropTypes from 'prop-types';
import { style } from 'styled-system';
import { getDimension } from './utils';

export const height = style({
	prop: 'h',
	cssProperty: 'height',
	transformValue: getDimension,
});
height.propTypes = {
	h: PropTypes.oneOfType([ PropTypes.number, PropTypes.array, PropTypes.string ]),
};

export const maxHeight = style({
	prop: 'maxHeight',
	cssProperty: 'maxHeight',
	transformValue: getDimension,
});

export const minHeight = style({
	prop: 'minHeight',
	cssProperty: 'minHeight',
	transformValue: getDimension,
});
