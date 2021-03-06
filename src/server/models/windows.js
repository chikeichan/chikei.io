const WINDOWS = {
  MINESWEEPER: {
    id: 'MINESWEEPER',
    type: 'MINESWEEPER',
    name: 'Minesweeper',
    buttons: ['MINIMIZE', 'NO_MAXIMIZE', 'CLOSE'],
    actions: ['GAME']
  },
  TUTORIALS: {
    id: 'TUTORIALS',
    type: 'FOLDER',
    name: 'Blogs',
    buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
    actions: ['FILE', 'VIEW'],
    x: 100,
    y: 50
  },
  TETRIS: {
    id: 'TETRIS',
    type: 'TETRIS',
    name: 'Tetris',
    buttons: ['MINIMIZE', 'NO_MAXIMIZE', 'CLOSE'],
    actions: ['GAME']
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
