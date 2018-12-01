import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import merge from './../utils/pureRecursiveMerge';
import cn from './../theme/className';
import { space } from 'styled-system';
import { isFunc } from './../utils/helpers';

const getStyles = props =>
	merge(
		{
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
		},
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);

const useStyles = props => useMemo(() => getStyles(props), [props]);

function CardActions(props) {
	const { disableActionSpacing, children, className: classNameProp, ...passThru } = props;
	const className = useMemo(() => cn(classNameProp, useStyles(props).rootStyles), [props.styles]);

	return (
		<div className={cn(className, getStyles(props))} {...passThru}>
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
