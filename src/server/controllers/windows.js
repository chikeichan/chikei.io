import folders from './folders';

const windows = {
  MINESWEEPER: {
    id: 'MINESWEEPER',
    type: 'MINESWEEPER',
    name: 'Minesweeper',
    buttons: ['MINIMIZE', 'NO_MAXIMIZE', 'CLOSE'],
    actions: ['GAME', 'HELP']
  },
  TUTORIALS: {
    id: 'TUTORIALS',
    type: 'FOLDER',
    name: 'Tutorials',
    buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
    actions: ['FILE', 'VIEW', 'HELP']
  }
} 

function getWindow(req, res, next) {
  const {windowId} = req.params;
  const fixture = windows[windowId] || {};

  switch (fixture.type) {
    case 'MINESWEEPER':
      return res.send(fixture);
    case 'FOLDER':
      return folders
        .getFolder(windowId, (err, appData) => {
          if (err) {
            return next(err);
          }
          res.send({...fixture, appData})
        });
    default:
      next(new Error('Uh oh..'));
      return;
  }
}

export default {
  getWindow
};
