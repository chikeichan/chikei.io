import React, {Component, PropTypes} from 'react';
import ActionBar from '../window/window-action-bar';
import WindowActionMenu from '../window/window-action-menu';
import {GAME, VIEW, HELP} from '../../enums/window-element-types';

class TetrisActionBar extends Component {
  static propTypes = {
    actions: PropTypes.array.isRequired,
    changeLevel: PropTypes.func.isRequired,
    currentLevel: PropTypes.number.isRequired
  };

  static defaultProps = {
    actions: []
  };

  static contextTypes = {
    closeWindow: PropTypes.func
  };

  renderActionMenu(action) {
    const {changeLevel, currentLevel} = this.props;
    switch(action) {
      case GAME:
        return (
          <WindowActionMenu>
            <div className={currentLevel === 1 && 'checked'} onClick={() => changeLevel(1)}>Level 1</div>
            <div className={currentLevel === 2 && 'checked'} onClick={() => changeLevel(2)}>Level 2</div>
            <div className={currentLevel === 3 && 'checked'} onClick={() => changeLevel(3)}>Level 3</div>
            <div className={currentLevel === 4 && 'checked'} onClick={() => changeLevel(4)}>Level 4</div>
            <div className={currentLevel === 5 && 'checked'} onClick={() => changeLevel(5)}>Level 5</div>
            <div className={currentLevel === 6 && 'checked'} onClick={() => changeLevel(6)}>Level 6</div>
            <div className={currentLevel === 7 && 'checked'} onClick={() => changeLevel(7)}>Level 7</div>
            <div className={currentLevel === 8 && 'checked'} onClick={() => changeLevel(8)}>Level 8</div>
            <div className={currentLevel === 9 && 'checked'} onClick={() => changeLevel(9)}>Level 9</div>
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

export default TetrisActionBar;
