import React, {Component, PropTypes} from 'react';
import {MINESWEEPER, FOLDER, BLOG} from '../enums/icon-types';
import Window from '../containers/window-container/window-container';
import Minesweeper from '../containers/minesweeper-container/minesweeper-container';
import Folder from '../components/folder/folder';
import Blog from '../components/blog/blog';

const TYPE_TO_COMPONENT = {
  [MINESWEEPER]: Minesweeper,
  [FOLDER]: Folder,
  [BLOG]: Blog
};

class Application extends Component {
  render() {
    const App = TYPE_TO_COMPONENT[this.props.type] || Window;
    return <App {...this.props} />;
  }
}

export default Application;
