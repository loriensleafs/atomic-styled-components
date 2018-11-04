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

export const flexWrap = style({
	prop: 'flexWrap',
});

export const flexDirection = style({
	prop: 'direction',
	cssProperty: 'flexDirection',
	transformValue: n => (n === 'col' ? 'column' : 'row'),
});
flexDirection.propTypes = {
	direction: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export const flexDisplay = props => ({
	display: props.inline ? 'inline-flex' : 'flex',
});
flexDisplay.propTypes = {
	inline: PropTypes.bool,
};

function Flex(props) {
	const { theme } = useContext(ThemeContext);
	const styleProps = { ...props, ...{ theme } };
	const styles = {
		...flexDisplay(styleProps),
		...alignItems(styleProps),
		...alignContent(styleProps),
		...justifyContent(styleProps),
		...flexWrap(styleProps),
		...flexDirection(styleProps),
		...flex(styleProps),
		...flexBasis(styleProps),
		...justifySelf(styleProps),
		...alignSelf(styleProps),
		...order(styleProps),
	};
	return (
		<Box styles={styles} {...props}>
			{props.children}
		</Box>
	);
}

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
};

export default Flex;
