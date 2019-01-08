import React from 'react';
import PropTypes from 'prop-types';
import combine from './../utils/combine';
import { getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

const getStickyStyles = props =>
	!props.disableSticky && {
		zIndex: 1,
		position: 'sticky',
		top: '0px',
		backgroundColor: 'inherit',
	};

const getColorStyles = props =>
	props.color === 'primary' ||
	(props.color === 'inherit' && {
		color:
			props.color === 'inherit'
				? 'inherit'
				: props.theme.palette.primary.main,
	});

const getBaseStyles = ({ theme, ...props }) => ({
	lineHeight: '48px',
	listStyle: 'none',
	color: theme.palette.text.secondary,
	fontFamily: theme.typography.fontFamily,
	fontWeight: theme.typography.fontWeight.medium,
	fontSize: theme.typography.fontSizes[3],
	...getSpacing({
		py: !props.disableGutters && 2,
		px: !props.disableGutters && [1, 2],
		pl: props.inset ? 72 : null,
	}),
});

const getStyles = combine(getBaseStyles, getColorStyles, getStickyStyles);
getStyles.propTypes = {
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color: PropTypes.oneOf(['default', 'primary', 'inherit']),
	/**
	 * If `true`, the List Subheader will not have gutters.
	 */
	disableGutters: PropTypes.bool,
	/**
	 * If `true`, the List Subheader will not stick to the top during scroll.
	 */
	disableSticky: PropTypes.bool,
	/**
	 * If `true`, the List Subheader will be indented.
	 */
	inset: PropTypes.bool,
};

function ListSubheader(props) {
	const [
		{ className, component: Component, ...passThru },
		{ classes },
	] = useStyles(props, getStyles);

	return <Component className={classes} {...passThru} />;
}
ListSubheader.displayName = 'ListSubheader';

ListSubheader.propTypes = {
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
	component: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	...stylesPropType,
	...getStyles.propTypes,
};

ListSubheader.defaultProps = {
	color: 'default',
	component: 'li',
	disableGutters: false,
	disableSticky: false,
	inset: false,
};

export default ListSubheader;
