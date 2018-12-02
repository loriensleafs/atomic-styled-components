import React from 'react';
import Avatar from './../Avatar';
import Box from './../Box';
import Card from './../Card';
import Divider from './../Divider';
import Flex from './../Flex';
import List from './../List';
import ListItem from './../ListItem';
import ListItemAvatar from './../ListItemAvatar';
import ListItemIcon from './../ListItemIcon';
import ListItemSecondaryAction from './../ListItemSecondaryAction';
import ListItemText from './../ListItemText';
import ListSubheader from './../ListSubheader';
import Typography from './../Typography';
import { DraftsIcon, InboxIcon } from './DemoIcons';

const ListDemo = () => (
	<Card my={2}>
		<Box w={1} maxWidth={360} py={4} px={2}>
			<List component="nav">
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
			<List component="nav">
				<ListItem button>
					<ListItemText primary="Trash" />
				</ListItem>
				<ListItem button component="a" href="#simple-list">
					<ListItemText primary="Spam" />
				</ListItem>
			</List>
		</Box>
	</Card>
);

export default ListDemo;
