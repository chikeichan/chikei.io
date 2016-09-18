import Codes from '../models/codes';

function getCodeDir(req, res, next) {
  const {foldername} = req.params;
  Codes.getFolder(foldername, (err, fixture) => {
    if (err) {
      return next(err);
    }

    res.send(fixture);
  });
}

export default {
  getCodeDir
};
