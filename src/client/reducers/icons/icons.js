import {ADD_ICON, ADD_ICONS, MOVE_ICON} from '../../enums/icon-action-types';

const initialState = {};

function addIcon(state, icon) {
  return {
    ...state,
    [icon.id]: icon
  };
}

function addIcons(state, icons) {
  return icons.reduce(addIcon, state);
}

function moveIcon(state, id, x, y) {
  const icon = state[id];
  return {
    ...state,
    [id]: {...icon, x, y}
  };
}

export default function(state=initialState, action) {
  switch(action.type) {
    case ADD_ICON:
      return addIcon(state, action.icon);
    case ADD_ICONS:
      return addIcons(state, action.icons);
    case MOVE_ICON:
      return moveIcon(state, action.id, action.x, action.y);
    default:
      return state;
  }
}
