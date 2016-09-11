import {SAVE_TETRIS} from '../../enums/tetris-action-types';

const initialState = {};

function saveTetris(state, gameData = {}) {
  return {...gameData};
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SAVE_TETRIS:
      return saveTetris(state, action.gameData);
    default:
      return state;
  }
}
