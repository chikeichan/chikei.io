import fs from 'fs';
import path from 'path';
import marked from '../../lib/marked';

export default class Codes {
  static getFolder(id, cb) {
    const cwd = process.cwd();

    try {
      this.readdir(id, `${cwd}/blogs/code-samples/${id}/`, dirData => {
        cb(null, {
          ...dirData,
          buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
          actions: ['FILE', 'HELP']
        });
      })
    } catch (e) {
      cb(e, null);
    }
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
        throw err;
      }

      if (!filenames.length) {
        cb(dirData);
      }

      filenames.forEach((filename, i) => {
        const path = `${dir}/${filename}`; 
        fs.stat(path, (err, stat) => {
          if (err) {
            throw err;
          }

          if (stat.isFile()) {
            dirData.appData[i] = {
              id: path,
              name: filename,
              type: 'CODE'
            };
            counter++;
            if (counter === filenames.length) {
              cb(dirData);
            }
          }

          if (stat.isDirectory()) {
            this.readdir(filename, path, d => {
              dirData.appData[i] = d;
              counter++;
              if (counter === filenames.length) {
                cb(dirData);
              }
            });
          }
        });
      });
    });
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
