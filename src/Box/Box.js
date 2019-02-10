import React, { forwardRef } from 'react';
import { getBox, useStyles } from '../system';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const Box = forwardRef((props, ref) => {
	const [
		{ classes },
		{ children, className, as: Component, ...passThru },
	] = useStyles(props, getBox);

	return (
		<Component ref={ref} className={classes} {...passThru}>
			{children}
		</Component>
	);
});

Box.displayName = 'Box';

Box.propTypes = {
	...componentPropType,
	...getBox.propTypes,
	...stylesPropType,
};

Box.defaultProps = {
	as: 'div',
};

export default Box;
