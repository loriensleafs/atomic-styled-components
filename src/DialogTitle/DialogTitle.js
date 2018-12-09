import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import Typography from './../Typography';
import { space } from './../styles';

const getBaseStyles = {
	rootStyles: {
		flex: '0 0 auto',
		...space({
			m: '0px',
			pt: 3.5,
			px: 3.5,
			pb: 3,
		}),
	},
};

function DialogTitle(props) {
	const { children, className: classNameProp, disableTypography, styles, ...passThru } = props;
	const { theme } = useContext(ThemeContext);
	const { rootStyles } = useStyles([getBaseStyles], { styles, theme });
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	return (
		<div className={className} {...passThru}>
			{disableTypography ? children : <Typography variant="h6">{children}</Typography>}
		</div>
	);
}

DialogTitle.displayName = 'DialogTitle';

DialogTitle.propTypes = {
	/**
	 * The content of the component.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * If `true`, the children won't be wrapped by a typography component.
	 * For instance, this can be useful to render an h4 instead of the default h2.
	 */
	disableTypography: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

DialogTitle.defaultProps = {
	disableTypography: false,
};

export default DialogTitle;
