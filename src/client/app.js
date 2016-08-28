import React, {Component} from 'react';

import Desktop from './containers/desktop-container/desktop-container';
import NavigationBar from './containers/navigation-bar-container/navigation-bar-container';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Desktop />
        <NavigationBar />
      </div>
    );
  }
}

export default App;
