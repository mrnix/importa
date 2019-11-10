import * as React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Amplify from '@aws-amplify/core';
import {store} from './store';
import App from './components/App/App';
import awsconfig from './backend/aws-exports';

Amplify.configure(awsconfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
