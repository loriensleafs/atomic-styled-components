import React, { Fragment, useCallback, useState } from 'react';
import AddIcon from './../svgIcons/Add';
import AppBar from './../AppBar';
import Avatar from './../Avatar';
import Box from './../Box';
import Button from './../Button';
import CloseIcon from './../svgIcons/Close';
import DemoBox from './DemoBox';
import Dialog from './../Dialog/Dialog';
import DialogActions from './../DialogActions';
import DialogContent from './../DialogContent';
import DialogTitle from './../DialogTitle';
import Divider from './../Divider';
import Flex from './../Flex';
import IconButton from './../IconButton';
import List from './../List';
import ListItem from './../ListItem';
import ListItemAvatar from './../ListItemAvatar';
import ListItemText from './../ListItemText';
import Slide from './../Slide';
import Toolbar from '../Toolbar';
import Typography from './../Typography';
import UnorderedList from './UnorderedList';
import { PersonIcon } from './DemoIcons';
import { PageHeader, SectionHeader, Paragraph } from './DemoTypography';

const Navigation = () => (
	<Box
		w={200}
		pt={5}
		display={['none', null, null, null, 'block']}
		fontSize="12px"
	>
		<List dense style={{ position: 'sticky', top: '64px' }}>
			<ListItem button>
				<ListItemText secondary="Contents" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Simple Dialogs" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Alerts" />
			</ListItem>
			<ListItem button disabled>
				<ListItemText secondary="Form dialogs" />
			</ListItem>
			<ListItem button disabled>
				<ListItemText secondary="Customized Dialog" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Full-screen dialogs" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Optional Sizes" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Responsive full-screen" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Confirmation dialogs" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Accessibility" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Scrolling long content" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Draggable dialog" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Performance" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="API" />
			</ListItem>
		</List>
	</Box>
);

const Intro = () => (
	<Fragment>
		<PageHeader>Dialogs</PageHeader>
		<SectionHeader>
			Dialogs inform users about a task and can contain critical
			information, require decisions, or involve multiple tasks.
		</SectionHeader>
		<Paragraph as="div">
			A{' '}
			<a href="https://material.io/design/components/dialogs.html">
				Dialog
			</a>{' '}
			is a type of{' '}
			<a href="https://material-ui.com/utils/modal/">modal</a> window that
			appears in front of app content to provide critical information or
			ask for a decision. Dialogs disable all app functionality when they
			appear, and remain on screen until confirmed, dismissed, or a
			required action has been taken.
			<br />
			<br />
			Dialogs are purposefully interruptive, so they should be used
			sparingly.
		</Paragraph>
	</Fragment>
);

const emails = ['username@gmail.com', 'user02@gmail.com'];

const SimpleDialog = props => {
	const { onClose, selectedValue, ...passThru } = props;

	const handleClose = useCallback(() => onClose(selectedValue), []);

	const handleListItemClick = useCallback(value => onClose(value), []);

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			{...passThru}
		>
			<DialogTitle id="simple-dialog-title">
				Set backup account
			</DialogTitle>
			<div>
				<List>
					{emails.map(email => (
						<ListItem
							button
							onClick={() => handleListItemClick(email)}
							key={email}
						>
							<ListItemAvatar>
								<Avatar bg="primary.light" color="primary.dark">
									<PersonIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={email} />
						</ListItem>
					))}
					<ListItem
						button
						onClick={() => handleListItemClick('addAccount')}
					>
						<ListItemAvatar>
							<Avatar bg="grey.main" color="white">
								<AddIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="add account" />
					</ListItem>
				</List>
			</div>
		</Dialog>
	);
};

const SimpleDialogs = () => {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(emails[1]);

	const handleOpen = useCallback(() => setOpen(true), []);

	const handleClose = useCallback(value => {
		setOpen(false);
		setSelectedValue(() => value);
	}, []);

	return (
		<Fragment>
			<SectionHeader>Simple Dialogs</SectionHeader>
			<Paragraph mb={0}>
				Simple dialogs can provide additional details or actions about a
				list item. For example, they can display avatars, icons,
				clarifying subtext, or orthogonal actions (such as adding an
				account).
				<br />
				<br />
				Touch mechanics:
			</Paragraph>
			<UnorderedList mb={4} px={[3.5, 4, 5]}>
				<li>
					Choosing an option immediately commits the option and closes
					the menu.
				</li>
				<li>
					Touching outside of the dialog, or pressing Back, cancels
					the action and closes the dialog.
				</li>
			</UnorderedList>
			<DemoBox direction="column">
				<Typography variant="subtitle1">
					Selected: {selectedValue}
				</Typography>
				<br />
				<Button color="primary" variant="outlined" onClick={handleOpen}>
					Open simple dialog
				</Button>
				<SimpleDialog
					selectedValue={selectedValue}
					open={open}
					onClose={handleClose}
				/>
			</DemoBox>
		</Fragment>
	);
};

const Transition = props => <Slide direction="up" {...props} />;

const FullScreenDialogs = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = useCallback(() => setOpen(true), []);

	const handleClose = useCallback(() => setOpen(false), []);

	return (
		<Fragment>
			<SectionHeader>Full-screen dialogs</SectionHeader>
			<DemoBox justifyContent="center">
				<Button color="primary" variant="outlined" onClick={handleOpen}>
					Open full-screen dialog
				</Button>
				<Dialog
					open={open}
					onClose={handleClose}
					TransitionComponent={Transition}
					fullScreen
				>
					<AppBar styles={{ position: 'relative' }}>
						<Toolbar>
							<IconButton
								aria-label="Close"
								color="inherit"
								onClick={handleClose}
								mr={2}
							>
								<CloseIcon />
							</IconButton>
							<Typography
								variant="h6"
								color="inherit"
								styles={{ flex: 1 }}
							>
								Sound
							</Typography>
							<Button color="inherit" onClick={handleClose}>
								Save
							</Button>
						</Toolbar>
					</AppBar>
					<List>
						<ListItem button>
							<ListItemText
								primary="Phone ringtone"
								secondary="Titania"
							/>
						</ListItem>
						<Divider />
						<ListItem button>
							<ListItemText
								primary="Default notification rington"
								secondary="Tethys"
							/>
						</ListItem>
					</List>
				</Dialog>
			</DemoBox>
		</Fragment>
	);
};

const AlertDialog = props => (
	<Dialog
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
		{...props}
	>
		<DialogTitle id="alert-dialog-title">
			Use Google's locatin service ?
		</DialogTitle>
		<DialogContent>
			<Typography
				id="alert-dialog-description"
				as="p"
				variant="subtitle1"
				color="text.secondary"
				fontFamily="ui"
			>
				Let Google help apps determine location. This means sending
				anonymous location data to Google, even when no apps are
				running.
			</Typography>
		</DialogContent>
		<DialogActions>
			<Button onClick={props.onClose} color="primary">
				Disagree
			</Button>
			<Button onClick={props.onClose} color="primary" autoFocus>
				Agree
			</Button>
		</DialogActions>
	</Dialog>
);

const AlertDialogs = props => {
	const [open, setOpen] = useState({
		fadeInAlert: false,
		slideInAlert: false,
	});

	const handleOpen = useCallback(
		alertType => () => setOpen(state => ({ ...state, [alertType]: true })),
		[],
	);

	const handleClose = useCallback(
		alertType => () => setOpen(state => ({ ...state, [alertType]: false })),
		[],
	);

	return (
		<Fragment>
			<SectionHeader>Alerts</SectionHeader>
			<Paragraph mb={0}>
				Alerts are urgent interruptions, requiring acknowledgement, that
				inform the user about a situation.
				<br />
				<br />
				Most alerts don't need titles. They summarize a decision in a
				sentence or two by either:
			</Paragraph>
			<UnorderedList mb={4} px={[3.5, 4, 5]}>
				<li>Asking a question (e.g. "Delete this conversation?")</li>
				<li>Making a statement related to the action buttons</li>
			</UnorderedList>
			<Paragraph>
				Use title bar alerts only for high-risk situations, such as the
				potential loss of connectivity. Users should be able to
				understand the choices based on the title and button text alone.
				<br />
				<br />
				If a title is required:
			</Paragraph>
			<UnorderedList mb={4} px={[3.5, 4, 5]}>
				<li>
					Use a clear question or statement with an explanation in the
					content area, such as "Erase USB storage?".
				</li>
				<li>
					Avoid apologies, ambiguity, or questions, such as “Warning!”
					or “Are you sure?”
				</li>
			</UnorderedList>
			<DemoBox justifyContent="center">
				<Button
					color="primary"
					variant="outlined"
					onClick={handleOpen('fadeInAlert')}
				>
					Open alert dialog
				</Button>
				<AlertDialog
					open={open.fadeInAlert}
					onClose={handleClose('fadeInAlert')}
				/>
			</DemoBox>
			<Paragraph>
				You can also swap out the transition, the next example uses
				Slide.
			</Paragraph>
			<DemoBox justifyContent="center">
				<Button
					color="primary"
					variant="outlined"
					onClick={handleOpen('slideInAlert')}
				>
					slide in alert dialog
				</Button>
				<AlertDialog
					open={open.slideInAlert}
					onClose={handleClose('slideInAlert')}
					TransitionComponent={Transition}
				/>
			</DemoBox>
		</Fragment>
	);
};

const OptionalDialogSizes = () => {
	return (
		<Fragment>
			<SectionHeader>Optional sizes</SectionHeader>
			<Paragraph>
				You can set a dialog maximum width by using the maxWidth
				enumerable in combination with the fullWidth boolean. When the
				fullWidth property is true, the dialog will adapt based on the
				maxWidth value.
			</Paragraph>
			<DemoBox />
		</Fragment>
	);
};

const ScrollableDialogs = () => {
	const [open, setOpen] = useState(false);
	const [scroll, setScroll] = useState('paper');

	const handleOpen = useCallback(
		scrollType => () => {
			setOpen(true);
			setScroll(() => scrollType);
		},
		[],
	);

	const handleClose = useCallback(() => setOpen(false), []);

	return (
		<Fragment>
			<SectionHeader>Scrolling long content</SectionHeader>
			<Paragraph>
				When dialogs become too long for the user’s viewport or device,
				they scroll.
			</Paragraph>
			<UnorderedList mb={4} px={[3.5, 4, 5]}>
				<li>
					<code>scroll=paper</code> the content of the dialog scrolls
					within the paper element.
				</li>
				<li>
					<code>scroll=body</code> the content of the dialog scrolls
					within the body element.
				</li>
			</UnorderedList>
			<DemoBox justifyContent="center">
				<Button
					color="primary"
					m={2}
					variant="outlined"
					onClick={handleOpen('paper')}
				>
					scroll=paper
				</Button>
				<Button
					color="primary"
					m={2}
					variant="outlined"
					onClick={handleOpen('body')}
				>
					scroll=body
				</Button>
				<Dialog
					open={open}
					onClose={handleClose}
					scroll={scroll}
					aria-labelledby="scroll-dialog-title"
				>
					<DialogTitle id="scroll-dialog-title">
						Subscribe
					</DialogTitle>
					<DialogContent>
						<Typography
							id="alert-dialog-description"
							as="p"
							variant="subtitle1"
							color="text.secondary"
							fontFamily="ui"
						>
							Cras mattis consectetur purus sit amet fermentum.
							Cras justo odio, dapibus ac facilisis in, egestas
							eget quam. Morbi leo risus, porta ac consectetur ac,
							vestibulum at eros. Praesent commodo cursus magna,
							vel scelerisque nisl consectetur et. Vivamus
							sagittis lacus vel augue laoreet rutrum faucibus
							dolor auctor. Aenean lacinia bibendum nulla sed
							consectetur. Praesent commodo cursus magna, vel
							scelerisque nisl consectetur et. Donec sed odio dui.
							Donec ullamcorper nulla non metus auctor fringilla.
							Cras mattis consectetur purus sit amet fermentum.
							Cras justo odio, dapibus ac facilisis in, egestas
							eget quam. Morbi leo risus, porta ac consectetur ac,
							vestibulum at eros. Praesent commodo cursus magna,
							vel scelerisque nisl consectetur et. Vivamus
							sagittis lacus vel augue laoreet rutrum faucibus
							dolor auctor. Aenean lacinia bibendum nulla sed
							consectetur. Praesent commodo cursus magna, vel
							scelerisque nisl consectetur et. Donec sed odio dui.
							Donec ullamcorper nulla non metus auctor fringilla.
							Cras mattis consectetur purus sit amet fermentum.
							Cras justo odio, dapibus ac facilisis in, egestas
							eget quam. Morbi leo risus, porta ac consectetur ac,
							vestibulum at eros. Praesent commodo cursus magna,
							vel scelerisque nisl consectetur et. Vivamus
							sagittis lacus vel augue laoreet rutrum faucibus
							dolor auctor. Aenean lacinia bibendum nulla sed
							consectetur. Praesent commodo cursus magna, vel
							scelerisque nisl consectetur et. Donec sed odio dui.
							Donec ullamcorper nulla non metus auctor fringilla.
							Cras mattis consectetur purus sit amet fermentum.
							Cras justo odio, dapibus ac facilisis in, egestas
							eget quam. Morbi leo risus, porta ac consectetur ac,
							vestibulum at eros. Praesent commodo cursus magna,
							vel scelerisque nisl consectetur et. Vivamus
							sagittis lacus vel augue laoreet rutrum faucibus
							dolor auctor. Aenean lacinia bibendum nulla sed
							consectetur. Praesent commodo cursus magna, vel
							scelerisque nisl consectetur et. Donec sed odio dui.
							Donec ullamcorper nulla non metus auctor fringilla.
							Cras mattis consectetur purus sit amet fermentum.
							Cras justo odio, dapibus ac facilisis in, egestas
							eget quam. Morbi leo risus, porta ac consectetur ac,
							vestibulum at eros. Praesent commodo cursus magna,
							vel scelerisque nisl consectetur et. Vivamus
							sagittis lacus vel augue laoreet rutrum faucibus
							dolor auctor. Aenean lacinia bibendum nulla sed
							consectetur. Praesent commodo cursus magna, vel
							scelerisque nisl consectetur et. Donec sed odio dui.
							Donec ullamcorper nulla non metus auctor fringilla.
							Cras mattis consectetur purus sit amet fermentum.
							Cras justo odio, dapibus ac facilisis in, egestas
							eget quam. Morbi leo risus, porta ac consectetur ac,
							vestibulum at eros. Praesent commodo cursus magna,
							vel scelerisque nisl consectetur et. Vivamus
							sagittis lacus vel augue laoreet rutrum faucibus
							dolor auctor. Aenean lacinia bibendum nulla sed
							consectetur. Praesent commodo cursus magna, vel
							scelerisque nisl consectetur et. Donec sed odio dui.
							Donec ullamcorper nulla non metus auctor fringilla.
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={handleClose} m={2}>
							Cancel
						</Button>
						<Button color="primary" onClick={handleClose} m={2}>
							Subscribe
						</Button>
					</DialogActions>
				</Dialog>
			</DemoBox>
		</Fragment>
	);
};

export default () => (
	<Flex w={1}>
		<Box w={1} mt={5.5}>
			<Intro />
			<SimpleDialogs />
			<AlertDialogs />
			<FullScreenDialogs />
			<ScrollableDialogs />
		</Box>
		<Navigation />
	</Flex>
);
