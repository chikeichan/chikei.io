import {OPEN_APP} from '../../enums/icon-action-types';
import {
  ADD_WINDOW, ADD_WINDOWS, MOVE_WINDOW, MAXIMIZE_WINDOW,
  CLOSE_WINDOW, MINIMIZE_WINDOW, SELECT_WINDOW, SET_VIEW_MODE
} from '../../enums/window-action-types';

const initialState = {};

function addWindow(state, appWindow) {
  const {id} = appWindow;
  const lastWindow = state[id]
  return {
    ...state,
    [id]: {
      ...lastWindow,
      ...appWindow
    }
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

function openApp(state, appWindow) {
  if (state[appWindow.id]) {
    return {
      ...state,
      [appWindow.id]: {
        ...appWindow,
        isMinimized: false
      }
    };
  }
  return addWindow(state, appWindow);
}

function closeWindow(state, id) {
  const retState = {...state};
  delete retState[id];
  return retState;
}

function setMinize(state, id, isMinimized) {
  const appWindow = state[id];
  return !appWindow ? state : {
    ...state,
    [id]: {...appWindow, isMinimized}
  };
}

function setMaximize(state, id) {
  const appWindow = state[id];
  const lastIsMaximized = appWindow.isMaximized;
  return !appWindow ? state : {
    ...state,
    [id]: {
      ...appWindow,
      isMaximized: !lastIsMaximized
    }
  };
}

function setViewMode(state, id, viewMode) {
  const appWindow = state[id];
  return !appWindow ? state : {
    ...state,
    [id]: {
      ...appWindow,
      viewMode
    }
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
    case CLOSE_WINDOW:
      return closeWindow(state, action.id);
    case MINIMIZE_WINDOW:
      return setMinize(state, action.id, true);
    case MAXIMIZE_WINDOW:
      return setMaximize(state, action.id);
    case SELECT_WINDOW:
      return setMinize(state, action.id, false);
    case OPEN_APP:
      return openApp(state, action.window);
    case SET_VIEW_MODE:
      return setViewMode(state, action.id, action.viewMode);
    default:
      return state;
  }
}
