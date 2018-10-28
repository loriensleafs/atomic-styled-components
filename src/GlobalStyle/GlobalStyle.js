import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { themify } from './../theme';
import { isFunc, isString } from './../utils/helpers';

const GlobalStyle = ({ styles, theme }) => {
	const GlobalStyles = isFunc(styles)
		? createGlobalStyle([ styles({ theme }) ])
		: isString(styles) ? createGlobalStyle([ styles ]) : createGlobalStyle([]);

	return <GlobalStyles />;
};

export default themify(GlobalStyle);
