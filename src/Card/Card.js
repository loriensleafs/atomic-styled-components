import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Paper from './../Paper';

const Card = forwardRef(({ raised, styles, ...props }, ref) => (
	<Paper
		styles={{ ...styles, overflow: 'hidden' }}
		elevation={raised ? 8 : 1}
		ref={ref}
		{...props}
	/>
));

Card.displayName = 'Card';

Card.propTypes = {
	// The border radius of the Card.
	radius: PropTypes.oneOf(['round', 'square']),
	// The amount of elevation the Card has.
	raised: PropTypes.bool,
};

Card.defaultProps = {
	radius: 'round',
	raised: false,
};

export default Card;
