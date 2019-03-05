import React from 'react';
import PropTypes from 'prop-types';
import { getSpacing, useStyles } from '../system';
import { stylesPropType } from '../utils/propTypes';

const getStyles = () => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
		...getSpacing({ py: 2, px: [2, 2.5] }),
	},
	action: {
		margin: '0px 4px',
	},
});

function CardActions(props) {
	const {
		classes,
		props: { children, className, disableActionSpacing, ...passThru },
	} = useStyles(props, getStyles, { nested: true });

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
