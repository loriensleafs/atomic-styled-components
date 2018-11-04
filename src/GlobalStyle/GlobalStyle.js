import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import ThemeContext from './../theme/ThemeContext';
import { isFunc, isString } from './../utils/helpers';

const GlobalStyle = ({ styles }) => {
	const { theme } = useContext(ThemeContext);
	const GlobalStyles = isFunc(styles)
		? createGlobalStyle([styles({ theme })])
		: isString(styles)
			? createGlobalStyle([styles])
			: createGlobalStyle([]);

	return <GlobalStyles />;
};

export default GlobalStyle;
