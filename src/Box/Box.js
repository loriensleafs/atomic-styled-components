import tag from 'clean-tag';
import { space, width, fontSize, color, responsiveStyle } from 'styled-system';
import { styled } from 'styletron-react';
import { themify } from './../themify';
import { getDimension } from './../utils/helpers';

export const minWidth = responsiveStyle({
	prop: 'minWidth',
	cssProperty: 'minWidth',
	transformValue: getDimension,
});

export const maxWidth = responsiveStyle({
	prop: 'maxWidth',
	cssProperty: 'maxWidth',
	transformValue: getDimension,
});

export const height = responsiveStyle({
	prop: 'height',
	cssProperty: 'height',
	transformValue: getDimension,
});

export const maxHeight = responsiveStyle({
	prop: 'maxHeight',
	cssProperty: 'maxHeight',
	transformValue: getDimension,
});

export const minHeight = responsiveStyle({
	prop: 'minHeight',
	cssProperty: 'minHeight',
	transformValue: getDimension,
});

const Box = styled(tag, (props) => ({
	...space(props),
	...width(props),
	...minWidth(props),
	...maxWidth(props),
	...height(props),
	...minHeight(props),
	...maxHeight(props),
	...fontSize(props),
	...color(props),
}));

Box.displayName = 'Box';

Box.propTypes = {
	...space.propTypes,
	...width.propTypes,
	...minWidth.propTypes,
	...maxWidth.propTypes,
	...height.propTypes,
	...minHeight.propTypes,
	...maxHeight.propTypes,
	...fontSize.propTypes,
	...color.propTypes,
};

export default themify(Box);
