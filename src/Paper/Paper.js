import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import cn from './../styles/className';
import { isFunc } from './../utils/helpers';

const getStyles = props => ({
	...{
		backgroundColor: props.theme.palette.bg.paper,
		boxShadow: props.theme.elevation[props.elevation],
		borderRadius: props.square ? '0px' : props.theme.shape.borderRadius,
	},
	...(isFunc(props.styles) ? props.styles(props) : props.styles),
});

function Paper(props) {
	const { theme } = useContext(ThemeContext);
	const className = cn(props.className, getStyles({ ...props, ...{ theme } }));
	const Component = props.as;
	return <Component className={className}>{props.children}</Component>;
}

Paper.displayName = 'Paper';

Paper.propTypes = {
	as: PropTypes.node,
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
	as: 'div',
	elevation: 2,
	square: false,
};
export default Paper;
