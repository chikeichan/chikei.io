import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import Cell from '../../containers/minesweeper-container/minesweeper-cell-container';
import Header from '../../containers/minesweeper-container/minesweeper-header-container';
import ActionBar from '../window/window-action-bar';
import WindowActionMenu from '../window/window-action-menu';
import {GAME, HELP} from '../../enums/window-element-types';


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

  renderActionMenu(action) {
    switch(action) {
      case GAME:
        return (
          <WindowActionMenu>
            <div>New Game</div>
            <div className="checked">Beginner</div>
            <div>Intermediate</div>
            <div>Expert</div>
            <div className="divider"/>
            <div>Exit</div>
          </WindowActionMenu>
        );
      case HELP:
        return (
          <WindowActionMenu>
            <div>New Game</div>
            <div className="checked">Beginner</div>
            <div>Intermediate</div>
            <div>Expert</div>
            <div className="divider"/>
            <div>Exit</div>
          </WindowActionMenu>
        );
      default:
        return;
    }
  }

  mapMenuToActions(actions) {
    return actions.map(action => {
      const name = action;
      const menu = this.renderActionMenu(action);
      return {name, menu};
    })
  }

  render() {
    return (
      <Window {...this.props}>
        <ActionBar actions={this.mapMenuToActions(this.props.actions)} />
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
