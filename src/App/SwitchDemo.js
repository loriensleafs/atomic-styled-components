import React from 'react';
import Box from './../Box';
import Card from './../Card';
import Divider from './../Divider';
import Flex from './../Flex';
import Switch from './../Switch';

export default () => (
	<Card my={2}>
		<Box w={1} py={4} px={2}>
			<Flex pb={3} justifyContent="center" alignItems="center">
				<Switch value="checkedA" />
			</Flex>
		</Box>
	</Card>
);
