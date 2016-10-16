import fs from 'fs';
import path from 'path';

const ID_TO_PATH = {
  TUTORIALS: 'tutorials'
};

export default class Folders {
  static getFolder(id, cb) {
    const cwd = process.cwd();

    fs.readFile(`${cwd}/blogs/${ID_TO_PATH[id]}/config.json`, (err, json) => {
      if (err) {
        return cb(err, null);
      }

      return cb(null, JSON.parse(json.toString()));
    });
  }
}

