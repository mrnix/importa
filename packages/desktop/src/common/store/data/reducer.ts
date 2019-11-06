import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import * as T from './types';

export interface FolderItem {
  item: Item;
  items: Item[];
}

export interface Items {
  [fileName: string]: Item;
}

export interface Item {
  name: string;
  ino: number;
  fullPath: string;
  isFolder: boolean;
  children: string[];
}

export interface DataState {
  tree: Item;
  items: Items;
  open: any;
  dir?: string;
  sync: any;
  thumbs: any;
}

export const rootItem: Item = {
  name: '',
  isFolder: true,
  fullPath: '',
  children: [],
  ino: 0
};

const initialState: DataState = {
  tree: rootItem,
  items: {},
  sync: {},
  dir: '',
  open: {},
  thumbs: {}
};

const reducer = combineReducers({
  tree: handleActions(
    {[T.RECEIVE_TREE]: (_state, {payload}) => payload},
    initialState.tree
  ),
  items: handleActions(
    {[T.ITEMS]: (_state, {payload}: any) => payload.items},
    initialState.items
  ),
  dir: handleActions(
    {[T.ITEMS]: (_state, {payload}: any) => payload.dir},
    initialState.dir
  ),
  open: handleActions(
    {
      [T.EXPAND]: (_state, {payload}) => ({
        ..._state,
        [payload.fullPath]: payload.open
      })
    },
    initialState.open
  ),
  thumbs: handleActions(
    {
      [T.THUMB_CREATED]: (_state, {payload}) => {
        if (!payload.isThumb) {
          return _state;
        }
        return {
          ..._state,
          [payload.fullPath]: {
            ..._state[payload.fullPath],
            src: payload.dest
          }
        };
      }
    },
    initialState.thumbs
  )
});

export default reducer;
