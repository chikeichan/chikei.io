import React, {Component, PropTypes} from 'react';
import {ACTIONS_TO_CLASS, ACTIONS_TO_DISPLAY_NAME, BUTTONS_TO_CLASS} from '../../enums/window-element-types';

class Window extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    name: PropTypes.string,
    actions: PropTypes.array,
    buttons: PropTypes.array
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
    const {windowId, name} = this.props;
    return (
      <div className="window-container">
        <div className="window-header">
          <span className="window-header__name">{name}</span>
          {this.renderButtons()}
        </div>
        {this.renderActions()}
      </div>
    );
  }
}

export default Window;
