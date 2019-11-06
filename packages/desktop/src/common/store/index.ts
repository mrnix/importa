import {createStore, applyMiddleware, combineReducers, Action} from 'redux';
import thunk from 'redux-thunk';
import {
  forwardToRenderer,
  forwardToMain,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
  getInitialStateRenderer
} from 'electron-redux';
import authReducer, {AuthState} from './auth/reducer';
import appReducer, {AppState} from './app/reducer';
import dataReducer, {DataState} from './data/reducer';
import events from '../events';

export const paths: any = {};

const reducers = {
  auth: authReducer,
  app: appReducer,
  data: dataReducer,
};

export interface RootState {
  auth: AuthState;
  app: AppState;
  data: DataState;
}

const reducer = combineReducers(reducers);
const isRenderer = process && process.type === 'renderer';

const eventEmitter = () => (next: any) => (action: Action) => {
  events.emit(action.type, action);
  return next(action);
};

const middleware = isRenderer
  ? [forwardToMain, thunk, eventEmitter]
  : [triggerAlias, thunk, forwardToRenderer, eventEmitter];

const store = createStore(
  reducer,
  isRenderer ? getInitialStateRenderer() : {},
  applyMiddleware(...middleware)
);

isRenderer ? replayActionRenderer(store) : replayActionMain(store);


export {store};
