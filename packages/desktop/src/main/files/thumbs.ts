import path from 'path';
import fs from 'fs-extra';
// @ts-ignore
import md5File from 'md5-file/promise';
import sharp from 'sharp';
import Queue from 'better-queue';
import {store} from '../../common/store';
import {thumbCreated} from '../../common/store/data/actions';
import {app} from 'electron';
import {thumbSize} from '../../common/config';

const processThumb = async ({fullPath, withInfo, size}: any) => {
  const hash = await md5File(fullPath);
  const dest = path.resolve(
    app.getPath('userData') || '',
    `./thumbs/${size}/${hash}.jpg`
  );

  // console.log({fullPath, dest});

  if (await fs.pathExists(dest)) {
    return {
      dest,
      hash,
      fullPath,
      info: withInfo ? await sharp(dest).metadata() : undefined
    };
  }

  let info = await sharp(fullPath);
  
  if (withInfo) {
    info = info.withMetadata();
  }

  return {
    dest,
    hash,
    fullPath,
    info: info.resize(size).toFile(dest)
  };
};

const queueFn = async (params: any, next: any) => {
  try {
    const {dest, hash, info} = await processThumb(params);
    store.dispatch(
      thumbCreated({
        hash,
        size: params.size,
        isThumb: thumbSize === params.size,
        fullPath: params.fullPath,
        dest: `importa://${dest}`,
        info
      })
    );
    next(null, {dest, hash, info});
  } catch (err) {
    next(err);
    console.error(params.fullPath, err);
  }
};

const thumbs = new Queue(queueFn, {
  concurrent: 3,
  id: 'fullPath',
  filter: (input: any, cb) => {
    cb(null, {
      ...input,
      size: input.size || 360,
      priority: input.priority || 0
    });
  },

  merge: (oldTask, newTask, cb) => {
    if (oldTask) {
      oldTask.priority += newTask.priority || 0;
    }
    cb(null, oldTask);
  },

  priority: ({priority}: any, cb) => {
    cb(null, priority);
  }
});

interface ThumbResult {
  dest: string;
}

export const createThumb = (params: any): Promise<ThumbResult> => {
  return new Promise((resolve, reject) => {
    if (params.priority > 0) {
      thumbs.cancel(params.fullPath);
    }
    thumbs.push(params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
