import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from './../theme/className';
import useStyles from './../hooks/useStyles';
import { height, maxHeight, minHeight, space, width, maxWidth, minWidth } from './../styles';

const getBaseStyles = props => ({
	rootStyles: {
		backgroundColor: props.theme.palette.bg.paper,
		boxShadow: props.theme.elevation[props.elevation - 1],
		borderRadius: props.square ? '0px' : props.theme.shape.borderRadius.round,
		...height(props),
		...maxHeight(props),
		...maxWidth(props),
		...minHeight(props),
		...minWidth(props),
		...space(props),
		...width(props),
	},
});

const Paper = forwardRef((props, ref) => {
	const {
		children,
		className: classNameProp,
		elevation,
		h,
		hMax,
		hMin,
		is,
		m,
		mb,
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
		styles,
		w,
		wMax,
		wMin,
		...passThru
	} = props;
	const { rootStyles } = useStyles(
		[getBaseStyles],
		{
			elevation,
			h,
			hMax,
			hMin,
			m,
			mb,
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
			styles,
			w,
			wMax,
			wMin,
		},
		[
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
			styles,
			w,
		],
	);
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);
	const Component = is;

	return (
		<Component className={className} ref={ref} {...passThru}>
			{props.children}
		</Component>
	);
});

Paper.displayName = 'Paper';

Paper.propTypes = {
	/**
	 * Shadow depth, corresponds to `dp` in the spec.
	 * It's accepting values between 0 and 24 inclusive.
	 */
	elevation: PropTypes.number,
	is: PropTypes.node,
	ref: PropTypes.func,
	/**
	 * If `true`, rounded corners are disabled.
	 */
	square: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Paper.defaultProps = {
	elevation: 2,
	is: 'div',
	square: false,
};

export default Paper;
