import {ADD_WINDOW, ADD_WINDOWS, MOVE_WINDOW} from '../../enums/window-action-types';

const initialState = {};

function addWindow(state, appWindow) {
  return {
    ...state,
    [appWindow.id]: appWindow
  };
}

function addWindows(state, appWindows) {
  return appWindows.reduce(addWindow, state);
}

function moveWindow(state, id, x, y) {
  const appWindow = state[id];
  return !appWindow ? state : {
    ...state,
    [id]: {...appWindow, x, y}
  };
}

export default function(state=initialState, action) {
  switch(action.type) {
    case ADD_WINDOW:
      return addWindow(state, action.window);
    case ADD_WINDOWS:
      return addWindows(state, action.windows);
    case MOVE_WINDOW:
      return moveWindow(state, action.id, action.x, action.y);
    default:
      return state;
  }
}
