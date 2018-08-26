import React from 'react';
import { themify } from './themify';
import Box from './Box';
import ErrorBoundry from './ErrorBoundry';
import Flex from './Flex';
import Text from './Text';
import Button from './Button';
import Card from './Card';
import IconButton from './IconButton';
import SvgIcon from './SvgIcon';

const App = (props) => {
	console.log(props.theme);

	return (
		<ErrorBoundry>
			<Box width={1} height={1} bg="bg.default">
				<Box maxWidth={1024} mx="auto" py={3}>
					<Card>
						<Flex flexWrap="wrap" mx={2} p={4}>
							<Box width={1} pt={2} pb={4} px={2}>
								<Button variant="contained" color="primary">
									Button
								</Button>
							</Box>
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
					</Card>
				</Box>
			</Box>
		</ErrorBoundry>
	);
};

export default themify(App);
