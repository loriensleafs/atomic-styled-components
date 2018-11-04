import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../styles/className';
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
import { isFunc } from './../utils/helpers';

function Box(props) {
	const { theme } = useContext(ThemeContext);
	const { styles, as: C } = props;
	const styleProps = { ...props, ...{ theme } };
	const className = cn(props.className, {
		...bgColor(styleProps),
		...textColor(styleProps),
		...fontSize(styleProps),
		...height(styleProps),
		...maxHeight(styleProps),
		...maxWidth(styleProps),
		...minHeight(styleProps),
		...minWidth(styleProps),
		...space(styleProps),
		...width(styleProps),
		...(isFunc(styles) ? styles(props) : styles),
	});

	return <C className={className}>{props.children}</C>;
}

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
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Box.defaultProps = {
	as: 'div',
	styles: {},
};

export default Box;
