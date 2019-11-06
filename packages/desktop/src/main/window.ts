import {app, BrowserWindow} from 'electron';
import {debounce} from 'lodash';
import qs from 'querystring';
import events from '../common/events';
import {winUrl} from './util';
import {store} from '../common/store';
import {oauthResponse} from '../common/store/auth/actions';
// import { store } from '../common/store';
// import { showMain, hideMain } from '../common/store/actions';

const {NODE_ENV} = process.env;
let win: BrowserWindow;

let hold = false;

const unhold = debounce(() => {
  hold = false;
}, 45);

const freeze = () => {
  hold = true;
  unhold();
};

export const createWindow = () => {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 480,
    minHeight: 360,
    vibrancy: 'ultra-dark',
    show: true,
    title: 'Importa',
    frame: true,
    fullscreenable: false,
    minimizable: true,
    closable: true,
    titleBarStyle: 'hiddenInset',
    resizable: NODE_ENV !== 'production',
    skipTaskbar: false,
    thickFrame: false,
    webPreferences: {
      scrollBounce: true,
      nodeIntegration: true
    }
  });

  win.on('close', event => {
    event.preventDefault();
    win.minimize();
  });

  win
    .loadURL(winUrl('index.html'))
    .catch(() => setTimeout(() => win && win.reload(), 2000));


  win.webContents.on(
    'new-window',
    (event, childUrl) => {
      if (
        !childUrl.includes('/oauth2/authorize') &&
        !childUrl.includes('/logout')
      ) {
        return;
      }

      event.preventDefault();

      const child = new BrowserWindow({
        modal: true,
        parent: win,
        width: 640,
        height: 640,
      });

      child.loadURL(childUrl);

      // @ts-ignore
      event.newGuest = child;

      const handleRedirect = (e: any, url: string) => {
        const search = new URL(url).search.slice(1);
        const query = qs.parse(search);


        if (url.includes('/error') && query.error) {
          console.log(query);
          child.close();
        }
        
        if (url.includes('/redirect') && query.code && query.state) {
          store.dispatch(oauthResponse({url, query, search, redirect: true}));
          child.close();
        }

        if (url.includes('/signout')) {
          store.dispatch(oauthResponse({url, signout: true}));
          child.close();
        }
      };

      child.webContents.on('will-navigate', handleRedirect);
      child.webContents.on('will-redirect', handleRedirect);
    }
  );
  return win;
};

app.on('before-quit', () => {
  if (win) {
    win.removeAllListeners('close');
  }
});

events.on('HIDE_MAIN', () => {
  console.log('HIDE_MAIN');

  if (hold || !win || win.isDestroyed()) {
    return;
  }

  freeze();

  win.hide();
});

events.on('SHOW_MAIN', ({payload}) => {

  if (hold) {
    return;
  }

  if (!win || win.isDestroyed()) {
    return;
  }

  if (win.isVisible()) {
    win.focus();
    return;
  }

  win.show();
  win.focus();

  setTimeout(() => {
    if (win) {
      win.focus();
    }
  }, 200);

  freeze();
});
