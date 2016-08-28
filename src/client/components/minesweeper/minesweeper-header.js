import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class MinesweeperHeader extends Component {
  static propTypes = {
    bombs: PropTypes.number.isRequired,
    opened: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    startGame: PropTypes.func.isRequired
  };

  makeCounterText(number) {
    switch (true) {
      case number > 99:
        return `${number}`;
      case number < 10:
        return `00${number}`;
      default:
        return `0${number}`;
    }
  }

  render() {
    const {bombs, opened, status, startGame} = this.props;
    const className = classnames(
      'minesweeper-status',
      {
        'minesweeper-status__win': status === 1,
        'minesweeper-status__lose': status === -1
      }
    );
    return (
      <div className="minesweeper-header">
        <div className="minesweeper-counter minesweeper-counter__bombs">
          {this.makeCounterText(bombs)}
        </div>
        <div className={className} onClick={() => startGame(15, 15, 45)}/>
        <div className="minesweeper-counter minesweeper-counter__opened">
          {this.makeCounterText(opened)}
        </div>
      </div>
    );
  }
}

export default MinesweeperHeader;
