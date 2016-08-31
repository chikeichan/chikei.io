import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import Cell from '../../containers/minesweeper-container/minesweeper-cell-container';
import Header from '../../containers/minesweeper-container/minesweeper-header-container';
import ActionBar from '../window/window-action-bar';
import WindowActionMenu from '../window/window-action-menu';
import {GAME, HELP} from '../../enums/window-element-types';

const LEVEL = {
  BEGINNER: [10, 10, 15],
  INTERMEDIATE: [16, 16, 40],
  EXPERT: [33, 20, 99]
};
const {BEGINNER, INTERMEDIATE, EXPERT} = LEVEL;

class Minesweeper extends Component {
  static propTypes = {
    startGame: PropTypes.func.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    fields: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.renderActionMenu = this.renderActionMenu.bind(this);
    this.mapMenuToActions = this.mapMenuToActions.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.fields !== this.props.fields;
  }

  componentDidMount() {
    this.props.startGame(20, 10, 15);
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

  getCurrentLevel() {
    const {row, col} = this.props;
    if (col === BEGINNER[0] && row === BEGINNER[1]) {
      return BEGINNER;
    } else if (col === INTERMEDIATE[0] && row === INTERMEDIATE[1]) {
      return INTERMEDIATE;
    } else if (col === EXPERT[0] && row === EXPERT[1]) {
      return EXPERT;
    }
  }

  renderActionMenu(action) {
    const currentLevel = this.getCurrentLevel();
    const {startGame} = this.props;
    switch(action) {
      case GAME:
        return (
          <WindowActionMenu>
            <div onClick={() => startGame.apply(this, currentLevel)}>New Game</div>
            <div
              onClick={() => startGame.apply(this, BEGINNER)}
              className={currentLevel === BEGINNER && 'checked'}>
              Beginner
            </div>
            <div
              onClick={() => startGame.apply(this, INTERMEDIATE)}
              className={currentLevel === INTERMEDIATE && 'checked'}>
              Intermediate
            </div>
            <div
              onClick={() => startGame.apply(this, EXPERT)}
              className={currentLevel === EXPERT && 'checked'}>
              Expert
            </div>
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
