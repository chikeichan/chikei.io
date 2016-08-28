import {connect} from 'react-redux';
import {clickCell, toggleFlag, powerClickCell} from '../../actions/minesweeper/minesweeper';
import Cell from '../../components/minesweeper/minesweeper-cell';

const mapStateToProps = (state, ownProps) => {
  const {isOpen, isFlag, fields, lastClicked, status} = state.minesweeper;
  const {id} = ownProps;
  return {
    isOpen: isOpen[id],
    isFlag: isFlag[id],
    content: fields[id],
    lastClicked: lastClicked === id,
    status
  };
}

const mapDispatchToProps = dispatch => {
  return {
    clickCell: id => dispatch(clickCell(id)),
    toggleFlag: id => dispatch(toggleFlag(id))
  };
}

const MinesweeperCellContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell);

export default MinesweeperCellContainer;
