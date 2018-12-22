import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { space } from './../styles';

const getStickyStyles = props =>
	!props.disableSticky && {
		rootStyles: {
			zIndex: 1,
			position: 'sticky',
			top: '0px',
			backgroundColor: 'inherit',
		},
	};

const getColorStyles = props =>
	props.color === 'primary' ||
	(props.color === 'inherit' && {
		rootStyles: {
			color: props.color === 'inherit' ? 'inherit' : props.theme.palette.primary.main,
		},
	});

const getBaseStyles = ({theme, ...props}) => ({
	rootStyles: {
		lineHeight: '48px',
		listStyle: 'none',
		color: theme.palette.text.secondary,
		fontFamily: theme.typography.fontFamily,
		fontWeight: theme.typography.fontWeight.medium,
		fontSize: theme.typography.fontSizes[3],
		...space({
			py: !props.disableGutters && 2,
			px: !props.disableGutters && [1, 2],
			pl: props.inset ? 72 : null,
			theme
		}),
	},
});

function ListSubheader(props) {
	const {
		className: classNameProp,
		color,
		component: Component,
		disableGutters,
		disableSticky,
		inset,
		styles,
		...passThru
	} = props;
	const { rootStyles } = useStyles([getBaseStyles, getColorStyles, getStickyStyles], {
		color,
		disableGutters,
		disableSticky,
		inset,
		styles,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	return <Component className={className} {...passThru} />;
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
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color: PropTypes.oneOf(['default', 'primary', 'inherit']),
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
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
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

ListSubheader.defaultProps = {
	color: 'default',
	component: 'li',
	disableGutters: false,
	disableSticky: false,
	inset: false,
};

export default ListSubheader;
