import React, { Fragment } from 'react';
import Box from './../Box';
import Button from './../Button';
import Flex from './../Flex';
import IconButton from './../IconButton';
import List from './../List';
import ListItem from './../ListItem';
import ListItemText from './../ListItemText';
import Typography from './../Typography';
import DemoBox from './DemoBox';
import {
	AddShoppingCartIcon,
	AlarmIcon,
	CameraIcon,
	DeleteIcon,
	KeyboardVoiceIcon,
	SendIcon,
	SaveIcon,
} from './DemoIcons';

const DemoNavigation = () => (
	<Box minWidth={200} maxWidth={200} style={{ fontSize: '12px' }}>
		<List dense style={{ position: 'sticky', top: 0 }}>
			<ListItem button>
				<ListItemText secondary="Contents" />
			</ListItem>
			<ListItem button component="a" href="#contained-buttons">
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

const DemoIntro = () => (
	<Fragment>
		<Typography variant="h2" mb={3}>
			Buttons
		</Typography>
		<Typography variant="h5" mb={4}>
			Buttons allow users to take actions, and make choices, with a single tap.
		</Typography>
		<Typography mb={4}>
			<a href="https://material.io/design/components/buttons.html">Buttons</a> communicate
			actions that users can take. They are typically placed throughout your UI, in places
			like:
			<ul>
				<li>Dialogs</li>
				<li>Modal Windows</li>
				<li>Forms</li>
				<li>Cards</li>
				<li>Toolbars</li>
			</ul>
		</Typography>
	</Fragment>
);

const ContainedButtons = () => (
	<Fragment>
		<Typography id="contained-buttons" variant="h4" mb={4}>
			Contained Buttons
		</Typography>
		<Typography mb={3}>
			<a href="https://material.io/design/components/buttons.html#contained-button">
				Contained buttons
			</a>{' '}
			are high-emphasis, distinguished by their use of elevation and fill. They contain
			actions that are primary to your app.
			<br />
			<br />
			The last example of this demo show how to use an upload button.
		</Typography>
		<DemoBox>
			<Button variant="contained">Default</Button>
			<Button variant="contained" color="primary" ml={3}>
				Primary
			</Button>
			<Button variant="contained" color="secondary" ml={3}>
				Secondary
			</Button>
			<Button variant="contained" disabled ml={3}>
				Disabled
			</Button>
			<Button variant="contained" href="#link" ml={3}>
				Link
			</Button>
		</DemoBox>
	</Fragment>
);

const TextButtons = () => (
	<Fragment>
		<Typography id="text-buttons" variant="h4" mb={4}>
			Text Buttons
		</Typography>
		<Typography mb={3}>
			<a href="https://material.io/design/components/buttons.html#text-button">
				Text buttons
			</a>{' '}
			are typically used for less-pronounced actions, including those located:
			<ul>
				<li>In dialogs</li>
				<li>In cards</li>
			</ul>
			In cards, text buttons help maintain an emphasis on card content.
		</Typography>
		<DemoBox>
			<Button>Default</Button>
			<Button color="primary" ml={3}>
				Primary
			</Button>
			<Button color="secondary" ml={3}>
				Secondary
			</Button>
			<Button disabled ml={3}>
				Disabled
			</Button>
			<Button href="#link" ml={3}>
				Link
			</Button>
		</DemoBox>
	</Fragment>
);

const OutlinedButtons = () => (
	<Fragment>
		<Typography id="text-buttons" variant="h4" mb={4}>
			Outlined Buttons
		</Typography>
		<Typography>
			<a href="https://material.io/design/components/buttons.html#outlined-button">
				Text buttons
			</a>{' '}
			are medium-emphasis buttons. They contain actions that are important, but aren’t the
			primary action in an app.
		</Typography>
		<br />
		<br />
		<Typography variant="h5">Alternatives</Typography>
		<br />
		<br />
		<Typography mb={3}>
			Outlined buttons are also a lower emphasis alternative to contained buttons, or a higher
			emphasis alternative to text buttons.
		</Typography>
		<DemoBox>
			<Button variant="outlined">Default</Button>
			<Button variant="outlined" color="primary" ml={3}>
				Primary
			</Button>
			<Button variant="outlined" color="secondary" ml={3}>
				Secondary
			</Button>
			<Button variant="outlined" disabled ml={3}>
				Disabled
			</Button>
			<Button variant="outlined" href="#link" ml={3}>
				Link
			</Button>
		</DemoBox>
	</Fragment>
);

const ButtonsWithIconsAndLabels = () => (
	<Fragment>
		<Typography id="text-buttons" variant="h4" mb={4}>
			Buttons with icons and labels
		</Typography>
		<Typography mb={3}>
			Sometimes you might want to have icons for certain button to enhance the UX of the
			application as we recognize logos more easily than plain text. For example, if you have
			a delete button you can label it with a dustbin icon.
		</Typography>
		<DemoBox>
			<Button variant="contained" color="secondary" ml={2}>
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
		</DemoBox>
	</Fragment>
);

const IconButtons = () => (
	<Fragment>
		<Typography id="text-buttons" variant="h4" mb={4}>
			Icon Buttons
		</Typography>
		<Typography mb={3}>
			Icon buttons are commonly found in app bars and toolbars.
			<br />
			<br />
			Icons are also appropriate for toggle buttons that allow a single choice to be selected
			or deselected, such as adding or removing a star to an item.
		</Typography>
		<DemoBox>
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
		</DemoBox>
	</Fragment>
);

export default () => (
	<Flex w={1}>
		<Box>
			<DemoIntro />
			<ContainedButtons />
			<TextButtons />
			<OutlinedButtons />
			<ButtonsWithIconsAndLabels />
			<IconButtons />
		</Box>
		<DemoNavigation />
	</Flex>
);
