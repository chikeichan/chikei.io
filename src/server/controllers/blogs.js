import Blogs from '../models/blogs';

function getBlog(req, res, next) {
  const {filename} = req.params;
  Blogs.getBlog(filename, (err, fixture) => {
    if (err) {
      return next(err);
    }

    res.send(fixture);
  });
}

export default {
  getBlog
};
