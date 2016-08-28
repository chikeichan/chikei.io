import { combineReducers } from 'redux';

import icons from './icons/icons';
import windows from './windows/windows';
import system from './system/system';
import layout from './layout/layout';
import minesweeper from './minesweeper/minesweeper';

const rootReducer = combineReducers({
  layout,
  icons,
  windows,
  system,
  minesweeper
});

export default rootReducer;