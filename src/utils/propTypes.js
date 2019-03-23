import PropTypes from 'prop-types';
import domElements from './domElements';

const boolPropType = PropTypes.boolean;

const componentPropType = {
	as: PropTypes.any,
};

const durationPropType = PropTypes.oneOf([
	'shortest',
	'shorter',
	'short',
	'standard',
	'complex',
	'entering',
	'leaving',
]);

const easingPropType = PropTypes.oneOf(['in', 'inOut', 'out', 'sharp']);

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

const responsiveStringPropType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.arrayOf(PropTypes.string),
]);

const responsivePropType = PropTypes.oneOfType([
	PropTypes.number,
	PropTypes.string,
	PropTypes.array,
]);

const responsiveNumOrStringPropType = PropTypes.oneOf([
	responsiveNumPropType,
	responsiveStringPropType,
]);

export {
	boolPropType,
	componentPropType,
	durationPropType,
	easingPropType,
	numOrStrPropType,
	tagPropType,
	stylesPropType,
	responsiveBoolPropType,
	responsiveNumPropType,
	responsiveStringPropType,
	responsivePropType,
	responsiveNumOrStringPropType,
};
