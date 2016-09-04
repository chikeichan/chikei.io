import fs from 'fs';
import path from 'path';


// 'hello-world.md': {
//   id: 'HELLO_WORLD',
//   path: 'tutorials/hello-world.md',
//   type: 'BLOG',
//   name: 'Hello World!',
//   buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
//   actions: ['FILE', 'VIEW', 'HELP']
// }
function getBlog(req, res, next) {
  const {filename} = req.params;
  fs.readFile(`${process.cwd()}/blogs/tutorials/${filename}`, {encoding: "utf-8"}, (err, data) => {
    if (err) {
      next(err);
    } else {
      try {
        const appData = getAppData(data);
        res.send({
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
        next(e);
      }
    }
  });
}

function getAppData(content) {
  const list = content.split('****METADATA****');

  return {
    metadata: JSON.parse(list[0]),
    markdown: list[1]
  };
}

export default {
  getBlog
};
