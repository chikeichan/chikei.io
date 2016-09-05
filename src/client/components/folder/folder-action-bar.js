import React, {Component, PropTypes} from 'react';
import ActionBar from '../window/window-action-bar';
import WindowActionMenu from '../window/window-action-menu';
import {FILE, VIEW, HELP} from '../../enums/window-element-types';

class FolderActionBar extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    actions: PropTypes.array.isRequired,
    setViewMode: PropTypes.func.isRequired
  };

  static defaultProps = {
    actions: []
  };

  static contextTypes = {
    closeWindow: PropTypes.func
  };

  renderActionMenu(action) {
    const {windowId, setViewMode, viewMode} = this.props;
    switch(action) {
      case FILE:
        return (
          <WindowActionMenu>
            <div className="divider"/>
            <div onClick={this.context.closeWindow}>Exit</div>
          </WindowActionMenu>
        );
      case VIEW:
        return (
          <WindowActionMenu>
            <div
              className={(!viewMode || viewMode === 'ICON') && 'checked'}
              onClick={() => setViewMode(windowId, 'ICON')}>Icons</div>
            <div
              className={viewMode === 'DETAIL' && 'checked'}
              onClick={() => setViewMode(windowId, 'DETAIL')}>Details</div>
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

export default FolderActionBar;
