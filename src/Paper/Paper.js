import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from './../Box';

const Paper = forwardRef((props, ref) => <Box ref={ref} {...props} />);

Paper.displayName = 'Paper';

Paper.propTypes = {
	bg: PropTypes.any,
	/**
	 * Shadow depth, corresponds to `dp` in the spec.
	 * It's accepting values between 0 and 24 inclusive.
	 */
	elevation: PropTypes.number,
	radius: PropTypes.string,
};

Paper.defaultProps = {
	elevation: 2,
	bg: 'bg.paper',
	radius: 'round',
};

export default Paper;
