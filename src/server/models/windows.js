const WINDOWS = {
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
    buttons: ['MINIMIZE', 'NO_MAXIMIZE', 'CLOSE'],
    actions: ['GAME', 'HELP']
  }
};

export default class Windows {
  static get(id) {
    return WINDOWS[id] || {
      id: 'ERROR',
      type: 'ERROR',
      name: 'Oops!',
      buttons: ['CLOSE'],
      actions: [],
      appData: {
        errorMessage: 'Uh oh... Something went wrong'
      }
    };
  }
}
