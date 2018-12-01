import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';
import {
	maxHeight as maxHeightParser,
	maxWidth as maxWidthParser,
	minHeight as minHeightParser,
	minWidth as minWidthParser,
	space,
} from 'styled-system';
import { bgColor, height, textColor, width } from './../styles';

const getBaseStyles = props => ({
	backgroundColor: props.theme.palette.bg.paper,
	boxShadow: props.theme.elevation[props.elevation - 1],
	borderRadius: props.square ? '0px' : props.theme.shape.borderRadius.round,
});

function Paper(props) {
	const {
		bg,
		children,
		className: classNameProp,
		color,
		elevation,
		h,
		is,
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
		p,
		pb,
		pl,
		pr,
		pt,
		py,
		px,
		radius,
		square,
		styles: stylesProp,
		w,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const styles = useStyles(
		{
			bg,
			color,
			elevation,
			h,
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
			p,
			pb,
			pl,
			pr,
			pt,
			py,
			px,
			radius,
			square,
			stylesProp,
			w,
			theme,
		},
		[
			bg,
			color,
			elevation,
			h,
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
			p,
			pb,
			pl,
			pr,
			pt,
			py,
			px,
			radius,
			square,
			stylesProp,
			w,
			theme,
		],
		[
			getBaseStyles,
			bgColor,
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
	const Component = is;

	return (
		<Component className={className} {...passThru}>
			{props.children}
		</Component>
	);
}

Paper.displayName = 'Paper';

Paper.propTypes = {
	/**
	 * Shadow depth, corresponds to `dp` in the spec.
	 * It's accepting values between 0 and 24 inclusive.
	 */
	elevation: PropTypes.number,
	is: PropTypes.node,
	/**
	 * If `true`, rounded corners are disabled.
	 */
	square: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	...bgColor.propTypes,
	...textColor.propTypes,
	...height.propTypes,
	...maxHeightParser.propTypes,
	...maxWidthParser.propTypes,
	...minHeightParser.propTypes,
	...minWidthParser.propTypes,
	...space.propTypes,
	...width.propTypes,
};

Paper.defaultProps = {
	elevation: 2,
	is: 'div',
	square: false,
};

export default Paper;
