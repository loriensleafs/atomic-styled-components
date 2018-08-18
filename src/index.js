/* eslint-disable no-unused-vars */

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { Provider as StyletronProvider } from 'styletron-react';
import { ThemeProvider, theme } from './theme';
import { engine } from './themify';
import { injectGlobal } from 'styled-components';

injectGlobal`* { box-sizing: border-box; } html { min-height: 100%; } html,body,#root {  position: relative; height: 100%; margin: 0; padding: 0; }`;

ReactDOM.render(
	<StyletronProvider value={engine}>
		<ThemeProvider value={theme}>
			<App />
		</ThemeProvider>
	</StyletronProvider>,
	document.getElementById('root'),
);
registerServiceWorker();
