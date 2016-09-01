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
      res.send({
        id: `BLOG__${filename.toUpperCase()}`,
        type: 'BLOG',
        name: filename,
        buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
        actions: ['FILE', 'VIEW', 'HELP'],
        appData: {
          markdown: data
        }
      })
    }
  });
}

export default {
  getBlog
};
