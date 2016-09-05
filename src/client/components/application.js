import React, {Component, PropTypes} from 'react';
import {MINESWEEPER, FOLDER, BLOG, ERROR} from '../enums/icon-types';
import Window from '../containers/window-container/window-container';
import Minesweeper from '../containers/minesweeper-container/minesweeper-container';
import Folder from '../containers/folder-container/folder-container';
import Blog from '../components/blog/blog';
import ErrorDialog from '../containers/error-container/error-container';

const TYPE_TO_COMPONENT = {
  [MINESWEEPER]: Minesweeper,
  [FOLDER]: Folder,
  [BLOG]: Blog,
  [ERROR]: ErrorDialog
};

class Application extends Component {
  render() {
    const App = TYPE_TO_COMPONENT[this.props.type] || Window;
    return <App {...this.props} />;
  }
}

export default Application;
