import React, {Component, PropTypes} from 'react';
import {MINESWEEPER} from '../enums/icon-types';
import Window from '../containers/window-container/window-container';
import Minesweeper from './minesweeper/minesweeper';

const ID_TO_COMPONENT = {
  [MINESWEEPER]: Minesweeper
};

class Application extends Component {
  render() {
    const App = ID_TO_COMPONENT[this.props.windowId] || Window;
    return <App {...this.props} />;
  }
}

export default Application;
