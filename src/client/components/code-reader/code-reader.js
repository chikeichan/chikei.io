import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import ActionBar from './code-reader-action-bar';

class CodeReader extends Component {
  static propTypes = {
    appData: PropTypes.array.isRequired
  };

  static defaultProps = {
    appData: []
  };

  render() {
    const {appData, actions} = this.props;
    console.log(this.props);
    return (
      <Window {...this.props}>
        <ActionBar actions={actions} />
      </Window>
    );
  }
}

export default CodeReader;
