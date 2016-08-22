import actionTypes from '../../enums/layout-action-types';

const {ADD_ICON, ADD_ICONS, MOVE_ICON} = actionTypes;

const initialState = {
  icons: {}
}

function addIcon(state, icon) {
  return {
    ...state,
    icons: {
      ...state.icons,
      [icon.id]: icon
    }
  };
}

function addIcons(state, icons) {
  return icons.reduce(addIcon, state);
}

function moveIcon(state, id, x, y) {
  const icon = state.icons[id];
  return {
    ...state,
    icons: {
      ...state.icons,
      [id]: {...icon, x, y}
    }
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
