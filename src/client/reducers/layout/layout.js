import actionTypes from '../../enums/layout-action-types';

const {ADD_ICON} = actionTypes;

const initialState = {
  icons: {}
}

function addIcon(state, iconType) {
  const {icons} = state;
  const newIcons = Object.assign({}, icons, {[iconType]: iconType});
  return Object.assign({}, state, {icons: newIcons});
}

export default function(state=initialState, action) {
  switch(action.type) {
    case ADD_ICON:
      return addIcon(state, action.iconType);
    default:
      return state;
  }
}
