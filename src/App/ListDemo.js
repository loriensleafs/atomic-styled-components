import React, { useCallback, useState } from 'react';
import Avatar from './../Avatar';
import Box from './../Box';
import Card from './../Card';
import Checkbox from './../Checkbox';
import Code from './Code';
import Collapse from './../Collapse';
import Demo from './Demo';
import Divider from './../Divider';
import ExpandMoreIcon from './../svgIcons/ExpandMore';
import Flex from './../Flex';
import IconButton from './../IconButton';
import List from './../List';
import ListItem from './../ListItem';
import ListItemAvatar from './../ListItemAvatar';
import ListItemIcon from './../ListItemIcon';
import ListItemSecondaryAction from './../ListItemSecondaryAction';
import ListItemText from './../ListItemText';
import ListSubheader from './../ListSubheader';
import Rotate from './../Rotate';
import Switch from './../Switch';
import Typography from './../Typography';
import { getSpacing } from './../system';
import {
	BeachAccessIcon,
	BlueToothIcon,
	CommentIcon,
	DraftsIcon,
	ImageIcon,
	InboxIcon,
	SendIcon,
	StarIcon,
	StarBorderIcon,
	WifiIcon,
	WorkIcon,
} from './icons';
import { Header, Title, Subtitle, Paragraph } from './typography';

const Intro = () => (
	<>
		<Header>Lists</Header>
		<Title>Lists are continuous, vertical indexes of text or images.</Title>
		<Paragraph as="div">
			<a href="https://material.io/design/components/lists.html">Lists</a>{' '}
			are a continuous group of text or images. They are composed of items
			containing primary and supplemental actions, which are represented
			by icons and text.
		</Paragraph>
	</>
);

const CardList = props => (
	<Card as={List} w={1} wMax={360} bg="common.white" {...props} />
);

const ListItemLink = props => <ListItem button as="a" {...props} />;

const SimpleList = () => (
	<>
		<Title>Simple List</Title>
		<Demo>
			<Card w={1} wMax={360} bg="common.white">
				<List as="nav">
					<ListItem button>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary="Inbox" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<DraftsIcon />
						</ListItemIcon>
						<ListItemText primary="Drafts" />
					</ListItem>
				</List>
				<Divider />
				<List as="nav">
					<ListItem button>
						<ListItemText primary="Trash" />
					</ListItem>
					<ListItemLink href="#simple-list">
						<ListItemText primary="Spam" />
					</ListItemLink>
				</List>
			</Card>
		</Demo>
		<br />
		<Paragraph>
			The last item of the previous demo shows how you can render a link:
		</Paragraph>
		<Demo bg="common.white" justifyContent="flex-start">
			<Code>
				{`
	function ListItemLink(props) {
		return <ListItem button component="a" {...props} />;
	}

	//...

	<ListItemLink href="#simple-list">
		<ListItemText primary="Spam" />
	</ListItemLink>
`}
			</Code>
		</Demo>
		<Paragraph>
			You can find a{' '}
			<a href="www.google.com">
				demo with React Router follwing this section
			</a>{' '}
			of the documentation.
		</Paragraph>
	</>
);

const NestedList = () => {
	const [open, setOpen] = useState(false);

	const handleClick = useCallback(() => setOpen(state => !state), []);

	return (
		<>
			<Title>Nested List</Title>
			<Demo>
				<CardList
					subheader={
						<ListSubheader as="div">
							Nested List Items
						</ListSubheader>
					}
				>
					<ListItem button>
						<ListItemIcon>
							<SendIcon />
						</ListItemIcon>
						<ListItemText inset primary="Sent mail" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<DraftsIcon />
						</ListItemIcon>
						<ListItemText inset primary="Drafts" />
					</ListItem>
					<ListItem button onClick={handleClick}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText inset primary="Inbox" />
						<Rotate deg={open ? 180 : 0}>
							<ExpandMoreIcon />
						</Rotate>
					</ListItem>
					<Collapse show={open}>
						<List as="div" disablePadding>
							<ListItem
								button
								styles={{ root: getSpacing({ pl: 4 }) }}
							>
								<ListItemIcon>
									<StarBorderIcon />
								</ListItemIcon>
								<ListItemText inset primary="Starred" />
							</ListItem>
						</List>
					</Collapse>
				</CardList>
			</Demo>
		</>
	);
};

const FolderList = () => (
	<>
		<Title>Folder List</Title>
		<Demo>
			<CardList>
				<ListItem>
					<Avatar>
						<ImageIcon />
					</Avatar>
					<ListItemText primary="Photos" seconary="Jan 9, 2014" />
				</ListItem>
				<ListItem>
					<Avatar>
						<WorkIcon />
					</Avatar>
					<ListItemText primary="Work" secondary="Jan 7, 2014" />
				</ListItem>
				<ListItem>
					<Avatar>
						<BeachAccessIcon />
					</Avatar>
					<ListItemText
						primary="Vacation"
						secondary="July 20, 2014"
					/>
				</ListItem>
			</CardList>
		</Demo>
	</>
);

const SelectedListItem = () => {
	const [selectedIdx, setSelectedIdx] = useState(1);

	const handleListItemClick = useCallback(
		(event, idx) => setSelectedIdx(idx),
		[],
	);

	return (
		<>
			<Title>Selected ListItem</Title>
			<Demo>
				<Card w={1} wMax={360} bg="common.white">
					<List as="nav">
						<ListItem
							button
							selected={selectedIdx === 0}
							onClick={event => handleListItemClick(event, 0)}
						>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</ListItem>
						<ListItem
							button
							selected={selectedIdx === 1}
							onClick={event => handleListItemClick(event, 1)}
						>
							<ListItemIcon>
								<DraftsIcon />
							</ListItemIcon>
							<ListItemText primary="Drafts" />
						</ListItem>
					</List>
					<Divider />
					<List as="nav">
						<ListItem
							button
							selected={selectedIdx === 2}
							onClick={event => handleListItemClick(event, 2)}
						>
							<ListItemText primary="Trash" />
						</ListItem>
						<ListItem
							button
							selected={selectedIdx === 3}
							onClick={event => handleListItemClick(event, 3)}
						>
							<ListItemText primary="Spam" />
						</ListItem>
					</List>
				</Card>
			</Demo>
		</>
	);
};

const AlignListItems = () => (
	<>
		<Title>Align list items</Title>
		<Demo>
			<CardList>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar
							alt="Remy Sharp"
							src="https://material-ui.com/static/images/avatar/1.jpg"
						/>
					</ListItemAvatar>
					<ListItemText
						primary="Brunch this weekend?"
						secondary={
							<>
								<Typography
									as="span"
									styles={{ display: 'inline' }}
									color="text.primary"
								>
									Ali Connors
								</Typography>
								{
									" - I'll be in your neighborhood doing errands this..."
								}
							</>
						}
					/>
				</ListItem>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar
							alt="Remy Sharp"
							src="https://material-ui.com/static/images/avatar/2.jpg"
						/>
					</ListItemAvatar>
					<ListItemText
						primary="Summer BBQ"
						secondary={
							<>
								<Typography
									as="span"
									styles={{ display: 'inline' }}
									color="text.primary"
								>
									to Scott, Alex, Jennifer
								</Typography>
								{
									" — Wish I could come, but I'm out of town this…"
								}
							</>
						}
					/>
				</ListItem>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar
							alt="Remy Sharp"
							src="https://material-ui.com/static/images/avatar/3.jpg"
						/>
					</ListItemAvatar>
					<ListItemText
						primary="Oui Oui"
						secondary={
							<>
								<Typography
									as="span"
									styles={{ display: 'inline' }}
									color="text.primary"
								>
									Sandra Adams
								</Typography>
								{
									' — Do you have Paris recommendations? Have you ever…'
								}
							</>
						}
					/>
				</ListItem>
			</CardList>
		</Demo>
	</>
);

const CheckboxAsPrimaryControl = () => {
	const [checked, setChecked] = useState([0]);

	const handleToggle = useCallback(
		value => () => {
			const currentIdx = checked.indexOf(value);
			const newChecked = [...checked];

			if (currentIdx === -1) {
				newChecked.push(value);
			} else {
				newChecked.splice(currentIdx, 1);
			}

			setChecked(newChecked);
		},
		[checked],
	);

	return (
		<>
			<Subtitle>Checkbox</Subtitle>
			<Paragraph>
				A checkbox can either be a primary action or a secondary action.
			</Paragraph>
			<Paragraph>
				The checkbox is the primary action and the state indicator for
				the list item. The comment button is a secondary action and a
				separate target.
			</Paragraph>
			<Demo>
				<CardList dense>
					{[0, 1, 2, 3].map(value => (
						<ListItem
							key={value}
							role={undefined}
							dense
							button
							onClick={handleToggle(value)}
						>
							<Checkbox
								checked={checked.includes(value)}
								tabIndex={-1}
								disableRipple
							/>
							<ListItemText primary={`Line item ${value + 1}`} />
							<ListItemSecondaryAction>
								<IconButton aria-label="Comments">
									<CommentIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</CardList>
			</Demo>
		</>
	);
};

const CheckboxAsSecondaryControl = () => {
	const [checked, setChecked] = useState([0]);

	const handleToggle = useCallback(
		value => () => {
			const currentIdx = checked.indexOf(value);
			const newChecked = [...checked];

			if (currentIdx === -1) {
				newChecked.push(value);
			} else {
				newChecked.splice(currentIdx, 1);
			}

			setChecked(newChecked);
		},
		[checked],
	);

	return (
		<>
			<Paragraph>
				The checkbox is the secondary action for the list item and a
				seperate target.
			</Paragraph>
			<Demo>
				<CardList dense>
					{[0, 1, 2, 3].map(value => (
						<ListItem key={value} button>
							<ListItemAvatar>
								<Avatar
									alt={`Avatar n°${value + 1}`}
									src={`https://material-ui.com/static/images/avatar/${value +
										1}.jpg`}
								/>
							</ListItemAvatar>
							<ListItemText primary={`Line item ${value + 1}`} />
							<ListItemSecondaryAction>
								<Checkbox
									onChange={handleToggle(value)}
									checked={checked.includes(value)}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</CardList>
			</Demo>
		</>
	);
};

const SwitchAsSecondaryControl = () => {
	const [checked, setChecked] = useState(['wifi']);

	const handleToggle = useCallback(
		value => () => {
			const currentIdx = checked.indexOf(value);
			const newChecked = [...checked];

			if (currentIdx === -1) {
				newChecked.push(value);
			} else {
				newChecked.splice(currentIdx, 1);
			}

			setChecked(newChecked);
		},
		[checked],
	);

	return (
		<>
			<Subtitle>Switch</Subtitle>
			<Paragraph>
				The switch is the secondary action and a seperate target.
			</Paragraph>
			<Demo>
				<CardList subheader={<ListSubheader>Settings</ListSubheader>}>
					<ListItem>
						<ListItemIcon>
							<WifiIcon />
						</ListItemIcon>
						<ListItemText primary="Wi-Fi" />
						<ListItemSecondaryAction>
							<Switch
								onChange={handleToggle('wifi')}
								checked={checked.includes('wifi')}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<BlueToothIcon />
						</ListItemIcon>
						<ListItemText primary="Bluetooth" />
						<ListItemSecondaryAction>
							<Switch
								onChange={handleToggle('bluetooth')}
								checked={checked.includes('bluetooth')}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</CardList>
			</Demo>
		</>
	);
};

const ListControls = () => (
	<>
		<Title>List Controls</Title>
		<CheckboxAsPrimaryControl />
		<CheckboxAsSecondaryControl />
		<SwitchAsSecondaryControl />
	</>
);

const PinnedSubheaderList = () => (
	<>
		<Title>Pinned Subheader List</Title>
		<Paragraph>
			Upon scrolling, subheaders remain pinned to the top of the screen
			until pushed off screen by the next subheader.
			<br />
			<br />
			This feature is relying on the CSS sticky positioning. Unfortunately
			it's{' '}
			<a href="https://caniuse.com/#search=sticky">not implemented</a> by
			all the browsers we are supporting. We default to{' '}
			<code>disableSticky</code> when not supported.
		</Paragraph>
		<Demo>
			<CardList
				hMax={360}
				style={{ overflow: 'auto' }}
				subheader={<li />}
			>
				{[0, 1, 2, 3, 4].map(sectionId => (
					<Box as="li" bg="inherit" key={`section-${sectionId}`}>
						<Box as="ul" bg="inherit" p={0}>
							<ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
							{[0, 1, 2].map(item => (
								<ListItem key={`item-${sectionId}-${item}`}>
									<ListItemText primary={`Item ${item}`} />
								</ListItem>
							))}
						</Box>
					</Box>
				))}
			</CardList>
		</Demo>
	</>
);

const InsetList = () => (
	<>
		<Title>Inset List</Title>
		<Demo>
			<CardList as="nav">
				<ListItem button>
					<ListItemIcon>
						<StarIcon />
					</ListItemIcon>
					<ListItemText inset primary="Chelsea Otakan" />
				</ListItem>
				<ListItem button>
					<ListItemText inset primary="Eric Hoffman" />
				</ListItem>
			</CardList>
		</Demo>
	</>
);

export default () => (
	<Flex w={1}>
		<Box w={1} mt={5.5}>
			<Intro />
			<SimpleList />
			<NestedList />
			<FolderList />
			<SelectedListItem />
			<AlignListItems />
			<ListControls />
			<PinnedSubheaderList />
			<InsetList />
		</Box>
	</Flex>
);
