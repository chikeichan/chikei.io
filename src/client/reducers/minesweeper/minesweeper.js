import {
  START_GAME, CLICK_CELL, POWER_CLICK_CELL,
  RESTART_GAME, TOGGLE_FLAG, STATUS
} from '../../enums/minesweeper-action-types';

import {CLOSE_WINDOW} from '../../enums/window-action-types';
import {MINESWEEPER} from '../../enums/icon-types';


const {WIN, LOSE, PENDING} = STATUS;

const initialState = initializeGame(10, 10, 10);

function clickCell(state, index) {
  const {isFlag, isOpen, col, row, bombs, fields} = state;
  const r = Math.floor(index / col);
  const c = index % col;

  if (isFlag[r][c] || isOpen[r][c]) {
    return state;
  }
  
  mutateCells(state, r, c);  

  const mutatedIsOpen = state.isOpen;
  const openedCounter = mutatedIsOpen
    .reduce((sum, row) => {
      return row.reduce((rowSum, opened) => {
        return opened ? rowSum + 1: rowSum;
      }, sum);
    }, 0);
  const hasWon = openedCounter === col * row - bombs;
  const hasLost = fields[r][c] < 0;

  return {
    ...state,
    lastClicked: index,
    status: hasWon ? WIN : hasLost ? LOSE : PENDING,
    totalOpen: openedCounter,
    isOpen: mutatedIsOpen
      .map(row => row.map(cell => cell))
  };
}

function openCell(isOpen, r, c) {
  isOpen[r] = isOpen[r].map((n, i) => i === c ? true : n);
  return isOpen;
}

function toggleFlag(state, index) {
  const {isFlag, isOpen, col} = state;
  const r = Math.floor(index / col);
  const c = index % col;
  const flagged = isFlag[r][c];

  if (isOpen[r][c]) {
    return state;
  }

  isFlag[r] = isFlag[r].map((n, i) => i === c ? !flagged : n);
  return {...state, isFlag};
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
      return initializeGame(action.row, action.col, action.bombs);
    case RESTART_GAME:
      return initializeGame(state.row, state.col, state.bombs);
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
function mutateCells(state, r, c, isSpread) {
  const {isOpen, isFlag, fields} = state;
  const content = fields[r] && fields[r][c];

  if (typeof content === 'undefined') {
    return ;
  }

  switch(true) {
    case isOpen[r][c]:
    case isFlag[r][c]:
      return;
    case content < 0 && isSpread:
      return;
    case content !== 0:
      isOpen[r][c] = true;
      return;
    case content === 0:
      isOpen[r][c] = true;
      forEachSurrounding(r, c, (i, j) => mutateCells(state, i, j, true));
      return;
    default:
      return;
  }
}

function initializeGame(row, col, n) {
  const mines = Array(n).fill(-1);
  const empties = Array(row * col - n).fill(0);
  const field = [...mines, ...empties];

  const shuffled = field
    .reduce((newField, n, i) => {
      var rand = Math.floor(Math.random() * row * col);
      var tmp = newField[i];
      newField[i] = newField[rand];
      newField[rand] = tmp;
      return newField;
    }, field);

  const raw = makeFields(row, col, shuffled)
  const finished = raw
    .map((row, i) => {
      return row.map((cell, j) => {
        let count = 0;

        if (cell < 0) {
          return cell;
        }

        forEachSurrounding(i, j, (r, c) => {
          const val = raw[r] && raw[r][c];
          if (val < 0) {
            count++
          }
        });

        return count;
      });
    })


  return {
    row, col,
    bombs: n,
    totalOpen: 0,
    fields: finished,
    isOpen: makeFields(row, col, false),
    isFlag: makeFields(row, col, false),
    status: STATUS.PENDING
  };
}

function makeFields(row, col, val) {
  return Array(row)
    .fill('')
    .map((n, i) => {
      return Array(col)
        .fill('')
        .map((m, j) => typeof val === 'object' ? val[i * col + j] : val)
    });
}

function forEachSurrounding(r, c, cb) {
  return [
    [r - 1, c],
    [r - 1, c - 1],
    [r - 1, c + 1],
    [r, c - 1],
    [r, c + 1],
    [r + 1, c],
    [r + 1, c - 1],
    [r + 1, c + 1]
  ].forEach(tup => cb(tup[0], tup[1]));
}