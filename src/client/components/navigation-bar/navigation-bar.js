import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
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
          const {id, name} = windows[appKey];
          const className = classnames(
            'nav-app-wrapper',
            {'nav-app-wrapper--selected': Boolean(selectedWindow[id])}
          );
          return (
            <div
              className={className}
              onClick={() => selectWindow(id)}
              key={id}>
              <span className={`nav-app__icon nav-app__icon--${id}`}/>
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
        <button className="navigation-bar-start-button">
          <div className="navigation-bar-start-button__logo" />
          Start
        </button>
        <div className="navigation-bar--divider" />
        {this.renderAppDocks()}
        <div className="navigation-bar--clock">10:14 PM</div>
      </div>
    );
  }
}

export default NavigationBar;
