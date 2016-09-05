import fs from 'fs';
import path from 'path';

const ID_TO_PATH = {
  TUTORIALS: 'tutorials'
};

function getFolder(id, cb) {
  const cwd = process.cwd();
  fs.readdir(`${cwd}/blogs/${ID_TO_PATH[id]}/`, (err, files) => {
    if (err) {
      return cb(err, null);
    }
    try {
      return getFilesData(files, cb);
    } catch (e) {
      return cb(e);
    }
  });
}

function getFilesData(files, cb) {
  const cwd = process.cwd();

  let appData = [];
  let counter = 0;

  files.forEach((filename, i) => {
    fs.readFile(`${cwd}/blogs/tutorials/${filename}`, {encoding: "utf-8"}, (err, data) => {
      if (err) {
        return cb(err, null);
      }

      const metadata = getMetadata(data);

      appData[i] = {
        id: filename,
        name: filename,
        type: 'BLOG',
        ...metadata
      };

      counter++;

      if (counter === files.length) {
        cb(null, {blogs: appData});
      }
    });
  });
}

function getMetadata(content) {
  const list = content.split('****METADATA****');
  return JSON.parse(list[0]);
}

export default {
  getFolder
};
