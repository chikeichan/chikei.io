import {SET_LOADING} from '../../enums/system-action-types';

export const setLoading = isLoading => {
  return {
    type: SET_LOADING,
    isLoading
  };
}
