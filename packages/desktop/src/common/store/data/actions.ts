import {createAction} from 'redux-actions';
import * as T from './types';

export const requestThumbs = createAction(T.REQUEST_THUMBS);
export const thumbCreated = createAction(T.THUMB_CREATED);
export const share = createAction(T.SHARE);
export const createExport = createAction(T.CREATE_EXPORT);
export const receiveItems = createAction(T.ITEMS);
