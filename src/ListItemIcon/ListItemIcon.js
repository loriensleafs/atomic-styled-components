import React from 'react';
import PropTypes from 'prop-types';
import { getColor, getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getStyles(props) {
	return {
		display: 'inline-flex',
		flexShrink: 0,
		alignItems: 'center',
		...getColor({ color: 'action.active' }),
		...getSpacing({ mr: 2 }),
	};
}

function ListItemIcon(props) {
	const [{ children, className, ...passThru }, styles, classes] = useStyles(
		props,
		getStyles,
	);

	return (
		<div className={classes} {...passThru}>
			{children}
		</div>
	);
}

ListItemIcon.displayName = 'ListItemIcon';

ListItemIcon.propTypes = {
	/**
	 * The content of the component, normally `Icon`, `SvgIcon`,
	 * or a `@material-ui/icons` SVG icon element.
	 */
	children: PropTypes.element.isRequired,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	...stylesPropType,
};

export default ListItemIcon;
