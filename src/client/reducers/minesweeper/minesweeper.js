import {
  START_GAME, CLICK_CELL, POWER_CLICK_CELL,
  RESTART_GAME, TOGGLE_FLAG, STATUS
} from '../../enums/minesweeper-action-types';

import {CLOSE_WINDOW} from '../../enums/window-action-types';
import {MINESWEEPER} from '../../enums/icon-types';


const {WIN, LOSE, PENDING} = STATUS;

const initialState = {
  col: 0,
  row: 0,
  bombs: 0,
  fields: [],
  isOpen: [],
  isFlag: [],
  lastClicked: null,
  status: PENDING
};

function clickCell(state, index) {
  const {isFlag, col, row, bombs, fields} = state;

  if (isFlag[index]) {
    return state;
  }

  mutateCells(state, index);

  const mutatedIsOpen = state.isOpen;
  const openedCounter = mutatedIsOpen.reduce((sum, n) => n ? sum + 1 : sum, 0);
  const hasWon = openedCounter === col * row - bombs;
  const hasLost = mutatedIsOpen.reduce((acc, n, i) => {
    return acc || (n ? fields[i] < 0 : acc);
  }, false);

  return {
    ...state,
    lastClicked: index,
    status: hasWon ? WIN : hasLost ? LOSE : PENDING,
    isOpen: [...mutatedIsOpen]
  };
}


function toggleFlag(state, index) {
  const {isFlag, isOpen} = state;
  const flagged = isFlag[index];

  if (isOpen[index]) {
    return state;
  }

  return {
    ...state,
    isFlag: isFlag.map((n, i) => i === index ? !flagged : n)
  };
}

function closeApp(state, id) {
  if (id === MINESWEEPER) {
    return initialState;
  }
  return state;
} 

export default function(state=initialState, action) {
  switch(action.type) {
    case START_GAME:
      return createField(action.col, action.row, action.bombs);
    case RESTART_GAME:
      return createField(state.col, state.row, state.bombs);
    case CLICK_CELL:
      return clickCell(state, action.index);
    case TOGGLE_FLAG:
      return toggleFlag(state, action.index);
    case CLOSE_WINDOW:
      return closeApp(state, action.id);
    default:
      return state;
  }
}


// Helper Methods
function mutateCells(state, index, isSpread) {
  const {isOpen, isFlag, fields, col, row} = state;
  const content = fields[index];

  switch(true) {
    case isOpen[index]:
    case isFlag[index]:
      return;
    case content < 0 && isSpread:
      return;
    case content !== 0:
      return isOpen[index] = true;
    case !content:
      isOpen[index] = true;
      return getSurroundIndex(index, row, col)
        .forEach(i => mutateCells(state, i, true));
    default:
      return;
  }
}

function createField(x, y, n) {
  const mines = Array(n).fill(-1);
  const empties = Array(x * y - n).fill(0);
  const field = [...mines, ...empties];

  const shuffled = field
    .reduce((newField, n, i) => {
      var rand = Math.floor(Math.random() * x * y);
      var tmp = newField[i];
      newField[i] = newField[rand];
      newField[rand] = tmp;
      return newField;
    }, field);

  const finished = shuffled
    .map((cell, i) => {
      return cell < 0 ? -1 : 
        getSurroundIndex(i, x, y)
          .map(index => shuffled[index])
          .reduce((sum, n) => n < 0 ? sum + 1 : sum, 0);
    });

  return {
    col: x,
    row: y,
    bombs: n,
    fields: finished,
    isOpen: Array(x * y).fill(false),
    isFlag: Array(x * y).fill(false),
    status: STATUS.PENDING
  };
}

function getSurroundIndex(i, numOfRows, numOfCols) {
  const rightEdge = !((i + 1) % numOfCols);
  const leftEdge = !(i % numOfCols);
  const upEdge = i < numOfCols;
  const downEdge = i >= numOfCols * (numOfRows - 1);

  return [
    !rightEdge ? i + 1 : null,
    !downEdge ? i + numOfRows : null,
    !rightEdge && !downEdge ? i + 1 + numOfRows : null,
    !rightEdge && !upEdge ? i + 1 - numOfRows : null,
    !leftEdge ? i - 1 : null,
    !upEdge ? i - numOfRows : null,
    !leftEdge && !upEdge ? i - 1 - numOfRows : null,
    !leftEdge && !downEdge ? i - 1 + numOfRows : null
  ].filter(v => typeof v === 'number');
}