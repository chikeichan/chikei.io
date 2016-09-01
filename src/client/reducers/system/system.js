import {SET_LOADING} from '../../enums/system-action-types';

const initialState = {
  isLoading: false,
  errorMessage: null
};

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}
