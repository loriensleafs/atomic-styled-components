import PropTypes from 'prop-types';
import React from 'react';
import useStyles from '../system/useStyles';
import { stylesPropType } from '../utils/propTypes';

const baseStyles = {
	position: 'absolute',
	top: '50%',
	right: '4px',
	transform: 'translateX(-50%) translateY(-50%)',
};

function ListItemSecondaryAction(props) {
	const { classes, props: passThru } = useStyles(props, null, { baseStyles });
	return <div className={classes} {...passThru} />;
}

ListItemSecondaryAction.displayName = 'ListItemSecondaryAction';

ListItemSecondaryAction.propTypes = {
	// Content of the component, normally an `IconButton` or selection control.
	children: PropTypes.node,
	className: PropTypes.string,
	...stylesPropType,
};

export default ListItemSecondaryAction;
