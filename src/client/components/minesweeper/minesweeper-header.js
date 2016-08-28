import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {STATUS} from '../../enums/minesweeper-action-types';
const {WIN, LOSE, PENDING} = STATUS;

class MinesweeperHeader extends Component {
  static propTypes = {
    bombs: PropTypes.number.isRequired,
    opened: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    restartGame: PropTypes.func.isRequired
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
    const {bombs, opened, status, restartGame} = this.props;
    const className = classnames(
      'minesweeper-status',
      {
        'minesweeper-status__win': status === WIN,
        'minesweeper-status__lose': status === LOSE
      }
    );
    return (
      <div className="minesweeper-header">
        <div className="minesweeper-counter minesweeper-counter__bombs">
          {this.makeCounterText(bombs)}
        </div>
        <div className={className} onClick={() => restartGame()}/>
        <div className="minesweeper-counter minesweeper-counter__opened">
          {this.makeCounterText(opened)}
        </div>
      </div>
    );
  }
}

export default MinesweeperHeader;
