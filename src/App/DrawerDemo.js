import React, { Fragment, useCallback, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AppBar from './../AppBar';
import Box from './../Box';
import Button from './../Button';
import DemoBox from './DemoBox';
import Drawer from './../Drawer';
import Divider from './../Divider';
import Flex from './../Flex';
import IconButton from './../IconButton';
import List from './../List';
import ListItem from './../ListItem';
import ListItemIcon from './../ListItemIcon';
import ListItemText from './../ListItemText';
import MenuIcon from './../svgIcons/Menu';
import Paper from './../Paper';
import SwipeableDrawer from './../SwipeableDrawer';
import Toolbar from './../Toolbar';
import Typography from './../Typography';
import merge from './../utils/merge';
import { cn, getBg, getSpacing, getWidth, useStyles } from './../system';
import { ChevronLeftIcon, InboxIcon, MailIcon } from './DemoIcons';
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
				<ListItemText secondary="Temporary Drawer" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Swipeable Temporary Drawer" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Responsive Drawer" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Persistent Drawer" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Mini Variant Drawer" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Permanent Drawer" />
			</ListItem>
			<List dense disablePadding>
				<Box pl={3.5}>
					<ListItem button>
						<ListItemText secondary="Full-height Navigation" />
					</ListItem>
					<ListItem button>
						<ListItemText secondary="Clipped Under The App Bar" />
					</ListItem>
				</Box>
			</List>
			<ListItem button>
				<ListItemText secondary="API" />
			</ListItem>
		</List>
	</Box>
);

const Intro = () => (
	<Fragment>
		<PageHeader>Drawer</PageHeader>
		<SectionHeader>
			Navigation drawers provide access to destinations in your app. Side
			sheets are surfaces containing supplementary content that are
			anchored to the left or right edge of the screen.
		</SectionHeader>
		<Paragraph as="div">
			<a href="https://material.io/design/components/navigation-drawer.html">
				Navigation drawers
			</a>{' '}
			provide access to destinations and app functionality, such as
			switching accounts. They can either be permanently on-screen or
			controlled by a navigation menu icon.
			<br />
			<br />
			<a href="https://material.io/design/components/sheets-side.html">
				Side sheets
			</a>{' '}
			are supplementary surfaces primarily used on tablet and desktop.
		</Paragraph>
	</Fragment>
);

const DemoList = () => (
	<Fragment>
		<List>
			<ListItem button>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="Inbox" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<MailIcon />
				</ListItemIcon>
				<ListItemText primary="Starred" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="Send email" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<MailIcon />
				</ListItemIcon>
				<ListItemText primary="Drafts" />
			</ListItem>
		</List>
		<Divider />
		<List>
			<ListItem button>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="All Mail" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<MailIcon />
				</ListItemIcon>
				<ListItemText primary="Trash" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="Spam email" />
			</ListItem>
		</List>
	</Fragment>
);

const SideList = () => (
	<Box w={250}>
		<DemoList />
	</Box>
);

const FullList = () => (
	<Box w="auto">
		<DemoList />
	</Box>
);

const TemporaryDrawer = () => {
	const [{ top, right, bottom, left }, setSide] = useState({
		top: false,
		right: false,
		bottom: false,
		left: false,
	});

	const handleToggle = useCallback(
		anchor => () =>
			setSide(state => ({ ...state, [anchor]: !state[anchor] })),
		[],
	);

	const handleClose = useCallback(
		anchor => () => setSide(state => ({ ...state, [anchor]: false })),
		[],
	);

	return (
		<Fragment>
			<SectionHeader>Temporary drawer</SectionHeader>
			<Paragraph>
				Temporary navigation drawers can toggle open or closed. Closed
				by default, the drawer opens temporarily above all other content
				until a section is selected.
				<br />
				<br />
				The Drawer can be cancelled by clicking the overlay or pressing
				the Esc key. It closes when an item is selected, handled by
				controlling the 'open' prop.
			</Paragraph>
			<DemoBox>
				<Flex justifyContent="flex-start" wrap="wrap">
					<Button
						variant="outlined"
						color="primary"
						m={1}
						onClick={handleToggle('top')}
					>
						Open Top
					</Button>
					<Button
						variant="outlined"
						color="primary"
						m={1}
						onClick={handleToggle('right')}
					>
						Open Right
					</Button>
					<Button
						variant="outlined"
						color="primary"
						m={1}
						onClick={handleToggle('bottom')}
					>
						Open Bottom
					</Button>
					<Button
						variant="outlined"
						color="primary"
						m={1}
						onClick={handleToggle('left')}
					>
						Open Left
					</Button>
				</Flex>
				<Drawer anchor="top" open={top} onClose={handleClose('top')}>
					<div
						tabIndex={0}
						role="button"
						onClick={handleClose('top')}
						onKeyDown={handleClose('top')}
					>
						<FullList />
					</div>
				</Drawer>
				<Drawer
					anchor="right"
					open={right}
					onClose={handleClose('right')}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={handleClose('right')}
						onKeyDown={handleClose('right')}
					>
						<SideList />
					</div>
				</Drawer>
				<Drawer
					anchor="bottom"
					open={bottom}
					onClose={handleClose('bottom')}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={handleClose('bottom')}
						onKeyDown={handleClose('bottom')}
					>
						<FullList />
					</div>
				</Drawer>
				<Drawer anchor="left" open={left} onClose={handleClose('left')}>
					<div
						tabIndex={0}
						role="button"
						onClick={handleClose('left')}
						onKeyDown={handleClose('left')}
					>
						<SideList />
					</div>
				</Drawer>
			</DemoBox>
		</Fragment>
	);
};

const SwipeableTemporaryDrawer = () => {
	const [{ top, right, bottom, left }, setSide] = useState({
		top: false,
		right: false,
		bottom: false,
		left: false,
	});

	const handleToggle = useCallback(
		anchor => () =>
			setSide(state => ({ ...state, [anchor]: !state[anchor] })),
		[],
	);

	const handleClose = useCallback(
		anchor => () => setSide(state => ({ ...state, [anchor]: false })),
		[],
	);

	return (
		<Fragment>
			<SectionHeader>Swipeable Temporary drawer</SectionHeader>
			<Paragraph>
				You can make the drawer swipeable with the 'SwipeableDrawer'
				component.
				<br />
				<br />
				This component comes with a 2 kB gzipped payload overhead. Some
				low-end mobile devices won't be able to follow the fingers at 60
				FPS. You can use the 'disableBackdropTransition' property to
				help.
			</Paragraph>
			<DemoBox>
				<Flex justifyContent="flex-start" wrap="wrap">
					<Button
						variant="outlined"
						color="primary"
						m={1}
						onClick={handleToggle('top')}
					>
						Open Top
					</Button>
					<Button
						variant="outlined"
						color="primary"
						m={1}
						onClick={handleToggle('right')}
					>
						Open Right
					</Button>
					<Button
						variant="outlined"
						color="primary"
						m={1}
						onClick={handleToggle('bottom')}
					>
						Open Bottom
					</Button>
					<Button
						variant="outlined"
						color="primary"
						m={1}
						onClick={handleToggle('left')}
					>
						Open Left
					</Button>
				</Flex>
				<SwipeableDrawer
					anchor="top"
					open={top}
					onClose={handleClose('top')}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={handleClose('top')}
						onKeyDown={handleClose('top')}
					>
						<FullList />
					</div>
				</SwipeableDrawer>
				<SwipeableDrawer
					anchor="right"
					open={right}
					onClose={handleClose('right')}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={handleClose('right')}
						onKeyDown={handleClose('right')}
					>
						<SideList />
					</div>
				</SwipeableDrawer>
				<SwipeableDrawer
					anchor="bottom"
					open={bottom}
					onClose={handleClose('bottom')}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={handleClose('bottom')}
						onKeyDown={handleClose('bottom')}
					>
						<FullList />
					</div>
				</SwipeableDrawer>
				<SwipeableDrawer
					anchor="left"
					open={left}
					onClose={handleClose('left')}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={handleClose('left')}
						onKeyDown={handleClose('left')}
					>
						<SideList />
					</div>
				</SwipeableDrawer>
			</DemoBox>
			<Paragraph as="div" mt={4}>
				We are using the following set of properties on this
				documentation website for optimal usability of the component:
				<br />
				<br />
				<ul>
					<li>
						iOS is hosted on high-end devices. We can enable the
						backdrop transition without dropping frames. The
						performance will be good enough.
					</li>
					<li>
						iOS has a "swipe to go back" feature that mess with the
						discovery feature. We have to disable it.
					</li>
				</ul>
				<Box mt={3} mb={4} py={3} px={4} bg="common.white">
					{`const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);`}
					<br />
					<br />
					{`<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscover={iOS} />`}
				</Box>
			</Paragraph>
		</Fragment>
	);
};

const MainContent = () => (
	<Fragment>
		<Box px={[3, 3.5]} hMin={[48, 56, 64]} />
		<Typography>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
			dolor purus non enim praesent elementum facilisis leo vel. Risus at
			ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
			rutrum quisque non tellus. Convallis convallis tellus id interdum
			velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
			sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
			integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
			eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
			quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
			vivamus at augue. At augue eget arcu dictum varius duis at
			consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
			donec massa sapien faucibus et molestie ac.
			<br />
			<br />
			Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
			ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
			elementum integer enim neque volutpat ac tincidunt. Ornare
			suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
			volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
			Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
			ornare massa eget egestas purus viverra accumsan in. In hendrerit
			gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
			aliquam sem et tortor. Habitant morbi tristique senectus et.
			Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
			euismod elementum nisi quis eleifend. Commodo viverra maecenas
			accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
			ultrices sagittis orci a.
		</Typography>
	</Fragment>
);

const ResponsiveDrawer = () => {
	const [open, setOpen] = useState(false);
	const containerRef = useRef();
	const paperStyles = merge(
		getWidth({
			w: [1, 'calc(100% - 250px)'],
		}),
		getSpacing({ ml: [0, 250] }),
	);

	const handleToggle = useCallback(() => setOpen(state => !state), []);

	const handleClose = useCallback(() => setOpen(() => false), []);

	return (
		<Fragment>
			<SectionHeader>Responsive drawer</SectionHeader>
			<Paragraph>
				The Hidden responsive helper component allows showing different
				types of drawer depending on the screen width. A temporary
				drawer is shown for small screens while a permanent drawer is
				shown for wider screens.
			</Paragraph>
			<DemoBox>
				<Paper elevation={2}>
					<Flex
						ref={containerRef}
						style={{
							transform: 'translateZ(0)',
							overflow: 'hidden',
						}}
					>
						<AppBar position="fixed" styles={paperStyles}>
							<Toolbar>
								<Box display={['block', 'none']}>
									<IconButton
										color="inherit"
										aria-label="Open drawer"
										onClick={handleToggle}
										mr={3.5}
									>
										<MenuIcon />
									</IconButton>
								</Box>
								<Typography
									variant="h6"
									color="inherit"
									whiteSpace="nowrap"
								>
									Responsive drawer
								</Typography>
							</Toolbar>
						</AppBar>
						<Drawer
							open={open}
							onClose={handleClose}
							ModalProps={{
								keepMounted: true,
								container: containerRef.current,
							}}
						>
							<SideList />
						</Drawer>
						<Box as="nav" w={[null, 250]}>
							<Box display={['none', 'block']}>
								<Drawer variant="permanent" open>
									<Box px={[3, 3.5]} hMin={[48, 56, 64]} />
									<Divider />
									<SideList />
								</Drawer>
							</Box>
						</Box>
						<Flex as="main" p={3.5} flex={1} bg="bg.default">
							<MainContent />
						</Flex>
					</Flex>
				</Paper>
			</DemoBox>
		</Fragment>
	);
};

function getPersistentStyles(props) {
	const {
		open,
		theme: { getTransition },
	} = props;

	return {
		paper: {
			...getWidth({
				w: open ? 'calc(100% - 250px)' : 1,
			}),
			...getSpacing({
				ml: open ? 250 : 0,
			}),
			transition: getTransition(
				['margin', 'width'],
				open ? 'entering' : 'leaving',
				'sharp',
			),
		},
		content: {
			flexGrow: 1,
			transition: getTransition(
				'margin',
				open ? 'entering' : 'leaving',
				'sharp',
			),
			...getBg({
				bg: 'bg.default',
			}),
			...getSpacing({
				ml: open ? 250 : 0,
				p: 3.5,
			}),
		},
	};
}
getPersistentStyles.propTypes = {
	open: PropTypes.bool,
};

const PersistentDrawer = () => {
	const containerRef = useRef();
	const [open, setOpen] = useState(false);
	const [nextProps, styles, classes] = useStyles(
		{ open },
		getPersistentStyles,
	);

	const handleToggle = useCallback(() => setOpen(state => !state), []);

	const handleClose = useCallback(() => setOpen(() => false), []);

	return (
		<Fragment>
			<SectionHeader>Persistent drawer</SectionHeader>
			<Paragraph>
				Persistent navigation drawers can toggle open or closed. The
				drawer sits on the same surface elevation as the content. It is
				closed by default and opens by selecting the menu icon, and
				stays open until closed by the user. The state of the drawer is
				remembered from action to action and session to session.
				<br />
				<br />
				When the drawer is outside of the page grid and opens, the
				drawer forces other content to change size and adapt to the
				smaller viewport.
				<br />
				<br />
				Persistent navigation drawers are acceptable for all sizes
				larger than mobile. They are not recommended for apps with
				multiple levels of hierarchy that require using an up arrow for
				navigation.
			</Paragraph>
			<DemoBox>
				<Paper elevation={2}>
					<Flex
						ref={containerRef}
						style={{
							transform: 'translateZ(0)',
							overflow: 'hidden',
						}}
					>
						<AppBar position="fixed" styles={styles.paper}>
							<Toolbar disableGutters={!open}>
								<Box
									ml={2.5}
									mr={3.5}
									display={open ? 'none' : 'block'}
								>
									<IconButton
										color="inherit"
										aria-label="Open drawer"
										onClick={handleToggle}
									>
										<MenuIcon />
									</IconButton>
								</Box>
								<Typography
									variant="h6"
									color="inherit"
									whiteSpace="nowrap"
								>
									Persistent drawer
								</Typography>
							</Toolbar>
						</AppBar>
						<Drawer open={open} variant="persistent">
							<Flex
								hMin={[48, 56, 64]}
								alignItems="center"
								justifyContent="flex-end"
								ml={-250}
								py={0}
								px={2}
							>
								<IconButton onClick={handleClose}>
									<ChevronLeftIcon />
								</IconButton>
							</Flex>
							<Divider />
							<SideList />
						</Drawer>
						<main className={classes.content}>
							<MainContent />
						</main>
					</Flex>
				</Paper>
			</DemoBox>
		</Fragment>
	);
};

const PersistentMiniVariant = () => {
	const containerRef = useRef();
	const [open, setOpen] = useState(true);
	const [nextProps, styles, classes] = useStyles(
		{ open },
		getPersistentStyles,
	);

	const handleToggle = useCallback(() => setOpen(state => !state), []);

	const handleClose = useCallback(() => setOpen(() => false), []);

	return (
		<Fragment>
			<SectionHeader>Mini variant drawer</SectionHeader>
			<Paragraph>
				In this variation, the persistent navigation drawer changes its
				width. Its resting state is as a mini-drawer at the same
				elevation as the content, clipped by the app bar. When expanded,
				it appears as the standard persistent navigation drawer.
				<br />
				<br />
				The mini variant is recommended for apps sections that need
				quick selection access alongside content.
			</Paragraph>
			<DemoBox>
				<Paper elevation={2}>
					<Flex
						ref={containerRef}
						style={{
							transform: 'translateZ(0)',
							overflow: 'hidden',
						}}
					>
						<AppBar position="fixed" styles={styles.paper}>
							<Toolbar disableGutters={!open}>
								<Box
									ml={2.5}
									mr={3.5}
									display={open ? 'none' : 'block'}
								>
									<IconButton
										color="inherit"
										aria-label="Open drawer"
										onClick={handleToggle}
									>
										<MenuIcon />
									</IconButton>
								</Box>
								<Typography
									variant="h6"
									color="inherit"
									whiteSpace="nowrap"
								>
									Persistent drawer
								</Typography>
							</Toolbar>
						</AppBar>
						<Drawer variant="permanent" open={open}>
							<Flex
								hMin={[48, 56, 64]}
								alignItems="center"
								justifyContent="flex-end"
								ml={-250}
								py={0}
								px={2}
							>
								<IconButton onClick={handleClose}>
									<ChevronLeftIcon />
								</IconButton>
							</Flex>
							<Divider />
							<SideList />
						</Drawer>
						<main className={classes.content}>
							<MainContent />
						</main>
					</Flex>
				</Paper>
			</DemoBox>
		</Fragment>
	);
};

export default () => (
	<Flex w={1}>
		<Box w={1} mt={5.5}>
			<Intro />
			<TemporaryDrawer />
			<SwipeableTemporaryDrawer />
			<ResponsiveDrawer />
			<PersistentDrawer />
		</Box>
		<Navigation />
	</Flex>
);
