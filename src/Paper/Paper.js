import React, { useContext, useMemo } from 'react';
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
	...(isFunc(props.styles) ? props.styles(props) : props.styles || {}),
});

const useStyles = props => useMemo(() => getStyles(props), [props]);

function Paper(props) {
	const {
		bg,
		children,
		className: classNameProp,
		color,
		elevation,
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
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const className = useMemo(() => cn(useStyles({ ...props, theme }), classNameProp), [
		props,
		theme,
	]);
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
};

Paper.defaultProps = {
	elevation: 2,
	is: 'div',
	square: false,
};

export default Paper;
