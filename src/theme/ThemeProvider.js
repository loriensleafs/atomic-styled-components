import React from 'react';
import ThemeContext from './ThemeContext';
import createTheme from './createTheme';
import { engine } from './../system/className';
import { Provider as StyleProvider } from 'styletron-react';

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
