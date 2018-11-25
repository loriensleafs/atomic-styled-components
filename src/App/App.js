import React, { Fragment, useContext, useState } from 'react';
import GlobalStyle from './../GlobalStyle';
import Box from './../Box';
import Flex from './../Flex';
import Paper from './../Paper';
import Slide from './../Slide';
import ErrorBoundry from './../ErrorBoundry';
import Container from './../Container';
import CardDemo from './CardDemo';
import ButtonDemo from './ButtonDemo';
import CheckboxDemo from './CheckboxDemo';
import GridDemo from './GridDemo';
import RadioDemo from './RadioDemo';
import SwitchDemo from './SwitchDemo';
import Card from './../Card';
import Dialog from './../Dialog';
import Typography from './../Typography';
import ThemeContext from './../theme/ThemeContext';
import Button from './../Button';
import cn from './../theme/className';

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

const SlideTest = props => {
	const [open, setOpen] = useState(false);
	return (
		<Fragment>
			<Button color="primary" variant="contained" onClick={() => setOpen(!open)}>
				Toggle Modal
			</Button>
			<Slide
				className={cn({ position: 'relative', zIndex: 11111111111 })}
				direction="up"
				in={open}>
				<Paper
					elevation={24}
					className={cn({
						zIndex: 10000,
						position: 'fixed',
						left: '50%',
						top: '50%',
						width: '500px',
						height: '400px',
						marginLeft: '-250px',
					})}>
					<Typography textAlign="center">Hello</Typography>
				</Paper>
			</Slide>
		</Fragment>
	);
};

const App = React.memo(function App(props = {}) {
	const { theme } = useContext(ThemeContext);
	window.theme = theme;
	console.log(theme);

	return (
		<ErrorBoundry>
			<GlobalStyle styles={getGlobalStyles} />
			<Box w={1} h={1}>
				<Container pt={3}>
					<CardDemo />
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
