import React, { Fragment } from 'react';
import { themify } from './../themify';
import GlobalStyle from './../GlobalStyle';
import Box from './../Box';
import ErrorBoundry from './../ErrorBoundry';
import Container from './../Container';
import ButtonDemo from './ButtonDemo';
import GridDemo from './GridDemo';
import SwitchDemo from './SwitchDemo';

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

const App = (props = {}) => {
	console.log(props.theme);

	return (
		<Fragment>
			<GlobalStyle styles={getGlobalStyles} />
			<ErrorBoundry>
				<Box width={1} height={1}>
					<Container pt={3}>
						<SwitchDemo />
						<ButtonDemo />
						<GridDemo />
					</Container>
				</Box>
			</ErrorBoundry>
		</Fragment>
	);
};

export default themify(App);
