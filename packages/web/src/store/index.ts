import {createStore, applyMiddleware, combineReducers, Action} from 'redux';
import thunk from 'redux-thunk';
import authReducer, {AuthState} from './auth/reducer';
// import appReducer, {AppState} from './app/reducer';
// import dataReducer, {DataState} from './data/reducer';
// import events from '../events';

export const paths: any = {};

const reducers = {
  auth: authReducer
  // app: appReducer,
  // data: dataReducer,
};

export interface RootState {
  auth: AuthState;
  // app: AppState;
  // data: DataState;
}

const reducer = combineReducers(reducers);

const eventEmitter = () => (next: any) => (action: Action) => {
  // events.emit(action.type, action);
  return next(action);
};

const middleware = [thunk, eventEmitter];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

export {store};
