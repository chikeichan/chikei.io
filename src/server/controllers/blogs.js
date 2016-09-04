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
        res.send({
          id: `BLOG__${filename.toUpperCase()}`,
          type: 'BLOG',
          name: filename,
          buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
          actions: ['FILE', 'VIEW', 'HELP'],
          x: 150,
          y: 70,
          appData: extractMetaString(data)
        });
      } catch (e) {
        next(e);
      }
    }
  });
}

function extractMetaString(content) {
  const list = content.split('\n');
  let raw = [];
  let rawMd = [];
  let isMetaEnd = -1;
  for (let i = 0; i < list.length; i++) {
    let text = list[i];
    if (text === '$$') {
      isMetaEnd++;
    } else if (!isMetaEnd) {
      raw.push(text)
    } else if (isMetaEnd) {
      rawMd.push(text);
    }
  }

  return {
    metadata: JSON.parse(raw.join('')),
    markdown: rawMd.join('\n')
  };
}

export default {
  getBlog
};
