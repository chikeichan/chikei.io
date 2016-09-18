import React, {Component, PropTypes} from 'react';
import {
  MINESWEEPER, FOLDER, BLOG, ERROR,
  TETRIS, CODE, DEMO, CODE_DIR
} from '../enums/icon-types';
import Window from '../containers/window-container/window-container';
import Minesweeper from '../containers/minesweeper-container/minesweeper-container';
import Folder from '../containers/folder-container/folder-container';
import Blog from '../components/blog/blog';
import Code from '../components/code/code';
import CodeReader from '../components/code-reader/code-reader';
import Demo from '../components/demo/demo';
import Tetris from '../containers/tetris-container/tetris-container';
import ErrorDialog from '../containers/error-container/error-container';

const TYPE_TO_COMPONENT = {
  [MINESWEEPER]: Minesweeper,
  [FOLDER]: Folder,
  [BLOG]: Blog,
  [ERROR]: ErrorDialog,
  [TETRIS]: Tetris,
  [CODE]: Code,
  [DEMO]: Demo,
  [CODE_DIR]: CodeReader
};

class Application extends Component {
  render() {
    const App = TYPE_TO_COMPONENT[this.props.type] || ErrorDialog;
    return <App {...this.props} />;
  }
}

export default Application;
