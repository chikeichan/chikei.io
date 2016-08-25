import { combineReducers } from 'redux';

import icons from './icons/icons';
import windows from './windows/windows';
import layout from './layout/layout';

const rootReducer = combineReducers({
  layout,
  icons,
  windows
});

export default rootReducer;