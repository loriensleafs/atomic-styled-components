import React from 'react';
import { withTheme } from 'styled-components';
import Box from './Box';
import Flex from './Flex';
import Text from './Text';
import Button from './Button';

const App = (props) => {
	console.log(props.theme);

	return (
		<Box w={1} h={1} bg="bg.default">
			<Box p={4} maxWidth={1024}>
				<Button color="primary" variant="contained">
					Button
				</Button>
				<Flex flexWrap="wrap" mt={4} mx={-2}>
					<Box px={2} py={1} width={1 / 2}>
						<Text p={1} color="text.contrast.primary" bg="primary.main">
							1/2
						</Text>
					</Box>
					<Box px={2} py={1} width={1 / 2}>
						<Text p={1} color="text.contrast.primary" bg="primary.main">
							1/2
						</Text>
					</Box>
					<Box px={2} py={1} width={1 / 3}>
						<Text p={1} color="text.contrast.primary" bg="primary.main">
							1/3
						</Text>
					</Box>
					<Box px={2} py={1} width={1 / 3}>
						<Text p={1} color="text.contrast.primary" bg="primary.main">
							1/3
						</Text>
					</Box>
					<Box px={2} py={1} width={1 / 3}>
						<Text p={1} color="text.contrast.primary" bg="primary.main">
							1/3
						</Text>
					</Box>
					<Box px={2} py={1} width={1 / 4}>
						<Text p={1} color="text.contrast.primary" bg="primary.main">
							1/4
						</Text>
					</Box>
					<Box px={2} py={1} width={1 / 4}>
						<Text p={1} color="text.contrast.primary" bg="primary.main">
							1/4
						</Text>
					</Box>
					<Box px={2} py={1} width={1 / 4}>
						<Text p={1} color="text.contrast.primary" bg="primary.main">
							1/4
						</Text>
					</Box>
					<Box px={2} py={1} width={1 / 4}>
						<Text p={1} color="text.contrast.primary" bg="primary.main">
							1/4
						</Text>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};

export default withTheme(App);
