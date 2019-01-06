import React from 'react';
import PropTypes from 'prop-types';
import Paper from './../Paper';

function Card(props) {
	const { children, raised, styles: stylesProp = {}, ...passThru } = props;
	const styles = {
		...stylesProp,
		overflow: 'hidden',
	};

	return (
		<Paper styles={styles} elevation={raised ? 8 : 1} {...passThru}>
			{children}
		</Paper>
	);
}

Card.displayName = 'Card';

Card.propTypes = {
	raised: PropTypes.bool,
};

Card.defaultProps = {
	radius: 'round',
	raised: false,
};

export default Card;
