import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {CognitoUser} from '@aws-amplify/auth';
import * as T from './types';

export interface AuthState {
  loading: boolean;
  user: CognitoUser | null;
  userAttributes?: any;
  userReady: any;
  ready: boolean;
}

const initialState: AuthState = {
  loading: true,
  userAttributes: null,
  user: null,
  ready: false,
  userReady: null
};

const reducer = combineReducers({
  loading: handleActions({[T.RECEIVE_USER]: () => false}, initialState.loading),
  userAttributes: handleActions(
    {
      [T.RECEIVE_USER_ATTRIBUTES]: (_state, {payload}) => payload,
      [T.SIGNED_OUT]: () => null
    },
    initialState.userAttributes
  ),
  user: handleActions(
    {
      [T.RECEIVE_USER]: (_state, {payload}) => payload,
      [T.SIGNED_OUT]: () => null
    },
    initialState.user
  ),
  ready: handleActions(
    {
      [T.RECEIVE_USER]: () => true,
      [T.SIGNED_OUT]: () => false
    },
    initialState.ready
  ),
  userReady: handleActions(
    {
      [T.USER_READY]: () => true,
      [T.SIGNED_OUT]: () => null
    },
    initialState.userReady
  )
});

export default reducer;
