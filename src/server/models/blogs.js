import fs from 'fs';
import path from 'path';
import marked from '../../lib/marked';

export default class Blogs {
  static getBlog(filename, cb) {
    fs.readFile(`${process.cwd()}/blogs/tutorials/${filename}`, {encoding: "utf-8"}, (err, data) => {
      if (err) {
        return cb(err, null);
      }

      try {
        const appData = this.getAppData(data);
        cb(null, {
          id: `BLOG__${filename}`,
          type: 'BLOG',
          name: appData.metadata.title,
          buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
          actions: ['FILE', 'SHARE'],
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
