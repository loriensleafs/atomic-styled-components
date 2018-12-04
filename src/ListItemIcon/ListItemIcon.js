import React, { cloneElement, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import ThemeContext from '../theme/ThemeContext';
import cn from './../theme/className';
import { space } from './../styles';

const getBaseStyles = props => ({
	rootStyles: {
		display: 'inline-flex',
		flexShrink: 0,
		alignItems: 'center',
		color: props.theme.palette.action.active,
		...space({
			mr: 3,
		}),
	},
});

function ListItemIcon(props) {
	const { children, className: classNameProp, styles, ...passThru } = props;
	const { theme } = useContext(ThemeContext);
	const { rootStyles } = useStyles([getBaseStyles], { styles, theme });
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	return (
		<div className={className} {...passThru}>
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
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default ListItemIcon;
