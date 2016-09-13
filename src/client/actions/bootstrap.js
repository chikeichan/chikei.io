import window from 'global/window';
import {addIcons, openApp, openBlog} from './icons/icons';
import {addWindows, addWindow} from './windows/windows';

export const bootstrap = () => {
  const json = window.__PRELOADED_STATE__ || {};
  const {icons = [], windows = []} = json;

  return dispatch => {
    dispatch(addIcons(icons));
    dispatch(addWindows(windows));
  }
}