import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import ListContext from './ListContext';
import cn from './../theme/className';
import { space } from 'styled-system';
import ThemeContext from '../theme/ThemeContext';

const getPaddingStyles = props =>
	!props.disablePadding && {
		rootStyles: space({
			pt: props.subheader ? 0 : props.dense ? 1 : 2,
			pb: props.dense ? 1 : 2,
		}),
	};

const getBaseStyles = props => ({
	rootStyles: {
		position: 'relative',
		margin: 0,
		padding: 0,
		listStyle: 'none',
	},
});

function List(props) {
	const {
		children,
		className: classNameProp,
		component: Component,
		dense,
		disablePadding,
		styles,
		subheader,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const { rootStyles } = useStyles(
		{ dense, disablePadding, styles, subheader, theme },
		[dense, disablePadding, styles, subheader, theme],
		[getBaseStyles, getPaddingStyles],
	);
	const className = useMemo(() => cn(rootStyles), [rootStyles]);

	return (
		<Component className={className} {...passThru}>
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
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
	/**
	 * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
	 * the list and list items. The property is available to descendant components as the
	 * `dense` context.
	 */
	dense: PropTypes.bool,
	/**
	 * If `true`, vertical padding will be removed from the list.
	 */
	disablePadding: PropTypes.bool,
	/**
	 * The content of the subheader, normally `ListSubheader`.
	 */
	subheader: PropTypes.node,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default List;
