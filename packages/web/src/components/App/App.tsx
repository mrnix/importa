import * as React from 'react';
import {Router} from '@reach/router';
import {connect} from 'react-redux';
import Amplify, {Hub} from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'
import {compose} from 'recompose';
import styles from './App.module.sass';
import * as authActions from '../../store/auth/actions';
import {RootState} from '../../store';
import ExportView from '../ExportView/ExportView';
import Home from '../Home/Home';

class App extends React.Component<any> {
  async componentDidMount() {
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

    await this.fetchUser();
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
    console.log(user);

    // @ts-ignore
    console.log(Auth._config);
    Amplify.configure({
      aws_appsync_authenticationType: user
        ? 'AMAZON_COGNITO_USER_POOLS'
        : 'AWS_IAM'
    });

    this.props.receiveUser(user);
  }
  handleClickLogin = () => {
    // @ts-ignore
    Auth.federatedSignIn({provider: 'Google'});
  };
  handleClickLogout = () => {
    Auth.signOut();
  };
  render() {
    const {user, ready} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.head} style={{backgroundColor: user ? '#0cf' : '#eee'}}>
          <h1>Importa</h1>
          {ready && (
            <div className={styles.user}>
              {user ? (
                <button onClick={this.handleClickLogout}>Logout</button>
              ) : (
                <button onClick={this.handleClickLogin}>Google</button>
              )}
            </div>
          )}
        </div>
        {ready && (
          <div className={styles.router}>
            <Router>
              <Home default />
              <ExportView path="/w/:id" />
            </Router>
          </div>
        )}
      </div>
    );
  }
}

export default compose(
  connect(
    (state: RootState) => ({
      user: state.auth.user,
      ready: state.auth.ready,
      attributes: state.auth.userAttributes
    }),
    {
      signedOut: authActions.signedOut,
      receiveUser: authActions.receiveUser,
      receiveUserAttributes: authActions.receiveUserAttributes
    }
  )
  // withAuthenticator
)(App);
