import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import ThemeContext from './../theme/ThemeContext';
import { isFunc, isString } from './../utils/helpers';

function GlobalStyle({ styles }) {
	const { theme } = useContext(ThemeContext);
	const GlobalStyles = isFunc(styles)
		? createGlobalStyle([styles({ theme })])
		: isString(styles)
			? createGlobalStyle([styles])
			: createGlobalStyle([]);

	return <GlobalStyles />;
}

GlobalStyle.displayName = 'GlobalStyle';

export default GlobalStyle;
