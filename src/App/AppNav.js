import React, { useCallback, useState } from 'react';
import AppBar from './../AppBar';
import Box from './../Box';
import Divider from './../Divider';
import Drawer from './../Drawer';
import Flex from './../Flex';
import IconButton from './../IconButton';
import List from './../List';
import ListItem from './../ListItem';
import ListItemText from './../ListItemText';
import MenuIcon from './../svgIcons/Menu';
import Toolbar from './../Toolbar';
import Typography from './../Typography';
import merge from './../utils/merge';
import { Link } from 'react-router-dom';
import { getSpacing, getWidth } from './../system';

function DemoList(props) {
	return (
		<Box
			w={250}
			tabIndex={0}
			role="button"
			onClick={props.onClose || null}
			onKeyDown={props.onClose || null}
		>
			<Flex
				zIndex={1}
				position="sticky"
				top={1}
				hMin={[48, 56, 64]}
				direction="column"
				alignItems="center"
				bg="common.white"
			>
				<Flex px={[3, 3.5]} flex={1} alignItems="center">
					<Typography variant="subtitle1" whiteSpace="nowrap">
						Atomic Styled Components
					</Typography>
				</Flex>
				<Divider />
			</Flex>
			<List as="nav" style={{ position: 'sticky', top: 0 }}>
				<ListItem button disabled>
					<ListItemText primary="App Bar" />
				</ListItem>
				<ListItem button disabled>
					<ListItemText primary="Avatars" />
				</ListItem>
				<ListItem as={Link} to="/buttons" button>
					<ListItemText primary="Buttons" />
				</ListItem>
				<ListItem as={Link} to="/cards" button>
					<ListItemText primary="Cards" />
				</ListItem>
				<ListItem button disabled>
					<ListItemText primary="Dialogs" />
				</ListItem>
				<ListItem button disabled>
					<ListItemText primary="Dividers" />
				</ListItem>
				<ListItem as={Link} to="/drawers" button>
					<ListItemText primary="Drawers" />
				</ListItem>
				<ListItem button disabled>
					<ListItemText primary="Layout" />
				</ListItem>
				<ListItem button disabled>
					<ListItemText primary="Lists" />
				</ListItem>
				<ListItem button disabled>
					<ListItemText primary="Paper" />
				</ListItem>
				<ListItem button disabled>
					<ListItemText primary="Progress" />
				</ListItem>
				<ListItem as={Link} to="/selectioncontrols" button>
					<ListItemText primary="Selection Controls" />
				</ListItem>
				<ListItem as={Link} to="/tabs" button>
					<ListItemText primary="Tabs" />
				</ListItem>
				<ListItem button disabled>
					<ListItemText primary="Typography" />
				</ListItem>
			</List>
		</Box>
	);
}

function AppNav(props) {
	const [open, setOpen] = useState(false);
	const styles = merge(
		getWidth({
			w: [1, null, null, 'calc(100% - 250px)'],
		}),
		getSpacing({ ml: [0, 0, 250] }),
	);

	const handleClose = useCallback(() => setOpen(() => false), []);

	return (
		<Flex>
			<AppBar position="fixed" styles={styles}>
				<Toolbar>
					<Box display={['block', null, null, 'none']}>
						<IconButton
							onClick={() => setOpen(() => !open)}
							ml={-2.5}
							mr={3.5}
							color="inherit"
							aria-label="Menu"
						>
							<MenuIcon />
						</IconButton>
					</Box>

					<Box display={['none', 'block']}>
						<Typography variant="h6" color="inherit">
							Atomic Styled Components
						</Typography>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer open={open} onClose={handleClose}>
				<DemoList onClose={handleClose} />
			</Drawer>
			<Box
				as="nav"
				w={[null, null, null, 250]}
				display={['none', null, null, 'block']}
			>
				<Drawer variant="permanent" open>
					<DemoList />
				</Drawer>
			</Box>
		</Flex>
	);
}

AppNav.displayName = 'AppNav';

export default AppNav;
