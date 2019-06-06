import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  overrides: {
      MuiStepIcon: {
          root: {
              color: '#000000', // or 'rgba(0, 0, 0, 1)'
              '&$active': {
                color: 'grey',
              },
              '&$completed': {
                color: 'green',
              },
              '&$unattempted': {
                color: 'red',
              }
          }
      }
  }
});

ReactDOM.render(<MuiThemeProvider theme={muiTheme}><Provider store={configureStore()}><App /></Provider></MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
