import React from 'react';
import { themify } from './themify';
import Box from './Box';
import ErrorBoundry from './ErrorBoundry';
import Flex from './Flex';
import Text from './Text';
import Button from './Button';
import IconButton from './IconButton';
import SvgIcon from './SvgIcon';

const App = (props) => {
	console.log(props.theme);

	return (
		<ErrorBoundry>
			<Box width={1} height={1} bg="bg.default">
				<IconButton>
					<SvgIcon>
						<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
						<path fill="none" d="M0 0h24v24H0z" />
					</SvgIcon>
				</IconButton>
				<Button variant="contained" color="primary">
					Button
				</Button>
				<Box p={4} maxWidth={1024}>
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
		</ErrorBoundry>
	);
};

export default themify(App);
