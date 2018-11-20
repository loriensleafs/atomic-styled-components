import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import { space, fontSize } from 'styled-system';
import {
	bgColor,
	borderRadius,
	textColor,
	height,
	maxHeight,
	maxWidth,
	minHeight,
	minWidth,
	width,
} from './../styles';
import { isFunc } from './../utils/helpers';

const getStyles = props => ({
	...bgColor(props),
	...borderRadius(props),
	...textColor(props),
	...fontSize(props),
	...height(props),
	...maxHeight(props),
	...maxWidth(props),
	...minHeight(props),
	...minWidth(props),
	...space(props),
	...width(props),
	...(isFunc(props.styles) ? props.styles(props) : props.styles),
});

function Box(props) {
	const { theme } = useContext(ThemeContext);
	const {
		is,
		styles,
		m,
		mt,
		mr,
		mb,
		ml,
		mx,
		my,
		p,
		pt,
		pr,
		pb,
		pl,
		px,
		py,
		radius,
		color,
		bg,
		w,
		h,
		minWidth,
		minHeight,
		maxWidth,
		maxHeight,
		inline,
		flexWrap,
		align,
		alignItems,
		justify,
		flex,
		direction,
		flexDirection,
		justifySelf,
		alignSelf,
		order,
		alignContent,
		justifyContent,
		...passThru
	} = props;
	const Component = props.is;
	const className = cn(props.className, getStyles({ ...props, ...{ theme } }));
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
	...textColor.propTypes,
	...fontSize.propTypes,
	...height.propTypes,
	...maxHeight.propTypes,
	...maxWidth.propTypes,
	...minHeight.propTypes,
	...minWidth.propTypes,
	...space.propTypes,
	...width.propTypes,
	...{
		as: PropTypes.node,
		styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	},
};

Box.defaultProps = {
	is: 'div',
	styles: {},
};

export default Box;
