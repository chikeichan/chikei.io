import {connect} from 'react-redux';
import {saveTetris} from '../../actions/tetris/tetris';
import Tetris from '../../components/tetris/tetris';

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    saveTetris: gameData => dispatch(saveTetris(gameData))
  };
}

const TetrisContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tetris);

export default TetrisContainer;
