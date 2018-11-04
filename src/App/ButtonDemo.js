import React from 'react';
import Box from './../Box';
import Button from './../Button';
import Card from './../Card';
import Divider from './../Divider';
import Flex from './../Flex';
import IconButton from './../IconButton';
import {
	AddShoppingCartIcon,
	AlarmIcon,
	CameraIcon,
	DeleteIcon,
	KeyboardVoiceIcon,
	SendIcon,
	SaveIcon,
} from './DemoIcons';

const ButtonDemo = () => (
	<Card my={2}>
		<Box w={1} py={4} px={2}>
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
		<Divider light />
		<Flex w={1} py={4} px={2} justifyContent="center" alignItems="center">
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
		<Divider light />
		<Flex w={1} py={4} px={2} justifyContent="center" alignItems="center">
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
		<Divider light />
		<Flex w={1} py={4} px={2} justifyContent="center" alignItems="center">
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
		<Divider light />
		<Flex w={1} py={4} px={2} justifyContent="center" alignItems="center">
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
		<Divider light />
		<Flex w={1} py={4} px={2} justifyContent="center" alignItems="center">
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

export default ButtonDemo;
