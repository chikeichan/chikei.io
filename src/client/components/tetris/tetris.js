import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import ActionBar from './tetris-action-bar';

class Folder extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    const {actions} = this.props;
    return (
      <Window {...this.props}>
        <ActionBar actions={actions} />
        <div className="gameboy-wrapper">
          <div className="gameboy-top">
            <div className="gameboy-top-left"/>
            <div className="gameboy-top-logo">Nintendo</div>
            <div className="gameboy-top-center"/>
            <div className="gameboy-top-right"/>
          </div>
          <div className="gameboy-screen-wrapper">
            <div className="gameboy-screen-header"/>
            <div className="gameboy-screen"/>
          </div>
        </div>
      </Window>
    );
  }
}

export default Folder;
