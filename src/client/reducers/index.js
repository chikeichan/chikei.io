import { combineReducers } from 'redux';

import icons from './icons/icons';
import windows from './windows/windows';

const rootReducer = combineReducers({
  icons,
  windows
});

export default rootReducer;