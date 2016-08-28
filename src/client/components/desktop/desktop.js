import React, {Component, PropTypes} from 'react';
import Icon from '../../containers/icon-container/icon-container';
import Application from '../application';

const ICON_POS = [
  {x: 10, y: 0},
  {x: 10, y: 80},
  {x: 10, y: 160},
  {x: 10, y: 240},
];

const WINDOW_POS = {
  startX: window ? window.innerWidth/4 : 100,
  startY: window ? window.innerHeight/4 : 100
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
    this.props.setLoading(true);
    this.props.bootstrap()
      .then(() => this.props.setLoading(false));
  }

  startUp() {
    const startup = new Audio('./sounds/startup.mp3');
    startup.play();
  }

  renderIcons() {
    const {icons=[]} = this.props;
    return Object.keys(icons)
      .map((iconId, i) => {
        const icon = icons[iconId];
        const {name} = icon;
        const pos = ICON_POS[i];
        return (
          <Icon
            key={iconId}
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
        const {name, actions, buttons} = appWindow;
        const x = WINDOW_POS.startX + (i * 50);
        const y = WINDOW_POS.startY + (i * 50);
        return (
          <Application
            windowId={windowId}
            key={windowId}
            name={name}
            defaultX={x}
            defaultY={y}
            buttons={buttons}
            actions={actions} />
        );        
      });
  }

  render() {
    return (
      <div>
        {this.renderIcons()}
        {this.renderWindows()}
      </div>
    );
  }
}

export default Desktop;
