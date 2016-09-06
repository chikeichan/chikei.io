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
  },
  TETRIS: {
    id: 'TETRIS',
    type: 'TETRIS',
    name: 'Tetris',
    buttons: [],
    actions: []
  }
} 

function getWindow(req, res, next) {
  const {windowId} = req.params;
  const fixture = windows[windowId] || {};

  switch (fixture.type) {
    case 'MINESWEEPER':
      return res.send(fixture);
    case 'TETRIS':
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
      next(new Error(`Cannot find fixture for ${fixture.type}`));
      return;
  }
}

export default {
  getWindow
};
