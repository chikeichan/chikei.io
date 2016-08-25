import {
  ADD_ICON, ADD_ICONS, MOVE_ICON,
  SELECT_ICON, DESELECT_ICONS
} from '../../enums/icon-action-types';

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

export const selectIcon = id => {
  return {
    type: SELECT_ICON,
    id
  };
}

export const deselectIcons = () => {
  return {
    type: DESELECT_ICONS
  };
}
