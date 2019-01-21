import React, { useCallback, useState } from 'react';
import AppBar from './../AppBar';
import Box from './../Box';
import Collapse from './../Collapse';
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
import useMedia from './../hooks/useMedia';
import merge from './../utils/merge';
import { Link } from 'react-router-dom';
import { getSpacing, getWidth } from './../system';

const ComponentDemos = props => {
	const listItemProps = {
		ml: 3,
		onClick: () => props.onClose && props.onClose(),
	};

	return (
		<List as="div" disablePadding {...props}>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="App Bar" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Autocomplete" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Avatars" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Badges" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Bottom Navigation" />
			</ListItem>
			<ListItem as={Link} to="/buttons" button {...listItemProps}>
				<ListItemText primary="Buttons" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Box" />
			</ListItem>
			<ListItem as={Link} to="/cards" button {...listItemProps}>
				<ListItemText primary="Cards" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Chips" />
			</ListItem>
			<ListItem as={Link} to="/dialogs" button {...listItemProps}>
				<ListItemText primary="Dialogs" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Dividers" />
			</ListItem>
			<ListItem as={Link} to="/drawers" button {...listItemProps}>
				<ListItemText primary="Drawers" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Expansion Panels" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Flexbox" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="GlobalStyle" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Grid" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Grid List" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Layout" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Lists" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Menus" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Paper" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Pickers" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Progress" />
			</ListItem>
			<ListItem
				as={Link}
				to="/selectioncontrols"
				button
				{...listItemProps}
			>
				<ListItemText primary="Selection Controls" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Selects" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Snackbars" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Steppers" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Tables" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Tabs" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Text Fields" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Tooltips" />
			</ListItem>
			<ListItem button disabled {...listItemProps}>
				<ListItemText primary="Typography" />
			</ListItem>
		</List>
	);
};

function DemoList(props) {
	const [show, setShow] = useState({
		API: false,
		demos: false,
		system: false,
		utils: false,
	});

	const handleToggle = useCallback(
		list => () => setShow(state => ({ ...state, [list]: !state[list] })),
		[],
	);

	return (
		<Box w={250} tabIndex={0}>
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
			<Box top="0px" position="sticky">
				<List as="nav">
					<ListItem onClick={handleToggle('demos')} button>
						<ListItemText primary="Component Demos" />
					</ListItem>
					<Collapse show={show.demos}>
						<ComponentDemos onClose={props.onClose || null} />
					</Collapse>
				</List>
			</Box>
		</Box>
	);
}

function AppNav() {
	const [open, setOpen] = useState(false);
	const { isLg, isXl, isXxl } = useMedia();
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
					{!isLg && !isXl && !isXxl && (
						<IconButton
							onClick={() => setOpen(() => !open)}
							ml={-2.5}
							mr={3.5}
							color="inherit"
							aria-label="Menu"
						>
							<MenuIcon />
						</IconButton>
					)}
					<Typography variant="h6" color="inherit">
						Atomic Styled Components
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				open={open}
				onClose={handleClose}
				ModalProps={{ keepMounted: true }}
			>
				<DemoList onClose={handleClose} />
			</Drawer>
			{isLg && (
				<Box as="nav" w={[null, null, null, 250]}>
					<Drawer variant="permanent" open>
						<DemoList />
					</Drawer>
				</Box>
			)}
		</Flex>
	);
}

AppNav.displayName = 'AppNav';

export default AppNav;
