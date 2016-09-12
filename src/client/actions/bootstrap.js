import window from 'global/window';
import {addIcons, openApp} from './icons/icons';
import {addWindows} from './windows/windows';

export const bootstrap = () => {
  const json = window.__PRELOADED_STATE__ || {};
  const {icons = [], windows = []} = json;

  const app = window.__PRELOADED_APPS__;

  return dispatch => {
    dispatch(addIcons(icons));
    dispatch(addWindows(windows));
    if (app) {
      dispatch(openApp(app));
    }
  }
}