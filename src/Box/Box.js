import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';
import {
	fontSize,
	maxHeight as maxHeightParser,
	maxWidth as maxWidthParser,
	minHeight as minHeightParser,
	minWidth as minWidthParser,
	space,
} from 'styled-system';
import { bgColor, borderRadius, height, textColor, width } from './../styles';

function Box(props) {
	const {
		className: classNameProp,
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
		maxHeight,
		maxWidth,
		mb,
		minHeight,
		minWidth,
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
		styles: stylesProp,
		w,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const Component = props.is;
	const styles = useStyles(
		{
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
			maxHeight,
			maxWidth,
			mb,
			minHeight,
			minWidth,
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
			stylesProp,
			w,
			theme,
		},
		[
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
			maxHeight,
			maxWidth,
			mb,
			minHeight,
			minWidth,
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
			stylesProp,
			w,
			theme,
		],
		[
			bgColor,
			borderRadius,
			fontSize,
			height,
			maxHeightParser,
			maxWidthParser,
			minHeightParser,
			minWidthParser,
			space,
			textColor,
			width,
		],
	);
	const className = useMemo(() => cn(classNameProp, styles), [classNameProp, styles]);
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
	...maxHeightParser.propTypes,
	...maxWidthParser.propTypes,
	...minHeightParser.propTypes,
	...minWidthParser.propTypes,
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
