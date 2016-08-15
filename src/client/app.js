import React, {Component} from 'react';

import DesktopContainer from './containers/desktop-container/desktop-container';
import NavigationBar from './components/navigation-bar/navigation-bar';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <DesktopContainer />
        <NavigationBar />
      </div>
    );
  }
}

export default App;
