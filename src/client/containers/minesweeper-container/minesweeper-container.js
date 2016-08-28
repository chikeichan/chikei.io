import {connect} from 'react-redux';
import {startGame} from '../../actions/minesweeper/minesweeper';
import Minesweeper from '../../components/minesweeper/minesweeper';

const mapStateToProps = (state, ownProps) => {
  return {...state.minesweeper};
}

const mapDispatchToProps = dispatch => {
  return {
    startGame: (x, y, n) => dispatch(startGame(x, y, n))
  };
}

const MinesweeperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Minesweeper);

export default MinesweeperContainer;
