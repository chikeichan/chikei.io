import window from 'global/window';
import {addIcons, openApp, openBlog} from './icons/icons';
import {addWindows, addWindow} from './windows/windows';

export const bootstrap = () => {
  const json = window.__PRELOADED_STATE__ || {};
  const {icons = [], windows = []} = json;

  const app = window.__PRELOADED_APPS__;
  const blog = window.__PRELOADED_BLOGS__;

  return dispatch => {
    dispatch(addIcons(icons));
    dispatch(addWindows(windows));

    // if (app) {
    //   dispatch(openApp(app));
    // }

    // if (blog) {
    //   dispatch(openBlog(blog));
    // }
  }
}