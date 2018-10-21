import tag from 'clean-tag';
import {
	fontFamily,
	fontSize,
	textAlign,
	lineHeight,
	fontWeight,
	letterSpacing,
} from 'styled-system';
import { bgColor, textColor } from './../styles';
import { styled } from 'styletron-react';
import { themify } from './../themify';

const Text = styled(tag, (props) => ({
	...fontFamily(props),
	...fontSize(props),
	...textAlign(props),
	...lineHeight(props),
	...fontWeight(props),
	...letterSpacing(props),
	...bgColor(props),
	...textColor(props),
}));

Text.displayName = 'Text';

Text.propTypes = {
	...fontFamily.propTypes,
	...fontSize.propTypes,
	...textAlign.propTypes,
	...lineHeight.propTypes,
	...fontWeight.propTypes,
	...letterSpacing.propTypes,
};

export default themify(Text);
