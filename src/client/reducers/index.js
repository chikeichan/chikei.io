import { combineReducers } from 'redux';

import icons from './icons/icons';
import windows from './windows/windows';
import layout from './layout/layout';
import minesweeper from './minesweeper/minesweeper';

const rootReducer = combineReducers({
  layout,
  icons,
  windows,
  minesweeper
});

export default rootReducer;