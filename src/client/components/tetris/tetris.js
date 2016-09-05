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
            <div className="gameboy-top-logo">Minkendo</div>
            <div className="gameboy-top-center"/>
            <div className="gameboy-top-right"/>
          </div>
          <div className="gameboy-screen-wrapper">
            <div className="gameboy-screen-header"/>
            <div className="gameboy-screen"/>
          </div>
          <div className="gameboy-branding">
            <div className="gameboy-company">Minkendo</div>
            <div className="gameboy-console">Game Kid</div>
            <div className="gameboy-tm">TM</div>
          </div>
          <div className="gameboy-control">
            <div className="gameboy-dpad">
              <div className="gameboy-dpad-row gameboy-dpad-row--one">
                <div className="gameboy-dpad-up"/>
              </div>
              <div className="gameboy-dpad-row gameboy-dpad-row--two">
                <div className="gameboy-dpad-left"/>
                <div className="gameboy-dpad-center"/>
                <div className="gameboy-dpad-right"/>
              </div>
              <div className="gameboy-dpad-row gameboy-dpad-row--three">
                <div className="gameboy-dpad-down"/>
              </div>
            </div>
            <div className="gameboy-buttons">
              <div className="gameboy-button-a"/>
              <div className="gameboy-button-divider"/>
              <div className="gameboy-button-b"/>
            </div>
          </div>
          <div className="gameboy-alt-buttons">
            <div className="gameboy-alt-button">
              <div className="gameboy-alt-select"/>
              SELECT
            </div>
            <div className="gameboy-alt-button">
              <div className="gameboy-alt-start"/>
              START
            </div>
          </div>
          <div className="gameboy-speakers">
            <div className="gameboy-speaker-wrapper">
              <div className="gameboy-speaker"/>
              <div className="gameboy-speaker"/>
              <div className="gameboy-speaker"/>
              <div className="gameboy-speaker"/>
              <div className="gameboy-speaker"/>
              <div className="gameboy-speaker"/>
            </div>
          </div>
        </div>
      </Window>
    );
  }
}

export default Folder;
