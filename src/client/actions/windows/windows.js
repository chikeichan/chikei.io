import {ADD_WINDOW, ADD_WINDOWS, MOVE_WINDOW} from '../../enums/window-action-types';

export const addWindow = (appWindow) => {
  return {
    type: ADD_WINDOW,
    window: appWindow
  };
}

export const addWindows = (appWindows) => {
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
