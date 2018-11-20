import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../theme/className';
import { isFunc } from './../utils/helpers';

const getStyles = props => ({
	...{
		backgroundColor: props.theme.palette.bg.paper,
		boxShadow: props.theme.elevation[props.elevation - 1],
		borderRadius: props.square ? '0px' : props.theme.shape.borderRadius.round,
	},
	...(isFunc(props.styles) ? props.styles(props) : props.styles),
});

function Paper(props) {
	const { theme } = useContext(ThemeContext);
	const className = cn(props.className, getStyles({ ...props, ...{ theme } }));
	const Component = props.is;
	const {
		styles,
		children,
		className: classNameProp,
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
		elevation,
		square,
		is,
		...passThru
	} = props;
	return (
		<Component className={className} {...passThru}>
			{props.children}
		</Component>
	);
}

Paper.displayName = 'Paper';

Paper.propTypes = {
	is: PropTypes.node,
	/**
	 * Shadow depth, corresponds to `dp` in the spec.
	 * It's accepting values between 0 and 24 inclusive.
	 */
	elevation: PropTypes.number,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * If `true`, rounded corners are disabled.
	 */
	square: PropTypes.bool,
};

Paper.defaultProps = {
	is: 'div',
	elevation: 2,
	square: false,
	styles: {},
};

export default Paper;
