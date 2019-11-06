import * as React from 'react';
import ReactDOM from 'react-dom';
import Amplify, {Analytics} from 'aws-amplify';
import awsconfig from './backend/aws-exports';
import {Provider} from 'react-redux';
import {store} from './common/store';
import App from './components/App/App';

Amplify.configure(awsconfig);
Analytics.disable();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
