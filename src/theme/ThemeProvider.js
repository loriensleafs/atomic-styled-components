import React from 'react';
import ThemeContext from './ThemeContext';
import createTheme from './createTheme';

export default ({ theme = {}, children }) => (
	<ThemeContext.Provider value={{ theme: createTheme(theme) }}>{children}</ThemeContext.Provider>
);
