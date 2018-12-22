import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { space } from './../styles';

const getBaseStyles = ({ theme, ...props }) => ({
	rootStyles: {
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
		...space({
			py: 2,
			px: [2, 2.5],
			theme,
		}),
	},
	actionStyles: {
		margin: '0px 4px',
	},
});

function CardActions(props) {
	const { children, className: classNameProp, disableActionSpacing, styles, ...passThru } = props;
	const { rootStyles } = useStyles([getBaseStyles], props);
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	return (
		<div className={className} {...passThru}>
			{children}
		</div>
	);
}

CardActions.displayName = 'CardActions';

CardActions.propTypes = {
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

export default CardActions;
