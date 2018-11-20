import React, { useContext, useState } from 'react';
import GlobalStyle from './../GlobalStyle';
import Box from './../Box';
import Flex from './../Flex';
import Paper from './../Paper';
import Slide from './../Slide';
import ErrorBoundry from './../ErrorBoundry';
import Container from './../Container';
import ButtonDemo from './ButtonDemo';
import CheckboxDemo from './CheckboxDemo';
import GridDemo from './GridDemo';
import RadioDemo from './RadioDemo';
import SwitchDemo from './SwitchDemo';
import Dialog from './../Dialog';
import Typography from './../Typography';
import ThemeContext from './../theme/ThemeContext';
import Button from './../Button';

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

const Transition = React.memo(function Transition(props) {
	return <Slide direction="up" {...props} />;
});

const App = React.memo(function App(props = {}) {
	const { theme } = useContext(ThemeContext);
	const [open, setOpen] = useState(false);
	window.theme = theme;
	console.log(theme);

	return (
		<ErrorBoundry>
			<GlobalStyle styles={getGlobalStyles} />
			<Dialog
				open={open}
				onClose={() => setOpen(!open)}
				TransitionComponent={Transition}
				fullScreen>
				<Typography textAlign="center">Hello</Typography>
			</Dialog>
			<Box w={1} h={1}>
				<Button color="primary" variant="contained" onClick={() => setOpen(!open)}>
					Toggle Modal
				</Button>
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
});

export default App;
