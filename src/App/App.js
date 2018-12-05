import React, { lazy, Suspense, useContext, useState } from 'react';
import GlobalStyle from './../GlobalStyle';
import Box from './../Box';
import Flex from './../Flex';
import List from './../List';
import ListItem from './../ListItem';
import ListItemText from './../ListItemText';
import ErrorBoundry from './../ErrorBoundry';
import Container from './../Container';
import ThemeContext from './../theme/ThemeContext';
import { Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

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
	const { theme } = useContext(ThemeContext);
	console.log(theme);

	return (
		<ErrorBoundry>
			<GlobalStyle styles={getGlobalStyles} />
			<Router history={createBrowserHistory()}>
				<Flex w={1} h={1}>
					<AppNavigation />
					<Container w={1} pt={3}>
						<Suspense fallback={<div>Loading Biatch...</div>}>
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
