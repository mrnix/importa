import * as React from 'react';
import {Router, navigate} from '@reach/router';
import Amplify, {Hub} from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import styles from './App.module.sass';
import Sidebar from './Sidebar';
import Files from '../Files/Files';
import DragDropProvider from './DragDropProvider';
import events from '../../common/events';
import * as authActions from '../../common/store/auth/actions';
import {RootState} from '../../common/store';
import {OAUTH_RESPONSE} from '../../common/store/auth/types';

const FileBrowser = (props: any) => {
  return (
    <div className={styles.files}>
      <Sidebar />
      <Files key={props.uri} {...props} />
    </div>
  );
};

class App extends React.Component<any> {
  state = {ready: false};
  componentDidMount() {
    this.fetchUser();

    Hub.listen('auth', async ({payload: {event, data}}) => {
      console.log('AUTH', {event, data});

      switch (event) {
        case 'signIn': {
          this.fetchUser();
          break;
        }
        case 'signOut':
          Amplify.configure({aws_appsync_authenticationType: 'AWS_IAM'});
          this.props.signedOut();
          break;
      }
    });

    events.on(OAUTH_RESPONSE, ({payload}) => {
      if (payload.redirect) {
        // @ts-ignore
        Auth._handleAuthResponse(payload.url);
      }
    });
  }

  async getCurrentUser() {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (err) {
      return null;
    }
  }
  async fetchUser() {
    const user = await this.getCurrentUser();

    Amplify.configure({
      aws_appsync_authenticationType: user
        ? 'AMAZON_COGNITO_USER_POOLS'
        : 'AWS_IAM'
    });

    console.log(user);

    this.setState({ready: true});

    this.props.receiveUser({user, session: await Auth.currentSession()});

    if (user) {
      this.props.receiveUserAttributes(user.attributes);
    }

    if (window.location.search.indexOf('?code') !== -1) {
      navigate('/');
    }
  }
  render() {
    const {ready} = this.state;

    return (
      <DragDropProvider>
        <div className={styles.root}>
          {ready && (
            <div className={styles.router}>
              <Router>
                <FileBrowser path="/" default />
              </Router>
            </div>
          )}
        </div>
      </DragDropProvider>
    );
  }
}

export default compose(
  connect(
    (state: RootState) => ({
      user: state.auth.user,
      attributes: state.auth.userAttributes
    }),
    {
      signedOut: authActions.signedOut,
      receiveUser: authActions.receiveUser,
      receiveUserAttributes: authActions.receiveUserAttributes
    }
  )
)(App);
