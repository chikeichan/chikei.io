import React, {Component, PropTypes} from 'react';
import {ACTIONS_TO_CLASS, ACTIONS_TO_DISPLAY_NAME} from '../../enums/window-element-types';

class Window extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    name: PropTypes.string,
    actions: PropTypes.array
  };

  static defaultProps = {
    actions: []
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

  render() {
    const {windowId, name} = this.props;
    return (
      <div className="window-container">
        <div className="window-header">
          <span className="window-header__name">{name}</span>
          <span className="window-header__buttons">
            <button className="window-header__button window-header__button--minimize" />
            <button className="window-header__button window-header__button--maximize" />
            <button className="window-header__button window-header__button--close" />
          </span>
        </div>
        {this.renderActions()}
      </div>
    );
  }
}

export default Window;
