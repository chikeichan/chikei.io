import {
  ADD_WINDOW, ADD_WINDOWS, MOVE_WINDOW, MINIMIZE_WINDOW,
  SELECT_WINDOW, DESELECT_WINDOWS, CLOSE_WINDOW, MAXIMIZE_WINDOW
} from '../../enums/window-action-types';

export const addWindow = appWindow => {
  return {
    type: ADD_WINDOW,
    window: appWindow
  };
}

export const addWindows = appWindows => {
  return {
    type: ADD_WINDOWS,
    windows: appWindows
  };
}

export const moveWindow = (id, x=0, y=0) => {
  return {
    type: MOVE_WINDOW,
    id, x, y
  }
}

export const selectWindow = id => {
  return {
    type: SELECT_WINDOW,
    id
  };
}

export const deselectWindows = () => {
  return {
    type: DESELECT_WINDOWS
  };
}

export const closeWindow = id => {
  return {
    type: CLOSE_WINDOW,
    id
  };
}

export const minimizeWindow = id => {
  return {
    type: MINIMIZE_WINDOW,
    id
  };
}

export const maximizeWindow = id => {
  return {
    type: MAXIMIZE_WINDOW,
    id
  };
}
