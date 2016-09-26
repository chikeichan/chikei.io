import fs from 'fs';
import path from 'path';
import marked from '../../lib/marked';

export default class Codes {
  static getFolder(id, cb) {
    const cwd = process.cwd();

    this.readdir(id, `${cwd}/blogs/code-samples/${id}/`, (err, dirData) => {
      if (err) {
        return cb(err, null);
      }

      cb(null, {
        ...dirData,
        buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
        actions: ['FILE'],
        x: 100,
        y: 100
      });
    });
  }

  static readdir(name, dir, cb) {
    let dirData = {
      id: dir,
      name: name,
      type: 'CODE_DIR',
      appData: []
    };

    let counter = 0;
    fs.readdir(dir, (err, filenames) => {
      if (err) {
        return cb(err, null);
      }

      if (!filenames.length) {
        return cb(null, dirData);
      }

      filenames.forEach((filename, i) => {
        const path = `${dir}/${filename}`; 
        fs.stat(path, (err, stat) => {
          if (err) {
            return cb(err, null);
          }

          if (stat.isFile()) {
            this.getCode(path, (err, d) => {
              if (err) {
                return cb(err, null);
              }

              dirData.appData[i] = {
                id: path,
                name: filename,
                type: 'CODE',
                appData: d
              };
              counter++;
              if (counter === filenames.length) {
                return cb(null, dirData);
              }
            });
          }

          if (stat.isDirectory()) {
            this.readdir(filename, path, (err, d) => {
              if (err) {
                return cb(err, null);
              }

              dirData.appData[i] = d;
              counter++;
              if (counter === filenames.length) {
                return cb(null, dirData);
              }
            });
          }
        });
      });
    });
  }

  static getCode(path, cb) {
    fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
      if (err) {
        return cb(err, null);
      }

      try {
        const appData = this.getAppData(data);
        return cb(null, appData);
      } catch (e) {
        return cb(e, null);
      }
    });
  }

  static getAppData(content) {
    const list = content.split('****METADATA****');

    return {
      metadata: JSON.parse(list[0]),
      markdown: marked(list[1])
    };
  }
}
