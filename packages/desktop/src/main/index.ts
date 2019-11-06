import {app, ipcMain, protocol} from 'electron';
import fs from 'fs-extra';
import path from 'path';
import jsonfile from 'jsonfile';
import fetch from 'node-fetch';
import events from '../common/events';
import {store} from '../common/store';
import env from './env';
import {isDevServer} from './util';
import {hideMain, showMain} from '../common/store/app/actions';
import Tree from './files/Tree';
import './auth';
import * as config from '../common/config';
const envName = env.NODE_ENV;

(global as any).fetch = fetch;
app.name = config.appName;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

const userData = app.getPath('userData').replace('Electron', config.appName);
app.setPath('userData', userData);

const {version} = jsonfile.readFileSync(
  path.join(__dirname, isDevServer() ? `../../package.json` : './package.json')
);

const homePath = app.getPath('home');
const defaultDir = path.join(homePath, config.appName);

console.log('main', {
  envName,
  version,
  env,
  cwd: process.cwd(),
  config,
  defaultDir,
  argv: process.argv
});

function handleArgs(argv: any) {
  const [cmd, p] = argv.reverse();
  console.log('second-instance', {p, cmd});

  if (!p || !cmd) {
    return;
  }

  switch (cmd) {
    default: {
      store.dispatch(showMain());
    }
  }
}

if (!app.requestSingleInstanceLock()) {
  console.log('!gotTheLock');
  app.quit();
  process.exit();
} else {
  app.on('ready', () => {
    init();
  });
}

app.on('activate', () => {
  store.dispatch(showMain());
});

app.on('second-instance', async (event, argv = []) => {
  handleArgs(argv);
});

events.on('UNLINK', () => {
  store.dispatch(hideMain());
});

async function init() {
  console.log('init');

  await fs.ensureDir(userData);

  protocol.registerFileProtocol(
    'importa',
    (request, callback) => {
      const url = request.url.substr(10);
      callback({path: url});
    },
    error => {
      if (error) console.error('Failed to register protocol');
    }
  );

  require('./window').createWindow();
  const tree = new Tree();

  tree.init({dir: path.resolve('/Users/mrnix/data')});

  app.on('before-quit', () => {
    events.emit('DEREGISTER');
    console.log('before-quit');
    events.removeAllListeners();
  });

  ipcMain.on('online-state', (e: any, isOnline: boolean) => {
    // store.dispatch(onlineState(isOnline));
  });

  ipcMain.on('quit', () => {
    console.log('QUIT');

    app.quit();
  });
}
