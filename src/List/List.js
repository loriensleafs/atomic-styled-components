import PropTypes from 'prop-types';
import React, { forwardRef, useRef } from 'react';
import { getSpacing, useStyles } from '../system';
import { componentPropType, stylesPropType } from '../utils/propTypes';
import ListContext from './ListContext';

const getStyles = ({ dense, disablePadding, subheader }) =>
	getSpacing({
		pt: subheader ? 0 : !disablePadding ? 2 : dense ? 1 : 0,
		pb: !disablePadding ? 2 : dense ? 1 : 0,
	});
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

const List = forwardRef((props, ref) => {
	ref = ref ? ref : useRef(null);
	const {
		classes,
		props: { as: Component, children, dense, subheader, ...passThru },
	} = useStyles(props, getStyles, {
		baseStyles,
		whitelist: ['dense', 'subheader'],
	});

	return (
		<Component className={classes} ref={ref} {...passThru}>
			<ListContext.Provider value={{ dense }}>
				{subheader}
				{children}
			</ListContext.Provider>
		</Component>
	);
});

List.displayName = 'List';

List.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

List.defaultProps = {
	as: 'ul',
	dense: false,
	disablePadding: false,
};

export default List;
