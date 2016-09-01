import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import WindowAction from './window-action';

class WindowActionMenu extends Component {
  render() {
    return (
      <div className="window-menu">
        {this.props.children}
      </div>
    );
  }
}

export default WindowActionMenu;
