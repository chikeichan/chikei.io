import {connect} from 'react-redux';
import {startGame} from '../../actions/minesweeper/minesweeper';
import Header from '../../components/minesweeper/minesweeper-header';

const mapStateToProps = (state, ownProps) => {
  const {isOpen, isFlag, bombs, col, row, fields} = state.minesweeper;
  const bombsCounter = bombs - isFlag.reduce((sum, n) => n ? sum + 1 : sum, 0);
  const openedCounter = isOpen.reduce((sum, n) => n ? sum + 1 : sum, 0);
  const hasWon = openedCounter === col * row - bombs;
  const hasLost = isOpen.reduce((acc, n, i) => {
    return acc || (n ? fields[i] < 0 : acc);
  }, false);

  return {
    bombs: Math.max(0, bombsCounter),
    opened: openedCounter,
    status: hasWon ? 1 : hasLost ? -1 : 0
  };
}

const mapDispatchToProps = dispatch => {
  return {
    startGame: (x, y, n) => dispatch(startGame(x, y, n))
  };
}

const MinesweeperHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default MinesweeperHeaderContainer;
