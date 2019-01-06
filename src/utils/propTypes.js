import PropTypes from 'prop-types';
import domElements from './domElements';

const boolPropType = PropTypes.boolean;

const componentPropType = {
	as: PropTypes.any,
};

const numOrStrPropType = PropTypes.oneOfType([
	PropTypes.number,
	PropTypes.string,
]);

const tagPropType = {
	as: PropTypes.oneOf(domElements),
};

const stylesPropType = {
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const responsiveBoolPropType = PropTypes.oneOfType([
	PropTypes.bool,
	PropTypes.arrayOf(PropTypes.bool),
]);

const responsiveNumPropType = PropTypes.oneOfType([
	PropTypes.number,
	PropTypes.arrayOf(PropTypes.number),
]);

const responsiveStrPropType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.arrayOf(PropTypes.string),
]);

const responsivePropType = PropTypes.oneOfType([
	PropTypes.number,
	PropTypes.string,
	PropTypes.array,
]);

const responsiveNumOrStrPropType = PropTypes.oneOf([
	responsiveNumPropType,
	responsiveStrPropType,
]);

export {
	boolPropType,
	componentPropType,
	numOrStrPropType,
	tagPropType,
	stylesPropType,
	responsiveBoolPropType,
	responsiveNumPropType,
	responsiveStrPropType,
	responsivePropType,
	responsiveNumOrStrPropType,
};
