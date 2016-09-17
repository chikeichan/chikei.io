import fs from 'fs';
import path from 'path';
import marked from '../../lib/marked';

export default class Codes {
  static getFolder(id, cb) {
    const cwd = process.cwd();

    fs.readdir(`${cwd}/blogs/code-samples/${id}/`, (err, files) => {
      if (err) {
        return cb(err, null);
      }
      try {
        return this.getFilesData(id, files, cb);
      } catch (e) {
        return cb(e);
      }
    });
  }

  static getFilesData(path, files, cb) {
    const cwd = process.cwd();

    let appData = [];
    let counter = 0;

    files.forEach((filename, i) => {
      fs.readFile(`${cwd}/blogs/code-samples/${path}/${filename}`, {encoding: "utf-8"}, (err, data) => {
        if (err) {
          return cb(err, null);
        }

        const metadata = this.getMetadata(data);

        appData[i] = {
          id: filename,
          name: filename,
          type: 'CODE',
          ...metadata
        };

        counter++;

        if (counter === files.length) {
          cb(null, {
            id: `CODE_DIR_${path}`,
            type: 'FOLDER',
            name: path,
            buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
            actions: ['FILE', 'VIEW', 'HELP'],
            appData: {
              blogs: appData
            }
          });
        }
      });
    });
  }

  static getMetadata(content) {
    const list = content.split('****METADATA****');
    return JSON.parse(list[0]);
  }
  // static getCode(filename, cb) {
  //   fs.readFile(`${process.cwd()}/blogs/code-samples/${filename}`, {encoding: "utf-8"}, (err, data) => {
  //     if (err) {
  //       return cb(err, null);
  //     }

  //     try {
  //       const appData = this.getAppData(data);
  //       cb(null, {
  //         id: `CODE__${filename.toUpperCase()}`,
  //         type: 'CODE',
  //         name: appData.metadata.title,
  //         buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
  //         actions: ['FILE', 'VIEW', 'HELP'],
  //         x: 150,
  //         y: 70,
  //         appData
  //       });
  //     } catch (e) {
  //       cb(e, null);
  //     }
  //   });
  // }

  // static getAppData(content) {
  //   const list = content.split('****METADATA****');

  //   return {
  //     metadata: JSON.parse(list[0]),
  //     markdown: marked(list[1])
  //   };
  // }
}
