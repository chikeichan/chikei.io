import {
  START_GAME, RESTART_GAME, CLICK_CELL,
  POWER_CLICK_CELL, TOGGLE_FLAG
} from '../../enums/minesweeper-action-types';

export const startGame = (row, col, bombs) => {
  return {
    type: START_GAME,
    col, row, bombs
  };
};

export const restartGame = () => {
  return {
    type: RESTART_GAME
  };
};

export const clickCell = index => {
  return {
    type: CLICK_CELL,
    index
  };
};

export const toggleFlag = index => {
  return {
    type: TOGGLE_FLAG,
    index
  };
};

export const powerClickCell = index => {
  return {
    type: POWER_CLICK_CELL,
    index
  };
};
