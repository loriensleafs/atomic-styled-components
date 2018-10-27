import PropTypes from 'prop-types';
import tag from 'clean-tag';
import { styled } from 'styletron-react';
import { themify } from './../themify';

const Paper = styled(tag, ({ $elevation = 2, $square = false, $styles, theme, ...passThru }) => ({
	...{
		backgroundColor: theme.palette.bg.paper,
		boxShadow: theme.elevation[$elevation],
		borderRadius: $square ? '0px' : theme.radius,
	},
	...(typeof $styles === 'function'
		? $styles({ $elevation, $square, $styles, theme, ...passThru })
		: $styles),
}));

Paper.displayName = 'Paper';

Paper.propTypes = {
	$styles: PropTypes.object,
	/**
	 * If `true`, rounded corners are disabled.
	 */
	$square: PropTypes.bool,
	/**
	 * Shadow depth, corresponds to `dp` in the spec.
	 * It's accepting values between 0 and 24 inclusive.
	 */
	elevation: PropTypes.number,
	theme: PropTypes.object,
};
export default themify(Paper);
