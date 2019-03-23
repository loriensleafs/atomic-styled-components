import React from 'react';
import Box from './../Box';
import Button from './../Button';
import Flex from './../Flex';
import IconButton from './../IconButton';
import List from './../List';
import ListItem from './../ListItem';
import ListItemText from './../ListItemText';
import Demo from './Demo';
import {
	AddShoppingCartIcon,
	AlarmIcon,
	CameraIcon,
	DeleteIcon,
	KeyboardVoiceIcon,
	SendIcon,
	SaveIcon,
} from './icons';
import { Header, Title, Paragraph } from './typography';

const Navigation = () => (
	<Box w={200} display={['none', null, null, null, 'block']} fontSize="12px">
		<List dense style={{ position: 'sticky', top: '64px' }}>
			<ListItem button>
				<ListItemText secondary="Contents" />
			</ListItem>
			<ListItem button as="a" href="#contained-buttons">
				<ListItemText secondary="Contained Buttons" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Text Buttons" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Outlined Buttons" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Floating Action Buttons" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Sizes" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Buttons with icons and label" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Icon Buttons" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Customized Buttons" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Complex Buttons" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Third-party routing library" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="API" />
			</ListItem>
		</List>
	</Box>
);

const Intro = () => (
	<>
		<Header>Buttons</Header>
		<Title>
			Buttons allow users to take actions, and make choices, with a single
			tap.
		</Title>
		<Paragraph as="div">
			<a href="https://material.io/design/components/buttons.html">
				Buttons
			</a>{' '}
			communicate actions that users can take. They are typically placed
			throughout your UI, in places like:
			<ul>
				<li>Dialogs</li>
				<li>Modal Windows</li>
				<li>Forms</li>
				<li>Cards</li>
				<li>Toolbars</li>
			</ul>
		</Paragraph>
	</>
);

const ContainedButtons = () => (
	<>
		<Title>Contained Buttons</Title>
		<Paragraph>
			<a href="https://material.io/design/components/buttons.html#contained-button">
				Contained buttons
			</a>{' '}
			are high-emphasis, distinguished by their use of elevation and fill.
			They contain actions that are primary to your app.
			<br />
			<br />
			The last example of this demo show how to use an upload button.
		</Paragraph>
		<Demo>
			<Button variant="contained" m={2}>
				Default
			</Button>
			<Button variant="contained" color="primary" m={2}>
				Primary
			</Button>
			<Button variant="contained" color="secondary" m={2}>
				Secondary
			</Button>
			<Button variant="contained" disabled m={2}>
				Disabled
			</Button>
			<Button variant="contained" href="#link" m={2}>
				Link
			</Button>
		</Demo>
	</>
);

const TextButtons = () => (
	<>
		<Title>Text Buttons</Title>
		<Paragraph as="div">
			<a href="https://material.io/design/components/buttons.html#text-button">
				Text buttons
			</a>{' '}
			are typically used for less-pronounced actions, including those
			located:
			<ul>
				<li>In dialogs</li>
				<li>In cards</li>
			</ul>
			In cards, text buttons help maintain an emphasis on card content.
		</Paragraph>
		<Demo>
			<Button m={2}>Default</Button>
			<Button color="primary" m={2}>
				Primary
			</Button>
			<Button color="secondary" m={2}>
				Secondary
			</Button>
			<Button disabled m={2}>
				Disabled
			</Button>
			<Button href="#link" m={2}>
				Link
			</Button>
		</Demo>
	</>
);

const OutlinedButtons = () => (
	<>
		<Title>Outlined Buttons</Title>
		<Paragraph>
			<a href="https://material.io/design/components/buttons.html#outlined-button">
				Text buttons
			</a>{' '}
			are medium-emphasis buttons. They contain actions that are
			important, but aren’t the primary action in an app.
		</Paragraph>
		<Title>Alternatives</Title>
		<Paragraph>
			Outlined buttons are also a lower emphasis alternative to contained
			buttons, or a higher emphasis alternative to text buttons.
		</Paragraph>
		<Demo>
			<Button variant="outlined" m={2}>
				Default
			</Button>
			<Button variant="outlined" color="primary" m={2}>
				Primary
			</Button>
			<Button variant="outlined" color="secondary" m={2}>
				Secondary
			</Button>
			<Button variant="outlined" disabled m={2}>
				Disabled
			</Button>
			<Button variant="outlined" href="#link" m={2}>
				Link
			</Button>
		</Demo>
	</>
);

const ButtonsWithIconsAndLabels = () => (
	<>
		<Title>Buttons with icons and labels</Title>
		<Paragraph>
			Sometimes you might want to have icons for certain button to enhance
			the UX of the application as we recognize logos more easily than
			plain text. For example, if you have a delete button you can label
			it with a dustbin icon.
		</Paragraph>
		<Demo>
			<Button variant="contained" color="secondary" m={2}>
				Delete
				<DeleteIcon ml={2} />
			</Button>
			<Button variant="contained" color="primary" m={2}>
				Send
				<SendIcon ml={2} />
			</Button>
			<Button variant="contained" color="secondary" m={2} disabled>
				<KeyboardVoiceIcon mr={1} />
				Talk
			</Button>
			<Button variant="contained" size="small" m={2}>
				<SaveIcon mr={2} fontSize="20px" />
				Save
			</Button>
		</Demo>
	</>
);

const IconButtons = () => (
	<>
		<Title>Icon Buttons</Title>
		<Paragraph>
			Icon buttons are commonly found in app bars and toolbars.
			<br />
			<br />
			Icons are also appropriate for toggle buttons that allow a single
			choice to be selected or deselected, such as adding or removing a
			star to an item.
		</Paragraph>
		<Demo>
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
		</Demo>
	</>
);

const ButtonSizes = () => (
	<>
		<Title>Sizes</Title>
		<Paragraph>
			To change the size of a button use the 'size' property.
		</Paragraph>
		<Demo>
			<Box>
				<Flex alignItems="center">
					<Button size="small" m={2}>
						small
					</Button>
					<Button m={2}>medium</Button>
					<Button size="large" m={2}>
						large
					</Button>
				</Flex>
				<Flex alignItems="center">
					<Button
						size="small"
						variant="outlined"
						color="primary"
						m={2}
					>
						small
					</Button>
					<Button variant="outlined" color="primary" m={2}>
						medium
					</Button>
					<Button
						size="large"
						variant="outlined"
						color="primary"
						m={2}
					>
						large
					</Button>
				</Flex>
				<Flex alignItems="center">
					<Button
						size="small"
						variant="contained"
						color="primary"
						m={2}
					>
						small
					</Button>
					<Button variant="contained" color="primary" m={2}>
						medium
					</Button>
					<Button
						size="large"
						variant="contained"
						color="primary"
						m={2}
					>
						large
					</Button>
				</Flex>
			</Box>
		</Demo>
	</>
);

export default () => (
	<Flex w={1}>
		<Box w={1} mt={5.5}>
			<Intro />
			<ContainedButtons />
			<TextButtons />
			<OutlinedButtons />
			<ButtonsWithIconsAndLabels />
			<IconButtons />
			<ButtonSizes />
		</Box>
		<Navigation />
	</Flex>
);
