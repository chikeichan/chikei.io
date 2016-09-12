import React, {Component} from 'react';
import window from 'global/window';

import Desktop from './containers/desktop-container/desktop-container';
import NavigationBar from './containers/navigation-bar-container/navigation-bar-container';

class App extends Component {
  render() {
    return (
      <div
        className="app-wrapper"
        onContextMenu={e => e.preventDefault()}>
        <Desktop />
        <NavigationBar />
      </div>
    );
  }
}

export default App;
