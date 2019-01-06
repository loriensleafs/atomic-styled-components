import React, { forwardRef } from 'react';
import Box from '../Box';
import { getFlexbox, useStyles } from './../system';

const Flex = forwardRef((props, ref) => {
	const [{ children, ...passThru }, styles] = useStyles(props, getFlexbox);

	return (
		<Box ref={ref} styles={styles} {...passThru}>
			{children}
		</Box>
	);
});

Flex.displayName = 'Flex';

Flex.propTypes = {
	...getFlexbox.propTypes,
};

Flex.defaultProps = {
	inline: false,
};

export default Flex;
