import {createAction} from 'redux-actions';
import * as T from './types';

export const receiveUser = createAction(T.RECEIVE_USER);
export const receiveUserAttributes = createAction(T.RECEIVE_USER_ATTRIBUTES);
export const signedOut = createAction(T.SIGNED_OUT);
export const oauthResponse = createAction(T.OAUTH_RESPONSE);
export const userReady = createAction(T.USER_READY);
