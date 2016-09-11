import { combineReducers } from 'redux';

import icons from './icons/icons';
import windows from './windows/windows';
import system from './system/system';
import layout from './layout/layout';
import minesweeper from './minesweeper/minesweeper';
import tetris from './tetris/tetris';

const rootReducer = combineReducers({
  layout,
  icons,
  windows,
  system,
  minesweeper,
  tetris
});

export default rootReducer;