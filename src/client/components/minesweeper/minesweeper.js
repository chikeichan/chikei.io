import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';

class Minesweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfCols: 10,
      numOfRows: 10,
      numOfMines: 10,
      fields: this.makeInitialField(10, 10, 10),
      isOpen: [],
      isFlag: []
    };
  }

  makeInitialField(x, y, n) {
    const mines = Array(n).fill('M');
    const empties = Array(x * y - n).fill(0);
    const field = [...mines, ...empties];

    const shuffled = field
      .reduce((newField, n, i) => {
        var rand = Math.floor(Math.random() * x * y);
        var tmp = newField[i];
        newField[i] = newField[rand];
        newField[rand] = tmp;
        return newField;
      }, field);

    const finished = shuffled
      .map((cell, i) => {
        return cell === 'M' ? 'M' : 
          this.getSurroundIndex(i, x, y)
            .map(index => shuffled[index])
            .reduce((sum, n) => n === 'M' ? sum + 1 : sum, 0);
      });

    return finished;
  }

  getSurroundIndex(i, numOfCols, numOfRows) {
    const rightEdge = !((i + 1) % numOfCols);
    const leftEdge = !(i % numOfCols);
    const upEdge = i < numOfCols;
    const downEdge = i >= numOfCols * (numOfRows - 1);

    return [
      !rightEdge && i + 1,
      !downEdge && i + numOfRows,
      !rightEdge && !downEdge && i + 1 + numOfRows,
      !rightEdge && !upEdge && i + 1 - numOfRows,
      !leftEdge && i - 1,
      !upEdge && i - numOfRows,
      !leftEdge && !upEdge && i - 1 - numOfRows,
      !leftEdge && !downEdge && i - 1 + numOfRows
    ];
  }

  renderRows() {
    const {numOfRows} = this.state;
    return Array(numOfRows)
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
    const {numOfCols, fields} = this.state;
    return Array(numOfCols)
      .fill(0)
      .map((m, j) => {
        const cellIndex = i * numOfCols + j;
        const cellContent = fields[cellIndex];
        return (
          <div 
            className={`minesweeper-cell minesweeper-cell--${cellContent}`}
            key={cellIndex} />
        );
      });
  }


  render() {
    const {numOfRows, numOfCols, fields} = this.state;
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
