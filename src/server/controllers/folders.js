import fs from 'fs';
import path from 'path';

const ID_TO_PATH = {
  TUTORIALS: 'tutorials'
};

function getFolder(id, cb) {
  fs.readdir(`${process.cwd()}/blogs/${ID_TO_PATH[id]}/`, (err, files) => {
    if (err) {
      cb(err, null);
    } else {
      const appData = files.map(filename => {
        return {
          id: filename,
          name: filename,
          type: 'BLOG'
        }
      });
      cb(null, {blogs: appData});
    }
  });
}

export default {
  getFolder
};
