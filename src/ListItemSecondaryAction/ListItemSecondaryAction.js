import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import ThemeContext from '../theme/ThemeContext';
import cn from './../theme/className';

const getBaseStyles = {
	rootStyles: {
		position: 'absolute',
		top: '50%',
		right: '4px',
		transform: 'translate(-50%)',
	},
};

function ListItemSecondaryAction(props) {
	const { children, className: classNameProp, styles, ...passThru } = props;
	const { theme } = useContext(ThemeContext);
	const { rootStyles } = useStyles([getBaseStyles], { theme });
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	return (
		<div className={className} {...passThru}>
			{children}
		</div>
	);
}

ListItemSecondaryAction.displayName = 'ListItemSecondaryAction';

ListItemSecondaryAction.propTypes = {
	/**
	 * The content of the component, normally an `IconButton` or selection control.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default ListItemSecondaryAction;
