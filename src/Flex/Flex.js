import PropTypes from 'prop-types';
import {
	alignItems,
	alignContent,
	justifyContent,
	flex,
	flexBasis,
	justifySelf,
	alignSelf,
	order,
	style,
} from 'styled-system';
import { styled } from 'styletron-react';
import { themify } from './../themify';
import Box from '../Box';

export const flexWrap = style({
	prop: 'flexWrap',
});

export const flexDirection = style({
	prop: 'direction',
	cssProperty: 'flexDirection',
	transformValue: (n) => (n === 'col' ? 'column' : 'row'),
});
flexDirection.propTypes = {
	direction: PropTypes.oneOfType([ PropTypes.array, PropTypes.string ]),
};

export const flexDisplay = (props) => ({
	display: props.inline ? 'inline-flex' : 'flex',
});
flexDisplay.propTypes = {
	inline: PropTypes.bool,
};

const Flex = styled(Box, (props) => ({
	...flexDisplay(props),
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
	...flexDisplay.propTypes,
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
	...{
		theme: PropTypes.object,
	},
};

Flex.defaultProps = {
	blacklist: Object.keys(Flex.propTypes),
};

export default themify(Flex);
