import {connect} from 'react-redux';
import {restartGame} from '../../actions/minesweeper/minesweeper';
import Header from '../../components/minesweeper/minesweeper-header';

const mapStateToProps = (state, ownProps) => {
  const {isOpen, isFlag, bombs, status} = state.minesweeper;
  const bombsCounter = bombs - isFlag.reduce((sum, n) => n ? sum + 1 : sum, 0);
  const openedCounter = isOpen.reduce((sum, n) => n ? sum + 1 : sum, 0);

  return {
    bombs: Math.max(0, bombsCounter),
    opened: openedCounter,
    status
  };
}

const mapDispatchToProps = dispatch => {
  return {
    restartGame: () => dispatch(restartGame())
  };
}

const MinesweeperHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default MinesweeperHeaderContainer;
