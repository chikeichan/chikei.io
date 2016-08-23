import {addIcons} from './icons/icons';
import {addWindows} from './windows/windows';
export const bootstrap = () => {
  const req = new Request('/layout');
  return dispatch => {
    return fetch(req, {method: 'GET'})
      .then(res => res.json())
      .then(json => {
        dispatch(addIcons(json.icons))
        dispatch(addWindows(json.windows))
      });
  }
}