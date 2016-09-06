import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class Gameboy extends Component {
  static propTypes = {
    isOn: PropTypes.bool
  };

  static defaultProps = {
    isOn: false
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.isOn !== this.props.isOn;
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.isOn && nextProps.isOn) {
      const startup = new Audio('./sounds/gameboy-startup.wav');
      startup.play();
    }
  }

  render() {
    const {children, isOn} = this.props;
    const statusClass = classnames(
      'gameboy-screen',
      {
        'gameboy-screen-on': isOn
      }
    );

    return (
      <div className="gameboy-wrapper">
        <div className="gameboy-top">
          <div className="gameboy-top-left"/>
          <div className="gameboy-top-logo">Minkendo</div>
          <div className="gameboy-top-center"/>
          <div className="gameboy-top-right"/>
        </div>
        <div className="gameboy-screen-wrapper">
          <div className="gameboy-screen-header"/>
          <div className={statusClass}>
            <div
              className="gameboy-content-wrapper"
              style={{
                opacity: isOn ? 1 : 0,
                height: isOn ? 170 : 0
              }}>
              {children}
            </div>
          </div>
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
    );
  }
}

export default Gameboy;
