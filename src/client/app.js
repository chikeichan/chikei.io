import React, {Component} from 'react';
import window from 'global/window';

import Desktop from './containers/desktop-container/desktop-container';
import NavigationBar from './containers/navigation-bar-container/navigation-bar-container';
import RouteService from './services/route';

class App extends Component {
  render() {
    return (
      <div
        className="app-wrapper"
        onContextMenu={e => e.preventDefault()}>
        <RouteService />
        <Desktop />
        <NavigationBar />
      </div>
    );
  }
}

export default App;
