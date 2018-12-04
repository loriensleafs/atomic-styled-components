import React, { cloneElement, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import ThemeContext from '../theme/ThemeContext';
import ListContext from './../List/ListContext';
import cn from './../theme/className';
import { fontSize, space } from './../styles';

const getBaseStyles = props => ({
	rootStyles: {
		width: '36px',
		height: '36px',
		...fontSize(4),
		...space({
			mt: props.alignItems === 'flex-start' ? 1 : null,
			mr: 1,
		}),
	},
	iconStyles: props.dense
		? {
				width: '20px',
				height: '20px',
				...fontSize(4),
		  }
		: null,
});

function ListItemAvatar(props) {
	const { children, className: classNameProp, styles, ...passThru } = props;
	const { theme } = useContext(ThemeContext);
	const { alignItems, dense } = useContext(ListContext);
	const { rootStyles, iconStyles } = useStyles([getBaseStyles], {
		alignItems,
		dense,
		styles,
		theme,
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
