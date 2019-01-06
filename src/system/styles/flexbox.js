import style from './../style';
import combine from './../../utils/combine';
import { theme } from './../../theme';
import { responsiveBoolPropType } from './../../utils/propTypes';

const getAlignContent = style({
	prop: 'alignContent',
});

const getAlignItems = style({
	prop: 'alignItems',
});

const getAlignSelf = style({
	prop: 'alignSelf',
});

const getFlex = style({
	prop: 'flex',
});

const getFlexBasis = style({
	prop: 'basis',
	cssProp: 'flexBasis',
});

const getFlexDirection = style({
	prop: 'direction',
	cssProp: 'flexDirection',
});

const flexDisplay = props =>
	props.child
		? null
		: props.inline
		? { display: 'inline-flex' }
		: { display: 'flex' };
const getFlexDisplay = props => flexDisplay({ ...props, theme });
getFlexDisplay.propTypes = { inline: responsiveBoolPropType };

const getFlexGrow = style({
	prop: 'grow',
	cssProp: 'flexDirection',
});

const getFlexShrink = style({
	prop: 'shrink',
	cssProp: 'flexShrink',
});

const getFlexWrap = style({
	prop: 'wrap',
	cssProp: 'flexWrap',
});

const getJustifyContent = style({
	prop: 'justifyContent',
});

const getJustifyItems = style({
	prop: 'justifyItems',
});

const getJustifySelf = style({
	prop: 'justifySelf',
});

const getOrder = style({
	prop: 'order',
});

const getFlexbox = combine(
	getAlignContent,
	getAlignItems,
	getAlignSelf,
	getFlex,
	getFlexBasis,
	getFlexDirection,
	getFlexDisplay,
	getFlexGrow,
	getFlexShrink,
	getFlexWrap,
	getJustifyContent,
	getJustifyItems,
	getJustifySelf,
	getOrder,
);
getFlexbox.propTypes = {
	...getAlignContent.propTypes,
	...getAlignItems.propTypes,
	...getAlignSelf.propTypes,
	...getFlex.propTypes,
	...getFlexBasis.propTypes,
	...getFlexDirection.propTypes,
	...getFlexDisplay.propTypes,
	...getFlexGrow.propTypes,
	...getFlexShrink.propTypes,
	...getFlexWrap.propTypes,
	...getJustifyContent.propTypes,
	...getJustifyItems.propTypes,
	...getJustifySelf.propTypes,
	...getOrder.propTypes,
};

export {
	getAlignContent,
	getAlignItems,
	getAlignSelf,
	getFlex,
	getFlexBasis,
	getFlexDirection,
	getFlexDisplay,
	getFlexGrow,
	getFlexShrink,
	getFlexWrap,
	getJustifyContent,
	getJustifyItems,
	getJustifySelf,
	getOrder,
};

export default getFlexbox;
