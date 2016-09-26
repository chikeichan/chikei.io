import React, {Component, PropTypes} from 'react';
import window from 'global/window';
import Icon from '../../containers/icon-container/icon-container';
import Application from '../application';

const ICON_POS = [
  {x: 10, y: 0},
  {x: 10, y: 80},
  {x: 10, y: 160},
  {x: 10, y: 240},
];

const WINDOW_POS = {
  startX: window ? window.innerWidth/8 : 25,
  startY: window ? window.innerHeight/8 : 25
};

class Desktop extends Component {
  static propTypes = {
    bootstrap: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    icons: PropTypes.object,
    windows: PropTypes.object,
    system: PropTypes.object,
  };

  static defaultProps = {
    icons: {},
    windows: {},
    system: {}
  };

  constructor(props) {
    super(props);
    this.startUp = this.startUp.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {icons, windows, system} = this.props;
    return (Object.keys(icons).join('-') !== Object.keys(nextProps.icons).join('-')) ||
      (Object.keys(windows).join('-') !== Object.keys(nextProps.windows).join('-')) ||
      system.isLoading !== nextProps.system.isLoading;
  }

  componentWillMount() {
    this.startUp();
    this.props.bootstrap();
  }

  startUp() {
    if (typeof Audio === 'undefined') {
      return;
    }
    const startup = new Audio('/sounds/startup.mp3');
    startup.play();
  }

  renderIcons() {
    const {icons=[]} = this.props;
    return Object.keys(icons)
      .map((iconId, i) => {
        const icon = icons[iconId];
        const {name, type} = icon;
        const pos = ICON_POS[i];
        return (
          <Icon
            key={iconId}
            type={type}
            iconId={iconId}
            defaultX={pos.x}
            defaultY={pos.y}
            name={name}/>
        );
      });
  }

  renderWindows() {
    const {windows=[]} = this.props;
    return Object.keys(windows)
      .map((windowId, i) => {
        const appWindow = windows[windowId];
        const x = WINDOW_POS.startX + (i * 50);
        const y = WINDOW_POS.startY + (i * 50);
        return (
          <Application
            windowId={windowId}
            key={windowId}
            defaultX={x}
            defaultY={y}
            {...appWindow} />
        );        
      });
  }

  render() {
    return (
      <div className="desktop-body">
        {this.renderIcons()}
        {this.renderWindows()}
      </div>
    );
  }
}

export default Desktop;
