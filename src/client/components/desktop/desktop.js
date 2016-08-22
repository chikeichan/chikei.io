import React, {Component, PropTypes} from 'react';
import Icon from '../../containers/icon-container/icon-container';
import Window from '../../components/window/window';

const ICON_POS = [
  {x: 0, y: 0},
  {x: 0, y: 80},
  {x: 0, y: 160},
  {x: 0, y: 240},
];

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.startUp = this.startUp.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (Object.keys(this.props.icons).join('-') !== Object.keys(nextProps.icons).join('-')) ||
      this.state.isLoading !== nextState.isLoading;
  }

  componentWillMount() {
    this.startUp();
    this.props.fetchIcons();
    setTimeout(() => this.setState({isLoading: false}), 500);
  }

  startUp() {
    const startup = new Audio('./sounds/startup.mp3');
    startup.play();
  }

  renderIcons() {
    const {icons} = this.props;
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
    const {windows = ['a']} = this.props;
    return Object.keys(windows)
      .map((windowId, i) => {
        return (
          <Window
            windowId="1"
            key={i}
            name="Minesweeper"
            actions={['FILE', 'EDIT', 'VIEW', 'HELP']} />
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
