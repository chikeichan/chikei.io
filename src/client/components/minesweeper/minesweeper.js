import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import Cell from '../../containers/minesweeper-container/minesweeper-cell-container';
import Header from '../../containers/minesweeper-container/minesweeper-header-container';

class Minesweeper extends Component {
  static propTypes = {
    startGame: PropTypes.func.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    fields: PropTypes.array.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.fields !== this.props.fields;
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
    console.log('render wrapper')
    return (
      <Window {...this.props}>
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
