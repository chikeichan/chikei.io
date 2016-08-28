import React, {Component, PropTypes} from 'react';
import {ACTIONS_TO_CLASS, ACTIONS_TO_DISPLAY_NAME, BUTTONS_TO_CLASS} from '../../enums/window-element-types';
import {ID_TO_WINDOW_ICON} from '../../enums/icon-types.js';

class Window extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    name: PropTypes.string,
    actions: PropTypes.array,
    buttons: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number
  };

  static defaultProps = {
    actions: [],
    buttons: []
  };

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
            className={`window-header__button ${BUTTONS_TO_CLASS[button]}`} />
        ))}
      </span>
    );
  }

  render() {
    const {windowId, name, children, height, width} = this.props;
    return (
      <div
        className="window-container"
        style={{height, width}}>
        <div className="window-header">
          <span className={`window-header__icon ${ID_TO_WINDOW_ICON[windowId]}`} />
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
