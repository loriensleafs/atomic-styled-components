import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import Box from '../Box';
import { getGrid, useStyles } from '../system';

const Grid = forwardRef((props, ref) => {
	const {
		props: { children, ...passThru },
		styles,
	} = useStyles(props, getGrid);

	return (
		<Box ref={ref} styles={styles} {...passThru}>
			{children}
		</Box>
	);
});

Grid.displayName = 'Grid';

Grid.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	...getGrid.propTypes,
};

export default Grid;
