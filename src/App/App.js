import React, { Fragment, lazy, Suspense, useCallback, useContext, useState } from 'react';
import ThemeContext from './../theme/ThemeContext';
import AppNav from './AppNav';
import Box from './../Box';
import Button from './../Button';
import CircularProgress from './../CircularProgress';
import Container from './../Container';
import Drawer from './../Drawer';
import ErrorBoundry from './../ErrorBoundry';
import Flex from './../Flex';
import GlobalStyle from './../GlobalStyle';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Switch, Route } from 'react-router';

const history = createBrowserHistory();

const ButtonDemo = lazy(() => import('./ButtonDemo'));
const CardDemo = lazy(() => import('./CardDemo'));
const DrawerDemo = lazy(() => import('./DrawerDemo'));
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
		margin: 0;
	}
`;

export default function App() {
	const { theme } = useContext(ThemeContext);
	console.log(theme);

	return (
		<ErrorBoundry>
			<GlobalStyle styles={getGlobalStyles} />
			<Router history={history}>
				<Fragment>
					<AppNav />
					<Flex ml={[null, null, null, 250]}>
						<Box w={1} wMax={1200} h={1} ml="auto" mr="auto" pt={3}>
							<Suspense
								fallback={
									<Flex w={1} h={1} justifyContent="center" alignItems="center">
										<CircularProgress color="primary" />
									</Flex>
								}>
								<Switch>
									<Route path={`/buttons`} component={ButtonDemo} />
									<Route path={`/cards`} component={CardDemo} />
									<Route path={`/drawers`} component={DrawerDemo} />
									<Route
										path={`/selectioncontrols`}
										component={SelectionControlDemo}
									/>
								</Switch>
							</Suspense>
						</Box>
					</Flex>
				</Fragment>
			</Router>
		</ErrorBoundry>
	);
}
