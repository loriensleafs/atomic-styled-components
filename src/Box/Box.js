import tag from 'clean-tag';
import { styled } from 'styletron-react';
import { space, fontSize } from 'styled-system';
import {
	bgColor,
	textColor,
	height,
	maxHeight,
	maxWidth,
	minHeight,
	minWidth,
	width,
} from './../styles';
import { themify } from './../themify';

const Box = styled(tag, (props) => ({
	...bgColor(props),
	...textColor(props),
	...fontSize(props),
	...height(props),
	...maxHeight(props),
	...maxWidth(props),
	...minHeight(props),
	...minWidth(props),
	...space(props),
	...width(props),
}));

Box.displayName = 'Box';

Box.propTypes = {
	...bgColor.propTypes,
	...textColor.propTypes,
	...fontSize.propTypes,
	...height.propTypes,
	...maxHeight.propTypes,
	...maxWidth.propTypes,
	...minHeight.propTypes,
	...minWidth.propTypes,
	...space.propTypes,
	...width.propTypes,
};

export default themify(Box);
