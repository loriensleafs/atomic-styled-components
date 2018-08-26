import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deep-extend';
import Paper from './../Paper';
import { classify } from './../themify';

const styles = {
	root: {
		overflow: 'hidden',
	},
	paper: {},
};

const Card = ({ className, raised, $styles, ...passThru }) => (
	<Paper
		className={classify(merge({}, styles.root, $styles.root), className)}
		$styles={{ root: merge({}, styles.paper, $styles.paper) }}
		$elevation={raised ? 8 : 1}
		{...passThru}
	/>
);

Card.displayName = 'Card';

Card.propTypes = {
	className: PropTypes.string,
	/**
	 * If `true`, the card will use raised styling.
	 */
	raised: PropTypes.bool,
	$styles: PropTypes.object,
};

Card.defaultProps = {
	raised: false,
	$styles: {
		root: {},
		paper: {},
	},
};

export default Card;
