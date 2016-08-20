import layoutActionTypes from '../../enums/layout-action-types';

const {ADD_ICON, ADD_ICONS} = layoutActionTypes;

export const addIcon = (icon) => {
  return {
    type: ADD_ICON,
    icon: icon
  };
}

export const addIcons = (icons) => {
  return {
    type: ADD_ICONS,
    icons: icons
  };
}

export const fetchIcons = () => {
  const req = new Request('/layout');
  return dispatch => {
    fetch(req, {method: 'GET'})
      .then(res => res.json())
      .then(json => dispatch(addIcons(json.icons)));
  }
}
