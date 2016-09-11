import Folders from '../models/folders';
import Windows from '../models/windows';

function getWindow(req, res, next) {
  const {windowId} = req.params;
  const fixture = Windows.get(windowId);

  switch (fixture.type) {
    case 'MINESWEEPER':
      return res.send(fixture);
    case 'TETRIS':
      return res.send(fixture);
    case 'FOLDER':
      return Folders
        .getFolder(windowId, (err, appData) => {
          if (err) {
            return next(err);
          }
          res.send({...fixture, appData})
        });
    default:
      return next(new Error(`Cannot find fixture for ${fixture.type}`));
      
  }
}

export default {
  getWindow
};
