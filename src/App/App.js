import React, { useContext } from 'react';
import GlobalStyle from './../GlobalStyle';
import Box from './../Box';
import ErrorBoundry from './../ErrorBoundry';
import Container from './../Container';
import ButtonDemo from './ButtonDemo';
import CheckboxDemo from './CheckboxDemo';
import GridDemo from './GridDemo';
import RadioDemo from './RadioDemo';
import SwitchDemo from './SwitchDemo';
import ThemeContext from './../theme/ThemeContext';

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

function App(props = {}) {
	const { theme } = useContext(ThemeContext);
	console.log(theme);

	return (
		<ErrorBoundry>
			<GlobalStyle styles={getGlobalStyles} />
			<Box w={1} h={1}>
				<Container pt={3}>
					<SwitchDemo />
					<CheckboxDemo />
					<RadioDemo />
					<ButtonDemo />
					<GridDemo />
				</Container>
			</Box>
		</ErrorBoundry>
	);
}

export default App;
