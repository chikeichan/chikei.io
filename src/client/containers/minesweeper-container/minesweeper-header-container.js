import {connect} from 'react-redux';
import {restartGame} from '../../actions/minesweeper/minesweeper';
import Header from '../../components/minesweeper/minesweeper-header';

const mapStateToProps = (state, ownProps) => {
  const {isOpen, isFlag, bombs, status, totalOpen} = state.minesweeper;
  const bombsCounter = bombs - isFlag.reduce((sum, row) => {
      return row.reduce((rowSum, flagged) => {
        return flagged ? rowSum + 1: rowSum;
      }, sum);
    }, 0);;

  return {
    bombs: Math.max(0, bombsCounter),
    opened: totalOpen,
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
