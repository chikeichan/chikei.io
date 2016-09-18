import {
  ADD_ICON, ADD_ICONS, MOVE_ICON,
  SELECT_ICON, DESELECT_ICONS, OPEN_APP
} from '../../enums/icon-action-types';

import {setLoading} from '../system/system';

export const addIcon = icon => {
  return {
    type: ADD_ICON,
    icon
  };
}

export const addIcons = icons => {
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

export const openApp = id => {
  return dispatch => {
    dispatch(setLoading(true));
    return fetch(`/windows/${id}`, {method: 'GET'})
      .then(res => res.json())
      .then(json => {
        dispatch(setLoading(false));
        dispatch({
          type: OPEN_APP,
          window: json
        });
      });
  };
}

export const openBlog = id => {
  return dispatch => {
    dispatch(setLoading(true));
    return fetch(`/tutorials/${id}`, {method: 'GET'})
      .then(res => res.json())
      .then(json => {
        dispatch(setLoading(false));
        dispatch({
          type: OPEN_APP,
          window: json
        });
      })
  };
}

export const openCode = id => {
  return dispatch => {
    dispatch(setLoading(true));
    return fetch(`/code-samples/${id}`, {method: 'GET'})
      .then(res => res.json())
      .then(json => {
        dispatch(setLoading(false));
        dispatch({
          type: OPEN_APP,
          window: json
        });
      })
  };
}

export const openDemo = id => {
  return dispatch => {
    dispatch(setLoading(true));
    return fetch(`/demo/${id}`, {method: 'GET'})
      .then(res => res.json())
      .then(json => {
        dispatch(setLoading(false));
        dispatch({
          type: OPEN_APP,
          window: json
        });
      })
  };
}

export const openCodeDir = id => {
  return dispatch => {
    dispatch(setLoading(true));
    return fetch(`/code-dir/${id}`, {method: 'GET'})
      .then(res => res.json())
      .then(json => {
        dispatch(setLoading(false));
        dispatch({
          type: OPEN_APP,
          window: json
        });
      })
  };
}
