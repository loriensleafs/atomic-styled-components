import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StyletronProvider } from 'styletron-react';
import { ThemeProvider } from 'styled-components';
import { engine } from './styled';
import theme from './theme';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { injectGlobal } from 'styled-components';

injectGlobal`* { box-sizing: border-box; } html { min-height: 100%; } html,body,#root {  position: relative; height: 100%; margin: 0; padding: 0; }`;

ReactDOM.render(
	<StyletronProvider value={engine}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</StyletronProvider>,
	document.getElementById('root'),
);
registerServiceWorker();
