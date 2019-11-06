import * as React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Amplify, {Analytics} from 'aws-amplify';
import {store} from './store';
import App from './components/App/App';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Analytics.disable();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
