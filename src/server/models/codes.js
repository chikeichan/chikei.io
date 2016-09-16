import fs from 'fs';
import path from 'path';
import marked from '../../lib/marked';

export default class Codes {
  static getCode(filename, cb) {
    fs.readFile(`${process.cwd()}/blogs/code-samples/${filename}`, {encoding: "utf-8"}, (err, data) => {
      if (err) {
        return cb(err, null);
      }

      try {
        const appData = this.getAppData(data);
        cb(null, {
          id: `CODE__${filename.toUpperCase()}`,
          type: 'CODE',
          name: appData.metadata.title,
          buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
          actions: ['FILE', 'VIEW', 'HELP'],
          x: 150,
          y: 70,
          appData
        });
      } catch (e) {
        cb(e, null);
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
