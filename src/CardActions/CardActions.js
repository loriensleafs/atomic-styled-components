import React from 'react';
import PropTypes from 'prop-types';
import { getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getStyles() {
	return {
		root: {
			display: 'flex',
			alignItems: 'center',
			boxSizing: 'border-box',
			...getSpacing({
				py: 2,
				px: [2, 2.5],
			}),
		},
		action: {
			margin: '0px 4px',
		},
	};
}

function CardActions(props) {
	const [
		{ classes },
		{ children, className, disableActionSpacing, ...passThru },
	] = useStyles(props, getStyles);

	return (
		<div className={classes.root} {...passThru}>
			{children}
		</div>
	);
}

CardActions.displayName = 'CardActions';

CardActions.propTypes = {
	// The content of the component.\
	children: PropTypes.node,
	className: PropTypes.string,
	...stylesPropType,
};

export default CardActions;
