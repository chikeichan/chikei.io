import layoutActionTypes from '../../enums/layout-action-types';

const {ADD_ICON} = layoutActionTypes;

export const addIcon = (iconType) => {
  return {
    type: ADD_ICON,
    iconType: iconType
  };
}
