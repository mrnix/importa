import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import API from '@aws-amplify/api';
import events from '../common/events';
import * as T from '../common/store/auth/types';
import awsconfig from '../backend/aws-exports';
import {
  CognitoUserSession,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoAccessToken,
  CognitoUser
} from 'amazon-cognito-identity-js';
import {store} from '../common/store';
import {userReady} from '../common/store/auth/actions';

export let user: CognitoUser | null = null;

Amplify.configure(awsconfig);
API.configure(awsconfig);
Auth.configure({
  identityPoolId: awsconfig.aws_cognito_identity_pool_id,
  userPoolId: awsconfig.aws_user_pools_id,
  userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
  region: awsconfig.aws_cognito_region
});

events.on(T.SIGNED_OUT, () => {
  user = null;
  Auth.signOut();
});

events.on(T.RECEIVE_USER, async ({payload}: any) => {
  try {
    const t = Date.now();

    Amplify.configure({
      aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS'
    });

    const session = new CognitoUserSession({
      IdToken: new CognitoIdToken({IdToken: payload.session.idToken.jwtToken}),
      RefreshToken: new CognitoRefreshToken({
        RefreshToken: payload.session.refreshToken.token
      }),
      AccessToken: new CognitoAccessToken({
        AccessToken: payload.session.accessToken.jwtToken
      })
    });

    // @ts-ignore
    const cognitoUser = Auth.createCognitoUser(
      payload.user.username
    ) as CognitoUser;

    await cognitoUser.setSignInUserSession(session);

    user = await new Promise((resolve, reject) => {
      // @ts-ignore
      Auth.authCallbacks(cognitoUser, resolve, reject).onSuccess(session);
    });
    
    store.dispatch(userReady(user));
    console.log({t: Date.now() - t});
  } catch (e) {
    console.log(e);
  }
});
