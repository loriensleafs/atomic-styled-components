import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import { themify } from './../themify';
import { isFunc, isString } from './../utils/helpers';

const GlobalStyles = ({ styles, theme }) => {
	const GlobalStyle = isFunc(styles)
		? createGlobalStyle([ styles({ theme }) ])
		: isString(styles) ? createGlobalStyle([ styles ]) : createGlobalStyle([]);

	return <GlobalStyle />;
};

export default themify(GlobalStyles);
