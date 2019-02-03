import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { getGrid, useStyles } from '../system';

const Grid = forwardRef((props, ref) => {
	const [{ styles }, { children, ...passThru }] = useStyles(props, getGrid);

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
