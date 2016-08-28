import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import Cell from '../../containers/minesweeper-container/minesweeper-cell-container';

class Minesweeper extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.startGame(10, 10, 10);
  }

  renderRows() {
    const {row} = this.props;
    return row && Array(row)
      .fill()
      .map((n, i) => (
        <div
          key={i}
          className="minesweeper-row">
          {this.renderColumns(i)}
        </div>
      ));
  }

  renderColumns(i) {
    const {col, fields} = this.props;
    return col && Array(col)
      .fill(0)
      .map((m, j) => <Cell key={i * col + j} id={i * col + j} />);
  }


  render() {
    return (
      <Window {...this.props}>
        <div className="minesweeper-container">
          <div className="minesweeper-header">
            <div className="minesweeper-counter minesweeper-counter__bombs">010</div>
            <div className="minesweeper-status" />
            <div className="minesweeper-counter minesweeper-counter__bombs">025</div>
          </div>
          <div className="minesweeper-gameboard">
            {this.renderRows()}
          </div>
        </div>
      </Window>
    );
  }
}

export default Minesweeper;
