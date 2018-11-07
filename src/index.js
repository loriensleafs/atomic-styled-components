/* eslint-disable no-unused-vars */

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { ThemeProvider } from './theme';

ReactDOM.render(
	<ThemeProvider theme={{}}>
		<App />
	</ThemeProvider>,
	document.getElementById('root'),
);
registerServiceWorker();
