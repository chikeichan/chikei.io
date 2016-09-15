import Codes from '../models/codes';

function getCode(req, res, next) {
  const {filename} = req.params;
  Codes.getCode(filename, (err, fixture) => {
    if (err) {
      return next(err);
    }

    res.send(fixture);
  });
}

export default {
  getCode
};
