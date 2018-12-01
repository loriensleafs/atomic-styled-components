import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import Box from '../Box';
import {
	alignContent,
	alignItems,
	alignSelf,
	flex,
	flexBasis,
	justifyContent,
	justifySelf,
	order,
	style,
} from 'styled-system';
import { isFunc } from './../utils/helpers';

export const flexDisplay = style({
	prop: 'inline',
	cssProperty: 'display',
	transformValue: n => (!n ? 'flex' : 'inline-flex'),
});

export const flexDirection = style({
	prop: 'direction',
	cssProperty: 'flexDirection',
	transformValue: n => (n === 'col' ? 'column' : 'row'),
});

export const flexWrap = style({
	prop: 'flexWrap',
});

export const getStyles = props => ({
	...alignContent(props),
	...alignItems(props),
	...alignSelf(props),
	...flex(props),
	...flexBasis(props),
	...flexDisplay(props),
	...flexDirection(props),
	...flexWrap(props),
	...justifyContent(props),
	...justifySelf(props),
	...order(props),
	...(isFunc(props.styles) ? props.styles(props) : props.styles || {}),
});

const useStyles = props => useMemo(() => getStyles(props), [props]);

function Flex(props) {
	const { theme } = useContext(ThemeContext);
	const styles = useStyles({ ...props, theme });

	return (
		<Box styles={styles} {...props}>
			{props.children}
		</Box>
	);
}

Flex.displayName = 'Flex';

Flex.propTypes = {
	inline: PropTypes.bool,
	...alignContent.propTypes,
	...alignItems.propTypes,
	...alignSelf.propTypes,
	...flex.propTypes,
	...flexBasis.propTypes,
	...flexDirection.propTypes,
	...flexWrap.propTypes,
	...justifyContent.propTypes,
	...justifySelf.propTypes,
	...order.propTypes,
	...{
		styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	},
};

Flex.defaultProps = {
	inline: false,
};

export default Flex;
