import PropTypes from 'prop-types';
import {
	alignItems,
	alignContent,
	justifyContent,
	flexDirection,
	flex,
	flexBasis,
	justifySelf,
	alignSelf,
	order,
	responsiveStyle,
} from 'styled-system';
import { styled } from 'styletron-react';
import { themify } from './../styled';
import Box from '../Box';

export const flexWrap = responsiveStyle({
	prop: 'flexWrap',
});

const Flex = styled(Box, (props) => ({
	...{
		display: `${props.inline ? 'inline-flex' : 'flex'}`,
	},
	...alignItems(props),
	...alignContent(props),
	...justifyContent(props),
	...flexWrap(props),
	...flexDirection(props),
	...flex(props),
	...flexBasis(props),
	...justifySelf(props),
	...alignSelf(props),
	...order(props),
}));

Flex.displayName = 'Flex';

Flex.propTypes = {
	...{
		inline: PropTypes.bool,
	},
	...alignItems.propTypes,
	...alignContent.propTypes,
	...justifyContent.propTypes,
	...flexWrap.propTypes,
	...flexDirection.propTypes,
	...flex.propTypes,
	...flexBasis.propTypes,
	...justifySelf.propTypes,
	...alignSelf.propTypes,
	...order.propTypes,
};

export default themify(Flex);
