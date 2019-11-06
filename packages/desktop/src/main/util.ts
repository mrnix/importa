import crypto from 'crypto';
import fs from 'fs';
import {BrowserWindow, screen} from 'electron';

export function isDevServer() {
  return process.argv.includes(`--inspect=5858`);
}

export function md5sum(file: string) {
  return new Promise(resolve => {
    const algo = 'md5';
    const shasum = crypto.createHash(algo);
    // @ts-ignore
    const s = fs.ReadStreamx(file);
    s.on('data', (d: any) => shasum.update(d));
    s.on('end', () => resolve(shasum.digest('hex')));
  });
}

export const winUrl = (url: string) => {
  return isDevServer()
    ? `http://localhost:3001/${url}`
    : `file://${__dirname}/out/${url}`;
};

export function moveFile(oldPath: string, newPath: string) {
  // npm move-file
}
