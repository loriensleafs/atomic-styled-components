import React from 'react';
import PropTypes from 'prop-types';
import Paper from './../Paper';

const getBaseStyles = props => ({
	overflow: 'hidden',
});

function Card(props) {
	const { raised, styles: stylesProp = {}, ...passThru } = props;
	const styles = { ...getBaseStyles(), ...(stylesProp ? { styles: stylesProp } : null) };

	return <Paper styles={styles} elevation={raised ? 8 : 1} {...passThru} />;
}

Card.displayName = 'Card';

Card.propTypes = {
	raised: PropTypes.bool,
};

Card.defaultProps = {
	raised: false,
};

export default Card;
