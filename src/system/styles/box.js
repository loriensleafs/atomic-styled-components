import combine from './../../utils/combine';
import getBorders from './borders';
import getColors from './colors';
import getDisplay from './display';
import getElevation from './elevation';
import getOpacity from './opacity';
import getPositions from './positions';
import getSizing from './sizing';
import getSpacing from './spacing';
import { getFontSize, getLineHeight } from './text';

const getBox = combine(
	getBorders,
	getColors,
	getElevation,
	getDisplay,
	getFontSize,
	getLineHeight,
	getOpacity,
	getPositions,
	getSizing,
	getSpacing,
);
getBox.propTypes = {
	...getBorders.propTypes,
	...getColors.propTypes,
	...getElevation.propTypes,
	...getDisplay.propTypes,
	...getFontSize.propTypes,
	...getLineHeight.propTypes,
	...getOpacity.propTypes,
	...getPositions.propTypes,
	...getSizing.propTypes,
	...getSpacing.propTypes,
};

export default getBox;
