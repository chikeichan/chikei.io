import {connect} from 'react-redux';
import {clickCell, toggleFlag, powerClickCell} from '../../actions/minesweeper/minesweeper';
import Cell from '../../components/minesweeper/minesweeper-cell';

const mapStateToProps = (state, ownProps) => {
  const {isOpen, isFlag, fields, lastClicked, status, row, col} = state.minesweeper;
  const {id} = ownProps;

  const r = Math.floor(id / col);
  const c = id % col;

  return fields.length ? {
    isOpen: isOpen[r][c],
    isFlag: isFlag[r][c],
    content: fields[r][c],
    lastClicked: lastClicked === id,
    status
  } : {};
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
