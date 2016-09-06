import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import ActionBar from './tetris-action-bar';
import Gameboy from '../gameboy/gameboy';

class Tetris extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      isOn: false
    };
  }

  componentWillMount() {
    setTimeout(() => this.setState({isOn: true}), 0);
  }

  render() {
    const {actions} = this.props;
    return (
      <Window {...this.props} isAutoHide={true}>
        <ActionBar actions={actions} />
        <Gameboy isOn={this.state.isOn}>
          <div className="tetris-wrapper">
            <div className="tetris-game-background">
              <div className="tetris-game-field"/>
            </div>
            <div className="tetris-game-info" />
          </div>
        </Gameboy>
      </Window>
    );
  }
}

export default Tetris;
