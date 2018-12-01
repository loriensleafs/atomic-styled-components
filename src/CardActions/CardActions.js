import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { space } from 'styled-system';

const getBaseStyles = props => ({
	rootStyles: {
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
		...space({
			py: 2,
			px: [1, 2],
		}),
	},
	actionStyles: {
		margin: '0px 4px',
	},
});

function CardActions(props) {
	const {
		children,
		className: classNameProp,
		disableActionSpacing,
		styles: stylesProp,
		...passThru
	} = props;
	const styles = useStyles(props, [stylesProp], [getBaseStyles]);
	const className = useMemo(() => cn(classNameProp, styles), [classNameProp, styles]);

	return (
		<div className={className} {...passThru}>
			{children}
		</div>
	);
}

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
