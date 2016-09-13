import fs from 'fs';
import path from 'path';
import md from 'markdown';
import marked from 'marked';
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});

export default class Blogs {
  static getBlog(filename, cb) {
    fs.readFile(`${process.cwd()}/blogs/tutorials/${filename}`, {encoding: "utf-8"}, (err, data) => {
      if (err) {
        return cb(err, null);
      }

      try {
        const appData = this.getAppData(data);
        cb(null, {
          id: `BLOG__${filename.toUpperCase()}`,
          type: 'BLOG',
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
