import React from 'react';
import { themify } from './themify';
import Box from './Box';
import ErrorBoundry from './ErrorBoundry';
import Flex from './Flex';
import Text from './Text';
import Button from './Button';
import Card from './Card';
import Container from './Container';
import Divider from './Divider';
import IconButton from './IconButton';
import SvgIcon from './SvgIcon';

const ButtonDemo = () => (
	<Box my={2}>
		<Card>
			<Box width={1} py={4} px={2}>
				<Flex pb={3} justifyContent="center">
					<Button color="primary" size="small" ml={2}>
						Small
					</Button>
					<Button color="primary" ml={2}>
						Medium
					</Button>
					<Button color="primary" size="large" ml={2}>
						Large
					</Button>
				</Flex>
				<Flex pb={3} justifyContent="center">
					<Button variant="outlined" color="primary" size="small" ml={2}>
						Small
					</Button>
					<Button variant="outlined" color="primary" ml={2}>
						Medium
					</Button>
					<Button variant="outlined" color="primary" size="large" ml={2}>
						Large
					</Button>
				</Flex>
				<Flex pb={3} justifyContent="center">
					<Button variant="contained" color="primary" size="small" ml={2}>
						Small
					</Button>
					<Button variant="contained" color="primary" ml={2}>
						Medium
					</Button>
					<Button variant="contained" color="primary" size="large" ml={2}>
						Large
					</Button>
				</Flex>
			</Box>
			<Divider />
			<Flex width={1} py={4} px={2} justifyContent="center">
				<Button ml={2}>Default</Button>
				<Button color="primary" ml={2}>
					Primary
				</Button>
				<Button color="secondary" ml={2}>
					Secondary
				</Button>
				<Button disabled ml={2}>
					Disabled
				</Button>
			</Flex>
			<Divider />
			<Flex width={1} py={4} px={2} justifyContent="center">
				<Button variant="outlined" ml={2}>
					Default
				</Button>
				<Button variant="outlined" color="primary" ml={2}>
					Primary
				</Button>
				<Button variant="outlined" color="secondary" ml={2}>
					Secondary
				</Button>
				<Button variant="outlined" disabled ml={2}>
					Disabled
				</Button>
			</Flex>
			<Divider />
			<Flex width={1} py={4} px={2} justifyContent="center">
				<Button variant="contained" ml={2}>
					Default
				</Button>
				<Button variant="contained" color="primary" ml={2}>
					Primary
				</Button>
				<Button variant="contained" color="secondary" ml={2}>
					Secondary
				</Button>
				<Button variant="contained" disabled ml={2}>
					Disabled
				</Button>
			</Flex>
		</Card>
	</Box>
);

const GridDemo = () => (
	<Box my={2}>
		<Card>
			<Flex flexWrap="wrap" mx={2} p={4}>
				<Flex flexWrap="wrap" width={1} pt={4}>
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
			</Flex>
		</Card>
	</Box>
);

const App = (props) => {
	console.log(props.theme);

	return (
		<ErrorBoundry>
			<Box width={1} height={1} bg="bg.default">
				<Container pt={3}>
					<ButtonDemo />
					<GridDemo />
				</Container>
			</Box>
		</ErrorBoundry>
	);
};

export default themify(App);
