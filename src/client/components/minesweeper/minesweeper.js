import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import Cell from '../../containers/minesweeper-container/minesweeper-cell-container';
import Header from '../../containers/minesweeper-container/minesweeper-header-container';
import ActionBar from './minesweeper-action-bar';

const LEVEL = {
  BEGINNER: [10, 10, 15],
  INTERMEDIATE: [16, 16, 40],
  EXPERT: [20, 33, 99]
};
const {BEGINNER, INTERMEDIATE, EXPERT} = LEVEL;

class Minesweeper extends Component {
  static propTypes = {
    startGame: PropTypes.func.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    fields: PropTypes.array.isRequired
  };

  static defaultProps = {
    fields: []
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.fields !== this.props.fields;
  }

  componentDidMount() {
    this.props.startGame.apply(this, BEGINNER);
  }

  renderRows() {
    const {fields} = this.props;
    return fields
      .map((row, i) => (
        <div
          key={`row-${i}`}
          className="minesweeper-row">
          {this.renderRow(row, i)}
        </div>
      ));
  }

  renderRow(row, i) {
    const {col} = this.props;
    return row
      .map((cell, j) => (
        <Cell
          key={`cell-${j}__${i}`}
          id={i * col + j} />
      ));
  }

  render() {
    const {fields, actions, row, col, startGame} = this.props;
    return (
      <Window {...this.props}>
        <ActionBar
          actions={actions}
          startGame={startGame}
          row={row}
          col={col}/>
        <div className="minesweeper-container">
          <Header />
          <div className="minesweeper-gameboard">
            {this.renderRows()}
          </div>
        </div>
      </Window>
    );
  }
}

export default Minesweeper;
