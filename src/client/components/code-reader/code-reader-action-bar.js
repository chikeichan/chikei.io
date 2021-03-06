import React, {Component, PropTypes} from 'react';
import ActionBar from '../window/window-action-bar';
import WindowActionMenu from '../window/window-action-menu';
import {FILE, VIEW, HELP} from '../../enums/window-element-types';

class CodeReaderActionBar extends Component {
  static propTypes = {
    actions: PropTypes.array.isRequired
  };

  static defaultProps = {
    actions: []
  };

  static contextTypes = {
    closeWindow: PropTypes.func
  };

  renderActionMenu(action) {
    switch(action) {
      case FILE:
        return (
          <WindowActionMenu>
            <div onClick={this.context.closeWindow}>Exit</div>
          </WindowActionMenu>
        );
      case VIEW:
        return (
          <WindowActionMenu>
            <div>Icon</div>
            <div>Detail</div>
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

export default CodeReaderActionBar;
