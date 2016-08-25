import React, {Component} from 'react';

class NavigationBar extends Component {
  render() {
    return (
      <div className="navigation-bar">
        <button className="navigation-bar-start-button">
          <div className="navigation-bar-start-button__logo" />
          Start
        </button>
        <div className="navigation-bar--divider" />
        <div className="navigation-bar--application-dock" />
        <div className="navigation-bar--clock">10:14 PM</div>
      </div>
    );
  }
}

export default NavigationBar;
