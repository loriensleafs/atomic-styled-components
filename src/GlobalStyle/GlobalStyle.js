import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import ThemeContext from './../theme/ThemeContext';
import { isFn, isStr } from './../utils/helpers';

function GlobalStyle({ styles }) {
	const { theme } = useContext(ThemeContext);
	const GlobalStyles = isFn(styles)
		? createGlobalStyle([styles({ theme })])
		: isStr(styles)
		? createGlobalStyle([styles])
		: createGlobalStyle([]);

	return <GlobalStyles />;
}

GlobalStyle.displayName = 'GlobalStyle';

export default GlobalStyle;
