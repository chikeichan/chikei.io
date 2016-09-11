import {SAVE_TETRIS} from '../../enums/tetris-action-types';

export const saveTetris = gameData => {
  return {
    type: SAVE_TETRIS,
    gameData: gameData
  };
}