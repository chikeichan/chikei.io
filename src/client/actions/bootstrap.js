import window from 'global/window';
import {addIcons} from './icons/icons';
import {addWindows} from './windows/windows';
import {setLoading} from './system/system';

export const bootstrap = () => {
  const json = window.__PRELOADED_STATE__ || {};
  const {icons = [], windows = []} = json;

  return dispatch => {
    dispatch(addIcons(icons));
    dispatch(addWindows(windows));
    dispatch(setLoading(false));
  }
}