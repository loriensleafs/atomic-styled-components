/* eslint-disable no-unused-vars */

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { Provider as StyletronProvider } from 'styletron-react';
import { ThemeProvider } from './theme';
import { engine } from './themify';

ReactDOM.render(
	<StyletronProvider value={engine}>
		<ThemeProvider theme={{}}>
			<App />
		</ThemeProvider>
	</StyletronProvider>,
	document.getElementById('root'),
);
registerServiceWorker();
