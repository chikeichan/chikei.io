import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class Gameboy extends Component {
  static propTypes = {
    onShutDown: PropTypes.func,
    onStartUp: PropTypes.func,
    onLeftClick: PropTypes.func,
    onRightClick: PropTypes.func,
    onUpClick: PropTypes.func,
    onDownClick: PropTypes.func,
    onAButton: PropTypes.func,
    onBButton: PropTypes.func,
    onStart: PropTypes.func,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    onShutDown() {},
    onStartUp() {},
    onLeftClick() {},
    onRightClick() {},
    onUpClick() {},
    onDownClick() {},
    onAButton() {},
    onBButton() {},
    onStart() {},
    onSelect() {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isOn: false
    };
  }

  componentWillMount() {
    setTimeout(() => this.toggleOn(), 0);
  }

  toggleOn() {
    const {isOn} = this.state;
    const {onStartUp, onShutDown} = this.props;
    if (!isOn) {
      if (typeof Audio !== 'undefined') {
        const startup = new Audio('/sounds/gameboy-startup.wav');
        startup.play();
      }
      onStartUp();
    } else {
      onShutDown();
    }
    this.setState({isOn: !isOn});
  }

  render() {
    const {
      children, onDownClick, onUpClick, onRightClick,
      onLeftClick, onAButton, onBButton, onStart, onSelect
    } = this.props;
    const {isOn} = this.state;
    const statusClass = classnames(
      'gameboy-screen',
      {
        'gameboy-screen-on': isOn
      }
    );

    const switchClass = classnames(
      'gameboy-switch',
      {'gameboy-switch-on': isOn}
    );

    return (
      <div className="gameboy-wrapper">
        <div 
          onClick={() => this.toggleOn()}
          className="gameboy-top">
          <div className="gameboy-top-left"/>
          <div className="gameboy-top-logo">Minkendo</div>
          <div className="gameboy-top-center">
            <div className={switchClass}>
              <div className="gameboy-on-switch"></div>
              <div className="gameboy-off-switch"></div>
            </div>
          </div>
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
              <div className="gameboy-dpad-up" onClick={onUpClick}/>
            </div>
            <div className="gameboy-dpad-row gameboy-dpad-row--two">
              <div className="gameboy-dpad-left" onClick={onLeftClick}/>
              <div className="gameboy-dpad-center"/>
              <div className="gameboy-dpad-right" onClick={onRightClick}/>
            </div>
            <div className="gameboy-dpad-row gameboy-dpad-row--three">
              <div className="gameboy-dpad-down" onClick={onDownClick}/>
            </div>
          </div>
          <div className="gameboy-buttons">
            <div className="gameboy-button-a" onClick={onAButton}/>
            <div className="gameboy-button-divider"/>
            <div className="gameboy-button-b" onClick={onBButton}/>
          </div>
        </div>
        <div className="gameboy-alt-buttons">
          <div className="gameboy-alt-button">
            <div className="gameboy-alt-select" onClick={onSelect}/>
            SELECT
          </div>
          <div className="gameboy-alt-button">
            <div className="gameboy-alt-start" onClick={onStart}/>
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
