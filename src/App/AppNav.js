import React, { useCallback, useState } from 'react';
import AppBar from '../AppBar';
import Box from '../Box';
import Collapse from '../Collapse';
import demos from './Demos';
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
import useMedia from '../hooks/useMedia';
import merge from '../utils/merge';
import { Link } from 'react-router-dom';
import { getSpacing, getWidth } from '../system';

const ComponentDemos = props => (
	<List as="div" disablePadding {...props}>
		{demos.map(demo => {
			const demoProps = {
				button: true,
				onClick: () => props.onClose && props.onClose(),
			};

			if (demo.url) {
				demoProps.as = Link;
				demoProps.to = demo.url;
			} else {
				demoProps.disabled = true;
			}

			return (
				<ListItem key={demo.label} {...demoProps}>
					<Box pl={3}>
						<ListItemText primary={demo.label} />
					</Box>
				</ListItem>
			);
		})}
	</List>
);

function DemoList(props) {
	const [showDemos, setShowDemos] = useState(false);
	const [showAPIs, setShowAPIs] = useState(false);

	const handleToggleDemo = useCallback(
		() => setShowDemos(state => !state),
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
					<ListItem onClick={handleToggleDemo} button>
						<ListItemText primary="Component Demos" />
					</ListItem>
					<Collapse show={showDemos}>
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

	const handleClose = useCallback(() => setOpen(false), []);

	return (
		<Flex>
			<AppBar position="fixed" styles={styles}>
				<Toolbar>
					{!isLg && !isXl && !isXxl && (
						<IconButton
							onClick={() => setOpen(!open)}
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
					<Drawer variant="permanent">
						<DemoList />
					</Drawer>
				</Box>
			)}
		</Flex>
	);
}

AppNav.displayName = 'AppNav';

export default AppNav;
