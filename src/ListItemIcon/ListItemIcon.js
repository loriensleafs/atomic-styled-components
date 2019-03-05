import React from 'react';
import PropTypes from 'prop-types';
import { getSpacing, useStyles } from '../system';
import { stylesPropType } from '../utils/propTypes';

const getStyles = ({ theme: { palette } }) => ({
	display: 'flex',
	flexShrink: 0,
	alignItems: 'center',
	color: palette.action.active,
	...getSpacing({ mr: 3 }),
});

function ListItemIcon(props) {
	const {
		classes,
		props: { children, className, ...passThru },
	} = useStyles(props, getStyles);

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
	className: PropTypes.string,
	...stylesPropType,
};

export default ListItemIcon;
