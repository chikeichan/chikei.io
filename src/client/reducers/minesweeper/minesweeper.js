import {START_GAME, CLICK_CELL, POWER_CLICK_CELL, TOGGLE_FLAG} from '../../enums/minesweeper-action-types';

const initialState = {
  col: 0,
  row: 0,
  bombs: 0,
  fields: [],
  isOpen: [],
  isFlag: []
};

function clickCell(state, index) {
  const {isFlag} = state;

  if (isFlag[index]) {
    return state;
  }

  mutateCells(state, index);

  return {
    ...state,
    isOpen: [...state.isOpen]
  };
}

function mutateCells(state, index) {
  const {isOpen, isFlag, fields, col, row} = state;
  const content = fields[index];

  switch(true) {
    case isOpen[index]:
    case isFlag[index]:
      return;
    case Boolean(content):
      return isOpen[index] = true;
    case !content:
      isOpen[index] = true;
      return getSurroundIndex(index, col, row)
        .forEach(i => mutateCells(state, i));
    default:
      return;
  }
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

export default function(state=initialState, action) {
  switch(action.type) {
    case START_GAME:
      return createField(action.col, action.row, action.bombs);
    case CLICK_CELL:
      return clickCell(state, action.index);
    case TOGGLE_FLAG:
      return toggleFlag(state, action.index);
    default:
      return state;
  }
}


// Helper Methods
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
    isFlag: Array(x * y).fill(false)
  };
}

function getSurroundIndex(i, numOfCols, numOfRows) {
  const rightEdge = !((i + 1) % numOfCols);
  const leftEdge = !(i % numOfCols);
  const upEdge = i < numOfCols;
  const downEdge = i >= numOfCols * (numOfRows - 1);

  return [
    !rightEdge ? i + 1 : null,
    !downEdge ? i + numOfRows : null,
    !rightEdge && !downEdge ? i + 1 + numOfRows : null,
    !rightEdge && !upEdge ?i + 1 - numOfRows : null,
    !leftEdge ? i - 1 : null,
    !upEdge ? i - numOfRows : null,
    !leftEdge && !upEdge ? i - 1 - numOfRows : null,
    !leftEdge && !downEdge ? i - 1 + numOfRows : null
  ].filter(v => typeof v === 'number');
}