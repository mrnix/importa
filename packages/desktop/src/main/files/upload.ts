import path from 'path';
import fs from 'fs-extra';
import Storage from '@aws-amplify/storage';
import Queue from 'better-queue';

const queueFn = async ({fullPath, contentType, prefix}: any, next: any) => {
  try {
    const result = Storage.put(
      `${prefix}${path.basename(fullPath)}`,
      await fs.readFile(fullPath),
      {level: 'protected', contentType}
    );
    next(null, result);
  } catch (err) {
    console.error('upload failed', err);
    next(err);
  }
};

const uploads = new Queue(queueFn, {
  concurrent: 3,
  filter: (input: any, cb) => {
    cb(null, {...input, prefix: input.prefix || ''});
  },

  merge: (oldTask, newTask, cb) => {
    cb(null, newTask);
  }
});

export const enqueueUpload = (params: any): Promise<{key: string}> => {
  return new Promise((resolve, reject) => {
    uploads.push(params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
