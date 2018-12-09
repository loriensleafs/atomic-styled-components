import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { space } from './../styles';

const getBaseStyles = {
	rootStyles: {
		flex: '1 1 auto',
		overflowY: 'auto',
		WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
		...space({
			pt: '0px',
			px: 3.5,
			pb: 3.5,
		}),
		':first-child': space({
			pt: 3.5,
		}),
	},
};

function DialogContent(props) {
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

DialogContent.displayName = 'DialogContent';

DialogContent.propTypes = {
	/**
	 * The content of the component.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default DialogContent;
