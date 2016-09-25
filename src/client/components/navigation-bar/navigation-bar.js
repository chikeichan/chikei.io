import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Clock from './clock';
import MobileClose from '../../containers/navigation-bar-container/mobile-close-button-container';
import {ID_TO_WINDOW_ICON} from '../../enums/icon-types.js';

class NavigationBar extends Component {
  static propTypes = {
    windows: PropTypes.object.isRequired,
    selectedWindow: PropTypes.object.isRequired,
    selectWindow: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    const {selectedWindow, windows} = this.props;
    return (Object.keys(selectedWindow).join('-') !== Object.keys(nextProps.selectedWindow).join('-')) ||
      (Object.keys(windows).join('-') !== Object.keys(nextProps.windows).join('-'));
  }

  renderAppDocks() {
    const {windows, selectedWindow, selectWindow} = this.props;
    return (
      <div className="navigation-bar--application-dock">
        {Object.keys(windows).map(appKey => {
          const {id, name, type} = windows[appKey];
          const className = classnames(
            'nav-app-wrapper',
            {'nav-app-wrapper--selected': Boolean(selectedWindow[id])}
          );
          return (
            <div
              className={className}
              onClick={() => selectWindow(id)}
              key={id}>
              <span className={`nav-app__icon icon-image__${type}`}/>
              <span className="nav-app__name">{name}</span>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="navigation-bar">
        <div className="navigation-bar-start-button">
          <div className="navigation-bar-start-button__logo" />
          <div className="navigation-bar--divider__mobile" />
          <div className="navigation-bar-start">Start</div>
        </div>
        <div className="navigation-bar--divider" />
        {this.renderAppDocks()}
        <Clock />
        <MobileClose />
      </div>
    );
  }
}

export default NavigationBar;
