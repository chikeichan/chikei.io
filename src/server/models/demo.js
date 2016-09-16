import fs from 'fs';
import path from 'path';

export default class Demo {
  static getDemo(id, cb) {
    fs.readFile(`${process.cwd()}/blogs/demo/${id}`, {encoding: "utf-8"}, (err, data) => {
      if (err) {
        return cb(err, null);
      }

      try {
        const appData = this.getAppData(data);
        cb(null, {
          id: `DEMO__${id.toUpperCase()}`,
          type: 'DEMO',
          name: appData.metadata.title,
          buttons: ['MINIMIZE', 'NO_MAXIMIZE', 'CLOSE'],
          actions: [],
          x: 450,
          y: 100,
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
      markdown: list[1]
    };
  }
}
