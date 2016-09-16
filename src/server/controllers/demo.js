import Demo from '../models/demo';

function getDemo(req, res, next) {
  const {id} = req.params;
  Demo.getDemo(id, (err, fixture) => {
    if (err) {
      return next(err);
    }

    res.send(fixture);
  });
}

export default {
  getDemo
};
