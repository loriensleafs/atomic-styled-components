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
import Switch from './Switch';
import SvgIcon from './SvgIcon';

const AddShoppingCartIcon = (props) => (
	<SvgIcon {...props}>
		<path fill="none" d="M0 0h24v24H0zm18.31 6l-2.76 5z" />
		<path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z" />
	</SvgIcon>
);

const AlarmIcon = (props) => (
	<SvgIcon {...props}>
		<path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
	</SvgIcon>
);

const CameraIcon = (props) => (
	<SvgIcon {...props}>
		<path fill="none" d="M0 0h24v24H0z" />
		<path d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z" />
	</SvgIcon>
);

const DeleteIcon = (props) => (
	<SvgIcon {...props}>
		<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
		<path fill="none" d="M0 0h24v24H0z" />
	</SvgIcon>
);

const KeyboardVoiceIcon = (props) => (
	<SvgIcon {...props}>
		<path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
		<path fill="none" d="M0 0h24v24H0z" />
	</SvgIcon>
);

const SendIcon = (props) => (
	<SvgIcon {...props}>
		<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
		<path fill="none" d="M0 0h24v24H0z" />
	</SvgIcon>
);

const SaveIcon = (props) => (
	<SvgIcon {...props}>
		<path fill="none" d="M0 0h24v24H0z" />
		<path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
	</SvgIcon>
);

const ButtonDemo = () => (
	<Card my={2}>
		<Box width={1} py={4} px={2}>
			<Flex pb={3} justifyContent="center" alignItems="center">
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
			<Flex pb={3} justifyContent="center" alignItems="center">
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
			<Flex pb={3} justifyContent="center" alignItems="center">
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
		<Flex width={1} py={4} px={2} justifyContent="center" alignItems="center">
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
		<Flex width={1} py={4} px={2} justifyContent="center" alignItems="center">
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
		<Flex width={1} py={4} px={2} justifyContent="center" alignItems="center">
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
		<Divider />
		<Flex width={1} py={4} px={2} justifyContent="center" alignItems="center">
			<IconButton>
				<DeleteIcon />
			</IconButton>
			<IconButton disabled>
				<DeleteIcon />
			</IconButton>
			<IconButton color="primary">
				<AlarmIcon />
			</IconButton>
			<IconButton color="secondary">
				<AddShoppingCartIcon />
			</IconButton>
			<IconButton color="secondary">
				<CameraIcon />
			</IconButton>
		</Flex>
		<Divider />
		<Flex width={1} py={4} px={2} justifyContent="center" alignItems="center">
			<Button variant="contained" ml={2}>
				Delete
				<DeleteIcon ml={2} />
			</Button>
			<Button variant="contained" color="primary" ml={2}>
				Send
				<SendIcon ml={2} />
			</Button>
			<Button variant="contained" color="secondary" ml={2} disabled>
				<KeyboardVoiceIcon mr={1} />
				Talk
			</Button>
			<Button variant="contained" size="small" ml={2}>
				<SaveIcon mr={2} fontSize="20px" />
				Save
			</Button>
		</Flex>
	</Card>
);

const SwitchDemo = () => (
	<Card my={2}>
		<Box width={1} py={4} px={2}>
			<Flex pb={3} justifyContent="center" alignItems="center">
				<Switch value="checkedA" />
			</Flex>
		</Box>
	</Card>
);

const GridDemo = () => (
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

const App = (props = {}) => {
	console.log(props.theme);

	return (
		<ErrorBoundry>
			<Box width={1} height={1}>
				<Container pt={3}>
					<SwitchDemo />
					<ButtonDemo />
					<GridDemo />
				</Container>
			</Box>
		</ErrorBoundry>
	);
};

export default themify(App);
