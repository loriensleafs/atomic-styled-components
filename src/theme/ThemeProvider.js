import React from 'react';
import { Provider as StyleProvider } from 'styletron-react';
import { engine } from './../system/className';
import createTheme from './createTheme';
import ThemeContext from './ThemeContext';

let theme = {};

function ThemeProvider(props) {
	theme = createTheme(props.theme);

	return (
		<StyleProvider value={engine}>
			<ThemeContext.Provider value={{ theme }}>
				{props.children}
			</ThemeContext.Provider>
		</StyleProvider>
	);
}

export { theme };

export default ThemeProvider;
