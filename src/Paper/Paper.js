import PropTypes from 'prop-types';
import tag from 'clean-tag';
import { styled } from 'styletron-react';
import { themify } from './../themify';

const Paper = styled(tag, ({ $elevation, $square, $styles, theme }) => ({
	...{
		backgroundColor: theme.colors.bg.paper,
		borderRadius: $square ? '0px' : theme.radius,
		boxShadow: theme.elevation[$elevation],
	},
	...$styles.root,
}));

Paper.propTypes = {
	/**
	 * Shadow depth, corresponds to `dp` in the spec.
	 * It's accepting values between 0 and 24 inclusive.
	 */
	$elevation: PropTypes.number,
	$styles: PropTypes.object,
	/**
	 * If `true`, rounded corners are disabled.
	 */
	$square: PropTypes.bool,
	theme: PropTypes.object,
};

Paper.defaultProps = {
	$elevation: 2,
	$styles: { root: {} },
	$square: false,
};

export default themify(Paper);
