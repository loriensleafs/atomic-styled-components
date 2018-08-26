import React from 'react';
import PropTypes from 'prop-types';
import tag from 'clean-tag';
import merge from 'deep-extend';
import Paper from './../Paper';
import { classify, themify } from './../themify';

const styles = {
	root: {
		overflow: 'hidden',
	},
};

const Card = (props) => {
	const { className, raised, styles: stylesProp, ...passThru } = props;

	return (
		<Paper
			className={className}
			styles={merge({}, styles, stylesProp)}
			$elevation={raised ? 8 : 1}
			{...passThru}
		/>
	);
};

Card.propTypes = {
	className: PropTypes.string,
	/**
	 * If `true`, the card will use raised styling.
	 */
	raised: PropTypes.bool,
	styles: PropTypes.object,
};

Card.defaultProps = {
	raised: false,
	styles: {
		root: {},
	},
};

export default Card;
