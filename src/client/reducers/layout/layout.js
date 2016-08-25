import {SELECT_ICON, DESELECT_ICONS} from '../../enums/icon-action-types';

const initialState = {
  selectedIcon: {},
  selectedWindow: {}
};

function selectIcon(state, iconId) {
  return {
    ...state,
    selectedIcon: {[iconId]: true}
  };
}

function deselectIcons(state) {
  return {
    ...state,
    selectedIcon: {}
  };
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SELECT_ICON:
      return selectIcon(state, action.id);
    case DESELECT_ICONS:
      return deselectIcons(state);
    default:
      return state;
  }
}
