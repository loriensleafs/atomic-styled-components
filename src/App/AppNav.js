import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import usePrevious from '../hooks/usePrevious';
import AppBar from '../AppBar';
import Box from '../Box';
import Collapse from '../Collapse';
import Divider from '../Divider';
import Drawer from '../Drawer';
import Flex from '../Flex';
import IconButton from '../IconButton';
import List from '../List';
import ListItem from '../ListItem';
import ListItemText from '../ListItemText';
import MenuIcon from '../svgIcons/Menu';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import data from './data/navigation';
import useMedia from '../hooks/useMedia';
import merge from '../utils/merge';
import { Link } from 'react-router-dom';
import { getSpacing, getWidth, useStyles } from '../system';
import { isNil } from '../utils/helpers';

const getAppHeaderStyles = () =>
	merge(
		getWidth({ w: [1, null, null, 'calc(100% - 250px)'] }),
		getSpacing({ ml: [0, 0, 250] }),
	);

// Appbar for the documentation.
const AppHeader = ({ onToggle }) => {
	const media = useMedia();
	const { styles } = useStyles(null, getAppHeaderStyles);

	return (
		<AppBar position="fixed" styles={styles}>
			<Toolbar>
				{!media.lg && !media.xl && !media.xxl && (
					<IconButton
						onClick={onToggle}
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
	);
};

const DrawerToolbar = () => (
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
);

const DrawerContent = memo(({ onItemClick }) => {
	const [open, setOpen] = useState(false);

	return (
		<Box w={250} tabIndex={-1}>
			<DrawerToolbar />
			<List as="nav" disablePadding>
				<ListItem
					button
					key="componentDemos"
					onClick={() => setOpen(state => !state)}
				>
					<ListItemText
						primary="Component Demos"
						primaryTextProps={{ variant: 'body2' }}
					/>
				</ListItem>
				<Collapse show={open}>
					<List as="div" disablePadding key="componentDemosList">
						{data.componentDemos.sections.map(
							({ disabled, id, label, url }) => (
								<ListItem
									as={!disabled ? Link : null}
									button
									disabled={disabled}
									key={`componentDemosList-item-${id}`}
									onClick={() => onItemClick && onItemClick()}
									styles={{ root: getSpacing({ pl: 4 }) }}
									to={!disabled ? url : null}
								>
									<ListItemText
										primary={label}
										primaryTextProps={{ variant: 'body2' }}
									/>
								</ListItem>
							),
						)}
					</List>
				</Collapse>
			</List>
		</Box>
	);
});

function AppNavigation() {
	const media = useMedia();
	const isMobile = !media.lg && !media.xl && !media.xxl;
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = () => setDrawerOpen(state => !state);

	return (
		<Fragment>
			<AppHeader onToggle={() => setDrawerOpen(state => !state)} />
			<Flex>
				{isMobile && (
					<Drawer
						ModalProps={{ keepMounted: true }}
						open={drawerOpen}
						onClose={() => setDrawerOpen(false)}
					>
						<DrawerContent onItemClick={toggleDrawer} />
					</Drawer>
				)}
				{media.lg && (
					<Box as="nav" w={[null, null, null, 250]}>
						<Drawer variant="permanent">
							<DrawerContent />
						</Drawer>
					</Box>
				)}
			</Flex>
		</Fragment>
	);
}

AppNavigation.displayName = 'AppNavigation';

export default AppNavigation;
