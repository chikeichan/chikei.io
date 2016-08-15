import React, {Component} from 'react';

import Desktop from './components/desktop/desktop';
import NavigationBar from './components/navigation-bar/navigation-bar';

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
