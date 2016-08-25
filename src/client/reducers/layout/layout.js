import {SELECT_ICON, DESELECT_ICONS, OPEN_APP} from '../../enums/icon-action-types';
import {SELECT_WINDOW, DESELECT_WINDOWS} from '../../enums/window-action-types';

const initialState = {
  selectedIcon: {},
  selectedWindow: {}
};

function selectIcon(state, iconId) {
  return {
    ...state,
    selectedWindow: {},
    selectedIcon: {[iconId]: true}
  };
}

function deselectIcons(state) {
  return {
    ...state,
    selectedIcon: {},
    selectedWindow: {}
  };
}

function selectWindow(state, windowId) {
  return {
    ...state,
    selectedIcon: {},
    selectedWindow: {[windowId]: true}
  }
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SELECT_ICON:
      return selectIcon(state, action.id);
    case DESELECT_ICONS:
      return deselectIcons(state);
    case SELECT_WINDOW:
      return selectWindow(state, action.id);
    case OPEN_APP:
      return selectWindow(state, action.window.id);
    default:
      return state;
  }
}