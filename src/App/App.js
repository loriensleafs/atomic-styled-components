import React, { lazy, Suspense, useContext, useState } from 'react';
import ThemeContext from './../theme/ThemeContext';
import Box from './../Box';
import Button from './../Button';
import CircularProgress from './../CircularProgress';
import Container from './../Container';
import Dialog from './../Dialog';
import DialogTitle from './../DialogTitle';
import DialogContent from './../DialogContent';
import ErrorBoundry from './../ErrorBoundry';
import Fade from './../Fade';
import Flex from './../Flex';
import GlobalStyle from './../GlobalStyle';
import List from './../List';
import ListItem from './../ListItem';
import ListItemText from './../ListItemText';
import Modal from './../Modal';
import Paper from './../Paper';
import Slide from './../Slide';
import Typography from './../Typography';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

const history = createBrowserHistory();

const ButtonDemo = lazy(() => import('./ButtonDemo'));
const CardDemo = React.lazy(() => import('./CardDemo'));
// const DividerDemo = React.lazy(() => import('./DividerDemo'));
// const LayoutDemo = React.lazy(() => import('./DividerDemo'));
// const ListDemo = React.lazy(() => import('./ListDemo'));
// const PaperDemo = React.lazy(() => import('./PaperDemo'));
const SelectionControlDemo = React.lazy(() => import('./SelectionControlDemo'));
// const TypographyDemo = React.lazy(() => import('./TypographyDemo'));

const getGlobalStyles = ({ theme }) => `
	* {
		box-sizing: border-box;
	}
	html {
		margin: 0;
		min-height:100%;
		background-color: ${theme.palette.bg.default};
	}
	body, #root {
		height: 100%;
	}
`;

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

const AppNavigation = () => (
	<Box minWidth={360} maxWidth={360}>
		<List component="nav" style={{ position: 'sticky', top: 0 }}>
			<ListItem button disabled>
				<ListItemText primary="Avatars" />
			</ListItem>
			<ListItem button component={Link} to="/buttons">
				<ListItemText primary="Buttons" />
			</ListItem>
			<ListItem button component={Link} to="/cards">
				<ListItemText primary="Cards" />
			</ListItem>
			<ListItem button disabled>
				<ListItemText primary="Dividers" />
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
			<ListItem button component={Link} to="/selectioncontrols">
				<ListItemText primary="Selection Controls" />
			</ListItem>
			<ListItem button disabled>
				<ListItemText primary="Typography" />
			</ListItem>
		</List>
	</Box>
);

function App() {
	const [open, setOpen] = useState(false);
	const { theme } = useContext(ThemeContext);
	console.log(theme);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<ErrorBoundry>
			<GlobalStyle styles={getGlobalStyles} />
			<Dialog
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				onClose={handleClose}
				open={open}
				TransitionComponent={Transition}>
				<DialogTitle id="alert-dialog-title">Test Dialog</DialogTitle>
				<DialogContent>
					<Typography id="alert-dialog-description">
						Let Google help apps determine location. This means sending anonymous
						location data to Google, even when no apps are running.
					</Typography>
				</DialogContent>
			</Dialog>
			<Button onClick={handleOpen}>Open Modal</Button>
			<Router history={history}>
				<Flex w={1} h={1}>
					<AppNavigation />
					<Container w={1} pt={3}>
						<Suspense
							fallback={
								<Flex w={1} h={1} justifyContent="center" alignItems="center">
									<CircularProgress color="primary" />
								</Flex>
							}>
							<Switch>
								<Route path="/buttons" component={ButtonDemo} />
								<Route path="/cards" component={CardDemo} />
								<Route path="/selectioncontrols" component={SelectionControlDemo} />
							</Switch>
						</Suspense>
					</Container>
				</Flex>
			</Router>
		</ErrorBoundry>
	);
}

export default App;
