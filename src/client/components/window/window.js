import React, {Component, PropTypes} from 'react';
import {
  ACTIONS_TO_CLASS, ACTIONS_TO_DISPLAY_NAME, BUTTONS_TO_CLASS,
  CLOSE, MINIMIZE, MAXIMIZE
} from '../../enums/window-element-types';
import {ID_TO_WINDOW_ICON} from '../../enums/icon-types.js';

class Window extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    name: PropTypes.string,
    actions: PropTypes.array,
    buttons: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number,
    isMinimized: PropTypes.bool,
    isMaximized: PropTypes.bool,
    minimizeWindow: PropTypes.func.isRequired,
    maximizeWindow: PropTypes.func.isRequired,
    closeWindow: PropTypes.func.isRequired
  };

  static defaultProps = {
    isMinimized: false,
    isMaximized: false,
    buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
    actions: ['FILE', 'EDIT', 'VIEW', 'HELP']
  };

  constructor(props) {
    super(props);
    this.closeWindow = this.closeWindow.bind(this);
    this.minimizeWindow = this.minimizeWindow.bind(this);
    this.maximizeWindow = this.maximizeWindow.bind(this);
  }

  closeWindow(e) {
    const {closeWindow, windowId} = this.props;
    e.stopPropagation();
    closeWindow(windowId);
  }

  minimizeWindow(e) {
    const {minimizeWindow, windowId} = this.props;
    e.stopPropagation();
    minimizeWindow(windowId);
  }

  maximizeWindow(e) {
    const {maximizeWindow, windowId} = this.props;
    e.stopPropagation();
    maximizeWindow(windowId);
  }


  getButtonClickHandler(button) {
    return {
      [CLOSE]: this.closeWindow,
      [MINIMIZE]: this.minimizeWindow,
      [MAXIMIZE]: this.maximizeWindow
    }[button];
  }

  renderActions() {
    return (
      <div className="window-action-bar">
        {this.props.actions.map(action => (
          <div 
            key={action}
            className={`window-action-bar__action ${ACTIONS_TO_CLASS[action]}`}>
            {ACTIONS_TO_DISPLAY_NAME[action]}
          </div>
        ))}
      </div>
    );
  }

  renderButtons() {
    return (
      <span className="window-header__buttons">
        {this.props.buttons.map(button => (
          <button 
            key={button}
            className={`window-header__button ${BUTTONS_TO_CLASS[button]}`}
            onMouseDown={e => e.stopPropagation()}
            onClick={this.getButtonClickHandler(button)}/>
        ))}
      </span>
    );
  }

  render() {
    const {
      windowId, name, type,
      children, isMinimized
    } = this.props;

    return isMinimized ? null : (
      <div
        className="window-container">
        <div className="window-header">
          <span className={`window-header__icon ${ID_TO_WINDOW_ICON[type]}`} />
          <span className="window-header__name">{name}</span>
          {this.renderButtons()}
        </div>
        {this.renderActions()}
        {children}
      </div>
    );
  }
}

export default Window;
