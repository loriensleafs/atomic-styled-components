import React from 'react';
import GlobalStyle from './../GlobalStyle';
import Box from './../Box';
import ErrorBoundry from './../ErrorBoundry';
import Container from './../Container';
import ButtonDemo from './ButtonDemo';
import GridDemo from './GridDemo';
import SwitchDemo from './SwitchDemo';
import { themify } from './../theme';

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
		<ErrorBoundry>
			<GlobalStyle styles={getGlobalStyles} />
			<Box w={1} h={1}>
				<Container pt={3}>
					<SwitchDemo />
					<ButtonDemo />
					<GridDemo />
				</Container>
			</Box>
		</ErrorBoundry>
	);
};

export default themify(App);
