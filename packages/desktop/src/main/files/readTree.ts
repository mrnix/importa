import fs from 'fs-extra';
import validFilename from 'valid-filename';
import upath from 'upath';
import {Item, FolderItem} from '../../common/store/data/reducer';

interface DirFile {
  name: string;
  isDirectory: () => boolean;
}

export async function readTree(dir: string) {
  const s = Date.now();
  const {item, items} = readDir(dir);
  console.log('readTree', {time: Date.now() - s});
  return [item, ...items];
}

export function readDir(dir: string): FolderItem {
  let items: Item[] = [];

  const rootStats = fs.statSync(dir);

  const item: Item = {
    name: upath.basename(dir),
    isFolder: true,
    fullPath: dir,
    ino: rootStats.ino,
    children: []
  };

  const data: DirFile[] = (fs.readdirSync as any)(dir, {
    withFileTypes: true
  });

  const folders: any = {};

  for (const f of data) {
    const fullPath = upath.join(dir, f.name);
    const isFolder = f.isDirectory();

    folders[fullPath] = isFolder;

    if (!validFilename(f.name)) {
      console.error('invalid filename', fullPath);
      continue;
    }

    if (f.name.startsWith('.')) {
      continue;
    }

    if (isFolder) {
      const subDir = readDir(fullPath);
      item.children.push(subDir.item.fullPath);
      items = [...items, subDir.item, ...subDir.items];
      continue;
    }

    const stats = fs.statSync(fullPath);

    if (stats && stats.size === 0) {
      continue;
    }

    const child: Item = {
      name: f.name,
      isFolder: false,
      fullPath,
      ino: stats.ino,
      children: []
    };

    items.push(child);
    if (item.isFolder) {
      item.children.push(child.fullPath);
    }
  }

  item.children.sort((a: string, b: string) => {
    if (!folders[a] && !folders[b]) {
      return a.localeCompare(b);
    }
    return folders[a] ? -1 : 1;
  });

  return {item, items};
}
