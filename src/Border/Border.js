import tag from 'clean-tag';
import { styled } from 'styletron-react';
import { borderRadius, borderColor, borders } from 'styled-system';
import { themify } from './../theme';

const Border = styled(tag, (props) => ({
	...borderRadius(props),
	...borderColor(props),
	...borders(props),
}));

Border.displayName = 'Border';

Border.propTypes = {
	...borderRadius.propTypes,
	...borderColor.propTypes,
	...borders.propTypes,
};

export default themify(Border);
