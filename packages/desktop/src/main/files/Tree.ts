import EventEmitter from 'events';
import {keyBy} from 'lodash';
import path from 'path';
import fs from 'fs-extra';
import {Auth} from 'aws-amplify';
import {app} from 'electron';
import API, {graphqlOperation} from '@aws-amplify/api';
import readChunk from 'read-chunk';
import fileType from 'file-type';
import {readTree} from './readTree';
import {Items} from '../../common/store/data/reducer';
import {store} from '../../common/store';
import {receiveItems} from '../../common/store/data/actions';
import events from '../../common/events';
import {createThumb} from './thumbs';
import * as config from '../../common/config';
import * as T from '../../common/store/data/types';
import {enqueueUpload} from './upload';
import {
  createExport,
  createAlbum,
  createFile,
  updateExport
} from '../../../../backend/graphql/mutations';
import {getAlbum} from '../../../../backend/graphql/queries';
import nanoid from 'nanoid/async';
import sharp from 'sharp';

class Tree extends EventEmitter {
  async init({dir}: any) {
    store.dispatch(
      receiveItems({
        dir,
        items: this.pathBy(await readTree(dir))
      })
    );

    events.on(T.REQUEST_THUMBS, ({payload}: any) => {
      fs.ensureDir(
        path.join(app.getPath('userData'), `thumbs/${config.thumbSize}`)
      );

      console.log(app.getPath('userData'));
      
      const {items} = store.getState().data;

      const add = ({fullPath, priority}: any) => {
        const item = items[fullPath];

        if (item && !item.isFolder) {
          createThumb({fullPath, priority});
        }
      };

      payload.items.map((fullPath: string) => {
        const item = items[fullPath];

        if (item.isFolder) {
          item.children.slice(0, 4).map((childFullPath: string) =>
            add({
              fullPath: childFullPath,
              size: config.thumbSize,
              priority: 1
            })
          );
          return;
        }

        add({fullPath, priority: 0});
      });
    });

    events.on(T.CREATE_EXPORT, async ({payload}: any) => {
      try {
        const {identityId} = await Auth.currentCredentials();

        const id = await nanoid(10);

        console.log({id}, payload);

        fs.ensureDir(
          path.join(app.getPath('userData'), `thumbs/${config.exportSize}`)
        );

        const {items} = store.getState().data;

        const files = payload.items.filter((fullPath: any) => {
          const item = items[fullPath];
          return item && !item.isFolder;
        });

        const result: any[] = await Promise.all(
          files.map(async (fullPath: string) => {
            const buffer = readChunk.sync(fullPath, 0, fileType.minimumBytes);
            const types: any = fileType(buffer);
            const {exif, icc, iptc, xmp, ...meta} = await sharp(
              fullPath
            ).metadata();

            const thumb = await createThumb({
              fullPath,
              size: config.exportSize,
              priority: 2,
              withInfo: true
            });

            const upload = await enqueueUpload({
              id: `${id}/${fullPath}`,
              prefix: `${id}/`,
              fullPath: thumb.dest,
              contentType: types.mime
            });

            console.log({fullPath}, thumb);

            return {thumb, upload, types, meta};
          })
        );

        const exportCreated = await API.graphql(
          graphqlOperation(createExport, {input: {id}})
        );

        const albumCreated = await API.graphql(
          graphqlOperation(createAlbum, {
            input: {
              name: payload.item.name,
              identityId,
              // createdAt: new Date(),
              albumExportId: exportCreated.data.createExport.id
            }
          })
        );

        await API.graphql(
          graphqlOperation(updateExport, {
            input: {id, exportAlbumId: albumCreated.data.createAlbum.id}
          })
        );

        for (const {upload, types, thumb, meta} of result) {
          console.log(thumb, meta);

          await API.graphql(
            graphqlOperation(createFile, {
              input: {
                key: upload.key,
                fileAlbumId: albumCreated.data.createAlbum.id,
                mime: types.mime,
                meta: JSON.stringify(meta),
                thumb: JSON.stringify(thumb.info),
                size: JSON.stringify(thumb.info)
              }
            })
          );
        }

        const alb = await API.graphql(
          graphqlOperation(getAlbum, {
            id: albumCreated.data.createAlbum.id
          })
        );

        console.log(alb.data.getAlbum);
      } catch (err) {
        console.log('error', err);
      }
    });
  }

  pathBy(items: any[]): Items {
    return keyBy(items, 'fullPath');
  }
}

export default Tree;
