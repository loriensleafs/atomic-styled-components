import PropTypes from 'prop-types';
import { style } from 'styled-system';
import { getDimension } from './utils';

export const width = style({
	prop: 'w',
	cssProperty: 'width',
	transformValue: getDimension,
});
width.propTypes = {
	w: PropTypes.oneOfType([ PropTypes.number, PropTypes.array, PropTypes.string ]),
};

export const minWidth = style({
	prop: 'minWidth',
	cssProperty: 'minWidth',
	transformValue: getDimension,
});

export const maxWidth = style({
	prop: 'maxWidth',
	cssProperty: 'maxWidth',
	transformValue: getDimension,
});
