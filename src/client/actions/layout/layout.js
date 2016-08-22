import layoutActionTypes from '../../enums/layout-action-types';

const {ADD_ICON, ADD_ICONS, MOVE_ICON} = layoutActionTypes;

export const addIcon = (icon) => {
  return {
    type: ADD_ICON,
    icon
  };
}

export const addIcons = (icons) => {
  return {
    type: ADD_ICONS,
    icons
  };
}

export const moveIcon = (id, x=0, y=0) => {
  return {
    type: MOVE_ICON,
    id, x, y
  }
} 

export const fetchIcons = () => {
  const req = new Request('/layout');
  return dispatch => {
    fetch(req, {method: 'GET'})
      .then(res => res.json())
      .then(json => dispatch(addIcons(json.icons)));
  }
}
