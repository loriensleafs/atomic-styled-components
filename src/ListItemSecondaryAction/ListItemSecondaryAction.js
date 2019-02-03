import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from '../system/className';
import merge from '../utils/merge';
import { isFn } from '../utils/helpers';
import { stylesPropType } from '../utils/propTypes';

const baseStyles = {
	position: 'absolute',
	top: '50%',
	right: '4px',
	transform: 'translate(-50%)',
};

function ListItemSecondaryAction(props) {
	const {
		children,
		className: classNameProp,
		styles: stylesProp,
		...passThru
	} = props;
	const styles = useMemo(
		() =>
			merge(
				baseStyles,
				isFn(stylesProp) ? stylesProp(props) : stylesProp || {},
			),
		[props],
	);
	const className = useMemo(() => cn(classNameProp, styles), [
		classNameProp,
		styles,
	]);

	return (
		<div className={className} {...passThru}>
			{children}
		</div>
	);
}

ListItemSecondaryAction.displayName = 'ListItemSecondaryAction';

ListItemSecondaryAction.propTypes = {
	// Content of the component, normally an `IconButton` or selection control.
	children: PropTypes.node,
	className: PropTypes.string,
	...stylesPropType,
};

export default ListItemSecondaryAction;
