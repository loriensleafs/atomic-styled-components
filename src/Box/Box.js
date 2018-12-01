import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import { fontSize, space } from 'styled-system';
import {
	bgColor,
	borderRadius,
	height,
	maxHeight,
	maxWidth,
	minHeight,
	minWidth,
	textColor,
	width,
} from './../styles';
import { isFunc } from './../utils/helpers';

const getStyles = props => ({
	...bgColor(props),
	...borderRadius(props),
	...fontSize(props),
	...height(props),
	...maxHeight(props),
	...maxWidth(props),
	...minHeight(props),
	...minWidth(props),
	...space(props),
	...textColor(props),
	...width(props),
	...(isFunc(props.styles) ? props.styles(props) : props.styles || {}),
});

const useStyles = props => useMemo(() => getStyles(props), [props]);

function Box(props) {
	const {
		maxHeight,
		maxWidth,
		minHeight,
		minWidth,
		inline,
		align,
		alignContent,
		alignItems,
		alignSelf,
		bg,
		color,
		direction,
		flex,
		flexDirection,
		flexWrap,
		h,
		is,
		justify,
		justifyContent,
		justifySelf,
		m,
		mb,
		ml,
		mr,
		mt,
		mx,
		my,
		order,
		p,
		pb,
		pl,
		pr,
		pt,
		px,
		py,
		radius,
		styles,
		w,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const Component = props.is;
	const className = useMemo(() => cn(props.className, useStyles({ ...props, theme })), [
		props,
		theme,
	]);
	return (
		<Component className={className} {...passThru}>
			{props.children}
		</Component>
	);
}

Box.displayName = 'Box';

Box.propTypes = {
	...bgColor.propTypes,
	...borderRadius.propTypes,
	...fontSize.propTypes,
	...height.propTypes,
	...maxHeight.propTypes,
	...maxWidth.propTypes,
	...minHeight.propTypes,
	...minWidth.propTypes,
	...space.propTypes,
	...textColor.propTypes,
	...width.propTypes,
	...{
		is: PropTypes.node,
		styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	},
};

Box.defaultProps = {
	is: 'div',
};

export default Box;
