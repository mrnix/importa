const EventEmitter = require('events');
const {app} = require('electron');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

class Watcher extends EventEmitter {
  constructor({dir}) {
    super();
    this.dir = dir;
  }
  start() {
    return new Promise(async (resolve, reject) => {
      console.log('Start watching', this.dir);

      this.watcher = chokidar.watch(this.dir, {
        ignored: /[\/\\]\./,
        persistent: true
      });

      this.watcher
        .on('add', this.handleAdd)
        .on('change', this.handleChange)
        .on('unlink', this.handleRemove)
        .on('error', e => {
          reject(e);
          this.handleError(e);
        })
        .on('ready', () => {
          console.log(`Watching ${this.dir}`);
          this.emit('ready');
          resolve();
        });
    });
  }

  restart() {
    this.watcher && this.watcher.close();
    this.start();
  }

  handleAdd = async path => {
    this.emit('add', path);
  };

  handleChange = async path => {
    this.emit('change', path);
  };

  handleRemove = async path => {
    this.emit('remove', path);
  };

  handleError = e => console.log(e);

  async stop() {
    if (this.watcher) {
      this.watcher.close();
    }
  }

  update({dir} = {}) {
    if (this.dir === dir || !dir) return;
    this.dir = dir;
    db.run('insert or replace into kv (key, value) values (?, ?)', [
      `watch_${this.type}`,
      dir
    ]);
    store.dispatch(updateWatchDir(this.type.toLowerCase(), dir));
    status.reset();
    return this.stop();
  }
}

module.exports = Watcher;
