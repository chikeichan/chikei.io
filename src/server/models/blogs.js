import fs from 'fs';
import path from 'path';

export default class Blogs {
  static getBlog(filename, cb) {
    fs.readFile(`${process.cwd()}/blogs/tutorials/${filename}`, {encoding: "utf-8"}, (err, data) => {
      if (err) {
        return cb(err, null);
      }

      try {
        const appData = this.getAppData(data);
        cb(null, appData);
      } catch (e) {
        cb(e, null);
      }
    });
  }

  static getAppData(content) {
    const list = content.split('****METADATA****');

    return {
      metadata: JSON.parse(list[0]),
      markdown: list[1]
    };
  }
}
