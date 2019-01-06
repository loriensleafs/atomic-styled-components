import React from 'react';
import PropTypes from 'prop-types';
import ListContext from './ListContext';
import { getSpacing, useStyles } from './../system';
import { componentPropType, stylesPropType } from './../utils/propTypes';

function getSpacingStyles(props) {
	const { dense, disablePadding, subheader } = props;

	return getSpacing({
		pt: disablePadding || subheader ? 0 : dense ? 1 : 2,
		pb: disablePadding ? null : dense ? 1 : 2,
	});
}
getSpacingStyles.propTypes = {
	/**
	 * If `true`, vertical padding will be removed from the list.
	 */
	disablePadding: PropTypes.bool,
};

const baseStyles = {
	position: 'relative',
	margin: 0,
	padding: 0,
	listStyle: 'none',
};

function List(props) {
	const [
		{
			as: Component,
			children,
			className,
			dense,
			subheader,
			...passThru,
		},
		styles,
		classes,
	] = useStyles(props, getSpacingStyles, { baseStyles });

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
	/**
	 * The content of the component.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
	 * the list and list items. The property is available to descendant components as the
	 * `dense` context.
	 */
	dense: PropTypes.bool,
	/**
	 * The content of the subheader, normally `ListSubheader`.
	 */
	subheader: PropTypes.node,
	...componentPropType,
	...stylesPropType,
};

List.defaultProps = {
	as: 'ul',
	dense: false,
	disablePadding: false,
};

export default List;
