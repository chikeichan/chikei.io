import {ADD_ICON, ADD_ICONS, MOVE_ICON} from '../../enums/icon-action-types';

const initialState = {};

function addIcon(state, icon) {
  const {id} = icon;
  const lastIcon = state[id];

  return {
    ...state,
    [id]: {
      ...lastIcon,
      ...icon
    }
  };
}

function addIcons(state, icons) {
  const retState = icons
    .reduce((newState, icon) => {
      const {id} = icon;
      newState[id] = state[id];
      return newState;
    }, {});

  return icons
    .reduce(addIcon, retState);
}

function moveIcon(state, id, x, y) {
  const icon = state[id];
  return !icon ? state : {
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
