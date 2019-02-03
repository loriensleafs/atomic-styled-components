import React, { Fragment, lazy, Suspense, useContext } from 'react';
import ThemeContext from './../theme/ThemeContext';
import AppNav from './AppNav';
import Box from './../Box';
import CircularProgress from './../CircularProgress';
import ErrorBoundry from './../ErrorBoundry';
import Flex from './../Flex';
import GlobalStyle from './../GlobalStyle';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Switch, Route } from 'react-router';

const history = createBrowserHistory();

const ButtonDemo = lazy(() => import('./ButtonDemo'));
const CardDemo = lazy(() => import('./CardDemo'));
const DialogDemo = lazy(() => import('./DialogDemo'));
const DrawerDemo = lazy(() => import('./DrawerDemo'));
const SelectionControlDemo = React.lazy(() => import('./SelectionControlDemo'));

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
	window.theme = theme;

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
									<Flex
										w={1}
										h={1}
										justifyContent="center"
										alignItems="center"
									>
										<CircularProgress color="primary" />
									</Flex>
								}
							>
								<Switch>
									<Route
										exact
										path="/"
										render={() => (
											<Box w={1} mt={5.5}>
												<div>HOME PAGE BITCHES</div>
											</Box>
										)}
									/>
									<Route
										path={`/buttons`}
										render={() => <ButtonDemo />}
									/>
									<Route
										path={`/cards`}
										render={() => <CardDemo />}
									/>
									<Route
										path={`/dialogs`}
										render={() => <DialogDemo />}
									/>
									<Route
										path={`/drawers`}
										render={() => <DrawerDemo />}
									/>
									<Route
										path={`/selectioncontrols`}
										render={() => <SelectionControlDemo />}
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
