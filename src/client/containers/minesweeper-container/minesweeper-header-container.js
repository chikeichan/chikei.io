import {connect} from 'react-redux';
import {startGame} from '../../actions/minesweeper/minesweeper';
import Header from '../../components/minesweeper/minesweeper-header';

const mapStateToProps = (state, ownProps) => {
  const {isOpen, isFlag, bombs} = state.minesweeper;
  const counter = bombs - isFlag.reduce((sum, n) => n ? sum + 1 : sum, 0);
  return {
    bombs: Math.max(0, counter),
    opened: isOpen.reduce((sum, n) => n ? sum + 1 : sum, 0)
  };
}

const mapDispatchToProps = dispatch => {
  return {};
}

const MinesweeperHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default MinesweeperHeaderContainer;
