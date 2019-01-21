import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import ListContext from './ListContext';
import { getSpacing, useStyles } from './../system';
import { componentPropType, stylesPropType } from './../utils/propTypes';

function getStyles(props) {
	const { dense, disablePadding, subheader } = props;

	return getSpacing({
		pt: disablePadding || subheader ? 0 : dense ? 1 : 2,
		pb: disablePadding ? null : dense ? 1 : 2,
	});
}
getStyles.propTypes = {
	/**
	 * If `true`, compact vertical padding designed for keyboard and mouse
	 * input will be used for the list and list items. The property is
	 * available to descendant components as the
	 * `dense` context.
	 */
	dense: PropTypes.bool,
	// If `true`, vertical padding will be removed from the list.
	disablePadding: PropTypes.bool,
	// The content of the subheader, normally `ListSubheader`.
	subheader: PropTypes.node,
};

const baseStyles = {
	position: 'relative',
	margin: 0,
	padding: 0,
	listStyle: 'none',
};

function List(props) {
	const [
		{classes},
		{
			as: Component,
			className,
			children,
			dense,
			subheader,
			...passThru,
		},
	] = useStyles(props, getStyles, { baseStyles, whitelist: ['dense','subheader'] });

	return (
		<Component className={classes} {...passThru}>
			<ListContext.Provider value={{ dense }}>
				{subheader}
				{children}
			</ListContext.Provider>
		</Component>
	);
}

List.displayName = 'List';

List.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes
};

List.defaultProps = {
	as: 'ul',
	dense: false,
	disablePadding: false,
};

export default List;
