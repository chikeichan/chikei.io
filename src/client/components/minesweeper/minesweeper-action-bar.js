import React, {Component, PropTypes} from 'react';
import ActionBar from '../window/window-action-bar';
import WindowActionMenu from '../window/window-action-menu';
import {GAME, HELP} from '../../enums/window-element-types';

const LEVEL = {
  BEGINNER: [10, 10, 15],
  INTERMEDIATE: [16, 16, 40],
  EXPERT: [20, 33, 99]
};
const {BEGINNER, INTERMEDIATE, EXPERT} = LEVEL;

class MinesweeperActionBar extends Component {
  static propTypes = {
    actions: PropTypes.array.isRequired,
    startGame: PropTypes.func.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired
  };

  static defaultProps = {
    actions: [],
    startGame() {}
  };

  static contextTypes = {
    closeWindow: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.mapMenuToActions = this.mapMenuToActions.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  getCurrentLevel() {
    const {row, col} = this.props;
    if (col === BEGINNER[1] && row === BEGINNER[0]) {
      return BEGINNER;
    } else if (col === INTERMEDIATE[1] && row === INTERMEDIATE[0]) {
      return INTERMEDIATE;
    } else if (col === EXPERT[1] && row === EXPERT[0]) {
      return EXPERT;
    }
  }

  startGame(level) {
    if (!level) {
      return;
    }
    this.props.startGame.apply(this, level)
  }

  makeGameMenuItem(level, text) {
    const currentLevel = this.getCurrentLevel();
    return (
      <div
        onClick={() => this.startGame(level)}
        className={currentLevel === level && 'checked'}>
        {text}
      </div>
    );
  }

  renderActionMenu(action) {
    const currentLevel = this.getCurrentLevel();
    switch(action) {
      case GAME:
        return (
          <WindowActionMenu>
            <div onClick={() => this.startGame(currentLevel)}>New Game</div>
            {this.makeGameMenuItem(BEGINNER, 'Beginner')}
            {this.makeGameMenuItem(INTERMEDIATE, 'Intermediate')}
            {this.makeGameMenuItem(EXPERT, 'Expert')}
            <div className="divider"/>
            <div onClick={this.context.closeWindow}>Exit</div>
          </WindowActionMenu>
        );
      case HELP:
        return (
          <WindowActionMenu>
            <div onClick={() => alert('hi')}>Hi</div>
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
        <ActionBar actions={this.mapMenuToActions(this.props.actions)} />
    );
  }
}

export default MinesweeperActionBar;
