import React from 'react';
import Box from './../Box';
import Card from './../Card';
import Divider from './../Divider';
import Flex from './../Flex';
import Typography from './../Typography';

const GridDemo = () => (
	<Card my={2}>
		<Flex flexWrap="wrap" direction={['col', 'row']} mx={2} p={4}>
			<Box mx={2} my={1} w={1 / 2}>
				<Box bg="primary.main" radius="round">
					<Typography my={1} p={1} color="primary.contrastText">
						1/2
					</Typography>
				</Box>
			</Box>
			<Box mx={2} my={1} w={1 / 2}>
				<Box bg="primary.main" radius="round">
					<Typography my={1} p={1} color="primary.contrastText">
						1/2
					</Typography>
				</Box>
			</Box>
			<Box px={2} py={1} w={1 / 3}>
				<Box bg="primary.main" radius="round">
					<Typography my={1} p={1} color="primary.contrastText">
						1/3
					</Typography>
				</Box>
			</Box>
			<Box px={2} py={1} w={1 / 3}>
				<Box bg="primary.main" radius="round">
					<Typography my={1} p={1} color="primary.contrastText">
						1/3
					</Typography>
				</Box>
			</Box>
			<Box px={2} py={1} w={1 / 3}>
				<Box bg="primary.main" radius="round">
					<Typography my={1} p={1} color="primary.contrastText">
						1/3
					</Typography>
				</Box>
			</Box>
			<Box px={2} py={1} w={1 / 4}>
				<Box bg="primary.main" radius="round">
					<Typography my={1} p={1} color="primary.contrastText">
						1/4
					</Typography>
				</Box>
			</Box>
			<Box px={2} py={1} w={1 / 4}>
				<Box bg="primary.main" radius="round">
					<Typography my={1} p={1} color="primary.contrastText">
						1/4
					</Typography>
				</Box>
			</Box>
			<Box px={2} py={1} w={1 / 4}>
				<Box bg="primary.main" radius="round">
					<Typography my={1} p={1} color="primary.contrastText">
						1/4
					</Typography>
				</Box>
			</Box>
			<Box px={2} py={1} w={1 / 4}>
				<Box bg="primary.main" radius="round">
					<Typography my={1} p={1} color="primary.contrastText">
						1/4
					</Typography>
				</Box>
			</Box>
		</Flex>
	</Card>
);

export default GridDemo;
