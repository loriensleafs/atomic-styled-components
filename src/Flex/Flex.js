import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import Box from '../Box';
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
import { isFunc } from './../utils/helpers';

export const flexWrap = style({
	prop: 'flexWrap',
});

export const flexDirection = style({
	prop: 'direction',
	cssProperty: 'flexDirection',
	transformValue: n => (n === 'col' ? 'column' : 'row'),
});

export const flexDisplay = style({
	prop: 'inline',
	cssProperty: 'display',
	transformValue: n => (!n ? 'flex' : 'inline-flex'),
});

export const getStyles = props => ({
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
	...(isFunc(props.styles) ? props.styles(props) : props.styles),
});

function Flex(props) {
	const { theme } = useContext(ThemeContext);
	const styles = getStyles({ ...props, ...{ theme } });
	return (
		<Box styles={getStyles({ ...props, ...{ theme } })} {...props}>
			{props.children}
		</Box>
	);
}

Flex.displayName = 'Flex';

Flex.propTypes = {
	inline: PropTypes.bool,
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

Flex.defaultProps = {
	inline: false,
};

export default Flex;
