import PropTypes from 'prop-types';
import tag from 'clean-tag';
import { style, variant } from 'styled-system';
import { styled } from 'styletron-react';
import { themify } from './../themify';

const elevation = style({
	prop: 'elevation',
	cssProperty: 'boxShadow',
	key: 'elevation',
});

const Paper = styled(tag, (props) => ({
	...{
		backgroundColor: props.theme.palette.bg.paper,
		borderRadius: props.$square ? '0px' : props.theme.radius,
	},
	...elevation(props),
	...props.$styles.root,
}));

Paper.displayName = 'Paper';

Paper.propTypes = {
	/**
	 * Shadow depth, corresponds to `dp` in the spec.
	 * It's accepting values between 0 and 24 inclusive.
	 */
	...elevation.propTypes,
	$styles: PropTypes.object,
	/**
	 * If `true`, rounded corners are disabled.
	 */
	$square: PropTypes.bool,
	theme: PropTypes.object,
};

Paper.defaultProps = {
	elevation: 2,
	$styles: { root: {} },
	$square: false,
};

export default themify(Paper);
