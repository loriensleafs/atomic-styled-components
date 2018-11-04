import React, { useContext } from 'react';
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

const Box = props => {
	const { theme } = useContext(ThemeContext);
	const { $styles = {}, as: C } = props;
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
		...$styles,
	});

	return <C className={className}>{props.children}</C>;
};

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

Box.defaultProps = {
	as: 'div',
};

export default Box;
