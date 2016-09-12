import Blogs from '../models/blogs';

function getBlog(req, res, next) {
  const {filename} = req.params;
  Blogs.getBlog(filename, (err, appData) => {
    if (err) {
      return next(err);
    }

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
  });
}

export default {
  getBlog
};
