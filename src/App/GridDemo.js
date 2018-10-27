import React from 'react';
import Box from './../Box';
import Card from './../Card';
import Divider from './../Divider';
import Flex from './../Flex';
import Text from './../Text';

export default () => (
	<Card my={2}>
		<Flex flexWrap="wrap" mx={2} p={4}>
			<Box px={2} py={1} width={1 / 2}>
				<Text p={1} color="primary.contrastText" bg="primary.main">
					1/2
				</Text>
			</Box>
			<Box px={2} py={1} width={1 / 2}>
				<Text p={1} color="primary.contrastText" bg="primary.main">
					1/2
				</Text>
			</Box>
			<Box px={2} py={1} width={1 / 3}>
				<Text p={1} color="primary.contrastText" bg="primary.main">
					1/3
				</Text>
			</Box>
			<Box px={2} py={1} width={1 / 3}>
				<Text p={1} color="primary.contrastText" bg="primary.main">
					1/3
				</Text>
			</Box>
			<Box px={2} py={1} width={1 / 3}>
				<Text p={1} color="primary.contrastText" bg="primary.main">
					1/3
				</Text>
			</Box>
			<Box px={2} py={1} width={1 / 4}>
				<Text p={1} color="primary.contrastText" bg="primary.main">
					1/4
				</Text>
			</Box>
			<Box px={2} py={1} width={1 / 4}>
				<Text p={1} color="primary.contrastText" bg="primary.main">
					1/4
				</Text>
			</Box>
			<Box px={2} py={1} width={1 / 4}>
				<Text p={1} color="primary.contrastText" bg="primary.main">
					1/4
				</Text>
			</Box>
			<Box px={2} py={1} width={1 / 4}>
				<Text p={1} color="primary.contrastText" bg="primary.main">
					1/4
				</Text>
			</Box>
		</Flex>
	</Card>
);
