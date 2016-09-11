const ICONS = {
  TUTORIALS: {
    id: 'TUTORIALS',
    type: 'FOLDER',
    name: 'Tutorials'
  },
  MINESWEEPER: {
    id: 'MINESWEEPER',
    type: 'MINESWEEPER',
    name: 'Minesweeper'
  },
  TETRIS: {
    id: 'TETRIS',
    type: 'TETRIS',
    name: 'Tetris'
  }
}

const ICONS_LIST = Object.keys(ICONS).map(id => ICONS[id]);

export default class Icons {
  static getAll() {
    return ICONS_LIST;
  }

  static getOne(id) {
    return ICONS[id] || {};
  }
}

