import React, {Component, PropTypes} from 'react';
import Icon from '../../containers/icon-container/icon-container';
import Window from '../../containers/window-container/window-container';

const ICON_POS = [
  {x: 10, y: 0},
  {x: 10, y: 80},
  {x: 10, y: 160},
  {x: 10, y: 240},
];

const WINDOW_POS = {
  startX: 250,
  startY: 250
};

class Desktop extends Component {
  static propTypes = {
    bootstrap: PropTypes.func.isRequired,
    icons: PropTypes.object,
    windows: PropTypes.object
  };

  static defaultProps = {
    icons: {},
    windows: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.startUp = this.startUp.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (Object.keys(this.props.icons).join('-') !== Object.keys(nextProps.icons).join('-')) ||
      (Object.keys(this.props.windows).join('-') !== Object.keys(nextProps.windows).join('-')) ||
      (this.state.isLoading !== nextState.isLoading);
  }

  componentWillMount() {
    this.startUp();
    this.props.bootstrap()
      .then(() => this.setState({isLoading: false}));
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
          <Window
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
    if (this.state.isLoading) {
      return null;
    }

    return (
      <div>
        {this.renderIcons()}
        {this.renderWindows()}
      </div>
    );
  }
}

export default Desktop;
