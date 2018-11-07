import React from 'react';
import ThemeContext from './ThemeContext';
import createTheme from './createTheme';
import engine from './engine';
import { Provider } from 'styletron-react';

export default ({ theme = {}, children }) => (
	<Provider value={engine}>
		<ThemeContext.Provider value={{ theme: createTheme(theme) }}>
			{children}
		</ThemeContext.Provider>
	</Provider>
);
