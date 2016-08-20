import actionTypes from '../../enums/layout-action-types';

const {ADD_ICON, ADD_ICONS} = actionTypes;

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

export default function(state=initialState, action) {
  switch(action.type) {
    case ADD_ICON:
      return addIcon(state, action.icon);
    case ADD_ICONS:
      return addIcons(state, action.icons);
    default:
      return state;
  }
}
