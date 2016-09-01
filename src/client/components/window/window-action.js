import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import WindowActionMenu from './window-action-menu';
import {ACTIONS_TO_CLASS, ACTIONS_TO_DISPLAY_NAME} from '../../enums/window-element-types';

class WindowAction extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    isActive: PropTypes.bool,
    selectAction: PropTypes.func.isRequired,
    cancelAction: PropTypes.func.isRequired
  };

  static defaulProps = {
    isSelected: false
  };

  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }

  onMouseEnter() {
    const {isActive, selectAction} = this.props;
    if (isActive) {
      selectAction();
    }
  }

  render() {
    const {
      action, isSelected, selectAction,
      cancelAction, isActive, menu
    } = this.props;
    const className = classnames(
      'window-action-bar__action',
      {'window-action-bar__action--selected': isSelected}
    );
    const style = {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '100vh',
      width: '100vw',
      zIndex: '900'
    };

    return (
      <div>
        {isSelected && <div style={style} onMouseDown={cancelAction}/>}
        <div
          className={className}
          onClick={selectAction}
          onMouseEnter={isActive && this.onMouseEnter}>
          {ACTIONS_TO_DISPLAY_NAME[action]}
          {isSelected && menu}
        </div>
      </div>
    );
  }
}

export default WindowAction;
