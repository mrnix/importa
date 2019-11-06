
import {createAction} from 'redux-actions';
import * as T from './types';

export const showMain = createAction(T.SHOW_MAIN);
export const hideMain = createAction(T.HIDE_MAIN);
export const setState = createAction(T.SET_STATE);
