import tag from 'clean-tag';
import { styled } from 'styletron-react';
import { space, width, fontSize, color } from 'styled-system';
import { height, maxHeight, maxWidth, minHeight, minWidth } from './../styles';
import { themify } from './../themify';

const Box = styled(tag, (props) => ({
	...color(props),
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
	...color.propTypes,
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
