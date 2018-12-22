import React, { cloneElement, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import ListContext from './../List/ListContext';
import cn from './../theme/className';
import { fontSize, space } from './../styles';

const getBaseStyles = ({theme, ...props}) => ({
	rootStyles: {
		width: '36px',
		height: '36px',
		...fontSize({
			fontSize: 4,
			theme
		}),
		...space({
			mt: props.alignItems === 'flex-start' ? 1 : null,
			mr: 1,
			theme
		}),
	},
	iconStyles: props.dense
		? {
				width: '20px',
				height: '20px',
				...fontSize({
					fontSize: 4,
					theme
				}),
		  }
		: null,
});

function ListItemAvatar(props) {
	const { children, className: classNameProp, styles, ...passThru } = props;
	const { alignItems, dense } = useContext(ListContext);
	const { rootStyles, iconStyles } = useStyles([getBaseStyles], {
		alignItems,
		dense,
		styles,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);
	const iconClassName = useMemo(() => cn(iconStyles), [iconStyles]);

	return cloneElement(children, {
		className,
		childrenClassName: iconClassName + ' ' + children.props.childrenClassName,
		...passThru,
	});
}

ListItemAvatar.displayName = 'ListItemAvatar';

ListItemAvatar.propTypes = {
	/**
	 * The content of the component – normally `Avatar`.
	 */
	children: PropTypes.element.isRequired,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default ListItemAvatar;
