import React from 'react';
import Flex from './../Flex';

export default props => (
	<Flex
		position="relative"
		mb={4}
		mx="auto"
		p={4}
		justifyContent="center"
		alignItems="center"
		bg="grey.light">
		{props.children}
	</Flex>
);
