import React, {Component} from 'react';
import window from 'global/window';

import Desktop from './containers/desktop-container/desktop-container';
import NavigationBar from './containers/navigation-bar-container/navigation-bar-container';

class App extends Component {
  componentWillMount() {
    this.initGoogleAnalytics();
  }

  initGoogleAnalytics() {
    // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    // })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    // ga('create', 'UA-83615019-1', 'auto');
    // ga('send', 'pageview');
  }

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
