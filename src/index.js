import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'
import { Provider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import theme from './theme'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <Provider value={ new Styletron() }>
      <App />
    </Provider>
  </ThemeProvider>
  , document.getElementById('root'));
registerServiceWorker();
