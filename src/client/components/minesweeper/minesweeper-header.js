import React, {Component, PropTypes} from 'react';

class MinesweeperHeader extends Component {
  static propTypes = {
    bombs: PropTypes.number.isRequired,
    opened: PropTypes.number.isRequired
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
    const {bombs, opened} = this.props;
    return (
      <div className="minesweeper-header">
        <div className="minesweeper-counter minesweeper-counter__bombs">
          {this.makeCounterText(bombs)}
        </div>
        <div className="minesweeper-status" />
        <div className="minesweeper-counter minesweeper-counter__opened">
          {this.makeCounterText(opened)}
        </div>
      </div>
    );
  }
}

export default MinesweeperHeader;
