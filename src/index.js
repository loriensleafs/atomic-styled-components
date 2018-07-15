import React from 'react';
import ReactDOM from 'react-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<StyletronProvider value={new Styletron()}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</StyletronProvider>,
	document.getElementById('root'),
);
registerServiceWorker();
